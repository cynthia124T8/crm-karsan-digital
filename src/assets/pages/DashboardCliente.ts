// =========================================================
// KARSAN DIGITAL CRM
// DASHBOARD CLIENTE
// PORTAL DEL CLIENTE
// =========================================================

import { mostrarCalendario } from "./Calendario";

// =========================================================
// INTERFACES
// =========================================================

interface Documento {
  id: number;
  nombre?: string;
  nombreArchivo?: string;
  archivo?: string;
  tipo?: string;
  correo?: string;
  usuarioId?: number;
  fecha?: string;
  createdAt?: string;
  tamaño?: number;
}

// =========================================================
// ESTILOS EXCLUSIVOS DEL PORTAL CLIENTE
// =========================================================

function cargarEstilosCliente(): void {
  const estiloExistente = document.getElementById(
    "karsan-cliente-styles"
  );

  if (estiloExistente) {
    return;
  }

  const style = document.createElement("style");

  style.id = "karsan-cliente-styles";

  style.textContent = `
    /* =====================================================
       KARSAN DIGITAL - PORTAL CLIENTE
       ESTILOS AISLADOS
       ===================================================== */

    .cliente-portal {
      --cliente-primary: #5b5ce2;
      --cliente-primary-dark: #4546c9;
      --cliente-primary-light: #eef0ff;
      --cliente-background: #f5f6fa;
      --cliente-white: #ffffff;
      --cliente-text: #202235;
      --cliente-secondary: #6f7385;
      --cliente-muted: #9da1b2;
      --cliente-border: #e7e8ef;
      --cliente-success: #18a974;
      --cliente-success-light: #e9f8f2;
      --cliente-warning: #f3a712;
      --cliente-warning-light: #fff5dc;
      --cliente-danger: #e05260;
      --cliente-danger-light: #ffedef;
      --cliente-shadow: 0 8px 30px rgba(35, 38, 80, 0.07);
      --cliente-radius: 18px;

      display: flex;
      min-height: 100vh;
      width: 100%;
      background: var(--cliente-background);
      color: var(--cliente-text);
      font-family:
        Inter,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      box-sizing: border-box;
    }

    .cliente-portal *,
    .cliente-portal *::before,
    .cliente-portal *::after {
      box-sizing: border-box;
    }

    /* =====================================================
       SIDEBAR
       ===================================================== */

    .cliente-sidebar {
      width: 260px;
      min-width: 260px;
      min-height: 100vh;
      background: #ffffff;
      border-right: 1px solid var(--cliente-border);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      z-index: 1000;
    }

    .cliente-brand {
      height: 88px;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 24px;
      border-bottom: 1px solid var(--cliente-border);
    }

    .cliente-logo {
      width: 44px;
      height: 44px;
      border-radius: 13px;
      background: linear-gradient(
        135deg,
        var(--cliente-primary),
        #7778ed
      );
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21px;
      font-weight: 800;
      box-shadow: 0 8px 18px rgba(91, 92, 226, 0.25);
    }

    .cliente-brand-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .cliente-brand-title {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: 0.5px;
    }

    .cliente-brand-subtitle {
      margin-top: 5px;
      color: var(--cliente-primary);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .cliente-nav {
      flex: 1;
      padding: 22px 14px;
      overflow-y: auto;
    }

    .cliente-nav-title {
      color: var(--cliente-muted);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      padding: 0 12px 10px;
      text-transform: uppercase;
    }

    .cliente-nav-item {
      width: 100%;
      min-height: 48px;
      margin-bottom: 5px;
      border: none;
      border-radius: 12px;
      background: transparent;
      color: var(--cliente-secondary);
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 13px;
      cursor: pointer;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      transition: 0.2s ease;
    }

    .cliente-nav-item:hover {
      background: #f7f7fc;
      color: var(--cliente-primary);
      transform: translateX(2px);
    }

    .cliente-nav-item.active {
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      font-weight: 700;
    }

    .cliente-nav-icon {
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      flex-shrink: 0;
    }

    .cliente-nav-badge {
      margin-left: auto;
      min-width: 22px;
      height: 22px;
      border-radius: 11px;
      background: var(--cliente-primary);
      color: white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      font-size: 10px;
      font-weight: 800;
    }

    .cliente-user {
      margin: 0 14px 12px;
      padding: 13px;
      border-radius: 14px;
      background: #f8f9fc;
      border: 1px solid var(--cliente-border);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .cliente-user-avatar,
    .cliente-header-avatar,
    .cliente-profile-avatar {
      background: linear-gradient(
        135deg,
        var(--cliente-primary),
        #8586f1
      );
      color: white;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .cliente-user-avatar {
      width: 38px;
      height: 38px;
      border-radius: 11px;
      font-size: 14px;
    }

    .cliente-user-info {
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .cliente-user-info strong {
      font-size: 12px;
      color: var(--cliente-text);
    }

    .cliente-user-info span {
      margin-top: 3px;
      font-size: 10px;
      color: var(--cliente-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cliente-logout {
      margin: 0 14px 18px;
      min-height: 44px;
      border: 1px solid #f0dfe1;
      border-radius: 12px;
      background: #fff8f8;
      color: var(--cliente-danger);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      font-size: 13px;
      font-weight: 700;
      transition: 0.2s ease;
    }

    .cliente-logout:hover {
      background: var(--cliente-danger-light);
    }

    /* =====================================================
       MAIN
       ===================================================== */

    .cliente-main {
      flex: 1;
      min-width: 0;
      background: var(--cliente-background);
    }

    .cliente-header {
      height: 82px;
      background: white;
      border-bottom: 1px solid var(--cliente-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      position: sticky;
      top: 0;
      z-index: 500;
    }

    .cliente-header-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .cliente-breadcrumb {
      color: var(--cliente-muted);
      font-size: 11px;
      margin-bottom: 5px;
    }

    .cliente-header-title {
      font-size: 16px;
      font-weight: 750;
    }

    .cliente-header-actions {
      display: flex;
      align-items: center;
      gap: 13px;
    }

    .cliente-notification-button {
      position: relative;
      width: 42px;
      height: 42px;
      border: 1px solid var(--cliente-border);
      border-radius: 12px;
      background: white;
      color: var(--cliente-secondary);
      cursor: pointer;
      font-size: 19px;
      transition: 0.2s ease;
    }

    .cliente-notification-button:hover {
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      border-color: #dcdcff;
    }

    .cliente-notification-dot {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--cliente-danger);
      border: 2px solid white;
    }

    .cliente-header-avatar {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      font-size: 14px;
    }

    .cliente-mobile-menu {
      display: none;
      width: 42px;
      height: 42px;
      border: 1px solid var(--cliente-border);
      border-radius: 11px;
      background: white;
      cursor: pointer;
      font-size: 20px;
    }

    .cliente-content {
      padding: 32px;
      max-width: 1500px;
      margin: 0 auto;
    }

    /* =====================================================
       PAGE HEADING
       ===================================================== */

    .cliente-page-heading {
      margin-bottom: 26px;
    }

    .cliente-page-label {
      display: inline-flex;
      align-items: center;
      padding: 6px 10px;
      border-radius: 8px;
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .cliente-page-heading h1 {
      margin: 0;
      font-size: clamp(25px, 3vw, 34px);
      line-height: 1.2;
      letter-spacing: -0.8px;
    }

    .cliente-page-heading p {
      margin: 9px 0 0;
      color: var(--cliente-secondary);
      font-size: 14px;
      line-height: 1.6;
      max-width: 720px;
    }

    /* =====================================================
       STATS
       ===================================================== */

    .cliente-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
      margin-bottom: 22px;
    }

    .cliente-stat {
      background: white;
      border: 1px solid var(--cliente-border);
      border-radius: var(--cliente-radius);
      padding: 20px;
      box-shadow: var(--cliente-shadow);
      display: flex;
      align-items: center;
      gap: 15px;
      min-height: 112px;
      transition: 0.2s ease;
    }

    .cliente-stat:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 34px rgba(35, 38, 80, 0.1);
    }

    .cliente-stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21px;
      flex-shrink: 0;
    }

    .cliente-stat:nth-child(2) .cliente-stat-icon {
      background: var(--cliente-warning-light);
      color: var(--cliente-warning);
    }

    .cliente-stat:nth-child(3) .cliente-stat-icon {
      background: var(--cliente-success-light);
      color: var(--cliente-success);
    }

    .cliente-stat:nth-child(4) .cliente-stat-icon {
      background: var(--cliente-danger-light);
      color: var(--cliente-danger);
    }

    .cliente-stat-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cliente-stat-info span {
      color: var(--cliente-secondary);
      font-size: 12px;
      font-weight: 600;
    }

    .cliente-stat-info strong {
      font-size: 25px;
      line-height: 1;
    }

    /* =====================================================
       CARDS
       ===================================================== */

    .cliente-columns {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.8fr);
      gap: 20px;
      margin-bottom: 20px;
    }

    .cliente-card {
      background: white;
      border: 1px solid var(--cliente-border);
      border-radius: var(--cliente-radius);
      box-shadow: var(--cliente-shadow);
      padding: 22px;
      margin-bottom: 20px;
    }

    .cliente-columns .cliente-card {
      margin-bottom: 0;
    }

    .cliente-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 18px;
    }

    .cliente-card-label {
      display: block;
      color: var(--cliente-primary);
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 1.2px;
      margin-bottom: 5px;
    }

    .cliente-card-header h2 {
      margin: 0;
      font-size: 18px;
    }

    .cliente-text-button {
      border: none;
      background: transparent;
      color: var(--cliente-primary);
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      padding: 7px;
    }

    .cliente-text-button:hover {
      text-decoration: underline;
    }

    /* =====================================================
       PROJECTS
       ===================================================== */

    .cliente-project-list {
      display: flex;
      flex-direction: column;
    }

    .cliente-project-item {
      display: flex;
      align-items: center;
      gap: 13px;
      padding: 14px 0;
      border-bottom: 1px solid #f0f0f4;
    }

    .cliente-project-item:last-child {
      border-bottom: none;
    }

    .cliente-project-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      flex-shrink: 0;
    }

    .cliente-project-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cliente-project-info strong {
      font-size: 13px;
    }

    .cliente-project-info span {
      color: var(--cliente-secondary);
      font-size: 11px;
    }

    .cliente-status {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 6px 9px;
      font-size: 10px;
      font-weight: 700;
      white-space: nowrap;
    }

    .cliente-status-process {
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
    }

    .cliente-status-review {
      background: var(--cliente-warning-light);
      color: #a96d00;
    }

    .cliente-status-active {
      background: var(--cliente-success-light);
      color: var(--cliente-success);
    }

    /* =====================================================
       ACTIVITY
       ===================================================== */

    .cliente-activity-list {
      display: flex;
      flex-direction: column;
    }

    .cliente-activity-item {
      display: flex;
      gap: 13px;
      padding: 13px 0;
      border-bottom: 1px solid #f0f0f4;
    }

    .cliente-activity-item:last-child {
      border-bottom: none;
    }

    .cliente-activity-dot {
      width: 10px;
      height: 10px;
      margin-top: 4px;
      border-radius: 50%;
      background: var(--cliente-primary);
      box-shadow: 0 0 0 5px var(--cliente-primary-light);
      flex-shrink: 0;
    }

    .cliente-activity-item div:last-child {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cliente-activity-item strong {
      font-size: 12px;
    }

    .cliente-activity-item span {
      color: var(--cliente-secondary);
      font-size: 11px;
    }

    /* =====================================================
       QUICK ACTIONS
       ===================================================== */

    .cliente-quick-actions {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 13px;
    }

    .cliente-quick-action {
      border: 1px solid var(--cliente-border);
      border-radius: 14px;
      background: #fafaff;
      padding: 18px;
      text-align: left;
      cursor: pointer;
      transition: 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .cliente-quick-action:hover {
      border-color: #cecff8;
      background: var(--cliente-primary-light);
      transform: translateY(-2px);
    }

    .cliente-quick-action-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: white;
      color: var(--cliente-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      margin-bottom: 3px;
    }

    .cliente-quick-action strong {
      font-size: 12px;
    }

    .cliente-quick-action small {
      color: var(--cliente-secondary);
      font-size: 10px;
      line-height: 1.5;
    }

    /* =====================================================
       BUTTONS
       ===================================================== */

    .cliente-primary-button {
      min-height: 44px;
      border: none;
      border-radius: 11px;
      background: var(--cliente-primary);
      color: white;
      padding: 0 17px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      transition: 0.2s ease;
    }

    .cliente-primary-button:hover {
      background: var(--cliente-primary-dark);
      transform: translateY(-1px);
    }

    /* =====================================================
       FORMS
       ===================================================== */

    .cliente-form-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
      margin-bottom: 17px;
    }

    .cliente-form-group label {
      font-size: 12px;
      color: var(--cliente-text);
      font-weight: 700;
    }

    .cliente-form-group input,
    .cliente-form-group select,
    .cliente-form-group textarea,
    .cliente-message-form textarea {
      width: 100%;
      border: 1px solid var(--cliente-border);
      border-radius: 11px;
      background: white;
      color: var(--cliente-text);
      padding: 12px 13px;
      outline: none;
      font-family: inherit;
      font-size: 13px;
      transition: 0.2s ease;
    }

    .cliente-form-group input:focus,
    .cliente-form-group select:focus,
    .cliente-form-group textarea:focus,
    .cliente-message-form textarea:focus {
      border-color: var(--cliente-primary);
      box-shadow: 0 0 0 3px var(--cliente-primary-light);
    }

    /* =====================================================
       UPLOAD
       ===================================================== */

    .cliente-upload-area {
      border: 2px dashed #dcddef;
      border-radius: 16px;
      padding: 34px 20px;
      text-align: center;
      background: #fafaff;
      margin-bottom: 22px;
    }

    .cliente-upload-icon {
      width: 55px;
      height: 55px;
      margin: 0 auto 12px;
      border-radius: 15px;
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
    }

    .cliente-upload-area h3 {
      margin: 0 0 7px;
      font-size: 16px;
    }

    .cliente-upload-area p {
      margin: 0 0 17px;
      color: var(--cliente-secondary);
      font-size: 11px;
      line-height: 1.6;
    }

    .cliente-selected-file {
      margin-top: 12px;
      color: var(--cliente-primary);
      font-size: 11px;
      font-weight: 700;
      word-break: break-word;
    }

    .cliente-upload-message {
      margin-top: 13px;
      padding: 10px 12px;
      border-radius: 9px;
      font-size: 11px;
      display: none;
    }

    .cliente-upload-message:not(:empty) {
      display: block;
    }

    .cliente-upload-message.success {
      background: var(--cliente-success-light);
      color: var(--cliente-success);
    }

    .cliente-upload-message.error {
      background: var(--cliente-danger-light);
      color: var(--cliente-danger);
    }

    /* =====================================================
       DOCUMENTS
       ===================================================== */

    .cliente-document-list {
      display: flex;
      flex-direction: column;
    }

    .cliente-document-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 0;
      border-bottom: 1px solid #f0f0f4;
    }

    .cliente-document-item:last-child {
      border-bottom: none;
    }

    .cliente-document-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: var(--cliente-danger-light);
      color: var(--cliente-danger);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 18px;
    }

    .cliente-document-information {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .cliente-document-information strong {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cliente-document-information span {
      color: var(--cliente-secondary);
      font-size: 10px;
    }

    .cliente-document-download {
      border: 1px solid #dcddef;
      background: white;
      color: var(--cliente-primary);
      border-radius: 9px;
      padding: 8px 11px;
      cursor: pointer;
      font-size: 10px;
      font-weight: 700;
    }

    .cliente-document-download:hover {
      background: var(--cliente-primary-light);
    }

    /* =====================================================
       EMPTY
       ===================================================== */

    .cliente-empty {
      min-height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 7px;
      text-align: center;
      color: var(--cliente-secondary);
    }

    .cliente-empty-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: #f2f3f8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 21px;
      margin-bottom: 4px;
    }

    .cliente-empty strong {
      color: var(--cliente-text);
      font-size: 13px;
    }

    .cliente-empty span {
      font-size: 11px;
    }

    /* =====================================================
       MESSAGES
       ===================================================== */

    .cliente-message-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 22px;
    }

    .cliente-message-item {
      display: flex;
      gap: 13px;
      padding: 15px;
      border-radius: 13px;
      background: #fafaff;
      border: 1px solid #f0f0f5;
    }

    .cliente-message-avatar {
      width: 40px;
      height: 40px;
      border-radius: 11px;
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
      flex-shrink: 0;
    }

    .cliente-message-content {
      flex: 1;
    }

    .cliente-message-content strong {
      font-size: 12px;
    }

    .cliente-message-content p {
      margin: 6px 0;
      color: var(--cliente-secondary);
      font-size: 12px;
      line-height: 1.6;
    }

    .cliente-message-content span {
      color: var(--cliente-muted);
      font-size: 10px;
    }

    .cliente-message-form {
      border-top: 1px solid var(--cliente-border);
      padding-top: 20px;
    }

    .cliente-message-form textarea {
      resize: vertical;
      min-height: 110px;
      margin-bottom: 12px;
    }

    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    .cliente-notification-list {
      display: flex;
      flex-direction: column;
    }

    .cliente-notification-item {
      display: flex;
      gap: 14px;
      padding: 17px 0;
      border-bottom: 1px solid #f0f0f4;
    }

    .cliente-notification-item:last-child {
      border-bottom: none;
    }

    .cliente-notification-icon {
      width: 43px;
      height: 43px;
      border-radius: 12px;
      background: var(--cliente-success-light);
      color: var(--cliente-success);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-weight: 800;
    }

    .cliente-notification-item strong {
      font-size: 12px;
    }

    .cliente-notification-item p {
      margin: 5px 0;
      color: var(--cliente-secondary);
      font-size: 11px;
    }

    .cliente-notification-item span {
      color: var(--cliente-muted);
      font-size: 10px;
    }

    /* =====================================================
       COMPANY
       ===================================================== */

    .cliente-company-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .cliente-company-info {
      display: flex;
      flex-direction: column;
    }

    .cliente-company-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f4;
      font-size: 12px;
    }

    .cliente-company-row:last-child {
      border-bottom: none;
    }

    .cliente-company-row span {
      color: var(--cliente-secondary);
    }

    .cliente-company-row strong {
      text-align: right;
    }

    .cliente-social-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cliente-social-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px;
      border-radius: 12px;
      background: #fafaff;
      border: 1px solid #f0f0f5;
    }

    .cliente-social-name {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      font-weight: 700;
    }

    .cliente-social-icon {
      width: 32px;
      height: 32px;
      border-radius: 9px;
      background: var(--cliente-primary-light);
      color: var(--cliente-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
    }

    .cliente-social-connected {
      color: var(--cliente-success);
      font-size: 10px;
      font-weight: 700;
    }

    /* =====================================================
       PROFILE
       ===================================================== */

    .cliente-profile-header {
      display: flex;
      align-items: center;
      gap: 17px;
      padding-bottom: 22px;
      margin-bottom: 22px;
      border-bottom: 1px solid var(--cliente-border);
    }

    .cliente-profile-avatar {
      width: 68px;
      height: 68px;
      border-radius: 19px;
      font-size: 23px;
    }

    .cliente-profile-header h2 {
      margin: 0;
      font-size: 20px;
    }

    .cliente-profile-header p {
      margin: 5px 0 0;
      color: var(--cliente-secondary);
      font-size: 12px;
    }

    .cliente-profile-form {
      max-width: 700px;
    }

    /* =====================================================
       RESPONSIVE
       ===================================================== */

    @media (max-width: 1100px) {
      .cliente-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .cliente-quick-actions {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 900px) {
      .cliente-sidebar {
        position: fixed;
        left: -280px;
        top: 0;
        transition: left 0.25s ease;
        box-shadow: 10px 0 30px rgba(0, 0, 0, 0.08);
      }

      .cliente-sidebar.open {
        left: 0;
      }

      .cliente-mobile-menu {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .cliente-content {
        padding: 24px;
      }

      .cliente-columns,
      .cliente-company-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 650px) {
      .cliente-header {
        height: 70px;
        padding: 0 16px;
      }

      .cliente-content {
        padding: 18px 14px;
      }

      .cliente-stats {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }

      .cliente-stat {
        padding: 14px;
        min-height: 95px;
      }

      .cliente-stat-icon {
        width: 42px;
        height: 42px;
      }

      .cliente-stat-info strong {
        font-size: 20px;
      }

      .cliente-stat-info span {
        font-size: 10px;
      }

      .cliente-quick-actions {
        grid-template-columns: 1fr;
      }

      .cliente-page-heading h1 {
        font-size: 25px;
      }

      .cliente-document-item {
        align-items: flex-start;
      }

      .cliente-document-download {
        padding: 7px 8px;
      }

      .cliente-header-title {
        font-size: 14px;
      }

      .cliente-breadcrumb {
        font-size: 9px;
      }
    }

    @media (max-width: 430px) {
      .cliente-stats {
        grid-template-columns: 1fr;
      }

      .cliente-stat {
        min-height: 82px;
      }

      .cliente-card {
        padding: 16px;
        border-radius: 15px;
      }

      .cliente-project-item {
        flex-wrap: wrap;
      }

      .cliente-status {
        margin-left: 55px;
      }

      .cliente-header-avatar {
        width: 38px;
        height: 38px;
      }

      .cliente-notification-button {
        width: 38px;
        height: 38px;
      }
    }
  `;

  document.head.appendChild(style);
}

