const pool = require("../config/db");

// Obtener todos los clientes
const getAllClientes = async () => {
  const result = await pool.query(
    "SELECT * FROM clientes ORDER BY id DESC"
  );
  return result.rows;
};

// Crear un cliente
const createCliente = async ({
  nombre,
  apellido,
  telefono,
  email,
  direccion,
}) => {
  const result = await pool.query(
    `INSERT INTO clientes (nombre, apellido, telefono, email, direccion)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre, apellido, telefono, email, direccion]
  );

  return result.rows[0];
};

module.exports = {
  getAllClientes,
  createCliente,
};