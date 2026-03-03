import express from 'express'
import { getMonthly } from '../controllers/summaryController.js'

const router = express.Router()
router.get('/monthly', getMonthly)
export default router