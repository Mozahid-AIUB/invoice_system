import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function CreateInvoice(){
  const [reference, setReference] = useState('')
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState([{description:'', quantity:1, unit_price:'0.00'}])
  const navigate = useNavigate()

  const addItem = ()=> setItems([...items, {description:'', quantity:1, unit_price:'0.00'}])
  const updateItem = (i:number, key:string, val:any)=>{
    const copy = [...items]; copy[i]= {...copy[i],[key]:val}; setItems(copy)
  }

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault()
    const payload = { reference, customer_name: customer, items }
    const r = await api.post('/api/invoices/', payload)
    navigate(`/invoices/${r.data.id}`)
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
      <form onSubmit={submit}>
        <div className="mb-3"><label className="block mb-1">Reference</label><input value={reference} onChange={e=>setReference(e.target.value)} className="w-full border px-3 py-2"/></div>
        <div className="mb-3"><label className="block mb-1">Customer</label><input value={customer} onChange={e=>setCustomer(e.target.value)} className="w-full border px-3 py-2"/></div>
        <div className="mb-3">
          <label className="block mb-2">Items</label>
          {items.map((it,i)=> (
            <div key={i} className="mb-2 flex gap-2">
              <input className="flex-1 border px-2 py-1" placeholder="Description" value={it.description} onChange={e=>updateItem(i,'description',e.target.value)} />
              <input className="w-20 border px-2 py-1" value={it.quantity} onChange={e=>updateItem(i,'quantity',Number(e.target.value))} />
              <input className="w-28 border px-2 py-1" value={it.unit_price} onChange={e=>updateItem(i,'unit_price',e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addItem} className="mt-2 text-blue-600">+ Add item</button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  )
}
