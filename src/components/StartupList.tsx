"use client";

// ── imports ───────────────────────────────────────────

import { useState, useMemo } from "react";
import startups from "@/data/startups.json";
import foundersData from "@/data/founders.json";
import type { Startup } from "@/types";
import { StartupCard } from "@/components/features";
import { transformLegacyStartups } from "@/utils/data-transform";
import FacetBlock from "./FacetBlock";
import SearchSortBar from "./SearchSortBar";
import NoResultsMessage from "./NoResultsMessage";
import { buildFacet, toggleValue } from "@/utils/utils";
import { useIsMobile } from "@/utils/utils";
import SearchBar from "@/components/SearchSortBar";

/**
 * Main component for displaying and filtering the startup directory
 */
export const StartupList = () => {
  const [query, setQuery] = useState("");
  const [years, setYears] = useState<number[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [programmes, setProgrammes] = useState<string[]>([]);

  // Create founder mapping for enriching startup data
  const founderMap = useMemo(
    () =>
      foundersData.reduce((acc, founder) => {
        const { prenom, nom, id_founders } = founder;
        acc[id_founders.toString()] = { prenom, nom };
        return acc;
      }, {} as Record<string, { prenom: string; nom: string }>),
    []
  );

  // Process and transform startup data
  const processedStartups = useMemo<Startup[]>(() => {
    const enrichedStartups = startups
      .filter((s): s is typeof s => s !== null && s !== undefined)
      .map((s) => {
        // Enrich with founder names
        const founderNames = Array.isArray(s.Founders)
          ? s.Founders.map((fid) =>
              founderMap[fid]
                ? `${founderMap[fid].prenom} ${founderMap[fid].nom}`
                : fid
            )
          : [];

        return {
          ...s,
          Founders: founderNames.join(", "),
          FounderIds: Array.isArray(s.Founders) ? s.Founders.join(",") : "",
          foundersList: founderNames.join(", "),
          Programme: Array.isArray(s.Programme) && s.Programme.length > 0
            ? s.Programme[0]
            : "Unknown",
          Statut: Array.isArray(s.Statut) && s.Statut.length > 0 
            ? s.Statut[0] 
            : "Unknown",
        };
      });

    // Transform to new interface format
    return transformLegacyStartups(enrichedStartups);
  }, [founderMap]);

  // Build facets for filtering
  const yearFacet = useMemo(
    () => buildFacet(processedStartups.map((s) => s.inceptionYear)),
    [processedStartups]
  );
  
  const sectorFacet = useMemo(
    () => buildFacet(processedStartups.map((s) => s.sector)),
    [processedStartups]
  );
  
  const programmeFacet = useMemo(
    () => buildFacet(processedStartups.map((s) => s.program)),
    [processedStartups]
  );

  const isMobile = useIsMobile();

  // Filter startups based on search and facet selections
  const filteredStartups = useMemo(() => {
    const queryLower = query.toLowerCase();
    
    return processedStartups.filter((startup) => {
      const matchesQuery = [startup.name, startup.sector, startup.status, startup.program]
        .join(" ")
        .toLowerCase()
        .includes(queryLower);
        
      const matchesYear = years.length === 0 || years.includes(startup.inceptionYear);
      const matchesSector = sectors.length === 0 || sectors.includes(startup.sector);
      const matchesProgramme = programmes.length === 0 || programmes.includes(startup.program);
      
      return matchesQuery && matchesYear && matchesSector && matchesProgramme;
    });
  }, [query, years, sectors, programmes, processedStartups]);

  return (
    <section className="w-full">
      <h1 className="text-center font-extrabold text-5xl mb-10 text-gray-900">
        X-HEC Startups
      </h1>

      <div className="mt-10 flex gap-10">
        {/* Sidebar */}
        {!isMobile ? (
          <aside className="sticky top-24 self-start w-80 shrink-0 space-y-10 rounded-3xl bg-white/90 backdrop-blur-sm shadow-lg p-6 border border-slate-200">
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
          <aside className="hidden md:block sticky top-24 self-start w-80 shrink-0 space-y-10 rounded-3xl bg-white/90 backdrop-blur-sm shadow-lg p-6 border border-slate-200">
            <h2 className="text-center font-extrabold text-2xl">
              Filters
            </h2>
          </aside>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar 
              query={query} 
              setQuery={setQuery}
              placeholder="Rechercher des entreprises..."
              resultCount={filteredStartups.length}
            />
          </div>
          
          <div 
            className="grid mt-10 gap-4" 
            role="list"
            aria-label="Startup directory"
          >
            {filteredStartups.map((startup) => (
              <div key={startup.id} role="listitem">
                <StartupCard startup={startup} />
              </div>
            ))}
            
            {filteredStartups.length === 0 && <NoResultsMessage />}
          </div>
          
          {/* Results count */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Showing {filteredStartups.length} of {processedStartups.length} startups
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupList;
