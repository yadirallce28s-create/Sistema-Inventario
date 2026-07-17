const express = require("express");
const router = express.Router();
const publicidadController = require("../controllers/publicidad.controller");

router.get(
    "/",
    publicidadController.obtenerCampanas
);

// NUEVO: Ruta para obtener las estadísticas de clientes por mes para los gráficos
// Nota: Se coloca arriba de /:id para que Express no confunda la palabra "clientes-mes" con un ID numérico
router.get(
    "/clientes-mes",
    publicidadController.obtenerEstadisticasClientes
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

// MODIFICADO: Cambiado a POST porque ahora insertamos un registro en la tabla 'promociones'
// El controlador leerá el "id_campana" directamente desde el req.body enviado por React
router.post(
    "/interesado",
    publicidadController.registrarInteres
);

module.exports = router;