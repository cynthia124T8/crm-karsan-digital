import { mostrarDashboardAdmin } from './DashboardAdmin'
import { mostrarDashboardCliente } from './DashboardCliente'
import { mostrarRegistro } from './Register'

type Cliente = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  contrasena: string
  rol: 'cliente'
}

export function mostrarLogin(app: HTMLDivElement): void {
  app.innerHTML = `
    <main class="login-page">
      <section class="login-card">
        <div class="login-logo">
          <h1>Karsan Digital</h1>
          <p>CRM de gestión de clientes</p>
        </div>

        <form id="login-form" class="login-form">
          <div class="form-group">
            <label for="correo">Correo electrónico</label>

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
            <label for="contrasena">Contraseña</label>

            <input
              id="contrasena"
              name="contrasena"
              type="password"
              placeholder="Ingrese su contraseña"
              autocomplete="current-password"
              required
            />
          </div>

          <p id="mensaje-login" class="mensaje-login"></p>

          <button type="submit" class="btn-login">
            Iniciar sesión
          </button>
        </form>

        <button id="btn-registro" class="btn-registro" type="button">
          Crear una cuenta
        </button>
      </section>
    </main>
  `

  activarLogin(app)
}

function activarLogin(app: HTMLDivElement): void {
  const formulario =
    document.querySelector<HTMLFormElement>('#login-form')

  const mensaje =
    document.querySelector<HTMLParagraphElement>('#mensaje-login')

  const botonRegistro =
    document.querySelector<HTMLButtonElement>('#btn-registro')

  formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const correo =
      document.querySelector<HTMLInputElement>('#correo')
        ?.value.trim()
        .toLowerCase() ?? ''

    const contrasena =
      document.querySelector<HTMLInputElement>('#contrasena')
        ?.value ?? ''

    if (
      correo === 'admin@karsandigital.com' &&
      contrasena === 'Admin123'
    ) {
      localStorage.setItem(
        'usuarioActivo',
        JSON.stringify({
          nombre: 'Administrador',
          correo,
          rol: 'administrador',
        }),
      )

      mostrarDashboardAdmin(app)
      return
    }

    const clientes = obtenerClientes()

    const clienteEncontrado = clientes.find(
      (cliente) =>
        cliente.correo === correo &&
        cliente.contrasena === contrasena,
    )

    if (clienteEncontrado) {
      localStorage.setItem(
        'usuarioActivo',
        JSON.stringify({
          id: clienteEncontrado.id,
          nombre: `${clienteEncontrado.nombre} ${clienteEncontrado.apellido}`,
          correo: clienteEncontrado.correo,
          rol: clienteEncontrado.rol,
        }),
      )

      mostrarDashboardCliente(app)
      return
    }

    if (mensaje) {
      mensaje.textContent = 'Correo o contraseña incorrectos.'
      mensaje.classList.remove('mensaje-exito')
      mensaje.classList.add('mensaje-error')
    }
  })

  botonRegistro?.addEventListener('click', () => {
    mostrarRegistro(app)
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