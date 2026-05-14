import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import api from '../../services/api'
import './style.css'

const DIGITS   = 6
const COOLDOWN = 5 * 60 // 5 minutos em segundos

export default function Index() {
    const { me, setMe } = useAuth()
    const navigate = useNavigate()
    const [code, setCode]           = useState(Array(DIGITS).fill(''))
    const [loading, setLoading]     = useState(false)
    const [resending, setResending] = useState(false)
    const [error, setError]         = useState(null)
    const [success, setSuccess]     = useState(false)
    const [cooldown, setCooldown]   = useState(COOLDOWN)
    const inputRefs = useRef([])

    useEffect(() => {
        if (cooldown <= 0) return
        const timer = setInterval(() => setCooldown(c => c - 1), 1000)
        return () => clearInterval(timer)
    }, [cooldown])

    function formatCooldown(seconds) {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0')
        const s = String(seconds % 60).padStart(2, '0')
        return `${m}:${s}`
    }

    async function handleResend() {
        setResending(true)
        setError(null)
        try {
            await api.post('/auth/resend-otp')
            setCooldown(COOLDOWN)
            setCode(Array(DIGITS).fill(''))
            inputRefs.current[0]?.focus()
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao reenviar o código')
        } finally {
            setResending(false)
        }
    }

    if (!me) { navigate('/'); return null }
    if (me.verified) { navigate('/'); return null }

    function handleChange(index, value) {
        if (!/^\d*$/.test(value)) return
        const newCode = [...code]
        newCode[index] = value.slice(-1)
        setCode(newCode)
        setError(null)
        if (value && index < DIGITS - 1) inputRefs.current[index + 1]?.focus()
    }

    function handleKeyDown(index, e) {
        if (e.key === 'Backspace' && !code[index] && index > 0)
            inputRefs.current[index - 1]?.focus()
    }

    function handlePaste(e) {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, DIGITS)
        if (!pasted) return
        const newCode = [...code]
        pasted.split('').forEach((char, i) => { newCode[i] = char })
        setCode(newCode)
        inputRefs.current[Math.min(pasted.length, DIGITS - 1)]?.focus()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const otp = code.join('')
        if (otp.length < DIGITS) { setError('Insira o código completo'); return }
        setLoading(true)
        setError(null)
        try {
            await api.post('/auth/verify-email', { otp })
            const res = await api.get('/me')
            setMe(res.data)
            setSuccess(true)
            setTimeout(() => navigate('/'), 2000)
        } catch (err) {
            setError(err.response?.data?.message || 'Código inválido ou expirado')
            setCode(Array(DIGITS).fill(''))
            inputRefs.current[0]?.focus()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="verify-page">
            <div className="verify-glow" />
            <div className="verify-card">
                {success ? (
                    <div className="verify-success">
                        <span className="verify-success-icon">✓</span>
                        <h2>Email verificado!</h2>
                        <p>Redirecionando...</p>
                    </div>
                ) : (
                    <>
                        <div className="verify-header">
                            <span className="verify-envelope">✉️</span>
                            <h1 className="verify-title">Verifique seu email</h1>
                            <p className="verify-desc">
                                Enviamos um código de {DIGITS} dígitos para{' '}
                                <strong>{me?.email}</strong>
                            </p>
                        </div>

                        <form className="verify-form" onSubmit={handleSubmit}>
                            <div className="verify-inputs" onPaste={handlePaste}>
                                {code.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={el => inputRefs.current[i] = el}
                                        className={`verify-input ${digit ? 'verify-input-filled' : ''}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleChange(i, e.target.value)}
                                        onKeyDown={e => handleKeyDown(i, e)}
                                        autoFocus={i === 0}
                                    />
                                ))}
                            </div>

                            {error && <div className="verify-error">{error}</div>}

                            <button
                                type="submit"
                                className="verify-submit"
                                disabled={loading || code.join('').length < DIGITS}
                            >
                                {loading ? <span className="verify-spinner" /> : 'Verificar'}
                            </button>
                        </form>

                        <div className="verify-resend">
                            {cooldown > 0 ? (
                                <span className="verify-resend-timer">
                                    Reenviar código em <strong>{formatCooldown(cooldown)}</strong>
                                </span>
                            ) : (
                                <button
                                    className="verify-resend-btn"
                                    onClick={handleResend}
                                    disabled={resending}
                                >
                                    {resending ? 'Reenviando...' : 'Reenviar código'}
                                </button>
                            )}
                        </div>

                        <button className="verify-back" onClick={() => navigate(-1)}>
                            ← Voltar
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}