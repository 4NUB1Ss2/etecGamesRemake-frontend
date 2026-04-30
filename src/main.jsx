import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './contexts/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './tokens.css'
import './components.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(


    <StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    </StrictMode>
)


