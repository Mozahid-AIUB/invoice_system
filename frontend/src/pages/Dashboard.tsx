import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
    const [stats, setStats] = useState({
        total_invoices: 0,
        pending_amount: 0,
        paid_amount: 0,
        recent_transactions: []
    })

    useEffect(() => {
        Promise.all([
            api.get('/api/invoices/'),
            api.get('/api/transactions/')
        ]).then(([invoices, transactions]) => {
            const pending = invoices.data.filter(inv => inv.status === 'pending')
            const paid = invoices.data.filter(inv => inv.status === 'paid')
            setStats({
                total_invoices: invoices.data.length,
                pending_amount: pending.reduce((sum, inv) => sum + Number(inv.total), 0),
                paid_amount: paid.reduce((sum, inv) => sum + Number(inv.total), 0),
                recent_transactions: transactions.data.slice(0, 5)
            })
        })
    }, [])

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-teal-700">Dashboard</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Total Invoices</h3>
                    <p className="text-3xl font-bold text-teal-600">{stats.total_invoices}</p>
                </div>
                <div className="card p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Pending Amount</h3>
                    <p className="text-3xl font-bold text-amber-600">${stats.pending_amount.toFixed(2)}</p>
                </div>
                <div className="card p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Paid Amount</h3>
                    <p className="text-3xl font-bold text-emerald-600">${stats.paid_amount.toFixed(2)}</p>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Invoice</th>
                                <th className="text-left py-3 px-4">Type</th>
                                <th className="text-left py-3 px-4">Amount</th>
                                <th className="text-left py-3 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recent_transactions.map((tx: any) => (
                                <tr key={tx.id} className="border-b">
                                    <td className="py-3 px-4">{tx.invoice_reference}</td>
                                    <td className="py-3 px-4">
                                        <span className={tx.type === 'payment' ? 'text-emerald-600' : 'text-amber-600'}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">${Number(tx.amount).toFixed(2)}</td>
                                    <td className="py-3 px-4">{new Date(tx.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}