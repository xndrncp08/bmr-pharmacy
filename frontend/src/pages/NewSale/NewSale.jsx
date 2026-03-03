import { useState } from 'react'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Select from '../../components/select/Select'
import Button from '../../components/Button/Button'
import api from '../../services/api'

const CATEGORIES = [
  { value: 'Generic', label: 'Generic' },
  { value: 'Branded', label: 'Branded' },
  { value: 'OTC', label: 'Over-the-Counter (OTC)' },
  { value: 'Supplement', label: 'Supplement' },
]

const EMPTY = { medicine_name: '', category: '', price: '' }

export default function NewSale() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.medicine_name.trim()) e.medicine_name = 'Medicine name is required'
    if (!form.category) e.category = 'Please select a category'
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0)
      e.price = 'Enter a valid positive price'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) return setErrors(e)
    try {
      setLoading(true)
      setSuccess(null)
      const { data } = await api.post('/sales', { ...form, price: parseFloat(form.price) })
      setSuccess(`✅ Sale recorded: ${data.data.medicine_name} — ₱${parseFloat(data.data.price).toFixed(2)}`)
      setForm(EMPTY)
      setErrors({})
    } catch {
      setErrors({ submit: '❌ Failed to record sale. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Sale</h1>
        <p className="text-gray-400 text-sm mt-1">Record a new medicine transaction</p>
      </div>

      <div className="max-w-lg">
        {success && (
          <div className="mb-4 p-4 bg-brand-greenLight text-brand-green rounded-xl text-sm font-medium border border-green-200">
            {success}
          </div>
        )}
        {errors.submit && (
          <div className="mb-4 p-4 bg-brand-redLight text-brand-red rounded-xl text-sm border border-red-200">
            {errors.submit}
          </div>
        )}

        <Card>
          <div className="flex flex-col gap-5">
            <Input
              label="Medicine Name"
              placeholder="e.g. Amoxicillin 500mg"
              value={form.medicine_name}
              onChange={e => set('medicine_name', e.target.value)}
              error={errors.medicine_name}
              required
            />
            <Select
              label="Category"
              options={CATEGORIES}
              value={form.category}
              onChange={e => set('category', e.target.value)}
              error={errors.category}
              required
            />
            <Input
              label="Price (₱)"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              error={errors.price}
              hint="Enter the sale price in Philippine Pesos"
              required
            />
            <div className="pt-1 flex gap-3">
              <Button onClick={handleSubmit} loading={loading} className="flex-1">
                Record Sale
              </Button>
              <Button variant="secondary" onClick={() => { setForm(EMPTY); setErrors({}) }}>
                Clear
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}