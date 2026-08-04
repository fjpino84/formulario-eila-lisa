import Image from "next/image";
import ContestForm from "@/components/ContestForm";

export default function ContestsPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-800">
              EILA 2026
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              Compite contra LISA
            </h1>
            <p className="mt-4 text-gray-600">
              Pon a prueba tu agudeza visual e identifica las 3 adulteraciones en la
              boleta de honorarios, y demuestra que eres un experto en la prevención del
              fraude. Si identificas las opciones correctas estarás participando por el
              sorteo de unos AirPods Pro 3.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/airpods.png"
              alt="AirPods Pro, premio del sorteo"
              width={528}
              height={572}
              className="h-auto w-full max-w-sm"
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
          <ContestForm />
        </div>
      </section>
    </div>
  );
}
