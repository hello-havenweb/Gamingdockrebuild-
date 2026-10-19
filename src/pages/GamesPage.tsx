import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { GameItem, CATEGORIES } from '../data/games';
import { GameCard } from '../components/GameCard';

interface GamesPageProps {
  games: GameItem[];
  wishlistIds: string[];
  onToggleWishlist: (gameId: string) => void;
  onNavigate: (path: string) => void;
  initialSearch?: string;
  initialCategory?: string;
  initialCollection?: string;
  initialSort?: string;
  initialType?: string;
}

export const GamesPage: React.FC<GamesPageProps> = ({
  games,
  wishlistIds,
  onToggleWishlist,
  onNavigate,
  initialSearch = '',
  initialCategory = 'All',
  initialCollection = '',
  initialSort = 'popular',
  initialType = 'all',
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState(initialSort);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Sync state if props change (e.g. navigation query changes)
  useEffect(() => {
    if (initialSearch !== undefined) setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (initialCategory !== undefined) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialCollection !== undefined) setSelectedCollection(initialCollection);
  }, [initialCollection]);

  useEffect(() => {
    if (initialSort !== undefined) setSortBy(initialSort);
  }, [initialSort]);

  // Reset pagination when filters change
  useEffect(() => {
    setItemsToShow(12);
  }, [search, selectedCategory, selectedCollection, sortBy]);

  // Filter & Sort Logic
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchGenre = game.genre.toLowerCase().includes(q);
          const matchDev = game.developer.toLowerCase().includes(q);
          const matchTag = game.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchGenre && !matchDev && !matchTag) return false;
        }

        // Category
        if (selectedCategory && selectedCategory !== 'All') {
          if (!game.categories.includes(selectedCategory) && game.genre !== selectedCategory) {
            return false;
          }
        }

        // Collection
        if (selectedCollection) {
          if (game.collection !== selectedCollection) {
            // Also check lightweight flag
            if (selectedCollection === 'Lightweight PC Games' && !game.isLightweight) {
              return false;
            }
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'az') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'za') {
          return b.title.localeCompare(a.title);
        }
        if (sortBy === 'recent') {
          return (b.isRecentlyAdded ? 1 : 0) - (a.isRecentlyAdded ? 1 : 0);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // Default: Popularity (popular first, then review count)
        const popA = (a.isPopular ? 100000 : 0) + a.reviewCount;
        const popB = (b.isPopular ? 100000 : 0) + b.reviewCount;
        return popB - popA;
      });
  }, [games, search, selectedCategory, selectedCollection, sortBy]);

  const visibleGames = filteredGames.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredGames.length;

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedCollection('');
    setSortBy('popular');
  };

  const isFiltered = search !== '' || selectedCategory !== 'All' || selectedCollection !== '';

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="space-y-3 border-b border-[#242836] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff3045]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated PC Database</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          Explore All Games
        </h1>
        <p className="text-sm text-[#9ca3af] max-w-2xl leading-relaxed">
          Discover 50+ amazing PC titles across open-world adventures, competitive shooters, immersive RPGs, and lightweight gems with verified hardware requirements.
        </p>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="space-y-4">
        
        {/* TOP ROW: SEARCH & SORT */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* SEARCH INPUT */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, genre, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-[#15171e] border border-[#242836] rounded-xl text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045] focus:ring-1 focus:ring-[#ff3045] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* SORT DROPDOWN & ACTIVE COUNT */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="text-xs text-[#9ca3af]">
              Showing <span className="text-white font-semibold">{visibleGames.length}</span> of{' '}
              <span className="text-white font-semibold">{filteredGames.length}</span>
            </div>

            <div className="relative flex items-center">
              <label htmlFor="sort-select" className="sr-only">Sort Games</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-[#15171e] border border-[#242836] rounded-xl text-xs sm:text-sm font-medium text-white focus:outline-none focus:border-[#ff3045] cursor-pointer"
              >
                <option value="popular">Sort: Popularity</option>
                <option value="rating">Sort: Highest Rating</option>
                <option value="recent">Sort: Recently Added</option>
                <option value="az">Sort: Alphabetical A–Z</option>
                <option value="za">Sort: Alphabetical Z–A</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#9ca3af] absolute right-2.5 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-[#ff3045] border-[#ff3045] text-white shadow-lg shadow-[#ff3045]/20'
                    : 'bg-[#15171e] border-[#242836] text-[#9ca3af] hover:text-white hover:border-[#ff3045]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}

          {isFiltered && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-[#ff3045] hover:bg-[#ff3045]/10 border border-transparent hover:border-[#ff3045]/30 whitespace-nowrap transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* ACTIVE COLLECTION BANNER (IF FILTERED BY COLLECTION) */}
        {selectedCollection && (
          <div className="p-3 rounded-xl bg-[#ff3045]/10 border border-[#ff3045]/30 flex items-center justify-between text-xs">
            <span className="text-white">
              Filtering collection: <strong className="text-[#ff3045]">{selectedCollection}</strong>
            </span>
            <button
              onClick={() => setSelectedCollection('')}
              className="text-[#9ca3af] hover:text-white flex items-center gap-1 font-semibold"
            >
              <span>Remove</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* GAME CARDS GRID */}
      {visibleGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isWishlisted={wishlistIds.includes(game.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectGame={(slug) => onNavigate(`/games/${slug}.html`)}
            />
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="p-12 text-center rounded-2xl bg-[#15171e] border border-[#242836] space-y-4 max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-full bg-[#0b0c10] border border-[#242836] flex items-center justify-center mx-auto text-[#ff3045]">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-white">No games found</h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              We couldn't find any games matching "{search || selectedCategory}". Try adjusting your query or resetting all filters.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white text-xs font-bold transition-all shadow-md shadow-[#ff3045]/20"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* LOAD MORE CONTROL */}
      {hasMore && (
        <div className="pt-8 text-center">
          <button
            onClick={() => setItemsToShow((prev) => prev + 12)}
            className="px-8 py-3.5 rounded-xl bg-[#15171e] hover:bg-[#ff3045] text-white text-xs font-bold border border-[#242836] hover:border-[#ff3045] transition-all duration-200 inline-flex items-center gap-2 hover:glow-red-sm"
          >
            <span>Load More Games</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-[#6b7280] mt-2">
            Showing {visibleGames.length} of {filteredGames.length} games
          </p>
        </div>
      )}

    </div>
  );
};
