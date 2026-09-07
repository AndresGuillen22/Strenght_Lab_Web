// ==========================================
// 1. SECCIÓN DE IMPORTACIONES
// ==========================================
import SubirProgreso from './SubirProgreso';
import Comunidad from './Comunidad';
import AgendaPrueba from './AgendaPrueba';
// useState: Para manejar datos que cambian (como si el menú está abierto).
// useEffect: Para ejecutar efectos secundarios (como el temporizador del slider).
import { useState, useEffect } from 'react'

// Importación de Iconos desde la librería 'lucide-react'
import { Dumbbell, Menu, X, Info, Map, CreditCard, Users, CalendarCheck } from 'lucide-react';

// Importación de componentes de Navegación:
// BrowserRouter: El motor que permite tener múltiples rutas.
// Routes/Route: Definen qué "página" mostrar según la URL.
// Link: El sustituto de <a> que cambia de página sin recargar el navegador.
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importación de Archivos Locales (Imágenes y Componentes)
import bgGym from './assets/bg-gym.jpg';
import Instalaciones from './Instalaciones';
import fotoBarras from './assets/barras.png';
import fotoBoomRoom from './assets/boom-room.png';
import fotoMancuernas from './assets/mancuernas.png';
import fotoMuñeco from './assets/muñeco.png';

// Datos de los planes de entrenamiento (Plan Élite, Progreso, Inicial y Básico)
const planes = [
  {
    nombre: 'Plan Élite',
    sesiones: '20 sesiones',
    precio: '$200',
    descripcion: 'El compromiso total con tu transformación. 20 sesiones de entrenamiento 100% personalizado: más tiempo junto a tu entrenador, ajustes constantes en tu rutina y el ritmo de avance más rápido de los tres planes.',
    beneficios: [
      'Mayor cantidad de sesiones y el mejor precio por sesión',
      'Seguimiento y ajustes de rutina más frecuentes',
      'Resultados más rápidos y sostenidos en el tiempo',
    ],
    destacado: false,
  },
  {
    nombre: 'Plan Progreso',
    sesiones: '15 sesiones',
    precio: '$150',
    descripcion: 'El equilibrio perfecto entre inversión y resultados: las sesiones suficientes para transformar tu cuerpo de verdad y construir un hábito de entrenamiento sólido.',
    beneficios: [
      'El mejor balance entre precio y cantidad de sesiones',
      'Suficiente acompañamiento para lograr cambios visibles',
      'La opción recomendada por nuestros entrenadores',
    ],
    destacado: true,
  },
  {
    nombre: 'Plan Inicial',
    sesiones: '10 sesiones',
    precio: '$100',
    descripcion: 'La puerta de entrada al entrenamiento personalizado. Ideal para probar el método Strength Lab con acompañamiento real, aprender la técnica correcta desde el primer día y empezar a notar cambios en tu cuerpo.',
    beneficios: [
      'La forma más accesible de empezar con entrenador personal',
      'Aprendé la técnica correcta desde el día uno',
      'Ideal para quienes prueban el método por primera vez',
    ],
    destacado: false,
  },
  {
    nombre: 'Plan Básico',
    sesiones: null,
    precio: '$45',
    descripcion: 'Para quienes prefieren entrenar por su cuenta con una base sólida. No incluye entrenador personal, pero sí rutinas diseñadas según tus objetivos y el apoyo básico de nuestro equipo dentro del gimnasio.',
    beneficios: [
      'No incluye entrenador personal',
      'Incluye rutina diseñada según tus objetivos',
      'Ayuda básica del equipo de entrenadores en el gimnasio',
    ],
    destacado: false,
  },
];

