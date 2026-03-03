import { useState } from 'react'
import Card from '../../components/Card/Card'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
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
    if (!form.medicine_name.trim()) e.medicine_name = 'Required'
    if (!form.category) e.category = 'Required'
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0)
      e.price = 'Enter a valid price'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) return setErrors(e)
    try {
      setLoading(true)
      setSuccess(null)
      const { data } = await api.post('/sales', {
        ...form, price: parseFloat(form.price)
      })
      setSuccess(`Sale recorded — ${data.data.medicine_name} at ₱${parseFloat(data.data.price).toFixed(2)}`)
      setForm(EMPTY)
      setErrors({})
    } catch {
      setErrors({ submit: 'Failed to record sale. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">New Sale</h1>
        <p className="text-sm text-slate-400 mt-0.5">Record a new medicine transaction</p>
      </div>

      <div className="max-w-md">
        {success && (
          <div className="mb-4 px-4 py-3 bg-brand-greenLight border border-green-200
            rounded-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
            <p className="text-sm text-brand-greenDark font-medium">{success}</p>
          </div>
        )}
        {errors.submit && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100
            rounded-lg">
            <p className="text-sm text-brand-red font-medium">{errors.submit}</p>
          </div>
        )}

        <Card>
          <div className="space-y-5">
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
              required
            />
            <div className="flex gap-2 pt-1">
              <Button onClick={handleSubmit} loading={loading} className="flex-1">
                Record Sale
              </Button>
              <Button variant="outline"
                onClick={() => { setForm(EMPTY); setErrors({}); setSuccess(null) }}>
                Clear
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}