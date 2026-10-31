import type { ReactNode } from 'react'
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react'

export type BannerVariant = 'error' | 'warning' | 'info' | 'success'

export interface ErrorBannerProps {
  title?: string
  message: string
  variant?: BannerVariant
  onClose?: () => void
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

interface BannerStyle {
  container: string
  icon: ReactNode
  titleColor: string
  messageColor: string
}

const stylesMap: Record<BannerVariant, BannerStyle> = {
  error: {
    container: 'bg-rose-50 border-rose-200 text-rose-900',
    icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
    titleColor: 'text-rose-950 font-semibold',
    messageColor: 'text-rose-800',
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
    titleColor: 'text-amber-950 font-semibold',
    messageColor: 'text-amber-800',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    titleColor: 'text-blue-950 font-semibold',
    messageColor: 'text-blue-800',
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    titleColor: 'text-emerald-950 font-semibold',
    messageColor: 'text-emerald-800',
  },
}

export const ErrorBanner = ({
  title,
  message,
  variant = 'error',
  onClose,
  action,
  className = '',
}: ErrorBannerProps) => {
  const styles = stylesMap[variant] || stylesMap.error

  return (
    <div
      className={`rounded-lg border p-4 flex items-start justify-between space-x-3 transition-all ${styles.container} ${className}`}
    >
      <div className="flex items-start space-x-3">
        {styles.icon}
        <div className="text-sm space-y-0.5">
          {title && <div className={`${styles.titleColor} text-sm font-semibold`}>{title}</div>}
          <div className={`${styles.messageColor} text-xs leading-relaxed`}>{message}</div>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-xs font-medium underline underline-offset-2 hover:opacity-80 transition-opacity block"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
