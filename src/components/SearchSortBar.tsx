import React from 'react';

type SortKey = 'default' | 'inception_year' | 'Sector' | 'Statut';

interface SearchSortBarProps {
  query: string;
  setQuery: (value: string) => void;
  sortKey: SortKey;
  setSortKey: (value: SortKey) => void; // Ensure SortKey type is enforced
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
}

export default function SearchSortBar({
  query,
  setQuery,
  sortKey,
  setSortKey,
  sortOrder,
  toggleSortOrder,
}: SearchSortBarProps) {
  return (
    <div className="sticky top-4 z-10 flex flex-col gap-4 md:flex-row md:items-center rounded-3xl bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-lg border border-white/40 dark:border-white/20 px-6 py-4">
      <input
        type="text"
        placeholder="Search companies…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:max-w-sm px-4 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-gray-300 dark:border-white/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
      />
      {/* <div className="flex gap-2 w-full md:w-auto">
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)} // Cast to SortKey
          className="w-full md:w-48 px-3 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-gray-300 dark:border-white/20 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="default">Default (A‑Z)</option>
          <option value="inception_year">Year</option>
          <option value="Sector">Sector</option>
          <option value="Statut">Status</option>
        </select>
        <button
          type="button"
          onClick={toggleSortOrder}
          title="Toggle sort order"
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-white/20 px-3 py-2 text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition"
        >
          {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div> */}
    </div>
  );
}