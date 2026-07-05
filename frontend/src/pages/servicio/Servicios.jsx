import "../../css/servicio.css";
import { useState, useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faConciergeBell } from "@fortawesome/free-solid-svg-icons";

function Servicios() {

  const [tabActiva, setTabActiva] = useState("catalogo");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [servicios, setServicios ]= useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");

  const guardarServicio = async () => {
    try {

      await fetch(
        "http://localhost:5000/api/servicios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            descripcion,
            precio,
            duracion_minutos: duracion,
          }),
        }
      );

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setDuracion("");

      setMostrarModal(false);

      obtenerServicios();

    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>

      <div className="servicios-header">
        <h1> <FontAwesomeIcon icon={faConciergeBell} color="#429a85"/> Gestión de servicios</h1>

        <button
          className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Nuevo Servicio
        </button>
      </div>

      <div className="tabs">

        <button
          className={`tab ${tabActiva === "catalogo" ? "active" : ""}`}
          onClick={() => setTabActiva("catalogo")}
        >
          Catálogo
        </button>

      </div>
      {
        mostrarModal && (
          <div className="modal-overlay">

            <div className="modal">

              <h2>Nuevo Servicio</h2>

              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />

              <input
                type="number"
                placeholder="Duración (min)"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              />

              <div className="modal-buttons">

                <button onClick={guardarServicio}>
                  Guardar
                </button>

                <button
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>

              </div>

            </div>

          </div>
        )
      }

      {tabActiva === "catalogo" && (
        <>
          <div className="servicios-grid">

            <div className="servicio-card">
              <h3>Baño y corte</h3>
              <h4>S/ 45.00</h4>

              <p>
                Incluye baño, secado y corte según raza.
              </p>

              <span className="activo">
                Activo
              </span>
            </div>

            <div className="servicio-card">
              <h3>Vacunación</h3>
              <h4>S/ 80.00</h4>

              <p>
                Vacunas antirrábica, moquillo y parvovirus.
              </p>

              <span className="activo">
                Activo
              </span>
            </div>

            <div className="servicio-card">
              <h3>Consulta médica</h3>
              <h4>S/ 60.00</h4>

              <p>
                Revisión general con veterinario certificado.
              </p>

              <span className="activo">
                Activo
              </span>
            </div>

          </div>

          <div className="panel">

            <h3>Citas de hoy</h3>

            <table className="tabla">

              <tbody>

                <tr>
                  <td>9:00</td>
                  <td>Luna — Golden Retriever</td>
                  <td>
                    <span className="confirmada">
                      Confirmada
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>10:30</td>
                  <td>Max — Husky</td>
                  <td>
                    <span className="pendiente">
                      Pendiente
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>
        </>
      )}



    </div>
  );
}

export default Servicios;