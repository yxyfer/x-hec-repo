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
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          aria-label="Go to homepage"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <span className="text-white font-bold text-lg">XH</span>
          </div>
          <span className="font-bold text-xl text-gray-900 group-hover:text-slate-800 transition-colors">
            X-HEC Entrepreneurs
          </span>
        </Link>
        
        {/* Navigation */}
        <nav 
          className="flex items-center gap-1"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link 
            href="/founders" 
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Founders
          </Link>
          <Link
            href="/startups"
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Startups
          </Link>
        </nav>
      </div>
    </header>
  );
}; 