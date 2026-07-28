import { mostrarLogin } from './Login'

type Cliente = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  contrasena: string
  rol: 'cliente'
}

export function mostrarRegistro(app: HTMLDivElement): void {
  app.innerHTML = `
    <main class="login-page">
      <section class="login-card">
        <div class="login-logo">
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
              required
            />
          </div>

          <div class="form-group">
            <label for="apellido">Apellido</label>
            <input
              id="apellido"
              type="text"
              placeholder="Ingrese su apellido"
              required
            />
          </div>

          <div class="form-group">
            <label for="correo-registro">Correo electrónico</label>
            <input
              id="correo-registro"
              type="email"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input
              id="telefono"
              type="tel"
              placeholder="0999999999"
              required
            />
          </div>

          <div class="form-group">
            <label for="contrasena-registro">Contraseña</label>
            <input
              id="contrasena-registro"
              type="password"
              placeholder="Mínimo 6 caracteres"
              minlength="6"
              required
            />
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
              required
            />
          </div>

          <p id="mensaje-registro" class="mensaje-login"></p>

          <button type="submit" class="btn-login">
            Registrarme
          </button>
        </form>

        <button id="volver-login" class="btn-registro" type="button">
          Volver al inicio de sesión
        </button>
      </section>
    </main>
  `

  activarRegistro(app)
}

function activarRegistro(app: HTMLDivElement): void {
  const formulario =
    document.querySelector<HTMLFormElement>('#registro-form')

  const mensaje =
    document.querySelector<HTMLParagraphElement>('#mensaje-registro')

  const botonVolver =
    document.querySelector<HTMLButtonElement>('#volver-login')

  formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nombre =
      document.querySelector<HTMLInputElement>('#nombre')?.value.trim() ?? ''

    const apellido =
      document.querySelector<HTMLInputElement>('#apellido')?.value.trim() ?? ''

    const correo =
      document
        .querySelector<HTMLInputElement>('#correo-registro')
        ?.value.trim()
        .toLowerCase() ?? ''

    const telefono =
      document.querySelector<HTMLInputElement>('#telefono')?.value.trim() ?? ''

    const contrasena =
      document.querySelector<HTMLInputElement>('#contrasena-registro')
        ?.value ?? ''

    const confirmarContrasena =
      document.querySelector<HTMLInputElement>('#confirmar-contrasena')
        ?.value ?? ''

    if (contrasena !== confirmarContrasena) {
      mostrarMensaje(mensaje, 'Las contraseñas no coinciden.', true)
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

    const clientes = obtenerClientes()

    const correoExiste = clientes.some(
      (cliente) => cliente.correo === correo,
    )

    if (correoExiste) {
      mostrarMensaje(
        mensaje,
        'Ya existe una cuenta con ese correo.',
        true,
      )
      return
    }

    const nuevoCliente: Cliente = {
      id: crypto.randomUUID(),
      nombre,
      apellido,
      correo,
      telefono,
      contrasena,
      rol: 'cliente',
    }

    clientes.push(nuevoCliente)

    localStorage.setItem('clientes', JSON.stringify(clientes))

    mostrarMensaje(
      mensaje,
      'Cuenta creada correctamente. Ya puede iniciar sesión.',
      false,
    )

    formulario.reset()

    setTimeout(() => {
      mostrarLogin(app)
    }, 1500)
  })

  botonVolver?.addEventListener('click', () => {
    mostrarLogin(app)
  })
}

function obtenerClientes(): Cliente[] {
  const datos = localStorage.getItem('clientes')

  if (!datos) {
    return []
  }

  try {
    return JSON.parse(datos) as Cliente[]
  } catch {
    return []
  }
}

function mostrarMensaje(
  elemento: HTMLParagraphElement | null,
  texto: string,
  esError: boolean,
): void {
  if (!elemento) {
    return
  }

  elemento.textContent = texto
  elemento.classList.toggle('mensaje-error', esError)
  elemento.classList.toggle('mensaje-exito', !esError)
}