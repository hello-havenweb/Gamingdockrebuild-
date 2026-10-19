/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GAMES, GameItem } from './data/games';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WishlistDrawer } from './components/WishlistDrawer';

import { toPath, normalizePath } from './utils/paths';

// Pages
import { HomePage } from './pages/HomePage';
import { GamesPage } from './pages/GamesPage';
import { GameDetailPage } from './pages/GameDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentUrl, setCurrentUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      const normalized = normalizePath(window.location.pathname);
      return normalized + window.location.search;
    }
    return '/';
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gaming_dock_wishlist');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gaming_dock_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // LocalStorage error fallback
    }
  }, [wishlistIds]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const normalized = normalizePath(window.location.pathname);
      setCurrentUrl(normalized + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') {
      const fullUrl = toPath(path);
      window.history.pushState({}, '', fullUrl);
      const [rawPath, rawSearch] = path.split('?');
      const normalized = normalizePath(rawPath);
      setCurrentUrl(rawSearch ? `${normalized}?${rawSearch}` : normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleWishlist = (gameId: string) => {
    setWishlistIds((prev) =>
      prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId]
    );
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  const wishlistGames = GAMES.filter((g) => wishlistIds.includes(g.id));

  // Parse path & search
  const [rawPath, search] = currentUrl.split('?');
  const pathname = normalizePath(rawPath);
  const searchParams = new URLSearchParams(search || '');

  // Route resolver
  let pageContent: React.ReactNode = null;

  // 1. GAME DETAIL: /games/[slug].html or /games/[slug] or /game.html?id=[slug]
  let gameSlugMatch = pathname.match(/^\/games\/([^/]+?)(?:\.html)?$/);
  const queryGameId = searchParams.get('id');

  let selectedGame: GameItem | undefined;
  if (gameSlugMatch && gameSlugMatch[1] && gameSlugMatch[1] !== 'index') {
    const slug = gameSlugMatch[1];
    selectedGame = GAMES.find((g) => g.slug === slug || g.id === slug);
  } else if (pathname === '/game.html' && queryGameId) {
    selectedGame = GAMES.find((g) => g.slug === queryGameId || g.id === queryGameId);
  }

  if (selectedGame) {
    pageContent = (
      <GameDetailPage
        game={selectedGame}
        wishlistIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
        onNavigate={handleNavigate}
      />
    );
  } else if (pathname === '/' || pathname === '/index.html' || pathname === '') {
    // 2. HOMEPAGE
    pageContent = (
      <HomePage
        games={GAMES}
        wishlistIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
        onNavigate={handleNavigate}
      />
    );
  } else if (pathname === '/games' || pathname === '/games.html') {
    // 3. GAMES CATALOG
    pageContent = (
      <GamesPage
        games={GAMES}
        wishlistIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
        onNavigate={handleNavigate}
        initialSearch={searchParams.get('search') || ''}
        initialCategory={searchParams.get('category') || 'All'}
        initialCollection={searchParams.get('collection') || ''}
        initialSort={searchParams.get('sort') || 'popular'}
      />
    );
  } else if (pathname === '/categories' || pathname === '/categories.html') {
    // 4. CATEGORIES
    pageContent = (
      <CategoriesPage games={GAMES} onNavigate={handleNavigate} />
    );
  } else if (pathname === '/about' || pathname === '/about.html') {
    // 5. ABOUT
    pageContent = (
      <AboutPage onNavigate={handleNavigate} />
    );
  } else if (pathname === '/contact' || pathname === '/contact.html') {
    // 6. CONTACT
    pageContent = <ContactPage />;
  } else if (pathname === '/faq' || pathname === '/faq.html') {
    // 7. FAQ
    pageContent = <FAQPage />;
  } else if (pathname === '/privacy-policy' || pathname === '/privacy-policy.html') {
    // 8. PRIVACY POLICY
    pageContent = <PrivacyPolicyPage />;
  } else if (pathname === '/terms' || pathname === '/terms.html') {
    // 9. TERMS
    pageContent = <TermsPage />;
  } else {
    // 10. NOT FOUND (404)
    pageContent = <NotFoundPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      {/* NAVBAR */}
      <Navbar
        currentPath={pathname}
        onNavigate={handleNavigate}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {pageContent}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistGames={wishlistGames}
        onRemove={toggleWishlist}
        onClear={clearWishlist}
        onSelectGame={(slug) => {
          setWishlistOpen(false);
          handleNavigate(`/games/${slug}.html`);
        }}
      />
    </div>
  );
}
