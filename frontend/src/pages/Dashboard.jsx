import "../css/dashboard.css";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard DokyPets</h1>

      <div className="cards">

        <div className="card">
          <h3>Mascotas</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Clientes</h3>
          <p>85</p>
        </div>

        <div className="card">
          <h3>Citas</h3>
          <p>34</p>
        </div>

        <div className="card">
          <h3>Productos</h3>
          <p>56</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;