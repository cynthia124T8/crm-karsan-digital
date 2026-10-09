// =========================================================
// KARSAN DIGITAL CRM
// SECCIONES DEL ADMINISTRADOR Y CLIENTE
// =========================================================

export type RolCRM = "admin" | "cliente";

interface OpcionesSeccion {
  app: HTMLElement;
  seccion: string;
  rol: RolCRM;
  email: string;
  onInicio: () => void;
}

export function mostrarSeccionCRM({
  app,
  seccion,
  rol,
  email,
  onInicio,
}: OpcionesSeccion): void {
  const contenido = app.querySelector<HTMLElement>(".crm-content");

  if (!contenido) return;

  const titulo = obtenerTitulo(seccion, rol);
  const descripcion = obtenerDescripcion(seccion, rol);

  contenido.innerHTML = `
    <div class="module-page">
      <div class="module-page-header">
        <div>
          <span class="section-label">KARSAN DIGITAL · ${rol === "admin" ? "ADMINISTRACIÓN" : "PORTAL DEL CLIENTE"}</span>
          <h1>${titulo}</h1>
          <p>${descripcion}</p>
        </div>
        <button class="secondary-button" data-crm-home="true">← Volver al inicio</button>
      </div>

      ${contenidoSeccion(seccion, rol, email)}
    </div>
  `;

  contenido
    .querySelector<HTMLButtonElement>("[data-crm-home]")
    ?.addEventListener("click", onInicio);

  contenido
    .querySelectorAll<HTMLElement>("[data-open-section]")
    .forEach((elemento) => {
      elemento.addEventListener("click", () => {
        const destino = elemento.dataset.openSection;
        if (!destino) return;

        const boton = app.querySelector<HTMLButtonElement>(
          `.sidebar-link[data-section="${CSS.escape(destino)}"]`
        );

        boton?.click();
      });
    });
}

function obtenerTitulo(seccion: string, rol: RolCRM): string {
  if (rol === "cliente") {
    const titulos: Record<string, string> = {
      empresa: "Mi empresa",
      proyectos: "Mis proyectos",
      marcas: "Marcas colaboradoras",
      marketing: "Marketing",
      redes: "Mis redes sociales",
      mensajes: "Mensajes",
      chatbot: "Chatbot Karsan",
      notificaciones: "Notificaciones",
      perfil: "Mi perfil",
      configuracion: "Configuración",
    };
    return titulos[seccion] || "Portal del cliente";
  }

  const titulos: Record<string, string> = {
    Clientes: "Gestión de clientes",
    Empresas: "Gestión de empresas",
    "Marcas colaboradoras": "Marcas colaboradoras",
    Marketing: "Marketing",
    Proyectos: "Gestión de proyectos",
    "Redes sociales": "Redes sociales",
    Mensajes: "Mensajes",
    Chatbot: "Chatbot Karsan",
    Reportes: "Reportes",
    Notificaciones: "Notificaciones",
    Configuración: "Configuración",
  };

  return titulos[seccion] || "Panel administrativo";
}

