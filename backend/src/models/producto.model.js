const pool = require("../config/db");

// ================================
// LISTAR PRODUCTOS
// ================================
const obtenerProductos = async () => {

    const resultado = await pool.query(`
        SELECT
            p.id,
            p.codigo,
            p.nombre,
            p.descripcion,
            p.precio_compra,
            p.precio_venta,
            p.stock,
            p.stock_minimo,
            c.nombre AS categoria,
            pr.nombre AS proveedor,
            p.estado
        FROM productos p
        LEFT JOIN categorias_producto c
            ON p.id_categoria = c.id
        LEFT JOIN proveedores pr
            ON p.id_proveedor = pr.id
        ORDER BY p.id DESC
    `);

    return resultado.rows;
};

// ================================
// OBTENER PRODUCTO POR ID
// ================================
const obtenerProducto = async (id) => {

    const resultado = await pool.query(
        `
        SELECT *
        FROM productos
        WHERE id=$1
        `,
        [id]
    );

    return resultado.rows[0];
};

// ================================
// REGISTRAR PRODUCTO
// ================================
const crearProducto = async (datos) => {

    const {
        codigo,
        nombre,
        descripcion,
        precio_compra,
        precio_venta,
        stock,
        stock_minimo,
        id_categoria,
        id_proveedor
    } = datos;

    const resultado = await pool.query(

        `
        INSERT INTO productos
        (
            codigo,
            nombre,
            descripcion,
            precio_compra,
            precio_venta,
            stock,
            stock_minimo,
            id_categoria,
            id_proveedor
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *
        `,
        [
            codigo,
            nombre,
            descripcion,
            precio_compra,
            precio_venta,
            stock,
            stock_minimo,
            id_categoria,
            id_proveedor
        ]
    );

    return resultado.rows[0];
};

// ================================
// ACTUALIZAR PRODUCTO
// ================================
const actualizarProducto = async (id, datos) => {

    const {
        codigo,
        nombre,
        descripcion,
        precio_compra,
        precio_venta,
        stock,
        stock_minimo,
        id_categoria,
        id_proveedor,
        estado
    } = datos;

    const resultado = await pool.query(

        `
        UPDATE productos
        SET

        codigo=$1,
        nombre=$2,
        descripcion=$3,
        precio_compra=$4,
        precio_venta=$5,
        stock=$6,
        stock_minimo=$7,
        id_categoria=$8,
        id_proveedor=$9,
        estado=$10

        WHERE id=$11

        RETURNING *
        `,
        [
            codigo,
            nombre,
            descripcion,
            precio_compra,
            precio_venta,
            stock,
            stock_minimo,
            id_categoria,
            id_proveedor,
            estado,
            id
        ]
    );

    return resultado.rows[0];
};

// ================================
// ELIMINAR PRODUCTO
// ================================
const eliminarProducto = async (id) => {

    await pool.query(
        `
        DELETE FROM productos
        WHERE id=$1
        `,
        [id]
    );

    return true;
};

// ================================
// BUSCAR PRODUCTO
// ================================
const buscarProducto = async (texto) => {

    const resultado = await pool.query(

        `
        SELECT
            p.id,
            p.codigo,
            p.nombre,
            p.stock,
            p.precio_venta,
            c.nombre AS categoria
        FROM productos p

        LEFT JOIN categorias_producto c
            ON p.id_categoria=c.id

        WHERE

            LOWER(p.nombre)
            LIKE LOWER($1)

            OR

            LOWER(p.codigo)
            LIKE LOWER($1)

        ORDER BY p.nombre
        `,
        [`%${texto}%`]
    );

    return resultado.rows;
};

module.exports = {

    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProducto

};