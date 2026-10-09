// =========================================================
// KARSAN DIGITAL CRM
// DASHBOARD ADMINISTRADOR
// =========================================================

import { mostrarCalendario } from "./Calendario";

// =========================================================
// INTERFACES
// =========================================================

interface Cliente {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
  empresa: string;
}

interface Empresa {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
}

interface Marca {
  id?: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

interface Campana {
  id?: number;
  nombre: string;
  redSocial: string;
  descripcion: string;
  estado: string;
  imagenes?: ArchivoMeta[];
  videos?: ArchivoMeta[];
}

interface ArchivoMeta {
  nombre: string;
  tipo: string;
  tamaño: number;
}

interface Proyecto {
  id?: number;
  nombre: string;
  cliente: string;
  descripcion: string;
  estado: string;
  enviado?: boolean;
}

interface Documento {
  id: number;
  nombre: string;
  tipo: string;
  correo: string;
  fecha: string;
  estado?: string;
  usuario?: string;
  url?: string;
}

// =========================================================
// UTILIDADES
// =========================================================

function guardarLocalStorage<T>(clave: string, valor: T): void {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function leerLocalStorage<T>(
  clave: string,
  valorPorDefecto: T
): T {
  try {
    const dato = localStorage.getItem(clave);

    if (!dato) {
      return valorPorDefecto;
    }

    return JSON.parse(dato) as T;
  } catch {
    return valorPorDefecto;
  }
}

function obtenerValorInput(
  app: HTMLElement,
  id: string
): string {
  const elemento = app.querySelector<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >(`#${id}`);

  return elemento?.value?.trim() || "";
}

function obtenerValorInputAdmin(
  app: HTMLElement,
  id: string
): string {
  return obtenerValorInput(app, id);
}

function escaparHTML(valor: unknown): string {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function obtenerInicial(valor: string): string {
  return valor?.trim()?.charAt(0)?.toUpperCase() || "K";
}

function generarId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function formatearFecha(fecha: string): string {
  if (!fecha) {
    return "";
  }

  const partes = fecha.split("/");

  if (partes.length === 3) {
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  return fecha;
}

function mostrarMensaje(
  mensaje: string,
  tipo: "success" | "error" = "success"
): void {
  const existente = document.querySelector(".crm-toast");

  if (existente) {
    existente.remove();
  }

  const toast = document.createElement("div");

  toast.className = `crm-toast ${tipo}`;
  toast.textContent = mensaje;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// =========================================================
// DASHBOARD PRINCIPAL
// =========================================================

export function mostrarDashboardAdmin(app: HTMLElement): void {
  app.innerHTML = `
    <div class="crm-app">

      <aside class="crm-sidebar" id="crmSidebar">

        <div class="crm-logo">
          <div class="crm-logo-icon">K</div>

          <div>
            <strong>KARSAN</strong>
            <span>DIGITAL</span>
          </div>
        </div>

        <div class="crm-admin-profile">
          <div class="crm-avatar">A</div>

          <div>
            <strong>Administrador</strong>
            <span>Administrador</span>
          </div>
        </div>

        <nav class="crm-nav">

          <div class="crm-nav-title">PRINCIPAL</div>

          <button class="crm-nav-item active" data-seccion="inicio">
            <span>▦</span>
            Dashboard
          </button>

          <button class="crm-nav-item" data-seccion="clientes">
            <span>👥</span>
            Clientes
          </button>

          <button class="crm-nav-item" data-seccion="empresas">
            <span>🏢</span>
            Empresas
          </button>

          <button class="crm-nav-item" data-seccion="marcas">
            <span>⭐</span>
            Marcas colaboradoras
          </button>

          <button class="crm-nav-item" data-seccion="marketing">
            <span>📣</span>
            Marketing
          </button>

          <button class="crm-nav-item" data-seccion="proyectos">
            <span>📁</span>
            Proyectos
          </button>

          <div class="crm-nav-title">COMUNICACIÓN</div>

          <button class="crm-nav-item" data-seccion="redes">
            <span>📱</span>
            Redes sociales
          </button>

          <button class="crm-nav-item" data-seccion="mensajes">
            <span>💬</span>
            Mensajes
            <span class="crm-badge">4</span>
          </button>

          <button class="crm-nav-item" data-seccion="chatbot">
            <span>🤖</span>
            Chatbot
          </button>

          <div class="crm-nav-title">ADMINISTRACIÓN</div>

          <button class="crm-nav-item" data-seccion="documentos">
            <span>🧾</span>
            Comprobantes
          </button>

          <button class="crm-nav-item" data-seccion="calendario">
            <span>📅</span>
            Calendario
          </button>

          <button class="crm-nav-item" data-seccion="reportes">
            <span>📊</span>
            Reportes
          </button>

          <button class="crm-nav-item" data-seccion="notificaciones">
            <span>🔔</span>
            Notificaciones
            <span class="crm-badge">3</span>
          </button>

          <button class="crm-nav-item" data-seccion="configuracion">
            <span>⚙️</span>
            Configuración
          </button>

        </nav>

        <button class="crm-logout" id="btnCerrarSesionAdmin">
          <span>↪</span>
          Cerrar sesión
        </button>

      </aside>

      <main class="crm-main">

        <header class="crm-header">

          <button class="crm-menu-mobile" id="btnMenuAdmin">
            ☰
          </button>

          <div>
            <h1 id="tituloAdmin">Dashboard</h1>
            <p>Panel de administración de Karsan Digital</p>
          </div>

          <div class="crm-header-actions">

            <button
              class="crm-notification-button"
              id="btnNotificacionesAdmin"
            >
              🔔
            </button>

            <div class="crm-header-user">
              <div class="crm-avatar small">A</div>

              <div>
                <strong>Administrador</strong>
                <span>Administrador</span>
              </div>
            </div>

          </div>

        </header>

        <section
          id="contenidoAdmin"
          class="crm-content"
        ></section>

      </main>

    </div>
  `;

  configurarEventosAdmin(app);

  mostrarSeccionAdmin(app, "inicio");
}

// =========================================================
// EVENTOS DEL ADMINISTRADOR
// =========================================================

function configurarEventosAdmin(app: HTMLElement): void {

  const botones = app.querySelectorAll<HTMLElement>(
    ".crm-nav-item"
  );

  botones.forEach((boton) => {

    boton.addEventListener("click", () => {

      const seccion = boton.dataset.seccion;

      if (!seccion) {
        return;
      }

      actualizarMenuAdmin(app, seccion);

      mostrarSeccionAdmin(app, seccion);

      const sidebar = app.querySelector("#crmSidebar");

      sidebar?.classList.remove("active");

    });

  });

  const menuMobile = app.querySelector(
    "#btnMenuAdmin"
  );

  menuMobile?.addEventListener("click", () => {

    const sidebar = app.querySelector("#crmSidebar");

    sidebar?.classList.toggle("active");

  });

  const cerrarSesion = app.querySelector(
    "#btnCerrarSesionAdmin"
  );

  cerrarSesion?.addEventListener("click", () => {

    localStorage.removeItem("usuarioActual");

    window.location.reload();

  });

  const notificaciones = app.querySelector(
    "#btnNotificacionesAdmin"
  );

  notificaciones?.addEventListener("click", () => {

    actualizarMenuAdmin(app, "notificaciones");

    mostrarSeccionAdmin(app, "notificaciones");

  });

}

// =========================================================
// MENU
// =========================================================

function actualizarMenuAdmin(
  app: HTMLElement,
  seccion: string
): void {

  const botones = app.querySelectorAll<HTMLElement>(
    ".crm-nav-item"
  );

  botones.forEach((boton) => {

    boton.classList.toggle(
      "active",
      boton.dataset.seccion === seccion
    );

  });

  const titulos: Record<string, string> = {
    inicio: "Dashboard",
    clientes: "Clientes",
    empresas: "Empresas",
    marcas: "Marcas colaboradoras",
    marketing: "Marketing",
    proyectos: "Proyectos",
    redes: "Redes sociales",
    mensajes: "Mensajes",
    chatbot: "Chatbot",
    documentos: "Comprobantes",
    calendario: "Calendario",
    reportes: "Reportes",
    notificaciones: "Notificaciones",
    configuracion: "Configuración"
  };

  const titulo = app.querySelector("#tituloAdmin");

  if (titulo) {
    titulo.textContent =
      titulos[seccion] || "Dashboard";
  }

}

// =========================================================
// CAMBIO DE SECCIONES
// =========================================================

function mostrarSeccionAdmin(
  app: HTMLElement,
  seccion: string
): void {

  const contenido = app.querySelector<HTMLElement>(
    "#contenidoAdmin"
  );

  if (!contenido) {
    return;
  }

  switch (seccion) {

    case "inicio":
      mostrarInicioAdmin(contenido);
      break;

    case "clientes":
      mostrarClientesAdmin(contenido);
      break;

    case "empresas":
      mostrarEmpresasAdmin(contenido);
      break;

    case "marcas":
      // CORREGIDO
      mostrarMarcasAdmin(contenido);
      break;

    case "marketing":
      mostrarMarketingAdmin(contenido);
      break;

    case "proyectos":
      mostrarProyectosAdmin(contenido);
      break;

    case "redes":
      mostrarRedesSocialesAdmin(contenido);
      break;

    case "mensajes":
      mostrarMensajesAdmin(contenido);
      break;

    case "chatbot":
      mostrarChatbotAdmin(contenido);
      break;

    case "documentos":
      mostrarDocumentosAdmin(contenido);
      break;

    case "calendario":
      mostrarCalendario(contenido, "admin");
      break;

    case "reportes":
      mostrarReportesAdmin(contenido);
      break;

    case "notificaciones":
      mostrarNotificacionesAdmin(contenido);
      break;

    case "configuracion":
      mostrarConfiguracionAdmin(contenido);
      break;

    default:
      mostrarInicioAdmin(contenido);
  }

}

// =========================================================
// INICIO
// =========================================================

function mostrarInicioAdmin(
  contenido: HTMLElement
): void {

  // =========================================================
  // DATOS DEL CRM
  // =========================================================

  const clientes =
    leerLocalStorage<any[]>("karsan_clientes", []);

  const empresas =
    leerLocalStorage<any[]>("karsan_empresas", []);

  const proyectos =
    leerLocalStorage<any[]>("karsan_proyectos", []);

  const documentos =
    leerLocalStorage<any[]>("karsan_documentos", []);

  const mensajes =
    leerLocalStorage<any[]>("karsan_mensajes", []);

  const respuestas =
    leerLocalStorage<any[]>("karsan_respuestas_mensajes", []);

  const marcas =
    leerLocalStorage<any[]>("karsan_marcas", []);

  const notificaciones =
    leerLocalStorage<any[]>("karsan_notificaciones", []);

  // =========================================================
  // CÁLCULOS
  // =========================================================

  const proyectosActivos = proyectos.filter((proyecto) => {

    const estado =
      String(proyecto.estado || "")
        .toLowerCase()
        .trim();

    return (
      estado !== "completado" &&
      estado !== "finalizado" &&
      estado !== "cancelado"
    );

  }).length;

  const proyectosProceso = proyectos.filter((proyecto) => {

    const estado =
      String(proyecto.estado || "")
        .toLowerCase()
        .trim();

    return (
      estado.includes("proceso") ||
      estado.includes("pendiente") ||
      estado.includes("revisión") ||
      estado.includes("revision")
    );

  }).length;

  const documentosPendientes =
    documentos.filter((documento) => {

      const estado =
        String(documento.estado || "Pendiente")
          .toLowerCase()
          .trim();

      return (
        estado === "pendiente" ||
        estado.includes("revisión") ||
        estado.includes("revision")
      );

    }).length;

  const comprobantesPendientes =
    documentos.filter((documento) => {

      const tipo =
        String(documento.tipo || "")
          .toLowerCase();

      const estado =
        String(documento.estado || "Pendiente")
          .toLowerCase()
          .trim();

      return (
        tipo.includes("comprobante") &&
        (
          estado === "pendiente" ||
          estado.includes("revisión") ||
          estado.includes("revision")
        )
      );

    }).length;

  const mensajesSinResponder =
    mensajes.filter((mensaje) => {

      const id =
        String(
          mensaje.id ??
          mensaje.idMensaje ??
          ""
        );

      const respondido =
        respuestas.some((respuesta) => {

          const idRespuesta =
            String(
              respuesta.idMensaje ??
              respuesta.mensajeId ??
              respuesta.id ??
              ""
            );

          return (
            idRespuesta === id ||
            String(respuesta.correo || "")
              .toLowerCase() ===
            String(mensaje.correo || "")
              .toLowerCase()
          );

        });

      return !respondido;

    }).length;

  const notificacionesNoLeidas =
    notificaciones.filter(
      (notificacion) =>
        notificacion.leida !== true
    ).length;

  // =========================================================
  // PROYECTOS RECIENTES
  // =========================================================

  const proyectosRecientes =
    proyectos.slice(-4).reverse();

  // =========================================================
  // ACTIVIDAD RECIENTE
  // =========================================================

  const actividades: Array<{
    icono: string;
    titulo: string;
    descripcion: string;
    clase: string;
  }> = [];

  if (clientes.length > 0) {

    const ultimoCliente =
      clientes[clientes.length - 1];

    actividades.push({
      icono: "👤",
      titulo: "Cliente registrado",
      descripcion:
        ultimoCliente.nombre ||
        ultimoCliente.correo ||
        "Nuevo cliente",
      clase: "blue"
    });

  }

  if (documentos.length > 0) {

    const ultimoDocumento =
      documentos[documentos.length - 1];

    actividades.push({
      icono: "📄",
      titulo: "Nuevo documento",
      descripcion:
        ultimoDocumento.nombre ||
        ultimoDocumento.tipo ||
        "Documento recibido",
      clase: "purple"
    });

  }

  if (mensajes.length > 0) {

    const ultimoMensaje =
      mensajes[mensajes.length - 1];

    actividades.push({
      icono: "💬",
      titulo: "Nuevo mensaje",
      descripcion:
        ultimoMensaje.nombre ||
        ultimoMensaje.correo ||
        "Mensaje recibido",
      clase: "orange"
    });

  }

  if (proyectos.length > 0) {

    const ultimoProyecto =
      proyectos[proyectos.length - 1];

    actividades.push({
      icono: "📁",
      titulo: "Proyecto actualizado",
      descripcion:
        ultimoProyecto.nombre ||
        "Nuevo proyecto",
      clase: "green"
    });

  }

  if (actividades.length === 0) {

    actividades.push({
      icono: "✨",
      titulo: "Todo está listo",
      descripcion:
        "Todavía no hay actividad registrada.",
      clase: "blue"
    });

  }

  // Mostrar máximo 5 actividades
  const actividadesMostrar =
    actividades.slice(0, 5);

  // =========================================================
  // HTML DEL DASHBOARD
  // =========================================================

  contenido.innerHTML = `

    <!-- BIENVENIDA -->

    <div class="admin-welcome">

      <div class="admin-welcome-content">

        <div class="admin-welcome-icon">
          👋
        </div>

        <div>

          <div class="admin-welcome-label">
            PANEL DE ADMINISTRACIÓN
          </div>

          <h2>
            Bienvenido, Administrador
          </h2>

          <p>
            Aquí puedes gestionar toda la información
            de Karsan Digital desde un solo lugar.
          </p>

        </div>

      </div>

      <div class="admin-welcome-date">
        📅
        ${new Date().toLocaleDateString("es-EC", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        })}
      </div>

    </div>


    <!-- TÍTULO ESTADÍSTICAS -->

    <div class="admin-section-heading">

      <div>

        <span class="section-kicker">
          RESUMEN GENERAL
        </span>

        <h3>
          Estadísticas del CRM
        </h3>

        <p class="section-description">
          Información actual de tu sistema.
        </p>

      </div>

    </div>


    <!-- ESTADÍSTICAS -->

    <div class="admin-stats-grid">

      <!-- CLIENTES -->

      <div class="admin-stat-card">

        <div class="admin-stat-top">

          <div class="admin-stat-icon blue">
            👥
          </div>

          <span class="admin-stat-trend">
            CRM
          </span>

        </div>

        <div class="admin-stat-info">

          <span>
            Total clientes
          </span>

          <strong>
            ${clientes.length}
          </strong>

          <small>
            Clientes registrados
          </small>

        </div>

      </div>


      <!-- EMPRESAS -->

      <div class="admin-stat-card">

        <div class="admin-stat-top">

          <div class="admin-stat-icon purple">
            🏢
          </div>

          <span class="admin-stat-trend">
            EMPRESAS
          </span>

        </div>

        <div class="admin-stat-info">

          <span>
            Empresas
          </span>

          <strong>
            ${empresas.length}
          </strong>

          <small>
            Empresas registradas
          </small>

        </div>

      </div>


      <!-- PROYECTOS -->

      <div class="admin-stat-card">

        <div class="admin-stat-top">

          <div class="admin-stat-icon cyan">
            📁
          </div>

          <span class="admin-stat-trend">
            ACTIVOS
          </span>

        </div>

        <div class="admin-stat-info">

          <span>
            Proyectos activos
          </span>

          <strong>
            ${proyectosActivos}
          </strong>

          <small>
            ${proyectosProceso} en proceso
          </small>

        </div>

      </div>


      <!-- DOCUMENTOS -->

      <div class="admin-stat-card">

        <div class="admin-stat-top">

          <div class="admin-stat-icon gold">
            📄
          </div>

          <span class="admin-stat-trend">
            PENDIENTES
          </span>

        </div>

        <div class="admin-stat-info">

          <span>
            Documentos pendientes
          </span>

          <strong>
            ${documentosPendientes}
          </strong>

          <small>
            Requieren revisión
          </small>

        </div>

      </div>


      <!-- COMPROBANTES -->

      <div class="admin-stat-card">

        <div class="admin-stat-top">

          <div class="admin-stat-icon orange">
            💵
          </div>

          <span class="admin-stat-trend">
            REVISAR
          </span>

        </div>

        <div class="admin-stat-info">

          <span>
            Comprobantes
          </span>

          <strong>
            ${comprobantesPendientes}
          </strong>

          <small>
            Pendientes de revisión
          </small>

        </div>

      </div>


      <!-- MENSAJES -->

      <div class="admin-stat-card">

        <div class="admin-stat-top">

          <div class="admin-stat-icon blue">
            💬
          </div>

          <span class="admin-stat-trend">
            ATENCIÓN
          </span>

        </div>

        <div class="admin-stat-info">

          <span>
            Mensajes sin responder
          </span>

          <strong>
            ${mensajesSinResponder}
          </strong>

          <small>
            Requieren respuesta
          </small>

        </div>

      </div>

    </div>


    <!-- CONTENIDO PRINCIPAL -->

    <div class="admin-dashboard-layout">


      <!-- PROYECTOS -->

      <div class="admin-main-card">

        <div class="admin-card-heading">

          <div>

            <div class="admin-heading-icon blue">
              📁
            </div>

            <div>

              <h3>
                Proyectos recientes
              </h3>

              <p>
                Últimos proyectos registrados
              </p>

            </div>

          </div>

          <button
            class="crm-btn secondary"
            id="btnVerProyectosInicio"
          >
            Ver todos
          </button>

        </div>


        <div class="admin-project-list">

          ${
            proyectosRecientes.length > 0
              ? proyectosRecientes.map(
                  (proyecto, indice) => {

                    const estado =
                      String(
                        proyecto.estado ||
                        "Pendiente"
                      );

                    const estadoLower =
                      estado.toLowerCase();

                    let claseEstado = "pending";

                    if (
                      estadoLower.includes("proceso")
                    ) {
                      claseEstado = "process";
                    }

                    if (
                      estadoLower.includes("activo") ||
                      estadoLower.includes("completado") ||
                      estadoLower.includes("finalizado")
                    ) {
                      claseEstado = "success";
                    }

                    return `

                      <div class="admin-project-item">

                        <div class="
                          admin-project-number
                        ">
                          ${String(
                            indice + 1
                          ).padStart(2, "0")}
                        </div>

                        <div class="
                          admin-project-icon
                          ${
                            indice % 2 === 0
                              ? "blue"
                              : "purple"
                          }
                        ">
                          📁
                        </div>

                        <div class="admin-project-info">

                          <strong>
                            ${escaparHTML(
                              proyecto.nombre ||
                              "Proyecto sin nombre"
                            )}
                          </strong>

                          <span>
                            ${escaparHTML(
                              proyecto.cliente ||
                              "Cliente no especificado"
                            )}
                          </span>

                        </div>

                        <span class="
                          admin-project-status
                          ${claseEstado}
                        ">
                          ${escaparHTML(
                            estado
                          )}
                        </span>

                      </div>

                    `;

                  }
                ).join("")
              : `

                <div class="crm-empty-state">

                  <div>
                    📁
                  </div>

                  <h3>
                    No hay proyectos registrados
                  </h3>

                  <p>
                    Los proyectos nuevos aparecerán
                    aquí automáticamente.
                  </p>

                </div>

              `
          }

        </div>

      </div>


      <!-- ACCIONES RÁPIDAS -->

      <div class="admin-main-card">

        <div class="admin-card-heading">

          <div>

            <div class="admin-heading-icon purple">
              ⚡
            </div>

            <div>

              <h3>
                Acciones rápidas
              </h3>

              <p>
                Gestiona rápidamente tu CRM
              </p>

            </div>

          </div>

        </div>


        <div class="admin-quick-actions">

          <button
            class="admin-quick-action blue"
            data-quick="clientes"
          >
            <div class="quick-action-icon">
              👥
            </div>

            <span>
              Nuevo cliente
            </span>
          </button>


          <button
            class="admin-quick-action purple"
            data-quick="empresas"
          >
            <div class="quick-action-icon">
              🏢
            </div>

            <span>
              Empresa
            </span>
          </button>


          <button
            class="admin-quick-action cyan"
            data-quick="proyectos"
          >
            <div class="quick-action-icon">
              📁
            </div>

            <span>
              Proyecto
            </span>
          </button>


          <button
            class="admin-quick-action orange"
            data-quick="documentos"
          >
            <div class="quick-action-icon">
              🧾
            </div>

            <span>
              Comprobantes
            </span>
          </button>


          <button
            class="admin-quick-action green"
            data-quick="marketing"
          >
            <div class="quick-action-icon">
              📣
            </div>

            <span>
              Marketing
            </span>
          </button>


          <button
            class="admin-quick-action purple"
            data-quick="reportes"
          >
            <div class="quick-action-icon">
              📊
            </div>

            <span>
              Reportes
            </span>
          </button>

        </div>

      </div>

    </div>


    <!-- ACTIVIDAD Y RESUMEN -->

    <div class="admin-bottom-grid">


      <!-- ACTIVIDAD -->

      <div class="admin-activity-card">

        <div class="admin-card-heading">

          <div>

            <div class="admin-heading-icon blue">
              🔔
            </div>

            <div>

              <h3>
                Actividad reciente
              </h3>

              <p>
                Últimos movimientos del CRM
              </p>

            </div>

          </div>

          <span class="admin-live-indicator">
            ● En vivo
          </span>

        </div>


        <div class="admin-activity-list">

          ${
            actividadesMostrar.map(
              (actividad) => `

                <div class="admin-activity-item">

                  <div class="
                    activity-dot
                    ${actividad.clase}
                  ">
                    ${actividad.icono}
                  </div>

                  <div>

                    <strong>
                      ${escaparHTML(
                        actividad.titulo
                      )}
                    </strong>

                    <span>
                      ${escaparHTML(
                        actividad.descripcion
                      )}
                    </span>

                  </div>

                </div>

              `
            ).join("")
          }

        </div>

      </div>


      <!-- RESUMEN -->

      <div class="admin-summary-card">

        <div class="admin-card-heading">

          <div>

            <div class="admin-heading-icon purple">
              📊
            </div>

            <div>

              <h3>
                Resumen del CRM
              </h3>

              <p>
                Estado general
              </p>

            </div>

          </div>

        </div>


        <div class="admin-summary-list">

          <div class="admin-summary-row">

            <div class="summary-label">
              <span>👥 Clientes</span>
              <strong>${clientes.length}</strong>
            </div>

            <div class="summary-progress">

              <div
                class="summary-progress-bar blue"
                style="width: ${
                  Math.min(
                    clientes.length * 2,
                    100
                  )
                }%;"
              ></div>

            </div>

          </div>


          <div class="admin-summary-row">

            <div class="summary-label">
              <span>🏢 Empresas</span>
              <strong>${empresas.length}</strong>
            </div>

            <div class="summary-progress">

              <div
                class="summary-progress-bar purple"
                style="width: ${
                  Math.min(
                    empresas.length * 3,
                    100
                  )
                }%;"
              ></div>

            </div>

          </div>


          <div class="admin-summary-row">

            <div class="summary-label">
              <span>📁 Proyectos</span>
              <strong>${proyectos.length}</strong>
            </div>

            <div class="summary-progress">

              <div
                class="summary-progress-bar cyan"
                style="width: ${
                  Math.min(
                    proyectos.length * 4,
                    100
                  )
                }%;"
              ></div>

            </div>

          </div>


          <div class="admin-summary-row">

            <div class="summary-label">
              <span>⭐ Marcas</span>
              <strong>${marcas.length}</strong>
            </div>

            <div class="summary-progress">

              <div
                class="summary-progress-bar orange"
                style="width: ${
                  Math.min(
                    marcas.length * 5,
                    100
                  )
                }%;"
              ></div>

            </div>

          </div>

        </div>


        <div class="admin-summary-footer">

          <div class="summary-footer-item">
            <span>🔔</span>
            <strong>
              ${notificacionesNoLeidas}
            </strong>
            <small>
              notificaciones
            </small>
          </div>

          <div class="summary-footer-item">
            <span>💬</span>
            <strong>
              ${mensajesSinResponder}
            </strong>
            <small>
              mensajes pendientes
            </small>
          </div>

        </div>

      </div>

    </div>


    <!-- PIE -->

    <div class="admin-dashboard-footer">

      <div class="footer-karsan-icon">
        K
      </div>

      <div>

        <strong>
          Karsan Digital CRM
        </strong>

        <span>
          Panel administrativo · Gestión centralizada
        </span>

      </div>

    </div>

  `;

  // =========================================================
  // BOTÓN VER PROYECTOS
  // =========================================================

  contenido
    .querySelector("#btnVerProyectosInicio")
    ?.addEventListener("click", () => {

      const app =
        contenido.closest(".crm-app") as HTMLElement;

      if (!app) {
        return;
      }

      actualizarMenuAdmin(
        app,
        "proyectos"
      );

      mostrarSeccionAdmin(
        app,
        "proyectos"
      );

    });


  // =========================================================
  // ACCIONES RÁPIDAS
  // =========================================================

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-quick]"
    )
    .forEach((boton) => {

      boton.addEventListener(
        "click",
        () => {

          const seccion =
            boton.dataset.quick;

          const app =
            contenido.closest(
              ".crm-app"
            ) as HTMLElement;

          if (!seccion || !app) {
            return;
          }

          actualizarMenuAdmin(
            app,
            seccion
          );

          mostrarSeccionAdmin(
            app,
            seccion
          );

        }
      );

    });

}

// =========================================================
// CLIENTES
// =========================================================

function mostrarClientesAdmin(
  contenido: HTMLElement
): void {

  let clientes = leerLocalStorage<Cliente[]>(
    "karsan_clientes",
    [
      {
        id: 1,
        nombre: "Cynthia Toscano",
        correo: "cynthia@example.com",
        telefono: "0999999999",
        empresa: "Nova Solutions"
      },
      {
        id: 2,
        nombre: "Juan Pérez",
        correo: "juan@example.com",
        telefono: "0988888888",
        empresa: "Grupo Andino"
      },
      {
        id: 3,
        nombre: "María López",
        correo: "maria@example.com",
        telefono: "0977777777",
        empresa: "Urban Store"
      }
    ]
  );

  // =========================================================
  // DATOS RELACIONADOS
  // =========================================================

  const proyectos =
    leerLocalStorage<any[]>(
      "karsan_proyectos",
      []
    );

  const documentos =
    leerLocalStorage<any[]>(
      "karsan_documentos",
      []
    );

  // =========================================================
  // EMPRESAS
  // =========================================================

  const empresasUnicas = Array.from(
    new Set(
      clientes
        .map((cliente) =>
          String(cliente.empresa || "").trim()
        )
        .filter(Boolean)
    )
  );

  // =========================================================
  // HTML
  // =========================================================

  contenido.innerHTML = `

    <!-- ENCABEZADO -->

    <div class="crm-page-header">

      <div>

        <span class="section-kicker">
          GESTIÓN CRM
        </span>

        <h2>
          Clientes
        </h2>

        <p>
          Administra y consulta la información de
          todos tus clientes.
        </p>

      </div>

      <button
        class="crm-btn primary"
        id="btnNuevoCliente"
      >
        + Nuevo cliente
      </button>

    </div>


    <!-- ESTADÍSTICAS -->

    <div class="stats-grid">

      <div class="stat-card">

        <div class="stat-icon">
          👥
        </div>

        <div>

          <span>
            Total clientes
          </span>

          <strong>
            ${clientes.length}
          </strong>

          <small>
            Registrados en el CRM
          </small>

        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          🏢
        </div>

        <div>

          <span>
            Empresas
          </span>

          <strong>
            ${empresasUnicas.length}
          </strong>

          <small>
            Empresas asociadas
          </small>

        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          📁
        </div>

        <div>

          <span>
            Proyectos
          </span>

          <strong>
            ${proyectos.length}
          </strong>

          <small>
            Proyectos registrados
          </small>

        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          📄
        </div>

        <div>

          <span>
            Documentos
          </span>

          <strong>
            ${documentos.length}
          </strong>

          <small>
            Archivos recibidos
          </small>

        </div>

      </div>

    </div>


    <!-- FILTROS -->

    <div class="crm-card">

      <div class="crm-card-header">

        <div>

          <h3>
            Buscar clientes
          </h3>

          <p>
            Encuentra rápidamente un cliente.
          </p>

        </div>

      </div>


      <div class="crm-form-grid">

        <div class="crm-form-group">

          <label>
            Buscar
          </label>

          <input
            type="text"
            id="buscarClienteAdmin"
            class="crm-input"
            placeholder="Nombre, correo o teléfono..."
          />

        </div>


        <div class="crm-form-group">

          <label>
            Empresa
          </label>

          <select
            id="filtroEmpresaCliente"
            class="crm-input"
          >

            <option value="">
              Todas las empresas
            </option>

            ${
              empresasUnicas
                .map(
                  (empresa) => `
                    <option value="${escaparHTML(
                      empresa
                    )}">
                      ${escaparHTML(
                        empresa
                      )}
                    </option>
                  `
                )
                .join("")
            }

          </select>

        </div>

      </div>

    </div>


    <!-- LISTADO -->

    <div class="crm-card">

      <div class="crm-card-header">

        <div>

          <h3>
            Lista de clientes
          </h3>

          <p id="contadorClientesAdmin">
            ${clientes.length}
            clientes registrados
          </p>

        </div>

      </div>


      <div class="table-container">

        <table class="crm-table">

          <thead>

            <tr>

              <th>
                Cliente
              </th>

              <th>
                Contacto
              </th>

              <th>
                Empresa
              </th>

              <th>
                Proyectos
              </th>

              <th>
                Documentos
              </th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>


          <tbody id="tablaClientesAdmin">

            ${
              clientes.length
                ? clientes
                    .map(
                      (cliente, index) => {

                        const cantidadProyectos =
                          proyectos.filter(
                            (proyecto) =>
                              String(
                                proyecto.cliente ||
                                ""
                              ).toLowerCase() ===
                              String(
                                cliente.nombre ||
                                ""
                              ).toLowerCase()
                          ).length;

                        const cantidadDocumentos =
                          documentos.filter(
                            (documento) =>
                              String(
                                documento.correo ||
                                ""
                              ).toLowerCase() ===
                              String(
                                cliente.correo ||
                                ""
                              ).toLowerCase()
                          ).length;

                        return `

                          <tr
                            data-cliente-row="${index}"
                          >

                            <!-- CLIENTE -->

                            <td>

                              <div class="table-user">

                                <div class="crm-avatar small">
                                  ${obtenerInicial(
                                    cliente.nombre
                                  )}
                                </div>

                                <div>

                                  <strong>
                                    ${escaparHTML(
                                      cliente.nombre
                                    )}
                                  </strong>

                                  <small>
                                    Cliente #${
                                      cliente.id ??
                                      index + 1
                                    }
                                  </small>

