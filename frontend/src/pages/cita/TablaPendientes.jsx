function TablaPendientes({

    citasPendientes,

    atenderCita,
    editar,

    abrirEliminar

}) {

    return (

        <table className="tabla">

            <thead>

                <tr>

                    <th>Fecha</th>
                    <th>Mascota</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

                {citasPendientes.map((cita) => (

                    <tr key={cita.id}>

                        <td>{cita.fecha}</td>

                        <td>{cita.mascota}</td>

                        <td>{cita.motivo}</td>

                        <td>{cita.estado}</td>


                        <td>

                            <div className="acciones">

                                <button
                                    className="btn-icono btn-atender"
                                    onClick={() => atenderCita(cita.id)}
                                    title="Atender cita"
                                >
                                    🩺
                                </button>

                                <button
                                    className="btn-icono btn-editar"
                                    onClick={() => editar(cita.id)}
                                >
                                    ✏️
                                </button>

                                <button
                                    className="btn-icono btn-eliminar"
                                    onClick={() => abrirEliminar(cita.id)}
                                    title="Eliminar"
                                >
                                    🗑️
                                </button>

                            </div>

                        </td>

                    </tr>

                ))}
            </tbody>
        </table>
    );
}

export default TablaPendientes;