import "./assets/styles/dashboard.css";

import { mostrarLogin } from "./assets/pages/Login";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el elemento #app");
}

mostrarLogin(app);