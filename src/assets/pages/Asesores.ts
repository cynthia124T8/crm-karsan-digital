import { crearNotificacion } from './Notificaciones'

export type EstadoAsesor = 'Activo' | 'Inactivo'

export type Asesor = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  especialidad: string
  estado: EstadoAsesor
}

export function obtenerAsesores(): Asesor[] {
  const datos = localStorage.getItem('asesores')

  if (!datos) {
    return []
  }

  try {
    const asesores = JSON.parse(datos)

    if (!Array.isArray(asesores)) {
      return []
    }

    return asesores.map(normalizarAsesor)
  } catch {
    return []
  }
}

function guardarAsesores(asesores: Asesor[]): void {
  localStorage.setItem('asesores', JSON.stringify(asesores))
}

export function crearModuloAsesores(): string {
  return `
    <section id="modulo-asesores" class="modulo-asesores oculto">

      <div class="encabezado-modulo">
        <div>
          <h2>Gestión de asesores</h2>
          <p>
            Registra y administra los asesores de Karsan Digital.
          </p>
        </div>

        <button
          id="btn-nuevo-asesor"
          class="btn-principal"
          type="button"
        >
          + Nuevo asesor
        </button>
      </div>

      <div class="barra-busqueda">
        <input
          id="buscar-asesor"
          type="search"
          placeholder="Buscar asesor por nombre, correo o especialidad..."
        />
      </div>

      <div
        id="formulario-asesor-contenedor"
        class="formulario-contenedor oculto"
      >
        <form
          id="formulario-asesor"
          class="formulario-asesor"
        >

          <h3 id="titulo-formulario-asesor">
            Registrar asesor
          </h3>

          <input
            id="asesor-id"
            type="hidden"
          />

          <div class="form-grid">

            <div class="form-group">
              <label for="asesor-nombre">
                Nombre
              </label>

              <input
                id="asesor-nombre"
                type="text"
                placeholder="Ingrese el nombre"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-apellido">
                Apellido
              </label>

              <input
                id="asesor-apellido"
                type="text"
                placeholder="Ingrese el apellido"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-correo">
                Correo electrónico
              </label>

              <input
                id="asesor-correo"
                type="email"
                placeholder="asesor@correo.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-telefono">
                Teléfono
              </label>

              <input
                id="asesor-telefono"
                type="tel"
                placeholder="0999999999"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-especialidad">
                Especialidad
              </label>

              <select
                id="asesor-especialidad"
                required
              >
                <option value="">
                  Seleccione una opción
                </option>

                <option value="Marketing Digital">
                  Marketing Digital
                </option>

                <option value="Ventas">
                  Ventas
                </option>

                <option value="Atención al cliente">
                  Atención al cliente
                </option>

                <option value="Desarrollo Web">
                  Desarrollo Web
                </option>

                <option value="Redes Sociales">
                  Redes Sociales
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="asesor-estado">
                Estado
              </label>

              <select
                id="asesor-estado"
                required
              >
                <option value="Activo">
                  Activo
                </option>

                <option value="Inactivo">
                  Inactivo
                </option>
              </select>
            </div>

          </div>

          <p
            id="mensaje-asesor"
            class="mensaje-formulario"
          ></p>

          <div class="acciones-formulario">

            <button
              type="submit"
              class="btn-principal"
            >
              Guardar asesor
            </button>

            <button
              id="btn-cancelar-asesor"
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
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody id="tabla-asesores"></tbody>

        </table>

      </div>

    </section>
  `
}

