function TablaServicios({ listaServicios, eliminarServicio }) {

    return (

        <table className="tabla tabla-detalle">

            <thead>

                <tr>

                    <th>Servicio</th>

                    <th>Precio</th>

                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>

                {

                    listaServicios.map((servicio) => (

                        <tr key={servicio.id}>

                            <td>

                                {servicio.nombre}

                            </td>

                            <td>

                                S/. {Number(servicio.precio).toFixed(2)}

                            </td>

                            <td>

                                <button
                                    className="btn-eliminar"
                                    onClick={() =>
                                        eliminarServicio(servicio.id)
                                    }
                                >

                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </table>
    );
}

export default TablaServicios;
