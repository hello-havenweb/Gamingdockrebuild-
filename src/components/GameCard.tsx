import React from 'react';
import { Heart, Monitor, Star, ArrowRight, Download, HardDrive } from 'lucide-react';
import { GameItem } from '../data/games';
import { toPath } from '../utils/paths';

interface GameCardProps {
  game: GameItem;
  isWishlisted: boolean;
  onToggleWishlist: (gameId: string) => void;
  onSelectGame: (gameSlug: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isWishlisted,
  onToggleWishlist,
  onSelectGame,
}) => {
  return (
    <div className="group relative bg-[#15171e] rounded-2xl border border-[#242836] hover:border-[#ff3045] overflow-hidden flex flex-col game-card-transition hover:glow-red-sm">
      
      {/* COVER ART CONTAINER */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0e1017]">
        <img
          src={game.coverImage}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-black/30 pointer-events-none" />

        {/* PLATFORM & PRE-INSTALLED BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0b0c10]/85 backdrop-blur-md border border-[#242836] text-[11px] font-semibold text-white tracking-wide">
            <Monitor className="w-3 h-3 text-[#ff3045]" />
            <span>PC</span>
          </div>
          {game.isPreInstalled && (
            <span className="px-2 py-0.5 rounded-md bg-[#ff3045] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md shadow-[#ff3045]/40 animate-pulse-subtle">
              Pre-Installed
            </span>
          )}
          {game.isFree && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-sm">
              Free
            </span>
          )}
        </div>

        {/* WISHLIST TOGGLE */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(game.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
            isWishlisted
              ? 'bg-[#ff3045] border-[#ff3045] text-white'
              : 'bg-[#0b0c10]/80 border-[#242836] text-[#9ca3af] hover:text-white hover:border-[#ff3045]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-white' : ''}`} />
        </button>

        {/* RATING & NO INSTALLER BADGE */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-xs font-semibold text-amber-400">
            <Star className="w-3 h-3 fill-current" />
            <span>{game.rating.toFixed(1)}</span>
          </div>
          {game.installerRequired === false && (
            <span className="text-[9px] font-bold text-white bg-black/80 backdrop-blur-md border border-[#242836] px-2 py-0.5 rounded-md uppercase tracking-wide">
              No Installer Required
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#ff3045] mb-1">
            {game.genre}
          </div>
          <h3 className="font-heading font-bold text-base text-white group-hover:text-[#ff3045] transition-colors line-clamp-1">
            {game.title}
          </h3>
          <p className="text-xs text-[#9ca3af] line-clamp-2 mt-1 leading-relaxed">
            {game.shortDescription}
          </p>
        </div>

        {/* FOOTER ACTION */}
        <div className="pt-2 border-t border-[#242836]/60 flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#9ca3af] flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-[#ff3045]" />
            {game.size}
          </span>

          <a
            href={toPath(`/games/${game.slug}.html`)}
            onClick={(e) => {
              e.preventDefault();
              onSelectGame(game.slug);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202430] hover:bg-[#ff3045] text-xs font-semibold text-white transition-all group-hover:glow-red-sm"
          >
            {game.isPreInstalled ? (
              <span className="inline-flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <span>View Game</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </a>
        </div>

      </div>
    </div>
  );
};
