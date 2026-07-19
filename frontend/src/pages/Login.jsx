import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  // Controla qué formulario se muestra: "login" o "registro"
  const [vista, setVista] = useState("login");

  // Campos de Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Campos de Registro
  const [nombre, setNombre] = useState("");
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [rol, setRol] = useState("admin");

  const limpiarFormularioRegistro = () => {
    setNombre("");
    setEmailRegistro("");
    setPasswordRegistro("");
    setRol("admin");
  };

  const cambiarAVista = (nuevaVista) => {
    setVista(nuevaVista);
  };

  const ingresar = async () => {
    try {
      const response = await fetch(
        "https://sistema-inventario-95aj.onrender.com/api/auth/login",
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

        await Swal.fire({
          icon: "success",
          title: `¡Bienvenido ${data.user.nombre}!`,
          text: "Has iniciado sesión correctamente.",
          confirmButtonColor: "#14b8a6",
          timer: 1800,
          showConfirmButton: false
        });

        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Credenciales incorrectas.",
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#d33"
      });
    }
  };

  const registrar = async () => {
    if (!nombre || !emailRegistro || !passwordRegistro) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos.",
        confirmButtonColor: "#14b8a6"
      });
      return;
    }

    try {
      const response = await fetch(
        "https://sistema-inventario-95aj.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            email: emailRegistro,
            password: passwordRegistro,
            rol,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        await Swal.fire({
          icon: "success",
          title: "¡Cuenta creada!",
          text: "Ya puedes iniciar sesión con tus datos.",
          confirmButtonColor: "#14b8a6",
          timer: 1800,
          showConfirmButton: false
        });

        limpiarFormularioRegistro();
        setVista("login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "No se pudo crear la cuenta.",
          confirmButtonColor: "#d33"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#d33"
      });
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>DokyPets</h1>
        <p>Sistema de Gestión Veterinaria</p>
      </div>

      <div className="right-panel">
        {vista === "login" ? (
          <div className="login-card">
            <h2>Bienvenido</h2>

            <p>Inicia sesión para continuar</p>

            <label>Correo</label>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={ingresar}>
              Ingresar
            </button>

            <div className="auth-switch">
              <span>¿No tienes una cuenta?</span>
              <button
                type="button"
                className="link-btn"
                onClick={() => cambiarAVista("registro")}
              >
                Crear cuenta
              </button>
            </div>
          </div>
        ) : (
          <div className="login-card">
            <h2>Registrar Usuario</h2>

            <label>Nombre</label>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label>Correo</label>
            <input
              type="email"
              placeholder="Correo"
              value={emailRegistro}
              onChange={(e) => setEmailRegistro(e.target.value)}
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={passwordRegistro}
              onChange={(e) => setPasswordRegistro(e.target.value)}
            />

            <label>Rol</label>
            <div className="rol-options">
              <label className="rol-option">
                <input
                  type="radio"
                  name="rol"
                  value="admin"
                  checked={rol === "admin"}
                  onChange={(e) => setRol(e.target.value)}
                />
                Administrador
              </label>

              <label className="rol-option">
                <input
                  type="radio"
                  name="rol"
                  value="veterinario"
                  checked={rol === "veterinario"}
                  onChange={(e) => setRol(e.target.value)}
                />
                Médico Veterinario
              </label>

              <label className="rol-option">
                <input
                  type="radio"
                  name="rol"
                  value="asistente"
                  checked={rol === "asistente"}
                  onChange={(e) => setRol(e.target.value)}
                />
                Asistente
              </label>
            </div>

            <button onClick={registrar}>
              Registrarse
            </button>

            <div className="auth-switch">
              <span>¿Ya tienes cuenta?</span>
              <button
                type="button"
                className="link-btn"
                onClick={() => cambiarAVista("login")}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
