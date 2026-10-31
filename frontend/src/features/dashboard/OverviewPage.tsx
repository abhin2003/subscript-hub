import React, { useState } from 'react'
import {
  Users,
  CreditCard,
  Calendar,
  AlertCircle,
  PieChart as PieIcon,
  TrendingUp,
  RotateCcw,
  CalendarDays,
  ChevronDown,
  Check
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useNavigate } from 'react-router-dom'

// Revenue trend mock data matching the exact curve in Image 2
const revenueDataMonth = [
  { month: 'May', value: 1200000 },
  { month: 'Jun', value: 1600000 },
  { month: 'Jul', value: 1800000 },
  { month: 'Aug', value: 2500000 },
  { month: 'Sep', value: 3100000 },
  { month: 'Oct', value: 3800000 },
  { month: 'Nov', value: 4100000 },
  { month: 'Dec', value: 3900000 },
  { month: 'Jan', value: 3600000 },
  { month: 'Feb', value: 3950000 },
  { month: 'Mar', value: 4218500 }
]

const revenueDataWeek = [
  { month: 'W1', value: 850000 },
  { month: 'W2', value: 1100000 },
  { month: 'W3', value: 980000 },
  { month: 'W4', value: 1288500 }
]

// Payment methods distribution matching Image 2
const paymentMethodData = [
  { name: 'UPI', value: 45, color: '#3223d2' },
  { name: 'Bank transfer', value: 25, color: '#93c5fd' },
  { name: 'Card', value: 15, color: '#64748b' },
  { name: 'Cash', value: 10, color: '#dc2626' },
  { name: 'Cheque', value: 5, color: '#fdba74' }
]

