import Header from '../components/Header';
import Footer from '../components/Footer';
import { listProjects } from '../lib/adomany';
import type { ProjectListItem } from '../lib/adomany-types';
import ProjectsBrowser from './ProjectsBrowser';

// Always render fresh so progress_percent / current_amount stays in sync
// with the detail page (which is also dynamic). Otherwise ISR would let
// the list show a stale percentage for up to a minute after a donation.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#333C3E] mb-4 font-serif">
            Támogatható projektek
          </h2>
          <p className="text-[#333C3E]/80 text-lg leading-relaxed">
            Az alábbi projektek jelenleg gyűjtenek adományokat. Kattintson egy
            kártyára a részletekért és az online támogatáshoz. Ha az adott projekten feltüntetett összeg nem éri el a kitűzött célt a projekt céldátumáig, a felajánlott adományok átcsoportosításra kerülnek egy másik, hasonló célú projekthez, amelynek támogatása szintén szükséges és megvalósíthatóvá válik ezáltal.
          </p>
        </section>

        {error && (
          <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] p-6 rounded-r-lg mb-8 text-[#856404]">
            Nem sikerült betölteni a projekteket. ({error})
          </div>
        )}

        {!error && projects.length === 0 ? (
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 text-center text-[#333C3E]/70">
            Jelenleg nincsenek aktív projektek. Nézzen vissza később!
          </div>
        ) : (
          !error && <ProjectsBrowser projects={projects} />
        )}
      </div>

      <Footer />
    </main>
  );
}
