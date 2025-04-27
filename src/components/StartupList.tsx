'use client';

import startups from '@/data/startups.json';

export type Startup = {
  id_startup: number;
  Startup: string;
  inception_year: number;
  Linkedin_entreprise: string;
  lien_entreprise: string;
  Programme: string;
  Founders: string; // seems like a comma-separated string of IDs
  Sector: string;
  '# FTEs (incl. founders)': string; // it's a string in your data, could be number sometimes?
  Statut: string;
  foundersList: string; // empty now, but assuming it'll be a string or maybe an array later
};


export default function StartupList() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Startups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <div
            key={startup.id_startup}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{startup.Startup}</h2>
            <p className="text-gray-600 mb-1">Sector: {startup.Sector}</p>
            <p className="text-gray-600 mb-1">Founded: {startup.inception_year}</p>
            <p className="text-gray-600 mb-1">Status: {startup.Statut}</p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={startup.lien_entreprise}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Website
              </a>
              <a
                href={startup.Linkedin_entreprise}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
