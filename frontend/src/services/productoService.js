const API = "http://localhost:5000/api/productos";

// ===============================
// LISTAR PRODUCTOS
// ===============================

export const obtenerProductos = async () => {

    const response = await fetch(API);

    const data = await response.json();

    return data.productos;

};

// ===============================
// BUSCAR PRODUCTOS
// ===============================

export const buscarProductos = async (texto) => {

    const response = await fetch(
        `${API}/buscar?texto=${texto}`
    );

    const data = await response.json();

    return data.productos;

};

// ===============================
// REGISTRAR PRODUCTO
// ===============================

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

// ===============================
// EDITAR PRODUCTO
// ===============================

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

// ===============================
// ELIMINAR PRODUCTO
// ===============================

export const eliminarProducto = async(id)=>{

    const response = await fetch(

        `${API}/${id}`,

        {

            method:"DELETE"

        }

    );

    return await response.json();

};