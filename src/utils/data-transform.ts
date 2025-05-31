import { Startup } from '@/types/Startup';
import { Founder } from '@/types/Founder';

/**
 * Legacy startup data format from the original API
 */
interface LegacyStartup {
  id_startup: number;
  Startup: string;
  inception_year: number;
  Linkedin_entreprise: string;
  lien_entreprise: string;
  Programme: string;
  Founders: string | number;
  FounderIds: string | number;
  Sector: string;
  "# FTEs (incl. founders)": string | number;
  Statut: string;
  foundersList: string;
}

/**
 * Legacy founder data format from the actual JSON file
 */
interface LegacyFounder {
  id_founders: number;
  prenom: string;
  nom: string;
  linkedin: string;
  xhecbatch: string;
  startupList?: string[];
}

/**
 * Transforms legacy startup data to the new interface format
 */
export const transformLegacyStartup = (legacy: LegacyStartup): Startup => ({
  id: legacy.id_startup,
  name: legacy.Startup,
  inceptionYear: legacy.inception_year,
  linkedinUrl: legacy.Linkedin_entreprise,
  websiteUrl: legacy.lien_entreprise,
  program: legacy.Programme,
  founders: String(legacy.Founders),
  founderIds: String(legacy.FounderIds),
  sector: legacy.Sector,
  employeeCount: legacy["# FTEs (incl. founders)"],
  status: legacy.Statut,
  foundersList: legacy.foundersList,
});

/**
 * Transforms legacy founder data to the new interface format
 */
export const transformLegacyFounder = (legacy: LegacyFounder): Founder => ({
  id: legacy.id_founders.toString(),
  firstName: legacy.prenom,
  lastName: legacy.nom,
  linkedinUrl: legacy.linkedin,
  batch: legacy.xhecbatch,
});

/**
 * Transforms an array of legacy startups to the new format
 */
export const transformLegacyStartups = (legacyStartups: LegacyStartup[]): Startup[] =>
  legacyStartups.map(transformLegacyStartup);

/**
 * Transforms an array of legacy founders to the new format
 */
export const transformLegacyFounders = (legacyFounders: LegacyFounder[]): Founder[] =>
  legacyFounders.map(transformLegacyFounder); 