const Categoria = require("../models/categoria.model");

const listarCategorias = async (req, res) => {

    try {

        const categorias = await Categoria.obtenerCategorias();
        res.json({
            status: "success",
            categorias
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            status: "error",
            message: "Error al obtener categorías"
        });

    }

};

const crearCategoria = async (req, res) => {

    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            status: "error",
            message: "El nombre de la categoría es obligatorio"
        });
    }

    try {

        const categoria = await Categoria.crearCategoria(nombre.trim());

        res.json({
            status: "success",
            categoria
        });

    } catch (error) {

        console.log(error);

        // 23505 = violación de UNIQUE en Postgres
        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                message: "Ya existe una categoría con ese nombre"
            });
        }

        res.status(500).json({
            status: "error",
            message: "Error al crear categoría"
        });

    }

};

const actualizarCategoria = async (req, res) => {

    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({
            status: "error",
            message: "El nombre de la categoría es obligatorio"
        });
    }

    try {

        const categoria = await Categoria.actualizarCategoria(id, nombre.trim());

        if (!categoria) {
            return res.status(404).json({
                status: "error",
                message: "Categoría no encontrada"
            });
        }

        res.json({
            status: "success",
            categoria
        });

    } catch (error) {

        console.log(error);

        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                message: "Ya existe una categoría con ese nombre"
            });
        }

        res.status(500).json({
            status: "error",
            message: "Error al actualizar categoría"
        });

    }

};

const eliminarCategoria = async (req, res) => {

    const { id } = req.params;

    try {

        await Categoria.eliminarCategoria(id);

        res.json({
            status: "success",
            message: "Categoría eliminada correctamente"
        });

    } catch (error) {

        console.log(error);

        // 23503 = violación de FK (hay productos usando esta categoría)
        if (error.code === "23503") {
            return res.status(409).json({
                status: "error",
                message: "No se puede eliminar: hay productos asociados a esta categoría"
            });
        }

        res.status(500).json({
            status: "error",
            message: "Error al eliminar categoría"
        });

    }

};

module.exports = {
    listarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};