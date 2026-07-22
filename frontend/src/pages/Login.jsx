import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const ingresar = async () => {
    if (!email || !password) {
      alert("Ingresa tu correo y contraseña");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("usuario", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") ingresar();
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

          <label>
            <MdEmail className="field-icon" />
            Correo
          </label>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <label>
            <MdLock className="field-icon" />
            Contraseña
          </label>
          <div className="password-wrapper">
            <input
              type={verPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setVerPassword(!verPassword)}
              tabIndex={-1}
            >
              {verPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          <div className="login-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button onClick={ingresar} disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>

          <p className="login-footer">
            ¿No tienes cuenta? <a href="#">Contacta al administrador</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;