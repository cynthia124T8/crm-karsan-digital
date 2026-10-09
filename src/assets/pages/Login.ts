import { mostrarDashboardAdmin } from './DashboardAdmin'
import { mostrarDashboardCliente } from './DashboardCliente'
import { mostrarRegistro } from './Register'

const API_URL = 'http://localhost:3002'

type UsuarioLogin = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  rol: string
  foto: string
}

type RespuestaLogin = {
  mensaje: string
  token?: string
  usuario?: UsuarioLogin
}

export function mostrarLogin(app: HTMLDivElement): void {
  app.innerHTML = `
    <main class="login-page">
      <section class="login-card">

        <div class="login-brand">
          <h1>Karsan Digital</h1>
          <p>CRM de gestión de clientes</p>
        </div>

        <form id="login-form" class="login-form">

          <div class="form-group">
            <label for="correo">
              Correo electrónico
            </label>

            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="ejemplo@correo.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="contrasena">
              Contraseña
            </label>

            <div class="password-field">
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                placeholder="Ingrese su contraseña"
                autocomplete="current-password"
                required
              />

              <button
                id="mostrar-contrasena"
                class="btn-ver-contrasena"
                type="button"
                aria-label="Mostrar contraseña"
              >
                👁️
              </button>
            </div>
          </div>

          <div class="login-opciones">

            <label class="recordarme">
              <input
                id="recordarme"
                type="checkbox"
              />
              Recordarme
            </label>

            <button
              id="olvide-contrasena"
              class="btn-link"
              type="button"
            >
              ¿Olvidaste tu contraseña?
            </button>

          </div>

          <p
            id="mensaje-login"
            class="mensaje-login"
          ></p>

          <button
            id="btn-iniciar-sesion"
            type="submit"
            class="btn-login"
          >
            Iniciar sesión
          </button>

        </form>

        <button
          id="btn-registro"
          class="btn-registro"
          type="button"
        >
          Crear una cuenta
        </button>

      </section>
    </main>
  `

  activarLogin(app)
}

function activarLogin(app: HTMLDivElement): void {
  const formulario =
    document.querySelector<HTMLFormElement>(
      '#login-form',
    )

  const mensaje =
    document.querySelector<HTMLParagraphElement>(
      '#mensaje-login',
    )

  const botonRegistro =
    document.querySelector<HTMLButtonElement>(
      '#btn-registro',
    )

  const botonMostrarContrasena =
    document.querySelector<HTMLButtonElement>(
      '#mostrar-contrasena',
    )

  const botonOlvideContrasena =
    document.querySelector<HTMLButtonElement>(
      '#olvide-contrasena',
    )

  const botonIniciarSesion =
    document.querySelector<HTMLButtonElement>(
      '#btn-iniciar-sesion',
    )

  const campoCorreo =
    document.querySelector<HTMLInputElement>(
      '#correo',
    )

  const correoRecordado =
    localStorage.getItem('correoRecordado')

  if (correoRecordado && campoCorreo) {
    campoCorreo.value = correoRecordado
  }

  botonMostrarContrasena?.addEventListener(
    'click',
    () => {
      const campo =
        document.querySelector<HTMLInputElement>(
          '#contrasena',
        )

      if (!campo) {
        return
      }

      if (campo.type === 'password') {
        campo.type = 'text'
        botonMostrarContrasena.textContent = '🙈'
      } else {
        campo.type = 'password'
        botonMostrarContrasena.textContent = '👁️'
      }
    },
  )

  formulario?.addEventListener(
    'submit',
    async (evento) => {
      evento.preventDefault()

      const correo =
        document
          .querySelector<HTMLInputElement>(
            '#correo',
          )
          ?.value
          .trim()
          .toLowerCase() ?? ''

      const contrasena =
        document
          .querySelector<HTMLInputElement>(
            '#contrasena',
          )
          ?.value ?? ''

      const recordar =
        document.querySelector<HTMLInputElement>(
          '#recordarme',
        )?.checked ?? false

      if (!correo || !contrasena) {
        mostrarMensaje(
          mensaje,
          'Completa el correo y la contraseña.',
          false,
        )

        return
      }

      botonIniciarSesion?.setAttribute(
        'disabled',
        'true',
      )

      if (botonIniciarSesion) {
        botonIniciarSesion.textContent =
          'Iniciando sesión...'
      }

      mostrarMensaje(
        mensaje,
        'Verificando datos...',
        true,
      )

      try {
        const respuesta = await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              correo,
              contrasena,
            }),
          },
        )

        const datos =
          (await respuesta.json()) as RespuestaLogin

        if (
          !respuesta.ok ||
          !datos.usuario ||
          !datos.token
        ) {
          mostrarMensaje(
            mensaje,
            datos.mensaje ||
              'Correo o contraseña incorrectos.',
            false,
          )

          return
        }

        localStorage.setItem(
          'token',
          datos.token,
        )

        localStorage.setItem(
          'usuarioActivo',
          JSON.stringify(datos.usuario),
        )

        if (recordar) {
          localStorage.setItem(
            'correoRecordado',
            correo,
          )
        } else {
          localStorage.removeItem(
            'correoRecordado',
          )
        }

        if (
          datos.usuario.rol ===
          'administrador'
        ) {
          mostrarDashboardAdmin(app)
          return
        }

        if (
          datos.usuario.rol ===
          'cliente'
        ) {
          mostrarDashboardCliente(app)
          return
        }

        if (
          datos.usuario.rol ===
          'asesor'
        ) {
          mostrarMensaje(
            mensaje,
            'El panel del asesor todavía está en desarrollo.',
            false,
          )

          return
        }

        mostrarMensaje(
          mensaje,
          'El usuario tiene un rol no reconocido.',
          false,
        )
      } catch (error) {
        console.error(error)

        mostrarMensaje(
          mensaje,
          'No se pudo conectar con el servidor. Verifica que el backend esté encendido en el puerto 3002.',
          false,
        )
      } finally {
        botonIniciarSesion?.removeAttribute(
          'disabled',
        )

        if (botonIniciarSesion) {
          botonIniciarSesion.textContent =
            'Iniciar sesión'
        }
      }
    },
  )

  botonRegistro?.addEventListener(
    'click',
    () => {
      mostrarRegistro(app)
    },
  )

  botonOlvideContrasena?.addEventListener(
    'click',
    () => {
      mostrarRecuperacionTemporal(app)
    },
  )
}

