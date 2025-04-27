'use client';

// ── imports ───────────────────────────────────────────

import { useState, useMemo } from 'react';
import startups from '@/data/startups.json';

// ── types ─────────────────────────────────────────────
export type Startup = {
  id_startup: number;
  Startup: string;
  inception_year: number;
  Linkedin_entreprise: string;
  lien_entreprise: string;
  Programme: string;
  Founders: string;
  Sector: string;
  '# FTEs (incl. founders)': string;
  Statut: string;
  foundersList: string;
};

type SortKey = 'default' | 'inception_year' | 'Sector' | 'Statut';

export default function CompanyDirectory() {
  // ── state ───────────────────────────────────────────
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ── derived list ───────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    const visible = startups.filter((s) =>
      [s.Startup, s.Sector, s.Statut, s.Programme]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );

    visible.sort((a, b) => {
      let diff = 0;
      if (sortKey === 'default') {
        diff = a.Startup.localeCompare(b.Startup);
      } else if (sortKey === 'inception_year') {
        diff = a.inception_year - b.inception_year;
      } else if (sortKey === 'Sector') {
        diff = a.Sector.localeCompare(b.Sector);
      } else {
        diff = a.Statut.localeCompare(b.Statut);
      }
      return sortOrder === 'asc' ? diff : -diff;
    });

    return visible;
  }, [query, sortKey, sortOrder]);

  // ── UI ──────────────────────────────────────────────
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center tracking-tight">
        Portfolio Companies
      </h1>

      {/* Controls */}
      <div className="sticky top-4 z-10 mt-8 flex flex-col gap-4 md:flex-row md:items-center bg-white/80 backdrop-blur border rounded-2xl shadow px-6 py-4">
        <input
          type="text"
          placeholder="Search companies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:max-w-sm px-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="w-full md:w-48 px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Default (A‑Z)</option>
            <option value="inception_year">Year</option>
            <option value="Sector">Sector</option>
            <option value="Statut">Status</option>
          </select>

          <button
            type="button"
            onClick={() => setSortOrder((p) => (p === 'asc' ? 'desc' : 'asc'))}
            title="Toggle sort order"
            className="aspect-square px-3 py-2 border rounded-lg text-lg hover:bg-gray-50 transition"
          >
            {sortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <article
            key={s.id_startup}
            className="group bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-200 p-6 flex flex-col"
          >
            <header>
              <h2 className="text-xl font-semibold group-hover:text-indigo-600 transition-colors">
                {s.Startup}
              </h2>
              <p className="text-sm text-gray-500">Founded {s.inception_year}</p>
            </header>

            {s.Programme && (
              <p className="mt-2 text-xs text-indigo-700 font-medium uppercase tracking-wide">
                {s.Programme}
              </p>
            )}

            <dl className="mt-4 space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <dt className="font-medium">Sector</dt>
                <dd>{s.Sector}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Status</dt>
                <dd>{s.Statut}</dd>
              </div>
            </dl>

            <footer className="mt-auto pt-4 flex gap-4 text-sm">
              {s.lien_entreprise && (
                <a
                  href={s.lien_entreprise}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Website
                </a>
              )}
              {s.Linkedin_entreprise && (
                <a
                  href={s.Linkedin_entreprise}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  LinkedIn
                </a>
              )}
            </footer>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-gray-500">No companies match your search.</p>
      )}
    </section>
  );
}
