import React from 'react'
import { FileDown } from 'lucide-react'

export const ReportsPage: React.FC = () => {
  const reportsList = [
    { title: 'Monthly Recurring Revenue (MRR) Ledger', period: 'Last 12 Months', format: 'CSV / JSON', size: '142 KB' },
    { title: 'Accounts Receivable Aging Summary (30-60-90 Days)', period: 'As of Today', format: 'CSV / PDF', size: '89 KB' },
    { title: 'Customer Churn & Subscription Lifecycle Transition Report', period: 'FY 2023-24', format: 'CSV', size: '215 KB' },
    { title: 'Tax Collection & GST Return Compliance Breakdown', period: 'Q4 FY 2024', format: 'CSV / GSTR-1', size: '310 KB' }
  ]

  const handleExport = (title: string) => {
    alert(`Exporting ${title} in CSV format with exact 2-decimal precision...`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Financial Reports & Reconciliation
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Export structured reconciliation ledgers and statutory tax filing statements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportsList.map((r) => (
          <div key={r.title} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#3223d2] bg-indigo-50 px-2 py-0.5 rounded-md">
                  {r.format}
                </span>
                <span className="text-xs text-slate-400">{r.size}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-3">{r.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Report interval: {r.period}</p>
            </div>

            <button
              type="button"
              onClick={() => handleExport(r.title)}
              className="w-full py-2 bg-slate-50 hover:bg-[#3223d2] hover:text-white border border-slate-200 hover:border-[#3223d2] text-xs font-bold text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download Streaming CSV</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ReportsPage
