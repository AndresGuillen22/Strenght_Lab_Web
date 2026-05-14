// ==========================================
// 1. SECCIÓN DE IMPORTACIONES
// ==========================================
import SubirProgreso from './SubirProgreso';
import Comunidad from './Comunidad';
// useState: Para manejar datos que cambian (como si el menú está abierto).
// useEffect: Para ejecutar efectos secundarios (como el temporizador del slider).
import { useState, useEffect } from 'react'

// Importación de Iconos desde la librería 'lucide-react'
import { Dumbbell, Utensils, Zap, Menu, X, Info, Map, CreditCard, Users } from 'lucide-react';

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
        <div className={`fixed top-0 left-0 h-full w-72 bg-sl-black border-r border-sl-navy z-[60] transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                  <p className="text-[10px] sm:text-sm md:text-xl text-sl-gray font-light tracking-[0.2em] md:tracking-[0.4em] mb-12 uppercase">
                    Evoluciona tu fuerza • Since 2018
                  </p>
                  <button className="bg-sl-navy hover:bg-sl-petrol text-sl-white font-bold py-4 px-12 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-sl-navy/50 uppercase tracking-widest">
                    VER PLANES
                  </button>
                </div>
              </div>

              {/* SECCIÓN PILARES: Grid de servicios principales */}
              <section className="py-24 w-full max-w-5xl mx-auto px-6">
                <h2 className="text-2xl font-bold text-center mb-16 text-sl-gray uppercase tracking-widest italic">Nuestros Pilares</h2>
                <div className="flex flex-wrap justify-center gap-10">
                  {/* Tarjeta de Fuerza */}
                  <div className="group flex flex-col items-center text-center w-64 p-6 rounded-2xl border border-transparent hover:border-sl-navy transition-all duration-300 bg-sl-navy/5">
                    <div className="bg-sl-navy p-4 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-sl-navy/20"><Dumbbell size={32} className="text-sl-white" /></div>
                    <h3 className="text-lg font-bold mb-3 uppercase italic">FUERZA PURA</h3>
                    <p className="text-sm text-sl-gray leading-relaxed">Equipamiento de alto rendimiento para tu salud y culturismo.</p>
                  </div>
                  {/* Tarjeta de Nutrición */}
                  <div className="group flex flex-col items-center text-center w-64 p-6 rounded-2xl border border-transparent hover:border-sl-navy transition-all duration-300 bg-sl-navy/5">
                    <div className="bg-sl-petrol p-4 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-sl-petrol/20"><Utensils size={32} className="text-sl-white" /></div>
                    <h3 className="text-lg font-bold mb-3 uppercase italic">CIENCIA NUTRICIONAL</h3>
                    <p className="text-sm text-sl-gray leading-relaxed">Planes de alimentación basados en macros para maximizar tus ganancias.</p>
                  </div>
                  {/* Tarjeta de Bio-Hacking */}
                  <div className="group flex flex-col items-center text-center w-64 p-6 rounded-2xl border border-transparent hover:border-sl-navy transition-all duration-300 bg-sl-navy/5">
                    <div className="bg-sl-navy p-4 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-sl-navy/20"><Zap size={32} className="text-sl-white" /></div>
                    <h3 className="text-lg font-bold mb-3 uppercase italic">BIO-HACKING</h3>
                    <p className="text-sm text-sl-gray leading-relaxed">Optimización de tu recuperación y energía mediante ciencia del deporte.</p>
                  </div>
                </div>
              </section>

              {/* SECCIÓN UBICACIÓN: Información de contacto y mapa */}
              <section className="py-24 bg-sl-black/50 w-full flex flex-col items-center border-t border-sl-gray/10">
                <div className="max-w-6xl w-full px-6">
                  <h2 className="text-3xl font-bold text-center mb-16 text-sl-white uppercase italic tracking-widest">Encuentra el <span className="text-sl-gray">Laboratorio</span></h2>
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
                          <p>Lunes a Viernes: <span className="text-sl-white font-medium text-lg">5:00 AM - 9:00 PM</span></p>
                          <p>Sábados: <span className="text-sl-white font-medium text-lg">6:00 AM - 2:00 PM</span></p>
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