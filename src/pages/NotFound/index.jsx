import { useNavigate } from 'react-router-dom'
import './style.css'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="nf-page">
            <div className="nf-glow" />

            <div className="nf-content">
                <div className="nf-code-wrapper">
                    <span className="nf-code">4</span>
                    <span className="nf-zero">0</span>
                    <span className="nf-code">4</span>
                </div>

                <div className="nf-divider" />

                <h2 className="nf-title">Página não encontrada</h2>
                <p className="nf-subtitle">
                    A página que você está procurando não existe,<br />
                    foi removida ou nunca existiu.
                </p>

                <div className="nf-actions">
                    <button className="nf-btn-primary" onClick={() => navigate('/')}>
                        ← Voltar para o início
                    </button>
                    <button className="nf-btn-ghost" onClick={() => navigate(-1)}>
                        Página anterior
                    </button>
                </div>
            </div>

            <div className="nf-grid" />
        </div>
    )
}

export default NotFound