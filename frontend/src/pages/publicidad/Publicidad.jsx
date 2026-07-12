import "../../css/publicidad.css";
import { useEffect, useState } from "react";

function Publicidad() {
  const [campanas, setCampanas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estados del archivo
  const [imagen, setImagen] = useState(""); // Guarda el Base64 (sea imagen o video)
  const [tipoArchivo, setTipoArchivo] = useState("image"); // 'image' o 'video'
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("activa");
  const [idEditar, setIdEditar] = useState(null);

  // Redes sociales y métricas
  const [plataforma, setPlataforma] = useState("Facebook");
  const [enlaceRedSocial, setEnlaceRedSocial] = useState("");
  const [datosGrafico, setDatosGrafico] = useState([]);

  useEffect(() => {
    obtenerCampanas();
    obtenerDatosGrafico();
  }, []);

  const obtenerCampanas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/publicidad");
      const data = await response.json();
      setCampanas(data.campanas || []);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerDatosGrafico = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/publicidad/clientes-mes");
      const data = await response.json();
      if (data.status === "success") {
        setDatosGrafico(data.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Abre el modal configurando automáticamente el tipo de contenido esperado
  const abrirModalNuevo = (tipo) => {
    limpiarFormulario();
    setTipoArchivo(tipo);
    if (tipo === "video") {
      setPlataforma("TikTok"); // Sugerencia por defecto para videos
    } else {
      setPlataforma("Facebook"); // Sugerencia por defecto para afiches
    }
    setMostrarModal(true);
  };

  const manejarSubidaArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      // Validar si es video o imagen dinámicamente por si el usuario se equivoca de archivo
      const esVideo = archivo.type.startsWith("video/");
      setTipoArchivo(esVideo ? "video" : "image");

      const lector = new FileReader();
      lector.onloadend = () => {
        setImagen(lector.result); 
      };
      lector.readAsDataURL(archivo);
    }
  };

  const registrarInteresYRedirigir = async (id, urlRedSocial) => {
    try {
      await fetch(`http://localhost:5000/api/publicidad/${id}/interes`, {
        method: "PUT"
      });
      obtenerCampanas();
      if (urlRedSocial) {
        window.open(urlRedSocial, "_blank");
      } else {
        alert("Esta campaña no tiene un enlace asignado.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editarCampana = (campana) => {
    setIdEditar(campana.id);
    setImagen(campana.imagen_url || "");
    
    // Detectar el tipo de archivo guardado basándose en la cabecera del Base64
    const esVideo = campana.imagen_url?.includes("data:video/");
    setTipoArchivo(esVideo ? "video" : "image");

    setFechaInicio(campana.fecha_inicio ? campana.fecha_inicio.substring(0, 10) : "");
    setFechaFin(campana.fecha_fin ? campana.fecha_fin.substring(0, 10) : "");
    setEstado(campana.estado || "activa");
    setPlataforma(campana.plataforma || "Facebook");
    setEnlaceRedSocial(campana.enlace_red_social || "");
    setMostrarModal(true);
  };

  const limpiarFormulario = () => {
    setIdEditar(null);
    setImagen("");
    setFechaInicio("");
    setFechaFin("");
    setEstado("activa");
    setPlataforma("Facebook");
    setEnlaceRedSocial("");
  };

  const guardarCampana = async () => {
    try {
      const url = idEditar
        ? `http://localhost:5000/api/publicidad/${idEditar}`
        : "http://localhost:5000/api/publicidad";

      const metodo = idEditar ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: `Campaña ${plataforma} (${tipoArchivo === "video" ? "Video" : "Afiche"})`, 
          descripcion: tipoArchivo === "video" ? "Video publicitario" : "Afiche publicitario", 
          imagen_url: imagen,
          fecha_inicio: fechaInicio || new Date().toISOString().substring(0, 10),
          fecha_fin: fechaFin || null,
          estado,
          id_usuario: 1,
          plataforma,            
          enlace_red_social: enlaceRedSocial 
        })
      });

      const data = await response.json();

      if (data.status === "success") {
        obtenerCampanas();
        limpiarFormulario();
        setMostrarModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarCampana = async (id) => {
    if (!window.confirm("¿Desea eliminar esta campaña?")) return;
    await fetch(`http://localhost:5000/api/publicidad/${id}`, { method: "DELETE" });
    obtenerCampanas();
  };

  return (
    <div>
      <div className="publicidad-header">
        <div>
          <h1>📢 Campañas Publicitarias</h1>
          <p>Gestión de promociones, afiches y videos cortos</p>
        </div>

        {/* Botones principales en la cabecera */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-nuevo" onClick={() => abrirModalNuevo("image")}>
            + Subir Afiche
          </button>
          <button className="btn-nuevo" style={{ backgroundColor: "#00b4d8" }} onClick={() => abrirModalNuevo("video")}>
            + Subir Video
          </button>
        </div>
      </div>

      {/* ====================================
          ESTADO VACÍO (CON LOS DOS BOTONES)
      ==================================== */}
      {campanas.length === 0 ? (
        <div className="empty-state" style={{ padding: "50px 20px" }}>
          <h2>📭 No hay afiches o campañas aún</h2>
          <p style={{ marginBottom: "20px" }}>Sube tu primer afiche publicitario o video promocional para comenzar</p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button className="btn-nuevo" onClick={() => abrirModalNuevo("image")}>
              Subir Afiche
            </button>
            <button className="btn-nuevo" style={{ backgroundColor: "#00b4d8" }} onClick={() => abrirModalNuevo("video")}>
              Subir Video
            </button>
          </div>
        </div>
      ) : (
        /* =========================
            TABLA DE CAMPAÑAS
        ========================= */
        <div className="panel">
          <table className="tabla">
            <thead>
              <tr>
                <th>Contenido</th>
                <th>Plataforma</th>
                <th>Interesados</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {campanas.map((campana) => {
                const esVideoArchivo = campana.imagen_url?.includes("data:video/");
                return (
                  <tr key={campana.id}>
                    <td>
                      {campana.imagen_url ? (
                        esVideoArchivo ? (
                          /* Vista miniatura para Video */
                          <div style={{ position: "relative", width: "60px", height: "60px", borderRadius: "6px", overflow: "hidden", background: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <video src={campana.imagen_url} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                            <span style={{ position: "absolute", fontSize: "18px" }}>🎬</span>
                          </div>
                        ) : (
                          /* Vista miniatura para Imagen */
                          <img 
                            src={campana.imagen_url} 
                            alt="Miniatura" 
                            style={{ width: "60px", height: "60px", borderRadius: "6px", objectFit: "cover", border: "1px solid #ddd" }} 
                          />
                        )
                      ) : (
                        <span style={{ color: "#999" }}>Sin archivo</span>
                      )}
                    </td>
                    <td>
                      <span className="badge-plataforma" style={{ padding: "4px 8px", backgroundColor: "#eee", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                        {campana.plataforma || "Facebook"}
                      </span>
                    </td>
                    <td>
                      <strong>🔥 {campana.personas_interesadas || 0}</strong> interesados
                    </td>
                    <td>{campana.fecha_inicio ? new Date(campana.fecha_inicio).toLocaleDateString() : "-"}</td>
                    <td>{campana.fecha_fin ? new Date(campana.fecha_fin).toLocaleDateString() : "-"}</td>
                    <td>{campana.estado}</td>
                    <td>
                      <button 
                        className="btn-publicar" 
                        onClick={() => registrarInteresYRedirigir(campana.id, campana.enlace_red_social)}
                        style={{ marginRight: "6px", backgroundColor: "#00c49f", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                      >
                        🚀 Ir
                      </button>
                      <button className="btn-editar" onClick={() => editarCampana(campana)}>
                        Editar
                      </button>
                      <button className="btn-eliminar" onClick={() => eliminarCampana(campana.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =========================================
          SECCIÓN DE GRÁFICOS Y MÉTRICAS
      ========================================= */}
      <div className="panel" style={{ marginTop: "30px", padding: "20px" }}>
        <h2>📈 Crecimiento Mensual de Clientes</h2>
        <p style={{ color: "#666" }}>Evidencia de adquisición de nuevos clientes posterior a las campañas publicitarias</p>
        
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", alignItems: "flex-end", minHeight: "160px", padding: "10px", borderLeft: "2px solid #ccc", borderBottom: "2px solid #ccc" }}>
          {datosGrafico.length === 0 ? (
            <p style={{ color: "#999", margin: "auto" }}>Esperando datos de registro de clientes...</p>
          ) : (
            datosGrafico.map((item, index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: "50px" }}>
                <div 
                  style={{ 
                    width: "35px", 
                    height: `${Math.max(item.cantidad * 20, 25)}px`, 
                    backgroundColor: "#1890ff", 
                    borderRadius: "4px 4px 0 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "11px",
                    paddingTop: "4px"
                  }}
                >
                  {item.cantidad}
                </div>
                <span style={{ fontSize: "10px", marginTop: "6px", color: "#555", whiteSpace: "nowrap" }}>{item.mes}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL INTELIGENTE (AFICHE / VIDEO) */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{idEditar ? "Editar Contenido" : `Nueva Campaña de ${tipoArchivo === "video" ? "Video" : "Afiche"}`}</h2>

            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              {tipoArchivo === "video" ? "Seleccionar Video Promocional:" : "Seleccionar Afiche / Imagen:"}
            </label>
            <input 
              type="file" 
              accept={tipoArchivo === "video" ? "video/*" : "image/*"} 
              onChange={manejarSubidaArchivo} 
              style={{ marginBottom: "15px" }}
            />
            
            {/* VISTA PREVIA ADAPTATIVA */}
            {imagen && (
              <div style={{ textAlign: "center", marginBottom: "15px" }}>
                {tipoArchivo === "video" ? (
                  <video 
                    src={imagen} 
                    controls 
                    style={{ maxWidth: "100%", maxHeight: "180px", borderRadius: "8px", border: "1px solid #e2e8f0" }} 
                  />
                ) : (
                  <img 
                    src={imagen} 
                    alt="Vista previa afiche" 
                    style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px", border: "1px solid #e2e8f0" }} 
                  />
                )}
              </div>
            )}
            
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              Red Social de Destino:
            </label>
            <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
              <option value="Otros">Otros</option>
            </select>

            <label style={{ display: "block", marginTop: "10px", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              Enlace de la publicación:
            </label>
            <input 
              placeholder={tipoArchivo === "video" ? "https://tiktok.com/@tu_video" : "https://facebook.com/tu_afiche"} 
              value={enlaceRedSocial} 
              onChange={(e) => setEnlaceRedSocial(e.target.value)} 
            />

            <label style={{ display: "block", marginTop: "10px", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              Fecha de Inicio:
            </label>
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

            <label style={{ display: "block", marginTop: "10px", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              Fecha de Vencimiento:
            </label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

            <label style={{ display: "block", marginTop: "10px", marginBottom: "5px", fontWeight: "bold", fontSize: "14px", color: "#334155" }}>
              Estado:
            </label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="activa">Activa</option>
              <option value="programada">Programada</option>
              <option value="vencida">Vencida</option>
            </select>

            <div className="modal-buttons">
              <button className="btn-cancelar" onClick={() => { limpiarFormulario(); setMostrarModal(false); }}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={guardarCampana}>
                Guardar Publicidad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publicidad;