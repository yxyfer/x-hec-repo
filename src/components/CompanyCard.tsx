import React from 'react';
import { Startup } from '@/types/Startup';

interface CompanyCardProps {
  company: Startup;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const domain = company.lien_entreprise ? company.lien_entreprise.replace(/(^\w+:|^)\/\//, '').split('/')[0] : '';
  const faviconUrl = company.lien_entreprise ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : '';

  const link = company.lien_entreprise || company.Linkedin_entreprise || '';

  const WrapperLink = ({ children }: { children: React.ReactNode }) => (
    link ? (
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
        {children}
      </a>
    ) : (
      <>{children}</>
    )
  );

  return (
    <article className="w-full border border-[#E5E5E0] rounded-l px-8 py-6 mb-0">
      <div className="relative flex w-full items-center justify-start">
        {/* Logo */}
        <div className="flex w-20 shrink-0 grow-0 basis-20 items-center pr-4">
          <WrapperLink>
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt={`${company.Startup} icon`}
                className="rounded-full bg-gray-100 w-16 h-16"
              />
            ) : (
              <div className="rounded-full bg-gray-100 w-16 h-16" />
            )}
          </WrapperLink>
        </div>

        {/* Texte et tags */}
        <div className="flex flex-1 items-center justify-between">
          <div className="lg:max-w-[90%]">
            <div>
              <WrapperLink>
                <span className="font-bold text-xl align-middle">{company.Startup}</span>
              </WrapperLink>
              <span className="ml-3 text-base text-gray-500 font-normal align-middle">
                {company.inception_year}
              </span>
            </div>

            <div className="flex gap-2 mt-2">
              {company.Programme && (
                <span className="rounded-lg bg-[#EAEAE2] text-black text-sm font-medium px-3 py-1 tracking-wide">
                  {company.Programme}
                </span>
              )}
              {company.Sector && (
                <span className="rounded-lg bg-[#EAEAE2] text-black text-sm font-medium px-3 py-1 tracking-wide">
                  {company.Sector}
                </span>
              )}
              {company.Statut && (
                <span className="rounded-lg bg-[#EAEAE2] text-black text-sm font-medium px-3 py-1 tracking-wide">
                  {company.Statut}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
