const palette = {
  Generic:    'bg-blue-50 text-blue-600 border-blue-100',
  Branded:    'bg-violet-50 text-violet-600 border-violet-100',
  OTC:        'bg-emerald-50 text-emerald-600 border-emerald-100',
  Supplement: 'bg-amber-50 text-amber-600 border-amber-100',
  default:    'bg-slate-50 text-slate-500 border-slate-100',
}

export default function Badge({ label }) {
  const style = palette[label] || palette.default
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5
      rounded-md border ${style}`}>
      {label}
    </span>
  )
}