// Top overdue invoices matching Image 2
const overdueInvoices = [
  {
    invoice: 'INV-2024-8892',
    customer: 'Acme Corp India',
    dueDate: '12 Feb 2024',
    daysOverdue: 45,
    balance: '₹1,45,000'
  },
  {
    invoice: 'INV-2024-8712',
    customer: 'Zenith Tech Solutions',
    dueDate: '18 Feb 2024',
    daysOverdue: 39,
    balance: '₹98,500'
  },
  {
    invoice: 'INV-2024-8601',
    customer: 'Global Logistics Pvt',
    dueDate: '25 Feb 2024',
    daysOverdue: 32,
    balance: '₹76,200'
  },
  {
    invoice: 'INV-2024-8549',
    customer: 'Nexus Retail Chain',
    dueDate: '02 Mar 2024',
    daysOverdue: 27,
    balance: '₹54,000'
  }
]

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeDateFilter, setActiveDateFilter] = useState('This month')
  const [selectedPlan, setSelectedPlan] = useState('All Plans (Enterprise, Pro, Starter)')
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false)
  const [granularity, setGranularity] = useState<'Month' | 'Week'>('Month')

  const dateFilterOptions = ['This month', 'Last month', 'Last 90 days', 'This year', 'Custom']
  const planOptions = [
    'All Plans (Enterprise, Pro, Starter)',
    'Enterprise Cloud Plan',
    'Professional Tier',
    'Starter Growth Pack'
  ]

  const handleResetFilters = () => {
    setActiveDateFilter('This month')
    setSelectedPlan('All Plans (Enterprise, Pro, Starter)')
    setGranularity('Month')
  }

  // Custom Dot for key points matching Image 2
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload, index } = props
    const keyMonths = ['May', 'Jul', 'Sep', 'Nov', 'Jan', 'Mar']
    if (keyMonths.includes(payload.month)) {
      return (
        <circle
          key={`dot-${payload.month}-${index}`}
          cx={cx}
          cy={cy}
          r={4.5}
          fill="#3223d2"
          stroke="#ffffff"
          strokeWidth={2}
        />
      )
    }
    return <g key={`dot-empty-${index}`} />
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Financial Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Real-time revenue monitoring and back-office reconciliation metrics.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range Pills */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {dateFilterOptions.map((filter) => {
              const isSelected = activeDateFilter === filter
              return (
                <button
                  key={filter}
                  onClick={() => setActiveDateFilter(filter)}
                  type="button"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-[#3223d2] font-semibold shadow-xs border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter}
                  {filter === 'Custom' && <CalendarDays className="w-3.5 h-3.5 ml-0.5 text-slate-400" />}
                </button>
              )
            })}
          </div>

          {/* Plan Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
              type="button"
              className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs"
            >
              <span>{selectedPlan}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPlanDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20 animate-in fade-in-50 zoom-in-95">
                {planOptions.map((plan) => (
                  <button
                    key={plan}
                    onClick={() => {
                      setSelectedPlan(plan)
                      setIsPlanDropdownOpen(false)
                    }}
                    type="button"
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                      selectedPlan === plan
                        ? 'bg-indigo-50/70 text-[#3223d2] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{plan}</span>
                    {selectedPlan === plan && <Check className="w-3.5 h-3.5 text-[#3223d2]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={handleResetFilters}
          type="button"
          className="text-xs font-semibold text-[#3223d2] hover:text-[#281bb0] flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset filters</span>
        </button>
      </div>

      {/* Row 1: 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Active subscriptions */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Active subscriptions
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              1,284
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3.2% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Revenue received */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Revenue received
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              ₹42,18,500
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              This month total
            </div>
          </div>
        </div>

        {/* Card 3: Outstanding */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Outstanding
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              ₹9,64,200
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">
              Due in next 30 days
            </div>
          </div>
        </div>

        {/* Card 4: Overdue invoices */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Overdue invoices
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-600 tracking-tight">
              37
            </div>
            <div className="mt-1 text-xs font-semibold text-rose-600">
              ₹2,81,400 overdue
            </div>
          </div>
        </div>

        {/* Card 5: Paid vs unpaid */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Paid vs unpaid
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <PieIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              82%
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <Check className="w-3.5 h-3.5" />
              <span>Paid ratio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts Row (Revenue trend & Subscriptions by status) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Revenue trend Area Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Revenue trend
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Trailing 12-month recurring and one-off collections
              </p>
            </div>

            {/* Month / Week Toggle Button */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200">
              <button
                type="button"
                onClick={() => setGranularity('Month')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  granularity === 'Month'
                    ? 'bg-white text-[#3223d2] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setGranularity('Week')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  granularity === 'Week'
                    ? 'bg-white text-[#3223d2] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Week
              </button>
            </div>
          </div>

          <div className="h-[270px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={granularity === 'Month' ? revenueDataMonth : revenueDataWeek}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3223d2" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3223d2" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(val: any) => [
                    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val),
                    'Collections'
                  ]}
                  contentStyle={{
                    backgroundColor: '#1e1b4b',
                    borderRadius: '8px',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#c7d2fe' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3223d2"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  dot={renderCustomDot}
                  activeDot={{ r: 6, fill: '#3223d2', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Subscriptions by status */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Subscriptions by status
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Active, Trial, Past Due, Canceled
            </p>

            <div className="mt-6 space-y-5">
              {/* Active */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Active</span>
                  <span>1,284 (74%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#3223d2] h-full rounded-full transition-all duration-500"
                    style={{ width: '74%' }}
                  />
                </div>
              </div>

              {/* Trial */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Trial</span>
                  <span>215 (12%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#c7d2fe] h-full rounded-full transition-all duration-500"
                    style={{ width: '12%' }}
                  />
                </div>
              </div>

              {/* Past Due */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Past Due</span>
                  <span>132 (8%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#ef4444] h-full rounded-full transition-all duration-500"
                    style={{ width: '8%' }}
                  />
                </div>
              </div>

              {/* Canceled */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Canceled</span>
                  <span>105 (6%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#64748b] h-full rounded-full transition-all duration-500"
                    style={{ width: '6%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Total subscriber accounts:</span>
            <span className="font-bold text-slate-900">1,736</span>
          </div>
        </div>
      </div>

      {/* Row 3: Payments by method & Top overdue invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Payments by method (Donut Chart) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Payments by method
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribution across channels
            </p>

            {/* Donut Chart with Centered Total */}
            <div className="relative h-[210px] w-full flex items-center justify-center mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${value}%`, 'Share']}
                    contentStyle={{
                      backgroundColor: '#1e1b4b',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '12px',
                      border: 'none'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Centered Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400 font-medium">Total</span>
                <span className="text-xl font-bold text-slate-900">₹42L</span>
              </div>
            </div>

            {/* Legend matching Image 2 */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-3 border-t border-slate-100 text-xs">
              {paymentMethodData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 font-medium">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Top overdue invoices Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Top overdue invoices
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Immediate follow-up required for high-value accounts
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/billing')}
                className="text-xs font-semibold text-[#3223d2] hover:text-[#281bb0] hover:underline"
              >
                View all
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3">Invoice</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3">Days Overdue</th>
                    <th className="py-2.5 px-3 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {overdueInvoices.map((inv) => (
                    <tr
                      key={inv.invoice}
                      onClick={() => navigate('/billing')}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-3 font-medium text-[#3223d2] group-hover:underline">
                        {inv.invoice}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {inv.customer}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {inv.dueDate}
                      </td>
                      <td className="py-3 px-3 font-semibold text-rose-600">
                        {inv.daysOverdue} days
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 text-right">
                        {inv.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Showing top 4 critical arrears</span>
            <span className="font-medium text-rose-600">Total overdue backlog: ₹2,81,400</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OverviewPage
