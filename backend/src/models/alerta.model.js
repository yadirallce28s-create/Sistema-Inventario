const pool = require("../config/db");

// Obtener productos con stock bajo o agotado
const obtenerAlertas = async () => {

    const resultado = await pool.query(`
        SELECT
            p.id,
            p.codigo,
            p.nombre,
            cp.nombre AS categoria,
            p.stock,
            p.stock_minimo,
            p.fecha_vencimiento,

            CASE
                WHEN p.stock = 0 THEN 'Agotado'
                WHEN p.stock <= p.stock_minimo THEN 'Bajo Stock'
                ELSE 'Disponible'
            END AS estado_stock,

            CASE
                WHEN p.fecha_vencimiento IS NULL THEN ''
                WHEN p.fecha_vencimiento < CURRENT_DATE THEN 'Vencido'
                WHEN p.fecha_vencimiento <= CURRENT_DATE + INTERVAL '30 days'
                    THEN 'Próximo a vencer'
                ELSE ''
            END AS estado_vencimiento

        FROM productos p

        LEFT JOIN categorias_producto cp
            ON p.id_categoria = cp.id

        WHERE
            p.stock <= p.stock_minimo
            OR (
                p.fecha_vencimiento IS NOT NULL
                AND p.fecha_vencimiento <= CURRENT_DATE + INTERVAL '30 days'
            )

        ORDER BY
            p.stock ASC,
            p.fecha_vencimiento ASC
    `);

    return resultado.rows;
};

// Resumen para las tarjetas
const obtenerResumen = async () => {

    const resultado = await pool.query(`
        SELECT

            COUNT(*) AS total_productos,

            COUNT(*) FILTER (
                WHERE stock <= stock_minimo
            ) AS total_alertas,

            COUNT(*) FILTER (
                WHERE stock > 0
                AND stock <= stock_minimo
            ) AS bajo_stock,

            COUNT(*) FILTER (
                WHERE stock = 0
            ) AS agotados

        FROM productos;
    `);

    return resultado.rows[0];
};

module.exports = {
    obtenerAlertas,
    obtenerResumen
};