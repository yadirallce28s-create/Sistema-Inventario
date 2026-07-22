const express = require("express");
const router = express.Router();

const {
    listarProductos,
    listarProductosInactivos,
    obtenerProducto,
    registrarProducto,
    editarProducto,
    eliminarProducto,
    reactivarProducto,
    buscarProducto
} = require("../controllers/productos.controller");

const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

// Consultar: los 3 roles pueden ver el inventario
router.get(
    "/",
    verificarToken,
    verificarRol("admin", "veterinario", "asistente"),
    listarProductos
);
router.get(
    "/inactivos",
    verificarToken,
    verificarRol("admin"),
    listarProductosInactivos
);
router.get(
    "/buscar",
    verificarToken,
    verificarRol("admin", "veterinario", "asistente"),
    buscarProducto
);

router.get(
    "/:id",
    verificarToken,
    verificarRol("admin", "veterinario", "asistente"),
    obtenerProducto
);

// Crear, editar y eliminar productos: SOLO administrador
router.post(
    "/",
    verificarToken,
    verificarRol("admin"),
    registrarProducto
);

router.put(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    editarProducto
);

router.delete(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    eliminarProducto
);
router.patch(
    "/:id/activar",
    verificarToken,
    verificarRol("admin"),
    reactivarProducto
);

module.exports = router;