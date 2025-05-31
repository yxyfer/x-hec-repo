import React from "react";

interface StartupHeaderProps {
  name: string;
  sector: string;
  faviconUrl: string;
  link: string;
}

export default function StartupHeader({
  name,
  sector,
  faviconUrl,
  link,
}: StartupHeaderProps) {
  const WrapperLink = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  return (
    <div className="flex items-center space-x-6">
      {/* Logo */}
      <WrapperLink>
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt={`${name} icon`}
            className="bg-gray-100 w-16 h-16"
          />
        ) : (
          <div className="rounded-full bg-gray-100 w-16 h-16" />
        )}
      </WrapperLink>

      {/* Name and Sector */}
      <div>
        <h1 className="text-5xl font-bold">{name}</h1>
        <p className="text-gray-600 mt-2">{sector}</p>
      </div>
    </div>
  );
}
