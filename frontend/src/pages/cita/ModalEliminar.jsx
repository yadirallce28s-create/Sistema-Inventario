function ModalEliminar({

    mostrar,

    cerrar,

    eliminar

}) {

    if (!mostrar) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Eliminar cita</h2>

                <p>
                    ¿Está seguro que desea eliminar esta cita?
                </p>

                <div className="modal-buttons">

                    <button
                        className="btn-cancelar"
                        onClick={cerrar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-guardar"
                        onClick={eliminar}
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalEliminar;