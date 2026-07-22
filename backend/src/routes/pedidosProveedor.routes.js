const express = require("express");
const router = express.Router();

const {
    listarPedidos,
    registrarPedido,
    cambiarEstadoPedido,
    borrarPedido
} = require("../controllers/pedidosProveedor.controller");

const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

// Solo admin, igual que el módulo de proveedores
router.get("/", verificarToken, verificarRol("admin"), listarPedidos);

router.post("/", verificarToken, verificarRol("admin"), registrarPedido);

router.patch("/:id/estado", verificarToken, verificarRol("admin"), cambiarEstadoPedido);

router.delete("/:id", verificarToken, verificarRol("admin"), borrarPedido);

module.exports = router;