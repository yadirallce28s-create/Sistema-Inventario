const express = require("express");

const router = express.Router();

const publicidadController = require("../controllers/publicidad.controller");


router.get(
    "/",
    publicidadController.obtenerCampanas
);



router.get(
    "/:id",
    publicidadController.obtenerCampanaPorId
);


router.post(
    "/",
    publicidadController.crearCampana
);

router.put(
    "/:id",
    publicidadController.actualizarCampana
);

router.delete(
    "/:id",
    publicidadController.eliminarCampana
);

module.exports = router;