function obtenerDescripcion(seccion: string, rol: RolCRM): string {
  if (rol === "cliente") {
    const descripciones: Record<string, string> = {
      empresa: "Consulta y administra la información de tu empresa.",
      proyectos: "Revisa el avance y estado de los proyectos contratados.",
      marcas: "Consulta las marcas y herramientas colaboradoras disponibles.",
      marketing: "Consulta las campañas y servicios de marketing asociados.",
      redes: "Consulta tus redes sociales y cuentas conectadas.",
      mensajes: "Comunícate con el equipo de Karsan Digital.",
      chatbot: "Obtén ayuda mediante el asistente de Karsan Digital.",
      notificaciones: "Revisa las novedades y avisos de tu cuenta.",
      perfil: "Consulta y administra tus datos personales.",
      configuracion: "Administra las preferencias de tu cuenta.",
    };
    return descripciones[seccion] || "Gestiona tu información desde Karsan Digital.";
  }

  const descripciones: Record<string, string> = {
    Clientes: "Administra clientes, contactos y seguimiento comercial.",
    Empresas: "Gestiona las empresas registradas y sus proyectos.",
    "Marcas colaboradoras": "Administra las marcas y herramientas con las que trabaja Karsan.",
    Marketing: "Organiza campañas, contenidos y acciones de marketing.",
    Proyectos: "Controla proyectos, responsables, estados y avances.",
    "Redes sociales": "Gestiona cuentas sociales y seguimiento de actividad.",
    Mensajes: "Consulta y organiza las conversaciones con clientes.",
    Chatbot: "Administra el asistente virtual para atención al cliente.",
    Reportes: "Consulta indicadores y reportes generales del CRM.",
    Notificaciones: "Revisa las notificaciones y actividades recientes.",
    Configuración: "Configura las opciones generales del CRM.",
  };
  return descripciones[seccion] || "Gestiona la operación de Karsan Digital desde un solo lugar.";
}

function contenidoSeccion(seccion: string, rol: RolCRM, email: string): string {
  if (rol === "cliente") return contenidoCliente(seccion, email);
  return contenidoAdmin(seccion);
}

