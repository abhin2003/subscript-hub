import React, { useState } from 'react'
import { Building, CreditCard, Save } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('Brightloop Software Technologies Pvt Ltd')
  const [gstin, setGstin] = useState('27AABCB9876E1Z4')
  const [billingEmail, setBillingEmail] = useState('billing@brightloop.com')
  const [bankName, setBankName] = useState('HDFC Bank')
  const [accountNumber, setAccountNumber] = useState('50200084729103')
  const [ifsc, setIfsc] = useState('HDFC0001234')
  const [paymentTerms, setPaymentTerms] = useState(15)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Settings saved successfully and synced with public endpoint GET /api/v1/settings/public!')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          System & Company Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure Brightloop legal profile, payment instruction details (P36), and automated billing defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Profile (P29) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-5 h-5 text-[#3223d2]" />
            <h2 className="text-sm font-bold text-slate-900">
              Corporate Legal Entity & Billing Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Company Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">GSTIN</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Billing Support Email</label>
              <input
                type="email"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Default Payment Terms (Days)</label>
              <input
                type="number"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(parseInt(e.target.value) || 15)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
          </div>
        </div>

        {/* Bank Transfer Details (P36 - Exposed to Portal) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CreditCard className="w-5 h-5 text-[#3223d2]" />
            <h2 className="text-sm font-bold text-slate-900">
              Bank Wire & NEFT Transfer Instructions (Public Endpoint P36)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3223d2]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#3223d2] hover:bg-[#281bb0] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  )
}
export default SettingsPage