// =========================================================
// DASHBOARD PRINCIPAL
// =========================================================

export function mostrarDashboardCliente(
  app: HTMLElement,
  email: string = "cliente@karsan.com"
): void {

  cargarEstilosCliente();

  app.innerHTML = `
    <div class="cliente-portal">

      <!-- =================================================
           SIDEBAR
           ================================================= -->

      <aside class="cliente-sidebar" id="clienteSidebar">

        <div class="cliente-brand">

          <div class="cliente-logo">
            K
          </div>

          <div class="cliente-brand-text">
            <div class="cliente-brand-title">
              KARSAN
            </div>

            <div class="cliente-brand-subtitle">
              DIGITAL
            </div>
          </div>

        </div>

        <nav class="cliente-nav">

          <div class="cliente-nav-title">
            Portal cliente
          </div>

          <button
            class="cliente-nav-item active"
            data-section="inicio"
            type="button"
          >
            <span class="cliente-nav-icon">⌂</span>
            <span>Inicio</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="proyectos"
            type="button"
          >
            <span class="cliente-nav-icon">▣</span>
            <span>Mis proyectos</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="documentos"
            type="button"
          >
            <span class="cliente-nav-icon">▤</span>
            <span>Documentos</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="calendario"
            type="button"
          >
            <span class="cliente-nav-icon">▦</span>
            <span>Calendario</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="mensajes"
            type="button"
          >
            <span class="cliente-nav-icon">✉</span>
            <span>Mensajes</span>
            <span class="cliente-nav-badge">4</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="notificaciones"
            type="button"
          >
            <span class="cliente-nav-icon">♢</span>
            <span>Notificaciones</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="empresa"
            type="button"
          >
            <span class="cliente-nav-icon">▥</span>
            <span>Mi empresa</span>
          </button>

          <button
            class="cliente-nav-item"
            data-section="perfil"
            type="button"
          >
            <span class="cliente-nav-icon">◉</span>
            <span>Mi perfil</span>
          </button>

        </nav>

        <!-- USUARIO -->

        <div class="cliente-user">

          <div class="cliente-user-avatar">
            ${obtenerInicial(email)}
          </div>

          <div class="cliente-user-info">

            <strong>
              Cliente
            </strong>

            <span>
              ${escaparHTML(email)}
            </span>

          </div>

        </div>

        <!-- LOGOUT -->

        <button
          class="cliente-logout"
          id="btnCerrarSesionCliente"
          type="button"
        >
          <span>↪</span>
          <span>Cerrar sesión</span>
        </button>

      </aside>

      <!-- =================================================
           CONTENIDO PRINCIPAL
           ================================================= -->

      <main class="cliente-main">

        <!-- HEADER -->

        <header class="cliente-header">

          <div class="cliente-header-left">

            <button
              class="cliente-mobile-menu"
              id="btnMenuCliente"
              type="button"
              aria-label="Abrir menú"
            >
              ☰
            </button>

            <div>

              <div class="cliente-breadcrumb">
                Karsan Digital / Portal cliente
              </div>

              <div class="cliente-header-title">
                Portal del cliente
              </div>

            </div>

          </div>

          <div class="cliente-header-actions">

            <button
              class="cliente-notification-button"
              id="btnNotificacionesCliente"
              type="button"
              title="Notificaciones"
            >
              ♢
              <span class="cliente-notification-dot"></span>
            </button>

            <div class="cliente-header-avatar">
              ${obtenerInicial(email)}
            </div>

          </div>

        </header>

        <!-- CONTENIDO -->

        <section
          class="cliente-content"
          id="contenidoCliente"
        ></section>

      </main>

    </div>
  `;

  configurarEventosCliente(app, email);

  mostrarInicioCliente(app, email);
}

