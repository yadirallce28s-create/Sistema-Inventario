const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// CONFIGURACIONES
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE LA CONEXIÓN A POSTGRESQL (DOKY PETS)
const pool = new Pool({
    user: 'postgres',          
    host: 'localhost',         
    database: 'doky_pets_db',  // Aquí pondremos el nombre final de la BD
    password: 'tu_contraseña', 
    port: 5432,                
});

// Mensaje de bienvenida en la raíz 
app.get('/', (req, res) => {
    res.send("¡API Backend de Doky Pets en Node.js corriendo perfectamente!");
});

// LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1';
        const resultado = await pool.query(query, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ status: "error", message: "Correo o contraseña incorrectos" });
        }

        const usuarioEncontrado = resultado.rows[0];
        const passwordCorrecto = await bcrypt.compare(password, usuarioEncontrado.contrasena);

        if (passwordCorrecto) {
            return res.json({ 
                status: "success", 
                message: "¡Autenticación exitosa en Doky Pets!",
                user: {
                    nombre: usuarioEncontrado.nombre,
                    email: usuarioEncontrado.email,
                    rol: usuarioEncontrado.rol 
                }
            });
        } else {
            return res.status(401).json({ status: "error", message: "Correo o contraseña incorrectos" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});