                                </div>

                              </div>

                            </td>


                            <!-- CONTACTO -->

                            <td>

                              <div>

                                <div>
                                  📧
                                  ${escaparHTML(
                                    cliente.correo
                                  )}
                                </div>

                                <small>
                                  📱
                                  ${escaparHTML(
                                    cliente.telefono
                                  )}
                                </small>

                              </div>

                            </td>


                            <!-- EMPRESA -->

                            <td>

                              <span class="crm-badge">
                                🏢
                                ${escaparHTML(
                                  cliente.empresa ||
                                  "Sin empresa"
                                )}
                              </span>

                            </td>


                            <!-- PROYECTOS -->

                            <td>

                              <strong>
                                ${cantidadProyectos}
                              </strong>

                              <small>
                                proyectos
                              </small>

                            </td>


                            <!-- DOCUMENTOS -->

                            <td>

                              <strong>
                                ${cantidadDocumentos}
                              </strong>

                              <small>
                                documentos
                              </small>

                            </td>


                            <!-- ACCIONES -->

                            <td>

                              <div class="table-actions">

                                <button
                                  class="icon-btn"
                                  data-view-cliente="${index}"
                                  title="Ver cliente"
                                >
                                  👁️
                                </button>

                                <button
                                  class="icon-btn"
                                  data-edit-cliente="${index}"
                                  title="Editar cliente"
                                >
                                  ✏️
                                </button>

                                <button
                                  class="icon-btn danger"
                                  data-delete-cliente="${index}"
                                  title="Eliminar cliente"
                                >
                                  🗑️
                                </button>

                              </div>

                            </td>

                          </tr>

                        `;

                      }
                    )
                    .join("")
                : `

                  <tr>

                    <td colspan="6">

                      <div class="crm-empty-state">

                        <div>
                          👥
                        </div>

                        <h3>
                          No existen clientes
                        </h3>

                        <p>
                          Registra tu primer cliente
                          para comenzar.
                        </p>

                      </div>

                    </td>

                  </tr>

                `
            }

          </tbody>

        </table>

      </div>

    </div>

  `;


  // =========================================================
  // NUEVO CLIENTE
  // =========================================================

  contenido
    .querySelector("#btnNuevoCliente")
    ?.addEventListener(
      "click",
      () => {

        mostrarFormularioClienteAdmin(
          contenido
        );

      }
    );


  // =========================================================
  // BUSCADOR
  // =========================================================

  const inputBuscar =
    contenido.querySelector<HTMLInputElement>(
      "#buscarClienteAdmin"
    );

  const filtroEmpresa =
    contenido.querySelector<HTMLSelectElement>(
      "#filtroEmpresaCliente"
    );

  const filas =
    contenido.querySelectorAll<HTMLTableRowElement>(
      "[data-cliente-row]"
    );

  const contador =
    contenido.querySelector<HTMLElement>(
      "#contadorClientesAdmin"
    );


  const aplicarFiltros = (): void => {

    const texto =
      String(
        inputBuscar?.value || ""
      )
        .toLowerCase()
        .trim();

    const empresa =
      String(
        filtroEmpresa?.value || ""
      )
        .toLowerCase()
        .trim();

    let visibles = 0;

    filas.forEach((fila) => {

      const index =
        Number(
          fila.dataset.clienteRow
        );

      const cliente =
        clientes[index];

      if (!cliente) {
        return;
      }

      const contenidoCliente =
        `
          ${cliente.nombre || ""}
          ${cliente.correo || ""}
          ${cliente.telefono || ""}
          ${cliente.empresa || ""}
        `.toLowerCase();

      const coincideTexto =
        !texto ||
        contenidoCliente.includes(
          texto
        );

      const coincideEmpresa =
        !empresa ||
        String(
          cliente.empresa || ""
        )
          .toLowerCase() ===
        empresa;

      const mostrar =
        coincideTexto &&
        coincideEmpresa;

      fila.style.display =
        mostrar
          ? ""
          : "none";

      if (mostrar) {
        visibles++;
      }

    });

    if (contador) {

      contador.textContent =
        `${visibles} ${
          visibles === 1
            ? "cliente encontrado"
            : "clientes encontrados"
        }`;

    }

  };


  inputBuscar?.addEventListener(
    "input",
    aplicarFiltros
  );

  filtroEmpresa?.addEventListener(
    "change",
    aplicarFiltros
  );


