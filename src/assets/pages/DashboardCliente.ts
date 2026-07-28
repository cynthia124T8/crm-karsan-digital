import { mostrarLogin } from './Login'
import {
  activarModuloChatbot,
  crearModuloChatbot,
} from './Chatbot'

type UsuarioActivo = {
  id?: string
  nombre: string
  correo: string
  rol: string
}

export function mostrarDashboardCliente(app: HTMLDivElement): void {
  const usuario = obtenerUsuarioActivo()

  if (!usuario) {
    mostrarLogin(app)
    return
  }

  app.innerHTML = `
    <div class="crm-shell">
      <aside class="crm-sidebar crm-sidebar-cliente">
        <div>
          <div class="crm-brand crm-brand-cliente">
            <div class="crm-brand-mark">K</div>

            <div>
              <strong>Karsan Digital</strong>
              <span>CLIENTE</span>
            </div>
          </div>

          <nav class="crm-nav">
            <button class="menu-item active" data-seccion="inicio">
              <span class="crm-nav-icon">🏠</span>
              <span>Inicio</span>
            </button>

            <button class="menu-item" data-seccion="perfil">
              <span class="crm-nav-icon">👤</span>
              <span>Mi perfil</span>
            </button>

            <button class="menu-item" data-seccion="citas">
              <span class="crm-nav-icon">📅</span>
              <span>Mis citas</span>
            </button>

            <button class="menu-item" data-seccion="chatbot">
              <span class="crm-nav-icon">🤖</span>
              <span>Chatbot</span>
            </button>

            <button class="menu-item" data-seccion="notificaciones">
              <span class="crm-nav-icon">🔔</span>
              <span>Notificaciones</span>
            </button>
          </nav>
        </div>

        <div class="crm-sidebar-footer">
          <div class="crm-user-card">
            <div class="crm-avatar">
              ${obtenerInicial(usuario.nombre)}
            </div>

            <div>
              <strong>${escaparHTML(usuario.nombre)}</strong>
              <span>${escaparHTML(usuario.correo)}</span>
              <small>Cuenta activa</small>
            </div>
          </div>

          <button
            id="cerrar-sesion-cliente"
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
            <h1>Bienvenido/a, ${escaparHTML(usuario.nombre)}</h1>
            <p>Gestiona tu información y comunícate con Karsan Digital.</p>
          </div>

          <div class="crm-topbar-actions">
            <button
              class="crm-icon-button"
              type="button"
              data-seccion-chat="notificaciones"
              aria-label="Abrir notificaciones"
            >
              🔔
            </button>

            <div class="crm-profile">
              <div class="crm-avatar">
                ${obtenerInicial(usuario.nombre)}
              </div>

              <div>
                <strong>${escaparHTML(usuario.nombre)}</strong>
                <span>Cliente</span>
              </div>
            </div>
          </div>
        </header>

        <section class="crm-client-kpis">
          <article class="crm-client-kpi">
            <div class="crm-kpi-icon azul">📅</div>
            <div>
              <span>Citas pendientes</span>
              <strong id="cliente-total-citas">
                ${obtenerCitasCliente(usuario).length}
              </strong>
              <small>Citas programadas</small>
            </div>
          </article>

          <article class="crm-client-kpi">
            <div class="crm-kpi-icon naranja">🔔</div>
            <div>
              <span>Notificaciones</span>
              <strong>0</strong>
              <small>Mensajes nuevos</small>
            </div>
          </article>

          <article class="crm-client-kpi">
            <div class="crm-kpi-icon verde">🤖</div>
            <div>
              <span>Asistente virtual</span>
              <strong>Activo</strong>
              <small>Disponible ahora</small>
            </div>
          </article>
        </section>

        <section class="crm-card crm-workspace crm-client-content">
          <div id="contenido-cliente">
            ${crearInicioCliente(usuario)}
          </div>
        </section>

        <button
          class="crm-chat-fab"
          type="button"
          data-seccion-chat="chatbot"
          aria-label="Abrir chatbot"
        >
          🤖
        </button>
      </main>
    </div>
  `

  activarDashboardCliente(app, usuario)
}

function activarDashboardCliente(
  app: HTMLDivElement,
  usuario: UsuarioActivo,
): void {
  const botonCerrar =
    document.querySelector<HTMLButtonElement>(
      '#cerrar-sesion-cliente',
    )

  const botonesMenu =
    document.querySelectorAll<HTMLButtonElement>(
      '.menu-item',
    )

  botonCerrar?.addEventListener('click', () => {
    localStorage.removeItem('usuarioActivo')
    mostrarLogin(app)
  })

  botonesMenu.forEach((boton) => {
    boton.addEventListener('click', () => {
      botonesMenu.forEach((item) => {
        item.classList.remove('active')
      })

      boton.classList.add('active')

      const seccion = boton.dataset.seccion ?? 'inicio'
      mostrarSeccionCliente(seccion, usuario)
    })
  })

  document
    .querySelectorAll<HTMLButtonElement>('[data-seccion-chat]')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        const seccion = boton.dataset.seccionChat ?? 'chatbot'
        mostrarSeccionCliente(seccion, usuario)

        botonesMenu.forEach((item) => {
          item.classList.toggle(
            'active',
            item.dataset.seccion === seccion,
          )
        })
      })
    })

  activarBotonInicioChatbot(usuario)
}

function mostrarSeccionCliente(
  seccion: string,
  usuario: UsuarioActivo,
): void {
  const contenido =
    document.querySelector<HTMLDivElement>(
      '#contenido-cliente',
    )

  if (!contenido) {
    return
  }

  if (seccion === 'inicio') {
    contenido.innerHTML = crearInicioCliente(usuario)
    activarBotonInicioChatbot(usuario)
    return
  }

  if (seccion === 'perfil') {
    contenido.innerHTML = `
      <div class="perfil-cliente">
        <h2>Mi perfil</h2>

        <div class="perfil-datos">
          <p>
            <strong>Nombre:</strong>
            ${escaparHTML(usuario.nombre)}
          </p>

          <p>
            <strong>Correo:</strong>
            ${escaparHTML(usuario.correo)}
          </p>

          <p>
            <strong>Rol:</strong>
            Cliente
          </p>
        </div>
      </div>
    `
    return
  }

  if (seccion === 'citas') {
    const citas = obtenerCitasCliente(usuario)

    contenido.innerHTML = `
      <div class="modulo-citas">
        <div class="encabezado-modulo">
          <div>
            <h2>Mis citas</h2>
            <p>Consulta las citas registradas a tu nombre.</p>
          </div>

          <button
            id="abrir-chat-cita"
            class="btn-principal"
            type="button"
          >
            Solicitar cita por chatbot
          </button>
        </div>

        ${crearTablaCitasCliente(citas)}
      </div>
    `

    document
      .querySelector<HTMLButtonElement>(
        '#abrir-chat-cita',
      )
      ?.addEventListener('click', () => {
        mostrarSeccionCliente('chatbot', usuario)
      })

    return
  }

  if (seccion === 'chatbot') {
    contenido.innerHTML = crearModuloChatbot()
    activarModuloChatbot()
    return
  }

  if (seccion === 'notificaciones') {
    contenido.innerHTML = `
      <div class="empty-state">
        <h2>Notificaciones</h2>
        <p>
          Aquí aparecerán las confirmaciones y novedades
          relacionadas con tus citas.
        </p>
      </div>
    `
  }
}

function activarBotonInicioChatbot(
  usuario: UsuarioActivo,
): void {
  document
    .querySelector<HTMLButtonElement>('#inicio-abrir-chatbot')
    ?.addEventListener('click', () => {
      mostrarSeccionCliente('chatbot', usuario)

      document
        .querySelectorAll<HTMLButtonElement>('.menu-item')
        .forEach((item) => {
          item.classList.toggle(
            'active',
            item.dataset.seccion === 'chatbot',
          )
        })
    })
}

function crearInicioCliente(
  usuario: UsuarioActivo,
): string {
  const citas = obtenerCitasCliente(usuario)
  const proximaCita = citas.find(
    (cita) =>
      cita.estado === 'Pendiente' ||
      cita.estado === 'Confirmada',
  )

  return `
    <div class="inicio-cliente">
      <div class="empty-state">
        <h2>Panel principal</h2>

        <p>
          Bienvenido/a al CRM de Karsan Digital.
        </p>

        ${
          proximaCita
            ? `
              <p>
                <strong>Próxima cita:</strong>
                ${formatearFecha(proximaCita.fecha)}
                a las ${escaparHTML(proximaCita.hora)}
              </p>
            `
            : `
              <p>
                Actualmente no tienes citas pendientes.
              </p>
            `
        }

        <button
          id="inicio-abrir-chatbot"
          class="btn-primary"
          type="button"
        >
          Hablar con el asistente
        </button>
      </div>
    </div>
  `
}

type CitaCliente = {
  id: string
  clienteId: string
  clienteNombre: string
  asesorNombre: string
  fecha: string
  hora: string
  motivo: string
  estado: string
}

function obtenerCitasCliente(
  usuario: UsuarioActivo,
): CitaCliente[] {
  const datos = localStorage.getItem('citas')

  if (!datos) {
    return []
  }

  try {
    const citas = JSON.parse(datos)

    if (!Array.isArray(citas)) {
      return []
    }

    return (citas as CitaCliente[]).filter(
      (cita) =>
        cita.clienteId === usuario.id ||
        cita.clienteId === usuario.correo ||
        cita.clienteNombre
          .toLowerCase()
          .includes(usuario.nombre.toLowerCase()),
    )
  } catch {
    return []
  }
}

function crearTablaCitasCliente(
  citas: CitaCliente[],
): string {
  if (citas.length === 0) {
    return `
      <div class="empty-state">
        <h3>No tienes citas registradas</h3>
        <p>
          Usa el chatbot para solicitar una nueva cita.
        </p>
      </div>
    `
  }

  return `
    <div class="tabla-contenedor">
      <table class="tabla-datos">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asesor</th>
            <th>Motivo</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          ${citas
            .map(
              (cita) => `
                <tr>
                  <td>${formatearFecha(cita.fecha)}</td>
                  <td>${escaparHTML(cita.hora)}</td>
                  <td>
                    ${escaparHTML(
                      cita.asesorNombre || 'Por asignar',
                    )}
                  </td>
                  <td>${escaparHTML(cita.motivo)}</td>
                  <td>
                    <span
                      class="estado estado-${cita.estado
                        .toLowerCase()
                        .replace(' ', '-')}"
                    >
                      ${escaparHTML(cita.estado)}
                    </span>
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

function obtenerUsuarioActivo(): UsuarioActivo | null {
  const datos = localStorage.getItem('usuarioActivo')

  if (!datos) {
    return null
  }

  try {
    return JSON.parse(datos) as UsuarioActivo
  } catch {
    return null
  }
}

function obtenerInicial(nombre: string): string {
  return nombre.trim().charAt(0).toUpperCase()
}

function formatearFecha(fecha: string): string {
  const partes = fecha.split('-')

  if (partes.length !== 3) {
    return fecha
  }

  const [anio, mes, dia] = partes
  return `${dia}/${mes}/${anio}`
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')
  elemento.textContent = texto
  return elemento.innerHTML
}