// ==========================================================
// PÁGINA: SUBIR PROGRESO (dentro de Comunidad)
// ==========================================================
// NOTA: esta página está "oculta" junto con Comunidad (ver la nota al
// inicio de Comunidad.jsx). El código sigue funcionando normalmente.
//
// Esta página SIMULA subir una foto de progreso. Importante: como el
// sitio todavía no tiene un servidor/backend real, la "subida" es una
// simulación (con un temporizador falso) y la imagen NUNCA se envía a
// ningún lado ni se guarda de verdad. Es solo una demostración visual
// de cómo se vería el flujo completo.

import { useState } from 'react';
import { Upload, Image as ImageIcon, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
// Importamos Link para poder regresar a la comunidad principal
import { Link } from 'react-router-dom';

export default function SubirProgreso() {
  // selectedFile guarda el archivo de imagen que la persona eligió
  // (o null si todavía no ha elegido ninguno).
  const [selectedFile, setSelectedFile] = useState(null);

  // uploadStatus controla en qué momento del proceso estamos:
  // 'idle'      -> nada está pasando (estado inicial)
  // 'uploading' -> se está "subiendo" (simulado con un temporizador)
  // 'success'   -> ya "terminó" de subirse
  const [uploadStatus, setUploadStatus] = useState('idle');

  // Se ejecuta cada vez que la persona elige un archivo en el <input type="file">.
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Tomamos el primer archivo elegido
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  // Se ejecuta cuando la persona presiona "PUBLICAR PROGRESO".
  const handleUpload = () => {
    if (!selectedFile) return; // Seguridad extra: no hacer nada sin archivo
    setUploadStatus('uploading');
    // setTimeout simula el tiempo que tardaría subir la imagen a un
    // servidor real. Después de 2000 milisegundos (2 segundos),
    // marcamos el estado como "éxito" (aquí es donde, con un backend
    // real, iría la llamada de verdad para subir el archivo).
    setTimeout(() => {
      setUploadStatus('success');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-sl-black text-sl-white font-sans p-6 overflow-x-hidden relative pt-32 pb-24">

      {/* BOTÓN PARA REGRESAR A LA COMUNIDAD PRINCIPAL */}
      <Link
        to="/comunidad"
        className="absolute top-28 left-6 md:left-10 z-50 p-3 bg-sl-navy/30 hover:bg-sl-petrol rounded-full transition-all duration-300 text-sl-gray hover:text-sl-white group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Sube tu <span className="text-sl-gray">Evidencia</span>
          </h1>
        </header>

        {/* CAJA DE SUBIDA */}
        <div className="bg-sl-navy/10 border border-sl-navy/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="border-2 border-dashed border-sl-gray/40 rounded-2xl p-10 flex flex-col items-center justify-center bg-sl-black/50 hover:border-sl-navy transition-colors">
            {/* Renderizado condicional: si NO hay archivo seleccionado,
                mostramos el ícono + texto de "elegir imagen"; si SÍ hay
                uno, mostramos el check verde con el nombre del archivo.
                El operador "condición ? algo : otraCosa" es un "if/else"
                resumido en una sola línea, muy usado dentro de JSX. */}
            {!selectedFile ? (
              <>
                <ImageIcon size={48} className="text-sl-gray mb-4" />
                <p className="text-sl-gray mb-6 text-center">Haz clic para seleccionar una imagen de tu progreso.</p>
              </>
            ) : (
              <div className="flex flex-col items-center mb-6">
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <p className="text-sl-white font-medium">{selectedFile.name}</p>
              </div>
            )}

            {/* Truco muy común: el <input type="file"> real queda invisible
                ("hidden") y usamos un <label> bonito conectado con
                htmlFor="file-upload" para que, al hacer clic en el label,
                se abra el selector de archivos del sistema operativo. */}
            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
            <label htmlFor="file-upload" className="cursor-pointer bg-sl-navy hover:bg-sl-petrol text-sl-white font-bold py-3 px-8 rounded-full transition-all uppercase text-sm tracking-widest">
              {selectedFile ? 'Cambiar Foto' : 'Elegir Foto'}
            </label>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleUpload}
              // El botón se deshabilita si no hay archivo o si ya se está
              // "subiendo", para evitar que le den clic varias veces por accidente.
              disabled={!selectedFile || uploadStatus === 'uploading'}
              className={`flex items-center gap-2 font-black py-4 px-12 transition-all uppercase tracking-widest ${
                !selectedFile || uploadStatus === 'uploading'
                  ? 'bg-sl-gray/20 text-sl-gray cursor-not-allowed'
                  : 'bg-sl-white text-sl-black hover:bg-sl-gray shadow-lg'
              }`}
            >
              {uploadStatus === 'uploading' ? 'PROCESANDO...' : 'PUBLICAR PROGRESO'}
              <Upload size={20} />
            </button>
          </div>

          {/* Este mensaje solo aparece cuando uploadStatus vale 'success'.
              "condicion && <algo>" es otra forma común de renderizado
              condicional en React: si "condicion" es falsa, no se muestra nada. */}
          {uploadStatus === 'success' && (
            <p className="text-green-400 text-center mt-6 font-bold uppercase tracking-widest">
              ¡Imagen enviada a revisión!
            </p>
          )}

          {/* AVISO DE SEGURIDAD */}
          <div className="mt-8 bg-sl-black/80 border-l-4 border-yellow-600 p-4 rounded-r-xl flex items-start gap-4">
            <ShieldAlert className="text-yellow-600 shrink-0 mt-1" size={24} />
            <p className="text-xs text-sl-gray leading-relaxed">
              <strong className="text-sl-white uppercase">Aviso de Seguridad:</strong> Todas las imágenes pasan por un filtro de moderación y aprobación manual antes de ser publicadas en el muro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
