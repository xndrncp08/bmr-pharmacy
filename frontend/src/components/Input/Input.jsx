export default function Input({ label, error, hint, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
          {props.required && <span className="text-brand-red ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full border rounded-lg px-3 py-2.5 text-sm text-slate-800
          bg-white outline-none transition-all placeholder:text-slate-300
          focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green
          disabled:bg-surface-50 disabled:text-slate-400
          ${error
            ? 'border-brand-red bg-red-50/50 focus:ring-brand-red/20 focus:border-brand-red'
            : 'border-surface-200 hover:border-surface-300'
          } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-brand-red font-medium">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}
    </div>
  )
}