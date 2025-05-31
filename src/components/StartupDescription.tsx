import React from "react";

interface StartupDescriptionProps {
  programme: string | null;
}

export default function StartupDescription({
  programme,
}: StartupDescriptionProps) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">About</h2>
      <p className="text-gray-700 leading-relaxed">
        {programme ? `Part of ${programme} programme.` : "Programme unknown."}
      </p>
    </div>
  );
}
