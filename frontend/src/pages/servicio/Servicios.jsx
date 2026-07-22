import "../../css/servicio.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faConciergeBell } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function Servicios() {

  const [tabActiva, setTabActiva] = useState("catalogo");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [idEditar, setIdEditar] = useState(null);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");

  useEffect(() => {
    obtenerServicios();
  }, []);

  const guardarServicio = async () => {
    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !duracion
    ) {

      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Complete todos los campos antes de continuar."
      });

      return;
    }

    try {

     

      if (idEditar) {
        console.log("ID:", idEditar);

        console.log({
          nombre,
          descripcion,
          precio,
          duracion_minutos: duracion
        });
        await fetch(
          `https://sistema-inventario-95aj.onrender.com/api/servicios/${idEditar}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nombre,
              descripcion,
              precio,
              duracion_minutos: duracion
            })
          }
        );

      } else {

        await fetch(
          "https://sistema-inventario-95aj.onrender.com/api/servicios",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nombre,
              descripcion,
              precio,
              duracion_minutos: duracion
            })
          }
        );

      }

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setDuracion("");
      setIdEditar(null);
      await obtenerServicios();

      setMostrarModal(false);
      Swal.fire({
        icon: "success",
        title: idEditar ? "Servicio actualizado" : "Servicio registrado",
        text: idEditar
          ? "El servicio se actualizó correctamente."
          : "El servicio se registró correctamente.",
        timer: 1800,
        showConfirmButton: false
      });

    } catch (error) {

      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el servicio."
      });

    }

  };
  const obtenerServicios = async () => {
    try {
      const response = await fetch("https://sistema-inventario-95aj.onrender.com/api/servicios");
      const data = await response.json();

      setServicios(data.servicios);

    } catch (error) {
      console.log(error);
    }
};
  const editarServicio = (servicio) => {

    setIdEditar(servicio.id);

    setNombre(servicio.nombre);

    setDescripcion(servicio.descripcion);

    setPrecio(servicio.precio);

    setDuracion(servicio.duracion_minutos);

    setMostrarModal(true);

  };


  return (
    <div>

      <div className="servicios-header">
        <h1> <FontAwesomeIcon icon={faConciergeBell} color="#429a85" /> Gestión de servicios</h1>

        <button
          className="btn-nuevo"
          onClick={() => {
            setIdEditar(null);
            setNombre("");
            setDescripcion("");
            setPrecio("");
            setDuracion("");
            setMostrarModal(true);
          }}
        >
          + Nuevo Servicio
        </button>
      </div>

      <div className="tabs">

        <button
          className={`tab ${tabActiva === "catalogo" ? "active" : ""}`}
          onClick={() => setTabActiva("catalogo")}
        >
          Catálogo
        </button>

        <button
          className={`tab ${tabActiva === "historial" ? "active" : ""}`}
          onClick={() => setTabActiva("historial")}
        >
          Historial Médico
        </button>

      </div>
      {
        mostrarModal && (
          <div className="modal-overlay">

            <div className="modal">

              <h2>
                {idEditar ? "Editar Servicio" : "Nuevo Servicio"}
              </h2>

              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />

              <input
                type="number"
                placeholder="Duración (min)"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              />

              <div className="modal-buttons">

                <button
                  className="btn-guardar"
                  onClick={guardarServicio}
                >
                  {idEditar ? "Actualizar" : "Guardar"}
                </button>

                <button
                  className="btn-cancelar"
                  onClick={() => {

                    setMostrarModal(false);
                    setIdEditar(null);
                    setNombre("");
                    setDescripcion("");
                    setPrecio("");
                    setDuracion("");
                  }}
                >
                  Cancelar
                </button>

              </div>

            </div>

          </div>
        )
      }

      {tabActiva === "catalogo" && (
        <>
          <div className="servicios-grid">

            {servicios.map((servicio) => (

              <div
                className="servicio-card"
                key={servicio.id}
              >

                <h3>{servicio.nombre}</h3>

                <h4>
                  S/. {servicio.precio}
                </h4>

                <p>
                  {servicio.descripcion}
                </p>

                <small>
                  Duración:
                  {" "}
                  {servicio.duracion_minutos}
                  {" "}minutos
                </small>

                <br />

                <span className="activo">
                  Activo
                </span>
                <br />

                <button
                  className="btn-editar"
                  onClick={() => editarServicio(servicio)}
                >
                  Editar
                </button>

              </div>

            ))}

          </div>

          <div className="panel">

            <h3>Citas de hoy</h3>

            <table className="tabla">

              <tbody>

                <tr>
                  <td>9:00</td>
                  <td>Luna — Golden Retriever</td>
                  <td>
                    <span className="confirmada">
                      Confirmada
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>10:30</td>
                  <td>Max — Husky</td>
                  <td>
                    <span className="pendiente">
                      Pendiente
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>
        </>
      )}
      {tabActiva === "historial" && (

        <div className="panel">

          <h3>Historial Médico</h3>

          <table className="tabla">

            <thead>

              <tr>

                <th>Fecha</th>
                <th>Mascota</th>
                <th>Propietario</th>
                <th>Servicio</th>
                <th>Diagnóstico</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td>15/07/2026</td>
                <td>Luna</td>
                <td>María Pérez</td>
                <td>Consulta General</td>
                <td>Vacunación completa</td>

              </tr>

              <tr>

                <td>14/07/2026</td>
                <td>Max</td>
                <td>Carlos Díaz</td>
                <td>Baño y Corte</td>
                <td>Sin observaciones</td>

              </tr>

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default Servicios;