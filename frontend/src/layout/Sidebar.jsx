import { NavLink } from 'react-router-dom'
import logo from '../assets/bmr-logo.png'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/new-sale', label: 'New Sale' },
  { to: '/sales-history', label: 'Sales History' },
  { to: '/product-summary', label: 'Products' },
  { to: '/monthly-summary', label: 'Monthly Summary' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen flex flex-col shrink-0"
      style={{ backgroundColor: '#0f1f0f' }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-center">
        <img src={logo} alt="BMR Pharmacy" className="h-14 w-auto object-contain" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${isActive
                ? 'bg-brand-green text-white shadow-sm'
                : 'text-white/50 hover:text-white/90 hover:bg-white/5'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
          <p className="text-xs text-white/30 font-medium">System Online</p>
        </div>
      </div>
    </aside>
  )
}