import { useState, useEffect } from 'react'
import api from '../services/api'

export const useMonthlySummary = (year, month) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/summary/monthly', { params: { year, month } })
      .then(r => setData(r.data.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [year, month])

  return { data, loading, error }
}