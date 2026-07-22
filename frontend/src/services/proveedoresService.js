import { apiFetch } from "./httpClient";

export const obtenerProveedoresApi = async () => {
  const data = await apiFetch("/proveedores");
  return data.proveedores;
};

export const crearProveedor = async (datos) => {
  return await apiFetch("/proveedores", {
    method: "POST",
    body: JSON.stringify(datos),
  });
};

export const editarProveedor = async (id, datos) => {
  return await apiFetch(`/proveedores/${id}`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
};

export const eliminarProveedor = async (id) => {
  return await apiFetch(`/proveedores/${id}`, {
    method: "DELETE",
  });
};