/**
 * SYNAPSE Offline & Resilient Image Fallbacks
 * Generates local SVG Data URIs for avatars and covers so that Unsplash rate limits,
 * network drops, or missing images never break the visual interface.
 */

// Generate initials from a user's full name (e.g., "Elena Rostova" -> "ER")
export function getInitials(name = '') {
  if (!name) return 'S';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Consistent color generator based on a string hash
function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const AVATAR_PALETTES = [
  ['#6366f1', '#4338ca'], // Indigo
  ['#06b6d4', '#0891b2'], // Cyan
  ['#10b981', '#059669'], // Emerald
  ['#f59e0b', '#d97706'], // Amber
  ['#ec4899', '#be185d'], // Rose / Pink
  ['#8b5cf6', '#6d28d9'], // Purple
];

const COVER_PALETTES = [
  { bg1: '#0f172a', bg2: '#1e1b4b', accent: '#6366f1' },
  { bg1: '#091e2b', bg2: '#064e3b', accent: '#10b981' },
  { bg1: '#1a102f', bg2: '#3b0764', accent: '#a855f7' },
  { bg1: '#1c1917', bg2: '#451a03', accent: '#f59e0b' },
  { bg1: '#0c1a2c', bg2: '#083344', accent: '#06b6d4' }
];

/**
 * Returns an SVG Data URI for an avatar with initials on an elegant gradient.
 */
export function getAvatarFallback(name = 'User') {
  const hash = hashString(name);
  const [col1, col2] = AVATAR_PALETTES[hash % AVATAR_PALETTES.length];
  const initials = getInitials(name);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${col1}" />
        <stop offset="100%" stop-color="${col2}" />
      </linearGradient>
    </defs>
    <rect width="128" height="128" rx="64" fill="url(#g)" />
    <text x="64" y="72" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">${initials}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns an SVG Data URI for a community/event cover with geometric dark mesh styling.
 */
export function getCoverFallback(title = 'SYNAPSE Guild', category = '') {
  const hash = hashString(title + category);
  const { bg1, bg2, accent } = COVER_PALETTES[hash % COVER_PALETTES.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
      <radialGradient id="glow" cx="65%" cy="35%" r="60%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
      </radialGradient>
      <pattern id="mesh" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="800" height="400" fill="url(#bg)" />
    <rect width="800" height="400" fill="url(#glow)" />
    <rect width="800" height="400" fill="url(#mesh)" />
    <circle cx="680" cy="120" r="140" fill="${accent}" opacity="0.08" filter="blur(30px)" />
    <circle cx="120" cy="280" r="90" fill="#ffffff" opacity="0.03" filter="blur(20px)" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns an SVG Data URI for a post spark showcase fallback.
 */
export function getPostFallback(title = 'Spark') {
  return getCoverFallback(title, 'Post');
}
