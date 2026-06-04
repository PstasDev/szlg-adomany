import { notFound } from 'next/navigation';
import Link from 'next/link';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getProject, formatHuf } from '../../lib/adomany';
import DonateForm from './DonateForm';

// Keep the detail page dynamic so progress matches the list view in real
// time after donations succeed (the list is also force-dynamic).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return {
      title: `${project.nev} - Szent László Gimnázium`,
      description: project.rovid_leiras || project.nev,
    };
  } catch {
    return { title: 'Projekt - Szent László Gimnázium' };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let project;
  try {
    project = await getProject(slug);
  } catch (e) {
    // 404 -> Next's not-found page
    if (
      e &&
      typeof e === 'object' &&
      'status' in e &&
      (e as { status: number }).status === 404
    ) {
      notFound();
    }
    // Any other failure (network, 5xx from the API, etc.): render a
    // friendly error UI instead of letting the request 500.
    const message = e instanceof Error ? e.message : 'Ismeretlen hiba';
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <Header subtitle="Projekt" />
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="bg-white border border-[#333C3E]/10 rounded-lg p-10 shadow-sm text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#333C3E] font-serif">
              Nem sikerült betölteni a projektet
            </h1>
            <p className="text-[#333C3E]/70">
              Az adatszerver pillanatnyilag nem érhető el. Kérjük, próbálja
              újra néhány perc múlva.
            </p>
            <p className="text-xs text-[#333C3E]/40">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/projektek"
                className="bg-[#333C3E] hover:bg-[#333C3E]/90 text-white font-medium px-5 py-2.5 rounded transition-colors"
              >
                Vissza a projektekhez
              </Link>
              <Link
                href="/"
                className="border border-[#333C3E]/20 hover:border-[#333C3E]/50 text-[#333C3E] font-medium px-5 py-2.5 rounded transition-colors"
              >
                Főoldal
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const images = Array.isArray(project.images) ? project.images : [];
  const cover = images.find((i) => i.is_cover) || images[0] || null;
  const others = images.filter((i) => i !== cover);

  const pct = Math.max(
    0,
    Math.min(100, Number(project.progress_percent) || 0),
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Header subtitle="Projekt" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          {project.tagozat && (
            <div className="text-xs uppercase tracking-wider text-[#333C3E]/60 mb-2">
              {project.tagozat}
              {project.szak ? ` · ${project.szak}` : ''}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-[#333C3E] font-serif mb-3">
            {project.nev}
          </h1>
          {project.rovid_leiras && (
            <p className="text-[#333C3E]/80 text-lg">{project.rovid_leiras}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cover?.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover.image}
                alt={cover.caption || project.nev}
                className="w-full max-h-[480px] object-cover rounded-lg border border-[#333C3E]/10"
              />
            )}

            <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 shadow-sm">
              <div className="prose prose-neutral max-w-none whitespace-pre-line text-[#333C3E]/85 leading-relaxed">
                {project.leiras}
              </div>
            </div>

            {others.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {others.map(
                  (img) =>
                    img.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id}
                        src={img.image}
                        alt={img.caption || project.nev}
                        className="w-full h-32 object-cover rounded border border-[#333C3E]/10"
                      />
                    ),
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white border border-[#333C3E]/10 rounded-lg p-6 shadow-sm sticky top-6">
              <div className="mb-4">
                <div className="text-2xl font-semibold text-[#333C3E] font-serif">
                  {formatHuf(project.current_amount)}
                </div>
                <div className="text-sm text-[#333C3E]/60">
                  cél: {formatHuf(project.goal_amount)}
                </div>
              </div>
              <div className="h-2 bg-[#333C3E]/10 rounded-full overflow-hidden mb-2 relative">
                <div
                  className="absolute inset-y-0 left-0 bg-[#333C3E] rounded-full transition-[width] duration-500"
                  style={{
                    width: `${pct}%`,
                    minWidth: pct > 0 ? '0.5rem' : 0,
                  }}
                />
              </div>
              <div className="text-xs text-[#333C3E]/60 mb-6">
                {pct}% teljesítve
              </div>

              <DonateForm projectSlug={project.slug} projectName={project.nev} />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
