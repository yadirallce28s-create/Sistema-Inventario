const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Token no proporcionado",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "Token inválido o expirado",
      });
    }

    req.usuario = decoded;
    next();
  });
};

const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        status: "error",
        message: "No autenticado",
      });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        status: "error",
        message: "No tienes permiso para realizar esta acción",
      });
    }

    next();
  };
};

module.exports = {
  verificarToken,
  verificarRol,
};