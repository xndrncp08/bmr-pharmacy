import supabase from '../config/supabase.js'

export const getAllSales = async ({ startDate, endDate } = {}) => {
  let query = supabase
    .from('sales')
    .select('*')
    .order('created_at', { ascending: false })

  if (startDate) query = query.gte('created_at', new Date(startDate).toISOString())
  if (endDate) {
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)
    query = query.lte('created_at', end.toISOString())
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export const createSale = async ({ medicine_name, category, price }) => {
  const { data: sale, error: saleError } = await supabase
    .from('sales')
    .insert([{ medicine_name, category, price }])
    .select()
    .single()

  if (saleError) throw saleError

  const { data: existing } = await supabase
    .from('products')
    .select('*')
    .eq('medicine_name', medicine_name)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('products')
      .update({
        total_sold: existing.total_sold + 1,
        total_revenue: parseFloat(existing.total_revenue) + parseFloat(price),
        last_sold_at: new Date().toISOString(),
      })
      .eq('medicine_name', medicine_name)
    if (error) throw error
  } else {
    const { error } = await supabase
      .from('products')
      .insert([{
        medicine_name,
        category,
        total_sold: 1,
        total_revenue: parseFloat(price),
        last_sold_at: new Date().toISOString(),
      }])
    if (error) throw error
  }

  return sale
}

export const getDashboardStats = async () => {
  const now = new Date()
  const todayStart = new Date(now); todayStart.setHours(0,0,0,0)
  const yesterdayStart = new Date(todayStart); yesterdayStart.setDate(yesterdayStart.getDate()-1)
  const sevenDaysAgo = new Date(todayStart); sevenDaysAgo.setDate(sevenDaysAgo.getDate()-6)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [todayRes, yesterdayRes, weekRes, monthRes] = await Promise.all([
    supabase.from('sales').select('price').gte('created_at', todayStart.toISOString()),
    supabase.from('sales').select('price').gte('created_at', yesterdayStart.toISOString()).lt('created_at', todayStart.toISOString()),
    supabase.from('sales').select('price, created_at').gte('created_at', sevenDaysAgo.toISOString()),
    supabase.from('sales').select('price').gte('created_at', monthStart.toISOString()),
  ])

  const sum = (rows) => rows?.reduce((a, r) => a + parseFloat(r.price), 0) || 0

  const todayTotal = sum(todayRes.data)
  const yesterdayTotal = sum(yesterdayRes.data)
  const monthTotal = sum(monthRes.data)
  const percentChange = yesterdayTotal === 0
    ? (todayTotal > 0 ? 100 : 0)
    : parseFloat((((todayTotal - yesterdayTotal) / yesterdayTotal) * 100).toFixed(1))

  // Build 7-day chart
  const chartMap = {}
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayStart); d.setDate(d.getDate() - i)
    chartMap[d.toDateString()] = {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: 0,
      transactions: 0,
    }
  }
  weekRes.data?.forEach(s => {
    const key = new Date(s.created_at).toDateString()
    if (chartMap[key]) {
      chartMap[key].revenue += parseFloat(s.price)
      chartMap[key].transactions += 1
    }
  })

  return {
    todayTotal,
    todayTransactions: todayRes.data?.length || 0,
    percentChange,
    monthTotal,
    chartData: Object.values(chartMap),
  }
}