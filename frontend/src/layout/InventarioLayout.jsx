import { NavLink, Outlet } from "react-router-dom";
import "../../src/css/inventario.css";
import {
    FaBoxes,
    FaExclamationTriangle,
    FaTruck
} from "react-icons/fa";
function InventarioLayout() {
    return (
        <div className="inventario-layout">

            <aside className="inventario-sidebar">

                <h3>
                    📦 Inventario
                </h3>

                <NavLink
                    to="/inventario/productos"
                    className="inventario-link"
                >
                    <FaBoxes />
                    <span>Inventario de Productos</span>
                </NavLink>

                <NavLink
                    to="/inventario/alertas"
                    className="inventario-link"
                >
                    <FaExclamationTriangle />
                    <span>Alertas de Stock</span>
                </NavLink>

                <NavLink
                    to="/inventario/proveedores"
                    className="inventario-link"
                >
                    <FaTruck />
                    <span>Directorio de Proveedores</span>
                </NavLink>

            </aside>

            <div className="inventario-content">
                <Outlet />
            </div>

        </div>
    );
}

export default InventarioLayout;