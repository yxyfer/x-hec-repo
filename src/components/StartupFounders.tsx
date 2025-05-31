import React from "react";

import { Startup as StartupType } from "@/types/Startup";
import foundersData from "@/data/founders.json";
import { transformLegacyFounders } from "@/utils/data-transform";

import { Founder as FounderType } from "@/types/Founder";

interface StartupProps {
  startup: StartupType;
}

export default function StartupFounders({ startup }: StartupProps) {
  // Transform founders data to the new interface format
  const transformedFounders = transformLegacyFounders(foundersData);
  
  const founderMap = transformedFounders.reduce((acc, founder) => {
    acc[founder.id] = founder;
    return acc;
  }, {} as Record<string, FounderType>);

  const founderIdsArray = Array.isArray(startup.founderIds)
    ? startup.founderIds
    : typeof startup.founderIds === "string"
    ? startup.founderIds.split(/[,;]+/)
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  const resolveFounders =
    founderIdsArray.length > 0
      ? founderIdsArray.map(
          (fid: string | number) => founderMap[fid.toString()] ?? null
        ).filter(Boolean)
      : [];

  const founders = resolveFounders;
  
  return (
    <div className="bg-white py-24 sm:py-32">
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-8"> */}
      <div>
        {" "}
        {/*className="mx-auto max-w-2xl lg:mx-0">*/}
        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          The Founders
        </h2>
      </div>
      <ul
        role="list"
        className="mx-auto mt-10 grid   sm:grid-cols-3 md:grid-cols-4  gap-x-8 gap-y-16 text-center"
      >
        {founders.map(
          (founder: FounderType, idx: React.Key | null | undefined) => (
            <li key={idx}>
              <img
                alt=""
                src={
                  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                }
                className="mx-auto w-24 rounded-full"
              />
              <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-gray-900">
                {founder.firstName} {founder.lastName}
              </h3>
              <p className="text-sm/6 text-gray-600">
                co-founder | {founder.batch}
              </p>
              <ul role="list" className="flex justify-center gap-x-6">
                <li>
                  <a
                    href={founder.linkedinUrl}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="w-5"
                    >
                      <path
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
    // </div>
  );
}
