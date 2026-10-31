import React from 'react'
import { Shield, Database, Cpu } from 'lucide-react'

export const DocumentationPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          System Documentation & Engineering Blueprint
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Technical specifications, decoupled state machines, and operational guidelines for Brightloop Software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#3223d2] flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Asynchronous Billing Engine (BP §9.6)
          </h3>
          <p className="text-xs text-slate-500">
            Batch execution processes active subscriptions in isolated transactions with `FOR UPDATE SKIP LOCKED`. Dispatched via HTTP 202 Accepted.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Decoupled State Machine (ISS-03)
          </h3>
          <p className="text-xs text-slate-500">
            Quotation expiry (`quotation_expired`) and subscription expiry (`subscription_expired`) are decoupled. Expired quotes cannot be renewed into active subscriptions.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Composite Multi-Tenant Isolation
          </h3>
          <p className="text-xs text-slate-500">
            Database constraints enforce `payment.customer_id == invoice.customer_id` via composite foreign keys, preventing cross-tenant payment allocation.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Core Audit Deliverables
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="font-bold text-slate-900">IMPLEMENTATION_PLAN_AUDIT.md</div>
            <div className="text-slate-500 mt-1">Exhaustive technical scorecard & risk matrix</div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="font-bold text-slate-900">IMPLEMENTATION_PLAN_REVISED.md</div>
            <div className="text-slate-500 mt-1">Production-ready implementation plan</div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="font-bold text-slate-900">IMPLEMENTATION_CHANGELOG.md</div>
            <div className="text-slate-500 mt-1">Issue-to-fix mapping register</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DocumentationPage
