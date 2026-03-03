export default function StatCard({ title, value, sub, subPositive }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 shadow-card p-5
      hover:shadow-cardHover transition-shadow duration-200">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
        {title}
      </p>
      <p className="font-data text-3xl font-medium text-slate-800 leading-none">
        {value}
      </p>
      {sub && (
        <p className={`text-xs mt-2.5 font-medium flex items-center gap-1 ${
          subPositive === true ? 'text-brand-green' :
          subPositive === false ? 'text-brand-red' :
          'text-slate-400'
        }`}>
          {sub}
        </p>
      )}
    </div>
  )
}