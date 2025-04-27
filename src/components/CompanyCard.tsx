import React from 'react';
import { Startup } from '@/types/Startup';


interface CompanyCardProps {
  company: Startup;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <article
      key={company.id_startup}
      className="relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl group"
    >
      <span className="absolute inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      <div className="p-6 flex flex-col h-full">
        <header>
          <h2 className="text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {company.Startup}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Founded {company.inception_year}</p>
        </header>
        {company.Programme && (
          <span className="mt-3 inline-block self-start rounded-full bg-indigo-50 dark:bg-indigo-400/20 text-indigo-600 dark:text-indigo-300 text-[10px] font-semibold px-2 py-1 uppercase tracking-wide">
            {company.Programme}
          </span>
        )}
        <dl className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-300 flex-1">
          <div className="flex justify-between">
            <dt className="font-medium">Sector</dt>
            <dd>{company.Sector}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium">Status</dt>
            <dd>{company.Statut}</dd>
          </div>
        </dl>
        <footer className="pt-4 flex gap-4 text-sm">
          {company.lien_entreprise && (
            <a
              href={company.lien_entreprise}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Website
            </a>
          )}
          {company.Linkedin_entreprise && (
            <a
              href={company.Linkedin_entreprise}
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
  );
}