  // =========================================================
  // VER CLIENTE
  // =========================================================

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-view-cliente]"
    )
    .forEach((boton) => {

      boton.addEventListener(
        "click",
        () => {

          const index =
            Number(
              boton.dataset.viewCliente
            );

          const cliente =
            clientes[index];

          if (!cliente) {
            return;
          }

          const cantidadProyectos =
            proyectos.filter(
              (proyecto) =>
                String(
                  proyecto.cliente ||
                  ""
                ).toLowerCase() ===
                String(
                  cliente.nombre ||
                  ""
                ).toLowerCase()
            ).length;

          const cantidadDocumentos =
            documentos.filter(
              (documento) =>
                String(
                  documento.correo ||
                  ""
                ).toLowerCase() ===
                String(
                  cliente.correo ||
                  ""
                ).toLowerCase()
            ).length;


          contenido.innerHTML = `

            <div class="crm-page-header">

              <div>

                <span class="section-kicker">
                  PERFIL DEL CLIENTE
                </span>

                <h2>
                  Detalle del cliente
                </h2>

                <p>
                  Información y actividad del cliente.
                </p>

              </div>

              <button
                class="crm-btn secondary"
                id="btnVolverClientes"
              >
                ← Volver a clientes
              </button>

            </div>


            <div class="crm-card detail-card">

              <div class="detail-avatar">
                ${obtenerInicial(
                  cliente.nombre
                )}
              </div>

              <h3>
                ${escaparHTML(
                  cliente.nombre
                )}
              </h3>

              <p>
                <strong>
                  📧 Correo:
                </strong>

                ${escaparHTML(
                  cliente.correo
                )}
              </p>

              <p>
                <strong>
                  📱 Teléfono:
                </strong>

                ${escaparHTML(
                  cliente.telefono
                )}
              </p>

              <p>
                <strong>
                  🏢 Empresa:
                </strong>

                ${escaparHTML(
                  cliente.empresa ||
                  "Sin empresa"
                )}
              </p>


              <div class="stats-grid">

                <div class="stat-card">

                  <div class="stat-icon">
                    📁
                  </div>

                  <div>

                    <span>
                      Proyectos
                    </span>

                    <strong>
                      ${cantidadProyectos}
                    </strong>

                  </div>

                </div>


                <div class="stat-card">

                  <div class="stat-icon">
                    📄
                  </div>

                  <div>

                    <span>
                      Documentos
                    </span>

                    <strong>
                      ${cantidadDocumentos}
                    </strong>

                  </div>

                </div>

              </div>


              <div class="detail-actions">

                <button
                  class="crm-btn primary"
                  id="btnEditarDetalleCliente"
                >
                  ✏️ Editar cliente
                </button>

                <button
                  class="crm-btn secondary"
                  id="btnProyectosCliente"
                >
                  📁 Ver proyectos
                </button>

                <button
                  class="crm-btn secondary"
                  id="btnDocumentosCliente"
                >
                  📄 Ver documentos
                </button>

              </div>

            </div>

          `;


          // VOLVER

          contenido
            .querySelector(
              "#btnVolverClientes"
            )
            ?.addEventListener(
              "click",
              () => {

                mostrarClientesAdmin(
                  contenido
                );

              }
            );


          // EDITAR

          contenido
            .querySelector(
              "#btnEditarDetalleCliente"
            )
            ?.addEventListener(
              "click",
              () => {

                mostrarFormularioClienteAdmin(
                  contenido,
                  cliente,
                  index
                );

              }
            );


          // PROYECTOS

          contenido
            .querySelector(
              "#btnProyectosCliente"
            )
            ?.addEventListener(
              "click",
              () => {

                const app =
                  contenido.closest(
                    ".crm-app"
                  ) as HTMLElement;

                if (!app) {
                  return;
                }

                actualizarMenuAdmin(
                  app,
                  "proyectos"
                );

                mostrarSeccionAdmin(
                  app,
                  "proyectos"
                );

              }
            );


          // DOCUMENTOS

          contenido
            .querySelector(
              "#btnDocumentosCliente"
            )
            ?.addEventListener(
              "click",
              () => {

                const app =
                  contenido.closest(
                    ".crm-app"
                  ) as HTMLElement;

                if (!app) {
                  return;
                }

                actualizarMenuAdmin(
                  app,
                  "documentos"
                );

                mostrarSeccionAdmin(
                  app,
                  "documentos"
                );

              }
            );

        }
      );

    });


  // =========================================================
  // EDITAR
  // =========================================================

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-edit-cliente]"
    )
    .forEach((boton) => {

      boton.addEventListener(
        "click",
        () => {

          const index =
            Number(
              boton.dataset.editCliente
            );

          const cliente =
            clientes[index];

          if (!cliente) {
            return;
          }

          mostrarFormularioClienteAdmin(
            contenido,
            cliente,
            index
          );

        }
      );

    });


  // =========================================================
  // ELIMINAR
  // =========================================================

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-delete-cliente]"
    )
    .forEach((boton) => {

      boton.addEventListener(
        "click",
        () => {

          const index =
            Number(
              boton.dataset.deleteCliente
            );

          const cliente =
            clientes[index];

          if (!cliente) {
            return;
          }

          if (
            !confirm(
              `¿Seguro que deseas eliminar a ${cliente.nombre}?`
            )
          ) {
            return;
          }

          clientes.splice(
            index,
            1
          );

          guardarLocalStorage(
            "karsan_clientes",
            clientes
          );

          mostrarClientesAdmin(
            contenido
          );

          mostrarMensaje(
            "Cliente eliminado correctamente."
          );

        }
      );

    });

}

// =========================================================
// FORMULARIO CLIENTE
// =========================================================

function mostrarFormularioClienteAdmin(
  contenido: HTMLElement,
  cliente?: Cliente,
  indice?: number
): void {

  const editar = cliente !== undefined;

  contenido.innerHTML = `

    <!-- ENCABEZADO -->

    <div class="crm-page-header">

      <div>

        <span class="section-kicker">
          GESTIÓN DE CLIENTES
        </span>

        <h2>
          ${editar ? "Editar cliente" : "Nuevo cliente"}
        </h2>

        <p>
          ${
            editar
              ? "Actualiza la información del cliente."
              : "Registra un nuevo cliente en Karsan Digital."
          }
        </p>

      </div>

      <button
        class="crm-btn secondary"
        id="btnCancelarCliente"
      >
        ← Volver
      </button>

    </div>


    <!-- FORMULARIO -->

    <div class="crm-card form-card">

      <div class="crm-card-header">

        <div>

          <div class="admin-card-heading">

            <div class="admin-heading-icon blue">
              👤
            </div>

            <div>

              <h3>
                Información del cliente
              </h3>

              <p>
                Completa los datos principales.
              </p>

            </div>

          </div>

        </div>

      </div>


      <div class="form-grid">


        <!-- NOMBRE -->

        <div class="form-group">

          <label for="clienteNombre">
            Nombre completo *
          </label>

          <input
            id="clienteNombre"
            type="text"
            value="${escaparHTML(
              cliente?.nombre || ""
            )}"
            placeholder="Ej. Cynthia Toscano"
          />

          <small>
            Nombre y apellido del cliente.
          </small>

        </div>


        <!-- CORREO -->

        <div class="form-group">

          <label for="clienteCorreo">
            Correo electrónico *
          </label>

          <input
            id="clienteCorreo"
            type="email"
            value="${escaparHTML(
              cliente?.correo || ""
            )}"
            placeholder="correo@ejemplo.com"
          />

          <small>
            Se utilizará para contactar al cliente.
          </small>

        </div>


        <!-- TELÉFONO -->

        <div class="form-group">

          <label for="clienteTelefono">
            Teléfono
          </label>

          <input
            id="clienteTelefono"
            type="tel"
            value="${escaparHTML(
              cliente?.telefono || ""
            )}"
            placeholder="0999999999"
          />

          <small>
            Número de contacto del cliente.
          </small>

        </div>


        <!-- EMPRESA -->

        <div class="form-group">

          <label for="clienteEmpresa">
            Empresa
          </label>

          <input
            id="clienteEmpresa"
            type="text"
            value="${escaparHTML(
              cliente?.empresa || ""
            )}"
            placeholder="Ej. Nova Solutions"
          />

          <small>
            Empresa a la que pertenece el cliente.
          </small>

        </div>

      </div>


      <!-- ACCESO -->

      <div class="crm-card-header form-section-heading">

        <div>

          <div class="admin-card-heading">

            <div class="admin-heading-icon purple">
              🔐
            </div>

            <div>

              <h3>
                Acceso al portal
              </h3>

              <p>
                El acceso del cliente se conectará
                posteriormente con el sistema de autenticación.
              </p>

            </div>

          </div>

        </div>

      </div>


      <div class="form-grid">


        <!-- USUARIO -->

        <div class="form-group">

          <label for="clienteUsuario">
            Usuario
          </label>

          <input
            id="clienteUsuario"
            type="text"
            value="${
              editar
                ? escaparHTML(
                    (cliente as any)?.usuario || ""
                  )
                : ""
            }"
            placeholder="Ej. cynthia.toscano"
          />

          <small>
            Usuario que utilizará el cliente para ingresar.
          </small>

        </div>


        <!-- CONTRASEÑA -->

        <div class="form-group">

          <label for="clientePassword">
            Contraseña
          </label>

          <input
            id="clientePassword"
            type="password"
            placeholder="${
              editar
                ? "Dejar vacío para conservar la actual"
                : "Crear contraseña"
            }"
          />

          <small>
            La contraseña se conectará al sistema seguro
            de autenticación.
          </small>

        </div>

      </div>


      <!-- INFORMACIÓN -->

      <div class="crm-card form-info-box">

        <div class="form-info-icon">
          💡
        </div>

        <div>

          <strong>
            Acceso del cliente
          </strong>

          <p>
            El cliente podrá utilizar sus credenciales
            para ingresar a su portal y consultar proyectos,
            documentos, mensajes y demás información.
          </p>

        </div>

      </div>


      <!-- BOTONES -->

      <div class="form-actions">

        <button
          class="crm-btn secondary"
          id="btnCancelarCliente2"
        >
          Cancelar
        </button>

        <button
          class="crm-btn primary"
          id="btnGuardarCliente"
        >
          ${
            editar
              ? "💾 Guardar cambios"
              : "✓ Registrar cliente"
          }
        </button>

      </div>

    </div>
  `;


  // =========================================================
  // CANCELAR
  // =========================================================

  const cancelar = (): void => {

    mostrarClientesAdmin(
      contenido
    );

  };


  contenido
    .querySelector(
      "#btnCancelarCliente"
    )
    ?.addEventListener(
      "click",
      cancelar
    );


  contenido
    .querySelector(
      "#btnCancelarCliente2"
    )
    ?.addEventListener(
      "click",
      cancelar
    );


  // =========================================================
  // GUARDAR CLIENTE
  // =========================================================

  contenido
    .querySelector(
      "#btnGuardarCliente"
    )
    ?.addEventListener(
      "click",
      () => {

        const nombre =
          obtenerValorInputAdmin(
            contenido,
            "clienteNombre"
          );

        const correo =
          obtenerValorInputAdmin(
            contenido,
            "clienteCorreo"
          );

        const telefono =
          obtenerValorInputAdmin(
            contenido,
            "clienteTelefono"
          );

        const empresa =
          obtenerValorInputAdmin(
            contenido,
            "clienteEmpresa"
          );

        const usuario =
          obtenerValorInputAdmin(
            contenido,
            "clienteUsuario"
          );

        const passwordInput =
          contenido.querySelector<HTMLInputElement>(
            "#clientePassword"
          );

        const password =
          passwordInput?.value.trim() || "";


        // =====================================================
        // VALIDACIONES
        // =====================================================

        if (!nombre) {

          mostrarMensaje(
            "El nombre del cliente es obligatorio.",
            "error"
          );

          return;

        }


        if (!correo) {

          mostrarMensaje(
            "El correo electrónico es obligatorio.",
            "error"
          );

          return;

        }


        const formatoCorreo =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
          !formatoCorreo.test(
            correo
          )
        ) {

          mostrarMensaje(
            "Ingresa un correo electrónico válido.",
            "error"
          );

          return;

        }


        if (
          telefono &&
          !/^[0-9+\s-]{7,15}$/.test(
            telefono
          )
        ) {

          mostrarMensaje(
            "El número de teléfono no tiene un formato válido.",
            "error"
          );

          return;

        }


        // =====================================================
        // CLIENTES EXISTENTES
        // =====================================================

        const clientes =
          leerLocalStorage<Cliente[]>(
            "karsan_clientes",
            []
          );


        // Evitar correo duplicado

        const correoExiste =
          clientes.some(
            (item, posicion) => {

              if (
                editar &&
                indice !== undefined &&
                posicion === indice
              ) {
                return false;
              }

              return String(
                item.correo || ""
              )
                .toLowerCase()
                .trim() ===
                correo
                  .toLowerCase()
                  .trim();

            }
          );


        if (correoExiste) {

          mostrarMensaje(
            "Ya existe un cliente registrado con ese correo.",
            "error"
          );

          return;

        }


        // =====================================================
        // USUARIO
        // =====================================================

        const usuarioNormalizado =
          usuario
            .toLowerCase()
            .replace(/\s+/g, ".");


        if (
          usuarioNormalizado &&
          usuarioNormalizado.length < 4
        ) {

          mostrarMensaje(
            "El usuario debe tener al menos 4 caracteres.",
            "error"
          );

          return;

        }


        // =====================================================
        // CONTRASEÑA
        // =====================================================

        if (
          !editar &&
          !password
        ) {

          mostrarMensaje(
            "Para un nuevo cliente debes ingresar una contraseña.",
            "error"
          );

          return;

        }


        if (
          password &&
          password.length < 6
        ) {

          mostrarMensaje(
            "La contraseña debe tener al menos 6 caracteres.",
            "error"
          );

          return;

        }


        // =====================================================
        // CREAR CLIENTE
        // =====================================================

        const nuevoCliente: Cliente = {
          id:
            cliente?.id ||
            generarId(),

          nombre,

          correo,

          telefono,

          empresa
        };


        // Guardamos temporalmente el usuario
        // como parte del registro del cliente.
        //
        // La contraseña NO se guarda aquí.
        // Posteriormente se enviará al backend seguro.

        const clienteConAcceso: any = {
          ...nuevoCliente,

          usuario:
            usuarioNormalizado ||
            undefined
        };


        // =====================================================
        // GUARDAR
        // =====================================================

        if (
          editar &&
          indice !== undefined
        ) {

          clientes[indice] =
            clienteConAcceso;

        } else {

          clientes.push(
            clienteConAcceso
          );

        }


        guardarLocalStorage(
          "karsan_clientes",
          clientes
        );


        // =====================================================
        // MOSTRAR LISTADO
        // =====================================================

        mostrarClientesAdmin(
          contenido
        );


        mostrarMensaje(
          editar
            ? "Cliente actualizado correctamente."
            : "Cliente registrado correctamente."
        );

      }
    );

}

// =========================================================
// EMPRESAS
// =========================================================

