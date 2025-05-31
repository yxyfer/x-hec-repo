"use client";

import { SiteNav } from "@/components/layout";
import { useState } from "react";
import foundersData from "@/data/founders.json";
import type { Founder } from "@/types";
import { FounderCard } from "@/components/features";
import { transformLegacyFounders } from "@/utils/data-transform";

/**
 * Founders page component displaying all founders in the X-HEC community
 */
export const FoundersPage = () => {
  // Transform legacy data to new interface format
  const foundersList: Founder[] = transformLegacyFounders(foundersData);
  
  const [search, setSearch] = useState("");
  
  const filteredFounders = foundersList.filter((founder) =>
    `${founder.firstName} ${founder.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="font-sans text-blue-900 dark:text-blue-50">
      <SiteNav />
      <section className="container mx-auto px-8 py-12">
        <h1 className="text-center font-extrabold text-5xl mb-8">
          Founders X-HEC
        </h1>
        
        <div className="mt-6 mb-8 max-w-md mx-auto">
          <label htmlFor="founder-search" className="sr-only">
            Search founders
          </label>
          <input
            id="founder-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un founder..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search founders by name"
          />
        </div>
        
        <div 
          className="flex flex-wrap justify-center gap-6"
          role="list"
          aria-label="Founders directory"
        >
          {filteredFounders.map((founder) => (
            <div key={founder.id} role="listitem">
              <FounderCard founder={founder} />
            </div>
          ))}
          
          {filteredFounders.length === 0 && (
            <div 
              className="text-center col-span-full py-8"
              role="status"
              aria-live="polite"
            >
              <p className="text-gray-500">
                Aucun founder trouvé pour "{search}"
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default FoundersPage;
