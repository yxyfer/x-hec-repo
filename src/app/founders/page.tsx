"use client";

import { SiteNav } from "@/components/layout";
import { useState } from "react";
import foundersData from "@/data/founders.json";
import type { Founder } from "@/types";
import { FounderCard } from "@/components/features";
import { transformLegacyFounders } from "@/utils/data-transform";
import SearchBar from "@/components/SearchSortBar";

/**
 * Founders page component displaying all founders in the X-HEC community
 */
export default function FoundersPage() {
  // Transform legacy data to new interface format
  const foundersList: Founder[] = transformLegacyFounders(foundersData);
  
  const [search, setSearch] = useState("");
  
  const filteredFounders = foundersList.filter((founder) =>
    `${founder.firstName} ${founder.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-slate-50 min-h-screen">
      <SiteNav />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-center font-bold text-4xl text-gray-900 mb-8">
          Founders X-HEC
        </h1>
        
        {/* Unified Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <SearchBar
            query={search}
            setQuery={setSearch}
            placeholder="Rechercher un founder..."
            resultCount={filteredFounders.length}
          />
        </div>
        
        <div 
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
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
              className="col-span-full text-center py-12"
              role="status"
              aria-live="polite"
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <p className="text-slate-500 text-lg">
                  Aucun founder trouvé pour &quot;{search}&quot;
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
