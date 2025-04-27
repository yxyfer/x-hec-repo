'use client';

// ── imports ───────────────────────────────────────────

import { useState, useMemo } from 'react';
import startups from '@/data/startups.json';
import FacetBlock from './FacetBlock';
import SearchSortBar from './SearchSortBar';
import CompanyCard from './CompanyCard';
import NoResultsMessage from './NoResultsMessage';
import { buildFacet, toggleValue } from '@/utils/utils';
import { useIsMobile } from '@/utils/utils';

type SortKey = 'default' | 'inception_year' | 'Sector' | 'Statut';

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

  const isMobile = useIsMobile();
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const visible = startups
      .map((s) => ({
        ...s,
        Founders: String(s.Founders), // Ensure Founders is always a string
      }))
      .filter((s) => {
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
    <section className=" px-8 py-10">
      <h1 className="text-center font-extrabold text-5xl">
        X-HEC Startups
      </h1>

      <div className="mt-10 flex gap-10">
        {/* Sidebar */}
        {!isMobile ? (
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
        ) : (
          <aside className="hidden md:block sticky top-24 self-start w-80 shrink-0 space-y-10 rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg p-6 border border-white/40 dark:border-white/20">
            <h1 className="text-center font-extrabold text-5xl">
              X-HEC Startups
            </h1>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1">
          <SearchSortBar
            query={query}
            setQuery={setQuery}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            toggleSortOrder={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          />
          <div className="grid mt-10 ">
            {filtered.map((company) => (
              <CompanyCard key={company.id_startup} company={company} />
            ))}
            {filtered.length === 0 && <NoResultsMessage />}
          </div>
        </div>
      </div>
    </section>
  );
}
