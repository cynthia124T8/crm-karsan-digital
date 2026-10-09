import { crearNotificacion } from './Notificaciones'
import { obtenerAsesores } from './Asesores'

type MensajeChat = {
  autor: 'bot' | 'usuario'
  texto: string
  hora?: string
}

type UsuarioActivo = {
  id?: string
  nombre: string
  correo: string
  telefono?: string
  rol: string
}

type DatosVisitante = {
  nombre: string
  correo: string
  telefono: string
  servicio: string
}

type LeadChatbot = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  empresa: string
  fuente: string
  servicio: string
  estado: string
  fechaCreacion: string
}

type CitaChatbot = {
  id: string
  clienteId: string
  clienteNombre: string
  asesorId: string
  asesorNombre: string
  fecha: string
  hora: string
  motivo: string
  estado: 'Pendiente'
}

type FlujoChat =
  | 'normal'
  | 'captarNombre'
  | 'captarCorreo'
  | 'captarTelefono'
  | 'captarServicio'
  | 'citaServicio'
  | 'citaFecha'
  | 'citaHora'
  | 'citaAsesor'

let flujoActual: FlujoChat = 'normal'

let datosVisitante: DatosVisitante = {
  nombre: '',
  correo: '',
  telefono: '',
  servicio: '',
}

let datosCita = {
  servicio: '',
  fecha: '',
  hora: '',
}

export function crearModuloChatbot(): string {
  return `
    <section id="modulo-chatbot" class="modulo-chatbot">
      <div class="encabezado-modulo">
        <div>
          <h2>Asistente virtual</h2>
          <p>
            Responde preguntas, registra leads y permite solicitar citas.
          </p>
        </div>
      </div>

      <div class="chatbot-presentacion">
        <div class="chatbot-icono-grande">🤖</div>

        <h3>Asistente Karsan</h3>

        <p>
          Disponible para orientar a clientes y visitantes.
        </p>

        <button
          id="btn-probar-chatbot"
          class="btn-principal"
          type="button"
        >
          Abrir chatbot
        </button>
      </div>
    </section>

    <button
      id="boton-chatbot-flotante"
      class="boton-chatbot-flotante"
      type="button"
      aria-label="Abrir chatbot"
    >
      <span class="chatbot-flotante-icono">🤖</span>
      <span class="chatbot-flotante-alerta"></span>
    </button>

    <aside
      id="ventana-chatbot"
      class="ventana-chatbot chatbot-oculto"
      aria-label="Asistente virtual Karsan"
    >
      <header class="chatbot-cabecera">
        <div class="chatbot-avatar">🤖</div>

        <div class="chatbot-identidad">
          <strong>Asistente Karsan</strong>
          <span><i></i> En línea</span>
        </div>

        <div class="chatbot-controles">
          <button
            id="minimizar-chatbot"
            type="button"
            aria-label="Minimizar chatbot"
          >
            —
          </button>

          <button
            id="cerrar-chatbot"
            type="button"
            aria-label="Cerrar chatbot"
          >
            ×
          </button>
        </div>
      </header>

      <div
        id="chatbot-mensajes"
        class="chatbot-mensajes"
      ></div>

      <div
        id="chatbot-escribiendo"
        class="chatbot-escribiendo chatbot-oculto"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        id="chatbot-opciones"
        class="chatbot-opciones"
      >
        <button type="button" data-opcion-chatbot="servicios">
          📋 Ver servicios
        </button>

        <button type="button" data-opcion-chatbot="cita">
          📅 Agendar cita
        </button>

        <button type="button" data-opcion-chatbot="asesor">
          👨‍💼 Hablar con un asesor
        </button>

        <button type="button" data-opcion-chatbot="cotizacion">
          💰 Solicitar cotización
        </button>
      </div>

      <form
        id="formulario-chatbot"
        class="chatbot-formulario"
      >
        <label
          for="archivo-chatbot"
          class="chatbot-adjuntar"
          title="Adjuntar archivo"
        >
          📎
        </label>

        <input
          id="archivo-chatbot"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          hidden
        />

        <input
          id="chatbot-input"
          type="text"
          placeholder="Escribe un mensaje..."
          autocomplete="off"
          required
        />

        <button
          class="chatbot-enviar"
          type="submit"
          aria-label="Enviar mensaje"
        >
          ➤
        </button>
      </form>
    </aside>
  `
}

