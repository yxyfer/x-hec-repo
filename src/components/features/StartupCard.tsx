import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import { StartupCardProps, StartupStatus } from '@/types/Startup';

/**
 * Card component for displaying startup information
 * Optimized for performance with React.memo and proper image handling
 */
export const StartupCard = memo<StartupCardProps>(({ startup, className = '' }) => {
  const { websiteUrl, linkedinUrl, name, inceptionYear, program, sector, status } = startup;

  // Memoize computed values to avoid recalculation on each render
  const { domain, faviconUrl, primaryLink } = useMemo(() => {
    const domain = websiteUrl
      ? websiteUrl.replace(/(^\w+:|^)\/\//, '').split('/')[0]
      : '';
    
    const faviconUrl = websiteUrl
      ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      : '';
    
    const primaryLink = websiteUrl || linkedinUrl || '';

    return { domain, faviconUrl, primaryLink };
  }, [websiteUrl, linkedinUrl]);

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

  const LinkWrapper = ({ children }: { children: React.ReactNode }) =>
    primaryLink ? (
      <a
        href={primaryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
        aria-label={`Visit ${name} website`}
      >
        {children}
      </a>
    ) : (
      <div className="flex items-center">{children}</div>
    );

  return (
    <article 
      className={`w-full border border-gray-200 rounded-lg px-8 py-6 mb-0 hover:shadow-md transition-shadow ${className}`}
      aria-labelledby={`startup-${startup.id}`}
    >
      <div className="relative flex w-full items-center justify-start">
        {/* Logo */}
        <div className="flex w-20 shrink-0 grow-0 basis-20 items-center pr-4">
          <LinkWrapper>
            {faviconUrl ? (
              <Image
                src={faviconUrl}
                alt={`${name} logo`}
                width={64}
                height={64}
                className="rounded-full bg-gray-100"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div 
              className={`rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center text-gray-500 font-semibold ${faviconUrl ? 'hidden' : ''}`}
              aria-hidden="true"
            >
              {name.charAt(0).toUpperCase()}
            </div>
          </LinkWrapper>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-between">
          <div className="lg:max-w-[90%]">
            <div className="flex items-center gap-3">
              <LinkWrapper>
                <h3 
                  id={`startup-${startup.id}`}
                  className="font-bold text-xl text-gray-900"
                >
                  {name}
                </h3>
              </LinkWrapper>
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
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                aria-label={`View ${name} LinkedIn profile`}
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
          </div>
        </div>
      </div>
    </article>
  );
});

StartupCard.displayName = 'StartupCard'; 