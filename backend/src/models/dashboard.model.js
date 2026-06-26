const pool = require("../config/db");

const obtenerDashboard = async () => {

    // ============================
    // TARJETAS
    // ============================

    const clientes = await pool.query(`
        SELECT COUNT(*) total
        FROM clientes
    `);

    const mascotas = await pool.query(`
        SELECT COUNT(*) total
        FROM mascotas
    `);

    const productos = await pool.query(`
        SELECT COUNT(*) total
        FROM productos
    `);

    const ventas = await pool.query(`
        SELECT COUNT(*) total
        FROM ventas
    `);

    const stockBajo = await pool.query(`
        SELECT COUNT(*) total
        FROM productos
        WHERE stock <= stock_minimo
    `);

    const ingresos = await pool.query(`
        SELECT COALESCE(SUM(total),0) total
        FROM ventas
    `);

    // ============================
    // PRODUCTOS BAJO STOCK
    // ============================

    const productosStock = await pool.query(`
        SELECT
            id,
            nombre,
            stock,
            stock_minimo
        FROM productos
        WHERE stock <= stock_minimo
        ORDER BY stock ASC
        LIMIT 5
    `);

    // ============================
    // ÚLTIMOS CLIENTES
    // ============================

    const ultimosClientes = await pool.query(`
        SELECT
            id,
            nombre,
            apellido,
            telefono
        FROM clientes
        ORDER BY id DESC
        LIMIT 5
    `);

    // ============================
    // ÚLTIMAS VENTAS
    // ============================

    const ultimasVentas = await pool.query(`
        SELECT
            v.id,
            c.nombre || ' ' || c.apellido AS cliente,
            v.total,
            v.fecha
        FROM ventas v
        INNER JOIN clientes c
            ON c.id = v.id_cliente
        ORDER BY v.fecha DESC
        LIMIT 5
    `);

    // ============================
    // PRÓXIMAS CITAS
    // ============================

    const proximasCitas = await pool.query(`
    SELECT
        c.id,
        cl.nombre || ' ' || cl.apellido AS cliente,
        m.nombre AS mascota,
        c.fecha,
        c.estado
         FROM citas c

        INNER JOIN mascotas m
        ON m.id = c.id_mascota

          INNER JOIN clientes cl
        ON cl.id = m.id_cliente

        ORDER BY c.fecha ASC

      LIMIT 5
    `);
    // ============================
    // GRÁFICO VENTAS POR MES
    // ============================

    const graficoVentas = await pool.query(`
    SELECT
        TO_CHAR(fecha, 'Mon') AS mes,
        SUM(total) AS total
    FROM ventas
    GROUP BY TO_CHAR(fecha, 'Mon'), DATE_TRUNC('month', fecha)
    ORDER BY DATE_TRUNC('month', fecha)
`);

    // ============================
    // GRÁFICO PRODUCTOS POR CATEGORÍA
    // ============================

    const graficoCategorias = await pool.query(`
    SELECT
        c.nombre,
        COUNT(p.id) AS cantidad
    FROM categorias_producto c
    LEFT JOIN productos p
        ON p.id_categoria = c.id
    GROUP BY c.nombre
    ORDER BY c.nombre
`);

    const graficoIngresos = await pool.query(`
    SELECT
        TO_CHAR(fecha, 'Mon') AS mes,
        SUM(total) AS ingresos
    FROM ventas
    GROUP BY TO_CHAR(fecha, 'Mon'), DATE_TRUNC('month', fecha)
    ORDER BY DATE_TRUNC('month', fecha)
`);
// ============================
// TOP PRODUCTOS MÁS VENDIDOS
// ============================

const topProductos = await pool.query(`

    SELECT

        p.nombre,

        SUM(dvp.cantidad) AS vendidos

    FROM detalle_venta_producto dvp

    INNER JOIN productos p

        ON p.id = dvp.id_producto

    GROUP BY p.nombre

    ORDER BY vendidos DESC

    LIMIT 5

`);

    return {

        clientes: clientes.rows[0].total,
        mascotas: mascotas.rows[0].total,
        productos: productos.rows[0].total,
        ventas: ventas.rows[0].total,
        stockBajo: stockBajo.rows[0].total,
        ingresos: ingresos.rows[0].total,
        productosStock: productosStock.rows,
        ultimosClientes: ultimosClientes.rows,
        ultimasVentas: ultimasVentas.rows,
        proximasCitas: proximasCitas.rows,
        graficoVentas: graficoVentas.rows,
        graficoCategorias: graficoCategorias.rows,
        graficoIngresos: graficoIngresos.rows,
        topProductos: topProductos.rows

    };

};

module.exports = {

    obtenerDashboard

};