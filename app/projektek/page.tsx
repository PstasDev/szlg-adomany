import Link from 'next/link';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { listProjects, formatHuf } from '../lib/adomany';
import type { ProjectListItem } from '../lib/adomany-types';

export const revalidate = 60; // 1 minute ISR

export const metadata = {
  title: 'Projektek - Szent László Gimnázium',
  description: 'Támogatandó projektek a Szent László Gimnáziumban.',
};

async function safeList(): Promise<{
  projects: ProjectListItem[];
  error: string | null;
}> {
  try {
    const projects = await listProjects();
    return { projects, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Ismeretlen hiba';
    return { projects: [], error: msg };
  }
}

export default async function ProjectsPage() {
  const { projects, error } = await safeList();

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Projektek" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-4 font-serif">
            Támogatható projektek
          </h2>
          <p className="text-[#333C3E]/80 text-lg leading-relaxed">
            Az alábbi projektek jelenleg gyűjtenek adományokat. Válasszon egyet,
            és támogassa pénzbeli hozzájárulásával iskolánk fejlődését.
          </p>
        </section>

        {error && (
          <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] p-6 rounded-r-lg mb-8 text-[#856404]">
            Nem sikerült betölteni a projekteket. ({error})
          </div>
        )}

        {!error && projects.length === 0 && (
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 text-center text-[#333C3E]/70">
            Jelenleg nincsenek aktív projektek. Nézzen vissza később!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projektek/${p.slug}`}
              className="block bg-white border border-[#333C3E]/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {p.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cover_image}
                  alt={p.nev}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-[#333C3E] font-serif">
                    {p.nev}
                  </h3>
                  {p.tagozat && (
                    <span className="shrink-0 text-xs uppercase tracking-wider bg-[#333C3E]/5 text-[#333C3E]/70 px-2 py-1 rounded">
                      {p.tagozat}
                      {p.szak ? ` · ${p.szak}` : ''}
                    </span>
                  )}
                </div>
                {p.rovid_leiras && (
                  <p className="text-[#333C3E]/70 text-sm mb-4">
                    {p.rovid_leiras}
                  </p>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-[#333C3E]/80">
                    <span>{formatHuf(p.current_amount)}</span>
                    <span className="text-[#333C3E]/60">
                      Cél: {formatHuf(p.goal_amount)}
                    </span>
                  </div>
                  <div className="h-2 bg-[#333C3E]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#333C3E] transition-all"
                      style={{ width: `${p.progress_percent}%` }}
                    />
                  </div>
                  <div className="text-xs text-[#333C3E]/60">
                    {p.progress_percent}% teljesítve
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
