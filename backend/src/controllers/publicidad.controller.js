const publicidadModel = require("../models/publicidad.model");

//=========================================
// OBTENER CAMPAÑAS
//=========================================
const obtenerCampanas = async (req, res) => {
    try {
        const campanas = await publicidadModel.obtenerCampanas();
        res.json({
            status: "success",
            campanas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

//=========================================
// OBTENER CAMPAÑA POR ID
//=========================================
const obtenerCampanaPorId = async (req, res) => {
    try {
        const campana = await publicidadModel.obtenerCampanaPorId(req.params.id);
        res.json({
            status: "success",
            campana
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

//=========================================
// CREAR CAMPAÑA
//=========================================
const crearCampana = async (req, res) => {
    try {
        const campana = await publicidadModel.crearCampana(req.body);
        res.status(201).json({
            status: "success",
            message: "Campaña registrada correctamente",
            campana
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

//=========================================
// ACTUALIZAR CAMPAÑA
//=========================================
const actualizarCampana = async (req, res) => {
    try {
        const campana = await publicidadModel.actualizarCampana(
            req.params.id,
            req.body
        );
        res.json({
            status: "success",
            message: "Campaña actualizada correctamente",
            campana
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

//=========================================
// ELIMINAR CAMPAÑA
//=========================================
const eliminarCampana = async (req, res) => {
    try {
        await publicidadModel.eliminarCampana(req.params.id);
        res.json({
            status: "success",
            message: "Campaña eliminada correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

//===================================================================
// MODIFICADO: REGISTRAR INTERESADO CON DETALLES EN TABLA PROMOCIONES
//===================================================================
const registrarInteres = async (req, res) => {
    try {
        const { id_campana, descuento_porcentaje, precio_original, precio_descuento, metodo_pago } = req.body;

        // Validamos que los datos obligatorios no vengan vacíos
        if (!id_campana || descuento_porcentaje === undefined || !precio_original || !precio_descuento || !metodo_pago) {
            return res.status(400).json({ 
                status: "error", 
                message: "Faltan datos financieros para registrar la promoción" 
            });
        }

        // Ejecutamos la transacción en el modelo para insertar en promociones y sumar +1
        const nuevaPromocion = await publicidadModel.registrarInteresadoConTransaccion({
            id_campana,
            descuento_porcentaje,
            precio_original,
            precio_descuento,
            metodo_pago
        });

        res.status(201).json({
            status: "success",
            message: "Interés registrado con éxito en promociones y acumulador actualizado",
            data: nuevaPromocion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

//===================================================================
// MODIFICADO: OBTENER CONVERSIÓN DE INTERESADOS DESDE PROMOCIONES
//===================================================================
const obtenerEstadisticasClientes = async (req, res) => {
    try {
        // Ahora obtiene los datos agrupados por mes desde tu tabla 'promociones'
        const datosGrafico = await publicidadModel.obtenerClientesPorMes();
        res.json({
            status: "success",
            data: datosGrafico
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

module.exports = {
    obtenerCampanas,
    obtenerCampanaPorId,
    crearCampana,
    actualizarCampana,
    eliminarCampana,
    registrarInteres,             // Mantiene el mismo nombre de exportación
    obtenerEstadisticasClientes    // Mantiene el mismo nombre de exportación
};