function mostrarRecuperacionTemporal(
  app: HTMLDivElement,
): void {
  app.innerHTML = `
    <main class="login-page">

      <section class="login-card">

        <div class="login-brand">
          <h1>Recuperar contraseña</h1>

          <p>
            Ingresa tu correo electrónico
          </p>
        </div>

        <form
          id="form-recuperacion"
          class="login-form"
        >

          <div class="form-group">

            <label for="correo-recuperacion">
              Correo electrónico
            </label>

            <input
              id="correo-recuperacion"
              type="email"
              placeholder="ejemplo@correo.com"
              required
            />

          </div>

          <p
            id="mensaje-recuperacion"
            class="mensaje-login"
          ></p>

          <button
            class="btn-login"
            type="submit"
          >
            Enviar código
          </button>

        </form>

        <button
          id="volver-login"
          class="btn-registro"
          type="button"
        >
          ← Volver al inicio de sesión
        </button>

      </section>

    </main>
  `

  const formulario =
    document.querySelector<HTMLFormElement>(
      '#form-recuperacion',
    )

  const mensaje =
    document.querySelector<HTMLParagraphElement>(
      '#mensaje-recuperacion',
    )

  formulario?.addEventListener(
    'submit',
    (evento) => {
      evento.preventDefault()

      const correo =
        document
          .querySelector<HTMLInputElement>(
            '#correo-recuperacion',
          )
          ?.value
          .trim()
          .toLowerCase() ?? ''

      if (!correo) {
        mostrarMensaje(
          mensaje,
          'Ingresa tu correo electrónico.',
          false,
        )

        return
      }

      mostrarMensaje(
        mensaje,
        'La recuperación por correo será conectada en el siguiente paso.',
        true,
      )
    },
  )

  document
    .querySelector<HTMLButtonElement>(
      '#volver-login',
    )
    ?.addEventListener(
      'click',
      () => {
        mostrarLogin(app)
      },
    )
}

function mostrarMensaje(
  elemento:
    | HTMLParagraphElement
    | null,
  texto: string,
  exito: boolean,
): void {
  if (!elemento) {
    return
  }

  elemento.textContent = texto

  elemento.classList.toggle(
    'mensaje-exito',
    exito,
  )

  elemento.classList.toggle(
    'mensaje-error',
    !exito,
  )
}