const pool = require("../config/db");

const obtenerCategorias = async () => {

    const resultado = await pool.query(`
        SELECT *
        FROM categorias_producto
        ORDER BY nombre
    `);

    return resultado.rows;

};

const crearCategoria = async (nombre) => {

    const resultado = await pool.query(
        `INSERT INTO categorias_producto (nombre) VALUES ($1) RETURNING *`,
        [nombre]
    );

    return resultado.rows[0];

};

const actualizarCategoria = async (id, nombre) => {

    const resultado = await pool.query(
        `UPDATE categorias_producto SET nombre = $1 WHERE id = $2 RETURNING *`,
        [nombre, id]
    );

    return resultado.rows[0];

};

const eliminarCategoria = async (id) => {

    await pool.query(
        `DELETE FROM categorias_producto WHERE id = $1`,
        [id]
    );

};

module.exports = {
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};