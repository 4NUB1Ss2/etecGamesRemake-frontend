import { FaGithub } from 'react-icons/fa'
import './style.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark px-4 fixed-top ">
            <div className="ms-auto d-flex align-items-center gap-3">
                <a href="/login" className="btn btn-login px-4">
                    LOGIN / SIGN UP
                </a>
                <a href="https://github.com/4NUB1Ss2" className="btn btn-github rounded-circle"
                   style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <FaGithub />
                </a>
            </div>
        </nav>
    )
}