function mostrarEmpresasAdmin(
  contenido: HTMLElement
): void {

  const empresas =
    leerLocalStorage<Empresa[]>(
      "karsan_empresas",
      [
        {
          id: 1,
          nombre: "Nova Solutions",
          correo: "contacto@novasolutions.com",
          telefono: "0991111111"
        },
        {
          id: 2,
          nombre: "Grupo Andino",
          correo: "info@grupoandino.com",
          telefono: "0992222222"
        },
        {
          id: 3,
          nombre: "Urban Store",
          correo: "contacto@urbanstore.com",
          telefono: "0993333333"
        },
        {
          id: 4,
          nombre: "Digital Pro",
          correo: "info@digitalpro.com",
          telefono: "0994444444"
        }
      ]
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Empresas</h2>
        <p>Gestiona las empresas de tus clientes.</p>
      </div>

      <button
        class="crm-btn primary"
        id="btnNuevaEmpresa"
      >
        + Nueva empresa
      </button>

    </div>

    <div class="crm-grid-cards">

      ${
        empresas.map((empresa, index) => `

          <div class="crm-card company-card">

            <div class="company-icon">
              🏢
            </div>

            <h3>
              ${escaparHTML(empresa.nombre)}
            </h3>

            <p>
              ${escaparHTML(empresa.correo)}
            </p>

            <p>
              ${escaparHTML(empresa.telefono)}
            </p>

            <div class="card-actions">

              <button
                class="crm-btn secondary"
                data-edit-empresa="${index}"
              >
                Editar
              </button>

              <button
                class="crm-btn danger"
                data-delete-empresa="${index}"
              >
                Eliminar
              </button>

            </div>

          </div>

        `).join("")
      }

    </div>
  `;

  contenido
    .querySelector("#btnNuevaEmpresa")
    ?.addEventListener("click", () => {
      mostrarFormularioEmpresaAdmin(contenido);
    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-edit-empresa]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.editEmpresa
        );

        mostrarFormularioEmpresaAdmin(
          contenido,
          empresas[index],
          index
        );

      });

    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-delete-empresa]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.deleteEmpresa
        );

        if (
          !confirm(
            "¿Seguro que deseas eliminar esta empresa?"
          )
        ) {
          return;
        }

        empresas.splice(index, 1);

        guardarLocalStorage(
          "karsan_empresas",
          empresas
        );

        mostrarEmpresasAdmin(contenido);

      });

    });

}

// =========================================================
// FORMULARIO EMPRESA
// =========================================================

function mostrarFormularioEmpresaAdmin(
  contenido: HTMLElement,
  empresa?: Empresa,
  indice?: number
): void {

  const editar = !!empresa;

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>
          ${editar ? "Editar empresa" : "Nueva empresa"}
        </h2>
      </div>

      <button
        class="crm-btn secondary"
        id="btnVolverEmpresa"
      >
        ← Volver
      </button>

    </div>

    <div class="crm-card form-card">

      <div class="form-grid">

        <div class="form-group">
          <label>Nombre de la empresa</label>

          <input
            id="empresaNombre"
            value="${escaparHTML(
              empresa?.nombre || ""
            )}"
          />
        </div>

        <div class="form-group">
          <label>Correo</label>

          <input
            id="empresaCorreo"
            type="email"
            value="${escaparHTML(
              empresa?.correo || ""
            )}"
          />
        </div>

        <div class="form-group">
          <label>Teléfono</label>

          <input
            id="empresaTelefono"
            value="${escaparHTML(
              empresa?.telefono || ""
            )}"
          />
        </div>

      </div>

      <div class="form-actions">

        <button
          class="crm-btn primary"
          id="btnGuardarEmpresa"
        >
          Guardar
        </button>

      </div>

    </div>
  `;

  contenido
    .querySelector("#btnVolverEmpresa")
    ?.addEventListener("click", () => {
      mostrarEmpresasAdmin(contenido);
    });

  contenido
    .querySelector("#btnGuardarEmpresa")
    ?.addEventListener("click", () => {

      const nombre =
        obtenerValorInput(
          contenido,
          "empresaNombre"
        );

      const correo =
        obtenerValorInput(
          contenido,
          "empresaCorreo"
        );

      const telefono =
        obtenerValorInput(
          contenido,
          "empresaTelefono"
        );

      if (!nombre) {
        mostrarMensaje(
          "El nombre de la empresa es obligatorio.",
          "error"
        );
        return;
      }

      const empresas =
        leerLocalStorage<Empresa[]>(
          "karsan_empresas",
          []
        );

      const nuevaEmpresa: Empresa = {
        id: empresa?.id || generarId(),
        nombre,
        correo,
        telefono
      };

      if (
        editar &&
        indice !== undefined
      ) {
        empresas[indice] = nuevaEmpresa;
      } else {
        empresas.push(nuevaEmpresa);
      }

      guardarLocalStorage(
        "karsan_empresas",
        empresas
      );

      mostrarEmpresasAdmin(contenido);

      mostrarMensaje(
        "Empresa guardada correctamente."
      );

    });

}

// =========================================================
// MARCAS COLABORADORAS
// =========================================================

function mostrarMarcasAdmin(
  contenido: HTMLElement
): void {

  const marcas =
    leerLocalStorage<Marca[]>(
      "karsan_marcas",
      [
        {
          id: 1,
          nombre: "Meta",
          descripcion: "Plataforma de redes sociales y publicidad.",
          estado: "Activa"
        },
        {
          id: 2,
          nombre: "Google",
          descripcion: "Servicios de publicidad y posicionamiento.",
          estado: "Activa"
        },
        {
          id: 3,
          nombre: "Canva",
          descripcion: "Herramienta para diseño gráfico.",
          estado: "Activa"
        }
      ]
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Marcas colaboradoras</h2>

        <p>
          Administra las marcas asociadas a Karsan Digital.
        </p>
      </div>

      <button
        class="crm-btn primary"
        id="btnNuevaMarca"
      >
        + Nueva marca
      </button>

    </div>

    <div class="crm-grid-cards">

      ${
        marcas.map((marca, index) => `

          <div class="crm-card">

            <div class="brand-icon">
              ⭐
            </div>

            <h3>
              ${escaparHTML(marca.nombre)}
            </h3>

            <span class="status ${
              marca.estado === "Activa"
                ? "success"
                : marca.estado === "Pendiente"
                ? "pending"
                : "danger"
            }">
              ${escaparHTML(marca.estado)}
            </span>

            <p>
              ${escaparHTML(marca.descripcion)}
            </p>

            <div class="card-actions">

              <button
                class="crm-btn secondary"
                data-edit-marca="${index}"
              >
                Editar
              </button>

              <button
                class="crm-btn danger"
                data-delete-marca="${index}"
              >
                Eliminar
              </button>

            </div>

          </div>

        `).join("")
      }

    </div>
  `;

  contenido
    .querySelector("#btnNuevaMarca")
    ?.addEventListener("click", () => {

      mostrarFormularioMarcaAdmin(contenido);

    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-edit-marca]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.editMarca
        );

        mostrarFormularioMarcaAdmin(
          contenido,
          marcas[index],
          index
        );

      });

    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-delete-marca]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.deleteMarca
        );

        if (
          !confirm(
            "¿Eliminar esta marca colaboradora?"
          )
        ) {
          return;
        }

        marcas.splice(index, 1);

        guardarLocalStorage(
          "karsan_marcas",
          marcas
        );

        mostrarMarcasAdmin(contenido);

      });

    });

}

// =========================================================
// FORMULARIO MARCA
// =========================================================

function mostrarFormularioMarcaAdmin(
  contenido: HTMLElement,
  marca?: Marca,
  indice?: number
): void {

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>
          ${marca ? "Editar marca" : "Nueva marca"}
        </h2>
      </div>

      <button
        class="crm-btn secondary"
        id="btnVolverMarca"
      >
        ← Volver
      </button>

    </div>

    <div class="crm-card form-card">

      <div class="form-grid">

        <div class="form-group">
          <label>Nombre</label>

          <input
            id="marcaNombre"
            value="${escaparHTML(
              marca?.nombre || ""
            )}"
          />
        </div>

        <div class="form-group">

          <label>Estado</label>

          <select id="marcaEstado">

            <option
              value="Activa"
              ${
                marca?.estado === "Activa"
                  ? "selected"
                  : ""
              }
            >
              Activa
            </option>

            <option
              value="Pendiente"
              ${
                marca?.estado === "Pendiente"
                  ? "selected"
                  : ""
              }
            >
              Pendiente
            </option>

            <option
              value="Inactiva"
              ${
                marca?.estado === "Inactiva"
                  ? "selected"
                  : ""
              }
            >
              Inactiva
            </option>

          </select>

        </div>

      </div>

      <div class="form-group">

        <label>Descripción</label>

        <textarea
          id="marcaDescripcion"
          rows="5"
          placeholder="Descripción de la marca"
        >${escaparHTML(
          marca?.descripcion || ""
        )}</textarea>

      </div>

      <div class="form-actions">

        <button
          class="crm-btn primary"
          id="btnGuardarMarca"
        >
          Guardar marca
        </button>

      </div>

    </div>
  `;

  contenido
    .querySelector("#btnVolverMarca")
    ?.addEventListener("click", () => {
      mostrarMarcasAdmin(contenido);
    });

  contenido
    .querySelector("#btnGuardarMarca")
    ?.addEventListener("click", () => {

      const nombre =
        obtenerValorInput(
          contenido,
          "marcaNombre"
        );

      const estado =
        obtenerValorInput(
          contenido,
          "marcaEstado"
        );

      const descripcion =
        obtenerValorInput(
          contenido,
          "marcaDescripcion"
        );

      if (!nombre) {
        mostrarMensaje(
          "El nombre de la marca es obligatorio.",
          "error"
        );
        return;
      }

      const marcas =
        leerLocalStorage<Marca[]>(
          "karsan_marcas",
          []
        );

      const nuevaMarca: Marca = {
        id: marca?.id || generarId(),
        nombre,
        estado,
        descripcion
      };

      if (
        marca &&
        indice !== undefined
      ) {
        marcas[indice] = nuevaMarca;
      } else {
        marcas.push(nuevaMarca);
      }

      guardarLocalStorage(
        "karsan_marcas",
        marcas
      );

      mostrarMarcasAdmin(contenido);

      mostrarMensaje(
        "Marca guardada correctamente."
      );

    });

}

// =========================================================
// MARKETING
// =========================================================

function mostrarMarketingAdmin(
  contenido: HTMLElement
): void {

  const campanas =
    leerLocalStorage<Campana[]>(
      "karsan_campanas",
      [
        {
          id: 1,
          nombre: "Campaña Instagram",
          redSocial: "Instagram",
          descripcion: "Contenido para Instagram.",
          estado: "En proceso",
          imagenes: [],
          videos: []
        },
        {
          id: 2,
          nombre: "Publicidad Facebook",
          redSocial: "Facebook",
          descripcion: "Publicidad para Facebook.",
          estado: "Activa",
          imagenes: [],
          videos: []
        },
        {
          id: 3,
          nombre: "Contenido TikTok",
          redSocial: "TikTok",
          descripcion: "Contenido para TikTok.",
          estado: "Pendiente",
          imagenes: [],
          videos: []
        }
      ]
    );


  const totalCampanas =
    campanas.length;

  const activas =
    campanas.filter(
      (campana) =>
        campana.estado === "Activa"
    ).length;

  const pendientes =
    campanas.filter(
      (campana) =>
        campana.estado === "Pendiente"
    ).length;

  const enProceso =
    campanas.filter(
      (campana) =>
        campana.estado === "En proceso"
    ).length;

  const totalImagenes =
    campanas.reduce(
      (total, campana) =>
        total +
        (campana.imagenes?.length || 0),
      0
    );

  const totalVideos =
    campanas.reduce(
      (total, campana) =>
        total +
        (campana.videos?.length || 0),
      0
    );


  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>

        <div class="section-kicker">
          MARKETING DIGITAL
        </div>

        <h2>
          Marketing
        </h2>

        <p>
          Gestiona campañas, contenido multimedia
          y redes sociales de Karsan Digital.
        </p>

      </div>


      <button
        class="crm-btn primary"
        id="btnNuevaCampana"
      >
        + Nueva campaña
      </button>

    </div>


    <!-- ESTADÍSTICAS -->

    <div class="stats-grid">

      <div class="stat-card">

        <div class="stat-icon">
          📣
        </div>

        <div>

          <span>
            Total campañas
          </span>

          <strong>
            ${totalCampanas}
          </strong>

          <small>
            Campañas registradas
          </small>

        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          🟢
        </div>

        <div>

          <span>
            Campañas activas
          </span>

          <strong>
            ${activas}
          </strong>

          <small>
            Publicaciones activas
          </small>

        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          ⏳
        </div>

        <div>

          <span>
            En proceso
          </span>

          <strong>
            ${enProceso}
          </strong>

          <small>
            Campañas trabajando
          </small>

        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          🖼️
        </div>

        <div>

          <span>
            Contenido
          </span>

          <strong>
            ${totalImagenes + totalVideos}
          </strong>

          <small>
            ${totalImagenes} imágenes ·
            ${totalVideos} videos
          </small>

        </div>

      </div>

    </div>


    <!-- FILTROS -->

    <div class="crm-card">

      <div class="admin-card-heading">

        <div>

          <div class="section-kicker">
            GESTIÓN DE CAMPAÑAS
          </div>

          <h3>
            Campañas de marketing
          </h3>

          <p>
            Administra las campañas y el contenido
            solicitado por los clientes.
          </p>

        </div>

      </div>


      <div
        style="
          display:grid;
          grid-template-columns:minmax(220px,1fr) 220px;
          gap:14px;
          margin:20px 0 25px;
        "
      >

        <div class="form-group">

          <label>
            Buscar campaña
          </label>

          <input
            type="text"
            id="buscarCampanaAdmin"
            class="form-input"
            placeholder="Buscar por nombre, red social..."
          />

        </div>


        <div class="form-group">

          <label>
            Estado
          </label>

          <select
            id="filtroCampanaAdmin"
            class="form-input"
          >

            <option value="todos">
              Todos los estados
            </option>

            <option value="Activa">
              Activas
            </option>

            <option value="En proceso">
              En proceso
            </option>

            <option value="Pendiente">
              Pendientes
            </option>

          </select>

        </div>

      </div>


      <div id="listaCampanasAdmin">

      </div>

    </div>

  `;


  const lista =
    contenido.querySelector<HTMLElement>(
      "#listaCampanasAdmin"
    );

  const buscador =
    contenido.querySelector<HTMLInputElement>(
      "#buscarCampanaAdmin"
    );

  const filtro =
    contenido.querySelector<HTMLSelectElement>(
      "#filtroCampanaAdmin"
    );


  function obtenerClaseRedSocial(
    redSocial: string
  ): string {

    const red =
      redSocial.toLowerCase();

    if (red.includes("instagram")) {
      return "purple";
    }

    if (red.includes("facebook")) {
      return "blue";
    }

    if (red.includes("tiktok")) {
      return "dark";
    }

    if (red.includes("linkedin")) {
      return "cyan";
    }

    return "blue";
  }


  function renderizarCampanas(
    campanasFiltradas: Campana[]
  ): void {

    if (!lista) {
      return;
    }


    if (
      campanasFiltradas.length === 0
    ) {

      lista.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            🔎
          </div>

          <h3>
            No se encontraron campañas
          </h3>

          <p>
            Prueba con otro nombre o estado.
          </p>

        </div>

      `;

      return;
    }


    lista.innerHTML = `

      <div
        style="
          display:grid;
          grid-template-columns:
            repeat(auto-fit,minmax(280px,1fr));
          gap:20px;
        "
      >

        ${
          campanasFiltradas
            .map(
              (campana) => {

                const index =
                  campanas.indexOf(
                    campana
                  );

                const claseEstado =
                  campana.estado === "Activa"
                    ? "success"
                    : campana.estado === "Pendiente"
                    ? "pending"
                    : "process";


                return `

                  <div
                    class="crm-card"
                    style="
                      margin:0;
                      border:1px solid #edf0f7;
                    "
                  >

                    <!-- CABECERA -->

                    <div
                      style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:10px;
                        margin-bottom:18px;
                      "
                    >

                      <span
                        style="
                          display:inline-flex;
                          align-items:center;
                          gap:7px;
                          padding:7px 12px;
                          border-radius:20px;
                          background:#eef0ff;
                          color:#4546c9;
                          font-size:12px;
                          font-weight:700;
                        "
                      >
                        📱
                        ${escaparHTML(
                          campana.redSocial
                        )}
                      </span>


                      <span
                        class="status ${claseEstado}"
                      >
                        ${escaparHTML(
                          campana.estado
                        )}
                      </span>

                    </div>


                    <!-- ICONO -->

                    <div
                      style="
                        width:58px;
                        height:58px;
                        border-radius:16px;
                        background:linear-gradient(
                          135deg,
                          #eef0ff,
                          #f5f6ff
                        );
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:27px;
                        margin-bottom:15px;
                      "
                    >
                      📣
                    </div>


                    <h3
                      style="
                        margin-bottom:8px;
                      "
                    >
                      ${escaparHTML(
                        campana.nombre
                      )}
                    </h3>


                    <p
                      style="
                        min-height:48px;
                        color:#72798b;
                      "
                    >
                      ${escaparHTML(
                        campana.descripcion
                      )}
                    </p>


                    <!-- CONTENIDO -->

                    <div
                      style="
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                        margin:20px 0;
                      "
                    >

                      <span
                        style="
                          padding:8px 11px;
                          border-radius:9px;
                          background:#f7f8fc;
                          color:#596174;
                          font-size:13px;
                          font-weight:600;
                        "
                      >
                        🖼️
                        ${
                          campana.imagenes?.length ||
                          0
                        }
                        imágenes
                      </span>


                      <span
                        style="
                          padding:8px 11px;
                          border-radius:9px;
                          background:#f7f8fc;
                          color:#596174;
                          font-size:13px;
                          font-weight:600;
                        "
                      >
                        🎥
                        ${
                          campana.videos?.length ||
                          0
                        }
                        videos
                      </span>

                    </div>


                    <!-- ACCIONES -->

                    <div
                      style="
                        display:flex;
                        gap:8px;
                        flex-wrap:wrap;
                        border-top:1px solid #edf0f7;
                        padding-top:16px;
                      "
                    >

                      <button
                        class="crm-btn secondary"
                        data-ver-campana="${index}"
                      >
                        👁️ Ver
                      </button>


                      <button
                        class="crm-btn secondary"
                        data-edit-campana="${index}"
                      >
                        ✏️ Editar
                      </button>


                      <button
                        class="crm-btn danger"
                        data-delete-campana="${index}"
                      >
                        🗑️
                      </button>

                    </div>

                  </div>

                `;
              }
            )
            .join("")
        }

      </div>

    `;


    // VER CAMPAÑA

    lista
      .querySelectorAll<HTMLElement>(
        "[data-ver-campana]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .verCampana
              );

            const campana =
              campanas[index];

            if (!campana) {
              return;
            }


            contenido.innerHTML = `

              <div class="crm-page-header">

                <div>

                  <div class="section-kicker">
                    DETALLE DE CAMPAÑA
                  </div>

                  <h2>
                    ${escaparHTML(
                      campana.nombre
                    )}
                  </h2>

                  <p>
                    Información y contenido
                    de la campaña.
                  </p>

                </div>


                <button
                  class="crm-btn secondary"
                  id="btnVolverMarketing"
                >
                  ← Volver a marketing
                </button>

              </div>


              <div class="crm-card detail-card">

                <div class="detail-avatar">
                  📣
                </div>


                <h3>
                  ${escaparHTML(
                    campana.nombre
                  )}
                </h3>


                <p>
                  ${escaparHTML(
                    campana.descripcion
                  )}
                </p>


                <div
                  style="
                    display:grid;
                    grid-template-columns:
                      repeat(
                        auto-fit,
                        minmax(200px,1fr)
                      );
                    gap:18px;
                    margin-top:25px;
                  "
                >

                  <div>

                    <small>
                      RED SOCIAL
                    </small>

                    <p>
                      <strong>
                        📱
                        ${escaparHTML(
                          campana.redSocial
                        )}
                      </strong>
                    </p>

                  </div>


                  <div>

                    <small>
                      ESTADO
                    </small>

                    <p>

                      <span
                        class="status ${
                          campana.estado === "Activa"
                            ? "success"
                            : campana.estado === "Pendiente"
                            ? "pending"
                            : "process"
                        }"
                      >
                        ${escaparHTML(
                          campana.estado
                        )}
                      </span>

                    </p>

                  </div>


                  <div>

                    <small>
                      IMÁGENES
                    </small>

                    <p>
                      <strong>
                        🖼️
                        ${
                          campana.imagenes?.length ||
                          0
                        }
                      </strong>
                    </p>

                  </div>


                  <div>

                    <small>
                      VIDEOS
                    </small>

                    <p>
                      <strong>
                        🎥
                        ${
                          campana.videos?.length ||
                          0
                        }
                      </strong>
                    </p>

                  </div>

                </div>


                ${
                  (
                    campana.imagenes?.length ||
                    campana.videos?.length
                  )
                    ? `

                      <div
                        style="
                          margin-top:30px;
                          padding-top:24px;
                          border-top:1px solid #edf0f7;
                        "
                      >

                        <h4>
                          Contenido multimedia
                        </h4>

                        <div
                          style="
                            display:grid;
                            grid-template-columns:
                              repeat(
                                auto-fit,
                                minmax(220px,1fr)
                              );
                            gap:12px;
                            margin-top:15px;
                          "
                        >

                          ${
                            [
                              ...(campana.imagenes || []),
                              ...(campana.videos || [])
                            ]
                              .map(
                                (
                                  archivo
                                ) => `

                                  <div
                                    style="
                                      padding:14px;
                                      background:#f8f9fd;
                                      border:1px solid #edf0f7;
                                      border-radius:12px;
                                    "
                                  >

                                    <strong>
                                      ${
                                        archivo.tipo
                                          ?.startsWith(
                                            "video"
                                          )
                                          ? "🎥"
                                          : "🖼️"
                                      }
                                      ${escaparHTML(
                                        archivo.nombre
                                      )}
                                    </strong>

                                    <div
                                      style="
                                        color:#7a8194;
                                        font-size:12px;
                                        margin-top:5px;
                                      "
                                    >
                                      ${archivo.tamaño
                                        ? `${(
                                            archivo.tamaño /
                                            1024 /
                                            1024
                                          ).toFixed(
                                            2
                                          )} MB`
                                        : "Archivo"}
                                    </div>

                                  </div>

                                `
                              )
                              .join("")
                          }

                        </div>

                      </div>

                    `
                    : `

                      <div
                        class="info-box"
                        style="margin-top:25px;"
                      >
                        📁 Esta campaña todavía
                        no tiene contenido multimedia.
                      </div>

                    `
                }


                <div
                  style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                    margin-top:25px;
                  "
                >

                  <button
                    class="crm-btn secondary"
                    id="btnEditarCampanaDetalle"
                  >
                    ✏️ Editar campaña
                  </button>

                </div>

              </div>

            `;


            contenido
              .querySelector(
                "#btnVolverMarketing"
              )
              ?.addEventListener(
                "click",
                () => {

                  mostrarMarketingAdmin(
                    contenido
                  );

                }
              );


            contenido
              .querySelector(
                "#btnEditarCampanaDetalle"
              )
              ?.addEventListener(
                "click",
                () => {

                  mostrarFormularioCampanaAdmin(
                    contenido,
                    campana,
                    index
                  );

                }
              );

          }
        );

      });


    // EDITAR

    lista
      .querySelectorAll<HTMLElement>(
        "[data-edit-campana]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .editCampana
              );

            if (!campanas[index]) {
              return;
            }

            mostrarFormularioCampanaAdmin(
              contenido,
              campanas[index],
              index
            );

          }
        );

      });


    // ELIMINAR

    lista
      .querySelectorAll<HTMLElement>(
        "[data-delete-campana]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .deleteCampana
              );

            if (!campanas[index]) {
              return;
            }


            const confirmar =
              confirm(
                `¿Seguro que deseas eliminar la campaña "${campanas[index].nombre}"?`
              );

            if (!confirmar) {
              return;
            }


            campanas.splice(
              index,
              1
            );


            guardarLocalStorage(
              "karsan_campanas",
              campanas
            );


            mostrarMarketingAdmin(
              contenido
            );


            mostrarMensaje(
              "Campaña eliminada correctamente."
            );

          }
        );

      });

  }


  // FILTROS

  function aplicarFiltros(): void {

    const texto =
      buscador?.value
        .trim()
        .toLowerCase() || "";

    const estado =
      filtro?.value || "todos";


    const filtradas =
      campanas.filter(
        (campana) => {

          const nombre =
            (
              campana.nombre ||
              ""
            ).toLowerCase();

          const redSocial =
            (
              campana.redSocial ||
              ""
            ).toLowerCase();

          const descripcion =
            (
              campana.descripcion ||
              ""
            ).toLowerCase();

          const coincideTexto =
            nombre.includes(texto) ||
            redSocial.includes(texto) ||
            descripcion.includes(texto);


          const coincideEstado =
            estado === "todos" ||
            campana.estado === estado;


          return (
            coincideTexto &&
            coincideEstado
          );

        }
      );


    renderizarCampanas(
      filtradas
    );

  }


  // NUEVA CAMPAÑA

  contenido
    .querySelector(
      "#btnNuevaCampana"
    )
    ?.addEventListener(
      "click",
      () => {

        mostrarFormularioCampanaAdmin(
          contenido
        );

      }
    );


  buscador?.addEventListener(
    "input",
    aplicarFiltros
  );


  filtro?.addEventListener(
    "change",
    aplicarFiltros
  );


  renderizarCampanas(
    campanas
  );

}

