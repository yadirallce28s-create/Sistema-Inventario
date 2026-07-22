const express = require("express");

const router = express.Router();

const {
  listarMascotas,
  registrarMascota,
  editarMascota,
  borrarMascota,
} = require("../controllers/mascotas.controller");

router.get("/", listarMascotas);

router.post("/", registrarMascota);

router.put("/:id", editarMascota);

router.delete("/:id", borrarMascota);

module.exports = router;