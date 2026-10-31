import { useState } from 'react';
import { Clock, Download, CheckCircle2, Bell, HelpCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import { QuotationDetailData } from './types';
import { mockQuotationDetail } from './mockData';

interface QuotationReviewProps {
  quotation?: QuotationDetailData;
  onBack?: () => void;
  onAcceptSuccess?: (quotationNumber: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export function QuotationReview({
  quotation = mockQuotationDetail,
  onBack,
  onAcceptSuccess,
  onNavigateTab,
}: QuotationReviewProps) {
  const [currentQuotation, setCurrentQuotation] = useState<QuotationDetailData>(quotation);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    setToastMessage(`Downloading official PDF for ${currentQuotation.quotationNumber}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAccept = () => {
    setCurrentQuotation((prev) => ({
      ...prev,
      status: 'Confirmed',
    }));
    onAcceptSuccess?.(currentQuotation.quotationNumber);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav Links */}
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
                  onClick={() => onNavigateTab?.('home')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigateTab?.('subscriptions')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Subscriptions
                </button>
                <button
                  onClick={() => onNavigateTab?.('invoices')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Invoices
                </button>
                <button
                  onClick={() => onNavigateTab?.('support')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Support
                </button>
                <button
                  onClick={() => onNavigateTab?.('catalogue')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Catalogue
                </button>
                <button
                  onClick={() => onNavigateTab?.('account')}
                  className="py-5 text-indigo-600 font-bold border-b-2 border-indigo-600 transition-colors"
                >
                  Account
                </button>
              </nav>
            </div>

            {/* Right section: Bell, Help, Avatar */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
              </button>

              <button
                type="button"
                className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 pl-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Alex Mercer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span>AM</span>
                </div>
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <div className="font-semibold text-slate-900">Alex Mercer</div>
                  <div className="text-slate-400">Internal Staff</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Validity Countdown Banner */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Valid until {currentQuotation.validUntil}, {currentQuotation.daysLeft} days left
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Please review the quotation details below and confirm acceptance before the expiry date.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              Action Required
            </span>
          </div>
        </div>

        {/* Card 1: Quotation Summary Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {currentQuotation.quotationNumber}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium border ${
                    currentQuotation.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      currentQuotation.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                  ></span>
                  {currentQuotation.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {currentQuotation.description}
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* 4 Column Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-1">
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                QUOTATION REFERENCE
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {currentQuotation.quotationNumber}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                CREATED DATE
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {currentQuotation.createdDate}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                ISSUER
              </div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 mt-1">
                <ShieldCheck className="h-4 w-4 text-indigo-600" />
                <span>{currentQuotation.issuer}</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                TOTAL AMOUNT
              </div>
              <div className="text-xl font-extrabold text-indigo-700 mt-0.5">
                {currentQuotation.totalAmount}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Itemized Quotation Lines */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Section Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Itemized Quotation Lines
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {currentQuotation.lines.length} items
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th scope="col" className="py-3.5 px-6">
                    ITEM DESCRIPTION
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-center">
                    QTY
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-right">
                    UNIT PRICE
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-right">
                    TAX (10%)
                  </th>
                  <th scope="col" className="py-3.5 px-6 text-right">
                    SUBTOTAL
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentQuotation.lines.map((line) => (
                  <tr key={line.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-semibold text-slate-900 tracking-tight">
                        {line.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {line.subtext}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center font-medium text-slate-700">
                      {line.quantity}
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-slate-700">
                      {line.unitPrice}
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-slate-700">
                      {line.tax}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900">
                      {line.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Subtotal, Tax and Grand Total Box */}
          <div className="p-6 bg-slate-50/40 border-t border-slate-100 flex flex-col items-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{currentQuotation.subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>Total Tax</span>
                <span className="font-semibold text-slate-900">{currentQuotation.totalTax}</span>
              </div>
              <div className="border-t border-slate-200/80 my-2" />
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-bold text-slate-900">Total Amount</span>
                <span className="text-xl font-extrabold text-indigo-700">
                  {currentQuotation.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            onClick={onBack}
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          {currentQuotation.status !== 'Confirmed' ? (
            <button
              onClick={handleAccept}
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Accept quotation</span>
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-sm cursor-not-allowed opacity-90"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Quotation Accepted</span>
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <p>© 2026 Brightloop Software • Subscript Hub Customer Portal • Precision Ledger Architecture</p>
      </footer>
    </div>
  );
}
