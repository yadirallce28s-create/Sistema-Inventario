import "../../css/citas.css";

function ModalCita({

    mostrarModal,
    setMostrarModal,

    fecha,
    setFecha,

    motivo,
    setMotivo,

    clientes,

    idCliente,
    idMascota,

    mascotasCliente,

    cargarMascotasCliente,

    setIdMascota,

    guardarCita,

    setMostrarModalCliente,
    setMostrarModalMascota

}) {

    if (!mostrarModal) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Agendar Cita</h2>

                <input
                    type="datetime-local"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />

                {/* CLIENTE */}

                <div className="campo-form">

                    <label>Cliente</label>

                    <div className="fila-select">

                        <select

                            value={idCliente}

                            onChange={(e) =>
                                cargarMascotasCliente(e.target.value)
                            }

                        >

                            <option value="">
                                Seleccione un cliente
                            </option>

                            {

                                clientes.map(cliente => (

                                    <option

                                        key={cliente.id}

                                        value={cliente.id}

                                    >

                                        {cliente.nombre} {cliente.apellido}

                                    </option>

                                ))

                            }

                        </select>

                        <button

                            type="button"

                            className="btn-mini"

                            onClick={() =>
                                setMostrarModalCliente(true)
                            }

                        >

                            + Cliente

                        </button>

                    </div>

                </div>

                {/* MASCOTA */}

                <div className="campo-form">

                    <label>Mascota</label>

                    <div className="fila-select">

                        <select

                            value={idMascota}

                            onChange={(e) =>
                                setIdMascota(e.target.value)
                            }

                        >

                            <option value="">
                                Seleccione una mascota
                            </option>

                            {

                                mascotasCliente.map(mascota => (

                                    <option

                                        key={mascota.id}

                                        value={mascota.id}

                                    >

                                        {mascota.nombre}

                                    </option>

                                ))

                            }

                        </select>

                        <button

                            type="button"

                            className="btn-mini"

                            onClick={() =>
                                setMostrarModalMascota(true)
                            }

                        >

                            + Mascota

                        </button>

                    </div>

                </div>

                <textarea

                    placeholder="Motivo"

                    value={motivo}

                    onChange={(e) =>
                        setMotivo(e.target.value)
                    }

                />

                <div className="modal-buttons">

                    <button
                        onClick={guardarCita}
                    >
                        Guardar
                    </button>

                    <button

                        onClick={() =>
                            setMostrarModal(false)
                        }

                    >

                        Cancelar

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalCita;