import { useState } from 'react'
import {
  RotateCcw,
  Download,
  FolderOpen,
  CheckCircle2,
} from 'lucide-react'
import { RecordNotFound } from '../../components/shared/RecordNotFound'
import { ErrorBanner } from '../../components/shared/ErrorBanner'

export const SystemStatesPage = () => {
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false)
  const [diagnosticsResult, setDiagnosticsResult] = useState<string | null>(null)
  const [filterCleared, setFilterCleared] = useState(false)

  const handleRunDiagnostics = () => {
    setDiagnosticsRunning(true)
    setDiagnosticsResult(null)
    setTimeout(() => {
      setDiagnosticsRunning(false)
      setDiagnosticsResult('All 4 system health checks passed: PostgreSQL 16 (OK), APScheduler (OK), Mailpit SMTP :1025 (OK), Memory (OK)')
    }, 600)
  }

  const handleExportLogs = () => {
    const logs = [
      '2026-10-31T15:48:00Z [INFO] System boot check completed.',
      '2026-10-31T15:48:12Z [WARN] Billing Run Sync: 420ms latency spike detected in worker queue.',
      '2026-10-31T15:48:20Z [ERROR] Tax calculation mapping: BRIGHTLOOP-IN-02 missing state override; defaulted to standard 18% GST.',
    ].join('\n')

    const blob = new Blob([logs], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `error-diagnostics-${new Date().toISOString().slice(0, 10)}.log`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header & Actions (Image 1) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              System Diagnostics / Error Handling
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              System States & Error Handling
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Standardized error panels and record empty states across the billing platform.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunDiagnostics}
              disabled={diagnosticsRunning}
              className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <RotateCcw className={`w-3.5 h-3.5 mr-2 ${diagnosticsRunning ? 'animate-spin' : ''}`} />
              <span>{diagnosticsRunning ? 'Running...' : 'Run Diagnostics'}</span>
            </button>

            <button
              onClick={handleExportLogs}
              className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              <span>Export Error Logs</span>
            </button>
          </div>
        </div>

        {diagnosticsResult && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 flex items-center space-x-3 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{diagnosticsResult}</span>
          </div>
        )}

        {/* 3 Standardized Error Panels (Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecordNotFound
            type="403"
            codeBadge="ERR-SEC-09"
            title="You do not have access to this page"
            description="This section requires Finance Admin or Billing Manager clearance. Contact your workspace administrator for role elevation."
            actionLabel="Go to my home"
            onAction={() => alert('Navigating to user dashboard...')}
          />

          <RecordNotFound
            type="404"
            codeBadge="ERR-RTE-404"
            title="We could not find that page"
            description="The requested resource or billing route does not exist in the active production environment."
            actionLabel="Go back"
            onAction={() => window.history.back()}
          />

          <RecordNotFound
            type="record-not-found"
            idBadge="INV-2026-999998"
            title="This invoice could not be found"
            description="INV-2026-999998 may have been deleted, archived, or belongs to a different billing entity."
            actionLabel="View all invoices →"
            onAction={() => alert('Opening invoices registry...')}
          />
        </div>

        {/* Contextual Table Empty State Preview (Image 1) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Header of Preview Box */}
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

          {/* Table Container */}
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
                  <td colSpan={5} className="py-12 px-6">
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
                          <span>{filterCleared ? 'Restore Filters' : 'Clear Filters'}</span>
                        </button>
                        <button
                          onClick={() => alert('Opening Create Invoice Drawer...')}
                          className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
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

        {/* Bottom Diagnostic Warning & Failure Banners (Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ErrorBanner
            variant="warning"
            title="Billing Run Sync Warning"
            message="Automated payment gateway synchronization experienced a 420ms latency spike. Transaction logs remain accurate."
          />

          <ErrorBanner
            variant="error"
            title="Tax Calculation Rule Failure"
            message="GST slab mapping failed for entity BRIGHTLOOP-IN-02. Defaulting to standard 18% rate."
          />
        </div>
      </div>
    </div>
  )
}

