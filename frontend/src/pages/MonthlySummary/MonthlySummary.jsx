import { useState } from 'react'
import { useMonthlySummary } from '../../hooks/useMonthlySummary'
import StatCard from '../../components/StatCard/StatCard'
import Card from '../../components/Card/Card'
import Badge from '../../components/Badge/Badge'
import EmptyState from '../../components/EmptyState/EmptyState'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

const fmt = (n) => `₱${parseFloat(n || 0).toLocaleString('en', { minimumFractionDigits: 2 })}`

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

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">Monthly Summary</h1>
          <p className="text-gray-400 text-sm mt-1">Revenue and performance breakdown</p>
        </div>
        <div className="flex items-end gap-2">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Month</label>
            <select
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white
                focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none"
              value={month} onChange={e => setMonth(Number(e.target.value))}
            >
              {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Year</label>
            <select
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white
                focus:ring-2 focus:ring-green-500/30 focus:border-green-500 outline-none"
              value={year} onChange={e => setYear(Number(e.target.value))}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm p-4 bg-red-50 rounded-xl">Error: {error}</p>
      ) : !data || data.totalTransactions === 0 ? (
        <EmptyState title="No data for this period" message="Select a different month or record sales." />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value={fmt(data.totalRevenue)}
              sub={`${momUp ? '▲' : '▼'} ${Math.abs(data.momChange)}% vs last month`}
              subPositive={momUp}
            />
            <StatCard title="Transactions" value={data.totalTransactions} sub="total sales" />
            <StatCard title="Avg Sale Value" value={fmt(data.avgSaleValue)} sub="per transaction" />
            <StatCard title="Prev Month" value={fmt(data.prevRevenue)} sub="comparison baseline" />
          </div>

          <Card>
            <h2 className="font-semibold text-gray-800 mb-1">
              Daily Revenue — {MONTHS[month - 1]} {year}
            </h2>
            <p className="text-xs text-gray-400 mb-5">Day-by-day breakdown</p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={data.dailyChart} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [fmt(v), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#grad)"
                  strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="font-semibold text-gray-800 mb-1">Category Breakdown</h2>
              <p className="text-xs text-gray-400 mb-5">Revenue share by category</p>
              {data.categoryBreakdown.length === 0 ? (
                <EmptyState title="No category data" />
              ) : (
                <div className="space-y-3">
                  {data.categoryBreakdown.map(c => (
                    <div key={c.category}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Badge label={c.category} />
                          <span className="text-xs text-gray-400">{c.count} sales</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-800">{fmt(c.revenue)}</span>
                          <span className="text-xs text-gray-400 ml-2">{c.percentage}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full transition-all duration-500"
                          style={{ width: `${c.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <h2 className="font-semibold text-gray-800 mb-1">Top 5 Medicines</h2>
              <p className="text-xs text-gray-400 mb-5">By revenue this month</p>
              {data.topMedicines.length === 0 ? (
                <EmptyState title="No medicine data" />
              ) : (
                <div className="space-y-3">
                  {data.topMedicines.map((m, i) => (
                    <div key={m.medicine_name} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 w-5">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{m.medicine_name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs text-gray-400">{m.count} sold</span>
                          <span className="text-gray-200">·</span>
                          <Badge label={m.category} />
                        </div>
                      </div>
                      <p className="text-sm font-bold text-green-600 shrink-0">{fmt(m.revenue)}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}