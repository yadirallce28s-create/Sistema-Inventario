const pool = require("../config/db");

const obtenerRegistros = async () => {

    const resultado = await pool.query(`
        SELECT
            rm.id,
            rm.fecha,
            rm.diagnostico,
            rm.tratamiento,
            rm.observaciones,

            m.id AS id_mascota,
            m.nombre AS mascota,

            c.id AS id_cita,
            c.fecha AS fecha_cita

        FROM registros_medicos rm

        INNER JOIN mascotas m
            ON rm.id_mascota = m.id

        LEFT JOIN citas c
            ON rm.id_cita = c.id

        ORDER BY rm.fecha DESC
    `);

    return resultado.rows;
};

const crearRegistro = async (datos) => {

    const {
        id_mascota,
        id_cita,
        diagnostico,
        tratamiento,
        observaciones
    } = datos;

    const resultado = await pool.query(
        `
        INSERT INTO registros_medicos
        (
            id_mascota,
            id_cita,
            diagnostico,
            tratamiento,
            observaciones
        )

        VALUES($1,$2,$3,$4,$5)

        RETURNING *
        `,
        [
            id_mascota,
            id_cita || null,
            diagnostico,
            tratamiento,
            observaciones
        ]
    );

    return resultado.rows[0];
};

const actualizarRegistro = async (id, datos) => {

    const {
        diagnostico,
        tratamiento,
        observaciones
    } = datos;

    const resultado = await pool.query(
        `
        UPDATE registros_medicos
        SET
            diagnostico=$1,
            tratamiento=$2,
            observaciones=$3
        WHERE id=$4
        RETURNING *
        `,
        [
            diagnostico,
            tratamiento,
            observaciones,
            id
        ]
    );

    return resultado.rows[0];
};

const eliminarRegistro = async (id) => {

    await pool.query(
        `
        DELETE FROM registros_medicos
        WHERE id=$1
        `,
        [id]
    );

    return true;
};

module.exports = {

    obtenerRegistros,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro

};