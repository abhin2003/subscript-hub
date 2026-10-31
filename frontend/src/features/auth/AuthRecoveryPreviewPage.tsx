import { Shield } from 'lucide-react'
import { ForgotPasswordCard } from './ForgotPasswordPage'
import { ResetPasswordCard } from './ResetPasswordPage'

export const AuthRecoveryPreviewPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header & TLS 1.3 Badge (Image 4) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Forgot & Reset Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Authentication & Recovery Flow Preview
            </p>
          </div>

          <div className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure TLS 1.3</span>
          </div>
        </div>

        {/* Two side-by-side cards (Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ForgotPasswordCard />
          <ResetPasswordCard />
        </div>
      </div>
    </div>
  )
}