export function activarModuloChatbot(): void {
  const botonFlotante =
    document.querySelector<HTMLButtonElement>(
      '#boton-chatbot-flotante',
    )

  const botonProbar =
    document.querySelector<HTMLButtonElement>(
      '#btn-probar-chatbot',
    )

  const ventana =
    document.querySelector<HTMLElement>(
      '#ventana-chatbot',
    )

  const botonCerrar =
    document.querySelector<HTMLButtonElement>(
      '#cerrar-chatbot',
    )

  const botonMinimizar =
    document.querySelector<HTMLButtonElement>(
      '#minimizar-chatbot',
    )

  const formulario =
    document.querySelector<HTMLFormElement>(
      '#formulario-chatbot',
    )

  const input =
    document.querySelector<HTMLInputElement>(
      '#chatbot-input',
    )

  const archivo =
    document.querySelector<HTMLInputElement>(
      '#archivo-chatbot',
    )

  const contenedorMensajes =
    document.querySelector<HTMLElement>(
      '#chatbot-mensajes',
    )

  const indicadorEscribiendo =
    document.querySelector<HTMLElement>(
      '#chatbot-escribiendo',
    )

  const botonesOpciones =
    document.querySelectorAll<HTMLButtonElement>(
      '[data-opcion-chatbot]',
    )

  if (
    !ventana ||
    !formulario ||
    !input ||
    !contenedorMensajes
  ) {
    return
  }

  const usuario = obtenerUsuarioActivo()

  cargarDatosUsuario(usuario)
  cargarHistorial(contenedorMensajes)

  function abrirChatbot(): void {
    ventana.classList.remove('chatbot-oculto')
    botonFlotante?.classList.add('chatbot-boton-oculto')

    if (contenedorMensajes.children.length === 0) {
      iniciarConversacion(usuario)
    }

    input.focus()
  }

  function cerrarChatbot(): void {
    ventana.classList.add('chatbot-oculto')
    botonFlotante?.classList.remove('chatbot-boton-oculto')
  }

  botonFlotante?.addEventListener(
    'click',
    abrirChatbot,
  )

  botonProbar?.addEventListener(
    'click',
    abrirChatbot,
  )

  botonCerrar?.addEventListener(
    'click',
    cerrarChatbot,
  )

  botonMinimizar?.addEventListener(
    'click',
    cerrarChatbot,
  )

  botonesOpciones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const opcion =
        boton.dataset.opcionChatbot ?? ''

      const textos: Record<string, string> = {
        servicios: 'Ver servicios',
        cita: 'Agendar una cita',
        asesor: 'Hablar con un asesor',
        cotizacion: 'Solicitar cotización',
      }

      agregarMensaje({
        autor: 'usuario',
        texto: textos[opcion] ?? opcion,
      })

      responderOpcion(opcion, usuario)
    })
  })

  archivo?.addEventListener('change', () => {
    const nombreArchivo =
      archivo.files?.[0]?.name

    if (!nombreArchivo) {
      return
    }

    agregarMensaje({
      autor: 'usuario',
      texto: `📎 Archivo seleccionado: ${nombreArchivo}`,
    })

    responderDespues(
      'He registrado el archivo. En esta versión todavía no se envía al servidor, pero la interfaz ya está preparada.',
    )

    archivo.value = ''
  })

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const texto = input.value.trim()

    if (!texto) {
      return
    }

    agregarMensaje({
      autor: 'usuario',
      texto,
    })

    input.value = ''

    procesarRespuesta(texto, usuario)
  })

  function iniciarConversacion(
    usuarioActual: UsuarioActivo | null,
  ): void {
    flujoActual = 'normal'

    if (usuarioActual?.rol === 'cliente') {
      responderDespues(
        `¡Hola, ${usuarioActual.nombre}! 👋 Soy el Asistente Karsan. ¿En qué puedo ayudarte hoy?`,
        150,
      )

      return
    }

    responderDespues(
      '¡Hola! 👋 Soy el Asistente Karsan. Puedo ayudarte con servicios, citas, cotizaciones o contacto con un asesor.',
      150,
    )
  }

  function procesarRespuesta(
    texto: string,
    usuarioActual: UsuarioActivo | null,
  ): void {
    if (flujoActual === 'captarNombre') {
      datosVisitante.nombre = texto
      flujoActual = 'captarCorreo'

      responderDespues(
        `Mucho gusto, ${texto}. ¿Cuál es tu correo electrónico?`,
      )

      return
    }

    if (flujoActual === 'captarCorreo') {
      if (!validarCorreo(texto)) {
        responderDespues(
          'Ese correo no parece válido. Escríbelo nuevamente.',
        )

        return
      }

      datosVisitante.correo = texto
      flujoActual = 'captarTelefono'

      responderDespues(
        'Perfecto. Ahora escribe tu número de teléfono.',
      )

      return
    }

    if (flujoActual === 'captarTelefono') {
      const telefono = texto.replace(/\D/g, '')

      if (telefono.length < 7) {
        responderDespues(
          'El teléfono debe tener al menos 7 números.',
        )

        return
      }

      datosVisitante.telefono = telefono
      flujoActual = 'captarServicio'

      responderDespues(
        '¿Qué servicio necesitas? Por ejemplo: redes sociales, publicidad, página web, CRM o inteligencia artificial.',
      )

      return
    }

    if (flujoActual === 'captarServicio') {
      datosVisitante.servicio = texto

      guardarLeadDesdeChatbot()

      flujoActual = 'normal'

      responderDespues(
        `Gracias, ${datosVisitante.nombre}. Registré tu solicitud. Un asesor recibirá una notificación y se comunicará contigo pronto. ✅`,
      )

      return
    }

    if (flujoActual === 'citaServicio') {
      datosCita.servicio = texto
      flujoActual = 'citaFecha'

      responderDespues(
        'Indica la fecha que prefieres usando el formato AAAA-MM-DD.',
      )

      return
    }

    if (flujoActual === 'citaFecha') {
      if (!validarFecha(texto)) {
        responderDespues(
          'La fecha debe escribirse así: 2026-07-30.',
        )

        return
      }

      datosCita.fecha = texto
      flujoActual = 'citaHora'

      responderDespues(
        'Ahora indica la hora en formato HH:MM. Ejemplo: 10:30.',
      )

      return
    }

    if (flujoActual === 'citaHora') {
      if (!validarHora(texto)) {
        responderDespues(
          'La hora debe escribirse así: 10:30.',
        )

        return
      }

      datosCita.hora = texto
      flujoActual = 'citaAsesor'

      const asesores = obtenerAsesores().filter(
        (asesor) => asesor.estado === 'Activo',
      )

      if (asesores.length === 0) {
        crearSolicitudCita(
          usuarioActual,
          '',
          'Por asignar',
        )

        flujoActual = 'normal'

        responderDespues(
          'Registré tu solicitud. El administrador asignará un asesor y te confirmará la cita.',
        )

        return
      }

      responderDespues(
        `Escribe el número del asesor que prefieres:\n${asesores
          .map(
            (asesor, indice) =>
              `${indice + 1}. ${asesor.nombre} ${asesor.apellido}`,
          )
          .join('\n')}`,
      )

      return
    }

    if (flujoActual === 'citaAsesor') {
      const asesores = obtenerAsesores().filter(
        (asesor) => asesor.estado === 'Activo',
      )

      const indice = Number(texto) - 1
      const asesor = asesores[indice]

      if (!asesor) {
        responderDespues(
          'Escribe únicamente el número de uno de los asesores mostrados.',
        )

        return
      }

      crearSolicitudCita(
        usuarioActual,
        asesor.id,
        `${asesor.nombre} ${asesor.apellido}`,
      )

      flujoActual = 'normal'

      responderDespues(
        `Tu cita quedó solicitada para el ${formatearFecha(
          datosCita.fecha,
        )} a las ${datosCita.hora} con ${asesor.nombre}. El estado inicial es Pendiente. 📅`,
      )

      return
    }

    responderPreguntaFrecuente(
      texto,
      usuarioActual,
    )
  }

  function responderOpcion(
    opcion: string,
    usuarioActual: UsuarioActivo | null,
  ): void {
    if (opcion === 'servicios') {
      responderDespues(
        'Nuestros servicios incluyen:\n• Gestión de redes sociales\n• Publicidad digital\n• Diseño y desarrollo web\n• Automatización y CRM\n• Inteligencia artificial',
      )

      return
    }

    if (opcion === 'cita') {
      if (
        !usuarioActual ||
        usuarioActual.rol !== 'cliente'
      ) {
        iniciarCapturaLead(
          'Para solicitar una cita necesito registrar tus datos. ¿Cuál es tu nombre?',
        )

        return
      }

      datosCita = {
        servicio: '',
        fecha: '',
        hora: '',
      }

      flujoActual = 'citaServicio'

      responderDespues(
        'Perfecto 😊 ¿Cuál es el motivo o servicio para la cita?',
      )

      return
    }

    if (opcion === 'asesor') {
      if (usuarioActual?.rol === 'cliente') {
        crearNotificacion(
          'Cliente solicita un asesor',
          `${usuarioActual.nombre} (${usuarioActual.correo}) quiere hablar con un asesor.`,
          'asesor',
        )

        responderDespues(
          'Listo. Avisé al equipo de Karsan Digital. Un asesor se comunicará contigo pronto. ✅',
        )

        return
      }

      iniciarCapturaLead(
        'Para comunicarte con un asesor necesito registrar tus datos. ¿Cuál es tu nombre?',
      )

      return
    }

    if (opcion === 'cotizacion') {
      if (usuarioActual?.rol === 'cliente') {
        crearNotificacion(
          'Solicitud de cotización',
          `${usuarioActual.nombre} (${usuarioActual.correo}) solicitó una cotización.`,
          'lead',
        )

        responderDespues(
          'Tu solicitud de cotización fue enviada. Cuéntame qué servicio necesitas y prepararé la información para el asesor.',
        )

        datosVisitante.servicio = ''
        flujoActual = 'captarServicio'

        return
      }

      iniciarCapturaLead(
        'Con gusto te ayudo con una cotización. Primero dime tu nombre.',
      )
    }
  }

  function iniciarCapturaLead(
    mensaje: string,
  ): void {
    datosVisitante = {
      nombre: '',
      correo: '',
      telefono: '',
      servicio: '',
    }

    flujoActual = 'captarNombre'

    responderDespues(mensaje)
  }

  function responderPreguntaFrecuente(
    texto: string,
    usuarioActual: UsuarioActivo | null,
  ): void {
    const mensaje = texto.toLowerCase()

    if (
      mensaje.includes('cita') ||
      mensaje.includes('agendar')
    ) {
      responderOpcion(
        'cita',
        usuarioActual,
      )

      return
    }

    if (
      mensaje.includes('asesor') ||
      mensaje.includes('persona')
    ) {
      responderOpcion(
        'asesor',
        usuarioActual,
      )

      return
    }

    if (
      mensaje.includes('servicio') ||
      mensaje.includes('ofrecen')
    ) {
      responderOpcion(
        'servicios',
        usuarioActual,
      )

      return
    }

    if (
      mensaje.includes('precio') ||
      mensaje.includes('costo') ||
      mensaje.includes('cotización') ||
      mensaje.includes('cotizacion')
    ) {
      responderOpcion(
        'cotizacion',
        usuarioActual,
      )

      return
    }

    if (
      mensaje.includes('horario') ||
      mensaje.includes('atienden')
    ) {
      responderDespues(
        'El horario exacto será confirmado por un asesor. También puedo registrar una solicitud de contacto.',
      )

      return
    }

    if (
      mensaje.includes('hola') ||
      mensaje.includes('buenas')
    ) {
      responderDespues(
        `¡Hola${
          usuarioActual?.nombre
            ? `, ${usuarioActual.nombre}`
            : ''
        }! 😊 ¿Deseas conocer nuestros servicios, agendar una cita o hablar con un asesor?`,
      )

      return
    }

    responderDespues(
      'Puedo ayudarte con servicios, precios, citas, cotizaciones o contacto con un asesor. Usa uno de los botones rápidos o escribe tu pregunta.',
    )
  }

  function agregarMensaje(
    mensaje: MensajeChat,
  ): void {
    const hora =
      mensaje.hora ?? obtenerHoraActual()

    const elemento =
      document.createElement('div')

    elemento.className =
      mensaje.autor === 'bot'
        ? 'mensaje-chatbot mensaje-bot'
        : 'mensaje-chatbot mensaje-usuario'

    elemento.innerHTML = `
      <div class="mensaje-contenido">
        ${escaparHTML(mensaje.texto).replace(
          /\n/g,
          '<br>',
        )}
      </div>
      <small>${hora}</small>
    `

    contenedorMensajes.appendChild(elemento)

    contenedorMensajes.scrollTop =
      contenedorMensajes.scrollHeight

    guardarHistorial(contenedorMensajes)
  }

  function responderDespues(
    texto: string,
    demora = 550,
  ): void {
    indicadorEscribiendo?.classList.remove(
      'chatbot-oculto',
    )

    window.setTimeout(() => {
      indicadorEscribiendo?.classList.add(
        'chatbot-oculto',
      )

      agregarMensaje({
        autor: 'bot',
        texto,
      })
    }, demora)
  }
}

