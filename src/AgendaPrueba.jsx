// ==========================================================
// PÁGINA: AGENDA TU DÍA DE PRUEBA GRATIS
// ==========================================================
// Esta es la página más "avanzada" del sitio: tiene un formulario de
// contacto, un calendario hecho a mano (sin librerías externas) y, al
// confirmar, arma un mensaje de texto y abre WhatsApp con todo ya
// escrito para que la persona solo tenga que darle "Enviar".
//
// No hay backend: todo pasa en el navegador de quien visita la página.
// Por eso usamos WhatsApp como "buzón" en vez de guardar los datos en
// una base de datos.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Sunrise, Sunset, MessageCircle } from 'lucide-react';

// Número de WhatsApp del gimnasio, en formato internacional y sin
// espacios ni símbolo "+" (así lo pide el enlace de WhatsApp que usamos
// más abajo: https://wa.me/<numero>).
const WHATSAPP_NUMBER = '50375093445';

// Estos tres arreglos son solo listas de texto en español que usamos
// para "traducir" los números que nos da JavaScript (los días de la
// semana van de 0 a 6, los meses de 0 a 11) a palabras legibles.
const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DIAS_LARGOS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function AgendaPrueba() {
  // "hoy" representa el día de hoy, pero con la hora forzada a 00:00:00.
  // Es un truco muy común en JavaScript: así podemos comparar fechas
  // completas (día contra día) sin que la hora exacta arruine la comparación.
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // --- ESTADOS ---
  // (datos que, al cambiar con su función "set...", hacen que React
  // vuelva a dibujar la pantalla con los valores nuevos)

  // mesActual: el mes que se está mostrando en el calendario ahora mismo.
  // Empieza siendo el día 1 del mes actual.
  const [mesActual, setMesActual] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));

  // diaSeleccionado: la fecha exacta que la persona eligió en el
  // calendario (o null si todavía no ha elegido ninguna).
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  // form: un objeto con los 3 campos de texto del formulario.
  // Usamos un solo estado para los tres campos en vez de tres useState separados.
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' });

  // franja: 'Mañana' o 'Tarde' (el horario preferido), o '' si aún no ha elegido.
  const [franja, setFranja] = useState('');

  // error: el mensaje de validación que se muestra si falta algún dato.
  const [error, setError] = useState('');

  // enviado: true justo después de confirmar por WhatsApp, para mostrar
  // un mensaje de "¡Listo!" en vez del texto de ayuda normal.
  const [enviado, setEnviado] = useState(false);

  // --- CÁLCULOS DEL CALENDARIO ---
  // Estas variables se recalculan solas cada vez que el componente se
  // vuelve a dibujar (por ejemplo, cuando cambia "mesActual").

  // getDay() devuelve en qué día de la semana cae el día 1 del mes
  // (0 = domingo, 1 = lunes, ... 6 = sábado). Lo usamos para saber
  // cuántas celdas vacías poner ANTES del día 1 en la grilla.
  const primerDiaSemana = mesActual.getDay();

  // Truco para saber cuántos días tiene el mes: le pedimos a JavaScript
  // el "día 0" del MES SIGUIENTE, que en la práctica significa "el
  // último día del mes anterior" (es decir, del mes que nos interesa).
  const diasEnMes = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0).getDate();

  // puedeIrAtras: true si el mes que se está mostrando es posterior al
  // mes de hoy. Sirve para no dejar retroceder el calendario a un mes
  // que ya pasó (no tendría sentido agendar un día que ya ocurrió).
  const puedeIrAtras =
    mesActual.getFullYear() > hoy.getFullYear() ||
    (mesActual.getFullYear() === hoy.getFullYear() && mesActual.getMonth() > hoy.getMonth());

  // Retrocede un mes en el calendario (solo si puedeIrAtras lo permite).
  const irMesAnterior = () => {
    if (!puedeIrAtras) return;
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1));
  };

  // Avanza un mes en el calendario (sin límite hacia adelante).
  const irMesSiguiente = () => {
    setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1));
  };

  // Se ejecuta cuando la persona hace clic en un número del calendario.
  const seleccionarDia = (dia) => {
    const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
    // No dejamos seleccionar días que ya pasaron, ni domingos (el gym cierra).
    if (fecha < hoy || fecha.getDay() === 0) return;
    setDiaSeleccionado(fecha);
    setError('');      // Si había un mensaje de error, lo limpiamos.
    setEnviado(false); // Si ya se había mostrado el aviso de "enviado", lo ocultamos.
  };

  // Maneja los cambios en los 3 inputs de texto (nombre, correo, teléfono).
  // Como los tres inputs comparten esta misma función, usamos el
  // atributo "name" de cada input (e.target.name) para saber cuál
  // campo específico cambió.
  const handleChange = (e) => {
    // "...form" copia los valores que ya había en el objeto, y
    // "[e.target.name]: e.target.value" sobreescribe SOLO el campo
    // que la persona está escribiendo en este momento.
    setForm({ ...form, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  // Se ejecuta al hacer clic en el botón "Mañana" o "Tarde".
  const elegirFranja = (valor) => {
    setFranja(valor);
    setEnviado(false);
  };

  // Se ejecuta al hacer clic en "Confirmar por WhatsApp".
  const handleAgendar = () => {
    // --- VALIDACIONES ---
    // Revisamos los datos uno por uno; si algo falta o está mal,
    // mostramos un mensaje de error específico y detenemos la función
    // con "return" (así el código de abajo no se ejecuta).

    if (!form.nombre.trim() || !form.correo.trim() || !form.telefono.trim()) {
      setError('Por favor completa tu nombre, correo y teléfono.');
      return;
    }
    // Esta es una expresión regular (regex): revisa que el correo tenga
    // la forma básica "algo@algo.algo". No comprueba que el correo
    // exista de verdad, solo que el formato sea válido.
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

    // Si llegamos hasta aquí, todos los datos son válidos.

    // Convertimos la fecha elegida en un texto legible para humanos, ej:
    // "Jueves 17 de Septiembre de 2026"
    const fechaTexto = `${DIAS_LARGOS[diaSeleccionado.getDay()]} ${diaSeleccionado.getDate()} de ${MESES[diaSeleccionado.getMonth()]} de ${diaSeleccionado.getFullYear()}`;

    // Armamos el mensaje completo que se enviará por WhatsApp.
    // "\n" dentro del texto crea un salto de línea.
    const mensaje = `¡Hola Strength Lab! Quiero agendar mi día de prueba gratis.\n\nNombre: ${form.nombre}\nCorreo: ${form.correo}\nTeléfono: ${form.telefono}\nDía preferido: ${fechaTexto}\nHorario preferido: ${franja}`;

    // encodeURIComponent convierte el mensaje en un formato seguro para
    // ponerlo dentro de una dirección web (reemplaza espacios, tildes,
    // signos de exclamación, etc). wa.me/<numero>?text=<mensaje> es el
    // formato oficial de "clic para chatear" de WhatsApp: abre un chat
    // ya con el número y el mensaje listos.
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    // Abrimos WhatsApp en una pestaña nueva del navegador.
    // 'noopener,noreferrer' es una medida de seguridad recomendada al
    // abrir enlaces externos así (evita que esa nueva pestaña pueda
    // manipular la pestaña original de nuestro sitio).
    window.open(url, '_blank', 'noopener,noreferrer');

    // Reiniciamos el formulario para que quede listo para una nueva
    // agenda (por ejemplo, si otra persona va a usar la misma pantalla
    // justo después, en una computadora del gimnasio).
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

          {/* --- DATOS DE CONTACTO ---
              Estos son "inputs controlados": su valor SIEMPRE viene del
              estado "form" (value={form.nombre}) y cada tecla que la
              persona escribe dispara onChange, que actualiza ese estado.
              Así React siempre sabe exactamente qué hay escrito en cada campo. */}
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

            {/* Encabezado del calendario: flecha atrás, nombre del mes, flecha adelante */}
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

            {/* Fila con las abreviaturas de los días de la semana (Dom, Lun, ...) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
              {DIAS_CORTOS.map((d) => (
                <div key={d} className="text-center text-[10px] sm:text-[11px] text-sl-gray uppercase tracking-widest font-bold">
                  {d}
                </div>
              ))}
            </div>

            {/* Grilla de números del mes (7 columnas = 7 días de la semana) */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Array.from({ length: N }) crea un arreglo "vacío" de N
                  espacios, solo para poder usar .map() y generar N
                  elementos repetidos. Aquí lo usamos para dibujar celdas
                  en blanco ANTES del día 1, de modo que el día 1 caiga
                  en la columna correcta de la semana (por ejemplo, si el
                  mes empieza en miércoles, se ven 3 casillas vacías antes). */}
              {Array.from({ length: primerDiaSemana }).map((_, i) => (
                <div key={`vacio-${i}`} />
              ))}

              {/* Ahora sí generamos un botón por cada día real del mes (1, 2, 3...) */}
              {Array.from({ length: diasEnMes }).map((_, i) => {
                const dia = i + 1;
                const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
                // Un día está deshabilitado si ya pasó o si cae domingo.
                const deshabilitado = fecha < hoy || fecha.getDay() === 0;
                // Comparamos con getTime() (milisegundos desde 1970) porque
                // comparar dos objetos Date directamente con "===" en
                // JavaScript NO funciona como uno esperaría.
                const seleccionado = diaSeleccionado && fecha.getTime() === diaSeleccionado.getTime();

                return (
                  <button
                    key={dia}
                    type="button"
                    disabled={deshabilitado}
                    onClick={() => seleccionarDia(dia)}
                    // Esta cadena de texto con backticks (`) arma las
                    // clases de Tailwind de forma dinámica: el color
                    // cambia según si el día está deshabilitado,
                    // seleccionado, o disponible normal.
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

          {/* Mensaje de error: solo se dibuja en pantalla si "error"
              tiene algún texto adentro (si es '' vacío, no se muestra nada). */}
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

          {/* Alternamos entre el texto de ayuda normal y el mensaje de
              éxito, dependiendo del estado "enviado". */}
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
