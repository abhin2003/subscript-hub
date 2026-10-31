import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { CreateSubscriptionModal } from '../components/CreateSubscriptionModal'
import { Bell, ChevronRight } from 'lucide-react'

export const AppShell: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const location = useLocation()

  // Generate breadcrumb title based on path
  const getBreadcrumbs = () => {
    const path = location.pathname
    if (path === '/' || path === '/overview') return ['Dashboard', 'Financial Overview']
    if (path.startsWith('/sales')) return ['Sales', 'Subscriptions & Quotes']
    if (path.startsWith('/billing')) return ['Finance', 'Billing & Invoicing']
    if (path.startsWith('/catalogue')) return ['Products', 'Catalogue & Plans']
    if (path.startsWith('/finance-rules')) return ['Rules', 'Taxes & Discounts']
    if (path.startsWith('/reports')) return ['Analytics', 'Financial Reports']
    if (path.startsWith('/admin')) return ['System', 'Administration & Security']
    if (path.startsWith('/documentation')) return ['Help', 'Engineering Blueprint']
    if (path.startsWith('/settings')) return ['Configuration', 'Company Settings']
    return ['Dashboard', 'Overview']
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar onCreateSubscription={() => setIsModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>{breadcrumbs[0]}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-semibold">{breadcrumbs[1]}</span>
          </div>

          {/* Right Header Icons & Profile */}
          <div className="flex items-center gap-4">
            {/* Live Mode Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Live (IST)</span>
            </div>

            {/* Notifications */}
            <button
              type="button"
              title="Notifications"
              onClick={() => alert('No pending billing errors. All automated sweeps running on schedule.')}
              className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
            </button>

            {/* User Profile Chip */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-[#3223d2] font-bold text-xs flex items-center justify-center">
                RS
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  Rajesh Sharma
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Admin (Brightloop)
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

      {/* Interactive Create Subscription Modal */}
      <CreateSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
export default AppShell
