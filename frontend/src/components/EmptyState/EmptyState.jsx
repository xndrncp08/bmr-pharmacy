export default function EmptyState({ title, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-2xl bg-surface-100 flex items-center
        justify-center mb-4">
        <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2
            2H6a2 2 0 01-2-2v-5m16 0H4" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      {message && (
        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
          {message}
        </p>
      )}
    </div>
  )
}