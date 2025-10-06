import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Invoices(){
  const [invoices, setInvoices] = useState<any[]>([])
  useEffect(()=>{ api.get('/api/invoices/').then(r=>setInvoices(r.data)) }, [])
  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <Link to="/invoices/create" className="bg-blue-600 text-white px-3 py-1 rounded">Create</Link>
      </div>
      <div className="bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Reference</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv=> (
              <tr key={inv.id} className="border-t">
                <td className="px-6 py-3">{inv.reference}</td>
                <td className="px-6 py-3">{inv.customer_name}</td>
                <td className="px-6 py-3">{inv.total}</td>
                <td className="px-6 py-3">{inv.status}</td>
                <td className="px-6 py-3 text-right"><Link to={`/invoices/${inv.id}`} className="text-blue-600">View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
