/**
 * Utility functions for handling favicon URLs and fallbacks
 */

/**
 * Validates if a domain is properly formatted
 */
export const isValidDomain = (domain: string): boolean => {
  if (!domain) return false;
  
  // Basic domain validation regex
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
  return domainRegex.test(domain);
};

/**
 * Extracts domain from URL with better validation
 */
export const extractDomain = (url: string): string => {
  if (!url) return '';
  
  try {
    // Remove protocol and get the domain part
    const cleanUrl = url.replace(/(^\w+:|^)\/\//, '');
    const domain = cleanUrl.split('/')[0];
    
    // Remove www. prefix for consistency
    const cleanDomain = domain.replace(/^www\./, '');
    
    return isValidDomain(cleanDomain) ? cleanDomain : '';
  } catch {
    return '';
  }
};

/**
 * Generates multiple favicon URL options with fallbacks
 */
export const getFaviconUrls = (websiteUrl: string): string[] => {
  const domain = extractDomain(websiteUrl);
  
  if (!domain) return [];
  
  return [
    // Google's favicon service (primary)
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    // DuckDuckGo's favicon service (fallback)
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    // Direct favicon from domain (fallback)
    `https://${domain}/favicon.ico`,
    // Fallback with www
    `https://www.${domain}/favicon.ico`,
  ];
};

/**
 * Generates a consistent color for company avatars based on company name
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
  ];
  
  // Create a hash from the company name
  const hash = name.split('').reduce((acc, char) => {
    acc = ((acc << 5) - acc) + char.charCodeAt(0);
    return acc & acc; // Convert to 32-bit integer
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Generates initials from company name
 */
export const getInitials = (name: string): string => {
  if (!name) return '?';
  
  return name
    .split(' ')
    .slice(0, 2) // Take first two words
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();
};

/**
 * Preloads an image to check if it exists
 */
export const preloadImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

/**
 * Finds the first working favicon URL from a list of options
 */
export const findWorkingFavicon = async (urls: string[]): Promise<string | null> => {
  for (const url of urls) {
    const works = await preloadImage(url);
    if (works) return url;
  }
  return null;
}; 