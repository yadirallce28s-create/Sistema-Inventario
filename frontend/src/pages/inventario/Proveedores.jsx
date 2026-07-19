import "../../css/inventario.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Proveedores() {

  const [proveedores, setProveedores] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    setMostrarModal(false);

    obtenerProveedores();

    Swal.fire({
      icon: "success",
      title: "Proveedor registrado",
      text: "El proveedor se registró correctamente.",
      timer: 1800,
      showConfirmButton: false
    });
  }, []);

  const obtenerProveedores = async () => {

    try {

      const response = await fetch(
        "https://sistema-inventario-95aj.onrender.com/api/proveedores"
      );

      const data = await response.json();

      setProveedores(data.proveedores);

    } catch (error) {
      console.error(error);
    }

  };

  const guardarProveedor = async () => {
    if (
      !nombre ||
      !contacto ||
      !telefono
    ) {

      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "Complete todos los campos obligatorios."
      });

      return;
    }

    try {

      await fetch(
        "https://sistema-inventario-95aj.onrender.com/api/proveedores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre,
            contacto,
            telefono,
            email,
            direccion
          })
        }
      );

      setNombre("");
      setContacto("");
      setTelefono("");
      setEmail("");
      setDireccion("");

      setMostrarModal(false);

      obtenerProveedores();

    } catch (error) {
      console.error(error);
    }

  };
  const contactar = (proveedor) => {

    Swal.fire({

      title: proveedor.nombre,

      html: `
            <b>Contacto:</b> ${proveedor.contacto}<br>
            <b>Teléfono:</b> ${proveedor.telefono}<br>
            <b>Correo:</b> ${proveedor.email}<br>
            <b>Dirección:</b> ${proveedor.direccion}
        `,

      icon: "info",
      confirmButtonText: "Cerrar"

    });

  };

  return (

    <div>

      <div className="inventario-header">

        <div>

          <h1>🏢 Directorio de Proveedores</h1>

          <p className="subtitulo">
            Gestión de proveedores veterinarios
          </p>

        </div>

        <button
          className="btn-nuevo"
          onClick={() => setMostrarModal(true)}
        >
          + Nuevo Proveedor
        </button>

      </div>

      <div className="panel">

        <table className="tabla">

          <thead>

            <tr>

              <th>Empresa</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {proveedores.map((proveedor) => (

              <tr key={proveedor.id}>

                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>{proveedor.direccion}</td>
                <td>

                  <button
                    className="btn-editar"
                    onClick={() => contactar(proveedor)}
                  >
                    Contactar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {

        mostrarModal && (

          <div className="modal-overlay">

            <div className="modal">

              <h2>Nuevo Proveedor</h2>

              <input
                placeholder="Empresa"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
              />

              <input
                placeholder="Contacto"
                value={contacto}
                onChange={(e) =>
                  setContacto(e.target.value)
                }
              />

              <input
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) =>
                  setTelefono(e.target.value)
                }
              />

              <input
                placeholder="Correo"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                placeholder="Dirección"
                value={direccion}
                onChange={(e) =>
                  setDireccion(e.target.value)
                }
              />

              <div className="modal-buttons">

                <button
                  className="btn-cancelar"
                  onClick={() =>
                    setMostrarModal(false)
                  }
                >
                  Cancelar
                </button>

                <button
                  className="btn-guardar"
                  onClick={guardarProveedor}
                >
                  Guardar
                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

}

export default Proveedores;