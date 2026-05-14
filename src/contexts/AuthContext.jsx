import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [role, setRole]   = useState(localStorage.getItem('role'))
    const [me, setMe]       = useState(null)

    useEffect(() => {
        if (token) {
            api.get('/me')
                .then(res => setMe(res.data))
                .catch(() => {})
        } else {
            setMe(null)
        }
    }, [token])

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
        setMe(null)
        window.location.href = '/'
    }

    function isAdmin() {
        return localStorage.getItem('role') === 'admin'
    }

    // precisa de verificação de email ou aprovação?
    const needsVerification =
        me &&
        (me.role === 'student' || me.role === 'professor') &&
        !(me.verified === 1 && me.aproved === 1)

    return (
        <AuthContext.Provider value={{
            token, role, me, setMe,
            login, loginWithGoogle, logout,
            isLoggedIn: !!token,
            isAdmin: role === 'admin',
            needsVerification,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}