function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#198754",
        color: "white",
        padding: "20px"
      }}
    >
      <h2>DokyPets</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>🏠 Dashboard</li>
        <li>📦 Inventario</li>
        <li>🩺 Servicios</li>
        <li>📢 Publicidad</li>
      </ul>
    </div>
  );
}

export default Sidebar;