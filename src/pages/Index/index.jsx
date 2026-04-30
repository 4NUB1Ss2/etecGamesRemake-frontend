import { useEffect } from "react"; // 1. Importe o useEffect
import Welcome from '../Welcome';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

function Index() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // 2. Use o useEffect para lidar com o redirecionamento
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/games");
        }
    }, [isLoggedIn, navigate]); // Executa sempre que o status de login mudar

    // 3. Renderize apenas o componente Welcome se não estiver logado
    // Enquanto redireciona, você pode retornar null ou um loading
    if (isLoggedIn) return null;

    return <Welcome />;
}

export default Index;