// =========================================================
// FORMULARIO CAMPAÑA
// =========================================================

function mostrarFormularioCampanaAdmin(
  contenido: HTMLElement,
  campana?: Campana,
  indice?: number
): void {

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>

        <div class="section-kicker">
          MARKETING DIGITAL
        </div>

        <h2>
          ${campana ? "Editar campaña" : "Nueva campaña"}
        </h2>

        <p>
          ${
            campana
              ? "Actualiza la información y el contenido de la campaña."
              : "Crea una nueva campaña para las redes sociales."
          }
        </p>

      </div>

      <button
        class="crm-btn secondary"
        id="btnVolverCampana"
      >
        ← Volver
      </button>

    </div>


    <div class="crm-card form-card">

      <div class="admin-card-heading">

        <div>

          <div class="section-kicker">
            INFORMACIÓN GENERAL
          </div>

          <h3>
            Datos de la campaña
          </h3>

          <p>
            Completa la información principal de la campaña.
          </p>

        </div>

      </div>


      <div class="form-grid">


        <!-- NOMBRE -->

        <div class="form-group">

          <label for="campanaNombre">
            Nombre de la campaña *
          </label>

          <input
            id="campanaNombre"
            class="form-input"
            type="text"
            placeholder="Ej. Campaña Navidad 2026"
            value="${escaparHTML(
              campana?.nombre || ""
            )}"
          />

        </div>


        <!-- RED SOCIAL -->

        <div class="form-group">

          <label for="campanaRed">
            Red social *
          </label>

          <select
            id="campanaRed"
            class="form-input"
          >

            <option value="Instagram">
              Instagram
            </option>

            <option value="Facebook">
              Facebook
            </option>

            <option value="TikTok">
              TikTok
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

            <option value="Todas">
              Todas las redes
            </option>

          </select>

        </div>


        <!-- ESTADO -->

        <div class="form-group">

          <label for="campanaEstado">
            Estado *
          </label>

          <select
            id="campanaEstado"
            class="form-input"
          >

            <option value="Pendiente">
              Pendiente
            </option>

            <option value="En proceso">
              En proceso
            </option>

            <option value="Activa">
              Activa
            </option>

            <option value="Finalizada">
              Finalizada
            </option>

          </select>

        </div>

      </div>


      <!-- DESCRIPCIÓN -->

      <div class="form-group">

        <label for="campanaDescripcion">
          Descripción *
        </label>

        <textarea
          id="campanaDescripcion"
          class="form-input"
          rows="5"
          placeholder="Describe el objetivo y contenido de la campaña..."
        >${escaparHTML(
          campana?.descripcion || ""
        )}</textarea>

        <small>
          Explica brevemente qué se quiere publicar
          y cuál es el objetivo de la campaña.
        </small>

      </div>


      <!-- MULTIMEDIA -->

      <div
        style="
          margin-top:30px;
          padding-top:25px;
          border-top:1px solid #edf0f7;
        "
      >

        <div class="admin-card-heading">

          <div>

            <div class="section-kicker">
              CONTENIDO MULTIMEDIA
            </div>

            <h3>
              Imágenes y videos
            </h3>

            <p>
              Agrega los archivos que formarán parte
              de la campaña.
            </p>

          </div>

        </div>


        <div class="form-grid">


          <!-- IMÁGENES -->

          <div class="form-group">

            <label for="campanaImagenes">
              🖼️ Imágenes
            </label>

            <input
              id="campanaImagenes"
              class="form-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
            />

            <small>
              Formatos permitidos: JPG, PNG y WEBP.
              Máximo 10 MB por archivo.
            </small>

          </div>


          <!-- VIDEOS -->

          <div class="form-group">

            <label for="campanaVideos">
              🎥 Videos
            </label>

            <input
              id="campanaVideos"
              class="form-input"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              multiple
            />

            <small>
              Formatos permitidos: MP4, WEBM y MOV.
              Máximo 50 MB por archivo.
            </small>

          </div>

        </div>


        <div
          id="listaArchivosCampana"
          style="margin-top:20px;"
        ></div>

      </div>


      <!-- BOTONES -->

      <div
        class="form-actions"
        style="
          margin-top:30px;
          padding-top:20px;
          border-top:1px solid #edf0f7;
        "
      >

        <button
          class="crm-btn secondary"
          id="btnCancelarCampana"
        >
          Cancelar
        </button>

        <button
          class="crm-btn primary"
          id="btnGuardarCampana"
        >
          💾
          ${
            campana
              ? "Guardar cambios"
              : "Crear campaña"
          }
        </button>

      </div>

    </div>

  `;


  const redSocial =
    contenido.querySelector<HTMLSelectElement>(
      "#campanaRed"
    );

  const estado =
    contenido.querySelector<HTMLSelectElement>(
      "#campanaEstado"
    );


  if (campana) {

    if (redSocial) {
      redSocial.value =
        campana.redSocial;
    }

    if (estado) {
      estado.value =
        campana.estado;
    }

  }


  /*
   * ARCHIVOS EXISTENTES
   */

  let archivosExistentesImagenes: ArchivoMeta[] =
    [
      ...(campana?.imagenes || [])
    ];

  let archivosExistentesVideos: ArchivoMeta[] =
    [
      ...(campana?.videos || [])
    ];


  /*
   * ARCHIVOS NUEVOS
   */

  let nuevasImagenes: File[] = [];

  let nuevosVideos: File[] = [];


  /*
   * RENDERIZAR ARCHIVOS
   */

  function renderizarArchivos(): void {

    const lista =
      contenido.querySelector<HTMLElement>(
        "#listaArchivosCampana"
      );

    if (!lista) {
      return;
    }


    const hayArchivos =
      archivosExistentesImagenes.length > 0 ||
      archivosExistentesVideos.length > 0 ||
      nuevasImagenes.length > 0 ||
      nuevosVideos.length > 0;


    if (!hayArchivos) {

      lista.innerHTML = `

        <div
          class="info-box"
        >
          📁 Todavía no hay archivos agregados
          a esta campaña.
        </div>

      `;

      return;

    }


    lista.innerHTML = `

      <div>

        <h4
          style="
            margin-bottom:12px;
          "
        >
          Archivos de la campaña
        </h4>


        <div
          style="
            display:flex;
            flex-direction:column;
            gap:8px;
          "
        >


          ${
            archivosExistentesImagenes
              .map(
                (archivo, index) => `

                  <div
                    style="
                      display:flex;
                      align-items:center;
                      justify-content:space-between;
                      gap:12px;
                      padding:12px 14px;
                      border:1px solid #edf0f7;
                      border-radius:12px;
                      background:#fafbfe;
                    "
                  >

                    <div>

                      <strong>
                        🖼️
                        ${escaparHTML(
                          archivo.nombre
                        )}
                      </strong>

                      <div
                        style="
                          color:#7a8194;
                          font-size:12px;
                          margin-top:3px;
                        "
                      >
                        Imagen existente
                      </div>

                    </div>


                    <button
                      type="button"
                      class="icon-btn danger"
                      data-eliminar-imagen="${index}"
                      title="Eliminar imagen"
                    >
                      🗑️
                    </button>

                  </div>

                `
              )
              .join("")
          }


          ${
            archivosExistentesVideos
              .map(
                (archivo, index) => `

                  <div
                    style="
                      display:flex;
                      align-items:center;
                      justify-content:space-between;
                      gap:12px;
                      padding:12px 14px;
                      border:1px solid #edf0f7;
                      border-radius:12px;
                      background:#fafbfe;
                    "
                  >

                    <div>

                      <strong>
                        🎥
                        ${escaparHTML(
                          archivo.nombre
                        )}
                      </strong>

                      <div
                        style="
                          color:#7a8194;
                          font-size:12px;
                          margin-top:3px;
                        "
                      >
                        Video existente
                      </div>

                    </div>


                    <button
                      type="button"
                      class="icon-btn danger"
                      data-eliminar-video="${index}"
                      title="Eliminar video"
                    >
                      🗑️
                    </button>

                  </div>

                `
              )
              .join("")
          }


          ${
            nuevasImagenes
              .map(
                (archivo, index) => `

                  <div
                    style="
                      display:flex;
                      align-items:center;
                      justify-content:space-between;
                      gap:12px;
                      padding:12px 14px;
                      border:1px solid #dfe3ff;
                      border-radius:12px;
                      background:#f5f6ff;
                    "
                  >

                    <div>

                      <strong>
                        🖼️
                        ${escaparHTML(
                          archivo.name
                        )}
                      </strong>

                      <div
                        style="
                          color:#596174;
                          font-size:12px;
                          margin-top:3px;
                        "
                      >
                        Nuevo archivo ·
                        ${(
                          archivo.size /
                          1024 /
                          1024
                        ).toFixed(2)}
                        MB
                      </div>

                    </div>


                    <button
                      type="button"
                      class="icon-btn danger"
                      data-eliminar-nueva-imagen="${index}"
                      title="Quitar archivo"
                    >
                      🗑️
                    </button>

                  </div>

                `
              )
              .join("")
          }


          ${
            nuevosVideos
              .map(
                (archivo, index) => `

                  <div
                    style="
                      display:flex;
                      align-items:center;
                      justify-content:space-between;
                      gap:12px;
                      padding:12px 14px;
                      border:1px solid #dfe3ff;
                      border-radius:12px;
                      background:#f5f6ff;
                    "
                  >

                    <div>

                      <strong>
                        🎥
                        ${escaparHTML(
                          archivo.name
                        )}
                      </strong>

                      <div
                        style="
                          color:#596174;
                          font-size:12px;
                          margin-top:3px;
                        "
                      >
                        Nuevo archivo ·
                        ${(
                          archivo.size /
                          1024 /
                          1024
                        ).toFixed(2)}
                        MB
                      </div>

                    </div>


                    <button
                      type="button"
                      class="icon-btn danger"
                      data-eliminar-nuevo-video="${index}"
                      title="Quitar archivo"
                    >
                      🗑️
                    </button>

                  </div>

                `
              )
              .join("")
          }

        </div>

      </div>

    `;


    /*
     * ELIMINAR IMAGEN EXISTENTE
     */

    lista
      .querySelectorAll<HTMLElement>(
        "[data-eliminar-imagen]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .eliminarImagen
              );

            archivosExistentesImagenes.splice(
              index,
              1
            );

            renderizarArchivos();

          }
        );

      });


    /*
     * ELIMINAR VIDEO EXISTENTE
     */

    lista
      .querySelectorAll<HTMLElement>(
        "[data-eliminar-video]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .eliminarVideo
              );

            archivosExistentesVideos.splice(
              index,
              1
            );

            renderizarArchivos();

          }
        );

      });


    /*
     * ELIMINAR NUEVA IMAGEN
     */

    lista
      .querySelectorAll<HTMLElement>(
        "[data-eliminar-nueva-imagen]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .eliminarNuevaImagen
              );

            nuevasImagenes.splice(
              index,
              1
            );

            renderizarArchivos();

          }
        );

      });


    /*
     * ELIMINAR NUEVO VIDEO
     */

    lista
      .querySelectorAll<HTMLElement>(
        "[data-eliminar-nuevo-video]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .eliminarNuevoVideo
              );

            nuevosVideos.splice(
              index,
              1
            );

            renderizarArchivos();

          }
        );

      });

  }


  /*
   * INPUT IMÁGENES
   */

  const inputImagenes =
    contenido.querySelector<HTMLInputElement>(
      "#campanaImagenes"
    );


  inputImagenes?.addEventListener(
    "change",
    () => {

      const archivos =
        Array.from(
          inputImagenes.files || []
        );


      const validos: File[] = [];


      archivos.forEach(
        (archivo) => {

          const esImagen =
            archivo.type.startsWith(
              "image/"
            );

          const maximo =
            10 * 1024 * 1024;


          if (!esImagen) {

            mostrarMensaje(
              `${archivo.name} no es una imagen válida.`,
              "error"
            );

            return;

          }


          if (
            archivo.size > maximo
          ) {

            mostrarMensaje(
              `${archivo.name} supera el límite de 10 MB.`,
              "error"
            );

            return;

          }


          validos.push(
            archivo
          );

        }
      );


      nuevasImagenes = [
        ...nuevasImagenes,
        ...validos
      ];


      inputImagenes.value = "";

      renderizarArchivos();

    }
  );


  /*
   * INPUT VIDEOS
   */

  const inputVideos =
    contenido.querySelector<HTMLInputElement>(
      "#campanaVideos"
    );


  inputVideos?.addEventListener(
    "change",
    () => {

      const archivos =
        Array.from(
          inputVideos.files || []
        );


      const validos: File[] = [];


      archivos.forEach(
        (archivo) => {

          const esVideo =
            archivo.type.startsWith(
              "video/"
            );

          const maximo =
            50 * 1024 * 1024;


          if (!esVideo) {

            mostrarMensaje(
              `${archivo.name} no es un video válido.`,
              "error"
            );

            return;

          }


          if (
            archivo.size > maximo
          ) {

            mostrarMensaje(
              `${archivo.name} supera el límite de 50 MB.`,
              "error"
            );

            return;

          }


          validos.push(
            archivo
          );

        }
      );


      nuevosVideos = [
        ...nuevosVideos,
        ...validos
      ];


      inputVideos.value = "";

      renderizarArchivos();

    }
  );


  /*
   * VOLVER
   */

  contenido
    .querySelector(
      "#btnVolverCampana"
    )
    ?.addEventListener(
      "click",
      () => {

        mostrarMarketingAdmin(
          contenido
        );

      }
    );


  /*
   * CANCELAR
   */

  contenido
    .querySelector(
      "#btnCancelarCampana"
    )
    ?.addEventListener(
      "click",
      () => {

        mostrarMarketingAdmin(
          contenido
        );

      }
    );


  /*
   * GUARDAR
   */

  contenido
    .querySelector(
      "#btnGuardarCampana"
    )
    ?.addEventListener(
      "click",
      () => {

        const nombre =
          obtenerValorInput(
            contenido,
            "campanaNombre"
          ).trim();


        const red =
          obtenerValorInput(
            contenido,
            "campanaRed"
          );


        const estadoValor =
          obtenerValorInput(
            contenido,
            "campanaEstado"
          );


        const descripcion =
          obtenerValorInput(
            contenido,
            "campanaDescripcion"
          ).trim();


        if (!nombre) {

          mostrarMensaje(
            "El nombre de la campaña es obligatorio.",
            "error"
          );

          return;

        }


        if (!descripcion) {

          mostrarMensaje(
            "La descripción de la campaña es obligatoria.",
            "error"
          );

          return;

        }


        const campanas =
          leerLocalStorage<Campana[]>(
            "karsan_campanas",
            []
          );


        const nuevasImagenesMeta:
          ArchivoMeta[] =
            nuevasImagenes.map(
              (archivo) => ({
                nombre:
                  archivo.name,
                tipo:
                  archivo.type,
                tamaño:
                  archivo.size
              })
            );


        const nuevosVideosMeta:
          ArchivoMeta[] =
            nuevosVideos.map(
              (archivo) => ({
                nombre:
                  archivo.name,
                tipo:
                  archivo.type,
                tamaño:
                  archivo.size
              })
            );


        const nuevaCampana:
          Campana = {

            id:
              campana?.id ||
              generarId(),

            nombre,

            redSocial:
              red,

            estado:
              estadoValor,

            descripcion,

            imagenes:
              archivosExistentesImagenes
                .concat(
                  nuevasImagenesMeta
                ),

            videos:
              archivosExistentesVideos
                .concat(
                  nuevosVideosMeta
                )

          };


        if (
          campana &&
          indice !== undefined
        ) {

          campanas[indice] =
            nuevaCampana;

        } else {

          campanas.push(
            nuevaCampana
          );

        }


        guardarLocalStorage(
          "karsan_campanas",
          campanas
        );


        mostrarMarketingAdmin(
          contenido
        );


        mostrarMensaje(
          campana
            ? "Campaña actualizada correctamente."
            : "Campaña creada correctamente."
        );

      }
    );


  /*
   * MOSTRAR ARCHIVOS INICIALES
   */

  renderizarArchivos();

}

// =========================================================
// PROYECTOS
// =========================================================

function mostrarProyectosAdmin(
  contenido: HTMLElement
): void {

  const proyectos =
    leerLocalStorage<Proyecto[]>(
      "karsan_proyectos",
      [
        {
          id: 1,
          nombre: "Campaña Redes Sociales",
          cliente: "Nova Solutions",
          descripcion: "Gestión de redes sociales.",
          estado: "En proceso",
          enviado: false
        },
        {
          id: 2,
          nombre: "Diseño Web",
          cliente: "Grupo Andino",
          descripcion: "Diseño y desarrollo web.",
          estado: "Activo",
          enviado: true
        },
        {
          id: 3,
          nombre: "Plan de Marketing",
          cliente: "Urban Store",
          descripcion: "Plan de marketing digital.",
          estado: "Pendiente",
          enviado: false
        }
      ]
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Proyectos</h2>

        <p>
          Administra los proyectos de los clientes.
        </p>
      </div>

      <button
        class="crm-btn primary"
        id="btnNuevoProyecto"
      >
        + Nuevo proyecto
      </button>

    </div>

    <div class="crm-grid-cards">

      ${
        proyectos.map((proyecto, index) => `

          <div class="crm-card">

            <div class="campaign-top">

              <span class="campaign-network">
                📁 Proyecto
              </span>

              <span class="status ${
                proyecto.estado === "Activo"
                  ? "success"
                  : proyecto.estado === "Pendiente"
                  ? "pending"
                  : "process"
              }">
                ${escaparHTML(proyecto.estado)}
              </span>

            </div>

            <h3>
              ${escaparHTML(proyecto.nombre)}
            </h3>

            <p>
              <strong>Cliente:</strong>
              ${escaparHTML(proyecto.cliente)}
            </p>

            <p>
              ${escaparHTML(proyecto.descripcion)}
            </p>

            <p>
              <strong>Estado de envío:</strong>
              ${
                proyecto.enviado
                  ? "✅ Enviado al cliente"
                  : "⏳ No enviado"
              }
            </p>

            <div class="card-actions">

              <button
                class="crm-btn secondary"
                data-edit-proyecto="${index}"
              >
                Editar
              </button>

              ${
                !proyecto.enviado
                  ? `
                    <button
                      class="crm-btn primary"
                      data-send-proyecto="${index}"
                    >
                      Enviar
                    </button>
                  `
                  : ""
              }

              <button
                class="crm-btn danger"
                data-delete-proyecto="${index}"
              >
                Eliminar
              </button>

            </div>

          </div>

        `).join("")
      }

    </div>
  `;

  contenido
    .querySelector("#btnNuevoProyecto")
    ?.addEventListener("click", () => {
      mostrarFormularioProyectoAdmin(
        contenido
      );
    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-edit-proyecto]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.editProyecto
        );

        mostrarFormularioProyectoAdmin(
          contenido,
          proyectos[index],
          index
        );

      });

    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-send-proyecto]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.sendProyecto
        );

        proyectos[index].enviado = true;

        guardarLocalStorage(
          "karsan_proyectos",
          proyectos
        );

        mostrarProyectosAdmin(contenido);

        mostrarMensaje(
          "Proyecto enviado al cliente."
        );

      });

    });

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-delete-proyecto]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const index = Number(
          boton.dataset.deleteProyecto
        );

        if (
          !confirm(
            "¿Eliminar este proyecto?"
          )
        ) {
          return;
        }

        proyectos.splice(index, 1);

        guardarLocalStorage(
          "karsan_proyectos",
          proyectos
        );

        mostrarProyectosAdmin(contenido);

      });

    });

}

