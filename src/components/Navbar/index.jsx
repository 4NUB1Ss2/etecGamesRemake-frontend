import { FaGithub } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './style.css'
import api from "../../services/api.js";

export default function Navbar() {

    const { isLoggedIn, logout } = useAuth()
    const navigate = useNavigate()

    async function me(){
        const res = await api.get('/me')
        console.log(res.data)
    }
    return (


        <nav className="navbar navbar-dark bg-dark px-4 fixed-top">
            <div className="ms-auto d-flex align-items-center gap-3">
                {isLoggedIn ? (
                    <>
                        <button className="btn btn-login px-4" onClick={() => navigate('/profile')}>
                            Ver Perfil
                        </button>
                        <button className="btn btn-sair px-4" onClick={logout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <a href="/login" className="btn btn-login px-4">
                        LOGIN / SIGN UP
                    </a>
                )}
                <a href="https://github.com/4NUB1Ss2" className="btn btn-github rounded-circle"
                   style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FaGithub />
                </a>
            </div>
        </nav>
    )
}