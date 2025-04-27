'use client';

// ── imports ───────────────────────────────────────────

import { useState, useMemo } from 'react';
import startups from '@/data/startups.json';

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

/*──────── helpers ────────*/
function buildFacet<T extends string | number>(items: T[]): [T, number][] {
  const map = new Map<T, number>();
  for (const item of items) map.set(item, (map.get(item) ?? 0) + 1);
  return Array.from(map).sort((a, b) =>
    typeof a[0] === 'number' && typeof b[0] === 'number'
      ? (b[0] as number) - (a[0] as number)
      : String(a[0]).localeCompare(String(b[0]))
  );
}

function toggleValue<T>(val: T, arr: T[], setter: (v: T[]) => void) {
  setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
}

/*──────── component ────────*/
export default function CompanyDirectory() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [years, setYears] = useState<number[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [programmes, setProgrammes] = useState<string[]>([]);

  const yearFacet = useMemo(() => buildFacet(startups.map((s) => s.inception_year)), []);
  const sectorFacet = useMemo(() => buildFacet(startups.map((s) => s.Sector)), []);
  const programmeFacet = useMemo(() => buildFacet(startups.map((s) => s.Programme || 'Unknown')), []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const visible = startups.filter((s) => {
      const matchesQuery = [s.Startup, s.Sector, s.Statut, s.Programme]
        .join(' ')
        .toLowerCase()
        .includes(q);
      const matchesYear = years.length === 0 || years.includes(s.inception_year);
      const matchesSector = sectors.length === 0 || sectors.includes(s.Sector);
      const prog = s.Programme || 'Unknown';
      const matchesProgramme = programmes.length === 0 || programmes.includes(prog);
      return matchesQuery && matchesYear && matchesSector && matchesProgramme;
    });

    visible.sort((a, b) => {
      const dir = sortOrder === 'asc' ? 1 : -1;
      switch (sortKey) {
        case 'inception_year':
          return (a.inception_year - b.inception_year) * dir;
        case 'Sector':
          return a.Sector.localeCompare(b.Sector) * dir;
        case 'Statut':
          return a.Statut.localeCompare(b.Statut) * dir;
        default:
          return a.Startup.localeCompare(b.Startup) * dir;
      }
    });
    return visible;
  }, [query, sortKey, sortOrder, years, sectors, programmes]);

  return (
    <section className="container mx-auto px-8 py-10">
      <h1 className="text-center font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
        Portfolio Companies
      </h1>

      <div className="mt-10 flex gap-10">
        {/* Sidebar */}
        <aside className="sticky top-24 self-start w-80 shrink-0 space-y-10 rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg p-6 border border-white/40 dark:border-white/20">
          <FacetBlock
            title="Inception year"
            options={yearFacet}
            allChecked={years.length === 0}
            onAllToggle={() => setYears([])}
            isSelected={(v) => years.includes(v as number)}
            onToggle={(v) => toggleValue(v as number, years, setYears)}
          />
          <FacetBlock
            title="Sector"
            options={sectorFacet}
            allChecked={sectors.length === 0}
            onAllToggle={() => setSectors([])}
            isSelected={(v) => sectors.includes(v as string)}
            onToggle={(v) => toggleValue(v as string, sectors, setSectors)}
          />
          <FacetBlock
            title="Programme"
            options={programmeFacet}
            allChecked={programmes.length === 0}
            onAllToggle={() => setProgrammes([])}
            isSelected={(v) => programmes.includes(v as string)}
            onToggle={(v) => toggleValue(v as string, programmes, setProgrammes)}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Search / sort bar */}
          <div className="sticky top-4 z-10 flex flex-col gap-4 md:flex-row md:items-center rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg border border-white/40 dark:border-white/20 px-6 py-4">
            <input
              type="text"
              placeholder="Search companies…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full md:max-w-sm px-4 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
            />
            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="w-full md:w-48 px-3 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-gray-300 dark:border-white/20 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="default">Default (A‑Z)</option>
                <option value="inception_year">Year</option>
                <option value="Sector">Sector</option>
                <option value="Statut">Status</option>
              </select>
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                title="Toggle sort order"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-white/20 px-3 py-2 text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition"
              >
                {sortOrder === 'asc' ? '▲' : '▼'}
              </button>
            </div>
          </div>

          {/* Single‑column list */}
          <div className="mt-10 grid gap-8 grid-cols-1">
            {filtered.map((s) => (
              <article
                key={s.id_startup}
                className="relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl group"
              >
                <span className="absolute inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div className="p-6 flex flex-col h-full">
                  <header>
                    <h2 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {s.Startup}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Founded {s.inception_year}</p>
                  </header>
                  {s.Programme && (
                    <span className="mt-3 inline-block self-start rounded-full bg-indigo-50 dark:bg-indigo-400/20 text-indigo-600 dark:text-indigo-300 text-[10px] font-semibold px-2 py-1 uppercase tracking-wide">
                      {s.Programme}
                    </span>
                  )}
                  <dl className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-300 flex-1">
                    <div className="flex justify-between">
                      <dt className="font-medium">Sector</dt>
                      <dd>{s.Sector}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Status</dt>
                      <dd>{s.Statut}</dd>
                    </div>
                  </dl>
                  <footer className="pt-4 flex gap-4 text-sm">
                    {s.lien_entreprise && (
                      <a
                        href={s.lien_entreprise}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Website
                      </a>
                    )}
                    {s.Linkedin_entreprise && (
                      <a
                        href={s.Linkedin_entreprise}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                  </footer>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="mt-16 text-center text-gray-500 dark:text-gray-400">
                No companies match your search.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/*──────── FacetBlock component ────────*/
interface FacetProps {
  title: string;
  options: [string | number, number][];
  allChecked: boolean;
  onAllToggle: () => void;
  isSelected: (v: string | number) => boolean;
  onToggle: (v: string | number) => void;
}

function FacetBlock({ title, options, allChecked, onAllToggle, isSelected, onToggle }: FacetProps) {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <label className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={onAllToggle}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span>All</span>
      </label>
      <div className="max-h-48 overflow-y-auto pr-1.5 space-y-1">
        {options.map(([val, count]) => (
          <label
            key={String(val)}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={isSelected(val)}
              onChange={() => onToggle(val)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>{val}</span>
            <span className="ml-auto bg-gray-100 dark:bg-white/10 text-xs px-1.5 rounded">
              {count}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export { FacetBlock };
