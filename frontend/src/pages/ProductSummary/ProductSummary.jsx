import { useState, useEffect } from 'react'
import api from '../../services/api'
import Card from '../../components/Card/Card'
import Badge from '../../components/Badge/Badge'
import EmptyState from '../../components/EmptyState/EmptyState'

export default function ProductSummary() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then(r => setProducts(r.data.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Product Summary</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Aggregate performance per medicine
        </p>
      </div>

      <Card padding={false}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-brand-green
              border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="No products yet"
            message="Record your first sale to see product data here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-100">
                  {['Rank', 'Medicine Name', 'Category',
                    'Total Sold', 'Total Revenue', 'Last Sold'].map(h => (
                    <th key={h}
                      className="text-left px-6 py-3 text-xs font-semibold
                        text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-50">
                {products.map((p, i) => (
                  <tr key={p.id}
                    className="hover:bg-surface-50 transition-colors duration-100">
                    <td className="px-6 py-3.5">
                      <span className="font-data text-xs font-medium text-slate-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-700">
                      {p.medicine_name}
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge label={p.category} />
                    </td>
                    <td className="px-6 py-3.5 font-data text-sm text-slate-600">
                      {p.total_sold}
                    </td>
                    <td className="px-6 py-3.5 font-data text-sm
                      font-medium text-brand-green">
                      ₱{parseFloat(p.total_revenue).toFixed(2)}
                    </td>
                    <td className="px-6 py-3.5 font-data text-xs text-slate-400">
                      {new Date(p.last_sold_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}