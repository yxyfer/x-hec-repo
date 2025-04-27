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

// ── build simple facet [{value,count}, …] sorted A‑Z / newest year‑first ──
function buildFacet<T extends string | number>(items: T[]) {
  return Array.from(
    items.reduce<Map<T, number>>((m, v) => m.set(v, (m.get(v) ?? 0) + 1), new Map())
  ).sort((a, b) => {
    if (typeof a[0] === 'number' && typeof b[0] === 'number') return (b[0] as number) - (a[0] as number);
    return String(a[0]).localeCompare(String(b[0]));
  });
}

export default function CompanyDirectory() {
  // ── state ───────────────────────────────────────────
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // facet selections
  const [years, setYears] = useState<number[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [programmes, setProgrammes] = useState<string[]>([]);

  // ── facet option lists (static) ─────────────────────
  const yearFacet = useMemo(() => buildFacet(startups.map((s) => s.inception_year)), []);
  const sectorFacet = useMemo(() => buildFacet(startups.map((s) => s.Sector)), []);
  const programmeFacet = useMemo(() => buildFacet(startups.map((s) => s.Programme || 'Unknown')), []);

  // ── derived list after search+filter+sort ───────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    const visible = startups.filter((s) => {
      const matchesQuery = [s.Startup, s.Sector, s.Statut, s.Programme]
        .join(' ')
        .toLowerCase()
        .includes(q);

      const matchesYear = years.length === 0 || years.includes(s.inception_year);
      const matchesSector = sectors.length === 0 || sectors.includes(s.Sector);
      const matchesProgramme = programmes.length === 0 || programmes.includes(s.Programme || 'Unknown');

      return matchesQuery && matchesYear && matchesSector && matchesProgramme;
    });

    visible.sort((a, b) => {
      let diff = 0;
      if (sortKey === 'default') diff = a.Startup.localeCompare(b.Startup);
      else if (sortKey === 'inception_year') diff = a.inception_year - b.inception_year;
      else if (sortKey === 'Sector') diff = a.Sector.localeCompare(b.Sector);
      else diff = a.Statut.localeCompare(b.Statut);
      return sortOrder === 'asc' ? diff : -diff;
    });

    return visible;
  }, [query, sortKey, sortOrder, years, sectors, programmes]);

  // ── checkbox helpers ───────────────────────────────
  const toggle = <T,>(val: T, arr: T[], setter: (v: T[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };
  const reset = (setter: (v: any[]) => void) => setter([]);

  // ── UI ──────────────────────────────────────────────
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center tracking-tight mb-6">Portfolio Companies</h1>

      <div className="flex gap-8">
        {/* ── Sidebar (hidden < lg) ── */}
        <aside className="w-64 shrink-0 space-y-8 ">
          {/* Year facet */}
          <FacetBlock
            title="Inception year"
            allChecked={years.length === 0}
            onAllToggle={() => reset(setYears)}
            options={yearFacet}
            isSelected={(y) => years.includes(y as number)}
            onToggle={(y) => toggle(y as number, years, setYears)}
          />

          {/* Sector facet */}
          <FacetBlock
            title="Sector"
            allChecked={sectors.length === 0}
            onAllToggle={() => reset(setSectors)}
            options={sectorFacet}
            isSelected={(s) => sectors.includes(s as string)}
            onToggle={(s) => toggle(s as string, sectors, setSectors)}
          />

          {/* Programme facet */}
          <FacetBlock
            title="Programme"
            allChecked={programmes.length === 0}
            onAllToggle={() => reset(setProgrammes)}
            options={programmeFacet}
            isSelected={(p) => programmes.includes(p as string)}
            onToggle={(p) => toggle(p as string, programmes, setProgrammes)}
          />
        </aside>

        {/* ── Main ── */}
        <div className="flex-1">
          {/* top controls */}
          <div className="sticky top-4 z-10 flex flex-col gap-4 md:flex-row md:items-center bg-white/80 backdrop-blur border rounded-2xl shadow px-6 py-4">
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

          {/* grid */}
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
        </div>
      </div>
    </section>
  );
}

// ── FacetBlock component (keeps sidebar DRY) ─────────
interface FacetBlockProps {
  title: string;
  options: [string | number, number][];
  allChecked: boolean;
  onAllToggle: () => void;
  isSelected: (v: string | number) => boolean;
  onToggle: (v: string | number) => void;
}

function FacetBlock({ title, options, allChecked, onAllToggle, isSelected, onToggle }: FacetBlockProps) {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <label className="flex items-center gap-2 mb-1 cursor-pointer">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={onAllToggle}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span className="text-sm">All {title.toLowerCase()}</span>
      </label>
      <div className="max-h-52 overflow-y-auto pr-2 space-y-1">
        {options.map(([value, count]) => (
          <label key={String(value)} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected(value)}
              onChange={() => onToggle(value)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>{value}</span>
            <span className="ml-auto bg-gray-100 text-xs px-1.5 rounded">{count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
