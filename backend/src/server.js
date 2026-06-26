const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const clientesRoutes = require("./routes/clientes.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const mascotasRoutes = require("./routes/mascotas.routes");
const citasRoutes = require("./routes/citas.routes");
const serviciosRoutes = require("./routes/servicios.routes");
const registrosRoutes = require("./routes/registros.routes");
const productosRoutes = require("./routes/productos.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const proveedoresRoutes = require("./routes/proveedores.routes");
const alertasRoutes = require("./routes/alertas.routes");
const ventasRoutes = require("./routes/ventas.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/registros", registrosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/alertas", alertasRoutes);
app.use("/api/ventas", ventasRoutes);

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API Doky Pets funcionando 🚀");
});

// probar conexión con PostgreSQL
pool.connect()
  .then(() => {
    console.log("Conectado a PostgreSQL correctamente");
  })
  .catch((err) => {
    console.error("Error conectando a PostgreSQL:", err.message);
  });

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});