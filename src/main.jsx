// ==========================================================
// PUNTO DE ENTRADA DE LA APLICACIÓN
// ==========================================================
// Este es el primer archivo de JavaScript que se ejecuta cuando alguien
// abre la página. Su único trabajo es "montar" (insertar) nuestro
// componente principal <App /> dentro del HTML real de la página
// (mira index.html: ahí existe un <div id="root"></div> vacío).

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Estilos globales (Tailwind + colores del gimnasio)
import App from './App.jsx' // El componente raíz de toda la aplicación

// document.getElementById('root') busca en index.html el <div id="root"></div>.
// createRoot(...) le dice a React: "vas a poder dibujar cosas dentro de este div".
createRoot(document.getElementById('root')).render(
  // <StrictMode> es una herramienta de React SOLO para desarrollo:
  // ayuda a detectar errores comunes a tiempo. No afecta lo que ve
  // la persona que visita la página en producción.
  <StrictMode>
    <App />
  </StrictMode>,
)
