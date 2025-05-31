"use client";

import Image from "next/image";
import Link from "next/link";
import { BuildingOfficeIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { SiteNav } from "@/components/layout/SiteNav";

/**
 * Data for unicorn companies featured on the homepage
 */
interface UnicornCompany {
  name: string;
  logoUrl: string;
  description: string;
}

const unicornCompanies: UnicornCompany[] = [
  {
    name: "Doctolib",
    logoUrl: "https://upload.wikimedia.org/wikipedia/fr/7/7f/Logo-doctolib.svg",
    description: "Europe's #1 e‑health platform.",
  },
  {
    name: "Front",
    logoUrl: "https://cdn.prod.website-files.com/632add85afcd1ac30aa74675/66173f6a62ff583329eba936_front-logo-.svg",
    description: "San‑Francisco inbox unicorn.",
  },
  {
    name: "Ankorstore",
    logoUrl: "https://cdn.prod.website-files.com/610167bdec52d465db882881/673f023530780027dc4ea510_Ankorstore_Black%20(1).png",
    description: "€1 B wholesale marketplace.",
  },
];

/**
 * Hero section component
 */
const HeroSection = () => (
  <section className="bg-slate-50 py-16" aria-labelledby="hero-title">
    <div className="container mx-auto px-6 text-center max-w-3xl">
      <h1 
        id="hero-title"
        className="text-3xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight mt-12"
      >
        Founders & Startups X-HEC
      </h1>

      <div className="flex flex-row sm:flex-row justify-center items-center gap-6 my-24">
        <Link 
          href="/startups" 
          className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <BuildingOfficeIcon className="h-5 w-5" aria-hidden="true" />
          <span>Startups</span>
        </Link>

        <Link 
          href="/founders" 
          className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          <UserGroupIcon className="h-5 w-5" aria-hidden="true" />
          <span>Founders</span>
        </Link>
      </div>
    </div>
  </section>
);

/**
 * Unicorn companies showcase section
 */
const UnicornSection = () => (
  <section 
    className="container mx-auto px-8 py-20 bg-slate-100"
    aria-labelledby="unicorns-title"
  >
    <h2 
      id="unicorns-title"
      className="text-2xl font-bold text-center mb-10"
    >
      Licornes issues du programme
    </h2>
    
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      {unicornCompanies.map((company) => (
        <article
          key={company.name}
          className="rounded-2xl bg-white p-8 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="mx-auto h-14 mb-6 relative">
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2">{company.name}</h3>
          <p className="text-sm text-slate-600 max-w-prose mx-auto">
            {company.description}
          </p>
        </article>
      ))}
    </div>
    
    <div className="text-center mt-12">
      <Link 
        href="/startups"
        className="inline-flex items-center px-6 py-3 border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 font-semibold"
      >
        Voir plus de startups
      </Link>
    </div>
  </section>
);

/**
 * Demo day video section
 */
const DemoDaySection = () => (
  <section 
    className="container mx-auto px-8 py-20 bg-slate-50"
    aria-labelledby="demo-day-title"
  >
    <h2 
      id="demo-day-title"
      className="text-2xl font-bold text-center mb-6"
    >
      Regardez les moments forts du Demo Day
    </h2>
    
    <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      <div className="relative w-full aspect-video">
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
);

/**
 * Main homepage component for X-HEC Entrepreneurs platform
 */
export const HomePage = () => {
  return (
    <main className="bg-slate-50 min-h-screen">
      <SiteNav />
      <HeroSection />
      <UnicornSection />
      <DemoDaySection />
    </main>
  );
};

export default HomePage;
