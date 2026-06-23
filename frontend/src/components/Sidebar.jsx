function Sidebar() {
  return (
    <aside className="sidebar">

      <h3>PRINCIPAL</h3>

      <ul>
        <li className="active">🏠 Panel de control</li>
        <li>📦 Inventario</li>
        <li>🩺 Servicios</li>
        <li>📢 Publicidad</li>
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