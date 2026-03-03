import { useDashboard } from '../../hooks/useDashboard'
import StatCard from '../../components/StatCard/StatCard'
import Card from '../../components/Card/Card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const fmt = (n) => `₱${parseFloat(n || 0).toLocaleString('en', { minimumFractionDigits: 2 })}`

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      <p className="text-green-600">{fmt(payload[0]?.value)}</p>
      <p className="text-gray-400 text-xs">{payload[1]?.value} transactions</p>
    </div>
  )
}

export default function Dashboard() {
  const { stats, loading, error } = useDashboard()

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (error) return (
    <p className="text-red-500 text-sm p-4 bg-red-50 rounded-xl">Error: {error}</p>
  )

  const change = parseFloat(stats.percentChange)
  const isUp = change >= 0

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })}
          </p>
        </div>
        <div className="text-xs text-gray-400 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
          Live data
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Today's Revenue"
          value={fmt(stats.todayTotal)}
          sub={`${isUp ? '▲' : '▼'} ${Math.abs(change)}% vs yesterday`}
          subPositive={isUp}
        />
        <StatCard
          title="Transactions Today"
          value={stats.todayTransactions}
          sub="sales recorded"
        />
        <StatCard
          title="Avg Sale Value"
          value={stats.todayTransactions > 0
            ? fmt(stats.todayTotal / stats.todayTransactions)
            : '₱0.00'}
          sub="per transaction"
        />
        <StatCard
          title="Month Revenue"
          value={fmt(stats.monthTotal)}
          sub="current month total"
        />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-gray-800">7-Day Revenue</h2>
            <p className="text-xs text-gray-400 mt-0.5">Daily sales performance</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={stats.chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone" dataKey="revenue" stroke="#16a34a"
              strokeWidth={2.5} dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone" dataKey="transactions" stroke="#93c5fd"
              strokeWidth={1.5} dot={false} strokeDasharray="4 4"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-green-600 inline-block rounded" /> Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-blue-300 inline-block rounded" /> Transactions
          </span>
        </div>
      </Card>
    </div>
  )
}