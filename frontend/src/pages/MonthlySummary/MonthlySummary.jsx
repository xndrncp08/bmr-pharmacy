import { useState } from 'react'
import { useMonthlySummary } from '../../hooks/useMonthlySummary'
import StatCard from '../../components/StatCard/StatCard'
import Card from '../../components/Card/Card'
import Badge from '../../components/Badge/Badge'
import EmptyState from '../../components/EmptyState/EmptyState'
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const fmt = (n) =>
  `₱${parseFloat(n || 0).toLocaleString('en', { minimumFractionDigits: 2 })}`

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

export default function MonthlySummary() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth() + 1)
  const { data, loading, error } = useMonthlySummary(year, month)
  const years = Array.from({ length: 3 }, (_, i) => now.getFullYear() - i)
  const momUp = data ? data.momChange >= 0 : true

  const selectClass = `border border-surface-200 rounded-lg px-3 py-2 text-sm
    text-slate-700 bg-white outline-none focus:ring-2 focus:ring-brand-green/20
    focus:border-brand-green transition-all`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Monthly Summary</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Revenue and performance breakdown
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className={selectClass} value={month}
            onChange={e => setMonth(Number(e.target.value))}>
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <select className={selectClass} value={year}
            onChange={e => setYear(Number(e.target.value))}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-7 h-7 border-2 border-brand-green
            border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
          <p className="text-sm text-brand-red font-medium">{error}</p>
        </div>
      ) : !data || data.totalTransactions === 0 ? (
        <EmptyState
          title="No data for this period"
          message="Select a different month or record some sales first."
        />
      ) : (
        <div className="space-y-5">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Revenue" value={fmt(data.totalRevenue)}
              sub={`${momUp ? '↑' : '↓'} ${Math.abs(data.momChange)}% vs last month`}
              subPositive={momUp} />
            <StatCard title="Transactions" value={data.totalTransactions}
              sub="total sales" />
            <StatCard title="Avg Sale Value" value={fmt(data.avgSaleValue)}
              sub="per transaction" />
            <StatCard title="Prev Month" value={fmt(data.prevRevenue)}
              sub="comparison baseline" />
          </div>

          {/* Daily Chart */}
          <Card>
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-slate-700">
                Daily Revenue
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {MONTHS[month - 1]} {year}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={data.dailyChart}
                margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'DM Mono' }}
                  axisLine={false} tickLine={false} />
                <Tooltip formatter={v => [fmt(v), 'Revenue']} />
                <Area type="monotone" dataKey="revenue"
                  stroke="#16a34a" fill="url(#areaGrad)"
                  strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Category Breakdown */}
            <Card>
              <h2 className="text-sm font-semibold text-slate-700 mb-5">
                Category Breakdown
              </h2>
              <div className="space-y-4">
                {data.categoryBreakdown.map(c => (
                  <div key={c.category}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Badge label={c.category} />
                        <span className="text-xs text-slate-400">
                          {c.count} sales
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-data text-sm font-medium text-slate-700">
                          {fmt(c.revenue)}
                        </span>
                        <span className="font-data text-xs text-slate-400 w-8 text-right">
                          {c.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1 bg-surface-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-green rounded-full
                          transition-all duration-700 ease-out"
                        style={{ width: `${c.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top 5 */}
            <Card>
              <h2 className="text-sm font-semibold text-slate-700 mb-5">
                Top 5 Medicines
              </h2>
              <div className="space-y-3">
                {data.topMedicines.map((m, i) => (
                  <div key={m.medicine_name}
                    className="flex items-center gap-3 py-2 border-b
                      border-surface-50 last:border-0">
                    <span className="font-data text-xs font-medium
                      text-slate-300 w-5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {m.medicine_name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-slate-400">
                          {m.count} sold
                        </span>
                        <span className="text-slate-200 text-xs">·</span>
                        <Badge label={m.category} />
                      </div>
                    </div>
                    <span className="font-data text-sm font-medium
                      text-brand-green shrink-0">
                      {fmt(m.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}