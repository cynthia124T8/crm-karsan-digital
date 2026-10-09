// =========================================================
// KARSAN DIGITAL CRM
// CALENDARIO
// Versión mejorada para Cliente y Administrador
// =========================================================

export interface EventoCalendario {
  id: string;
  fecha: string;
  titulo: string;
  hora: string;
  tipo: string;
  descripcion?: string;
  cliente?: string;
  correoCliente?: string;
}

const STORAGE_KEY = "karsan_eventos_calendario";

// =========================================================
// UTILIDADES
// =========================================================

function generarId(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
}

function leerEventos(): EventoCalendario[] {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
      const eventosIniciales: EventoCalendario[] = [
        {
          id: generarId(),
          fecha: "2026-10-02",
          titulo: "Seguimiento de solicitud",
          hora: "14:30",
          tipo: "Seguimiento",
          descripcion:
            "Revisión del estado de la solicitud del cliente.",
          cliente: "Cliente Karsan",
          correoCliente: "cliente@karsandigital.com",
        },
      ];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(eventosIniciales)
      );

      return eventosIniciales;
    }

    const eventos = JSON.parse(datos);

    if (!Array.isArray(eventos)) {
      return [];
    }

    return eventos;
  } catch (error) {
    console.error("Error al leer eventos:", error);
    return [];
  }
}

function guardarEventos(
  eventos: EventoCalendario[]
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(eventos)
  );
}

