import "../../css/dashboard.css";
import {
  FaUsers,
  FaPaw,
  FaCalendarAlt,
  FaBoxOpen,
  FaUserPlus,
  FaPlusCircle,
  FaBullhorn,
  FaMoneyBillWave,
  FaBell,
  FaClipboardList,
  FaArrowUp,
} from "react-icons/fa";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-top">
        <div>
          <h1 className="dashboard-title">Panel de control</h1>
          <p className="dashboard-subtitle">
            Bienvenido{usuario?.nombre ? `, ${usuario.nombre}` : ""} a DokyPets
          </p>
        </div>

        <button className="btn-inventario">
          Ver inventario
        </button>
      </div>

      {/* RESUMEN */}
      <div className="dashboard-resumen">
        <span>Resumen del día</span>
        <small>Miércoles 28 de mayo</small>
      </div>

      {/* CARDS PRINCIPALES */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon blue">
            <FaPaw />
          </div>
          <div className="card-info">
            <h3>Mascotas</h3>
            <p>120</p>
            <span>Registradas en el sistema</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon green">
            <FaUsers />
          </div>
          <div className="card-info">
            <h3>Clientes</h3>
            <p>85</p>
            <span>Clientes activos</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon orange">
            <FaCalendarAlt />
          </div>
          <div className="card-info">
            <h3>Citas</h3>
            <p>34</p>
            <span>Programadas hoy</span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon purple">
            <FaBoxOpen />
          </div>
          <div className="card-info">
            <h3>Productos</h3>
            <p>56</p>
            <span>Disponibles en stock</span>
          </div>
        </div>
      </div>

      {/* GRID INFERIOR */}
      <div className="dashboard-grid">
        {/* ACCIONES RÁPIDAS */}
        <div className="dashboard-panel">
          <h3>Acciones rápidas</h3>

          <div className="acciones-lista">
            <button className="accion-btn cliente">
              <FaUserPlus />
              <span>Registrar cliente</span>
            </button>

            <button className="accion-btn producto">
              <FaPlusCircle />
              <span>Registrar producto</span>
            </button>

            <button className="accion-btn campania">
              <FaBullhorn />
              <span>Crear campaña</span>
            </button>
          </div>
        </div>

        {/* VENTAS DEL DÍA */}
        <div className="dashboard-panel">
          <h3>Ventas del día</h3>

          <div className="ventas-box">
            <div className="ventas-icon">
              <FaMoneyBillWave />
            </div>

            <div>
              <h2>S/. 450.00</h2>
              <p>
                <FaArrowUp className="arrow-up" /> 5% vs ayer
              </p>
            </div>
          </div>
        </div>

        {/* NOTIFICACIONES */}
        <div className="dashboard-panel">
          <h3>Notificaciones</h3>

          <ul className="panel-list">
            <li>
              <FaBell className="list-icon red" />
              Vacuna antirrábica agotándose
            </li>
            <li>
              <FaBell className="list-icon orange-text" />
              3 citas pendientes para hoy
            </li>
            <li>
              <FaBell className="list-icon blue-text" />
              Nueva campaña programada
            </li>
          </ul>
        </div>

        {/* MASCOTAS RECIENTES */}
        <div className="dashboard-panel">
          <h3>Mascotas recientes</h3>

          <ul className="panel-list">
            <li>
              <FaPaw className="list-icon blue-text" />
              Max - Labrador
            </li>
            <li>
              <FaPaw className="list-icon blue-text" />
              Luna - Poodle
            </li>
            <li>
              <FaPaw className="list-icon blue-text" />
              Rocky - Pastor Alemán
            </li>
          </ul>
        </div>

        {/* PEDIDOS PENDIENTES */}
        <div className="dashboard-panel">
          <h3>Pedidos pendientes</h3>

          <ul className="panel-list">
            <li>
              <FaClipboardList className="list-icon purple-text" />
              Vacunas x 20
            </li>
            <li>
              <FaClipboardList className="list-icon purple-text" />
              Alimento Premium x 10
            </li>
            <li>
              <FaClipboardList className="list-icon purple-text" />
              Medicamentos x 5
            </li>
          </ul>
        </div>

        {/* PANEL MARCA */}
        <div className="dashboard-panel dashboard-brand">
          <div className="brand-badge">DokyPets</div>
          <h3>Gestión inteligente para clínicas veterinarias</h3>
          <p>
            Administra clientes, mascotas, citas, inventario y campañas desde un
            solo lugar.
          </p>
          <button className="btn-brand">Ver más</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;