// =========================================================
// EVENTOS GENERALES
// =========================================================

function configurarEventosCliente(
  app: HTMLElement,
  email: string
): void {

  app.addEventListener("click", (evento) => {

    const objetivo = evento.target as HTMLElement;

    const botonSeccion = objetivo.closest(
      "[data-section]"
    ) as HTMLElement | null;

    if (!botonSeccion) {
      return;
    }

    const seccion = botonSeccion.dataset.section;

    if (!seccion) {
      return;
    }

    app
      .querySelectorAll(".cliente-nav-item")
      .forEach((elemento) => {
        elemento.classList.remove("active");
      });

    if (
      botonSeccion.classList.contains(
        "cliente-nav-item"
      )
    ) {
      botonSeccion.classList.add("active");
    }

    mostrarSeccionCliente(
      app,
      seccion,
      email
    );

    const sidebar =
      document.getElementById(
        "clienteSidebar"
      );

    sidebar?.classList.remove("open");
  });

  // =====================================================
  // MENÚ MÓVIL
  // =====================================================

  const btnMenu =
    document.getElementById(
      "btnMenuCliente"
    );

  btnMenu?.addEventListener(
    "click",
    () => {

      const sidebar =
        document.getElementById(
          "clienteSidebar"
        );

      sidebar?.classList.toggle("open");
    }
  );

  // =====================================================
  // CERRAR SESIÓN
  // =====================================================

  const btnCerrar =
    document.getElementById(
      "btnCerrarSesionCliente"
    );

  btnCerrar?.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "karsan_usuario"
      );

      window.location.reload();
    }
  );

  // =====================================================
  // NOTIFICACIONES
  // =====================================================

  const btnNotificaciones =
    document.getElementById(
      "btnNotificacionesCliente"
    );

  btnNotificaciones?.addEventListener(
    "click",
    () => {

      app
        .querySelectorAll(".cliente-nav-item")
        .forEach((elemento) => {
          elemento.classList.remove("active");
        });

      const boton =
        app.querySelector(
          '[data-section="notificaciones"]'
        );

      boton?.classList.add("active");

      mostrarNotificaciones(app);
    }
  );

  // =====================================================
  // DESCARGAR DOCUMENTOS
  // =====================================================

  app.addEventListener(
    "click",
    (evento) => {

      const objetivo =
        evento.target as HTMLElement;

      const botonDescargar =
        objetivo.closest(
          "[data-documento-id]"
        ) as HTMLElement | null;

      if (!botonDescargar) {
        return;
      }

      const id =
        botonDescargar.dataset.documentoId;

      if (!id) {
        return;
      }

      window.open(
        `http://localhost:3002/api/documentos/${id}/descargar`,
        "_blank"
      );
    }
  );
}

