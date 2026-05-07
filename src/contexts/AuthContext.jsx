import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [role, setRole] = useState(localStorage.getItem('role'))

    function login(newToken, newRole) {
        localStorage.setItem('token', newToken)
        localStorage.setItem('role', newRole)
        setToken(newToken)
        setRole(newRole)
    }

    async function loginWithGoogle(credential) {
        const response = await api.post('/auth/google', { token: credential })
        login(response.data.token, response.data.user.role)
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        setToken(null)
        setRole(null)
        window.location.href = '/'
    }

    return (
        <AuthContext.Provider value={{ token, role, login, loginWithGoogle , logout, isLoggedIn: !!token, isAdmin: role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}