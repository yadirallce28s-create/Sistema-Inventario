const pool = require("../config/db");

const obtenerCitas = async () => {
  const resultado = await pool.query(`
    SELECT
      c.id,
      c.fecha,
      c.estado,
      c.motivo,
      m.nombre AS mascota
    FROM citas c
    INNER JOIN mascotas m
      ON c.id_mascota = m.id
    ORDER BY c.fecha DESC
  `);

  return resultado.rows;
};

const crearCita = async (datos) => {
  const {
    fecha,
    estado,
    motivo,
    id_mascota,
  } = datos;

  const resultado = await pool.query(
    `
    INSERT INTO citas
    (
      fecha,
      estado,
      motivo,
      id_mascota
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      fecha,
      estado || "pendiente",
      motivo,
      id_mascota,
    ]
  );

  return resultado.rows[0];
};
const actualizarEstado = async (id, estado) => {

  const resultado = await pool.query(
    `
    UPDATE citas
    SET estado=$1
    WHERE id=$2
    RETURNING *
    `,
    [estado, id]
  );

  return resultado.rows[0];
};

module.exports = {
  obtenerCitas,
  crearCita,
  actualizarEstado,
};