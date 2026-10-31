export type SubscriptionStatus = 'Active' | 'Paused' | 'Expired' | 'Closed' | 'Cancelled';
export type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Partially Paid' | 'Cancelled';

export interface PortalCustomerProfile {
  name: string;
  portalLabel: string;
  initials: string;
}

export interface PortalSummaryMetrics {
  activeSubscriptions: {
    count: number;
    subtext: string;
  };
  outstanding: {
    amount: string;
    subtext: string;
    hasOverdue: boolean;
  };
  nextPaymentDue: {
    date: string;
    subtext: string;
  };
}

export interface PortalOverdueAlert {
  required: boolean;
  amount: string;
  invoiceId: string;
  message: string;
}

export interface PortalSubscriptionItem {
  id: string;
  tier: string;
  name: string;
  status: SubscriptionStatus;
  nextBillingDate: string;
  amount: string;
  interval: string;
  metaType: 'license' | 'api' | 'other';
  metaText: string;
}

export interface PortalInvoiceItem {
  id: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
  canPay: boolean;
}

export interface PortalDashboardData {
  customer: PortalCustomerProfile;
  metrics: PortalSummaryMetrics;
  alert: PortalOverdueAlert;
  subscriptions: PortalSubscriptionItem[];
  totalSubscriptionsCount: number;
  invoices: PortalInvoiceItem[];
  totalInvoicesCount: number;
}

/* S23-1 Plans Catalogue Types */
export interface CataloguePlanItem {
  id: string;
  category: string;
  badge: {
    text: string;
    variant: 'in-stock' | 'available';
  };
  title: string;
  price: string;
  interval: string;
  minQuantity: number;
  isFeatured?: boolean;
  features: string[];
}

/* S23-2 Quotation Review Types */
export interface QuotationLineItem {
  id: string;
  title: string;
  subtext: string;
  quantity: number;
  unitPrice: string;
  tax: string;
  subtotal: string;
}

export interface QuotationDetailData {
  quotationNumber: string;
  status: 'Pending Review' | 'Confirmed' | 'Expired';
  description: string;
  validUntil: string;
  daysLeft: number;
  createdDate: string;
  issuer: string;
  subtotal: string;
  totalTax: string;
  totalAmount: string;
  lines: QuotationLineItem[];
}

/* S24 Subscription Detail Types */
export interface SubscriptionItemizedLine {
  id: string;
  title: string;
  subtext: string;
  quantity: number;
  unitPrice: string;
  totalAmount: string;
}

export interface SubscriptionInvoiceRecord {
  id: string;
  issueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  amount: string;
}

export interface SubscriptionDetailData {
  id: string;
  title: string;
  status: 'Active' | 'Paused' | 'Closed' | 'Cancelled';
  billingPeriod: string;
  autoRenewal: boolean;
  billingFrequency: string;
  nextInvoiceDate: string;
  customerName: string;
  customerId: string;
  totalAnnualValue: string;
  paymentStatusSummary: string;
  lines: SubscriptionItemizedLine[];
  subtotal: string;
  estimatedTax: string;
  totalAnnual: string;
  invoices: SubscriptionInvoiceRecord[];
  metadata: {
    createdOn: string;
    paymentGateway: string;
    taxExemptStatus: string;
  };
}
