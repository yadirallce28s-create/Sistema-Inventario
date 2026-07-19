const pool = require("../config/db");

// Obtener todas las ventas
const obtenerVentas = async () => {

    const resultado = await pool.query(`
        SELECT
            v.id,
            CONCAT(c.nombre,' ',COALESCE(c.apellido,'')) AS cliente,
            v.fecha,
            v.metodo_pago,
            v.total,
            v.estado
        FROM ventas v
        LEFT JOIN clientes c
            ON v.id_cliente = c.id
        ORDER BY v.fecha DESC
    `);

    return resultado.rows;
};

// Registrar una venta completa
const crearVenta = async (datos) => {

    const cliente = await pool.connect();

    try {

        await cliente.query("BEGIN");

        const {
            id_cliente,
            id_usuario,
            metodo_pago,
            productos,
            servicios
        } = datos;

        let total = 0;

        

        const venta = await cliente.query(
            `
            INSERT INTO ventas
            (
                id_cliente,
                id_usuario,
                metodo_pago,
                total
            )
            VALUES($1,$2,$3,0)
            RETURNING *
            `,
            [
                id_cliente,
                id_usuario,
                metodo_pago
            ]
        );

        const idVenta = venta.rows[0].id;


        if (productos && productos.length > 0) {

            for (const producto of productos) {

                const consulta = await cliente.query(
                    `
                    SELECT precio_venta, stock
                    FROM productos
                    WHERE id=$1
                    `,
                    [producto.id_producto]
                );

                const precio = Number(consulta.rows[0].precio_venta);
                const stock = Number(consulta.rows[0].stock);

                if (stock < producto.cantidad) {
                    throw new Error("Stock insuficiente.");
                }

                const subtotal = precio * producto.cantidad;

                total += subtotal;

                await cliente.query(
                    `
                    INSERT INTO detalle_venta_producto
                    (
                        id_venta,
                        id_producto,
                        cantidad,
                        precio_unitario,
                        subtotal
                    )
                    VALUES($1,$2,$3,$4,$5)
                    `,
                    [
                        idVenta,
                        producto.id_producto,
                        producto.cantidad,
                        precio,
                        subtotal
                    ]
                );

                await cliente.query(
                    `
                    UPDATE productos
                    SET stock = stock - $1
                    WHERE id = $2
                    `,
                    [
                        producto.cantidad,
                        producto.id_producto
                    ]
                );

            }

        }

        
        if (servicios && servicios.length > 0) {

            for (const servicio of servicios) {

                const consulta = await cliente.query(
                    `
                    SELECT precio
                    FROM servicios
                    WHERE id=$1
                    `,
                    [servicio.id_servicio]
                );

                const precio = Number(consulta.rows[0].precio);

                total += precio;

                await cliente.query(
                    `
                    INSERT INTO detalle_venta_servicio
                    (
                        id_venta,
                        id_servicio,
                        precio
                    )
                    VALUES($1,$2,$3)
                    `,
                    [
                        idVenta,
                        servicio.id_servicio,
                        precio
                    ]
                );

            }

        }

 

        await cliente.query(
            `
            UPDATE ventas
            SET total=$1
            WHERE id=$2
            `,
            [
                total,
                idVenta
            ]
        );

        await cliente.query("COMMIT");

        return {
            id: idVenta,
            total
        };

    } catch (error) {

        await cliente.query("ROLLBACK");

        throw error;

    } finally {

        cliente.release();

    }

};

module.exports = {
    obtenerVentas,
    crearVenta
};