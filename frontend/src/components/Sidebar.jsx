import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import perrito from "../assets/perrito.png"
import {
  MdDashboard,
  MdGroups,
  MdPets,
  MdInventory2,
  MdWarningAmber,
  MdLocalShipping,
  MdMedicalServices,
  MdCampaign,
  MdSettings,
  MdPointOfSale,
  MdEventAvailable,
  MdCategory
} from "react-icons/md";

function Sidebar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const esAdmin = usuario?.rol === "admin";
  const esVeterinario = usuario?.rol === "veterinario";
  const esAsistente = usuario?.rol === "asistente";
  const [inventarioOpen, setInventarioOpen] = useState(false);
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo">
          <img src={perrito} alt="imagen de buena calidad" />
        </div>
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
          <MdDashboard className="menu-icon" />
          <span>Panel de control</span>
        </NavLink>
        {(esAdmin || esAsistente) && (
          <div className="sidebar-menu">

            <button
              className="sidebar-dropdown"
              onClick={() => setInventarioOpen(!inventarioOpen)}
            >

              <div className="sidebar-dropdown-title">

                <MdInventory2 className="menu-icon" />
                <span>Inventario</span>

              </div>

              {inventarioOpen ? <FaChevronDown /> : <FaChevronRight />}

            </button>

            {inventarioOpen && (
              <div className="sidebar-submenu">

                <NavLink
                  to="/inventario/productos"
                  className="sidebar-sublink"
                >
                  <MdCategory className="menu-icon" />
                  Productos
                </NavLink>

                <NavLink
                  to="/inventario/alertas"
                  className="sidebar-sublink"
                >
                  <MdWarningAmber className="menu-icon" />
                  Alertas
                </NavLink>

                {esAdmin && (
                  <NavLink
                    to="/inventario/proveedores"
                    className="sidebar-sublink"
                  >
                    <MdLocalShipping className="menu-icon" />
                    Proveedores
                  </NavLink>
                )}

              </div>
            )}

          </div>
        )}

        {(esAdmin || esVeterinario) && (
          <NavLink to="/servicios" className="sidebar-link">
            <MdMedicalServices className="menu-icon" />
            <span>Servicios</span>
          </NavLink>
        )}

        {esAdmin && (
          <NavLink to="/publicidad" className="sidebar-link">
            <MdCampaign className="menu-icon" />
            <span>Publicidad</span>
          </NavLink>
        )}

        <NavLink to="/mascotas" className="sidebar-link">
          <MdPets className="menu-icon" />
          <span>Mascotas</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <span className="sidebar-title">GESTIÓN</span>

        <NavLink to="/clientes" className="sidebar-link">
          <MdGroups className="menu-icon" />
          <span>Clientes</span>
        </NavLink>

        <NavLink to="/citas" className="sidebar-link">
          <MdEventAvailable className="menu-icon" />
          <span>Citas</span>
        </NavLink>
        {(esAdmin || esAsistente) && (
          <NavLink to="/ventas" className="sidebar-link">
            <MdPointOfSale className="menu-icon" />
            <span>Ventas</span>
          </NavLink>
        )}

        {esAdmin && (
          <NavLink to="/configuracion" className="sidebar-link">
            <MdSettings className="menu-icon" />
            <span>Configuración</span>
          </NavLink>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;