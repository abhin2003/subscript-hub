import React, { useState } from 'react'
import {
  Search,
  Plus,
  Play,
  Pause,
  XCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react'

interface SubscriptionItem {
  id: string
  number: string
  customer: string
  plan: string
  status: 'active' | 'paused' | 'quotation' | 'confirmed' | 'closed' | 'subscription_expired'
  startDate: string
  nextBilling: string
  amount: string
  anchorDay: number
}

const initialSubscriptions: SubscriptionItem[] = [
  {
    id: '1',
    number: 'SUB-2024-001284',
    customer: 'Acme Corp India',
    plan: 'Enterprise Cloud Plan',
    status: 'active',
    startDate: '2024-01-15',
    nextBilling: '2024-04-15',
    amount: '₹7,800/mo',
    anchorDay: 15
  },
  {
    id: '2',
    number: 'SUB-2024-001283',
    customer: 'Zenith Tech Solutions',
    plan: 'Professional Tier',
    status: 'paused',
    startDate: '2023-11-01',
    nextBilling: '2024-05-01',
    amount: '₹4,495/mo',
    anchorDay: 1
  },
  {
    id: '3',
    number: 'SUB-2024-001282',
    customer: 'Global Logistics Pvt',
    plan: 'Enterprise Cloud Plan',
    status: 'active',
    startDate: '2023-09-20',
    nextBilling: '2024-04-20',
    amount: '₹15,600/mo',
    anchorDay: 20
  },
  {
    id: '4',
    number: 'SUB-2024-001281',
    customer: 'Nexus Retail Chain',
    plan: 'Starter Growth Pack',
    status: 'quotation',
    startDate: '2024-04-01',
    nextBilling: '2024-05-01',
    amount: '₹2,495/mo',
    anchorDay: 1
  },
  {
    id: '5',
    number: 'SUB-2024-001280',
    customer: 'CloudScale Technologies',
    plan: 'Professional Tier',
    status: 'confirmed',
    startDate: '2024-04-10',
    nextBilling: '2024-04-10',
    amount: '₹8,990/mo',
    anchorDay: 10
  }
]

export const SalesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'quotations' | 'templates'>('subscriptions')
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(initialSubscriptions)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleAction = (id: string, action: 'pause' | 'resume' | 'cancel') => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          if (action === 'pause') return { ...sub, status: 'paused' }
          if (action === 'resume') return { ...sub, status: 'active' }
          if (action === 'cancel') return { ...sub, status: 'closed' }
        }
        return sub
      })
    )
  }

  const filteredSubs = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer.toLowerCase().includes(search.toLowerCase()) ||
      sub.number.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sales & Subscriptions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage customer subscription lifecycles, draft quotations, and pricing templates.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'subscriptions'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Subscriptions ({subscriptions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quotations')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'quotations'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quotations (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'templates'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Templates (4)
          </button>
        </div>
      </div>

      {/* Main Subscriptions View */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-4">
          {/* Controls bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by customer name or subscription #..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="quotation">Quotation</option>
                <option value="confirmed">Confirmed</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Subscription</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Plan & Amount</th>
                  <th className="py-3 px-4">Anchor Day</th>
                  <th className="py-3 px-4">Next Billing</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Lifecycle Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#3223d2]">
                      {sub.number}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {sub.customer}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{sub.plan}</div>
                      <div className="text-[11px] text-slate-400">{sub.amount}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      Day {sub.anchorDay}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {sub.nextBilling}
                    </td>
                    <td className="py-3.5 px-4">
                      {sub.status === 'active' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      )}
                      {sub.status === 'paused' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          Paused
                        </span>
                      )}
                      {sub.status === 'quotation' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          Quotation
                        </span>
                      )}
                      {sub.status === 'confirmed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-[#3223d2] border border-indigo-200">
                          Confirmed
                        </span>
                      )}
                      {sub.status === 'closed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {sub.status === 'active' && (
                          <button
                            type="button"
                            onClick={() => handleAction(sub.id, 'pause')}
                            title="Pause Subscription"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-colors"
                          >
                            <Pause className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {sub.status === 'paused' && (
                          <button
                            type="button"
                            onClick={() => handleAction(sub.id, 'resume')}
                            title="Resume (re-anchors to anchor day)"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {sub.status !== 'closed' && (
                          <button
                            type="button"
                            onClick={() => handleAction(sub.id, 'cancel')}
                            title="Close Subscription"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quotations View */}
      {activeTab === 'quotations' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Active Quotations Pending Acceptance
            </h2>
            <span className="text-xs text-slate-500">
              Expiry sweep runs daily at 00:00 IST
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: 'QT-2024-0012', customer: 'Nexus Retail Chain', amount: '₹29,940', valid: '5 days left', status: 'Sent' },
              { num: 'QT-2024-0011', customer: 'Pinnacle Infotech', amount: '₹1,44,000', valid: '12 days left', status: 'Draft' },
              { num: 'QT-2024-0010', customer: 'Vortex Media Group', amount: '₹84,000', valid: 'Expired yesterday', status: 'quotation_expired' }
            ].map((q) => (
              <div key={q.num} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#3223d2] text-xs">{q.num}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    q.status === 'quotation_expired' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {q.status}
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-sm">{q.customer}</div>
                <div className="text-xs font-semibold text-slate-700">{q.amount} / year</div>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span>Validity: {q.valid}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates View */}
      {activeTab === 'templates' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Standard Quotation Templates
            </h2>
            <button
              type="button"
              className="text-xs font-bold text-white bg-[#3223d2] hover:bg-[#281bb0] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Template
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              { name: 'Enterprise Standard Package', days: 15, terms: 'Net 15 Days', lines: 'Software License + 24/7 Priority Support' },
              { name: 'SaaS Pro Annual Bundle', days: 30, terms: 'Immediate', lines: 'Pro Seat Tier + Cloud Backup Addon' },
              { name: 'Government & PSU Tender Template', days: 60, terms: 'Net 30 Days', lines: 'Self-Hosted Appliance + Security Audit' }
            ].map((t) => (
              <div key={t.name} className="py-3.5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{t.lines}</p>
                </div>
                <div className="text-right text-xs">
                  <div className="font-semibold text-slate-700">{t.terms}</div>
                  <div className="text-slate-400">Validity: {t.days} Days</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default SalesPage
