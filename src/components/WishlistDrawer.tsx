import React from 'react';
import { X, Heart, Trash2, ArrowRight, ExternalLink } from 'lucide-react';
import { GameItem } from '../data/games';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistGames: GameItem[];
  onRemove: (gameId: string) => void;
  onClear: () => void;
  onSelectGame: (gameSlug: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistGames,
  onRemove,
  onClear,
  onSelectGame,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fadeIn">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* DRAWER PANEL */}
      <div className="relative w-full max-w-md bg-[#11131a] border-l border-[#242836] h-full shadow-2xl flex flex-col z-10">
        
        {/* HEADER */}
        <div className="p-5 border-b border-[#242836] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#ff3045]/15 text-[#ff3045]">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Your Wishlist</h3>
              <p className="text-xs text-[#9ca3af]">
                Saved locally on your device ({wishlistGames.length} {wishlistGames.length === 1 ? 'game' : 'games'})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Wishlist"
            className="p-2 rounded-xl bg-[#15171e] text-[#9ca3af] hover:text-white border border-[#242836] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlistGames.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#15171e] border border-[#242836] flex items-center justify-center text-[#6b7280]">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-base text-white">Your wishlist is empty</h4>
                <p className="text-xs text-[#9ca3af] max-w-xs">
                  Click the heart icon on any game card to bookmark games you want to play later.
                </p>
              </div>
            </div>
          ) : (
            wishlistGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#15171e] border border-[#242836] hover:border-[#ff3045]/50 transition-all group"
              >
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-14 h-18 object-cover rounded-lg bg-[#0b0c10] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3045]">
                    {game.genre}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-white truncate group-hover:text-[#ff3045] transition-colors">
                    {game.title}
                  </h4>
                  <p className="text-xs text-[#9ca3af]">{game.size} • ★ {game.rating}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectGame(game.slug);
                      }}
                      className="text-xs font-semibold text-white hover:text-[#ff3045] flex items-center gap-1 transition-colors"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    {game.downloadUrl && (
                      <a
                        href={game.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#9ca3af] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <span>Store</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onRemove(game.id)}
                  aria-label={`Remove ${game.title} from wishlist`}
                  className="p-2 text-[#6b7280] hover:text-[#ff3045] hover:bg-[#202430] rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {wishlistGames.length > 0 && (
          <div className="p-5 border-t border-[#242836] bg-[#0d0f15] flex items-center justify-between gap-4">
            <button
              onClick={onClear}
              className="text-xs font-semibold text-[#9ca3af] hover:text-[#ff3045] transition-colors"
            >
              Clear All
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-xs transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
