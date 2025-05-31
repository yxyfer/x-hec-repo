/**
 * Represents a founder in the X-HEC community
 */
export interface Founder {
  /** Unique identifier for the founder */
  id: string;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** LinkedIn profile URL */
  linkedinUrl: string;
  /** X-HEC batch/cohort */
  batch: string;
}

/**
 * Props for components that display founder information
 */
export interface FounderCardProps {
  founder: Founder;
  className?: string;
}

/**
 * Props for founder list components
 */
export interface FounderListProps {
  founders: Founder[];
  loading?: boolean;
  error?: Error | null;
}
