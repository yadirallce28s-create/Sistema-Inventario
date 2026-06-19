import "../css/login.css";
import logo from "../assets/hero.png";
import perrito from "../assets/perrito.png";
const Login = () => {
  return (
    <div className="login-container">

      <div className="left-panel">

        <img
          src={logo}
          alt="DokyPets"
          className="logo"
        />
        <img
          src={perrito}
          alt="DokyPets"
          className="logo"
        />

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

          <button>
            Ingresar
          </button>

        </div>

      </div>

    </div>
  );
};

export default Login;