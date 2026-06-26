import "../../css/inventario.css";

function AlertasStock() {
    return (
        <div>
            <h1>🚨 Alertas de Stock</h1>
            <div className="inventory-stats">

                <div className="stat-card">
                    <h4>🚨 Alertas</h4>
                    <p>3</p>
                </div>

                <div className="stat-card">
                    <h4>🟡 Bajo Stock</h4>
                    <p>2</p>
                </div>

                <div className="stat-card">
                    <h4>🔴 Agotados</h4>
                    <p>1</p>
                </div>

            </div>

            <div className="panel">

                <table className="tabla">

                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Stock Actual</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Champú Canino</td>
                            <td>Higiene</td>
                            <td>5</td>
                            <td>
                                <span className="estado bajo">
                                    Bajo Stock
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Vacuna Triple</td>
                            <td>Vacunas</td>
                            <td>2</td>
                            <td>
                                <span className="estado bajo">
                                    Bajo Stock
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Antipulgas Premium</td>
                            <td>Medicamentos</td>
                            <td>0</td>
                            <td>
                                <span className="estado agotado">
                                    Agotado
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default AlertasStock;