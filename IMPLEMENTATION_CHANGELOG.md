# Subscript Hub: Implementation Plan Revision Changelog

This changelog records all technical audits, architectural modifications, database schema fixes, API enhancements, and workflow corrections applied to `IMPLIMENTATION_PLAN.md` to produce `IMPLEMENTATION_PLAN_REVISED.md`.

---

## Summary of Changes

| Category | Modifications Count | Key Focus Areas |
|---|---|---|
| **State Machine & Lifecycle** | 4 | Quotation vs. subscription expiry decoupling; anchor-day preservation on resume; zero-total invoice confirmation; cancellation lock semantics. |
| **Architecture & Concurrency** | 3 | Asynchronous bulk billing dispatch; invoice-payment circular dependency elimination; cache invalidation triggers. |
| **Database & Data Architecture** | 5 | Composite tenant isolation constraint on allocations; missing high-volume FK indexes; atomic sequence numbering; font assets; customer summary SQL optimization. |
| **API & Integrations** | 5 | Customer quotation request/accept endpoints (`/me/*`); public settings endpoint; cursor pagination specifications; query parameter filters. |
| **Sequencing & Dependencies** | 2 | Relocation of Taxes and Tax Rules from Phase 7 to Phase 5; pure pricing engine development alignment. |
| **Reliability & Security** | 3 | ReportLab TrueType UTF-8 font embedding; mandatory password change for staff; rate limiting parameters. |

---

## Detailed Changelog Register

### 1. State Machine & Lifecycle Decoupling (Critical)
- **Original Issue:** In `IMPLIMENTATION_PLAN.md` (§7.1 and §12.2), quotations and subscriptions shared the `subscriptions` table and the `subscription_status` enum. Both unaccepted quotations past `valid_until` and active subscriptions past `expiry_date` transitioned to `expired`. Because the state transition `expired -> active` was defined for renewal, an expired quotation could be illegally activated via `renew`, bypassing approval.
- **Modification Made:** Decoupled the enum states into distinct values: `quotation_expired` (terminal except for recreation) and `subscription_expired` (eligible for renewal within grace period). Only `subscription_expired` permits the `renew` transition.
- **Reason for Modification:** Eliminates a severe state machine bypass and privilege escalation vulnerability where quotes become active subscriptions without confirmation.
- **Related Module / Section:** `modules/subscriptions`, `state_machine.py`, §7.1, §12.2.
- **Impact of Change:** High. Guarantees lifecycle integrity and ensures sales quotations cannot bypass confirmation.

---

### 2. Implementation Sequence & Dependency Inversion Rectification (Critical)
- **Original Issue:** `IMPLIMENTATION_PLAN.md` (§14) placed Catalogue in Phase 5, Quotations/Subscriptions in Phase 6, and Taxes/Discounts in Phase 7. However, Phase 6 quotation lines and subscription lines mandate snapshotting active tax rules (`tax_id`, `tax_rate`) and calculating quotation price estimates. Phase 6 could not be implemented or tested without Phase 7.
- **Modification Made:** Moved Taxes and Tax Rules from Phase 7 to Phase 5 (now titled: *Phase 5: Catalogue, Taxes, Customers, and Staff*). Phase 6 now implements the pure Pricing Calculator, Discounts, Quotations, and Subscriptions.
- **Reason for Modification:** Resolves a blocking circular dependency in the development roadmap.
- **Related Module / Section:** §14 (Phases 5, 6, 7).
- **Impact of Change:** Critical. Enables linear, test-driven development without placeholder mocks or code refactoring.

---

### 3. Asynchronous Billing Execution Architecture (High)
- **Original Issue:** The blueprint and plan described polling `GET /billing/runs/{id}` on the UI, but the API specification for `POST /billing/run` defined a synchronous response returning `{run_id, due, created, skipped, failed}`. Running billing for 500–5,000 subscriptions takes 30–60 seconds, which triggers HTTP 504 Gateway Timeouts in Nginx and cloud environments.
- **Modification Made:** Refactored `POST /billing/run` to return `HTTP 202 Accepted` immediately with `{run_id, status: "queued"}`. The billing engine executes asynchronously (via FastAPI background task or worker job), updating the `billing_runs` row in PostgreSQL. The frontend polls `GET /billing/runs/{id}` every 2 seconds until `finished` or `failed`.
- **Reason for Modification:** Prevents HTTP connection drops and server worker starvation during batch processing.
- **Related Module / Section:** `modules/billing`, `worker/jobs/billing_job.py`, §11.6, §13.5, P23.
- **Impact of Change:** High. Guarantees stability under large batch runs and matches the UI polling behavior.

---

### 4. Cross-Customer Payment Allocation Security Guard (High)
- **Original Issue:** In the database schema (§12.3), `payment_allocations` had FKs to `payments(id)` and `invoices(id)`. Neither the schema nor the validation prevented a payment belonging to Customer A from being allocated to settle an invoice belonging to Customer B.
- **Modification Made:** Added composite unique constraints on `invoices(id, customer_id)` and `payments(id, customer_id)`, and updated `payment_allocations` to include `customer_id` with composite foreign keys enforcing that both the payment and the invoice share the exact same `customer_id`.
- **Reason for Modification:** Prevents cross-tenant financial data corruption and potential privilege escalation / account credit hijacking.
- **Related Module / Section:** `modules/payments`, `modules/invoices`, §12.3.
- **Impact of Change:** High. Hardens database-level multi-tenant isolation.

