const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

// login (público, cualquiera puede intentar iniciar sesión)
router.post("/login", authController.login);

// registro: SOLO un administrador ya logueado puede crear usuarios nuevos.
// Ajusta "admin" si el valor real guardado en tu BD es distinto.
router.post(
  "/register",
  verificarToken,
  verificarRol("admin"),
  authController.register
);

module.exports = router;