import "../css/clientes.css";

function Clientes() {
return ( <div className="clientes-container">


  <div className="clientes-header">
    <h1>👥 Clientes</h1>

    <button className="btn-nuevo">
      + Nuevo Cliente
    </button>
  </div>

  <input
    type="text"
    placeholder="Buscar cliente..."
    className="buscador"
  />

  <div className="clientes-cards">

    <div className="cliente-card">
      <h3>Total Clientes</h3>
      <p>85</p>
    </div>

    <div className="cliente-card">
      <h3>Nuevos</h3>
      <p>12</p>
    </div>

    <div className="cliente-card">
      <h3>Frecuentes</h3>
      <p>25</p>
    </div>

  </div>

  <div className="tabla-clientes">

    <table>

      <thead>
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Mascotas</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Juan Pérez</td>
          <td>987654321</td>
          <td>juan@gmail.com</td>
          <td>2</td>
        </tr>

        <tr>
          <td>María López</td>
          <td>912345678</td>
          <td>maria@gmail.com</td>
          <td>1</td>
        </tr>

        <tr>
          <td>Carlos Torres</td>
          <td>956789123</td>
          <td>carlos@gmail.com</td>
          <td>3</td>
        </tr>
      </tbody>

    </table>

  </div>

</div>


);
}

export default Clientes;
