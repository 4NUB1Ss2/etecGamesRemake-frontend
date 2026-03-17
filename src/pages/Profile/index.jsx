import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
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
    const [isOwner, setIsOwner] = useState(false)

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
        } catch {
            // não autenticado
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

    useEffect(() => {
        if (me && user) {
            setIsOwner(me.username === user.username)
        }
    }, [me, user])

    function getRoleLabel(role) {
        if (role === 'student') return 'Aluno'
        if (role === 'professor') return 'Professor'
        return null
    }

    if (loading) {
        return (
            <div className="profile-page">
                <div className="container-lg page-content">
                    <div className="profile-header placeholder-glow">
                        <div className="profile-avatar placeholder" />
                        <div className="mt-3">
                            <span className="placeholder col-3" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) return null

    const roleLabel = getRoleLabel(user.role)
    const canSeeGames = user.role === 'student' || user.role === 'professor'

    return (
        <div className="profile-page">
            <div className="container-lg page-content">

                {/* HEADER DO PERFIL */}
                <div className="profile-header">
                    <div className="profile-avatar-wrapper">
                        <img
                            src={user.avatar ?? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=2e3050&color=fff&size=128'}
                            alt={user.name}
                            className="profile-avatar"
                        />
                        {isOwner && (
                            <button className="profile-avatar-edit" title="Alterar foto">
                                ✏️
                            </button>
                        )}
                    </div>

                    <div className="profile-info">
                        <h2 className="profile-name">{user.name}</h2>
                        <span className="profile-username">@{user.username}</span>

                        {roleLabel && (
                            <div className="profile-badges mt-2">
                                <span className="profile-badge profile-badge-role">{roleLabel}</span>
                                {user.school && (
                                    <span className="profile-badge profile-badge-school">{user.school.name}</span>
                                )}
                            </div>
                        )}
                    </div>

                    {isOwner && (
                        <button className="btn profile-edit-btn">
                            Editar perfil
                        </button>
                    )}
                </div>

                {/* SEÇÃO DE JOGOS */}
                {canSeeGames && (
                    <div className="profile-games-section">
                        <div className="profile-games-header">
                            <h3 className="profile-games-title">Jogos</h3>
                            {isOwner && (
                                <button className="btn profile-add-btn">
                                    + Adicionar jogo
                                </button>
                            )}
                        </div>

                        <GameList
                            title=""
                            section="last"
                            userId={user.id}
                            emptyMessage="Sem nenhum jogo ainda"
                        />
                    </div>
                )}

            </div>
        </div>
    )
}

export default Index