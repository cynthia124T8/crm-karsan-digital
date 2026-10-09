import { mostrarLogin } from './Login'
import {
  activarModuloLeads,
  crearModuloLeads,
  obtenerLeads,
} from './Leads'

import {
  activarModuloAsesores,
  crearModuloAsesores,
  obtenerAsesores,
} from './Asesores'

import {
  activarModuloCitas,
  crearModuloCitas,
  obtenerCitas,
} from './Citas'

import {
  activarModuloChatbot,
  crearModuloChatbot,
} from './Chatbot'

import {
  activarModuloReportes,
  crearModuloReportes,
} from './Reportes'

import {
  activarModuloPerfil,
  crearModuloPerfil,
} from './Profile'

import {
  activarModuloNotificaciones,
  actualizarContadorNotificaciones,
  crearModuloNotificaciones,
  crearNotificacion,
} from './Notificaciones'

type Cliente = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  contrasena: string
  rol: 'cliente'
}

export function mostrarDashboardAdmin(app: HTMLDivElement): void {
  const clientes = obtenerClientes()
  const leads = obtenerLeads()
  const asesores = obtenerAsesores()
  const citas = obtenerCitas()

  app.innerHTML = `
    <div class="crm-shell">
      <aside class="crm-sidebar">
        <div>
          <div class="crm-brand">
            <div class="crm-brand-mark">K</div>

            <div>
              <strong>Karsan Digital</strong>
              <span>CRM</span>
            </div>
          </div>

          <nav class="crm-nav">
            <button class="menu-item active" data-seccion="inicio">
              <span class="crm-nav-icon">🏠</span>
              <span>Inicio</span>
            </button>

            <button class="menu-item" data-seccion="clientes">
              <span class="crm-nav-icon">👥</span>
              <span>Clientes</span>
            </button>

            <button class="menu-item" data-seccion="perfil">
              <span class="crm-nav-icon">👤</span>
              <span>Perfil del cliente</span>
            </button>

            <button class="menu-item" data-seccion="leads">
              <span class="crm-nav-icon">🎯</span>
              <span>Leads</span>
            </button>

            <button class="menu-item" data-seccion="asesores">
              <span class="crm-nav-icon">🧑‍💼</span>
              <span>Asesores</span>
            </button>

            <button class="menu-item" data-seccion="citas">
              <span class="crm-nav-icon">📅</span>
              <span>Citas</span>
            </button>

            <button class="menu-item" data-seccion="mensajes">
              <span class="crm-nav-icon">💬</span>
              <span>Mensajes</span>
            </button>

            <button class="menu-item" data-seccion="documentos">
              <span class="crm-nav-icon">📄</span>
              <span>Documentos</span>
            </button>

            <button class="menu-item" data-seccion="seguimiento">
              <span class="crm-nav-icon">📌</span>
              <span>Seguimiento</span>
            </button>

            <button class="menu-item" data-seccion="notificaciones">
              <span class="crm-nav-icon">🔔</span>
              <span>Notificaciones</span>

              <span
                id="contador-notificaciones"
                class="contador-notificaciones"
                style="display: none;"
              >
                0
              </span>
            </button>

            <button class="menu-item" data-seccion="reportes">
              <span class="crm-nav-icon">📊</span>
              <span>Reportes</span>
            </button>

            <button class="menu-item" data-seccion="chatbot">
              <span class="crm-nav-icon">🤖</span>
              <span>Chatbot</span>
            </button>

            <button class="menu-item" data-seccion="configuracion">
              <span class="crm-nav-icon">⚙️</span>
              <span>Configuración</span>
            </button>
          </nav>
        </div>

        <div class="crm-sidebar-footer">
          <div class="crm-user-card">
            <div class="crm-avatar">A</div>

            <div>
              <strong>Administrador</strong>
              <span>admin@karsandigital.com</span>
              <small>Sesión activa</small>
            </div>
          </div>

          <button
            id="cerrar-sesion"
            class="crm-logout"
            type="button"
          >
            <span>↩</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="crm-main">
        <header class="crm-topbar">
          <div>
            <h1>Panel de administración</h1>
            <p>Gestiona clientes, leads, asesores y citas desde un solo lugar.</p>
          </div>

          <div class="crm-topbar-actions">
            <label class="crm-search">
              <span>🔎</span>
              <input
                id="busqueda-global-admin"
                type="search"
                placeholder="Buscar en el CRM"
              />
            </label>

            <button
              id="boton-notificaciones-admin"
              class="crm-icon-button"
              type="button"
              aria-label="Abrir notificaciones"
            >
              🔔
            </button>

            <div class="crm-profile">
              <div class="crm-avatar">A</div>

              <div>
                <strong>Administrador</strong>
                <span>admin@karsandigital.com</span>
              </div>
            </div>
          </div>
        </header>

        <section class="crm-kpi-grid">
          <article class="crm-kpi-card">
            <div class="crm-kpi-icon azul">👥</div>
            <div>
              <span>Total de clientes</span>
              <strong id="total-clientes">${clientes.length}</strong>
              <small>Clientes registrados</small>
            </div>
          </article>

          <article class="crm-kpi-card">
            <div class="crm-kpi-icon verde">🎯</div>
            <div>
              <span>Leads registrados</span>
              <strong id="total-leads">${leads.length}</strong>
              <small>Clientes potenciales</small>
            </div>
          </article>

          <article class="crm-kpi-card">
            <div class="crm-kpi-icon morado">🧑‍💼</div>
            <div>
              <span>Asesores</span>
              <strong id="total-asesores">${asesores.length}</strong>
              <small>Asesores registrados</small>
            </div>
          </article>

          <article class="crm-kpi-card">
            <div class="crm-kpi-icon naranja">📅</div>
            <div>
              <span>Citas pendientes</span>
              <strong id="total-citas">${citas.length}</strong>
              <small>Citas registradas</small>
            </div>
          </article>
        </section>

        <section class="crm-card crm-workspace">
          <div class="crm-workspace-header">
            <div>
              <h2 id="titulo-seccion">Resumen general</h2>
              <p id="descripcion-seccion">
                Vista general de la actividad del CRM
              </p>
            </div>

            <button
              id="nuevo-cliente"
              class="btn-primary"
              type="button"
              style="display: none;"
            >
              + Nuevo cliente
            </button>
          </div>

          <div id="contenido-dashboard">
            ${crearInicioAdministrador(clientes, leads, asesores, citas)}
          </div>
        </section>

        <button
          id="chatbot-flotante-admin"
          class="crm-chat-fab"
          type="button"
          aria-label="Abrir chatbot"
        >
          🤖
        </button>
      </main>
    </div>
  `

  activarDashboardAdmin(app)
}

