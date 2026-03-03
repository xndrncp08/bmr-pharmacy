import { createPortal } from 'react-dom'
import Toast from './Toast'

export default function ToastContainer({ toasts, onRemove }) {
  return createPortal(
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  )
}