import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api.js'
import '../AdminLayout/style.css'

const EMPTY_FORM = { name: '', city: '', state: 'SP' }

export default function AdminSchools() {
    const [schools, setSchools] = useState([])
    const [total, setTotal]     = useState(0)
    const [search, setSearch]   = useState('')
    const [loading, setLoading] = useState(true)
    const [modal, setModal]     = useState(null) // null | 'create' | school obj (edit)
    const [confirm, setConfirm] = useState(null) // school to delete
    const [form, setForm]       = useState(EMPTY_FORM)
    const [saving, setSaving]   = useState(false)
    const [error, setError]     = useState(null)

    const fetchSchools = useCallback(async () => {
        setLoading(true)
        try {
            const params = {}
            if (search) params.search = search
            const res = await api.get('/admin/schools', { params })
            // support both paginated and plain array responses
            const list = res.data.data ?? res.data
            setSchools(list.filter(s => s.id !== 1))
            setTotal(res.data.total ?? list.length)
        } catch {
            setError('Erro ao carregar escolas')
        } finally {
            setLoading(false)
        }
    }, [search])

    useEffect(() => { fetchSchools() }, [fetchSchools])

    function openCreate() {
        setForm(EMPTY_FORM)
        setError(null)
        setModal('create')
    }

    function openEdit(school) {
        setForm({ name: school.name, city: school.city ?? '', state: school.state ?? 'SP' })
        setError(null)
        setModal(school)
    }

    async function handleSave() {
        if (!form.name.trim()) { setError('Nome é obrigatório'); return }
        setSaving(true)
        setError(null)
        try {
            if (modal === 'create') {
                await api.post('/admin/schools', form)
            } else {
                await api.patch(`/admin/schools/${modal.id}`, form)
            }
            setModal(null)
            fetchSchools()
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao salvar escola')
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete() {
        if (!confirm) return
        try {
            await api.delete(`/admin/schools/${confirm.id}`)
            setConfirm(null)
            fetchSchools()
        } catch (err) {
            setConfirm(null)
            setError(err.response?.data?.message || 'Erro ao remover escola')
        }
    }

    return (
        <div>
            {/* HEADER */}
            <div className="adm-page-header">
                <div>
                    <h1 className="adm-page-title">Escolas</h1>
                    <p className="adm-page-count">{total} escolas cadastradas</p>
                </div>
                <div className="adm-search-wrap">
                    <input
                        className="adm-search"
                        placeholder="Buscar escola..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className="adm-btn adm-btn-primary" onClick={openCreate}>
                        + Nova escola
                    </button>
                </div>
            </div>

            {error && !modal && <div className="adm-error">{error}</div>}

            {/* TABLE */}
            <div className="adm-table-wrap">
                {loading ? (
                    <div className="adm-loading"><div className="adm-spinner" /></div>
                ) : schools.length === 0 ? (
                    <div className="adm-empty">
                        <span className="adm-empty-icon">🏫</span>
                        Nenhuma escola encontrada
                    </div>
                ) : (
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Alunos</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map(s => (
                                <tr key={s.id}>
                                    <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '.75rem', color: '#3a3d52' }}>
                                        {s.id}
                                    </td>
                                    <td className="adm-td-name">{s.name}</td>
                                    <td>{s.city ?? '—'}</td>
                                    <td>{s.state ?? '—'}</td>
                                    <td>{s.user_count ?? '—'}</td>
                                    <td>
                                        <div className="adm-actions">
                                            <button
                                                className="adm-btn adm-btn-ghost"
                                                onClick={() => openEdit(s)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="adm-btn adm-btn-danger"
                                                onClick={() => setConfirm(s)}
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

            {/* CREATE / EDIT MODAL */}
            {modal && (
                <div className="adm-modal-backdrop" onClick={() => setModal(null)}>
                    <div className="adm-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="adm-modal-title">
                            {modal === 'create' ? 'Nova escola' : 'Editar escola'}
                        </h2>

                        {error && <div className="adm-error">{error}</div>}

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Nome</label>
                            <input
                                className="adm-modal-input"
                                placeholder="Ex: Etec de São Paulo"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Cidade</label>
                            <input
                                className="adm-modal-input"
                                placeholder="Ex: São Paulo"
                                value={form.city}
                                onChange={e => setForm({ ...form, city: e.target.value })}
                            />
                        </div>

                        <div className="adm-modal-field">
                            <label className="adm-modal-label">Estado</label>
                            <input
                                className="adm-modal-input"
                                placeholder="Ex: SP"
                                value={form.state}
                                maxLength={2}
                                onChange={e => setForm({ ...form, state: e.target.value.toUpperCase() })}
                            />
                        </div>

                        <div className="adm-modal-actions">
                            <button className="adm-btn adm-btn-ghost" onClick={() => setModal(null)}>
                                Cancelar
                            </button>
                            <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
                                {saving ? 'Salvando...' : modal === 'create' ? 'Criar' : 'Salvar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CONFIRM DELETE */}
            {confirm && (
                <div className="adm-modal-backdrop" onClick={() => setConfirm(null)}>
                    <div className="adm-modal" onClick={e => e.stopPropagation()}>
                        <h2 className="adm-modal-title">Remover escola</h2>
                        <p style={{ color: '#9095b0', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.5rem' }}>
                            Tem certeza que deseja remover <strong style={{ color: '#e8e8f0' }}>{confirm.name}</strong>?
                            Os usuários vinculados a ela ficarão sem escola.
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