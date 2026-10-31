import { ShieldCheck, Cpu, ChevronRight } from 'lucide-react';
import { PortalSubscriptionItem } from './types';

interface SubscriptionsOverviewProps {
  subscriptions: PortalSubscriptionItem[];
  totalCount: number;
  onViewAll?: () => void;
  onViewSubscription?: (id: string) => void;
}

export function SubscriptionsOverview({
  subscriptions,
  totalCount,
  onViewAll,
  onViewSubscription,
}: SubscriptionsOverviewProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          Your subscriptions
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View all ({totalCount})
        </button>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Tier + Status */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                  {sub.tier}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {sub.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 mt-1.5 tracking-tight">
                {sub.name}
              </h3>

              {/* Details (Next billing date + Amount) */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    Next billing date
                  </div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">
                    {sub.nextBillingDate}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    Amount
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {sub.amount}
                    <span className="text-xs font-normal text-slate-500 ml-0.5">
                      {sub.interval}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Meta & Action */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                {sub.metaType === 'license' ? (
                  <ShieldCheck className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                ) : (
                  <Cpu className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                )}
                <span>{sub.metaText}</span>
              </div>

              <button
                onClick={() => onViewSubscription?.(sub.id)}
                className="inline-flex items-center gap-0.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-slate-200 transition-colors"
              >
                <span>View</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
