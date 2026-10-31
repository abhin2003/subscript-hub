import React, { useState } from 'react'
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react'

interface CreateSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export const CreateSubscriptionModal: React.FC<CreateSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState(1)
  const [customer, setCustomer] = useState('Acme Corp India')
  const [plan, setPlan] = useState('Enterprise Cloud Plan')
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const [quantity, setQuantity] = useState(5)
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const discountCode = 'WELCOME10'
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  // Pricing math matching Blueprint
  const unitPrice = plan === 'Enterprise Cloud Plan' ? 1560 : plan === 'Professional Tier' ? 899 : 499
  const subtotal = quantity * unitPrice
  const discountAmount = discountCode === 'WELCOME10' ? subtotal * 0.10 : 0
  const taxable = subtotal - discountAmount
  const taxAmount = Math.round(taxable * 0.18)
  const total = taxable + taxAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess?.()
      onClose()
      alert(`Subscription SUB-2024-001285 created successfully for ${customer}!`)
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3223d2] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              SH
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Create New Subscription
              </h3>
              <p className="text-xs text-slate-500">
                Step {step} of 3: {step === 1 ? 'Customer Details' : step === 2 ? 'Plan & Period' : 'Confirmation & Pricing'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-slate-200/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Customer
                  </label>
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3223d2] focus:bg-white"
                  >
                    <option value="Acme Corp India">Acme Corp India (GSTIN: 27AABCA1234F1Z5)</option>
                    <option value="Zenith Tech Solutions">Zenith Tech Solutions (GSTIN: 29AABCT8765Q1Z9)</option>
                    <option value="Global Logistics Pvt">Global Logistics Pvt (GSTIN: 07AABCG5544R1Z2)</option>
                    <option value="Nexus Retail Chain">Nexus Retail Chain (GSTIN: 33AABCN9988P1Z1)</option>
                    <option value="CloudScale Technologies">CloudScale Technologies (Tax Exempt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3223d2] focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Monthly anchor day will lock to day {new Date(startDate).getDate()} of each month.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subscription Plan
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {[
                      { name: 'Enterprise Cloud Plan', price: '₹1,560/mo', desc: 'Unlimited team seats, dedicated SLA, custom tax rules' },
                      { name: 'Professional Tier', price: '₹899/mo', desc: 'Up to 25 seats, advanced recurring billing, webhook dispatch' },
                      { name: 'Starter Growth Pack', price: '₹499/mo', desc: 'Up to 5 seats, standard automated invoicing' }
                    ].map((p) => (
                      <div
                        key={p.name}
                        onClick={() => setPlan(p.name)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                          plan === p.name
                            ? 'border-[#3223d2] bg-indigo-50/50 shadow-2xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900">{p.name}</div>
                          <div className="text-xs text-slate-500">{p.desc}</div>
                        </div>
                        <span className="text-xs font-bold text-[#3223d2]">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Quantity (Licenses)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3223d2] focus:bg-white font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Billing Cadence
                    </label>
                    <select
                      value={billingPeriod}
                      onChange={(e) => setBillingPeriod(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3223d2] focus:bg-white"
                    >
                      <option value="monthly">Monthly Recurring</option>
                      <option value="yearly">Yearly Prepaid</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {/* Pricing Breakdown Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Base Subtotal ({quantity} × ₹{unitPrice}):</span>
                    <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-600">
                    <span>Discount (WELCOME10 - 10%):</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Taxable Amount:</span>
                    <span className="font-semibold text-slate-900">₹{taxable.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>GST (18% Standard Rule):</span>
                    <span className="font-semibold text-slate-900">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                    <span>First Invoice Total:</span>
                    <span className="text-base text-[#3223d2]">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    State machine guard verified: Subscription will activate on <strong>{startDate}</strong>, issue draft invoice <strong>INV-2024-8893</strong>, and set next anchor billing date.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 text-xs font-bold bg-[#3223d2] hover:bg-[#281bb0] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-bold bg-[#3223d2] hover:bg-[#281bb0] text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Creating Subscription...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Activate</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
export default CreateSubscriptionModal
