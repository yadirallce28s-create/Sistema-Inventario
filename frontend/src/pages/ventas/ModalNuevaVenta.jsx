import { useState } from "react";
import TablaProductos from "./TablaProductos";
import TablaServicios from "./TablaServicios";
import Swal from "sweetalert2";

function ModalNuevaVenta({
    clientes,
    productos,
    servicios,
    onVentaRegistrada,
    onCerrar
}) {

    const [cliente, setCliente] = useState("");
    const [metodoPago, setMetodoPago] = useState("Efectivo");
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [cantidadProducto, setCantidadProducto] = useState(1);
    const [servicioSeleccionado, setServicioSeleccionado] = useState("");
    const [listaProductos, setListaProductos] = useState([]);
    const [listaServicios, setListaServicios] = useState([]);

    // Total calculado directamente en cada render (no como estado aparte),
    // así siempre refleja lo que hay en listaProductos y listaServicios.
    console.log(listaProductos);
    const totalProductos = listaProductos.reduce(
        (acc, producto) =>
            acc + Number(producto.precio_venta) * producto.cantidad,
        0
    );

    const totalServicios = listaServicios.reduce(
        (acc, servicio) => acc + Number(servicio.precio),
        0
    );

    const total = totalProductos + totalServicios;

    const agregarProducto = () => {

        if (!productoSeleccionado) {
    Swal.fire({
        icon: "warning",
        title: "Seleccione un producto",
        text: "Debe elegir un producto antes de agregarlo.",
        confirmButtonColor: "#429a85"
    });
    return;
}
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
        if (!productoSeleccionado) {
    Swal.fire({
        icon: "warning",
        title: "Seleccione un producto",
        text: "Debe elegir un producto antes de agregarlo.",
        confirmButtonColor: "#429a85"
    });
    return;
}
        const servicio = servicios.find(
            (s) => s.id === Number(servicioSeleccionado)
        );

        if (!servicio) return;
        const existe = listaServicios.find(
            (s) => s.id === servicio.id
        );

        if (existe) {
    Swal.fire({
        icon: "info",
        title: "Servicio ya agregado",
        text: "Este servicio ya se encuentra en la venta.",
        confirmButtonColor: "#429a85"
    });
    return;
}
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
    };

    const registrarVenta = async () => {
        if (!cliente) {
           Swal.fire({
           icon: "warning",
           title: "Cliente requerido",
           text: "Seleccione un cliente para continuar.",
           confirmButtonColor: "#429a85"
        });
        return;
        }
        if (
            listaProductos.length === 0 &&
            listaServicios.length === 0
        ) {
          Swal.fire({
        icon: "warning",
        title: "Venta vacía",
        text: "Debe agregar al menos un producto o un servicio.",
        confirmButtonColor: "#429a85"
        });
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

console.log("Status:", response.status);

const data = await response.json();

console.log("Respuesta:", data);

if (data.status === "success") {

    Swal.fire({
        icon: "success",
        title: "¡Venta registrada!",
        text: "La venta se registró correctamente.",
        timer: 1800,
        showConfirmButton: false
    });

    onVentaRegistrada();
    limpiarFormulario();
    onCerrar();

} else {

    Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message,
        confirmButtonColor: "#d33"
    });

}

    

           
            if (data.status === "success") {
                Swal.fire({
                   icon: "success",
                   title: "¡Venta registrada!",
                   text: "La venta se registró correctamente.",
                   timer: 1800,
                   showConfirmButton: false
                });
                onVentaRegistrada();
                limpiarFormulario();
                onCerrar();
            }
            else {

                Swal.fire({
                    icon: "error",
                    title: "Error del servidor",
                    text: "Ocurrió un problema al conectar con el servidor.",
                    confirmButtonColor: "#d33"
                });
            }
        }
        catch (error) {
    console.error(error);

    Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al registrar la venta.",
        confirmButtonColor: "#d33"
    });
}
    };
    console.log("Lista productos:", listaProductos);
console.log("Lista servicios:", listaServicios);
console.log("Total:", total);

    return (

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

                                    {producto.nombre}
                                    {" | S/. "}
                                    {Number(producto.precio_venta).toFixed(2)}
                                    {" | Stock: "}
                                    {producto.stock}

                                </option>
                            ))
                        }ya me aprecion eltottal ahora solo 

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

                <TablaProductos
                    listaProductos={listaProductos}
                    aumentarCantidad={aumentarCantidad}
                    disminuirCantidad={disminuirCantidad}
                    eliminarProducto={eliminarProducto}
                />

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

                <TablaServicios
                    listaServicios={listaServicios}
                    eliminarServicio={eliminarServicio}
                />

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

                            onCerrar();
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
    );
}

export default ModalNuevaVenta;
