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

  const link = startup.websiteUrl || startup.linkedinUrl || "";

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
              link={link}
            />

            {/* Website Link */}
            <StartupLink link={link} />
            
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
