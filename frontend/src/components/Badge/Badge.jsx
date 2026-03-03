const palette = {
  Generic: 'bg-blue-100 text-blue-700 ring-blue-200',
  Branded: 'bg-violet-100 text-violet-700 ring-violet-200',
  OTC: 'bg-brand-greenLight text-brand-green ring-green-200',
  Supplement: 'bg-amber-100 text-amber-700 ring-amber-200',
  default: 'bg-gray-100 text-gray-600 ring-gray-200',
}

export default function Badge({ label }) {
  const style = palette[label] || palette.default
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 
      rounded-full ring-1 ring-inset ${style}`}>
      {label}
    </span>
  )
}