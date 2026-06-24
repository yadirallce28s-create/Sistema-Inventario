import "../../css/inventario.css";

function Proveedores() {
  return (
    <div>

      <div className="inventario-header">
        <h1>🏢 Directorio de Proveedores</h1>

        <button className="btn-nuevo">
          + Nuevo Proveedor
        </button>
      </div>

      <div className="panel">

        <table className="tabla">

          <thead>
            <tr>
              <th>Empresa</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>VetPlay</td>
              <td>María Ruiz</td>
              <td>992 914 658</td>
              <td>marioruiz@gmail.com</td>

              <td>
                <button className="btn-ver">
                  Contactar
                </button>
              </td>
            </tr>

            <tr>
              <td>StoreVet</td>
              <td>José Pérez</td>
              <td>952 236 251</td>
              <td>jope@gmail.com</td>

              <td>
                <button className="btn-ver">
                  Contactar
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Proveedores;