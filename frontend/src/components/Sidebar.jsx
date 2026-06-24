import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import {
  FaHome,
  FaBox,
  FaBullhorn,
  FaUserFriends,
  FaCalendarAlt,
  FaCog
} from "react-icons/fa";

import { GiDogBowl } from "react-icons/gi";

function Sidebar() {
  return (
    <aside className="sidebar">

      <h3>PRINCIPAL</h3>

      <ul>

        <li>
          <Link to="/dashboard">
            <FaHome /> Panel de control
          </Link>
        </li>

        <li>
          <Link to="/inventario">
            <FaBox /> Inventario
          </Link>
        </li>

        <li>
          <Link to="/alertas-stock">
            📋 Alertas de Stock
          </Link>
        </li>

        <li>
          <Link to="/proveedores">
            🏢 Directorio de Proveedores
          </Link>
        </li>

        <li>
          <Link to="/servicios">
            <GiDogBowl /> Servicios
          </Link>
        </li>

        <li>
          <Link to="/publicidad">
            <FaBullhorn /> Publicidad
          </Link>
        </li>
        <li>
          <Link to="/mascotas">
            <FaPaw /> Mascotas
          </Link>
        </li>


      </ul>

      <h3>GESTIÓN</h3>

      <ul>

        <li>
          <Link to="/clientes">
            <FaUserFriends /> Clientes
          </Link>
        </li>

        <li>
          <Link to="/citas">📅 Citas</Link>
        </li>

        <li>
          <FaCog /> Configuración
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;