"use client";

import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-blue-200 dark:bg-blue-950/80 dark:border-blue-800 ">
      <div className="container mx-auto px-8 py-4 flex items-center flex-row flex-wrap justify-around">
        <Link
          href="/"
          className="font-bold tracking-wide text-blue-900 dark:text-blue-100"
        >
          X‑HEC Entrepreneurs
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-blue-700 dark:text-blue-300">
          <Link href="/startups" className="hover:underline underline-offset-4">
            Startups
          </Link>
          <Link href="/founders" className="hover:underline underline-offset-4">
            Founders
          </Link>
        </nav>
      </div>
    </header>
  );
}
