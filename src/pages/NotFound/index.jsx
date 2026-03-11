import {useNavigate} from "react-router-dom";
import './style.css'

function NotFound() {
    const navigate = useNavigate();


    return (
        <div className="notfound-container">
            <div className="notfound-code">
                404
            </div>
            <div className="notfound-divider"/>
            <h2 className="notfound-title">
                Página não encontrada
            </h2>
            <p className="notfound-subtitle">
                A página que você está procurando não existe ou foi removida.
            </p>
            <button type={"button"} className="btn btn-primary px-4" onClick={() => navigate("/")}>
                Voltar para o ínicio
            </button>
        </div>
    )
}

export default NotFound;