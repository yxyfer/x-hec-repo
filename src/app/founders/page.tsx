"use client";

import SiteNav from "@/components/SiteNav";
import { useState } from "react";
import foundersData from "@/data/founders.json";
import type { Founder as FounderType } from "@/types/Founder";
import FounderCard from "@/components/FounderCard";

export default function FoundersPage() {
<<<<<<< HEAD
  const foundersList: FounderType[] = foundersData.map((founder) => ({
    id_founders: founder.id_founders.toString(),
    prenom: founder.prenom,
    nom: founder.nom,
    linkedin: founder.linkedin,
    xhecbatch: founder.xhecbatch,
=======
  const founders: FounderType[] = foundersData.map((rec) => ({
    id: rec.id_founders.toString(),
    id_founders: rec.id_founders,
    prenom: rec.prenom,
    nom: rec.nom,
    linkedin: rec.linkedin,
    xhecbatch: rec.xhecbatch,
>>>>>>> 0c416c7 (added better visual on phones)
  }));
  const [search, setSearch] = useState("");
  const filteredFounders = foundersList.filter((f) =>
    `${f.prenom} ${f.nom}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="font-sans text-blue-900 dark:text-blue-50">
      <SiteNav />
      <section className="container mx-auto px-8 py-12">
        <h1 className="text-center font-extrabold text-5xl">Founders X-HEC</h1>
        <div className="mt-6 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un founder..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {filteredFounders.map((founder) => (
            <FounderCard key={founder.id_founders} founder={founder} />
          ))}
          {filteredFounders.length === 0 && (
            <p className="text-center col-span-full">Aucun founder trouvé.</p>
          )}
        </div>
      </section>
    </main>
  );
}