function activarDashboardAdmin(app: HTMLDivElement): void {
  const botonCerrarSesion =
    document.querySelector<HTMLButtonElement>('#cerrar-sesion')

  const botonNuevoCliente =
    document.querySelector<HTMLButtonElement>('#nuevo-cliente')

  const botonesMenu =
    document.querySelectorAll<HTMLButtonElement>('.menu-item')

  botonCerrarSesion?.addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo')
    mostrarLogin(app)
  })

  botonNuevoCliente?.addEventListener('click', () => {
    crearCliente()
  })

  botonesMenu.forEach((boton) => {
    boton.addEventListener('click', () => {
      botonesMenu.forEach((item) => {
        item.classList.remove('active')
      })

      boton.classList.add('active')

      const seccion = boton.dataset.seccion ?? 'inicio'

      mostrarSeccion(seccion)
    })
  })

  const botonNotificaciones =
    document.querySelector<HTMLButtonElement>(
      '#boton-notificaciones-admin',
    )

  const botonChatbot =
    document.querySelector<HTMLButtonElement>(
      '#chatbot-flotante-admin',
    )

  botonNotificaciones?.addEventListener('click', () => {
    activarSeccionDesdeAccesoRapido('notificaciones')
  })

  botonChatbot?.addEventListener('click', () => {
    activarSeccionDesdeAccesoRapido('chatbot')
  })

  activarInicioAdministrador()
  actualizarContadorNotificaciones()
}

function activarSeccionDesdeAccesoRapido(
  seccion: string,
): void {
  document
    .querySelectorAll<HTMLButtonElement>('.menu-item')
    .forEach((item) => {
      item.classList.toggle(
        'active',
        item.dataset.seccion === seccion,
      )
    })

  mostrarSeccion(seccion)
}

