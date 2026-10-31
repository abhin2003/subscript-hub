import { useNavigate } from 'react-router-dom'
import { Search, ArrowLeft, Home, Compass } from 'lucide-react'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
        {/* Top Icon with Blue badge */}
        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
          <Search className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Status badges */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2.5 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            HTTP 404
          </span>
          <span className="text-slate-500 font-mono text-xs">
            ERR-RTE-404
          </span>
        </div>

        {/* Content matching screenshot */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            We could not find that page
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            The requested resource or billing route does not exist in the active production environment.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Go back</span>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1.5" />
            <span>Go to home portal</span>
          </button>
        </div>

        {/* Diagnostic footnote */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-xs text-slate-400">
          <Compass className="w-3.5 h-3.5" />
          <span>Subscript Hub Route Resolver v1.0</span>
        </div>
      </div>
    </div>
  )
}

