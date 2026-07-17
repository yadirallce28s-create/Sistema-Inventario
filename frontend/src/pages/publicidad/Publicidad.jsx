import "../../css/publicidad.css";
import { useEffect, useState } from "react";

function Publicidad() {
  const [campanas, setCampanas] = useState([]);
  
  // Control de Modales y Desplegables
  const [modalAbierto, setModalAbierto] = useState(null); // 'subir', 'aplicar', 'consultar'
  const [campanaSeleccionada, setCampanaSeleccionada] = useState(null);
  const [mostrarGrafico, setMostrarGrafico] = useState(false); // Estado para el botón desplegable

  // Estados del formulario para Subir/Editar Afiche (Campaña)
  const [imagen, setImagen] = useState("");
  const [tipoArchivo, setTipoArchivo] = useState("image");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("activa");
  const [plataforma, setPlataforma] = useState("Facebook");
  const [enlaceRedSocial, setEnlaceRedSocial] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idEditar, setIdEditar] = useState(null);

  // Estados del Formulario "Aplicar Promoción"
  const [precioOriginal, setPrecioOriginal] = useState("");
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState("");
  const [precioDescuento, setPrecioDescuento] = useState(0);
  const [metodoPago, setMetodoPago] = useState("Efectivo / Transferencia");

  // Métricas del gráfico
  const [datosGrafico, setDatosGrafico] = useState([]);

  useEffect(() => {
    obtenerCampanas();
    obtenerDatosGrafico();
  }, []);

  // Calcular automáticamente el precio de descuento
  useEffect(() => {
    const original = parseFloat(precioOriginal) || 0;
    const desc = parseFloat(descuentoPorcentaje) || 0;
    if (original > 0) {
      const final = original - (original * (desc / 100));
      setPrecioDescuento(final.toFixed(2));
    } else {
      setPrecioDescuento(0);
    }
  }, [precioOriginal, descuentoPorcentaje]);

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

  const abrirModalNuevo = (tipo) => {
    limpiarFormularioCampana();
    setTipoArchivo(tipo);
    setPlataforma(tipo === "video" ? "TikTok" : "Facebook");
    setModalAbierto("subir");
  };

  const manejarSubidaArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const esVideo = archivo.type.startsWith("video/");
      setTipoArchivo(esVideo ? "video" : "image");

      const lector = new FileReader();
      lector.onloadend = () => {
        setImagen(lector.result); 
      };
      lector.readAsDataURL(archivo);
    }
  };

  const limpiarFormularioCampana = () => {
    setIdEditar(null);
    setImagen("");
    setTitulo("");
    setDescripcion("");
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
          titulo: titulo || `Campaña ${plataforma}`, 
          descripcion: descripcion || "Sin descripción", 
          imagen_url: imagen,
          fecha_inicio: fechaInicio || new Date().toISOString().substring(0, 10),
          fecha_fin: fechaFin || null,
          estado,
          id_usuario: 1,
          plataforma,            
          enlace_red_social: enlaceRedSocial,
          personas_interesadas: campanaSeleccionada?.personas_interesadas || 0
        })
      });

      const data = await response.json();
      if (data.status === "success") {
        obtenerCampanas();
        setModalAbierto(null);
        limpiarFormularioCampana();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const iniciarEditar = (campana) => {
    setIdEditar(campana.id);
    setImagen(campana.imagen_url || "");
    const esVideo = campana.imagen_url?.includes("data:video/");
    setTipoArchivo(esVideo ? "video" : "image");
    setTitulo(campana.titulo || "");
    setDescripcion(campana.descripcion || "");
    setFechaInicio(campana.fecha_inicio ? campana.fecha_inicio.substring(0, 10) : "");
    setFechaFin(campana.fecha_fin ? campana.fecha_fin.substring(0, 10) : "");
    setEstado(campana.estado || "activa");
    setPlataforma(campana.plataforma || "Facebook");
    setEnlaceRedSocial(campana.enlace_red_social || "");
    setCampanaSeleccionada(campana);
    setModalAbierto("subir");
  };

  const eliminarCampana = async (id) => {
    if (!window.confirm("¿Desea eliminar esta campaña?")) return;
    await fetch(`http://localhost:5000/api/publicidad/${id}`, { method: "DELETE" });
    obtenerCampanas();
  };

  // BOTÓN "APLICAR": Incrementa el contador de interesados al guardar
  const enviarAplicarPromocion = async () => {
    if (!precioOriginal) {
      alert("Por favor ingresa un precio original");
      return;
    }
    try {
      await fetch("http://localhost:5000/api/publicidad/interesado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id_campana: campanaSeleccionada.id,
          descuento_porcentaje: parseFloat(descuentoPorcentaje) || 0,
          precio_original: parseFloat(precioOriginal),
          precio_descuento: parseFloat(precioDescuento),
          metodo_pago: metodoPago
        })
      });
      
      alert("¡Promoción aplicada correctamente!");
      
      // Actualización visual reactiva e inmediata del contador de interesados
      setCampanas(prevCampanas => 
        prevCampanas.map(item => 
          item.id === campanaSeleccionada.id 
            ? { ...item, personas_interesadas: (item.personas_interesadas || 0) + 1 }
            : item
        )
      );
      obtenerDatosGrafico();

      setModalAbierto(null);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* CABECERA GENERAL */}
      <div className="publicidad-header">
        <div>
          <h1>📢 Campañas Publicitarias</h1>
          <p>Gestión de promociones, afiches y videos cortos</p>
        </div>

        <div className="header-btn-group">
          <button className="btn-nuevo" onClick={() => abrirModalNuevo("image")}>
            + Subir Afiche
          </button>
          <button className="btn-nuevo btn-nuevo-video" onClick={() => abrirModalNuevo("video")}>
            + Subir Video
          </button>
        </div>
      </div>

      {/* GRID DE TARJETAS */}
      {campanas.length === 0 ? (
        <div className="empty-state-container">
          <p style={{ color: '#9ca3af' }}>No hay afiches o campañas creadas en este momento.</p>
        </div>
      ) : (
        <div className="campanas-grid">
          {campanas.map((campana) => {
            const esVideoArchivo = campana.imagen_url?.includes("data:video/");
            return (
              <div className="campana-card" key={campana.id}>
                <div className="card-media-wrapper">
                  {campana.imagen_url ? (
                    esVideoArchivo ? (
                      <video src={campana.imagen_url} controls />
                    ) : (
                      <img src={campana.imagen_url} alt="Afiche Campaña" />
                    )
                  ) : (
                    <div className="card-media-placeholder">Sin Multimedia</div>
                  )}
                </div>

                <div className="card-info">
                  <div>
                    <h3>{campana.titulo || "Sin título"}</h3>
                    <p>{campana.descripcion || "Sin descripción asignada."}</p>
                  </div>

                  <div className="card-meta-tags">
                    <span className="card-badge-plataforma">{campana.plataforma || "Redes"}</span>
                    <span style={{ fontWeight: '600', color: '#f59e0b' }}>
                      🔥 {campana.personas_interesadas || 0} interesados
                    </span>
                  </div>

                  <div className="card-btn-group">
                    <button 
                      className="btn-card-aplicar"
                      onClick={() => {
                        setCampanaSeleccionada(campana);
                        setPrecioOriginal("");
                        setDescuentoPorcentaje("");
                        setModalAbierto("aplicar");
                      }}
                    >
                      Aplicar
                    </button>
                    <button 
                      className="btn-card-consultar"
                      onClick={() => {
                        setCampanaSeleccionada(campana);
                        setModalAbierto("consultar");
                      }}
                    >
                      Consultar
                    </button>
                    <a 
                      href={campana.enlace_red_social || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-card-abrir"
                    >
                      Abrir
                    </a>
                  </div>
                </div>

                <div className="card-admin-actions">
                  <button className="btn-card-edit" onClick={() => iniciarEditar(campana)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-card-delete" onClick={() => eliminarCampana(campana.id)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==========================================================================
          BOTÓN DESPLEGABLE CON EL GRÁFICO (REPORTE LIMPIO DE SISTEMA)
         ========================================================================== */}
      <button 
        className="desplegable-grafico-btn" 
        onClick={() => setMostrarGrafico(!mostrarGrafico)}
      >
        <span>📊 Crecimiento mensual de clientes</span>
        <span className={`icono-flecha ${mostrarGrafico ? 'rotado' : ''}`}>▼</span>
      </button>

      <div className={`desplegable-grafico-contenido ${mostrarGrafico ? 'abierto' : ''}`}>
        <div className="panel grafico-wrapper" style={{ margin: 0, background: 'transparent', border: 'none' }}>
          
          <div className="grafico-ejes">
            {datosGrafico.length === 0 ? (
              <p className="grafico-sin-datos">Esperando datos de registro de clientes...</p>
            ) : (
              datosGrafico.map((item, index) => (
                <div key={index} className="grafico-columna-container">
                  <div 
                    className="grafico-barra"
                    style={{ height: `${Math.max(item.cantidad * 20, 25)}px` }}
                  >
                    {item.cantidad}
                  </div>
                  <span className="grafico-etiqueta-mes">{item.mes}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: ME INTERESA / APLICAR PROMOCIÓN */}
      {modalAbierto === "aplicar" && campanaSeleccionada && (
        <div className="publicidad-modal-overlay">
          <div className="publicidad-modal">
            <div className="modal-header-dark">
              <h2>Aplicar Promoción</h2>
              <button className="btn-cerrar-modal" onClick={() => setModalAbierto(null)}>✕</button>
            </div>
            <div className="publicidad-modal-body">
              <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '15px' }}>
                Aplicar promoción para: <strong>{campanaSeleccionada.titulo}</strong>
              </p>

              <label>Precio original (S/):</label>
              <input 
                type="number" 
                placeholder="Ej. 120"
                value={precioOriginal}
                onChange={(e) => setPrecioOriginal(e.target.value)}
              />

              <label>Descuento (%):</label>
              <input 
                type="number" 
                placeholder="Ej. 20"
                value={descuentoPorcentaje}
                onChange={(e) => setDescuentoPorcentaje(e.target.value)}
              />

              <label>Precio Con descuento:</label>
              <input 
                type="text" 
                readOnly 
                value={`S/ ${precioDescuento}`} 
                style={{ backgroundColor: '#1e1e1e', cursor: 'not-allowed' }}
              />

              <label>Método de pago:</label>
              <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                <option value="Efectivo / Transferencia">Efectivo / Transferencia</option>
                <option value="Yape / Plin">Yape / Plin</option>
                <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              </select>
            </div>
            <div className="publicidad-modal-buttons">
              <button className="btn-publicidad-cancelar" onClick={() => setModalAbierto(null)}>Cancelar</button>
              <button className="btn-publicidad-guardar" onClick={enviarAplicarPromocion}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CONSULTA */}
      {modalAbierto === "consultar" && campanaSeleccionada && (
        <div className="publicidad-modal-overlay">
          <div className="publicidad-modal">
            <div className="modal-header-dark">
              <h2>Consultas</h2>
              <button className="btn-cerrar-modal" onClick={() => setModalAbierto(null)}>✕</button>
            </div>
            <div className="publicidad-modal-body">
              <p style={{ fontSize: '15px', color: '#3b82f6', fontWeight: 'bold' }}>Detalles de la promoción</p>
              
              <label>Descripción:</label>
              <textarea 
                rows="4" 
                readOnly 
                value={campanaSeleccionada.descripcion || "Sin descripción detallada."} 
                style={{ backgroundColor: '#1e1e1e', resize: 'none', cursor: 'not-allowed' }}
              />

              <div className="consultar-estado-box">
                ESTADO: <strong>{campanaSeleccionada.estado?.toUpperCase() || "ACTIVO"}</strong>
              </div>
            </div>
            <div className="publicidad-modal-buttons">
              <button className="btn-publicidad-cancelar" onClick={() => setModalAbierto(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SUBIR AFICHE / VIDEO */}
      {modalAbierto === "subir" && (
        <div className="publicidad-modal-overlay">
          <div className="publicidad-modal">
            <div className="modal-header-dark">
              <h2>{idEditar ? "Editar Publicidad" : "Subir Afiche / Video"}</h2>
              <button className="btn-cerrar-modal" onClick={() => setModalAbierto(null)}>✕</button>
            </div>
            <div className="publicidad-modal-body">
              <label>Seleccionar archivo:</label>
              <input 
                type="file" 
                accept={tipoArchivo === "video" ? "video/*" : "image/*"} 
                onChange={manejarSubidaArchivo}
                style={{ marginBottom: '10px' }}
              />

              {imagen && (
                <div className="modal-preview-container" style={{ textAlign: 'center', marginBottom: '10px' }}>
                  {tipoArchivo === "video" ? (
                    <video src={imagen} controls style={{ maxWidth: '100%', maxHeight: '120px' }} />
                  ) : (
                    <img src={imagen} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '120px' }} />
                  )}
                </div>
              )}

              <label>Título:</label>
              <input 
                placeholder="Título del Afiche o Video" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
              />

              <label>Descripción (BREVE):</label>
              <textarea 
                rows="3"
                placeholder="Ingresa la descripción..."
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                style={{ resize: 'none' }}
              />

              <label>Red Social Destino:</label>
              <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube">YouTube</option>
                <option value="Otros">Otros</option>
              </select>

              <label>Enlace de la publicación:</label>
              <input 
                placeholder="https://instagram.com/tu_afiche" 
                value={enlaceRedSocial} 
                onChange={(e) => setEnlaceRedSocial(e.target.value)} 
              />

              <label>Fecha Inicio:</label>
              <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />

              <label>Fecha Fin:</label>
              <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

              <label>Estado:</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="activa">Activa</option>
                <option value="programada">Programada</option>
                <option value="vencida">Vencida</option>
              </select>
            </div>
            <div className="publicidad-modal-buttons">
              <button className="btn-publicidad-cancelar" onClick={() => setModalAbierto(null)}>Cancelar</button>
              <button className="btn-publicidad-guardar" onClick={guardarCampana}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publicidad;