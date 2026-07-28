import { crearNotificacion } from './Notificaciones'

export type Lead = {
  id: string
  nombre: string
  correo: string
  telefono: string
  fuente: string
  estado: 'Nuevo' | 'Contactado' | 'Interesado' | 'Convertido'
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

    return Array.isArray(leads) ? leads : []
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
        placeholder="Buscar lead por nombre, correo o teléfono"
      />

      <button id="nuevo-lead" class="btn-primary" type="button">
        Nuevo lead
      </button>
    </div>

    <div id="lista-leads">
      ${crearTablaLeads(leads)}
    </div>
  `
}

export function activarModuloLeads(): void {
  const botonNuevo =
    document.querySelector<HTMLButtonElement>('#nuevo-lead')

  const buscador =
    document.querySelector<HTMLInputElement>('#buscar-lead')

  botonNuevo?.addEventListener('click', () => {
    crearLead()
  })

  buscador?.addEventListener('input', () => {
    const texto = buscador.value.trim().toLowerCase()

    const leadsFiltrados = obtenerLeads().filter((lead) => {
      return (
        lead.nombre.toLowerCase().includes(texto) ||
        lead.correo.toLowerCase().includes(texto) ||
        lead.telefono.includes(texto)
      )
    })

    actualizarListaLeads(leadsFiltrados)
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
      <table class="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Fuente</th>
            <th>Estado</th>
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
                  <td>${escaparHTML(lead.nombre)}</td>

                  <td>
                    ${escaparHTML(lead.correo)}<br>
                    ${escaparHTML(lead.telefono)}
                  </td>

                  <td>${escaparHTML(lead.fuente)}</td>

                  <td>
                    <span class="estado-lead">
                      ${escaparHTML(lead.estado)}
                    </span>
                  </td>

                  <td>
                    ${escaparHTML(lead.asesor || 'Sin asignar')}
                  </td>

                  <td>${escaparHTML(lead.fecha)}</td>

                  <td>
                    <button
                      class="btn-editar-lead"
                      data-id="${lead.id}"
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      class="btn-eliminar-lead"
                      data-id="${lead.id}"
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
  const nombre = window.prompt('Nombre del lead:')

  if (!nombre?.trim()) {
    return
  }

  const correo = window.prompt('Correo del lead:')

  if (!correo?.trim()) {
    return
  }

  const telefono = window.prompt('Teléfono del lead:')

  if (!telefono?.trim()) {
    return
  }

  const fuente = window.prompt(
    'Fuente: Facebook, Instagram, WhatsApp, Web u otra:',
    'Instagram',
  )

  if (!fuente?.trim()) {
    return
  }

  const nuevoLead: Lead = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono.trim(),
    fuente: fuente.trim(),
    estado: 'Nuevo',
    asesor: '',
    fecha: new Date().toLocaleDateString('es-EC'),
  }

  const leads = obtenerLeads()

  leads.push(nuevoLead)

  guardarLeads(leads)

  crearNotificacion(
    'Nuevo lead registrado',
    `${nuevoLead.nombre} llegó desde ${nuevoLead.fuente}.`,
    'lead',
  )

  actualizarListaLeads(leads)

  window.alert('Lead registrado correctamente.')
}

function editarLead(idLead: string): void {
  const leads = obtenerLeads()

  const lead = leads.find((item) => item.id === idLead)

  if (!lead) {
    window.alert('No se encontró el lead.')
    return
  }

  const estado = window.prompt(
    'Estado: Nuevo, Contactado, Interesado o Convertido',
    lead.estado,
  )

  if (!estado?.trim()) {
    return
  }

  const estadosPermitidos: Lead['estado'][] = [
    'Nuevo',
    'Contactado',
    'Interesado',
    'Convertido',
  ]

  if (
    !estadosPermitidos.includes(
      estado.trim() as Lead['estado'],
    )
  ) {
    window.alert('El estado ingresado no es válido.')
    return
  }

  const asesor = window.prompt(
    'Nombre del asesor asignado:',
    lead.asesor,
  )

  const estadoAnterior = lead.estado

  lead.estado = estado.trim() as Lead['estado']
  lead.asesor = asesor?.trim() ?? ''

  guardarLeads(leads)

  if (estadoAnterior !== lead.estado) {
    crearNotificacion(
      'Estado de lead actualizado',
      `${lead.nombre} cambió de ${estadoAnterior} a ${lead.estado}.`,
      'lead',
    )
  }

  actualizarListaLeads(leads)

  window.alert('Lead actualizado correctamente.')
}

function eliminarLead(idLead: string): void {
  const confirmar = window.confirm(
    '¿Deseas eliminar este lead?',
  )

  if (!confirmar) {
    return
  }

  const leads = obtenerLeads().filter(
    (lead) => lead.id !== idLead,
  )

  guardarLeads(leads)
  actualizarListaLeads(leads)

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

function activarBotonesLeads(): void {
  const botonesEditar =
    document.querySelectorAll<HTMLButtonElement>(
      '.btn-editar-lead',
    )

  const botonesEliminar =
    document.querySelectorAll<HTMLButtonElement>(
      '.btn-eliminar-lead',
    )

  botonesEditar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const idLead = boton.dataset.id

      if (idLead) {
        editarLead(idLead)
      }
    })
  })

  botonesEliminar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const idLead = boton.dataset.id

      if (idLead) {
        eliminarLead(idLead)
      }
    })
  })
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')

  elemento.textContent = texto

  return elemento.innerHTML
}