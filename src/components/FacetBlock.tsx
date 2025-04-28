import React from "react";

interface FacetProps {
  title: string;
  options: [string | number, number][];
  allChecked: boolean;
  onAllToggle: () => void;
  isSelected: (v: string | number) => boolean;
  onToggle: (v: string | number) => void;
}

export default function FacetBlock({
  title,
  options,
  allChecked,
  onAllToggle,
  isSelected,
  onToggle,
}: FacetProps) {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <label className="flex items-center gap-2 mb-2 cursor-pointer text-sm">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={onAllToggle}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span>All</span>
      </label>
      <div className="max-h-48 overflow-y-auto pr-1.5 space-y-1">
        {options.map(([val, count]) => (
          <label
            key={String(val)}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              checked={isSelected(val)}
              onChange={() => onToggle(val)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>{val}</span>
            <span className="ml-auto bg-gray-100 dark:bg-white/10 text-xs px-1.5 rounded">
              {count}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
