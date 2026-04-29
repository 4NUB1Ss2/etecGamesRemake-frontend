import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useGoogleLogin } from '@react-oauth/google'
import api from '../../services/api.js'
import './style.css'

function Index() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [mode, setMode] = useState('login')
    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState(null)
    const [schools, setSchools] = useState([])
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        username: '', email: '', password: '',
        name: '', role: '', school_id: '', credential: '',
    })

    async function getSchools() {
        const response = await api.get('/schools')
        setSchools(response.data.schools)
    }

    useEffect(() => {
        if (userType === 'etec') getSchools()
    }, [userType])

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError(null)
    }

    function handleTypeSelect(type) {
        setUserType(type)
        if (type === 'common') {
            setForm({ ...form, role: 'user' })
            setStep(2)
        } else {
            setStep(1.5)
        }
    }

    function handleRoleSelect(role) {
        setForm({ ...form, role })
        setStep(2)
    }

    async function handleRegister(e) {
        e.preventDefault()
        const data = { name: form.name, username: form.username, email: form.email, password: form.password, role: form.role }
        if (userType === 'etec') data.school_id = form.school_id
        try {
            const response = await api.post('/register', data)
            login(response.data.token)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar conta')
        }
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await api.post('/login', { credential: form.credential, password: form.password })
            login(response.data.token)
            navigate('/')
        } catch {
            setError('Usuário ou senha incorretos')
        }
    }

    function switchMode(newMode) {
        setMode(newMode)
        setStep(1)
        setError(null)
        setUserType(null)
        setForm({ username: '', email: '', password: '', name: '', role: '', school_id: '', credential: '' })
    }

    const getSubtitle = () => {
        if (mode === 'login') return 'Acesse sua conta'
        if (step === 1) return 'Como você vai usar o EtecGames?'
        if (step === 1.5) return 'Qual é o seu papel na ETEC?'
        return 'Preencha seus dados'
    }

    return (
        <div className="auth-page">
            <div className="auth-glow" />

            {/* SIDE PANEL */}
            <div className="auth-side">
                <a href="/" className="auth-logo">
                    <span className="auth-logo-bracket">[</span>
                    ETEC<span className="auth-logo-accent">Games</span>
                    <span className="auth-logo-bracket">]</span>
                </a>
                <div className="auth-side-content">
                    <h2 className="auth-side-title">
                        Jogos feitos<br />
                        <span className="auth-side-accent">por estudantes</span>
                    </h2>
                    <p className="auth-side-desc">
                        Uma plataforma para descobrir, jogar e compartilhar projetos de alunos e professores das ETECs.
                    </p>
                    <div className="auth-side-dots">
                        <span className="dot dot-active" />
                        <span className="dot" />
                        <span className="dot" />
                    </div>
                </div>
            </div>

            {/* FORM PANEL */}
            <div className="auth-panel">
                <div className="auth-card">

                    <div className="auth-card-header">
                        <h2 className="auth-card-title">
                            {mode === 'login' ? 'Entrar' : 'Criar conta'}
                        </h2>
                        <p className="auth-card-subtitle">{getSubtitle()}</p>

                        {/* STEP INDICATOR */}
                        {mode === 'register' && (
                            <div className="auth-steps">
                                {[1, 1.5, 2].map((s) => (
                                    <div key={s} className={`auth-step ${step >= s ? 'auth-step-active' : ''}`} />
                                ))}
                            </div>
                        )}
                    </div>

                    {mode === 'login' && (
                        <>
                            <form onSubmit={handleLogin} className="auth-form">
                                <div className="auth-field">
                                    <label className="auth-label">Email ou nome de usuário</label>
                                    <input type="text" name="credential" className="auth-input"
                                        placeholder="email@exemplo.com" value={form.credential}
                                        onChange={handleChange} required />
                                </div>
                                <div className="auth-field">
                                    <label className="auth-label">Senha</label>
                                    <input type="password" name="password" className="auth-input"
                                        placeholder="••••••••" value={form.password}
                                        onChange={handleChange} required />
                                </div>
                                {error && <div className="auth-error">{error}</div>}
                                <button type="submit" className="auth-submit">Entrar →</button>
                            </form>

                            <div className="auth-divider"><span>ou</span></div>

                            <GoogleButton onError={setError} />
                        </>
                    )}

                    {/* REGISTER STEP 1 */}
                    {mode === 'register' && step === 1 && (
                        <div className="auth-type-selector">
                            <button className="auth-type-btn" onClick={() => handleTypeSelect('etec')}>
                                <span className="auth-type-icon">🏫</span>
                                <div>
                                    <span className="auth-type-label">Faço parte de uma ETEC</span>
                                    <span className="auth-type-desc">Aluno ou professor</span>
                                </div>
                                <span className="auth-type-arrow">→</span>
                            </button>
                            <button className="auth-type-btn" onClick={() => handleTypeSelect('common')}>
                                <span className="auth-type-icon">👤</span>
                                <div>
                                    <span className="auth-type-label">Sou usuário comum</span>
                                    <span className="auth-type-desc">Acesso geral à plataforma</span>
                                </div>
                                <span className="auth-type-arrow">→</span>
                            </button>
                        </div>
                    )}

                    {/* REGISTER STEP 1.5 */}
                    {mode === 'register' && step === 1.5 && (
                        <div className="auth-type-selector">
                            <button className="auth-type-btn" onClick={() => handleRoleSelect('student')}>
                                <span className="auth-type-icon">🎒</span>
                                <div>
                                    <span className="auth-type-label">Aluno</span>
                                    <span className="auth-type-desc">Estou matriculado na ETEC</span>
                                </div>
                                <span className="auth-type-arrow">→</span>
                            </button>
                            <button className="auth-type-btn" onClick={() => handleRoleSelect('professor')}>
                                <span className="auth-type-icon">📚</span>
                                <div>
                                    <span className="auth-type-label">Professor</span>
                                    <span className="auth-type-desc">Leciono na ETEC</span>
                                </div>
                                <span className="auth-type-arrow">→</span>
                            </button>
                            <button className="auth-back" onClick={() => setStep(1)}>← Voltar</button>
                        </div>
                    )}

                    {/* REGISTER STEP 2 */}
                    {mode === 'register' && step === 2 && (
                        <form onSubmit={handleRegister} className="auth-form">
                            <div className="auth-row">
                                <div className="auth-field">
                                    <label className="auth-label">Nome completo</label>
                                    <input type="text" name="name" className="auth-input"
                                        placeholder="Seu nome" value={form.name}
                                        onChange={handleChange} required />
                                </div>
                                <div className="auth-field">
                                    <label className="auth-label">Usuário</label>
                                    <input type="text" name="username" className="auth-input"
                                        placeholder="@usuario" value={form.username}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="auth-field">
                                <label className="auth-label">E-mail</label>
                                <input type="email" name="email" className="auth-input"
                                    placeholder="email@exemplo.com" value={form.email}
                                    onChange={handleChange} required />
                            </div>
                            <div className="auth-field">
                                <label className="auth-label">Senha</label>
                                <input type="password" name="password" className="auth-input"
                                    placeholder="••••••••" value={form.password}
                                    onChange={handleChange} required />
                            </div>
                            {userType === 'etec' && (
                                <div className="auth-row">
                                    <div className="auth-field">
                                        <label className="auth-label">Função</label>
                                        <select name="role" className="auth-input auth-select"
                                            value={form.role} onChange={handleChange}
                                            disabled required>
                                            <option value="">—</option>
                                            <option value="student">Aluno</option>
                                            <option value="professor">Professor</option>
                                        </select>
                                    </div>
                                    <div className="auth-field">
                                        <label className="auth-label">Escola</label>
                                        <select name="school_id" className="auth-input auth-select"
                                            value={form.school_id} onChange={handleChange} required>
                                            <option value="">Selecione...</option>
                                            {schools.filter(s => s.id !== 1).map(s => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                            {error && <div className="auth-error">{error}</div>}
                            <div className="auth-form-actions">
                                <button type="button" className="auth-back" onClick={() => setStep(userType === 'etec' ? 1.5 : 1)}>
                                    ← Voltar
                                </button>
                                <button type="submit" className="auth-submit">Criar conta →</button>
                            </div>
                        </form>
                    )}

                    <div className="auth-switch">
                        {mode === 'login' ? (
                            <>Não tem conta? <button onClick={() => switchMode('register')}>Criar conta</button></>
                        ) : (
                            <>Já tem conta? <button onClick={() => switchMode('login')}>Entrar</button></>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

function GoogleButton({ onError }) {
    const { loginWithGoogle } = useAuth()
    const navigate = useNavigate()

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ access_token }) => {
            try {
                await loginWithGoogle(access_token)
                navigate('/')
            } catch {
                onError('Erro ao entrar com Google')
            }
        },
        onError: () => onError('Erro ao entrar com Google'),
    })

    return (
        <button type="button" className="auth-google-btn" onClick={() => googleLogin()}>
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Entrar com Google
        </button>
    )
}

export default Index