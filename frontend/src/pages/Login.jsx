import "../css/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">

        <h1>DokyPets</h1>

        <h3>Inicio de Sesión</h3>

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
  );
};

export default Login;