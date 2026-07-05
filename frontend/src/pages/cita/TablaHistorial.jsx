function TablaHistorial({ historial }) {

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

                {historial.map((cita) => (

                    <tr key={cita.id}>

                        <td>{cita.fecha}</td>

                        <td>{cita.mascota}</td>

                        <td>{cita.motivo}</td>

                        <td>{cita.estado}</td>

                        <td>-</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default TablaHistorial;