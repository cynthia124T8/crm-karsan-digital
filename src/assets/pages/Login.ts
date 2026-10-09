import "../styles/login.css";

export function mostrarLogin(app: HTMLElement) {
  app.innerHTML = `
    <div class="login-page">
      <div class="login-container">

        <!-- PARTE IZQUIERDA -->
        <section class="login-info">

          <div class="login-brand">
            <div class="brand-icon">K</div>

            <div class="brand-text">
              <h1>KARSAN</h1>
              <span>DIGITAL</span>
            </div>
          </div>

          <div class="login-info-content">

            <span class="welcome-small">BIENVENIDO</span>

            <h2>
              Gestiona tu negocio,
              <span>hazlo crecer.</span>
            </h2>

            <p class="login-description">
              KARSAN Digital te brinda las herramientas necesarias
              para organizar, gestionar y hacer crecer tu negocio
              desde un solo lugar.
            </p>

            <div class="login-features">

              <div class="login-feature">
                <div class="feature-icon">👥</div>
                <div>
                  <strong>Clientes</strong>
                  <span>
                    Organiza y gestiona toda tu base de clientes.
                  </span>
                </div>
              </div>

              <div class="login-feature">
                <div class="feature-icon">📈</div>
                <div>
                  <strong>Ventas</strong>
                  <span>
                    Da seguimiento a cada oportunidad.
                  </span>
                </div>
              </div>

              <div class="login-feature">
                <div class="feature-icon">⚙</div>
                <div>
                  <strong>Productividad</strong>
                  <span>
                    Optimiza tu tiempo y el trabajo de tu equipo.
                  </span>
                </div>
              </div>

            </div>

            <div class="login-preview">

              <div class="preview-laptop">

                <div class="preview-top">
                  <span class="preview-logo">K</span>
                  <span>KARSAN</span>

                  <div class="preview-dots">
                    ● ● ●
                  </div>
                </div>

                <div class="preview-body">

                  <aside class="preview-sidebar">

                    <div class="preview-menu active">
                      Inicio
                    </div>

                    <div class="preview-menu">
                      Clientes
                    </div>

                    <div class="preview-menu">
                      Empresas
                    </div>

                    <div class="preview-menu">
                      Proyectos
                    </div>

                    <div class="preview-menu">
                      Marketing
                    </div>

                  </aside>

                  <div class="preview-content">

                    <h4>Bienvenido</h4>

                    <div class="preview-cards">

                      <div>
                        <small>Clientes</small>
                        <strong>128</strong>
                      </div>

                      <div>
                        <small>Proyectos</small>
                        <strong>24</strong>
                      </div>

                      <div>
                        <small>Ventas</small>
                        <strong>$12,450</strong>
                      </div>

                    </div>

                    <div class="preview-chart">
                      <div class="chart-line"></div>
                      <div class="chart-line"></div>
                      <div class="chart-line"></div>
                    </div>

                  </div>

                </div>

              </div>

              <div class="preview-phone">

                <div class="phone-top">
                  KARSAN
                </div>

                <strong>Resumen</strong>

                <div class="phone-item">
                  Clientes
                  <b>128</b>
                </div>

                <div class="phone-item">
                  Proyectos
                  <b>24</b>
                </div>

                <div class="phone-item">
                  Ventas
                  <b>$12,450</b>
                </div>

              </div>

            </div>

          </div>

          <div class="login-footer">
            © 2026 Karsan Digital
          </div>

        </section>

        <!-- FORMULARIO -->
        <section class="login-form-section">

          <div class="login-card">

            <div class="mobile-logo">

              <div class="brand-icon">
                K
              </div>

              <div>
                <strong>KARSAN</strong>
                <span>DIGITAL</span>
              </div>

            </div>

            <div class="login-title">

              <h2>
                Iniciar sesión
              </h2>

              <p>
                Ingresa a tu cuenta para continuar
              </p>

            </div>

            <form
              id="loginForm"
              class="login-form"
            >

              <div class="form-group">

                <label for="email">
                  Correo electrónico
                </label>

                <div class="input-wrapper">

                  <span class="input-icon">
                    ✉
                  </span>

                  <input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    autocomplete="email"
                    required
                  />

                </div>

              </div>

              <div class="form-group">

                <label for="password">
                  Contraseña
                </label>

                <div class="input-wrapper">

                  <span class="input-icon">
                    🔒
                  </span>

                  <input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    autocomplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    id="togglePassword"
                    class="password-toggle"
                    aria-label="Mostrar contraseña"
                  >
                    Mostrar
                  </button>

                </div>

              </div>

              <div class="login-options">

                <label class="remember-me">

                  <input
                    type="checkbox"
                    id="remember"
                  />

                  <span>
                    Recordarme
                  </span>

                </label>

                <button
                  type="button"
                  id="forgotPassword"
                  class="forgot-password"
                >
                  ¿Olvidaste tu contraseña?
                </button>

              </div>

              <div
                id="loginMessage"
                class="login-message"
              ></div>

              <button
                type="submit"
                class="login-button"
              >

                <span>
                  Iniciar sesión
                </span>

                <span class="button-arrow">
                  →
                </span>

              </button>

            </form>

            <div class="login-security">

              <span class="security-icon">
                ✓
              </span>

              <div>

                <strong>
                  Tu información está protegida
                </strong>

                <small>
                  Utilizamos medidas de seguridad para proteger tus datos.
                </small>

              </div>

            </div>

          </div>

        </section>

      </div>
    </div>
  `;

  // ============================================================
  // ELEMENTOS
  // ============================================================

  const loginForm =
    document.getElementById(
      "loginForm",
    ) as HTMLFormElement;

  const emailInput =
    document.getElementById(
      "email",
    ) as HTMLInputElement;

  const passwordInput =
    document.getElementById(
      "password",
    ) as HTMLInputElement;

  const togglePassword =
    document.getElementById(
      "togglePassword",
    ) as HTMLButtonElement;

  const loginMessage =
    document.getElementById(
      "loginMessage",
    ) as HTMLDivElement;

  const forgotPassword =
    document.getElementById(
      "forgotPassword",
    ) as HTMLButtonElement;

  // ============================================================
  // MOSTRAR / OCULTAR CONTRASEÑA
  // ============================================================

  togglePassword.addEventListener(
    "click",
    () => {
      if (
        passwordInput.type ===
        "password"
      ) {
        passwordInput.type = "text";
        togglePassword.textContent =
          "Ocultar";
      } else {
        passwordInput.type = "password";
        togglePassword.textContent =
          "Mostrar";
      }
    },
  );

  // ============================================================
  // LOGIN REAL
  // ============================================================

  loginForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const email =
        emailInput.value
          .trim()
          .toLowerCase();

      const password =
        passwordInput.value;

      if (!email || !password) {
        mostrarMensaje(
          "Completa todos los campos para iniciar sesión.",
          "error",
        );

        return;
      }

      const boton =
        loginForm.querySelector(
          ".login-button",
        ) as HTMLButtonElement;

      boton.disabled = true;

      mostrarMensaje(
        "Verificando tus datos...",
        "info",
      );

      try {
        const respuesta =
          await fetch(
            "http://localhost:3002/api/auth/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                correo: email,
                contrasena: password,
              }),
            },
          );

        const datos =
          await respuesta.json();

        // ==========================================
        // CONTRASEÑA O CORREO INCORRECTOS
        // ==========================================

        if (!respuesta.ok) {
          mostrarMensaje(
            datos.mensaje ||
              "Correo o contraseña incorrectos.",
            "error",
          );

          boton.disabled = false;

          return;
        }

        // ==========================================
        // GUARDAR SESIÓN
        // ==========================================

        localStorage.setItem(
          "karsan_token",
          datos.token,
        );

        localStorage.setItem(
          "karsan_usuario",
          JSON.stringify(
            datos.usuario,
          ),
        );

        // ==========================================
        // REDIRIGIR SEGÚN EL ROL REAL
        // ==========================================

        if (
          datos.usuario.rol
            .toUpperCase() ===
          "ADMINISTRADOR"
        ) {
          const modulo =
            await import(
              "./DashboardAdmin"
            );

          modulo.mostrarDashboardAdmin(
            app,
          );
        } else {
          const modulo =
            await import(
              "./DashboardCliente"
            );

          modulo.mostrarDashboardCliente(
            app,
            datos.usuario.correo,
          );
        }

      } catch (error) {
        console.error(
          "Error de login:",
          error,
        );

        mostrarMensaje(
          "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.",
          "error",
        );

      } finally {
        boton.disabled = false;
      }
    },
  );

  // ============================================================
  // RECUPERAR CONTRASEÑA
  // ============================================================

  forgotPassword.addEventListener(
    "click",
    () => {
      mostrarMensaje(
        "Para recuperar tu contraseña, contacta con el administrador.",
        "info",
      );
    },
  );

  // ============================================================
  // MOSTRAR MENSAJE
  // ============================================================

  function mostrarMensaje(
    mensaje: string,
    tipo:
      | "error"
      | "success"
      | "info",
  ) {
    loginMessage.textContent =
      mensaje;

    loginMessage.className =
      `login-message ${tipo}`;
  }
}