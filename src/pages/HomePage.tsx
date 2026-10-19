import React, { useState } from 'react';
import {
  ArrowRight,
  Flame,
  Clock,
  LayoutGrid,
  Sparkles,
  ChevronDown,
  Layers,
  Compass,
  Zap,
  Download,
  FolderKanban,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { GameItem, COLLECTIONS } from '../data/games';
import { HeroSlider } from '../components/HeroSlider';
import { PreInstalledSection } from '../components/PreInstalledSection';
import { GameCard } from '../components/GameCard';
import { toPath } from '../utils/paths';

interface HomePageProps {
  games: GameItem[];
  wishlistIds: string[];
  onToggleWishlist: (gameId: string) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  games,
  wishlistIds,
  onToggleWishlist,
  onNavigate,
}) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const featuredGames = games.filter((g) => g.isPopular || g.isRecentlyAdded).slice(0, 5);
  const recentlyAddedGames = games.filter((g) => g.isRecentlyAdded).slice(0, 4);
  const popularGames = games.filter((g) => g.isPopular).slice(0, 4);

  const categories = [
    { name: 'Action & Adventure', count: games.filter((g) => g.categories.includes('Action & Adventure')).length, icon: '⚔️' },
    { name: 'FPS', count: games.filter((g) => g.categories.includes('FPS')).length, icon: '🎯' },
    { name: 'Horror', count: games.filter((g) => g.categories.includes('Horror')).length, icon: '👻' },
    { name: 'Racing', count: games.filter((g) => g.categories.includes('Racing')).length, icon: '🏎️' },
    { name: 'RPG', count: games.filter((g) => g.categories.includes('RPG')).length, icon: '🛡️' },
    { name: 'Open World', count: games.filter((g) => g.categories.includes('Open World')).length, icon: '🌍' },
    { name: 'Strategy', count: games.filter((g) => g.categories.includes('Strategy')).length, icon: '♟️' },
    { name: 'Sports', count: games.filter((g) => g.categories.includes('Sports')).length, icon: '⚽' },
    { name: 'Indie', count: games.filter((g) => g.categories.includes('Indie')).length, icon: '🎨' },
  ];

  const quickNavGrid = [
    { title: 'All Games', subtitle: '50+ curated titles', icon: LayoutGrid, path: '/games.html' },
    { title: 'Most Popular', subtitle: 'Top player picks', icon: Flame, path: '/games.html?sort=popular' },
    { title: 'Lightweight PC', subtitle: 'Under 20 GB space', icon: Zap, path: '/games.html?collection=Lightweight%20PC%20Games' },
    { title: 'Categories', subtitle: 'Browse by genre', icon: FolderKanban, path: '/categories.html' },
    { title: 'Curated Lists', subtitle: 'Handpicked themes', icon: Layers, path: '/categories.html#collections' },
    { title: 'Verified Specs', subtitle: 'Hardware checked', icon: ShieldCheck, path: '/about.html' },
  ];

  const faqItems = [
    {
      q: 'Are these PC games free to browse and download?',
      a: 'Gaming Dock connects you directly to verified, authorized platforms including Steam, Epic Games, and official publisher stores. We highlight free-to-play titles as well as authorized download sources so you always download from safe and legitimate origins.',
    },
    {
      q: 'Do I need to install launcher clients to play?',
      a: 'Yes, most major PC games require their official distribution clients such as Steam, Epic Games Launcher, Ubisoft Connect, or the EA App for installation, cloud saves, and automatic game updates.',
    },
    {
      q: 'Where do the download links lead?',
      a: 'Every game detail page features authentic links pointing directly to the official game storefront or developer website. We do not host unauthorized or unverified files.',
    },
    {
      q: 'Do these games work on the Steam Deck or low-end laptops?',
      a: 'Many titles in our catalog are Steam Deck Verified and we have a dedicated "Lightweight PC Games" collection specifically curated for laptops and low-spec systems.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20">
      
      {/* 1. HERO SLIDER */}
      <HeroSlider featuredGames={featuredGames} onNavigate={onNavigate} />

      {/* 2. FREE PRE-INSTALLED GAMES (NO INSTALLER REQUIRED) */}
      <PreInstalledSection
        games={games}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onNavigate={onNavigate}
      />

      {/* 3. RECENTLY ADDED */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#242836] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ff3045]/15 text-[#ff3045]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
                Recently Added
              </h2>
              <p className="text-xs text-[#9ca3af]">Fresh PC titles newly cataloged on Gaming Dock</p>
            </div>
          </div>

          <a
            href={toPath('/games.html?sort=recent')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/games.html?sort=recent');
            }}
            className="text-xs font-semibold text-[#ff3045] hover:text-[#ff4d61] flex items-center gap-1 group transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyAddedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isWishlisted={wishlistIds.includes(game.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectGame={(slug) => onNavigate(`/games/${slug}.html`)}
            />
          ))}
        </div>
      </section>

      {/* 3. POPULAR GAMES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#242836] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ff3045]/15 text-[#ff3045]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
                Popular Games
              </h2>
              <p className="text-xs text-[#9ca3af]">Top rated player favorites and modern classics</p>
            </div>
          </div>

          <a
            href={toPath('/games.html?sort=popular')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/games.html?sort=popular');
            }}
            className="text-xs font-semibold text-[#ff3045] hover:text-[#ff4d61] flex items-center gap-1 group transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isWishlisted={wishlistIds.includes(game.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectGame={(slug) => onNavigate(`/games/${slug}.html`)}
            />
          ))}
        </div>
      </section>

      {/* 4. BROWSE BY CATEGORY CHIPS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#242836] pb-4">
          <div className="p-2 rounded-xl bg-[#ff3045]/15 text-[#ff3045]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
              Browse by Category
            </h2>
            <p className="text-xs text-[#9ca3af]">Find games tailored to your preferred genre</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onNavigate(`/games.html?category=${encodeURIComponent(cat.name)}`)}
              className="p-4 rounded-xl bg-[#15171e] border border-[#242836] hover:border-[#ff3045] hover:bg-[#1a1d26] transition-all flex flex-col justify-between group text-left hover:glow-red-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#0b0c10] text-[#9ca3af] border border-[#242836] group-hover:border-[#ff3045]/40 group-hover:text-white transition-colors">
                  {cat.count}
                </span>
              </div>
              <div className="mt-3">
                <h4 className="font-heading font-bold text-sm text-white group-hover:text-[#ff3045] transition-colors truncate">
                  {cat.name}
                </h4>
                <span className="text-[11px] text-[#6b7280]">View catalog</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. QUICK NAVIGATION GRID (Blueprint: All Games, Most Popular, Under 1GB/Lightweight, etc.) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12141c] to-[#151722] border border-[#242836] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Quick Discovery Hub</h3>
            <p className="text-xs text-[#9ca3af]">Jump straight into specific catalogs and filters</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickNavGrid.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => onNavigate(item.path)}
                className="p-4 rounded-xl bg-[#0b0c10]/80 border border-[#242836] hover:border-[#ff3045] transition-all text-left group hover:scale-[1.02]"
              >
                <div className="p-2 rounded-lg bg-[#15171e] text-[#ff3045] w-fit mb-3 group-hover:bg-[#ff3045] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="font-heading font-bold text-xs text-white group-hover:text-[#ff3045] transition-colors truncate">
                  {item.title}
                </h5>
                <p className="text-[10px] text-[#6b7280] truncate mt-0.5">
                  {item.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. FEATURED BANNER (Blueprint: FREE PC GAMES / Get Launcher) */}
      <section className="relative overflow-hidden rounded-3xl border border-[#ff3045]/30 bg-gradient-to-r from-[#170e12] via-[#151722] to-[#0e1017] p-8 sm:p-12 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
          <img
            src="https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg"
            alt="Gaming visual"
            className="w-full h-full object-cover object-left"
          />
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff3045] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Collections
          </span>

          <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white">
            EXPLORE CURATED COLLECTIONS
          </h2>

          <p className="text-sm text-[#9ca3af] leading-relaxed">
            From sweeping open worlds like Grand Theft Auto V and Red Dead Redemption 2, to lightweight gems that run effortlessly on any laptop, discover titles built for your machine.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/categories.html#collections')}
              className="px-6 py-3 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ff3045]/20 transition-all hover:scale-105"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('/games.html?collection=Lightweight%20PC%20Games')}
              className="px-6 py-3 rounded-xl bg-[#15171e] hover:bg-[#202430] text-white font-semibold text-xs border border-[#242836] transition-all"
            >
              Lightweight PC Games
            </button>
          </div>
        </div>
      </section>

      {/* 7. FAQ PREVIEW */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#242836] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ff3045]/15 text-[#ff3045]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#9ca3af]">Quick answers to common questions about Gaming Dock</p>
            </div>
          </div>

          <a
            href={toPath('/faq.html')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/faq.html');
            }}
            className="text-xs font-semibold text-[#ff3045] hover:text-[#ff4d61] flex items-center gap-1 group transition-colors"
          >
            <span>View all FAQs</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="space-y-3 max-w-4xl">
          {faqItems.map((item, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[#242836] bg-[#15171e] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#1a1d26] transition-colors"
                >
                  <span className="font-heading font-semibold text-sm sm:text-base text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#9ca3af] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#ff3045]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#9ca3af] leading-relaxed border-t border-[#242836]/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
