"use client";
/* eslint-disable @next/next/no-img-element */

import SiteNav from "@/components/SiteNav";
import Link from "next/link";
import { BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const unicorns = [
  {
    name: "Doctolib",
    file: "https://upload.wikimedia.org/wikipedia/fr/7/7f/Logo-doctolib.svg",
    desc: "Europe's #1 e‑health platform.",
  },
  {
    name: "Front",
    file: "https://cdn.prod.website-files.com/632add85afcd1ac30aa74675/66173f6a62ff583329eba936_front-logo-.svg",
    desc: "San‑Francisco inbox unicorn.",
  },
  {
    name: "Ankorstore",
    file: "https://cdn.prod.website-files.com/610167bdec52d465db882881/673f023530780027dc4ea510_Ankorstore_Black%20(1).png",
    desc: "€1 B wholesale marketplace.",
  },
];

/*──────── PAGE ────────*/
export default function XHECMasterPage() {
  return (
    <main className="font-sans text-blue-900 dark:text-blue-50">
      <SiteNav />

      {/* HERO */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          {/* Hero title */}
          <h1 className="text-3xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight mt-12">
            Founders & Startups X-HEC
          </h1>

          {/* Button group */}
          <div className="flex flex-row sm:flex-row justify-center items-center gap-6 my-24">
            {/* Outline buttons */}
            <Link
              href="/startups"
              className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition"
            >
              <BuildingOfficeIcon className="h-5 w-5" />
              <span>Startups</span>
            </Link>

            <Link
              href="/founders"
              className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition"
            >
              <UserGroupIcon className="h-5 w-5" />
              <span>Founders</span>
            </Link>
          </div>
        </div>
      </section>

      {/* UNICORN ALUMNI */}
      <section className="container mx-auto px-8 py-20 bg-blue-50/50 dark:bg-blue-950/20">
        <h2 className="text-2xl font-bold text-center mb-10">
          Licornes issues du programme
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {unicorns.map((u) => (
            <div
              key={u.name}
              className="rounded-2xl bg-white dark:bg-blue-950/40 p-8 text-center border border-blue-100 dark:border-blue-800 shadow-sm"
            >
              <img
                src={u.file}
                alt={`${u.name} logo`}
                className="mx-auto h-14 object-contain mb-6"
              />
              <h3 className="font-semibold">{u.name}</h3>
              <p className="mt-1 text-xs text-blue-700 dark:text-blue-300 max-w-prose mx-auto">
                {u.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/startups"
            className="inline-block rounded-full border border-blue-900 px-8 py-3 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition"
          >
            Voir plus de startups
          </Link>
        </div>
      </section>

      {/* DEMO DAY */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          Regardez les moments forts du Demo Day
        </h2>
        <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-blue-100 dark:border-blue-800">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/EVOPS4gjQRY"
              title="X‑HEC Entrepreneurs Demo Day"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