function App()
{
  // --- ESTADOS (Variables dinámicas de React) ---
  
  // Maneja si el menú lateral está visible (true) o no (false).
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Indica cuál es el número de la imagen que se muestra en el slider (0, 1, 2...).
  const [currentImage, setCurrentImage] = useState(0);

  // Array que contiene todas las imágenes que se deslizarán en el fondo del inicio.
  const sliderImages = [bgGym, fotoBarras, fotoBoomRoom, fotoMancuernas, fotoMuñeco];

  // --- LÓGICA DEL SLIDER (Efecto de tiempo) ---
  useEffect(() => {
    // Definimos un intervalo que se ejecuta cada 5000 milisegundos (5 segundos).
    const interval = setInterval(() => {
      setCurrentImage((prev) => 
        // Lógica circular: Si llegamos a la última foto, regresamos a la 0. Si no, sumamos 1.
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    // Función de limpieza: Si el componente se destruye, borramos el reloj para evitar fugas de memoria.
    return () => clearInterval(interval);
  }, [sliderImages.length]); // Este efecto solo se reinicia si la cantidad de fotos cambia.

  return (
    <BrowserRouter>
      {/* Contenedor principal con fondo negro, texto blanco y fuente sans-serif */}
      <div className="min-h-screen bg-sl-black text-sl-white font-sans flex flex-col overflow-x-hidden">
        
        {/* --- 1. BOTÓN DE MENÚ HAMBURGUESA --- */}
        {/* Solo se muestra si el menú lateral está cerrado (!isMenuOpen) */}
        {!isMenuOpen && (
          <button 
            onClick={() => setIsMenuOpen(true)} // Al dar clic, el estado pasa a true y el menú aparece.
            className="fixed top-6 left-6 z-50 p-3 bg-sl-navy hover:bg-sl-petrol rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          >
            <Menu size={28} />
          </button>
        )}

        {/* --- 2. PANEL LATERAL (Sidebar) --- */}
        {/* Usamos clases dinámicas: translate-x-0 (se ve) o -translate-x-full (está escondido a la izquierda) */}
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
            
            {/* Link a Inicio: Cambia la ruta a "/" y cierra el menú lateral */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Dumbbell size={20} className="text-sl-gray group-hover:text-sl-navy" /> INICIO
            </Link>
            
            <button className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Info size={20} className="text-sl-gray group-hover:text-sl-navy" /> INFORMACIÓN
            </button>
            
            {/* Link a Instalaciones: Te manda a la nueva página que creamos */}
            <Link to="/instalaciones" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Map size={20} className="text-sl-gray group-hover:text-sl-navy" /> INSTALACIONES
            </Link>
            
            <button className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <CreditCard size={20} className="text-sl-gray group-hover:text-sl-navy" /> PLANES
            </button>

            <Link to="/comunidad" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-bold hover:text-sl-navy transition-all group uppercase italic">
              <Users size={20} className="text-sl-gray group-hover:text-sl-navy" /> COMUNIDAD
            </Link>

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
        {/* Aparece detrás del menú para oscurecer la web y cerrarlo si das clic fuera */}
        {isMenuOpen && (
          <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/80 z-[55] transition-opacity duration-300" />
        )}

        {/* --- ENRUTAMIENTO --- */}
        <Routes>
          {/* RUTA "/" (Contenido de la página de Inicio) */}
          <Route path="/" element={
            <>
              {/* SECCIÓN HERO CON IMÁGENES DESLIZANTES */}
              <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                
                {/* Generación dinámica de las capas de fondo */}
                {sliderImages.map((img, index) => (
                  <div 
                    key={index}
                    // La imagen activa tiene 'opacity-40', las demás 'opacity-0'
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
                  <Link
                    to="/agendar"
                    className="bg-sl-navy hover:bg-sl-petrol text-sl-white font-bold py-4 px-6 sm:px-10 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-sl-navy/50 uppercase tracking-widest text-xs sm:text-sm text-center"
                  >
                    Agenda tu día de prueba gratis
                  </Link>
                </div>
              </div>

              {/* SECCIÓN PLANES: Tarjetas de precios de entrenamiento personalizado */}
              <section className="py-16 sm:py-24 w-full max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                    Nuestros <span className="text-sl-gray">Planes</span>
                  </h2>
                  <p className="text-sl-gray italic text-xs sm:text-sm mt-3 tracking-[0.3em] uppercase">Lock in your strongest era</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
                  {planes.map((plan) => (
                    <div
                      key={plan.nombre}
                      className={`relative flex flex-col rounded-3xl p-6 sm:p-8 border transition-all duration-300 hover:-translate-y-1 ${
                        plan.destacado
                          ? 'bg-sl-navy/20 border-sl-navy shadow-xl shadow-sl-navy/20'
                          : 'bg-sl-navy/5 border-sl-gray/10 hover:border-sl-navy/50'
                      }`}
                    >
                      {plan.destacado && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sl-navy text-sl-white text-[10px] font-black uppercase tracking-widest py-1 px-4 rounded-full whitespace-nowrap shadow-lg">
                          Más Popular
                        </span>
                      )}

                      <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">{plan.nombre}</h3>
                      <p className="text-sl-gray text-xs uppercase tracking-widest mb-4 h-4">{plan.sesiones}</p>
                      <p className="text-4xl font-black text-sl-white mb-6">{plan.precio}</p>

                      <p className="text-sm text-sl-gray leading-relaxed mb-6 grow">{plan.descripcion}</p>

                      <ul className="space-y-2 text-sm text-sl-gray">
                        {plan.beneficios.map((beneficio) => (
                          <li key={beneficio} className="flex items-start gap-2">
                            <span className="text-sl-navy mt-1">•</span>
                            <span>{beneficio}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

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
                    {/* El Mapa embebido en un Iframe */}
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
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/comunidad/subir" element={<SubirProgreso />} />
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