// =========================================================
// CAMBIAR SECCIÓN
// =========================================================

function mostrarSeccionCliente(
  app: HTMLElement,
  seccion: string,
  email: string
): void {

  switch (seccion) {

    case "inicio":
      mostrarInicioCliente(
        app,
        email
      );
      break;

    case "proyectos":
      mostrarProyectos(app);
      break;

    case "documentos":
      mostrarDocumentos(
        app,
        email
      );
      break;

    case "calendario": {

      const contenido =
        document.getElementById(
          "contenidoCliente"
        );

      if (!contenido) {
        return;
      }

      contenido.innerHTML = `
        <div class="cliente-page-heading">

          <div class="cliente-page-label">
            CALENDARIO
          </div>

          <h1>
            Mi calendario
          </h1>

          <p>
            Revisa tus reuniones, actividades
            y fechas importantes.
          </p>

        </div>

        <div class="cliente-card">
          <div id="calendarioCliente"></div>
        </div>
      `;

      const calendario =
        document.getElementById(
          "calendarioCliente"
        );

      if (calendario) {

        mostrarCalendario(
          calendario,
          "cliente",
          email
        );
      }

      break;
    }

    case "mensajes":
      mostrarMensajes(app);
      break;

    case "notificaciones":
      mostrarNotificaciones(app);
      break;

    case "empresa":
      mostrarEmpresa(app);
      break;

    case "perfil":
      mostrarPerfil(
        app,
        email
      );
      break;

    default:
      mostrarInicioCliente(
        app,
        email
      );
      break;
  }
}

