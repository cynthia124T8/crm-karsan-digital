(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();function B(){const e=localStorage.getItem("notificaciones");if(!e)return[];try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ae(e){localStorage.setItem("notificaciones",JSON.stringify(e))}function z(e,t,o="sistema"){const a=B(),n={id:crypto.randomUUID(),titulo:e,mensaje:t,fecha:new Date().toISOString(),leida:!1,tipo:o};ae([n,...a]),X()}function Pe(){return B().filter(e=>!e.leida).length}function Oe(){return`
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
  `}function Ue(){const e=document.querySelector("#lista-notificaciones"),t=document.querySelector("#buscar-notificacion"),o=document.querySelector("#btn-marcar-todas");if(!e)return;const a=e;function n(r=""){const f=r.trim().toLowerCase(),d=B().filter(m=>m.titulo.toLowerCase().includes(f)||m.mensaje.toLowerCase().includes(f)||m.tipo.toLowerCase().includes(f));if(d.length===0){a.innerHTML=`
        <div class="empty-state">
          <h3>No hay notificaciones</h3>

          <p>
            Las nuevas actividades del CRM aparecerán aquí.
          </p>
        </div>
      `;return}a.innerHTML=d.map(m=>`
          <article
            class="notificacion-card ${m.leida?"notificacion-leida":"notificacion-no-leida"}"
          >
            <div class="notificacion-icono">
              ${Je(m.tipo)}
            </div>

            <div class="notificacion-contenido">
              <div class="notificacion-encabezado">
                <h3>
                  ${be(m.titulo)}
                </h3>

                ${m.leida?"":`
                      <span class="notificacion-nueva">
                        Nueva
                      </span>
                    `}
              </div>

              <p>
                ${be(m.mensaje)}
              </p>

              <small>
                ${Ke(m.fecha)}
              </small>
            </div>

            <div class="notificacion-acciones">
              ${m.leida?"":`
                    <button
                      class="btn-marcar-leida"
                      data-marcar-leida="${m.id}"
                      type="button"
                    >
                      Marcar como leída
                    </button>
                  `}

              <button
                class="btn-eliminar"
                data-eliminar-notificacion="${m.id}"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </article>
        `).join(""),i()}function i(){const r=document.querySelectorAll("[data-marcar-leida]"),f=document.querySelectorAll("[data-eliminar-notificacion]");r.forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.marcarLeida;if(!m)return;const L=B().map(g=>g.id===m?{...g,leida:!0}:g);ae(L),X(),n(t?.value??"")})}),f.forEach(d=>{d.addEventListener("click",()=>{const m=d.dataset.eliminarNotificacion;if(!m||!window.confirm("¿Deseas eliminar esta notificación?"))return;const g=B().filter(E=>E.id!==m);ae(g),X(),n(t?.value??"")})})}t?.addEventListener("input",()=>{n(t.value)}),o?.addEventListener("click",()=>{const r=B().map(f=>({...f,leida:!0}));ae(r),X(),n(t?.value??"")}),n()}function X(){const e=document.querySelector("#contador-notificaciones");if(e){const t=Pe();e.textContent=String(t),e.style.display=t>0?"inline-flex":"none"}}function Je(e){return{lead:"🎯",cita:"📅",asesor:"👨‍💼",cliente:"👤",sistema:"🔔"}[e]}function Ke(e){const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleString("es-EC",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function be(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Y(){const e=localStorage.getItem("leads");if(!e)return[];try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function ue(e){localStorage.setItem("leads",JSON.stringify(e))}function Ge(){const e=Y();return`
    <div class="barra-clientes">
      <input
        id="buscar-lead"
        class="input-busqueda"
        type="search"
        placeholder="Buscar lead por nombre, correo o teléfono"
      />

      <button id="nuevo-lead" class="btn-primary" type="button">
        Nuevo lead
      </button>
    </div>

    <div id="lista-leads">
      ${Ce(e)}
    </div>
  `}function Be(){const e=document.querySelector("#nuevo-lead"),t=document.querySelector("#buscar-lead");e?.addEventListener("click",()=>{Ve()}),t?.addEventListener("input",()=>{const o=t.value.trim().toLowerCase(),a=Y().filter(n=>n.nombre.toLowerCase().includes(o)||n.correo.toLowerCase().includes(o)||n.telefono.includes(o));re(a)}),$e()}function Ce(e){return e.length===0?`
      <div class="empty-state">
        <h3>No hay leads registrados</h3>
        <p>Los clientes potenciales aparecerán aquí.</p>
      </div>
    `:`
    <div class="tabla-contenedor">
      <table class="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Fuente</th>
            <th>Estado</th>
            <th>Asesor</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${e.map(t=>`
                <tr>
                  <td>${J(t.nombre)}</td>

                  <td>
                    ${J(t.correo)}<br>
                    ${J(t.telefono)}
                  </td>

                  <td>${J(t.fuente)}</td>

                  <td>
                    <span class="estado-lead">
                      ${J(t.estado)}
                    </span>
                  </td>

                  <td>
                    ${J(t.asesor||"Sin asignar")}
                  </td>

                  <td>${J(t.fecha)}</td>

                  <td>
                    <button
                      class="btn-editar-lead"
                      data-id="${t.id}"
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      class="btn-eliminar-lead"
                      data-id="${t.id}"
                      type="button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              `).join("")}
        </tbody>
      </table>
    </div>
  `}function Ve(){const e=window.prompt("Nombre del lead:");if(!e?.trim())return;const t=window.prompt("Correo del lead:");if(!t?.trim())return;const o=window.prompt("Teléfono del lead:");if(!o?.trim())return;const a=window.prompt("Fuente: Facebook, Instagram, WhatsApp, Web u otra:","Instagram");if(!a?.trim())return;const n={id:crypto.randomUUID(),nombre:e.trim(),correo:t.trim().toLowerCase(),telefono:o.trim(),fuente:a.trim(),estado:"Nuevo",asesor:"",fecha:new Date().toLocaleDateString("es-EC")},i=Y();i.push(n),ue(i),z("Nuevo lead registrado",`${n.nombre} llegó desde ${n.fuente}.`,"lead"),re(i),window.alert("Lead registrado correctamente.")}function Ye(e){const t=Y(),o=t.find(f=>f.id===e);if(!o){window.alert("No se encontró el lead.");return}const a=window.prompt("Estado: Nuevo, Contactado, Interesado o Convertido",o.estado);if(!a?.trim())return;if(!["Nuevo","Contactado","Interesado","Convertido"].includes(a.trim())){window.alert("El estado ingresado no es válido.");return}const i=window.prompt("Nombre del asesor asignado:",o.asesor),r=o.estado;o.estado=a.trim(),o.asesor=i?.trim()??"",ue(t),r!==o.estado&&z("Estado de lead actualizado",`${o.nombre} cambió de ${r} a ${o.estado}.`,"lead"),re(t),window.alert("Lead actualizado correctamente.")}function We(e){if(!window.confirm("¿Deseas eliminar este lead?"))return;const o=Y().filter(a=>a.id!==e);ue(o),re(o),window.alert("Lead eliminado correctamente.")}function re(e){const t=document.querySelector("#lista-leads");t&&(t.innerHTML=Ce(e),$e())}function $e(){const e=document.querySelectorAll(".btn-editar-lead"),t=document.querySelectorAll(".btn-eliminar-lead");e.forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.id;a&&Ye(a)})}),t.forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.id;a&&We(a)})})}function J(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function j(){const e=localStorage.getItem("asesores");if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function ce(e){localStorage.setItem("asesores",JSON.stringify(e))}function Qe(){return`
    <section id="modulo-asesores" class="modulo-asesores oculto">
      <div class="encabezado-modulo">
        <div>
          <h2>Gestión de asesores</h2>
          <p>Registra y administra los asesores de Karsan Digital.</p>
        </div>

        <button id="btn-nuevo-asesor" class="btn-principal" type="button">
          + Nuevo asesor
        </button>
      </div>

      <div class="barra-busqueda">
        <input
          id="buscar-asesor"
          type="search"
          placeholder="Buscar asesor por nombre o correo..."
        />
      </div>

      <div id="formulario-asesor-contenedor" class="formulario-contenedor oculto">
        <form id="formulario-asesor" class="formulario-asesor">
          <h3 id="titulo-formulario-asesor">Registrar asesor</h3>

          <input id="asesor-id" type="hidden" />

          <div class="form-grid">
            <div class="form-group">
              <label for="asesor-nombre">Nombre</label>
              <input
                id="asesor-nombre"
                type="text"
                placeholder="Ingrese el nombre"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-apellido">Apellido</label>
              <input
                id="asesor-apellido"
                type="text"
                placeholder="Ingrese el apellido"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-correo">Correo electrónico</label>
              <input
                id="asesor-correo"
                type="email"
                placeholder="asesor@correo.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-telefono">Teléfono</label>
              <input
                id="asesor-telefono"
                type="tel"
                placeholder="0999999999"
                required
              />
            </div>

            <div class="form-group">
              <label for="asesor-especialidad">Especialidad</label>
              <select id="asesor-especialidad" required>
                <option value="">Seleccione una opción</option>
                <option value="Marketing Digital">Marketing Digital</option>
                <option value="Ventas">Ventas</option>
                <option value="Atención al cliente">
                  Atención al cliente
                </option>
                <option value="Desarrollo Web">Desarrollo Web</option>
                <option value="Redes Sociales">Redes Sociales</option>
              </select>
            </div>

            <div class="form-group">
              <label for="asesor-estado">Estado</label>
              <select id="asesor-estado" required>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <p id="mensaje-asesor" class="mensaje-formulario"></p>

          <div class="acciones-formulario">
            <button type="submit" class="btn-principal">
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
  `}function _e(){const e=document.querySelector("#modulo-asesores"),t=document.querySelector("#tabla-asesores"),o=document.querySelector("#formulario-asesor"),a=document.querySelector("#formulario-asesor-contenedor"),n=document.querySelector("#btn-nuevo-asesor"),i=document.querySelector("#btn-cancelar-asesor"),r=document.querySelector("#buscar-asesor"),f=document.querySelector("#asesor-id"),d=document.querySelector("#asesor-nombre"),m=document.querySelector("#asesor-apellido"),L=document.querySelector("#asesor-correo"),g=document.querySelector("#asesor-telefono"),E=document.querySelector("#asesor-especialidad"),S=document.querySelector("#asesor-estado"),y=document.querySelector("#titulo-formulario-asesor"),h=document.querySelector("#mensaje-asesor");if(!e||!t)return;e.classList.remove("oculto");const q=t;function I(u=""){const s=j(),b=u.trim().toLowerCase(),c=s.filter(p=>`${p.nombre} ${p.apellido}`.toLowerCase().includes(b)||p.correo.toLowerCase().includes(b)||p.especialidad.toLowerCase().includes(b));if(c.length===0){q.innerHTML=`
        <tr>
          <td colspan="6" class="tabla-vacia">
            No hay asesores registrados.
          </td>
        </tr>
      `;return}q.innerHTML=c.map(p=>`
          <tr>
            <td>${p.nombre} ${p.apellido}</td>
            <td>${p.correo}</td>
            <td>${p.telefono}</td>
            <td>${p.especialidad}</td>
            <td>
              <span class="estado estado-${p.estado.toLowerCase()}">
                ${p.estado}
              </span>
            </td>
            <td>
              <button
                class="btn-editar"
                data-editar-asesor="${p.id}"
                type="button"
              >
                Editar
              </button>

              <button
                class="btn-eliminar"
                data-eliminar-asesor="${p.id}"
                type="button"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `).join(""),l()}function O(){o?.reset(),f&&(f.value=""),S&&(S.value="Activo"),y&&(y.textContent="Registrar asesor"),h&&(h.textContent="")}function k(){a?.classList.remove("oculto")}function v(){a?.classList.add("oculto"),O()}function l(){const u=document.querySelectorAll("[data-editar-asesor]"),s=document.querySelectorAll("[data-eliminar-asesor]");u.forEach(b=>{b.addEventListener("click",()=>{const c=b.dataset.editarAsesor,p=j().find(w=>w.id===c);p&&(f&&(f.value=p.id),d&&(d.value=p.nombre),m&&(m.value=p.apellido),L&&(L.value=p.correo),g&&(g.value=p.telefono),E&&(E.value=p.especialidad),S&&(S.value=p.estado),y&&(y.textContent="Editar asesor"),k())})}),s.forEach(b=>{b.addEventListener("click",()=>{const c=b.dataset.eliminarAsesor;if(!window.confirm("¿Está segura de eliminar este asesor?")||!c)return;const w=j().find(T=>T.id===c),F=j().filter(T=>T.id!==c);ce(F),w&&z("Asesor eliminado",`${w.nombre} ${w.apellido} fue eliminado correctamente.`,"asesor"),I(r?.value??"")})})}n?.addEventListener("click",()=>{O(),k()}),i?.addEventListener("click",()=>{v()}),r?.addEventListener("input",()=>{I(r.value)}),o?.addEventListener("submit",u=>{u.preventDefault();const s=d?.value.trim()??"",b=m?.value.trim()??"",c=L?.value.trim().toLowerCase()??"",p=g?.value.trim()??"",w=E?.value??"",F=S?.value,T=f?.value??"";if(!s||!b||!c||!p||!w){h&&(h.textContent="Por favor, complete todos los campos.");return}const U=j();if(U.some(D=>D.correo===c&&D.id!==T)){h&&(h.textContent="Ya existe un asesor con ese correo.");return}if(T){const D=U.map(K=>K.id===T?{...K,nombre:s,apellido:b,correo:c,telefono:p,especialidad:w,estado:F}:K);ce(D)}else{const D={id:crypto.randomUUID(),nombre:s,apellido:b,correo:c,telefono:p,especialidad:w,estado:F};ce([...U,D]),z("Nuevo asesor registrado",`${D.nombre} ${D.apellido} fue agregado al CRM.`,"asesor")}v(),I(r?.value??"")}),I()}function G(){const e=localStorage.getItem("citas");if(!e)return[];try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function le(e){localStorage.setItem("citas",JSON.stringify(e))}function de(){const e=localStorage.getItem("clientes");if(!e)return[];try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function Xe(){const e=de(),t=j();return`
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

                ${e.map(o=>`
                      <option value="${o.id}">
                        ${P(o.nombre)}
                        ${P(o.apellido)}
                      </option>
                    `).join("")}
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

                ${t.filter(o=>o.estado==="Activo").map(o=>`
                      <option value="${o.id}">
                        ${P(o.nombre)}
                        ${P(o.apellido)}
                      </option>
                    `).join("")}
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
  `}function Ze(){const e=document.querySelector("#tabla-citas"),t=document.querySelector("#formulario-cita"),o=document.querySelector("#formulario-cita-contenedor"),a=document.querySelector("#btn-nueva-cita"),n=document.querySelector("#btn-cancelar-cita"),i=document.querySelector("#buscar-cita"),r=document.querySelector("#cita-id"),f=document.querySelector("#cita-cliente"),d=document.querySelector("#cita-asesor"),m=document.querySelector("#cita-fecha"),L=document.querySelector("#cita-hora"),g=document.querySelector("#cita-motivo"),E=document.querySelector("#cita-estado"),S=document.querySelector("#titulo-formulario-cita"),y=document.querySelector("#mensaje-cita");if(!e)return;const h=e;function q(l=""){const u=G(),s=l.trim().toLowerCase(),b=u.filter(c=>c.clienteNombre.toLowerCase().includes(s)||c.asesorNombre.toLowerCase().includes(s)||c.estado.toLowerCase().includes(s)||c.motivo.toLowerCase().includes(s));if(b.length===0){h.innerHTML=`
        <tr>
          <td colspan="7" class="tabla-vacia">
            No hay citas registradas.
          </td>
        </tr>
      `;return}h.innerHTML=b.map(c=>`
          <tr>
            <td>${P(c.clienteNombre)}</td>

            <td>${P(c.asesorNombre)}</td>

            <td>${et(c.fecha)}</td>

            <td>${P(c.hora)}</td>

            <td>${P(c.motivo)}</td>

            <td>
              <span
                class="estado estado-${c.estado.toLowerCase().replace(" ","-")}"
              >
                ${c.estado}
              </span>
            </td>

            <td>
              <button
                class="btn-editar"
                data-editar-cita="${c.id}"
                type="button"
              >
                Editar
              </button>

              <button
                class="btn-eliminar"
                data-eliminar-cita="${c.id}"
                type="button"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `).join(""),v()}function I(){t?.reset(),r&&(r.value=""),E&&(E.value="Pendiente"),S&&(S.textContent="Registrar cita"),y&&(y.textContent="")}function O(){o?.classList.remove("oculto")}function k(){o?.classList.add("oculto"),I()}function v(){const l=document.querySelectorAll("[data-editar-cita]"),u=document.querySelectorAll("[data-eliminar-cita]");l.forEach(s=>{s.addEventListener("click",()=>{const b=s.dataset.editarCita,c=G().find(p=>p.id===b);c&&(r&&(r.value=c.id),f&&(f.value=c.clienteId),d&&(d.value=c.asesorId),m&&(m.value=c.fecha),L&&(L.value=c.hora),g&&(g.value=c.motivo),E&&(E.value=c.estado),S&&(S.textContent="Editar cita"),O())})}),u.forEach(s=>{s.addEventListener("click",()=>{const b=s.dataset.eliminarCita;if(!b||!window.confirm("¿Deseas eliminar esta cita?"))return;const p=G().filter(w=>w.id!==b);le(p),q(i?.value??""),ve(p.length)})})}a?.addEventListener("click",()=>{const l=de(),u=j().filter(s=>s.estado==="Activo");if(l.length===0){window.alert("Primero debes registrar un cliente.");return}if(u.length===0){window.alert("Primero debes registrar un asesor activo.");return}I(),O()}),n?.addEventListener("click",()=>{k()}),i?.addEventListener("input",()=>{q(i.value)}),t?.addEventListener("submit",l=>{l.preventDefault();const u=f?.value??"",s=d?.value??"",b=m?.value??"",c=L?.value??"",p=g?.value.trim()??"",w=E?.value,F=r?.value??"";if(!u||!s||!b||!c||!p){y&&(y.textContent="Por favor, completa todos los campos.");return}const T=de().find(N=>N.id===u),U=j().find(N=>N.id===s);if(!T||!U){y&&(y.textContent="No se encontró el cliente o asesor seleccionado.");return}const Z=G();if(Z.some(N=>N.asesorId===s&&N.fecha===b&&N.hora===c&&N.id!==F&&N.estado!=="Cancelada")){y&&(y.textContent="El asesor ya tiene una cita en esa fecha y hora.");return}const K=`${T.nombre} ${T.apellido}`,fe=`${U.nombre} ${U.apellido}`;if(F){const N=Z.map(se=>se.id===F?{...se,clienteId:u,clienteNombre:K,asesorId:s,asesorNombre:fe,fecha:b,hora:c,motivo:p,estado:w}:se);le(N)}else{const N={id:crypto.randomUUID(),clienteId:u,clienteNombre:K,asesorId:s,asesorNombre:fe,fecha:b,hora:c,motivo:p,estado:w};le([...Z,N])}const Fe=G().length;ve(Fe),k(),q(i?.value??"")}),q()}function ve(e){const t=document.querySelector("#total-citas");t&&(t.textContent=String(e))}function et(e){const t=e.split("-");if(t.length!==3)return e;const[o,a,n]=t;return`${n}/${a}/${o}`}function P(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}let C="normal",$={nombre:"",correo:"",telefono:"",servicio:""},x={servicio:"",fecha:"",hora:""};function Le(){return`
    <section id="modulo-chatbot" class="modulo-chatbot">
      <div class="encabezado-modulo">
        <div>
          <h2>Asistente virtual</h2>
          <p>
            Responde preguntas, registra leads y permite solicitar citas.
          </p>
        </div>
      </div>

      <div class="chatbot-presentacion">
        <div class="chatbot-icono-grande">🤖</div>

        <h3>Asistente Karsan</h3>

        <p>
          Disponible para orientar a clientes y visitantes.
        </p>

        <button
          id="btn-probar-chatbot"
          class="btn-principal"
          type="button"
        >
          Abrir chatbot
        </button>
      </div>
    </section>

    <button
      id="boton-chatbot-flotante"
      class="boton-chatbot-flotante"
      type="button"
      aria-label="Abrir chatbot"
    >
      <span class="chatbot-flotante-icono">🤖</span>
      <span class="chatbot-flotante-alerta"></span>
    </button>

    <aside
      id="ventana-chatbot"
      class="ventana-chatbot chatbot-oculto"
      aria-label="Asistente virtual Karsan"
    >
      <header class="chatbot-cabecera">
        <div class="chatbot-avatar">🤖</div>

        <div class="chatbot-identidad">
          <strong>Asistente Karsan</strong>
          <span><i></i> En línea</span>
        </div>

        <div class="chatbot-controles">
          <button
            id="minimizar-chatbot"
            type="button"
            aria-label="Minimizar chatbot"
          >
            —
          </button>

          <button
            id="cerrar-chatbot"
            type="button"
            aria-label="Cerrar chatbot"
          >
            ×
          </button>
        </div>
      </header>

      <div
        id="chatbot-mensajes"
        class="chatbot-mensajes"
      ></div>

      <div
        id="chatbot-escribiendo"
        class="chatbot-escribiendo chatbot-oculto"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        id="chatbot-opciones"
        class="chatbot-opciones"
      >
        <button type="button" data-opcion-chatbot="servicios">
          📋 Ver servicios
        </button>

        <button type="button" data-opcion-chatbot="cita">
          📅 Agendar cita
        </button>

        <button type="button" data-opcion-chatbot="asesor">
          👨‍💼 Hablar con un asesor
        </button>

        <button type="button" data-opcion-chatbot="cotizacion">
          💰 Solicitar cotización
        </button>
      </div>

      <form
        id="formulario-chatbot"
        class="chatbot-formulario"
      >
        <label
          for="archivo-chatbot"
          class="chatbot-adjuntar"
          title="Adjuntar archivo"
        >
          📎
        </label>

        <input
          id="archivo-chatbot"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          hidden
        />

        <input
          id="chatbot-input"
          type="text"
          placeholder="Escribe un mensaje..."
          autocomplete="off"
          required
        />

        <button
          class="chatbot-enviar"
          type="submit"
          aria-label="Enviar mensaje"
        >
          ➤
        </button>
      </form>
    </aside>
  `}function Se(){const e=document.querySelector("#boton-chatbot-flotante"),t=document.querySelector("#btn-probar-chatbot"),o=document.querySelector("#ventana-chatbot"),a=document.querySelector("#cerrar-chatbot"),n=document.querySelector("#minimizar-chatbot"),i=document.querySelector("#formulario-chatbot"),r=document.querySelector("#chatbot-input"),f=document.querySelector("#archivo-chatbot"),d=document.querySelector("#chatbot-mensajes"),m=document.querySelector("#chatbot-escribiendo"),L=document.querySelectorAll("[data-opcion-chatbot]");if(!o||!i||!r||!d)return;const g=tt();ot(g),rt(d);function E(){o.classList.remove("chatbot-oculto"),e?.classList.add("chatbot-boton-oculto"),d.children.length===0&&y(g),r.focus()}function S(){o.classList.add("chatbot-oculto"),e?.classList.remove("chatbot-boton-oculto")}e?.addEventListener("click",E),t?.addEventListener("click",E),a?.addEventListener("click",S),n?.addEventListener("click",S),L.forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset.opcionChatbot??"";k({autor:"usuario",texto:{servicios:"Ver servicios",cita:"Agendar una cita",asesor:"Hablar con un asesor",cotizacion:"Solicitar cotización"}[u]??u}),q(u,g)})}),f?.addEventListener("change",()=>{const l=f.files?.[0]?.name;l&&(k({autor:"usuario",texto:`📎 Archivo seleccionado: ${l}`}),v("He registrado el archivo. En esta versión todavía no se envía al servidor, pero la interfaz ya está preparada."),f.value="")}),i.addEventListener("submit",l=>{l.preventDefault();const u=r.value.trim();u&&(k({autor:"usuario",texto:u}),r.value="",h(u,g))});function y(l){if(C="normal",l?.rol==="cliente"){v(`¡Hola, ${l.nombre}! 👋 Soy el Asistente Karsan. ¿En qué puedo ayudarte hoy?`,150);return}v("¡Hola! 👋 Soy el Asistente Karsan. Puedo ayudarte con servicios, citas, cotizaciones o contacto con un asesor.",150)}function h(l,u){if(C==="captarNombre"){$.nombre=l,C="captarCorreo",v(`Mucho gusto, ${l}. ¿Cuál es tu correo electrónico?`);return}if(C==="captarCorreo"){if(!it(l)){v("Ese correo no parece válido. Escríbelo nuevamente.");return}$.correo=l,C="captarTelefono",v("Perfecto. Ahora escribe tu número de teléfono.");return}if(C==="captarTelefono"){const s=l.replace(/\D/g,"");if(s.length<7){v("El teléfono debe tener al menos 7 números.");return}$.telefono=s,C="captarServicio",v("¿Qué servicio necesitas? Por ejemplo: redes sociales, publicidad, página web, CRM o inteligencia artificial.");return}if(C==="captarServicio"){$.servicio=l,at(),C="normal",v(`Gracias, ${$.nombre}. Registré tu solicitud. Un asesor recibirá una notificación y se comunicará contigo pronto. ✅`);return}if(C==="citaServicio"){x.servicio=l,C="citaFecha",v("Indica la fecha que prefieres usando el formato AAAA-MM-DD.");return}if(C==="citaFecha"){if(!st(l)){v("La fecha debe escribirse así: 2026-07-30.");return}x.fecha=l,C="citaHora",v("Ahora indica la hora en formato HH:MM. Ejemplo: 10:30.");return}if(C==="citaHora"){if(!ct(l)){v("La hora debe escribirse así: 10:30.");return}x.hora=l,C="citaAsesor";const s=j().filter(b=>b.estado==="Activo");if(s.length===0){he(u,"","Por asignar"),C="normal",v("Registré tu solicitud. El administrador asignará un asesor y te confirmará la cita.");return}v(`Escribe el número del asesor que prefieres:
${s.map((b,c)=>`${c+1}. ${b.nombre} ${b.apellido}`).join(`
`)}`);return}if(C==="citaAsesor"){const s=j().filter(p=>p.estado==="Activo"),b=Number(l)-1,c=s[b];if(!c){v("Escribe únicamente el número de uno de los asesores mostrados.");return}he(u,c.id,`${c.nombre} ${c.apellido}`),C="normal",v(`Tu cita quedó solicitada para el ${we(x.fecha)} a las ${x.hora} con ${c.nombre}. El estado inicial es Pendiente. 📅`);return}O(l,u)}function q(l,u){if(l==="servicios"){v(`Nuestros servicios incluyen:
• Gestión de redes sociales
• Publicidad digital
• Diseño y desarrollo web
• Automatización y CRM
• Inteligencia artificial`);return}if(l==="cita"){if(!u||u.rol!=="cliente"){I("Para solicitar una cita necesito registrar tus datos. ¿Cuál es tu nombre?");return}x={servicio:"",fecha:"",hora:""},C="citaServicio",v("Perfecto 😊 ¿Cuál es el motivo o servicio para la cita?");return}if(l==="asesor"){if(u?.rol==="cliente"){z("Cliente solicita un asesor",`${u.nombre} (${u.correo}) quiere hablar con un asesor.`,"asesor"),v("Listo. Avisé al equipo de Karsan Digital. Un asesor se comunicará contigo pronto. ✅");return}I("Para comunicarte con un asesor necesito registrar tus datos. ¿Cuál es tu nombre?");return}if(l==="cotizacion"){if(u?.rol==="cliente"){z("Solicitud de cotización",`${u.nombre} (${u.correo}) solicitó una cotización.`,"lead"),v("Tu solicitud de cotización fue enviada. Cuéntame qué servicio necesitas y prepararé la información para el asesor."),$.servicio="",C="captarServicio";return}I("Con gusto te ayudo con una cotización. Primero dime tu nombre.")}}function I(l){$={nombre:"",correo:"",telefono:"",servicio:""},C="captarNombre",v(l)}function O(l,u){const s=l.toLowerCase();if(s.includes("cita")||s.includes("agendar")){q("cita",u);return}if(s.includes("asesor")||s.includes("persona")){q("asesor",u);return}if(s.includes("servicio")||s.includes("ofrecen")){q("servicios",u);return}if(s.includes("precio")||s.includes("costo")||s.includes("cotización")||s.includes("cotizacion")){q("cotizacion",u);return}if(s.includes("horario")||s.includes("atienden")){v("El horario exacto será confirmado por un asesor. También puedo registrar una solicitud de contacto.");return}if(s.includes("hola")||s.includes("buenas")){v(`¡Hola${u?.nombre?`, ${u.nombre}`:""}! 😊 ¿Deseas conocer nuestros servicios, agendar una cita o hablar con un asesor?`);return}v("Puedo ayudarte con servicios, precios, citas, cotizaciones o contacto con un asesor. Usa uno de los botones rápidos o escribe tu pregunta.")}function k(l){const u=l.hora??lt(),s=document.createElement("div");s.className=l.autor==="bot"?"mensaje-chatbot mensaje-bot":"mensaje-chatbot mensaje-usuario",s.innerHTML=`
      <div class="mensaje-contenido">
        ${dt(l.texto).replace(/\n/g,"<br>")}
      </div>
      <small>${u}</small>
    `,d.appendChild(s),d.scrollTop=d.scrollHeight,nt(d)}function v(l,u=550){m?.classList.remove("chatbot-oculto"),window.setTimeout(()=>{m?.classList.add("chatbot-oculto"),k({autor:"bot",texto:l})},u)}}function tt(){const e=localStorage.getItem("usuarioActivo");if(!e)return null;try{return JSON.parse(e)}catch{return null}}function ot(e){if(!e||e.rol!=="cliente")return;const t=localStorage.getItem("clientes");if(!t){$.nombre=e.nombre,$.correo=e.correo;return}try{const o=JSON.parse(t);if(!Array.isArray(o))return;const a=o.find(n=>n.id===e.id||n.correo===e.correo);$.nombre=`${a?.nombre??e.nombre} ${a?.apellido??""}`.trim(),$.correo=a?.correo??e.correo,$.telefono=a?.telefono??e.telefono??""}catch{$.nombre=e.nombre,$.correo=e.correo}}function he(e,t,o){if(!e||e.rol!=="cliente")return;const a=Ee("citas"),n={id:crypto.randomUUID(),clienteId:e.id??e.correo,clienteNombre:e.nombre,asesorId:t,asesorNombre:o,fecha:x.fecha,hora:x.hora,motivo:x.servicio,estado:"Pendiente"};localStorage.setItem("citas",JSON.stringify([...a,n])),z("Nueva cita solicitada",`${e.nombre} solicitó una cita para ${x.servicio} el ${we(x.fecha)} a las ${x.hora}.`,"cita")}function at(){const e=Ee("leads"),t=$.nombre.trim().split(" "),o=t[0]??"",a=t.slice(1).join(" ")||"",n={id:crypto.randomUUID(),nombre:o,apellido:a,correo:$.correo,telefono:$.telefono,empresa:"",fuente:"Chatbot",servicio:$.servicio,estado:"Nuevo",fechaCreacion:new Date().toISOString()};localStorage.setItem("leads",JSON.stringify([...e,n])),z("Nuevo lead desde el chatbot",`${$.nombre} solicitó información sobre ${$.servicio}.`,"lead")}function Ee(e){const t=localStorage.getItem(e);if(!t)return[];try{const o=JSON.parse(t);return Array.isArray(o)?o:[]}catch{return[]}}function nt(e){localStorage.setItem("chatbotHistorial",e.innerHTML)}function rt(e){const t=localStorage.getItem("chatbotHistorial");t&&(e.innerHTML=t,e.scrollTop=e.scrollHeight)}function it(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function st(e){return/^\d{4}-\d{2}-\d{2}$/.test(e)}function ct(e){return/^([01]\d|2[0-3]):[0-5]\d$/.test(e)}function we(e){const t=e.split("-");if(t.length!==3)return e;const[o,a,n]=t;return`${n}/${a}/${o}`}function lt(){return new Date().toLocaleTimeString("es-EC",{hour:"2-digit",minute:"2-digit"})}function dt(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ut(){const e=A("clientes"),t=A("leads"),o=A("asesores"),a=A("citas"),n=A("notificaciones"),i=o.filter(h=>h.estado==="Activo").length,r=a.filter(h=>h.estado==="Pendiente").length,f=a.filter(h=>h.estado==="Confirmada").length,d=a.filter(h=>h.estado==="Finalizada").length,m=a.filter(h=>h.estado==="Cancelada").length,L=t.filter(h=>h.estado==="Nuevo").length,g=t.filter(h=>h.estado==="Contactado").length,E=t.filter(h=>h.estado==="Convertido").length,S=n.filter(h=>!h.leida).length,y=Math.max(e.length,t.length,o.length,a.length,1);return`
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
        ${Q("Clientes",e.length,"Clientes registrados","👥","azul")}

        ${Q("Leads",t.length,"Clientes potenciales","🎯","verde")}

        ${Q("Asesores",o.length,`${i} activos`,"🧑‍💼","morado")}

        ${Q("Citas",a.length,`${r} pendientes`,"📅","naranja")}

        ${Q("Notificaciones",n.length,`${S} sin leer`,"🔔","rojo")}
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

          ${ee("Clientes",e.length,y)}

          ${ee("Leads",t.length,y)}

          ${ee("Asesores",o.length,y)}

          ${ee("Citas",a.length,y)}
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

          ${R("Pendientes",r)}

          ${R("Confirmadas",f)}

          ${R("Finalizadas",d)}

          ${R("Canceladas",m)}
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

          ${R("Nuevos",L)}

          ${R("Contactados",g)}

          ${R("Convertidos",E)}
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

          ${R("Asesores activos",i)}

          ${R("Notificaciones",n.length)}

          ${R("Sin leer",S)}
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

        ${pt(a)}
      </div>
    </section>
  `}function mt(){const e=document.querySelector("#btn-exportar-excel"),t=document.querySelector("#btn-exportar-pdf");e?.addEventListener("click",()=>{ft()}),t?.addEventListener("click",()=>{bt()})}function Q(e,t,o,a,n){return`
    <article class="reporte-tarjeta reporte-tarjeta-${n}">
      <div class="reporte-tarjeta-icono">${a}</div>

      <div class="reporte-tarjeta-contenido">
        <span>${M(e)}</span>
        <strong>${t}</strong>
        <small>${M(o)}</small>
      </div>
    </article>
  `}function ee(e,t,o){const a=Math.round(t/o*100);return`
    <div class="reporte-barra-fila">
      <div class="reporte-barra-datos">
        <span>${M(e)}</span>
        <strong>${t}</strong>
      </div>

      <div class="reporte-barra-fondo">
        <div
          class="reporte-barra-progreso"
          style="width: ${a}%"
        ></div>
      </div>
    </div>
  `}function R(e,t){return`
    <div class="reporte-estado-fila">
      <span>
        <i></i>
        ${M(e)}
      </span>
      <strong>${t}</strong>
    </div>
  `}function pt(e){return e.length===0?`
      <div class="empty-state">
        <p>No hay citas registradas.</p>
      </div>
    `:`
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
          ${[...e].reverse().slice(0,5).map(o=>`
                <tr>
                  <td>
                    ${M(o.clienteNombre)}
                  </td>

                  <td>
                    ${M(o.asesorNombre)}
                  </td>

                  <td>
                    ${Ae(o.fecha)}
                  </td>

                  <td>
                    ${M(o.hora)}
                  </td>

                  <td>
                    ${M(o.estado)}
                  </td>
                </tr>
              `).join("")}
        </tbody>
      </table>
    </div>
  `}function ft(){const e=A("clientes"),t=A("leads"),o=A("asesores"),a=A("citas"),n=A("notificaciones"),r=[["REPORTE CRM KARSAN DIGITAL"],["Fecha",new Date().toLocaleString()],[],["Categoría","Cantidad"],["Clientes",e.length],["Leads",t.length],["Asesores",o.length],["Citas",a.length],["Notificaciones",n.length],[],["CITAS"],["Cliente","Asesor","Fecha","Hora","Motivo","Estado"],...a.map(m=>[m.clienteNombre,m.asesorNombre,m.fecha,m.hora,m.motivo,m.estado])].map(m=>m.map(L=>`"${String(L??"").replace(/"/g,'""')}"`).join(",")).join(`
`),f=new Blob(["\uFEFF"+r],{type:"text/csv;charset=utf-8;"}),d=document.createElement("a");d.href=URL.createObjectURL(f),d.download="reporte-crm-karsan.csv",d.click(),URL.revokeObjectURL(d.href)}function bt(){const e=A("clientes"),t=A("leads"),o=A("asesores"),a=A("citas"),n=A("notificaciones"),i=window.open("","_blank");if(!i){window.alert("El navegador bloqueó la ventana del reporte.");return}i.document.write(`
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
          ${_("Clientes",e.length)}

          ${_("Leads",t.length)}

          ${_("Asesores",o.length)}

          ${_("Citas",a.length)}

          ${_("Notificaciones",n.length)}
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
            ${a.map(r=>`
                  <tr>
                    <td>
                      ${M(r.clienteNombre)}
                    </td>

                    <td>
                      ${M(r.asesorNombre)}
                    </td>

                    <td>
                      ${Ae(r.fecha)}
                    </td>

                    <td>
                      ${M(r.hora)}
                    </td>

                    <td>
                      ${M(r.estado)}
                    </td>
                  </tr>
                `).join("")}
          </tbody>
        </table>

        <script>
          window.onload = function () {
            window.print()
          }
        <\/script>
      </body>
    </html>
  `),i.document.close()}function _(e,t){return`
    <div class="tarjeta">
      <span>${M(e)}</span>
      <strong>${t}</strong>
    </div>
  `}function A(e){const t=localStorage.getItem(e);if(!t)return[];try{const o=JSON.parse(t);return Array.isArray(o)?o:[]}catch{return[]}}function Ae(e){const t=e.split("-");if(t.length!==3)return e;const[o,a,n]=t;return`${n}/${a}/${o}`}function M(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function vt(e){const t=W(),o=Y(),a=j(),n=G();e.innerHTML=`
    <div class="crm-shell">
      <aside class="crm-sidebar">
        <div>
          <div class="crm-brand">
            <div class="crm-brand-mark">K</div>

            <div>
              <strong>Karsan Digital</strong>
              <span>CRM</span>
            </div>
          </div>

          <nav class="crm-nav">
            <button class="menu-item active" data-seccion="inicio">
              <span class="crm-nav-icon">🏠</span>
              <span>Inicio</span>
            </button>

            <button class="menu-item" data-seccion="clientes">
              <span class="crm-nav-icon">👥</span>
              <span>Clientes</span>
            </button>

            <button class="menu-item" data-seccion="leads">
              <span class="crm-nav-icon">🎯</span>
              <span>Leads</span>
            </button>

            <button class="menu-item" data-seccion="asesores">
              <span class="crm-nav-icon">🧑‍💼</span>
              <span>Asesores</span>
            </button>

            <button class="menu-item" data-seccion="citas">
              <span class="crm-nav-icon">📅</span>
              <span>Citas</span>
            </button>

            <button class="menu-item" data-seccion="notificaciones">
              <span class="crm-nav-icon">🔔</span>
              <span>Notificaciones</span>

              <span
                id="contador-notificaciones"
                class="contador-notificaciones"
                style="display: none;"
              >
                0
              </span>
            </button>

            <button class="menu-item" data-seccion="reportes">
              <span class="crm-nav-icon">📊</span>
              <span>Reportes</span>
            </button>

            <button class="menu-item" data-seccion="chatbot">
              <span class="crm-nav-icon">🤖</span>
              <span>Chatbot</span>
            </button>
          </nav>
        </div>

        <div class="crm-sidebar-footer">
          <div class="crm-user-card">
            <div class="crm-avatar">A</div>

            <div>
              <strong>Administrador</strong>
              <span>admin@karsandigital.com</span>
              <small>Sesión activa</small>
            </div>
          </div>

          <button
            id="cerrar-sesion"
            class="crm-logout"
            type="button"
          >
            <span>↩</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="crm-main">
        <header class="crm-topbar">
          <div>
            <h1>Panel de administración</h1>
            <p>Gestiona clientes, leads, asesores y citas desde un solo lugar.</p>
          </div>

          <div class="crm-topbar-actions">
            <label class="crm-search">
              <span>🔎</span>
              <input
                id="busqueda-global-admin"
                type="search"
                placeholder="Buscar en el CRM"
              />
            </label>

            <button
              id="boton-notificaciones-admin"
              class="crm-icon-button"
              type="button"
              aria-label="Abrir notificaciones"
            >
              🔔
            </button>

            <div class="crm-profile">
              <div class="crm-avatar">A</div>

              <div>
                <strong>Administrador</strong>
                <span>admin@karsandigital.com</span>
              </div>
            </div>
          </div>
        </header>

        <section class="crm-kpi-grid">
          <article class="crm-kpi-card">
            <div class="crm-kpi-icon azul">👥</div>
            <div>
              <span>Total de clientes</span>
              <strong id="total-clientes">${t.length}</strong>
              <small>Clientes registrados</small>
            </div>
          </article>

          <article class="crm-kpi-card">
            <div class="crm-kpi-icon verde">🎯</div>
            <div>
              <span>Leads registrados</span>
              <strong id="total-leads">${o.length}</strong>
              <small>Clientes potenciales</small>
            </div>
          </article>

          <article class="crm-kpi-card">
            <div class="crm-kpi-icon morado">🧑‍💼</div>
            <div>
              <span>Asesores</span>
              <strong id="total-asesores">${a.length}</strong>
              <small>Asesores registrados</small>
            </div>
          </article>

          <article class="crm-kpi-card">
            <div class="crm-kpi-icon naranja">📅</div>
            <div>
              <span>Citas pendientes</span>
              <strong id="total-citas">${n.length}</strong>
              <small>Citas registradas</small>
            </div>
          </article>
        </section>

        <section class="crm-card crm-workspace">
          <div class="crm-workspace-header">
            <div>
              <h2 id="titulo-seccion">Clientes recientes</h2>
              <p id="descripcion-seccion">
                Clientes registrados en el sistema
              </p>
            </div>

            <button
              id="nuevo-cliente"
              class="btn-primary"
              type="button"
            >
              + Nuevo cliente
            </button>
          </div>

          <div id="contenido-dashboard">
            ${Ne(t)}
          </div>
        </section>

        <button
          id="chatbot-flotante-admin"
          class="crm-chat-fab"
          type="button"
          aria-label="Abrir chatbot"
        >
          🤖
        </button>
      </main>
    </div>
  `,ht(e)}function ht(e){const t=document.querySelector("#cerrar-sesion"),o=document.querySelector("#nuevo-cliente"),a=document.querySelectorAll(".menu-item");t?.addEventListener("click",()=>{localStorage.removeItem("usuarioActivo"),V(e)}),o?.addEventListener("click",()=>{gt()}),a.forEach(r=>{r.addEventListener("click",()=>{a.forEach(d=>{d.classList.remove("active")}),r.classList.add("active");const f=r.dataset.seccion??"inicio";qe(f)})});const n=document.querySelector("#boton-notificaciones-admin"),i=document.querySelector("#chatbot-flotante-admin");n?.addEventListener("click",()=>{ge("notificaciones")}),i?.addEventListener("click",()=>{ge("chatbot")}),xe(),X()}function ge(e){document.querySelectorAll(".menu-item").forEach(t=>{t.classList.toggle("active",t.dataset.seccion===e)}),qe(e)}function qe(e){const t=document.querySelector("#contenido-dashboard"),o=document.querySelector("#titulo-seccion"),a=document.querySelector("#descripcion-seccion"),n=document.querySelector("#nuevo-cliente");if(!t||!o||!a)return;if(e==="inicio"||e==="clientes"){const f=W();o.textContent=e==="inicio"?"Clientes recientes":"Gestión de clientes",a.textContent="Clientes registrados en el sistema",n&&(n.style.display="inline-block"),t.innerHTML=Ne(f),xe();return}if(e==="leads"){o.textContent="Gestión de leads",a.textContent="Clientes potenciales provenientes de redes sociales",n&&(n.style.display="none"),t.innerHTML=Ge(),Be();return}if(e==="asesores"){o.textContent="Gestión de asesores",a.textContent="Asesores registrados",n&&(n.style.display="none"),t.innerHTML=Qe(),_e();return}if(e==="citas"){o.textContent="Gestión de citas",a.textContent="Citas programadas",n&&(n.style.display="none"),t.innerHTML=Xe(),Ze();return}if(e==="notificaciones"){o.textContent="Notificaciones",a.textContent="Actividades importantes registradas en el CRM",n&&(n.style.display="none"),t.innerHTML=Oe(),Ue();return}if(e==="reportes"){o.textContent="Reportes",a.textContent="Estadísticas generales del CRM",n&&(n.style.display="none"),t.innerHTML=ut(),mt();return}if(e==="chatbot"){o.textContent="Chatbot",a.textContent="Asistente virtual para captar clientes potenciales",n&&(n.style.display="none"),t.innerHTML=Le(),Se();return}n&&(n.style.display="none");const r={leads:"Leads",asesores:"Asesores",citas:"Citas",notificaciones:"Notificaciones",reportes:"Reportes",chatbot:"Chatbot"}[e]??"Módulo";o.textContent=r,a.textContent=`Gestión del módulo de ${r}`,t.innerHTML=`
    <div class="empty-state">
      <h3>${r}</h3>
      <p>Este módulo se desarrollará en el siguiente paso.</p>
    </div>
  `}function Ne(e){return`
    <div class="barra-clientes">
      <input
        id="buscar-cliente"
        class="input-busqueda"
        type="search"
        placeholder="Buscar por nombre, correo o teléfono"
      />
    </div>

    <div id="lista-clientes">
      ${Me(e)}
    </div>
  `}function Me(e){return e.length===0?`
      <div class="empty-state">
        <h3>No hay clientes registrados</h3>
        <p>Presiona “Nuevo cliente” para registrar uno.</p>
      </div>
    `:`
    <div class="tabla-contenedor">
      <table class="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          ${e.map(t=>`
                <tr>
                  <td>
                    ${te(t.nombre)}
                    ${te(t.apellido)}
                  </td>

                  <td>
                    ${te(t.correo)}
                  </td>

                  <td>
                    ${te(t.telefono)}
                  </td>

                  <td>
                    <button
                      class="btn-editar-cliente"
                      data-id="${t.id}"
                      type="button"
                    >
                      Editar
                    </button>

                    <button
                      class="btn-eliminar-cliente"
                      data-id="${t.id}"
                      type="button"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              `).join("")}
        </tbody>
      </table>
    </div>
  `}function xe(){const e=document.querySelector("#buscar-cliente");e?.addEventListener("input",()=>{const t=e.value.trim().toLowerCase(),a=W().filter(n=>`${n.nombre} ${n.apellido}`.toLowerCase().includes(t)||n.correo.toLowerCase().includes(t)||n.telefono.includes(t));ie(a)}),Ie()}function Ie(){const e=document.querySelectorAll(".btn-editar-cliente"),t=document.querySelectorAll(".btn-eliminar-cliente");e.forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.id;a&&yt(a)})}),t.forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.id;if(!a)return;window.confirm("¿Deseas eliminar este cliente?")&&Ct(a)})})}function gt(){const e=window.prompt("Ingrese el nombre del cliente:");if(!e?.trim())return;const t=window.prompt("Ingrese el apellido del cliente:");if(!t?.trim())return;const o=window.prompt("Ingrese el correo electrónico:");if(!o?.trim())return;if(!je(o.trim())){window.alert("Ingrese un correo electrónico válido.");return}const a=window.prompt("Ingrese el teléfono de 10 números:");if(!a?.trim())return;if(!He(a.trim())){window.alert("El teléfono debe contener exactamente 10 números.");return}const n=W();if(n.some(f=>f.correo.toLowerCase()===o.trim().toLowerCase())){window.alert("Ya existe un cliente registrado con ese correo.");return}const r={id:crypto.randomUUID(),nombre:e.trim(),apellido:t.trim(),correo:o.trim().toLowerCase(),telefono:a.trim(),contrasena:"Cliente123",rol:"cliente"};n.push(r),me(n),z("Nuevo cliente registrado",`${r.nombre} ${r.apellido} fue registrado en el CRM.`,"cliente"),ie(n),Te(n.length),window.alert("Cliente registrado. Su contraseña temporal es Cliente123")}function yt(e){const t=W(),o=t.find(d=>d.id===e);if(!o){window.alert("No se encontró el cliente.");return}const a=window.prompt("Nombre del cliente:",o.nombre);if(!a?.trim())return;const n=window.prompt("Apellido del cliente:",o.apellido);if(!n?.trim())return;const i=window.prompt("Correo electrónico:",o.correo);if(!i?.trim())return;if(!je(i.trim())){window.alert("Ingrese un correo electrónico válido.");return}const r=window.prompt("Teléfono:",o.telefono);if(!r?.trim())return;if(!He(r.trim())){window.alert("El teléfono debe contener exactamente 10 números.");return}if(t.some(d=>d.id!==e&&d.correo.toLowerCase()===i.trim().toLowerCase())){window.alert("Ya existe otro cliente con ese correo.");return}o.nombre=a.trim(),o.apellido=n.trim(),o.correo=i.trim().toLowerCase(),o.telefono=r.trim(),me(t),ie(t),window.alert("Cliente actualizado correctamente.")}function Ct(e){const o=W().filter(a=>a.id!==e);me(o),ie(o),Te(o.length),window.alert("Cliente eliminado correctamente.")}function ie(e){const t=document.querySelector("#lista-clientes");t&&(t.innerHTML=Me(e),Ie())}function Te(e){const t=document.querySelector("#total-clientes");t&&(t.textContent=String(e))}function W(){const e=localStorage.getItem("clientes");if(!e)return[];try{const t=JSON.parse(e);return Array.isArray(t)?t:[]}catch{return[]}}function me(e){localStorage.setItem("clientes",JSON.stringify(e))}function je(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function He(e){return/^[0-9]{10}$/.test(e)}function te(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function $t(e){const t=Et();if(!t){V(e);return}e.innerHTML=`
    <div class="crm-shell">
      <aside class="crm-sidebar crm-sidebar-cliente">
        <div>
          <div class="crm-brand crm-brand-cliente">
            <div class="crm-brand-mark">K</div>

            <div>
              <strong>Karsan Digital</strong>
              <span>CLIENTE</span>
            </div>
          </div>

          <nav class="crm-nav">
            <button class="menu-item active" data-seccion="inicio">
              <span class="crm-nav-icon">🏠</span>
              <span>Inicio</span>
            </button>

            <button class="menu-item" data-seccion="perfil">
              <span class="crm-nav-icon">👤</span>
              <span>Mi perfil</span>
            </button>

            <button class="menu-item" data-seccion="citas">
              <span class="crm-nav-icon">📅</span>
              <span>Mis citas</span>
            </button>

            <button class="menu-item" data-seccion="chatbot">
              <span class="crm-nav-icon">🤖</span>
              <span>Chatbot</span>
            </button>

            <button class="menu-item" data-seccion="notificaciones">
              <span class="crm-nav-icon">🔔</span>
              <span>Notificaciones</span>
            </button>
          </nav>
        </div>

        <div class="crm-sidebar-footer">
          <div class="crm-user-card">
            <div class="crm-avatar">
              ${ye(t.nombre)}
            </div>

            <div>
              <strong>${H(t.nombre)}</strong>
              <span>${H(t.correo)}</span>
              <small>Cuenta activa</small>
            </div>
          </div>

          <button
            id="cerrar-sesion-cliente"
            class="crm-logout"
            type="button"
          >
            <span>↩</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <main class="crm-main">
        <header class="crm-topbar">
          <div>
            <h1>Bienvenido/a, ${H(t.nombre)}</h1>
            <p>Gestiona tu información y comunícate con Karsan Digital.</p>
          </div>

          <div class="crm-topbar-actions">
            <button
              class="crm-icon-button"
              type="button"
              data-seccion-chat="notificaciones"
              aria-label="Abrir notificaciones"
            >
              🔔
            </button>

            <div class="crm-profile">
              <div class="crm-avatar">
                ${ye(t.nombre)}
              </div>

              <div>
                <strong>${H(t.nombre)}</strong>
                <span>Cliente</span>
              </div>
            </div>
          </div>
        </header>

        <section class="crm-client-kpis">
          <article class="crm-client-kpi">
            <div class="crm-kpi-icon azul">📅</div>
            <div>
              <span>Citas pendientes</span>
              <strong id="cliente-total-citas">
                ${pe(t).length}
              </strong>
              <small>Citas programadas</small>
            </div>
          </article>

          <article class="crm-client-kpi">
            <div class="crm-kpi-icon naranja">🔔</div>
            <div>
              <span>Notificaciones</span>
              <strong>0</strong>
              <small>Mensajes nuevos</small>
            </div>
          </article>

          <article class="crm-client-kpi">
            <div class="crm-kpi-icon verde">🤖</div>
            <div>
              <span>Asistente virtual</span>
              <strong>Activo</strong>
              <small>Disponible ahora</small>
            </div>
          </article>
        </section>

        <section class="crm-card crm-workspace crm-client-content">
          <div id="contenido-cliente">
            ${Re(t)}
          </div>
        </section>

        <button
          class="crm-chat-fab"
          type="button"
          data-seccion-chat="chatbot"
          aria-label="Abrir chatbot"
        >
          🤖
        </button>
      </main>
    </div>
  `,Lt(e,t)}function Lt(e,t){const o=document.querySelector("#cerrar-sesion-cliente"),a=document.querySelectorAll(".menu-item");o?.addEventListener("click",()=>{localStorage.removeItem("usuarioActivo"),V(e)}),a.forEach(n=>{n.addEventListener("click",()=>{a.forEach(r=>{r.classList.remove("active")}),n.classList.add("active");const i=n.dataset.seccion??"inicio";ne(i,t)})}),document.querySelectorAll("[data-seccion-chat]").forEach(n=>{n.addEventListener("click",()=>{const i=n.dataset.seccionChat??"chatbot";ne(i,t),a.forEach(r=>{r.classList.toggle("active",r.dataset.seccion===i)})})}),ke(t)}function ne(e,t){const o=document.querySelector("#contenido-cliente");if(o){if(e==="inicio"){o.innerHTML=Re(t),ke(t);return}if(e==="perfil"){o.innerHTML=`
      <div class="perfil-cliente">
        <h2>Mi perfil</h2>

        <div class="perfil-datos">
          <p>
            <strong>Nombre:</strong>
            ${H(t.nombre)}
          </p>

          <p>
            <strong>Correo:</strong>
            ${H(t.correo)}
          </p>

          <p>
            <strong>Rol:</strong>
            Cliente
          </p>
        </div>
      </div>
    `;return}if(e==="citas"){const a=pe(t);o.innerHTML=`
      <div class="modulo-citas">
        <div class="encabezado-modulo">
          <div>
            <h2>Mis citas</h2>
            <p>Consulta las citas registradas a tu nombre.</p>
          </div>

          <button
            id="abrir-chat-cita"
            class="btn-principal"
            type="button"
          >
            Solicitar cita por chatbot
          </button>
        </div>

        ${St(a)}
      </div>
    `,document.querySelector("#abrir-chat-cita")?.addEventListener("click",()=>{ne("chatbot",t)});return}if(e==="chatbot"){o.innerHTML=Le(),Se();return}e==="notificaciones"&&(o.innerHTML=`
      <div class="empty-state">
        <h2>Notificaciones</h2>
        <p>
          Aquí aparecerán las confirmaciones y novedades
          relacionadas con tus citas.
        </p>
      </div>
    `)}}function ke(e){document.querySelector("#inicio-abrir-chatbot")?.addEventListener("click",()=>{ne("chatbot",e),document.querySelectorAll(".menu-item").forEach(t=>{t.classList.toggle("active",t.dataset.seccion==="chatbot")})})}function Re(e){const o=pe(e).find(a=>a.estado==="Pendiente"||a.estado==="Confirmada");return`
    <div class="inicio-cliente">
      <div class="empty-state">
        <h2>Panel principal</h2>

        <p>
          Bienvenido/a al CRM de Karsan Digital.
        </p>

        ${o?`
              <p>
                <strong>Próxima cita:</strong>
                ${De(o.fecha)}
                a las ${H(o.hora)}
              </p>
            `:`
              <p>
                Actualmente no tienes citas pendientes.
              </p>
            `}

        <button
          id="inicio-abrir-chatbot"
          class="btn-primary"
          type="button"
        >
          Hablar con el asistente
        </button>
      </div>
    </div>
  `}function pe(e){const t=localStorage.getItem("citas");if(!t)return[];try{const o=JSON.parse(t);return Array.isArray(o)?o.filter(a=>a.clienteId===e.id||a.clienteId===e.correo||a.clienteNombre.toLowerCase().includes(e.nombre.toLowerCase())):[]}catch{return[]}}function St(e){return e.length===0?`
      <div class="empty-state">
        <h3>No tienes citas registradas</h3>
        <p>
          Usa el chatbot para solicitar una nueva cita.
        </p>
      </div>
    `:`
    <div class="tabla-contenedor">
      <table class="tabla-datos">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asesor</th>
            <th>Motivo</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          ${e.map(t=>`
                <tr>
                  <td>${De(t.fecha)}</td>
                  <td>${H(t.hora)}</td>
                  <td>
                    ${H(t.asesorNombre||"Por asignar")}
                  </td>
                  <td>${H(t.motivo)}</td>
                  <td>
                    <span
                      class="estado estado-${t.estado.toLowerCase().replace(" ","-")}"
                    >
                      ${H(t.estado)}
                    </span>
                  </td>
                </tr>
              `).join("")}
        </tbody>
      </table>
    </div>
  `}function Et(){const e=localStorage.getItem("usuarioActivo");if(!e)return null;try{return JSON.parse(e)}catch{return null}}function ye(e){return e.trim().charAt(0).toUpperCase()}function De(e){const t=e.split("-");if(t.length!==3)return e;const[o,a,n]=t;return`${n}/${a}/${o}`}function H(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function wt(e){e.innerHTML=`
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
  `,At(e)}function At(e){const t=document.querySelector("#registro-form"),o=document.querySelector("#mensaje-registro"),a=document.querySelector("#volver-login");t?.addEventListener("submit",n=>{n.preventDefault();const i=document.querySelector("#nombre")?.value.trim()??"",r=document.querySelector("#apellido")?.value.trim()??"",f=document.querySelector("#correo-registro")?.value.trim().toLowerCase()??"",d=document.querySelector("#telefono")?.value.trim()??"",m=document.querySelector("#contrasena-registro")?.value??"",L=document.querySelector("#confirmar-contrasena")?.value??"";if(m!==L){oe(o,"Las contraseñas no coinciden.",!0);return}if(!/^[0-9]{10}$/.test(d)){oe(o,"El teléfono debe contener exactamente 10 números.",!0);return}const g=qt();if(g.some(y=>y.correo===f)){oe(o,"Ya existe una cuenta con ese correo.",!0);return}const S={id:crypto.randomUUID(),nombre:i,apellido:r,correo:f,telefono:d,contrasena:m,rol:"cliente"};g.push(S),localStorage.setItem("clientes",JSON.stringify(g)),oe(o,"Cuenta creada correctamente. Ya puede iniciar sesión.",!1),t.reset(),setTimeout(()=>{V(e)},1500)}),a?.addEventListener("click",()=>{V(e)})}function qt(){const e=localStorage.getItem("clientes");if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function oe(e,t,o){e&&(e.textContent=t,e.classList.toggle("mensaje-error",o),e.classList.toggle("mensaje-exito",!o))}function V(e){e.innerHTML=`
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
  `,Nt(e)}function Nt(e){const t=document.querySelector("#login-form"),o=document.querySelector("#mensaje-login"),a=document.querySelector("#btn-registro");t?.addEventListener("submit",n=>{n.preventDefault();const i=document.querySelector("#correo")?.value.trim().toLowerCase()??"",r=document.querySelector("#contrasena")?.value??"";if(i==="admin@karsandigital.com"&&r==="Admin123"){localStorage.setItem("usuarioActivo",JSON.stringify({nombre:"Administrador",correo:i,rol:"administrador"})),vt(e);return}const d=Mt().find(m=>m.correo===i&&m.contrasena===r);if(d){localStorage.setItem("usuarioActivo",JSON.stringify({id:d.id,nombre:`${d.nombre} ${d.apellido}`,correo:d.correo,rol:d.rol})),$t(e);return}o&&(o.textContent="Correo o contraseña incorrectos.",o.classList.remove("mensaje-exito"),o.classList.add("mensaje-error"))}),a?.addEventListener("click",()=>{wt(e)})}function Mt(){const e=localStorage.getItem("clientes");if(!e)return[];try{return JSON.parse(e)}catch{return[]}}const ze=document.querySelector("#app");if(!ze)throw new Error("No se encontró el elemento #app");V(ze);
