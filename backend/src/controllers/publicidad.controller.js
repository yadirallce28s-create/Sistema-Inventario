const publicidadModel = require("../models/publicidad.model");

//=========================================
// OBTENER CAMPAÑAS
//=========================================

const obtenerCampanas = async (req, res) => {

    try {

        const campanas = await publicidadModel.obtenerCampanas();

        res.json({

            status: "success",

            campanas

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

//=========================================
// OBTENER CAMPAÑA POR ID
//=========================================

const obtenerCampanaPorId = async (req, res) => {

    try {

        const campana = await publicidadModel.obtenerCampanaPorId(req.params.id);

        res.json({

            status: "success",

            campana

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

//=========================================
// CREAR CAMPAÑA
//=========================================

const crearCampana = async (req, res) => {

    try {

        const campana = await publicidadModel.crearCampana(req.body);

        res.status(201).json({

            status: "success",

            message: "Campaña registrada correctamente",

            campana

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

//=========================================
// ACTUALIZAR CAMPAÑA
//=========================================

const actualizarCampana = async (req, res) => {

    try {

        const campana = await publicidadModel.actualizarCampana(

            req.params.id,
            req.body

        );

        res.json({

            status: "success",

            message: "Campaña actualizada correctamente",

            campana

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

//=========================================
// ELIMINAR CAMPAÑA
//=========================================

const eliminarCampana = async (req, res) => {

    try {

        await publicidadModel.eliminarCampana(req.params.id);

        res.json({

            status: "success",

            message: "Campaña eliminada correctamente"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

module.exports = {

    obtenerCampanas,
    obtenerCampanaPorId,
    crearCampana,
    actualizarCampana,
    eliminarCampana

};