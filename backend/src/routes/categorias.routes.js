const express = require("express");
const router = express.Router();

const {
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} = require("../controllers/categorias.controller");

const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

// Consultar: los 3 roles la necesitan para el formulario de productos
router.get(
    "/",
    verificarToken,
    verificarRol("admin", "veterinario", "asistente"),
    listarCategorias
);

// Crear, editar, eliminar: solo admin (gestión de catálogo)
router.post(
    "/",
    verificarToken,
    verificarRol("admin"),
    crearCategoria
);

router.put(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    actualizarCategoria
);

router.delete(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    eliminarCategoria
);

module.exports = router;