const pool = require("../config/db");

const registrarMovimiento = async ({ id_producto, tipo, cantidad, motivo, id_usuario }) => {

    const resultado = await pool.query(
        `
        INSERT INTO movimientos_inventario
        (id_producto, tipo, cantidad, motivo, id_usuario)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [id_producto, tipo, cantidad, motivo, id_usuario]
    );

    return resultado.rows[0];

};

const obtenerMovimientosPorProducto = async (id_producto) => {

    const resultado = await pool.query(
        `
        SELECT
            m.id,
            m.tipo,
            m.cantidad,
            m.motivo,
            m.fecha,
            u.nombre AS usuario
        FROM movimientos_inventario m
        LEFT JOIN usuarios u ON m.id_usuario = u.id
        WHERE m.id_producto = $1
        ORDER BY m.fecha DESC
        `,
        [id_producto]
    );

    return resultado.rows;

};

const obtenerHistorial = async () => {

    const resultado = await pool.query(
        `
        SELECT
            m.id,
            m.tipo,
            m.cantidad,
            m.motivo,
            m.fecha,
            p.id AS id_producto,
            p.nombre AS producto,
            p.codigo AS producto_codigo,
            u.nombre AS usuario
        FROM movimientos_inventario m
        LEFT JOIN productos p ON m.id_producto = p.id
        LEFT JOIN usuarios u ON m.id_usuario = u.id
        ORDER BY m.fecha DESC
        LIMIT 300
        `
    );

    return resultado.rows;

};

module.exports = {
    registrarMovimiento,
    obtenerMovimientosPorProducto,
    obtenerHistorial
};