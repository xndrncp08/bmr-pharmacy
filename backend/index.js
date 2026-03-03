import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import salesRoutes from './routes/salesRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}))
app.use(express.json())

app.use('/api/sales', salesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/summary', summaryRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'BMR Pharmacy API' }))

app.use(errorHandler)

app.listen(PORT, () => console.log(`BMR API → http://localhost:${PORT}`))