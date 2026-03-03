import supabase from '../config/supabase.js'

export const getMonthlySummary = async (year, month) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59, 999)

  const prevStartDate = new Date(year, month - 2, 1)
  const prevEndDate = new Date(year, month - 1, 0, 23, 59, 59, 999)

  const [current, previous] = await Promise.all([
    supabase.from('sales').select('price, category, medicine_name, created_at')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString()),
    supabase.from('sales').select('price')
      .gte('created_at', prevStartDate.toISOString())
      .lte('created_at', prevEndDate.toISOString()),
  ])

  if (current.error) throw current.error

  const sales = current.data || []
  const prevSales = previous.data || []

  const totalRevenue = sales.reduce((a, s) => a + parseFloat(s.price), 0)
  const totalTransactions = sales.length
  const avgSaleValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0

  const prevRevenue = prevSales.reduce((a, s) => a + parseFloat(s.price), 0)
  const momChange = prevRevenue === 0
    ? (totalRevenue > 0 ? 100 : 0)
    : parseFloat((((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1))

  // Category breakdown
  const categoryMap = {}
  sales.forEach(s => {
    if (!categoryMap[s.category]) categoryMap[s.category] = { revenue: 0, count: 0 }
    categoryMap[s.category].revenue += parseFloat(s.price)
    categoryMap[s.category].count += 1
  })
  const categoryBreakdown = Object.entries(categoryMap).map(([category, v]) => ({
    category, ...v,
    percentage: totalRevenue > 0 ? parseFloat(((v.revenue / totalRevenue) * 100).toFixed(1)) : 0
  })).sort((a, b) => b.revenue - a.revenue)

  // Top 5 medicines
  const medicineMap = {}
  sales.forEach(s => {
    if (!medicineMap[s.medicine_name])
      medicineMap[s.medicine_name] = { medicine_name: s.medicine_name, category: s.category, revenue: 0, count: 0 }
    medicineMap[s.medicine_name].revenue += parseFloat(s.price)
    medicineMap[s.medicine_name].count += 1
  })
  const topMedicines = Object.values(medicineMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  // Daily chart data
  const daysInMonth = new Date(year, month, 0).getDate()
  const dailyMap = {}
  for (let d = 1; d <= daysInMonth; d++) {
    dailyMap[d] = { day: d, revenue: 0, transactions: 0 }
  }
  sales.forEach(s => {
    const day = new Date(s.created_at).getDate()
    if (dailyMap[day]) {
      dailyMap[day].revenue += parseFloat(s.price)
      dailyMap[day].transactions += 1
    }
  })

  return {
    totalRevenue,
    totalTransactions,
    avgSaleValue,
    momChange,
    prevRevenue,
    categoryBreakdown,
    topMedicines,
    dailyChart: Object.values(dailyMap),
  }
}