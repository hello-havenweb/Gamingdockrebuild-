/**
 * Utility functions for handling routing and asset URLs under GitHub Pages subpaths.
 */

export const getBaseUrl = (): string => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
};

/**
 * Converts an internal route (e.g. '/', '/games.html', '/games/gta-v.html')
 * into the full URL path respecting the repository subpath.
 */
export const toPath = (route: string): string => {
  if (!route) return getBaseUrl();
  if (route.startsWith('http://') || route.startsWith('https://') || route.startsWith('mailto:')) {
    return route;
  }

  // Preserve query string or hash
  const [pathname, searchAndHash] = route.split(/(?=[?#])/);
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const base = getBaseUrl();
  const fullPath = cleanPath ? `${base}${cleanPath}` : base;

  return searchAndHash ? `${fullPath}${searchAndHash}` : fullPath;
};

/**
 * Normalizes window.location.pathname by stripping the repository subpath.
 * Example:
 *   '/GamingDock5.0-/' -> '/'
 *   '/GamingDock5.0-/games.html' -> '/games.html'
 *   '/GamingDock5.0-/games/gta-v.html' -> '/games/gta-v.html'
 */
export const normalizePath = (pathname: string): string => {
  if (!pathname) return '/';

  const base = getBaseUrl();
  // Strip Vite base if present
  if (base !== '/' && pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length - 1);
    return stripped === '' ? '/' : stripped;
  }

  // Strip known GitHub repo names or trailing slash variations
  const repoPrefixMatch = pathname.match(/^\/(?:GamingDock5\.0-|[a-zA-Z0-9_.-]+)(\/.*)?$/);
  if (pathname.startsWith('/GamingDock5.0-')) {
    const stripped = pathname.slice('/GamingDock5.0-'.length);
    return stripped === '' ? '/' : stripped;
  }

  return pathname;
};
