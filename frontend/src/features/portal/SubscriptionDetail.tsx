import { useState } from 'react';
import {
  Calendar,
  Repeat,
  Building2,
  TrendingUp,
  Pause,
  RefreshCw,
  Plus,
  Search,
  Bell,
  Download,
  ChevronRight,
  XCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { SubscriptionDetailData } from './types';
import { mockSubscriptionDetail } from './mockData';

interface SubscriptionDetailProps {
  subscription?: SubscriptionDetailData;
  onNavigateTab?: (tab: string) => void;
  onNavigateScreen?: (screen: 's22' | 's23-1' | 's23-2' | 's24') => void;
}

export function SubscriptionDetail({
  subscription = mockSubscriptionDetail,
  onNavigateTab,
  onNavigateScreen,
}: SubscriptionDetailProps) {
  const [data, setData] = useState<SubscriptionDetailData>(subscription);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePause = () => {
    if (data.status === 'Active') {
      setData((prev) => ({ ...prev, status: 'Paused' }));
      showToast('Subscription SUB-9842-AX has been paused.');
    } else {
      setData((prev) => ({ ...prev, status: 'Active' }));
      showToast('Subscription SUB-9842-AX has been resumed.');
    }
  };

  const handleRenewEarly = () => {
    showToast('Plan renewed early! Term extended by 12 months.');
  };

  const handleCloseSubscription = () => {
    setData((prev) => ({ ...prev, status: 'Closed' }));
    setShowCloseModal(false);
    showToast('Subscription SUB-9842-AX permanently closed.');
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    showToast(`Downloading official invoice ledger PDF for ${invoiceId}...`);
  };

  const handleAddItem = () => {
    showToast('Add Item modal opened. Selecting add-ons from catalogue...');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Confirmation Modal for Closing */}
      {showCloseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Close Subscription?
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Are you sure you want to permanently close{' '}
              <span className="font-semibold text-slate-900">
                {data.title} ({data.id})
              </span>
              ? Associated API access and tenant infrastructure provisioning will be terminated immediately.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShowCloseModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCloseSubscription}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                Yes, Close Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Header matching Screen 24 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav links */}
            <div className="flex items-center gap-8">
              <div
                className="cursor-pointer"
                onClick={() => onNavigateTab?.('home')}
              >
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Subscript Hub
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <button
                  onClick={() => onNavigateTab?.('overview')}
                  className="py-5 text-slate-600 hover:text-slate-900 border-b-2 border-transparent transition-colors"
                >
                  Overview
                </button>
                <button
                  onClick={() => onNavigateTab?.('sales')}
                  className="py-5 text-indigo-600 font-bold border-b-2 border-indigo-600 transition-colors"
                >
                  Sales
                </button>
                <button
                  onClick={() => onNavigateTab?.('billing')}
                  className="py-5 text-slate-600 hover:text-slate-900 border-b-2 border-transparent transition-colors"
                >
                  Billing
                </button>
                <button
                  onClick={() => onNavigateScreen?.('s23-1')}
                  className="py-5 text-slate-600 hover:text-slate-900 border-b-2 border-transparent transition-colors"
                >
                  Catalogue
                </button>
              </nav>
            </div>

            {/* Right section: Search bar, Create New, Bell, User Profile */}
            <div className="flex items-center gap-3">
              <div className="relative hidden lg:block w-56">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xs"
                />
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create New</span>
              </button>

              <button
                type="button"
                className="relative p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-3 pl-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
                    alt="Alex Morgan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span>AM</span>
                </div>
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <div className="font-semibold text-slate-900">Alex Morgan</div>
                  <div className="text-slate-400">Internal Staff</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-400 gap-2">
          <span className="hover:text-slate-600 cursor-pointer">Sales</span>
          <span>/</span>
          <span className="hover:text-slate-600 cursor-pointer">Subscriptions</span>
          <span>/</span>
          <span className="text-slate-700 font-semibold">{data.id}</span>
        </nav>

        {/* Page Title & Status with Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {data.title}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border ${
                data.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : data.status === 'Paused'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  data.status === 'Active'
                    ? 'bg-emerald-500'
                    : data.status === 'Paused'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
              {data.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePause}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              <Pause className="h-4 w-4 text-slate-700" />
              <span>{data.status === 'Paused' ? 'Resume Subscription' : 'Pause Subscription'}</span>
            </button>

            <button
              onClick={handleRenewEarly}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Renew Plan</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metric Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Current Billing Period */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Current Billing Period</span>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mt-2">
              <Calendar className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span>{data.billingPeriod}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {data.autoRenewal ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
            </div>
          </div>

          {/* Tile 2: Billing Frequency */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Billing Frequency</span>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mt-2">
              <Repeat className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span>{data.billingFrequency}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Next invoice on {data.nextInvoiceDate}
            </div>
          </div>

          {/* Tile 3: Assigned Customer */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Assigned Customer</span>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mt-2">
              <Building2 className="h-4 w-4 text-indigo-600 flex-shrink-0" />
              <span className="truncate">{data.customerName}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              ID: {data.customerId}
            </div>
          </div>

          {/* Tile 4: Total Annual Value */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total Annual Value</span>
            <div className="text-xl font-bold text-slate-900 mt-1">
              {data.totalAnnualValue}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{data.paymentStatusSummary}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Section: Left (Lines & Invoices) vs Right (Manage & Metadata) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card 1: Itemized Subscription Lines */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Itemized Subscription Lines
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Detailed breakdown of active licenses, modules, and flat fees.
                  </p>
                </div>
                <button
                  onClick={handleAddItem}
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  + Add Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      <th scope="col" className="py-3 px-6">
                        ITEM & DESCRIPTION
                      </th>
                      <th scope="col" className="py-3 px-6 text-center">
                        QTY / UNITS
                      </th>
                      <th scope="col" className="py-3 px-6 text-right">
                        UNIT PRICE
                      </th>
                      <th scope="col" className="py-3 px-6 text-right">
                        TOTAL AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {data.lines.map((line) => (
                      <tr key={line.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 max-w-sm">
                          <div className="font-semibold text-slate-900 tracking-tight">
                            {line.title}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {line.subtext}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center font-medium text-slate-700">
                          {line.quantity}
                        </td>
                        <td className="py-4 px-6 text-right font-medium text-slate-700">
                          {line.unitPrice}
                        </td>
                        <td className="py-4 px-6 text-right font-semibold text-slate-900">
                          {line.totalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotal, Tax and Total Annual */}
              <div className="p-6 bg-slate-50/40 border-t border-slate-100 flex flex-col items-end">
                <div className="w-full sm:w-72 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900">{data.subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span>Estimated Tax (0%):</span>
                    <span className="font-semibold text-slate-900">{data.estimatedTax}</span>
                  </div>
                  <div className="border-t border-slate-200/80 my-2" />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-bold text-slate-900">Total Annual:</span>
                    <span className="text-xl font-extrabold text-indigo-700">
                      {data.totalAnnual}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Billing & Invoices */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Billing & Invoices
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Historical ledger records tied specifically to this subscription.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Navigating to full ledger history...')}
                  className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  View All Ledger
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      <th scope="col" className="py-3 px-6">
                        INVOICE ID
                      </th>
                      <th scope="col" className="py-3 px-6">
                        ISSUE DATE
                      </th>
                      <th scope="col" className="py-3 px-6 text-center">
                        STATUS
                      </th>
                      <th scope="col" className="py-3 px-6 text-right">
                        AMOUNT
                      </th>
                      <th scope="col" className="py-3 px-6 text-center">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {data.invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-semibold text-indigo-600 hover:underline cursor-pointer">
                          {inv.id}
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-medium">
                          {inv.issueDate}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-semibold text-slate-900">
                          {inv.amount}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            type="button"
                            onClick={() => handleDownloadInvoice(inv.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
                            title="Download invoice"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Manage Subscription & Metadata */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Header */}
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Manage Subscription
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Execute lifecycle state transitions or administrative closures.
                </p>
              </div>

              {/* Action Rows */}
              <div className="space-y-3">
                {/* 1. Pause Subscription */}
                <div
                  onClick={handleTogglePause}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                      <Pause className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {data.status === 'Paused' ? 'Resume Subscription' : 'Pause Subscription'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {data.status === 'Paused' ? 'Restore billing cycles' : 'Suspend billing temporarily'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>

                {/* 2. Renew Plan Early */}
                <div
                  onClick={handleRenewEarly}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                      <RefreshCw className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Renew Plan Early
                      </div>
                      <div className="text-xs text-slate-500">
                        Extend cycle by 12 months
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>

                {/* 3. Close Subscription */}
                <div
                  onClick={() => setShowCloseModal(true)}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-red-200 bg-red-50/20 hover:bg-red-50/50 hover:border-red-300 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                      <XCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-red-600">
                        Close Subscription
                      </div>
                      <div className="text-xs text-slate-500">
                        Permanently terminate service
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
                </div>
              </div>

              {/* Subscription Metadata */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  Subscription Metadata
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Created On</span>
                    <span className="font-medium text-slate-900">{data.metadata.createdOn}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Payment Gateway</span>
                    <span className="font-medium text-slate-900">{data.metadata.paymentGateway}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Tax Exempt Status</span>
                    <span className="font-medium text-slate-900">{data.metadata.taxExemptStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <p>© 2026 Brightloop Software • Subscript Hub Customer Portal • Precision Ledger Architecture</p>
      </footer>
    </div>
  );
}
