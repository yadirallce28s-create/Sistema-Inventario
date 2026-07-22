const API = "https://sistema-inventario-95aj.onrender.com/api/mascotas";

export const obtenerMascotas = async () => {
    const response = await fetch(API);
    const data = await response.json();
    return data.mascotas;
};

export const crearMascota = async (mascota) => {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mascota)
    });
    return await response.json();
};

export const editarMascota = async (id, mascota) => {
    const response = await fetch(
        `${API}/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mascota)
        }
    );
    return await response.json();
};

export const eliminarMascota = async (id) => {
    const response = await fetch(
        `${API}/${id}`,
        {
            method: "DELETE"
        }
    );
    return await response.json();
};

export const obtenerClientes = async () => {
    const response = await fetch(
        "https://sistema-inventario-95aj.onrender.com/api/clientes"
    );
    const data = await response.json();
    return data.clientes;
};