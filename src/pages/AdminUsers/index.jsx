import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api.js'
import '../AdminLayout/style.css'

const ROLES = ['user', 'student', 'professor', 'admin']
const PER_PAGE = 15

export default function AdminUsers() {
    const [users, setUsers]     = useState([])
    const [total, setTotal]     = useState(0)
    const [page, setPage]       = useState(1)
    const [search, setSearch]   = useState('')
    const [filter, setFilter]   = useState('')
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(null) // user being edited
    const [saving, setSaving]   = useState(false)
    const [error, setError]     = useState(null)

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const params = { page, per_page: PER_PAGE }
            if (search) params.search = search
            if (filter) params.role   = filter
            const res = await api.get('/admin/users', { params })
            setUsers(res.data.data)
            setTotal(res.data.total)
        } catch {
            setError('Erro ao carregar usuários')
        } finally {
            setLoading(false)
        }
    }, [page, search, filter])

    useEffect(() => { fetchUsers() }, [fetchUsers])

    // debounce search
    useEffect(() => {
        setPage(1)
    }, [search, filter])

    async function handleSave() {
        setSaving(true)
        setError(null)
        try {
            await api.patch(`/admin/users/${editing.username}`, {
                role:   editing.role,
                banned: editing.banned,
            })
            setEditing(null)
            fetchUsers()
        } catch {
            setError('Erro ao salvar alterações')
        } finally {
            setSaving(false)
        }
    }

    async function handleBanToggle(user) {
        try {
            await api.patch(`/admin/users/${user.username}`, { banned: !user.banned })
            fetchUsers()
        } catch {
            setError('Erro ao atualizar usuário')
        }
    }

    const totalPages = Math.ceil(total / PER_PAGE)

    return (
        <div>
            {/* HEADER */}
            <div className="adm-page-header">
                <div>
                    <h1 className="adm-page-title">Usuários</h1>
                    <p className="adm-page-count">{total} registros</p>
                </div>
                <div className="adm-search-wrap">
                    <select
                        className="adm-filter-select"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="">Todos os cargos</option>
                        {ROLES.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                    <input
                        className="adm-search"
                        placeholder="Buscar por nome, email ou usuário..."
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
                ) : users.length === 0 ? (
                    <div className="adm-empty">
                        <span className="adm-empty-icon">👤</span>
                        Nenhum usuário encontrado
                    </div>
                ) : (
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Cargo</th>
                                <th>Escola</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.username}>
                                    <td className="adm-td-name">{u.name}</td>
                                    <td>@{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`adm-role adm-role-${u.role}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>{u.school?.name ?? '—'}</td>
                                    <td>
                                        <span className={u.banned ? 'adm-status-banned' : 'adm-status-active'}>
                                            {u.banned ? '● Banido' : '● Ativo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="adm-actions">
                                            <button
                                                className="adm-btn adm-btn-ghost"
                                                onClick={() => setEditing({ ...u })}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className={`adm-btn ${u.banned ? 'adm-btn-success' : 'adm-btn-danger'}`}
                                                onClick={() => handleBanToggle(u)}
                                            >
                                                {u.banned ? 'Desbanir' : 'Banir'}
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

            {/* EDIT MODAL */}
            {editing && (
                <div className="adm-modal-backdrop" onClick={() => setEditing(null)}>
                    <div className="adm-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="adm-modal-title">Editar usuário</h2>

                        {error && <div className="adm-error">{error}</div>}

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Nome</label>
                            <input
                                className="adm-modal-input"
                                value={editing.name}
                                disabled
                            />
                        </div>

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Email</label>
                            <input
                                className="adm-modal-input"
                                value={editing.email}
                                disabled
                            />
                        </div>

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Cargo</label>
                            <select
                                className="adm-modal-select"
                                value={editing.role}
                                onChange={e => setEditing({ ...editing, role: e.target.value })}
                            >
                                {ROLES.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Status</label>
                            <select
                                className="adm-modal-select"
                                value={editing.banned ? '1' : '0'}
                                onChange={e => setEditing({ ...editing, banned: e.target.value === '1' })}
                            >
                                <option value="0">Ativo</option>
                                <option value="1">Banido</option>
                            </select>
                        </div>

                        <div className="adm-modal-actions">
                            <button className="adm-btn adm-btn-ghost" onClick={() => setEditing(null)}>
                                Cancelar
                            </button>
                            <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
                                {saving ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}