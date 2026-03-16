import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api.js'
import './style.css'

function Index() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState(null) // 'etec' | 'common'
    const [schools, setSchools] = useState([])
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        role: '',
        school_id: '',
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

    async function handleSubmit(e) {
        e.preventDefault()

        console.log(form.role)

        const data = {
            name: form.name,
            username: form.username,
            email: form.email,
            password: form.password,
            role: form.role,
        }

        if (userType === 'etec') {
            data.school_id = form.school_id
        }

        const response = await api.post('/register', data)
        login(response.data.token)
        navigate('/')

        console.log({ ...form, type: userType })
        // api.post('/register', { ...form, type: userType })
    }

    return (
        <div className="register-page">
            <div className="register-card">

                <div className="register-header">
                    <h2 className="register-title">Criar Conta</h2>
                    <p className="register-subtitle">
                        {step === 1 && 'Como você vai usar o EtecGames?'}
                        {step === 1.5 && 'Qual é o seu papel na ETEC?'}
                        {step === 2 && 'Preencha seus dados'}
                    </p>
                </div>

                {/* STEP 1 — tipo de usuário */}
                {step === 1 && (
                    <div className="type-selector">
                        <button className="type-btn" onClick={() => handleTypeSelect('etec')}>
                            <span className="type-icon">🏫</span>
                            <span className="type-label">Faço parte de uma ETEC</span>
                            <span className="type-desc">Aluno ou professor</span>
                        </button>
                        <button className="type-btn" onClick={() => handleTypeSelect('common')}>
                            <span className="type-icon">👤</span>
                            <span className="type-label">Sou usuário comum</span>
                            <span className="type-desc">Acesso geral à plataforma</span>
                        </button>
                    </div>
                )}

                {/* STEP 1.5 — aluno ou professor */}
                {step === 1.5 && (
                    <div className="type-selector">
                        <button className="type-btn" onClick={() => handleRoleSelect('student')}>
                            <span className="type-icon">🎒</span>
                            <span className="type-label">Aluno</span>
                            <span className="type-desc">Estou matriculado na ETEC</span>
                        </button>
                        <button className="type-btn" onClick={() => handleRoleSelect('professor')}>
                            <span className="type-icon">📚</span>
                            <span className="type-label">Professor</span>
                            <span className="type-desc">Leciono na ETEC</span>
                        </button>
                        <button className="back-btn" onClick={() => setStep(1)}>
                            ← Voltar
                        </button>
                    </div>
                )}

                {/* STEP 2 — formulário */}
                {step === 2 && (
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="mb-3">
                            <label className="form-label register-label">Nome completo</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control register-input"
                                placeholder="Seu nome"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label register-label">Nome de usuário</label>
                            <input
                                type="text"
                                name="username"
                                className="form-control register-input"
                                placeholder="@usuario"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label register-label">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control register-input"
                                placeholder="email@exemplo.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label register-label">Senha</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control register-input"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {userType === 'etec' && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label register-label">Função</label>
                                    <select
                                        name="role"
                                        className="form-select register-input"
                                        value={form.role}
                                        onChange={handleChange}
                                        disabled={true}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="student">Aluno</option>
                                        <option value="professor">Professor</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label register-label">Escola</label>
                                    <select
                                        name="school_id"
                                        className="form-select register-input"
                                        value={form.school_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione sua escola...</option>
                                        {schools
                                            .filter((school) => school.id !== 1)
                                            .map((school) => (
                                            <option key={school.id} value={school.id}>
                                                {school.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <button type="submit" className="btn register-submit w-100 mt-2">
                            Criar conta
                        </button>

                        <button type="button" className="back-btn mt-2" onClick={() => setStep(userType === 'etec' ? 1.5 : 1)}>
                            ← Voltar
                        </button>
                    </form>
                )}

                <div className="register-footer">
                    <span>Já tem uma conta?</span>
                    <button className="login-link" onClick={() => navigate('/login')}>
                        Entrar
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Index