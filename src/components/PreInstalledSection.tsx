import React, { useState, useMemo } from 'react';
import {
  Download,
  FolderArchive,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { GameItem } from '../data/games';
import { GameCard } from './GameCard';

interface PreInstalledSectionProps {
  games: GameItem[];
  wishlistIds: string[];
  onToggleWishlist: (gameId: string) => void;
  onNavigate: (path: string) => void;
}

export const PreInstalledSection: React.FC<PreInstalledSectionProps> = ({
  games,
  wishlistIds,
  onToggleWishlist,
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Filter only games that are verified pre-installed
  const preInstalledGames = useMemo(() => {
    return games.filter((g) => g.isPreInstalled === true);
  }, [games]);

  // Extract categories for tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    preInstalledGames.forEach((g) => {
      set.add(g.genre);
    });
    return ['All', ...Array.from(set)];
  }, [preInstalledGames]);

  const displayedGames = useMemo(() => {
    if (selectedFilter === 'All') return preInstalledGames;
    return preInstalledGames.filter((g) => g.genre === selectedFilter);
  }, [preInstalledGames, selectedFilter]);

  if (preInstalledGames.length === 0) return null;

  return (
    <section className="relative rounded-3xl bg-gradient-to-b from-[#141620] via-[#10121a] to-[#0c0e14] border-2 border-[#ff3045]/40 p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8 overflow-hidden">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff3045]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#242836] pb-6">
        
        <div className="space-y-3 max-w-2xl">
          {/* BADGES ROW */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff3045] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md shadow-[#ff3045]/30">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>READY TO PLAY</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1f2b] border border-[#2e3447] text-white text-[11px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>NO INSTALLER REQUIRED</span>
            </div>
          </div>

          {/* TITLE & SUBTITLE */}
          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            FREE PRE-INSTALLED GAMES
          </h2>

          <p className="font-heading font-bold text-base sm:text-lg text-[#ff3045]">
            “Download, Extract & Play — Simple PC Gaming.”
          </p>

          <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
            These verified PC games are packaged in ready-to-run standalone formats. No setup wizards, no bloatware, and no background installers required—unpack the game folder and launch the executable immediately.
          </p>
        </div>

        {/* TRUST BADGE CALLOUT */}
        <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 bg-[#0b0c10]/70 p-3.5 rounded-2xl border border-[#242836]">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-[#ff3045]" />
            <span>100% Free & Standalone</span>
          </div>
          <span className="text-[11px] text-[#6b7280]">
            {preInstalledGames.length} Verified Portable Titles
          </span>
        </div>

      </div>

      {/* CATEGORY FILTER TABS */}
      {categories.length > 2 && (
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const active = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-[#ff3045] border-[#ff3045] text-white shadow-lg shadow-[#ff3045]/25 scale-105'
                    : 'bg-[#15171e] border-[#242836] text-[#9ca3af] hover:text-white hover:border-[#ff3045]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* GAMES GRID */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {displayedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isWishlisted={wishlistIds.includes(game.id)}
            onToggleWishlist={onToggleWishlist}
            onSelectGame={(slug) => onNavigate(`/games/${slug}.html`)}
          />
        ))}
      </div>

      {/* HOW TO RUN INSTRUCTIONS FOOTER */}
      <div className="relative z-10 pt-4 border-t border-[#242836]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <FolderArchive className="w-4 h-4 text-[#ff3045] shrink-0" />
          <span>Quick Guide: 1. Download zip &gt; 2. Extract folder &gt; 3. Run the primary .exe file to play.</span>
        </div>

        <button
          onClick={() => onNavigate('/games.html?category=Indie')}
          className="text-xs font-bold text-white hover:text-[#ff3045] flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
        >
          <span>View More Lightweight Titles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </section>
  );
};
