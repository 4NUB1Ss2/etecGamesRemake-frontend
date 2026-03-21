import GameList from '../../components/GameList/'
import './style.css'


function Index() {
    return (
        <>
            <GameList title="TESTE" section="last"/>
            <GameList title="TEST" section="clicks"/>
            <GameList title="TEST" section="last" username="testeprofile2" emptyMessage="TESTE"/>
        </>
    )
}

export default Index