function Inventario() {
  return (
    <div>
      <h1>📦 Inventario</h1>

      <table className="tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Vacuna Antirrábica</td>
            <td>50</td>
            <td>S/ 35</td>
          </tr>

          <tr>
            <td>Alimento Premium</td>
            <td>20</td>
            <td>S/ 80</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;