import foundersData from "@/data/founders.json";
import startups from "@/data/startups.json";

import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return startups.map((startup) => ({
    id: startup.id_startup.toString(), // ou juste startup.id_startup selon ton type
  }));
}

export default async function StartupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const startup = startups.find((s) => s.id_startup.toString() === id);

  if (!startup) {
    notFound();
  }

  const founderMap = foundersData.reduce((acc, founder) => {
    acc[founder.id_founders.toString()] = `${founder.prenom} ${founder.nom}`;
    return acc;
  }, {} as Record<string, string>);

  const Founders = Array.isArray(startup.FounderIds)
    ? startup.FounderIds.map((fid) => founderMap[fid] ?? fid)
    : [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{startup.Startup}</h1>
      <p className="mt-4">Sector: {startup.Sector}</p>
      <p className="mt-2">Programme: {startup.Programme?.[0] || "Unknown"}</p>
      <p className="mt-2">Founders: {Founders.join(", ")}</p>
      <a
        href={startup.lien_entreprise || startup.Linkedin_entreprise}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-600"
      >
        Visit Website
      </a>
    </div>
  );
}
