const pool = require("../config/db");

//==============================
// LISTAR 
//==============================
const obtenerCampanas = async () => {
    const sql = `
        SELECT
            id,
            titulo,
            descripcion,
            imagen_url,
            fecha_inicio,
            fecha_fin,
            estado,
            visualizaciones,
            plataforma,
            enlace_red_social,
            personas_interesadas
        FROM campanas_publicidad
        ORDER BY id DESC
    `;
    const result = await pool.query(sql);
    return result.rows;
};

//=====================================
// OBTENER POR ID
//=====================================
const obtenerCampanaPorId = async (id) => {
    const sql = `
        SELECT *
        FROM campanas_publicidad
        WHERE id=$1
    `;
    const result = await pool.query(sql, [id]);
    return result.rows[0];
};

//=====================================
// ACTUALIZAR 
//=====================================
const actualizarCampana = async (id, datos) => {
    const {
        titulo,
        descripcion,
        imagen_url,
        fecha_inicio,
        fecha_fin,
        estado,
        plataforma,
        enlace_red_social
    } = datos;

    const sql = `
        UPDATE campanas_publicidad
        SET
            titulo=$1,
            descripcion=$2,
            imagen_url=$3,
            fecha_inicio=$4,
            fecha_fin=$5,
            estado=$6,
            plataforma=$7,
            enlace_red_social=$8
        WHERE id=$9
        RETURNING *
    `;

    const values = [
        titulo,
        descripcion,
        imagen_url,
        fecha_inicio,
        fecha_fin,
        estado,
        plataforma,
        enlace_red_social,
        id
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

//=====================================
// ELIMINAR
//=====================================
const eliminarCampana = async (id) => {
    await pool.query(
        `DELETE FROM campanas_publicidad WHERE id=$1`,
        [id]
    );
};

//==============================
// REGISTRAR 
//==============================
const crearCampana = async (datos) => {
    const {
        titulo,
        descripcion,
        imagen_url,
        fecha_inicio,
        fecha_fin,
        estado,
        id_usuario,
        plataforma,
        enlace_red_social
    } = datos;

    const sql = `
        INSERT INTO campanas_publicidad(
            titulo,
            descripcion,
            imagen_url,
            fecha_inicio,
            fecha_fin,
            estado,
            id_usuario,
            plataforma,
            enlace_red_social
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *
    `;

    const values = [
        titulo,
        descripcion,
        imagen_url,
        fecha_inicio,
        fecha_fin,
        estado || 'Activo',
        id_usuario,
        plataforma,
        enlace_red_social
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

//===================================================================
// NUEVO: REGISTRAR VENTA EN TABLA PROMOCIONES Y SUMAR INTERESADO (+1)
//===================================================================
const registrarInteresadoConTransaccion = async (datos) => {
    const { 
        id_campana, 
        descuento_porcentaje, 
        precio_original, 
        precio_descuento, 
        metodo_pago,
        id_producto = null,  
        id_servicio = null   
    } = datos;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Insertamos el registro de la venta en la tabla "promociones"
        const queryRegistro = `
            INSERT INTO promociones (id_campana, id_producto, id_servicio, descuento_porcentaje, precio_original, precio_descuento, metodo_pago)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const resRegistro = await client.query(queryRegistro, [
            id_campana, 
            id_producto, 
            id_servicio, 
            descuento_porcentaje, 
            precio_original, 
            precio_descuento, 
            metodo_pago
        ]);

        // 2. Incrementamos el contador de interesados en la tabla "campanas_publicidad"
        const queryIncrementar = `
            UPDATE campanas_publicidad
            SET personas_interesadas = personas_interesadas + 1
            WHERE id = $1
        `;
        await client.query(queryIncrementar, [id_campana]);

        await client.query('COMMIT');
        return resRegistro.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

//=========================================================
// NUEVO: OBTENER LOS INTERESADOS POR MES DESDE PROMOCIONES
//=========================================================
const obtenerClientesPorMes = async () => {
    const sql = `
        SELECT 
            TO_CHAR(creado_at, 'YYYY-MM') AS mes, 
            COUNT(id) AS cantidad
        FROM promociones
        GROUP BY mes
        ORDER BY mes ASC
    `;
    const result = await pool.query(sql);
    return result.rows;
};

module.exports = {
    obtenerCampanas,
    obtenerCampanaPorId,
    crearCampana,
    actualizarCampana,
    eliminarCampana,
    registrarInteresadoConTransaccion, // Exportamos la nueva transacción de venta
    obtenerClientesPorMes               // Mantenemos la misma exportación para el gráfico
};