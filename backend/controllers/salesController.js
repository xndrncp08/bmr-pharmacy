import * as salesService from '../services/salesService.js'

export const getSales = async (req, res, next) => {
  try {
    const data = await salesService.getAllSales(req.query)
    res.json({ success: true, data })
  } catch (err) { next(err) }
}

export const addSale = async (req, res, next) => {
  try {
    const { medicine_name, category, price } = req.body
    if (!medicine_name?.trim() || !category || !price)
      return res.status(400).json({ success: false, message: 'All fields are required' })
    if (isNaN(price) || parseFloat(price) <= 0)
      return res.status(400).json({ success: false, message: 'Price must be a positive number' })
    const data = await salesService.createSale({ medicine_name: medicine_name.trim(), category, price })
    res.status(201).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getDashboard = async (req, res, next) => {
  try {
    const data = await salesService.getDashboardStats()
    res.json({ success: true, data })
  } catch (err) { next(err) }
}