// =========================================================
// FORMULARIO PROYECTO
// =========================================================

function mostrarFormularioProyectoAdmin(
  contenido: HTMLElement,
  proyecto?: Proyecto,
  indice?: number
): void {

  const empresas =
    leerLocalStorage<Empresa[]>(
      "karsan_empresas",
      []
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>
          ${proyecto ? "Editar proyecto" : "Nuevo proyecto"}
        </h2>
      </div>

      <button
        class="crm-btn secondary"
        id="btnVolverProyecto"
      >
        ← Volver
      </button>

    </div>

    <div class="crm-card form-card">

      <div class="form-grid">

        <div class="form-group">

          <label>Nombre del proyecto</label>

          <input
            id="proyectoNombre"
            value="${escaparHTML(
              proyecto?.nombre || ""
            )}"
          />

        </div>

        <div class="form-group">

          <label>Cliente / Empresa</label>

          <input
            id="proyectoCliente"
            list="listaEmpresasProyecto"
            value="${escaparHTML(
              proyecto?.cliente || ""
            )}"
          />

          <datalist id="listaEmpresasProyecto">

            ${
              empresas
                .map(
                  (empresa) =>
                    `<option value="${escaparHTML(
                      empresa.nombre
                    )}"></option>`
                )
                .join("")
            }

          </datalist>

        </div>

        <div class="form-group">

          <label>Estado</label>

          <select id="proyectoEstado">

            <option value="Pendiente">
              Pendiente
            </option>

            <option value="En proceso">
              En proceso
            </option>

            <option value="Activo">
              Activo
            </option>

            <option value="Finalizado">
              Finalizado
            </option>

          </select>

        </div>

      </div>

      <div class="form-group">

        <label>Descripción</label>

        <textarea
          id="proyectoDescripcion"
          rows="5"
        >${escaparHTML(
          proyecto?.descripcion || ""
        )}</textarea>

      </div>

      <button
        class="crm-btn primary"
        id="btnGuardarProyecto"
      >
        Guardar proyecto
      </button>

    </div>
  `;

  const estado =
    contenido.querySelector<HTMLSelectElement>(
      "#proyectoEstado"
    );

  if (estado && proyecto) {
    estado.value = proyecto.estado;
  }

  contenido
    .querySelector("#btnVolverProyecto")
    ?.addEventListener("click", () => {
      mostrarProyectosAdmin(contenido);
    });

  contenido
    .querySelector("#btnGuardarProyecto")
    ?.addEventListener("click", () => {

      const nombre =
        obtenerValorInput(
          contenido,
          "proyectoNombre"
        );

      const cliente =
        obtenerValorInput(
          contenido,
          "proyectoCliente"
        );

      const estadoValor =
        obtenerValorInput(
          contenido,
          "proyectoEstado"
        );

      const descripcion =
        obtenerValorInput(
          contenido,
          "proyectoDescripcion"
        );

      if (!nombre || !cliente) {
        mostrarMensaje(
          "Nombre y cliente son obligatorios.",
          "error"
        );
        return;
      }

      const proyectos =
        leerLocalStorage<Proyecto[]>(
          "karsan_proyectos",
          []
        );

      const nuevoProyecto: Proyecto = {
        id: proyecto?.id || generarId(),
        nombre,
        cliente,
        estado: estadoValor,
        descripcion,
        enviado: proyecto?.enviado || false
      };

      if (
        proyecto &&
        indice !== undefined
      ) {
        proyectos[indice] = nuevoProyecto;
      } else {
        proyectos.push(nuevoProyecto);
      }

      guardarLocalStorage(
        "karsan_proyectos",
        proyectos
      );

      mostrarProyectosAdmin(contenido);

      mostrarMensaje(
        "Proyecto guardado correctamente."
      );

    });

}

// =========================================================
// REDES SOCIALES
// =========================================================

interface RedSocialAdmin {
  id: string;
  nombre: string;
  usuario: string;
  conectado: boolean;
}

function mostrarRedesSocialesAdmin(
  contenido: HTMLElement
): void {

  const redes =
    leerLocalStorage<RedSocialAdmin[]>(
      "karsan_redes_sociales",
      [
        {
          id: "instagram",
          nombre: "Instagram",
          usuario: "@karsandigital",
          conectado: true
        },
        {
          id: "facebook",
          nombre: "Facebook",
          usuario: "Karsan Digital",
          conectado: true
        },
        {
          id: "tiktok",
          nombre: "TikTok",
          usuario: "@karsandigital",
          conectado: false
        }
      ]
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Redes sociales</h2>

        <p>
          Administra las redes sociales de Karsan Digital.
        </p>
      </div>

      <button
        class="crm-btn primary"
        id="btnEditarRedes"
      >
        Editar redes
      </button>

    </div>

    <div class="crm-grid-cards">

      ${
        redes.map((red) => `

          <div class="crm-card social-card">

            <div class="social-icon">
              ${red.id === "instagram"
                ? "📸"
                : red.id === "facebook"
                ? "📘"
                : "🎵"}
            </div>

            <h3>
              ${escaparHTML(red.nombre)}
            </h3>

            <p>
              ${escaparHTML(red.usuario)}
            </p>

            <span class="status ${
              red.conectado
                ? "success"
                : "pending"
            }">
              ${
                red.conectado
                  ? "Conectada"
                  : "Desconectada"
              }
            </span>

          </div>

        `).join("")
      }

    </div>
  `;

  contenido
    .querySelector("#btnEditarRedes")
    ?.addEventListener("click", () => {

      contenido.innerHTML = `

        <div class="crm-page-header">

          <div>
            <h2>Configurar redes sociales</h2>
          </div>

          <button
            class="crm-btn secondary"
            id="btnVolverRedes"
          >
            ← Volver
          </button>

        </div>

        <div class="crm-card form-card">

          ${redes.map((red) => `

            <div class="form-group">

              <label>
                ${escaparHTML(red.nombre)}
              </label>

              <input
                id="red-${red.id}"
                value="${escaparHTML(
                  red.usuario
                )}"
                placeholder="Usuario o página"
              />

            </div>

          `).join("")}

          <button
            class="crm-btn primary"
            id="btnGuardarRedes"
          >
            Guardar redes
          </button>

        </div>
      `;

      contenido
        .querySelector("#btnVolverRedes")
        ?.addEventListener("click", () => {
          mostrarRedesSocialesAdmin(contenido);
        });

      contenido
        .querySelector("#btnGuardarRedes")
        ?.addEventListener("click", () => {

          redes.forEach((red) => {

            const valor =
              obtenerValorInput(
                contenido,
                `red-${red.id}`
              );

            red.usuario = valor;
            red.conectado = valor.length > 0;

          });

          guardarLocalStorage(
            "karsan_redes_sociales",
            redes
          );

          mostrarRedesSocialesAdmin(
            contenido
          );

          mostrarMensaje(
            "Redes sociales actualizadas."
          );

        });

    });

}

// =========================================================
// MENSAJES
// =========================================================

interface MensajeAdmin {
  id?: number;
  cliente: string;
  correo: string;
  mensaje: string;
  fecha: string;
}

