export type PerfilCliente = {
  id: string
  nombre: string
  apellido?: string
  correo?: string
  telefono?: string
  ciudad?: string
  marca?: string
  servicio?: string
  estado?: string
  asesor?: string
  foto?: string
}

type CitaPerfil = {
  id?: string
  cliente?: string
  clienteId?: string
  asesor?: string
  fecha?: string
  hora?: string
  motivo?: string
  estado?: string
}

type NotaCliente = {
  id: string
  clienteId: string
  texto: string
  fecha: string
}

let clienteSeleccionadoId = ''

export function crearModuloPerfil(clienteId?: string): string {
  const clientes = obtenerClientesPerfil()

  if (clientes.length === 0) {
    return `
      <div class="empty-state">
        <h3>No hay clientes registrados</h3>
        <p>Primero registra o convierte un lead en cliente.</p>
      </div>
    `
  }

  clienteSeleccionadoId =
    clienteId && clientes.some((cliente) => cliente.id === clienteId)
      ? clienteId
      : clienteSeleccionadoId &&
          clientes.some((cliente) => cliente.id === clienteSeleccionadoId)
        ? clienteSeleccionadoId
        : clientes[0].id

  const cliente = clientes.find(
    (item) => item.id === clienteSeleccionadoId,
  ) ?? clientes[0]

  const citas = obtenerCitasCliente(cliente)
  const notas = obtenerNotasCliente(cliente.id)

  return `
    <div class="perfil-cliente-modulo">
      <div class="barra-clientes">
        <label>
          <span>Seleccionar cliente</span>
          <select id="selector-perfil-cliente" class="input-busqueda">
            ${clientes
              .map(
                (item) => `
                  <option
                    value="${escaparHTML(item.id)}"
                    ${item.id === cliente.id ? 'selected' : ''}
                  >
                    ${escaparHTML(obtenerNombreCompleto(item))}
                  </option>
                `,
              )
              .join('')}
          </select>
        </label>

        <button
          id="editar-perfil-cliente"
          class="btn-primary"
          type="button"
        >
          Editar información
        </button>
      </div>

      <section class="perfil-cliente-encabezado crm-card">
        <div class="perfil-cliente-avatar">
          ${
            cliente.foto
              ? `<img src="${escaparHTML(cliente.foto)}" alt="Foto del cliente" />`
              : escaparHTML(obtenerIniciales(cliente))
          }
        </div>

        <div class="perfil-cliente-identidad">
          <span class="admin-card-etiqueta">Ficha del cliente</span>
          <h2>${escaparHTML(obtenerNombreCompleto(cliente))}</h2>
          <p>${escaparHTML(cliente.correo || 'Correo no registrado')}</p>

          <div class="perfil-cliente-etiquetas">
            <span>${escaparHTML(cliente.estado || 'Activo')}</span>
            <span>${escaparHTML(cliente.marca || 'Marca no asignada')}</span>
            <span>${escaparHTML(cliente.servicio || 'Servicio no asignado')}</span>
          </div>
        </div>
      </section>

      <section class="perfil-cliente-resumen">
        <article class="crm-kpi-card">
          <div class="crm-kpi-icon azul">📱</div>
          <div>
            <span>Teléfono</span>
            <strong>${escaparHTML(cliente.telefono || 'Sin registrar')}</strong>
            <small>Contacto principal</small>
          </div>
        </article>

        <article class="crm-kpi-card">
          <div class="crm-kpi-icon morado">🧑‍💼</div>
          <div>
            <span>Asesor asignado</span>
            <strong>${escaparHTML(cliente.asesor || obtenerAsesorDesdeCitas(citas))}</strong>
            <small>Responsable del seguimiento</small>
          </div>
        </article>

        <article class="crm-kpi-card">
          <div class="crm-kpi-icon naranja">📅</div>
          <div>
            <span>Total de citas</span>
            <strong>${citas.length}</strong>
            <small>Historial registrado</small>
          </div>
        </article>

        <article class="crm-kpi-card">
          <div class="crm-kpi-icon verde">📝</div>
          <div>
            <span>Notas</span>
            <strong>${notas.length}</strong>
            <small>Seguimientos guardados</small>
          </div>
        </article>
      </section>

      <section class="perfil-cliente-grid">
        <article class="admin-card-v2">
          <div class="admin-card-cabecera">
            <div>
              <span class="admin-card-etiqueta">Información</span>
              <h3>Datos personales</h3>
            </div>
          </div>

          <div class="perfil-datos-lista">
            ${crearDatoPerfil('📧', 'Correo', cliente.correo)}
            ${crearDatoPerfil('📱', 'Teléfono', cliente.telefono)}
            ${crearDatoPerfil('📍', 'Ciudad', cliente.ciudad)}
            ${crearDatoPerfil('🏢', 'Marca', cliente.marca)}
            ${crearDatoPerfil('💼', 'Servicio o curso', cliente.servicio)}
            ${crearDatoPerfil('📌', 'Estado', cliente.estado || 'Activo')}
          </div>
        </article>

        <article class="admin-card-v2">
          <div class="admin-card-cabecera">
            <div>
              <span class="admin-card-etiqueta">Agenda</span>
              <h3>Historial de citas</h3>
            </div>
          </div>

          ${crearHistorialCitas(citas)}
        </article>
      </section>

      <section class="admin-card-v2">
        <div class="admin-card-cabecera">
          <div>
            <span class="admin-card-etiqueta">Seguimiento</span>
            <h3>Notas del cliente</h3>
            <p>Registra observaciones y avances importantes.</p>
          </div>

          <button
            id="agregar-nota-cliente"
            class="btn-primary"
            type="button"
          >
            + Agregar nota
          </button>
        </div>

        <div id="lista-notas-cliente">
          ${crearListaNotas(notas)}
        </div>
      </section>
    </div>
  `
}

