import { AlertTriangle, ArrowRight } from 'lucide-react';
import { PortalOverdueAlert } from './types';

interface OverdueAlertBannerProps {
  alert: PortalOverdueAlert;
  onViewInvoice?: (invoiceId: string) => void;
}

export function OverdueAlertBanner({
  alert,
  onViewInvoice,
}: OverdueAlertBannerProps) {
  if (!alert.required) return null;

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all animate-in fade-in duration-200">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-950">
            Payment Required
          </h4>
          <p className="text-xs sm:text-sm text-rose-800 mt-0.5">
            {alert.message}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={() => onViewInvoice?.(alert.invoiceId)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <span>View invoice</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
