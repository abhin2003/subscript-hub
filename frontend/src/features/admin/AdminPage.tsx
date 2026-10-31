import React, { useState } from 'react'
import { UserPlus, Lock, CheckCircle2 } from 'lucide-react'

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staff' | 'audit'>('staff')

  const staffMembers = [
    { id: '1', name: 'Rajesh Sharma', email: 'rajesh@brightloop.com', role: 'Admin', designation: 'Operations Head', mustChangePassword: false, status: 'Active' },
    { id: '2', name: 'Pooja Iyer', email: 'pooja@brightloop.com', role: 'Staff', designation: 'Billing Executive', mustChangePassword: true, status: 'Active (Pending Password Change)' },
    { id: '3', name: 'Vikram Joshi', email: 'vikram@brightloop.com', role: 'Staff', designation: 'Account Manager', mustChangePassword: false, status: 'Active' }
  ]

  const auditLogs = [
    { id: '1', timestamp: '2024-03-31 14:22:10 IST', actor: 'rajesh@brightloop.com', action: 'SUBSCRIPTION_RESUME', entity: 'SUB-2024-001283', note: 'Re-anchored billing date to Day 1 after pause' },
    { id: '2', timestamp: '2024-03-31 12:05:40 IST', actor: 'System Worker', action: 'BILLING_BATCH_COMPLETE', entity: 'RUN-2024-03-31', note: 'Generated 248 invoices in 42s' },
    { id: '3', timestamp: '2024-03-30 18:45:00 IST', actor: 'pooja@brightloop.com', action: 'PAYMENT_ALLOCATED', entity: 'INV-2024-8540', note: 'Recorded ₹35,400 via UPI' }
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Administration & Security
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage staff accounts, enforce mandatory password policies, and inspect tamper-evident audit logs.
          </p>
        </div>

        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'staff'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Staff Accounts ({staffMembers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-[#3223d2] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Audit Trails (P28)
          </button>
        </div>
      </div>

      {activeTab === 'staff' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Staff Directory (P27)
            </h2>
            <button
              type="button"
              onClick={() => alert('Opening P27 Staff Account Creation with temporary password generator & must_change_password policy...')}
              className="text-xs font-bold text-white bg-[#3223d2] hover:bg-[#281bb0] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              Onboard Staff
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Password Policy</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffMembers.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-[11px] text-slate-400">{s.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                      s.role === 'Admin' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {s.designation}
                  </td>
                  <td className="py-3.5 px-4">
                    {s.mustChangePassword ? (
                      <span className="text-amber-600 font-semibold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        Must change on login
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Compliant
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {s.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">
              System Audit Event Logs (P28)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Append-only tamper-evident event log storing actor, action, and state transition diffs.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#3223d2] bg-indigo-50 px-2 py-0.5 rounded">
                      {log.action}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      Entity: {log.entity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{log.note}</p>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>Actor: {log.actor}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default AdminPage
