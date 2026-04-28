import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api.js'
import './style.css'

function GameList({ title, section, username, emptyMessage }) {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const navigate  = useNavigate()

    async function getGames() {
        setLoading(true)
        const params = { current_page: page, section }
        if (username) params.username = username

        const response = await api.get('/games', { params })
        setGames(response.data.data)
        setLastPage(response.data.last_page)
        setLoading(false)
    }

    function GameCardSkeleton() {
        return (
            <div className="col-12 col-md-6 col-lg-4">
                <div className="game-card game-card-skeleton">
                    <div className="game-card-img skeleton-img" />
                    <div className="game-card-body">
                        <div className="skeleton-line skeleton-title" />
                        <div className="skeleton-line" style={{ width: '100%' }} />
                        <div className="skeleton-line" style={{ width: '80%' }} />
                        <div className="skeleton-line" style={{ width: '60%' }} />
                        <div className="skeleton-btn" />
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        getGames()
    }, [page, username])

    return (
        <div className="gamelist-wrapper">
            <div className="container-lg gamelist-content">

                {/* HEADER */}
                {title && (
                    <div className="gamelist-header">
                        <h2 className="gamelist-title">{title}</h2>
                        <div className="gamelist-title-line" />
                    </div>
                )}

                {/* EMPTY */}
                {!loading && games.length === 0 ? (
                    <div className="gamelist-empty">
                        <span className="gamelist-empty-icon">🎮</span>
                        <p>{emptyMessage ?? 'Nenhum jogo encontrado'}</p>
                    </div>
                ) : (
                    <>
                        {/* GRID */}
                        <div className="row g-4 mb-4">
                            {loading
                                ? Array.from({ length: 3 }).map((_, i) => <GameCardSkeleton key={i} />)
                                : games.map((game) => (
                                    <div key={game.id} className="col-12 col-md-6 col-lg-4">
                                        <div className="game-card">
                                            <div className="game-card-img">
                                                <img src={game.image} alt={game.name} />
                                                <div className="game-card-overlay">
                                                    <a
                                                        href={game.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="game-card-play"
                                                    >
                                                        ▶ JOGAR
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="game-card-body">
                                                <h5 className="game-card-title">{game.name}</h5>
                                                <p className="game-card-description">{game.description}</p>
                                                <button
                                                    className="game-card-btn"
                                                    onClick={() => navigate(`/games/${game.name}`)}
                                                >
                                                    BAIXAR
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* PAGINATION */}
                        <div className="gamelist-pagination">
                            <button
                                className="page-btn"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                ← Anterior
                            </button>
                            <span className="page-indicator">
                                <span className="page-current">{page}</span>
                                <span className="page-sep">/</span>
                                <span className="page-total">{lastPage}</span>
                            </span>
                            <button
                                className="page-btn"
                                onClick={() => setPage(page + 1)}
                                disabled={page === lastPage}
                            >
                                Próxima →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default GameList