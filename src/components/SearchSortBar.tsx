'use client';

import React from 'react';

interface SearchSortBarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchSortBar({ query, setQuery }: SearchSortBarProps) {
  return (
    <div className="sticky top-4 z-10 flex flex-col gap-4 md:flex-row md:items-center rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg border border-white/40 dark:border-white/20 px-6 py-4">
      <input
        type="text"
        placeholder="Search companies…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:max-w-sm px-4 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>
  );
}