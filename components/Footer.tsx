export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900">LISA Insurtech</p>
          <p className="text-sm text-gray-500">© 2026 LISA Insurtech. Built for Trust and Innovation.</p>
        </div>
        <div className="text-sm text-gray-500">
          <span>Creado por Francisco Pino</span>
        </div>
      </div>
    </footer>
  );
}
