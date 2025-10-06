import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function InvoiceDetail(){
  const { id } = useParams()
  const [invoice, setInvoice] = useState<any>(null)
  useEffect(()=>{ if(id) api.get(`/api/invoices/${id}/`).then(r=>setInvoice(r.data)) }, [id])

  const pay = async ()=>{ if(!id) return; await api.post(`/api/invoices/${id}/pay/`); window.location.reload() }

  if(!invoice) return <div>Loading...</div>
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Invoice {invoice.reference}</h2>
      <div className="mb-4">Customer: {invoice.customer_name}</div>
      <div className="mb-4">Total: {invoice.total}</div>
      <div className="mb-4">Status: {invoice.status}</div>
      <h3 className="font-semibold">Items</h3>
      <ul className="mb-4">
        {invoice.items.map((it:any, i:any)=> <li key={i}>{it.description} x{it.quantity} @ {it.unit_price}</li>)}
      </ul>
      {invoice.status === 'pending' && <button onClick={pay} className="bg-green-600 text-white px-3 py-2 rounded">Mark Paid</button>}
    </div>
  )
}
