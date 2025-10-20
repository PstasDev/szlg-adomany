import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-[#333C3E]/10">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center gap-6">
          <div className="flex-shrink-0 text-[#333C3E]">
            <Image
              src="/logo.svg"
              alt="Szent László Gimnázium"
              width={80}
              height={80}
              priority
              className="w-16 h-16 md:w-20 md:h-20 text-[#333C3E] fill-[#333C3E]"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#333C3E] font-serif">
              Szent László Gimnázium
            </h1>
            <p className="text-[#333C3E]/70 mt-1">Adományozás</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-6 font-serif">
            Szükségünk van a támogatására!
          </h2>
          <p className="text-[#333C3E]/80 text-lg leading-relaxed">
            Ezen az oldalon a jövőben megismerheti azokat a projekteket, kezdeményezéseket és hiányosságokat intézményünkben, amelyekhez az Ön támogatására is szükség van. Kérjük, addig is fontolja meg, hogy adományával hozzájárul iskolánk fejlődéséhez és diákjaink sikereihez!
          </p>
        </section>

        {/* Foundation Cards */}
        <div className="space-y-8">
          {/* Foundation General */}
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-2xl font-semibold text-[#333C3E] mb-4 font-serif">
              &quot;Összefogás a Szent László Gimnáziumért&quot; Alapítvány
            </h3>
            <p className="text-[#333C3E]/70 mb-6 italic">
              Az iskola általános támogatása
            </p>
            <div className="space-y-3 text-[#333C3E]/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium min-w-[120px]">Számlaszám:</span>
                <span className="font-mono text-sm sm:text-base select-all">11710002-20048556</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium min-w-[120px]">Adószám:</span>
                <span className="font-mono text-sm sm:text-base select-all">18014125-1-42</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-medium min-w-[120px]">Cím:</span>
                <span className="text-sm sm:text-base">1102 Budapest, Kőrösi Csoma Sándor út 28.</span>
              </div>
            </div>
          </div>

          {/* Foundation BioszKémia */}
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-2xl font-semibold text-[#333C3E] mb-4 font-serif">
              Szent László Gimnázium Biológia-Kémia Alapítvány
            </h3>
            <p className="text-[#333C3E]/70 mb-6 italic">
              Az Emelt Szintű Biológia és Kémia Tagozat alapítványa, az iskolai alapítványtól függetlenül működik.
            </p>
            <div className="space-y-3 text-[#333C3E]/80">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium min-w-[120px]">Számlaszám:</span>
                <span className="font-mono text-sm sm:text-base select-all">11710002-20049791</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium min-w-[120px]">Adószám:</span>
                <span className="font-mono text-sm sm:text-base select-all">19670326-1-42</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-medium min-w-[120px]">Cím:</span>
                <span className="text-sm sm:text-base">1102 Budapest, Kőrösi Csoma Sándor út 28.</span>
              </div>
            </div>
          </div>
        </div>
        

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-6 font-serif">

            Közlemény rovat</h2>
          <p className="text-[#333C3E]/80 text-lg leading-relaxed">
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                A közlemény rovatban feltüntetheti, hogy az intézmény mely projektre, munkacsoportra, tagozatra vagy alszervezetre fordítsa az adományozott összeget.
                <br />
                <b>&quot;Adomány a(z) [projekt/munkacsoport/tagozat neve] részére&quot;.</b>
              </li>
              <li>Amennyiben az adomány közleményében nem tünteti fel, hogy mely projektnek, munkacsoportnak, tagozatnak vagy alszervezetnek szánja az adományt, úgy az adomány általános célokra kerül felhasználásra.</li>
            </ul>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-[#333C3E]/10">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-[#333C3E]/60 text-sm">
          <p>© {new Date().getFullYear()} Szent László Gimnázium</p>
        </div>
      </footer>
    </main>
  );
}
