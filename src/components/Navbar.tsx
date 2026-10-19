import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Search, Heart, Menu, X, ChevronRight } from 'lucide-react';
import { GAMES, GameItem } from '../data/games';
import { toPath } from '../utils/paths';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  wishlistCount,
  onOpenWishlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GameItem[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches = GAMES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Games', path: '/games.html' },
    { label: 'Categories', path: '/categories.html' },
    { label: 'About', path: '/about.html' },
    { label: 'Contact', path: '/contact.html' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      onNavigate(`/games.html?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isLinkActive = (path: string) => {
    if (path === '/' && (currentPath === '/' || currentPath === '/index.html' || currentPath === '')) {
      return true;
    }
    return currentPath === path || currentPath.startsWith(path.replace('.html', ''));
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#242836]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <a
          href={toPath('/')}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff3045] to-[#c9182c] flex items-center justify-center shadow-lg shadow-[#ff3045]/20 group-hover:scale-105 transition-transform duration-200">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center font-heading font-extrabold text-2xl tracking-wider leading-none">
              <span className="text-white">GAMING</span>
              <span className="text-[#ff3045] ml-1.5">DOCK</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9ca3af] mt-1">
              PLAY • EXPLORE • ENJOY
            </span>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <a
                key={link.path}
                href={toPath(link.path)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.path);
                }}
                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  active
                    ? 'text-white font-semibold'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#15171e]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#ff3045] rounded-full glow-red-sm" />
                )}
              </a>
            );
          })}
        </nav>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-3">
          
          {/* SEARCH INPUT */}
          <div ref={searchContainerRef} className="relative hidden sm:block w-48 md:w-64 lg:w-72">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2 bg-[#15171e] border border-[#242836] rounded-xl text-xs sm:text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045] focus:ring-1 focus:ring-[#ff3045] transition-all"
              />
            </form>

            {/* LIVE SEARCH DROPDOWN */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#15171e] border border-[#242836] rounded-xl shadow-2xl p-2 z-50 overflow-hidden">
                <div className="text-[11px] font-bold text-[#6b7280] uppercase px-3 py-1.5 tracking-wider">
                  Matching Games
                </div>
                {searchResults.map((game) => (
                  <a
                    key={game.id}
                    href={toPath(`/games/${game.slug}.html`)}
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchOpen(false);
                      setSearchQuery('');
                      onNavigate(`/games/${game.slug}.html`);
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#202430] transition-colors group"
                  >
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-9 h-12 object-cover rounded bg-[#0b0c10] shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&q=80';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white group-hover:text-[#ff3045] truncate transition-colors">
                        {game.title}
                      </div>
                      <div className="text-xs text-[#9ca3af] truncate">{game.genre}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6b7280] group-hover:text-white" />
                  </a>
                ))}
                <button
                  onClick={handleSearchSubmit}
                  className="w-full mt-1 py-2 text-center text-xs font-semibold text-[#ff3045] hover:bg-[#ff3045]/10 rounded-lg transition-colors"
                >
                  View all results for "{searchQuery}"
                </button>
              </div>
            )}
          </div>

          {/* WISHLIST BUTTON */}
          <button
            onClick={onOpenWishlist}
            aria-label="View Wishlist"
            className="relative p-2.5 rounded-xl bg-[#15171e] border border-[#242836] hover:border-[#ff3045] text-white transition-all group hover:glow-red-sm"
          >
            <Heart className="w-5 h-5 text-[#9ca3af] group-hover:text-[#ff3045] transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ff3045] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0b0c10] animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-xl bg-[#15171e] border border-[#242836] text-[#9ca3af] hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1017] border-b border-[#242836] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative sm:hidden">
            <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#15171e] border border-[#242836] rounded-xl text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045]"
            />
          </form>

          {/* Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <a
                  key={link.path}
                  href={toPath(link.path)}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigate(link.path);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    active
                      ? 'bg-[#ff3045]/15 text-[#ff3045] font-semibold border border-[#ff3045]/30'
                      : 'text-[#9ca3af] hover:text-white hover:bg-[#15171e]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
