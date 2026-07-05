const Cita = require("../models/cita.model");

const listarCitas = async (req, res) => {
  try {
    const citas = await Cita.obtenerCitas();

    res.json({
      status: "success",
      citas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al obtener citas",
    });
  }
};

const registrarCita = async (req, res) => {
  try {
    const cita = await Cita.crearCita(req.body);

    res.status(201).json({
      status: "success",
      cita,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al registrar cita",
    });
  }
};
const cambiarEstado = async (req, res) => {

  try {

    const { id } = req.params;
    const { estado } = req.body;

    const cita = await Cita.actualizarEstado(id, estado);

    res.json({
      status: "success",
      cita
    });

  } catch (error) {

    console.log("ERROR MASCOTA:");
    console.log(error);

    res.status(500).json({
        status:"error",
        error:error.message
    });

  }
};
const eliminarCita = async (req, res) => {

  try {

    const { id } = req.params;

    const cita = await Cita.eliminarCita(id);

    res.json({
      status: "success",
      cita
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      status: "error",
      message: "Error al eliminar cita"
    });

  }

};
const editarCita = async (req, res) => {

    try {

        const { id } = req.params;

        const cita = await Cita.actualizarCita(id, req.body);

        res.json({

            status: "success",

            cita

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            status: "error",

            message: error.message

        });

    }

};

module.exports = {
  listarCitas,
  registrarCita,
  cambiarEstado,
  editarCita,
  eliminarCita,
  
};