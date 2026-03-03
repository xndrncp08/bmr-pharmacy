import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

export const useSales = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSales = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      const { data } = await api.get('/sales', { params: filters })
      setSales(data.data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchSales() }, [fetchSales])

  return { sales, loading, error, refetch: fetchSales }
}