export function activarModuloPerfil(): void {
  document
    .querySelector<HTMLSelectElement>('#selector-perfil-cliente')
    ?.addEventListener('change', (evento) => {
      const selector = evento.currentTarget as HTMLSelectElement
      clienteSeleccionadoId = selector.value
      actualizarPerfil()
    })

  document
    .querySelector<HTMLButtonElement>('#editar-perfil-cliente')
    ?.addEventListener('click', editarClienteSeleccionado)

  document
    .querySelector<HTMLButtonElement>('#agregar-nota-cliente')
    ?.addEventListener('click', agregarNotaCliente)

  activarBotonesEliminarNota()
}

export function abrirPerfilCliente(clienteId: string): void {
  clienteSeleccionadoId = clienteId
  actualizarPerfil()
}

function editarClienteSeleccionado(): void {
  const clientes = obtenerClientesPerfil()
  const cliente = clientes.find(
    (item) => item.id === clienteSeleccionadoId,
  )

  if (!cliente) {
    window.alert('No se encontró el cliente.')
    return
  }

  const nombre = window.prompt('Nombre:', cliente.nombre)
  if (!nombre?.trim()) return

  const apellido = window.prompt('Apellido:', cliente.apellido || '')
  if (apellido === null) return

  const correo = window.prompt('Correo:', cliente.correo || '')
  if (correo === null) return

  const telefono = window.prompt('Teléfono:', cliente.telefono || '')
  if (telefono === null) return

  const ciudad = window.prompt('Ciudad:', cliente.ciudad || '')
  if (ciudad === null) return

  const marca = window.prompt(
    'Marca (Dr. Bach o KARSAN Escuela Digital):',
    cliente.marca || '',
  )
  if (marca === null) return

  const servicio = window.prompt(
    'Servicio o curso:',
    cliente.servicio || '',
  )
  if (servicio === null) return

  const estado = window.prompt(
    'Estado del cliente:',
    cliente.estado || 'Activo',
  )
  if (estado === null) return

  const asesor = window.prompt(
    'Asesor asignado:',
    cliente.asesor || '',
  )
  if (asesor === null) return

  cliente.nombre = nombre.trim()
  cliente.apellido = apellido.trim()
  cliente.correo = correo.trim()
  cliente.telefono = telefono.trim()
  cliente.ciudad = ciudad.trim()
  cliente.marca = marca.trim()
  cliente.servicio = servicio.trim()
  cliente.estado = estado.trim() || 'Activo'
  cliente.asesor = asesor.trim()

  guardarClientesPerfil(clientes)
  actualizarPerfil()
  window.alert('Información del cliente actualizada.')
}

function agregarNotaCliente(): void {
  if (!clienteSeleccionadoId) return

  const texto = window.prompt(
    'Escribe la nota o seguimiento del cliente:',
  )

  if (!texto?.trim()) return

  const notas = obtenerTodasLasNotas()

  notas.unshift({
    id: crypto.randomUUID(),
    clienteId: clienteSeleccionadoId,
    texto: texto.trim(),
    fecha: new Date().toLocaleString('es-EC'),
  })

  guardarTodasLasNotas(notas)
  actualizarPerfil()
}

function eliminarNotaCliente(idNota: string): void {
  const confirmar = window.confirm('¿Deseas eliminar esta nota?')
  if (!confirmar) return

  const notas = obtenerTodasLasNotas().filter(
    (nota) => nota.id !== idNota,
  )

  guardarTodasLasNotas(notas)
  actualizarPerfil()
}

function activarBotonesEliminarNota(): void {
  document
    .querySelectorAll<HTMLButtonElement>('.eliminar-nota-cliente')
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        const idNota = boton.dataset.id
        if (idNota) eliminarNotaCliente(idNota)
      })
    })
}

function actualizarPerfil(): void {
  const contenido = document.querySelector<HTMLDivElement>(
    '#contenido-dashboard',
  )

  if (!contenido) return

  contenido.innerHTML = crearModuloPerfil(clienteSeleccionadoId)
  activarModuloPerfil()
}

