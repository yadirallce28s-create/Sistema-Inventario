import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaCashRegister } from "react-icons/fa";

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
  FaChevronDown,
  FaChevronRight,
  FaCube,
} from "react-icons/fa";

function Sidebar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [inventarioOpen, setInventarioOpen] = useState(false);
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

        <div className="sidebar-menu">

          <button
            className="sidebar-dropdown"
            onClick={() => setInventarioOpen(!inventarioOpen)}
          >

            <div className="sidebar-dropdown-title">

              <FaBoxOpen />

              <span>Inventario</span>

            </div>

            {
              inventarioOpen
                ? <FaChevronDown />
                : <FaChevronRight />
            }

          </button>

          {
            inventarioOpen && (

              <div className="sidebar-submenu">

                <NavLink
                  to="/inventario/productos"
                  className="sidebar-sublink"
                >
                  <FaCube />
                  Productos
                </NavLink>

                <NavLink
                  to="/inventario/alertas"
                  className="sidebar-sublink"
                >
                  <FaExclamationTriangle />
                  Alertas
                </NavLink>

                <NavLink
                  to="/inventario/proveedores"
                  className="sidebar-sublink"
                >
                  <FaTruck />
                  Proveedores
                </NavLink>

              </div>

            )
          }

        </div>
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
        <NavLink to="/ventas" className="sidebar-link">
          <FaCashRegister />
          <span>Ventas</span>
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