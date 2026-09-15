// ==========================================================
// App.jsx — COMPONENTE PRINCIPAL DEL SITIO
// ==========================================================
// Este archivo arma TODO el sitio: el menú lateral, el enrutamiento
// (qué página se muestra según la URL) y el contenido de la página de
// Inicio. Las demás páginas (Instalaciones, Comunidad, SubirProgreso,
// AgendaPrueba) viven en sus propios archivos y aquí solo se "conectan".
//
// GUÍA RÁPIDA PARA LEER LAS CLASES DE TAILWIND (el sistema de estilos
// que usamos en todo el proyecto en vez de escribir CSS a mano):
//   - Cada palabra dentro de className="..." es una "utilidad" que hace
//     una sola cosa (ej: "flex" = display flex, "text-xl" = tamaño de
//     texto grande, "p-6" = padding, "rounded-full" = bordes redondos).
//   - Los colores que empiezan con "sl-" (sl-navy, sl-black, sl-white,
//     sl-gray, sl-petrol) son los colores de marca definidos en index.css.
//   - Un prefijo como "sm:", "md:" o "lg:" antes de una clase significa
//     "aplica esta clase solo a partir de este tamaño de pantalla". Así
//     el sitio se ve bien tanto en celular como en computadora.
//   - Palabras como "hover:" o "group-hover:" aplican la clase solo
//     cuando el mouse pasa por encima de ese elemento (o de su "grupo").

// ==========================================================
// 1. SECCIÓN DE IMPORTACIONES
// ==========================================================
// Estos son los componentes de las otras páginas del sitio. Los
// importamos aquí para poder usarlos más abajo en las <Route>.
// (Comunidad y SubirProgreso siguen importados aunque su ruta esté
// oculta por ahora — ver la nota en "SECCIÓN COMUNIDAD" más abajo).
import SubirProgreso from './SubirProgreso';
import Comunidad from './Comunidad';
import AgendaPrueba from './AgendaPrueba';

// useState: para manejar datos que cambian con el tiempo (por ejemplo,
//           si el menú lateral está abierto, o qué foto se ve ahora).
// useEffect: para ejecutar código "secundario" cuando el componente
//            aparece en pantalla (por ejemplo, arrancar un temporizador).
import { useState, useEffect } from 'react'

// Importación de Iconos desde la librería 'lucide-react'.
// Cada uno de estos nombres es un componente de ícono listo para usar,
// por ejemplo <Menu size={28} /> dibuja el ícono de menú hamburguesa.
import { Dumbbell, Menu, X, Info, Map, CreditCard, Users, CalendarCheck } from 'lucide-react';

// Importación de componentes de Navegación de React Router:
// BrowserRouter: el "motor" que le permite a la página tener varias
//                rutas/URLs distintas sin ser varias páginas HTML reales.
// Routes/Route:  definen qué componente mostrar según la URL actual.
// Link:          el sustituto de <a href="..."> que cambia de página
//                sin recargar el navegador (más rápido y fluido).
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importación de Archivos Locales (Imágenes y Componentes).
// Al importar una imagen así, Vite la convierte en una URL que se
// puede usar directamente como fondo o como src de un <img>.
import bgGym from './assets/bg-gym.jpg';
import Instalaciones from './Instalaciones';
import fotoBarras from './assets/barras.png';
import fotoBoomRoom from './assets/boom-room.png';
import fotoMancuernas from './assets/mancuernas.png';
import fotoMuñeco from './assets/muñeco.png';

