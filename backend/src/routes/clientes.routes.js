const express = require("express");
const router = express.Router();

const clientesController = require("../controllers/clientes.controller");

// GET /api/clientes
router.get("/", clientesController.getClientes);

// POST /api/clientes
router.post("/", clientesController.createCliente);

module.exports = router;