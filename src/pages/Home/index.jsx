import GameList from '../../components/GameList/'
import './style.css'

function Index() {
    return (
        <>
            <GameList title="Últimos Lançamentos" section="last" />
            <GameList title="Favoritos" section="clicks" />
        </>
    )
}

export default Index