function mostrarMensajesAdmin(
  contenido: HTMLElement
): void {

  const mensajes =
    leerLocalStorage<MensajeAdmin[]>(
      "karsan_mensajes",
      [
        {
          id: 1,
          cliente: "Cynthia Toscano",
          correo: "cynthia@example.com",
          mensaje:
            "Quisiera consultar el estado de mi proyecto.",
          fecha: "Hoy, 09:30"
        },
        {
          id: 2,
          cliente: "Juan Pérez",
          correo: "juan@example.com",
          mensaje:
            "¿Ya está listo el contenido para Instagram?",
          fecha: "Ayer, 15:20"
        },
        {
          id: 3,
          cliente: "María López",
          correo: "maria@example.com",
          mensaje:
            "Necesito comunicarme con mi asesor.",
          fecha: "Ayer, 11:10"
        }
      ]
    );

  const respuestas =
    leerLocalStorage<Record<string, string>>(
      "karsan_respuestas_mensajes",
      {}
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Mensajes</h2>

        <p>
          Comunicación con los clientes.
        </p>
      </div>

    </div>

    <div class="crm-messages">

      ${
        mensajes.map((mensaje) => `

          <div class="crm-card message-card">

            <div class="message-header">

              <div class="table-user">

                <div class="crm-avatar small">
                  ${obtenerInicial(mensaje.cliente)}
                </div>

                <div>
                  <strong>
                    ${escaparHTML(mensaje.cliente)}
                  </strong>

                  <span>
                    ${escaparHTML(mensaje.correo)}
                  </span>
                </div>

              </div>

              <small>
                ${escaparHTML(mensaje.fecha)}
              </small>

            </div>

            <div class="message-content">
              ${escaparHTML(mensaje.mensaje)}
            </div>

            ${
              respuestas[mensaje.correo]
                ? `
                  <div class="message-response">

                    <strong>
                      Respuesta del administrador:
                    </strong>

                    <p>
                      ${escaparHTML(
                        respuestas[mensaje.correo]
                      )}
                    </p>

                  </div>
                `
                : ""
            }

            <button
              class="crm-btn primary"
              data-responder="${escaparHTML(
                mensaje.correo
              )}"
            >
              Responder
            </button>

          </div>

        `).join("")
      }

    </div>
  `;

  contenido
    .querySelectorAll<HTMLElement>(
      "[data-responder]"
    )
    .forEach((boton) => {

      boton.addEventListener("click", () => {

        const correo =
          boton.dataset.responder || "";

        const mensaje =
          mensajes.find(
            (item) => item.correo === correo
          );

        if (mensaje) {
          mostrarFormularioRespuestaAdmin(
            contenido,
            mensaje
          );
        }

      });

    });

}

// =========================================================
// RESPONDER MENSAJE
// =========================================================

function mostrarFormularioRespuestaAdmin(
  contenido: HTMLElement,
  mensaje: MensajeAdmin
): void {

  const respuestas =
    leerLocalStorage<Record<string, string>>(
      "karsan_respuestas_mensajes",
      {}
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Responder mensaje</h2>

        <p>
          Cliente: ${escaparHTML(
            mensaje.cliente
          )}
        </p>
      </div>

      <button
        class="crm-btn secondary"
        id="btnVolverMensajes"
      >
        ← Volver
      </button>

    </div>

    <div class="crm-card form-card">

      <div class="message-original">

        <strong>Mensaje del cliente:</strong>

        <p>
          ${escaparHTML(mensaje.mensaje)}
        </p>

      </div>

      <div class="form-group">

        <label>Respuesta</label>

        <textarea
          id="respuestaMensaje"
          rows="7"
          placeholder="Escribe tu respuesta..."
        >${escaparHTML(
          respuestas[mensaje.correo] || ""
        )}</textarea>

      </div>

      <button
        class="crm-btn primary"
        id="btnEnviarRespuesta"
      >
        Enviar respuesta
      </button>

    </div>
  `;

  contenido
    .querySelector("#btnVolverMensajes")
    ?.addEventListener("click", () => {
      mostrarMensajesAdmin(contenido);
    });

  contenido
    .querySelector("#btnEnviarRespuesta")
    ?.addEventListener("click", () => {

      const respuesta =
        obtenerValorInput(
          contenido,
          "respuestaMensaje"
        );

      if (!respuesta) {
        mostrarMensaje(
          "Escribe una respuesta.",
          "error"
        );
        return;
      }

      respuestas[mensaje.correo] =
        respuesta;

      guardarLocalStorage(
        "karsan_respuestas_mensajes",
        respuestas
      );

      mostrarMensajesAdmin(contenido);

      mostrarMensaje(
        "Respuesta guardada correctamente."
      );

    });

}

// =========================================================
// CHATBOT
// =========================================================

function mostrarChatbotAdmin(
  contenido: HTMLElement
): void {

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>
        <h2>Chatbot</h2>

        <p>
          Asistente de Karsan Digital.
        </p>
      </div>

    </div>

    <div class="crm-card chatbot-card">

      <div
        id="chatbotMensajes"
        class="chatbot-messages"
      >

        <div class="chat-message bot">

          <strong>Karsan Bot</strong>

          <p>
            Hola. Soy el asistente de Karsan Digital.
            ¿En qué puedo ayudarte?
          </p>

        </div>

      </div>

      <div class="chatbot-input">

        <input
          id="chatbotInput"
          type="text"
          placeholder="Escribe un mensaje..."
        />

        <button
          class="crm-btn primary"
          id="btnEnviarChatbot"
        >
          Enviar
        </button>

      </div>

    </div>
  `;

  const enviar = () => {

    const input =
      contenido.querySelector<HTMLInputElement>(
        "#chatbotInput"
      );

    const mensajes =
      contenido.querySelector(
        "#chatbotMensajes"
      );

    if (!input || !mensajes) {
      return;
    }

    const texto = input.value.trim();

    if (!texto) {
      return;
    }

    mensajes.innerHTML += `

      <div class="chat-message user">

        <strong>Tú</strong>

        <p>
          ${escaparHTML(texto)}
        </p>

      </div>
    `;

    const respuesta =
      generarRespuestaChatbot(texto);

    mensajes.innerHTML += `

      <div class="chat-message bot">

        <strong>Karsan Bot</strong>

        <p>
          ${escaparHTML(respuesta)}
        </p>

      </div>
    `;

    input.value = "";

    mensajes.scrollTop =
      mensajes.scrollHeight;

  };

  contenido
    .querySelector("#btnEnviarChatbot")
    ?.addEventListener(
      "click",
      enviar
    );

  contenido
    .querySelector("#chatbotInput")
    ?.addEventListener(
      "keydown",
      (evento: Event) => {

        const tecladoEvento =
          evento as KeyboardEvent;

        if (tecladoEvento.key === "Enter") {
          enviar();
        }

      }
    );

}

// =========================================================
// RESPUESTAS CHATBOT
// =========================================================

function generarRespuestaChatbot(
  mensaje: string
): string {

  const texto =
    mensaje.toLowerCase();

  if (
    texto.includes("hola") ||
    texto.includes("buenas")
  ) {
    return "Hola. Bienvenido a Karsan Digital. ¿En qué puedo ayudarte?";
  }

  if (
    texto.includes("proyecto")
  ) {
    return "Puedes consultar la sección Proyectos para revisar el estado y la información de cada proyecto.";
  }

  if (
    texto.includes("comprobante") ||
    texto.includes("pago") ||
    texto.includes("transferencia")
  ) {
    return "Los comprobantes enviados por los clientes aparecen en la sección Comprobantes del administrador.";
  }

  if (
    texto.includes("redes") ||
    texto.includes("instagram") ||
    texto.includes("facebook") ||
    texto.includes("tiktok")
  ) {
    return "Puedes revisar las redes sociales desde la sección Redes sociales.";
  }

  if (
    texto.includes("asesor") ||
    texto.includes("contacto") ||
    texto.includes("persona")
  ) {
    return "Puedes comunicarte con un asesor desde la sección Mensajes.";
  }

  return "Puedo ayudarte con proyectos, comprobantes, redes sociales, mensajes y otras funciones de Karsan Digital.";
}

// =========================================================
// COMPROBANTES
// =========================================================

function mostrarDocumentosAdmin(
  contenido: HTMLElement
): void {

  const documentos =
    leerLocalStorage<Documento[]>(
      "karsan_documentos",
      []
    );

  const totalDocumentos = documentos.length;

  const pendientes = documentos.filter(
    (documento) =>
      !documento.estado ||
      documento.estado === "Pendiente"
  ).length;

  const aprobados = documentos.filter(
    (documento) =>
      documento.estado === "Aprobado"
  ).length;

  const rechazados = documentos.filter(
    (documento) =>
      documento.estado === "Rechazado"
  ).length;

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>

        <div class="section-kicker">
          GESTIÓN DOCUMENTAL
        </div>

        <h2>
          Comprobantes y documentos
        </h2>

        <p>
          Revisa, valida y gestiona los documentos
          enviados por los clientes.
        </p>

      </div>

    </div>


    <!-- ESTADÍSTICAS -->

    <div class="stats-grid">

      <div class="stat-card">

        <div class="stat-icon">
          📁
        </div>

        <div>
          <span>Total documentos</span>
          <strong>${totalDocumentos}</strong>
          <small>Registrados en el sistema</small>
        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          ⏳
        </div>

        <div>
          <span>Pendientes</span>
          <strong>${pendientes}</strong>
          <small>Esperando revisión</small>
        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          ✅
        </div>

        <div>
          <span>Aprobados</span>
          <strong>${aprobados}</strong>
          <small>Documentos validados</small>
        </div>

      </div>


      <div class="stat-card">

        <div class="stat-icon">
          ❌
        </div>

        <div>
          <span>Rechazados</span>
          <strong>${rechazados}</strong>
          <small>Requieren corrección</small>
        </div>

      </div>

    </div>


    <!-- CONTROLES -->

    <div class="crm-card">

      <div class="admin-card-heading">

        <div>

          <div class="section-kicker">
            DOCUMENTOS RECIBIDOS
          </div>

          <h3>
            Comprobantes de clientes
          </h3>

          <p>
            Consulta y administra todos los archivos
            enviados desde el portal del cliente.
          </p>

        </div>

      </div>


      <div
        style="
          display:grid;
          grid-template-columns:minmax(220px, 1fr) 220px;
          gap:14px;
          margin:20px 0;
        "
      >

        <div class="form-group">

          <label>
            Buscar documento
          </label>

          <input
            type="text"
            id="buscarDocumentoAdmin"
            class="form-input"
            placeholder="Buscar por nombre, cliente o correo..."
          />

        </div>


        <div class="form-group">

          <label>
            Filtrar por estado
          </label>

          <select
            id="filtroEstadoDocumento"
            class="form-input"
          >

            <option value="todos">
              Todos los estados
            </option>

            <option value="Pendiente">
              Pendientes
            </option>

            <option value="Aprobado">
              Aprobados
            </option>

            <option value="Rechazado">
              Rechazados
            </option>

          </select>

        </div>

      </div>


      <div id="listaDocumentosAdmin">

        ${
          documentos.length === 0
            ? `

              <div class="empty-state">

                <div class="empty-icon">
                  📁
                </div>

                <h3>
                  No hay documentos todavía
                </h3>

                <p>
                  Cuando un cliente suba un documento,
                  aparecerá automáticamente aquí.
                </p>

              </div>

            `
            : ``
        }

      </div>

    </div>

  `;


  const lista =
    contenido.querySelector<HTMLElement>(
      "#listaDocumentosAdmin"
    );

  const buscador =
    contenido.querySelector<HTMLInputElement>(
      "#buscarDocumentoAdmin"
    );

  const filtro =
    contenido.querySelector<HTMLSelectElement>(
      "#filtroEstadoDocumento"
    );


  function renderizarDocumentos(
    listaFiltrada: Documento[]
  ): void {

    if (!lista) {
      return;
    }


    if (listaFiltrada.length === 0) {

      lista.innerHTML = `

        <div class="empty-state">

          <div class="empty-icon">
            🔎
          </div>

          <h3>
            No se encontraron documentos
          </h3>

          <p>
            Prueba con otro nombre, cliente,
            correo o estado.
          </p>

        </div>

      `;

      return;
    }


    lista.innerHTML = `

      <div class="table-container">

        <table class="crm-table">

          <thead>

            <tr>

              <th>
                Documento
              </th>

              <th>
                Cliente
              </th>

              <th>
                Tipo
              </th>

              <th>
                Fecha
              </th>

              <th>
                Estado
              </th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>


          <tbody>

            ${
              listaFiltrada
                .map(
                  (documento) => {

                    const index =
                      documentos.indexOf(
                        documento
                      );

                    const estado =
                      documento.estado ||
                      "Pendiente";

                    const claseEstado =
                      estado === "Aprobado"
                        ? "success"
                        : estado === "Rechazado"
                        ? "danger"
                        : "pending";


                    return `

                      <tr>

                        <td>

                          <div
                            style="
                              display:flex;
                              align-items:center;
                              gap:12px;
                            "
                          >

                            <div
                              style="
                                width:42px;
                                height:42px;
                                border-radius:12px;
                                background:#eef0ff;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                font-size:20px;
                                flex-shrink:0;
                              "
                            >
                              📄
                            </div>

                            <div>

                              <strong>
                                ${escaparHTML(
                                  documento.nombre ||
                                  "Documento sin nombre"
                                )}
                              </strong>

                              <div
                                style="
                                  font-size:12px;
                                  color:#7a8194;
                                  margin-top:3px;
                                "
                              >
                                ${
                                  documento.url
                                    ? "Archivo disponible"
                                    : "Sin archivo asociado"
                                }
                              </div>

                            </div>

                          </div>

                        </td>


                        <td>

                          <strong>
                            ${escaparHTML(
                              documento.usuario ||
                              documento.correo ||
                              "Cliente"
                            )}
                          </strong>

                          ${
                            documento.usuario &&
                            documento.correo
                              ? `
                                <div
                                  style="
                                    font-size:12px;
                                    color:#7a8194;
                                    margin-top:3px;
                                  "
                                >
                                  ${escaparHTML(
                                    documento.correo
                                  )}
                                </div>
                              `
                              : ""
                          }

                        </td>


                        <td>

                          <span>
                            ${escaparHTML(
                              documento.tipo ||
                              "Documento"
                            )}
                          </span>

                        </td>


                        <td>

                          ${escaparHTML(
                            documento.fecha ||
                            "Sin fecha"
                          )}

                        </td>


                        <td>

                          <span
                            class="status ${claseEstado}"
                          >
                            ${escaparHTML(
                              estado
                            )}
                          </span>

                        </td>


                        <td>

                          <div
                            class="table-actions"
                          >

                            <button
                              class="icon-btn"
                              data-ver-documento="${index}"
                              title="Ver detalle"
                            >
                              👁️
                            </button>


                            ${
                              documento.url
                                ? `
                                  <a
                                    class="icon-btn"
                                    href="${escaparHTML(
                                      documento.url
                                    )}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Abrir / descargar"
                                  >
                                    📥
                                  </a>
                                `
                                : ""
                            }


                            ${
                              estado !== "Aprobado"
                                ? `
                                  <button
                                    class="icon-btn"
                                    data-aprobar-documento="${index}"
                                    title="Aprobar documento"
                                  >
                                    ✅
                                  </button>
                                `
                                : ""
                            }


                            ${
                              estado !== "Rechazado"
                                ? `
                                  <button
                                    class="icon-btn danger"
                                    data-rechazar-documento="${index}"
                                    title="Rechazar documento"
                                  >
                                    ❌
                                  </button>
                                `
                                : ""
                            }

                          </div>

                        </td>

                      </tr>

                    `;
                  }
                )
                .join("")
            }

          </tbody>

        </table>

      </div>

    `;


    // VER DETALLE

    lista
      .querySelectorAll<HTMLElement>(
        "[data-ver-documento]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .verDocumento
              );

            const documento =
              documentos[index];

            if (!documento) {
              return;
            }


            contenido.innerHTML = `

              <div class="crm-page-header">

                <div>

                  <div class="section-kicker">
                    DETALLE DEL DOCUMENTO
                  </div>

                  <h2>
                    ${escaparHTML(
                      documento.nombre ||
                      "Documento"
                    )}
                  </h2>

                  <p>
                    Información del archivo enviado
                    por el cliente.
                  </p>

                </div>


                <button
                  class="crm-btn secondary"
                  id="btnVolverDocumentos"
                >
                  ← Volver a documentos
                </button>

              </div>


              <div
                class="crm-card detail-card"
              >

                <div
                  class="detail-avatar"
                >
                  📄
                </div>


                <h3>
                  ${escaparHTML(
                    documento.nombre ||
                    "Documento"
                  )}
                </h3>


                <div
                  style="
                    display:grid;
                    grid-template-columns:
                      repeat(auto-fit,minmax(220px,1fr));
                    gap:18px;
                    margin-top:25px;
                  "
                >

                  <div>

                    <small>
                      CLIENTE
                    </small>

                    <p>
                      <strong>
                        ${escaparHTML(
                          documento.usuario ||
                          "No registrado"
                        )}
                      </strong>
                    </p>

                  </div>


                  <div>

                    <small>
                      CORREO
                    </small>

                    <p>
                      <strong>
                        ${escaparHTML(
                          documento.correo ||
                          "No registrado"
                        )}
                      </strong>
                    </p>

                  </div>


                  <div>

                    <small>
                      TIPO
                    </small>

                    <p>
                      <strong>
                        ${escaparHTML(
                          documento.tipo ||
                          "Documento"
                        )}
                      </strong>
                    </p>

                  </div>


                  <div>

                    <small>
                      FECHA
                    </small>

                    <p>
                      <strong>
                        ${escaparHTML(
                          documento.fecha ||
                          "Sin fecha"
                        )}
                      </strong>
                    </p>

                  </div>


                  <div>

                    <small>
                      ESTADO
                    </small>

                    <p>

                      <span
                        class="status ${
                          documento.estado ===
                          "Aprobado"
                            ? "success"
                            : documento.estado ===
                              "Rechazado"
                            ? "danger"
                            : "pending"
                        }"
                      >
                        ${escaparHTML(
                          documento.estado ||
                          "Pendiente"
                        )}
                      </span>

                    </p>

                  </div>

                </div>


                <div
                  style="
                    margin-top:30px;
                    padding-top:24px;
                    border-top:1px solid #edf0f7;
                  "
                >

                  ${
                    documento.url
                      ? `

                        <a
                          class="crm-btn primary"
                          href="${escaparHTML(
                            documento.url
                          )}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📥 Ver / descargar archivo
                        </a>

                      `
                      : `

                        <div class="info-box">
                          📁 Este documento todavía
                          no tiene un archivo asociado.
                        </div>

                      `
                  }

                </div>


                <div
                  style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                    margin-top:20px;
                  "
                >

                  ${
                    documento.estado !==
                    "Aprobado"
                      ? `
                        <button
                          class="crm-btn primary"
                          id="btnAprobarDetalle"
                        >
                          ✅ Aprobar documento
                        </button>
                      `
                      : ""
                  }


                  ${
                    documento.estado !==
                    "Rechazado"
                      ? `
                        <button
                          class="crm-btn secondary"
                          id="btnRechazarDetalle"
                        >
                          ❌ Rechazar documento
                        </button>
                      `
                      : ""
                  }

                </div>

              </div>

            `;


            contenido
              .querySelector(
                "#btnVolverDocumentos"
              )
              ?.addEventListener(
                "click",
                () => {

                  mostrarDocumentosAdmin(
                    contenido
                  );

                }
              );


            contenido
              .querySelector(
                "#btnAprobarDetalle"
              )
              ?.addEventListener(
                "click",
                () => {

                  documentos[index].estado =
                    "Aprobado";

                  guardarLocalStorage(
                    "karsan_documentos",
                    documentos
                  );

                  mostrarDocumentosAdmin(
                    contenido
                  );

                  mostrarMensaje(
                    "Documento aprobado correctamente."
                  );

                }
              );


            contenido
              .querySelector(
                "#btnRechazarDetalle"
              )
              ?.addEventListener(
                "click",
                () => {

                  documentos[index].estado =
                    "Rechazado";

                  guardarLocalStorage(
                    "karsan_documentos",
                    documentos
                  );

                  mostrarDocumentosAdmin(
                    contenido
                  );

                  mostrarMensaje(
                    "Documento rechazado correctamente."
                  );

                }
              );

          }
        );

      });


    // APROBAR

    lista
      .querySelectorAll<HTMLElement>(
        "[data-aprobar-documento]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .aprobarDocumento
              );

            if (!documentos[index]) {
              return;
            }

            documentos[index].estado =
              "Aprobado";

            guardarLocalStorage(
              "karsan_documentos",
              documentos
            );

            mostrarDocumentosAdmin(
              contenido
            );

            mostrarMensaje(
              "Documento aprobado correctamente."
            );

          }
        );

      });


    // RECHAZAR

    lista
      .querySelectorAll<HTMLElement>(
        "[data-rechazar-documento]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const index =
              Number(
                boton.dataset
                  .rechazarDocumento
              );

            if (!documentos[index]) {
              return;
            }

            documentos[index].estado =
              "Rechazado";

            guardarLocalStorage(
              "karsan_documentos",
              documentos
            );

            mostrarDocumentosAdmin(
              contenido
            );

            mostrarMensaje(
              "Documento rechazado correctamente."
            );

          }
        );

      });

  }


  // FILTRAR DOCUMENTOS

  function aplicarFiltros(): void {

    const texto =
      buscador?.value
        .trim()
        .toLowerCase() || "";

    const estado =
      filtro?.value || "todos";


    const filtrados =
      documentos.filter(
        (documento) => {

          const nombre =
            (
              documento.nombre ||
              ""
            ).toLowerCase();

          const cliente =
            (
              documento.usuario ||
              ""
            ).toLowerCase();

          const correo =
            (
              documento.correo ||
              ""
            ).toLowerCase();

          const tipo =
            (
              documento.tipo ||
              ""
            ).toLowerCase();

          const coincideTexto =
            nombre.includes(texto) ||
            cliente.includes(texto) ||
            correo.includes(texto) ||
            tipo.includes(texto);


          const estadoDocumento =
            documento.estado ||
            "Pendiente";

          const coincideEstado =
            estado === "todos" ||
            estadoDocumento === estado;


          return (
            coincideTexto &&
            coincideEstado
          );

        }
      );


    renderizarDocumentos(
      filtrados
    );

  }


  buscador?.addEventListener(
    "input",
    aplicarFiltros
  );


  filtro?.addEventListener(
    "change",
    aplicarFiltros
  );


  // Mostrar documentos inicialmente

  if (documentos.length > 0) {

    renderizarDocumentos(
      documentos
    );

  }

}

// =========================================================
// REPORTES
// =========================================================

