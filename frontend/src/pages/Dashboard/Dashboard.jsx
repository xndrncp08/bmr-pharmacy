import { useDashboard } from '../../hooks/useDashboard'
import StatCard from '../../components/StatCard/StatCard'
import Card from '../../components/Card/Card'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts'

const fmt = (n) => `₱${parseFloat(n || 0).toLocaleString('en', { minimumFractionDigits: 2 })}`

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-surface-200 rounded-xl shadow-cardHover p-3">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="font-data text-sm font-medium text-slate-800">
        {fmt(payload[0]?.value)}
      </p>
      {payload[1] && (
        <p className="text-xs text-slate-400 mt-0.5">
          {payload[1].value} transactions
        </p>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { stats, loading, error } = useDashboard()

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-7 h-7 border-2 border-brand-green border-t-transparent
        rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
      <p className="text-sm text-brand-red font-medium">Failed to load dashboard</p>
      <p className="text-xs text-red-400 mt-0.5">{error}</p>
    </div>
  )

  const change = parseFloat(stats.percentChange)
  const isUp = change >= 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric',
              month: 'long', day: 'numeric'
            })}
          </p>
        </div>
        <span className="text-xs font-medium text-brand-green bg-brand-greenLight
          px-3 py-1.5 rounded-full">
          Live
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Revenue"
          value={fmt(stats.todayTotal)}
          sub={`${isUp ? '↑' : '↓'} ${Math.abs(change)}% vs yesterday`}
          subPositive={isUp}
        />
        <StatCard
          title="Transactions"
          value={stats.todayTransactions}
          sub="today"
        />
        <StatCard
          title="Avg Sale"
          value={stats.todayTransactions > 0
            ? fmt(stats.todayTotal / stats.todayTransactions)
            : '₱0.00'}
          sub="per transaction"
        />
        <StatCard
          title="Month Revenue"
          value={fmt(stats.monthTotal)}
          sub="current month"
        />
      </div>

      {/* Chart */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">
              7-Day Revenue
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily performance overview
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-brand-green inline-block rounded-full" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-blue-200 inline-block rounded-full" />
              Transactions
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={stats.chartData}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date"
              tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'DM Sans' }}
              axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'DM Mono' }}
              axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="revenue" stroke="#16a34a"
              strokeWidth={2}
              dot={{ r: 3, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 5, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="transactions" stroke="#bfdbfe"
              strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}