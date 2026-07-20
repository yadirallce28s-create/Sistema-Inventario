import { useEffect, useState } from "react";
import "../../css/mascotas.css";

function Mascotas() {
    const [mascotas, setMascotas] = useState([]);

    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [raza, setRaza] = useState("");
    // 🛠️ SE AGREGARON ESTOS DOS ESTADOS:
    const [sexo, setSexo] = useState("");
    const [peso, setPeso] = useState("");

    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        obtenerMascotas();
        obtenerClientes();
    }, []);

    const obtenerMascotas = async () => {
        try {
            const response = await fetch(
                "https://sistema-inventario-95aj.onrender.com/api/mascotas"
            );
            const data = await response.json();
            setMascotas(data.mascotas || []);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerClientes = async () => {
        try {
            const response = await fetch(
                "https://sistema-inventario-95aj.onrender.com/api/clientes"
            );
            const data = await response.json();
            setClientes(data.clientes || []);
        } catch (error) {
            console.error(error);
        }
    };

    const guardarMascota = async () => {
        try {
            await fetch(
                "https://sistema-inventario-95aj.onrender.com/api/mascotas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre,
                        especie,
                        raza,
                        sexo, // Ahora sí tiene valor de estado
                        peso, // Ahora sí tiene valor de estado
                        id_cliente: idCliente,
                    }),
                }
            );

            await obtenerMascotas();

            // Limpiamos los estados al guardar con éxito
            setNombre("");
            setEspecie("");
            setRaza("");
            setSexo(""); // 🛠️ Limpiar sexo
            setPeso(""); // 🛠️ Limpiar peso
            setIdCliente("");

            setMostrarFormulario(false);
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
                    onClick={() => setMostrarFormulario(true)}
                >
                    Nueva Mascota
                </button>
            </div>

            {mostrarFormulario && (
                <div className="modal-overlay">
                    <div className="modal-mascota">
                        <h2>Nueva Mascota</h2>

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

                        {/* 🛠️ SE AGREGÓ EL SELECT DE SEXO */}
                        <select
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                        >
                            <option value="">Seleccione sexo</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>

                        {/* 🛠️ SE AGREGÓ EL INPUT DE PESO */}
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
                                Guardar
                            </button>
                            <button
                                className="btn-cancelar"
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    // Limpiamos los estados si cancela
                                    setSexo("");
                                    setPeso("");
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
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">
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