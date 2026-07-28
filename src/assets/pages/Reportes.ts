type Cliente = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
}

type Lead = {
  id: string
  nombre: string
  apellido?: string
  correo: string
  telefono: string
  fuente: string
  estado: string
}

type Asesor = {
  id: string
  nombre: string
  apellido: string
  estado: string
}

type Cita = {
  id: string
  clienteNombre: string
  asesorNombre: string
  fecha: string
  hora: string
  motivo: string
  estado: string
}

type Notificacion = {
  id: string
  titulo: string
  mensaje: string
  tipo: string
  leida: boolean
  fechaCreacion: string
}

export function crearModuloReportes(): string {
  const clientes = obtenerDatos<Cliente>('clientes')
  const leads = obtenerDatos<Lead>('leads')
  const asesores = obtenerDatos<Asesor>('asesores')
  const citas = obtenerDatos<Cita>('citas')
  const notificaciones =
    obtenerDatos<Notificacion>('notificaciones')

  const asesoresActivos = asesores.filter(
    (asesor) => asesor.estado === 'Activo',
  ).length

  const citasPendientes = citas.filter(
    (cita) => cita.estado === 'Pendiente',
  ).length

  const citasConfirmadas = citas.filter(
    (cita) => cita.estado === 'Confirmada',
  ).length

  const citasFinalizadas = citas.filter(
    (cita) => cita.estado === 'Finalizada',
  ).length

  const citasCanceladas = citas.filter(
    (cita) => cita.estado === 'Cancelada',
  ).length

  const leadsNuevos = leads.filter(
    (lead) => lead.estado === 'Nuevo',
  ).length

  const leadsContactados = leads.filter(
    (lead) => lead.estado === 'Contactado',
  ).length

  const leadsConvertidos = leads.filter(
    (lead) => lead.estado === 'Convertido',
  ).length

  const notificacionesNoLeidas = notificaciones.filter(
    (notificacion) => !notificacion.leida,
  ).length

  const maximoGeneral = Math.max(
    clientes.length,
    leads.length,
    asesores.length,
    citas.length,
    1,
  )

  return `
    <section id="modulo-reportes" class="modulo-reportes">
      <div class="encabezado-modulo">
        <div>
          <h2>Reportes y estadísticas</h2>

          <p>
            Resumen general de la información registrada en el CRM.
          </p>
        </div>

        <div class="acciones-reportes">
          <button
            id="btn-exportar-excel"
            class="btn-secundario"
            type="button"
          >
            Exportar Excel
          </button>

          <button
            id="btn-exportar-pdf"
            class="btn-principal"
            type="button"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      <div class="reportes-tarjetas">
        ${crearTarjetaReporte(
          'Clientes',
          clientes.length,
          'Clientes registrados',
          '👥',
          'azul',
        )}

        ${crearTarjetaReporte(
          'Leads',
          leads.length,
          'Clientes potenciales',
          '🎯',
          'verde',
        )}

        ${crearTarjetaReporte(
          'Asesores',
          asesores.length,
          `${asesoresActivos} activos`,
          '🧑‍💼',
          'morado',
        )}

        ${crearTarjetaReporte(
          'Citas',
          citas.length,
          `${citasPendientes} pendientes`,
          '📅',
          'naranja',
        )}

        ${crearTarjetaReporte(
          'Notificaciones',
          notificaciones.length,
          `${notificacionesNoLeidas} sin leer`,
          '🔔',
          'rojo',
        )}
      </div>

      <div class="reportes-grid">
        <article class="reporte-panel reporte-panel-amplio">
          <div class="reporte-panel-titulo">
            <div>
              <span class="reporte-panel-icono">📈</span>
              <div>
                <h3>Resumen general</h3>
                <p>Comparación de los principales registros del CRM.</p>
              </div>
            </div>
          </div>

          ${crearBarraReporte(
            'Clientes',
            clientes.length,
            maximoGeneral,
          )}

          ${crearBarraReporte(
            'Leads',
            leads.length,
            maximoGeneral,
          )}

          ${crearBarraReporte(
            'Asesores',
            asesores.length,
            maximoGeneral,
          )}

          ${crearBarraReporte(
            'Citas',
            citas.length,
            maximoGeneral,
          )}
        </article>

        <article class="reporte-panel">
          <div class="reporte-panel-titulo">
            <div>
              <span class="reporte-panel-icono">📅</span>
              <div>
                <h3>Estado de las citas</h3>
                <p>Distribución actual de las citas.</p>
              </div>
            </div>
          </div>

          ${crearFilaEstado(
            'Pendientes',
            citasPendientes,
          )}

          ${crearFilaEstado(
            'Confirmadas',
            citasConfirmadas,
          )}

          ${crearFilaEstado(
            'Finalizadas',
            citasFinalizadas,
          )}

          ${crearFilaEstado(
            'Canceladas',
            citasCanceladas,
          )}
        </article>

        <article class="reporte-panel">
          <div class="reporte-panel-titulo">
            <div>
              <span class="reporte-panel-icono">🎯</span>
              <div>
                <h3>Estado de los leads</h3>
                <p>Avance de los clientes potenciales.</p>
              </div>
            </div>
          </div>

          ${crearFilaEstado(
            'Nuevos',
            leadsNuevos,
          )}

          ${crearFilaEstado(
            'Contactados',
            leadsContactados,
          )}

          ${crearFilaEstado(
            'Convertidos',
            leadsConvertidos,
          )}
        </article>

        <article class="reporte-panel">
          <div class="reporte-panel-titulo">
            <div>
              <span class="reporte-panel-icono">⚡</span>
              <div>
                <h3>Actividad del sistema</h3>
                <p>Información relevante del CRM.</p>
              </div>
            </div>
          </div>

          ${crearFilaEstado(
            'Asesores activos',
            asesoresActivos,
          )}

          ${crearFilaEstado(
            'Notificaciones',
            notificaciones.length,
          )}

          ${crearFilaEstado(
            'Sin leer',
            notificacionesNoLeidas,
          )}
        </article>
      </div>

      <div class="reporte-tabla-contenedor">
        <div class="reporte-tabla-encabezado">
          <div>
            <h3>Últimas citas registradas</h3>
            <p>Consulta los cinco registros más recientes.</p>
          </div>
          <span class="reporte-tabla-icono">🗓️</span>
        </div>

        ${crearTablaCitas(citas)}
      </div>
    </section>
  `
}

