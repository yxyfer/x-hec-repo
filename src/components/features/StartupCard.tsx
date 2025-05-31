import React, { memo, useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StartupCardProps, StartupStatus } from '@/types/Startup';
import { extractDomain, getAvatarColor, getInitials } from '@/utils/favicon';

/**
 * Card component for displaying startup information
 * Optimized for performance with React.memo and robust image handling
 */
export const StartupCard = memo<StartupCardProps>(({ startup, className = '' }) => {
  const { websiteUrl, linkedinUrl, name, inceptionYear, program, sector, status } = startup;
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize computed values to avoid recalculation on each render
  const { faviconUrl, initials, avatarColor } = useMemo(() => {
    const domain = extractDomain(websiteUrl);
    const faviconUrl = domain 
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : '';
    const initials = getInitials(name);
    const avatarColor = getAvatarColor(name);

    return { faviconUrl, initials, avatarColor };
  }, [websiteUrl, name]);

  const getStatusColor = (status: string): string => {
    switch (status as StartupStatus) {
      case 'En activité':
        return 'bg-green-500';
      case 'Fermé':
      case 'Vendu':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
    setIsLoading(false);
  }, []);

  const LogoComponent = () => {
    // Show fallback if no favicon URL or if image failed to load
    if (!faviconUrl || imageError) {
      return (
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg ${avatarColor}`}
          aria-hidden="true"
          title={`${name} logo`}
        >
          {initials}
        </div>
      );
    }

    return (
      <div className="relative w-16 h-16">
        {/* Loading placeholder */}
        {isLoading && (
          <div 
            className={`absolute inset-0 rounded-full flex items-center justify-center text-white font-bold text-lg ${avatarColor} animate-pulse`}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        
        {/* Favicon image */}
        <Image
          src={faviconUrl}
          alt={`${name} logo`}
          width={64}
          height={64}
          className={`rounded-full bg-gray-100 transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          unoptimized // Prevent Next.js optimization for external favicons
          priority={false} // Don't prioritize favicon loading
        />
      </div>
    );
  };

  return (
    <Link 
      href={`/startups/${startup.id}`}
      className="block focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 rounded-lg"
    >
      <article 
        className={`w-full border border-gray-200 rounded-lg px-8 py-6 mb-0 hover:shadow-md transition-shadow cursor-pointer ${className}`}
        aria-labelledby={`startup-${startup.id}`}
      >
        <div className="relative flex w-full items-center justify-start">
          {/* Logo */}
          <div className="flex w-20 shrink-0 grow-0 basis-20 items-center pr-4">
            <LogoComponent />
          </div>

          {/* Content */}
          <div className="flex flex-1 items-center justify-between">
            <div className="lg:max-w-[90%]">
              <div className="flex items-center gap-3">
                <h3 
                  id={`startup-${startup.id}`}
                  className="font-bold text-xl text-gray-900"
                >
                  {name}
                </h3>
                <span className="text-base text-gray-500 font-normal">
                  {inceptionYear}
                </span>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mt-2 flex-wrap" role="list">
                {program && program !== "Unknown" && (
                  <span 
                    className="rounded-lg bg-gray-100 text-black text-sm font-medium px-3 py-1 tracking-wide"
                    role="listitem"
                  >
                    {program}
                  </span>
                )}
                {sector && sector !== "Unknown" && (
                  <span 
                    className="rounded-lg bg-gray-100 text-black text-sm font-medium px-3 py-1 tracking-wide"
                    role="listitem"
                  >
                    {sector}
                  </span>
                )}
                {status && status !== "Unknown" && (
                  <span 
                    className="rounded-lg bg-gray-100 text-black text-sm font-medium px-3 py-1 tracking-wide flex items-center"
                    role="listitem"
                  >
                    {status}
                    <span 
                      className={`inline-block w-3 h-3 rounded-full ml-2 ${getStatusColor(status)}`}
                      aria-label={`Status: ${status}`}
                    />
                  </span>
                )}
              </div>

              {/* LinkedIn Link */}
              {/* {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 rounded-md"
                  aria-label={`View ${name} LinkedIn profile`}
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
              )} */}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
});

StartupCard.displayName = 'StartupCard'; 