const express = require("express");
const router = express.Router();

const {
    listarProveedores,
    registrarProveedor,
    editarProveedor,
    borrarProveedor
} = require("../controllers/proveedores.controller");

const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

// Todo el módulo de proveedores es exclusivo del administrador,
// tal como ya lo tienes reflejado en Sidebar.jsx
router.get("/", verificarToken, verificarRol("admin"), listarProveedores);

router.post("/", verificarToken, verificarRol("admin"), registrarProveedor);

router.put("/:id", verificarToken, verificarRol("admin"), editarProveedor);

router.delete("/:id", verificarToken, verificarRol("admin"), borrarProveedor);

module.exports = router;