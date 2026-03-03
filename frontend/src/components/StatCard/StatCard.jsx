export default function StatCard({ title, value, sub, subPositive }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      {sub && (
        <p className={`text-xs mt-1 font-medium ${
          subPositive === true ? 'text-green-600' :
          subPositive === false ? 'text-red-500' : 'text-gray-400'
        }`}>
          {sub}
        </p>
      )}
    </div>
  )
}