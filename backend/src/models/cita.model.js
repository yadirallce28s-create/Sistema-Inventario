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
const eliminarCita = async (id) => {

  const resultado = await pool.query(
    `
    DELETE FROM citas
    WHERE id=$1
    RETURNING *
    `,
    [id]
  );

  return resultado.rows[0];

};
const actualizarCita = async (id, datos) => {

  const {
    fecha,
    motivo,
    id_mascota
  } = datos;

  const resultado = await pool.query(
    `
    UPDATE citas
    SET
      fecha = $1,
      motivo = $2,
      id_mascota = $3
    WHERE id = $4
    RETURNING *
    `,
    [
      fecha,
      motivo,
      id_mascota,
      id
    ]
  );

  return resultado.rows[0];

};

module.exports = {
  obtenerCitas,
  crearCita,
  actualizarEstado,
  actualizarCita,
  eliminarCita,
  
};