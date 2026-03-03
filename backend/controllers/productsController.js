import * as productsService from '../services/productsService.js'

export const getProducts = async (req, res, next) => {
  try {
    const data = await productsService.getAllProducts()
    res.json({ success: true, data })
  } catch (err) { next(err) }
}