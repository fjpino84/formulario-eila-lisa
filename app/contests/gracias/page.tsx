import Link from "next/link";

export default function GraciasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-teal-800">Muchas gracias por Participar</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Haz detectado el Fraude <span className="font-semibold text-purple-700">VISIBLE</span>, pero ¿sabías
          que este documento esconde más cosas?
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border-l-4 border-teal-600 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-teal-50 p-2 text-teal-700">
              <IconMetadata />
            </div>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
              CRITICAL METADATA
            </span>
          </div>
          <h3 className="mt-4 font-bold text-gray-900">METADATA</h3>
          <p className="mt-2 text-sm text-gray-600">
            El rastro digital no miente. El archivo fue originalmente <b>creado en 2021</b>,
            pero detectamos ediciones fraudulentas realizadas en <b>Canva en 2024</b> para
            alterar su validez.
          </p>
        </div>

        <div className="rounded-xl border-l-4 border-purple-600 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-purple-50 p-2 text-purple-700">
              <IconBank />
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-600">$905,000</p>
              <p className="text-xs text-gray-400 line-through">$108,000</p>
            </div>
          </div>
          <h3 className="mt-4 font-bold text-gray-900">AGENTE SII</h3>
          <p className="mt-2 text-sm text-gray-600">
            Inconsistencia fiscal detectada. El monto real registrado es de <b>$108,000</b>,
            mientras que el documento presentado declara <b>$905,000</b>.
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
            <span className="text-gray-500">Discrepancia:</span>
            <span className="font-semibold text-purple-700">+738%</span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="w-fit rounded-lg bg-teal-50 p-2 text-teal-700">
            <IconChart />
          </div>
          <h3 className="mt-4 font-bold text-gray-900">DESVIACIÓN</h3>
          <p className="mt-2 text-sm text-gray-600">
            Análisis estadístico muestra una <b>alta desviación</b> del promedio histórico de{" "}
            <b>$50,000</b> para este tipo de siniestro.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="w-fit rounded-lg bg-purple-50 p-2 text-purple-700">
            <IconUsers />
          </div>
          <h3 className="mt-4 font-bold text-gray-900">COALICIÓN</h3>
          <p className="mt-2 text-sm text-gray-600">
            Patrón de comportamiento sospechoso: El beneficiario visitó al mismo proveedor{" "}
            <b>15 veces en solo 7 días</b>.
          </p>
        </div>

        <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow-sm">
          <div className="w-fit rounded-lg bg-red-50 p-2 text-red-600">
            <IconWarning />
          </div>
          <h3 className="mt-4 font-bold text-gray-900">WATCHLIST</h3>
          <p className="mt-2 text-sm text-gray-600">
            Alerta roja de identidad. El RUT del beneficiario cuenta con{" "}
            <b>antecedentes previos de fraude</b> en nuestra base de datos global.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800 via-teal-700 to-purple-800 p-10 text-white">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold">LISA detecta lo que el ojo humano ignora</h2>
          <p className="mt-4 text-teal-100">
            Nuestra tecnología de IA y análisis de grafos identifica patrones complejos en
            microsegundos, asegurando que solo los siniestros legítimos sean procesados.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contests"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900"
            >
              Ver Reporte Completo →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Saber más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconMetadata() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-15H8.25A2.25 2.25 0 0 0 6 4.5v15a2.25 2.25 0 0 0 2.25 2.25h9.75A2.25 2.25 0 0 0 20.25 19.5V9.75L15.75 3Z" />
    </svg>
  );
}
function IconBank() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 3 8.25V9h18v-.75L12 3ZM4.5 10.5v7.5M9 10.5v7.5M15 10.5v7.5M19.5 10.5v7.5M3 21h18" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M8 17V10m5 7V6m5 11v-4" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}
function IconWarning() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  );
}
