import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './style.css'

export default function Index() {
    const { me } = useAuth()
    const navigate = useNavigate()

    if (!me) return null
    if (me.role !== 'student' && me.role !== 'professor') return null
    if (me.verified && me.aproved) return null

    let icon, message, sub, action, actionLabel, variant

    if (!me.verified) {
        icon    = '✉️'
        variant = 'warning'
        message = 'Verifique seu email institucional'
        sub     = `Enviamos um código para ${me.email}. Insira-o para continuar.`
        action  = () => navigate('/verify')
        actionLabel = 'Inserir código'
    } else if (me.aproved === null || me.aproved === undefined) {
        icon    = '⏳'
        variant = 'pending'
        message = me.role === 'student'
            ? 'Aguardando aprovação de um professor'
            : 'Aguardando aprovação de um administrador'
        sub = 'Você poderá usar todas as funcionalidades após a aprovação.'
    } else if (me.aproved === 0) {
        icon    = '🚫'
        variant = 'rejected'
        message = 'Sua conta foi rejeitada'
        sub     = 'Entre em contato com a administração para mais informações.'
    }

    return (
        <div className={`vbanner vbanner-${variant}`}>
            <div className="vbanner-inner">
                <span className="vbanner-icon">{icon}</span>
                <div className="vbanner-text">
                    <strong className="vbanner-title">{message}</strong>
                    <span className="vbanner-sub">{sub}</span>
                </div>
                {action && (
                    <button className="vbanner-btn" onClick={action}>
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    )
}