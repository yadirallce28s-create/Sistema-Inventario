function TablaProductos({
    listaProductos,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto
}) {

    return (

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
    );
}

export default TablaProductos;
