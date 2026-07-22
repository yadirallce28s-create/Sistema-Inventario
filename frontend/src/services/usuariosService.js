import { apiFetch } from "./httpClient";

export const obtenerUsuarios = async () => {
  const data = await apiFetch("/usuarios");
  return data.usuarios;
};

export const crearUsuario = async (datos) => {
  // datos = { nombre, email, password, rol }
  return await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(datos),
  });
};

export const desactivarUsuario = async (id) => {
  return await apiFetch(`/usuarios/${id}/desactivar`, {
    method: "PUT",
  });
};

export const activarUsuario = async (id) => {
  return await apiFetch(`/usuarios/${id}/activar`, {
    method: "PUT",
  });
};