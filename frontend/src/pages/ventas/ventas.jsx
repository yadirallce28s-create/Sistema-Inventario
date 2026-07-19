import "../../css/ventas.css";
import { useState } from "react";
import { useVentas } from "./useVentas";
import ModalNuevaVenta from "./ModalNuevaVenta";

function Ventas() {

    const {
        ventas,
        clientes,
        productos,
        servicios,
        obtenerVentas
    } = useVentas();

    const [mostrarModal, setMostrarModal] = useState(false);

    return (

        <div>

            <div className="ventas-header">

                <div>

                    <h1>💰 Ventas</h1>

                    <p className="subtitulo">
                        Registro de ventas de productos y servicios
                    </p>

                </div>

                <button
                    className="btn-nuevo"
                    onClick={() => setMostrarModal(true)}
                >
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
                        {
                            ventas.map((venta) => (
                                <tr key={venta.id}>
                                    <td>

                                        {venta.cliente}
                                    </td>

                                    <td>

                                        {

                                            new Date(
                                                venta.fecha
                                            ).toLocaleDateString()

                                        }
                                    </td>

                                    <td>
                                        S/. {Number(venta.total).toFixed(2)}
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
                                        <button
                                            className="btn-ver"
                                        >

                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                mostrarModal && (

                    <ModalNuevaVenta
                        clientes={clientes}
                        productos={productos}
                        servicios={servicios}
                        onVentaRegistrada={obtenerVentas}
                        onCerrar={() => setMostrarModal(false)}
                    />
                )
            }
        </div>
    );
}
export default Ventas;