// ==========================================================
// 2. COMPONENTE PRINCIPAL
// ==========================================================
function App()
{
  // --- ESTADOS (Variables dinámicas de React) ---

  // Maneja si el menú lateral está visible (true) o no (false).
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Indica cuál es el número de la imagen que se muestra en el slider (0, 1, 2...).
  const [currentImage, setCurrentImage] = useState(0);

  // Array que contiene todas las imágenes que se deslizarán en el fondo del inicio.
  // No necesita ser un estado (useState) porque su contenido nunca cambia,
  // solo cambia CUÁL de sus posiciones se muestra (eso sí es "currentImage").
  const sliderImages = [bgGym, fotoBarras, fotoBoomRoom, fotoMancuernas, fotoMuñeco];

  // --- LÓGICA DEL SLIDER (Efecto de tiempo) ---
  // useEffect ejecuta el código de adentro después de que el componente
  // se dibuja en pantalla. El arreglo [sliderImages.length] al final le
  // dice a React "solo vuelve a ejecutar este efecto si ese valor cambia"
  // (en la práctica, casi nunca cambia, así que el temporizador se arma
  // una sola vez cuando se abre la página).
  useEffect(() => {
    // Definimos un intervalo que se ejecuta cada 5000 milisegundos (5 segundos).
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        // Lógica circular: Si llegamos a la última foto, regresamos a la 0. Si no, sumamos 1.
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    // Función de limpieza: Si el componente se destruye, borramos el
    // temporizador para evitar fugas de memoria (que siga corriendo en
    // segundo plano sin que nadie lo use).
    return () => clearInterval(interval);
  }, [sliderImages.length]); // Este efecto solo se reinicia si la cantidad de fotos cambia.

  return (
    // <BrowserRouter> debe envolver TODO lo que use <Routes>, <Route> o
    // <Link>, porque es el que sabe leer y cambiar la URL del navegador.
    <BrowserRouter>
      {/* Contenedor principal con fondo negro, texto blanco y fuente sans-serif */}
      <div className="min-h-screen bg-sl-black text-sl-white font-sans flex flex-col overflow-x-hidden">

        {/* --- 1. BOTÓN DE MENÚ HAMBURGUESA --- */}
        {/* "{!isMenuOpen && (...)}" es "renderizado condicional": ese botón
            SOLO se dibuja en pantalla si isMenuOpen es false (si es true,
            React no muestra nada en su lugar). Así evitamos tener el botón
            de abrir encima del menú ya abierto. */}
        {!isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(true)} // Al dar clic, el estado pasa a true y el menú aparece.
            className="fixed top-6 left-6 z-50 p-3 bg-sl-navy hover:bg-sl-petrol rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          >
            <Menu size={28} />
          </button>
        )}

        {/* --- 2. PANEL LATERAL (Sidebar) --- */}
        {/* Este div SIEMPRE existe en la página, pero usamos una plantilla
            de texto (backticks `` `` ``) para elegir sus clases según el
            estado: si isMenuOpen es true, le ponemos "translate-x-0" (se
            ve, en su posición normal); si es false, le ponemos
            "-translate-x-full" (se mueve fuera de la pantalla hacia la
            izquierda, quedando "escondido"). La animación suave la da
            "transition-transform duration-500". */}
        <div className={`fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-sl-black border-r border-sl-navy z-[60] transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-end p-6">
            {/* Botón X para cerrar el menú lateral */}
            <button onClick={() => setIsMenuOpen(false)} className="text-sl-gray hover:text-sl-white transition-colors">
              <X size={32} />
            </button>
          </div>

          {/* Lista de enlaces de navegación interna */}
          <div className="flex flex-col gap-8 px-8 mt-6">
            <h2 className="text-sl-gray uppercase text-[10px] tracking-[0.4em] font-bold mb-2">Navegación</h2>

            {/* Link a Inicio: Cambia la ruta a "/" y cierra el menú lateral.
                El onClick además de navegar, llama a setIsMenuOpen(false)
                para que el menú se cierre solo al elegir una opción. */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Dumbbell size={20} className="text-sl-gray group-hover:text-sl-navy" /> INICIO
            </Link>

            {/* Este botón todavía no tiene una página/función asignada
                (es un "placeholder" visual para cuando se agregue esa sección). */}
            <button className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Info size={20} className="text-sl-gray group-hover:text-sl-navy" /> INFORMACIÓN
            </button>

            {/* Link a Instalaciones: Te manda a la página de la galería de fotos */}
            <Link to="/instalaciones" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Map size={20} className="text-sl-gray group-hover:text-sl-navy" /> INSTALACIONES
            </Link>

            {/* Placeholder visual, igual que "INFORMACIÓN" (sin función todavía) */}
            <button className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <CreditCard size={20} className="text-sl-gray group-hover:text-sl-navy" /> PLANES
            </button>

            {/* ============================================================
                SECCIÓN COMUNIDAD (temporalmente oculta)
                ============================================================
                Este enlace del menú, junto con las rutas "/comunidad" y
                "/comunidad/subir" más abajo, está comentado a propósito
                para que la sección de Comunidad NO aparezca en el sitio
                por ahora. El código de Comunidad.jsx y SubirProgreso.jsx
                NO se borró: sigue completo y funcionando. Para volver a
                activarla en el futuro, solo hay que quitar los "{/*" y
                "*}/" de aquí y de las <Route> correspondientes más abajo.

            <Link to="/comunidad" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Users size={20} className="text-sl-gray group-hover:text-sl-navy" /> COMUNIDAD
            </Link>
            */}

            <Link to="/agendar" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <CalendarCheck size={20} className="text-sl-gray group-hover:text-sl-navy" /> DÍA GRATIS
            </Link>
          </div>

          {/* Marca de agua al fondo del sidebar */}
          <div className="absolute bottom-10 left-8">
            <p className="text-lg font-black italic tracking-tighter">STRENGTH <span className="text-sl-gray">LAB</span></p>
          </div>
        </div>

        {/* --- CAPA OSCURA (OVERLAY) --- */}
        {/* Aparece detrás del menú para oscurecer el resto de la página y
            se puede cerrar el menú si das clic en cualquier parte oscura. */}
        {isMenuOpen && (
          <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/80 z-[55] transition-opacity duration-300" />
        )}

        {/* --- ENRUTAMIENTO --- */}
        {/* <Routes> revisa la URL actual del navegador y dibuja SOLO la
            <Route> cuyo "path" coincide. Por ejemplo, si la URL es
            "/instalaciones", React muestra <Instalaciones /> y nada más. */}
        <Routes>
          {/* RUTA "/" (Contenido de la página de Inicio).
              Como esta página tiene varias secciones, en vez de crear un
              componente aparte, escribimos el contenido directo aquí
              dentro de un fragmento <>...</> (una "caja invisible" que
              agrupa varios elementos sin agregar una etiqueta extra al HTML). */}
          <Route path="/" element={
            <>
              {/* SECCIÓN HERO CON IMÁGENES DESLIZANTES */}
              <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

                {/* Generación dinámica de las capas de fondo.
                    .map() recorre "sliderImages" y crea un <div> de fondo
                    por cada foto. Todas están apiladas una encima de otra
                    (position: absolute); solo la que coincide con
                    "currentImage" tiene "opacity-40" (se ve), las demás
                    tienen "opacity-0" (invisibles). Como todas tienen una
                    animación de transición, esto crea el efecto de
                    "disolverse" de una foto a otra cada 5 segundos. */}
                {sliderImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat blur-[8px] grayscale scale-110 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-40' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}

                {/* Gradiente oscuro superior/inferior para mejorar lectura de texto */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sl-black/40 to-sl-black" />

                {/* Contenido Central del Hero */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-10">
                  <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tighter uppercase italic leading-tight">
                    STRENGTH <span className="text-sl-gray">LAB</span>
                  </h1>
                  <p className="text-[10px] sm:text-sm md:text-xl text-sl-gray font-light tracking-[0.2em] md:tracking-[0.4em] uppercase mb-8">
                    Evoluciona tu fuerza • Since 2018
                  </p>
                  {/* Botón principal de llamado a la acción (CTA): lleva a
                      la página "/agendar" para reservar el día de prueba gratis. */}
                  <Link
                    to="/agendar"
                    className="bg-sl-navy hover:bg-sl-petrol text-sl-white font-bold py-4 px-6 sm:px-10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-sl-navy/50 uppercase tracking-widest text-xs sm:text-sm text-center"
                  >
                    Agenda tu día de prueba gratis
                  </Link>
                </div>
              </div>

              {/* SECCIÓN UBICACIÓN: Información de contacto y mapa */}
              <section className="py-16 sm:py-24 bg-sl-black/50 w-full flex flex-col items-center border-t border-sl-gray/10">
                <div className="max-w-6xl w-full px-4 sm:px-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16 text-sl-white uppercase italic tracking-widest">Encuentra el <span className="text-sl-gray">Laboratorio</span></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      {/* Cuadro de Dirección */}
                      <div className="bg-sl-navy/20 p-8 rounded-3xl border-l-4 border-sl-navy backdrop-blur-sm shadow-xl">
                        <h3 className="text-xl font-bold text-sl-white mb-3 uppercase tracking-wider italic">Ubicación</h3>
                        <p className="text-sl-gray leading-relaxed">Calle Chiltiupán, Polígono E, número 14,<br/>Ciudad Merliot, Santa Tecla, El Salvador.</p>
                      </div>
                      {/* Cuadro de Horarios */}
                      <div className="bg-sl-petrol/20 p-8 rounded-3xl border-l-4 border-sl-petrol backdrop-blur-sm shadow-xl">
                        <h3 className="text-xl font-bold text-sl-white mb-3 uppercase tracking-wider italic">Horarios de Fuerza</h3>
                        <div className="text-sl-gray space-y-1">
                          <p>Lunes a Viernes: <span className="text-sl-white font-medium text-lg">5:00 AM - 10:00 PM</span></p>
                          <p>Sábados: <span className="text-sl-white font-medium text-lg">7:00 AM - 3:00 PM</span></p>
                          {/* El uppercase en el texto DOMINGOS refuerza el estilo deportivo */}
                          <p className="text-sl-navy font-black italic pt-4 text-xs tracking-widest uppercase">Domingos: Cerrado para recuperación</p>
                        </div>
                      </div>
                    </div>
                    {/* El Mapa embebido en un Iframe (esto es un mapa real
                        de Google Maps incrustado, no una imagen). */}
                    <div className="h-[450px] w-full rounded-3xl overflow-hidden border border-sl-gray/20 shadow-2xl relative group">
                      <iframe title="Ubicación Exacta Strength Lab" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d484.58403504688647!2d-89.26725676052907!3d13.67768075805992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f632ffdacd3596b%3A0x8121b73f1e83602b!2sStrength%20Lab%20Fitness%20Center!5e0!3m2!1ses-419!2ssv!4v1774470105603!5m2!1ses-419!2ssv" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="opacity-80 group-hover:opacity-100 transition-opacity duration-700"></iframe>
                      {/* Efecto de sombra interna sobre el mapa */}
                      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          } />

          {/* RUTA "/instalaciones": Muestra el componente de la galería de fotos */}
          <Route path="/instalaciones" element={<Instalaciones />} />

          {/* RUTAS DE COMUNIDAD (temporalmente ocultas)
              Igual que el enlace del menú de más arriba, estas dos rutas
              están comentadas a propósito. Mientras estén así, aunque
              alguien escriba "/comunidad" directo en la URL, no va a
              encontrar nada (React Router no reconoce la ruta). Para
              reactivarlas, descomenta estas dos líneas.

          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/comunidad/subir" element={<SubirProgreso />} />
          */}

          <Route path="/agendar" element={<AgendaPrueba />} />
        </Routes>

        {/* --- PIE DE PÁGINA (Footer) --- */}
        <footer className="mt-auto py-12 border-t border-sl-gray/10">
          <p className="text-[11px] text-sl-gray uppercase tracking-[0.5em] opacity-50 text-center font-light">
            Strength Lab El Salvador| Trabajamos para ti.| Desarrollado por: Adam Andres Guillen Bonilla
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
