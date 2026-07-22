import "../../css/inventario.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { apiFetch } from "../../services/httpClient";
import {
    obtenerProductos,
    obtenerProductosInactivos,
    crearProducto,
    buscarProductos,
    obtenerCategorias,
    obtenerProveedores,
    editarProducto,
    eliminarProducto,
    reactivarProducto
} from "../../services/inventarioService";

function Productos() {

    const [tabActiva, setTabActiva] = useState("activos");

    const [productos, setProductos] = useState([]);
    const [productosInactivos, setProductosInactivos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [buscar, setBuscar] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioCompra, setPrecioCompra] = useState("");
    const [precioVenta, setPrecioVenta] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [registroSenasa, setRegistroSenasa] = useState("");

    useEffect(() => {
        cargarProductos();
        cargarProductosInactivos();
        cargarCategorias();
        cargarProveedores();
    }, []);

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (error) {
            console.log(error);
        }
    };

    const cargarProductosInactivos = async () => {
        try {
            const data = await obtenerProductosInactivos();
            setProductosInactivos(data);
        } catch (error) {
            console.log(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const crearCategoriaRapida = async () => {
        const { value: nombreNueva } = await Swal.fire({
            title: "Nueva Categoría",
            input: "text",
            inputLabel: "Nombre de la categoría",
            inputPlaceholder: "Ej. Juguetes",
            showCancelButton: true,
            confirmButtonText: "Crear",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                if (!value || !value.trim()) {
                    return "Escribe un nombre para la categoría";
                }
            },
        });

        if (!nombreNueva) return;

        try {
            const respuesta = await apiFetch("/categorias", {
                method: "POST",
                body: JSON.stringify({ nombre: nombreNueva.trim() }),
            });

            if (respuesta.status === "success") {
                await cargarCategorias();
                setCategoria(respuesta.categoria.id);

                Swal.fire({
                    icon: "success",
                    title: "Categoría creada",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire("Error", respuesta.message || "No se pudo crear la categoría", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo crear la categoría", "error");
        }
    };

    const crearProveedorRapido = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Nuevo Proveedor",
            html:
                '<input id="swal-empresa" class="swal2-input" placeholder="Empresa">' +
                '<input id="swal-nombre" class="swal2-input" placeholder="Nombre (persona de contacto)">' +
                '<input id="swal-telefono" class="swal2-input" placeholder="Teléfono">' +
                '<input id="swal-correo" class="swal2-input" placeholder="Correo">' +
                '<input id="swal-direccion" class="swal2-input" placeholder="Dirección">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Crear",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                const empresa = document.getElementById("swal-empresa").value.trim();
                const nombreContacto = document.getElementById("swal-nombre").value.trim();
                const telefono = document.getElementById("swal-telefono").value.trim();
                const correo = document.getElementById("swal-correo").value.trim();
                const direccion = document.getElementById("swal-direccion").value.trim();

                if (!empresa || !nombreContacto || !telefono) {
                    Swal.showValidationMessage("Empresa, Nombre y Teléfono son obligatorios");
                    return false;
                }

                return {
                    nombre: empresa,
                    contacto: nombreContacto,
                    telefono,
                    email: correo,
                    direccion,
                };
            },
        });

        if (!formValues) return;

        try {
            const respuesta = await apiFetch("/proveedores", {
                method: "POST",
                body: JSON.stringify(formValues),
            });

            if (respuesta.status === "success") {
                await cargarProveedores();
                setProveedor(respuesta.proveedor.id);

                Swal.fire({
                    icon: "success",
                    title: "Proveedor creado",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire("Error", respuesta.message || "No se pudo crear el proveedor", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo crear el proveedor", "error");
        }
    };

    const cargarProveedores = async () => {
        try {
            const data = await obtenerProveedores();
            setProveedores(data);
        } catch (error) {
            console.log(error);
        }
    };

    const buscarProducto = async (texto) => {
        try {
            if (texto.trim() === "") {
                cargarProductos();
                return;
            }
            const data = await buscarProductos(texto);
            setProductos(data);
        } catch (error) {
            console.log(error);
        }
    };

    const guardarProducto = async () => {
        if (
            !nombre ||
            !categoria ||
            !proveedor ||
            !precioCompra ||
            !precioVenta ||
            !stock
        ) {

            Swal.fire({
                icon: "warning",
                title: "Campos obligatorios",
                text: "Complete todos los campos obligatorios."
            });

            return;
        }
        try {

            const datosProducto = {
                nombre,
                descripcion,
                precio_compra: precioCompra,
                precio_venta: precioVenta,
                stock,
                stock_minimo: stockMinimo,
                registro_senasa: registroSenasa,
                fecha_vencimiento: fechaVencimiento,
                id_categoria: categoria,
                id_proveedor: proveedor,
            };

            if (idEditar) {
                await editarProducto(idEditar, datosProducto);
            } else {
                await crearProducto(datosProducto);
            }

            setNombre("");
            setDescripcion("");
            setPrecioCompra("");
            setPrecioVenta("");
            setStock("");
            setStockMinimo("");
            setCategoria("");
            setProveedor("");
            setFechaVencimiento("");
            setRegistroSenasa("");

            setMostrarModal(false);
            setIdEditar(null);

            await cargarProductos();

            Swal.fire({
                icon: "success",
                title: idEditar ? "Producto actualizado" : "Producto registrado",
                text: idEditar
                    ? "El producto se actualizó correctamente."
                    : "El producto se registró correctamente.",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);

        }

    };

    const editar = (producto) => {
        setIdEditar(producto.id);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecioCompra(producto.precio_compra);
        setPrecioVenta(producto.precio_venta);
        setStock(producto.stock);
        setStockMinimo(producto.stock_minimo);
        setCategoria(producto.id_categoria);
        setProveedor(producto.id_proveedor);
        setFechaVencimiento(producto.fecha_vencimiento?.substring(0, 10) || "");
        setRegistroSenasa(producto.registro_senasa || "");

        setMostrarModal(true);

    };

    // Antes de desactivar: si tiene stock, advertir (no bloquear) que ese stock queda inmovilizado
    const confirmarEliminar = (producto) => {

        const tieneStock = Number(producto.stock) > 0;

        Swal.fire({
            title: `¿Desactivar "${producto.nombre}"?`,
            html: tieneStock
                ? `Este producto todavía tiene <b>${producto.stock}</b> unidades en stock.<br>
                   Dejará de aparecer en el catálogo y no podrá venderse ni pedirse a proveedores,
                   pero su historial de ventas y movimientos se conserva.`
                : "El producto dejará de aparecer en el inventario, pero su historial se conserva.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, desactivar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminarProducto(producto.id);
                await cargarProductos();
                await cargarProductosInactivos();
                Swal.fire({
                    icon: "success",
                    title: "Producto desactivado",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    const confirmarReactivar = (producto) => {

        Swal.fire({
            title: `¿Reactivar "${producto.nombre}"?`,
            text: "Volverá a aparecer en el catálogo, ventas y pedidos a proveedores.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, reactivar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await reactivarProducto(producto.id);
                await cargarProductos();
                await cargarProductosInactivos();
                Swal.fire({
                    icon: "success",
                    title: "Producto reactivado",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <div>
            <div className="inventario-header">
                <div>
                    <h1><FontAwesomeIcon icon={faCube} color="#429a85" /> Inventario de Productos</h1>
                    <p className="subtitulo">
                        Gestión del inventario veterinario
                    </p>
                </div>

                {tabActiva === "activos" && (
                    <button
                        className="btn-nuevo"
                        onClick={() => {

                            setIdEditar(null);

                            setNombre("");
                            setDescripcion("");
                            setPrecioCompra("");
                            setPrecioVenta("");
                            setStock("");
                            setStockMinimo("");
                            setCategoria("");
                            setProveedor("");
                            setFechaVencimiento("");
                            setRegistroSenasa("");

                            setMostrarModal(true);
                        }}
                    >
                        + Nuevo Producto
                    </button>
                )}
            </div>

            <div className="tabs">

                <button
                    className={`tab ${tabActiva === "activos" ? "active" : ""}`}
                    onClick={() => setTabActiva("activos")}
                >
                    Productos Activos
                </button>

                <button
                    className={`tab ${tabActiva === "inactivos" ? "active" : ""}`}
                    onClick={() => setTabActiva("inactivos")}
                >
                    Productos Desactivados
                </button>

            </div>

            {/* -------- TAB ACTIVOS -------- */}
            {tabActiva === "activos" && (

                <>
                    <input
                        className="buscador"
                        placeholder="Buscar producto..."
                        value={buscar}
                        onChange={(e) => {
                            setBuscar(e.target.value);
                            buscarProducto(e.target.value);
                        }}
                    />

                    <div className="inventory-stats">

                        <div className="stat-card">
                            <h4>Total Productos</h4>
                            <p>{productos.length}</p>
                        </div>

                        <div className="stat-card">
                            <h4>Stock Bajo</h4>
                            <p>
                                {
                                    productos.filter(
                                        p => p.stock <= p.stock_minimo
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="stat-card">
                            <h4>Agotados</h4>
                            <p>
                                {
                                    productos.filter(
                                        p => p.stock === 0
                                    ).length
                                }
                            </p>
                        </div>

                    </div>

                    <div className="panel">

                        <table className="tabla">

                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio Venta</th>
                                    <th>Stock</th>
                                    <th>Stock Mínimo</th>
                                    <th>Vencimiento</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    productos.map((producto) => (

                                        <tr key={producto.id}>

                                            <td>{producto.nombre}</td>

                                            <td>S/. {producto.precio_venta}</td>

                                            <td>{producto.stock}</td>

                                            <td>{producto.stock_minimo}</td>

                                            <td>
                                                {producto.fecha_vencimiento
                                                    ? producto.fecha_vencimiento.substring(0, 10)
                                                    : "-"}
                                            </td>

                                            <td>
                                                {
                                                    producto.stock === 0 ?
                                                        <span className="estado agotado">Agotado</span>
                                                        :
                                                        producto.stock <= producto.stock_minimo ?
                                                            <span className="estado bajo">Bajo Stock</span>
                                                            :
                                                            <span className="estado disponible">Disponible</span>
                                                }
                                            </td>

                                            <td>
                                                <button className="btn-editar" onClick={() => editar(producto)}>
                                                    Editar
                                                </button>

                                                <button className="btn-eliminar" onClick={() => confirmarEliminar(producto)}>
                                                    Desactivar
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                }

                                {
                                    productos.length === 0 &&
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center", color: "#888" }}>
                                            No hay productos activos.
                                        </td>
                                    </tr>
                                }

                            </tbody>

                        </table>
                    </div>
                </>

            )}

            {/* -------- TAB DESACTIVADOS -------- */}
            {tabActiva === "inactivos" && (

                <div className="panel" style={{ marginTop: "20px" }}>

                    <table className="tabla">

                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio Venta</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                productosInactivos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>S/. {producto.precio_venta}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.categoria || "-"}</td>
                                        <td>
                                            <button className="btn-editar" onClick={() => confirmarReactivar(producto)}>
                                                Reactivar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                productosInactivos.length === 0 &&
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                                        No hay productos desactivados.
                                    </td>
                                </tr>
                            }

                        </tbody>

                    </table>

                </div>

            )}

            {

                mostrarModal &&

                <div className="modal-overlay">

                    <div className="modal">
                            <h2>
                                {idEditar ? "Editar Producto" : "Nuevo Producto"}
                            </h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Nombre del Producto</label>

                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />

                            </div>

                            <div className="form-group">
                                <label>Categoría</label>

                                <div style={{ display: "flex", gap: "8px" }}>
                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                        style={{ flex: 1 }}
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        {categorias.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.nombre}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        className="btn-nuevo"
                                        style={{ padding: "0 14px" }}
                                        onClick={crearCategoriaRapida}
                                        title="Crear nueva categoría"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Proveedor</label>

                                <div style={{ display: "flex", gap: "8px" }}>
                                    <select
                                        value={proveedor}
                                        onChange={(e) => setProveedor(e.target.value)}
                                        style={{ flex: 1 }}
                                    >
                                        <option value="">Seleccione un proveedor</option>
                                        {proveedores.map((prov) => (
                                            <option key={prov.id} value={prov.id}>
                                                {prov.nombre}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        className="btn-nuevo"
                                        style={{ padding: "0 14px" }}
                                        onClick={crearProveedorRapido}
                                        title="Crear nuevo proveedor"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">

                                <label>Código</label>

                                <input
                                    placeholder="Se genera automáticamente"
                                    disabled
                                />

                            </div>

                            <div className="form-group">

                                <label>Precio Compra</label>

                                <input
                                    type="number"
                                    value={precioCompra}
                                    onChange={(e) => setPrecioCompra(e.target.value)}
                                />

                            </div>

                            <div className="form-group">

                                <label>Precio Venta</label>

                                <input
                                    type="number"
                                    value={precioVenta}
                                    onChange={(e) => setPrecioVenta(e.target.value)}
                                />

                            </div>


                            <div className="form-group">
                                <label>Stock</label>

                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                                </div>

                                <div className="form-group">

                                    <label>Alerta de Stock</label>

                                    <input
                                        type="number"
                                       value={stockMinimo}
                                      onChange={(e) => setStockMinimo(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">

                                    <label>Registro SENASA</label>

                                    <input
                                        type="text"
                                        placeholder="Ej. SEN-2026-000123"
                                        value={registroSenasa}
                                        onChange={(e) => setRegistroSenasa(e.target.value)}
                                    />

                                </div>
                                <div className="form-group">

                                    <label>Fecha de Vencimiento</label>

                                    <input
                                        type="date"
                                        value={fechaVencimiento}
                                        onChange={(e) => setFechaVencimiento(e.target.value)}
                                    />

                                </div>

                                <div className="form-group">

                                    <label>Descripción</label>

                                    <textarea
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />

                                </div>

                            </div>

                        <div className="modal-buttons">

                            <button
                                className="btn-cancelar"
                                    onClick={() => {
                                        setMostrarModal(false);
                                        setIdEditar(null);
                                    }}
                                >
                              Cancelar
                         </button>

                           <button
                                    className="btn-guardar"
                                    onClick={guardarProducto}
                                >
                                    {idEditar ? "Actualizar" : "Guardar"}
                             </button>

                        </div>

                    </div>

                </div>

            }

        </div >

    );

}

export default Productos;