---

### 5. ReportLab TrueType UTF-8 & INR (`₹`) Font Embedding (Critical)
- **Original Issue:** Invoice PDF rendering (`pdf.py`, `F-INV-5`) was specified using ReportLab's standard fonts (Helvetica). Standard Type 1 fonts do not include the Indian Rupee symbol (`₹`) or UTF-8 glyphs, triggering fatal `UnicodeEncodeError` exceptions in Python when generating PDFs for Indian customers.
- **Modification Made:** Bundled `DejaVuSans.ttf` in `backend/app/assets/fonts/` and added an application startup hook to register the TrueType font with ReportLab (`pdfmetrics.registerFont`). Configured PDF generators to use `DejaVuSans` as the default font.
- **Reason for Modification:** Avoids server crashes during invoice PDF generation and print views.
- **Related Module / Section:** `modules/invoices/pdf.py`, §10.2, §11.6.
- **Impact of Change:** High. Guarantees reliable PDF generation for Indian currency and international characters.

---

### 6. Billing Anchor Day Preservation on Resume (Medium)
- **Original Issue:** In `IMPLIMENTATION_PLAN.md` (§6, W4 and F-SUB-2), resuming a paused subscription simply added the paused days to `next_billing_date`: `next_billing_date += (today - paused_at)`. If a monthly subscription with anchor day 31 was paused for 10 days, the new billing date became the 10th or 11th, permanently breaking the calendar anchor day.
- **Modification Made:** Updated resume logic: `sub.next_billing_date` is re-anchored to the next occurrence of `billing_anchor_day` following the resume date, clamping to the month's last day (e.g. Feb 28/29) via `add_period`.
- **Reason for Modification:** Preserves contractually agreed billing cycle dates (e.g. 1st or end of month) across pauses and resumes.
- **Related Module / Section:** `modules/subscriptions/service.py`, `billing/dates.py`, §11.4, §11.6.
- **Impact of Change:** Medium. Prevents billing drift in subscription contracts.

---

### 7. Customer Portal Quotation Endpoints Formalization (Medium)
- **Original Issue:** Identified in document conflict C1 and C2: Screen P31 (Browse Plans) required customers to request quotations, and Screen P32 (Quotation Review) required customers to accept them. The original blueprint only had staff-facing `/quotations` endpoints.
- **Modification Made:** Formally defined and documented:
  - `POST /api/v1/me/quotation-requests`: Customer submits plan, quantity, start date; creates Draft subscription.
  - `GET /api/v1/me/quotations/{id}`: Customer views quotation with snapshot lines; returns 404 if not owner.
  - `POST /api/v1/me/quotations/{id}/accept`: Customer accepts quote; moves status to Confirmed.
- **Reason for Modification:** Fulfills the complete customer self-service journey without violating the rule that customers never pass IDs or access administrative endpoints.
- **Related Module / Section:** `modules/quotations/router_me.py`, §13.4, P31, P32.
- **Impact of Change:** Medium. Completes customer self-service quotation flow.

---

### 8. Public Company Settings Endpoint (Medium)
- **Original Issue:** Screen P36 (Customer Portal Invoice Detail) requires displaying company bank details and payment instructions, but `/settings` was restricted to Admin only.
- **Modification Made:** Added `GET /api/v1/settings/public` accessible to all authenticated and anonymous users, exposing company name, billing address, bank transfer details, and payment instructions.
- **Reason for Modification:** Allows customers to see legitimate payment instructions without exposing internal operational toggles.
- **Related Module / Section:** `modules/settings/router.py`, §13.7, P36.
- **Impact of Change:** Low. Provides clean data binding for customer invoice views.

---

### 9. High-Throughput Database Indexes Added (High)
- **Original Issue:** In high-volume tables (100k invoices, 120k payments), several critical foreign keys and filter columns lacked indexes in the blueprint and plan.
- **Modification Made:** Added the following indexes to the migration schema:
  - `invoices(subscription_id)`
  - `payments(customer_id)`
  - `payment_allocations(payment_id)`
  - `subscription_events(subscription_id, created_at DESC)`
- **Reason for Modification:** Prevents sequential table scans during subscription detail loads (P18, P34), customer history queries (P09, P37), and timeline rendering.
- **Related Module / Section:** `modules/invoices`, `modules/payments`, `modules/subscriptions`, §12.4.
- **Impact of Change:** High. Critical for satisfying the `< 2s` page response performance budget.

---

### 10. Mandatory Password Change Enforcement for Staff (Low)
- **Original Issue:** Blueprint P27 noted that staff created by Admin receive a temporary password and must change it on first login. The original plan noted this in text but did not include the database column or API guard.
- **Modification Made:** Added `must_change_password BOOLEAN DEFAULT false` to the `users` table. Added a middleware check: any staff user with `must_change_password=true` is restricted from calling any endpoint other than `/auth/change-password` and `/auth/me`.
- **Reason for Modification:** Enforces secure credential rotation for newly onboarded staff.
- **Related Module / Section:** `modules/users/models.py`, `core/deps.py`, §11.1, §12.3.
- **Impact of Change:** Low. Hardens authentication security posture.
