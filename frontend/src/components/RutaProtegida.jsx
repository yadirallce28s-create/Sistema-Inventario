import { Navigate } from "react-router-dom";

function RutaProtegida({ children, roles }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(usuario.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RutaProtegida;