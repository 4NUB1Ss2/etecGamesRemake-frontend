// src/components/UI/index.jsx
// Componentes reutilizáveis do ETECGames
// Importe o que precisar: import { Btn, GameCard, Badge, ... } from '../UI'

import './ui.css'

// ══════════════════════════════════════════════════
// BOTÃO
// uso: <Btn variant="primary" size="lg" onClick={...}>Texto</Btn>
// variants: primary | outline | ghost | danger
// sizes: sm | md (default) | lg
// ══════════════════════════════════════════════════
export function Btn({ children, variant = 'primary', size = 'md', className = '', ...props }) {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

// ══════════════════════════════════════════════════
// INPUT
// uso: <Input label="Nome" placeholder="..." value={v} onChange={...} />
// ══════════════════════════════════════════════════
export function Input({ label, error, className = '', ...props }) {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <input className={`input ${className}`} {...props} />
            {error && <span className="alert alert-error">{error}</span>}
        </div>
    )
}

export function Textarea({ label, error, className = '', ...props }) {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <textarea className={`input textarea ${className}`} {...props} />
            {error && <span className="alert alert-error">{error}</span>}
        </div>
    )
}

// ══════════════════════════════════════════════════
// BADGE
// uso: <Badge variant="purple">Aluno</Badge>
// variants: purple | blue | green | red
// ══════════════════════════════════════════════════
export function Badge({ children, variant = 'purple', className = '' }) {
    return (
        <span className={`badge badge-${variant} ${className}`}>
            {children}
        </span>
    )
}

// ══════════════════════════════════════════════════
// AVATAR
// uso: <Avatar name="João Silva" src={url} size="lg" />
// sizes: sm | md | lg | xl
// ══════════════════════════════════════════════════
export function Avatar({ name, src, size = 'md', className = '' }) {
    const initial = name?.charAt(0).toUpperCase() ?? '?'
    const sizes = { sm: 32, md: 48, lg: 80, xl: 110 }
    const px = sizes[size]

    if (src) {
        return <img src={src} alt={name} className={`avatar avatar-${size} ${className}`} />
    }

    return (
        <div
            className={`avatar-placeholder avatar-${size} ${className}`}
            style={{ width: px, height: px, fontSize: px * 0.38 }}
        >
            {initial}
        </div>
    )
}

// ══════════════════════════════════════════════════
// GAME CARD
// uso: <GameCard game={game} onClick={...} />
// ══════════════════════════════════════════════════
export function GameCard({ game, onClick }) {
    return (
        <div className="game-card" onClick={onClick}>
            <div className="game-card-img">
                <img src={game.image} alt={game.name} />
                <div className="game-card-overlay">
                    <a
                        href={game.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                        onClick={e => e.stopPropagation()}
                    >
                        ▶ Jogar
                    </a>
                </div>
                {game.clicks !== undefined && (
                    <span className="game-card-badge">🔥 {game.clicks}</span>
                )}
            </div>
            <div className="game-card-body">
                <h3 className="game-card-title">{game.name}</h3>
                <p className="game-card-desc">{game.description}</p>
                {game.school && (
                    <span className="game-card-school">🏫 {game.school.name}</span>
                )}
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════
// GAME CARD SKELETON
// uso: <GameCardSkeleton />
// ══════════════════════════════════════════════════
export function GameCardSkeleton() {
    return (
        <div className="game-card" style={{ pointerEvents: 'none' }}>
            <div className="skeleton skeleton-img" />
            <div className="game-card-body" style={{ gap: 8 }}>
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                <div className="skeleton skeleton-text" style={{ width: '60%' }} />
            </div>
        </div>
    )
}

// ══════════════════════════════════════════════════
// CARD GENÉRICO
// uso: <Card hover>conteúdo</Card>
// ══════════════════════════════════════════════════
export function Card({ children, hover = false, className = '', ...props }) {
    return (
        <div className={`card ${hover ? 'card-hover' : ''} ${className}`} {...props}>
            {children}
        </div>
    )
}

// ══════════════════════════════════════════════════
// ALERT
// uso: <Alert variant="error">mensagem</Alert>
// variants: error | success
// ══════════════════════════════════════════════════
export function Alert({ children, variant = 'error' }) {
    if (!children) return null
    return <div className={`alert alert-${variant}`}>{children}</div>
}

// ══════════════════════════════════════════════════
// SPINNER
// uso: <Spinner />
// ══════════════════════════════════════════════════
export function Spinner() {
    return <span className="spinner" />
}

// ══════════════════════════════════════════════════
// EMPTY STATE
// uso: <EmptyState icon="🎮" title="Sem jogos" desc="Nenhum jogo ainda" />
// ══════════════════════════════════════════════════
export function EmptyState({ icon = '📭', title, desc, action }) {
    return (
        <div className="empty-state">
            <span className="empty-state-icon">{icon}</span>
            {title && <h3 className="empty-state-title">{title}</h3>}
            {desc  && <p  className="empty-state-desc">{desc}</p>}
            {action}
        </div>
    )
}

// ══════════════════════════════════════════════════
// SECTION HEADER
// uso: <SectionHeader title="🕹️ Jogos" />
// ══════════════════════════════════════════════════
export function SectionHeader({ title, action }) {
    return (
        <div className="section-header">
            <h2 className="section-title">{title}</h2>
            <div className="section-line" />
            {action}
        </div>
    )
}