function mostrarSeccion(seccion: string): void {
  const contenido =
    document.querySelector<HTMLDivElement>('#contenido-dashboard')

  const titulo =
    document.querySelector<HTMLHeadingElement>('#titulo-seccion')

  const descripcion =
    document.querySelector<HTMLParagraphElement>(
      '#descripcion-seccion',
    )

  const botonNuevoCliente =
    document.querySelector<HTMLButtonElement>('#nuevo-cliente')

  if (!contenido || !titulo || !descripcion) {
    return
  }

  if (seccion === 'inicio') {
    const clientes = obtenerClientes()
    const leads = obtenerLeads()
    const asesores = obtenerAsesores()
    const citas = obtenerCitas()

    titulo.textContent = 'Resumen general'
    descripcion.textContent =
      'Vista general de la actividad del CRM'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearInicioAdministrador(
      clientes,
      leads,
      asesores,
      citas,
    )

    activarInicioAdministrador()
    return
  }

  if (seccion === 'clientes') {
    const clientes = obtenerClientes()

    titulo.textContent = 'Gestión de clientes'
    descripcion.textContent =
      'Clientes registrados en el sistema'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'inline-block'
    }

    contenido.innerHTML = crearModuloClientes(clientes)
    activarEventosClientes()
    return
  }

  if (seccion === 'perfil') {
    titulo.textContent = 'Perfil del cliente'
    descripcion.textContent =
      'Información, citas y seguimiento del cliente'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloPerfil()
    activarModuloPerfil()

    return
  }

  if (seccion === 'leads') {
    titulo.textContent = 'Gestión de leads'
    descripcion.textContent =
      'Clientes potenciales provenientes de redes sociales'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloLeads()
    activarModuloLeads()

    return
  }

  if (seccion === 'asesores') {
    titulo.textContent='Gestión de asesores'
    descripcion.textContent='Asesores registrados'
    if (botonNuevoCliente) botonNuevoCliente.style.display='none'
    contenido.innerHTML=crearModuloAsesores()
    activarModuloAsesores()
    return
  }

  if (seccion === 'citas') {
    titulo.textContent = 'Gestión de citas'
    descripcion.textContent = 'Citas programadas'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloCitas()
    activarModuloCitas()

    return
  }

  if (seccion === 'mensajes') {
    titulo.textContent = 'Mensajes'
    descripcion.textContent =
      'Conversaciones entre clientes y asesores'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloMensajesAdmin()
    return
  }

  if (seccion === 'documentos') {
    titulo.textContent = 'Documentos'
    descripcion.textContent =
      'Contratos, cotizaciones y archivos compartidos'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloDocumentosAdmin()
    return
  }

  if (seccion === 'seguimiento') {
    titulo.textContent = 'Seguimiento de clientes'
    descripcion.textContent =
      'Estado y avance de los procesos comerciales'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloSeguimientoAdmin()
    return
  }

  if (seccion === 'notificaciones') {
    titulo.textContent = 'Notificaciones'
    descripcion.textContent =
      'Actividades importantes registradas en el CRM'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloNotificaciones()
    activarModuloNotificaciones()

    return
  }



  if (seccion === 'reportes') {
    titulo.textContent = 'Reportes'
    descripcion.textContent =
      'Estadísticas generales del CRM'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloReportes()
    activarModuloReportes()

    return
  }

  if (seccion === 'chatbot') {
    titulo.textContent = 'Chatbot'
    descripcion.textContent =
      'Asistente virtual para captar clientes potenciales'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloChatbot()
    activarModuloChatbot()

    return
  }

  if (seccion === 'configuracion') {
    titulo.textContent = 'Configuración'
    descripcion.textContent =
      'Preferencias generales del panel administrativo'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'none'
    }

    contenido.innerHTML = crearModuloConfiguracionAdmin()
    return
  }

  if (botonNuevoCliente) {
    botonNuevoCliente.style.display = 'none'
  }

  const nombres: Record<string, string> = {
    perfil: 'Perfil del cliente',
    leads: 'Leads',
    asesores: 'Asesores',
    citas: 'Citas',
    mensajes: 'Mensajes',
    documentos: 'Documentos',
    seguimiento: 'Seguimiento',
    notificaciones: 'Notificaciones',
    reportes: 'Reportes',
    chatbot: 'Chatbot',
    configuracion: 'Configuración',
  }

  const nombreSeccion = nombres[seccion] ?? 'Módulo'

  titulo.textContent = nombreSeccion

  descripcion.textContent =
    `Gestión del módulo de ${nombreSeccion}`

  contenido.innerHTML = `
    <div class="empty-state">
      <h3>${nombreSeccion}</h3>
      <p>Este módulo se desarrollará en el siguiente paso.</p>
    </div>
  `
}


