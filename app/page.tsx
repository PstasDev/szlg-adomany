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
            <span>Az alapítványok adatai (banki átutaláshoz)</span>
            <span
              aria-hidden
              className="text-[#333C3E]/60 transition-transform group-open:rotate-180"
            >
              ▾
            </span>
          </summary>

          <div className="px-6 pb-6 space-y-6 border-t border-[#333C3E]/10 pt-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-[#333C3E] mb-2 font-serif">
                &quot;Összefogás a Szent László Gimnáziumért&quot; Alapítvány
              </h3>
              <p className="text-[#333C3E]/70 mb-4 italic text-sm">
                Az iskola általános támogatása
              </p>
              <div className="space-y-2 text-[#333C3E]/80 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Számlaszám:</span>
                  <span className="font-mono select-all">11710002-20048556</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Adószám:</span>
                  <span className="font-mono select-all">18014125-1-42</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Cím:</span>
                  <span>1102 Budapest, Kőrösi Csoma Sándor út 28.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#333C3E]/10">
              <h3 className="text-lg md:text-xl font-semibold text-[#333C3E] mb-2 font-serif">
                Szent László Gimnázium Biológia-Kémia Alapítvány
              </h3>
              <p className="text-[#333C3E]/70 mb-4 italic text-sm">
                Az Emelt Szintű Biológia és Kémia Tagozat alapítványa, az iskolai
                alapítványtól függetlenül működik.
              </p>
              <div className="space-y-2 text-[#333C3E]/80 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Számlaszám:</span>
                  <span className="font-mono select-all">11710002-20049791</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Adószám:</span>
                  <span className="font-mono select-all">19670326-1-42</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-medium min-w-[110px]">Cím:</span>
                  <span>1102 Budapest, Kőrösi Csoma Sándor út 28.</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#333C3E]/60 pt-2">
              Közlemény rovat: <em>&quot;Adomány a(z) [projekt/munkacsoport/tagozat neve] részére&quot;</em>.
              Ha üresen hagyja, az adomány általános célokra kerül felhasználásra.
            </p>
          </div>
        </details>
      </div>

      <Footer />
    </main>
  );
}