function obtenerUsuarioActivo(): UsuarioActivo | null {
  const datos =
    localStorage.getItem('usuarioActivo')

  if (!datos) {
    return null
  }

  try {
    return JSON.parse(datos) as UsuarioActivo
  } catch {
    return null
  }
}

function cargarDatosUsuario(
  usuario: UsuarioActivo | null,
): void {
  if (
    !usuario ||
    usuario.rol !== 'cliente'
  ) {
    return
  }

  const clientesGuardados =
    localStorage.getItem('clientes')

  if (!clientesGuardados) {
    datosVisitante.nombre =
      usuario.nombre

    datosVisitante.correo =
      usuario.correo

    datosVisitante.telefono =
      usuario.telefono ?? ''

    return
  }

  try {
    const clientes =
      JSON.parse(clientesGuardados)

    if (!Array.isArray(clientes)) {
      return
    }

    const cliente = clientes.find(
      (item) =>
        item.id === usuario.id ||
        item.correo === usuario.correo,
    )

    datosVisitante.nombre =
      `${cliente?.nombre ?? usuario.nombre} ${
        cliente?.apellido ?? ''
      }`.trim()

    datosVisitante.correo =
      cliente?.correo ?? usuario.correo

    datosVisitante.telefono =
      cliente?.telefono ??
      usuario.telefono ??
      ''
  } catch {
    datosVisitante.nombre =
      usuario.nombre

    datosVisitante.correo =
      usuario.correo

    datosVisitante.telefono =
      usuario.telefono ?? ''
  }
}

