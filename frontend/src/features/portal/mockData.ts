import { PortalDashboardData, CataloguePlanItem, QuotationDetailData, SubscriptionDetailData } from './types';

export const mockPortalData: PortalDashboardData = {
  customer: {
    name: "Sharma Traders",
    portalLabel: "Customer Portal",
    initials: "ST",
  },
  metrics: {
    activeSubscriptions: {
      count: 2,
      subtext: "All systems operational",
    },
    outstanding: {
      amount: "₹5,283.60",
      subtext: "1 invoice past due",
      hasOverdue: true,
    },
    nextPaymentDue: {
      date: "12 Dec 2026",
      subtext: "Auto-debit disabled",
    },
  },
  alert: {
    required: true,
    amount: "₹5,283.60",
    invoiceId: "INV-2026-8842",
    message: "You have an overdue invoice of ₹5,283.60. Please clear dues to avoid service disruption.",
  },
  subscriptions: [
    {
      id: "sub_01",
      tier: "ENTERPRISE TIER",
      name: "Cloud ERP Standard Suite",
      status: "Active",
      nextBillingDate: "12 Dec 2026",
      amount: "₹12,450.00",
      interval: "/mo",
      metaType: "license",
      metaText: "License: 15 Seats assigned",
    },
    {
      id: "sub_02",
      tier: "ADD-ON MODULE",
      name: "Advanced Analytics & BI Connector",
      status: "Active",
      nextBillingDate: "18 Dec 2026",
      amount: "₹4,200.00",
      interval: "/mo",
      metaType: "api",
      metaText: "API Rate Limit: 50k req/hr",
    },
  ],
  totalSubscriptionsCount: 2,
  invoices: [
    {
      id: "INV-2026-8842",
      date: "28 Nov 2026",
      amount: "₹5,283.60",
      status: "Overdue",
      canPay: true,
    },
    {
      id: "INV-2026-8109",
      date: "28 Oct 2026",
      amount: "₹16,650.00",
      status: "Paid",
      canPay: false,
    },
    {
      id: "INV-2026-7531",
      date: "28 Sep 2026",
      amount: "₹16,650.00",
      status: "Paid",
      canPay: false,
    },
  ],
  totalInvoicesCount: 24,
};

/* S23-1: Plans Catalogue Mock Data */
export const mockCataloguePlans: CataloguePlanItem[] = [
  {
    id: "plan_node_01",
    category: "CORE INFRASTRUCTURE",
    badge: {
      text: "In Stock",
      variant: "in-stock",
    },
    title: "Standard Cloud Node",
    price: "₹1,560",
    interval: "per month",
    minQuantity: 5,
    isFeatured: false,
    features: [
      "Automated Daily Reconciliation",
      "Multi-currency Ledger Support",
      "99.9% Uptime SLA Guarantee",
    ],
  },
  {
    id: "plan_billing_suite",
    category: "ENTERPRISE ENGINE",
    badge: {
      text: "In Stock",
      variant: "in-stock",
    },
    title: "High-Frequency Billing Suite",
    price: "₹4,890",
    interval: "per month",
    minQuantity: 10,
    isFeatured: true,
    features: [
      "Real-time Event Streaming Pipeline",
      "Advanced Tax Compliance Engines",
      "Dedicated Technical Account Manager",
    ],
  },
  {
    id: "plan_bi_pro",
    category: "ANALYTICS & INSIGHTS",
    badge: {
      text: "Available",
      variant: "available",
    },
    title: "Revenue Intelligence Pro",
    price: "₹2,450",
    interval: "per month",
    minQuantity: 1,
    isFeatured: false,
    features: [
      "Predictive Churn Analytics",
      "Customizable Executive Dashboards",
      "Automated Cohort Retention Reports",
    ],
  },
];

/* S23-2: Quotation Review Mock Data */
export const mockQuotationDetail: QuotationDetailData = {
  quotationNumber: "QUO-2026-9901",
  status: "Pending Review",
  description: "Reviewing line items and terms issued by Brightloop Software.",
  validUntil: "20 Nov 2026",
  daysLeft: 5,
  createdDate: "15 Nov 2026",
  issuer: "Brightloop Software",
  subtotal: "$14,150.00",
  totalTax: "$700.00",
  totalAmount: "$14,850.00",
  lines: [
    {
      id: "line_01",
      title: "Subscript Hub Enterprise License (Annual)",
      subtext: "Includes unlimited API access, audit logs, and priority tenant routing.",
      quantity: 10,
      unitPrice: "$1,200.00",
      tax: "$1,200.00",
      subtotal: "$12,000.00",
    },
    {
      id: "line_02",
      title: "Dedicated Compliance Security Add-on",
      subtext: "SOC2 Type II continuous monitoring packages and compliance reports.",
      quantity: 1,
      unitPrice: "$1,500.00",
      tax: "$150.00",
      subtotal: "$1,500.00",
    },
    {
      id: "line_03",
      title: "Priority Implementation & Data Migration",
      subtext: "White-glove onboarding and historic billing reconciliation support.",
      quantity: 1,
      unitPrice: "$650.00",
      tax: "$65.00",
      subtotal: "$650.00",
    },
  ],
};

/* S24: Subscription Detail Mock Data */
export const mockSubscriptionDetail: SubscriptionDetailData = {
  id: "SUB-9842-AX",
  title: "Enterprise Cloud Suite - Annual",
  status: "Active",
  billingPeriod: "Oct 12, 2023 - Oct 12, 2024",
  autoRenewal: true,
  billingFrequency: "Annual Billing (Net 30)",
  nextInvoiceDate: "Sep 15, 2024",
  customerName: "Acme Corporation Ltd.",
  customerId: "CUST-88310",
  totalAnnualValue: "$24,500.00",
  paymentStatusSummary: "Fully paid for current cycle",
  lines: [
    {
      id: "sub_line_01",
      title: "Enterprise Core License",
      subtext: "Primary cloud server infrastructure allocation",
      quantity: 1,
      unitPrice: "$18,000.00",
      totalAmount: "$18,000.00",
    },
    {
      id: "sub_line_02",
      title: "Advanced Analytics Add-on",
      subtext: "Real-time telemetry and custom reporting stream",
      quantity: 5,
      unitPrice: "$900.00",
      totalAmount: "$4,500.00",
    },
    {
      id: "sub_line_03",
      title: "Dedicated Support SLA (24/7)",
      subtext: "Priority ticket resolution and assigned engineer",
      quantity: 1,
      unitPrice: "$2,000.00",
      totalAmount: "$2,000.00",
    },
  ],
  subtotal: "$24,500.00",
  estimatedTax: "$0.00",
  totalAnnual: "$24,500.00",
  invoices: [
    {
      id: "INV-2023-8841",
      issueDate: "Oct 12, 2023",
      status: "Paid",
      amount: "$24,500.00",
    },
    {
      id: "INV-2022-4910",
      issueDate: "Oct 12, 2022",
      status: "Paid",
      amount: "$22,000.00",
    },
  ],
  metadata: {
    createdOn: "Oct 12, 2021",
    paymentGateway: "Stripe Billing (cus_9918)",
    taxExemptStatus: "Verified Non-Taxable",
  },
};
