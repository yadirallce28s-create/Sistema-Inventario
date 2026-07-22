const express = require("express");
const router = express.Router();

const {
    listarHistorial,
    listarMovimientosPorProducto
} = require("../controllers/movimientos.controller");

const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

router.get(
    "/",
    verificarToken,
    verificarRol("admin", "asistente"),
    listarHistorial
);

router.get(
    "/producto/:id",
    verificarToken,
    verificarRol("admin", "asistente"),
    listarMovimientosPorProducto
);

module.exports = router;