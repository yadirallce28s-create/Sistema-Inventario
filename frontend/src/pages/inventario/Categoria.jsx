import "../../css/inventario.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
    obtenerCategorias,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
} from "../../services/inventarioService";

function Categorias() {

    const [categorias, setCategorias] = useState([]);
    const [buscar, setBuscar] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const categoriasFiltradas = categorias.filter((cat) =>
        cat.nombre.toLowerCase().includes(buscar.toLowerCase())
    );

    const guardarCategoria = async () => {

        if (!nombre || nombre.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Campo obligatorio",
                text: "Ingrese el nombre de la categoría."
            });
            return;
        }

        try {

            if (idEditar) {
                await editarCategoria(idEditar, nombre.trim());
            } else {
                await crearCategoria(nombre.trim());
            }

            setNombre("");
            setMostrarModal(false);
            setIdEditar(null);

            await cargarCategorias();

            Swal.fire({
                icon: "success",
                title: idEditar ? "Categoría actualizada" : "Categoría registrada",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);

            const mensaje =
                error?.message === "Ya existe una categoría con ese nombre"
                    ? "Ya existe una categoría con ese nombre."
                    : "Ocurrió un error al guardar la categoría.";

            Swal.fire({
                icon: "error",
                title: "No se pudo guardar",
                text: mensaje
            });

        }

    };

    const editar = (categoria) => {
        setIdEditar(categoria.id);
        setNombre(categoria.nombre);
        setMostrarModal(true);
    };

    const eliminar = async (categoria) => {

        const confirmacion = await Swal.fire({
            icon: "warning",
            title: "¿Eliminar categoría?",
            text: `Se eliminará "${categoria.nombre}". Esta acción no se puede deshacer.`,
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#ff6b6b"
        });

        if (!confirmacion.isConfirmed) return;

        try {

            await eliminarCategoria(categoria.id);
            await cargarCategorias();

            Swal.fire({
                icon: "success",
                title: "Categoría eliminada",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);

            const mensaje =
                error?.message?.includes("productos asociados")
                    ? "No se puede eliminar: hay productos que usan esta categoría."
                    : "Ocurrió un error al eliminar la categoría.";

            Swal.fire({
                icon: "error",
                title: "No se pudo eliminar",
                text: mensaje
            });

        }

    };

    return (
        <div>
            <div className="inventario-header">
                <div>
                    <h1><FontAwesomeIcon icon={faTags} color="#429a85" /> Categorías de Productos</h1>
                    <p className="subtitulo">
                        Gestión del catálogo de categorías
                    </p>
                </div>
                <button
                    className="btn-nuevo"
                    onClick={() => {
                        setIdEditar(null);
                        setNombre("");
                        setMostrarModal(true);
                    }}
                >
                    + Nueva Categoría
                </button>
            </div>

            <input
                className="buscador"
                placeholder="Buscar categoría..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
            />

            <div className="panel">

                <table className="tabla">

                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            categoriasFiltradas.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.nombre}</td>
                                    <td>
                                        <button
                                            className="btn-editar"
                                            onClick={() => editar(categoria)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => eliminar(categoria)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        {
                            categoriasFiltradas.length === 0 &&
                            <tr>
                                <td colSpan="2" style={{ textAlign: "center", color: "#888" }}>
                                    No se encontraron categorías.
                                </td>
                            </tr>
                        }

                    </tbody>

                </table>

                <div className="table-footer">
                    Total: {categoriasFiltradas.length} categoría(s)
                </div>

            </div>

            {
                mostrarModal &&

                <div className="modal-overlay">
                    <div className="modal" style={{ width: "420px" }}>

                        <h2>
                            {idEditar ? "Editar Categoría" : "Nueva Categoría"}
                        </h2>

                        <div className="form-group">
                            <label>Nombre de la Categoría</label>
                            <input
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="modal-buttons">
                            <button
                                className="btn-cancelar"
                                onClick={() => {
                                    setMostrarModal(false);
                                    setIdEditar(null);
                                }}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-guardar"
                                onClick={guardarCategoria}
                            >
                                {idEditar ? "Actualizar" : "Guardar"}
                            </button>
                        </div>

                    </div>
                </div>
            }

        </div>
    );

}

export default Categorias;