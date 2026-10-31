import { useState, type FormEvent } from 'react'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Layers,
} from 'lucide-react'

interface LoginPageProps {
  onSuccess?: () => void
  onNavigateRegister?: () => void
  onNavigateForgot?: () => void
}

export const LoginPage = ({
  onSuccess,
  onNavigateRegister,
  onNavigateForgot,
}: LoginPageProps) => {
  const [email, setEmail] = useState('priya.nair@brightloop.io')
  const [password, setPassword] = useState('supersecretpassword')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(false)
  const [hasError, setHasError] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Demo validation
    setTimeout(() => {
      setIsLoading(false)
      if (email === 'priya.nair@brightloop.io' && password === 'ValidPass123!') {
        setHasError(false)
        if (onSuccess) onSuccess()
      } else {
        setHasError(true)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
        {/* Top Logo / App Badge */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#4338CA] text-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
            <Layers className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Sign in to your account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your credentials to access Subscript Hub
          </p>
        </div>

        {/* Invalid Credentials Error Banner (as in Image 3) */}
        {hasError && (
          <div className="bg-rose-50 border border-rose-200/80 text-rose-900 rounded-lg p-3.5 flex items-center space-x-2.5 text-xs sm:text-sm animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-rose-800 font-normal">
              Invalid email or password. Please try again.
            </span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
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
                  if (hasError) setHasError(false)
                }}
                placeholder="priya.nair@brightloop.io"
                className="w-full pl-9 pr-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={onNavigateForgot}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative rounded-lg shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (hasError) setHasError(false)
                }}
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

          {/* Remember device checkbox */}
          <div className="flex items-center space-x-2 pt-0.5">
            <input
              type="checkbox"
              id="remember-device"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor="remember-device"
              className="text-xs text-slate-600 cursor-pointer select-none"
            >
              Remember this device for 30 days
            </label>
          </div>

          {/* Sign in Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 inline-flex items-center justify-center py-2.5 px-4 bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-colors disabled:opacity-60"
          >
            <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400 font-medium tracking-wide">
              OR
            </span>
          </div>
        </div>

        {/* Link to Register */}
        <div className="text-center text-xs text-slate-600">
          New here?{' '}
          <button
            type="button"
            onClick={onNavigateRegister}
            className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none"
          >
            Create an account
          </button>
        </div>
      </div>

      {/* Security Footer (Image 3) */}
      <div className="mt-8 text-center space-y-1">
        <div className="flex items-center justify-center space-x-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Protected by enterprise-grade 256-bit SSL encryption.</span>
        </div>
        <p className="text-xs text-slate-400">
          © 2026 Brightloop Software. All rights reserved.
        </p>
      </div>
    </div>
  )
}

