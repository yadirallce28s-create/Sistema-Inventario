function Inventario() {
  return (
    <div>
      <h1>Inventario DokyPets</h1>

      <table border="1">
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
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;