import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function UnauthenticatedApp() {
    const { login } = useAuth();

    return (
        <>
            <h2>Introduce usuario y contraseña para entrar </h2>
            <div>
                <button onClick={login} className="login">
                    Accede mediante cuenta de Google
                </button>
            </div>
        </>
    );
}

export { UnauthenticatedApp };