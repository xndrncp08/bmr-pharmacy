import { useState, useEffect } from 'react'
import api from '../services/api'

export const useDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/sales/dashboard')
      .then(r => setStats(r.data.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}