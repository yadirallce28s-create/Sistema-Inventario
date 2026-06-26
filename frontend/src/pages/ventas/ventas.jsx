import "../../css/ventas.css";
import { useEffect, useState } from "react";

function Ventas() {

    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cliente, setCliente] = useState("");
    const [metodoPago, setMetodoPago] = useState("Efectivo");
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [cantidadProducto, setCantidadProducto] = useState(1);
    const [servicioSeleccionado, setServicioSeleccionado] = useState("");
    const [listaProductos, setListaProductos] = useState([]);
    const [listaServicios, setListaServicios] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = () => {
        obtenerVentas();
        obtenerClientes();
        obtenerProductos();
        obtenerServicios();

    };
    useEffect(() => {

        let totalProductos = 0;
        listaProductos.forEach((producto) => {

            totalProductos +=
                Number(producto.precio_venta) *
                producto.cantidad;

        });

        let totalServicios = 0;

        listaServicios.forEach((servicio) => {

            totalServicios +=
                Number(servicio.precio);

        });

        setTotal(totalProductos + totalServicios);

    }, [listaProductos, listaServicios]);

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

    const obtenerClientes = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/clientes"
            );

            const data = await response.json();
            setClientes(data.clientes);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerProductos = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/productos"
            );

            const data = await response.json();
            setProductos(data.productos);
        } catch (error) {

           console.error(error);
        }
    };

    const obtenerServicios = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/servicios"
            );

            const data = await response.json();
            setServicios(data.servicios);
        } catch (error) {
            console.error(error);
        }
    };

    const agregarProducto = () => {

        if (!productoSeleccionado) return;
        const producto = productos.find(
            (p) => p.id === Number(productoSeleccionado)
        );
        if (!producto) return;
        const existe = listaProductos.find(
            (p) => p.id === producto.id
        );

        if (existe) {
            setListaProductos(
                listaProductos.map((p) =>
                    p.id === producto.id
                        ? {
                            ...p,
                            cantidad: p.cantidad + cantidadProducto
                        }
                        : p
                )
            );
        }
        else {
            setListaProductos([
                ...listaProductos,
                {
                    ...producto,
                    cantidad: cantidadProducto
                }
            ]);
        }
        setProductoSeleccionado("");
        setCantidadProducto(1);
    };


    const agregarServicio = () => {
        if (!servicioSeleccionado) return;

        const servicio = servicios.find(
            (s) => s.id === Number(servicioSeleccionado)
        );

        if (!servicio) return;
        const existe = listaServicios.find(
            (s) => s.id === servicio.id
        );

        if (existe) return;
        setListaServicios([
            ...listaServicios,

           servicio
        ]);
        setServicioSeleccionado("");
    };

    const aumentarCantidad = (id) => {
        setListaProductos(
            listaProductos.map((producto) =>
                producto.id === id
                    ? {

                        ...producto,

                        cantidad: producto.cantidad + 1
                    }
                    : producto
            )
        );
    };

    const disminuirCantidad = (id) => {
        setListaProductos(
            listaProductos
                .map((producto) =>
                    producto.id === id
                        ? {
                            ...producto,

                            cantidad: producto.cantidad - 1
                        }

                        : producto
                )

                .filter((producto) => producto.cantidad > 0)
        );
    };

    const eliminarProducto = (id) => {
        setListaProductos(
            listaProductos.filter(

                (producto) => producto.id !== id
            )
        );
    };

    const eliminarServicio = (id) => {
        setListaServicios(
            listaServicios.filter(
                (servicio) => servicio.id !== id
            )
        );
    };

    const limpiarFormulario = () => {

        setCliente("");
        setMetodoPago("Efectivo");
        setProductoSeleccionado("");
        setCantidadProducto(1);
        setServicioSeleccionado("");
        setListaProductos([]);
        setListaServicios([]);
        setTotal(0);
    };

    const registrarVenta = async () => {

        if (!cliente) {
            alert("Seleccione un cliente");
            return;
        }

        if (
            listaProductos.length === 0 &&
            listaServicios.length === 0
        ) {
            alert("Debe agregar productos o servicios");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/ventas",
                {
                    method: "POST",
                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        id_cliente: cliente,
                        metodo_pago: metodoPago,
                        productos: listaProductos.map((producto) => ({

                            id_producto: producto.id,

                            cantidad: producto.cantidad
                        })),
                        servicios: listaServicios.map((servicio) => ({
                            id_servicio: servicio.id
                        }))

                    })
                }
            );

            const data = await response.json();
            if (data.status === "success") {
                alert("Venta registrada correctamente");
                obtenerVentas();
                limpiarFormulario();
                setMostrarModal(false);
            }
            else {

                alert("No se pudo registrar la venta");
            }
        }
        catch (error) {
            console.error(error);
            alert("Error del servidor");
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

                    <div className="modal-overlay">

                        <div className="modal modal-venta">

                            <h2>

                                Nueva Venta
                            </h2>

                            <label>

                                Cliente
                            </label>

                            <select
                                value={cliente}
                                onChange={(e) =>
                                    setCliente(e.target.value)
                                }
                            >

                                <option value="">

                                    Seleccione Cliente
                                </option>

                                {

                                    clientes.map((cliente) => (

                                        <option
                                            key={cliente.id}
                                            value={cliente.id}
                                        >

                                            {cliente.nombre} {cliente.apellido}
                                        </option>
                                    ))
                                }

                            </select>

                            <label>

                                Método de Pago
                            </label>

                            <select
                                value={metodoPago}
                                onChange={(e) =>
                                    setMetodoPago(e.target.value)
                                }
                            >
                                <option>Efectivo</option>
                                <option>Yape</option>
                                <option>Plin</option>
                                <option>Tarjeta</option>
                            </select>

                            <hr />

                            <h3>

                                📦 Productos
                            </h3>
                            <div className="fila-producto">

                                <select
                                    value={productoSeleccionado}
                                    onChange={(e) =>
                                        setProductoSeleccionado(e.target.value)
                                    }
                                >

                                    <option value="">
                                        Seleccione Producto
                                    </option>

                                    {
                                        productos.map((producto) => (

                                            <option
                                                key={producto.id}
                                                value={producto.id}
                                            >

                                                {producto.nombre} - S/.{" "}
                                                {Number(producto.precio_venta).toFixed(2)}
                                            </option>
                                        ))
                                    }

                                </select>

                                <input
                                    type="number"
                                    min="1"
                                    value={cantidadProducto}
                                    onChange={(e) =>
                                        setCantidadProducto(Number(e.target.value))
                                    }
                                />

                                <button
                                    className="btn-guardar"
                                    onClick={agregarProducto}
                                >

                                    Agregar
                                </button>

                            </div>

                            <table className="tabla tabla-detalle">

                                <thead>

                                    <tr>

                                        <th>Producto</th>

                                        <th>Precio</th>

                                        <th>Cantidad</th>

                                        <th>Subtotal</th>

                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {

                                        listaProductos.map((producto) => (

                                            <tr key={producto.id}>

                                                <td>

                                                    {producto.nombre}
                                                </td>

                                                <td>

                                                    S/. {Number(producto.precio_venta).toFixed(2)}
                                                </td>

                                                <td>

                                                    {producto.cantidad}
                                                </td>

                                                <td>

                                                    S/. {

                                                        (
                                                            Number(producto.precio_venta) *
                                                            producto.cantidad
                                                        ).toFixed(2)
                                                    }
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn-menos"
                                                        onClick={() =>
                                                            disminuirCantidad(producto.id)
                                                        }
                                                    >

                                                        -

                                                    </button>

                                                    <button
                                                        className="btn-mas"
                                                        onClick={() =>
                                                            aumentarCantidad(producto.id)
                                                        }
                                                    >

                                                        +

                                                    </button>

                                                    <button
                                                        className="btn-eliminar"
                                                        onClick={() =>
                                                            eliminarProducto(producto.id)
                                                        }
                                                    >

                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <hr />

                            <h3>

                                🩺 Servicios
                            </h3>
                            <div className="fila-producto">

                                <select
                                    value={servicioSeleccionado}
                                    onChange={(e) =>
                                        setServicioSeleccionado(e.target.value)
                                    }
                                >

                                    <option value="">
                                        Seleccione Servicio
                                    </option>

                                    {

                                        servicios.map((servicio) => (

                                            <option
                                                key={servicio.id}
                                                value={servicio.id}
                                            >

                                                {servicio.nombre} - S/.{" "}
                                                {Number(servicio.precio).toFixed(2)}
                                            </option>
                                        ))
                                    }
                                </select>

                                <button
                                    className="btn-guardar"
                                    onClick={agregarServicio}
                                >

                                    Agregar Servicio
                                </button>

                            </div>

                            <table className="tabla tabla-detalle">

                                <thead>

                                    <tr>

                                        <th>Servicio</th>

                                        <th>Precio</th>

                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {

                                        listaServicios.map((servicio) => (

                                            <tr key={servicio.id}>

                                                <td>

                                                    {servicio.nombre}

                                                </td>

                                                <td>

                                                    S/. {Number(servicio.precio).toFixed(2)}

                                                </td>

                                                <td>

                                                    <button
                                                        className="btn-eliminar"
                                                        onClick={() =>
                                                            eliminarServicio(servicio.id)
                                                        }
                                                    >

                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>

                            <hr />

                            <div className="total-venta">

                                <h2>

                                    TOTAL
                                </h2>

                                <h1>

                                    S/. {total.toFixed(2)}
                                </h1>

                            </div>

                            <div className="modal-buttons">

                                <button
                                    className="btn-cancelar"
                                    onClick={() => {

                                        limpiarFormulario();

                                        setMostrarModal(false);
                                    }}
                                >

                                    Cancelar

                                </button>

                                <button
                                    className="btn-guardar"
                                    onClick={registrarVenta}
                                >

                                    Registrar Venta
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default Ventas;