import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Invoices() {
    const [invoices, setInvoices] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    const load = async (p = 1) => {
        setLoading(true)
        try {
            const r = await api.get(`/invoices/?page=${p}`)

            setInvoices(r.data.results || r.data)
            setCount(r.data.count || (r.data.length || 0))
        } catch (err) {
            console.error('Failed to load invoices', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const exportCSV = () => {
        const rows = invoices.map((inv: any) => `${inv.reference},${inv.customer_name},${inv.total},${inv.status}`)
        const csv = ['Reference,Customer,Total,Status', ...rows].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'invoices.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-teal-700">Invoices</h2>
                <div className="flex items-center gap-3">
                    <button onClick={exportCSV} className="bg-indigo-600 text-white px-3 py-1 rounded">Export CSV</button>
                    <Link to="/invoices/create" className="btn-brand text-white px-3 py-1 rounded">Create</Link>
                </div>
            </div>
            <div className="card shadow rounded">
                <table className="min-w-full divide-y">
                    <thead className="bg-teal-50">
                        <tr>
                            <th className="px-6 py-3 text-left">Reference</th>
                            <th className="px-6 py-3 text-left">Customer</th>
                            <th className="px-6 py-3 text-left">Total</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
                        ) : invoices.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-4">No invoices found</td></tr>
                        ) : invoices.map(inv => (
                            <tr key={inv.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-3">{inv.reference}</td>
                                <td className="px-6 py-3">{inv.customer_name}</td>
                                <td className="px-6 py-3 font-medium">{inv.total}</td>
                                <td className="px-6 py-3"><span className={inv.status === 'paid' ? 'status-paid' : 'status-pending'}>{inv.status}</span></td>
                                <td className="px-6 py-3 text-right"><Link to={`/invoices/${inv.id}`} className="text-teal-600 font-medium">View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div>Showing {invoices.length} of {count}</div>
                <div className="space-x-2">
                    <button disabled={page <= 1} onClick={() => { const np = page - 1; setPage(np); load(np) }} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
                    <button disabled={invoices.length === 0} onClick={() => { const np = page + 1; setPage(np); load(np) }} className="px-3 py-1 bg-gray-200 rounded">Next</button>
                </div>
            </div>
        </div>
    )
}
