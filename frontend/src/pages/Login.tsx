import React, { useState } from 'react'
import axios from 'axios'

export default function Login(){
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('adminpass')
  const [error, setError] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      const r = await axios.post('/api/token/', { username, password })
      localStorage.setItem('access', r.data.access)
      window.location.href = '/invoices'
    }catch(err:any){ setError(err?.response?.data?.detail || 'Login failed') }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign in</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={login}>
        <div className="mb-3">
          <label className="block mb-1">Username</label>
          <input className="w-full border px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full border px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
      </form>
    </div>
  )
}