// =========================================================
// INICIO
// =========================================================

function mostrarInicioCliente(
  app: HTMLElement,
  email: string
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        PANEL DEL CLIENTE
      </div>

      <h1>
        Bienvenido a Karsan Digital
      </h1>

      <p>
        Gestiona tus proyectos, documentos
        y comunicación desde un solo lugar.
      </p>

    </div>

    <!-- ESTADÍSTICAS -->

    <div class="cliente-stats">

      <div class="cliente-stat">

        <div class="cliente-stat-icon">
          ▣
        </div>

        <div class="cliente-stat-info">

          <span>
            Proyectos
          </span>

          <strong>
            4
          </strong>

        </div>

      </div>

      <div class="cliente-stat">

        <div class="cliente-stat-icon">
          ◷
        </div>

        <div class="cliente-stat-info">

          <span>
            En proceso
          </span>

          <strong>
            2
          </strong>

        </div>

      </div>

      <div class="cliente-stat">

        <div class="cliente-stat-icon">
          ▤
        </div>

        <div class="cliente-stat-info">

          <span>
            Documentos
          </span>

          <strong id="totalDocumentosInicio">
            0
          </strong>

        </div>

      </div>

      <div class="cliente-stat">

        <div class="cliente-stat-icon">
          ✉
        </div>

        <div class="cliente-stat-info">

          <span>
            Mensajes
          </span>

          <strong>
            4
          </strong>

        </div>

      </div>

    </div>

    <!-- COLUMNAS -->

    <div class="cliente-columns">

      <!-- PROYECTOS -->

      <div class="cliente-card">

        <div class="cliente-card-header">

          <div>

            <span class="cliente-card-label">
              ACTIVIDAD
            </span>

            <h2>
              Mis proyectos
            </h2>

          </div>

          <button
            class="cliente-text-button"
            data-section="proyectos"
            type="button"
          >
            Ver todos
          </button>

        </div>

        <div class="cliente-project-list">

          <div class="cliente-project-item">

            <div class="cliente-project-icon">
              W
            </div>

            <div class="cliente-project-info">

              <strong>
                Diseño de página web
              </strong>

              <span>
                En desarrollo
              </span>

            </div>

            <div class="cliente-status cliente-status-process">
              En proceso
            </div>

          </div>

          <div class="cliente-project-item">

            <div class="cliente-project-icon">
              M
            </div>

            <div class="cliente-project-info">

              <strong>
                Campaña de marketing
              </strong>

              <span>
                Revisión
              </span>

            </div>

            <div class="cliente-status cliente-status-review">
              Revisión
            </div>

          </div>

          <div class="cliente-project-item">

            <div class="cliente-project-icon">
              R
            </div>

            <div class="cliente-project-info">

              <strong>
                Gestión de redes sociales
              </strong>

              <span>
                Activo
              </span>

            </div>

            <div class="cliente-status cliente-status-active">
              Activo
            </div>

          </div>

        </div>

      </div>

      <!-- ACTIVIDAD -->

      <div class="cliente-card">

        <div class="cliente-card-header">

          <div>

            <span class="cliente-card-label">
              RECIENTE
            </span>

            <h2>
              Actividad reciente
            </h2>

          </div>

        </div>

        <div class="cliente-activity-list">

          <div class="cliente-activity-item">

            <div class="cliente-activity-dot"></div>

            <div>

              <strong>
                Documento recibido
              </strong>

              <span>
                Hace 2 horas
              </span>

            </div>

          </div>

          <div class="cliente-activity-item">

            <div class="cliente-activity-dot"></div>

            <div>

              <strong>
                Proyecto actualizado
              </strong>

              <span>
                Ayer
              </span>

            </div>

          </div>

          <div class="cliente-activity-item">

            <div class="cliente-activity-dot"></div>

            <div>

              <strong>
                Nuevo mensaje del asesor
              </strong>

              <span>
                Hace 2 días
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- ACCIONES RÁPIDAS -->

    <div class="cliente-card">

      <div class="cliente-card-header">

        <div>

          <span class="cliente-card-label">
            ACCESO RÁPIDO
          </span>

          <h2>
            ¿Qué necesitas hacer?
          </h2>

        </div>

      </div>

      <div class="cliente-quick-actions">

        <button
          class="cliente-quick-action"
          data-section="documentos"
          type="button"
        >

          <span class="cliente-quick-action-icon">
            ↑
          </span>

          <strong>
            Subir documento
          </strong>

          <small>
            Envía un archivo al administrador.
          </small>

        </button>

        <button
          class="cliente-quick-action"
          data-section="documentos"
          type="button"
        >

          <span class="cliente-quick-action-icon">
            ▣
          </span>

          <strong>
            Subir comprobante
          </strong>

          <small>
            Envía tu comprobante de pago.
          </small>

        </button>

        <button
          class="cliente-quick-action"
          data-section="mensajes"
          type="button"
        >

          <span class="cliente-quick-action-icon">
            ✉
          </span>

          <strong>
            Contactar asesor
          </strong>

          <small>
            Envía un mensaje a Karsan Digital.
          </small>

        </button>

        <button
          class="cliente-quick-action"
          data-section="calendario"
          type="button"
        >

          <span class="cliente-quick-action-icon">
            ▦
          </span>

          <strong>
            Ver calendario
          </strong>

          <small>
            Revisa tus actividades y reuniones.
          </small>

        </button>

      </div>

    </div>
  `;

  cargarCantidadDocumentos(email);
}

// =========================================================
// PROYECTOS
// =========================================================

function mostrarProyectos(
  app: HTMLElement
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        PROYECTOS
      </div>

      <h1>
        Mis proyectos
      </h1>

      <p>
        Consulta el estado de los proyectos
        gestionados por Karsan Digital.
      </p>

    </div>

    <div class="cliente-card">

      <div class="cliente-card-header">

        <div>

          <span class="cliente-card-label">
            MIS PROYECTOS
          </span>

          <h2>
            Proyectos actuales
          </h2>

        </div>

      </div>

      <div class="cliente-project-list">

        <div class="cliente-project-item">

          <div class="cliente-project-icon">
            W
          </div>

          <div class="cliente-project-info">

            <strong>
              Diseño de página web
            </strong>

            <span>
              Proyecto de desarrollo web
            </span>

          </div>

          <div class="cliente-status cliente-status-process">
            En proceso
          </div>

        </div>

        <div class="cliente-project-item">

          <div class="cliente-project-icon">
            M
          </div>

          <div class="cliente-project-info">

            <strong>
              Campaña de marketing
            </strong>

            <span>
              Campaña digital
            </span>

          </div>

          <div class="cliente-status cliente-status-review">
            Revisión
          </div>

        </div>

        <div class="cliente-project-item">

          <div class="cliente-project-icon">
            R
          </div>

          <div class="cliente-project-info">

            <strong>
              Gestión de redes sociales
            </strong>

            <span>
              Administración de redes
            </span>

          </div>

          <div class="cliente-status cliente-status-active">
            Activo
          </div>

        </div>

        <div class="cliente-project-item">

          <div class="cliente-project-icon">
            B
          </div>

          <div class="cliente-project-info">

            <strong>
              Branding empresarial
            </strong>

            <span>
              Identidad visual
            </span>

          </div>

          <div class="cliente-status cliente-status-active">
            Activo
          </div>

        </div>

      </div>

    </div>
  `;
}

