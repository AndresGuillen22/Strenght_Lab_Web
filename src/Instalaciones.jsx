import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importamos tus fotos (Mancuernas, Barras, Boom Room, Muñeco)
import fotoMancuernas from './assets/mancuernas.png';
import fotoBarras from './assets/barras.png';
import fotoBoomRoom from './assets/boom-room.png';
import fotoMuñeco from './assets/muñeco.png';

export default function Instalaciones() {
  return (
    <div className="min-h-screen bg-sl-black text-sl-white font-sans p-6 overflow-x-hidden">
      
      {/* HEMOS ELIMINADO EL BLOQUE <Link to="/">...</Link> 
          Ahora la navegación depende 100% del Sidebar de App.jsx 
      */}

      <div className="max-w-6xl mx-auto pt-20 pb-24">
        
        {/* ENCABEZADO DE PÁGINA */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            Nuestro <span className="text-sl-gray">Laboratorio</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 border-l-4 border-sl-navy pl-6 py-2 bg-sl-navy/5 rounded-r-2xl">
            <p className="text-xl md:text-2xl text-sl-gray font-light italic leading-relaxed max-w-3xl">
              "Contamos con excelente calidad de máquinas para todo tipo de ejercicio, diseñadas para llevar tu rendimiento al límite."
            </p>
          </div>
        </header>

        {/* GALERÍA DE INSTALACIONES (Grid 2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Foto 1: Mancuernas */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-sl-gray/20 bg-sl-navy/10 shadow-2xl">
            <img src={fotoMancuernas} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Mancuernas" />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-sl-black via-sl-black/20 to-transparent">
            
            </div>
          </div>

          {/* Foto 2: Barras */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-sl-gray/20 bg-sl-navy/10 shadow-2xl">
            <img src={fotoBarras} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Barras" />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-sl-black via-sl-black/20 to-transparent">
            </div>
          </div>

          {/* Foto 3: Boom Room */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-sl-gray/20 bg-sl-navy/10 shadow-2xl">
            <img src={fotoBoomRoom} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Boom Room" />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-sl-black via-sl-black/20 to-transparent">
            </div>
          </div>

          {/* Foto 4: Muñeco (Anatomía) */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-sl-gray/20 bg-sl-navy/10 shadow-2xl">
            <img src={fotoMuñeco} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" alt="Anatomía" />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-sl-black via-sl-black/20 to-transparent">
            </div>
          </div>

        </div>

        {/* Footer sutil */}
        <div className="mt-24 text-center">
          <p className="text-[10px] text-sl-gray uppercase tracking-[0.5em] opacity-30">Strength Lab • Calidad Certificada • UTEC 2026</p>
        </div>
      </div>
    </div>
  );
}