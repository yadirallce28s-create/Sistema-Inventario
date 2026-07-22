import { useEffect, useState } from "react";
import "../../css/mascotas.css";
import {
    obtenerMascotas,
    crearMascota,
    editarMascota,
    eliminarMascota,
    obtenerClientes,
} from "../../services/mascotasService";

function Mascotas() {
    const [mascotas, setMascotas] = useState([]);

    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [raza, setRaza] = useState("");
    const [sexo, setSexo] = useState("");
    const [peso, setPeso] = useState("");

    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Guarda el id de la mascota que se está editando (null = creando una nueva)
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        cargarMascotas();
        cargarClientes();
    }, []);

    const cargarMascotas = async () => {
        try {
            const data = await obtenerMascotas();
            setMascotas(data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarClientes = async () => {
        try {
            const data = await obtenerClientes();
            setClientes(data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setEspecie("");
        setRaza("");
        setSexo("");
        setPeso("");
        setIdCliente("");
        setIdEditando(null);
    };

    const guardarMascota = async () => {
        try {
            const datosMascota = {
                nombre,
                especie,
                raza,
                sexo,
                peso,
                id_cliente: idCliente,
            };

            if (idEditando) {
                await editarMascota(idEditando, datosMascota);
            } else {
                await crearMascota(datosMascota);
            }

            await cargarMascotas();
            limpiarFormulario();
            setMostrarFormulario(false);
        } catch (error) {
            console.error(error);
        }
    };

    // Abre el modal con los datos cargados correctamente
    const abrirEdicion = (mascota) => {
        setIdEditando(mascota.id);
        setNombre(mascota.nombre || "");
        setEspecie(mascota.especie || "");
        setRaza(mascota.raza || "");
        setSexo(mascota.sexo || "");
        setPeso(mascota.peso || "");

        // Evaluamos dónde viene el id del cliente en el objeto devuelto
        const idClienteEncontrado = 
            mascota.id_cliente || 
            mascota.cliente_id || 
            (mascota.cliente ? mascota.cliente.id : "");
            
        setIdCliente(idClienteEncontrado);
        setMostrarFormulario(true);
    };

    // Borra con confirmación
    const handleEliminar = async (id) => {
        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar esta mascota? Esta acción no se puede deshacer."
        );
        if (!confirmar) return;

        try {
            await eliminarMascota(id);
            await cargarMascotas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mascotas-container">

            <div className="mascotas-header">
                <h1>Mascotas</h1>
                <button
                    className="btn-nueva"
                    onClick={() => {
                        limpiarFormulario();
                        setMostrarFormulario(true);
                    }}
                >
                    Nueva Mascota
                </button>
            </div>

            {mostrarFormulario && (
                <div className="modal-overlay">
                    <div className="modal-mascota">
                        <h2>{idEditando ? "Editar Mascota" : "Nueva Mascota"}</h2>

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Especie"
                            value={especie}
                            onChange={(e) => setEspecie(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Raza"
                            value={raza}
                            onChange={(e) => setRaza(e.target.value)}
                        />

                        <select
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                        >
                            <option value="">Seleccione sexo</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>

                        <input
                            type="number"
                            step="0.01"
                            placeholder="Peso (kg)"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                        />

                        <select
                            value={idCliente}
                            onChange={(e) => setIdCliente(e.target.value)}
                        >
                            <option value="">
                                Seleccione cliente
                            </option>
                            {clientes.map((cliente) => (
                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nombre} {cliente.apellido}
                                </option>
                            ))}
                        </select>

                        <div className="modal-buttons">
                            <button
                                className="btn-guardar"
                                onClick={guardarMascota}
                            >
                                {idEditando ? "Actualizar" : "Guardar"}
                            </button>
                            <button
                                className="btn-cancelar"
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    limpiarFormulario();
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mascotas-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Raza</th>
                            <th>Sexo</th>
                            <th>Peso</th>
                            <th>Cliente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mascotas.length > 0 ? (
                            mascotas.map((mascota) => (
                                <tr key={mascota.id}>
                                    <td>{mascota.nombre}</td>
                                    <td>{mascota.especie}</td>
                                    <td>{mascota.raza}</td>
                                    <td>{mascota.sexo}</td>
                                    <td>{mascota.peso}</td>
                                    <td>
                                        {mascota.cliente_nombre}{" "}{mascota.cliente_apellido}
                                    </td>
                                    <td className="acciones-cell">
                                        <button
                                            className="btn-editar"
                                            title="Editar"
                                            onClick={() => abrirEdicion(mascota)}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-borrar"
                                            title="Borrar"
                                            onClick={() => handleEliminar(mascota.id)}
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">
                                    No hay mascotas registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Mascotas;