const express = require("express");

const router = express.Router();

const {
  listarServicios,
  registrarServicio,
} = require("../controllers/servicios.controller");

router.get("/", listarServicios);

router.post("/", registrarServicio);

router.put("/:id", editarServicio);
module.exports = router;