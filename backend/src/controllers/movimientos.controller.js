const Movimiento = require("../models/movimiento.model");

const listarHistorial = async (req, res) => {
    try {
        const movimientos = await Movimiento.obtenerHistorial();
        res.status(200).json({ status: "success", movimientos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error al obtener el historial de movimientos" });
    }
};

const listarMovimientosPorProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const movimientos = await Movimiento.obtenerMovimientosPorProducto(id);
        res.status(200).json({ status: "success", movimientos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error al obtener los movimientos del producto" });
    }
};

module.exports = {
    listarHistorial,
    listarMovimientosPorProducto
};