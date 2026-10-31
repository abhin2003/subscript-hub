import { useState, type FormEvent } from 'react'
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  Info,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react'

interface ForgotPasswordCardProps {
  onNavigateLogin?: () => void
  onSuccess?: () => void
}

export const ForgotPasswordCard = ({
  onNavigateLogin,
  onSuccess,
}: ForgotPasswordCardProps) => {
  const [email, setEmail] = useState('priya.nair@brightloop.io')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      if (onSuccess) onSuccess()
    }, 400)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header with circular recovery badge */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto shadow-2xs">
            <RotateCcw className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
            Account Recovery
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Forgot password
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Enter your registered email to receive a secure recovery link.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="text-sm font-semibold text-emerald-950">
              Check your inbox
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              If an account exists for <span className="font-semibold">{email}</span>, a
              password reset link has been dispatched to Mailpit.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Email address
              </label>
              <div className="relative rounded-lg shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya.nair@brightloop.io"
                  className="w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors disabled:opacity-60"
            >
              <span>{isLoading ? 'Sending...' : 'Send reset link'}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </form>
        )}

        {/* Back to sign in */}
        <div className="text-center">
          <button
            type="button"
            onClick={onNavigateLogin}
            className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Back to sign in</span>
          </button>
        </div>
      </div>

      {/* Expiry Note Banner */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center space-x-2 text-xs text-slate-500 mt-4">
        <Info className="w-4 h-4 text-slate-400 shrink-0" />
        <span>Links expire automatically after 30 minutes for security purposes.</span>
      </div>
    </div>
  )
}

export const ForgotPasswordPage = (props: ForgotPasswordCardProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[440px]">
        <ForgotPasswordCard {...props} />
      </div>
    </div>
  )
}

