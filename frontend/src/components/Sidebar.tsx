import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  HelpCircle,
  Settings
} from 'lucide-react'

interface SidebarProps {
  onCreateSubscription: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onCreateSubscription }) => {
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Overview',
      path: '/',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    },
    {
      name: 'Sales',
      path: '/sales',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 14h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z" />
          <path d="M6 14V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
          <rect x="8" y="3" width="8" height="4" rx="1" />
          <line x1="7" y1="18" x2="7.01" y2="18" />
          <line x1="10" y1="18" x2="10.01" y2="18" />
          <line x1="13" y1="18" x2="13.01" y2="18" />
          <line x1="16" y1="18" x2="17" y2="18" />
        </svg>
      )
    },
    {
      name: 'Billing',
      path: '/billing',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 2v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1z" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="12" y2="14" />
        </svg>
      )
    },
    {
      name: 'Catalogue',
      path: '/catalogue',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="4" rx="1" />
          <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
      )
    },
    {
      name: 'Finance Rules',
      path: '/finance-rules',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-6 9 6" />
          <line x1="4" y1="10" x2="20" y2="10" />
          <line x1="6" y1="10" x2="6" y2="18" />
          <line x1="10" y1="10" x2="10" y2="18" />
          <line x1="14" y1="10" x2="14" y2="18" />
          <line x1="18" y1="10" x2="18" y2="18" />
          <line x1="3" y1="18" x2="21" y2="18" />
          <line x1="2" y1="21" x2="22" y2="21" />
        </svg>
      )
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-5 5" />
        </svg>
      )
    },
    {
      name: 'Admin',
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <circle cx="12" cy="10" r="3" />
          <path d="M8 17c0-2.2 1.8-4 4-4s4 1.8 4 4" />
        </svg>
      )
    }
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-screen shrink-0 sticky top-0 select-none z-30">
      {/* Top Branding & Main Navigation */}
      <div className="p-4 flex flex-col gap-6">
        {/* Brand Header */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 px-2 py-1 cursor-pointer group"
        >
          <div className="w-11 h-11 bg-[#3223d2] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm tracking-wider transition-transform group-hover:scale-105">
            SH
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] font-bold text-[#3223d2] tracking-tight leading-tight">
              Subscript Hub
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Brightloop Software
            </span>
          </div>
        </div>

        {/* Navigation Items List */}
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#eef2ff] text-[#3223d2] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`${isActive ? 'text-[#3223d2]' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Action Button & Bottom Section */}
      <div className="p-4 flex flex-col gap-4">
        {/* Primary CTA Button */}
        <button
          onClick={onCreateSubscription}
          type="button"
          className="w-full bg-[#3223d2] hover:bg-[#281bb0] active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer text-[15px]"
        >
          Create Subscription
        </button>

        {/* Divider */}
        <div className="border-t border-slate-200" />

        {/* Bottom Utility Links */}
        <div className="flex flex-col space-y-1">
          <NavLink
            to="/documentation"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#eef2ff] text-[#3223d2] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <HelpCircle className="w-5 h-5 text-slate-500 stroke-[1.8]" />
            <span>Documentation</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#eef2ff] text-[#3223d2] font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <Settings className="w-5 h-5 text-slate-500 stroke-[1.8]" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}
export default Sidebar