function crearSolicitudCita(
  usuario: UsuarioActivo | null,
  asesorId: string,
  asesorNombre: string,
): void {
  if (
    !usuario ||
    usuario.rol !== 'cliente'
  ) {
    return
  }

  const citas =
    obtenerArreglo<CitaChatbot>('citas')

  const nuevaCita: CitaChatbot = {
    id: crypto.randomUUID(),
    clienteId:
      usuario.id ?? usuario.correo,
    clienteNombre:
      usuario.nombre,
    asesorId,
    asesorNombre,
    fecha: datosCita.fecha,
    hora: datosCita.hora,
    motivo: datosCita.servicio,
    estado: 'Pendiente',
  }

  localStorage.setItem(
    'citas',
    JSON.stringify([
      ...citas,
      nuevaCita,
    ]),
  )

  crearNotificacion(
    'Nueva cita solicitada',
    `${usuario.nombre} solicitó una cita para ${datosCita.servicio} el ${formatearFecha(
      datosCita.fecha,
    )} a las ${datosCita.hora}.`,
    'cita',
  )
}

function guardarLeadDesdeChatbot(): void {
  const leads =
    obtenerArreglo<LeadChatbot>('leads')

  const partesNombre =
    datosVisitante.nombre
      .trim()
      .split(' ')

  const nombre =
    partesNombre[0] ?? ''

  const apellido =
    partesNombre.slice(1).join(' ') || ''

  const nuevoLead: LeadChatbot = {
    id: crypto.randomUUID(),
    nombre,
    apellido,
    correo: datosVisitante.correo,
    telefono: datosVisitante.telefono,
    empresa: '',
    fuente: 'Chatbot',
    servicio: datosVisitante.servicio,
    estado: 'Nuevo',
    fechaCreacion:
      new Date().toISOString(),
  }

  localStorage.setItem(
    'leads',
    JSON.stringify([
      ...leads,
      nuevoLead,
    ]),
  )

  crearNotificacion(
    'Nuevo lead desde el chatbot',
    `${datosVisitante.nombre} solicitó información sobre ${datosVisitante.servicio}.`,
    'lead',
  )
}

