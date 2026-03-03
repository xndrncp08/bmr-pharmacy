import { useState } from 'react'
import { useSales } from '../../hooks/useSales'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Badge from '../../components/Badge/Badge'
import Button from '../../components/Button/Button'
import EmptyState from '../../components/EmptyState/EmptyState'

export default function SalesHistory() {
  const { sales, loading, error, refetch } = useSales()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilter = () => refetch({ startDate, endDate })
  const handleClear = () => {
    setStartDate('')
    setEndDate('')
    refetch()
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Sales History</h1>
        <p className="text-sm text-slate-400 mt-0.5">All recorded transactions</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-36">
            <Input type="date" label="From"
              value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="flex-1 min-w-36">
            <Input type="date" label="To"
              value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleFilter} size="md">Apply</Button>
            <Button variant="outline" onClick={handleClear} size="md">Reset</Button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-brand-green
              border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-6">
            <p className="text-sm text-brand-red">{error}</p>
          </div>
        ) : sales.length === 0 ? (
          <EmptyState
            title="No sales found"
            message="Try adjusting your date filters or record a new sale."
          />
        ) : (
          <>
            <div className="px-6 py-3.5 border-b border-surface-100
              flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">
                {sales.length} record{sales.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-100">
                    {['Medicine Name', 'Category', 'Price', 'Date'].map(h => (
                      <th key={h}
                        className="text-left px-6 py-3 text-xs font-semibold
                          text-slate-400 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-50">
                  {sales.map(sale => (
                    <tr key={sale.id}
                      className="hover:bg-surface-50 transition-colors duration-100">
                      <td className="px-6 py-3.5 text-sm font-medium text-slate-700">
                        {sale.medicine_name}
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge label={sale.category} />
                      </td>
                      <td className="px-6 py-3.5 font-data text-sm
                        font-medium text-brand-green">
                        ₱{parseFloat(sale.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-400 font-data">
                        {new Date(sale.created_at).toLocaleString('en-US', {
                          month: 'short', day: 'numeric',
                          year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}