'use client';

// ── imports ───────────────────────────────────────────

import { useState, useMemo } from 'react';
import startups from '@/data/startups.json';
import foundersData from '@/data/founders.json';
import type { Startup as StartupType } from '@/types/Startup';
import FacetBlock from './FacetBlock';
import SearchSortBar from './SearchSortBar';
import CompanyCard from './CompanyCard';
import NoResultsMessage from './NoResultsMessage';
import { buildFacet, toggleValue } from '@/utils/utils';
import { useIsMobile } from '@/utils/utils';

/*──────── component ────────*/
export default function CompanyDirectory() {
  const [query, setQuery] = useState('');

  const [years, setYears] = useState<number[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [programmes, setProgrammes] = useState<string[]>([]);

  // Créer un mapping de l'ID Airtable des fondateurs vers leurs données
  const founderMap = useMemo(
    () =>
      foundersData.records.reduce((acc, rec) => {
        const { prenom, nom } = rec.fields;
        acc[rec.id] = { prenom, nom };
        return acc;
      }, {} as Record<string, { prenom: string; nom: string }>),
    []
  );

  // Convertir les données brutes en objets typés Startup
  const processedStartups = useMemo<StartupType[]>(
    () =>
      startups.map((s) => ({
        id_startup: s.id_startup,
        Startup: s.Startup,
        inception_year: s.inception_year,
        Linkedin_entreprise: s.Linkedin_entreprise ?? '',
        lien_entreprise: s.lien_entreprise ?? '',
        Programme: s.Programme && s.Programme.length > 0 ? s.Programme[0] : 'Unknown',
        Founders: (s.Founders ?? [])
          .map((fid) => (founderMap[fid] ? `${founderMap[fid].prenom} ${founderMap[fid].nom}` : fid))
          .join(', '),
        Sector: s.Sector ?? 'Unknown',
        '# FTEs (incl. founders)': s['# FTEs (incl. founders)'] ?? '',
        Statut: s.Statut && s.Statut.length > 0 ? s.Statut[0] : '',
        foundersList: (s.Founders ?? [])
          .map((fid) => (founderMap[fid] ? `${founderMap[fid].prenom} ${founderMap[fid].nom}` : fid))
          .join(', '),
      })),
    [founderMap]
  );

  const yearFacet = useMemo(() => buildFacet(processedStartups.map((s) => s.inception_year)), [processedStartups]);
  const sectorFacet = useMemo(() => buildFacet(processedStartups.map((s) => s.Sector)), [processedStartups]);
  const programmeFacet = useMemo(() => buildFacet(processedStartups.map((s) => s.Programme)), [processedStartups]);

  const isMobile = useIsMobile();
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return processedStartups.filter((s) => {
      const matchesQuery = [s.Startup, s.Sector, s.Statut, s.Programme]
        .join(' ')
        .toLowerCase()
        .includes(q);
      const matchesYear = years.length === 0 || years.includes(s.inception_year);
      const matchesSector = sectors.length === 0 || sectors.includes(s.Sector);
      const matchesProgramme = programmes.length === 0 || programmes.includes(s.Programme);
      return matchesQuery && matchesYear && matchesSector && matchesProgramme;
    });
  }, [query, years, sectors, programmes, processedStartups]);

  return (
    <section className="w-full px-8 py-10">
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