function crearInicioAdministrador(
  clientes: Cliente[],
  leads: ReturnType<typeof obtenerLeads>,
  asesores: ReturnType<typeof obtenerAsesores>,
  citas: ReturnType<typeof obtenerCitas>,
): string {
  const citasHoy = citas.filter(
    (cita: { fecha?: string }) =>
      cita.fecha === obtenerFechaActual(),
  )

  const citasPendientes = citas.filter(
    (cita: { estado?: string }) =>
      cita.estado?.toLowerCase() === 'pendiente',
  )

  const leadsPendientes = leads.filter(
    (lead: { estado?: string }) =>
      !lead.estado ||
      lead.estado.toLowerCase().includes('nuevo') ||
      lead.estado.toLowerCase().includes('pendiente'),
  )

  return `
    <div class="admin-dashboard-v2">
      <section class="admin-hero-v2">
        <div class="admin-hero-contenido">
          <span class="admin-hero-etiqueta">
            👋 Bienvenido, Administrador
          </span>

          <h2>Todo tu CRM en un solo lugar</h2>

          <p>
            Revisa la actividad de Karsan Digital, administra
            clientes y da seguimiento a las solicitudes pendientes.
          </p>

          <div class="admin-hero-resumen">
            <span>
              <strong>${citasHoy.length}</strong>
              citas para hoy
            </span>

            <span>
              <strong>${leadsPendientes.length}</strong>
              leads por revisar
            </span>

            <span>
              <strong>${clientes.length}</strong>
              clientes activos
            </span>
          </div>

          <div class="admin-hero-acciones">
            <button
              id="admin-ir-clientes"
              class="btn-primary"
              type="button"
            >
              👥 Gestionar clientes
            </button>

            <button
              class="btn-outline admin-acceso-directo"
              data-admin-acceso="citas"
              type="button"
            >
              📅 Ver citas
            </button>

            <button
              class="btn-outline admin-acceso-directo"
              data-admin-acceso="reportes"
              type="button"
            >
              📊 Ver reportes
            </button>
          </div>
        </div>

        <div class="admin-hero-ilustracion" aria-hidden="true">
          <div class="admin-hero-orbita orbita-uno"></div>
          <div class="admin-hero-orbita orbita-dos"></div>

          <div class="admin-hero-icono-principal">📈</div>

          <span class="admin-hero-mini mini-clientes">👥</span>
          <span class="admin-hero-mini mini-citas">📅</span>
          <span class="admin-hero-mini mini-chat">💬</span>
        </div>
      </section>

      <section class="admin-contenido-principal">
        <article class="admin-card-v2 admin-grafico-card">
          <div class="admin-card-cabecera">
            <div>
              <span class="admin-card-etiqueta">Rendimiento</span>
              <h3>Actividad comercial</h3>
              <p>Resumen visual de los registros del CRM.</p>
            </div>

            <button
              class="admin-card-enlace"
              data-admin-acceso="reportes"
              type="button"
            >
              Ver reporte →
            </button>
          </div>

          ${crearGraficoActividadAdmin(
            clientes.length,
            leads.length,
            citas.length,
            asesores.length,
          )}
        </article>

        <article class="admin-card-v2 admin-calendario-card">
          <div class="admin-card-cabecera">
            <div>
              <span class="admin-card-etiqueta">Agenda</span>
              <h3>Calendario del mes</h3>
              <p>Días con citas registradas.</p>
            </div>

            <button
              class="admin-card-enlace"
              data-admin-acceso="citas"
              type="button"
            >
              Abrir citas →
            </button>
          </div>

          ${crearMiniCalendarioAdmin(citas)}
        </article>
      </section>

      <section class="admin-contenido-secundario">
        <article class="admin-card-v2">
          <div class="admin-card-cabecera">
            <div>
              <span class="admin-card-etiqueta">Pendientes</span>
              <h3>Actividad reciente</h3>
              <p>Acciones que requieren atención.</p>
            </div>
          </div>

          <div class="admin-actividad-v2">
            <button data-admin-acceso="leads" type="button">
              <span class="actividad-icono actividad-rojo">🎯</span>

              <span class="actividad-texto">
                <strong>${leadsPendientes.length} leads por revisar</strong>
                <small>Asigna los nuevos contactos a un asesor.</small>
              </span>

              <span class="actividad-flecha">›</span>
            </button>

            <button data-admin-acceso="citas" type="button">
              <span class="actividad-icono actividad-amarillo">📅</span>

              <span class="actividad-texto">
                <strong>${citasPendientes.length} citas pendientes</strong>
                <small>Confirma o reasigna las solicitudes.</small>
              </span>

              <span class="actividad-flecha">›</span>
            </button>

            <button data-admin-acceso="clientes" type="button">
              <span class="actividad-icono actividad-azul">👥</span>

              <span class="actividad-texto">
                <strong>${clientes.length} clientes registrados</strong>
                <small>Consulta y actualiza sus datos.</small>
              </span>

              <span class="actividad-flecha">›</span>
            </button>

            <button data-admin-acceso="mensajes" type="button">
              <span class="actividad-icono actividad-verde">💬</span>

              <span class="actividad-texto">
                <strong>Centro de mensajes</strong>
                <small>Revisa las solicitudes de atención.</small>
              </span>

              <span class="actividad-flecha">›</span>
            </button>
          </div>
        </article>

        <article class="admin-card-v2">
          <div class="admin-card-cabecera">
            <div>
              <span class="admin-card-etiqueta">Herramientas</span>
              <h3>Accesos rápidos</h3>
              <p>Abre los módulos que más utilizas.</p>
            </div>
          </div>

          <div class="admin-accesos-v2">
            <button data-admin-acceso="clientes" type="button">
              <span>👥</span>
              <strong>Clientes</strong>
              <small>Administrar</small>
            </button>

            <button data-admin-acceso="leads" type="button">
              <span>🎯</span>
              <strong>Leads</strong>
              <small>Revisar</small>
            </button>

            <button data-admin-acceso="citas" type="button">
              <span>📅</span>
              <strong>Citas</strong>
              <small>Calendario</small>
            </button>

            <button data-admin-acceso="mensajes" type="button">
              <span>💬</span>
              <strong>Mensajes</strong>
              <small>Responder</small>
            </button>

            <button data-admin-acceso="reportes" type="button">
              <span>📊</span>
              <strong>Reportes</strong>
              <small>Analizar</small>
            </button>

            <button data-admin-acceso="chatbot" type="button">
              <span>🤖</span>
              <strong>Chatbot</strong>
              <small>Configurar</small>
            </button>
          </div>
        </article>
      </section>

      <section class="admin-card-v2 admin-estado-v2">
        <div class="admin-card-cabecera">
          <div>
            <span class="admin-card-etiqueta">Sistema</span>
            <h3>Estado de las funciones</h3>
            <p>Resumen de los módulos principales del CRM.</p>
          </div>
        </div>

        <div class="admin-estado-grid-v2">
          <div>
            <span class="estado-punto activo"></span>
            <p>
              <strong>CRM operativo</strong>
              <small>El panel funciona correctamente</small>
            </p>
          </div>

          <div>
            <span class="estado-punto activo"></span>
            <p>
              <strong>Clientes y leads</strong>
              <small>Módulos disponibles</small>
            </p>
          </div>

          <div>
            <span class="estado-punto activo"></span>
            <p>
              <strong>Chatbot disponible</strong>
              <small>Configuración local activa</small>
            </p>
          </div>

          <div>
            <span class="estado-punto pendiente"></span>
            <p>
              <strong>WhatsApp pendiente</strong>
              <small>Falta conectar la API oficial</small>
            </p>
          </div>
        </div>
      </section>
    </div>
  `
}

