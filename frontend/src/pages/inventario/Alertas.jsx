import "../../css/inventario.css";
import { useEffect, useState } from "react";

function Alertas() {

    const [alertas, setAlertas] = useState([]);
    const [resumen, setResumen] = useState({});

    useEffect(() => {

        obtenerAlertas();

        const intervalo = setInterval(() => {

            obtenerAlertas();

        }, 5000);

        return () => clearInterval(intervalo);

    }, []);

    const obtenerAlertas = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/alertas"
            );
            const data = await response.json();
            setAlertas(data.alertas);
            setResumen(data.resumen);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>🚨 Alertas de Stock</h1>
            {
                resumen.total_alertas > 0 && (
                    <div className="mensaje-alerta">
                        ⚠ Hay {resumen.total_alertas} productos que requieren atención.
                    </div>
                )
            }

            <div className="mensaje-ok">

                ✅ No existen productos con bajo stock.

            </div>

            

            <div className="inventory-stats">

                <div className="stat-card">

                    <h4>📦 Productos</h4>

                    <p>{resumen.total_productos || 0}</p>

                </div>

                <div className="stat-card">

                    <h4>🚨 Alertas</h4>

                    <p>{resumen.total_alertas || 0}</p>

                </div>

                <div className="stat-card">

                    <h4>🟡 Bajo Stock</h4>

                    <p>{resumen.bajo_stock || 0}</p>

                </div>

                <div className="stat-card">

                    <h4>🔴 Agotados</h4>

                    <p>{resumen.agotados || 0}</p>

                </div>

            </div>

            <div className="panel">

                <table className="tabla">

                    <thead>

                        <tr>

                            <th>Código</th>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Stock mínimo</th>
                            <th>Estado</th>
                            <th>Vencimiento</th>

                        </tr>

                    </thead>

                    <tbody>

                        {alertas.map((producto) => (

                            <tr key={producto.id}>

                                <td>{producto.codigo}</td>

                                <td>{producto.nombre}</td>

                                <td>{producto.categoria}</td>

                                <td>{producto.stock}</td>

                                <td>{producto.stock_minimo}</td>

                                <td>

                                    <span
                                        className={`estado ${producto.estado_stock === "Agotado"
                                                ? "agotado"
                                                : "bajo"
                                            }`}
                                    >
                                        {producto.estado_stock}
                                    </span>

                                </td>

                                <td>

                                    {
                                        producto.estado_vencimiento === "Vencido" ?

                                            <span className="estado agotado">
                                                Vencido
                                            </span>

                                            :

                                            producto.estado_vencimiento === "Próximo a vencer" ?

                                                <span className="estado bajo">
                                                    Próximo a vencer
                                                </span>

                                                :

                                                <span>-</span>

                                    }

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Alertas;