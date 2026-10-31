import { useState } from 'react';
import { X, CheckCircle, Calculator } from 'lucide-react';
import { CataloguePlanItem } from './types';

interface RequestQuotationModalProps {
  plan: CataloguePlanItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { planId: string; quantity: number; startDate: string; notes: string }) => void;
}

export function RequestQuotationModal({
  plan,
  isOpen,
  onClose,
  onSubmit,
}: RequestQuotationModalProps) {
  if (!isOpen || !plan) return null;

  const [quantity, setQuantity] = useState<number>(plan.minQuantity);
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Extract numeric unit price from string (e.g. "₹1,560" -> 1560)
  const numericPrice = parseInt(plan.price.replace(/[^0-9]/g, ''), 10) || 0;
  const estimatedSubtotal = quantity * numericPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < plan.minQuantity) {
      setError(`Minimum quantity for ${plan.title} is ${plan.minQuantity} units.`);
      return;
    }
    setError(null);
    onSubmit({
      planId: plan.id,
      quantity,
      startDate,
      notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
              {plan.category}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              Request Quotation: {plan.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Customized terms and volume pricing issued by Brightloop Software.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          {/* Plan Summary Box */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500">Base Rate:</span>{' '}
              <span className="font-bold text-slate-900">{plan.price} / unit / mo</span>
            </div>
            <div>
              <span className="text-slate-500">Minimum:</span>{' '}
              <span className="font-semibold text-slate-700">{plan.minQuantity} units</span>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Quantity / Seats
            </label>
            <input
              type="number"
              min={plan.minQuantity}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setQuantity(val);
                if (val >= plan.minQuantity) setError(null);
              }}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Must be at least {plan.minQuantity} units per plan policy.
            </p>
          </div>

          {/* Desired Start Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Desired Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Notes / Special Requirements */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Special Requirements / Deployment Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Need priority onboarding, multi-region routing, or dedicated VPC connector."
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Estimated Monthly Subtotal Preview */}
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-900">
              <Calculator className="h-4 w-4 text-indigo-600" />
              <span>Estimated Monthly Base:</span>
            </div>
            <div className="text-base font-bold text-indigo-700">
              ₹{estimatedSubtotal.toLocaleString('en-IN')}.00
              <span className="text-xs font-normal text-indigo-500"> /mo</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
