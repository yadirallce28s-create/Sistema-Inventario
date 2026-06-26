const express = require("express");

const router = express.Router();

const {
    listarVentas,
    registrarVenta
} = require("../controllers/ventas.controller");

router.get("/", listarVentas);

router.post("/", registrarVenta);

module.exports = router;