// =========================================================
// DOCUMENTOS
// =========================================================

function mostrarDocumentos(
  app: HTMLElement,
  email: string
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        DOCUMENTOS
      </div>

      <h1>
        Mis documentos
      </h1>

      <p>
        Sube documentos y comprobantes
        para que el administrador pueda revisarlos.
      </p>

    </div>

    <!-- SUBIR -->

    <div class="cliente-card">

      <div class="cliente-card-header">

        <div>

          <span class="cliente-card-label">
            NUEVO DOCUMENTO
          </span>

          <h2>
            Subir archivo
          </h2>

        </div>

      </div>

      <div class="cliente-upload-area">

        <div class="cliente-upload-icon">
          ↑
        </div>

        <h3>
          Selecciona un archivo
        </h3>

        <p>
          PDF, JPG, PNG, DOC, DOCX, XLS o XLSX.
          Máximo 10 MB.
        </p>

        <input
          type="file"
          id="archivoDocumento"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
          hidden
        />

        <button
          type="button"
          class="cliente-primary-button"
          id="btnSeleccionarDocumento"
        >
          Seleccionar archivo
        </button>

        <div
          id="nombreArchivoSeleccionado"
          class="cliente-selected-file"
        >
          Ningún archivo seleccionado
        </div>

      </div>

      <div class="cliente-form-group">

        <label for="tipoDocumento">
          Tipo de documento
        </label>

        <select id="tipoDocumento">

          <option value="documento">
            Documento
          </option>

          <option value="comprobante">
            Comprobante de pago
          </option>

          <option value="transferencia">
            Transferencia
          </option>

          <option value="factura">
            Factura
          </option>

          <option value="contrato">
            Contrato
          </option>

          <option value="otro">
            Otro
          </option>

        </select>

      </div>

      <button
        type="button"
        class="cliente-primary-button"
        id="btnSubirDocumento"
      >
        Subir documento
      </button>

      <div
        id="mensajeSubidaDocumento"
        class="cliente-upload-message"
      ></div>

    </div>

    <!-- LISTA -->

    <div class="cliente-card">

      <div class="cliente-card-header">

        <div>

          <span class="cliente-card-label">
            ARCHIVOS
          </span>

          <h2>
            Documentos enviados
          </h2>

        </div>

        <button
          type="button"
          class="cliente-text-button"
          id="btnActualizarDocumentos"
        >
          Actualizar
        </button>

      </div>

      <div id="listaDocumentosCliente">

        <div class="cliente-empty">
          Cargando documentos...
        </div>

      </div>

    </div>
  `;

  configurarDocumentos(email);

  cargarDocumentos(email);
}

// =========================================================
// CONFIGURAR DOCUMENTOS
// =========================================================

function configurarDocumentos(
  email: string
): void {

  const input =
    document.getElementById(
      "archivoDocumento"
    ) as HTMLInputElement | null;

  const btnSeleccionar =
    document.getElementById(
      "btnSeleccionarDocumento"
    );

  const nombreArchivo =
    document.getElementById(
      "nombreArchivoSeleccionado"
    );

  const btnSubir =
    document.getElementById(
      "btnSubirDocumento"
    );

  const btnActualizar =
    document.getElementById(
      "btnActualizarDocumentos"
    );

  btnSeleccionar?.addEventListener(
    "click",
    () => {
      input?.click();
    }
  );

  input?.addEventListener(
    "change",
    () => {

      const archivo =
        input.files?.[0];

      if (!nombreArchivo) {
        return;
      }

      nombreArchivo.textContent =
        archivo
          ? archivo.name
          : "Ningún archivo seleccionado";
    }
  );

  btnSubir?.addEventListener(
    "click",
    () => {

      subirDocumento(
        input,
        email
      );
    }
  );

  btnActualizar?.addEventListener(
    "click",
    () => {

      cargarDocumentos(email);
    }
  );
}

// =========================================================
// SUBIR DOCUMENTO
// =========================================================

async function subirDocumento(
  input: HTMLInputElement | null,
  email: string
): Promise<void> {

  const mensaje =
    document.getElementById(
      "mensajeSubidaDocumento"
    );

  const tipo =
    document.getElementById(
      "tipoDocumento"
    ) as HTMLSelectElement | null;

  if (!input) {
    return;
  }

  const archivo =
    input.files?.[0];

  if (!archivo) {

    if (mensaje) {

      mensaje.textContent =
        "Selecciona un archivo primero.";

      mensaje.className =
        "cliente-upload-message error";
    }

    return;
  }

  const extensionesPermitidas = [
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "doc",
    "docx",
    "xls",
    "xlsx"
  ];

  const extension =
    archivo.name
      .split(".")
      .pop()
      ?.toLowerCase();

  if (
    !extension ||
    !extensionesPermitidas.includes(
      extension
    )
  ) {

    if (mensaje) {

      mensaje.textContent =
        "El tipo de archivo no está permitido.";

      mensaje.className =
        "cliente-upload-message error";
    }

    return;
  }

  if (
    archivo.size >
    10 * 1024 * 1024
  ) {

    if (mensaje) {

      mensaje.textContent =
        "El archivo no puede superar los 10 MB.";

      mensaje.className =
        "cliente-upload-message error";
    }

    return;
  }

  const formulario =
    new FormData();

  formulario.append(
    "archivo",
    archivo
  );

  formulario.append(
    "tipo",
    tipo?.value || "documento"
  );

  formulario.append(
    "correo",
    email
  );

  // Recuperar usuario
  try {

    const usuarioGuardado =
      localStorage.getItem(
        "karsan_usuario"
      );

    if (usuarioGuardado) {

      const usuario =
        JSON.parse(
          usuarioGuardado
        );

      if (usuario?.id) {

        formulario.append(
          "usuarioId",
          String(usuario.id)
        );
      }
    }

  } catch {
    // No hacer nada
  }

  try {

    if (mensaje) {

      mensaje.textContent =
        "Subiendo documento...";

      mensaje.className =
        "cliente-upload-message";
    }

    const respuesta =
      await fetch(
        "http://localhost:3002/api/documentos/subir",
        {
          method: "POST",
          body: formulario
        }
      );

    const datos =
      await respuesta.json();

    if (!respuesta.ok) {

      throw new Error(
        datos?.mensaje ||
        datos?.error ||
        "No se pudo subir el documento."
      );
    }

    if (mensaje) {

      mensaje.textContent =
        "Documento subido correctamente.";

      mensaje.className =
        "cliente-upload-message success";
    }

    input.value = "";

    const nombreArchivo =
      document.getElementById(
        "nombreArchivoSeleccionado"
      );

    if (nombreArchivo) {

      nombreArchivo.textContent =
        "Ningún archivo seleccionado";
    }

    await cargarDocumentos(email);

    await cargarCantidadDocumentos(email);

  } catch (error) {

    console.error(
      "Error al subir documento:",
      error
    );

    if (mensaje) {

      mensaje.textContent =
        error instanceof Error
          ? error.message
          : "Error al subir el documento.";

      mensaje.className =
        "cliente-upload-message error";
    }
  }
}

// =========================================================
// CARGAR DOCUMENTOS
// =========================================================

async function cargarDocumentos(
  email: string
): Promise<void> {

  const lista =
    document.getElementById(
      "listaDocumentosCliente"
    );

  if (!lista) {
    return;
  }

  lista.innerHTML = `
    <div class="cliente-empty">
      Cargando documentos...
    </div>
  `;

  try {

    const respuesta =
      await fetch(
        "http://localhost:3002/api/documentos"
      );

    if (!respuesta.ok) {

      throw new Error(
        "No se pudieron cargar los documentos."
      );
    }

    const datos =
      await respuesta.json();

    let documentos: Documento[] =
      Array.isArray(datos)
        ? datos
        : Array.isArray(datos?.documentos)
          ? datos.documentos
          : [];

    let usuarioId: number | null = null;

    try {

      const usuarioGuardado =
        localStorage.getItem(
          "karsan_usuario"
        );

      if (usuarioGuardado) {

        const usuario =
          JSON.parse(
            usuarioGuardado
          );

        if (usuario?.id) {

          usuarioId =
            Number(usuario.id);
        }
      }

    } catch {

      usuarioId = null;
    }

    if (usuarioId !== null) {

      const documentosUsuario =
        documentos.filter(
          (documento) =>
            Number(documento.usuarioId) ===
            usuarioId
        );

      if (
        documentosUsuario.length > 0
      ) {

        documentos =
          documentosUsuario;

      } else {

        documentos =
          documentos.filter(
            (documento) =>
              String(
                documento.correo || ""
              ).toLowerCase() ===
              email.toLowerCase()
          );
      }

    } else {

      documentos =
        documentos.filter(
          (documento) =>
            String(
              documento.correo || ""
            ).toLowerCase() ===
            email.toLowerCase()
        );
    }

    if (
      documentos.length === 0
    ) {

      lista.innerHTML = `
        <div class="cliente-empty">

          <div class="cliente-empty-icon">
            ▤
          </div>

          <strong>
            No tienes documentos
          </strong>

          <span>
            Los documentos que subas aparecerán aquí.
          </span>

        </div>
      `;

      return;
    }

    lista.innerHTML =
      documentos
        .map(
          (documento) =>
            crearDocumentoHTML(
              documento
            )
        )
        .join("");

  } catch (error) {

    console.error(
      "Error cargando documentos:",
      error
    );

    lista.innerHTML = `
      <div class="cliente-empty">

        <strong>
          No se pudieron cargar los documentos
        </strong>

        <span>
          Verifica que el servidor esté funcionando.
        </span>

      </div>
    `;
  }
}

// =========================================================
// HTML DE DOCUMENTO
// =========================================================

function crearDocumentoHTML(
  documento: Documento
): string {

  const nombre =
    documento.nombre ||
    documento.nombreArchivo ||
    documento.archivo ||
    "Documento";

  const tipo =
    documento.tipo ||
    "Documento";

  const fecha =
    documento.fecha ||
    documento.createdAt ||
    "";

  return `

    <div class="cliente-document-item">

      <div class="cliente-document-icon">
        📄
      </div>

      <div class="cliente-document-information">

        <strong>
          ${escaparHTML(nombre)}
        </strong>

        <span>
          ${escaparHTML(tipo)}
          ${
            fecha
              ? " · " +
                formatearFecha(fecha)
              : ""
          }
        </span>

      </div>

      <button
        class="cliente-document-download"
        type="button"
        data-documento-id="${documento.id}"
      >
        Descargar
      </button>

    </div>
  `;
}

// =========================================================
// CONTAR DOCUMENTOS
// =========================================================

async function cargarCantidadDocumentos(
  email: string
): Promise<void> {

  const contador =
    document.getElementById(
      "totalDocumentosInicio"
    );

  if (!contador) {
    return;
  }

  try {

    const respuesta =
      await fetch(
        "http://localhost:3002/api/documentos"
      );

    if (!respuesta.ok) {

      throw new Error(
        "Error cargando documentos"
      );
    }

    const datos =
      await respuesta.json();

    let documentos: Documento[] =
      Array.isArray(datos)
        ? datos
        : Array.isArray(datos?.documentos)
          ? datos.documentos
          : [];

    let usuarioId: number | null = null;

    try {

      const usuarioGuardado =
        localStorage.getItem(
          "karsan_usuario"
        );

      if (usuarioGuardado) {

        const usuario =
          JSON.parse(
            usuarioGuardado
          );

        if (usuario?.id) {

          usuarioId =
            Number(usuario.id);
        }
      }

    } catch {

      usuarioId = null;
    }

    if (usuarioId !== null) {

      const porUsuario =
        documentos.filter(
          (documento) =>
            Number(documento.usuarioId) ===
            usuarioId
        );

      if (porUsuario.length > 0) {

        documentos =
          porUsuario;

      } else {

        documentos =
          documentos.filter(
            (documento) =>
              String(
                documento.correo || ""
              ).toLowerCase() ===
              email.toLowerCase()
          );
      }

    } else {

      documentos =
        documentos.filter(
          (documento) =>
            String(
              documento.correo || ""
            ).toLowerCase() ===
            email.toLowerCase()
        );
    }

    contador.textContent =
      String(documentos.length);

  } catch {

    contador.textContent =
      "0";
  }
}

// =========================================================
// MENSAJES
// =========================================================

function mostrarMensajes(
  app: HTMLElement
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        COMUNICACIÓN
      </div>

      <h1>
        Mensajes
      </h1>

      <p>
        Comunícate con tu asesor de Karsan Digital.
      </p>

    </div>

    <div class="cliente-card">

      <div class="cliente-card-header">

        <div>

          <span class="cliente-card-label">
            MENSAJES
          </span>

          <h2>
            Comunicación con tu asesor
          </h2>

        </div>

      </div>

      <div class="cliente-message-list">

        <div class="cliente-message-item">

          <div class="cliente-message-avatar">
            A
          </div>

          <div class="cliente-message-content">

            <strong>
              Asesor Karsan
            </strong>

            <p>
              Hola, hemos actualizado el avance
              de tu proyecto.
            </p>

            <span>
              Hoy, 10:30
            </span>

          </div>

        </div>

        <div class="cliente-message-item">

          <div class="cliente-message-avatar">
            K
          </div>

          <div class="cliente-message-content">

            <strong>
              Karsan Digital
            </strong>

            <p>
              Recuerda enviar el comprobante
              de pago cuando esté disponible.
            </p>

            <span>
              Ayer
            </span>

          </div>

        </div>

      </div>

      <div class="cliente-message-form">

        <textarea
          id="mensajeCliente"
          placeholder="Escribe tu mensaje..."
          rows="4"
        ></textarea>

        <button
          type="button"
          class="cliente-primary-button"
          id="btnEnviarMensaje"
        >
          Enviar mensaje
        </button>

        <div
          id="mensajeEnviado"
          class="cliente-upload-message"
        ></div>

      </div>

    </div>
  `;

  const btnEnviar =
    document.getElementById(
      "btnEnviarMensaje"
    );

  btnEnviar?.addEventListener(
    "click",
    () => {

      const textarea =
        document.getElementById(
          "mensajeCliente"
        ) as HTMLTextAreaElement | null;

      const confirmacion =
        document.getElementById(
          "mensajeEnviado"
        );

      if (!textarea) {
        return;
      }

      if (!textarea.value.trim()) {

        if (confirmacion) {

          confirmacion.textContent =
            "Escribe un mensaje antes de enviarlo.";

          confirmacion.className =
            "cliente-upload-message error";
        }

        return;
      }

      if (confirmacion) {

        confirmacion.textContent =
          "Mensaje enviado correctamente.";

        confirmacion.className =
          "cliente-upload-message success";
      }

      textarea.value = "";
    }
  );
}

