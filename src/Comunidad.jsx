// ==========================================================
// PÁGINA: COMUNIDAD
// ==========================================================
// NOTA IMPORTANTE: por ahora esta página está "oculta". En App.jsx el
// enlace del menú lateral y las rutas "/comunidad" y "/comunidad/subir"
// quedaron comentados (busca "SECCIÓN COMUNIDAD (temporalmente oculta)"
// en ese archivo), así que nadie puede llegar aquí navegando desde el
// sitio. El código de esta página sigue completo y funcionando: para
// reactivarla más adelante, solo hay que descomentar esas líneas en
// App.jsx.

// Importamos Link para poder navegar a la página de subida
import { Link } from 'react-router-dom';
// Importamos el ícono de cámara para el botón de "compartir progreso"
import { Camera } from 'lucide-react';

// Importamos imágenes que ya existían en el proyecto para simular el
// muro de publicaciones de la comunidad.
import fotoBarras from './assets/barras.png';
import fotoMancuernas from './assets/mancuernas.png';
import fotoBoomRoom from './assets/boom-room.png';

export default function Comunidad() {
  // "publicaciones" es un arreglo (array) de objetos que simula
  // publicaciones reales de usuarios. Como el sitio todavía no tiene
  // backend/base de datos, estos datos están escritos directamente
  // aquí ("hardcodeados"). Cada objeto tiene un "id" único (para que
  // React pueda identificarlo), una "foto", el "usuario" y su "descripcion".
  const publicaciones = [
    { id: 1, foto: fotoBarras, usuario: "Carlos M.", descripcion: "Nuevo PR en sentadilla, 140kg." },
    { id: 2, foto: fotoMancuernas, usuario: "Ana G.", descripcion: "Trabajando aislamiento de hombros." },
    { id: 3, foto: fotoBoomRoom, usuario: "Equipo SL", descripcion: "Clase de explosividad a tope." }
  ];

  return (
    <div className="min-h-screen bg-sl-black text-sl-white font-sans p-6 overflow-x-hidden pt-32 pb-24">
      <div className="max-w-6xl mx-auto">

        {/* ========================================== */}
        {/* ENCABEZADO Y LLAMADO A LA ACCIÓN */}
        {/* ========================================== */}
        <header className="mb-16 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 leading-none">
            La Comunidad <span className="text-sl-gray">Strength Lab</span>
          </h1>
          <p className="text-xl text-sl-gray italic font-light max-w-2xl mb-10">
            Aquí no solo levantamos pesas, levantamos a nuestros compañeros. Este es el muro donde documentamos nuestra evolución.
          </p>

          {/* ESTE ES EL BOTÓN QUE LLEVA A LA PÁGINA DE SUBIDA.
              <Link to="..."> funciona como una etiqueta <a href="...">,
              pero es de React Router: cambia de página sin recargar
              el navegador completo (más rápido y fluido). */}
          <Link
            to="/comunidad/subir"
            className="flex items-center gap-3 bg-sl-white text-sl-black hover:bg-sl-gray font-black py-4 px-10 rounded-full transition-all duration-300 shadow-xl uppercase tracking-widest hover:-translate-y-1"
          >
            <Camera size={24} />
            Compartir mi progreso
          </Link>
        </header>

        {/* ========================================== */}
        {/* GALERÍA DEL MURO DE LA COMUNIDAD */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* .map() recorre el arreglo "publicaciones" y, por cada elemento,
              devuelve un pedazo de JSX (una tarjeta). React exige que cada
              elemento de una lista tenga una prop "key" única (usamos
              pub.id) para saber cuál es cuál si la lista llegara a cambiar. */}
          {publicaciones.map((pub) => (
            <div key={pub.id} className="bg-sl-navy/10 border border-sl-gray/20 rounded-3xl overflow-hidden group">
              {/* Foto de la publicación */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={pub.foto}
                  alt={pub.descripcion}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
              </div>
              {/* Datos del usuario y descripción */}
              <div className="p-6">
                <p className="font-bold text-sl-white uppercase tracking-wider mb-2">{pub.usuario}</p>
                <p className="text-sm text-sl-gray italic">"{pub.descripcion}"</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