function crearGraficoActividadAdmin(
  clientes: number,
  leads: number,
  citas: number,
  asesores: number,
): string {
  const valores = [
    { nombre: 'Clientes', valor: clientes, icono: '👥' },
    { nombre: 'Leads', valor: leads, icono: '🎯' },
    { nombre: 'Citas', valor: citas, icono: '📅' },
    { nombre: 'Asesores', valor: asesores, icono: '🧑‍💼' },
  ]

  const maximo = Math.max(...valores.map((item) => item.valor), 1)

  return `
    <div class="admin-grafico-v2">
      ${valores
        .map((item) => {
          const porcentaje = Math.max(
            8,
            Math.round((item.valor / maximo) * 100),
          )

          return `
            <div class="admin-barra-item">
              <div class="admin-barra-datos">
                <span>${item.icono} ${item.nombre}</span>
                <strong>${item.valor}</strong>
              </div>

              <div class="admin-barra-fondo">
                <span style="width: ${porcentaje}%"></span>
              </div>
            </div>
          `
        })
        .join('')}
    </div>
  `
}

function crearMiniCalendarioAdmin(
  citas: ReturnType<typeof obtenerCitas>,
): string {
  const hoy = new Date()
  const anio = hoy.getFullYear()
  const mes = hoy.getMonth()
  const primerDia = new Date(anio, mes, 1)
  const totalDias = new Date(anio, mes + 1, 0).getDate()
  const desplazamiento = (primerDia.getDay() + 6) % 7
  const dias: string[] = []

  for (let i = 0; i < desplazamiento; i += 1) {
    dias.push('<span class="mini-calendario-vacio"></span>')
  }

  for (let dia = 1; dia <= totalDias; dia += 1) {
    const fecha = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(
      dia,
    ).padStart(2, '0')}`

    const cantidadCitas = citas.filter(
      (cita: { fecha?: string }) => cita.fecha === fecha,
    ).length

    const esHoy = hoy.getDate() === dia

    dias.push(`
      <button
        class="mini-calendario-dia ${esHoy ? 'es-hoy' : ''} ${
          cantidadCitas > 0 ? 'tiene-cita' : ''
        }"
        data-admin-acceso="citas"
        type="button"
        title="${
          cantidadCitas > 0
            ? `${cantidadCitas} cita(s)`
            : 'Sin citas'
        }"
      >
        ${dia}
        ${cantidadCitas > 0 ? '<i></i>' : ''}
      </button>
    `)
  }

  const nombreMes = new Intl.DateTimeFormat('es-ES', {
    month: 'long',
    year: 'numeric',
  }).format(hoy)

  return `
    <div class="mini-calendario-v2">
      <div class="mini-calendario-mes">
        ${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}
      </div>

      <div class="mini-calendario-semana">
        <span>L</span>
        <span>M</span>
        <span>X</span>
        <span>J</span>
        <span>V</span>
        <span>S</span>
        <span>D</span>
      </div>

      <div class="mini-calendario-dias">
        ${dias.join('')}
      </div>
    </div>
  `
}

function activarInicioAdministrador(): void {
  document
    .querySelector<HTMLButtonElement>('#admin-ir-clientes')
    ?.addEventListener('click', () => {
      activarSeccionDesdeAccesoRapido('clientes')
    })

  document
    .querySelectorAll<HTMLButtonElement>('[data-admin-acceso]')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        const seccion = boton.dataset.adminAcceso

        if (seccion) {
          activarSeccionDesdeAccesoRapido(seccion)
        }
      })
    })
}

function crearModuloMensajesAdmin(): string {
  return `
    <div class="admin-modulo-placeholder">
      <span class="admin-placeholder-icono">💬</span>
      <h3>Centro de mensajes</h3>
      <p>
        Aquí se mostrarán las conversaciones entre clientes,
        asesores y administradores.
      </p>

      <div class="admin-placeholder-lista">
        <span>• Bandeja de conversaciones</span>
        <span>• Mensajes sin leer</span>
        <span>• Envío de respuestas y archivos</span>
      </div>
    </div>
  `
}

function crearModuloDocumentosAdmin(): string {
  return `
    <div class="admin-modulo-placeholder">
      <span class="admin-placeholder-icono">📄</span>
      <h3>Gestión de documentos</h3>
      <p>
        Desde aquí podrás subir contratos, cotizaciones y
        archivos para cada cliente.
      </p>

      <button class="btn-primary" type="button">
        + Subir documento
      </button>
    </div>
  `
}

function crearModuloSeguimientoAdmin(): string {
  return `
    <div class="admin-seguimiento-grid">
      <article class="admin-seguimiento-card completado">
        <span>1</span>
        <h3>Registro</h3>
        <p>Clientes que completaron su registro.</p>
      </article>

      <article class="admin-seguimiento-card activo">
        <span>2</span>
        <h3>Solicitud</h3>
        <p>Solicitudes pendientes de revisión.</p>
      </article>

      <article class="admin-seguimiento-card">
        <span>3</span>
        <h3>Atención</h3>
        <p>Clientes atendidos por un asesor.</p>
      </article>

      <article class="admin-seguimiento-card">
        <span>4</span>
        <h3>Finalizado</h3>
        <p>Procesos comerciales completados.</p>
      </article>
    </div>
  `
}

function crearModuloConfiguracionAdmin(): string {
  return `
    <div class="admin-configuracion-grid">
      <article class="admin-config-card">
        <span>🏢</span>
        <div>
          <h3>Datos de la empresa</h3>
          <p>Nombre, correo y datos generales del CRM.</p>
        </div>
        <button class="btn-outline" type="button">Editar</button>
      </article>

      <article class="admin-config-card">
        <span>🔐</span>
        <div>
          <h3>Seguridad</h3>
          <p>Contraseña y opciones de acceso administrativo.</p>
        </div>
        <button class="btn-outline" type="button">
          Cambiar contraseña
        </button>
      </article>

      <article class="admin-config-card">
        <span>🔔</span>
        <div>
          <h3>Preferencias</h3>
          <p>Configuración de avisos y notificaciones.</p>
        </div>
        <button class="btn-outline" type="button">Configurar</button>
      </article>
    </div>
  `
}

function obtenerFechaActual(): string {
  const hoy = new Date()
  const anio = hoy.getFullYear()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

function crearModuloClientes(clientes: Cliente[]): string {
  return `
    <div class="barra-clientes">
      <input
        id="buscar-cliente"
        class="input-busqueda"
        type="search"
        placeholder="Buscar por nombre, correo o teléfono"
      />
    </div>

    <div id="lista-clientes">
      ${crearTablaClientes(clientes)}
    </div>
  `
}

function crearTablaClientes(clientes: Cliente[]): string {
  if (clientes.length === 0) {
    return `
      <div class="empty-state">
        <h3>No hay clientes registrados</h3>
        <p>Presiona “Nuevo cliente” para registrar uno.</p>
      </div>
    `
  }

  return `
    <div class="tabla-contenedor">
      <table class="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${clientes
            .map(
              (cliente) => `
                <tr>
                  <td>
                    ${escaparHTML(cliente.nombre)}
                    ${escaparHTML(cliente.apellido)}
                  </td>

                  <td>
                    ${escaparHTML(cliente.correo)}
                  </td>

                  <td>
                    ${escaparHTML(cliente.telefono)}
                  </td>

                  <td>
                    <button
                      class="btn-editar-cliente"
                      data-id="${cliente.id}"
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      class="btn-eliminar-cliente"
                      data-id="${cliente.id}"
                      type="button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `
}

