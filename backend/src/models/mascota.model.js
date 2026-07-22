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
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      nombre || null,
      especie || null,
      raza || null,
      fecha_nacimiento || null,
      sexo || null,
      peso ? parseFloat(peso) : null,
      id_cliente ? parseInt(id_cliente) : null,
    ]
  );

  return resultado.rows[0];
};

// 🆕 Actualizar mascota corregido
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

  // Nos aseguramos de parsear correctamente los IDs y valores numéricos
  const idMascota = parseInt(id);
  const clienteIdParsed = id_cliente ? parseInt(id_cliente) : null;
  const pesoParsed = peso ? parseFloat(peso) : null;

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
    [
      nombre || null,
      especie || null,
      raza || null,
      fecha_nacimiento || null,
      sexo || null,
      pesoParsed,
      clienteIdParsed,
      idMascota
    ]
  );

  return resultado.rows[0];
};

const eliminarMascota = async (id) => {
  // 1. Primero borramos las citas asociadas a esta mascota
  await pool.query('DELETE FROM citas WHERE id_mascota = $1', [id]);
  
  // 2. Luego eliminamos la mascota
  const result = await pool.query('DELETE FROM mascotas WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  obtenerMascotas,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
};