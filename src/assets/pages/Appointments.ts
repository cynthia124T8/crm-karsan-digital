import { crearNotificacion } from './Notificaciones'
import { obtenerClientes } from './Clients'
import { obtenerAsesores } from './Asesores'

export type EstadoCita =
  | 'Pendiente'
  | 'Confirmada'
  | 'Finalizada'
  | 'Cancelada'

export type Cita = {
  id: string
  cliente: string
  asesor: string
  fecha: string
  hora: string
  motivo: string
  estado: EstadoCita
}

export function obtenerCitas(): Cita[] {
  const datos = localStorage.getItem('citas')

  if (!datos) return []

  try {
    const citas = JSON.parse(datos)
    return Array.isArray(citas) ? citas.map(normalizarCita) : []
  } catch {
    return []
  }
}

export function guardarCitas(citas: Cita[]): void {
  localStorage.setItem('citas', JSON.stringify(citas))
}

export function crearModuloCitas(): string {
  const citas = obtenerCitas()

  return `
    <div class="barra-clientes">
      <input
        id="buscar-cita"
        class="input-busqueda"
        type="search"
        placeholder="Buscar por cliente, asesor, motivo o estado"
      />

      <button id="nueva-cita" class="btn-primary" type="button">
        + Nueva cita
      </button>
    </div>

    <div class="resumen-leads">
      <article>
        <span>📅</span>
        <div>
          <small>Total de citas</small>
          <strong>${citas.length}</strong>
        </div>
      </article>

      <article>
        <span>⏳</span>
        <div>
          <small>Pendientes</small>
          <strong>${citas.filter((cita) => cita.estado === 'Pendiente').length}</strong>
        </div>
      </article>

      <article>
        <span>✅</span>
        <div>
          <small>Confirmadas</small>
          <strong>${citas.filter((cita) => cita.estado === 'Confirmada').length}</strong>
        </div>
      </article>

      <article>
        <span>🏁</span>
        <div>
          <small>Finalizadas</small>
          <strong>${citas.filter((cita) => cita.estado === 'Finalizada').length}</strong>
        </div>
      </article>
    </div>

    <div id="lista-citas">
      ${crearTablaCitas(citas)}
    </div>
  `
}

export function activarModuloCitas(): void {
  document
    .querySelector<HTMLButtonElement>('#nueva-cita')
    ?.addEventListener('click', crearCita)

  document
    .querySelector<HTMLInputElement>('#buscar-cita')
    ?.addEventListener('input', (evento) => {
      const buscador = evento.currentTarget as HTMLInputElement
      const texto = buscador.value.trim().toLowerCase()

      const citasFiltradas = obtenerCitas().filter((cita) =>
        [
          cita.cliente,
          cita.asesor,
          cita.fecha,
          cita.hora,
          cita.motivo,
          cita.estado,
        ]
          .join(' ')
          .toLowerCase()
          .includes(texto),
      )

      actualizarListaCitas(citasFiltradas)
    })

  activarBotonesCitas()
}