// =========================================================
// NOTIFICACIONES
// =========================================================

function mostrarNotificaciones(
  app: HTMLElement
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        NOTIFICACIONES
      </div>

      <h1>
        Notificaciones
      </h1>

      <p>
        Revisa las novedades de tu cuenta.
      </p>

    </div>

    <div class="cliente-card">

      <div class="cliente-card-header">

        <div>

          <span class="cliente-card-label">
            ACTIVIDAD
          </span>

          <h2>
            Últimas notificaciones
          </h2>

        </div>

      </div>

      <div class="cliente-notification-list">

        <div class="cliente-notification-item">

          <div class="cliente-notification-icon">
            ✓
          </div>

          <div>

            <strong>
              Proyecto actualizado
            </strong>

            <p>
              El estado de tu proyecto cambió.
            </p>

            <span>
              Hace 2 horas
            </span>

          </div>

        </div>

        <div class="cliente-notification-item">

          <div class="cliente-notification-icon">
            ▤
          </div>

          <div>

            <strong>
              Documento recibido
            </strong>

            <p>
              Tu documento fue registrado correctamente.
            </p>

            <span>
              Ayer
            </span>

          </div>

        </div>

        <div class="cliente-notification-item">

          <div class="cliente-notification-icon">
            ●
          </div>

          <div>

            <strong>
              Nueva actividad
            </strong>

            <p>
              Tienes una nueva actividad pendiente.
            </p>

            <span>
              Hace 2 días
            </span>

          </div>

        </div>

      </div>

    </div>
  `;
}

// =========================================================
// MI EMPRESA
// =========================================================

function mostrarEmpresa(
  app: HTMLElement
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        EMPRESA
      </div>

      <h1>
        Mi empresa
      </h1>

      <p>
        Información y redes sociales conectadas.
      </p>

    </div>

    <div class="cliente-company-grid">

      <!-- INFORMACIÓN -->

      <div class="cliente-card">

        <div class="cliente-card-header">

          <div>

            <span class="cliente-card-label">
              INFORMACIÓN
            </span>

            <h2>
              Mi empresa
            </h2>

          </div>

        </div>

        <div class="cliente-company-info">

          <div class="cliente-company-row">

            <span>
              Estado
            </span>

            <strong class="cliente-status cliente-status-active">
              Cuenta activa
            </strong>

          </div>

          <div class="cliente-company-row">

            <span>
              Servicio
            </span>

            <strong>
              Karsan Digital
            </strong>

          </div>

          <div class="cliente-company-row">

            <span>
              Gestión
            </span>

            <strong>
              Marketing digital
            </strong>

          </div>

        </div>

      </div>

      <!-- REDES -->

      <div class="cliente-card">

        <div class="cliente-card-header">

          <div>

            <span class="cliente-card-label">
              REDES SOCIALES
            </span>

            <h2>
              Redes conectadas
            </h2>

          </div>

        </div>

        <div class="cliente-social-list">

          <div class="cliente-social-item">

            <div class="cliente-social-name">

              <div class="cliente-social-icon">
                I
              </div>

              Instagram

            </div>

            <span class="cliente-social-connected">
              ● Conectado
            </span>

          </div>

          <div class="cliente-social-item">

            <div class="cliente-social-name">

              <div class="cliente-social-icon">
                F
              </div>

              Facebook

            </div>

            <span class="cliente-social-connected">
              ● Conectado
            </span>

          </div>

          <div class="cliente-social-item">

            <div class="cliente-social-name">

              <div class="cliente-social-icon">
                T
              </div>

              TikTok

            </div>

            <span class="cliente-social-connected">
              ● Conectado
            </span>

          </div>

        </div>

      </div>

    </div>
  `;
}