export function activarModuloAsesores(): void {
  const modulo =
    document.querySelector<HTMLElement>(
      '#modulo-asesores',
    )

  const tabla =
    document.querySelector<HTMLTableSectionElement>(
      '#tabla-asesores',
    )

  const formulario =
    document.querySelector<HTMLFormElement>(
      '#formulario-asesor',
    )

  const formularioContenedor =
    document.querySelector<HTMLElement>(
      '#formulario-asesor-contenedor',
    )

  const botonNuevo =
    document.querySelector<HTMLButtonElement>(
      '#btn-nuevo-asesor',
    )

  const botonCancelar =
    document.querySelector<HTMLButtonElement>(
      '#btn-cancelar-asesor',
    )

  const buscador =
    document.querySelector<HTMLInputElement>(
      '#buscar-asesor',
    )

  const inputId =
    document.querySelector<HTMLInputElement>(
      '#asesor-id',
    )

  const inputNombre =
    document.querySelector<HTMLInputElement>(
      '#asesor-nombre',
    )

  const inputApellido =
    document.querySelector<HTMLInputElement>(
      '#asesor-apellido',
    )

  const inputCorreo =
    document.querySelector<HTMLInputElement>(
      '#asesor-correo',
    )

  const inputTelefono =
    document.querySelector<HTMLInputElement>(
      '#asesor-telefono',
    )

  const inputEspecialidad =
    document.querySelector<HTMLSelectElement>(
      '#asesor-especialidad',
    )

  const inputEstado =
    document.querySelector<HTMLSelectElement>(
      '#asesor-estado',
    )

  const tituloFormulario =
    document.querySelector<HTMLElement>(
      '#titulo-formulario-asesor',
    )

  const mensaje =
    document.querySelector<HTMLParagraphElement>(
      '#mensaje-asesor',
    )

  if (!modulo || !tabla) {
    return
  }

  modulo.classList.remove('oculto')

  function mostrarAsesores(
    filtro = '',
  ): void {
    const asesores = obtenerAsesores()

    const texto = filtro
      .trim()
      .toLowerCase()

    const asesoresFiltrados =
      asesores.filter((asesor) => {
        const nombreCompleto =
          `${asesor.nombre} ${asesor.apellido}`
            .toLowerCase()

        return (
          nombreCompleto.includes(texto) ||
          asesor.correo
            .toLowerCase()
            .includes(texto) ||
          asesor.especialidad
            .toLowerCase()
            .includes(texto) ||
          asesor.telefono
            .toLowerCase()
            .includes(texto)
        )
      })

    if (asesoresFiltrados.length === 0) {
      tabla.innerHTML = `
        <tr>
          <td
            colspan="6"
            class="tabla-vacia"
          >
            No hay asesores registrados.
          </td>
        </tr>
      `

      return
    }

    tabla.innerHTML =
      asesoresFiltrados
        .map(
          (asesor) => `
            <tr>

              <td>
                <strong>
                  ${escaparHTML(
                    `${asesor.nombre} ${asesor.apellido}`,
                  )}
                </strong>
              </td>

              <td>
                ${escaparHTML(asesor.correo)}
              </td>

              <td>
                ${escaparHTML(asesor.telefono)}
              </td>

              <td>
                ${escaparHTML(asesor.especialidad)}
              </td>

              <td>
                <span
                  class="estado ${obtenerClaseEstado(
                    asesor.estado,
                  )}"
                >
                  ${escaparHTML(asesor.estado)}
                </span>
              </td>

              <td>

                <button
                  class="btn-editar"
                  data-editar-asesor="${asesor.id}"
                  type="button"
                >
                  Editar
                </button>

                <button
                  class="btn-eliminar"
                  data-eliminar-asesor="${asesor.id}"
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
      inputEstado.value = 'Activo'
    }

    if (tituloFormulario) {
      tituloFormulario.textContent =
        'Registrar asesor'
    }

    if (mensaje) {
      mensaje.textContent = ''
    }
  }

  function abrirFormulario(): void {
    formularioContenedor?.classList.remove(
      'oculto',
    )
  }

  function cerrarFormulario(): void {
    formularioContenedor?.classList.add(
      'oculto',
    )

    limpiarFormulario()
  }

  function activarBotonesTabla(): void {
    const botonesEditar =
      document.querySelectorAll<HTMLButtonElement>(
        '[data-editar-asesor]',
      )

    const botonesEliminar =
      document.querySelectorAll<HTMLButtonElement>(
        '[data-eliminar-asesor]',
      )

    botonesEditar.forEach((boton) => {
      boton.addEventListener(
        'click',
        () => {
          const id =
            boton.dataset.editarAsesor

          if (!id) return

          const asesor =
            obtenerAsesores().find(
              (item) => item.id === id,
            )

          if (!asesor) {
            return
          }

          if (inputId) {
            inputId.value = asesor.id
          }

          if (inputNombre) {
            inputNombre.value =
              asesor.nombre
          }

          if (inputApellido) {
            inputApellido.value =
              asesor.apellido
          }

          if (inputCorreo) {
            inputCorreo.value =
              asesor.correo
          }

          if (inputTelefono) {
            inputTelefono.value =
              asesor.telefono
          }

          if (inputEspecialidad) {
            inputEspecialidad.value =
              asesor.especialidad
          }

          if (inputEstado) {
            inputEstado.value =
              asesor.estado
          }

          if (tituloFormulario) {
            tituloFormulario.textContent =
              'Editar asesor'
          }

          abrirFormulario()
        },
      )
    })

    botonesEliminar.forEach((boton) => {
      boton.addEventListener(
        'click',
        () => {
          const id =
            boton.dataset.eliminarAsesor

          if (!id) return

          const confirmar =
            window.confirm(
              '¿Está segura de eliminar este asesor?',
            )

          if (!confirmar) {
            return
          }

          const asesorEliminado =
            obtenerAsesores().find(
              (asesor) =>
                asesor.id === id,
            )

          const asesoresActualizados =
            obtenerAsesores().filter(
              (asesor) =>
                asesor.id !== id,
            )

          guardarAsesores(
            asesoresActualizados,
          )

          if (asesorEliminado) {
            crearNotificacion(
              'Asesor eliminado',
              `${asesorEliminado.nombre} ${asesorEliminado.apellido} fue eliminado correctamente.`,
              'asesor',
            )
          }

          mostrarAsesores(
            buscador?.value ?? '',
          )
        },
      )
    })
  }

  botonNuevo?.addEventListener(
    'click',
    () => {
      limpiarFormulario()
      abrirFormulario()
      inputNombre?.focus()
    },
  )

  botonCancelar?.addEventListener(
    'click',
    () => {
      cerrarFormulario()
    },
  )

  buscador?.addEventListener(
    'input',
    () => {
      mostrarAsesores(
        buscador.value,
      )
    },
  )

  formulario?.addEventListener(
    'submit',
    (evento) => {
      evento.preventDefault()

      const nombre =
        inputNombre?.value.trim() ?? ''

      const apellido =
        inputApellido?.value.trim() ?? ''

      const correo =
        inputCorreo?.value
          .trim()
          .toLowerCase() ?? ''

      const telefono =
        inputTelefono?.value.trim() ?? ''

      const especialidad =
        inputEspecialidad?.value ?? ''

      const estado =
        inputEstado?.value as EstadoAsesor

      const idActual =
        inputId?.value ?? ''

      if (
        !nombre ||
        !apellido ||
        !correo ||
        !telefono ||
        !especialidad
      ) {
        if (mensaje) {
          mensaje.textContent =
            'Por favor, complete todos los campos.'
        }

        return
      }

      if (!validarCorreo(correo)) {
        if (mensaje) {
          mensaje.textContent =
            'Ingrese un correo electrónico válido.'
        }

        return
      }

      const asesores =
        obtenerAsesores()

      const correoExistente =
        asesores.some(
          (asesor) =>
            asesor.correo === correo &&
            asesor.id !== idActual,
        )

      if (correoExistente) {
        if (mensaje) {
          mensaje.textContent =
            'Ya existe un asesor con ese correo.'
        }

        return
      }

      if (idActual) {
        const asesoresActualizados =
          asesores.map(
            (asesor) =>
              asesor.id === idActual
                ? {
                    ...asesor,
                    nombre,
                    apellido,
                    correo,
                    telefono,
                    especialidad,
                    estado,
                  }
                : asesor,
          )

        guardarAsesores(
          asesoresActualizados,
        )

        crearNotificacion(
          'Asesor actualizado',
          `${nombre} ${apellido} fue actualizado correctamente.`,
          'asesor',
        )
      } else {
        const nuevoAsesor: Asesor = {
          id: crypto.randomUUID(),
          nombre,
          apellido,
          correo,
          telefono,
          especialidad,
          estado,
        }

        guardarAsesores([
          ...asesores,
          nuevoAsesor,
        ])

        crearNotificacion(
          'Nuevo asesor registrado',
          `${nuevoAsesor.nombre} ${nuevoAsesor.apellido} fue agregado al CRM.`,
          'asesor',
        )
      }

      cerrarFormulario()

      mostrarAsesores(
        buscador?.value ?? '',
      )
    },
  )

  mostrarAsesores()
}

function normalizarAsesor(
  dato: Partial<Asesor>,
): Asesor {
  return {
    id:
      dato.id ??
      crypto.randomUUID(),

    nombre:
      dato.nombre ??
      'Sin nombre',

    apellido:
      dato.apellido ??
      '',

    correo:
      dato.correo ??
      '',

    telefono:
      dato.telefono ??
      '',

    especialidad:
      dato.especialidad ??
      'Atención al cliente',

    estado:
      dato.estado === 'Inactivo'
        ? 'Inactivo'
        : 'Activo',
  }
}

function validarCorreo(
  correo: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    correo,
  )
}

function obtenerClaseEstado(
  estado: EstadoAsesor,
): string {
  return `estado-${estado
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}`
}

function escaparHTML(
  texto: string,
): string {
  const elemento =
    document.createElement('div')

  elemento.textContent = texto

  return elemento.innerHTML
}