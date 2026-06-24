import "../../css/citas.css";
import { useState } from "react";

function Citas() {
  const [tabActiva, setTabActiva] = useState("pendientes");

  return (
    <div>

      <div className="citas-header">
        <h1>📅 Citas</h1>

        <button className="btn-nuevo">
          + Agregar Cita
        </button>
      </div>

      <div className="panel">

        <div className="tabs">

          <button
            className={`tab ${tabActiva === "pendientes" ? "active" : ""}`}
            onClick={() => setTabActiva("pendientes")}
          >
            Citas pendientes
          </button>

          <button
            className={`tab ${tabActiva === "historial" ? "active" : ""}`}
            onClick={() => setTabActiva("historial")}
          >
            Historial
          </button>

        </div>

        {tabActiva === "pendientes" && (
          <table className="tabla">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Paciente / Cliente</th>
                <th>Motivo</th>
                <th>Veterinario</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>09:00</td>
                <td>Luna (Golden Retriever)</td>
                <td>Vacunación</td>
                <td>Dr. Juan</td>
                <td>Pendiente</td>
              </tr>

              <tr>
                <td>10:30</td>
                <td>Max (Husky)</td>
                <td>Consulta</td>
                <td>Dra. Ana</td>
                <td>Pendiente</td>
              </tr>

            </tbody>
          </table>
        )}

        {tabActiva === "historial" && (
          <table className="tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Paciente</th>
                <th>Motivo</th>
                <th>Veterinario</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>15/06/2025</td>
                <td>Rocky</td>
                <td>Control</td>
                <td>Dr. Juan</td>
                <td>Atendido</td>
              </tr>

              <tr>
                <td>10/06/2025</td>
                <td>Milo</td>
                <td>Vacunación</td>
                <td>Dra. Ana</td>
                <td>Atendido</td>
              </tr>

            </tbody>
          </table>
        )}

      </div>

    </div>
  );
}

export default Citas;