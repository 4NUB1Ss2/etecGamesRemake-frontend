import { useNavigate } from 'react-router-dom'
import GameList from '../../components/GameList'
import { useAuth } from '../../contexts/AuthContext.jsx'
import {useEffect, useState} from "react";
import './style.css'
import api from "../../services/api.js";

function Index() {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    const [me, setMe] = useState(null)
    const [role, setRole] = useState('user') // student | professor | user

    useEffect(() => {
        if (isLoggedIn) {
            api.get('/me')
                .then(res => {
                    setMe(res.data)
                    setRole(res.data.role)
                })
                .catch(() => {})
        } else {
            setMe(null)
        }
    }, [isLoggedIn])

    return (
        <div className="games-page">

            {/* PAGE HEADER */}
            <div className="games-header">
                <div className="games-header-glow" />
                <div className="container-lg games-header-inner">
                    <div>
                        <h1 className="games-header-title">Explorar Jogos</h1>
                        <p className="games-header-sub">Descubra projetos de alunos e professores de ETECs de todo o Brasil</p>
                    </div>
                    {isLoggedIn && role !== 'user' &&(
                    <button className="games-upload-btn" onClick={() => {if (me.username) navigate(`/profile/${me.username}`)}}>
                        + Publicar jogo
                    </button>
                    )}
                </div>
            </div>

            {/* GAME LISTS */}
            <div className="games-lists">
                <GameList title="🕹️ Últimos Lançamentos"    section="last"    />
                <GameList title="🔥 Mais Acessados"          section="clicks"  />
                <GameList title="🔄 Atualizados Recentemente" section="last" />
            </div>

        </div>
    )
}

export default Index