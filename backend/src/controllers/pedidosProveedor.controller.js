const PedidoProveedor = require("../models/pedidoProveedor.model");

// Listar
const listarPedidos = async (req, res) => {

    try {

        const pedidos = await PedidoProveedor.obtenerPedidos();

        res.json({
            status: "success",
            pedidos
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener pedidos"
        });

    }

};

// Registrar
const registrarPedido = async (req, res) => {

    try {

        const datos = {
            ...req.body,
            id_usuario: req.usuario.id
        };

        const pedido = await PedidoProveedor.crearPedido(datos);

        res.status(201).json({
            status: "success",
            pedido
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error al registrar pedido"
        });

    }

};

// Cambiar estado (recibido / cancelado)
const cambiarEstadoPedido = async (req, res) => {

    try {

        const { id } = req.params;
        const { estado } = req.body;

        const estadosValidos = ["pendiente", "recibido", "cancelado"];

        if (!estadosValidos.includes(estado)) {

            return res.status(400).json({
                status: "error",
                message: "Estado no válido"
            });

        }

        const pedidoActual = await PedidoProveedor.obtenerPedidoPorId(id);

        if (!pedidoActual) {

            return res.status(404).json({
                status: "error",
                message: "Pedido no encontrado"
            });

        }

        // Si ya estaba recibido, no se vuelve a sumar stock
        if (estado === "recibido" && pedidoActual.estado !== "recibido") {

            await PedidoProveedor.aumentarStockProducto(
                pedidoActual.id_producto,
                pedidoActual.cantidad
            );

            await PedidoProveedor.registrarMovimientoEntrada(
                pedidoActual.id_producto,
                pedidoActual.cantidad,
                req.usuario.id
            );

        }

        const pedido = await PedidoProveedor.actualizarEstadoPedido(id, estado);

        res.json({
            status: "success",
            pedido
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error al actualizar el pedido"
        });

    }

};

// Eliminar
const borrarPedido = async (req, res) => {

    try {

        await PedidoProveedor.eliminarPedido(req.params.id);

        res.json({
            status: "success",
            message: "Pedido eliminado"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error al eliminar"
        });

    }

};

module.exports = {

    listarPedidos,
    registrarPedido,
    cambiarEstadoPedido,
    borrarPedido

};