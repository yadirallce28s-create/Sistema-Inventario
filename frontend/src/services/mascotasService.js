const API = "https://sistema-inventario-95aj.onrender.com/api/mascotas";

export const obtenerMascotas = async () => {
    const response = await fetch(API);
    if (!response.ok) throw new Error("Error al obtener las mascotas");
    const data = await response.json();
    return data.mascotas || data;
};

export const crearMascota = async (mascota) => {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mascota)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || "Error al crear mascota");
    }

    return await response.json();
};

export const editarMascota = async (id, mascota) => {
    const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mascota)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || "Error al editar mascota");
    }

    return await response.json();
};

export const eliminarMascota = async (id) => {
    const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.mensaje || errorData.message || "Error al eliminar mascota");
    }

    return await response.json();
};

export const obtenerClientes = async () => {
    const response = await fetch(
        "https://sistema-inventario-95aj.onrender.com/api/clientes"
    );
    if (!response.ok) throw new Error("Error al obtener clientes");
    const data = await response.json();
    return data.clientes || data;
};