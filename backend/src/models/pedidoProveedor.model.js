const pool = require("../config/db");

// Listar pedidos con datos de proveedor y producto
const obtenerPedidos = async () => {

    const resultado = await pool.query(`
        SELECT
            pp.*,
            pr.nombre AS nombre_proveedor,
            prod.nombre AS nombre_producto
        FROM pedidos_proveedor pp
        JOIN proveedores pr ON pr.id = pp.id_proveedor
        JOIN productos prod ON prod.id = pp.id_producto
        ORDER BY pp.id DESC
    `);

    return resultado.rows;

};

// Crear pedido
const crearPedido = async (datos) => {

    const {
        id_proveedor,
        id_producto,
        cantidad,
        fecha_estimada,
        id_usuario
    } = datos;

    const resultado = await pool.query(
        `
        INSERT INTO pedidos_proveedor
        (
            id_proveedor,
            id_producto,
            cantidad,
            fecha_estimada,
            id_usuario
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            id_proveedor,
            id_producto,
            cantidad,
            fecha_estimada || null,
            id_usuario
        ]
    );

    return resultado.rows[0];

};

// Actualizar estado del pedido (pendiente / recibido / cancelado)
const actualizarEstadoPedido = async (id, estado) => {

    const resultado = await pool.query(
        `
        UPDATE pedidos_proveedor
        SET
            estado = $1,
            fecha_entrega = CASE
                WHEN $1 = 'recibido' THEN CURRENT_DATE
                ELSE fecha_entrega
            END
        WHERE id = $2
        RETURNING *
        `,
        [estado, id]
    );

    return resultado.rows[0];

};

// Obtener un pedido puntual (para saber cantidad/producto al recibir)
const obtenerPedidoPorId = async (id) => {

    const resultado = await pool.query(
        `SELECT * FROM pedidos_proveedor WHERE id = $1`,
        [id]
    );

    return resultado.rows[0];

};

// Aumentar stock del producto al recibir el pedido
const aumentarStockProducto = async (id_producto, cantidad) => {

    await pool.query(
        `
        UPDATE productos
        SET stock = stock + $1
        WHERE id = $2
        `,
        [cantidad, id_producto]
    );

};

// Registrar el movimiento de entrada en el historial
const registrarMovimientoEntrada = async (id_producto, cantidad, id_usuario) => {

    await pool.query(
        `
        INSERT INTO movimientos_inventario
        (id_producto, tipo, cantidad, motivo, id_usuario)
        VALUES ($1, 'entrada', $2, 'Pedido a proveedor recibido', $3)
        `,
        [id_producto, cantidad, id_usuario]
    );

};

// Eliminar pedido
const eliminarPedido = async (id) => {

    await pool.query(
        `DELETE FROM pedidos_proveedor WHERE id = $1`,
        [id]
    );

};

module.exports = {

    obtenerPedidos,
    crearPedido,
    actualizarEstadoPedido,
    obtenerPedidoPorId,
    aumentarStockProducto,
    registrarMovimientoEntrada,
    eliminarPedido

};