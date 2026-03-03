export default function Select({ label, options = [], error, placeholder = 'Select...', className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-brand-red ml-1">*</span>}
        </label>
      )}
      <select
        className={`border rounded-lg px-3 py-2.5 text-sm outline-none bg-white transition-all
          focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green
          disabled:bg-gray-50 disabled:text-gray-400
          ${error ? 'border-brand-red bg-brand-redLight/20' : 'border-gray-300'}
          ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-brand-red flex items-center gap-1">⚠ {error}</p>}
    </div>
  )
}