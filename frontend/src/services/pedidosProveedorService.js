import { apiFetch } from "./httpClient";

export const obtenerPedidosProveedor = async () => {
  const data = await apiFetch("/pedidos-proveedor");
  return data.pedidos;
};

export const crearPedidoProveedor = async (pedido) => {
  return await apiFetch("/pedidos-proveedor", {
    method: "POST",
    body: JSON.stringify(pedido),
  });
};

export const cambiarEstadoPedido = async (id, estado) => {
  return await apiFetch(`/pedidos-proveedor/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify({ estado }),
  });
};

export const eliminarPedidoProveedor = async (id) => {
  return await apiFetch(`/pedidos-proveedor/${id}`, {
    method: "DELETE",
  });
};