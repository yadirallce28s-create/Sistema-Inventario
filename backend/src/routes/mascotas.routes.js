const express = require("express");

const router = express.Router();

const {
  listarMascotas,
  registrarMascota,
} = require("../controllers/mascotas.controller");

router.get("/", listarMascotas);

router.post("/", registrarMascota);

module.exports = router;