function mostrarReportesAdmin(
  contenido: HTMLElement
): void {

  const clientes =
    leerLocalStorage<Cliente[]>(
      "karsan_clientes",
      []
    );

  const empresas =
    leerLocalStorage<Empresa[]>(
      "karsan_empresas",
      []
    );

  const proyectos =
    leerLocalStorage<Proyecto[]>(
      "karsan_proyectos",
      []
    );

  const documentos =
    leerLocalStorage<Documento[]>(
      "karsan_documentos",
      []
    );

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>

        <h2>Reportes</h2>

        <p>
          Resumen de información del CRM.
        </p>

      </div>

      <button
        class="crm-btn primary"
        id="btnDescargarReporte"
      >
        📥 Descargar reporte
      </button>

    </div>

    <div class="stats-grid">

      <div class="stat-card">

        <div class="stat-icon">
          👥
        </div>

        <div>
          <span>Clientes</span>
          <strong>${clientes.length}</strong>
        </div>

      </div>

      <div class="stat-card">

        <div class="stat-icon">
          🏢
        </div>

        <div>
          <span>Empresas</span>
          <strong>${empresas.length}</strong>
        </div>

      </div>

      <div class="stat-card">

        <div class="stat-icon">
          📁
        </div>

        <div>
          <span>Proyectos</span>
          <strong>${proyectos.length}</strong>
        </div>

      </div>

      <div class="stat-card">

        <div class="stat-icon">
          🧾
        </div>

        <div>
          <span>Comprobantes</span>
          <strong>${documentos.length}</strong>
        </div>

      </div>

    </div>

    <div class="crm-card">

      <h3>Resumen del sistema</h3>

      <div class="report-summary">

        <p>
          <strong>Clientes registrados:</strong>
          ${clientes.length}
        </p>

        <p>
          <strong>Empresas registradas:</strong>
          ${empresas.length}
        </p>

        <p>
          <strong>Proyectos registrados:</strong>
          ${proyectos.length}
        </p>

        <p>
          <strong>Comprobantes recibidos:</strong>
          ${documentos.length}
        </p>

      </div>

    </div>
  `;

  contenido
    .querySelector("#btnDescargarReporte")
    ?.addEventListener("click", () => {

      const reporte = `
KARSAN DIGITAL
REPORTE DEL CRM

Clientes registrados: ${clientes.length}
Empresas registradas: ${empresas.length}
Proyectos registrados: ${proyectos.length}
Comprobantes recibidos: ${documentos.length}

Fecha:
${new Date().toLocaleString("es-EC")}
      `.trim();

      const blob =
        new Blob(
          [reporte],
          {
            type: "text/plain;charset=utf-8"
          }
        );

      const url =
        URL.createObjectURL(blob);

      const enlace =
        document.createElement("a");

      enlace.href = url;

      enlace.download =
        "reporte-karsan-digital.txt";

      enlace.click();

      URL.revokeObjectURL(url);

      mostrarMensaje(
        "Reporte descargado."
      );

    });

}

// =========================================================
// NOTIFICACIONES
// =========================================================

// =========================================================
// NOTIFICACIONES
// =========================================================

function mostrarNotificacionesAdmin(
  contenido: HTMLElement
): void {

  interface NotificacionAdmin {
    id: string;
    titulo: string;
    descripcion: string;
    tiempo: string;
    tipo: string;
    leida: boolean;
  }

  const notificacionesIniciales: NotificacionAdmin[] = [
    {
      id: "notificacion-1",
      titulo: "Nuevo cliente registrado",
      descripcion: "Se registró un nuevo cliente en el sistema.",
      tiempo: "Hace 10 min",
      tipo: "cliente",
      leida: false
    },
    {
      id: "notificacion-2",
      titulo: "Nuevo documento",
      descripcion: "Un cliente ha subido un nuevo documento.",
      tiempo: "Hace 25 min",
      tipo: "documento",
      leida: false
    },
    {
      id: "notificacion-3",
      titulo: "Nuevo comprobante",
      descripcion: "Se ha recibido un nuevo comprobante de pago.",
      tiempo: "Hace 40 min",
      tipo: "comprobante",
      leida: false
    },
    {
      id: "notificacion-4",
      titulo: "Nuevo mensaje",
      descripcion: "Un cliente ha enviado un nuevo mensaje.",
      tiempo: "Hace 1 hora",
      tipo: "mensaje",
      leida: true
    },
    {
      id: "notificacion-5",
      titulo: "Nuevo proyecto",
      descripcion: "Se ha creado un nuevo proyecto.",
      tiempo: "Hace 2 horas",
      tipo: "proyecto",
      leida: true
    },
    {
      id: "notificacion-6",
      titulo: "Nueva campaña",
      descripcion: "Se ha creado una nueva campaña de marketing.",
      tiempo: "Hace 3 horas",
      tipo: "campana",
      leida: true
    },
    {
      id: "notificacion-7",
      titulo: "Documento aprobado",
      descripcion: "Un documento fue aprobado correctamente.",
      tiempo: "Ayer",
      tipo: "aprobado",
      leida: true
    },
    {
      id: "notificacion-8",
      titulo: "Documento rechazado",
      descripcion: "Un documento necesita revisión.",
      tiempo: "Ayer",
      tipo: "rechazado",
      leida: true
    }
  ];

  let notificaciones =
    leerLocalStorage<NotificacionAdmin[]>(
      "karsan_notificaciones",
      notificacionesIniciales
    );

  function guardarNotificaciones(): void {
    guardarLocalStorage(
      "karsan_notificaciones",
      notificaciones
    );
  }

  function obtenerIcono(tipo: string): string {

    switch (tipo) {

      case "cliente":
        return "👥";

      case "documento":
        return "📁";

      case "comprobante":
        return "💵";

      case "mensaje":
        return "💬";

      case "proyecto":
        return "📊";

      case "campana":
        return "📣";

      case "aprobado":
        return "✅";

      case "rechazado":
        return "❌";

      default:
        return "🔔";
    }
  }

  function obtenerClase(tipo: string): string {

    switch (tipo) {

      case "cliente":
        return "blue";

      case "documento":
        return "purple";

      case "comprobante":
        return "green";

      case "mensaje":
        return "orange";

      case "proyecto":
        return "cyan";

      case "campana":
        return "pink";

      case "aprobado":
        return "green";

      case "rechazado":
        return "red";

      default:
        return "blue";
    }
  }

  function renderizarNotificaciones(): void {

    const pendientes =
      notificaciones.filter(
        (notificacion) =>
          !notificacion.leida
      ).length;

    contenido.innerHTML = `

      <div class="crm-page-header">

        <div>

          <h2>Notificaciones</h2>

          <p>
            Revisa las novedades y actividades de tu CRM.
          </p>

        </div>

        <div class="crm-page-actions">

          <button
            id="marcarTodasNotificaciones"
            class="crm-btn primary"
            ${pendientes === 0 ? "disabled" : ""}
          >
            ✓ Marcar todas como leídas
          </button>

        </div>

      </div>

      <div class="crm-grid-cards">

        <div class="crm-card">

          <div class="brand-icon">
            🔔
          </div>

          <h3>
            ${pendientes}
          </h3>

          <p>
            Notificaciones pendientes
          </p>

        </div>

        <div class="crm-card">

          <div class="brand-icon">
            📋
          </div>

          <h3>
            ${notificaciones.length}
          </h3>

          <p>
            Notificaciones totales
          </p>

        </div>

        <div class="crm-card">

          <div class="brand-icon">
            ✅
          </div>

          <h3>
            ${
              notificaciones.filter(
                (notificacion) =>
                  notificacion.leida
              ).length
            }
          </h3>

          <p>
            Notificaciones leídas
          </p>

        </div>

      </div>

      <div class="crm-card">

        <div class="crm-card-header">

          <div>

            <h3>
              Actividad reciente
            </h3>

            <p>
              Últimas novedades del sistema.
            </p>

          </div>

        </div>

        <div class="crm-list">

          ${
            notificaciones.length === 0

              ? `

                <div class="crm-empty">

                  <div class="crm-empty-icon">
                    🔔
                  </div>

                  <h3>
                    No hay notificaciones
                  </h3>

                  <p>
                    Cuando exista una nueva actividad aparecerá aquí.
                  </p>

                </div>

              `

              : notificaciones.map(
                  (notificacion) => `

                    <div
                      class="crm-list-item ${
                        notificacion.leida
                          ? ""
                          : "notification-unread"
                      }"
                      data-notificacion-id="${
                        notificacion.id
                      }"
                    >

                      <div
                        class="crm-list-icon notification-icon ${
                          obtenerClase(
                            notificacion.tipo
                          )
                        }"
                      >

                        ${obtenerIcono(
                          notificacion.tipo
                        )}

                      </div>

                      <div class="notification-content">

                        <strong>

                          ${escaparHTML(
                            notificacion.titulo
                          )}

                          ${
                            !notificacion.leida
                              ? `
                                <span class="notification-new">
                                  NUEVA
                                </span>
                              `
                              : ""
                          }

                        </strong>

                        <span>

                          ${escaparHTML(
                            notificacion.descripcion
                          )}

                        </span>

                        <small>

                          ${escaparHTML(
                            notificacion.tiempo
                          )}

                        </small>

                      </div>

                      <div class="notification-actions">

                        ${
                          notificacion.leida

                            ? `
                              <span class="notification-read">
                                ✓ Leída
                              </span>
                            `

                            : `
                              <button
                                class="crm-btn secondary btn-marcar-notificacion"
                                data-id="${
                                  notificacion.id
                                }"
                              >
                                Marcar como leída
                              </button>
                            `
                        }

                      </div>

                    </div>

                  `
                ).join("")
          }

        </div>

      </div>
    `;

    const botonTodas =
      document.getElementById(
        "marcarTodasNotificaciones"
      ) as HTMLButtonElement | null;

    if (botonTodas) {

      botonTodas.addEventListener(
        "click",
        () => {

          notificaciones =
            notificaciones.map(
              (notificacion) => ({
                ...notificacion,
                leida: true
              })
            );

          guardarNotificaciones();

          renderizarNotificaciones();

        }
      );

    }

    const botonesIndividuales =
      contenido.querySelectorAll(
        ".btn-marcar-notificacion"
      );

    botonesIndividuales.forEach(
      (boton) => {

        boton.addEventListener(
          "click",
          () => {

            const id =
              (boton as HTMLElement)
                .dataset.id;

            if (!id) {
              return;
            }

            notificaciones =
              notificaciones.map(
                (notificacion) =>
                  notificacion.id === id
                    ? {
                        ...notificacion,
                        leida: true
                      }
                    : notificacion
              );

            guardarNotificaciones();

            renderizarNotificaciones();

          }
        );

      }
    );

  }

  renderizarNotificaciones();

}

// =========================================================
// CONFIGURACIÓN
// =========================================================

function mostrarConfiguracionAdmin(
  contenido: HTMLElement
): void {

  interface ConfiguracionAdmin {
    nombre: string;
    correo: string;
    telefono: string;
    avatar: string;
    notificaciones: boolean;
    mensajes: boolean;
    documentos: boolean;
    comprobantes: boolean;
    clientes: boolean;
    empresaNombre: string;
    empresaCorreo: string;
    empresaTelefono: string;
    empresaContacto: string;
  }

  const configuracionInicial: ConfiguracionAdmin = {
    nombre: "Administrador",
    correo: "admin@karsandigital.com",
    telefono: "",
    avatar: "",
    notificaciones: true,
    mensajes: true,
    documentos: true,
    comprobantes: true,
    clientes: true,
    empresaNombre: "Karsan Digital",
    empresaCorreo: "rrhh@karsandigital.com",
    empresaTelefono: "",
    empresaContacto:
      "Atención y soporte para nuestros clientes."
  };

  let configuracion =
    leerLocalStorage<ConfiguracionAdmin>(
      "karsan_configuracion_admin",
      configuracionInicial
    );

  function guardarConfiguracion(): void {

    guardarLocalStorage(
      "karsan_configuracion_admin",
      configuracion
    );

  }

  contenido.innerHTML = `

    <div class="crm-page-header">

      <div>

        <h2>Configuración</h2>

        <p>
          Administra tu perfil, notificaciones, seguridad
          e información de Karsan Digital.
        </p>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- PERFIL -->
    <!-- ================================================= -->

    <div class="crm-card">

      <div class="crm-card-header">

        <div>

          <h3>
            👤 Mi perfil
          </h3>

          <p>
            Administra la información de tu cuenta.
          </p>

        </div>

      </div>

      <div class="form-grid">

        <div class="form-group">

          <label>
            Nombre
          </label>

          <input
            id="configNombre"
            type="text"
            value="${escaparHTML(
              configuracion.nombre
            )}"
            placeholder="Nombre del administrador"
          />

        </div>

        <div class="form-group">

          <label>
            Correo electrónico
          </label>

          <input
            id="configCorreo"
            type="email"
            value="${escaparHTML(
              configuracion.correo
            )}"
            placeholder="correo@ejemplo.com"
          />

        </div>

        <div class="form-group">

          <label>
            Teléfono
          </label>

          <input
            id="configTelefono"
            type="tel"
            value="${escaparHTML(
              configuracion.telefono
            )}"
            placeholder="0999999999"
          />

        </div>

        <div class="form-group">

          <label>
            Avatar
          </label>

          <input
            id="configAvatar"
            type="text"
            value="${escaparHTML(
              configuracion.avatar
            )}"
            placeholder="URL de la imagen"
          />

        </div>

      </div>

      <div class="form-actions">

        <button
          id="guardarPerfilAdmin"
          class="crm-btn primary"
        >
          💾 Guardar perfil
        </button>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- NOTIFICACIONES -->
    <!-- ================================================= -->

    <div class="crm-card">

      <div class="crm-card-header">

        <div>

          <h3>
            🔔 Notificaciones
          </h3>

          <p>
            Decide qué avisos quieres recibir.
          </p>

        </div>

      </div>

      <div class="configuration-options">

        <label class="configuration-option">

          <input
            id="configNotificaciones"
            type="checkbox"
            ${
              configuracion.notificaciones
                ? "checked"
                : ""
            }
          />

          <span>
            <strong>
              Activar notificaciones
            </strong>

            <small>
              Recibir avisos del sistema.
            </small>
          </span>

        </label>


        <label class="configuration-option">

          <input
            id="configMensajes"
            type="checkbox"
            ${
              configuracion.mensajes
                ? "checked"
                : ""
            }
          />

          <span>
            <strong>
              💬 Mensajes
            </strong>

            <small>
              Avisarme cuando llegue un nuevo mensaje.
            </small>
          </span>

        </label>


        <label class="configuration-option">

          <input
            id="configDocumentos"
            type="checkbox"
            ${
              configuracion.documentos
                ? "checked"
                : ""
            }
          />

          <span>
            <strong>
              📁 Documentos
            </strong>

            <small>
              Avisarme cuando un cliente suba un documento.
            </small>
          </span>

        </label>


        <label class="configuration-option">

          <input
            id="configComprobantes"
            type="checkbox"
            ${
              configuracion.comprobantes
                ? "checked"
                : ""
            }
          />

          <span>
            <strong>
              💵 Comprobantes
            </strong>

            <small>
              Avisarme cuando llegue un comprobante.
            </small>
          </span>

        </label>


        <label class="configuration-option">

          <input
            id="configClientes"
            type="checkbox"
            ${
              configuracion.clientes
                ? "checked"
                : ""
            }
          />

          <span>
            <strong>
              👥 Clientes
            </strong>

            <small>
              Avisarme cuando se registre un nuevo cliente.
            </small>
          </span>

        </label>

      </div>

      <div class="form-actions">

        <button
          id="guardarNotificacionesAdmin"
          class="crm-btn primary"
        >
          💾 Guardar preferencias
        </button>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- SEGURIDAD -->
    <!-- ================================================= -->

    <div class="crm-card">

      <div class="crm-card-header">

        <div>

          <h3>
            🔐 Seguridad
          </h3>

          <p>
            Administra la seguridad de tu cuenta.
          </p>

        </div>

      </div>

      <div class="form-grid">

        <div class="form-group">

          <label>
            Contraseña actual
          </label>

          <input
            id="configPasswordActual"
            type="password"
            placeholder="Contraseña actual"
          />

        </div>

        <div class="form-group">

          <label>
            Nueva contraseña
          </label>

          <input
            id="configPasswordNueva"
            type="password"
            placeholder="Nueva contraseña"
          />

        </div>

        <div class="form-group">

          <label>
            Confirmar contraseña
          </label>

          <input
            id="configPasswordConfirmar"
            type="password"
            placeholder="Confirmar contraseña"
          />

        </div>

      </div>

      <div class="form-actions">

        <button
          id="cambiarPasswordAdmin"
          class="crm-btn primary"
        >
          🔐 Cambiar contraseña
        </button>

        <button
          id="cerrarSesionConfiguracion"
          class="crm-btn danger"
        >
          🚪 Cerrar sesión
        </button>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- KARSAN DIGITAL -->
    <!-- ================================================= -->

    <div class="crm-card">

      <div class="crm-card-header">

        <div>

          <h3>
            🏢 Karsan Digital
          </h3>

          <p>
            Información general de la empresa.
          </p>

        </div>

      </div>

      <div class="form-grid">

        <div class="form-group">

          <label>
            Nombre de empresa
          </label>

          <input
            id="configEmpresaNombre"
            type="text"
            value="${escaparHTML(
              configuracion.empresaNombre
            )}"
            placeholder="Nombre de empresa"
          />

        </div>

        <div class="form-group">

          <label>
            Correo de empresa
          </label>

          <input
            id="configEmpresaCorreo"
            type="email"
            value="${escaparHTML(
              configuracion.empresaCorreo
            )}"
            placeholder="correo@empresa.com"
          />

        </div>

        <div class="form-group">

          <label>
            Teléfono
          </label>

          <input
            id="configEmpresaTelefono"
            type="tel"
            value="${escaparHTML(
              configuracion.empresaTelefono
            )}"
            placeholder="0999999999"
          />

        </div>

        <div class="form-group">

          <label>
            Información de contacto
          </label>

          <textarea
            id="configEmpresaContacto"
            rows="4"
            placeholder="Información de contacto"
          >${escaparHTML(
            configuracion.empresaContacto
          )}</textarea>

        </div>

      </div>

      <div class="form-actions">

        <button
          id="guardarEmpresaAdmin"
          class="crm-btn primary"
        >
          💾 Guardar información
        </button>

      </div>

    </div>

  `;


  // =====================================================
  // GUARDAR PERFIL
  // =====================================================

  const guardarPerfil =
    document.getElementById(
      "guardarPerfilAdmin"
    );

  guardarPerfil?.addEventListener(
    "click",
    () => {

      const nombre =
        (
          document.getElementById(
            "configNombre"
          ) as HTMLInputElement
        ).value.trim();

      const correo =
        (
          document.getElementById(
            "configCorreo"
          ) as HTMLInputElement
        ).value.trim();

      const telefono =
        (
          document.getElementById(
            "configTelefono"
          ) as HTMLInputElement
        ).value.trim();

      const avatar =
        (
          document.getElementById(
            "configAvatar"
          ) as HTMLInputElement
        ).value.trim();

      if (!nombre || !correo) {

        mostrarMensaje(
          "El nombre y el correo son obligatorios.",
          "error"
        );

        return;
      }

      configuracion.nombre =
        nombre;

      configuracion.correo =
        correo;

      configuracion.telefono =
        telefono;

      configuracion.avatar =
        avatar;

      guardarConfiguracion();

      mostrarMensaje(
        "Perfil guardado correctamente.",
        "success"
      );

    }
  );


  // =====================================================
  // GUARDAR NOTIFICACIONES
  // =====================================================

  const guardarNotificaciones =
    document.getElementById(
      "guardarNotificacionesAdmin"
    );

  guardarNotificaciones?.addEventListener(
    "click",
    () => {

      configuracion.notificaciones =
        (
          document.getElementById(
            "configNotificaciones"
          ) as HTMLInputElement
        ).checked;

      configuracion.mensajes =
        (
          document.getElementById(
            "configMensajes"
          ) as HTMLInputElement
        ).checked;

      configuracion.documentos =
        (
          document.getElementById(
            "configDocumentos"
          ) as HTMLInputElement
        ).checked;

      configuracion.comprobantes =
        (
          document.getElementById(
            "configComprobantes"
          ) as HTMLInputElement
        ).checked;

      configuracion.clientes =
        (
          document.getElementById(
            "configClientes"
          ) as HTMLInputElement
        ).checked;

      guardarConfiguracion();

      mostrarMensaje(
        "Preferencias guardadas correctamente.",
        "success"
      );

    }
  );


  // =====================================================
  // CAMBIAR CONTRASEÑA
  // =====================================================

  const cambiarPassword =
    document.getElementById(
      "cambiarPasswordAdmin"
    );

  cambiarPassword?.addEventListener(
    "click",
    () => {

      const actual =
        (
          document.getElementById(
            "configPasswordActual"
          ) as HTMLInputElement
        ).value;

      const nueva =
        (
          document.getElementById(
            "configPasswordNueva"
          ) as HTMLInputElement
        ).value;

      const confirmar =
        (
          document.getElementById(
            "configPasswordConfirmar"
          ) as HTMLInputElement
        ).value;

      if (!actual || !nueva || !confirmar) {

        mostrarMensaje(
          "Completa todos los campos de contraseña.",
          "error"
        );

        return;
      }

      if (nueva.length < 6) {

        mostrarMensaje(
          "La nueva contraseña debe tener al menos 6 caracteres.",
          "error"
        );

        return;
      }

      if (nueva !== confirmar) {

        mostrarMensaje(
          "Las contraseñas nuevas no coinciden.",
          "error"
        );

        return;
      }

      mostrarMensaje(
        "La validación está lista. La actualización real de contraseña se conectará al backend.",
        "success"
      );

      (
        document.getElementById(
          "configPasswordActual"
        ) as HTMLInputElement
      ).value = "";

      (
        document.getElementById(
          "configPasswordNueva"
        ) as HTMLInputElement
      ).value = "";

      (
        document.getElementById(
          "configPasswordConfirmar"
        ) as HTMLInputElement
      ).value = "";

    }
  );


  // =====================================================
  // CERRAR SESIÓN
  // =====================================================

  const cerrarSesion =
    document.getElementById(
      "cerrarSesionConfiguracion"
    );

  cerrarSesion?.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "usuarioActual"
      );

      window.location.reload();

    }
  );


  // =====================================================
  // GUARDAR EMPRESA
  // =====================================================

  const guardarEmpresa =
    document.getElementById(
      "guardarEmpresaAdmin"
    );

  guardarEmpresa?.addEventListener(
    "click",
    () => {

      configuracion.empresaNombre =
        (
          document.getElementById(
            "configEmpresaNombre"
          ) as HTMLInputElement
        ).value.trim();

      configuracion.empresaCorreo =
        (
          document.getElementById(
            "configEmpresaCorreo"
          ) as HTMLInputElement
        ).value.trim();

      configuracion.empresaTelefono =
        (
          document.getElementById(
            "configEmpresaTelefono"
          ) as HTMLInputElement
        ).value.trim();

      configuracion.empresaContacto =
        (
          document.getElementById(
            "configEmpresaContacto"
          ) as HTMLTextAreaElement
        ).value.trim();

      guardarConfiguracion();

      mostrarMensaje(
        "Información de Karsan Digital guardada correctamente.",
        "success"
      );

    }
  );

}