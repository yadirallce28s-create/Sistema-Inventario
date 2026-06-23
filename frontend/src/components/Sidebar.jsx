import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h3>PRINCIPAL</h3>

      <ul>

        <li>
          <Link to="/dashboard">
            🏠 Panel de control
          </Link>
        </li>

        <li>
          <Link to="/inventario">
            📦 Inventario
          </Link>
        </li>

        <li>
          <Link to="/servicios">
            🩺 Servicios
          </Link>
        </li>

        <li>
          <Link to="/publicidad">
            📢 Publicidad
          </Link>
        </li>

      </ul>

      <h3>GESTIÓN</h3>

      <ul>
        <li>👥 Clientes</li>
        <li>📅 Citas</li>
        <li>⚙️ Configuración</li>
      </ul>

    </aside>
  );
}

export default Sidebar;