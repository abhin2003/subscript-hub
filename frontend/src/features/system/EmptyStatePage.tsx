import { useState } from 'react'
import { FolderOpen, ArrowLeft, RefreshCw, FilePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const EmptyStatePage = () => {
  const navigate = useNavigate()
  const [filterCleared, setFilterCleared] = useState(false)

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Invoices Registry
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live data grid & transaction ledger (Filtered by: Q4 2026, Status: Confirmed/Overdue)
            </p>
          </div>

          <button
            onClick={() => navigate('/system-states')}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Back to Diagnostics</span>
          </button>
        </div>

        {/* Table Container Matching Screenshot */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Contextual Table Empty State Preview
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Example of how empty records appear inside active data grids and transaction logs.
              </p>
            </div>
            <div className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              <span>Interactive Component</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Invoice Identifier</th>
                  <th className="py-3.5 px-6">Customer Entity</th>
                  <th className="py-3.5 px-6">Issue Date</th>
                  <th className="py-3.5 px-6 text-right">Amount</th>
                  <th className="py-3.5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-16 px-6">
                    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100/80 shadow-2xs">
                        <FolderOpen className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-semibold text-slate-900">
                          {filterCleared
                            ? 'All filters reset'
                            : 'No matching invoices in this period'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                          {filterCleared
                            ? 'Showing all available default billing records for the active fiscal cycle.'
                            : 'There are no billing records matching the selected filter criteria for Q4 2026. Try adjusting your date range or search parameters.'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 pt-2">
                        <button
                          onClick={() => setFilterCleared(!filterCleared)}
                          className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                          <span>{filterCleared ? 'Restore Filters' : 'Clear Filters'}</span>
                        </button>
                        <button
                          onClick={() => alert('Opening Create Invoice Drawer...')}
                          className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <FilePlus className="w-3.5 h-3.5 mr-1.5" />
                          <span>Create Invoice</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
