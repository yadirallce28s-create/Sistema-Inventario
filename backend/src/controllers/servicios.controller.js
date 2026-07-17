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
const editarServicio = async (req, res) => {

    console.log(req.params.id);
    console.log(req.body);

    try {

        const servicio = await Servicio.actualizarServicio(
            req.params.id,
            req.body
        );

        res.json({
            status: "success",
            servicio
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: "error"
        });

    }

};

module.exports = {
  listarServicios,
  registrarServicio,
  editarServicio
};