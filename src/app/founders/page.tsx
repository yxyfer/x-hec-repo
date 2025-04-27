'use client';

import SiteNav from '@/components/SiteNav';
import foundersData from '@/data/founders.json';
import type { Founder as FounderType } from '@/types/Founder';
import FounderCard from '@/components/FounderCard';

export default function FoundersPage() {
  const founders: FounderType[] = foundersData.records.map((rec) => ({
    id: rec.id,
    id_founders: rec.fields.id_founders,
    prenom: rec.fields.prenom,
    nom: rec.fields.nom,
    linkedin: rec.fields.linkedin,
    xhecbatch: rec.fields.xhecbatch,
  }));

  return (
    <main className='font-sans text-blue-900 dark:text-blue-50'>
      <SiteNav />
      <section className='container mx-auto px-8 py-12'>
        <h1 className='text-center font-extrabold text-5xl'>Fondateurs</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {founders.map((founder) => (
            <FounderCard key={founder.id} founder={founder} />
          ))}
        </div>
      </section>
    </main>
  );
} 