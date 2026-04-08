import { useNavigate } from 'react-router-dom'
import './style.css'

function Index() {
    const navigate = useNavigate()

    const features = [
        {
            icon: '🎮',
            title: 'Jogos reais',
            desc: 'Projetos desenvolvidos por alunos e professores de ETECs de todo o Brasil.',
        },
        {
            icon: '🏫',
            title: 'Comunidade ETEC',
            desc: 'Uma plataforma exclusiva para valorizar o talento das escolas técnicas estaduais.',
        },
        {
            icon: '🚀',
            title: 'Publique seu jogo',
            desc: 'Alunos e professores podem cadastrar e compartilhar seus projetos com o mundo.',
        },
        {
            icon: '🔍',
            title: 'Descubra talentos',
            desc: 'Explore jogos de diferentes escolas, gêneros e plataformas num só lugar.',
        },
    ]

    return (
        <div className="home-page">

            {/* ── HERO ── */}
            <section className="hero-section">
                <div className="hero-glow" />
                <div className="hero-grid" />
                <div className="container-lg hero-content">
                    <div className="hero-tag">🎮 Plataforma de Jogos ETEC</div>
                    <h1 className="hero-title">
                        O lugar onde<br />
                        <span className="hero-highlight">estudantes criam</span><br />
                        e o mundo joga
                    </h1>
                    <p className="hero-subtitle">
                        ETECGames é uma plataforma dedicada a jogos desenvolvidos por alunos e professores
                        das Escolas Técnicas Estaduais de São Paulo. Descubra, jogue e apoie esses projetos.
                    </p>
                    <div className="hero-actions">
                        <button className="hero-btn-primary" onClick={() => navigate('/login')}>
                            Criar conta grátis
                        </button>
                        <button className="hero-btn-secondary" onClick={() => navigate('/games')}>
                            Explorar jogos →
                        </button>
                    </div>

                    {/* BADGES */}
                    <div className="hero-badges">
                        <span className="hero-badge">✅ Gratuito</span>
                        <span className="hero-badge">✅ Sem anúncios</span>
                        <span className="hero-badge">✅ Feito por estudantes</span>
                    </div>
                </div>

                {/* FLOATING CARDS */}
                <div className="hero-float-area">
                    <div className="float-card float-card-1">
                        <span>🏆</span>
                        <div>
                            <strong>+500</strong>
                            <span>jogos</span>
                        </div>
                    </div>
                    <div className="float-card float-card-2">
                        <span>🎓</span>
                        <div>
                            <strong>+200</strong>
                            <span>estudantes</span>
                        </div>
                    </div>
                    <div className="float-card float-card-3">
                        <span>🏫</span>
                        <div>
                            <strong>+50</strong>
                            <span>ETECs</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="features-section">
                <div className="container-lg">
                    <div className="section-header">
                        <span className="section-tag">Por que usar</span>
                        <h2 className="section-title">Tudo o que você precisa<br />numa plataforma só</h2>
                    </div>
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card">
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOR STUDENTS ── */}
            <section className="split-section">
                <div className="container-lg split-inner">
                    <div className="split-text">
                        <span className="section-tag">Para estudantes</span>
                        <h2 className="split-title">Mostre seu projeto<br />para o mundo</h2>
                        <p className="split-desc">
                            Desenvolveu um jogo na ETEC? Cadastre-o na plataforma e ganhe visibilidade.
                            Compartilhe com amigos, professores e recrutadores.
                        </p>
                        <ul className="split-list">
                            <li>✦ Perfil público com seus jogos</li>
                            <li>✦ Contador de acessos e cliques</li>
                            <li>✦ Link direto para download ou jogo online</li>
                        </ul>
                        <button className="hero-btn-primary" onClick={() => navigate('/login')}>
                            Quero publicar meu jogo
                        </button>
                    </div>
                    <div className="split-visual">
                        <div className="split-card">
                            <div className="split-card-header">
                                <div className="split-avatar">ES</div>
                                <div>
                                    <strong>Estudante ETEC</strong>
                                    <span>@etec_dev</span>
                                </div>
                                <span className="split-badge">Aluno</span>
                            </div>
                            <div className="split-game-preview">
                                <div className="split-game-img" />
                                <div className="split-game-info">
                                    <strong>Meu Jogo Incrível</strong>
                                    <span>RPG · 2026</span>
                                </div>
                            </div>
                            <div className="split-stats">
                                <div><strong>142</strong><span>acessos</span></div>
                                <div><strong>38</strong><span>downloads</span></div>
                                <div><strong>⭐ 4.8</strong><span>avaliação</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-section">
                <div className="cta-glow" />
                <div className="container-lg cta-inner">
                    <h2 className="cta-title">Pronto para explorar?</h2>
                    <p className="cta-desc">
                        Crie sua conta gratuitamente e faça parte da maior comunidade de jogos feitos por estudantes do Brasil.
                    </p>
                    <div className="hero-actions" style={{ justifyContent: 'center' }}>
                        <button className="hero-btn-primary" onClick={() => navigate('/login')}>
                            Criar conta grátis
                        </button>
                        <button className="hero-btn-secondary" onClick={() => navigate('/games')}>
                            Ver jogos →
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Index