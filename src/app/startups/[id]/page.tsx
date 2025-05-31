import foundersData from "@/data/founders.json";
import startups from "@/data/startups.json";

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

  const startup: StartupType | undefined = startups.find(
    (s) => s.id_startup.toString() === id
  );

  if (!startup) {
    notFound();
    return;
  }

  const domain = startup.lien_entreprise
    ? startup.lien_entreprise.replace(/(^\w+:|^)\/\//, "").split("/")[0]
    : "";
  const faviconUrl = startup.lien_entreprise
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : "";

  const link = startup.lien_entreprise || startup.Linkedin_entreprise || "";

  return (
    // <div className="max-w-6xl mx-auto p-8">
    <div className="mx-auto max-w-3xl lg:mx-0">
      {/* Header Section */}
      <StartupHeader
        name={startup.Startup}
        sector={startup.Sector}
        faviconUrl={faviconUrl}
        link={link}
      />

      {/* Website Link */}
      <StartupLink link={link} />

      {/* Description Section */}
      <StartupDescription programme={startup.Programme} />

      {/* Founders Section */}
      <StartupFounders startup={startup} />
    </div>
  );
}
