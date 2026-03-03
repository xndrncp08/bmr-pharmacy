import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import ToastContainer from '../components/Toast/ToastContainer'
import { useToast } from '../hooks/useToast'
import { ToastContext } from '../context/ToastContext'

export default function MainLayout() {
  const { toasts, toast, removeToast } = useToast()

  return (
    <ToastContext.Provider value={toast}>
      <div className="flex min-h-screen bg-surface-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8 page-enter">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}