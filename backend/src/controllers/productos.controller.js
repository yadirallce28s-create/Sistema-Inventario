const Producto = require("../models/producto.model");

// ========================================
// LISTAR PRODUCTOS
// ========================================
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

// ========================================
// OBTENER PRODUCTO POR ID
// ========================================
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

// ========================================
// REGISTRAR PRODUCTO
// ========================================
const registrarProducto = async (req, res) => {

    try {

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

// ========================================
// ACTUALIZAR PRODUCTO
// ========================================
const editarProducto = async (req, res) => {

    try {

        const { id } = req.params;

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

// ========================================
// ELIMINAR PRODUCTO
// ========================================
const eliminarProducto = async (req, res) => {

    try {

        const { id } = req.params;

        await Producto.eliminarProducto(id);

        res.status(200).json({
            status: "success",
            message: "Producto eliminado correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Error al eliminar el producto"
        });

    }

};

// ========================================
// BUSCAR PRODUCTOS
// ========================================
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
    obtenerProducto,
    registrarProducto,
    editarProducto,
    eliminarProducto,
    buscarProducto

};