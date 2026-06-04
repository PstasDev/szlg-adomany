import Link from "next/link";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Adományozás" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-6 font-serif">
            Szükségünk van a támogatására!
          </h2>
          <p className="text-[#333C3E]/80 text-lg leading-relaxed">
            Ezen az oldalon megismerheti azokat a projekteket és kezdeményezéseket,
            amelyekhez az Ön támogatására is szükség van. Kérjük, fontolja meg, hogy
            adományával hozzájárul iskolánk fejlődéséhez és diákjaink sikereihez!
          </p>
        </section>

        {/* Primary CTA */}
        <section className="mb-12">
          <Link
            href="/projektek"
            className="group block bg-white border border-[#333C3E]/15 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#333C3E]/30 transition-all"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#333C3E] mb-2 font-serif">
                  Támogatható projektek
                </h3>
                <p className="text-[#333C3E]/70">
                  Böngésszen az aktuális projektek között, és válasszon, mit szeretne támogatni.
                </p>
              </div>
              <span
                aria-hidden
                className="shrink-0 text-2xl text-[#333C3E]/60 group-hover:text-[#333C3E] group-hover:translate-x-1 transition-all"
              >
                →
              </span>
            </div>
          </Link>
        </section>

        {/* Foundation details — collapsed by default to reduce homepage noise */}
        <details className="group bg-white border border-[#333C3E]/10 rounded-lg shadow-sm">
          <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4 text-[#333C3E] font-medium select-none">
            <span>Szervezeti adatok (banki átutaláshoz)</span>
            <span
              aria-hidden
              className="text-[#333C3E]/60 transition-transform group-open:rotate-180"
            >
              ▾
            </span>
          </summary>

          <div className="px-6 pb-6 space-y-4 border-t border-[#333C3E]/10 pt-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-[#333C3E] mb-2 font-serif">
                Középiskolai Informatikai és Tömegkommunikációs Egyesület
              </h3>
              <p className="text-[#333C3E]/70 mb-4 italic text-sm">
                Rövidített név: KIT-egylet
              </p>
              <div className="space-y-2 text-[#333C3E]/80 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Adószám:</span>
                  <span className="font-mono select-all">18989982-1-42</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Székhely:</span>
                  <span>1105 Budapest, Veszprémi utca 3. II/23.</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">E-mail:</span>
                  <a
                    href="mailto:admin@kitegylet.hu"
                    className="underline select-all"
                  >
                    admin@kitegylet.hu
                  </a>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>

      <Footer />
    </main>
  );
}

