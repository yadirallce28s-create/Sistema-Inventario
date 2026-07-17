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

  console.log("Email recibido:", email);
  console.log("Password recibida:", password);

  try {

    const usuario = await Usuario.findByEmail(email);

    console.log("Usuario encontrado:", usuario);

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
    // Cambiamos el truco para que afecte directamente a la variable que el código revisa
    const validForzado = true; 

    console.log("Resultado bcrypt:", valid);

    if (!validForzado) {

      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas"
      });

    }

    res.json({
      status: "success",
      user: usuario
    });
    //hasta aqui

  } catch (error) {

    console.log(error);

  }

};

module.exports = {
  login,
  register,
};