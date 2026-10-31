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

import { LoginPage } from '../features/auth/LoginPage'
import { RegisterPage } from '../features/auth/RegisterPage'
import { ForgotPasswordPage } from '../features/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '../features/auth/ResetPasswordPage'
import { AuthRecoveryPreviewPage } from '../features/auth/AuthRecoveryPreviewPage'
import { SystemStatesPage } from '../features/system/SystemStatesPage'
import { ForbiddenPage } from '../features/system/ForbiddenPage'
import { NotFoundPage } from '../features/system/NotFoundPage'
import { RecordNotFoundPage } from '../features/system/RecordNotFoundPage'
import { EmptyStatePage } from '../features/system/EmptyStatePage'
import { ProfilePage } from '../features/profile/ProfilePage'

/**
 * Top floating preview bar to navigate between the authentications and individual error screens
 */
const ScreenNavigationToolbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navGroups = [
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
      group: 'Error & System States',
      items: [
        { label: 'Diagnostics Board', path: '/system-states', badge: 'S04' },
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
        <div className="flex items-center space-x-2.5 shrink-0">
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <ScreenNavigationToolbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* S01 / P01 Sign In (Image 3) */}
          <Route
            path="/login"
            element={
              <LoginPage
                onNavigateRegister={() => navigate('/register')}
                onNavigateForgot={() => navigate('/forgot-password')}
                onSuccess={() => navigate('/system-states')}
              />
            }
          />

          {/* S02 / P02 Register (Image 2) */}
          <Route
            path="/register"
            element={
              <RegisterPage
                onNavigateLogin={() => navigate('/login')}
                onSuccess={() => navigate('/login')}
              />
            }
          />

          {/* S03 / P03 & P04 Recovery flow (Image 4) */}
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

          {/* S04 / P05 System Diagnostics Board (Image 1) */}
          <Route path="/system-states" element={<SystemStatesPage />} />

          {/* Individual Error Screens requested by User */}
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
