import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>Panel administrativo</h2>
        <p>Gestión veterinaria DokyPets</p>
      </div>

      <div className="topbar-right">
        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="user-box">
          <div className="user-avatar">
            {usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="user-data">
            <strong>{usuario?.nombre || "Usuario"}</strong>
            <span>{usuario?.rol || "Administrador"}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Navbar;