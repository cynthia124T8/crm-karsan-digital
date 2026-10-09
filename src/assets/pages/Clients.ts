import { crearNotificacion } from './Notificaciones'

export type EstadoCliente = 'Activo' | 'Inactivo'

export type Cliente = {
  id: string
  nombre: string
  apellido?: string
  correo: string
  telefono: string
  ciudad: string
  servicio: string
  estado: EstadoCliente
  fechaRegistro: string
  contrasena?: string
  rol?: 'cliente'
  foto?: string
}

export function obtenerClientes(): Cliente[] {
  const datos = localStorage.getItem('clientes')

  if (!datos) return []

  try {
    const clientes = JSON.parse(datos)

    return Array.isArray(clientes)
      ? clientes.map(normalizarCliente)
      : []
  } catch {
    return []
  }
}

export function guardarClientes(clientes: Cliente[]): void {
  localStorage.setItem('clientes', JSON.stringify(clientes))
}

export function crearModuloClientes(): string {
  const clientes = obtenerClientes()

  return `
    <div class="barra-clientes">
      <input
        id="buscar-cliente"
        class="input-busqueda"
        type="search"
        placeholder="Buscar por nombre, correo, teléfono, ciudad o servicio"
      />

      <button id="nuevo-cliente" class="btn-primary" type="button">
        + Nuevo cliente
      </button>
    </div>

    <div class="resumen-leads">
      <article>
        <span>👥</span>
        <div>
          <small>Total de clientes</small>
          <strong>${clientes.length}</strong>
        </div>
      </article>

      <article>
        <span>✅</span>
        <div>
          <small>Clientes activos</small>
          <strong>
            ${clientes.filter((cliente) => cliente.estado === 'Activo').length}
          </strong>
        </div>
      </article>

      <article>
        <span>⏸️</span>
        <div>
          <small>Clientes inactivos</small>
          <strong>
            ${clientes.filter((cliente) => cliente.estado === 'Inactivo').length}
          </strong>
        </div>
      </article>
    </div>

    <div id="lista-clientes">
      ${crearTablaClientes(clientes)}
    </div>
  `
}

export function activarModuloClientes(): void {
  document
    .querySelector<HTMLButtonElement>('#nuevo-cliente')
    ?.addEventListener('click', crearCliente)

  document
    .querySelector<HTMLInputElement>('#buscar-cliente')
    ?.addEventListener('input', (evento) => {
      const buscador = evento.currentTarget as HTMLInputElement
      const texto = buscador.value.trim().toLowerCase()

      const clientesFiltrados = obtenerClientes().filter((cliente) =>
        [
          cliente.nombre,
          cliente.apellido ?? '',
          cliente.correo,
          cliente.telefono,
          cliente.ciudad,
          cliente.servicio,
          cliente.estado,
        ]
          .join(' ')
          .toLowerCase()
          .includes(texto),
      )

      actualizarListaClientes(clientesFiltrados)
    })

  activarBotonesClientes()
}

function crearTablaClientes(clientes: Cliente[]): string {
  if (clientes.length === 0) {
    return `
      <div class="empty-state">
        <h3>No hay clientes registrados</h3>
        <p>Los clientes aparecerán aquí.</p>
      </div>
    `
  }

  return `
    <div class="tabla-contenedor">
      <table class="tabla-clientes">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Servicio o curso</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${clientes
            .map(
              (cliente) => `
                <tr>
                  <td>
                    <strong>
                      ${escaparHTML(
                        `${cliente.nombre}${cliente.apellido ? ` ${cliente.apellido}` : ''}`,
                      )}
                    </strong>
                    <small>${escaparHTML(cliente.correo)}</small>
                  </td>

                  <td>${escaparHTML(cliente.telefono)}</td>

                  <td>${escaparHTML(cliente.ciudad)}</td>

                  <td>${escaparHTML(cliente.servicio)}</td>

                  <td>
                    <span class="estado-lead ${obtenerClaseEstado(cliente.estado)}">
                      ${escaparHTML(cliente.estado)}
                    </span>
                  </td>

                  <td>${escaparHTML(cliente.fechaRegistro)}</td>

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

function crearCliente(): void {
  const nombre = window.prompt('Nombre completo del cliente:')

  if (!nombre?.trim()) return

  const telefono = window.prompt('WhatsApp o teléfono del cliente:')

  if (!telefono?.trim()) return

  const correo = window.prompt('Correo electrónico del cliente:')

  if (!correo?.trim()) return

  if (!validarCorreo(correo.trim())) {
    window.alert('Ingrese un correo electrónico válido.')
    return
  }

  const ciudad = window.prompt('Ciudad del cliente:', 'Quito')

  if (!ciudad?.trim()) return

  const servicio = window.prompt(
    'Servicio, curso o producto adquirido:',
  )

  if (!servicio?.trim()) return

  const nuevoCliente: Cliente = {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono.trim(),
    ciudad: ciudad.trim(),
    servicio: servicio.trim(),
    estado: 'Activo',
    fechaRegistro: new Date().toLocaleDateString('es-EC'),
    rol: 'cliente',
  }

  const clientes = obtenerClientes()

  const correoExiste = clientes.some(
    (cliente) =>
      cliente.correo.toLowerCase() === nuevoCliente.correo.toLowerCase(),
  )

  if (correoExiste) {
    window.alert('Ya existe un cliente registrado con ese correo.')
    return
  }

  clientes.push(nuevoCliente)

  guardarClientes(clientes)

  crearNotificacion(
    'Nuevo cliente registrado',
    `${nuevoCliente.nombre} fue agregado al CRM.`,
    'cliente',
  )

  actualizarModuloCompleto()

  window.alert('Cliente registrado correctamente.')
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
    'Nombre completo:',
    cliente.nombre,
  )

  if (!nombre?.trim()) return

  const telefono = window.prompt(
    'WhatsApp o teléfono:',
    cliente.telefono,
  )

  if (!telefono?.trim()) return

  const correo = window.prompt(
    'Correo electrónico:',
    cliente.correo,
  )

  if (!correo?.trim()) return

  if (!validarCorreo(correo.trim())) {
    window.alert('Ingrese un correo electrónico válido.')
    return
  }

  const ciudad = window.prompt(
    'Ciudad:',
    cliente.ciudad,
  )

  if (!ciudad?.trim()) return

  const servicio = window.prompt(
    'Servicio, curso o producto adquirido:',
    cliente.servicio,
  )

  if (!servicio?.trim()) return

  const estado = seleccionarEstado(cliente.estado)

  if (!estado) return

  cliente.nombre = nombre.trim()
  cliente.telefono = telefono.trim()
  cliente.correo = correo.trim().toLowerCase()
  cliente.ciudad = ciudad.trim()
  cliente.servicio = servicio.trim()
  cliente.estado = estado

  guardarClientes(clientes)

  actualizarModuloCompleto()

  window.alert('Cliente actualizado correctamente.')
}

