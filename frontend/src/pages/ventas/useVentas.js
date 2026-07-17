import { useEffect, useState } from "react";

export function useVentas() {

    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {

        cargarDatos();

    }, []);

    const cargarDatos = () => {
        obtenerVentas();
        obtenerClientes();
        obtenerProductos();
        obtenerServicios();

    };

    const obtenerVentas = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/ventas"
            );

            const data = await response.json();
            setVentas(data.ventas);
        } catch (error) {

            console.error(error);
        }
    };

    const obtenerClientes = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/clientes"
            );

            const data = await response.json();
            setClientes(data.clientes);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerProductos = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/productos"
            );

            const data = await response.json();
            setProductos(data.productos);
        } catch (error) {

           console.error(error);
        }
    };

    const obtenerServicios = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/servicios"
            );

            const data = await response.json();
            setServicios(data.servicios);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        ventas,
        clientes,
        productos,
        servicios,
        obtenerVentas,
        obtenerClientes,
        obtenerProductos,
        obtenerServicios,
        cargarDatos
    };
}