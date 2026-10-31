import { useNavigate } from 'react-router-dom'
import { Lock, Home, ArrowLeft, ShieldAlert } from 'lucide-react'

export const ForbiddenPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
        {/* Top Icon with Amber badge */}
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-2xs">
          <Lock className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Status badges */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            HTTP 403
          </span>
          <span className="text-slate-500 font-mono text-xs">
            ERR-SEC-09
          </span>
        </div>

        {/* Content matching screenshot */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            You do not have access to this page
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            This section requires Finance Admin or Billing Manager clearance. Contact your workspace administrator for role elevation.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate('/login')}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Go to my home</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Return to previous screen</span>
          </button>
        </div>

        {/* Security footnote */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-xs text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Role-Based Access Control Enforced</span>
        </div>
      </div>
    </div>
  )
}

