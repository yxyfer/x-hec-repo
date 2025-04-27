import React from 'react';
import type { Founder } from '@/types/Founder';

interface FounderCardProps {
  founder: Founder;
}

export default function FounderCard({ founder }: FounderCardProps) {
  return (
    <article className="w-[300px] border border-[#E5E5E0] rounded px-6 py-4 mb-6">
      {/* Affichage des initiales dans un carré */}
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 flex items-center justify-center bg-blue-500 text-white rounded-sm mr-4">
          {founder.prenom.charAt(0)}
          {founder.nom.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl">{`${founder.prenom} ${founder.nom}`}</span>
          <span className="text-sm text-gray-500">{founder.xhecbatch}</span>
        </div>
      </div>
      {/* Lien LinkedIn avec icône */}
      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center mt-2 text-sm text-blue-500 hover:underline"
      >
        <svg
          className="w-4 h-4 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
        >
          <path d="M100.28 448H7.4V148.9h92.88zm-46.44-344a53.82 53.82 0 1 1 53.81-53.82 53.82 53.82 0 0 1-53.8 53.82zM447.9 448h-92.68V302.4c0-34.72-.7-79.42-48.36-79.42-48.36 0-55.78 37.73-55.78 76.7V448h-92.8V148.9H255v40.8h1.3c12.9-24.4 44.4-50.1 91.3-50.1 97.6 0 115.6 64.2 115.6 147.5V448z"/>
        </svg>
        <span>Voir le profil LinkedIn</span>
      </a>
    </article>
  );
} 