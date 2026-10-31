import { useState, type FormEvent } from 'react'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  UserPlus,
  RotateCcw,
} from 'lucide-react'
import { PasswordRules, evaluatePassword } from '../../components/shared/PasswordRules'

interface RegisterPageProps {
  onSuccess?: () => void
  onNavigateLogin?: () => void
}

export const RegisterPage = ({
  onSuccess,
  onNavigateLogin,
}: RegisterPageProps) => {
  const [fullName, setFullName] = useState('Priya Nair')
  const [email, setEmail] = useState('priya.nair@brightloop.io')
  const [password, setPassword] = useState('Password123')
  const [confirmPassword, setConfirmPassword] = useState('Password123')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const [emailError, setEmailError] = useState('An account with this email already exists')
  const [isLoading, setIsLoading] = useState(false)

  const passwordEvaluation = evaluatePassword(password)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (email === 'priya.nair@brightloop.io') {
      setEmailError('An account with this email already exists')
      return
    }

    if (!passwordEvaluation.isValid) {
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (onSuccess) onSuccess()
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#4F46E5] text-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
            <UserPlus className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Get started with Subscript Hub 14-day free trial
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Full name
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Priya Nair"
                className="w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Address */}
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
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError('')
                }}
                placeholder="priya.nair@brightloop.io"
                className={`w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-white border rounded-lg focus:outline-none transition-colors ${
                  emailError
                    ? 'border-rose-400 text-rose-950 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {emailError && (
              <div className="flex items-center space-x-1.5 text-xs text-rose-600 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{emailError}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">
              Password
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Dynamic Password Strength & Rules (Image 2) */}
          <div className="pt-1">
            <PasswordRules password={password} showStrengthBar={true} layout="list" />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-medium text-slate-700">
              Confirm password
            </label>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <RotateCcw className="w-4 h-4" />
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

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 leading-normal cursor-pointer select-none">
              I agree to the{' '}
              <a href="#terms" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 inline-flex items-center justify-center py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors disabled:opacity-60"
          >
            <span>{isLoading ? 'Creating account...' : 'Create account'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </form>

        {/* Link to Sign in */}
        <div className="text-center text-xs text-slate-600 pt-1">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center space-y-1">
        <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Protected by enterprise-grade 256-bit SSL encryption.</span>
        </div>
        <p className="text-xs text-slate-400">
          © 2026 Brightloop Software.
        </p>
      </div>
    </div>
  )
}

