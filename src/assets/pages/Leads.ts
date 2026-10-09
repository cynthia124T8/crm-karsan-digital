import { crearNotificacion } from './Notificaciones'
import { obtenerAsesores } from './Asesores'
import { guardarClientes, obtenerClientes, type Cliente } from './Clients'

export type EstadoLead =
  | 'Prospecto captado'
  | 'Contactado'
  | 'En seguimiento'
  | 'Cotización enviada'
  | 'Matriculado / Venta cerrada'
  | 'Perdido'

export type MarcaLead =
  | 'Dr. Bach'
  | 'KARSAN Escuela Digital'

export type Lead = {
  id: string
  nombre: string
  correo: string
  telefono: string
  ciudad: string
  marca: MarcaLead
  interes: string
  fuente: string
  estado: EstadoLead
  asesor: string
  fecha: string
}

export function obtenerLeads(): Lead[] {
  const datos = localStorage.getItem('leads')

  if (!datos) {
    return []
  }

  try {
    const leads = JSON.parse(datos)

    if (!Array.isArray(leads)) {
      return []
    }

    return leads.map(normalizarLead)
  } catch {
    return []
  }
}

export function guardarLeads(leads: Lead[]): void {
  localStorage.setItem('leads', JSON.stringify(leads))
}

export function crearModuloLeads(): string {
  const leads = obtenerLeads()

  return `
    <div class="barra-clientes">
      <input
        id="buscar-lead"
        class="input-busqueda"
        type="search"
        placeholder="Buscar por nombre, correo, teléfono, marca o ciudad"
      />

      <button id="nuevo-lead" class="btn-primary" type="button">
        + Nuevo lead
      </button>
    </div>

    <div class="resumen-leads">
      <article>
        <span>🎯</span>
        <div>
          <small>Total de leads</small>
          <strong>${leads.length}</strong>
        </div>
      </article>

      <article>
        <span>🩺</span>
        <div>
          <small>Dr. Bach</small>
          <strong>
            ${leads.filter((lead) => lead.marca === 'Dr. Bach').length}
          </strong>
        </div>
      </article>

      <article>
        <span>🎓</span>
        <div>
          <small>Escuela Digital</small>
          <strong>
            ${
              leads.filter(
                (lead) => lead.marca === 'KARSAN Escuela Digital',
              ).length
            }
          </strong>
        </div>
      </article>

      <article>
        <span>✅</span>
        <div>
          <small>Ventas cerradas</small>
          <strong>
            ${
              leads.filter(
                (lead) => lead.estado === 'Matriculado / Venta cerrada',
              ).length
            }
          </strong>
        </div>
      </article>
    </div>

    <div id="lista-leads">
      ${crearTablaLeads(leads)}
    </div>
  `
}

export function activarModuloLeads(): void {
  document
    .querySelector<HTMLButtonElement>('#nuevo-lead')
    ?.addEventListener('click', crearLead)

  document
    .querySelector<HTMLInputElement>('#buscar-lead')
    ?.addEventListener('input', (evento) => {
      const buscador = evento.currentTarget as HTMLInputElement
      const texto = buscador.value.trim().toLowerCase()

      const filtrados = obtenerLeads().filter((lead) =>
        [
          lead.nombre,
          lead.correo,
          lead.telefono,
          lead.ciudad,
          lead.marca,
          lead.interes,
          lead.fuente,
          lead.estado,
          lead.asesor,
        ]
          .join(' ')
          .toLowerCase()
          .includes(texto),
      )

      actualizarListaLeads(filtrados)
    })

  activarBotonesLeads()
}

