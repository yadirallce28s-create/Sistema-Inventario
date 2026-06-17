-- Base de datos Doky Pets
-- Tabla de usuarios (para el login/registro)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'veterinario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
);

-- Tabla de mascotas
CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50),
    raza VARCHAR(50),
    edad INT,
    id_cliente INT REFERENCES clientes(id)
);

-- Tabla de citas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    motivo TEXT,
    id_mascota INT REFERENCES mascotas(id),
    id_veterinario INT REFERENCES usuarios(id)
);