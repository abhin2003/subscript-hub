import type { ReactNode } from 'react'
import { Lock, Search, FileText, ArrowLeft, ArrowRight, Home } from 'lucide-react'

export type ErrorCardType = '403' | '404' | 'record-not-found'

export interface RecordNotFoundProps {
  type?: ErrorCardType
  codeBadge?: string
  idBadge?: string
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
  className?: string
}

interface ErrorCardConfig {
  iconBg: string
  icon: ReactNode
  statusBadge: string
  statusText: string
  defaultCode: string
  defaultTitle: string
  defaultDesc: string
  defaultAction: string
  buttonClass: string
}

const configsMap: Record<ErrorCardType, ErrorCardConfig> = {
  '403': {
    iconBg: 'bg-amber-50 border-amber-200 text-amber-600',
    icon: <Lock className="w-5 h-5" />,
    statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    statusText: 'HTTP 403',
    defaultCode: 'ERR-SEC-09',
    defaultTitle: 'You do not have access to this page',
    defaultDesc:
      'This section requires Finance Admin or Billing Manager clearance. Contact your workspace administrator for role elevation.',
    defaultAction: 'Go to my home',
    buttonClass:
      'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm',
  },
  '404': {
    iconBg: 'bg-blue-50 border-blue-200 text-blue-600',
    icon: <Search className="w-5 h-5" />,
    statusBadge: 'bg-blue-50 text-blue-700 border-blue-200',
    statusText: 'HTTP 404',
    defaultCode: 'ERR-RTE-404',
    defaultTitle: 'We could not find that page',
    defaultDesc:
      'The requested resource or billing route does not exist in the active production environment.',
    defaultAction: 'Go back',
    buttonClass:
      'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-sm',
  },
  'record-not-found': {
    iconBg: 'bg-rose-50 border-rose-200 text-rose-500',
    icon: <FileText className="w-5 h-5" />,
    statusBadge: 'bg-rose-50 text-rose-700 border-rose-200',
    statusText: 'NOT FOUND',
    defaultCode: 'INV-2026-999998',
    defaultTitle: 'This invoice could not be found',
    defaultDesc:
      'INV-2026-999998 may have been deleted, archived, or belongs to a different billing entity.',
    defaultAction: 'View all invoices →',
    buttonClass:
      'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 shadow-sm',
  },
}

export const RecordNotFound = ({
  type = 'record-not-found',
  codeBadge,
  idBadge,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = '',
}: RecordNotFoundProps) => {
  const configs = configsMap[type] || configsMap['record-not-found']

  const displayTitle = title || configs.defaultTitle
  const displayDesc = description || configs.defaultDesc
  const displayAction = actionLabel || configs.defaultAction
  const displayCode = idBadge || codeBadge || configs.defaultCode

  const renderButton = () => {
    const content = (
      <>
        {type === '403' && <Home className="w-3.5 h-3.5 mr-1.5" />}
        {type === '404' && <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />}
        <span>{displayAction}</span>
        {type === 'record-not-found' && <ArrowRight className="w-3.5 h-3.5 ml-1.5" />}
      </>
    )

    if (actionHref) {
      return (
        <a
          href={actionHref}
          className={`w-full inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${configs.buttonClass}`}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        onClick={onAction}
        className={`w-full inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${configs.buttonClass}`}
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-6 ${className}`}
    >
      <div className="space-y-4">
        <div className="w-10 h-10 rounded-xl border flex items-center justify-center shadow-xs">
          <div
            className={`w-full h-full rounded-xl flex items-center justify-center ${configs.iconBg}`}
          >
            {configs.icon}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium tracking-wide">
          <span
            className={`px-2 py-0.5 rounded-md border font-semibold ${configs.statusBadge}`}
          >
            {configs.statusText}
          </span>
          <span className="text-slate-500 font-mono text-[11px]">{displayCode}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
            {displayTitle}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">{displayDesc}</p>
        </div>
      </div>

      <div className="pt-2">{renderButton()}</div>
    </div>
  )
}
