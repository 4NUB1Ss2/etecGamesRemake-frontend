import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api.js'
import './style.css'

export default function Index() {
    const { name } = useParams()
    const navigate = useNavigate()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [imgLoaded, setImgLoaded] = useState(false)

    useEffect(() => {
        api.get(`/games/${name}`)
            .then(res => setGame(res.data))
            .catch(() => setError('Jogo não encontrado'))
            .finally(() => setLoading(false))
    }, [name])

    function handlePlay() {
        api.post(`/games/${name}/click`).catch(() => {})
        window.open(game.link, '_blank', 'noopener,noreferrer')
    }

    if (loading) return (
        <div className="gd-loading">
            <div className="gd-spinner" />
        </div>
    )

    if (error) return (
        <div className="gd-error-page">
            <span>🎮</span>
            <h2>{error}</h2>
            <button onClick={() => navigate('/games')}>Ver todos os jogos</button>
        </div>
    )

    const avatarLetter = game.user?.name?.charAt(0).toUpperCase() ?? '?'

    return (
        <div className="gd-page">

            {/* HERO */}
            <div className="gd-hero">
                <div className={`gd-hero-img-wrap ${imgLoaded ? 'gd-loaded' : ''}`}>
                    <img
                        src={game.image}
                        alt={game.name}
                        className="gd-hero-img"
                        onLoad={() => setImgLoaded(true)}
                    />
                    <div className="gd-hero-gradient" />
                </div>
                <div className="gd-hero-overlay">
                    <button className="gd-back" onClick={() => navigate(-1)}>
                        ← Voltar
                    </button>
                    <div className="gd-hero-meta">
                        <span className="gd-clicks">🕹️ {game.clicks ?? 0} plays</span>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="gd-content">

                {/* LEFT */}
                <div className="gd-left">
                    <h1 className="gd-title">{game.name}</h1>

                    <p className="gd-description">{game.description}</p>

                    <button className="gd-play-btn" onClick={handlePlay}>
                        <span className="gd-play-icon">▶</span>
                        Jogar agora
                    </button>
                </div>

                {/* RIGHT */}
                <aside className="gd-aside">

                    {/* CREATOR */}
                    <div className="gd-card gd-creator-card">
                        <span className="gd-card-label">Criador</span>
                        <Link
                            to={`/profile/${game.creator_username}`}
                            className="gd-creator-link"
                        >
                            <div className="gd-avatar">{avatarLetter}</div>
                            <div className="gd-creator-info">
                                <strong className="gd-creator-name">{game.creator_name}</strong>
                                <span className="gd-creator-username">@{game.creator_username}</span>
                            </div>
                            <span className="gd-arrow">→</span>
                        </Link>
                    </div>

                    {/* SCHOOL */}
                    {game.school_name && (
                        <div className="gd-card">
                            <span className="gd-card-label">Escola</span>
                            <p className="gd-school-name">{game.school_name}</p>
                        </div>
                    )}

                    {/* LINK */}
                    <div className="gd-card">
                        <span className="gd-card-label">Link direto</span>
                        <a
                            href={game.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gd-link-display"
                        >
                            {game.link}
                        </a>
                    </div>

                </aside>
            </div>
        </div>
    )
}