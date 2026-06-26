const express = require("express");

const router = express.Router();

const {

    listarRegistros,
    registrarRegistro,
    editarRegistro,
    eliminarRegistro

} = require("../controllers/registros.controller");

router.get("/", listarRegistros);

router.post("/", registrarRegistro);

router.put("/:id", editarRegistro);

router.delete("/:id", eliminarRegistro);

module.exports = router;