const pool = require("../config/db");

const obtenerMascotas = async () => {
  const resultado = await pool.query(`
    SELECT
      m.*,
      c.nombre AS cliente_nombre,
      c.apellido AS cliente_apellido
    FROM mascotas m
    INNER JOIN clientes c
      ON m.id_cliente = c.id
    ORDER BY m.id DESC
  `);

  return resultado.rows;
};

const crearMascota = async (datos) => {
  const {
    nombre,
    especie,
    raza,
    fecha_nacimiento,
    sexo,
    peso,
    id_cliente,
  } = datos;

  const resultado = await pool.query(
    `
    INSERT INTO mascotas
    (
      nombre,
      especie,
      raza,
      fecha_nacimiento,
      sexo,
      peso,
      id_cliente
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      nombre,
      especie,
      raza,
      fecha_nacimiento,
      sexo,
      peso,
      id_cliente,
    ]
  );

  return resultado.rows[0];
};

module.exports = {
  obtenerMascotas,
  crearMascota,
};