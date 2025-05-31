import React from "react";

interface StartupLinkProps {
  link: string;
}

export default function StartupLink({ link }: StartupLinkProps) {
  if (!link) return null;

  return (
    <div className="mt-6">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-lg"
      >
        Visit Website
      </a>
    </div>
  );
}
