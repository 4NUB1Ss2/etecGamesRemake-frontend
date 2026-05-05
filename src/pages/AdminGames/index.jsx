import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api.js'
import '../AdminLayout/style.css'

const PER_PAGE = 15

export default function AdminGames() {
    const [games, setGames]     = useState([])
    const [total, setTotal]     = useState(0)
    const [page, setPage]       = useState(1)
    const [search, setSearch]   = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)
    const [confirm, setConfirm] = useState(null) // { game, action }

    const fetchGames = useCallback(async () => {
        setLoading(true)
        try {
            const params = { page, per_page: PER_PAGE }
            if (search) params.search = search
            const res = await api.get('/admin/games', { params })
            setGames(res.data.data)
            setTotal(res.data.total)
        } catch {
            setError('Erro ao carregar jogos')
        } finally {
            setLoading(false)
        }
    }, [page, search])

    useEffect(() => { fetchGames() }, [fetchGames])
    useEffect(() => { setPage(1) }, [search])

    async function handleFeature(game) {
        try {
            await api.patch(`/admin/games/${game.slug}`, { featured: !game.featured })
            fetchGames()
        } catch {
            setError('Erro ao atualizar jogo')
        }
    }

    async function handleDelete() {
        if (!confirm) return
        try {
            await api.delete(`/admin/games/${confirm.game.slug}`)
            setConfirm(null)
            fetchGames()
        } catch {
            setError('Erro ao remover jogo')
        }
    }

    const totalPages = Math.ceil(total / PER_PAGE)

    return (
        <div>
            {/* HEADER */}
            <div className="adm-page-header">
                <div>
                    <h1 className="adm-page-title">Jogos</h1>
                    <p className="adm-page-count">{total} jogos publicados</p>
                </div>
                <div className="adm-search-wrap">
                    <input
                        className="adm-search"
                        placeholder="Buscar por nome ou criador..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {error && <div className="adm-error">{error}</div>}

            {/* TABLE */}
            <div className="adm-table-wrap">
                {loading ? (
                    <div className="adm-loading"><div className="adm-spinner" /></div>
                ) : games.length === 0 ? (
                    <div className="adm-empty">
                        <span className="adm-empty-icon">🎮</span>
                        Nenhum jogo encontrado
                    </div>
                ) : (
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Capa</th>
                                <th>Nome</th>
                                <th>Criador</th>
                                <th>Escola</th>
                                <th>Plays</th>
                                <th>Destaque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map(g => (
                                <tr key={g.slug}>
                                    <td>
                                        <img src={g.image} alt={g.name} className="adm-game-thumb" />
                                    </td>
                                    <td className="adm-td-name">{g.name}</td>
                                    <td>@{g.user?.username ?? '—'}</td>
                                    <td>{g.school?.name ?? '—'}</td>
                                    <td>{g.clicks ?? 0}</td>
                                    <td>
                                        <span className={g.featured ? 'adm-status-active' : ''}>
                                            {g.featured ? '★ Sim' : '—'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="adm-actions">
                                            <button
                                                className={`adm-btn ${g.featured ? 'adm-btn-ghost' : 'adm-btn-success'}`}
                                                onClick={() => handleFeature(g)}
                                            >
                                                {g.featured ? 'Remover destaque' : '★ Destacar'}
                                            </button>
                                            <button
                                                className="adm-btn adm-btn-danger"
                                                onClick={() => setConfirm({ game: g })}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="adm-pagination">
                    <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Próxima →</button>
                </div>
            )}

            {/* CONFIRM DELETE MODAL */}
            {confirm && (
                <div className="adm-modal-backdrop" onClick={() => setConfirm(null)}>
                    <div className="adm-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="adm-modal-title">Remover jogo</h2>
                        <p style={{ color: '#9095b0', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.5rem' }}>
                            Tem certeza que deseja remover <strong style={{ color: '#e8e8f0' }}>{confirm.game.name}</strong>?
                            Essa ação não pode ser desfeita.
                        </p>
                        <div className="adm-modal-actions">
                            <button className="adm-btn adm-btn-ghost" onClick={() => setConfirm(null)}>
                                Cancelar
                            </button>
                            <button className="adm-btn adm-btn-danger" onClick={handleDelete}>
                                Sim, remover
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}