const URL = "http://localhost:5000/api";

export const obtenerCitas = async () => {
  const response = await fetch(`${URL}/citas`);
  return await response.json();
};

export const guardarCita = async (datos) => {
  const response = await fetch(`${URL}/citas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return await response.json();
};

export const atenderCita = async (id) => {
  const response = await fetch(`${URL}/citas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estado: "atendida",
    }),
  });

  return await response.json();
};


export const obtenerClientes = async () => {
  const response = await fetch(`${URL}/clientes`);
  return await response.json();
};

export const guardarCliente = async (datos) => {
  const response = await fetch(`${URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return await response.json();
};

export const obtenerMascotas = async () => {
  const response = await fetch(`${URL}/mascotas`);
  return await response.json();
};

export const guardarMascota = async (datos) => {
  const response = await fetch(`${URL}/mascotas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return await response.json();
};
export const editarCita = async (id, datos) => {
  const response = await fetch(`${URL}/citas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return await response.json();
};

export const eliminarCita = async (id) => {
  const response = await fetch(`${URL}/citas/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};
export const actualizarCita = async (id, datos) => {

  const response = await fetch(`${URL}/citas/editar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  return await response.json();
};