import "../css/login.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const ingresar = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      <div className="left-panel">
        <h1>DokyPets</h1>
        <p>Sistema de Gestión Veterinaria</p>
      </div>

      <div className="right-panel">

        <div className="login-card">

          <h2>Bienvenido</h2>

          <p>Inicia sesión para continuar</p>

          <input
            type="text"
            placeholder="Usuario"
          />

          <input
            type="password"
            placeholder="Contraseña"
          />

          <button onClick={ingresar}>
            Ingresar
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;