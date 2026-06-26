const express = require("express");
const router = express.Router();

const {
    listarAlertas
} = require("../controllers/alertas.controller");

// Obtener todas las alertas de stock
router.get("/", listarAlertas);

module.exports = router;