const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        background: "#fff",
        minHeight: "100vh",
        padding: "20px",
        borderRight: "1px solid #ddd",
      }}
    >
      <h3>Menú</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Inventario</li>
        <li>Servicios</li>
        <li>Publicidad</li>
        <li>Clientes</li>
      </ul>
    </aside>
  );
};

export default Sidebar;