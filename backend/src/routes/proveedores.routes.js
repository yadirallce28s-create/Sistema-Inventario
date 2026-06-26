const express = require("express");

const router = express.Router();

const {

    listarProveedores,
    registrarProveedor,
    editarProveedor,
    borrarProveedor

} = require("../controllers/proveedores.controller");

router.get("/", listarProveedores);

router.post("/", registrarProveedor);

router.put("/:id", editarProveedor);

router.delete("/:id", borrarProveedor);

module.exports = router;