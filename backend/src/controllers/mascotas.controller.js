const Mascota = require("../models/mascota.model");

const listarMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.obtenerMascotas();

    res.json({
      status: "success",
      mascotas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al obtener mascotas",
    });
  }
};

const registrarMascota = async (req, res) => {
  try {
    const mascota = await Mascota.crearMascota(req.body);

    res.status(201).json({
      status: "success",
      mascota,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al registrar mascota",
    });
  }
};

module.exports = {
  listarMascotas,
  registrarMascota,
};