const Servicio = require("../models/servicio.model");

const listarServicios = async (req, res) => {
  try {

    const servicios =
      await Servicio.obtenerServicios();

    res.json({
      status: "success",
      servicios,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al obtener servicios",
    });
  }
};

const registrarServicio = async (req, res) => {
  try {

    const servicio =
      await Servicio.crearServicio(req.body);

    res.status(201).json({
      status: "success",
      servicio,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al registrar servicio",
    });
  }
};

module.exports = {
  listarServicios,
  registrarServicio,
};