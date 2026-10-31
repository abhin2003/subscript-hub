import { useState, type FormEvent } from 'react'
import {
  Lock,
  Eye,
  EyeOff,
  Key,
  Check,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'

interface ResetPasswordCardProps {
  initialExpired?: boolean
  onSuccess?: () => void
  onRequestNewLink?: () => void
}

export const ResetPasswordCard = ({
  initialExpired = true,
  onSuccess,
  onRequestNewLink,
}: ResetPasswordCardProps) => {
  const [isExpired, setIsExpired] = useState(initialExpired)
  const [newPassword, setNewPassword] = useState('Br!ght2026')
  const [confirmPassword, setConfirmPassword] = useState('Br!ght2026')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Rules matching Image 4
  const minLength = newPassword.length >= 8
  const hasUpper = /[A-Z]/.test(newPassword)
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword)
  const allValid = minLength && hasUpper && hasNumber && hasSpecial

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!allValid || newPassword !== confirmPassword) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
    }, 400)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
      {/* Expired Token Alert Banner (Image 4) */}
      {isExpired && (
        <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-4 space-y-3">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-rose-950">
                Link expired
              </div>
              <div className="text-xs text-rose-800 leading-relaxed">
                This link is invalid or has expired. Please generate a new recovery attempt.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onRequestNewLink) onRequestNewLink()
              else setIsExpired(false)
            }}
            className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            <span>Request a new link</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto shadow-2xs">
          <Key className="w-6 h-6 stroke-[2]" />
        </div>
        <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
          Credential Update
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Set a new password
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Create a secure password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            New password
          </label>
          <div className="relative rounded-lg shadow-2xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showNewPassword ? 'text' : 'password'}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            >
              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-slate-700">
            Confirm password
          </label>
          <div className="relative rounded-lg shadow-2xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Requirements Box (Image 4) */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Password Requirements
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className={`flex items-center space-x-2 ${minLength ? 'text-slate-800' : 'text-slate-500'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${minLength ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'border border-slate-300'}`}>
                {minLength && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
              </div>
              <span className="text-[12px]">At least 8 characters</span>
            </div>

            <div className={`flex items-center space-x-2 ${hasUpper ? 'text-slate-800' : 'text-slate-500'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${hasUpper ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'border border-slate-300'}`}>
                {hasUpper && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
              </div>
              <span className="text-[12px]">One uppercase letter</span>
            </div>

            <div className={`flex items-center space-x-2 ${hasNumber ? 'text-slate-800' : 'text-slate-500'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${hasNumber ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'border border-slate-300'}`}>
                {hasNumber && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
              </div>
              <span className="text-[12px]">One number</span>
            </div>

            <div className={`flex items-center space-x-2 ${hasSpecial ? 'text-slate-800' : 'text-slate-500'}`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${hasSpecial ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'border border-slate-300'}`}>
                {hasSpecial && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
              </div>
              <span className="text-[12px]">One special character</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !allValid}
          className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors disabled:opacity-50"
        >
          <span>{isLoading ? 'Updating...' : 'Set new password'}</span>
          <Check className="w-4 h-4 ml-1.5" />
        </button>
      </form>
    </div>
  )
}

export const ResetPasswordPage = (props: ResetPasswordCardProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[480px]">
        <ResetPasswordCard {...props} />
      </div>
    </div>
  )
}

