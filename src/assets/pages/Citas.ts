import { obtenerAsesores } from './Asesores'

type Cliente = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  contrasena: string
  rol: 'cliente'
}

export type Cita = {
  id: string
  clienteId: string
  clienteNombre: string
  asesorId: string
  asesorNombre: string
  fecha: string
  hora: string
  motivo: string
  estado:
    | 'Pendiente'
    | 'Confirmada'
    | 'Finalizada'
    | 'Cancelada'
}

export function obtenerCitas(): Cita[] {
  const datos = localStorage.getItem('citas')

  if (!datos) {
    return []
  }

  try {
    const citas = JSON.parse(datos)

    if (!Array.isArray(citas)) {
      return []
    }

    return citas as Cita[]
  } catch {
    return []
  }
}

function guardarCitas(citas: Cita[]): void {
  localStorage.setItem('citas', JSON.stringify(citas))
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

export function crearModuloCitas(): string {
  const clientes = obtenerClientes()
  const asesores = obtenerAsesores()

  return `
    <section id="modulo-citas" class="modulo-citas">
      <div class="encabezado-modulo">
        <div>
          <h2>Gestión de citas</h2>
          <p>
            Programa y administra las reuniones con los clientes.
          </p>
        </div>

        <button
          id="btn-nueva-cita"
          class="btn-principal"
          type="button"
        >
          + Nueva cita
        </button>
      </div>

      <div class="barra-busqueda">
        <input
          id="buscar-cita"
          type="search"
          placeholder="Buscar por cliente, asesor o estado..."
        />
      </div>

      <div
        id="formulario-cita-contenedor"
        class="formulario-contenedor oculto"
      >
        <form id="formulario-cita" class="formulario-cita">
          <h3 id="titulo-formulario-cita">
            Registrar cita
          </h3>

          <input id="cita-id" type="hidden" />

          <div class="form-grid">
            <div class="form-group">
              <label for="cita-cliente">
                Cliente
              </label>

              <select id="cita-cliente" required>
                <option value="">
                  Seleccione un cliente
                </option>

                ${clientes
                  .map(
                    (cliente) => `
                      <option value="${cliente.id}">
                        ${escaparHTML(cliente.nombre)}
                        ${escaparHTML(cliente.apellido)}
                      </option>
                    `,
                  )
                  .join('')}
              </select>
            </div>

            <div class="form-group">
              <label for="cita-asesor">
                Asesor
              </label>

              <select id="cita-asesor" required>
                <option value="">
                  Seleccione un asesor
                </option>

                ${asesores
                  .filter(
                    (asesor) => asesor.estado === 'Activo',
                  )
                  .map(
                    (asesor) => `
                      <option value="${asesor.id}">
                        ${escaparHTML(asesor.nombre)}
                        ${escaparHTML(asesor.apellido)}
                      </option>
                    `,
                  )
                  .join('')}
              </select>
            </div>

            <div class="form-group">
              <label for="cita-fecha">
                Fecha
              </label>

              <input
                id="cita-fecha"
                type="date"
                required
              />
            </div>

            <div class="form-group">
              <label for="cita-hora">
                Hora
              </label>

              <input
                id="cita-hora"
                type="time"
                required
              />
            </div>

            <div class="form-group">
              <label for="cita-motivo">
                Motivo
              </label>

              <input
                id="cita-motivo"
                type="text"
                placeholder="Ejemplo: Asesoría de marketing"
                required
              />
            </div>

            <div class="form-group">
              <label for="cita-estado">
                Estado
              </label>

              <select id="cita-estado" required>
                <option value="Pendiente">
                  Pendiente
                </option>

                <option value="Confirmada">
                  Confirmada
                </option>

                <option value="Finalizada">
                  Finalizada
                </option>

                <option value="Cancelada">
                  Cancelada
                </option>
              </select>
            </div>
          </div>

          <p
            id="mensaje-cita"
            class="mensaje-formulario"
          ></p>

          <div class="acciones-formulario">
            <button
              type="submit"
              class="btn-principal"
            >
              Guardar cita
            </button>

            <button
              id="btn-cancelar-cita"
              type="button"
              class="btn-secundario"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div class="tabla-contenedor">
        <table class="tabla-datos">
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

          <tbody id="tabla-citas"></tbody>
        </table>
      </div>
    </section>
  `
}

export function activarModuloCitas(): void {
  const tabla =
    document.querySelector<HTMLTableSectionElement>(
      '#tabla-citas',
    )

  const formulario =
    document.querySelector<HTMLFormElement>(
      '#formulario-cita',
    )

  const contenedorFormulario =
    document.querySelector<HTMLElement>(
      '#formulario-cita-contenedor',
    )

  const botonNuevaCita =
    document.querySelector<HTMLButtonElement>(
      '#btn-nueva-cita',
    )

  const botonCancelar =
    document.querySelector<HTMLButtonElement>(
      '#btn-cancelar-cita',
    )

  const buscador =
    document.querySelector<HTMLInputElement>(
      '#buscar-cita',
    )

  const inputId =
    document.querySelector<HTMLInputElement>(
      '#cita-id',
    )

  const inputCliente =
    document.querySelector<HTMLSelectElement>(
      '#cita-cliente',
    )

  const inputAsesor =
    document.querySelector<HTMLSelectElement>(
      '#cita-asesor',
    )

  const inputFecha =
    document.querySelector<HTMLInputElement>(
      '#cita-fecha',
    )

  const inputHora =
    document.querySelector<HTMLInputElement>(
      '#cita-hora',
    )

  const inputMotivo =
    document.querySelector<HTMLInputElement>(
      '#cita-motivo',
    )

  const inputEstado =
    document.querySelector<HTMLSelectElement>(
      '#cita-estado',
    )

  const tituloFormulario =
    document.querySelector<HTMLElement>(
      '#titulo-formulario-cita',
    )

  const mensaje =
    document.querySelector<HTMLParagraphElement>(
      '#mensaje-cita',
    )

  if (!tabla) {
    return
  }

  const tablaCitas = tabla

  function mostrarCitas(filtro = ''): void {
    const citas = obtenerCitas()
    const texto = filtro.trim().toLowerCase()

    const citasFiltradas = citas.filter((cita) => {
      return (
        cita.clienteNombre.toLowerCase().includes(texto) ||
        cita.asesorNombre.toLowerCase().includes(texto) ||
        cita.estado.toLowerCase().includes(texto) ||
        cita.motivo.toLowerCase().includes(texto)
      )
    })

    if (citasFiltradas.length === 0) {
      tablaCitas.innerHTML = `
        <tr>
          <td colspan="7" class="tabla-vacia">
            No hay citas registradas.
          </td>
        </tr>
      `

      return
    }

    tablaCitas.innerHTML = citasFiltradas
      .map(
        (cita) => `
          <tr>
            <td>${escaparHTML(cita.clienteNombre)}</td>

            <td>${escaparHTML(cita.asesorNombre)}</td>

            <td>${formatearFecha(cita.fecha)}</td>

            <td>${escaparHTML(cita.hora)}</td>

            <td>${escaparHTML(cita.motivo)}</td>

            <td>
              <span
                class="estado estado-${cita.estado
                  .toLowerCase()
                  .replace(' ', '-')}"
              >
                ${cita.estado}
              </span>
            </td>

            <td>
              <button
                class="btn-editar"
                data-editar-cita="${cita.id}"
                type="button"
              >
                Editar
              </button>

              <button
                class="btn-eliminar"
                data-eliminar-cita="${cita.id}"
                type="button"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `,
      )
      .join('')

    activarBotonesTabla()
  }

  function limpiarFormulario(): void {
    formulario?.reset()

    if (inputId) {
      inputId.value = ''
    }

    if (inputEstado) {
      inputEstado.value = 'Pendiente'
    }

    if (tituloFormulario) {
      tituloFormulario.textContent = 'Registrar cita'
    }

    if (mensaje) {
      mensaje.textContent = ''
    }
  }

  function abrirFormulario(): void {
    contenedorFormulario?.classList.remove('oculto')
  }

  function cerrarFormulario(): void {
    contenedorFormulario?.classList.add('oculto')
    limpiarFormulario()
  }

  function activarBotonesTabla(): void {
    const botonesEditar =
      document.querySelectorAll<HTMLButtonElement>(
        '[data-editar-cita]',
      )

    const botonesEliminar =
      document.querySelectorAll<HTMLButtonElement>(
        '[data-eliminar-cita]',
      )

    botonesEditar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const id = boton.dataset.editarCita

        const cita = obtenerCitas().find(
          (item) => item.id === id,
        )

        if (!cita) {
          return
        }

        if (inputId) inputId.value = cita.id
        if (inputCliente) {
          inputCliente.value = cita.clienteId
        }

        if (inputAsesor) {
          inputAsesor.value = cita.asesorId
        }

        if (inputFecha) inputFecha.value = cita.fecha
        if (inputHora) inputHora.value = cita.hora
        if (inputMotivo) inputMotivo.value = cita.motivo
        if (inputEstado) inputEstado.value = cita.estado

        if (tituloFormulario) {
          tituloFormulario.textContent = 'Editar cita'
        }

        abrirFormulario()
      })
    })

    botonesEliminar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const id = boton.dataset.eliminarCita

        if (!id) {
          return
        }

        const confirmar = window.confirm(
          '¿Deseas eliminar esta cita?',
        )

        if (!confirmar) {
          return
        }

        const citasActualizadas = obtenerCitas().filter(
          (cita) => cita.id !== id,
        )

        guardarCitas(citasActualizadas)
        mostrarCitas(buscador?.value ?? '')
        actualizarTotalCitas(citasActualizadas.length)
      })
    })
  }

  botonNuevaCita?.addEventListener('click', () => {
    const clientes = obtenerClientes()
    const asesores = obtenerAsesores().filter(
      (asesor) => asesor.estado === 'Activo',
    )

    if (clientes.length === 0) {
      window.alert(
        'Primero debes registrar un cliente.',
      )

      return
    }

    if (asesores.length === 0) {
      window.alert(
        'Primero debes registrar un asesor activo.',
      )

      return
    }

    limpiarFormulario()
    abrirFormulario()
  })

  botonCancelar?.addEventListener('click', () => {
    cerrarFormulario()
  })

  buscador?.addEventListener('input', () => {
    mostrarCitas(buscador.value)
  })

  formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const clienteId = inputCliente?.value ?? ''
    const asesorId = inputAsesor?.value ?? ''
    const fecha = inputFecha?.value ?? ''
    const hora = inputHora?.value ?? ''
    const motivo = inputMotivo?.value.trim() ?? ''

    const estado =
      inputEstado?.value as Cita['estado']

    const idActual = inputId?.value ?? ''

    if (
      !clienteId ||
      !asesorId ||
      !fecha ||
      !hora ||
      !motivo
    ) {
      if (mensaje) {
        mensaje.textContent =
          'Por favor, completa todos los campos.'
      }

      return
    }

    const cliente = obtenerClientes().find(
      (item) => item.id === clienteId,
    )

    const asesor = obtenerAsesores().find(
      (item) => item.id === asesorId,
    )

    if (!cliente || !asesor) {
      if (mensaje) {
        mensaje.textContent =
          'No se encontró el cliente o asesor seleccionado.'
      }

      return
    }

    const citas = obtenerCitas()

    const citaRepetida = citas.some(
      (cita) =>
        cita.asesorId === asesorId &&
        cita.fecha === fecha &&
        cita.hora === hora &&
        cita.id !== idActual &&
        cita.estado !== 'Cancelada',
    )

    if (citaRepetida) {
      if (mensaje) {
        mensaje.textContent =
          'El asesor ya tiene una cita en esa fecha y hora.'
      }

      return
    }

    const clienteNombre =
      `${cliente.nombre} ${cliente.apellido}`

    const asesorNombre =
      `${asesor.nombre} ${asesor.apellido}`

    if (idActual) {
      const citasActualizadas = citas.map((cita) =>
        cita.id === idActual
          ? {
              ...cita,
              clienteId,
              clienteNombre,
              asesorId,
              asesorNombre,
              fecha,
              hora,
              motivo,
              estado,
            }
          : cita,
      )

      guardarCitas(citasActualizadas)
    } else {
      const nuevaCita: Cita = {
        id: crypto.randomUUID(),
        clienteId,
        clienteNombre,
        asesorId,
        asesorNombre,
        fecha,
        hora,
        motivo,
        estado,
      }

      guardarCitas([...citas, nuevaCita])
    }

    const total = obtenerCitas().length

    actualizarTotalCitas(total)
    cerrarFormulario()
    mostrarCitas(buscador?.value ?? '')
  })

  mostrarCitas()
}

function actualizarTotalCitas(total: number): void {
  const elemento =
    document.querySelector<HTMLElement>(
      '#total-citas',
    )

  if (elemento) {
    elemento.textContent = String(total)
  }
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