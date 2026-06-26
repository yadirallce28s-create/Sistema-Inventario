import "../../css/inventario.css";
import { useEffect, useState } from "react";

function Alertas() {

    const [alertas, setAlertas] = useState([]);
    const [resumen, setResumen] = useState({});

    useEffect(() => {
        obtenerAlertas();
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
                                        className={`estado ${
                                            producto.estado === "Agotado"
                                                ? "agotado"
                                                : "bajo"
                                        }`}
                                    >

                                        {producto.estado}

                                    </span>

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