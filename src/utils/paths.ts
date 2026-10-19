/**
 * Utility functions for handling routing and asset URLs under any GitHub Pages
 * repository subpath, custom domain, or local development server.
 * Completely dynamic—no hardcoded repository names or URLs required.
 */

const knownRootPages = new Set([
  'index.html',
  'games.html',
  'categories.html',
  'about.html',
  'contact.html',
  'faq.html',
  'privacy-policy.html',
  'terms.html',
  '404.html',
]);

/**
 * Automatically detects the base URL from the current runtime environment.
 * If Vite's import.meta.env.BASE_URL is set to a fixed path (not './' or '/'), it uses that.
 * Otherwise, it inspects window.location.pathname to dynamically detect the repository subpath.
 */
export const getBaseUrl = (): string => {
  const envBase = import.meta.env.BASE_URL;
  if (envBase && envBase !== './' && envBase !== '/') {
    return envBase.endsWith('/') ? envBase : `${envBase}/`;
  }

  if (typeof window !== 'undefined' && window.location) {
    const pathname = window.location.pathname || '/';
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0) {
      const first = segments[0];
      // If the first segment is an HTML page or root games directory, there is no subfolder
      if (
        knownRootPages.has(first) ||
        first.endsWith('.html') ||
        (first === 'games' && segments.length === 2 && segments[1].endsWith('.html'))
      ) {
        return '/';
      }
      // Otherwise, the first segment is the repository name on GitHub Pages
      return `/${first}/`;
    }
  }

  return '/';
};

/**
 * Converts an internal route (e.g. '/', '/games.html', '/games/gta-v.html')
 * into the full URL path respecting the active deployment base.
 */
export const toPath = (route: string): string => {
  if (!route) return getBaseUrl();
  if (route.startsWith('http://') || route.startsWith('https://') || route.startsWith('mailto:')) {
    return route;
  }

  const [pathname, searchAndHash] = route.split(/(?=[?#])/);
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const base = getBaseUrl();
  const fullPath = cleanPath ? `${base}${cleanPath}` : base;

  return searchAndHash ? `${fullPath}${searchAndHash}` : fullPath;
};

/**
 * Normalizes window.location.pathname by stripping any repository subpath.
 * Example:
 *   '/my-repo/' -> '/'
 *   '/my-repo/games.html' -> '/games.html'
 *   '/my-repo/games/gta-v.html' -> '/games/gta-v.html'
 */
export const normalizePath = (pathname: string): string => {
  if (!pathname) return '/';

  const base = getBaseUrl();
  const baseNoTrailing = base.endsWith('/') ? base.slice(0, -1) : base;

  // Exact match with repository base without trailing slash (e.g. '/Gamingdockrebuild-')
  if (baseNoTrailing && pathname === baseNoTrailing) {
    return '/';
  }

  if (base !== '/' && pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length - 1);
    return stripped === '' ? '/' : stripped;
  }

  if (baseNoTrailing && baseNoTrailing !== '/' && pathname.startsWith(`${baseNoTrailing}/`)) {
    const stripped = pathname.slice(baseNoTrailing.length);
    return stripped === '' ? '/' : stripped;
  }

  // Fallback: If single segment that isn't a known page and does not end with .html
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1) {
    const seg = segments[0];
    if (!knownRootPages.has(seg) && !seg.endsWith('.html')) {
      return '/';
    }
  }

  return pathname;
};
