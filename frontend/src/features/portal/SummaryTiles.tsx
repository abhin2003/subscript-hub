import { Package, Receipt, Calendar, AlertCircle, Clock } from 'lucide-react';
import { PortalSummaryMetrics } from './types';

interface SummaryTilesProps {
  metrics: PortalSummaryMetrics;
  onTileClick?: (tileKey: string) => void;
}

export function SummaryTiles({
  metrics,
  onTileClick,
}: SummaryTilesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Tile 1: Active Subscriptions */}
      <div
        onClick={() => onTileClick?.('subscriptions')}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Active Subscriptions
          </div>
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Package className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold tracking-tight text-slate-900">
            {metrics.activeSubscriptions.count}
          </div>
          <div className="flex items-center mt-3 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 flex-shrink-0 animate-pulse"></span>
            <span>{metrics.activeSubscriptions.subtext}</span>
          </div>
        </div>
      </div>

      {/* Tile 2: Outstanding */}
      <div
        onClick={() => onTileClick?.('invoices')}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Outstanding
          </div>
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
            <Receipt className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold tracking-tight text-rose-600">
            {metrics.outstanding.amount}
          </div>
          <div className="flex items-center mt-3 text-xs text-rose-600 font-medium">
            <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span>{metrics.outstanding.subtext}</span>
          </div>
        </div>
      </div>

      {/* Tile 3: Next Payment Due */}
      <div
        onClick={() => onTileClick?.('invoices')}
        className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Next Payment Due
          </div>
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-3xl font-bold tracking-tight text-slate-900">
            {metrics.nextPaymentDue.date}
          </div>
          <div className="flex items-center mt-3 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5 mr-1 text-slate-400 flex-shrink-0" />
            <span>{metrics.nextPaymentDue.subtext}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