export function activarModuloReportes(): void {
  const botonExcel =
    document.querySelector<HTMLButtonElement>(
      '#btn-exportar-excel',
    )

  const botonPDF =
    document.querySelector<HTMLButtonElement>(
      '#btn-exportar-pdf',
    )

  botonExcel?.addEventListener('click', () => {
    exportarReporteExcel()
  })

  botonPDF?.addEventListener('click', () => {
    exportarReportePDF()
  })
}

function crearTarjetaReporte(
  titulo: string,
  cantidad: number,
  descripcion: string,
  icono: string,
  color: string,
): string {
  return `
    <article class="reporte-tarjeta reporte-tarjeta-${color}">
      <div class="reporte-tarjeta-icono">${icono}</div>

      <div class="reporte-tarjeta-contenido">
        <span>${escaparHTML(titulo)}</span>
        <strong>${cantidad}</strong>
        <small>${escaparHTML(descripcion)}</small>
      </div>
    </article>
  `
}

function crearBarraReporte(
  nombre: string,
  cantidad: number,
  maximo: number,
): string {
  const porcentaje = Math.round(
    (cantidad / maximo) * 100,
  )

  return `
    <div class="reporte-barra-fila">
      <div class="reporte-barra-datos">
        <span>${escaparHTML(nombre)}</span>
        <strong>${cantidad}</strong>
      </div>

      <div class="reporte-barra-fondo">
        <div
          class="reporte-barra-progreso"
          style="width: ${porcentaje}%"
        ></div>
      </div>
    </div>
  `
}

function crearFilaEstado(
  nombre: string,
  cantidad: number,
): string {
  return `
    <div class="reporte-estado-fila">
      <span>
        <i></i>
        ${escaparHTML(nombre)}
      </span>
      <strong>${cantidad}</strong>
    </div>
  `
}

