import { Outlet } from "react-router-dom";
import "../../src/css/inventario.css";

function InventarioLayout() {
    return (
        <div className="inventario-content-full">
            <Outlet />
        </div>
    );
}

export default InventarioLayout;