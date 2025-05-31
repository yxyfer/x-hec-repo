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

  // Generate consistent color based on name
  const colorIndex = (fullName.charCodeAt(0) + fullName.charCodeAt(fullName.length - 1)) % 5;
  const avatarColors = [
    'bg-indigo-500',
    'bg-purple-500', 
    'bg-blue-500',
    'bg-green-500',
    'bg-pink-500'
  ];

  return (
    <article 
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${className}`}
      aria-labelledby={`founder-${founder.id}`}
    >
      {/* Founder info with colored initials */}
      <div className="flex items-center space-x-4 mb-4">
        <div 
          className={`h-14 w-14 flex items-center justify-center ${avatarColors[colorIndex]} text-white rounded-xl font-bold text-lg shadow-sm`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            id={`founder-${founder.id}`}
            className="font-bold text-lg text-gray-900 truncate"
          >
            {fullName}
          </h3>
          {batch && (
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full border border-indigo-200">
              {batch}
            </span>
          )}
        </div>
      </div>

      {/* LinkedIn link */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-lg border border-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`View ${fullName} LinkedIn profile`}
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M100.28 448H7.4V148.9h92.88zm-46.44-344a53.82 53.82 0 1 1 53.81-53.82 53.82 53.82 0 0 1-53.8 53.82zM447.9 448h-92.68V302.4c0-34.72-.7-79.42-48.36-79.42-48.36 0-55.78 37.73-55.78 76.7V448h-92.8V148.9H255v40.8h1.3c12.9-24.4 44.4-50.1 91.3-50.1 97.6 0 115.6 64.2 115.6 147.5V448z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      )}
    </article>
  );
});

FounderCard.displayName = 'FounderCard';
