import "../css/dashboard.css";
import MainLayout from "../layout/MainLayout";

function Dashboard() {
  return (
    <MainLayout>

      <h1>Panel de control</h1>

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

    </MainLayout>
  );
}

export default Dashboard;