"use client";

import React from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
  className?: string;
  resultCount?: number;
}

export default function SearchBar({ 
  query, 
  setQuery, 
  placeholder = "Rechercher...",
  className = "",
  resultCount
}: SearchBarProps) {
  const clearSearch = () => setQuery("");

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Unified Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-4 text-lg font-medium text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Results Counter */}
      {query && resultCount !== undefined && (
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full border border-indigo-200">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            {resultCount} {resultCount === 1 ? 'résultat trouvé' : 'résultats trouvés'}
          </span>
        </div>
      )}
    </div>
  );
}

export { SearchBar };
export const SearchSortBar = SearchBar;
