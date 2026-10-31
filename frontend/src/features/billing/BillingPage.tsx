import React, { useState } from 'react'
import {
  Play,
  RotateCw,
  Search,
  CheckCircle2,
  AlertCircle,
  FileDown,
  CreditCard,
  X
} from 'lucide-react'

interface Invoice {
  id: string
  number: string
  customer: string
  subNumber: string
  issueDate: string
  dueDate: string
  total: string
  amountPaid: string
  balance: string
  status: 'draft' | 'confirmed' | 'paid' | 'cancelled'
  isOverdue: boolean
}

const initialInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-8892',
    customer: 'Acme Corp India',
    subNumber: 'SUB-2024-001284',
    issueDate: '2024-01-15',
    dueDate: '2024-02-12',
    total: '₹1,45,000',
    amountPaid: '₹0',
    balance: '₹1,45,000',
    status: 'confirmed',
    isOverdue: true
  },
  {
    id: '2',
    number: 'INV-2024-8712',
    customer: 'Zenith Tech Solutions',
    subNumber: 'SUB-2024-001283',
    issueDate: '2024-01-20',
    dueDate: '2024-02-18',
    total: '₹98,500',
    amountPaid: '₹0',
    balance: '₹98,500',
    status: 'confirmed',
    isOverdue: true
  },
  {
    id: '3',
    number: 'INV-2024-8601',
    customer: 'Global Logistics Pvt',
    subNumber: 'SUB-2024-001282',
    issueDate: '2024-01-25',
    dueDate: '2024-02-25',
    total: '₹76,200',
    amountPaid: '₹0',
    balance: '₹76,200',
    status: 'confirmed',
    isOverdue: true
  },
  {
    id: '4',
    number: 'INV-2024-8549',
    customer: 'Nexus Retail Chain',
    subNumber: 'SUB-2024-001281',
    issueDate: '2024-02-01',
    dueDate: '2024-03-02',
    total: '₹54,000',
    amountPaid: '₹0',
    balance: '₹54,000',
    status: 'confirmed',
    isOverdue: true
  },
  {
    id: '5',
    number: 'INV-2024-8540',
    customer: 'CloudScale Technologies',
    subNumber: 'SUB-2024-001280',
    issueDate: '2024-03-01',
    dueDate: '2024-03-15',
    total: '₹35,400',
    amountPaid: '₹35,400',
    balance: '₹0',
    status: 'paid',
    isOverdue: false
  }
]

export const BillingPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [isBillingRunActive, setIsBillingRunActive] = useState(false)
  const [billingProgress, setBillingProgress] = useState(0)
  const [search, setSearch] = useState('')
  const [paymentDrawerInvoice, setPaymentDrawerInvoice] = useState<Invoice | null>(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('UPI')

  // Trigger Asynchronous Batch Billing Run (P23)
  const handleStartBillingRun = () => {
    setIsBillingRunActive(true)
    setBillingProgress(10)
    const interval = setInterval(() => {
      setBillingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBillingRunActive(false)
          alert('Batch Billing Run #RUN-2024-03-31 Completed! 248 invoices generated, 0 skipped, 0 failed.')
          return 100
        }
        return prev + 25
      })
    }, 600)
  }

  // Handle Payment Record
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paymentDrawerInvoice) return

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === paymentDrawerInvoice.id) {
          return {
            ...inv,
            status: 'paid',
            amountPaid: inv.total,
            balance: '₹0',
            isOverdue: false
          }
        }
        return inv
      })
    )
    setPaymentDrawerInvoice(null)
    alert(`Payment recorded successfully for ${paymentDrawerInvoice.number}!`)
  }

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.number.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Billing & Invoicing
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Automated recurring invoice generation, overdue aging, and manual payment allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleStartBillingRun}
            disabled={isBillingRunActive}
            className="px-4 py-2 bg-[#3223d2] hover:bg-[#281bb0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isBillingRunActive ? `Processing (${billingProgress}%)...` : 'Run Batch Billing'}</span>
          </button>
        </div>
      </div>

      {/* Live Billing Run Banner (when running) */}
      {isBillingRunActive && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col gap-2 animate-in fade-in-50">
          <div className="flex items-center justify-between text-xs font-bold text-[#3223d2]">
            <span className="flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              Asynchronous Billing Engine executing in background (APScheduler Worker)
            </span>
            <span>{billingProgress}%</span>
          </div>
          <div className="w-full bg-indigo-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#3223d2] h-full transition-all duration-300"
              style={{ width: `${billingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Invoices Search and Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by invoice number or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2] focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Filter:</span>
          <span className="px-2.5 py-1 bg-slate-100 font-semibold rounded-md text-slate-700">All ({invoices.length})</span>
          <span className="px-2.5 py-1 bg-rose-50 font-semibold rounded-md text-rose-600">Overdue (4)</span>
          <span className="px-2.5 py-1 bg-emerald-50 font-semibold rounded-md text-emerald-700">Paid (1)</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Balance Due</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#3223d2]">
                  {inv.number}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">
                  {inv.customer}
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {inv.dueDate}
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  {inv.total}
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {inv.balance}
                </td>
                <td className="py-3.5 px-4">
                  {inv.status === 'paid' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Paid
                    </span>
                  )}
                  {inv.status === 'confirmed' && inv.isOverdue && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                      <AlertCircle className="w-3 h-3" />
                      Overdue
                    </span>
                  )}
                  {inv.status === 'confirmed' && !inv.isOverdue && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      Confirmed
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {inv.status !== 'paid' && (
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentDrawerInvoice(inv)
                          setPaymentAmount(inv.balance.replace('₹', '').replace(',', ''))
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-[#3223d2] bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => alert(`Downloading PDF for ${inv.number} with DejaVuSans UTF-8 font and ₹ symbol...`)}
                      title="Download PDF"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Payment Drawer / Modal */}
      {paymentDrawerInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Record Payment
                </h3>
                <p className="text-xs text-slate-500">
                  For {paymentDrawerInvoice.number} ({paymentDrawerInvoice.customer})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPaymentDrawerInvoice(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
                >
                  <option value="UPI">UPI (Google Pay, PhonePe)</option>
                  <option value="Bank Transfer">NEFT / RTGS Bank Transfer</option>
                  <option value="Card">Corporate Credit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Amount Received (₹)
                </label>
                <input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2] font-bold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentDrawerInvoice(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#3223d2] hover:bg-[#281bb0] rounded-lg shadow-xs"
                >
                  Confirm & Reconcile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default BillingPage
