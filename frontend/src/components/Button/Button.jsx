const variants = {
  primary: 'bg-brand-green text-white hover:bg-brand-greenDark active:scale-95 shadow-sm',
  danger: 'bg-brand-red text-white hover:bg-red-700 active:scale-95',
  outline: 'border border-surface-200 text-slate-700 hover:bg-surface-50 hover:border-surface-300',
  ghost: 'text-slate-500 hover:text-slate-700 hover:bg-surface-100',
  secondary: 'bg-surface-100 text-slate-600 hover:bg-surface-200',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}

export default function Button({
  children, variant = 'primary', size = 'md',
  className = '', loading = false, ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent
          rounded-full animate-spin shrink-0" />
      )}
      {children}
    </button>
  )
}