const express = require("express");
const router = express.Router();

const {
    listarAlertas
} = require("../controllers/alertas.controller");

const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

router.get(
    "/",
    verificarToken,
    verificarRol("admin", "veterinario", "asistente"),
    listarAlertas
);

module.exports = router;