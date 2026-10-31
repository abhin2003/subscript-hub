import { Check, Circle } from 'lucide-react'

export interface PasswordCriteria {
  label: string
  valid: boolean
}

export function evaluatePassword(password: string, includeNumber = false) {
  const minLength = password.length > 8
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  let score = 0
  if (minLength) score++
  if (hasUpper) score++
  if (hasLower) score++
  if (hasSpecial) score++
  if (includeNumber && hasNumber) score++

  const maxScore = includeNumber ? 5 : 4
  const pct = Math.min(100, Math.round((score / maxScore) * 100))

  let strength: 'Weak' | 'Medium' | 'Strong' = 'Weak'
  let color = 'bg-red-500'
  let textColor = 'text-red-600'

  if (score >= 4) {
    strength = 'Strong'
    color = 'bg-emerald-600'
    textColor = 'text-emerald-700'
  } else if (score >= 2) {
    strength = 'Medium'
    color = 'bg-emerald-600'
    textColor = 'text-emerald-700'
  }

  const rules: PasswordCriteria[] = [
    { label: 'More than 8 characters', valid: minLength },
    { label: 'One uppercase letter', valid: hasUpper },
    { label: 'One lowercase letter', valid: hasLower },
    ...(includeNumber ? [{ label: 'One number', valid: hasNumber }] : []),
    { label: 'One special character', valid: hasSpecial },
  ]

  const isValid = minLength && hasUpper && hasLower && hasSpecial && (!includeNumber || hasNumber)

  return {
    score,
    pct,
    strength,
    color,
    textColor,
    rules,
    isValid,
  }
}

interface PasswordRulesProps {
  password: string
  showStrengthBar?: boolean
  includeNumber?: boolean
  layout?: 'list' | 'grid'
}

export const PasswordRules = ({
  password,
  showStrengthBar = true,
  includeNumber = false,
  layout = 'list',
}: PasswordRulesProps) => {
  const { strength, pct, color, rules } = evaluatePassword(password, includeNumber)

  return (
    <div className="space-y-3">
      {showStrengthBar && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-normal">Password strength</span>
            <span className="font-medium text-slate-700">{strength}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${color}`}
              style={{ width: `${password.length > 0 ? Math.max(pct, 15) : 0}%` }}
            />
          </div>
        </div>
      )}

      <div
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs'
            : 'space-y-2 text-xs'
        }
      >
        {rules.map((rule, idx) => (
          <div
            key={idx}
            className={`flex items-center space-x-2 transition-colors ${
              rule.valid ? 'text-slate-700' : 'text-slate-500'
            }`}
          >
            {rule.valid ? (
              <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0">
                <Circle className="w-1.5 h-1.5 fill-transparent text-transparent" />
              </div>
            )}
            <span className="text-[13px] leading-tight">{rule.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

