function ModalMascota({

    mostrar,
    cerrar,

    nuevaMascota,
    setNuevaMascota,

    guardarMascota

}) {

    if (!mostrar) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Registrar Nueva Mascota</h2>

                <input
                    placeholder="Nombre"
                    value={nuevaMascota.nombre}
                    onChange={(e) =>
                        setNuevaMascota({
                            ...nuevaMascota,
                            nombre: e.target.value
                        })
                    }
                />

                <select
                    value={nuevaMascota.especie}
                    onChange={(e) =>
                        setNuevaMascota({
                            ...nuevaMascota,
                            especie: e.target.value
                        })
                    }
                >
                    <option value="">Especie</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Conejo">Conejo</option>
                </select>

                <input
                    placeholder="Raza"
                    value={nuevaMascota.raza}
                    onChange={(e) =>
                        setNuevaMascota({
                            ...nuevaMascota,
                            raza: e.target.value
                        })
                    }
                />

                <input
                    type="date"
                    value={nuevaMascota.fecha_nacimiento}
                    onChange={(e) =>
                        setNuevaMascota({
                            ...nuevaMascota,
                            fecha_nacimiento: e.target.value
                        })
                    }
                />

                <select
                    value={nuevaMascota.sexo}
                    onChange={(e) =>
                        setNuevaMascota({
                            ...nuevaMascota,
                            sexo: e.target.value
                        })
                    }
                >
                    <option value="">Sexo</option>
                    <option>Macho</option>
                    <option>Hembra</option>
                </select>

                <input
                    type="number"
                    placeholder="Peso"
                    value={nuevaMascota.peso}
                    onChange={(e) =>
                        setNuevaMascota({
                            ...nuevaMascota,
                            peso: e.target.value
                        })
                    }
                />

                <div className="modal-buttons">

                    <button
                        className="btn-cancelar"
                        onClick={cerrar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-guardar"
                        onClick={guardarMascota}
                    >
                        Guardar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalMascota;