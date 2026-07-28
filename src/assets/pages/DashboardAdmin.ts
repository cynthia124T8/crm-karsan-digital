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
              <h2 id="titulo-seccion">Clientes recientes</h2>
              <p id="descripcion-seccion">
                Clientes registrados en el sistema
              </p>
            </div>

            <button
              id="nuevo-cliente"
              class="btn-primary"
              type="button"
            >
              + Nuevo cliente
            </button>
          </div>

          <div id="contenido-dashboard">
            ${crearModuloClientes(clientes)}
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

  activarEventosClientes()
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

  if (seccion === 'inicio' || seccion === 'clientes') {
    const clientes = obtenerClientes()

    titulo.textContent =
      seccion === 'inicio'
        ? 'Clientes recientes'
        : 'Gestión de clientes'

    descripcion.textContent =
      'Clientes registrados en el sistema'

    if (botonNuevoCliente) {
      botonNuevoCliente.style.display = 'inline-block'
    }

    contenido.innerHTML = crearModuloClientes(clientes)

    activarEventosClientes()

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

  if (botonNuevoCliente) {
    botonNuevoCliente.style.display = 'none'
  }

  const nombres: Record<string, string> = {
    leads: 'Leads',
    asesores: 'Asesores',
    citas: 'Citas',
    notificaciones: 'Notificaciones',
    reportes: 'Reportes',
    chatbot: 'Chatbot',
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