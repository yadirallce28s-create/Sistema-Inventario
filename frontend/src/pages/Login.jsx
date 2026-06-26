import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ingresar = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem(
          "usuario",
          JSON.stringify(data.user)
        );

        alert("Login exitoso");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert("Error al conectar con el servidor");
    }
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
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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