import React, { useState } from 'react'

export const CataloguePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'plans'>('plans')

  const plans = [
    {
      id: '1',
      name: 'Enterprise Cloud Plan',
      price: '₹1,560',
      period: 'Monthly',
      minQty: 5,
      allowPause: true,
      allowRenew: true,
      allowEarlyClose: true,
      autoCloseOnEnd: true,
      activeSubs: 840
    },
    {
      id: '2',
      name: 'Professional Tier',
      price: '₹899',
      period: 'Monthly',
      minQty: 1,
      allowPause: true,
      allowRenew: true,
      allowEarlyClose: false,
      autoCloseOnEnd: false,
      activeSubs: 312
    },
    {
      id: '3',
      name: 'Starter Growth Pack',
      price: '₹499',
      period: 'Monthly',
      minQty: 1,
      allowPause: false,
      allowRenew: true,
      allowEarlyClose: false,
      autoCloseOnEnd: false,
      activeSubs: 132
    }
  ]

  const products = [
    { id: '1', name: 'Brightloop ERP Core', type: 'Software', salesPrice: '₹1,000', costPrice: '₹400', variants: 3 },
    { id: '2', name: '24/7 Priority Support SLA', type: 'Service', salesPrice: '₹560', costPrice: '₹200', variants: 2 },
    { id: '3', name: 'Automated Tax Compliance Module', type: 'Addon', salesPrice: '₹299', costPrice: '₹50', variants: 1 }
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Catalogue Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure products, variants with price adjustments, and subscription plan lifecycle policies.
          </p>
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'plans'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Subscription Plans ({plans.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'products'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Products & Variants ({products.length})
          </button>
        </div>
      </div>

      {activeTab === 'plans' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#3223d2] bg-indigo-50 px-2.5 py-1 rounded-md">
                      {plan.period}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {plan.activeSubs} Active
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-3">
                    {plan.name}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500">/ license / month</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Lifecycle Policy Flags
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Allow Pause:</span>
                      <span className={`font-semibold ${plan.allowPause ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {plan.allowPause ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Allow Renewal:</span>
                      <span className={`font-semibold ${plan.allowRenew ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {plan.allowRenew ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Allow Early Close:</span>
                      <span className={`font-semibold ${plan.allowEarlyClose ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {plan.allowEarlyClose ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Auto Close on End:</span>
                      <span className={`font-semibold ${plan.autoCloseOnEnd ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {plan.autoCloseOnEnd ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg transition-colors"
                >
                  Edit Plan Policies
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Sales Price</th>
                <th className="py-3 px-4">Cost Price</th>
                <th className="py-3 px-4">Profit Margin</th>
                <th className="py-3 px-4">Variants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md text-[11px]">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#3223d2]">
                    {p.salesPrice}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {p.costPrice}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">
                    +60%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {p.variants} configured
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default CataloguePage
