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

            <button class="menu-item" data-seccion="mensajes">
              <span class="crm-nav-icon">💬</span>
              <span>Mensajes</span>
            </button>

            <button class="menu-item" data-seccion="documentos">
              <span class="crm-nav-icon">📄</span>
              <span>Documentos</span>
            </button>

            <button class="menu-item" data-seccion="progreso">
              <span class="crm-nav-icon">📊</span>
              <span>Mi progreso</span>
            </button>

            <button class="menu-item" data-seccion="chatbot">
              <span class="crm-nav-icon">🤖</span>
              <span>Chatbot</span>
            </button>

            <button class="menu-item" data-seccion="configuracion">
              <span class="crm-nav-icon">⚙️</span>
              <span>Configuración</span>
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
              <small>🟢 En línea</small>
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
    const hoy = new Date()

    contenido.innerHTML = crearModuloCitas(
      citas,
      hoy.getFullYear(),
      hoy.getMonth(),
    )

    activarCalendarioCitas(
      usuario,
      citas,
      hoy.getFullYear(),
      hoy.getMonth(),
    )

    return
  }

  if (seccion === 'mensajes') {
    contenido.innerHTML = `
      <div class="perfil-cliente">
        <h2>Mensajes</h2>
        <p>
          Aquí podrás conversar con tu asesor y revisar
          tus conversaciones recientes.
        </p>

        <div class="empty-state">
          <h3>No tienes mensajes nuevos</h3>
          <p>
            Cuando un asesor te escriba, el mensaje aparecerá aquí.
          </p>
        </div>
      </div>
    `
    return
  }

  if (seccion === 'documentos') {
    contenido.innerHTML = `
      <div class="perfil-cliente">
        <h2>Documentos</h2>
        <p>
          Consulta tus contratos, cotizaciones y archivos compartidos.
        </p>

        <div class="empty-state">
          <h3>No hay documentos disponibles</h3>
          <p>
            Los archivos enviados por Karsan Digital aparecerán aquí.
          </p>
        </div>
      </div>
    `
    return
  }

  if (seccion === 'progreso') {
    contenido.innerHTML = `
      <div class="perfil-cliente">
        <h2>Mi progreso</h2>
        <p>
          Revisa el estado actual de tu proceso con Karsan Digital.
        </p>

        <div class="cliente-progreso">
          <div class="cliente-progreso-pasos">
            <div class="cliente-paso completado">
              <span>✓</span>
              <p>Registro</p>
            </div>

            <div class="cliente-paso completado">
              <span>✓</span>
              <p>Solicitud</p>
            </div>

            <div class="cliente-paso activo">
              <span>3</span>
              <p>Atención</p>
            </div>

            <div class="cliente-paso">
              <span>4</span>
              <p>Finalizado</p>
            </div>
          </div>
        </div>
      </div>
    `
    return
  }

  if (seccion === 'chatbot') {
    contenido.innerHTML = crearModuloChatbot()
    activarModuloChatbot()
    return
  }

  if (seccion === 'configuracion') {
    contenido.innerHTML = `
      <div class="perfil-cliente">
        <h2>Configuración</h2>
        <p>
          Administra las preferencias de tu cuenta.
        </p>

        <div class="perfil-datos">
          <p>
            <strong>Correo:</strong>
            ${escaparHTML(usuario.correo)}
          </p>

          <p>
            <strong>Estado:</strong>
            🟢 En línea
          </p>

          <button class="btn-outline" type="button">
            Cambiar contraseña
          </button>
        </div>
      </div>
    `
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
  const abrirSeccion = (seccion: string): void => {
    mostrarSeccionCliente(seccion, usuario)

    document
      .querySelectorAll<HTMLButtonElement>('.menu-item')
      .forEach((item) => {
        item.classList.toggle(
          'active',
          item.dataset.seccion === seccion,
        )
      })
  }

  document
    .querySelector<HTMLButtonElement>('#inicio-abrir-chatbot')
    ?.addEventListener('click', () => abrirSeccion('chatbot'))

  document
    .querySelector<HTMLButtonElement>(
      '#inicio-abrir-chatbot-secundario',
    )
    ?.addEventListener('click', () => abrirSeccion('chatbot'))

  document
    .querySelector<HTMLButtonElement>('#inicio-ver-citas')
    ?.addEventListener('click', () => abrirSeccion('citas'))

  document
    .querySelector<HTMLButtonElement>('#inicio-ver-perfil')
    ?.addEventListener('click', () => abrirSeccion('perfil'))

  document
    .querySelector<HTMLButtonElement>('#inicio-ver-notificaciones')
    ?.addEventListener('click', () =>
      abrirSeccion('notificaciones'),
    )
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

  const asesor =
    proximaCita?.asesorNombre?.trim() || 'Por asignar'

  return `
    <div class="inicio-cliente">
      <section class="cliente-bienvenida">
        <div>
          <span class="cliente-bienvenida-etiqueta">
            Panel del cliente
          </span>

          <h2>
            ¡Hola, ${escaparHTML(usuario.nombre)}! 👋
          </h2>

          <p>
            Revisa tus citas, consulta tus novedades y
            comunícate con el equipo de Karsan Digital.
          </p>
        </div>

        <button
          id="inicio-abrir-chatbot"
          class="btn-primary"
          type="button"
        >
          🤖 Hablar con el asistente
        </button>
      </section>

      <section class="cliente-resumen-grid">
        <article class="cliente-resumen-card">
          <div class="cliente-resumen-icono azul">📅</div>
          <div>
            <span>Próxima cita</span>
            ${
              proximaCita
                ? `
                  <strong>${formatearFecha(proximaCita.fecha)}</strong>
                  <small>
                    ${escaparHTML(proximaCita.hora)}
                    · ${escaparHTML(proximaCita.estado)}
                  </small>
                `
                : `
                  <strong>Sin citas</strong>
                  <small>No tienes citas pendientes</small>
                `
            }
          </div>
        </article>

        <article class="cliente-resumen-card">
          <div class="cliente-resumen-icono verde">👨‍💼</div>
          <div>
            <span>Mi asesor</span>
            <strong>${escaparHTML(asesor)}</strong>
            <small>
              ${
                asesor === 'Por asignar'
                  ? 'Pendiente de asignación'
                  : 'Asesor asignado'
              }
            </small>
          </div>
        </article>

        <article class="cliente-resumen-card">
          <div class="cliente-resumen-icono naranja">🔔</div>
          <div>
            <span>Notificaciones</span>
            <strong>0 nuevas</strong>
            <small>Estás al día</small>
          </div>
        </article>

        <article class="cliente-resumen-card">
          <div class="cliente-resumen-icono morado">🤖</div>
          <div>
            <span>Asistente virtual</span>
            <strong>Disponible</strong>
            <small>Atención inmediata</small>
          </div>
        </article>
      </section>

      <section class="cliente-inicio-grid">
        <article class="cliente-panel-card">
          <div class="cliente-panel-titulo">
            <div>
              <h3>Estado de tu atención</h3>
              <p>Seguimiento general de tu proceso.</p>
            </div>

            <span class="cliente-estado-activo">
              En seguimiento
            </span>
          </div>

          <div class="cliente-progreso">
            <div class="cliente-progreso-pasos">
              <div class="cliente-paso completado">
                <span>✓</span>
                <p>Registro</p>
              </div>

              <div class="cliente-paso completado">
                <span>✓</span>
                <p>Solicitud</p>
              </div>

              <div class="cliente-paso activo">
                <span>3</span>
                <p>Atención</p>
              </div>

              <div class="cliente-paso">
                <span>4</span>
                <p>Finalizado</p>
              </div>
            </div>
          </div>
        </article>

        <article class="cliente-panel-card">
          <div class="cliente-panel-titulo">
            <div>
              <h3>Actividad reciente</h3>
              <p>Últimos movimientos de tu cuenta.</p>
            </div>
          </div>

          <div class="cliente-actividad-lista">
            <div>
              <span class="cliente-actividad-icono">✓</span>
              <p>
                <strong>Cuenta activa</strong>
                <small>Tu perfil está disponible.</small>
              </p>
            </div>

            <div>
              <span class="cliente-actividad-icono">📅</span>
              <p>
                <strong>
                  ${
                    proximaCita
                      ? 'Tienes una cita programada'
                      : 'Aún no tienes citas'
                  }
                </strong>
                <small>
                  ${
                    proximaCita
                      ? `${formatearFecha(
                          proximaCita.fecha,
                        )} a las ${escaparHTML(
                          proximaCita.hora,
                        )}`
                      : 'Puedes solicitar una desde el chatbot.'
                  }
                </small>
              </p>
            </div>

            <div>
              <span class="cliente-actividad-icono">🤖</span>
              <p>
                <strong>Asistente disponible</strong>
                <small>
                  Puedes realizar preguntas en cualquier momento.
                </small>
              </p>
            </div>
          </div>
        </article>
      </section>

      <section class="cliente-panel-card">
        <div class="cliente-panel-titulo">
          <div>
            <h3>Accesos rápidos</h3>
            <p>Ingresa directamente a las opciones principales.</p>
          </div>
        </div>

        <div class="cliente-accesos-grid">
          <button id="inicio-ver-citas" class="cliente-acceso" type="button">
            <span>📅</span>
            <strong>Mis citas</strong>
            <small>Consultar citas registradas</small>
          </button>

          <button id="inicio-ver-perfil" class="cliente-acceso" type="button">
            <span>👤</span>
            <strong>Mi perfil</strong>
            <small>Revisar datos personales</small>
          </button>

          <button id="inicio-ver-notificaciones" class="cliente-acceso" type="button">
            <span>🔔</span>
            <strong>Notificaciones</strong>
            <small>Consultar novedades</small>
          </button>

          <button id="inicio-abrir-chatbot-secundario" class="cliente-acceso" type="button">
            <span>🤖</span>
            <strong>Chatbot</strong>
            <small>Hablar con el asistente</small>
          </button>
        </div>
      </section>
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


function crearModuloCitas(
  citas: CitaCliente[],
  anio: number,
  mes: number,
): string {
  return `
    <div class="modulo-citas">
      <div class="encabezado-modulo">
        <div>
          <h2>📅 Mis citas</h2>
          <p>
            Revisa tu calendario y consulta las citas
            registradas a tu nombre.
          </p>
        </div>

        <button
          id="abrir-chat-cita"
          class="btn-principal"
          type="button"
        >
          ➕ Solicitar nueva cita
        </button>
      </div>

      <div class="calendario-citas-layout">
        <section class="calendario-card">
          <div class="calendario-cabecera">
            <button
              id="calendario-mes-anterior"
              class="calendario-nav"
              type="button"
              aria-label="Mes anterior"
            >
              ‹
            </button>

            <h3>${obtenerNombreMes(mes)} ${anio}</h3>

            <button
              id="calendario-mes-siguiente"
              class="calendario-nav"
              type="button"
              aria-label="Mes siguiente"
            >
              ›
            </button>
          </div>

          <div class="calendario-semana">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span>Sáb</span>
            <span>Dom</span>
          </div>

          <div class="calendario-dias">
            ${crearDiasCalendario(citas, anio, mes)}
          </div>

          <div class="calendario-leyenda">
            <span><i class="punto hoy"></i> Hoy</span>
            <span><i class="punto pendiente"></i> Pendiente</span>
            <span><i class="punto confirmada"></i> Confirmada</span>
            <span><i class="punto cancelada"></i> Cancelada</span>
          </div>
        </section>

        <aside class="detalle-dia-card">
          <span class="detalle-dia-etiqueta">Día seleccionado</span>
          <h3 id="calendario-fecha-seleccionada">
            Selecciona un día
          </h3>

          <div id="calendario-detalle-citas" class="detalle-dia-contenido">
            <p>
              Haz clic en una fecha para ver las citas
              programadas para ese día.
            </p>
          </div>
        </aside>
      </div>

      <section class="lista-citas-seccion">
        <div class="lista-citas-titulo">
          <div>
            <h3>Próximas citas</h3>
            <p>Resumen de todas tus citas registradas.</p>
          </div>
        </div>

        ${crearTablaCitasCliente(citas)}
      </section>
    </div>
  `
}

function activarCalendarioCitas(
  usuario: UsuarioActivo,
  citas: CitaCliente[],
  anio: number,
  mes: number,
): void {
  document
    .querySelector<HTMLButtonElement>('#abrir-chat-cita')
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

  document
    .querySelector<HTMLButtonElement>('#calendario-mes-anterior')
    ?.addEventListener('click', () => {
      const fecha = new Date(anio, mes - 1, 1)

      const contenido =
        document.querySelector<HTMLDivElement>(
          '#contenido-cliente',
        )

      if (!contenido) {
        return
      }

      contenido.innerHTML = crearModuloCitas(
        citas,
        fecha.getFullYear(),
        fecha.getMonth(),
      )

      activarCalendarioCitas(
        usuario,
        citas,
        fecha.getFullYear(),
        fecha.getMonth(),
      )
    })

  document
    .querySelector<HTMLButtonElement>('#calendario-mes-siguiente')
    ?.addEventListener('click', () => {
      const fecha = new Date(anio, mes + 1, 1)

      const contenido =
        document.querySelector<HTMLDivElement>(
          '#contenido-cliente',
        )

      if (!contenido) {
        return
      }

      contenido.innerHTML = crearModuloCitas(
        citas,
        fecha.getFullYear(),
        fecha.getMonth(),
      )

      activarCalendarioCitas(
        usuario,
        citas,
        fecha.getFullYear(),
        fecha.getMonth(),
      )
    })

  document
    .querySelectorAll<HTMLButtonElement>('.calendario-dia[data-fecha]')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        const fecha = boton.dataset.fecha

        if (!fecha) {
          return
        }

        document
          .querySelectorAll<HTMLButtonElement>('.calendario-dia')
          .forEach((dia) => dia.classList.remove('seleccionado'))

        boton.classList.add('seleccionado')
        mostrarDetalleCitasDia(fecha, citas)
      })
    })
}

function crearDiasCalendario(
  citas: CitaCliente[],
  anio: number,
  mes: number,
): string {
  const primerDia = new Date(anio, mes, 1)
  const totalDias = new Date(anio, mes + 1, 0).getDate()
  const desplazamiento = (primerDia.getDay() + 6) % 7
  const hoy = new Date()
  const elementos: string[] = []

  for (let i = 0; i < desplazamiento; i += 1) {
    elementos.push('<span class="calendario-vacio"></span>')
  }

  for (let dia = 1; dia <= totalDias; dia += 1) {
    const fecha = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(
      dia,
    ).padStart(2, '0')}`

    const citasDia = citas.filter((cita) => cita.fecha === fecha)
    const esHoy =
      hoy.getFullYear() === anio &&
      hoy.getMonth() === mes &&
      hoy.getDate() === dia

    const estados = citasDia
      .map((cita) => cita.estado.toLowerCase())
      .join(' ')

    elementos.push(`
      <button
        class="calendario-dia ${esHoy ? 'es-hoy' : ''} ${
          citasDia.length > 0 ? 'tiene-cita' : ''
        }"
        type="button"
        data-fecha="${fecha}"
        aria-label="Ver citas del ${formatearFecha(fecha)}"
      >
        <span>${dia}</span>

        ${
          citasDia.length > 0
            ? `
              <small class="calendario-indicadores">
                ${crearIndicadoresEstado(estados)}
              </small>
            `
            : ''
        }
      </button>
    `)
  }

  return elementos.join('')
}

