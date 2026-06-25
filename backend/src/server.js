const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const clientesRoutes = require("./routes/clientes.routes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);

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