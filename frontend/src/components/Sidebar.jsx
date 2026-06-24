import { Link } from "react-router-dom";

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
          <Link to="/servicios">
            <GiDogBowl /> Servicios
          </Link>
        </li>

        <li>
          <Link to="/publicidad">
            <FaBullhorn /> Publicidad
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
          <FaCalendarAlt /> Citas
        </li>

        <li>
          <FaCog /> Configuración
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;