function crearTablaCitas(citas: Cita[]): string {
  if (citas.length === 0) {
    return `
      <div class="empty-state">
        <h3>No hay citas registradas</h3>
        <p>Las citas aparecerán aquí.</p>
      </div>
    `
  }

  return `
    <div class="tabla-contenedor">
      <table class="tabla-clientes tabla-citas">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Asesor</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${citas
            .map(
              (cita) => `
                <tr>
                  <td><strong>${escaparHTML(cita.cliente)}</strong></td>
                  <td>${escaparHTML(cita.asesor || 'Sin asignar')}</td>
                  <td>${escaparHTML(cita.fecha)}</td>
                  <td>${escaparHTML(cita.hora)}</td>
                  <td>${escaparHTML(cita.motivo)}</td>
                  <td>
                    <span class="estado-lead ${obtenerClaseEstado(cita.estado)}">
                      ${escaparHTML(cita.estado)}
                    </span>
                  </td>
                  <td>
                    <button
                      class="btn-editar-cita"
                      data-id="${cita.id}"
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      class="btn-eliminar-cita"
                      data-id="${cita.id}"
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

function crearCita(): void {
  const cliente = seleccionarCliente('')
  if (cliente === null) return

  const asesor = seleccionarAsesor('')
  if (asesor === null) return

  const fecha = window.prompt(
    'Fecha de la cita (AAAA-MM-DD):',
    obtenerFechaActual(),
  )
  if (!fecha?.trim()) return

  if (!validarFecha(fecha.trim())) {
    window.alert('La fecha debe tener el formato AAAA-MM-DD.')
    return
  }

  const hora = window.prompt('Hora de la cita (HH:MM):', '10:00')
  if (!hora?.trim()) return

  if (!validarHora(hora.trim())) {
    window.alert('La hora debe tener el formato HH:MM.')
    return
  }

  const motivo = window.prompt('Motivo de la cita:')
  if (!motivo?.trim()) return

  const nuevaCita: Cita = {
    id: crypto.randomUUID(),
    cliente,
    asesor,
    fecha: fecha.trim(),
    hora: hora.trim(),
    motivo: motivo.trim(),
    estado: 'Pendiente',
  }

  const citas = obtenerCitas()
  citas.push(nuevaCita)
  guardarCitas(citas)

  crearNotificacion(
    'Nueva cita registrada',
    `${nuevaCita.cliente} tiene una cita el ${nuevaCita.fecha} a las ${nuevaCita.hora}.`,
    'cita',
  )

  actualizarModuloCompleto()
  window.alert('Cita registrada correctamente.')
}

function editarCita(idCita: string): void {
  const citas = obtenerCitas()
  const cita = citas.find((item) => item.id === idCita)

  if (!cita) {
    window.alert('No se encontró la cita.')
    return
  }

  const cliente = seleccionarCliente(cita.cliente)
  if (cliente === null) return

  const asesor = seleccionarAsesor(cita.asesor)
  if (asesor === null) return

  const fecha = window.prompt('Fecha de la cita (AAAA-MM-DD):', cita.fecha)
  if (!fecha?.trim()) return

  if (!validarFecha(fecha.trim())) {
    window.alert('La fecha debe tener el formato AAAA-MM-DD.')
    return
  }

  const hora = window.prompt('Hora de la cita (HH:MM):', cita.hora)
  if (!hora?.trim()) return

  if (!validarHora(hora.trim())) {
    window.alert('La hora debe tener el formato HH:MM.')
    return
  }

  const motivo = window.prompt('Motivo de la cita:', cita.motivo)
  if (!motivo?.trim()) return

  const estado = seleccionarEstado(cita.estado)
  if (!estado) return

  cita.cliente = cliente
  cita.asesor = asesor
  cita.fecha = fecha.trim()
  cita.hora = hora.trim()
  cita.motivo = motivo.trim()
  cita.estado = estado

  guardarCitas(citas)

  crearNotificacion(
    'Cita actualizada',
    `${cita.cliente}: ${cita.estado} para el ${cita.fecha} a las ${cita.hora}.`,
    'cita',
  )

  actualizarModuloCompleto()
  window.alert('Cita actualizada correctamente.')
}

function eliminarCita(idCita: string): void {
  if (!window.confirm('¿Deseas eliminar esta cita?')) return

  guardarCitas(obtenerCitas().filter((cita) => cita.id !== idCita))
  actualizarModuloCompleto()
  window.alert('Cita eliminada correctamente.')
}

function seleccionarCliente(clienteActual: string): string | null {
  const clientes = obtenerClientes().filter(
    (cliente) => cliente.estado === 'Activo',
  )

  if (clientes.length === 0) {
    window.alert(
      'No hay clientes activos registrados. Primero registra un cliente.',
    )
    return null
  }

  const indiceActual = clientes.findIndex(
    (cliente) => cliente.nombre === clienteActual,
  )

  const respuesta = window.prompt(
    [
      'Seleccione el cliente:',
      ...clientes.map(
        (cliente, indice) =>
          `${indice + 1}. ${cliente.nombre} — ${cliente.servicio}`,
      ),
      '',
      'Escribe el número correspondiente:',
    ].join('\n'),
    String(indiceActual >= 0 ? indiceActual + 1 : 1),
  )

  if (!respuesta?.trim()) return null

  const indice = Number(respuesta.trim()) - 1

  if (!Number.isInteger(indice) || indice < 0 || indice >= clientes.length) {
    window.alert('El cliente seleccionado no es válido.')
    return null
  }

  return clientes[indice].nombre
}

function seleccionarAsesor(asesorActual: string): string | null {
  const asesores = obtenerAsesores().filter(
    (asesor) => asesor.estado === 'Activo',
  )

  if (asesores.length === 0) {
    window.alert(
      'No hay asesores activos registrados. Primero registra un asesor.',
    )
    return null
  }

  const indiceActual = asesores.findIndex(
    (asesor) =>
      `${asesor.nombre} ${asesor.apellido}` === asesorActual,
  )

  const respuesta = window.prompt(
    [
      'Seleccione el asesor:',
      ...asesores.map(
        (asesor, indice) =>
          `${indice + 1}. ${asesor.nombre} ${asesor.apellido} — ${asesor.especialidad}`,
      ),
      '',
      'Escribe el número correspondiente:',
    ].join('\n'),
    String(indiceActual >= 0 ? indiceActual + 1 : 1),
  )

  if (!respuesta?.trim()) return null

  const indice = Number(respuesta.trim()) - 1

  if (!Number.isInteger(indice) || indice < 0 || indice >= asesores.length) {
    window.alert('El asesor seleccionado no es válido.')
    return null
  }

  return `${asesores[indice].nombre} ${asesores[indice].apellido}`
}

function seleccionarEstado(estadoActual: EstadoCita): EstadoCita | null {
  const estados: EstadoCita[] = [
    'Pendiente',
    'Confirmada',
    'Finalizada',
    'Cancelada',
  ]

  const indiceActual = estados.indexOf(estadoActual)

  const respuesta = window.prompt(
    [
      'Seleccione el estado de la cita:',
      ...estados.map((estado, indice) => `${indice + 1}. ${estado}`),
      '',
      'Escribe el número correspondiente:',
    ].join('\n'),
    String(indiceActual >= 0 ? indiceActual + 1 : 1),
  )

  if (!respuesta?.trim()) return null

  const indice = Number(respuesta.trim()) - 1

  if (!Number.isInteger(indice) || indice < 0 || indice >= estados.length) {
    window.alert('El estado seleccionado no es válido.')
    return null
  }

  return estados[indice]
}

function actualizarListaCitas(citas: Cita[]): void {
  const lista = document.querySelector<HTMLDivElement>('#lista-citas')
  if (!lista) return

  lista.innerHTML = crearTablaCitas(citas)
  activarBotonesCitas()
}

function actualizarModuloCompleto(): void {
  const contenido = document.querySelector<HTMLDivElement>(
    '#contenido-dashboard',
  )

  if (!contenido) return

  contenido.innerHTML = crearModuloCitas()
  activarModuloCitas()
}

function activarBotonesCitas(): void {
  document
    .querySelectorAll<HTMLButtonElement>('.btn-editar-cita')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        if (boton.dataset.id) editarCita(boton.dataset.id)
      })
    })

  document
    .querySelectorAll<HTMLButtonElement>('.btn-eliminar-cita')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        if (boton.dataset.id) eliminarCita(boton.dataset.id)
      })
    })
}

function normalizarCita(dato: Partial<Cita>): Cita {
  return {
    id: dato.id ?? crypto.randomUUID(),
    cliente: dato.cliente ?? 'Sin cliente',
    asesor: dato.asesor ?? '',
    fecha: dato.fecha ?? obtenerFechaActual(),
    hora: dato.hora ?? '10:00',
    motivo: dato.motivo ?? 'No especificado',
    estado: normalizarEstado(dato.estado),
  }
}

function normalizarEstado(estado: string | undefined): EstadoCita {
  const estados: EstadoCita[] = [
    'Pendiente',
    'Confirmada',
    'Finalizada',
    'Cancelada',
  ]

  return estados.includes(estado as EstadoCita)
    ? (estado as EstadoCita)
    : 'Pendiente'
}

function obtenerFechaActual(): string {
  return new Date().toISOString().split('T')[0]
}

function validarFecha(fecha: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha)
}

function validarHora(hora: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(hora)
}

function obtenerClaseEstado(estado: EstadoCita): string {
  return estado.toLowerCase()
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')
  elemento.textContent = texto
  return elemento.innerHTML
}