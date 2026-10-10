// ==========================================================
// PÁGINA: INSTALACIONES
// ==========================================================
// Esta página NO tiene lógica ni estado (no usa useState/useEffect):
// es un componente "de solo mostrar" (presentacional). Simplemente
// organiza texto e imágenes fijas usando JSX y clases de Tailwind.
//
// Tip de lectura para las clases de Tailwind: un prefijo como "md:"
// o "sm:" antes de una clase significa "aplica esta clase solo a
// partir de este tamaño de pantalla". Así logramos que el sitio se
// vea bien tanto en celular como en computadora.

import { ArrowLeft } from 'lucide-react'; // Ícono importado pero sin usar en este archivo por ahora
import { Link } from 'react-router-dom';

// Importamos las fotos que vamos a mostrar en la galería.
// Al importar una imagen así, Vite la convierte en una URL utilizable
// directamente en el atributo src de un <img>.
import fotoLogoPared from './assets/inst-logo-pared.webp';
import fotoPressBanca from './assets/inst-press-banca.webp';
import fotoEspejos from './assets/inst-espejos.webp';
import fotoMaquinas from './assets/inst-maquinas.webp';
import fotoBumBumRoom from './assets/inst-bum-bum-room.webp';
import fotoLogoLuces from './assets/inst-logo-luces.webp';
import fotoCampeones from './assets/inst-campeones.webp';

// Lista de las fotos de la galería. En vez de repetir el mismo bloque
// de HTML siete veces, guardamos los datos de cada foto aquí y más abajo
// usamos .map() para dibujar una tarjeta por cada una. Si algún día
// quieres agregar o quitar una foto, solo tocas esta lista.
//   - foto:     la imagen importada arriba
//   - alt:      texto que describe la foto (accesibilidad / buscadores)
//   - posicion: qué parte de la foto se queda visible cuando la tarjeta
//               la recorta (ej: "object-[50%_65%]" = centrada en horizontal
//               y un poco más abajo del centro en vertical)
//   - ancha:    true = la tarjeta ocupa las 2 columnas de la grilla
const fotos = [
  { foto: fotoLogoPared, alt: 'Logo luminoso de Strength Lab en la pared', posicion: 'object-center', ancha: false },
  { foto: fotoPressBanca, alt: 'Atleta entrenando press en la máquina Smith', posicion: 'object-[50%_65%]', ancha: false },
  { foto: fotoEspejos, alt: 'Zona de mancuernas con espejos y luces LED', posicion: 'object-center', ancha: false },
  { foto: fotoMaquinas, alt: 'Máquinas de entrenamiento Cybex', posicion: 'object-center', ancha: false },
  { foto: fotoBumBumRoom, alt: 'The Bum Bum Room con luces hexagonales', posicion: 'object-center', ancha: false },
  { foto: fotoLogoLuces, alt: 'Logo de Strength Lab bajo las luces hexagonales', posicion: 'object-center', ancha: false },
  { foto: fotoCampeones, alt: 'Pared con fotos de nuestros atletas en competencias', posicion: 'object-center', ancha: true },
];

// "export default function ..." es la forma de crear un Componente de
// React: una función que devuelve JSX (el "HTML especial" que React entiende).
export default function Instalaciones() {
  return (
    // Contenedor de toda la página: fondo negro, texto claro, padding general.
    <div className="min-h-screen bg-sl-black text-sl-white font-sans p-6 overflow-x-hidden">

      {/* HEMOS ELIMINADO EL BLOQUE <Link to="/">...</Link>
          Ahora la navegación depende 100% del Sidebar de App.jsx
      */}

      <div className="max-w-6xl mx-auto pt-20 pb-24">

        {/* ENCABEZADO DE PÁGINA */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            {/* "md:text-7xl" = "en pantallas medianas o más grandes, usa
                un texto más grande". Este patrón se repite en todo el sitio. */}
            Nuestro <span className="text-sl-gray">Laboratorio</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-6 border-l-4 border-sl-navy pl-6 py-2 bg-sl-navy/5 rounded-r-2xl">
            <p className="text-xl md:text-2xl text-sl-gray font-light italic leading-relaxed max-w-3xl">
              "Contamos con excelente calidad de máquinas para todo tipo de ejercicio, diseñadas para llevar tu rendimiento al límite."
            </p>
          </div>
        </header>

        {/* GALERÍA DE INSTALACIONES
            "grid-cols-1 md:grid-cols-2" = 1 columna en celular,
            2 columnas en pantallas medianas o más grandes. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* .map() recorre la lista "fotos" y dibuja una tarjeta por cada
              elemento. React pide una "key" única por tarjeta; usamos el
              texto alt porque no se repite. */}
          {fotos.map((item) => (
            <div
              key={item.alt}
              // La clase "group" en este div, combinada con "group-hover:"
              // en la imagen de adentro, permite que al pasar el mouse sobre
              // TODA la tarjeta, la imagen reaccione (haga zoom).
              // Si la foto es "ancha", ocupa las 2 columnas (md:col-span-2).
              className={`group relative overflow-hidden rounded-[2rem] border border-sl-gray/20 bg-sl-navy/10 shadow-2xl ${item.ancha ? 'md:col-span-2' : ''}`}
            >
              <img
                src={item.foto}
                alt={item.alt}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100 ${item.posicion} ${item.ancha ? 'h-96 md:h-[32rem]' : 'h-96'}`}
              />
            </div>
          ))}

        </div>

        {/* Footer sutil */}
        <div className="mt-24 text-center">
          <p className="text-[10px] text-sl-gray uppercase tracking-[0.5em] opacity-30">Strength Lab • Calidad Certificada • UTEC 2026</p>
        </div>
      </div>
    </div>
  );
}
