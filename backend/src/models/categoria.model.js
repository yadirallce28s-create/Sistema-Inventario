const pool = require("../config/db");

const obtenerCategorias = async () => {

    const resultado = await pool.query(`
        SELECT *
        FROM categorias_producto
        ORDER BY nombre
    `);

    return resultado.rows;

};

module.exports = {
    obtenerCategorias
};