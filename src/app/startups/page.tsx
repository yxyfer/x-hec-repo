"use client";

import SiteNav from "@/components/SiteNav";
import StartupList from "@/components/StartupList";

export default function StartupsPage() {
  return (
    <main className="font-sans text-blue-900 dark:text-blue-50">
      <SiteNav />
      <section className="container mx-auto px-8 py-12">
        <StartupList />
      </section>
    </main>
  );
}