function crearTablaCitas(citas: Cita[]): string {
  if (citas.length === 0) {
    return `
      <div class="empty-state">
        <p>No hay citas registradas.</p>
      </div>
    `
  }

  const citasRecientes = [...citas]
    .reverse()
    .slice(0, 5)

  return `
    <div class="tabla-contenedor">
      <table class="tabla-datos">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Asesor</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          ${citasRecientes
            .map(
              (cita) => `
                <tr>
                  <td>
                    ${escaparHTML(cita.clienteNombre)}
                  </td>

                  <td>
                    ${escaparHTML(cita.asesorNombre)}
                  </td>

                  <td>
                    ${formatearFecha(cita.fecha)}
                  </td>

                  <td>
                    ${escaparHTML(cita.hora)}
                  </td>

                  <td>
                    ${escaparHTML(cita.estado)}
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

function exportarReporteExcel(): void {
  const clientes = obtenerDatos<Cliente>('clientes')
  const leads = obtenerDatos<Lead>('leads')
  const asesores = obtenerDatos<Asesor>('asesores')
  const citas = obtenerDatos<Cita>('citas')
  const notificaciones =
    obtenerDatos<Notificacion>('notificaciones')

  const filas = [
    ['REPORTE CRM KARSAN DIGITAL'],
    ['Fecha', new Date().toLocaleString()],
    [],
    ['Categoría', 'Cantidad'],
    ['Clientes', clientes.length],
    ['Leads', leads.length],
    ['Asesores', asesores.length],
    ['Citas', citas.length],
    ['Notificaciones', notificaciones.length],
    [],
    ['CITAS'],
    [
      'Cliente',
      'Asesor',
      'Fecha',
      'Hora',
      'Motivo',
      'Estado',
    ],
    ...citas.map((cita) => [
      cita.clienteNombre,
      cita.asesorNombre,
      cita.fecha,
      cita.hora,
      cita.motivo,
      cita.estado,
    ]),
  ]

  const contenidoCSV = filas
    .map((fila) =>
      fila
        .map((valor) => {
          const texto = String(valor ?? '')
            .replace(/"/g, '""')

          return `"${texto}"`
        })
        .join(','),
    )
    .join('\n')

  const archivo = new Blob(
    ['\uFEFF' + contenidoCSV],
    {
      type: 'text/csv;charset=utf-8;',
    },
  )

  const enlace = document.createElement('a')

  enlace.href = URL.createObjectURL(archivo)
  enlace.download = 'reporte-crm-karsan.csv'
  enlace.click()

  URL.revokeObjectURL(enlace.href)
}

function exportarReportePDF(): void {
  const clientes = obtenerDatos<Cliente>('clientes')
  const leads = obtenerDatos<Lead>('leads')
  const asesores = obtenerDatos<Asesor>('asesores')
  const citas = obtenerDatos<Cita>('citas')
  const notificaciones =
    obtenerDatos<Notificacion>('notificaciones')

  const ventana = window.open('', '_blank')

  if (!ventana) {
    window.alert(
      'El navegador bloqueó la ventana del reporte.',
    )

    return
  }

  ventana.document.write(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />

        <title>Reporte CRM Karsan Digital</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 32px;
            color: #172033;
          }

          h1 {
            margin-bottom: 5px;
          }

          .fecha {
            color: #667085;
            margin-bottom: 30px;
          }

          .resumen {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
          }

          .tarjeta {
            border: 1px solid #d0d5dd;
            border-radius: 10px;
            padding: 16px;
          }

          .tarjeta strong {
            display: block;
            font-size: 28px;
            margin-top: 8px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid #d0d5dd;
            padding: 9px;
            text-align: left;
            font-size: 13px;
          }

          th {
            background: #f2f4f7;
          }
        </style>
      </head>

      <body>
        <h1>Reporte CRM Karsan Digital</h1>

        <p class="fecha">
          Generado:
          ${new Date().toLocaleString()}
        </p>

        <div class="resumen">
          ${crearTarjetaImpresion(
            'Clientes',
            clientes.length,
          )}

          ${crearTarjetaImpresion(
            'Leads',
            leads.length,
          )}

          ${crearTarjetaImpresion(
            'Asesores',
            asesores.length,
          )}

          ${crearTarjetaImpresion(
            'Citas',
            citas.length,
          )}

          ${crearTarjetaImpresion(
            'Notificaciones',
            notificaciones.length,
          )}
        </div>

        <h2>Citas registradas</h2>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Asesor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            ${citas
              .map(
                (cita) => `
                  <tr>
                    <td>
                      ${escaparHTML(cita.clienteNombre)}
                    </td>

                    <td>
                      ${escaparHTML(cita.asesorNombre)}
                    </td>

                    <td>
                      ${formatearFecha(cita.fecha)}
                    </td>

                    <td>
                      ${escaparHTML(cita.hora)}
                    </td>

                    <td>
                      ${escaparHTML(cita.estado)}
                    </td>
                  </tr>
                `,
              )
              .join('')}
          </tbody>
        </table>

        <script>
          window.onload = function () {
            window.print()
          }
        </script>
      </body>
    </html>
  `)

  ventana.document.close()
}

function crearTarjetaImpresion(
  titulo: string,
  cantidad: number,
): string {
  return `
    <div class="tarjeta">
      <span>${escaparHTML(titulo)}</span>
      <strong>${cantidad}</strong>
    </div>
  `
}

function obtenerDatos<T>(clave: string): T[] {
  const datos = localStorage.getItem(clave)

  if (!datos) {
    return []
  }

  try {
    const resultado = JSON.parse(datos)

    if (!Array.isArray(resultado)) {
      return []
    }

    return resultado as T[]
  } catch {
    return []
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