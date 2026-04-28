import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import EditProfileModal from '../../components/EditProfileModal'
import GameList from '../../components/GameList'
import api from '../../services/api.js'
import './style.css'

function Index() {
    const { username } = useParams()
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    const [user, setUser] = useState(null)
    const [me, setMe] = useState(null)
    const [loading, setLoading] = useState(true)
    const isOwner = me && user ? me.username === user.username : false;
    const [showEdit, setShowEdit] = useState(false)

    async function getUser() {
        try {
            const response = await api.get(`/users/${username}`)
            setUser(response.data)
        } catch {
            navigate('/404')
        }
    }

    async function getMe() {
        try {
            const response = await api.get('/me')
            setMe(response.data)
        } catch(error) {
            console.error("capoto o corsa ", error)

        }
        

    }

    useEffect(() => {
        async function load() {
            setLoading(true)
            await getUser()
            if (isLoggedIn) await getMe()
            setLoading(false)
        }
        load()
    }, [username])

    
    

    function getRoleLabel(role) {
        if (role === 'student') return 'Aluno'
        if (role === 'professor') return 'Professor'
        return null
    }

    function getRoleIcon(role) {
        if (role === 'student') return '🎒'
        if (role === 'professor') return '📚'
        return '👤'
    }

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-banner" />
                <div className="container-lg profile-body">
                    <div className="profile-header-card">
                        <div className="skeleton-avatar-wrap">
                            <div className="skeleton-circle" />
                        </div>
                        <div className="profile-header-info">
                            <div className="skeleton-line w-48" />
                            <div className="skeleton-line w-28" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) return null

    const roleLabel = getRoleLabel(user.role)
    const roleIcon = getRoleIcon(user.role)
    const canSeeGames = user.role === 'student' || user.role === 'professor'
    const isCommonUser = user.role === 'user'
    const avatarUrl = user.avatar ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1c1e2e&color=a67eec&size=128&bold=true`

    return (
        <div className="profile-page">

            {/* BANNER */}
            <div className="profile-banner">
                <div className="profile-banner-pattern" />
                <div className="profile-banner-glow" />
            </div>

            <div className="container-lg profile-body">

                {/* HEADER CARD */}
                <div className="profile-header-card">
                    <div className="profile-avatar-wrapper">
                        {console.log(user.image)}
                        <img 
                            src={user.image || avatarUrl} 
                            alt={user.name} 
                            className="profile-avatar" />
                    </div>

                    <div className="profile-header-info">
                        <div className="profile-header-top">
                            <div>
                                <h2 className="profile-name">{user.name}</h2>
                                <span className="profile-username">@{user.username}</span>
                            </div>
                            {isOwner && (
                                <button className="profile-edit-btn" onClick={() => setShowEdit(true)}>
                                    Editar perfil
                                </button>
                            )}

                            {showEdit && (
                                <EditProfileModal
                                    user={user}
                                    onClose={() => setShowEdit(false)}
                                    onSave={(updatedUser) => {
                                        setUser(updatedUser)
                                        setShowEdit(false)
                                    }}
                                />
                            )}
                        </div>



                        <div className="profile-badges">
                            <span className="profile-badge profile-badge-role">
                                {roleIcon} {roleLabel ?? 'Usuário'}
                            </span>
                            {user.school && (
                                <span className="profile-badge profile-badge-school">
                                    🏫 {user.school.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* COMMON USER */}
                {isCommonUser && (
                    <div className="profile-common-grid">
                        <div className="profile-common-card">
                            <h4 className="profile-section-title">Sobre</h4>
                            <p className="profile-common-text">
                                {isOwner
                                    ? 'Você ainda não adicionou uma bio. Edite seu perfil para se apresentar!'
                                    : `${user.name} ainda não adicionou uma bio.`}
                            </p>
                            {isOwner && (
                                <button className="profile-common-action">+ Adicionar bio</button>
                            )}
                        </div>

                        <div className="profile-cta-card">
                            <div className="profile-cta-icon">🎮</div>
                            <h4 className="profile-cta-title">Quer publicar jogos?</h4>
                            <p className="profile-cta-desc">
                                Apenas alunos e professores de ETECs podem publicar jogos na plataforma.
                            </p>
                            <a href="https://www.cps.sp.gov.br/etec/" target="_blank"
                               rel="noreferrer" className="profile-cta-btn">
                                Saiba mais →
                            </a>
                        </div>
                    </div>
                )}

                {/* GAMES */}
                {canSeeGames && (
                    <div className="profile-games-section">
                        <div className="profile-games-header">
                            <h3 className="profile-games-title">🕹️ Jogos</h3>
                            {isOwner && (
                                <button className="profile-add-btn" onClick={() => navigate("/games/new")}>+ Adicionar jogo</button>
                            )}
                        </div>
                        <GameList
                            title=""
                            section="last"
                            username={user.username}
                            emptyMessage="Sem nenhum jogo ainda"
                        />
                    </div>
                )}

            </div>
        </div>
    )
}

export default Index