const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; // El backend se ejecutará en este puerto

// CONFIGURACIONES
app.use(cors()); // Permite que el frontend se conecte desde afuera
app.use(express.json());

// LA RUTA DEL LOGIN
app.post('/login', (req, res) => {
    // Capturamos el usuario y contraseña que enviará el frontend
    const { username, password } = req.body;

    // Credenciales temporales para la clase (mientras conectamos la Base de Datos)
    const USER_CORRECTO = "admin";
    const PASS_CORRECTA = "123456";

    if (username === USER_CORRECTO && password === PASS_CORRECTA) {
        return res.json({ 
            status: "success", 
            message: "¡Autenticación exitosa con Node.js!",
            user: username 
        });
    } else {

        return res.status(401).json({ 
            status: "error", 
            message: "Usuario o contraseña incorrectos" 
        });
    }
});

// ENCENDER EL SERVER
app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});