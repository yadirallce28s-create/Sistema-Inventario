const express = require("express");

const router = express.Router();

const {
    listarCategorias
} = require("../controllers/categorias.controller");

router.get("/", listarCategorias);

module.exports = router;