function contenidoAdmin(seccion: string): string {
  switch (seccion) {
    case "Clientes":
      return `
        <div class="module-stats">
          ${tarjeta("128", "Clientes registrados", "+8 este mes")}
          ${tarjeta("18", "Clientes nuevos", "Este mes")}
          ${tarjeta("96", "Activos", "75% del total")}
          ${tarjeta("14", "Pendientes", "Requieren seguimiento")}
        </div>
        ${tabla("Clientes", ["Cliente", "Empresa", "Proyecto", "Estado"], [
          ["María Castillo", "Nova Solutions", "Diseño web", "Activo"],
          ["Juan Pérez", "Grupo Andino", "Marketing", "Activo"],
          ["Ana Cruz", "Urban Store", "Redes sociales", "En proceso"],
          ["Luis Rodríguez", "Digital Pro", "SEO", "Pendiente"],
        ])}
      `;

    case "Empresas":
      return `
        <div class="module-actions">
          <button class="primary-button" data-crm-action="Nueva empresa">+ Nueva empresa</button>
          <button class="secondary-button" data-crm-action="Exportar empresas">Exportar</button>
        </div>
        ${tabla("Empresas registradas", ["Empresa", "Contacto", "Proyecto", "Estado"], [
          ["Nova Solutions", "María Castillo", "Diseño web", "Activa"],
          ["Grupo Andino", "Juan Pérez", "Marketing", "Activa"],
          ["Urban Store", "Ana Cruz", "Redes sociales", "En proceso"],
          ["Digital Pro", "Luis Rodríguez", "SEO", "Pendiente"],
        ])}
      `;

    case "Marcas colaboradoras":
      return `
        <div class="module-grid">
          ${tarjetaGrande("MT", "Meta", "Marketing y publicidad", "Activa")}
          ${tarjetaGrande("GO", "Google", "Publicidad y posicionamiento", "Activa")}
          ${tarjetaGrande("CA", "Canva", "Diseño y contenido", "Colaboración")}
          ${tarjetaGrande("AD", "Adobe", "Diseño y creatividad", "Disponible")}
        </div>
      `;

    case "Marketing":
      return `
        <div class="module-stats">
          ${tarjeta("12", "Campañas activas", "En seguimiento")}
          ${tarjeta("38", "Contenidos", "Este mes")}
          ${tarjeta("74%", "Alcance promedio", "Redes sociales")}
        </div>
        <div class="module-grid">
          ${tarjetaGrande("MK", "Campaña Nova Solutions", "Contenido + redes sociales", "En proceso")}
          ${tarjetaGrande("MK", "Campaña Grupo Andino", "Publicidad digital", "Pendiente")}
          ${tarjetaGrande("MK", "Campaña Urban Store", "Posicionamiento", "Activa")}
        </div>
      `;

    case "Proyectos":
      return `
        <div class="module-actions">
          <button class="primary-button" data-crm-action="Nuevo proyecto">+ Nuevo proyecto</button>
        </div>
        ${tabla("Proyectos", ["Proyecto", "Empresa", "Responsable", "Estado"], [
          ["Diseño web corporativo", "Nova Solutions", "Equipo Web", "En proceso"],
          ["Campaña de marketing", "Grupo Andino", "Equipo Marketing", "Pendiente"],
          ["Estrategia redes sociales", "Urban Store", "Social Media", "En proceso"],
          ["Optimización SEO", "Digital Pro", "SEO", "Completado"],
        ])}
      `;

    case "Redes sociales":
      return `
        <div class="module-grid">
          ${tarjetaGrande("IG", "Instagram", "28 cuentas conectadas", "Activo")}
          ${tarjetaGrande("FB", "Facebook", "24 páginas conectadas", "Activo")}
          ${tarjetaGrande("TK", "TikTok", "12 cuentas conectadas", "Activo")}
        </div>
      `;

    case "Mensajes":
      return `
        <div class="module-list">
          ${mensaje("MC", "María Castillo", "Necesito revisar el avance del proyecto...", "Nuevo")}
          ${mensaje("JP", "Juan Pérez", "¿Podemos coordinar la campaña?", "2 min")}
          ${mensaje("AC", "Ana Cruz", "Ya revisé las propuestas.", "Leído")}
          ${mensaje("LR", "Luis Rodríguez", "Tengo una consulta sobre SEO.", "15 min")}
        </div>
      `;

    case "Chatbot":
      return `
        <div class="module-feature">
          <div class="module-feature-icon">◉</div>
          <div>
            <h3>Asistente Karsan</h3>
            <p>El chatbot está preparado para atender consultas frecuentes de los clientes.</p>
            <span class="status-badge success">● En línea</span>
          </div>
        </div>
        <div class="module-actions">
          <button class="primary-button" data-crm-action="Administrar chatbot">Administrar chatbot</button>
          <button class="secondary-button" data-crm-action="Probar chatbot">Probar chatbot</button>
        </div>
      `;

    case "Reportes":
      return `
        <div class="module-stats">
          ${tarjeta("128", "Clientes", "Total")}
          ${tarjeta("42", "Empresas", "Activas")}
          ${tarjeta("24", "Proyectos", "Activos")}
          ${tarjeta("16", "Marcas", "Colaboradoras")}
        </div>
        <div class="module-grid">
          ${tarjetaGrande("↗", "Reporte comercial", "Clientes y empresas", "Disponible")}
          ${tarjetaGrande("▤", "Reporte de proyectos", "Estados y avances", "Disponible")}
          ${tarjetaGrande("◎", "Reporte de redes", "Actividad social", "Disponible")}
        </div>
      `;

    case "Notificaciones":
      return `
        <div class="module-list">
          ${notificacion("Nuevo cliente", "Nova Solutions fue agregado al CRM.", "Hoy")}
          ${notificacion("Nueva marca", "Canva fue agregada como colaboradora.", "Hoy")}
          ${notificacion("Proyecto completado", "Optimización SEO fue completado.", "Ayer")}
          ${notificacion("Mensaje nuevo", "María Castillo envió un mensaje.", "Ayer")}
        </div>
      `;

    case "Configuración":
      return `
        <div class="settings-grid">
          ${configuracion("Perfil de empresa", "Datos generales de Karsan Digital")}
          ${configuracion("Usuarios y permisos", "Administra accesos del sistema")}
          ${configuracion("Notificaciones", "Configura avisos y alertas")}
          ${configuracion("Seguridad", "Opciones de seguridad y acceso")}
        </div>
      `;

    default:
      return `<div class="empty-module"><div>⌂</div><h3>Panel administrativo</h3><p>Selecciona una sección del menú lateral.</p></div>`;
  }
}

