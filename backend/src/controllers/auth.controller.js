const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

    // No devolver la contraseña hasheada al frontend
    const { contrasena, ...usuarioSinPassword } = nuevoUsuario;

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: usuarioSinPassword,
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

    const usuario = await Usuario.findByEmail(email);

    if (!usuario) {

      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas"
      });

    }

    const valid = await bcrypt.compare(
      password,
      usuario.contrasena
    );

    if (!valid) {

      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas"
      });

    }

    // Generar el JWT real que espera verificarToken en auth.middleware
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // No devolver el hash de la contraseña al frontend / localStorage
    const { contrasena, ...usuarioSinPassword } = usuario;

    res.json({
      status: "success",
      token,
      user: usuarioSinPassword
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Error interno en login"
    });

  }

};

module.exports = {
  login,
  register,
};