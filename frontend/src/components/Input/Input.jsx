export default function Input({ label, error, hint, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none 
          transition-all bg-white placeholder:text-gray-400
          focus:ring-2 focus:ring-green-500/30 focus:border-green-500
          disabled:bg-gray-50 disabled:text-gray-400
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300'}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  )
}