function contenidoCliente(seccion: string, email: string): string {
  switch (seccion) {
    case "empresa":
      return `
        <div class="module-feature">
          <div class="module-feature-icon">▣</div>
          <div>
            <h3>Información de mi empresa</h3>
            <p>Cuenta asociada: <strong>${email}</strong></p>
            <span class="status-badge success">Empresa activa</span>
          </div>
        </div>
        ${tabla("Datos de la empresa", ["Dato", "Información"], [
          ["Empresa", "Nova Solutions"],
          ["Contacto", "María Castillo"],
          ["Correo", email],
          ["Estado", "Activa"],
        ])}
      `;

    case "proyectos":
      return `
        <div class="module-stats">
          ${tarjeta("3", "Proyectos", "Registrados")}
          ${tarjeta("2", "En proceso", "Actualmente")}
          ${tarjeta("1", "Completado", "Finalizado")}
        </div>
        ${tabla("Mis proyectos", ["Proyecto", "Servicio", "Estado", "Avance"], [
          ["Diseño web corporativo", "Diseño web", "En proceso", "70%"],
          ["Campaña de marketing", "Marketing", "Pendiente", "25%"],
          ["Optimización SEO", "SEO", "Completado", "100%"],
        ])}
      `;

    case "marcas":
      return `
        <div class="module-grid">
          ${tarjetaGrande("MT", "Meta", "Marketing y publicidad", "Disponible")}
          ${tarjetaGrande("GO", "Google", "Publicidad y posicionamiento", "Disponible")}
          ${tarjetaGrande("CA", "Canva", "Diseño y contenido", "Disponible")}
        </div>
      `;

    case "marketing":
      return `
        <div class="module-stats">
          ${tarjeta("3", "Campañas", "Asociadas a tu empresa")}
          ${tarjeta("12", "Contenidos", "Publicados")}
          ${tarjeta("74%", "Alcance", "Promedio")}
        </div>
        <div class="module-grid">
          ${tarjetaGrande("MK", "Campaña actual", "Marketing digital", "En proceso")}
          ${tarjetaGrande("◎", "Redes sociales", "Contenido y publicaciones", "Activo")}
        </div>
      `;

    case "redes":
      return `
        <div class="module-grid">
          ${tarjetaGrande("IG", "Instagram", "Cuenta conectada", "Activo")}
          ${tarjetaGrande("FB", "Facebook", "Página conectada", "Activo")}
          ${tarjetaGrande("TK", "TikTok", "Cuenta conectada", "Activo")}
        </div>
      `;

    case "mensajes":
      return `
        <div class="module-list">
          ${mensaje("AD", "Equipo Karsan", "Tu asesor está disponible para ayudarte.", "Nuevo")}
          ${mensaje("MC", "María Castillo", "Necesito revisar el avance del proyecto...", "Hoy")}
        </div>
      `;

    case "chatbot":
      return `
        <div class="module-feature">
          <div class="module-feature-icon">◉</div>
          <div>
            <h3>Asistente Karsan</h3>
            <p>Consulta información general y recibe ayuda sobre tus servicios.</p>
            <span class="status-badge success">● En línea</span>
          </div>
        </div>
        <div class="module-actions">
          <button class="primary-button" data-crm-action="Abrir chatbot">Abrir chatbot</button>
        </div>
      `;

    case "notificaciones":
      return `
        <div class="module-list">
          ${notificacion("Proyecto actualizado", "Tu proyecto Diseño web corporativo fue actualizado.", "Hoy")}
          ${notificacion("Mensaje nuevo", "Tienes un mensaje del equipo Karsan.", "Hoy")}
          ${notificacion("Campaña", "La campaña de marketing tiene novedades.", "Ayer")}
        </div>
      `;

    case "perfil":
      return `
        <div class="profile-card">
          <div class="profile-avatar">${iniciales(email)}</div>
          <div>
            <h3>${obtenerNombre(email)}</h3>
            <p>${email}</p>
            <span class="status-badge success">Cliente activo</span>
          </div>
        </div>
        <div class="settings-grid">
          ${configuracion("Datos personales", "Consulta y actualiza tus datos")}
          ${configuracion("Datos de contacto", "Administra correo y teléfono")}
        </div>
      `;

    case "configuracion":
      return `
        <div class="settings-grid">
          ${configuracion("Cuenta", "Preferencias generales de tu cuenta")}
          ${configuracion("Notificaciones", "Configura los avisos que deseas recibir")}
          ${configuracion("Seguridad", "Administra tus opciones de acceso")}
          ${configuracion("Privacidad", "Revisa las preferencias de privacidad")}
        </div>
      `;

    default:
      return `<div class="empty-module"><div>⌂</div><h3>Inicio</h3><p>Selecciona una opción del menú para consultar tu información.</p></div>`;
  }
}