function obtenerArreglo<T>(
  clave: string,
): T[] {
  const datos =
    localStorage.getItem(clave)

  if (!datos) {
    return []
  }

  try {
    const resultado =
      JSON.parse(datos)

    return Array.isArray(resultado)
      ? (resultado as T[])
      : []
  } catch {
    return []
  }
}

function guardarHistorial(
  contenedor: HTMLElement,
): void {
  localStorage.setItem(
    'chatbotHistorial',
    contenedor.innerHTML,
  )
}

function cargarHistorial(
  contenedor: HTMLElement,
): void {
  const historial =
    localStorage.getItem(
      'chatbotHistorial',
    )

  if (historial) {
    contenedor.innerHTML =
      historial

    contenedor.scrollTop =
      contenedor.scrollHeight
  }
}

function validarCorreo(
  correo: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    correo,
  )
}

function validarFecha(
  fecha: string,
): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false
  }

  const fechaIngresada =
    new Date(`${fecha}T00:00:00`)

  return !Number.isNaN(
    fechaIngresada.getTime(),
  )
}

function validarHora(
  hora: string,
): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(
    hora,
  )
}

function formatearFecha(
  fecha: string,
): string {
  const partes =
    fecha.split('-')

  if (partes.length !== 3) {
    return fecha
  }

  const [anio, mes, dia] =
    partes

  return `${dia}/${mes}/${anio}`
}

function obtenerHoraActual(): string {
  return new Date().toLocaleTimeString(
    'es-EC',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  )
}

function escaparHTML(
  texto: string,
): string {
  const elemento =
    document.createElement('div')

  elemento.textContent = texto

  return elemento.innerHTML
}