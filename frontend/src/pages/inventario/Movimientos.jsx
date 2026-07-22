import "../../css/inventario.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { obtenerMovimientos } from "../../services/inventarioService";

function Movimientos() {

    const [movimientos, setMovimientos] = useState([]);
    const [buscar, setBuscar] = useState("");
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarMovimientos();
    }, []);

    const cargarMovimientos = async () => {
        try {
            setCargando(true);
            const data = await obtenerMovimientos();
            setMovimientos(data);
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false);
        }
    };

    const movimientosFiltrados = movimientos.filter((m) => {
        const texto = buscar.toLowerCase();
        return (
            m.producto?.toLowerCase().includes(texto) ||
            m.producto_codigo?.toLowerCase().includes(texto) ||
            m.usuario?.toLowerCase().includes(texto) ||
            m.motivo?.toLowerCase().includes(texto)
        );
    });

    const formatearFecha = (fecha) => {
        if (!fecha) return "-";
        const f = new Date(fecha);
        return f.toLocaleString("es-PE", {
            dateStyle: "short",
            timeStyle: "short"
        });
    };

    return (
        <div>
            <div className="inventario-header">
                <div>
                    <h1>
                        <FontAwesomeIcon icon={faClockRotateLeft} color="#429a85" /> Historial de Movimientos
                    </h1>
                    <p className="subtitulo">
                        Trazabilidad de entradas y salidas de inventario
                    </p>
                </div>
            </div>

            <input
                className="buscador"
                placeholder="Buscar por producto, código, usuario o motivo..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
            />

            <div className="panel">

                <table className="tabla">

                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Producto</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Motivo</th>
                            <th>Usuario</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            movimientosFiltrados.map((m) => (
                                <tr key={m.id}>
                                    <td>{formatearFecha(m.fecha)}</td>
                                    <td>
                                        {m.producto || "Producto eliminado"}
                                        {m.producto_codigo && ` (${m.producto_codigo})`}
                                    </td>
                                    <td>
                                        <span className={`estado ${m.tipo === "entrada" ? "disponible" : "agotado"}`}>
                                            {m.tipo === "entrada" ? "Entrada" : "Salida"}
                                        </span>
                                    </td>
                                    <td>{m.cantidad}</td>
                                    <td>{m.motivo || "-"}</td>
                                    <td>{m.usuario || "-"}</td>
                                </tr>
                            ))
                        }

                        {
                            !cargando && movimientosFiltrados.length === 0 &&
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                                    No se encontraron movimientos.
                                </td>
                            </tr>
                        }

                    </tbody>

                </table>

                <div className="table-footer">
                    Mostrando {movimientosFiltrados.length} movimiento(s) (últimos 300 registros)
                </div>

            </div>

        </div>
    );

}

export default Movimientos;