function formatearFecha(fecha: string): string {
  const partes = fecha.split("-");

  if (partes.length !== 3) {
    return fecha;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function obtenerNombreMes(mes: number): string {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return meses[mes] ?? "";
}

function obtenerClaseTipo(tipo: string): string {
  const valor = tipo.toLowerCase();

  if (valor.includes("reun")) {
    return "evento-reunion";
  }

  if (valor.includes("segu")) {
    return "evento-seguimiento";
  }

  if (valor.includes("cita")) {
    return "evento-cita";
  }

  if (valor.includes("llamada")) {
    return "evento-llamada";
  }

  return "evento-otro";
}

function escaparHTML(texto: string): string {
  return String(texto ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function obtenerFechaEvento(
  evento: EventoCalendario
): Date {
  return new Date(
    `${evento.fecha}T${evento.hora || "00:00"}:00`
  );
}

// =========================================================
// CALENDARIO PRINCIPAL
// =========================================================

export function mostrarCalendario(
  app: HTMLElement,
  tipoUsuario: "cliente" | "admin" = "cliente",
  email: string = ""
): void {
  let fechaActual = new Date();

  /*
   * Para la demostración del proyecto,
   * mostramos octubre de 2026 si la fecha
   * actual es anterior a octubre de 2026.
   */
  if (
    fechaActual.getFullYear() < 2026 ||
    (
      fechaActual.getFullYear() === 2026 &&
      fechaActual.getMonth() < 9
    )
  ) {
    fechaActual = new Date(2026, 9, 1);
  }

  let fechaSeleccionada =
    `${fechaActual.getFullYear()}-${String(
      fechaActual.getMonth() + 1
    ).padStart(2, "0")}-01`;

  const esAdmin = tipoUsuario === "admin";

  let eventoEditandoId: string | null = null;

  // =======================================================
  // ESTRUCTURA PRINCIPAL
  // =======================================================

  app.innerHTML = `
    <div class="calendar-page">

      <!-- ENCABEZADO -->

      <div class="calendar-topbar">

        <div class="calendar-breadcrumb">
          <span>Karsan Digital</span>

          <span class="calendar-breadcrumb-separator">
            /
          </span>

          <strong>Calendario</strong>
        </div>

        <div class="calendar-user-area">

          <button
            type="button"
            class="calendar-notification-btn"
            id="calNotifications"
            aria-label="Notificaciones"
            title="Notificaciones"
          >
            🔔
          </button>

          <div class="calendar-user-avatar">
            ${esAdmin ? "A" : "CT"}
          </div>

          <div class="calendar-user-info">

            <strong>
              ${esAdmin ? "Administrador" : "Cliente"}
            </strong>

            <span>
              ${
                esAdmin
                  ? "Administrador"
                  : escaparHTML(
                      email || "usuario@karsan.com"
                    )
              }
            </span>

          </div>

        </div>

      </div>

      <!-- CONTENIDO -->

      <main class="calendar-content">

        <!-- ENCABEZADO -->

        <div class="calendar-page-heading">

          <div>

            <span class="calendar-eyebrow">
              ${esAdmin ? "ORGANIZACIÓN" : "AGENDA"}
            </span>

            <h1>
              Calendario
            </h1>

            <p>
              ${
                esAdmin
                  ? "Administra reuniones, citas y actividades programadas."
                  : "Consulta tus reuniones y próximas actividades."
              }
            </p>

          </div>

          ${
            esAdmin
              ? `
                <button
                  type="button"
                  class="calendar-main-action"
                  id="btnNuevoEvento"
                >
                  <span>+</span>
                  Nuevo evento
                </button>
              `
              : ""
          }

        </div>

        <!-- RESUMEN -->

        <div class="calendar-summary">

          <div class="calendar-summary-card">

            <div class="calendar-summary-icon blue">
              📅
            </div>

            <div>
              <span>Eventos programados</span>

              <strong id="totalEventos">
                0
              </strong>
            </div>

          </div>

          <div class="calendar-summary-card">

            <div class="calendar-summary-icon green">
              ✓
            </div>

            <div>
              <span>Eventos del mes</span>

              <strong id="eventosMes">
                0
              </strong>
            </div>

          </div>

          <div class="calendar-summary-card">

            <div class="calendar-summary-icon orange">
              ⏰
            </div>

            <div>
              <span>Próximo evento</span>

              <strong id="proximoEvento">
                —
              </strong>
            </div>

          </div>

        </div>

        <!-- CALENDARIO -->

        <div class="calendar-main-layout">

          <section class="calendar-main-card">

            <div class="calendar-card-header">

              <div>

                <span class="calendar-card-label">
                  AGENDA
                </span>

                <h2>
                  Calendario mensual
                </h2>

              </div>

              <div class="calendar-controls">

                <button
                  type="button"
                  class="calendar-today-btn"
                  id="calToday"
                >
                  Hoy
                </button>

                <button
                  type="button"
                  class="calendar-arrow"
                  id="calPrev"
                  title="Mes anterior"
                  aria-label="Mes anterior"
                >
                  ‹
                </button>

                <div
                  class="calendar-month-title"
                  id="calendarMonthTitle"
                ></div>

                <button
                  type="button"
                  class="calendar-arrow"
                  id="calNext"
                  title="Mes siguiente"
                  aria-label="Mes siguiente"
                >
                  ›
                </button>

              </div>

            </div>

            <div class="calendar-weekdays">

              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
              <div>Dom</div>

            </div>

            <div
              class="calendar-days"
              id="calendarDays"
            ></div>

            <div class="calendar-bottom">

              <div class="calendar-legend">

                <span class="legend-item">
                  <span class="legend-dot blue"></span>
                  Evento programado
                </span>

                <span class="legend-item">
                  <span class="legend-dot today"></span>
                  Hoy
                </span>

              </div>

              <span
                class="calendar-selected-label"
                id="calendarSelectedLabel"
              >
                Selecciona una fecha
              </span>

            </div>

          </section>

          <!-- COLUMNA DERECHA -->

          <aside class="calendar-right-column">

            <section class="calendar-side-card">

              <div class="calendar-side-header">

                <div>

                  <span class="calendar-card-label">
                    AGENDA
                  </span>

                  <h3>
                    Eventos del día
                  </h3>

                </div>

                <span
                  class="calendar-side-count"
                  id="selectedEventCount"
                >
                  0
                </span>

              </div>

              <div id="selectedDayEvents"></div>

            </section>

            <section class="calendar-side-card">

              <div class="calendar-side-header">

                <div>

                  <span class="calendar-card-label">
                    PRÓXIMOS
                  </span>

                  <h3>
                    Próximos eventos
                  </h3>

                </div>

              </div>

              <div
                class="calendar-event-list"
                id="upcomingEvents"
              ></div>

            </section>

          </aside>

        </div>

        ${
          esAdmin
            ? `
              <!-- FORMULARIO -->

              <section
                class="calendar-form-card"
                id="calendarFormSection"
              >

                <div class="calendar-form-header">

                  <div>

                    <span class="calendar-card-label">
                      ADMINISTRACIÓN
                    </span>

                    <h2 id="calendarFormTitle">
                      Crear nuevo evento
                    </h2>

                    <p id="calendarFormDescription">
                      Agrega una reunión, cita o actividad al calendario.
                    </p>

                  </div>

                  <button
                    type="button"
                    class="calendar-close-form"
                    id="calCerrarFormulario"
                    title="Cerrar"
                    aria-label="Cerrar"
                  >
                    ×
                  </button>

                </div>

                <div class="calendar-form-body">

                  <form id="calendarForm">

                    <div class="calendar-form-grid">

                      <div class="calendar-form-group large">

                        <label for="eventoTitulo">
                          Título del evento
                        </label>

                        <input
                          id="eventoTitulo"
                          name="titulo"
                          type="text"
                          placeholder="Ej. Reunión con cliente"
                          maxlength="100"
                          required
                        />

                      </div>

                      <div class="calendar-form-group">

                        <label for="eventoFecha">
                          Fecha
                        </label>

                        <input
                          id="eventoFecha"
                          name="fecha"
                          type="date"
                          required
                          value="${fechaSeleccionada}"
                        />

                      </div>

                      <div class="calendar-form-group">

                        <label for="eventoHora">
                          Hora
                        </label>

                        <input
                          id="eventoHora"
                          name="hora"
                          type="time"
                          required
                          value="09:00"
                        />

                      </div>

                      <div class="calendar-form-group">

                        <label for="eventoTipo">
                          Tipo de evento
                        </label>

                        <select
                          id="eventoTipo"
                          name="tipo"
                          required
                        >

                          <option value="Reunión">
                            Reunión
                          </option>

                          <option value="Seguimiento">
                            Seguimiento
                          </option>

                          <option value="Cita">
                            Cita
                          </option>

                          <option value="Llamada">
                            Llamada
                          </option>

                          <option value="Otro">
                            Otro
                          </option>

                        </select>

                      </div>

                      <div class="calendar-form-group">

                        <label for="eventoCliente">
                          Cliente
                        </label>

                        <input
                          id="eventoCliente"
                          name="cliente"
                          type="text"
                          placeholder="Ej. Empresa XYZ"
                          maxlength="100"
                        />

                      </div>

                      <div class="calendar-form-group">

                        <label for="eventoCorreo">
                          Correo del cliente
                        </label>

                        <input
                          id="eventoCorreo"
                          name="correoCliente"
                          type="email"
                          placeholder="cliente@empresa.com"
                          maxlength="120"
                        />

                      </div>

                    </div>

                    <div class="calendar-form-group">

                      <label for="eventoDescripcion">
                        Descripción
                      </label>

                      <textarea
                        id="eventoDescripcion"
                        name="descripcion"
                        rows="3"
                        maxlength="500"
                        placeholder="Información adicional del evento..."
                      ></textarea>

                    </div>

                    <div class="calendar-form-actions">

                      <button
                        type="button"
                        class="calendar-secondary-btn"
                        id="calLimpiar"
                      >
                        Limpiar
                      </button>

                      <button
                        type="button"
                        class="calendar-secondary-btn"
                        id="calCancelarEdicion"
                        style="display:none;"
                      >
                        Cancelar edición
                      </button>

                      <button
                        type="submit"
                        class="calendar-primary-btn"
                        id="calendarSubmitButton"
                      >
                        <span>+</span>
                        Guardar evento
                      </button>

                    </div>

                  </form>

                </div>

              </section>
            `
            : ""
        }

      </main>

    </div>
  `;

  // =======================================================
  // REFERENCIAS
  // =======================================================

  const monthTitle =
    app.querySelector<HTMLElement>(
      "#calendarMonthTitle"
    );

  const calendarDays =
    app.querySelector<HTMLElement>(
      "#calendarDays"
    );

  const selectedDayEvents =
    app.querySelector<HTMLElement>(
      "#selectedDayEvents"
    );

  const upcomingEvents =
    app.querySelector<HTMLElement>(
      "#upcomingEvents"
    );

  const totalEventos =
    app.querySelector<HTMLElement>(
      "#totalEventos"
    );

  const eventosMes =
    app.querySelector<HTMLElement>(
      "#eventosMes"
    );

  const proximoEvento =
    app.querySelector<HTMLElement>(
      "#proximoEvento"
    );

  const selectedEventCount =
    app.querySelector<HTMLElement>(
      "#selectedEventCount"
    );

  const selectedLabel =
    app.querySelector<HTMLElement>(
      "#calendarSelectedLabel"
    );

  const formulario =
    app.querySelector<HTMLElement>(
      "#calendarFormSection"
    );

  const formularioTitulo =
    app.querySelector<HTMLElement>(
      "#calendarFormTitle"
    );

  const formularioDescripcion =
    app.querySelector<HTMLElement>(
      "#calendarFormDescription"
    );

  const botonGuardar =
    app.querySelector<HTMLButtonElement>(
      "#calendarSubmitButton"
    );

  const botonCancelarEdicion =
    app.querySelector<HTMLButtonElement>(
      "#calCancelarEdicion"
    );

  if (
    !monthTitle ||
    !calendarDays ||
    !selectedDayEvents ||
    !upcomingEvents
  ) {
    console.error(
      "No se pudieron encontrar los elementos del calendario."
    );

    return;
  }

  // =======================================================
  // CAMPOS DEL FORMULARIO
  // =======================================================

  const campoTitulo =
    app.querySelector<HTMLInputElement>(
      "#eventoTitulo"
    );

  const campoFecha =
    app.querySelector<HTMLInputElement>(
      "#eventoFecha"
    );

  const campoHora =
    app.querySelector<HTMLInputElement>(
      "#eventoHora"
    );

  const campoTipo =
    app.querySelector<HTMLSelectElement>(
      "#eventoTipo"
    );

  const campoCliente =
    app.querySelector<HTMLInputElement>(
      "#eventoCliente"
    );

  const campoCorreo =
    app.querySelector<HTMLInputElement>(
      "#eventoCorreo"
    );

  const campoDescripcion =
    app.querySelector<HTMLTextAreaElement>(
      "#eventoDescripcion"
    );

  const calendarForm =
    app.querySelector<HTMLFormElement>(
      "#calendarForm"
    );

  // =======================================================
  // ACTUALIZAR RESUMEN
  // =======================================================

  function actualizarResumen(): void {
    const eventos = leerEventos();

    if (totalEventos) {
      totalEventos.textContent =
        String(eventos.length);
    }

    const año =
      fechaActual.getFullYear();

    const mes =
      fechaActual.getMonth();

    const eventosDelMes =
      eventos.filter((evento) => {

        const partes =
          evento.fecha.split("-");

        return (
          Number(partes[0]) === año &&
          Number(partes[1]) - 1 === mes
        );
      });

    if (eventosMes) {
      eventosMes.textContent =
        String(eventosDelMes.length);
    }

    const ahora =
      new Date();

    const proximos =
      eventos
        .map((evento) => ({
          evento,
          fecha: obtenerFechaEvento(evento),
        }))
        .filter(
          (item) =>
            item.fecha >= ahora
        )
        .sort(
          (a, b) =>
            a.fecha.getTime() -
            b.fecha.getTime()
        );

    if (proximoEvento) {

      if (proximos.length > 0) {

        const proximo =
          proximos[0].evento;

        proximoEvento.textContent =
          `${formatearFecha(
            proximo.fecha
          )} · ${proximo.hora}`;

      } else {

        proximoEvento.textContent =
          "—";
      }
    }
  }

  // =======================================================
  // RENDERIZAR CALENDARIO
  // =======================================================

  function renderizarCalendario(): void {

    const año =
      fechaActual.getFullYear();

    const mes =
      fechaActual.getMonth();

    monthTitle!.textContent =
      `${obtenerNombreMes(mes)} ${año}`;

    const primerDia =
      new Date(año, mes, 1);

    const ultimoDia =
      new Date(año, mes + 1, 0);

    let diaSemana =
      primerDia.getDay();

    diaSemana =
      diaSemana === 0
        ? 6
        : diaSemana - 1;

    const totalDias =
      ultimoDia.getDate();

    const eventos =
      leerEventos();

    let html = "";

    // DÍAS ANTERIORES

    for (
      let i = 0;
      i < diaSemana;
      i++
    ) {

      const fechaAnterior =
        new Date(
          año,
          mes,
          -diaSemana + i + 1
        );

      html += `
        <button
          type="button"
          class="calendar-day other-month"
          disabled
        >
          <span class="day-number">
            ${fechaAnterior.getDate()}
          </span>
        </button>
      `;
    }

    // DÍAS DEL MES

    for (
      let dia = 1;
      dia <= totalDias;
      dia++
    ) {

      const fecha =
        `${año}-${String(
          mes + 1
        ).padStart(
          2,
          "0"
        )}-${String(
          dia
        ).padStart(
          2,
          "0"
        )}`;

      const eventosDelDia =
        eventos.filter(
          (evento) =>
            evento.fecha === fecha
        );

      const tieneEventos =
        eventosDelDia.length > 0;

      const hoy =
        new Date();

      const esHoy =
        hoy.getFullYear() === año &&
        hoy.getMonth() === mes &&
        hoy.getDate() === dia;

      const seleccionado =
        fecha === fechaSeleccionada;

      html += `
        <button
          type="button"
          class="calendar-day
            ${esHoy ? "today" : ""}
            ${seleccionado ? "selected" : ""}
            ${tieneEventos ? "has-events" : ""}
          "
          data-calendar-date="${fecha}"
          title="${
            tieneEventos
              ? `${eventosDelDia.length} evento(s)`
              : "Sin eventos"
          }"
        >

          <span class="day-number">
            ${dia}
          </span>

          ${
            tieneEventos
              ? `
                <span
                  class="calendar-event-dot"
                  aria-label="Tiene eventos"
                ></span>
              `
              : ""
          }

        </button>
      `;
    }

    // COMPLETAR ÚLTIMA SEMANA

    const totalCeldas =
      diaSemana + totalDias;

    const celdasRestantes =
      totalCeldas % 7 === 0
        ? 0
        : 7 - (totalCeldas % 7);

    for (
      let i = 1;
      i <= celdasRestantes;
      i++
    ) {

      html += `
        <button
          type="button"
          class="calendar-day other-month"
          disabled
        >
          <span class="day-number">
            ${i}
          </span>
        </button>
      `;
    }

    calendarDays!.innerHTML =
      html;

    // EVENTOS CLICK

    calendarDays!
      .querySelectorAll<HTMLButtonElement>(
        "[data-calendar-date]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const fecha =
              boton.dataset.calendarDate;

            if (!fecha) {
              return;
            }

            fechaSeleccionada =
              fecha;

            fechaActual =
              new Date(
                `${fecha}T12:00:00`
              );

            renderizarCalendario();
            renderizarProximosEventos();
            actualizarResumen();

            if (campoFecha) {
              campoFecha.value =
                fecha;
            }
          }
        );

      });

    renderizarEventosDelDia();
    actualizarEtiquetaFecha();
  }

  // =======================================================
  // ETIQUETA FECHA
  // =======================================================

  function actualizarEtiquetaFecha(): void {

    if (!selectedLabel) {
      return;
    }

    selectedLabel.textContent =
      `Fecha seleccionada: ${formatearFecha(
        fechaSeleccionada
      )}`;
  }

  // =======================================================
  // EVENTOS DEL DÍA
  // =======================================================

  function renderizarEventosDelDia(): void {

    if (!selectedDayEvents) {
      return;
    }

    const eventos =
      leerEventos();

    const eventosDelDia =
      eventos.filter(
        (evento) =>
          evento.fecha ===
          fechaSeleccionada
      );

    if (selectedEventCount) {
      selectedEventCount.textContent =
        String(eventosDelDia.length);
    }

    if (
      eventosDelDia.length === 0
    ) {

      selectedDayEvents.innerHTML = `
        <div class="calendar-empty">

          <div class="calendar-empty-icon">
            📅
          </div>

          <strong>
            No hay eventos
          </strong>

          <p>
            No tienes actividades programadas para esta fecha.
          </p>

        </div>
      `;

      return;
    }

    eventosDelDia.sort(
      (a, b) =>
        a.hora.localeCompare(
          b.hora
        )
    );

    selectedDayEvents.innerHTML = `
      <div class="selected-date-badge">
        ${formatearFecha(
          fechaSeleccionada
        )}
      </div>

      <div class="calendar-day-events">

        ${eventosDelDia
          .map(
            (evento) => `
              <div
                class="calendar-event-card ${obtenerClaseTipo(
                  evento.tipo
                )}"
              >

                <div class="calendar-event-card-top">

                  <span class="calendar-event-time">
                    ${escaparHTML(
                      evento.hora
                    )}
                  </span>

                  <span class="calendar-event-type">
                    ${escaparHTML(
                      evento.tipo
                    )}
                  </span>

                </div>

                <strong class="calendar-event-title">
                  ${escaparHTML(
                    evento.titulo
                  )}
                </strong>

                ${
                  evento.cliente
                    ? `
                      <div class="calendar-event-client">
                        👤 ${escaparHTML(
                          evento.cliente
                        )}
                      </div>
                    `
                    : ""
                }

                ${
                  evento.descripcion
                    ? `
                      <p class="calendar-event-description">
                        ${escaparHTML(
                          evento.descripcion
                        )}
                      </p>
                    `
                    : ""
                }

                ${
                  esAdmin
                    ? `
                      <div
                        style="
                          display:flex;
                          gap:8px;
                          margin-top:12px;
                        "
                      >

                        <button
                          type="button"
                          class="calendar-secondary-btn"
                          data-edit-event="${evento.id}"
                        >
                          ✏️ Editar
                        </button>

                        <button
                          type="button"
                          class="calendar-delete-event"
                          data-delete-event="${evento.id}"
                          title="Eliminar evento"
                          aria-label="Eliminar evento"
                        >
                          ×
                        </button>

                      </div>
                    `
                    : ""
                }

              </div>
            `
          )
          .join("")}

      </div>
    `;

    // EDITAR

    selectedDayEvents
      .querySelectorAll<HTMLButtonElement>(
        "[data-edit-event]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const id =
              boton.dataset.editEvent;

            if (!id) {
              return;
            }

            editarEvento(id);
          }
        );

      });

    // ELIMINAR

    selectedDayEvents
      .querySelectorAll<HTMLButtonElement>(
        "[data-delete-event]"
      )
      .forEach((boton) => {

        boton.addEventListener(
          "click",
          () => {

            const id =
              boton.dataset.deleteEvent;

            if (!id) {
              return;
            }

            eliminarEvento(id);
          }
        );

      });
  }

  // =======================================================
  // PRÓXIMOS EVENTOS
  // =======================================================

  function renderizarProximosEventos(): void {

    if (!upcomingEvents) {
      return;
    }

    const eventos =
      leerEventos();

    const ahora =
      new Date();

    const proximos =
      eventos
        .filter((evento) => {

          const fechaEvento =
            obtenerFechaEvento(evento);

          return fechaEvento >= ahora;
        })
        .sort((a, b) => {

          return (
            obtenerFechaEvento(a).getTime() -
            obtenerFechaEvento(b).getTime()
          );
        })
        .slice(0, 5);

    if (
      proximos.length === 0
    ) {

      upcomingEvents.innerHTML = `
        <div class="calendar-empty small">

          <div class="calendar-empty-icon">
            📅
          </div>

          <strong>
            No hay próximos eventos
          </strong>

          <p>
            Los próximos eventos aparecerán aquí.
          </p>

        </div>
      `;

      return;
    }

    upcomingEvents.innerHTML =
      proximos
        .map((evento) => {

          const partes =
            evento.fecha.split("-");

          const dia =
            partes[2];

          const mes =
            obtenerNombreMes(
              Number(partes[1]) - 1
            )
              .substring(0, 3)
              .toUpperCase();

          return `
            <div
              class="upcoming-event"
              data-upcoming-date="${evento.fecha}"
            >

              <div class="upcoming-date">

                <strong>
                  ${escaparHTML(dia)}
                </strong>

                <span>
                  ${escaparHTML(mes)}
                </span>

              </div>

              <div class="upcoming-info">

                <strong>
                  ${escaparHTML(
                    evento.titulo
                  )}
                </strong>

                <span>
                  ${escaparHTML(
                    evento.hora
                  )}
                  ·
                  ${escaparHTML(
                    evento.tipo
                  )}
                </span>

                ${
                  evento.cliente
                    ? `
                      <small>
                        👤 ${escaparHTML(
                          evento.cliente
                        )}
                      </small>
                    `
                    : ""
                }

              </div>

              <span class="upcoming-arrow">
                →
              </span>

            </div>
          `;
        })
        .join("");

    upcomingEvents
      .querySelectorAll<HTMLElement>(
        "[data-upcoming-date]"
      )
      .forEach((elemento) => {

        elemento.addEventListener(
          "click",
          () => {

            const fecha =
              elemento.dataset.upcomingDate;

            if (!fecha) {
              return;
            }

            fechaSeleccionada =
              fecha;

            fechaActual =
              new Date(
                `${fecha}T12:00:00`
              );

            renderizarCalendario();
            renderizarProximosEventos();
            actualizarResumen();

            if (campoFecha) {
              campoFecha.value =
                fecha;
            }
          }
        );

      });
  }

  // =======================================================
  // EDITAR EVENTO
  // =======================================================

  function editarEvento(
    id: string
  ): void {

    const eventos =
      leerEventos();

    const evento =
      eventos.find(
        (item) =>
          item.id === id
      );

    if (!evento) {
      return;
    }

    eventoEditandoId =
      id;

    if (campoTitulo) {
      campoTitulo.value =
        evento.titulo;
    }

    if (campoFecha) {
      campoFecha.value =
        evento.fecha;
    }

    if (campoHora) {
      campoHora.value =
        evento.hora;
    }

    if (campoTipo) {
      campoTipo.value =
        evento.tipo;
    }

    if (campoCliente) {
      campoCliente.value =
        evento.cliente || "";
    }

    if (campoCorreo) {
      campoCorreo.value =
        evento.correoCliente || "";
    }

    if (campoDescripcion) {
      campoDescripcion.value =
        evento.descripcion || "";
    }

    if (formularioTitulo) {
      formularioTitulo.textContent =
        "Editar evento";
    }

    if (formularioDescripcion) {
      formularioDescripcion.textContent =
        "Modifica la información del evento seleccionado.";
    }

    if (botonGuardar) {
      botonGuardar.innerHTML =
        "<span>✓</span> Actualizar evento";
    }

    if (botonCancelarEdicion) {
      botonCancelarEdicion.style.display =
        "inline-flex";
    }

    formulario?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      campoTitulo?.focus();
    }, 400);
  }

  // =======================================================
  // CANCELAR EDICIÓN
  // =======================================================

  function cancelarEdicion(): void {

    eventoEditandoId =
      null;

    calendarForm?.reset();

    if (formularioTitulo) {
      formularioTitulo.textContent =
        "Crear nuevo evento";
    }

    if (formularioDescripcion) {
      formularioDescripcion.textContent =
        "Agrega una reunión, cita o actividad al calendario.";
    }

    if (botonGuardar) {
      botonGuardar.innerHTML =
        "<span>+</span> Guardar evento";
    }

    if (botonCancelarEdicion) {
      botonCancelarEdicion.style.display =
        "none";
    }

    if (campoFecha) {
      campoFecha.value =
        fechaSeleccionada;
    }

    if (campoHora) {
      campoHora.value =
        "09:00";
    }
  }

  // =======================================================
  // ELIMINAR EVENTO
  // =======================================================

  function eliminarEvento(
    id: string
  ): void {

    const eventos =
      leerEventos();

    const evento =
      eventos.find(
        (item) =>
          item.id === id
      );

    if (!evento) {
      return;
    }

    const confirmar =
      window.confirm(
        `¿Deseas eliminar el evento "${evento.titulo}"?`
      );

    if (!confirmar) {
      return;
    }

    const nuevosEventos =
      eventos.filter(
        (item) =>
          item.id !== id
      );

    guardarEventos(
      nuevosEventos
    );

    if (eventoEditandoId === id) {
      cancelarEdicion();
    }

    renderizarCalendario();
    renderizarProximosEventos();
    actualizarResumen();

    alert(
      "El evento se eliminó correctamente."
    );
  }

  // =======================================================
  // MES ANTERIOR
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#calPrev"
    )
    ?.addEventListener(
      "click",
      () => {

        fechaActual =
          new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth() - 1,
            1
          );

        fechaSeleccionada =
          `${fechaActual.getFullYear()}-${String(
            fechaActual.getMonth() + 1
          ).padStart(
            2,
            "0"
          )}-01`;

        renderizarCalendario();
        renderizarProximosEventos();
        actualizarResumen();

        if (campoFecha) {
          campoFecha.value =
            fechaSeleccionada;
        }
      }
    );

  // =======================================================
  // MES SIGUIENTE
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#calNext"
    )
    ?.addEventListener(
      "click",
      () => {

        fechaActual =
          new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth() + 1,
            1
          );

        fechaSeleccionada =
          `${fechaActual.getFullYear()}-${String(
            fechaActual.getMonth() + 1
          ).padStart(
            2,
            "0"
          )}-01`;

        renderizarCalendario();
        renderizarProximosEventos();
        actualizarResumen();

        if (campoFecha) {
          campoFecha.value =
            fechaSeleccionada;
        }
      }
    );

  // =======================================================
  // BOTÓN HOY
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#calToday"
    )
    ?.addEventListener(
      "click",
      () => {

        const hoy =
          new Date();

        fechaActual =
          new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            1
          );

        fechaSeleccionada =
          `${hoy.getFullYear()}-${String(
            hoy.getMonth() + 1
          ).padStart(
            2,
            "0"
          )}-${String(
            hoy.getDate()
          ).padStart(
            2,
            "0"
          )}`;

        renderizarCalendario();
        renderizarProximosEventos();
        actualizarResumen();

        if (campoFecha) {
          campoFecha.value =
            fechaSeleccionada;
        }
      }
    );

  // =======================================================
  // NUEVO EVENTO
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#btnNuevoEvento"
    )
    ?.addEventListener(
      "click",
      () => {

        cancelarEdicion();

        if (formulario) {
          formulario.style.display =
            "";
        }

        formulario?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setTimeout(() => {
          campoTitulo?.focus();
        }, 400);
      }
    );

  // =======================================================
  // CERRAR FORMULARIO
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#calCerrarFormulario"
    )
    ?.addEventListener(
      "click",
      () => {

        if (formulario) {
          formulario.style.display =
            "none";
        }

        cancelarEdicion();
      }
    );

  // =======================================================
  // CANCELAR EDICIÓN
  // =======================================================

  botonCancelarEdicion?.addEventListener(
    "click",
    () => {
      cancelarEdicion();
    }
  );

  // =======================================================
  // CREAR / ACTUALIZAR EVENTO
  // =======================================================

  calendarForm?.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const titulo =
        campoTitulo?.value.trim();

      const fecha =
        campoFecha?.value;

      const hora =
        campoHora?.value;

      const tipo =
        campoTipo?.value;

      const cliente =
        campoCliente?.value.trim();

      const correoCliente =
        campoCorreo?.value.trim();

      const descripcion =
        campoDescripcion?.value.trim();

      if (
        !titulo ||
        !fecha ||
        !hora ||
        !tipo
      ) {

        alert(
          "Completa todos los campos obligatorios."
        );

        return;
      }

      const eventos =
        leerEventos();

      // ===================================================
      // EVITAR DUPLICADOS
      // ===================================================

      const duplicado =
        eventos.some(
          (evento) =>
            evento.fecha === fecha &&
            evento.hora === hora &&
            evento.id !== eventoEditandoId
        );

      if (duplicado) {

        alert(
          "Ya existe un evento programado para esa fecha y hora."
        );

        return;
      }

      // ===================================================
      // ACTUALIZAR
      // ===================================================

      if (eventoEditandoId) {

        const indice =
          eventos.findIndex(
            (evento) =>
              evento.id ===
              eventoEditandoId
          );

        if (indice !== -1) {

          eventos[indice] = {
            ...eventos[indice],
            titulo,
            fecha,
            hora,
            tipo,
            cliente,
            correoCliente,
            descripcion,
          };
        }

        guardarEventos(
          eventos
        );

        fechaSeleccionada =
          fecha;

        fechaActual =
          new Date(
            `${fecha}T12:00:00`
          );

        cancelarEdicion();

        renderizarCalendario();
        renderizarProximosEventos();
        actualizarResumen();

        alert(
          "El evento se actualizó correctamente."
        );

        return;
      }

      // ===================================================
      // CREAR
      // ===================================================

      const nuevoEvento:
        EventoCalendario = {
          id: generarId(),
          titulo,
          fecha,
          hora,
          tipo,
          cliente,
          correoCliente,
          descripcion,
        };

      eventos.push(
        nuevoEvento
      );

      guardarEventos(
        eventos
      );

      fechaSeleccionada =
        fecha;

      fechaActual =
        new Date(
          `${fecha}T12:00:00`
        );

      cancelarEdicion();

      renderizarCalendario();
      renderizarProximosEventos();
      actualizarResumen();

      alert(
        "El evento se guardó correctamente."
      );
    }
  );

  // =======================================================
  // LIMPIAR FORMULARIO
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#calLimpiar"
    )
    ?.addEventListener(
      "click",
      () => {

        cancelarEdicion();

        if (campoFecha) {
          campoFecha.value =
            fechaSeleccionada;
        }

        if (campoHora) {
          campoHora.value =
            "09:00";
        }
      }
    );

  // =======================================================
  // NOTIFICACIONES
  // =======================================================

  app
    .querySelector<HTMLButtonElement>(
      "#calNotifications"
    )
    ?.addEventListener(
      "click",
      () => {

        if (esAdmin) {

          window.dispatchEvent(
            new CustomEvent(
              "karsan:navegar-admin",
              {
                detail: {
                  seccion:
                    "notificaciones",
                },
              }
            )
          );

        } else {

          window.dispatchEvent(
            new CustomEvent(
              "karsan:navegar-cliente",
              {
                detail: {
                  seccion:
                    "notificaciones",
                },
              }
            )
          );
        }
      }
    );

  // =======================================================
  // EVENTO DE CALENDARIO CARGADO
  // =======================================================

  window.dispatchEvent(
    new CustomEvent(
      "karsan:calendario-cargado",
      {
        detail: {
          tipoUsuario,
        },
      }
    )
  );

  // =======================================================
  // INICIALIZAR
  // =======================================================

  renderizarCalendario();
  renderizarProximosEventos();
  actualizarResumen();
}