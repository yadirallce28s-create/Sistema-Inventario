const pool = require("../config/db");

// buscar usuario por email
const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

// crear usuario
const createUser = async (nombre, email, passwordHash, rol) => {
  const result = await pool.query(
    `INSERT INTO usuarios (nombre, email, contrasena, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, email, rol`,
    [nombre, email, passwordHash, rol]
  );

  return result.rows[0];
};

module.exports = {
  findByEmail,
  createUser,
};