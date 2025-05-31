// Startup.ts
/**
 * Represents a startup company in the X-HEC portfolio
 */
export interface Startup {
  /** Unique identifier for the startup */
  id: number;
  /** Company name */
  name: string;
  /** Year the company was founded */
  inceptionYear: number;
  /** LinkedIn company page URL */
  linkedinUrl: string;
  /** Company website URL */
  websiteUrl: string;
  /** X-HEC program the founders participated in */
  program: string;
  /** Comma-separated list of founder names */
  founders: string;
  /** Comma-separated list of founder IDs */
  founderIds: string;
  /** Industry sector */
  sector: string;
  /** Number of full-time employees including founders */
  employeeCount: string | number;
  /** Current status of the company */
  status: string;
  /** Formatted list of founders for display */
  foundersList: string;
}

/**
 * Status options for startups
 */
export type StartupStatus = 'En activité' | 'Fermé' | 'Vendu' | 'Unknown';

/**
 * Props for components that display startup information
 */
export interface StartupCardProps {
  startup: Startup;
  className?: string;
}

/**
 * Props for startup list components
 */
export interface StartupListProps {
  startups: Startup[];
  loading?: boolean;
  error?: Error | null;
}
