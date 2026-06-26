const express = require("express");

const router = express.Router();

const {
  listarCitas,
  registrarCita,
  cambiarEstado,
} = require("../controllers/citas.controller");

router.get("/", listarCitas);

router.post("/", registrarCita);

router.put("/:id", cambiarEstado);

module.exports = router;