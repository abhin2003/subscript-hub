import { useState, useEffect } from 'react';
import { PortalHome } from '../features/portal/PortalHome';
import { PlansCatalogue } from '../features/portal/PlansCatalogue';
import { QuotationReview } from '../features/portal/QuotationReview';
import { SubscriptionDetail } from '../features/portal/SubscriptionDetail';

type ViewMode = 's22' | 's23-1' | 's23-2' | 's24';

function getInitialView(): ViewMode {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('quotation')) return 's23-2';
  if (path.includes('catalogue') || path.includes('plans')) return 's23-1';
  if (path.includes('subscription')) return 's24';
  return 's22';
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>(getInitialView);

  // Sync with browser back/forward buttons instantly
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const switchScreen = (screen: ViewMode) => {
    setCurrentView(screen);
    // Instant URL history update without page reload
    const pathMap: Record<ViewMode, string> = {
      's22': '/portal/home',
      's23-1': '/portal/catalogue',
      's23-2': '/portal/quotations/QUO-2026-9901',
      's24': '/portal/subscriptions',
    };
    window.history.pushState(null, '', pathMap[screen]);
  };

  const handleNavigateTab = (tab: string) => {
    if (tab === 'home' || tab === 'overview') switchScreen('s22');
    else if (tab === 'catalogue') switchScreen('s23-1');
    else if (tab === 'sales' || tab === 'subscriptions') switchScreen('s24');
    else if (tab === 'quotations') switchScreen('s23-2');
  };

  return (
    <div className="relative">
      {/* Floating Instant Screen Switcher Bar */}
      <div className="fixed bottom-5 right-5 z-50 bg-slate-900/95 backdrop-blur-md text-white px-3 py-2 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-1.5 text-xs">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mr-1 hidden sm:inline">
          Screens:
        </span>
        <button
          onClick={() => switchScreen('s22')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            currentView === 's22'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          S22: Home
        </button>
        <button
          onClick={() => switchScreen('s23-1')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            currentView === 's23-1'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          S23-1: Plans
        </button>
        <button
          onClick={() => switchScreen('s23-2')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            currentView === 's23-2'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          S23-2: Quote Review
        </button>
        <button
          onClick={() => switchScreen('s24')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
            currentView === 's24'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          S24: Subscription
        </button>
      </div>

      {/* Screen Renderers - Instant 0ms mounting */}
      {currentView === 's22' && (
        <PortalHome
          onNavigateTab={handleNavigateTab}
          onNavigateScreen={switchScreen}
        />
      )}

      {currentView === 's23-1' && (
        <PlansCatalogue
          onNavigateTab={handleNavigateTab}
          onRequestQuoteSuccess={() => switchScreen('s23-2')}
        />
      )}

      {currentView === 's23-2' && (
        <QuotationReview
          onBack={() => switchScreen('s23-1')}
          onAcceptSuccess={() => switchScreen('s24')}
          onNavigateTab={handleNavigateTab}
        />
      )}

      {currentView === 's24' && (
        <SubscriptionDetail
          onNavigateTab={handleNavigateTab}
          onNavigateScreen={switchScreen}
        />
      )}
    </div>
  );
}

