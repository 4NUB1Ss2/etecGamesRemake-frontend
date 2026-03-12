// components/GameList/GameList.jsx
import { useEffect, useState } from 'react'
import api from '../../services/api.js'

function GameList({ title, section }) {
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    async function getGames() {
        const response = await api.get('/games', {
            params: { current_page: page, section }
        })
        setGames(response.data.data)
        setLastPage(response.data.last_page)
    }

    useEffect(() => {
        getGames()
    }, [page])

    return (
        <div className="container-lg page-content">
            <h1 className="text-white mb-4">{title}</h1>
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="btn btn-secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
                <span className="text-white">{page} de {lastPage}</span>
                <button className="btn btn-secondary" onClick={() => setPage(page + 1)} disabled={page === lastPage}>Próxima</button>
            </div>
            <div className="row g-4">
                {games.map((game) => (
                    <div key={game.id} className="col-12 col-md-6 col-lg-4">
                        <div className="game-card">
                            <div className="game-card-img">
                                <img src={game.image} alt={game.name}/>
                            </div>
                            <div className="game-card-body">
                                <h5 className="game-card-title">{game.name}</h5>
                                <p className="game-card-description">{game.description}</p>
                                <a href={game.link} target="_blank" rel="noreferrer" className="btn btn-download">
                                    BAIXAR
                                </a>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameList