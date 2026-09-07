// ==========================================
// IMPORTACIONES
// ==========================================
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Sunrise, Sunset, MessageCircle } from 'lucide-react';

// Número de WhatsApp del gimnasio (formato internacional, sin '+' ni espacios)
const WHATSAPP_NUMBER = '50375093445';

const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DIAS_LARGOS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function AgendaPrueba() {
  // Fecha de hoy sin horas/minutos, para comparar días completos
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const [mesActual, setMesActual] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' });
  const [franja, setFranja] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const primerDiaSemana = mesActual.getDay();
  const diasEnMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0).getDate();

  // No se permite retroceder antes del mes actual
  const puedeIrAtras =
    mesActual.getFullYear() > hoy.getFullYear() ||
    (mesActual.getFullYear() === hoy.getFullYear() && mesActual.getMonth() > hoy.getMonth());

  const irMesAnterior = () => {
    if (!puedeIrAtras) return;
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1));
  };

  const irMesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1));
  };

  const seleccionarDia = (dia) => {
    const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
    if (fecha < hoy || fecha.getDay() === 0) return; // Domingos cerrado, no se agenda en el pasado
    setDiaSeleccionado(fecha);
    setError('');
    setEnviado(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  const elegirFranja = (valor) => {
    setFranja(valor);
    setEnviado(false);
  };

  const handleAgendar = () => {
    if (!form.nombre.trim() || !form.correo.trim() || !form.telefono.trim()) {
      setError('Por favor completa tu nombre, correo y teléfono.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }
    if (!diaSeleccionado) {
      setError('Selecciona un día disponible en el calendario.');
      return;
    }
    if (!franja) {
      setError('Elige tu horario preferido: mañana o tarde.');
      return;
    }

    const fechaTexto = `${DIAS_LARGOS[diaSeleccionado.getDay()]} ${diaSeleccionado.getDate()} de ${MESES[diaSeleccionado.getMonth()]} de ${diaSeleccionado.getFullYear()}`;

    const mensaje = `¡Hola Strength Lab! Quiero agendar mi día de prueba gratis.\n\nNombre: ${form.nombre}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono}\nDía preferido: ${fechaTexto}\nHorario preferido: ${franja}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    // Reinicia el formulario para que quede listo para una nueva agenda
    setForm({ nombre: '', correo: '', telefono: '' });
    setDiaSeleccionado(null);
    setFranja('');
    setError('');
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-sl-black text-sl-white font-sans p-6 overflow-x-hidden relative pt-32 pb-24">

      {/* BOTÓN PARA REGRESAR AL INICIO */}
      <Link
        to="/"
        className="absolute top-28 left-6 md:left-10 z-50 p-3 bg-sl-navy/30 hover:bg-sl-petrol rounded-full transition-all duration-300 text-sl-gray hover:text-sl-white group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </Link>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Agenda tu <span className="text-sl-gray">Día de Prueba</span>
          </h1>
          <p className="text-sl-gray italic">100% gratis. Sin compromiso. Ven a conocer Strength Lab.</p>
        </header>

        <div className="bg-sl-navy/10 border border-sl-navy/30 rounded-3xl p-6 sm:p-8 shadow-2xl">

          {/* --- DATOS DE CONTACTO --- */}
          <h2 className="text-sl-gray uppercase text-xs tracking-[0.3em] font-bold mb-4">Tus datos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre completo"
              className="bg-sl-black/50 border border-sl-gray/30 rounded-xl px-4 py-3 text-sl-white placeholder:text-sl-gray focus:outline-none focus:border-sl-navy transition-colors"
            />
            <input
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="bg-sl-black/50 border border-sl-gray/30 rounded-xl px-4 py-3 text-sl-white placeholder:text-sl-gray focus:outline-none focus:border-sl-navy transition-colors"
            />
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono / WhatsApp"
              className="sm:col-span-2 bg-sl-black/50 border border-sl-gray/30 rounded-xl px-4 py-3 text-sl-white placeholder:text-sl-gray focus:outline-none focus:border-sl-navy transition-colors"
            />
          </div>

          {/* --- CALENDARIO --- */}
          <h2 className="text-sl-gray uppercase text-xs tracking-[0.3em] font-bold mb-4">Elige tu día</h2>
          <div className="bg-sl-black/50 border border-sl-gray/20 rounded-2xl p-4 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={irMesAnterior}
                disabled={!puedeIrAtras}
                className="p-2 rounded-full hover:bg-sl-navy/30 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <p className="font-black uppercase italic tracking-wide">
                {MESES[mesActual.getMonth()]} {mesActual.getFullYear()}
              </p>
              <button
                type="button"
                onClick={irMesSiguiente}
                className="p-2 rounded-full hover:bg-sl-navy/30 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
              {DIAS_CORTOS.map((d) => (
                <div key={d} className="text-center text-[10px] sm:text-[11px] text-sl-gray uppercase tracking-widest font-bold">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array.from({ length: primerDiaSemana }).map((_, i) => (
                <div key={`vacio-${i}`} />
              ))}
              {Array.from({ length: diasEnMes }).map((_, i) => {
                const dia = i + 1;
                const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
                const deshabilitado = fecha < hoy || fecha.getDay() === 0;
                const seleccionado = diaSeleccionado && fecha.getTime() === diaSeleccionado.getTime();

                return (
                  <button
                    key={dia}
                    type="button"
                    disabled={deshabilitado}
                    onClick={() => seleccionarDia(dia)}
                    className={`aspect-square rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      deshabilitado
                        ? 'text-sl-gray/30 cursor-not-allowed'
                        : seleccionado
                          ? 'bg-sl-navy text-sl-white shadow-lg scale-105'
                          : 'text-sl-white border border-transparent hover:border-sl-navy hover:bg-sl-navy/20'
                    }`}
                  >
                    {dia}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- FRANJA HORARIA --- */}
          <h2 className="text-sl-gray uppercase text-xs tracking-[0.3em] font-bold mb-4">Horario preferido</h2>
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => elegirFranja('Mañana')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold uppercase text-xs sm:text-sm tracking-widest transition-all ${
                franja === 'Mañana'
                  ? 'bg-sl-navy border-sl-navy text-sl-white'
                  : 'border-sl-gray/30 text-sl-gray hover:border-sl-navy'
              }`}
            >
              <Sunrise size={18} /> Mañana
            </button>
            <button
              type="button"
              onClick={() => elegirFranja('Tarde')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold uppercase text-xs sm:text-sm tracking-widest transition-all ${
                franja === 'Tarde'
                  ? 'bg-sl-navy border-sl-navy text-sl-white'
                  : 'border-sl-gray/30 text-sl-gray hover:border-sl-navy'
              }`}
            >
              <Sunset size={18} /> Tarde
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="button"
            onClick={handleAgendar}
            className="w-full flex items-center justify-center gap-2 bg-sl-white text-sl-black hover:bg-sl-gray font-black py-4 rounded-full uppercase tracking-widest transition-all shadow-lg"
          >
            <MessageCircle size={20} />
            Confirmar por WhatsApp
          </button>

          {enviado ? (
            <p className="text-green-400 text-center mt-4 font-bold uppercase tracking-widest text-sm">
              ¡Listo! Confirma el envío en WhatsApp para agendar tu día.
            </p>
          ) : (
            <p className="text-xs text-sl-gray text-center mt-4">
              Se abrirá WhatsApp con tu información lista para enviar y agendar tu día de prueba gratis.
            </p>
          )}

          {/* AVISO DE HORARIO */}
          <div className="mt-8 bg-sl-black/80 border-l-4 border-sl-navy p-4 rounded-r-xl">
            <p className="text-xs text-sl-gray leading-relaxed">
              <strong className="text-sl-white uppercase">Horario del gimnasio:</strong> Lunes a Viernes 5:00 AM - 10:00 PM · Sábados 7:00 AM - 3:00 PM · Domingos cerrado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
