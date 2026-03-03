export default function Card({ children, className = '', padding = true }) {
  return (
    <div className={`bg-white rounded-xl border border-surface-200 shadow-card
      ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}