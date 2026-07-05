import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  MdNotifications,
  MdSearch,
  MdLogout,
  MdAccessTime,
} from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [hora, setHora] = useState("");

  useEffect(() => {

    const actualizarHora = () => {

      const ahora = new Date();

      setHora(
        ahora.toLocaleString("es-PE", {
          dateStyle: "full",
          timeStyle: "short",
        })
      );

    };

    actualizarHora();

    const intervalo = setInterval(actualizarHora, 1000);

    return () => clearInterval(intervalo);

  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header className="topbar">

      <div className="topbar-left">

        <div>

          <h2>Panel Administrativo</h2>

          <p>Bienvenido, {usuario?.nombre}</p>

        </div>

      </div>

      <div className="topbar-right">

        <div className="search-box">

          <MdSearch />

          <input
            type="text"
            placeholder="Buscar..."
          />

        </div>

        <div className="hora-box">

          <MdAccessTime />

          <span>{hora}</span>

        </div>

        <button className="notification-btn">

          <MdNotifications />

          <span className="notification-badge">

            3

          </span>

        </button>

        <div className="user-box">

          <div className="user-avatar">

            {usuario?.nombre
              ? usuario.nombre.charAt(0).toUpperCase()
              : "U"}

          </div>

          <div className="user-data">

            <strong>{usuario?.nombre}</strong>

            <span>{usuario?.rol}</span>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={cerrarSesion}
        >

          <MdLogout />

          Salir

        </button>

      </div>

    </header>
  );
}

export default Navbar;