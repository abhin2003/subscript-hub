import { useState } from 'react';
import { Search, SlidersHorizontal, CheckCircle2, FileText, Bell, Plus } from 'lucide-react';
import { CataloguePlanItem } from './types';
import { mockCataloguePlans } from './mockData';
import { RequestQuotationModal } from './RequestQuotationModal';

interface PlansCatalogueProps {
  onNavigateTab?: (tab: string) => void;
  onRequestQuoteSuccess?: (planId: string) => void;
}

export function PlansCatalogue({
  onNavigateTab,
  onRequestQuoteSuccess,
}: PlansCatalogueProps) {
  const [plans] = useState<CataloguePlanItem[]>(mockCataloguePlans);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<CataloguePlanItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPlans = plans.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (plan: CataloguePlanItem) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (details: { planId: string; quantity: number; startDate: string; notes: string }) => {
    setIsModalOpen(false);
    onRequestQuoteSuccess?.(details.planId);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav links */}
            <div className="flex items-center gap-8">
              <div
                className="cursor-pointer"
                onClick={() => onNavigateTab?.('home')}
              >
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Subscript Hub
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <button
                  onClick={() => onNavigateTab?.('home')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigateTab?.('subscriptions')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Subscriptions
                </button>
                <button
                  onClick={() => onNavigateTab?.('invoices')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Invoices
                </button>
                <button
                  onClick={() => onNavigateTab?.('support')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Support
                </button>
                <button
                  onClick={() => onNavigateTab?.('catalogue')}
                  className="py-5 text-indigo-600 font-bold border-b-2 border-indigo-600 transition-colors"
                >
                  Catalogue
                </button>
                <button
                  onClick={() => onNavigateTab?.('account')}
                  className="py-5 text-slate-600 hover:text-slate-900 hover:border-slate-300 border-b-2 border-transparent transition-colors"
                >
                  Account
                </button>
              </nav>
            </div>

            {/* Right section: Create New, Bell, Avatar */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedPlan(plans[0])}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create New</span>
              </button>

              <button
                type="button"
                className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Bell className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 pl-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Aarav Mehta"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to avatar text initials if image fails
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <span>AM</span>
                </div>
                <div className="hidden lg:block text-left text-xs leading-tight">
                  <div className="font-semibold text-slate-900">Aarav Mehta</div>
                  <div className="text-slate-400">Internal Staff</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title and Search/Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Plans Catalogue
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Explore our scalable billing tiers and enterprise subscription options tailored for your fiscal operations.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search catalogue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* 3 Column Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-7 flex flex-col justify-between transition-all ${
                plan.isFeatured
                  ? 'border-2 border-indigo-600 shadow-md ring-4 ring-indigo-50/50'
                  : 'border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    {plan.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      plan.badge.variant === 'in-stock'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        plan.badge.variant === 'in-stock' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                    ></span>
                    {plan.badge.text}
                  </span>
                </div>

                {/* Plan Title */}
                <h3 className="text-xl font-bold text-slate-900 mt-2 tracking-tight">
                  {plan.title}
                </h3>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-1.5">
                    {plan.interval}
                  </span>
                </div>

                {/* Min Quantity */}
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Minimum quantity:{' '}
                  <span className="font-semibold text-slate-700">{plan.minQuantity} units</span>
                </div>

                {/* Horizontal Divider */}
                <div className="my-5 border-t border-slate-100" />

                {/* Features List */}
                <ul className="space-y-3 text-xs text-slate-600 font-medium">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-7 pt-4">
                <button
                  type="button"
                  onClick={() => handleOpenModal(plan)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Request a quotation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2023 Brightloop Software Subscript Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:text-slate-800 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-800 transition-colors">Terms of Service</button>
            <button className="hover:text-slate-800 transition-colors">Security Overview</button>
          </div>
        </div>
      </footer>

      {/* Request Modal */}
      <RequestQuotationModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
