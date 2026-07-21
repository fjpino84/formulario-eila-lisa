import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="LISA Insurtech"
            width={360}
            height={96}
            priority
            className="h-20 w-auto sm:h-24"
          />
        </Link>
      </div>
    </header>
  );
}