function activarEventosClientes(): void {
  const buscador =
    document.querySelector<HTMLInputElement>('#buscar-cliente')

  buscador?.addEventListener('input', () => {
    const texto = buscador.value.trim().toLowerCase()

    const clientes = obtenerClientes()

    const clientesFiltrados = clientes.filter((cliente) => {
      const nombreCompleto =
        `${cliente.nombre} ${cliente.apellido}`.toLowerCase()

      return (
        nombreCompleto.includes(texto) ||
        cliente.correo.toLowerCase().includes(texto) ||
        cliente.telefono.includes(texto)
      )
    })

    actualizarListaClientes(clientesFiltrados)
  })

  activarBotonesClientes()
}

function activarBotonesClientes(): void {
  const botonesEditar =
    document.querySelectorAll<HTMLButtonElement>(
      '.btn-editar-cliente',
    )

  const botonesEliminar =
    document.querySelectorAll<HTMLButtonElement>(
      '.btn-eliminar-cliente',
    )

  botonesEditar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const idCliente = boton.dataset.id

      if (idCliente) {
        editarCliente(idCliente)
      }
    })
  })

  botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const idCliente = boton.dataset.id

      if (!idCliente) {
        return
      }

      const confirmar = window.confirm(
        '¿Deseas eliminar este cliente?',
      )

      if (confirmar) {
        eliminarCliente(idCliente)
      }
    })
  })
}

