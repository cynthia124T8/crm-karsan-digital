export type Notificacion = {
  id: string
  titulo: string
  mensaje: string
  fecha: string
  leida: boolean
  tipo: 'lead' | 'cita' | 'asesor' | 'cliente' | 'sistema'
}

export function obtenerNotificaciones(): Notificacion[] {
  const datos = localStorage.getItem('notificaciones')

  if (!datos) {
    return []
  }

  try {
    const notificaciones = JSON.parse(datos)

    if (!Array.isArray(notificaciones)) {
      return []
    }

    return notificaciones as Notificacion[]
  } catch {
    return []
  }
}

function guardarNotificaciones(
  notificaciones: Notificacion[],
): void {
  localStorage.setItem(
    'notificaciones',
    JSON.stringify(notificaciones),
  )
}

export function crearNotificacion(
  titulo: string,
  mensaje: string,
  tipo: Notificacion['tipo'] = 'sistema',
): void {
  const notificaciones = obtenerNotificaciones()

  const nuevaNotificacion: Notificacion = {
    id: crypto.randomUUID(),
    titulo,
    mensaje,
    fecha: new Date().toISOString(),
    leida: false,
    tipo,
  }

  guardarNotificaciones([
    nuevaNotificacion,
    ...notificaciones,
  ])

  actualizarContadorNotificaciones()
}

export function contarNotificacionesNoLeidas(): number {
  return obtenerNotificaciones().filter(
    (notificacion) => !notificacion.leida,
  ).length
}

export function crearModuloNotificaciones(): string {
  return `
    <section
      id="modulo-notificaciones"
      class="modulo-notificaciones"
    >
      <div class="encabezado-modulo">
        <div>
          <h2>Notificaciones</h2>

          <p>
            Revisa las actividades importantes del CRM.
          </p>
        </div>

        <button
          id="btn-marcar-todas"
          class="btn-secundario"
          type="button"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div class="barra-busqueda">
        <input
          id="buscar-notificacion"
          type="search"
          placeholder="Buscar notificación..."
        />
      </div>

      <div
        id="lista-notificaciones"
        class="lista-notificaciones"
      ></div>
    </section>
  `
}

export function activarModuloNotificaciones(): void {
  const lista =
    document.querySelector<HTMLDivElement>(
      '#lista-notificaciones',
    )

  const buscador =
    document.querySelector<HTMLInputElement>(
      '#buscar-notificacion',
    )

  const botonMarcarTodas =
    document.querySelector<HTMLButtonElement>(
      '#btn-marcar-todas',
    )

  if (!lista) {
    return
  }

  const listaNotificaciones = lista

  function mostrarNotificaciones(filtro = ''): void {
    const texto = filtro.trim().toLowerCase()

    const notificaciones =
      obtenerNotificaciones().filter((notificacion) => {
        return (
          notificacion.titulo
            .toLowerCase()
            .includes(texto) ||
          notificacion.mensaje
            .toLowerCase()
            .includes(texto) ||
          notificacion.tipo
            .toLowerCase()
            .includes(texto)
        )
      })

    if (notificaciones.length === 0) {
      listaNotificaciones.innerHTML = `
        <div class="empty-state">
          <h3>No hay notificaciones</h3>

          <p>
            Las nuevas actividades del CRM aparecerán aquí.
          </p>
        </div>
      `

      return
    }

    listaNotificaciones.innerHTML = notificaciones
      .map(
        (notificacion) => `
          <article
            class="notificacion-card ${
              notificacion.leida
                ? 'notificacion-leida'
                : 'notificacion-no-leida'
            }"
          >
            <div class="notificacion-icono">
              ${obtenerIcono(notificacion.tipo)}
            </div>

            <div class="notificacion-contenido">
              <div class="notificacion-encabezado">
                <h3>
                  ${escaparHTML(notificacion.titulo)}
                </h3>

                ${
                  !notificacion.leida
                    ? `
                      <span class="notificacion-nueva">
                        Nueva
                      </span>
                    `
                    : ''
                }
              </div>

              <p>
                ${escaparHTML(notificacion.mensaje)}
              </p>

              <small>
                ${formatearFecha(notificacion.fecha)}
              </small>
            </div>

            <div class="notificacion-acciones">
              ${
                !notificacion.leida
                  ? `
                    <button
                      class="btn-marcar-leida"
                      data-marcar-leida="${notificacion.id}"
                      type="button"
                    >
                      Marcar como leída
                    </button>
                  `
                  : ''
              }

              <button
                class="btn-eliminar"
                data-eliminar-notificacion="${notificacion.id}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </article>
        `,
      )
      .join('')

    activarBotonesNotificaciones()
  }

  function activarBotonesNotificaciones(): void {
    const botonesMarcar =
      document.querySelectorAll<HTMLButtonElement>(
        '[data-marcar-leida]',
      )

    const botonesEliminar =
      document.querySelectorAll<HTMLButtonElement>(
        '[data-eliminar-notificacion]',
      )

    botonesMarcar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const id = boton.dataset.marcarLeida

        if (!id) {
          return
        }

        const notificaciones =
          obtenerNotificaciones().map((notificacion) =>
            notificacion.id === id
              ? {
                  ...notificacion,
                  leida: true,
                }
              : notificacion,
          )

        guardarNotificaciones(notificaciones)
        actualizarContadorNotificaciones()

        mostrarNotificaciones(
          buscador?.value ?? '',
        )
      })
    })

    botonesEliminar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const id =
          boton.dataset.eliminarNotificacion

        if (!id) {
          return
        }

        const confirmar = window.confirm(
          '¿Deseas eliminar esta notificación?',
        )

        if (!confirmar) {
          return
        }

        const notificaciones =
          obtenerNotificaciones().filter(
            (notificacion) =>
              notificacion.id !== id,
          )

        guardarNotificaciones(notificaciones)
        actualizarContadorNotificaciones()

        mostrarNotificaciones(
          buscador?.value ?? '',
        )
      })
    })
  }

  buscador?.addEventListener('input', () => {
    mostrarNotificaciones(buscador.value)
  })

  botonMarcarTodas?.addEventListener('click', () => {
    const notificaciones =
      obtenerNotificaciones().map((notificacion) => ({
        ...notificacion,
        leida: true,
      }))

    guardarNotificaciones(notificaciones)
    actualizarContadorNotificaciones()

    mostrarNotificaciones(
      buscador?.value ?? '',
    )
  })

  mostrarNotificaciones()
}

export function actualizarContadorNotificaciones(): void {
  const contador =
    document.querySelector<HTMLElement>(
      '#contador-notificaciones',
    )

  if (contador) {
    const total = contarNotificacionesNoLeidas()

    contador.textContent = String(total)

    contador.style.display =
      total > 0 ? 'inline-flex' : 'none'
  }
}

function obtenerIcono(
  tipo: Notificacion['tipo'],
): string {
  const iconos: Record<Notificacion['tipo'], string> = {
    lead: '🎯',
    cita: '📅',
    asesor: '👨‍💼',
    cliente: '👤',
    sistema: '🔔',
  }

  return iconos[tipo]
}

function formatearFecha(fecha: string): string {
  const fechaObjeto = new Date(fecha)

  if (Number.isNaN(fechaObjeto.getTime())) {
    return fecha
  }

  return fechaObjeto.toLocaleString('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function escaparHTML(texto: string): string {
  const elemento = document.createElement('div')

  elemento.textContent = texto

  return elemento.innerHTML
}