import { FaGithub } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from "../../services/api.js"

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth()
    const navigate = useNavigate()
    const [me, setMe] = useState(null)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            api.get('/me')
                .then(res => setMe(res.data))
                .catch(() => {})
        } else {
            setMe(null)
        }
    }, [isLoggedIn])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`navbar-custom fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-inner">

                {/* LOGO */}
                <a href="/" className="navbar-logo">
                    <span className="logo-bracket">[</span>
                    ETEC<span className="logo-accent">Games</span>
                    <span className="logo-bracket">]</span>
                </a>

                {/* ACTIONS */}
                <div className="navbar-actions">
                    {isLoggedIn ? (
                        <>
                            <button
                                className="nav-btn nav-btn-ghost"
                                onClick={() => { if (me?.username) navigate(`/profile/${me.username}`) }}
                            >
                                {me?.image ? (
                                    <img className="nav-avatar" src={me.image} alt={me.name} />
                                ) : (
                                    <span className="nav-avatar">
                                        {me?.name?.charAt(0).toUpperCase() ?? '?'}
                                    </span>
                                )}

                                <span className="nav-btn-label">Perfil</span>
                            </button>
                            <button className="nav-btn nav-btn-outline" onClick={logout}>
                                Sair
                            </button>
                        </>
                    ) : (
                        <a href="/login" className="nav-btn nav-btn-primary">
                            Entrar
                        </a>
                    )}

                    <a
                        href="https://github.com/4NUB1Ss2"
                        target="_blank"
                        rel="noreferrer"
                        className="nav-icon-btn"
                        title="GitHub"
                    >
                        <FaGithub />
                    </a>
                </div>

            </div>
        </nav>
    )
}