function crearCliente(): void {
  const nombre = window.prompt(
    'Ingrese el nombre del cliente:',
  )

  if (!nombre?.trim()) {
    return
  }

  const apellido = window.prompt(
    'Ingrese el apellido del cliente:',
  )

  if (!apellido?.trim()) {
    return
  }

  const correo = window.prompt(
    'Ingrese el correo electrónico:',
  )

  if (!correo?.trim()) {
    return
  }

  if (!validarCorreo(correo.trim())) {
    window.alert('Ingrese un correo electrónico válido.')
    return
  }

  const telefono = window.prompt(
    'Ingrese el teléfono de 10 números:',
  )

  if (!telefono?.trim()) {
    return
  }

  if (!validarTelefono(telefono.trim())) {
    window.alert(
      'El teléfono debe contener exactamente 10 números.',
    )

    return
  }

  const clientes = obtenerClientes()

  const correoExiste = clientes.some(
    (cliente) =>
      cliente.correo.toLowerCase() ===
      correo.trim().toLowerCase(),
  )

  if (correoExiste) {
    window.alert(
      'Ya existe un cliente registrado con ese correo.',
    )

    return
  }

  const nuevoCliente: Cliente = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono.trim(),
    contrasena: 'Cliente123',
    rol: 'cliente',
  }

  clientes.push(nuevoCliente)

  guardarClientes(clientes)

  crearNotificacion(
    'Nuevo cliente registrado',
    `${nuevoCliente.nombre} ${nuevoCliente.apellido} fue registrado en el CRM.`,
    'cliente',
  )

  actualizarListaClientes(clientes)
  actualizarTotalClientes(clientes.length)

  window.alert(
    'Cliente registrado. Su contraseña temporal es Cliente123',
  )
}

