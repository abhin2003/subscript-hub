import { useState, type FormEvent } from 'react'
import {
  User,
  Phone,
  Building2,
  Lock,
  Key,
  RotateCcw,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  ShieldCheck,
  Shield,
  Upload,
  Info,
  Save,
} from 'lucide-react'

export const ProfilePage = () => {
  // Account Information State
  const [fullName, setFullName] = useState('Priya Nair')
  const [phone, setPhone] = useState('+91 98765 43210')
  const email = 'priya.nair@brightloop.io'
  const department = 'Finance & Revenue Operations'
  const role = 'Finance Admin'
  const [avatarInitials, setAvatarInitials] = useState('PN')
  const [accountSaved, setAccountSaved] = useState(false)

  // Security & Authentication State
  const [currentPassword, setCurrentPassword] = useState('CurrentP@ss123')
  const [newPassword, setNewPassword] = useState('Brightloop2026')
  const [confirmPassword, setConfirmPassword] = useState('Brightloop2026')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  // Password rules validation
  const minLength = newPassword.length >= 8
  const hasUpper = /[A-Z]/.test(newPassword)
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword)
  const passwordValid = minLength && hasUpper && hasNumber && hasSpecial

  const handleAccountSave = (e: FormEvent) => {
    e.preventDefault()
    setAccountSaved(true)
    setTimeout(() => setAccountSaved(false), 3000)
  }

  const handlePasswordUpdate = (e: FormEvent) => {
    e.preventDefault()
    if (!passwordValid || newPassword !== confirmPassword) return
    setPasswordUpdated(true)
    setTimeout(() => setPasswordUpdated(false), 3000)
  }

  const handleClearPasswordForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Header matching screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your account credentials and security settings
            </p>
          </div>

          <div className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-200 text-indigo-700 text-xs font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Two-Factor Auth Active</span>
          </div>
        </div>

        {/* Success Banners */}
        {accountSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3.5 flex items-center space-x-2.5 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Account information updated successfully.</span>
          </div>
        )}

        {passwordUpdated && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3.5 flex items-center space-x-2.5 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Password updated successfully. Session tokens refreshed.</span>
          </div>
        )}

        {/* Card 1: Account Information */}
        <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 overflow-hidden">
          {/* Subtle Decorative Circle Watermark top right */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-indigo-50/40 pointer-events-none" />

          {/* Card Header & Role Pill Badge */}
          <div className="flex items-start justify-between relative z-10">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Account Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Personal details and system role assigned by organization.
              </p>
            </div>

            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#4F46E5] text-white text-xs font-semibold shadow-2xs">
              {role}
            </div>
          </div>

          {/* Profile Avatar Section */}
          <div className="flex items-center space-x-5 pt-1 relative z-10">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {avatarInitials}
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-2xs" />
            </div>

            <div className="space-y-1.5">
              <div className="text-xs sm:text-sm font-semibold text-slate-900">
                Profile Avatar
              </div>
              <p className="text-xs text-slate-400">
                PNG, JPG or WEBP under 5MB.
              </p>
              <div className="flex items-center space-x-3 pt-0.5">
                <label className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs cursor-pointer">
                  <Upload className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                  <span>Change Avatar</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setAvatarInitials('PN')
                      }
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setAvatarInitials('?')}
                  className="text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Form Fields: 2 Columns */}
          <form onSubmit={handleAccountSave} className="space-y-6 pt-2 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* FULL NAME */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Full Name
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
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* EMAIL ADDRESS (Read-only SSO managed) */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full pl-9 pr-9 py-2.5 text-sm text-slate-700 bg-slate-50/80 border border-slate-200 rounded-lg cursor-not-allowed select-all"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <Info className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Managed via Google Workspace directory SSO.
                </p>
              </div>

              {/* PHONE NUMBER */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* DEPARTMENT */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Department
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    disabled
                    value={department}
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm text-slate-700 bg-indigo-50/30 border border-slate-200 rounded-lg cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Actions Bottom Right */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFullName('Priya Nair')
                  setPhone('+91 98765 43210')
                }}
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-white bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              >
                <Save className="w-4 h-4 mr-1.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: Security & Authentication */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Security & Authentication
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update your password to keep your financial workspace secure.
              </p>
            </div>

            <div className="inline-flex items-center space-x-1.5 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Last changed 42 days ago</span>
            </div>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            {/* 3 Columns: Current, New, Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* CURRENT PASSWORD */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Current Password
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showCurrent ? 'Hide password' : 'Show password'}
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <input
                    type={showNew ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showNew ? 'Hide password' : 'Show password'}
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* CONFIRM NEW PASSWORD */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <div className="relative rounded-lg shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements Box (matching screenshot) */}
            <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Rule 1: length */}
                <div className={`flex items-center space-x-2 ${minLength ? 'text-slate-800' : 'text-slate-500'}`}>
                  {minLength ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span>At least 8 characters long</span>
                </div>

                {/* Rule 2: uppercase */}
                <div className={`flex items-center space-x-2 ${hasUpper ? 'text-slate-800' : 'text-slate-500'}`}>
                  {hasUpper ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span>At least one uppercase letter</span>
                </div>

                {/* Rule 3: number */}
                <div className={`flex items-center space-x-2 ${hasNumber ? 'text-slate-800' : 'text-slate-500'}`}>
                  {hasNumber ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span>At least one number</span>
                </div>

                {/* Rule 4: special */}
                <div className={`flex items-center space-x-2 ${hasSpecial ? 'text-slate-800' : 'text-slate-500'}`}>
                  {hasSpecial ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span>At least one special character</span>
                </div>
              </div>
            </div>

            {/* Actions Bottom Right */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleClearPasswordForm}
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none"
              >
                Clear Form
              </button>

              <button
                type="submit"
                disabled={!passwordValid || newPassword !== confirmPassword}
                className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-2xs focus:outline-none disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5 mr-1.5 text-slate-600" />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
