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

// REGISTRO - PARA CREAR USUARIOS EN DOKY PETS
app.post('/register', async (req, res) => {
    const { nombre, email, password, rol } = req.body;

    try {
        // 1. Validar si el email ya existe para que no se duplique
        const existeUsuario = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existeUsuario.rows.length > 0) {
            return res.status(400).json({ status: "error", message: "El correo electrónico ya está registrado." });
        }

        // 2. Encriptar la contraseña
        const saltos = 10;
        const contrasenaEncriptada = await bcrypt.hash(password, saltos);

        // 3. Insertar el nuevo usuario en la base de datos
        const queryInsertar = `
            INSERT INTO usuarios (nombre, email, contrasena, rol) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, nombre, email, rol;
        `;
        
        // Si no mandan rol, por defecto el script de la BD le pondrá 'recepcionista'
        const nuevoUsuario = await pool.query(queryInsertar, [
            nombre, 
            email, 
            contrasenaEncriptada, 
            rol || 'recepcionista'
        ]);

        // 4. Responder que el usuario se creo con exito o no
        return res.status(201).json({
            status: "success",
            message: "¡Usuario registrado exitosamente en Doky Pets!",
            user: nuevoUsuario.rows[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Error interno al registrar usuario" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});