// =========================================================
// MI PERFIL
// =========================================================

function mostrarPerfil(
  app: HTMLElement,
  email: string
): void {

  const contenido =
    document.getElementById(
      "contenidoCliente"
    );

  if (!contenido) {
    return;
  }

  contenido.innerHTML = `

    <div class="cliente-page-heading">

      <div class="cliente-page-label">
        PERFIL
      </div>

      <h1>
        Mi perfil
      </h1>

      <p>
        Información de tu cuenta de cliente.
      </p>

    </div>

    <div class="cliente-card">

      <div class="cliente-profile-header">

        <div class="cliente-profile-avatar">
          ${obtenerInicial(email)}
        </div>

        <div>

          <h2>
            Cliente Karsan
          </h2>

          <p>
            Cuenta de cliente
          </p>

        </div>

      </div>

      <div class="cliente-profile-form">

        <div class="cliente-form-group">

          <label>
            Nombre
          </label>

          <input
            type="text"
            value="Cliente Karsan"
            readonly
          />

        </div>

        <div class="cliente-form-group">

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            value="${escaparHTML(email)}"
            readonly
          />

        </div>

        <div class="cliente-form-group">

          <label>
            Tipo de cuenta
          </label>

          <input
            type="text"
            value="Cliente"
            readonly
          />

        </div>

      </div>

    </div>
  `;
}

// =========================================================
// UTILIDADES
// =========================================================

function obtenerInicial(
  email: string
): string {

  if (!email) {
    return "C";
  }

  return email
    .charAt(0)
    .toUpperCase();
}

// =========================================================

function escaparHTML(
  texto: string
): string {

  return String(texto)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}

// =========================================================

function formatearFecha(
  fecha: string
): string {

  try {

    const fechaObjeto =
      new Date(fecha);

    if (
      Number.isNaN(
        fechaObjeto.getTime()
      )
    ) {
      return fecha;
    }

    return fechaObjeto.toLocaleDateString(
      "es-EC",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );

  } catch {

    return fecha;
  }
}