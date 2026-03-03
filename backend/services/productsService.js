import supabase from '../config/supabase.js'

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('total_revenue', { ascending: false })
  if (error) throw error
  return data
}