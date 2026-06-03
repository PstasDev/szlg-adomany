'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listProjects, formatHuf } from '../lib/adomany';
import type { ProjectListItem } from '../lib/adomany-types';

export default function ProjectsList() {
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listProjects()
      .then((p) => {
        if (!cancelled) {
          setProjects(p);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Ismeretlen hiba');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 text-center text-[#333C3E]/70">
        Projektek betöltése…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fff3cd] border-l-4 border-[#ffc107] p-6 rounded-r-lg mb-8 text-[#856404]">
        Nem sikerült betölteni a projekteket. ({error})
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 text-center text-[#333C3E]/70">
        Jelenleg nincsenek aktív projektek. Nézzen vissza később!
      </div>
    );
  }

  return (
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
              <p className="text-[#333C3E]/70 text-sm mb-4">{p.rovid_leiras}</p>
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
  );
}
