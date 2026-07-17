const pool = require("../config/db");
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
            p.fecha_vencimiento,
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
const crearProducto = async (datos) => {
     console.log(datos);
    const {
        nombre,
        descripcion,
        precio_compra,
        precio_venta,
        stock,
        stock_minimo,
        registro_senasa,
        fecha_vencimiento,
        id_categoria,
        id_proveedor
    } = datos;
    console.log(registro_senasa);
    const ultimoCodigo = await pool.query(`
        SELECT codigo
        FROM productos
        ORDER BY id DESC
        LIMIT 1
    `);

    let codigo = "PRO001";

    if (ultimoCodigo.rows.length > 0 && ultimoCodigo.rows[0].codigo) {

        const numero = parseInt(
            ultimoCodigo.rows[0].codigo.substring(3)
        ) + 1;

        codigo = "PRO" + numero.toString().padStart(3, "0");
    }

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
            registro_senasa,
            fecha_vencimiento,
            id_categoria,
            id_proveedor
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
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
            registro_senasa,
            fecha_vencimiento,
            id_categoria,
            id_proveedor
        ]
    );

    return resultado.rows[0];
};

const actualizarProducto = async (id, datos) => {

    const {
        codigo,
        nombre,
        descripcion,
        precio_compra,
        precio_venta,
        stock,
        stock_minimo,
        registro_senasa,
        fecha_vencimiento,
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
        registro_senasa=$8,
        fecha_vencimiento=$9,
        id_categoria=$10,
        id_proveedor=$11,
        estado=$12

        WHERE id=$13

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
            registro_senasa,
            fecha_vencimiento,
            id_categoria,
            id_proveedor,
            estado,
            id
        ]
    );

    return resultado.rows[0];
};


const buscarProducto = async (texto) => {

    const resultado = await pool.query(

        `
        SELECT
            p.id,
            p.codigo,
            p.nombre,
            p.stock,
            p.precio_venta,
            p.fecha_vencimiento,
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
   
    buscarProducto

};