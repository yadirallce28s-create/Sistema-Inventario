const Venta = require("../models/venta.model");

// ===============================
// Listar ventas
// ===============================

const listarVentas = async (req, res) => {

    try {

        const ventas = await Venta.obtenerVentas();

        res.status(200).json({
            status: "success",
            ventas
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener las ventas"
        });

    }

};

// ===============================
// Registrar venta completa
// ===============================

const registrarVenta = async (req, res) => {

    try {

        const venta = await Venta.crearVenta(req.body);

        res.status(201).json({
            status: "success",
            message: "Venta registrada correctamente.",
            venta
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
    listarVentas,
    registrarVenta
};