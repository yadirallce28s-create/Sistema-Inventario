const Proveedor = require("../models/proveedor.model");

// Listar
const listarProveedores = async (req, res) => {

    try {

        const proveedores =
            await Proveedor.obtenerProveedores();

        res.json({

            status: "success",
            proveedores

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            status: "error",
            message: "Error al obtener proveedores"

        });

    }

};

// Registrar
const registrarProveedor = async (req, res) => {

    try {

        const proveedor =
            await Proveedor.crearProveedor(req.body);

        res.status(201).json({

            status: "success",
            proveedor

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            status: "error",
            message: "Error al registrar proveedor"

        });

    }

};

// Editar
const editarProveedor = async (req, res) => {

    try {

        const proveedor =
            await Proveedor.actualizarProveedor(
                req.params.id,
                req.body
            );

        res.json({

            status: "success",
            proveedor

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            status: "error",
            message: "Error al actualizar"

        });

    }

};

// Eliminar
const borrarProveedor = async (req, res) => {

    try {

        await Proveedor.eliminarProveedor(req.params.id);

        res.json({

            status: "success",
            message: "Proveedor eliminado"

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

    listarProveedores,
    registrarProveedor,
    editarProveedor,
    borrarProveedor

};