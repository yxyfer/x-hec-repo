"use client";
import { JsonDb } from "@/utils/jsonDb";
import { useEffect, useState } from "react";
import Link from "next/link";

type Startup = {
  Startup: string;
  inception_year: number;
  founder_1?: string;
  founder_2?: string;
  founder_3?: string;
  Programme?: string[];
  Sector?: string;
  Statut?: string[];
  lien_entreprise?: string;
  Linkedin_entreprise?: string;
};

export default function Home() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Défaut");

  useEffect(() => {
    const loadData = async () => {
      try {
        const db = new JsonDb();
        await db.loadData();
        setStartups(db.getAll());
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer les startups selon le terme de recherche
  const filteredStartups = startups.filter(startup => 
    startup.Startup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.Sector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.Programme?.some(prog => prog.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Trier les startups
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    if (sortBy === "Année de création") {
      return (b.inception_year || 0) - (a.inception_year || 0);
    } else if (sortBy === "Nom") {
      return (a.Startup || "").localeCompare(b.Startup || "");
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Startups XHEC</h1>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="w-full md:w-2/3 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une startup, un secteur..."
                className="w-full border-0 focus:ring-0 text-gray-700 py-3 px-4 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 flex items-center gap-2 justify-end">
            <span className="text-gray-700 whitespace-nowrap">Trier par</span>
            <div className="relative w-full md:w-40">
              <select
                className="appearance-none w-full border border-gray-300 rounded-md py-2 px-4 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Défaut</option>
                <option>Année de création</option>
                <option>Nom</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Affichage de {sortedStartups.length} sur {startups.length} entreprises
        </div>

        <div className="space-y-4">
          {sortedStartups.map((startup, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row p-6 items-start">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 mr-6 mb-4 md:mb-0 overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                    {startup.Startup?.charAt(0)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-baseline">
                      <h2 className="text-xl font-bold mr-2">{startup.Startup || "N/A"}</h2>
                      {startup.inception_year && (
                        <span className="text-gray-500 text-sm ml-0 md:ml-1">
                          Créée en {startup.inception_year} • Paris, France
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 flex gap-3">
                      {startup.lien_entreprise && (
                        <Link 
                          href={startup.lien_entreprise} 
                          target="_blank" 
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          Site web
                        </Link>
                      )}
                      
                      {startup.Linkedin_entreprise && (
                        <Link 
                          href={startup.Linkedin_entreprise} 
                          target="_blank" 
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn
                        </Link>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mt-2">
                      {startup.founder_1 && `Fondé par ${startup.founder_1}`}
                      {startup.founder_2 && `, ${startup.founder_2}`}
                      {startup.founder_3 && `, ${startup.founder_3}`}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {startup.Statut && startup.Statut.map((statut, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                          {statut}
                        </span>
                      ))}
                      
                      {startup.Sector && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                          {startup.Sector}
                        </span>
                      )}
                      
                      {startup.Programme && startup.Programme.map((program, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
