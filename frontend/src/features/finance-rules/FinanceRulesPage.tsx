import React, { useState } from 'react'
import { Plus } from 'lucide-react'

export const FinanceRulesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'taxes' | 'discounts'>('taxes')

  const taxes = [
    { id: '1', name: 'Standard GST 18%', rate: 18, scope: 'All Products', priority: 1, isInclusive: false, status: 'Active' },
    { id: '2', name: 'Software Concessional GST 12%', rate: 12, scope: 'Type: Software', priority: 2, isInclusive: false, status: 'Active' },
    { id: '3', name: 'Essential Services GST 5%', rate: 5, scope: 'Type: Service', priority: 3, isInclusive: false, status: 'Active' },
    { id: '4', name: 'Export / SEZ Zero Tax', rate: 0, scope: 'Tax Exempt', priority: 10, isInclusive: false, status: 'Active' }
  ]

  const discounts = [
    {
      id: '1',
      code: 'WELCOME10',
      type: 'Percentage (10%)',
      minPurchase: '₹5,000',
      maxUsage: 1000,
      usageCount: 284,
      status: 'Active'
    },
    {
      id: '2',
      code: 'ANNUAL5000',
      type: 'Fixed (₹5,000)',
      minPurchase: '₹50,000',
      maxUsage: 100,
      usageCount: 82,
      status: 'Active'
    },
    {
      id: '3',
      code: 'STARTUP25',
      type: 'Percentage (25%)',
      minPurchase: '₹10,000',
      maxUsage: 50,
      usageCount: 50,
      status: 'Exhausted'
    }
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Finance & Tax Rules
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure jurisdiction tax rules with priority hierarchy and administrative discount limits.
          </p>
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('taxes')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'taxes'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Taxes & Tax Rules ({taxes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('discounts')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'discounts'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Discount Coupons ({discounts.length})
          </button>
        </div>
      </div>

      {activeTab === 'taxes' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Tax Rule Evaluation Cascade (Evaluated High to Low Priority)
            </h2>
            <button
              type="button"
              className="text-xs font-bold text-white bg-[#3223d2] hover:bg-[#281bb0] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Tax Rule
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Tax Name</th>
                <th className="py-3 px-4">Rate (%)</th>
                <th className="py-3 px-4">Scope</th>
                <th className="py-3 px-4">Priority Rank</th>
                <th className="py-3 px-4">Inclusive?</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {taxes.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {t.name}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#3223d2]">
                    {t.rate}%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {t.scope}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    Priority #{t.priority}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {t.isInclusive ? 'Yes' : 'Exclusive (Add-on)'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'discounts' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {discounts.map((d) => {
              const usagePercent = Math.round((d.usageCount / d.maxUsage) * 100)
              return (
                <div key={d.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm bg-indigo-50 text-[#3223d2] px-2.5 py-1 rounded-md border border-indigo-200">
                      {d.code}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      d.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <div>
                    <div className="text-base font-bold text-slate-900">{d.type}</div>
                    <div className="text-xs text-slate-500">Min. purchase: {d.minPurchase}</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Usage Limit:</span>
                      <span>{d.usageCount} / {d.maxUsage} ({usagePercent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          usagePercent >= 100 ? 'bg-rose-500' : 'bg-[#3223d2]'
                        }`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
export default FinanceRulesPage
