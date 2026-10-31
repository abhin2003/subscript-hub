import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { PortalCustomerProfile } from './types';

interface PortalHeaderProps {
  customer: PortalCustomerProfile;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export function PortalHeader({
  customer,
  activeTab = 'home',
  onTabChange,
  onSearch,
}: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo & Nav Links */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange?.('home')}>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Subscript Hub
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <button
                onClick={() => onTabChange?.('home')}
                className={`py-5 inline-flex items-center border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'home'
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onTabChange?.('subscriptions')}
                className={`py-5 inline-flex items-center border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'subscriptions'
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                Subscriptions
              </button>
              <button
                onClick={() => onTabChange?.('invoices')}
                className={`py-5 inline-flex items-center border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'invoices'
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                Invoices
              </button>
              <button
                onClick={() => onTabChange?.('support')}
                className={`py-5 inline-flex items-center border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'support'
                    ? 'border-indigo-600 text-indigo-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                Support
              </button>
            </nav>
          </div>

          {/* Right section: Search, Notifications, Help & Customer Profile */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:block w-64 lg:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search subscriptions, invoices"
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Help / Support Icon */}
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Help Center"
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

            {/* Customer User Profile */}
            <div className="flex items-center gap-3 pl-1 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {customer.initials}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {customer.name}
                </div>
                <div className="text-xs text-slate-400 leading-tight">
                  {customer.portalLabel}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
