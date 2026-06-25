const Cliente = require("../models/cliente.model");

// LISTAR CLIENTES
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.getAllClientes();

    res.json({
      status: "success",
      count: clientes.length,
      clientes,
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      status: "error",
      message: "Error interno al obtener clientes",
    });
  }
};

// REGISTRAR CLIENTE
const createCliente = async (req, res) => {
  const { nombre, apellido, telefono, email, direccion } = req.body;

  try {
    if (!nombre) {
      return res.status(400).json({
        status: "error",
        message: "El nombre del cliente es obligatorio",
      });
    }

    const nuevoCliente = await Cliente.createCliente({
      nombre,
      apellido,
      telefono,
      email,
      direccion,
    });

    res.status(201).json({
      status: "success",
      message: "Cliente registrado correctamente",
      cliente: nuevoCliente,
    });
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    res.status(500).json({
      status: "error",
      message: "Error interno al registrar cliente",
    });
  }
};

module.exports = {
  getClientes,
  createCliente,
};
