import startups from "@/data/startups.json";
import { SiteNav } from "@/components/layout";
import { transformLegacyStartup } from "@/utils/data-transform";

import { Startup as StartupType } from "@/types/Startup";

import { notFound } from "next/navigation";
import StartupHeader from "@/components/StartupHeader";
import StartupLink from "@/components/StartupLink";
import StartupDescription from "@/components/StartupDescription";
import StartupFounders from "@/components/StartupFounders";

export async function generateStaticParams() {
  return startups.map((startup) => ({
    id: startup.id_startup.toString(),
  }));
}

export default async function StartupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rawStartup = startups.find(
    (s) => s.id_startup.toString() === id
  );

  if (!rawStartup) {
    notFound();
    return;
  }

  // Transform the raw data to match the Startup interface
  const startup: StartupType = transformLegacyStartup(rawStartup);

  const domain = startup.websiteUrl
    ? startup.websiteUrl.replace(/(^\w+:|^)\/\//, "").split("/")[0]
    : "";
  const faviconUrl = startup.websiteUrl
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  return (
    <>
      <SiteNav />
      <div className="min-h-[calc(100vh-88px)] bg-gray-50 pt-[88px]">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            {/* Header Section */}
            <StartupHeader
              name={startup.name}
              sector={startup.sector}
              faviconUrl={faviconUrl}
              link={startup.websiteUrl || startup.linkedinUrl || ""}
            />

            {/* Links Section */}
            <div className="mt-6 space-y-3">
              {/* Website Link */}
              {startup.websiteUrl && (
                <div>
                  <a
                    href={startup.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 underline text-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Website
                  </a>
                </div>
              )}

              {/* LinkedIn Link */}
              {startup.linkedinUrl && (
                <div>
                  <a
                    href={startup.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 underline text-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-344a53.82 53.82 0 1 1 53.81-53.82 53.82 53.82 0 0 1-53.8 53.82zM447.9 448h-92.68V302.4c0-34.72-.7-79.42-48.36-79.42-48.36 0-55.78 37.73-55.78 76.7V448h-92.8V148.9H255v40.8h1.3c12.9-24.4 44.4-50.1 91.3-50.1 97.6 0 115.6 64.2 115.6 147.5V448z" />
                    </svg>
                    View LinkedIn Page
                  </a>
                </div>
              )}
            </div>
            
            {/* Description Section */}
            <StartupDescription programme={startup.program} />

            {/* Founders Section */}
            <StartupFounders startup={startup} />
          </div>
        </div>
      </div>
    </>
  );
}
