import * as summaryService from '../services/summaryService.js'

export const getMonthly = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear()
    const month = parseInt(req.query.month) || new Date().getMonth() + 1
    if (month < 1 || month > 12)
      return res.status(400).json({ success: false, message: 'Month must be 1–12' })
    const data = await summaryService.getMonthlySummary(year, month)
    res.json({ success: true, data })
  } catch (err) { next(err) }
}