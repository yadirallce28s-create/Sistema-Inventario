import "../../css/citas.css";

import useCitas from "./useCitas";

import ModalCliente from "./ModalCliente";
import ModalMascota from "./ModalMascota";
import ModalCita from "./ModalCita";

import TablaPendientes from "./TablaPendientes";
import TablaHistorial from "./TablaHistorial";
import ModalEliminar from "./ModalEliminar";

function Citas() {

  const {

    // Listas
    clientes,
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

    // Selección
    idCliente,

    idMascota,
    setIdMascota,

    // Formulario
    fecha,
    setFecha,

    motivo,
    setMotivo,

    nuevoCliente,
    setNuevoCliente,

    nuevaMascota,
    setNuevaMascota,

    // Funciones
    guardarCita,
    guardarCliente,
    guardarMascota,

    cargarMascotasCliente,

    // Tablas
    citasPendientes,
    historial,

    cambiarEstado,
    editar,
    abrirEliminar,
    eliminar
  } = useCitas();

  return (

    <div>

      <div className="citas-header">

        <h1>Citas</h1>

        <p className="subtitulo">
          Gestión y programación de citas veterinarias
        </p>

        <button
          className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Agendar Cita
        </button>

      </div>

      <div className="tabs">

        <button
          className={`tab ${tabActiva === "pendientes" ? "active" : ""}`}
          onClick={() => setTabActiva("pendientes")}
        >
          Citas Pendientes
        </button>

        <button
          className={`tab ${tabActiva === "historial" ? "active" : ""}`}
          onClick={() => setTabActiva("historial")}
        >
          Historial
        </button>

      </div>

      {

        tabActiva === "pendientes" && (

          <TablaPendientes

            citasPendientes={citasPendientes}

            atenderCita={cambiarEstado}
            
            editar={editar}

            abrirEliminar={abrirEliminar}
            

          />

        )

      }

      {

        tabActiva === "historial" && (

          <TablaHistorial

            historial={historial}

          />

        )

      }

      <ModalCita

        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}

        fecha={fecha}
        setFecha={setFecha}

        motivo={motivo}
        setMotivo={setMotivo}

        clientes={clientes}

        idCliente={idCliente}

        idMascota={idMascota}
        setIdMascota={setIdMascota}

        mascotasCliente={mascotasCliente}

        cargarMascotasCliente={cargarMascotasCliente}

        guardarCita={guardarCita}

        setMostrarModalCliente={setMostrarModalCliente}
        setMostrarModalMascota={setMostrarModalMascota}

      />

      <ModalCliente

        mostrar={mostrarModalCliente}

        cerrar={() => setMostrarModalCliente(false)}

        nuevoCliente={nuevoCliente}
        setNuevoCliente={setNuevoCliente}

        guardarCliente={guardarCliente}

      />

      <ModalMascota

        mostrar={mostrarModalMascota}

        cerrar={() => setMostrarModalMascota(false)}

        nuevaMascota={nuevaMascota}
        setNuevaMascota={setNuevaMascota}

        guardarMascota={guardarMascota}

      />
      <ModalEliminar

        mostrar={mostrarModalEliminar}

        cerrar={() => setMostrarModalEliminar(false)}

        eliminar={eliminar}

      />

    </div>

  );

}

export default Citas;