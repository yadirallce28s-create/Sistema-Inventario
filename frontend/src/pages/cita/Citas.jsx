import "../../css/citas.css";
import { useEffect, useState } from "react";

function Citas() {

  const [tabActiva, setTabActiva] = useState("pendientes");

  const [citas, setCitas] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");
  const [idMascota, setIdMascota] = useState("");

  useEffect(() => {
    obtenerCitas();
    obtenerMascotas();
  }, []);

  const obtenerCitas = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/citas"
      );

      const data = await response.json();

      setCitas(data.citas);

    } catch (error) {
      console.error(error);
    }
  };

  const obtenerMascotas = async () => {
    try {

      const response = await fetch(
        "http://localhost:5000/api/mascotas"
      );

      const data = await response.json();

      setMascotas(data.mascotas);

    } catch (error) {
      console.error(error);
    }
  };

  const guardarCita = async () => {

    try {

      await fetch(
        "http://localhost:5000/api/citas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fecha,
            motivo,
            id_mascota: idMascota,
          }),
        }
      );

      setFecha("");
      setMotivo("");
      setIdMascota("");

      setMostrarModal(false);

      obtenerCitas();

    } catch (error) {
      console.error(error);
    }
  };

  const citasPendientes = citas.filter(
    (cita) => cita.estado === "pendiente"
  );

  const historial = citas.filter(
    (cita) => cita.estado !== "pendiente"
  );
  const atenderCita = async (id) => {

    await fetch(
        `http://localhost:5000/api/citas/${id}`,
        {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                estado:"atendida"
            })
        }
    );

    obtenerCitas();

  };

  return (
    <div>

      <div className="citas-header">

        <h1>Citas</h1>
        <p className="subtitulo">
          Gestión y programación de citas veterinarias
        </p>

        <button
          className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Agendar Cita
        </button>

      </div>

      <div className="tabs">

        <button
          className={`tab ${
            tabActiva === "pendientes"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTabActiva("pendientes")
          }
        >
          Citas Pendientes
        </button>

        <button
          className={`tab ${
            tabActiva === "historial"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setTabActiva("historial")
          }
        >
          Historial
        </button>

      </div>

      {tabActiva === "pendientes" && (

        <table className="tabla">

          <thead>
            <tr>
              <th>Fecha</th>
              <th>Mascota</th>
              <th>Motivo</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>

            {citasPendientes.map((cita) => (

              <tr key={cita.id}>
                <td>{cita.fecha}</td>
                <td>{cita.mascota}</td>
                <td>{cita.motivo}</td>
                <td>{cita.estado}</td>
                <td>
                  <div className="acciones">

                    <button
                      className="btn-icono btn-atender"
                      onClick={() => atenderCita(cita.id)}
                      title="Atender cita"
                    >
                      🩺
                    </button>

                    <button
                      className="btn-icono btn-editar"
                      title="Editar cita"
                    >
                      ✏️
                    </button>

                    <button
                      className="btn-icono btn-eliminar"
                      title="Eliminar cita"
                    >
                      🗑️
                    </button>

                  </div>
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

      {tabActiva === "historial" && (

        <table className="tabla">

          <thead>
            <tr>
              <th>Fecha</th>
              <th>Mascota</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {historial.map((cita) => (

              <tr key={cita.id}>
                <td>{cita.fecha}</td>
                <td>{cita.mascota}</td>
                <td>{cita.motivo}</td>
                <td>{cita.estado}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

      {mostrarModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Agendar Cita</h2>

            <input
              type="datetime-local"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
            />

            <select
              value={idMascota}
              onChange={(e) =>
                setIdMascota(e.target.value)
              }
            >

              <option value="">
                Seleccione Mascota
              </option>

              {mascotas.map((mascota) => (

                <option
                  key={mascota.id}
                  value={mascota.id}
                >
                  {mascota.nombre}
                </option>

              ))}

            </select>

            <textarea
              placeholder="Motivo"
              value={motivo}
              onChange={(e) =>
                setMotivo(e.target.value)
              }
            />

            <div className="modal-buttons">

              <button
                onClick={guardarCita}
              >
                Guardar
              </button>

              <button
                onClick={() =>
                  setMostrarModal(false)
                }
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

export default Citas;