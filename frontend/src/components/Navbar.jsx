function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>🐾 Doky Pets</h2>
        <span>Sistema Veterinario</span>
      </div>

      <div className="navbar-right">
        <span className="notification">🔔</span>

        <div className="user-info">
          <strong>Administrador</strong>
          <small>Juan Pérez</small>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;