import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-slate-200 p-8 space-y-4">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ⚡
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Subscript Hub
        </h1>
        <p className="text-sm text-slate-500">
          Brightloop Software Subscription Management & Recurring Billing Platform
        </p>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Phase 1 Architecture</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            Scaffolding Ready
          </span>
        </div>
      </div>
    </div>
  )
}
