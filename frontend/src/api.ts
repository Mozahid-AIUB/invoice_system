import axios from 'axios'

const base = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000'
const api = axios.create({ baseURL: base })
api.interceptors.request.use(config => {
    const token = localStorage.getItem('access')
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default api
