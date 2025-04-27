import React from 'react';
import { Startup } from '@/types/Startup';


interface CompanyCardProps {
  company: Startup;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const domain = company.lien_entreprise ? company.lien_entreprise.replace(/(^\w+:|^)\/\//, '').split('/')[0] : '';
  const faviconUrl = company.lien_entreprise ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : '';

  return (
    <article
      key={company.id_startup}
      className="flex items-center bg-white rounded-2xl shadow-md p-6 max-w-2xl w-full"
    >
      {/* Logo à gauche */}
      <div className="flex-shrink-0 mr-6">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt={`${company.Startup} icon`}
            className="h-16 w-16 object-contain rounded-full bg-[#F5F5F5]"
          />
        ) : (
          <div className="h-16 w-16 bg-gray-200 rounded-full" />
        )}
      </div>
      {/* Contenu à droite */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-black">{company.Startup}</h2>
          <span className="text-sm text-gray-500">{company.inception_year}</span>
        </div>
        {/* Tags alignés horizontalement */}
        <div className="mt-3 flex flex-wrap gap-2">
          {company.Programme && (
            <span className="px-2 py-1 bg-[#F5F5F5] text-black text-xs font-medium rounded-md">
              {company.Programme}
            </span>
          )}
          {company.Sector && (
            <span className="px-2 py-1 bg-[#F5F5F5] text-black text-xs font-medium rounded-md">
              {company.Sector}
            </span>
          )}
          {company.Statut && (
            <span className="px-2 py-1 bg-[#F5F5F5] text-black text-xs font-medium rounded-md">
              {company.Statut}
            </span>
          )}
        </div>
        {/* Liens en bas */}
        <div className="mt-4 flex gap-4 text-sm">
          {company.lien_entreprise && (
            <a
              href={company.lien_entreprise}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Site web
            </a>
          )}
          {company.Linkedin_entreprise && (
            <a
              href={company.Linkedin_entreprise}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </article>
  );
}