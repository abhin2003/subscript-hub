import { useState } from 'react';
import { Download, Plus } from 'lucide-react';
import { PortalHeader } from './PortalHeader';
import { OverdueAlertBanner } from './OverdueAlertBanner';
import { SummaryTiles } from './SummaryTiles';
import { SubscriptionsOverview } from './SubscriptionsOverview';
import { LatestInvoicesTable } from './LatestInvoicesTable';
import { mockPortalData } from './mockData';

interface PortalHomeProps {
  onNavigateTab?: (tab: string) => void;
  onNavigateScreen?: (screen: 's22' | 's23-1' | 's23-2' | 's24') => void;
}

export function PortalHome({ onNavigateTab, onNavigateScreen }: PortalHomeProps) {
  const [data] = useState(mockPortalData);
  const [activeTab, setActiveTab] = useState('home');
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleViewInvoice = (invoiceId: string) => {
    showToast(`Opening Invoice ${invoiceId}...`);
  };

  const handlePayNow = (invoiceId: string) => {
    showToast(`Opening payment gateway for ${invoiceId}...`);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    showToast(`Downloading PDF for ${invoiceId}...`);
  };

  const handleViewSubscription = (_subId: string) => {
    onNavigateScreen?.('s24');
  };

  const handleNewService = () => {
    onNavigateScreen?.('s23-1');
  };

  const handleDownloadStatement = () => {
    showToast(`Downloading account statement PDF for ${data.customer.name}...`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <PortalHeader
        customer={data.customer}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'subscriptions') {
            onNavigateScreen?.('s24');
          } else if (tab === 'catalogue') {
            onNavigateScreen?.('s23-1');
          } else if (tab === 'home') {
            onNavigateScreen?.('s22');
          } else {
            onNavigateTab?.(tab);
          }
        }}
        onSearch={(q) => {
          if (q.trim()) console.log('Searching for:', q);
        }}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7">
        {/* Welcome Section & Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Welcome back, {data.customer.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Here is a quick overview of your active subscriptions and recent billing activity.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Statement Button */}
            <button
              onClick={handleDownloadStatement}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 shadow-sm transition-colors"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Statement</span>
            </button>

            {/* + New Service Button */}
            <button
              onClick={handleNewService}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>New Service</span>
            </button>
          </div>
        </div>

        {/* Payment Required Alert Banner (if overdue exists) */}
        {data.alert.required && (
          <OverdueAlertBanner
            alert={data.alert}
            onViewInvoice={handleViewInvoice}
          />
        )}

        {/* Summary Metric Cards */}
        <SummaryTiles
          metrics={data.metrics}
          onTileClick={(key) => {
            if (key === 'subscriptions') onNavigateScreen?.('s24');
            if (key === 'invoices') setActiveTab('invoices');
          }}
        />

        {/* Subscriptions Overview Section */}
        <SubscriptionsOverview
          subscriptions={data.subscriptions}
          totalCount={data.totalSubscriptionsCount}
          onViewAll={() => onNavigateScreen?.('s24')}
          onViewSubscription={handleViewSubscription}
        />

        {/* Latest Invoices Section */}
        <LatestInvoicesTable
          invoices={data.invoices}
          totalInvoicesCount={data.totalInvoicesCount}
          onPayNow={handlePayNow}
          onViewInvoice={handleViewInvoice}
          onDownloadInvoice={handleDownloadInvoice}
          onFilterClick={() => showToast('Opening invoice filters...')}
          onSortClick={() => showToast('Toggling invoice sort order...')}
        />
      </main>

      {/* Footer Note */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 mt-12">
        <p>Payments are recorded by Brightloop after you pay.</p>
      </footer>
    </div>
  );
}
