import React from "react";
/* eslint-disable @next/next/no-img-element */
import { Startup } from "@/types/Startup";

interface CompanyCardProps {
  company: Startup;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const domain = company.websiteUrl
    ? company.websiteUrl.replace(/(^\w+:|^)\/\//, "").split("/")[0]
    : "";
  const faviconUrl = company.websiteUrl
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  const link = company.websiteUrl || company.linkedinUrl || "";

  const WrapperLink = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        {children}
      </a>
    ) : (
      <>{children}</>
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
                alt={`${company.name} icon`}
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
                <span className="font-bold text-xl align-middle">
                  {company.name}
                </span>
              </WrapperLink>
              <span className="ml-3 text-base text-gray-500 font-normal align-middle">
                {company.inceptionYear}
              </span>
            </div>

            <div className="flex gap-2 mt-2">
              {company.program && company.program !== "Unknown" && (

                <span className="rounded-lg bg-[#EAEAE2] text-black text-sm font-medium px-3 py-1 tracking-wide">
                  {company.program}
                </span>
              )}
              {company.sector && company.sector !== "Unknown" && (
                <span className="rounded-lg bg-[#EAEAE2] text-black text-sm font-medium px-3 py-1 tracking-wide">
                  {company.sector}
                </span>
              )}
              {company.status && company.status !== "Unknown" && (
                <span className="rounded-lg bg-[#EAEAE2] text-black text-sm font-medium px-3 py-1 tracking-wide flex items-center">
                  {company.status}{" "}
                  {company.status === "En activité" ? (
                    <span className="inline-block w-4 h-4 bg-green-500 rounded-full ml-2"></span>
                  ) : (
                    <span className="inline-block w-4 h-4 bg-red-500 rounded-full ml-2"></span>
                  )}
                </span>
              )}
            </div>

            {company.linkedinUrl && (
              <a
                href={company.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-2 text-sm text-blue-500 hover:underline"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-344a53.82 53.82 0 1 1 53.81-53.82 53.82 53.82 0 0 1-53.8 53.82zM447.9 448h-92.68V302.4c0-34.72-.7-79.42-48.36-79.42-48.36 0-55.78 37.73-55.78 76.7V448h-92.8V148.9H255v40.8h1.3c12.9-24.4 44.4-50.1 91.3-50.1 97.6 0 115.6 64.2 115.6 147.5V448z" />
                </svg>
                <span>Voir le profil LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
