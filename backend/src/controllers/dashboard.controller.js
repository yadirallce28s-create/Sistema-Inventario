const pool = require("../config/db");

const getStats = async (req, res) => {
  try {
    const totalClientes = await pool.query("SELECT COUNT(*) FROM clientes");
    const totalMascotas = await pool.query("SELECT COUNT(*) FROM mascotas");
    const totalCitas = await pool.query("SELECT COUNT(*) FROM citas");
    const totalProductos = await pool.query("SELECT COUNT(*) FROM productos");

    res.json({
      status: "success",
      stats: {
        clientes: Number(totalClientes.rows[0].count),
        mascotas: Number(totalMascotas.rows[0].count),
        citas: Number(totalCitas.rows[0].count),
        productos: Number(totalProductos.rows[0].count),
      },
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({
      status: "error",
      message: "Error al obtener estadísticas del dashboard",
    });
  }
};

module.exports = {
  getStats,
};