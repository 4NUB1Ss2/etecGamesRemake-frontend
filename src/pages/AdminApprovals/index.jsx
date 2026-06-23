import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api.js'
import '../AdminLayout/style.css'

export default function AdminApprovals() {
    const [users, setUsers]     = useState([])
    const [total, setTotal]     = useState(0)
    const [filter, setFilter]   = useState('professor') // professor | student
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    const fetchPending = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await api.get('/admin/approvals', {
                params: { role: filter }
            })
            const list = res.data.data ?? res.data
            setUsers(list)
            setTotal(res.data.total ?? list.length)
        } catch {
            setError('Erro ao carregar aprovações pendentes')
        } finally {
            setLoading(false)
        }
    }, [filter])

    useEffect(() => { fetchPending() }, [fetchPending])

    async function handleApprove(username) {
        try {
            await api.patch(`/admin/users/${username}`, { aproved: true })
            fetchPending()
        } catch {
            setError('Erro ao aprovar usuário')
        }
    }

    async function handleReject(username) {
        try {
            await api.patch(`/admin/users/${username}`, { aproved: false })
            fetchPending()
        } catch {
            setError('Erro ao rejeitar usuário')
        }
    }

    return (
        <div>
            {/* HEADER */}
            <div className="adm-page-header">
                <div>
                    <h1 className="adm-page-title">Aprovações</h1>
                    <p className="adm-page-count">{total} pendente{total !== 1 ? 's' : ''}</p>
                </div>
                <div className="adm-search-wrap">
                    <select
                        className="adm-filter-select"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="professor">Professores</option>
                        <option value="student">Alunos</option>
                    </select>
                </div>
            </div>

            {error && <div className="adm-error">{error}</div>}

            <div className="adm-table-wrap">
                {loading ? (
                    <div className="adm-loading"><div className="adm-spinner" /></div>
                ) : users.length === 0 ? (
                    <div className="adm-empty">
                        <span className="adm-empty-icon">✅</span>
                        Nenhuma aprovação pendente
                    </div>
                ) : (
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Escola</th>
                                <th>Cargo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.username}>
                                    <td className="adm-td-name">{u.name}</td>
                                    <td>@{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.school?.name ?? '—'}</td>
                                    <td>
                                        <span className={`adm-role adm-role-${u.role}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="adm-actions">
                                            <button
                                                className="adm-btn adm-btn-success"
                                                onClick={() => handleApprove(u.username)}
                                            >
                                                ✓ Aprovar
                                            </button>
                                            <button
                                                className="adm-btn adm-btn-danger"
                                                onClick={() => handleReject(u.username)}
                                            >
                                                ✕ Rejeitar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
