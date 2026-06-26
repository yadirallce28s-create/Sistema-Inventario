import "../../css/publicidad.css";
import { useEffect, useState } from "react";

function Publicidad() {

  const [campanas, setCampanas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("activa");
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    obtenerCampanas();
  }, []);

  const obtenerCampanas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/publicidad");
      const data = await response.json();
      setCampanas(data.campanas);
    } catch (error) {
      console.error(error);
    }
  };

  const editarCampana = (campana) => {
    setIdEditar(campana.id);
    setTitulo(campana.titulo);
    setDescripcion(campana.descripcion);
    setImagen(campana.imagen_url);
    setFechaInicio(campana.fecha_inicio.substring(0, 10));
    setFechaFin(campana.fecha_fin.substring(0, 10));
    setEstado(campana.estado);
    setMostrarModal(true);
  };

  const limpiarFormulario = () => {
    setIdEditar(null);
    setTitulo("");
    setDescripcion("");
    setImagen("");
    setFechaInicio("");
    setFechaFin("");
    setEstado("activa");
  };

  const guardarCampana = async () => {
    try {

      const url = idEditar
        ? `http://localhost:5000/api/publicidad/${idEditar}`
        : "http://localhost:5000/api/publicidad";

      const metodo = idEditar ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          imagen_url: imagen,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          estado,
          id_usuario: 1
        })
      });

      const data = await response.json();

      if (data.status === "success") {
        obtenerCampanas();
        limpiarFormulario();
        setMostrarModal(false);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const eliminarCampana = async (id) => {

    if (!window.confirm("¿Desea eliminar esta campaña?")) return;

    await fetch(`http://localhost:5000/api/publicidad/${id}`, {
      method: "DELETE"
    });

    obtenerCampanas();
  };

  return (
    <div>

      <div className="publicidad-header">
        <div>
          <h1>📢 Campañas Publicitarias</h1>
          <p>Gestión de promociones y publicidad</p>
        </div>

        <button
          className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Nueva Campaña
        </button>
      </div>

      <input
        className="buscador"
        placeholder="Buscar campaña..."
      />

      {/* =========================
          ESTADO VACÍO BONITO
      ========================= */}
      {campanas.length === 0 ? (
        <div className="empty-state">
          <h2>📭 No hay campañas aún</h2>
          <p>Crea tu primera campaña publicitaria para comenzar</p>
          <button
            className="btn-nuevo"
            onClick={() => setMostrarModal(true)}
          >
            Crear campaña
          </button>
        </div>
      ) : (
        <div className="panel">
          <table className="tabla">
            <thead>
              <tr>
                <th>Título</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {campanas.map((campana) => (
                <tr key={campana.id}>
                  <td>{campana.titulo}</td>
                  <td>{new Date(campana.fecha_inicio).toLocaleDateString()}</td>
                  <td>{new Date(campana.fecha_fin).toLocaleDateString()}</td>
                  <td>{campana.estado}</td>
                  <td>
                    <button className="btn-editar" onClick={() => editarCampana(campana)}>
                      Editar
                    </button>

                    <button className="btn-eliminar" onClick={() => eliminarCampana(campana.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>{idEditar ? "Editar Campaña" : "Nueva Campaña"}</h2>

            <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <input placeholder="URL Imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="activa">Activa</option>
              <option value="programada">Programada</option>
              <option value="vencida">Vencida</option>
            </select>

            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={() => { limpiarFormulario(); setMostrarModal(false); }}>
                Cancelar
              </button>

              <button className="btn-guardar" onClick={guardarCampana}>
                Guardar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Publicidad;