const express = require("express");

const router = express.Router();

const {
  listarCitas,
  registrarCita,
  cambiarEstado,
  editarCita,
  eliminarCita
} = require("../controllers/citas.controller");

router.get("/", listarCitas);

router.post("/", registrarCita);

router.put("/:id", cambiarEstado);

router.put("/editar/:id", editarCita);

router.delete("/:id", eliminarCita);



module.exports = router;