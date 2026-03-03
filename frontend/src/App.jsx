import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import NewSale from './pages/NewSale/NewSale'
import SalesHistory from './pages/SalesHistory/SalesHistory'
import ProductSummary from './pages/ProductSummary/ProductSummary'
import MonthlySummary from './pages/MonthlySummary/MonthlySummary'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="new-sale" element={<NewSale />} />
          <Route path="sales-history" element={<SalesHistory />} />
          <Route path="product-summary" element={<ProductSummary />} />
          <Route path="monthly-summary" element={<MonthlySummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}