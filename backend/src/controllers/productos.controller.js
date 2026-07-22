const Producto = require("../models/producto.model");

const listarProductos = async (req, res) => {

    try {

        const productos = await Producto.obtenerProductos();

        res.status(200).json({
            status: "success",
            productos
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener los productos"
        });

    }

};

const obtenerProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const producto = await Producto.obtenerProducto(id);

        if (!producto) {

            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });

        }

        res.status(200).json({
            status: "success",
            producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener el producto"
        });

    }

};

const registrarProducto = async (req, res) => {

    try {

        const { precio_venta, precio_compra, stock } = req.body;

        // Validación server-side: no confiar solo en el frontend
        if (Number(precio_venta) <= 0) {
            return res.status(400).json({
                status: "error",
                message: "El precio de venta debe ser mayor que cero"
            });
        }

        if (stock !== undefined && Number(stock) < 0) {
            return res.status(400).json({
                status: "error",
                message: "El stock no puede ser negativo"
            });
        }

        const producto = await Producto.crearProducto(req.body);

        res.status(201).json({
            status: "success",
            message: "Producto registrado correctamente",
            producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al registrar el producto"
        });

    }

};

const editarProducto = async (req, res) => {

    try {

        const { id } = req.params;
        const { precio_venta, stock } = req.body;

        if (precio_venta !== undefined && Number(precio_venta) <= 0) {
            return res.status(400).json({
                status: "error",
                message: "El precio de venta debe ser mayor que cero"
            });
        }

        if (stock !== undefined && Number(stock) < 0) {
            return res.status(400).json({
                status: "error",
                message: "El stock no puede ser negativo"
            });
        }

        const producto = await Producto.actualizarProducto(id, req.body);

        res.status(200).json({
            status: "success",
            message: "Producto actualizado correctamente",
            producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al actualizar el producto"
        });

    }

};
const listarProductosInactivos = async (req, res) => {

    try {

        const productos = await Producto.obtenerProductosInactivos();

        res.status(200).json({
            status: "success",
            productos
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener los productos desactivados"
        });

    }

};

const reactivarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const producto = await Producto.activarProducto(id);

        if (!producto) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Producto reactivado correctamente",
            producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al reactivar el producto"
        });

    }

};

// Baja lógica: ya no borra la fila, solo la marca como inactiva
const eliminarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        const producto = await Producto.desactivarProducto(id);

        if (!producto) {
            return res.status(404).json({
                status: "error",
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Producto desactivado correctamente",
            producto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al desactivar el producto"
        });

    }

};

const buscarProducto = async (req, res) => {

    try {

        const { texto } = req.query;

        const productos = await Producto.buscarProducto(texto);

        res.status(200).json({
            status: "success",
            productos
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al buscar productos"
        });

    }

};

module.exports = {

    listarProductos,
    listarProductosInactivos,
    obtenerProducto,
    registrarProducto,
    editarProducto,
    eliminarProducto,
    reactivarProducto,
    buscarProducto

};