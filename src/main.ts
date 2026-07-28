import './assets/styles/main.css'
import './assets/styles/login.css'
import './assets/styles/dashboard.css'
import './assets/styles/reportes-profesional.css'
import './assets/styles/chatbot.css'

import { mostrarLogin } from './assets/pages/Login'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('No se encontró el elemento #app')
}

mostrarLogin(app)