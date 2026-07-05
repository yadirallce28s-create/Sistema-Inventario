import { useState, useEffect } from "react";

import {
  obtenerCitas,
  obtenerClientes,
  obtenerMascotas,

  guardarCita as guardarCitaService,
  guardarCliente as guardarClienteService,
  guardarMascota as guardarMascotaService,

  actualizarCita,
  atenderCita,
  editarCita,
  eliminarCita
} from "./citasService";

export default function useCitas() {

    const [clientes, setClientes] = useState([]);
    const [citas, setCitas] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [mascotasCliente, setMascotasCliente] = useState([]);
    const [tabActiva, setTabActiva] = useState("pendientes");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
    const [mostrarModalMascota, setMostrarModalMascota] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
    const [modoEditar, setModoEditar] = useState(false);

    const [idEditar, setIdEditar] = useState(null);
    const [idEliminar, setIdEliminar] = useState(null);
    const [idCliente, setIdCliente] = useState("");
    const [idMascota, setIdMascota] = useState("");

    const [fecha, setFecha] = useState("");
    const [motivo, setMotivo] = useState("");

    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        direccion: ""
    });
    const [nuevaMascota, setNuevaMascota] = useState({

        nombre: "",
        especie: "",
        raza: "",
        fecha_nacimiento: "",
        sexo: "",
        peso: ""

    });

    useEffect(() => {

        cargarCitas();
        cargarClientes();
        cargarMascotas();

    }, []);

    const cargarCitas = async () => {

        try {

            const data = await obtenerCitas();

            setCitas(data.citas);

        } catch (error) {

            console.error(error);

        }

    };

    const cargarClientes = async () => {

        try {

            const data = await obtenerClientes();

            setClientes(data.clientes);

        } catch (error) {

            console.error(error);

        }

    };

    const cargarMascotas = async () => {

        try {

            const data = await obtenerMascotas();

            setMascotas(data.mascotas);

            return data.mascotas;

        } catch (error) {

            console.error(error);

            return [];

        }

    };

    const cargarMascotasCliente = (idCliente) => {

        setIdCliente(idCliente);

        const lista = mascotas.filter(
            mascota => Number(mascota.id_cliente) === Number(idCliente)
        );

        setMascotasCliente(lista);

        setIdMascota("");

    };
    const guardarCita = async () => {

        try {

            if (modoEditar) {

                await actualizarCita(idEditar, {

                    fecha,
                    motivo,
                    id_mascota: idMascota

                });

            } else {

                await guardarCitaService({

                    fecha,
                    motivo,
                    id_mascota: idMascota

                });

            }

            setFecha("");
            setMotivo("");
            setIdMascota("");

            setModoEditar(false);
            setIdEditar(null);

            setMostrarModal(false);

            cargarCitas();

        } catch (error) {

            console.log(error);

        }

    };

    const guardarCliente = async () => {

        try {

            const data = await guardarClienteService({

                nombre: nuevoCliente.nombre,
                apellido: nuevoCliente.apellido,
                telefono: nuevoCliente.telefono,
                email: nuevoCliente.email,
                direccion: nuevoCliente.direccion

            });

            if (data.status === "success") {

                await cargarClientes();

                setIdCliente(data.cliente.id);

                setNuevoCliente({

                    nombre: "",
                    apellido: "",
                    telefono: "",
                    email: "",
                    direccion: ""

                });

                setMostrarModalCliente(false);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const guardarMascota = async () => {

        try {

            const data = await  guardarMascotaService({

                nombre: nuevaMascota.nombre,
                especie: nuevaMascota.especie,
                raza: nuevaMascota.raza,
                fecha_nacimiento: nuevaMascota.fecha_nacimiento || null,
                sexo: nuevaMascota.sexo,
                peso: Number(nuevaMascota.peso),
                id_cliente: Number(idCliente)

            });

            if (data.status === "success") {

                const nuevasMascotas = await cargarMascotas();

                const lista = nuevasMascotas.filter(
                    mascota => Number(mascota.id_cliente) === Number(idCliente)
                );

                setMascotasCliente(lista);

                setIdMascota(data.mascota.id);

                setNuevaMascota({

                    nombre: "",
                    especie: "",
                    raza: "",
                    fecha_nacimiento: "",
                    sexo: "",
                    peso: ""

                });

                setMostrarModalMascota(false);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const cambiarEstado = async (id) => {

        await atenderCita(id);

        cargarCitas();

    };
    const editar = (id) => {

        const cita = citas.find(c => c.id === id);

        if (!cita) return;

        setIdEditar(id);

        setFecha(cita.fecha);

        setMotivo(cita.motivo);

        setModoEditar(true);

        setMostrarModal(true);

    };

    const abrirEliminar = (id) => {

        setIdEliminar(id);

        setMostrarModalEliminar(true);

    };

    const eliminar = async () => {

        try {

            await eliminarCita(idEliminar);

            setMostrarModalEliminar(false);

            setIdEliminar(null);

            cargarCitas();

        } catch (error) {

            console.log(error);

        }

    };

    const citasPendientes = citas.filter(
        cita => cita.estado === "pendiente"
    );

    const historial = citas.filter(
        cita => cita.estado !== "pendiente"
    );

    return {

        // Listas
        clientes,
        citas,
        mascotas,
        mascotasCliente,

        // Tabs
        tabActiva,
        setTabActiva,

        // Modales
        mostrarModal,
        setMostrarModal,

        mostrarModalCliente,
        setMostrarModalCliente,

        mostrarModalMascota,
        setMostrarModalMascota,

        mostrarModalEliminar,
        setMostrarModalEliminar,

        // Cliente seleccionado
        idCliente,

        // Mascota seleccionada
        idMascota,
        setIdMascota,

        // Formulario cita
        fecha,
        setFecha,

        motivo,
        setMotivo,

        // Formularios
        nuevoCliente,
        setNuevoCliente,

        nuevaMascota,
        setNuevaMascota,

        // Funciones
        guardarCliente,
        guardarMascota,
        guardarCita,

        cargarMascotasCliente,

        cambiarEstado,

        // Tablas
        citasPendientes,
        historial,

        editar,
        eliminar,
        abrirEliminar,

        modoEditar,
        setModoEditar,

        idEditar,
        setIdEditar,

    };

}