import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './style.css'

const NAV = [
    { to: '/admin/users',      icon: '👤', label: 'Usuários'   },
    { to: '/admin/games',      icon: '🎮', label: 'Jogos'      },
    { to: '/admin/schools',    icon: '🏫', label: 'Escolas'    },
    { to: '/admin/approvals',  icon: '✅', label: 'Aprovações' },
]

export default function AdminLayout() {
    const { logout } = useAuth()
    const navigate   = useNavigate()

    return (
        <div className="adm-root">

            {/* SIDEBAR */}
            <aside className="adm-sidebar">
                <div className="adm-sidebar-top">
                    <button className="adm-logo" onClick={() => navigate('/')}>
                        <span className="adm-logo-bracket">[</span>
                        ETEC<span className="adm-logo-accent">Games</span>
                        <span className="adm-logo-bracket">]</span>
                    </button>
                    <span className="adm-badge">Admin</span>
                </div>

                <nav className="adm-nav">
                    {NAV.map(({ to, icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `adm-nav-item ${isActive ? 'adm-nav-active' : ''}`
                            }
                        >
                            <span className="adm-nav-icon">{icon}</span>
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="adm-sidebar-bottom">
                    <button className="adm-nav-item adm-logout" onClick={logout}>
                        <span className="adm-nav-icon">🚪</span>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <main className="adm-main">
                <Outlet />
            </main>

        </div>
    )
}