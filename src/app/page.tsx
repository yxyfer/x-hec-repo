'use client';

import SiteNav from "@/components/SiteNav";
import Link from 'next/link';

const unicorns = [
  {
    name: 'Doctolib',
    file: 'https://upload.wikimedia.org/wikipedia/fr/7/7f/Logo-doctolib.svg',
    desc: "Europe's #1 e‑health platform.",
  },
  {
    name: 'Front',
    file: 'https://cdn.prod.website-files.com/632add85afcd1ac30aa74675/66173f6a62ff583329eba936_front-logo-.svg',
    desc: 'San‑Francisco inbox unicorn.',
  },
  {
    name: 'Ankorstore',
    file: 'https://cdn.prod.website-files.com/610167bdec52d465db882881/673f023530780027dc4ea510_Ankorstore_Black%20(1).png',
    desc: '€1 B wholesale marketplace.',
  },
];

/*──────── PAGE ────────*/
export default function XHECMasterPage() {
  return (
    <main className="font-sans text-blue-900 dark:text-blue-50">
      <SiteNav />

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-blue-900 py-20">
        <div className="container mx-auto px-8 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Founders et startups X-HEC
          </h1>
          
          {/* Navigation principale */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.hec.edu/en/Master-of-Science-Entrepreneurs-google-ads?gbraid=0AAAAADelnyugHKGbB7qGWf4Pj-WH42kG1" className="inline-block rounded-full bg-blue-900 px-8 py-3 text-white font-semibold shadow hover:bg-blue-800 transition" target="_blank">
              Site officiel du Master
            </a>
            <Link href="/startups" className="inline-block rounded-full bg-blue-700 px-8 py-3 text-white font-semibold shadow hover:bg-blue-600 transition">
              Découvrir les startups
            </Link>
            <Link href="/founders" className="inline-block rounded-full bg-blue-700 px-8 py-3 text-white font-semibold shadow hover:bg-blue-600 transition">
              Explorer les fondateurs
            </Link>
          </div>
        </div>
      </section>

      {/* UNICORN ALUMNI */}
      <section className="container mx-auto px-8 py-20 bg-blue-50/50 dark:bg-blue-950/20">
        <h2 className="text-2xl font-bold text-center mb-10">Licornes issues du programme</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {unicorns.map((u) => (
            <div key={u.name} className="rounded-2xl bg-white dark:bg-blue-950/40 p-8 text-center border border-blue-100 dark:border-blue-800 shadow-sm">
              <img src={u.file} alt={`${u.name} logo`} className="mx-auto h-14 object-contain mb-6" />
              <h3 className="font-semibold">{u.name}</h3>
              <p className="mt-1 text-xs text-blue-700 dark:text-blue-300 max-w-prose mx-auto">{u.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/startups" className="inline-block rounded-full border border-blue-900 px-8 py-3 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition">
            Voir plus de startups
          </Link>
        </div>
      </section>

      {/* DEMO DAY */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-2xl font-bold text-center mb-6">Regardez les moments forts du Demo Day</h2>
        <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-blue-100 dark:border-blue-800">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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

      {/* REGISTRE X-HEC */}
      <section className="container mx-auto px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Explorez notre communauté d'entrepreneurs</h2>
        <p className="max-w-2xl mx-auto mb-10 text-blue-800 dark:text-blue-200">
          Notre registre complet des fondateurs et startups issus du programme X-HEC vous permet de découvrir et de vous connecter avec l'écosystème entrepreneurial.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/founders" className="inline-block rounded-full border border-blue-900 px-8 py-3 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition">
            Annuaire des fondateurs
          </Link>
          <Link href="/startups" className="inline-block rounded-full border border-blue-900 px-8 py-3 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white transition">
            Catalogue des startups
          </Link>
        </div>
      </section>
    </main>
  );
}
