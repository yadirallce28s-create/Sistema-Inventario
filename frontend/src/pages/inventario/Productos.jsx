import "../../css/inventario.css";
import { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCube } from "@fortawesome/free-solid-svg-icons";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [buscar, setBuscar] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioCompra, setPrecioCompra] = useState("");
    const [precioVenta, setPrecioVenta] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [proveedor, setProveedor] = useState("");

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/productos"
            );

            const data = await response.json();

            setProductos(data.productos);

        } catch (error) {

            console.log(error);

        }

    };

    const guardarProducto = async () => {

        try {

            await fetch(
                "http://localhost:5000/api/productos",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        codigo: "",
                        nombre,
                        descripcion,
                        precio_compra: precioCompra,
                        precio_venta: precioVenta,
                        stock,
                        stock_minimo: stockMinimo,
                        id_categoria: categoria,
                        id_proveedor: proveedor

                    })

                }
            );

            setNombre("");
            setDescripcion("");
            setPrecioCompra("");
            setPrecioVenta("");
            setStock("");
            setStockMinimo("");
            setCategoria("");
            setProveedor("");

            setMostrarModal(false);

            obtenerProductos();

        } catch (error) {

            console.log(error);

        }

    };

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(buscar.toLowerCase())
    );

    return (

        <div>

            <div className="inventario-header">

                <div>

                    <h1><FontAwesomeIcon icon={faCube} color="#429a85"/> Inventario de Productos</h1>

                    <p className="subtitulo">
                        Gestión del inventario veterinario
                    </p>

                </div>

                <button
                    className="btn-nuevo"
                    onClick={() => setMostrarModal(true)}
                >
                    + Nuevo Producto
                </button>

            </div>

            <input
                className="buscador"
                placeholder="Buscar producto..."
                value={buscar}
                onChange={(e)=>setBuscar(e.target.value)}
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
                                p=>p.stock<=p.stock_minimo
                            ).length
                        }
                    </p>
                </div>

                <div className="stat-card">
                    <h4>Agotados</h4>
                    <p>
                        {
                            productos.filter(
                                p=>p.stock===0
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
                            <th>Estado</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            productosFiltrados.map((producto)=>(

                                <tr key={producto.id}>

                                    <td>{producto.nombre}</td>

                                    <td>
                                        S/. {producto.precio_venta}
                                    </td>

                                    <td>{producto.stock}</td>

                                    <td>{producto.stock_minimo}</td>

                                    <td>

                                        {
                                            producto.stock===0 ?

                                            <span className="estado agotado">
                                                Agotado
                                            </span>

                                            :

                                            producto.stock<=producto.stock_minimo ?

                                            <span className="estado bajo">
                                                Bajo Stock
                                            </span>

                                            :

                                            <span className="estado disponible">
                                                Disponible
                                            </span>

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

            {

                mostrarModal &&

                <div className="modal-overlay">

                    <div className="modal">

                        <h2>Nuevo Producto</h2>

                        <input
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                        />

                        <textarea
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e)=>setDescripcion(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Precio Compra"
                            value={precioCompra}
                            onChange={(e)=>setPrecioCompra(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Precio Venta"
                            value={precioVenta}
                            onChange={(e)=>setPrecioVenta(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e)=>setStock(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Stock mínimo"
                            value={stockMinimo}
                            onChange={(e)=>setStockMinimo(e.target.value)}
                        />

                        <input
                            placeholder="ID Categoría"
                            value={categoria}
                            onChange={(e)=>setCategoria(e.target.value)}
                        />

                        <input
                            placeholder="ID Proveedor"
                            value={proveedor}
                            onChange={(e)=>setProveedor(e.target.value)}
                        />

                        <div className="modal-buttons">

                            <button
                                className="btn-cancelar"
                                onClick={()=>setMostrarModal(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-guardar"
                                onClick={guardarProducto}
                            >
                                Guardar
                            </button>

                        </div>

                    </div>

                </div>

            }

        </div>

    );

}

export default Productos;