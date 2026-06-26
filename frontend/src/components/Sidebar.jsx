import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaBoxOpen,
  FaExclamationTriangle,
  FaTruck,
  FaStethoscope,
  FaBullhorn,
  FaPaw,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>DokyPets</h1>
        <p>Sistema Veterinario</p>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          {usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <strong>{usuario?.nombre || "Usuario"}</strong>
          <span>{usuario?.rol || "Administrador"}</span>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-title">PRINCIPAL</span>

        <NavLink to="/dashboard" className="sidebar-link">
          <FaTachometerAlt />
          <span>Panel de control</span>
        </NavLink>

        <NavLink to="/inventario" className="sidebar-link">
          <FaBoxOpen />
          <span>Inventario</span>
        </NavLink>

        <NavLink to="/alertas-stock" className="sidebar-link">
          <FaExclamationTriangle />
          <span>Alertas de stock</span>
        </NavLink>

        <NavLink to="/proveedores" className="sidebar-link">
          <FaTruck />
          <span>Proveedores</span>
        </NavLink>

        <NavLink to="/servicios" className="sidebar-link">
          <FaStethoscope />
          <span>Servicios</span>
        </NavLink>

        <NavLink to="/publicidad" className="sidebar-link">
          <FaBullhorn />
          <span>Publicidad</span>
        </NavLink>

        <NavLink to="/mascotas" className="sidebar-link">
          <FaPaw />
          <span>Mascotas</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-title">GESTIÓN</span>

        <NavLink to="/clientes" className="sidebar-link">
          <FaUsers />
          <span>Clientes</span>
        </NavLink>

        <NavLink to="/citas" className="sidebar-link">
          <FaCalendarAlt />
          <span>Citas</span>
        </NavLink>

        <NavLink to="/configuracion" className="sidebar-link">
          <FaCog />
          <span>Configuración</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;