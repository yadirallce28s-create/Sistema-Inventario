import React from "react";
//import Login from "../css/Login.css"
/*export default Login() = {
    
}*/
function Login() {
  return (
    <div className="container mt-5">
      <h1>DokyPets</h1>
      <h3>Inicio de Sesión</h3>
        <h3>que bendicion</h3>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Usuario"
      />

      <input
        type="password"
        className="form-control mt-3"
        placeholder="Contraseña"
      />
      <input type="text" className="bg-green-200" />

      <button className="btn btn-primary mt-3">
        Ingresar
      </button>
    </div>
  );
}

export default Login;