function obtenerClientesPerfil(): PerfilCliente[] {
  const datos = localStorage.getItem('clientes')
  if (!datos) return []

  try {
    const clientes = JSON.parse(datos)
    if (!Array.isArray(clientes)) return []

    return clientes.map((cliente: Partial<PerfilCliente>) => ({
      id: cliente.id || crypto.randomUUID(),
      nombre: cliente.nombre || 'Cliente',
      apellido: cliente.apellido || '',
      correo: cliente.correo || '',
      telefono: cliente.telefono || '',
      ciudad: cliente.ciudad || '',
      marca: cliente.marca || '',
      servicio: cliente.servicio || '',
      estado: cliente.estado || 'Activo',
      asesor: cliente.asesor || '',
      foto: cliente.foto || '',
    }))
  } catch {
    return []
  }
}

function guardarClientesPerfil(clientes: PerfilCliente[]): void {
  localStorage.setItem('clientes', JSON.stringify(clientes))
}

function obtenerCitasCliente(cliente: PerfilCliente): CitaPerfil[] {
  const datos =
    localStorage.getItem('citas') ||
    localStorage.getItem('appointments')

  if (!datos) return []

  try {
    const citas = JSON.parse(datos)
    if (!Array.isArray(citas)) return []

    const nombreCompleto = obtenerNombreCompleto(cliente).toLowerCase()

    return citas.filter((cita: CitaPerfil) => {
      const nombreCita = String(cita.cliente || '').toLowerCase()

      return (
        cita.clienteId === cliente.id ||
        nombreCita === nombreCompleto ||
        nombreCita === cliente.nombre.toLowerCase()
      )
    })
  } catch {
    return []
  }
}

function obtenerTodasLasNotas(): NotaCliente[] {
  const datos = localStorage.getItem('notasClientes')
  if (!datos) return []

  try {
    const notas = JSON.parse(datos)
    return Array.isArray(notas) ? notas : []
  } catch {
    return []
  }
}

function obtenerNotasCliente(clienteId: string): NotaCliente[] {
  return obtenerTodasLasNotas().filter(
    (nota) => nota.clienteId === clienteId,
  )
}

function guardarTodasLasNotas(notas: NotaCliente[]): void {
  localStorage.setItem('notasClientes', JSON.stringify(notas))
}

function crearHistorialCitas(citas: CitaPerfil[]): string {
  if (citas.length === 0) {
    return `
      <div class="empty-state">
        <h3>Sin citas registradas</h3>
        <p>Las citas relacionadas con el cliente aparecerán aquí.</p>
      </div>
    `
  }

  return `
    <div class="perfil-citas-lista">
      ${citas
        .map(
          (cita) => `
            <div class="perfil-cita-item">
              <div>
                <strong>📅 ${escaparHTML(cita.fecha || 'Sin fecha')} ${
                  cita.hora ? `— ${escaparHTML(cita.hora)}` : ''
                }</strong>
                <span>${escaparHTML(cita.motivo || 'Sin motivo')}</span>
              </div>

              <div>
                <span>${escaparHTML(cita.asesor || 'Sin asesor')}</span>
                <small>${escaparHTML(cita.estado || 'Pendiente')}</small>
              </div>
            </div>
          `,
        )
        .join('')}
    </div>
  `
}

function crearListaNotas(notas: NotaCliente[]): string {
  if (notas.length === 0) {
    return `
      <div class="empty-state">
        <h3>No hay notas todavía</h3>
        <p>Agrega la primera observación de seguimiento.</p>
      </div>
    `
  }

  return `
    <div class="perfil-notas-lista">
      ${notas
        .map(
          (nota) => `
            <div class="perfil-nota-item">
              <div>
                <p>${escaparHTML(nota.texto)}</p>
                <small>${escaparHTML(nota.fecha)}</small>
              </div>

              <button
                class="btn-eliminar-cliente eliminar-nota-cliente"
                data-id="${nota.id}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          `,
        )
        .join('')}
    </div>
  `
}

function crearDatoPerfil(
  icono: string,
  etiqueta: string,
  valor?: string,
): string {
  return `
    <div class="perfil-dato-item">
      <span>${icono}</span>
      <div>
        <small>${escaparHTML(etiqueta)}</small>
        <strong>${escaparHTML(valor || 'Sin registrar')}</strong>
      </div>
    </div>
  `
}

function obtenerAsesorDesdeCitas(citas: CitaPerfil[]): string {
  const citaConAsesor = citas.find((cita) => cita.asesor?.trim())
  return citaConAsesor?.asesor || 'Sin asignar'
}

function obtenerNombreCompleto(cliente: PerfilCliente): string {
  return `${cliente.nombre} ${cliente.apellido || ''}`.trim()
}

function obtenerIniciales(cliente: PerfilCliente): string {
  const nombre = cliente.nombre.charAt(0)
  const apellido = cliente.apellido?.charAt(0) || ''
  return `${nombre}${apellido}`.toUpperCase()
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')
  elemento.textContent = texto
  return elemento.innerHTML
}