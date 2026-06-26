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
            visualizaciones
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

    const result = await pool.query(sql,[id]);

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
        estado

    } = datos;

    const sql = `

        UPDATE campanas_publicidad

        SET

            titulo=$1,
            descripcion=$2,
            imagen_url=$3,
            fecha_inicio=$4,
            fecha_fin=$5,
            estado=$6

        WHERE id=$7

        RETURNING *

    `;

    const values=[

        titulo,
        descripcion,
        imagen_url,
        fecha_inicio,
        fecha_fin,
        estado,
        id

    ];

    const result=await pool.query(sql,values);

    return result.rows[0];

};

//=====================================
// ELIMINAR
//=====================================

const eliminarCampana = async (id)=>{

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
        id_usuario
    } = datos;

    const sql = `
        INSERT INTO campanas_publicidad(

            titulo,
            descripcion,
            imagen_url,
            fecha_inicio,
            fecha_fin,
            estado,
            id_usuario

        )

        VALUES($1,$2,$3,$4,$5,$6,$7)

        RETURNING *
    `;

    const values = [

        titulo,
        descripcion,
        imagen_url,
        fecha_inicio,
        fecha_fin,
        estado,
        id_usuario

    ];

    const result = await pool.query(sql, values);

    return result.rows[0];

};

module.exports={

    obtenerCampanas,

    obtenerCampanaPorId,

    crearCampana,

    actualizarCampana,

    eliminarCampana

};