import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PortalInvoiceItem } from './types';

interface LatestInvoicesTableProps {
  invoices: PortalInvoiceItem[];
  totalInvoicesCount: number;
  onPayNow?: (invoiceId: string) => void;
  onViewInvoice?: (invoiceId: string) => void;
  onDownloadInvoice?: (invoiceId: string) => void;
  onFilterClick?: () => void;
  onSortClick?: () => void;
}

export function LatestInvoicesTable({
  invoices,
  totalInvoicesCount,
  onPayNow,
  onViewInvoice,
  onDownloadInvoice,
  onFilterClick,
  onSortClick,
}: LatestInvoicesTableProps) {
  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Latest invoices
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing recent billing history and status records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onFilterClick}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
          <button
            onClick={onSortClick}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-500" />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* Invoices Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th scope="col" className="py-3.5 px-6">
                  Invoice ID
                </th>
                <th scope="col" className="py-3.5 px-6">
                  Date
                </th>
                <th scope="col" className="py-3.5 px-6">
                  Amount
                </th>
                <th scope="col" className="py-3.5 px-6">
                  Status
                </th>
                <th scope="col" className="py-3.5 px-6 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="py-4 px-6 font-semibold text-slate-900 tracking-tight">
                    {inv.id}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {inv.date}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    {inv.amount}
                  </td>
                  <td className="py-4 px-6">
                    {inv.status === 'Overdue' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Overdue
                      </span>
                    ) : inv.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {inv.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    <div className="flex items-center justify-end gap-3">
                      {inv.canPay ? (
                        <button
                          onClick={() => onPayNow?.(inv.id)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button
                          onClick={() => onViewInvoice?.(inv.id)}
                          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          View
                        </button>
                      )}
                      <button
                        onClick={() => onDownloadInvoice?.(inv.id)}
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="py-3 px-6 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-medium text-slate-700">{invoices.length}</span> of{' '}
            <span className="font-medium text-slate-700">{totalInvoicesCount}</span> invoices
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-300 cursor-not-allowed font-medium"
            >
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
