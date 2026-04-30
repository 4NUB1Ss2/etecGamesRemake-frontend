import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))

    function login(newToken) {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    async function loginWithGoogle(credential) {
        const response = await api.post('/auth/google', { token: credential })
        login(response.data.token)
    }

    function logout() {
        localStorage.removeItem('token')
        setToken(null)
        window.location.href = '/'
    }

    return (
        <AuthContext.Provider value={{ token, login, loginWithGoogle , logout, isLoggedIn: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}