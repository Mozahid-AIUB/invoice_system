
import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Invoices from './pages/Invoices'
import CreateInvoice from './pages/CreateInvoice'
import InvoiceDetail from './pages/InvoiceDetail'

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = !!localStorage.getItem('access');

    // Redirect to login if not authenticated and not on login page
    useEffect(() => {
        const publicRoutes = ['/', '/login'];
        if (!isAuth && !publicRoutes.includes(location.pathname)) {
            navigate('/login');
        }
    }, [isAuth, location.pathname, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access');
        navigate('/login');
    };

    return (
        <div className="min-h-screen">
            <header className="bg-gradient-to-r from-teal-400 to-cyan-500 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-white">Invoice Studio</h1>
                    <nav className="flex items-center space-x-6">
                        <Link to="/dashboard" className="text-white/90 hover:underline">Dashboard</Link>
                        <Link to="/invoices" className="text-white/90 hover:underline">Invoices</Link>
                        <Link to="/invoices/create" className="text-white/90 hover:underline">Create</Link>
                        {isAuth && <button onClick={handleLogout} className="text-white/90">Logout</button>}
                    </nav>
                </div>
            </header>
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/invoices/create" element={<CreateInvoice />} />
                        <Route path="/invoices/:id" element={<InvoiceDetail />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}
