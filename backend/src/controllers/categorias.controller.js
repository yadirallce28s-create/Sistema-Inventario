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

module.exports = {
    listarCategorias
};