function crearTablaLeads(leads: Lead[]): string {
  if (leads.length === 0) {
    return `
      <div class="empty-state">
        <h3>No hay leads registrados</h3>
        <p>Los clientes potenciales aparecerán aquí.</p>
      </div>
    `
  }

  return `
    <div class="tabla-contenedor">
      <table class="tabla-clientes tabla-leads">
        <thead>
          <tr>
            <th>Prospecto</th>
            <th>Marca</th>
            <th>Interés</th>
            <th>Origen</th>
            <th>Pipeline</th>
            <th>Asesor</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${leads
            .map(
              (lead) => `
                <tr>
                  <td>
                    <strong>${escaparHTML(lead.nombre)}</strong>
                    <small>${escaparHTML(lead.correo)}</small>
                    <small>${escaparHTML(lead.telefono)}</small>
                    <small>${escaparHTML(lead.ciudad)}</small>
                  </td>

                  <td>
                    <span class="marca-lead ${obtenerClaseMarca(lead.marca)}">
                      ${escaparHTML(lead.marca)}
                    </span>
                  </td>

                  <td>
                    ${escaparHTML(lead.interes)}
                  </td>

                  <td>
                    ${escaparHTML(lead.fuente)}
                  </td>

                  <td>
                    <span class="estado-lead ${obtenerClaseEstado(lead.estado)}">
                      ${escaparHTML(lead.estado)}
                    </span>
                  </td>

                  <td>
                    ${escaparHTML(lead.asesor || 'Sin asignar')}
                  </td>

                  <td>
                    ${escaparHTML(lead.fecha)}
                  </td>

                  <td>
                    <button
                      class="btn-editar-lead"
                      data-id="${escaparHTML(lead.id)}"
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      class="btn-eliminar-lead"
                      data-id="${escaparHTML(lead.id)}"
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

function crearLead(): void {
  const nombre = window.prompt('Nombre completo del prospecto:')

  if (!nombre?.trim()) {
    return
  }

  const telefono = window.prompt('WhatsApp o teléfono del prospecto:')

  if (!telefono?.trim()) {
    return
  }

  const correo = window.prompt('Correo electrónico del prospecto:')

  if (!correo?.trim()) {
    return
  }

  if (!validarCorreo(correo.trim())) {
    window.alert('Ingrese un correo electrónico válido.')
    return
  }

  const ciudad = window.prompt(
    'Ciudad del prospecto:',
    'Quito',
  )

  if (!ciudad?.trim()) {
    return
  }

  const marca = seleccionarMarca()

  if (!marca) {
    return
  }

  const interes = window.prompt(
    marca === 'Dr. Bach'
      ? 'Servicio de interés (ejemplo: Diagnóstico Bach):'
      : 'Curso o taller de interés:',
  )

  if (!interes?.trim()) {
    return
  }

  const fuente = seleccionarFuente()

  if (!fuente) {
    return
  }

  const nuevoLead: Lead = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono.trim(),
    ciudad: ciudad.trim(),
    marca,
    interes: interes.trim(),
    fuente,
    estado: 'Prospecto captado',
    asesor: '',
    fecha: new Date().toLocaleDateString('es-EC'),
  }

  const leads = obtenerLeads()

  leads.push(nuevoLead)

  guardarLeads(leads)

  crearNotificacion(
    'Nuevo lead registrado',
    `${nuevoLead.nombre} llegó desde ${nuevoLead.fuente} para ${nuevoLead.marca}.`,
    'lead',
  )

  actualizarModuloCompleto()

  window.alert('Lead registrado correctamente.')
}

function editarLead(idLead: string): void {
  const leads = obtenerLeads()

  const lead = leads.find((item) => item.id === idLead)

  if (!lead) {
    window.alert('No se encontró el lead.')
    return
  }

  const estado = seleccionarEstado(lead.estado)

  if (!estado) {
    return
  }

  const asesor = seleccionarAsesor(lead.asesor)

  if (asesor === null) {
    return
  }

  const interes = window.prompt(
    'Servicio o curso de interés:',
    lead.interes,
  )

  if (!interes?.trim()) {
    return
  }

  const estadoAnterior = lead.estado
  const asesorAnterior = lead.asesor

  lead.estado = estado
  lead.asesor = asesor
  lead.interes = interes.trim()

  guardarLeads(leads)

  if (
    estadoAnterior !== 'Matriculado / Venta cerrada' &&
    lead.estado === 'Matriculado / Venta cerrada'
  ) {
    convertirLeadEnCliente(lead)
  }

  if (estadoAnterior !== lead.estado) {
    crearNotificacion(
      'Estado de lead actualizado',
      `${lead.nombre} cambió de ${estadoAnterior} a ${lead.estado}.`,
      'lead',
    )
  }

  if (asesorAnterior !== lead.asesor && lead.asesor) {
    crearNotificacion(
      'Lead asignado a un asesor',
      `${lead.nombre} fue asignado a ${lead.asesor}.`,
      'asesor',
    )
  }

  actualizarModuloCompleto()

  window.alert('Lead actualizado correctamente.')
}

