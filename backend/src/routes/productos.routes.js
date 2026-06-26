const express = require("express");

const router = express.Router();

const {

    listarProductos,
    obtenerProducto,
    registrarProducto,
    editarProducto,
    eliminarProducto,
    buscarProducto

} = require("../controllers/productos.controller");


router.get("/", listarProductos);

router.get("/buscar", buscarProducto);

router.get("/:id", obtenerProducto);

router.post("/", registrarProducto);


router.put("/:id", editarProducto);


router.delete("/:id", eliminarProducto);


module.exports = router;