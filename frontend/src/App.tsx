import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Invoices from './pages/Invoices'
import CreateInvoice from './pages/CreateInvoice'
import InvoiceDetail from './pages/InvoiceDetail'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Invoice App</h1>
          <nav>
            <Link to="/invoices" className="mr-4 text-blue-600">Invoices</Link>
            <Link to="/invoices/create" className="text-blue-600">Create</Link>
          </nav>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/invoices" element={<Invoices/>} />
            <Route path="/invoices/create" element={<CreateInvoice/>} />
            <Route path="/invoices/:id" element={<InvoiceDetail/>} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
