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
  const handleClear = () => { setStartDate(''); setEndDate(''); refetch() }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales History</h1>
        <p className="text-gray-400 text-sm mt-1">All recorded transactions</p>
      </div>

      {/* Filters */}
      <Card className="mb-5">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-36">
            <Input type="date" label="From" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="flex-1 min-w-36">
            <Input type="date" label="To" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleFilter} size="md">Filter</Button>
            <Button variant="secondary" onClick={handleClear} size="md">Clear</Button>
          </div>
        </div>
      </Card>

      <Card padding={false}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="p-6 text-brand-red text-sm">⚠ {error}</p>
        ) : sales.length === 0 ? (
          <EmptyState icon="📋" title="No sales found" message="Try adjusting your date filters or record a new sale." />
        ) : (
          <>
            <div className="px-6 py-3 border-b border-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-500">{sales.length} record{sales.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    {['Medicine Name', 'Category', 'Price', 'Date & Time'].map(h => (
                      <th key={h} className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sales.map(sale => (
                    <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{sale.medicine_name}</td>
                      <td className="px-6 py-4"><Badge label={sale.category} /></td>
                      <td className="px-6 py-4 font-semibold text-brand-green">
                        ₱{parseFloat(sale.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(sale.created_at).toLocaleString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
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