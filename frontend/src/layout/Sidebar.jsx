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
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm shrink-0">
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-center">
        <img src={logo} alt="BMR Pharmacy" className="h-16 w-auto object-contain" />
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isActive
                ? 'bg-green-50 text-green-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-xs text-gray-400">System Online</p>
        </div>
      </div>
    </aside>
  )
}