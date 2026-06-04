'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatHuf } from '../lib/adomany';
import type { ProjectListItem } from '../lib/adomany-types';

type SortKey = 'default' | 'progress-desc' | 'progress-asc' | 'name-asc';

interface Props {
  projects: ProjectListItem[];
}

export default function ProjectsBrowser({ projects }: Props) {
  const [query, setQuery] = useState('');
  const [tagozat, setTagozat] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('default');

  const tagozatOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      if (p.tagozat) set.add(p.tagozat);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'hu'));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = projects.filter((p) => {
      if (tagozat !== 'all' && p.tagozat !== tagozat) return false;
      if (!q) return true;
      return (
        p.nev.toLowerCase().includes(q) ||
        (p.rovid_leiras ?? '').toLowerCase().includes(q) ||
        (p.tagozat ?? '').toLowerCase().includes(q) ||
        (p.szak ?? '').toLowerCase().includes(q)
      );
    });

    if (sort === 'progress-desc') {
      result = [...result].sort((a, b) => b.progress_percent - a.progress_percent);
    } else if (sort === 'progress-asc') {
      result = [...result].sort((a, b) => a.progress_percent - b.progress_percent);
    } else if (sort === 'name-asc') {
      result = [...result].sort((a, b) => a.nev.localeCompare(b.nev, 'hu'));
    }

    return result;
  }, [projects, query, tagozat, sort]);

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="bg-white border border-[#333C3E]/10 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 items-stretch">
          <label className="relative block">
            <span className="sr-only">Keresés</span>
            <span
              aria-hidden
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333C3E]/40"
            >
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Keresés név, leírás vagy tagozat alapján…"
              className="w-full pl-9 pr-3 py-2 border border-[#333C3E]/15 rounded-md bg-white text-[#333C3E] placeholder:text-[#333C3E]/40 focus:outline-none focus:ring-2 focus:ring-[#333C3E]/20 focus:border-[#333C3E]/40"
            />
          </label>

          <label className="block">
            <span className="sr-only">Tagozat szűrő</span>
            <select
              value={tagozat}
              onChange={(e) => setTagozat(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-[#333C3E]/15 rounded-md bg-white text-[#333C3E] focus:outline-none focus:ring-2 focus:ring-[#333C3E]/20 focus:border-[#333C3E]/40"
            >
              <option value="all">Minden tagozat</option>
              {tagozatOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Rendezés</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="w-full md:w-auto px-3 py-2 border border-[#333C3E]/15 rounded-md bg-white text-[#333C3E] focus:outline-none focus:ring-2 focus:ring-[#333C3E]/20 focus:border-[#333C3E]/40"
            >
              <option value="default">Alapértelmezett sorrend</option>
              <option value="progress-desc">Haladás (csökkenő)</option>
              <option value="progress-asc">Haladás (növekvő)</option>
              <option value="name-asc">Név (A–Z)</option>
            </select>
          </label>
        </div>

        <div className="mt-3 text-xs text-[#333C3E]/60">
          {filtered.length} / {projects.length} projekt megjelenítve
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-[#333C3E]/10 rounded-lg p-8 text-center text-[#333C3E]/70">
          Nincs a szűrőknek megfelelő projekt.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((p) => {
            const pct = Math.max(
              0,
              Math.min(100, Number(p.progress_percent) || 0),
            );
            return (
            <Link
              key={p.id}
              href={`/projektek/${p.slug}`}
              aria-label={`${p.nev} projekt megnyitása`}
              className="group flex flex-col bg-white border border-[#333C3E]/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-[#333C3E]/30 hover:-translate-y-0.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#333C3E]/30"
            >
              {p.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cover_image}
                  alt={p.nev}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
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
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-sm text-[#333C3E]/80">
                    <span>{formatHuf(p.current_amount)}</span>
                    <span className="text-[#333C3E]/60">
                      Cél: {formatHuf(p.goal_amount)}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    className="relative h-2 w-full bg-[#333C3E]/10 rounded-full overflow-hidden"
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[#333C3E] rounded-full transition-[width] duration-500"
                      style={{ width: `${pct}%`, minWidth: pct > 0 ? '0.5rem' : 0 }}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#333C3E]/60">
                      {pct}% teljesítve
                    </span>
                    <span className="text-sm font-medium text-[#333C3E] group-hover:translate-x-0.5 transition-transform">
                      Részletek &amp; támogatás →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
