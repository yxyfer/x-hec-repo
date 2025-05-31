"use client";

import Link from "next/link";

export interface SiteNavProps {
  className?: string;
}

/**
 * Main site navigation component
 * Provides navigation between different sections of the X-HEC platform
 */
export const SiteNav = ({ className = '' }: SiteNavProps) => {
  return (
    <header className={`sticky top-0 z-50 bg-white backdrop-blur border-b border-blue-200 dark:bg-blue-950/80 dark:border-blue-800 ${className}`}>
      <div className="container mx-auto px-8 py-4 flex items-center flex-row flex-wrap justify-around">
        <Link
          href="/"
          className="font-bold tracking-wide text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          aria-label="Go to homepage"
        >
          X‑HEC Entrepreneurs
        </Link>
        
        <nav 
          className="flex gap-6 text-sm font-medium text-blue-700 dark:text-blue-300"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link 
            href="/startups" 
            className="hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Startups
          </Link>
          <Link 
            href="/founders" 
            className="hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Founders
          </Link>
        </nav>
      </div>
    </header>
  );
}; 