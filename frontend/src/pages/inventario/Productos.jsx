import "../../css/inventario.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
    obtenerProductos,
    crearProducto,
    buscarProductos,
    obtenerCategorias,
    obtenerProveedores
} from "../../services/inventarioService";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
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
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [registroSenasa, setRegistroSenasa] = useState("");

    useEffect(() => {
        cargarProductos();
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
    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.log(error);
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
        try {
            await crearProducto({
                codigo: "",
                nombre,
                descripcion,
                precio_compra: precioCompra,
                precio_venta: precioVenta,
                stock,
                stock_minimo: stockMinimo,
                fecha_vencimiento: fechaVencimiento,
                id_categoria: categoria,
                id_proveedor: proveedor,

            });

            setNombre("");
            setDescripcion("");
            setPrecioCompra("");
            setPrecioVenta("");
            setStock("");
            setStockMinimo("");
            setCategoria("");
            setProveedor("");
            setFechaVencimiento("");

            setMostrarModal(false);

            await cargarProductos();
            Swal.fire({
                icon: "success",
                title: "Producto registrado",
                text: "El producto se registró correctamente.",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {

            console.log(error);

        }

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

                        </tr>

                    </thead>

                    <tbody>

                        {

                            productos.map((producto) => (

                                <tr key={producto.id}>

                                    <td>{producto.nombre}</td>

                                    <td>
                                        S/. {producto.precio_venta}
                                    </td>

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

                                                <span className="estado agotado">
                                                    Agotado
                                                </span>

                                                :

                                                producto.stock <= producto.stock_minimo ?

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

                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >

                                    <option value="">
                                        Seleccione una categoría
                                    </option>

                                    {
                                        categorias.map(cat => (

                                            <option
                                                key={cat.id}
                                                value={cat.id}
                                            >
                                                {cat.nombre}
                                            </option>

                                        ))
                                    }

                                </select>

                            </div>

                            <div className="form-group">

                                <label>Proveedor</label>

                                <select
                                    value={proveedor}
                                    onChange={(e) => setProveedor(e.target.value)}
                                >

                                    <option value="">
                                        Seleccione un proveedor
                                    </option>

                                    {
                                        proveedores.map(proveedor => (

                                            <option
                                                key={proveedor.id}
                                                value={proveedor.id}
                                            >
                                                {proveedor.nombre}
                                            </option>

                                        ))
                                    }

                                </select>

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
                                onClick={() => setMostrarModal(false)}
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

        </div >

    );

}

export default Productos;