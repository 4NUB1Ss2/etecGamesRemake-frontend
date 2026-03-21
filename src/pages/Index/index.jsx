import Welcome from '../Welcome'
import Home from '../Home'
import { useAuth } from "../../contexts/AuthContext.jsx";

function Index() {
    const { isLoggedIn } = useAuth();

    return(
        <>
            {isLoggedIn ? (
                <Home />
            ) : (
                <Welcome />
            )}
        </>
    )
}

export default Index