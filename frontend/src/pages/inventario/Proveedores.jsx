import "../../css/inventario.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  obtenerProveedoresApi,
  crearProveedor,
  editarProveedor,
  eliminarProveedor,
} from "../../services/proveedoresService";
import {
  obtenerPedidosProveedor,
  crearPedidoProveedor,
  cambiarEstadoPedido,
  eliminarPedidoProveedor,
} from "../../services/pedidosProveedorService";
import {
  obtenerProductos,
  crearProducto,
  obtenerCategorias,
} from "../../services/inventarioService";
function Proveedores() {

  const [tabActiva, setTabActiva] = useState("directorio");

  // ---------- DIRECTORIO ----------
  const [proveedores, setProveedores] = useState([]);
  const [mostrarModalProveedor, setMostrarModalProveedor] = useState(false);
  const [idEditarProveedor, setIdEditarProveedor] = useState(null);

  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  // ---------- PEDIDOS ----------
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mostrarModalPedido, setMostrarModalPedido] = useState(false);

  const [idProveedorPedido, setIdProveedorPedido] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaEstimada, setFechaEstimada] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarProveedores();
    cargarPedidos();
    cargarProductos();
    cargarCategorias();
  }, []);

  // ---------- FUNCIONES DIRECTORIO ----------

  const cargarProveedores = async () => {
    try {
      const data = await obtenerProveedoresApi();
      setProveedores(data || []);
    } catch (error) {
      console.error(error);
    }
  };
  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarFormularioProveedor = () => {
    setNombre("");
    setContacto("");
    setTelefono("");
    setEmail("");
    setDireccion("");
    setIdEditarProveedor(null);
  };

  const guardarProveedor = async () => {
    if (!nombre || !contacto || !telefono) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Complete todos los campos obligatorios.",
      });
      return;
    }

    try {
      const datos = { nombre, contacto, telefono, email, direccion };

      if (idEditarProveedor) {
        await editarProveedor(idEditarProveedor, datos);
      } else {
        await crearProveedor(datos);
      }

      limpiarFormularioProveedor();
      setMostrarModalProveedor(false);
      await cargarProveedores();

      Swal.fire({
        icon: "success",
        title: idEditarProveedor ? "Proveedor actualizado" : "Proveedor registrado",
        text: idEditarProveedor
          ? "El proveedor se actualizó correctamente."
          : "El proveedor se registró correctamente.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const abrirEditarProveedor = (proveedor) => {
    setIdEditarProveedor(proveedor.id);
    setNombre(proveedor.nombre);
    setContacto(proveedor.contacto);
    setTelefono(proveedor.telefono);
    setEmail(proveedor.email);
    setDireccion(proveedor.direccion);
    setMostrarModalProveedor(true);
  };

  const confirmarEliminarProveedor = (proveedor) => {
    Swal.fire({
      title: `¿Eliminar a ${proveedor.nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarProveedor(proveedor.id);
        await cargarProveedores();
        Swal.fire({
          icon: "success",
          title: "Proveedor eliminado",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const contactar = (proveedor) => {
    Swal.fire({
      title: proveedor.nombre,
      html: `
            <b>Contacto:</b> ${proveedor.contacto}<br>
            <b>Teléfono:</b> ${proveedor.telefono}<br>
            <b>Correo:</b> ${proveedor.email}<br>
            <b>Dirección:</b> ${proveedor.direccion}
        `,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  // ---------- FUNCIONES PEDIDOS ----------

  const cargarPedidos = async () => {
    try {
      const data = await obtenerPedidosProveedor();
      setPedidos(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarFormularioPedido = () => {
    setIdProveedorPedido("");
    setIdProducto("");
    setCantidad("");
    setFechaEstimada("");
  };

  const guardarPedido = async () => {

    if (!idProveedorPedido || !idProducto || !cantidad) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Seleccione proveedor, producto y cantidad.",
      });
      return;
    }

    try {

      await crearPedidoProveedor({
        id_proveedor: idProveedorPedido,
        id_producto: idProducto,
        cantidad,
        fecha_estimada: fechaEstimada || null,
      });

      limpiarFormularioPedido();
      setMostrarModalPedido(false);
      await cargarPedidos();

      Swal.fire({
        icon: "success",
        title: "Pedido registrado",
        timer: 1800,
        showConfirmButton: false,
      });

    } catch (error) {
      console.log(error);
    }

  };

  const marcarComo = async (pedido, estado) => {

    const textos = {
      recibido: "¿Confirmar que el pedido llegó? Esto sumará el stock automáticamente.",
      cancelado: "¿Cancelar este pedido?",
    };

    const resultado = await Swal.fire({
      title: textos[estado],
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Volver",
    });

    if (!resultado.isConfirmed) return;

    try {

      await cambiarEstadoPedido(pedido.id, estado);
      await cargarPedidos();

      Swal.fire({
        icon: "success",
        title: estado === "recibido" ? "Pedido recibido, stock actualizado" : "Pedido cancelado",
        timer: 1800,
        showConfirmButton: false,
      });

    } catch (error) {
      console.log(error);
    }

  };

  const confirmarEliminarPedido = (pedido) => {

    Swal.fire({
      title: "¿Eliminar este pedido?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarPedidoProveedor(pedido.id);
        await cargarPedidos();
        Swal.fire({
          icon: "success",
          title: "Pedido eliminado",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });

  };
  const crearProductoRapido = async () => {
  if (!idProveedorPedido) {
    Swal.fire({
      icon: "warning",
      title: "Selecciona un proveedor primero",
      text: "El producto nuevo se asociará al proveedor de este pedido.",
    });
    return;
  }

  const opcionesCategorias = categorias
      .map((cat) => `<option value="${cat.id}">${cat.nombre}</option>`)
      .join("");

    const { value: formValues } = await Swal.fire({
      title: "Nuevo Producto",
      html: `
      <input id="swal-nombre" class="swal2-input" placeholder="Nombre del producto">
      <select id="swal-categoria" class="swal2-select">
        <option value="">Seleccione una categoría</option>
        ${opcionesCategorias}
      </select>
      <input id="swal-precio-compra" type="number" class="swal2-input" placeholder="Precio Compra">
      <input id="swal-precio-venta" type="number" class="swal2-input" placeholder="Precio Venta">
      <input id="swal-stock-minimo" type="number" class="swal2-input" placeholder="Alerta de Stock (opcional)">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombreProd = document.getElementById("swal-nombre").value.trim();
        const idCategoria = document.getElementById("swal-categoria").value;
        const precioCompra = document.getElementById("swal-precio-compra").value;
        const precioVenta = document.getElementById("swal-precio-venta").value;
        const stockMin = document.getElementById("swal-stock-minimo").value;

        if (!nombreProd || !idCategoria || !precioCompra || !precioVenta) {
          Swal.showValidationMessage(
            "Nombre, categoría, precio de compra y precio de venta son obligatorios"
          );
          return false;
        }

        return {
          nombre: nombreProd,
          id_categoria: idCategoria,
          precio_compra: precioCompra,
          precio_venta: precioVenta,
          stock: 0,
          stock_minimo: stockMin || 5,
          id_proveedor: idProveedorPedido,
        };
      },
    });

    if (!formValues) return;

    try {
      const respuesta = await crearProducto(formValues);

      if (respuesta.status === "success") {
        await cargarProductos();
        setIdProducto(respuesta.producto.id);

        Swal.fire({
          icon: "success",
          title: "Producto creado",
          text: "Se registró con stock inicial 0; se actualizará cuando recibas el pedido.",
          timer: 2200,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", respuesta.message || "No se pudo crear el producto", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el producto", "error");
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

        return { nombre: empresa, contacto: nombreContacto, telefono, email: correo, direccion };
      },
    });

    if (!formValues) return;

    try {
      const respuesta = await crearProveedor(formValues);

      if (respuesta.status === "success") {
        await cargarProveedores();
        setIdProveedorPedido(respuesta.proveedor.id);

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

  const badgeEstado = (estado) => {

    if (estado === "recibido") {
      return <span className="estado disponible">Recibido</span>;
    }
    if (estado === "cancelado") {
      return <span className="estado agotado">Cancelado</span>;
    }
    return <span className="estado bajo">Pendiente</span>;

  };

  return (
    <div>

      <div className="inventario-header">
        <div>
          <h1><FontAwesomeIcon icon={faTruck} color="#429a85" /> Proveedores</h1>
          <p className="subtitulo">Directorio y pedidos a proveedores</p>
        </div>

        {tabActiva === "directorio" && (
          <button
            className="btn-nuevo"
            onClick={() => {
              limpiarFormularioProveedor();
              setMostrarModalProveedor(true);
            }}
          >
            + Nuevo Proveedor
          </button>
        )}

        {tabActiva === "pedidos" && (
          <button
            className="btn-nuevo"
            onClick={() => {
              limpiarFormularioPedido();
              setMostrarModalPedido(true);
            }}
          >
            + Nuevo Pedido
          </button>
        )}
      </div>

      <div className="tabs">

        <button
          className={`tab ${tabActiva === "directorio" ? "active" : ""}`}
          onClick={() => setTabActiva("directorio")}
        >
          Directorio
        </button>

        <button
          className={`tab ${tabActiva === "pedidos" ? "active" : ""}`}
          onClick={() => setTabActiva("pedidos")}
        >
          Pedidos
        </button>

      </div>

      {/* -------- TAB DIRECTORIO -------- */}
      {tabActiva === "directorio" && (

        <div className="panel">
          <table className="tabla">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.contacto}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.email}</td>
                  <td>{proveedor.direccion}</td>
                  <td>
                    <button
                      className="btn-ver"
                      onClick={() => contactar(proveedor)}
                    >
                      Contactar
                    </button>

                    <button
                      className="btn-editar"
                      onClick={() => abrirEditarProveedor(proveedor)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn-eliminar"
                      onClick={() => confirmarEliminarProveedor(proveedor)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}

      {/* -------- TAB PEDIDOS -------- */}
      {tabActiva === "pedidos" && (

        <div className="panel">
          <table className="tabla">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha Pedido</th>
                <th>Fecha Estimada</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.nombre_proveedor}</td>
                  <td>{pedido.nombre_producto}</td>
                  <td>{pedido.cantidad}</td>
                  <td>{pedido.fecha_pedido?.substring(0, 10)}</td>
                  <td>{pedido.fecha_estimada ? pedido.fecha_estimada.substring(0, 10) : "-"}</td>
                  <td>{badgeEstado(pedido.estado)}</td>
                  <td>
                    {pedido.estado === "pendiente" && (
                      <>
                        <button
                          className="btn-editar"
                          onClick={() => marcarComo(pedido, "recibido")}
                        >
                          Recibir
                        </button>

                        <button
                          className="btn-eliminar"
                          onClick={() => marcarComo(pedido, "cancelado")}
                        >
                          Cancelar
                        </button>
                      </>
                    )}

                    {pedido.estado !== "pendiente" && (
                      <button
                        className="btn-eliminar"
                        onClick={() => confirmarEliminarPedido(pedido)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}

      {/* -------- MODAL NUEVO/EDITAR PROVEEDOR -------- */}
      {mostrarModalProveedor && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{idEditarProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}</h2>

            <input
              placeholder="Empresa"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input
              placeholder="Nombre (persona de contacto)"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />

            <input
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />

            <input
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />

            <div className="modal-buttons">
              <button
                className="btn-cancelar"
                onClick={() => {
                  setMostrarModalProveedor(false);
                  limpiarFormularioProveedor();
                }}
              >
                Cancelar
              </button>

              <button className="btn-guardar" onClick={guardarProveedor}>
                {idEditarProveedor ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------- MODAL NUEVO PEDIDO -------- */}
      {mostrarModalPedido && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nuevo Pedido</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Proveedor</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    value={idProveedorPedido}
                    onChange={(e) => setIdProveedorPedido(e.target.value)}
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
                <label>Producto</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    value={idProducto}
                    onChange={(e) => setIdProducto(e.target.value)}
                    style={{ flex: 1 }}
                  >
                    <option value="">Seleccione un producto</option>
                    {productos.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.nombre}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn-nuevo"
                    style={{ padding: "0 14px" }}
                    onClick={crearProductoRapido}
                    title="Crear nuevo producto"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Cantidad</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Fecha Estimada de Entrega</label>
                <input
                  type="date"
                  value={fechaEstimada}
                  onChange={(e) => setFechaEstimada(e.target.value)}
                />
              </div>

            </div>

            <div className="modal-buttons">
              <button
                className="btn-cancelar"
                onClick={() => {
                  setMostrarModalPedido(false);
                  limpiarFormularioPedido();
                }}
              >
                Cancelar
              </button>

              <button className="btn-guardar" onClick={guardarPedido}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Proveedores;