import "../../css/publicidad.css";

function Publicidad() {
  return (
    <div>

      <div className="publicidad-header">
        <h1>📢 Publicidad</h1>

        <button className="btn-nueva-campania">
          + Nueva Campaña
        </button>
      </div>

      <div className="publicidad-stats">

        <div className="stat-card">
          <h4>Campañas Activas</h4>
          <p>4</p>
        </div>

        <div className="stat-card">
          <h4>Promociones</h4>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h4>Alcance</h4>
          <p>2,540</p>
        </div>

      </div>

      <div className="panel">

        <h3>Campañas Activas</h3>

        <table className="tabla">

          <thead>
            <tr>
              <th>Campaña</th>
              <th>Fecha Inicio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Vacunación de Invierno</td>
              <td>01/07/2025</td>

              <td>
                <span className="estado activa">
                  Activa
                </span>
              </td>

              <td>
                <button className="btn-ver">
                  Ver
                </button>
              </td>
            </tr>

            <tr>
              <td>Promo Baño y Corte</td>
              <td>05/07/2025</td>

              <td>
                <span className="estado activa">
                  Activa
                </span>
              </td>

              <td>
                <button className="btn-ver">
                  Ver
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Publicidad;