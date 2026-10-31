# Subscript Hub: Frontend Context & Design Foundation (Prompt 0)

> Reference context document for frontend implementation, UI components, and theme rules (Derived from Engineering Blueprint §19.3 & §20).

## 1. Design Tokens & Visual Hierarchy
- **Primary Color**: `indigo-600` (`#4F46E5`), hover `indigo-700` (`#4338CA`), active `indigo-800`.
- **Neutral Palette**: Tailwind `slate` (`slate-50` to `slate-900`).
- **Typography**: Inter (self-hosted via `@fontsource/inter`), fallback `system-ui, -apple-system, sans-serif`.
- **Border Radius**: 8px default (`rounded-lg`), 6px inner (`rounded-md`).
- **Design System Style**: Minimal, crisp border boundaries, clear elevation layers without excessive drop shadows.

## 2. Standard Status Colors Across All Tables & Badges
| Status | Badge Variant | Color Classes |
|---|---|---|
| `Active`, `Paid`, `Confirmed` | Success | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| `Draft`, `Pending` | Neutral / Default | `bg-slate-100 text-slate-700 border-slate-200` |
| `Quotation` | Info | `bg-blue-50 text-blue-700 border-blue-200` |
| `Paused` | Warning | `bg-amber-50 text-amber-700 border-amber-200` |
| `Overdue` | Critical | `bg-rose-50 text-rose-700 border-rose-200` |
| `Closed`, `Cancelled`, `Expired` | Muted / Destructive | `bg-zinc-100 text-zinc-600 border-zinc-200` |

## 3. Shared Components Contract
- `DataTable`: Keyset or offset pagination, sortable headers, bulk actions bar, responsive card view on mobile (< 768px).
- `StatusBadge`: Consistent status chips adhering to the color matrix above.
- `MoneyText`: Currency formatted with exact decimals (`INR` / `₹`). Never format raw numbers without 2 decimal places.
- `EmptyState`: Action-oriented empty state with iconography, title, explanation, and primary call-to-action button.
- `ErrorBanner`: Dismissible alerts mapping API error codes and validation fields.
- `PageHeader`: Title, breadcrumbs, role tag, and primary action buttons.
- `ConfirmDialog`: Modal confirmation for destructive operations (Cancel, Close, Deactivate).
- `RecordPaymentDrawer`: Side sheet component shared across Invoices, Outstanding, and Payments screens.
- `PasswordRules`: Dynamic checklist tracking length, uppercase, lowercase, and special characters.

## 4. Role Navigation Constraints
- **Admin**: Full access to all 37 pages including Settings, Staff Management, Audit Log, and Billing trigger.
- **Staff**: Operational access; read-only on Catalog, Plans, Taxes, and Discounts; forbidden from `/staff`, `/audit-log`, and `/settings`.
- **Customer**: Restricted strictly to `/portal/*` (`P30`–`P37`) and `/me/*` APIs. Never displays back-office sidebar or navigation links.
