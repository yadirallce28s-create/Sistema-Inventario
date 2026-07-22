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

// 🆕 Actualizar mascota
// Usamos COALESCE para que, si algún campo no se envía (ej. fecha_nacimiento,
// que tu frontend aún no maneja), se conserve el valor que ya existía en la BD.
const actualizarMascota = async (id, datos) => {
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
    UPDATE mascotas
    SET
      nombre = COALESCE($1, nombre),
      especie = COALESCE($2, especie),
      raza = COALESCE($3, raza),
      fecha_nacimiento = COALESCE($4, fecha_nacimiento),
      sexo = COALESCE($5, sexo),
      peso = COALESCE($6, peso),
      id_cliente = COALESCE($7, id_cliente)
    WHERE id = $8
    RETURNING *
    `,
    [nombre, especie, raza, fecha_nacimiento, sexo, peso, id_cliente, id]
  );

  return resultado.rows[0];
};

// 🆕 Eliminar mascota
const eliminarMascota = async (id) => {
  const resultado = await pool.query(
    `DELETE FROM mascotas WHERE id = $1 RETURNING *`,
    [id]
  );

  return resultado.rows[0];
};

module.exports = {
  obtenerMascotas,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
};