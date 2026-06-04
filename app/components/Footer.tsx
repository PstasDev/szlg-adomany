import Link from 'next/link';

import PaymentMethods from './PaymentMethods';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#333C3E]/10">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6 text-[#333C3E]/70 text-sm">
        <PaymentMethods />

        <p className="text-center text-xs leading-relaxed max-w-2xl mx-auto">
          Az online bankkártyás fizetéseket a{' '}
          <a
            href="https://www.barion.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Barion Payment Zrt.
          </a>{' '}
          biztosítja, a Magyar Nemzeti Bank engedélyének száma:
          H-EN-I-1064/2013. A bankkártya adatok a Szolgáltatóhoz nem
          jutnak el.
        </p>

        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
          aria-label="Jogi információk"
        >
          <Link href="/aszf" className="hover:text-[#333C3E] underline">
            Általános Szerződési Feltételek
          </Link>
          <Link href="/adatvedelem" className="hover:text-[#333C3E] underline">
            Adatvédelmi Tájékoztató
          </Link>
        </nav>

        <p className="text-center text-[#333C3E]/60">
          Ezt az applikációt (is) informatika tagozatos diákok készítették💙
        </p>

        <p className="text-center text-[#333C3E]/60">
          © {new Date().getFullYear()} KIT-egylet, Szent László Gimnázium
        </p>
      </div>
    </footer>
  );
}
