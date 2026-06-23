import "../css/dashboard.css";
import "../css/inventario.css";
import { useState } from "react";

function Inventario() {
  const [mostrarModal, setMostrarModal] = useState(false);
  return (
    <div>

      <div className="inventario-header">

        <h1>📦 Inventario</h1>

        <button className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Nuevo Producto
        </button>

      </div>

      <div className="panel">

        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          className="buscador"
        />
        <div className="inventory-stats">

          <div className="stat-card">
            <h4>📦 Productos</h4>
            <p>56</p>
          </div>

          <div className="stat-card">
            <h4>🟡 Stock Bajo</h4>
            <p>4</p>
          </div>

          <div className="stat-card">
            <h4>🔴 Agotados</h4>
            <p>2</p>
          </div>

          <div className="stat-card">
            <h4>📂 Categorías</h4>
            <p>8</p>
          </div>

        </div>

        <table className="tabla">

          <thead>
            <tr>
              <th>Producto</th>
              <th>Existencias</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Vacuna Antirrábica</td>
              <td>50</td>

              <td>
                <span className="estado disponible">
                  Disponible
                </span>
              </td>

              <td>S/ 35</td>

              <td>
                <button className="btn-ver">Ver</button>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>

            <tr>
              <td>Champú Canino</td>
              <td>5</td>

              <td>
                <span className="estado bajo">
                  Bajo Stock
                </span>
              </td>

              <td>S/ 25</td>

              <td>
                <button className="btn-ver">Ver</button>
                <button className="btn-editar">Editar</button>
                <button className="btn-eliminar">Eliminar</button>
              </td>
            </tr>

          </tbody>

        </table>
        <div className="pagination">
          <button>{"<"}</button>

          <button className="active-page">
            1
          </button>

          <button>2</button>
          <button>3</button>

          <button>{">"}</button>
        </div>
        {mostrarModal && (
          <div className="modal-overlay">

            <div className="modal">

              <h2>Nuevo Producto</h2>

              <input
                type="text"
                placeholder="Nombre del producto"
              />

              <input
                type="number"
                placeholder="Stock"
              />

              <input
                type="number"
                placeholder="Precio"
              />

              <div className="modal-buttons">

                <button
                  className="btn-guardar"
                >
                  Guardar
                </button>

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

    </div>
  );
}

export default Inventario;