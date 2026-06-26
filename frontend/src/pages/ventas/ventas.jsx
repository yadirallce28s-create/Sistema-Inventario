import "../../css/ventas.css";
import { useEffect, useState } from "react";

function Ventas() {

    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        obtenerVentas();
    }, []);

    const obtenerVentas = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/ventas"
            );

            const data = await response.json();

            setVentas(data.ventas);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div>

            <div className="ventas-header">

                <div>

                    <h1>💰 Ventas</h1>

                    <p className="subtitulo">
                        Registro de ventas de productos y servicios
                    </p>

                </div>

                <button className="btn-nuevo">

                    + Nueva Venta

                </button>

            </div>

            <input
                className="buscador"
                placeholder="🔍 Buscar venta..."
            />

            <div className="panel">

                <table className="tabla">

                    <thead>

                        <tr>

                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Método</th>
                            <th>Estado</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        {ventas.map((venta) => (

                            <tr key={venta.id}>

                                <td>{venta.cliente}</td>

                                <td>
                                    {new Date(
                                        venta.fecha
                                    ).toLocaleDateString()}
                                </td>

                                <td>
                                    S/. {venta.total}
                                </td>

                                <td>
                                    {venta.metodo_pago}
                                </td>

                                <td>

                                    <span className="estado disponible">

                                        {venta.estado}

                                    </span>

                                </td>

                                <td>

                                    <button className="btn-ver">

                                        Ver

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Ventas;