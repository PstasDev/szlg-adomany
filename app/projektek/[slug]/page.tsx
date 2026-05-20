import { notFound } from 'next/navigation';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getProject, formatHuf } from '../../lib/adomany';
import DonateForm from './DonateForm';

export const revalidate = 60;

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
    if (e && typeof e === 'object' && 'status' in e && (e as { status: number }).status === 404) {
      notFound();
    }
    throw e;
  }

  const cover =
    project.images.find((i) => i.is_cover) || project.images[0] || null;
  const others = project.images.filter((i) => i !== cover);

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
              <div className="h-2 bg-[#333C3E]/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#333C3E] transition-all"
                  style={{ width: `${project.progress_percent}%` }}
                />
              </div>
              <div className="text-xs text-[#333C3E]/60 mb-6">
                {project.progress_percent}% teljesítve
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
