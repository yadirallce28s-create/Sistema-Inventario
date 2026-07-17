const API = "http://localhost:5000/api/productos";

export const obtenerProductos = async () => {
    const response = await fetch(API);
    const data = await response.json();
    return data.productos;
};


export const buscarProductos = async (texto) => {
    const response = await fetch(
        `${API}/buscar?texto=${texto}`
    );
    const data = await response.json();
    return data.productos;
};

export const crearProducto = async (producto) => {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(producto)
    });
    return await response.json();
};

export const editarProducto = async (id, producto) => {
    const response = await fetch(
        `${API}/${id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(producto)
        }
    );
    return await response.json();
};

export const eliminarProducto = async(id)=>{
    const response = await fetch(
        `${API}/${id}`,
        {
            method:"DELETE"
        }
    );
    return await response.json();
};

export const obtenerCategorias = async () => {
    const response = await fetch(
        "http://localhost:5000/api/categorias"
    );
    const data = await response.json();
    return data.categorias;
};

export const obtenerProveedores = async () => {
    const response = await fetch(
        "http://localhost:5000/api/proveedores"
    );
    const data = await response.json();
    return data.proveedores;
};