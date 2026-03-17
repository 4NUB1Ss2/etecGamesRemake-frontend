// components/GameList/GameList.jsx
import { useEffect, useState } from 'react'
import api from '../../services/api.js'
import {createSearchParams} from "react-router-dom";

function GameList({ title, section, username , emptyMessage }) {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(true)

    async function getGames() {
        setLoading(true)
        console.log('username', username);
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
                <div className="game-card">
                    <div className="game-card-img placeholder-glow">
                        <div className="placeholder w-100 h-100" />
                    </div>
                    <div className="game-card-body">
                        <h5 className="placeholder-glow">
                            <span className="placeholder col-8"/>
                        </h5>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12"/>
                            <span className="placeholder col-10"/>
                            <span className="placeholder col-8"/>
                        </p>
                        <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                    </div>
                </div>
            </div>
        )
    }


    useEffect(() => {
        getGames()
    }, [page, username])

    return (
        <>
            <div className="container-lg page-content">
                <h1 className="text-white mb-4">{title}</h1>
                {!loading && games.length === 0 ? (
                    <p className="text-secondary">{emptyMessage}</p>
                ) : (
                    <>
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <button className="btn btn-secondary" onClick={() => setPage(page - 1)}
                                    disabled={page === 1}>Anterior
                            </button>
                            <span className="text-white">{page} de {lastPage}</span>
                            <button className="btn btn-secondary" onClick={() => setPage(page + 1)}
                                    disabled={page === lastPage}>Próxima
                            </button>
                        </div>
                        <div className="row g-4">
                            {loading
                                ? Array.from({length: 3}).map((_, index) => (
                                    <GameCardSkeleton key={index}/>
                                ))
                                : games.map((game) => (
                                    <div key={game.id} className="col-12 col-md-6 col-lg-4">
                                        <div className="game-card">
                                            <div className="game-card-img">
                                                <img src={game.image} alt={game.name}/>
                                            </div>
                                            <div className="game-card-body">
                                                <h5 className="game-card-title">{game.name}</h5>
                                                <p className="game-card-description">{game.description}</p>
                                                <a href={game.link} target="_blank" rel="noreferrer"
                                                   className="btn btn-download">
                                                    BAIXAR
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default GameList