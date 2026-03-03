import express from 'express'
import { getSales, addSale, getDashboard } from '../controllers/salesController.js'

const router = express.Router()
router.get('/dashboard', getDashboard)
router.get('/', getSales)
router.post('/', addSale)

export default router