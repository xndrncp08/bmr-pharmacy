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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Summary</h1>
        <p className="text-gray-400 text-sm mt-1">Aggregate performance per medicine</p>
      </div>

      <Card padding={false}>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <EmptyState title="No products yet" message="Record your first sale to see product data." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80">
                <tr>
                  {['#', 'Medicine Name', 'Category', 'Total Sold', 'Total Revenue', 'Last Sold'].map(h => (
                    <th key={h} className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p, i) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-400 text-xs font-medium">#{i + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{p.medicine_name}</td>
                    <td className="px-6 py-4"><Badge label={p.category} /></td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{p.total_sold}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      ₱{parseFloat(p.total_revenue).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
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