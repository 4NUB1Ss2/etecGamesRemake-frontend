import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api.js'
import './style.css'

function Index() {
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    const fileRef = useRef(null)

    const [form, setForm] = useState({
        name: '',
        description: '',
        link: '',
        school_id: '',
    })
    const [image, setImage]     = useState(null)
    const [preview, setPreview] = useState(null)
    const [error, setError]     = useState(null)
    const [loading, setLoading] = useState(false)
    const [dragging, setDragging] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError(null)
    }

    function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    function handleDrop(e) {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!image) { setError('Adicione uma imagem para o jogo'); return }

        setLoading(true)
        try {
            const data = new FormData()
            Object.entries(form).forEach(([k, v]) => { if (v) data.append(k, v) })
            data.append('image', image)

            await api.post('/games', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            navigate('/games')
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao publicar o jogo')
        } finally {
            setLoading(false)
        }
    }

    if (!isLoggedIn) {
        return (
            <div className="addgame-gate">
                <div className="addgame-gate-inner">
                    <span className="addgame-gate-icon">🔒</span>
                    <h2>Acesso restrito</h2>
                    <p>Você precisa estar logado para publicar um jogo.</p>
                    <button className="ag-btn-primary" onClick={() => navigate('/login')}>
                        Fazer login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="addgame-page">

            {/* SIDEBAR INFO */}
            <aside className="ag-sidebar">
                <div className="ag-sidebar-sticky">
                    <button className="ag-back" onClick={() => navigate(-1)}>← Voltar</button>
                    <h1 className="ag-sidebar-title">Publicar<br />seu jogo</h1>
                    <p className="ag-sidebar-desc">
                        Compartilhe seu projeto com a comunidade ETECGames. Preencha as informações
                        com cuidado — uma boa apresentação atrai mais jogadores.
                    </p>
                    <ul className="ag-tips">
                        <li><span>🖼️</span> Use uma imagem de boa qualidade (16:9)</li>
                        <li><span>✍️</span> Escreva uma descrição clara e atrativa</li>
                        <li><span>🔗</span> O link deve levar direto ao jogo</li>
                    </ul>
                </div>
            </aside>

            {/* FORM */}
            <main className="ag-main">
                <form className="ag-form" onSubmit={handleSubmit}>

                    {/* IMAGE UPLOAD */}
                    <div className="ag-section">
                        <label className="ag-section-label">Imagem do jogo <span>*</span></label>
                        <div
                            className={`ag-dropzone ${dragging ? 'ag-dropzone-over' : ''} ${preview ? 'ag-dropzone-filled' : ''}`}
                            onClick={() => fileRef.current.click()}
                            onDragOver={e => { e.preventDefault(); setDragging(true) }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="preview" className="ag-preview" />
                                    <div className="ag-preview-overlay">
                                        <span>Clique para trocar</span>
                                    </div>
                                </>
                            ) : (
                                <div className="ag-dropzone-placeholder">
                                    <span className="ag-drop-icon">🖼️</span>
                                    <strong>Arraste ou clique para enviar</strong>
                                    <span>PNG, JPG, WEBP — recomendado 1280×720</span>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => handleFile(e.target.files[0])}
                        />
                    </div>

                    {/* NOME */}
                    <div className="ag-section">
                        <label className="ag-section-label">Nome do jogo <span>*</span></label>
                        <input
                            type="text"
                            name="name"
                            className="ag-input"
                            placeholder="Ex: Shadow Quest, Pixel Runner..."
                            value={form.name}
                            onChange={handleChange}
                            maxLength={80}
                            required
                        />
                        <span className="ag-char-count">{form.name.length}/80</span>
                    </div>

                    {/* DESCRIÇÃO */}
                    <div className="ag-section">
                        <label className="ag-section-label">Descrição <span>*</span></label>
                        <textarea
                            name="description"
                            className="ag-input ag-textarea"
                            placeholder="Descreva seu jogo: gênero, mecânicas, história..."
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            maxLength={500}
                            required
                        />
                        <span className="ag-char-count">{form.description.length}/500</span>
                    </div>

                    {/* LINK */}
                    <div className="ag-section">
                        <label className="ag-section-label">Link do jogo <span>*</span></label>
                        <div className="ag-input-prefix-wrap">
                            <span className="ag-input-prefix">🔗</span>
                            <input
                                type="url"
                                name="link"
                                className="ag-input ag-input-prefixed"
                                placeholder="https://meusite.com/meu-jogo"
                                value={form.link}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* ERROR */}
                    {error && <div className="ag-error">{error}</div>}

                    {/* SUBMIT */}
                    <div className="ag-submit-row">
                        <button type="button" className="ag-btn-ghost" onClick={() => navigate(-1)}>
                            Cancelar
                        </button>
                        <button type="submit" className="ag-btn-primary" disabled={loading}>
                            {loading ? (
                                <span className="ag-spinner" />
                            ) : (
                                '🚀 Publicar jogo'
                            )}
                        </button>
                    </div>

                </form>
            </main>

        </div>
    )
}

export default Index