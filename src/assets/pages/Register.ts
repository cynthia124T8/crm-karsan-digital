import { mostrarLogin } from './Login'

const API_URL = 'http://localhost:3002'

type RespuestaRegistro = {
  mensaje: string
}

export function mostrarRegistro(app: HTMLDivElement): void {
  app.innerHTML = `
    <main class="login-page">
      <section class="login-card">

        <div class="login-brand">
          <h1>Crear cuenta</h1>
          <p>Registro de cliente para Karsan Digital</p>
        </div>

        <form id="registro-form" class="login-form">

          <div class="form-group">
            <label for="nombre">Nombre</label>

            <input
              id="nombre"
              type="text"
              placeholder="Ingrese su nombre"
              autocomplete="given-name"
              required
            />
          </div>

          <div class="form-group">
            <label for="apellido">Apellido</label>

            <input
              id="apellido"
              type="text"
              placeholder="Ingrese su apellido"
              autocomplete="family-name"
              required
            />
          </div>

          <div class="form-group">
            <label for="correo-registro">
              Correo electrónico
            </label>

            <input
              id="correo-registro"
              type="email"
              placeholder="ejemplo@correo.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="telefono">Teléfono</label>

            <input
              id="telefono"
              type="tel"
              placeholder="0999999999"
              maxlength="10"
              autocomplete="tel"
              required
            />
          </div>

          <div class="form-group">
            <label for="contrasena-registro">
              Contraseña
            </label>

            <div class="password-field">
              <input
                id="contrasena-registro"
                type="password"
                placeholder="Mínimo 6 caracteres"
                minlength="6"
                autocomplete="new-password"
                required
              />

              <button
                id="mostrar-contrasena-registro"
                type="button"
                class="btn-ver-contrasena"
              >
                👁️
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmar-contrasena">
              Confirmar contraseña
            </label>

            <input
              id="confirmar-contrasena"
              type="password"
              placeholder="Repita la contraseña"
              minlength="6"
              autocomplete="new-password"
              required
            />
          </div>

          <p
            id="mensaje-registro"
            class="mensaje-login"
          ></p>

          <button
            id="btn-registrar"
            type="submit"
            class="btn-login"
          >
            Registrarme
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

  activarRegistro(app)
}

function activarRegistro(app: HTMLDivElement): void {
  const formulario =
    document.querySelector<HTMLFormElement>(
      '#registro-form',
    )

  const mensaje =
    document.querySelector<HTMLParagraphElement>(
      '#mensaje-registro',
    )

  const botonVolver =
    document.querySelector<HTMLButtonElement>(
      '#volver-login',
    )

  const botonRegistrar =
    document.querySelector<HTMLButtonElement>(
      '#btn-registrar',
    )

  const botonMostrar =
    document.querySelector<HTMLButtonElement>(
      '#mostrar-contrasena-registro',
    )

  botonMostrar?.addEventListener('click', () => {
    const contrasena =
      document.querySelector<HTMLInputElement>(
        '#contrasena-registro',
      )

    const confirmar =
      document.querySelector<HTMLInputElement>(
        '#confirmar-contrasena',
      )

    if (!contrasena || !confirmar) {
      return
    }

    const mostrar =
      contrasena.type === 'password'

    contrasena.type =
      mostrar ? 'text' : 'password'

    confirmar.type =
      mostrar ? 'text' : 'password'

    botonMostrar.textContent =
      mostrar ? '🙈' : '👁️'
  })

  formulario?.addEventListener(
    'submit',
    async (evento) => {
      evento.preventDefault()

      const nombre =
        document
          .querySelector<HTMLInputElement>(
            '#nombre',
          )
          ?.value.trim() ?? ''

      const apellido =
        document
          .querySelector<HTMLInputElement>(
            '#apellido',
          )
          ?.value.trim() ?? ''

      const correo =
        document
          .querySelector<HTMLInputElement>(
            '#correo-registro',
          )
          ?.value.trim()
          .toLowerCase() ?? ''

      const telefono =
        document
          .querySelector<HTMLInputElement>(
            '#telefono',
          )
          ?.value.trim() ?? ''

      const contrasena =
        document
          .querySelector<HTMLInputElement>(
            '#contrasena-registro',
          )
          ?.value ?? ''

      const confirmarContrasena =
        document
          .querySelector<HTMLInputElement>(
            '#confirmar-contrasena',
          )
          ?.value ?? ''

      if (
        !nombre ||
        !apellido ||
        !correo ||
        !telefono ||
        !contrasena
      ) {
        mostrarMensaje(
          mensaje,
          'Completa todos los campos.',
          true,
        )
        return
      }

      if (
        contrasena !==
        confirmarContrasena
      ) {
        mostrarMensaje(
          mensaje,
          'Las contraseñas no coinciden.',
          true,
        )
        return
      }

      if (contrasena.length < 6) {
        mostrarMensaje(
          mensaje,
          'La contraseña debe tener mínimo 6 caracteres.',
          true,
        )
        return
      }

      if (!/^[0-9]{10}$/.test(telefono)) {
        mostrarMensaje(
          mensaje,
          'El teléfono debe contener exactamente 10 números.',
          true,
        )
        return
      }

      botonRegistrar?.setAttribute(
        'disabled',
        'true',
      )

      if (botonRegistrar) {
        botonRegistrar.textContent =
          'Creando cuenta...'
      }

      try {
        const respuesta = await fetch(
          `${API_URL}/api/auth/register`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              nombre,
              apellido,
              correo,
              telefono,
              contrasena,
            }),
          },
        )

        const datos =
          (await respuesta.json()) as RespuestaRegistro

        if (!respuesta.ok) {
          mostrarMensaje(
            mensaje,
            datos.mensaje ||
              'No se pudo crear la cuenta.',
            true,
          )

          return
        }

        mostrarMensaje(
          mensaje,
          'Cuenta creada correctamente. Ya puedes iniciar sesión.',
          false,
        )

        formulario.reset()

        setTimeout(() => {
          mostrarLogin(app)
        }, 1500)
      } catch (error) {
        console.error(error)

        mostrarMensaje(
          mensaje,
          'No se pudo conectar con el servidor. Verifica que el backend esté encendido en el puerto 3002.',
          true,
        )
      } finally {
        botonRegistrar?.removeAttribute(
          'disabled',
        )

        if (botonRegistrar) {
          botonRegistrar.textContent =
            'Registrarme'
        }
      }
    },
  )

  botonVolver?.addEventListener(
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
  esError: boolean,
): void {
  if (!elemento) {
    return
  }

  elemento.textContent = texto

  elemento.classList.toggle(
    'mensaje-error',
    esError,
  )

  elemento.classList.toggle(
    'mensaje-exito',
    !esError,
  )
}