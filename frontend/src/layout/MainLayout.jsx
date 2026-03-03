import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-surface-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8 page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  )
}