function tarjeta(valor: string, titulo: string, detalle: string): string {
  return `
    <div class="module-stat-card">
      <span>${titulo}</span>
      <strong>${valor}</strong>
      <small>${detalle}</small>
    </div>
  `;
}

function tarjetaGrande(icono: string, titulo: string, descripcion: string, estado: string): string {
  return `
    <article class="module-card">
      <div class="module-card-icon">${icono}</div>
      <div>
        <h3>${titulo}</h3>
        <p>${descripcion}</p>
        <span class="status-badge success">${estado}</span>
      </div>
    </article>
  `;
}

function mensaje(icono: string, nombre: string, texto: string, estado: string): string {
  return `
    <div class="module-list-item">
      <div class="module-card-icon">${icono}</div>
      <div class="module-list-content">
        <strong>${nombre}</strong>
        <span>${texto}</span>
      </div>
      <span class="status-badge blue">${estado}</span>
    </div>
  `;
}

function notificacion(titulo: string, texto: string, fecha: string): string {
  return `
    <div class="module-list-item">
      <div class="module-card-icon">♢</div>
      <div class="module-list-content">
        <strong>${titulo}</strong>
        <span>${texto}</span>
      </div>
      <small>${fecha}</small>
    </div>
  `;
}

function configuracion(titulo: string, descripcion: string): string {
  return `
    <article class="module-card settings-card">
      <div class="module-card-icon">⚙</div>
      <div>
        <h3>${titulo}</h3>
        <p>${descripcion}</p>
        <button class="panel-link" data-crm-action="${titulo}">Administrar →</button>
      </div>
    </article>
  `;
}

function tabla(titulo: string, encabezados: string[], filas: string[][]): string {
  return `
    <section class="dashboard-panel module-table-panel">
      <div class="panel-header">
        <div>
          <span class="section-label">KARSAN DIGITAL</span>
          <h2>${titulo}</h2>
        </div>
      </div>
      <div class="table-container">
        <table class="clients-table">
          <thead>
            <tr>${encabezados.map((encabezado) => `<th>${encabezado}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${filas
              .map(
                (fila) =>
                  `<tr>${fila
                    .map((celda, indice) =>
                      indice === fila.length - 1
                        ? `<td><span class="status-badge ${estadoClase(celda)}">${celda}</span></td>`
                        : `<td>${celda}</td>`
                    )
                    .join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function estadoClase(estado: string): string {
  const valor = estado.toLowerCase();
  if (valor.includes("activo") || valor.includes("activa") || valor.includes("completado")) return "success";
  if (valor.includes("pendiente") || valor.includes("nuevo")) return "warning";
  return "blue";
}

function obtenerNombre(email: string): string {
  return email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

function iniciales(valor: string): string {
  const partes = obtenerNombre(valor).split(" ").filter(Boolean);
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0].charAt(0) + partes[1].charAt(0)).toUpperCase();
}
