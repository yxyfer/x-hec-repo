'use client';

import SiteNav from "@/components/SiteNav";

import Link from 'next/link';


/*──────── DATA ────────*/
const kpis = [
  { label: 'Alumni who launch a venture', value: '75%' },
  { label: 'Job ≤ 3 months', value: '96%' },
  { label: 'Avg. starting salary', value: '€ 62 000' },
  { label: 'Nationalities', value: '29' },
  { label: 'Companies created', value: '500+' },
];

const unicorns = [
  {
    name: 'Doctolib',
    file: 'https://upload.wikimedia.org/wikipedia/fr/7/7f/Logo-doctolib.svg',
    desc: "Europe’s #1 e‑health platform.",
  },
  {
    name: 'Front',
    file: 'https://cdn.prod.website-files.com/632add85afcd1ac30aa74675/66173f6a62ff583329eba936_front-logo-.svg',
    desc: 'San‑Francisco inbox unicorn.',
  },
  {
    name: 'Ankorstore',
    file: 'https://cdn.prod.website-files.com/610167bdec52d465db882881/673f023530780027dc4ea510_Ankorstore_Black%20(1).png',
    desc: '€1 B wholesale marketplace.',
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
            Design, launch &amp; fund your startup in 12 months
          </h1>
          <p className="mt-6 text-lg text-blue-800 dark:text-blue-200">
            A joint MSc from École Polytechnique &amp; HEC Paris that turns students into founders.
          </p>
          <a href="https://www.hec.edu/en/Master-of-Science-Entrepreneurs-google-ads?gbraid=0AAAAADelnyugHKGbB7qGWf4Pj-WH42kG1" className="mt-10 inline-block rounded-full bg-blue-900 px-8 py-3 text-white font-semibold shadow hover:bg-blue-800 transition" target="_blank">
            Download brochure
          </a>
        </div>
      </section>

      {/* KPI TILES */}
      <section className="container mx-auto px-8 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl bg-white dark:bg-blue-950/50 p-6 text-center border border-blue-100 dark:border-blue-800 shadow-sm">
              <p className="text-2xl font-extrabold text-blue-900 dark:text-white">{k.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">{k.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container mx-auto px-8 py-20 max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-12">From idea to launch</h2>
        <ol className="relative border-l border-blue-300 dark:border-blue-700 pl-6">
          {[
            { title: 'Learn', desc: 'Bootcamps, founder masterclasses & tech sprints.' },
            { title: 'Test', desc: '8‑week sprint to validate or pivot your concept.' },
            { title: 'Fasten', desc: 'Immersion in Silicon Valley or Singapore; refine go‑to‑market.' },
            { title: 'Become', desc: 'Demo Day, fundraising or C‑level role in a high‑growth startup.' },
          ].map((s, i) => (
            <li key={s.title} className="mb-12 relative pl-8">
              <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-white text-sm font-semibold">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold leading-tight">{s.title}</h3>
              <p className="mt-1 text-sm text-blue-800 dark:text-blue-200 max-w-prose">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* UNICORN ALUMNI */}
      <section className="container mx-auto px-8 py-20 bg-blue-50/50 dark:bg-blue-950/20">
        <h2 className="text-2xl font-bold text-center mb-10">Unicorn alumni</h2>
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
            See more startups
          </Link>
        </div>
      </section>

      {/* DEMO DAY */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-2xl font-bold text-center mb-6">Watch Demo Day highlights</h2>
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

      {/* CTA */}
      <section id="apply" className="py-20 bg-blue-900 text-center text-white">
        <h2 className="text-3xl font-extrabold">Ready to build the next unicorn?</h2>
        <p className="mt-2">Applications for the 2025 cohort close on 30 June.</p>
        <a href="https://www.hec.edu/en/Master-of-Science-Entrepreneurs-google-ads?gbraid=0AAAAADelnyugHKGbB7qGWf4Pj-WH42kG1" className="mt-6 inline-block bg-white text-blue-900 font-semibold px-8 py-3 rounded-full shadow hover:bg-blue-50 transition" target="_blank">
          Apply now
        </a>
      </section>
    </main>
  );
}
