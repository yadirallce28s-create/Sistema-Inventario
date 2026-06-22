const Navbar = () => {
  return (
    <nav
      style={{
        height: "60px",
        background: "#0099cc",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <h2>DokyPets</h2>

      <span>Administrador</span>
    </nav>
  );
};

export default Navbar;