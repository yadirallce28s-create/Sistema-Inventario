const Alerta = require("../models/alerta.model");

// Obtener alertas de stock
const listarAlertas = async (req, res) => {

    try {

        const alertas = await Alerta.obtenerAlertas();

        const resumen = await Alerta.obtenerResumen();

        res.status(200).json({
            status: "success",
            resumen,
            alertas
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener las alertas de stock"
        });

    }

};

module.exports = {
    listarAlertas
};