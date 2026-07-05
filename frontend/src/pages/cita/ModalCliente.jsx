function ModalCliente({

    mostrar,
    cerrar,

    nuevoCliente,
    setNuevoCliente,

    guardarCliente

}) {

    if (!mostrar) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Registrar Cliente</h2>

                <input
                    placeholder="Nombre"
                    value={nuevoCliente.nombre}
                    onChange={(e)=>
                        setNuevoCliente({
                            ...nuevoCliente,
                            nombre:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Apellido"
                    value={nuevoCliente.apellido}
                    onChange={(e)=>
                        setNuevoCliente({
                            ...nuevoCliente,
                            apellido:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Teléfono"
                    value={nuevoCliente.telefono}
                    onChange={(e)=>
                        setNuevoCliente({
                            ...nuevoCliente,
                            telefono:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Correo"
                    value={nuevoCliente.email}
                    onChange={(e)=>
                        setNuevoCliente({
                            ...nuevoCliente,
                            email:e.target.value
                        })
                    }
                />

                <input
                    placeholder="Dirección"
                    value={nuevoCliente.direccion}
                    onChange={(e)=>
                        setNuevoCliente({
                            ...nuevoCliente,
                            direccion:e.target.value
                        })
                    }
                />

                <div className="modal-buttons">

                    <button
                        className="btn-guardar"
                        onClick={guardarCliente}
                    >
                        Guardar
                    </button>

                    <button
                        className="btn-cancelar"
                        onClick={cerrar}
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalCliente;