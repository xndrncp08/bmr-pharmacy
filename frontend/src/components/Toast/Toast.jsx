import { useEffect, useState } from 'react'

const icons = {
  success: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
    </svg>
  ),
}

const styles = {
  success: 'bg-white border-l-4 border-brand-green text-slate-700',
  error:   'bg-white border-l-4 border-brand-red text-slate-700',
  warning: 'bg-white border-l-4 border-amber-400 text-slate-700',
  info:    'bg-white border-l-4 border-blue-400 text-slate-700',
}

const iconStyles = {
  success: 'text-brand-green',
  error:   'text-brand-red',
  warning: 'text-amber-400',
  info:    'text-blue-400',
}

export default function Toast({ id, type = 'success', message, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10)
    // Auto dismiss after 4s
    const exitTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(id), 300)
    }, 4000)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
    }
  }, [id, onRemove])

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-cardHover
        border border-surface-100 min-w-72 max-w-sm transition-all duration-300
        ${styles[type]}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <span className={`shrink-0 mt-0.5 ${iconStyles[type]}`}>
        {icons[type]}
      </span>
      <p className="text-sm font-medium leading-snug flex-1">{message}</p>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(() => onRemove(id), 300)
        }}
        className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors mt-0.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}