import { useState, useRef, useEffect } from 'react'
import api from '../../services/api.js'
import './style.css'

// uso: <EditProfileModal user={user} onClose={fn} onSave={fn} />
export default function index({ user, onClose, onSave }) {
    const fileRef = useRef(null)
    const [form, setForm] = useState({
        name:     user.name     ?? '',
        username: user.username ?? '',
        email:    user.email    ?? '',
        password: '',
        password_confirmation: '',
    })
    const [avatar, setAvatar]   = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError]     = useState(null)
    const [loading, setLoading] = useState(false)
    const [tab, setTab]         = useState('info') // 'info' | 'password'

    // bloqueia scroll do body enquanto modal aberto
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError(null)
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return
        setAvatar(file)
        setPreview(URL.createObjectURL(file))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const data = new FormData()

            if (tab === 'info') {
                if (form.name     !== user.name)     data.append('name',     form.name)
                if (form.username !== user.username) data.append('username', form.username)
                if (form.email    !== user.email)    data.append('email',    form.email)
                if (avatar) data.append('image', avatar)
            }

            if (tab === 'password') {
                if (!form.password) { setError('Digite a nova senha'); setLoading(false); return }
                if (form.password !== form.password_confirmation) {
                    setError('As senhas não conferem')
                    setLoading(false)
                    return
                }
                data.append('password', form.password)
                data.append('password_confirmation', form.password_confirmation)
            }

            const response = await api.put(`/users/`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            onSave(response.data.user)
            onClose()
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao salvar alterações')
        } finally {
            setLoading(false)
        }
    }

    const avatarSrc = preview
        ?? user.avatar
        ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1c1e2e&color=a67eec&size=128&bold=true`

    return (
        <div className="epm-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
            <div className="epm-modal" role="dialog" aria-modal="true">

                {/* HEADER */}
                <div className="epm-header">
                    <h2 className="epm-title">Editar perfil</h2>
                    <button className="epm-close" onClick={onClose} aria-label="Fechar">✕</button>
                </div>

                {/* AVATAR */}
                <div className="epm-avatar-area">
                    <div className="epm-avatar-wrap" onClick={() => fileRef.current.click()}>
                        <img src={avatarSrc} alt="avatar" className="epm-avatar" />
                        <div className="epm-avatar-overlay">
                            <span>📷</span>
                        </div>
                    </div>
                    <div className="epm-avatar-info">
                        <strong>{user.name}</strong>
                        <span>@{user.username}</span>
                        <button className="epm-avatar-btn" onClick={() => fileRef.current.click()}>
                            Trocar foto
                        </button>
                    </div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => handleFile(e.target.files[0])}
                    />
                </div>

                {/* TABS */}
                <div className="epm-tabs">
                    <button
                        className={`epm-tab ${tab === 'info' ? 'epm-tab-active' : ''}`}
                        onClick={() => { setTab('info'); setError(null) }}
                    >
                        Informações
                    </button>
                    <button
                        className={`epm-tab ${tab === 'password' ? 'epm-tab-active' : ''}`}
                        onClick={() => { setTab('password'); setError(null) }}
                    >
                        Senha
                    </button>
                </div>

                {/* FORM */}
                <form className="epm-form" onSubmit={handleSubmit}>

                    {tab === 'info' && (
                        <>
                            <div className="epm-row">
                                <div className="epm-field">
                                    <label className="epm-label">Nome completo</label>
                                    <input
                                        name="name"
                                        className="epm-input"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="epm-field">
                                    <label className="epm-label">Nome de usuário</label>
                                    <input
                                        name="username"
                                        className="epm-input"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="@usuario"
                                    />
                                </div>
                            </div>
                            <div className="epm-field">
                                <label className="epm-label">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="epm-input"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="email@exemplo.com"
                                />
                            </div>
                        </>
                    )}

                    {tab === 'password' && (
                        <>
                            <div className="epm-field">
                                <label className="epm-label">Nova senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="epm-input"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="epm-field">
                                <label className="epm-label">Confirmar nova senha</label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="epm-input"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                            </div>
                        </>
                    )}

                    {error && <div className="epm-error">{error}</div>}

                    <div className="epm-actions">
                        <button type="button" className="epm-btn-ghost" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="epm-btn-primary" disabled={loading}>
                            {loading
                                ? <span className="epm-spinner" />
                                : 'Salvar alterações'
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}