function editarCliente(idCliente: string): void {
  const clientes = obtenerClientes()

  const cliente = clientes.find(
    (item) => item.id === idCliente,
  )

  if (!cliente) {
    window.alert('No se encontró el cliente.')
    return
  }

  const nombre = window.prompt(
    'Nombre del cliente:',
    cliente.nombre,
  )

  if (!nombre?.trim()) {
    return
  }

  const apellido = window.prompt(
    'Apellido del cliente:',
    cliente.apellido,
  )

  if (!apellido?.trim()) {
    return
  }

  const correo = window.prompt(
    'Correo electrónico:',
    cliente.correo,
  )

  if (!correo?.trim()) {
    return
  }

  if (!validarCorreo(correo.trim())) {
    window.alert('Ingrese un correo electrónico válido.')
    return
  }

  const telefono = window.prompt(
    'Teléfono:',
    cliente.telefono,
  )

  if (!telefono?.trim()) {
    return
  }

  if (!validarTelefono(telefono.trim())) {
    window.alert(
      'El teléfono debe contener exactamente 10 números.',
    )

    return
  }

  const correoRepetido = clientes.some(
    (item) =>
      item.id !== idCliente &&
      item.correo.toLowerCase() ===
        correo.trim().toLowerCase(),
  )

  if (correoRepetido) {
    window.alert(
      'Ya existe otro cliente con ese correo.',
    )

    return
  }

  cliente.nombre = nombre.trim()
  cliente.apellido = apellido.trim()
  cliente.correo = correo.trim().toLowerCase()
  cliente.telefono = telefono.trim()

  guardarClientes(clientes)

  actualizarListaClientes(clientes)

  window.alert('Cliente actualizado correctamente.')
}

function eliminarCliente(idCliente: string): void {
  const clientes = obtenerClientes()

  const clientesActualizados = clientes.filter(
    (cliente) => cliente.id !== idCliente,
  )

  guardarClientes(clientesActualizados)

  actualizarListaClientes(clientesActualizados)
  actualizarTotalClientes(clientesActualizados.length)

  window.alert('Cliente eliminado correctamente.')
}

function actualizarListaClientes(clientes: Cliente[]): void {
  const lista =
    document.querySelector<HTMLDivElement>('#lista-clientes')

  if (!lista) {
    return
  }

  lista.innerHTML = crearTablaClientes(clientes)

  activarBotonesClientes()
}

function actualizarTotalClientes(total: number): void {
  const elemento =
    document.querySelector<HTMLElement>('#total-clientes')

  if (elemento) {
    elemento.textContent = String(total)
  }
}

function obtenerClientes(): Cliente[] {
  const datos = localStorage.getItem('clientes')

  if (!datos) {
    return []
  }

  try {
    const clientes = JSON.parse(datos)

    if (!Array.isArray(clientes)) {
      return []
    }

    return clientes as Cliente[]
  } catch {
    return []
  }
}

function guardarClientes(clientes: Cliente[]): void {
  localStorage.setItem(
    'clientes',
    JSON.stringify(clientes),
  )
}

function validarCorreo(correo: string): boolean {
  const expresionCorreo =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return expresionCorreo.test(correo)
}

function validarTelefono(telefono: string): boolean {
  return /^[0-9]{10}$/.test(telefono)
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')

  elemento.textContent = texto

  return elemento.innerHTML
}