function crearIndicadoresEstado(estados: string): string {
  const indicadores: string[] = []

  if (estados.includes('confirmada')) {
    indicadores.push('<i class="confirmada"></i>')
  }

  if (estados.includes('pendiente')) {
    indicadores.push('<i class="pendiente"></i>')
  }

  if (estados.includes('cancelada')) {
    indicadores.push('<i class="cancelada"></i>')
  }

  if (indicadores.length === 0) {
    indicadores.push('<i class="otra"></i>')
  }

  return indicadores.join('')
}

function mostrarDetalleCitasDia(
  fecha: string,
  citas: CitaCliente[],
): void {
  const titulo =
    document.querySelector<HTMLHeadingElement>(
      '#calendario-fecha-seleccionada',
    )

  const detalle =
    document.querySelector<HTMLDivElement>(
      '#calendario-detalle-citas',
    )

  if (!titulo || !detalle) {
    return
  }

  const citasDia = citas.filter((cita) => cita.fecha === fecha)
  titulo.textContent = formatearFecha(fecha)

  if (citasDia.length === 0) {
    detalle.innerHTML = `
      <div class="detalle-dia-vacio">
        <span>📭</span>
        <p>No tienes citas programadas para este día.</p>
      </div>
    `
    return
  }

  detalle.innerHTML = citasDia
    .map(
      (cita) => `
        <article class="detalle-cita-item">
          <div class="detalle-cita-hora">
            ${escaparHTML(cita.hora)}
          </div>

          <div>
            <strong>${escaparHTML(cita.motivo)}</strong>
            <span>
              Asesor:
              ${escaparHTML(cita.asesorNombre || 'Por asignar')}
            </span>

            <small
              class="estado estado-${cita.estado
                .toLowerCase()
                .replace(' ', '-')}"
            >
              ${escaparHTML(cita.estado)}
            </small>
          </div>
        </article>
      `,
    )
    .join('')
}

function obtenerNombreMes(mes: number): string {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  return meses[mes] ?? ''
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