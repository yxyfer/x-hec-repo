import React, { memo } from "react";
import type { FounderCardProps } from "@/types";

/**
 * Card component for displaying founder information
 * Optimized for performance with React.memo
 */
export const FounderCard = memo<FounderCardProps>(({ founder, className = '' }) => {
  const { firstName, lastName, linkedinUrl, batch } = founder;
  
  // Generate initials safely
  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <article 
      className={`w-[300px] border border-gray-200 rounded-lg px-6 py-4 mb-6 hover:shadow-md transition-shadow ${className}`}
      aria-labelledby={`founder-${founder.id}`}
    >
      {/* Founder info with initials */}
      <div className="flex items-center mb-4">
        <div 
          className="h-12 w-12 flex items-center justify-center bg-blue-500 text-white rounded-lg mr-4 font-semibold"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <h3 
            id={`founder-${founder.id}`}
            className="font-bold text-xl text-gray-900"
          >
            {fullName}
          </h3>
          <span className="text-sm text-gray-500">{batch}</span>
        </div>
      </div>

      {/* LinkedIn link */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
          aria-label={`View ${fullName} LinkedIn profile`}
        >
          <svg
            className="w-4 h-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-344a53.82 53.82 0 1 1 53.81-53.82 53.82 53.82 0 0 1-53.8 53.82zM447.9 448h-92.68V302.4c0-34.72-.7-79.42-48.36-79.42-48.36 0-55.78 37.73-55.78 76.7V448h-92.8V148.9H255v40.8h1.3c12.9-24.4 44.4-50.1 91.3-50.1 97.6 0 115.6 64.2 115.6 147.5V448z" />
          </svg>
          <span>View LinkedIn profile</span>
        </a>
      )}
    </article>
  );
});

FounderCard.displayName = 'FounderCard';
