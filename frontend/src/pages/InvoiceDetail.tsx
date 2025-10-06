import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { generateInvoicePDF } from '../utils/pdf'

export default function InvoiceDetail() {
    const { id } = useParams()
    const [invoice, setInvoice] = useState<any>(null)
    useEffect(() => { if (id) api.get(`/api/invoices/${id}/`).then(r => setInvoice(r.data)) }, [id])

    const pay = async () => { if (!id) return; await api.post(`/api/invoices/${id}/pay/`); window.location.reload() }

    const [transactions, setTransactions] = useState<any[]>([])
    useEffect(() => { api.get('/api/transactions/').then(r => setTransactions(r.data)) }, [])

    if (!invoice) return <div>Loading...</div>
    return (
        <div className="card p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Invoice {invoice.reference}</h2>
            <div className="mb-4">Customer: <span className="font-medium">{invoice.customer_name}</span></div>
            <div className="mb-4">Total: <span className="font-semibold">{invoice.total}</span></div>
            <div className="mb-4">Status: <span className={invoice.status === 'paid' ? 'status-paid' : 'status-pending'}>{invoice.status}</span></div>
            <h3 className="font-semibold">Items</h3>
            <ul className="mb-4 list-disc pl-6">
                {invoice.items.map((it: any, i: any) => <li key={i}>{it.description} x{it.quantity} @ {it.unit_price}</li>)}
            </ul>
            {invoice.status === 'pending' && <button onClick={pay} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded shadow">Mark Paid</button>}

            <h3 className="mt-6 font-semibold">Transaction history</h3>
            <div className="mt-2 bg-gray-50 p-4 rounded">
                {transactions.filter(t => t.invoice_reference === invoice.reference).length === 0 && <div className="text-sm text-gray-600">No transactions yet</div>}
                {transactions.filter(t => t.invoice_reference === invoice.reference).map((t, i) => (
                    <div key={i} className="flex justify-between py-2 border-b">
                        <div className="font-medium">{t.type}</div>
                        <div className="text-right">{t.amount} <div className="text-xs text-gray-500">{new Date(t.created_at).toLocaleString()}</div></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
