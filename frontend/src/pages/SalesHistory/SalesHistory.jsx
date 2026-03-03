import { useState, useMemo } from 'react'
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
  const [search, setSearch] = useState('')

  const handleFilter = () => refetch({ startDate, endDate })
  const handleClear = () => {
    setStartDate('')
    setEndDate('')
    setSearch('')
    refetch()
  }

  // Client-side search filter
  const filtered = useMemo(() => {
    if (!search.trim()) return sales
    return sales.filter(s =>
      s.medicine_name.toLowerCase().includes(search.toLowerCase().trim())
    )
  }, [sales, search])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Sales History</h1>
        <p className="text-sm text-slate-400 mt-0.5">All recorded transactions</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap items-end gap-3">
          {/* Search */}
          <div className="flex-1 min-w-48">
            <Input
              label="Search"
              placeholder="Search by medicine name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* Date range */}
          <div className="flex-1 min-w-32">
            <Input
              type="date"
              label="From"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-32">
            <Input
              type="date"
              label="To"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
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
        ) : filtered.length === 0 ? (
          <EmptyState
            title={search ? `No results for "${search}"` : 'No sales found'}
            message={search
              ? 'Try a different search term or clear the search.'
              : 'Try adjusting your date filters or record a new sale.'}
          />
        ) : (
          <>
            <div className="px-6 py-3.5 border-b border-surface-100
              flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">
                {filtered.length} record{filtered.length !== 1 ? 's' : ''}
                {search && (
                  <span className="ml-1 text-brand-green">
                    for "{search}"
                  </span>
                )}
              </p>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-xs text-slate-400 hover:text-slate-600
                    transition-colors"
                >
                  Clear search
                </button>
              )}
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
                  {filtered.map(sale => (
                    <tr key={sale.id}
                      className="hover:bg-surface-50 transition-colors duration-100">
                      <td className="px-6 py-3.5 text-sm font-medium text-slate-700">
                        {/* Highlight search match */}
                        {search
                          ? highlightMatch(sale.medicine_name, search)
                          : sale.medicine_name
                        }
                      </td>
                      <td className="px-6 py-3.5">
                        <Badge label={sale.category} />
                      </td>
                      <td className="px-6 py-3.5 font-data text-sm
                        font-medium text-brand-green">
                        ₱{parseFloat(sale.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-3.5 font-data text-xs text-slate-400">
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

// Highlights the matched part of the text in green
function highlightMatch(text, query) {
  const index = text.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return text
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-brand-greenLight text-brand-greenDark
        rounded px-0.5 font-semibold not-italic">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  )
}