function convertirLeadEnCliente(lead: Lead): void {
  const clientes = obtenerClientes()

  const clienteExistente = clientes.some(
    (cliente) =>
      cliente.correo.toLowerCase() === lead.correo.toLowerCase() ||
      cliente.telefono === lead.telefono,
  )

  if (clienteExistente) {
    crearNotificacion(
      'Cliente ya registrado',
      `${lead.nombre} ya existe en el módulo de Clientes.`,
      'cliente',
    )

    return
  }

  const nuevoCliente: Cliente = {
    id: crypto.randomUUID(),
    nombre: lead.nombre,
    correo: lead.correo,
    telefono: lead.telefono,
    ciudad: lead.ciudad,
    servicio: lead.interes,
    estado: 'Activo',
    fechaRegistro: new Date().toLocaleDateString('es-EC'),
  }

  clientes.push(nuevoCliente)

  guardarClientes(clientes)

  crearNotificacion(
    'Lead convertido en cliente',
    `${lead.nombre} fue agregado automáticamente al módulo de Clientes.`,
    'cliente',
  )
}

function eliminarLead(idLead: string): void {
  if (!window.confirm('¿Deseas eliminar este lead?')) {
    return
  }

  const leadsActualizados = obtenerLeads().filter(
    (lead) => lead.id !== idLead,
  )

  guardarLeads(leadsActualizados)

  actualizarModuloCompleto()

  window.alert('Lead eliminado correctamente.')
}

function actualizarListaLeads(leads: Lead[]): void {
  const lista =
    document.querySelector<HTMLDivElement>('#lista-leads')

  if (!lista) {
    return
  }

  lista.innerHTML = crearTablaLeads(leads)

  activarBotonesLeads()
}

function actualizarModuloCompleto(): void {
  const contenido =
    document.querySelector<HTMLDivElement>('#contenido-dashboard')

  if (!contenido) {
    return
  }

  contenido.innerHTML = crearModuloLeads()

  activarModuloLeads()
}

function activarBotonesLeads(): void {
  document
    .querySelectorAll<HTMLButtonElement>('.btn-editar-lead')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        if (boton.dataset.id) {
          editarLead(boton.dataset.id)
        }
      })
    })

  document
    .querySelectorAll<HTMLButtonElement>('.btn-eliminar-lead')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        if (boton.dataset.id) {
          eliminarLead(boton.dataset.id)
        }
      })
    })
}

function seleccionarAsesor(
  asesorActual: string,
): string | null {
  const asesoresActivos = obtenerAsesores().filter(
    (asesor) => asesor.estado === 'Activo',
  )

  if (asesoresActivos.length === 0) {
    window.alert(
      'No hay asesores activos registrados. Primero registra un asesor en el módulo Asesores.',
    )

    return ''
  }

  const opciones = asesoresActivos.map(
    (asesor, indice) =>
      `${indice + 1}. ${asesor.nombre} ${asesor.apellido} — ${asesor.especialidad}`,
  )

  const indiceActual = asesoresActivos.findIndex(
    (asesor) =>
      `${asesor.nombre} ${asesor.apellido}` === asesorActual,
  )

  const respuesta = window.prompt(
    [
      'Seleccione el asesor que atenderá este lead:',
      '0. Sin asignar',
      ...opciones,
      '',
      'Escribe el número correspondiente:',
    ].join('\n'),
    String(indiceActual >= 0 ? indiceActual + 1 : 0),
  )

  if (respuesta === null) {
    return null
  }

  const numero = Number(respuesta.trim())

  if (!Number.isInteger(numero)) {
    window.alert('Debes escribir un número válido.')
    return null
  }

  if (numero === 0) {
    return ''
  }

  const asesorSeleccionado = asesoresActivos[numero - 1]

  if (!asesorSeleccionado) {
    window.alert('El asesor seleccionado no es válido.')
    return null
  }

  return `${asesorSeleccionado.nombre} ${asesorSeleccionado.apellido}`
}

function seleccionarMarca(): MarcaLead | null {
  const respuesta = window.prompt(
    [
      'Marca de interés:',
      '1. Dr. Bach',
      '2. KARSAN Escuela Digital',
      '',
      'Escribe 1 o 2:',
    ].join('\n'),
    '1',
  )

  if (!respuesta?.trim()) {
    return null
  }

  if (respuesta.trim() === '1') {
    return 'Dr. Bach'
  }

  if (respuesta.trim() === '2') {
    return 'KARSAN Escuela Digital'
  }

  window.alert('La marca seleccionada no es válida.')

  return null
}

