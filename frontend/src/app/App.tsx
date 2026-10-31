import { Fragment } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { Layers } from 'lucide-react'

// Portal Components (S22, S23-1, S23-2, S24)
import { PortalHome } from '../features/portal/PortalHome'
import { PlansCatalogue } from '../features/portal/PlansCatalogue'
import { QuotationReview } from '../features/portal/QuotationReview'
import { SubscriptionDetail } from '../features/portal/SubscriptionDetail'

// Auth & Profile Components
import { LoginPage } from '../features/auth/LoginPage'
import { RegisterPage } from '../features/auth/RegisterPage'
import { ForgotPasswordPage } from '../features/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '../features/auth/ResetPasswordPage'
import { AuthRecoveryPreviewPage } from '../features/auth/AuthRecoveryPreviewPage'
import { ProfilePage } from '../features/profile/ProfilePage'

// System & Error States
import { SystemStatesPage } from '../features/system/SystemStatesPage'
import { ForbiddenPage } from '../features/system/ForbiddenPage'
import { NotFoundPage } from '../features/system/NotFoundPage'
import { RecordNotFoundPage } from '../features/system/RecordNotFoundPage'
import { EmptyStatePage } from '../features/system/EmptyStatePage'

/**
 * Top floating preview bar to navigate between Portal, Auth, and System screens
 */
const ScreenNavigationToolbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navGroups = [
    {
      group: 'Customer Portal',
      items: [
        { label: 'S22: Home', path: '/portal/home', badge: 'S22' },
        { label: 'S23-1: Plans', path: '/portal/catalogue', badge: 'S23-1' },
        { label: 'S23-2: Quote Review', path: '/portal/quotations/QUO-2026-9901', badge: 'S23-2' },
        { label: 'S24: Subscription', path: '/portal/subscriptions', badge: 'S24' },
      ],
    },
    {
      group: 'Auth & Profile',
      items: [
        { label: 'Sign In', path: '/login', badge: 'P01' },
        { label: 'Register', path: '/register', badge: 'P02' },
        { label: 'Forgot/Reset', path: '/recovery-flow', badge: 'P03/04' },
        { label: 'Profile', path: '/profile', badge: 'P06' },
      ],
    },
    {
      group: 'System States',
      items: [
        { label: 'Diagnostics', path: '/system-states', badge: 'S04' },
        { label: '403 Forbidden', path: '/forbidden', badge: 'ERR-SEC' },
        { label: '404 Route', path: '/not-found', badge: 'ERR-RTE' },
        { label: 'Record Missing', path: '/record-not-found', badge: 'INV-404' },
        { label: 'Table Empty', path: '/table-empty-state', badge: 'GRID' },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5 shrink-0 cursor-pointer" onClick={() => navigate('/portal/home')}>
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white hidden sm:inline">
            Subscript Hub
          </span>
        </div>

        {/* Navigation Switcher Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1 text-xs">
          {navGroups.map((group, gIdx) => (
            <Fragment key={gIdx}>
              {gIdx > 0 && <div className="h-4 w-px bg-slate-700 mx-1 shrink-0" />}
              {group.items.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md font-medium transition-all shrink-0 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-indigo-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </header>
  )
}

function AppShell() {
  const navigate = useNavigate()

  const handlePortalNavigate = (screen: 's22' | 's23-1' | 's23-2' | 's24') => {
    const paths = {
      's22': '/portal/home',
      's23-1': '/portal/catalogue',
      's23-2': '/portal/quotations/QUO-2026-9901',
      's24': '/portal/subscriptions',
    }
    navigate(paths[screen])
  }

  const handleTabNavigate = (tab: string) => {
    if (tab === 'home' || tab === 'overview') navigate('/portal/home')
    else if (tab === 'catalogue') navigate('/portal/catalogue')
    else if (tab === 'sales' || tab === 'subscriptions') navigate('/portal/subscriptions')
    else if (tab === 'quotations') navigate('/portal/quotations/QUO-2026-9901')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <ScreenNavigationToolbar />

      <main className="flex-1">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/portal/subscriptions" replace />} />

          {/* S22 Customer Portal Home */}
          <Route
            path="/portal/home"
            element={
              <PortalHome
                onNavigateTab={handleTabNavigate}
                onNavigateScreen={handlePortalNavigate}
              />
            }
          />
          <Route path="/portal" element={<Navigate to="/portal/home" replace />} />

          {/* S23-1 Plans Catalogue */}
          <Route
            path="/portal/catalogue"
            element={
              <PlansCatalogue
                onNavigateTab={handleTabNavigate}
                onRequestQuoteSuccess={() => navigate('/portal/quotations/QUO-2026-9901')}
              />
            }
          />
          <Route path="/catalogue" element={<Navigate to="/portal/catalogue" replace />} />

          {/* S23-2 Quotation Review */}
          <Route
            path="/portal/quotations/:id"
            element={
              <QuotationReview
                onBack={() => navigate('/portal/catalogue')}
                onAcceptSuccess={() => navigate('/portal/subscriptions')}
                onNavigateTab={handleTabNavigate}
              />
            }
          />
          <Route
            path="/portal/quotation"
            element={<Navigate to="/portal/quotations/QUO-2026-9901" replace />}
          />

          {/* S24 Subscription Details & Management */}
          <Route
            path="/portal/subscriptions"
            element={
              <SubscriptionDetail
                onNavigateTab={handleTabNavigate}
                onNavigateScreen={handlePortalNavigate}
              />
            }
          />
          <Route path="/portal/subscriptions/:id" element={<Navigate to="/portal/subscriptions" replace />} />
          <Route path="/subscriptions" element={<Navigate to="/portal/subscriptions" replace />} />

          {/* S01 / P01 Sign In */}
          <Route
            path="/login"
            element={
              <LoginPage
                onNavigateRegister={() => navigate('/register')}
                onNavigateForgot={() => navigate('/forgot-password')}
                onSuccess={() => navigate('/portal/home')}
              />
            }
          />

          {/* S02 / P02 Register */}
          <Route
            path="/register"
            element={
              <RegisterPage
                onNavigateLogin={() => navigate('/login')}
                onSuccess={() => navigate('/login')}
              />
            }
          />

          {/* S03 / P03 & P04 Recovery flow */}
          <Route path="/recovery-flow" element={<AuthRecoveryPreviewPage />} />
          <Route
            path="/forgot-password"
            element={
              <ForgotPasswordPage onNavigateLogin={() => navigate('/login')} />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ResetPasswordPage
                onRequestNewLink={() => navigate('/forgot-password')}
                onSuccess={() => navigate('/login')}
              />
            }
          />

          {/* S05 / P06 Profile Screen */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/portal/profile" element={<ProfilePage />} />

          {/* S04 / P05 System Diagnostics Board */}
          <Route path="/system-states" element={<SystemStatesPage />} />

          {/* Individual Error Screens */}
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/error/403" element={<ForbiddenPage />} />

          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="/error/404" element={<NotFoundPage />} />

          <Route path="/record-not-found" element={<RecordNotFoundPage />} />
          <Route path="/error/record-not-found" element={<RecordNotFoundPage />} />
          <Route path="/invoices/not-found" element={<RecordNotFoundPage />} />

          <Route path="/table-empty-state" element={<EmptyStatePage />} />
          <Route path="/invoices/empty" element={<EmptyStatePage />} />

          {/* Wildcard 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
