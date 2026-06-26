const pool = require("../config/db");

// Obtener proveedores
const obtenerProveedores = async () => {

    const resultado = await pool.query(`
        SELECT *
        FROM proveedores
        ORDER BY id DESC
    `);

    return resultado.rows;

};

// Crear proveedor
const crearProveedor = async (datos) => {

    const {
        nombre,
        telefono,
        email,
        direccion,
        contacto
    } = datos;

    const resultado = await pool.query(
        `
        INSERT INTO proveedores
        (
            nombre,
            telefono,
            email,
            direccion,
            contacto
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            nombre,
            telefono,
            email,
            direccion,
            contacto
        ]
    );

    return resultado.rows[0];

};

// Actualizar proveedor
const actualizarProveedor = async (id, datos) => {

    const {
        nombre,
        telefono,
        email,
        direccion,
        contacto
    } = datos;

    const resultado = await pool.query(
        `
        UPDATE proveedores
        SET
            nombre=$1,
            telefono=$2,
            email=$3,
            direccion=$4,
            contacto=$5
        WHERE id=$6
        RETURNING *
        `,
        [
            nombre,
            telefono,
            email,
            direccion,
            contacto,
            id
        ]
    );

    return resultado.rows[0];

};

// Eliminar proveedor
const eliminarProveedor = async (id) => {

    await pool.query(
        `
        DELETE FROM proveedores
        WHERE id=$1
        `,
        [id]
    );

};

module.exports = {

    obtenerProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor

};