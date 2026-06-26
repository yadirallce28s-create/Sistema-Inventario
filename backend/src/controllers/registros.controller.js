const Registro = require("../models/registro.model");

const listarRegistros = async (req, res) => {

    try {

        const registros = await Registro.obtenerRegistros();

        res.json({
            status: "success",
            registros
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener registros médicos"
        });

    }

};

const registrarRegistro = async (req, res) => {

    try {

        const registro = await Registro.crearRegistro(req.body);

        res.status(201).json({
            status: "success",
            registro
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al registrar historial médico"
        });

    }

};

const editarRegistro = async (req, res) => {

    try {

        const registro = await Registro.actualizarRegistro(
            req.params.id,
            req.body
        );

        res.json({
            status: "success",
            registro
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error"
        });

    }

};

const eliminarRegistro = async (req, res) => {

    try {

        await Registro.eliminarRegistro(req.params.id);

        res.json({
            status: "success"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error"
        });

    }

};

module.exports = {

    listarRegistros,
    registrarRegistro,
    editarRegistro,
    eliminarRegistro

};