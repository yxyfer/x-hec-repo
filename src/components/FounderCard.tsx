import React from 'react';
import type { Founder } from '@/types/Founder';

interface FounderCardProps {
  founder: Founder;
}

export default function FounderCard({ founder }: FounderCardProps) {
  return (
    <article className="w-full border border-[#E5E5E0] rounded px-8 py-6 mb-6">
      <div className="flex flex-col">
        <span className="font-bold text-xl">{`${founder.prenom} ${founder.nom}`}</span>
        <span className="text-sm text-gray-500">{founder.xhecbatch}</span>
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-blue-500 hover:underline text-sm"
        >
          Voir le profil LinkedIn
        </a>
      </div>
    </article>
  );
} 