import "../../css/inventario.css";
import { useEffect, useState } from "react";

function Proveedores() {

  const [proveedores, setProveedores] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const obtenerProveedores = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/proveedores"
      );

      const data = await response.json();

      setProveedores(data.proveedores);

    } catch (error) {
      console.error(error);
    }

  };

  const guardarProveedor = async () => {

    try {

      await fetch(
        "http://localhost:5000/api/proveedores",
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