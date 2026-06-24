-- Base de datos Doky Pets
-- Tabla de usuarios (para el login/registro)
-- =========================================================
-- MÓDULO 1: USUARIOS Y AUTENTICACIÓN
-- =========================================================
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'recepcionista', -- admin, veterinario, recepcionista
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- MÓDULO 2: CLIENTES Y MASCOTAS
-- =========================================================

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,       -- perro, gato, ave, etc.
    raza VARCHAR(50),
    fecha_nacimiento DATE,
    sexo VARCHAR(10),
    peso DECIMAL(5,2),
    id_cliente INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE
);

-- =========================================================
-- MÓDULO 3: SERVICIOS Y CITAS
-- =========================================================

CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,        -- consulta, vacunación, baño, cirugía
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion_minutos INT DEFAULT 30,
    estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente, completada, cancelada
    motivo TEXT,
    id_mascota INT NOT NULL REFERENCES mascotas(id),
    id_veterinario INT REFERENCES usuarios(id),
    id_servicio INT REFERENCES servicios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historial clínico (registros médicos de cada mascota)
CREATE TABLE registros_medicos (
    id SERIAL PRIMARY KEY,
    id_mascota INT NOT NULL REFERENCES mascotas(id),
    id_cita INT REFERENCES citas(id),
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- MÓDULO 4: INVENTARIO (productos físicos)
-- =========================================================

CREATE TABLE categorias_producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE   -- alimentos, medicinas, accesorios
);

CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
    contacto VARCHAR(100);
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE;
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_compra DECIMAL(10,2),
    precio_venta DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    stock_minimo INT DEFAULT 5,
    id_categoria INT REFERENCES categorias_producto(id),
    id_proveedor INT REFERENCES proveedores(id),
    estado BOOLEAN DEFAULT TRUE
);

-- Registra cada entrada/salida de stock para trazabilidad
CREATE TABLE movimientos_inventario (
    id SERIAL PRIMARY KEY,
    id_producto INT NOT NULL REFERENCES productos(id),
    tipo VARCHAR(10) NOT NULL,           -- entrada, salida
    cantidad INT NOT NULL,
    motivo VARCHAR(100),                 -- compra, venta, ajuste, merma
    id_usuario INT REFERENCES usuarios(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- MÓDULO 5: VENTAS (productos y/o servicios)
-- =========================================================

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    id_cliente INT REFERENCES clientes(id),
    id_usuario INT REFERENCES usuarios(id),  -- quién atendió la venta
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    metodo_pago VARCHAR(20) DEFAULT 'efectivo', -- efectivo, tarjeta, yape, etc.
    estado VARCHAR(20) DEFAULT 'completada'     -- completada, anulada
);

-- Detalle de productos vendidos en cada venta
CREATE TABLE detalle_venta_producto (
    id SERIAL PRIMARY KEY,
    id_venta INT NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES productos(id),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);

-- Detalle de servicios cobrados en cada venta
CREATE TABLE detalle_venta_servicio (
    id SERIAL PRIMARY KEY,
    id_venta INT NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
    id_servicio INT NOT NULL REFERENCES servicios(id),
    precio DECIMAL(10,2) NOT NULL
);

-- =========================================================
-- MÓDULO 6: PUBLICIDAD
-- =========================================================

CREATE TABLE campanas_publicidad (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    estado VARCHAR(20) DEFAULT 'activa', 'vencida', 'programada' -- activa, finalizada, programada
    visualizaciones INT DEFAULT 0, 
    id_usuario INT REFERENCES usuarios(id), -- quién la creó
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Promociones ligadas a productos o servicios específicos (opcional)
CREATE TABLE promociones (
    id SERIAL PRIMARY KEY,
    id_campana INT REFERENCES campanas_publicidad(id) ON DELETE CASCADE,
    id_producto INT REFERENCES productos(id),
    id_servicio INT REFERENCES servicios(id),
    descuento_porcentaje DECIMAL(5,2) DEFAULT 0
);

CREATE TABLE pedidos_proveedor (
    id SERIAL PRIMARY KEY,
    id_proveedor INT NOT NULL REFERENCES proveedores(id),
    id_producto INT NOT NULL REFERENCES productos(id),
    cantidad INT NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente, llegando, entregado, retrasado
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_estimada DATE,
    fecha_entrega DATE,
    id_usuario INT REFERENCES usuarios(id)  -- quién hizo el pedido
);

-- =========================================================
-- ÍNDICES recomendados (mejoran velocidad de búsqueda)
-- =========================================================

CREATE INDEX idx_mascotas_cliente ON mascotas(id_cliente);
CREATE INDEX idx_citas_mascota ON citas(id_mascota);
CREATE INDEX idx_citas_fecha ON citas(fecha);
CREATE INDEX idx_productos_categoria ON productos(id_categoria);
CREATE INDEX idx_ventas_cliente ON ventas(id_cliente);
CREATE INDEX idx_ventas_fecha ON ventas(fecha);