
import React, { useState, useEffect } from 'react'
import api from '../api'


export default function Login() {
    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('adminpass')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Clear token on mount to avoid stale sessions
        localStorage.removeItem('access');
    }, []);

    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const r = await api.post('/api/token/', { username, password })
            localStorage.setItem('access', r.data.access)
            window.location.href = '/invoices'
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'Invalid username or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto card p-6 rounded-lg shadow-lg mt-12">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Welcome back</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={login}>
                <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                    <input className="w-full border px-3 py-2 rounded" value={username} onChange={e => setUsername(e.target.value)} disabled={loading} autoFocus />
                </div>
                <div className="mb-3">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
                </div>
                <button className="btn-brand text-white px-4 py-2 rounded shadow disabled:opacity-60" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            </form>
        </div>
    )
}
