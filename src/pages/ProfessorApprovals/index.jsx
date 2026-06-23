import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import api from '../../services/api.js'
import '../AdminLayout/style.css'
import './style.css'

export default function Index() {
    const { me } = useAuth()
    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    const [total, setTotal]       = useState(0)
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState(null)

    const fetchPending = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await api.get('/professor/approvals')
            const list = res.data.data ?? res.data
            setStudents(list)
            setTotal(list.length)
        } catch {
            setError('Erro ao carregar aprovações pendentes')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchPending() }, [fetchPending])

    async function handleApprove(username) {
        try {
            await api.patch(`/professor/approvals/${username}`, { aproved: true })
            fetchPending()
        } catch {
            setError('Erro ao aprovar aluno')
        }
    }

    async function handleReject(username) {
        try {
            await api.patch(`/professor/approvals/${username}`, { aproved: false })
            fetchPending()
        } catch {
            setError('Erro ao rejeitar aluno')
        }
    }
    if (me && me.role === 'admin') {
        return (
	    <div className="adm-empty" style={{ minHeight: '60vh', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
	    <span className="adm-empty-icon">⚙️</span>
	    Você é um administrador. Gerencie as aprovações pelo{' '}
	    <button
	        className="adm-btn adm-btn-primary"
		style={{ marginTop: '1rem' }}
		onClick={() => navigate('/admin/approvals')}
		>
	    Painel Admin
	    </button>
	    </div>
       )
    }

    if (me && me.role !== 'professor') {
        return (
	    <div className="adm-empty" style={{ minHeight: '60vh', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
	    <span className="adm-empty-icon">🔒</span>
	    Você não tem permissão para acessar essa página.
	    </div>
	)
    }
	return (
        <div className="prof-approvals-page">
            <div className="prof-approvals-header">
                <div>
                    <h1 className="prof-approvals-title">Aprovações de Alunos</h1>
                    <p className="prof-approvals-count">
                        {total} aluno{total !== 1 ? 's' : ''} aguardando aprovação
                    </p>
                </div>
            </div>

            {error && <div className="adm-error">{error}</div>}

            <div className="adm-table-wrap">
                {loading ? (
                    <div className="adm-loading"><div className="adm-spinner" /></div>
                ) : students.length === 0 ? (
                    <div className="adm-empty">
                        <span className="adm-empty-icon">✅</span>
                        Nenhum aluno aguardando aprovação
                    </div>
                ) : (
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Escola</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(s => (
                                <tr key={s.username}>
                                    <td className="adm-td-name">{s.name}</td>
                                    <td>@{s.username}</td>
                                    <td>{s.email}</td>
                                    <td>{s.school?.name ?? '—'}</td>
                                    <td>
                                        <div className="adm-actions">
                                            <button
                                                className="adm-btn adm-btn-success"
                                                onClick={() => handleApprove(s.username)}
                                            >
                                                ✓ Aprovar
                                            </button>
                                            <button
                                                className="adm-btn adm-btn-danger"
                                                onClick={() => handleReject(s.username)}
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