function seleccionarFuente(): string | null {
  const fuentes = [
    'Facebook',
    'Instagram',
    'TikTok',
    'LinkedIn',
    'WhatsApp',
    'Sitio web',
    'Google Ads',
    'YouTube Ads',
    'Otro',
  ]

  const respuesta = window.prompt(
    [
      'Canal de origen:',
      ...fuentes.map(
        (fuente, indice) => `${indice + 1}. ${fuente}`,
      ),
      '',
      'Escribe el número correspondiente:',
    ].join('\n'),
    '2',
  )

  if (!respuesta?.trim()) {
    return null
  }

  const indice = Number(respuesta.trim()) - 1

  if (indice < 0 || indice >= fuentes.length) {
    window.alert('El canal seleccionado no es válido.')
    return null
  }

  return fuentes[indice]
}

function seleccionarEstado(
  estadoActual: EstadoLead,
): EstadoLead | null {
  const estados: EstadoLead[] = [
    'Prospecto captado',
    'Contactado',
    'En seguimiento',
    'Cotización enviada',
    'Matriculado / Venta cerrada',
    'Perdido',
  ]

  const indiceActual = estados.indexOf(estadoActual)

  const respuesta = window.prompt(
    [
      'Seleccione el estado del pipeline:',
      ...estados.map(
        (estado, indice) => `${indice + 1}. ${estado}`,
      ),
      '',
      'Escribe el número correspondiente:',
    ].join('\n'),
    String(indiceActual >= 0 ? indiceActual + 1 : 1),
  )

  if (!respuesta?.trim()) {
    return null
  }

  const indice = Number(respuesta.trim()) - 1

  if (indice < 0 || indice >= estados.length) {
    window.alert('El estado seleccionado no es válido.')
    return null
  }

  return estados[indice]
}

function normalizarLead(
  dato: Partial<Lead> & {
    estado?: string
    apellido?: string
    empresa?: string
    servicio?: string
    fechaCreacion?: string
  },
): Lead {
  const nombreCompleto =
    dato.nombre?.trim() ||
    'Sin nombre'

  const interes =
    dato.interes ||
    dato.servicio ||
    'No especificado'

  const fecha =
    dato.fecha ||
    dato.fechaCreacion ||
    new Date().toLocaleDateString('es-EC')

  return {
    id: dato.id ?? crypto.randomUUID(),

    nombre: nombreCompleto,

    correo: dato.correo ?? '',

    telefono: dato.telefono ?? '',

    ciudad: dato.ciudad ?? 'No registrada',

    marca: normalizarMarca(dato.marca),

    interes,

    fuente: dato.fuente ?? 'Otro',

    estado: normalizarEstado(dato.estado),

    asesor: dato.asesor ?? '',

    fecha,
  }
}

function normalizarMarca(
  marca: string | undefined,
): MarcaLead {
  if (marca === 'KARSAN Escuela Digital') {
    return 'KARSAN Escuela Digital'
  }

  return 'Dr. Bach'
}

function normalizarEstado(
  estado: string | undefined,
): EstadoLead {
  const equivalencias: Record<string, EstadoLead> = {
    Nuevo: 'Prospecto captado',
    Contactado: 'Contactado',
    Interesado: 'En seguimiento',
    Convertido: 'Matriculado / Venta cerrada',

    'Prospecto captado': 'Prospecto captado',
    'En seguimiento': 'En seguimiento',
    'Cotización enviada': 'Cotización enviada',
    'Matriculado / Venta cerrada':
      'Matriculado / Venta cerrada',
    Perdido: 'Perdido',
  }

  return (
    equivalencias[estado ?? ''] ??
    'Prospecto captado'
  )
}

function obtenerClaseMarca(
  marca: MarcaLead,
): string {
  return marca === 'Dr. Bach'
    ? 'marca-dr-bach'
    : 'marca-escuela'
}

function obtenerClaseEstado(
  estado: EstadoLead,
): string {
  return estado
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function validarCorreo(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')

  elemento.textContent = texto

  return elemento.innerHTML
}