const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario.model");

// REGISTRO
const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nombre, email y password son obligatorios",
      });
    }

    const existe = await Usuario.findByEmail(email);

    if (existe) {
      return res.status(400).json({
        status: "error",
        message: "El correo ya está registrado",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.createUser(
      nombre,
      email,
      hash,
      rol || "recepcionista"
    );

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error interno en register",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y password son obligatorios",
      });
    }

    const usuario = await Usuario.findByEmail(email);

    if (!usuario) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    const valid = await bcrypt.compare(password, usuario.contrasena);

    if (!valid) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    res.json({
      status: "success",
      message: "Login exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error interno en login",
    });
  }
};

module.exports = {
  login,
  register,
};