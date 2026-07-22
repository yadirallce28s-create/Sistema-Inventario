import { apiFetch } from "./httpClient";

export const obtenerProductos = async () => {
  const data = await apiFetch("/productos");
  return data.productos;
};

export const buscarProductos = async (texto) => {
  const data = await apiFetch(`/productos/buscar?texto=${texto}`);
  return data.productos;
};

export const crearProducto = async (producto) => {
  return await apiFetch("/productos", {
    method: "POST",
    body: JSON.stringify(producto),
  });
};

export const editarProducto = async (id, producto) => {
  return await apiFetch(`/productos/${id}`, {
    method: "PUT",
    body: JSON.stringify(producto),
  });
};

export const eliminarProducto = async (id) => {
  return await apiFetch(`/productos/${id}`, {
    method: "DELETE",
  });
};

export const obtenerCategorias = async () => {
  const data = await apiFetch("/categorias");
  return data.categorias;
};

export const crearCategoria = async (nombre) => {
  return await apiFetch("/categorias", {
    method: "POST",
    body: JSON.stringify({ nombre }),
  });
};

export const editarCategoria = async (id, nombre) => {
  return await apiFetch(`/categorias/${id}`, {
    method: "PUT",
    body: JSON.stringify({ nombre }),
  });
};

export const eliminarCategoria = async (id) => {
  return await apiFetch(`/categorias/${id}`, {
    method: "DELETE",
  });
};

export const obtenerProveedores = async () => {
  const data = await apiFetch("/proveedores");
  return data.proveedores;
};

export const obtenerMovimientos = async () => {
  const data = await apiFetch("/movimientos");
  return data.movimientos;
};

export const obtenerMovimientosProducto = async (idProducto) => {
  const data = await apiFetch(`/movimientos/producto/${idProducto}`);
  return data.movimientos;
};
export const obtenerProductosInactivos = async () => {
  const data = await apiFetch("/productos/inactivos");
  return data.productos;
};

export const reactivarProducto = async (id) => {
  return await apiFetch(`/productos/${id}/activar`, {
    method: "PATCH",
  });
};