import "../css/dashboard.css";
import MainLayout from "../layout/MainLayout";

function Dashboard() {
  return (
    <MainLayout>

      <h1>Panel de control</h1>
      <div className="resumen">
        <span>
          resumen del dia - miercoles 28 de mayo
        </span>
        <button>
          ver inventrario
        </button>

      </div>

      <div className="cards">

        <div className="card">
          <h3>🐾 Mascotas</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>👥 Clientes</h3>
          <p>85</p>
        </div>

        <div className="card">
          <h3>📅 Citas</h3>
          <p>34</p>
        </div>

        <div className="card">
          <h3>📦 Productos</h3>
          <p>56</p>
        </div>

      </div>
      <div className="dashboard-grid">

        <div className="panel">
          <h3>Acciones rápidas</h3>

          <button className="btn-cliente">
            Registrar cliente
          </button>

          <button className="btn-producto">
            Registrar producto
          </button>

          <button className="btn-campania">
            Crear campaña
          </button>
        </div>

        <div className="panel">
          <h3>Ventas del día</h3>

          <h2>S/. 450.00</h2>

          <span>↑ 5% vs ayer</span>
        </div>

        <div className="panel">
          <h3>Notificaciones</h3>

          <ul>
            <li>Vacuna antirrábica agotándose</li>
            <li>3 citas pendientes para hoy</li>
            <li>Nueva campaña programada</li>
          </ul>
        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;