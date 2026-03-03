const variants = {
  primary: 'bg-brand-green text-white hover:bg-brand-greenDark active:scale-95',
  danger: 'bg-brand-red text-white hover:bg-red-700 active:scale-95',
  outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-greenLight',
  ghost: 'text-gray-600 hover:bg-gray-100',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children, variant = 'primary', size = 'md',
  className = '', loading = false, icon, ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium 
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </button>
  )
}