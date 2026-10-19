import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  Monitor,
  Calendar,
  Sparkles,
  Pause,
  Play,
  Layers,
} from 'lucide-react';
import { GameItem } from '../data/games';
import { toPath } from '../utils/paths';

interface HeroSliderProps {
  featuredGames: GameItem[];
  onNavigate: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ featuredGames, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Preload next image to avoid flickering
  useEffect(() => {
    if (featuredGames.length <= 1) return;
    const nextIndex = (currentIndex + 1) % featuredGames.length;
    const nextGame = featuredGames[nextIndex];
    if (nextGame) {
      const img = new Image();
      img.src = nextGame.screenshots?.[0] || nextGame.heroBanner || nextGame.coverImage;
    }
  }, [currentIndex, featuredGames]);

  // Autoplay rotation every 5.5s
  useEffect(() => {
    if (featuredGames.length <= 1 || isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [featuredGames.length, isPaused, prefersReducedMotion]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  }, [featuredGames.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  }, [featuredGames.length]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const currentGame = featuredGames[currentIndex] || featuredGames[0];
  if (!currentGame) return null;

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-label="Featured Games Carousel"
      className="relative overflow-hidden rounded-3xl border border-[#242836] bg-[#0d0f15] min-h-[500px] sm:min-h-[560px] md:min-h-[600px] flex flex-col justify-between shadow-2xl focus:outline-none focus:ring-1 focus:ring-[#ff3045]/60 group"
    >
      
      {/* 1. BACKGROUND ARTWORK CROSSFADE */}
      {featuredGames.map((game, idx) => {
        const isActive = idx === currentIndex;
        const bannerSrc = game.screenshots?.[0] || game.heroBanner || game.coverImage;
        return (
          <div
            key={game.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isActive
                ? 'opacity-60 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={bannerSrc}
              alt={game.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                // Fallback to cover or high quality dark gamer image
                (e.target as HTMLImageElement).src = game.coverImage;
              }}
            />
          </div>
        );
      })}

      {/* 2. MULTI-LAYER DARK GRADIENT OVERLAYS FOR 100% TEXT CONTRAST */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/95 md:via-[#0b0c10]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/60 to-black/40 pointer-events-none" />

      {/* 3. TOP META STATUS ROW */}
      <div className="relative z-10 px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        
        {/* SPOTLIGHT BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#15171e]/90 border border-[#242836] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#ff3045] animate-ping" />
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff3045]" />
            Featured Spotlight • Slide {currentIndex + 1} of {featuredGames.length}
          </span>
        </div>

        {/* AUTOPLAY INDICATOR */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-[#9ca3af] bg-[#0b0c10]/80 px-3 py-1 rounded-full border border-[#242836]">
          {isPaused ? (
            <>
              <Pause className="w-3 h-3 text-amber-400" />
              <span>Paused on hover</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#ff3045] fill-current" />
              <span>Auto-playing</span>
            </>
          )}
        </div>

      </div>

      {/* 4. MAIN HERO CONTENT FOR THE CURRENT ACTIVE GAME */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-8 sm:py-12 max-w-3xl space-y-5">
        
        {/* GAME TAGS */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-lg bg-[#ff3045] text-white text-xs font-black uppercase tracking-wider shadow-md shadow-[#ff3045]/30">
            {currentGame.genre}
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-[#15171e]/90 border border-[#242836] text-[#9ca3af] text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm">
            <Monitor className="w-3.5 h-3.5 text-[#ff3045]" />
            <span>PC</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-[#15171e]/90 border border-[#242836] text-amber-400 text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>★ {currentGame.rating.toFixed(1)}</span>
          </span>

          {currentGame.isPreInstalled && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-sm">
              Pre-Installed
            </span>
          )}

          {currentGame.isFree && (
            <span className="px-2.5 py-1 rounded-lg bg-blue-600/90 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-sm">
              100% Free
            </span>
          )}
        </div>

        {/* ACTIVE GAME TITLE */}
        <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-lg">
          {currentGame.title}
        </h1>

        {/* SHORT DESCRIPTION */}
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed max-w-2xl line-clamp-3">
          {currentGame.shortDescription}
        </p>

        {/* METADATA PILLS */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#9ca3af] pt-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#ff3045]" />
            <span>Released: <strong className="text-white font-medium">{currentGame.releaseDate}</strong></span>
          </div>
          <div>
            <span>Developer: <strong className="text-white font-medium">{currentGame.developer}</strong></span>
          </div>
          <div>
            <span>Size: <strong className="text-white font-medium">{currentGame.size}</strong></span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-4 pt-3">
          <a
            href={toPath(`/games/${currentGame.slug}.html`)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/games/${currentGame.slug}.html`);
            }}
            className="px-7 py-3.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-extrabold text-sm tracking-wide flex items-center gap-2.5 transition-all shadow-xl shadow-[#ff3045]/30 hover:shadow-[#ff3045]/50 hover:scale-105 active:scale-95"
          >
            <span>View Game</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={toPath('/games.html')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/games.html');
            }}
            className="px-7 py-3.5 rounded-xl bg-[#15171e]/90 hover:bg-[#202430] text-white font-bold text-sm border border-[#242836] hover:border-[#ff3045]/60 backdrop-blur-md transition-all hover:scale-105"
          >
            Explore Games
          </a>
        </div>

      </div>

      {/* 5. BOTTOM CONTROLS & SLIDE PREVIEWS */}
      <div className="relative z-10 px-6 sm:px-10 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/5 pt-4">
        
        {/* SLIDE INDICATORS (CLICKABLE BARS) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {featuredGames.map((game, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={game.id}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Switch to slide ${i + 1}: ${game.title}`}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-left ${
                  isActive
                    ? 'bg-[#ff3045]/20 border-[#ff3045] text-white'
                    : 'bg-[#15171e]/70 border-[#242836] text-[#9ca3af] hover:text-white hover:border-[#ff3045]/40'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-[#ff3045]' : 'bg-[#6b7280]'
                  }`}
                />
                <span className="text-xs font-bold truncate max-w-[120px] sm:max-w-[150px]">
                  {game.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* PREV / NEXT ARROWS */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handlePrev}
            aria-label="Previous Featured Slide"
            className="p-2.5 rounded-xl bg-[#15171e]/90 border border-[#242836] hover:border-[#ff3045] hover:bg-[#ff3045] text-white transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Featured Slide"
            className="p-2.5 rounded-xl bg-[#15171e]/90 border border-[#242836] hover:border-[#ff3045] hover:bg-[#ff3045] text-white transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
};
