import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'


export default function CreateInvoice() {
    const [reference, setReference] = useState('')
    const [customer, setCustomer] = useState('')
    const [items, setItems] = useState([{ description: '', quantity: 1, unit_price: '0.00' }])
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const addItem = () => {
        // Prevent adding if last item is empty
        const last = items[items.length - 1]
        if (!last.description || !last.unit_price) return;
        setItems([...items, { description: '', quantity: 1, unit_price: '0.00' }])
    }
    const removeItem = (i: number) => {
        if (items.length === 1) return;
        setItems(items.filter((_, idx) => idx !== i))
    }
    const updateItem = (i: number, key: string, val: any) => {
        const copy = [...items]; copy[i] = { ...copy[i], [key]: val }; setItems(copy)
    }

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            const payload = { reference, customer_name: customer, items }
            const r = await api.post('/api/invoices/', payload)
            navigate(`/invoices/${r.data.id}`)
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'Unable to create invoice')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="card p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Create Invoice</h2>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            <form onSubmit={submit}>
                <div className="mb-3"><label className="block mb-1 text-sm">Reference</label><input value={reference} onChange={e => setReference(e.target.value)} className="w-full border px-3 py-2 rounded" /></div>
                <div className="mb-3"><label className="block mb-1 text-sm">Customer</label><input value={customer} onChange={e => setCustomer(e.target.value)} className="w-full border px-3 py-2 rounded" /></div>
                <div className="mb-3">
                    <label className="block mb-2 font-medium">Items</label>
                    {items.map((it, i) => (
                        <div key={i} className="mb-2 flex gap-2 items-center">
                            <input className="flex-1 border px-2 py-1 rounded" placeholder="Description" value={it.description} onChange={e => updateItem(i, 'description', e.target.value)} />
                            <input className="w-20 border px-2 py-1 rounded text-center" type="number" min={1} value={it.quantity} onChange={e => updateItem(i, 'quantity', Number(e.target.value))} />
                            <input className="w-28 border px-2 py-1 rounded text-right" value={it.unit_price} onChange={e => updateItem(i, 'unit_price', e.target.value)} />
                            <button type="button" onClick={() => removeItem(i)} className="text-red-500 px-2">Remove</button>
                        </div>
                    ))}
                    <div>
                        <button type="button" onClick={addItem} className="text-teal-600 mt-2 disabled:opacity-60" disabled={submitting || !items[items.length - 1].description || !items[items.length - 1].unit_price}>+ Add item</button>
                        {(!items[items.length - 1].description || !items[items.length - 1].unit_price) && <span className="text-xs text-red-500 ml-2">Fill last item before adding</span>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="btn-brand text-white px-4 py-2 rounded shadow disabled:opacity-60" disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</button>
                    <button type="button" onClick={() => { setReference(''); setCustomer(''); setItems([{ description: '', quantity: 1, unit_price: '0.00' }]) }} className="px-4 py-2 border rounded" disabled={submitting}>Reset</button>
                </div>
            </form>
        </div>
    )
}
