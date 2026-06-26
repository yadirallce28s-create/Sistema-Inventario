import "../../css/clientes.css";
import { useEffect, useState } from "react";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // estados del modal
  const [mostrarModal, setMostrarModal] = useState(false);

  // estados del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  // obtener clientes desde backend
  const obtenerClientes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clientes");
      const data = await response.json();

      if (data.status === "success") {
        setClientes(data.clientes);
      }
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // guardar cliente
  const guardarCliente = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          telefono,
          email,
          direccion,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Cliente registrado correctamente");

        // limpiar formulario
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");
        setDireccion("");

        // cerrar modal
        setMostrarModal(false);

        // recargar clientes
        obtenerClientes();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      alert("Error al registrar cliente");
    }
  };

  // filtro de búsqueda
  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.nombre} ${cliente.apellido || ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>👥 Clientes</h1>

        <button
          className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Nuevo Cliente
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar cliente..."
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="clientes-cards">
        <div className="cliente-card">
          <h3>Total Clientes</h3>
          <p>{clientes.length}</p>
        </div>

        <div className="cliente-card">
          <h3>Nuevos</h3>
          <p>{clientes.length}</p>
        </div>

        <div className="cliente-card">
          <h3>Frecuentes</h3>
          <p>{clientes.length}</p>
        </div>
      </div>

      <div className="tabla-clientes">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td>
                    {cliente.nombre} {cliente.apellido}
                  </td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.direccion}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay clientes registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL NUEVO CLIENTE */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nuevo Cliente</h2>

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={guardarCliente}>Guardar</button>

              <button
                className="btn-cancelar"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes;