import { useNavigate } from 'react-router-dom'
import { FileText, ArrowRight, ArrowLeft, Layers } from 'lucide-react'

export const RecordNotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
        {/* Top Icon with Red badge */}
        <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center mx-auto shadow-2xs">
          <FileText className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Status badges */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            NOT FOUND
          </span>
          <span className="text-slate-500 font-mono text-xs">
            INV-2026-999998
          </span>
        </div>

        {/* Content matching screenshot */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            This invoice could not be found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            INV-2026-999998 may have been deleted, archived, or belongs to a different billing entity.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate('/system-states')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>View all invoices</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Return to billing overview</span>
          </button>
        </div>

        {/* Entity footnote */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-xs text-slate-400">
          <Layers className="w-3.5 h-3.5" />
          <span>Entity Tenant Isolation Verified</span>
        </div>
      </div>
    </div>
  )
}

