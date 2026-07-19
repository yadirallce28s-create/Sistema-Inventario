const pool = require("../config/db");

const obtenerServicios = async () => {
  const resultado = await pool.query(`
    SELECT *
    FROM servicios
    ORDER BY id DESC
  `);

  return resultado.rows;
};

const crearServicio = async (datos) => {
  const {
    nombre,
    descripcion,
    precio,
    duracion_minutos
  } = datos;

  const resultado = await pool.query(
    `
    INSERT INTO servicios
    (
      nombre,
      descripcion,
      precio,
      duracion_minutos
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      nombre,
      descripcion,
      precio,
      duracion_minutos
    ]
  );

  return resultado.rows[0];
};
const actualizarServicio = async (id, datos) => {

  const {
    nombre,
    descripcion,
    precio,
    duracion_minutos
  } = datos;

  const resultado = await pool.query(
    `
    UPDATE servicios
    SET
      nombre=$1,
      descripcion=$2,
      precio=$3,
      duracion_minutos=$4
    WHERE id=$5
    RETURNING *
    `,
    [
      nombre,
      descripcion,
      precio,
      duracion_minutos,
      id
    ]
  );

  return resultado.rows[0];
};
module.exports = {
  obtenerServicios,
  crearServicio,
  actualizarServicio
};