function eliminarCliente(idCliente: string): void {
  const confirmar = window.confirm(
    '¿Deseas eliminar este cliente?',
  )

  if (!confirmar) return

  const clientesActualizados = obtenerClientes().filter(
    (cliente) => cliente.id !== idCliente,
  )

  guardarClientes(clientesActualizados)

  actualizarModuloCompleto()

  window.alert('Cliente eliminado correctamente.')
}

function seleccionarEstado(
  estadoActual: EstadoCliente,
): EstadoCliente | null {
  const respuesta = window.prompt(
    [
      'Seleccione el estado del cliente:',
      '1. Activo',
      '2. Inactivo',
      '',
      'Escribe 1 o 2:',
    ].join('\n'),
    estadoActual === 'Activo' ? '1' : '2',
  )

  if (!respuesta?.trim()) return null

  if (respuesta.trim() === '1') {
    return 'Activo'
  }

  if (respuesta.trim() === '2') {
    return 'Inactivo'
  }

  window.alert('El estado seleccionado no es válido.')

  return null
}

function actualizarListaClientes(
  clientes: Cliente[],
): void {
  const lista =
    document.querySelector<HTMLDivElement>(
      '#lista-clientes',
    )

  if (!lista) return

  lista.innerHTML = crearTablaClientes(clientes)

  activarBotonesClientes()
}

function actualizarModuloCompleto(): void {
  const contenido =
    document.querySelector<HTMLDivElement>(
      '#contenido-dashboard',
    )

  if (!contenido) return

  contenido.innerHTML = crearModuloClientes()

  activarModuloClientes()
}

function activarBotonesClientes(): void {
  document
    .querySelectorAll<HTMLButtonElement>(
      '.btn-editar-cliente',
    )
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        if (boton.dataset.id) {
          editarCliente(boton.dataset.id)
        }
      })
    })

  document
    .querySelectorAll<HTMLButtonElement>(
      '.btn-eliminar-cliente',
    )
    .forEach((boton) => {
      boton.addEventListener('click', () => {
        if (boton.dataset.id) {
          eliminarCliente(boton.dataset.id)
        }
      })
    })
}

function normalizarCliente(
  dato: Partial<Cliente>,
): Cliente {
  return {
    id: dato.id ?? crypto.randomUUID(),

    nombre: dato.nombre ?? 'Sin nombre',

    apellido: dato.apellido ?? '',

    correo: dato.correo ?? '',

    telefono: dato.telefono ?? '',

    ciudad: dato.ciudad ?? 'No registrada',

    servicio: dato.servicio ?? 'No especificado',

    estado:
      dato.estado === 'Inactivo'
        ? 'Inactivo'
        : 'Activo',

    fechaRegistro:
      dato.fechaRegistro ??
      new Date().toLocaleDateString('es-EC'),

    contrasena: dato.contrasena,

    rol: 'cliente',

    foto: dato.foto,
  }
}

function obtenerClaseEstado(
  estado: EstadoCliente,
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