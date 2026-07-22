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

// 🆕 Editar mascota
const editarMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const mascota = await Mascota.actualizarMascota(id, req.body);

    if (!mascota) {
      return res.status(404).json({
        status: "error",
        message: "Mascota no encontrada",
      });
    }

    res.json({
      status: "success",
      mascota,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al actualizar mascota",
    });
  }
};

// 🆕 Borrar mascota
const borrarMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const mascota = await Mascota.eliminarMascota(id);

    if (!mascota) {
      return res.status(404).json({
        status: "error",
        message: "Mascota no encontrada",
      });
    }

    res.json({
      status: "success",
      message: "Mascota eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error al eliminar mascota",
    });
  }
};

module.exports = {
  listarMascotas,
  registrarMascota,
  editarMascota,
  borrarMascota,
};