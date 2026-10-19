import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Calendar,
  Building,
  Monitor,
  HardDrive,
  Cpu,
  Layers,
  Star,
  ShieldCheck,
  Check,
  AlertCircle,
  Eye,
  Zap,
} from 'lucide-react';
import { GameItem, GAMES } from '../data/games';
import { GameCard } from '../components/GameCard';
import { Lightbox } from '../components/Lightbox';
import { ShareModal } from '../components/ShareModal';
import { toPath } from '../utils/paths';

interface GameDetailPageProps {
  game: GameItem;
  wishlistIds: string[];
  onToggleWishlist: (gameId: string) => void;
  onNavigate: (path: string) => void;
}

export const GameDetailPage: React.FC<GameDetailPageProps> = ({
  game,
  wishlistIds,
  onToggleWishlist,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'screenshots' | 'requirements' | 'related'>('about');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isWishlisted = wishlistIds.includes(game.id);

  // Related games
  const relatedGames = GAMES.filter((g) => game.relatedIds.includes(g.id) || (g.genre === game.genre && g.id !== game.id)).slice(0, 4);

  const openScreenshot = (idx: number) => {
    setCurrentScreenshotIndex(idx);
    setLightboxOpen(true);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://hello-havenweb.github.io${toPath(`/games/${game.slug}.html`)}`;

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242836] pb-4 text-xs text-[#9ca3af]">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={toPath('/')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-white transition-colors"
          >
            Home
          </a>
          <span>&gt;</span>
          <a
            href={toPath('/games.html')}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/games.html');
            }}
            className="hover:text-white transition-colors"
          >
            Games
          </a>
          <span>&gt;</span>
          <a
            href={toPath(`/games.html?category=${encodeURIComponent(game.genre)}`)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/games.html?category=${encodeURIComponent(game.genre)}`);
            }}
            className="hover:text-white transition-colors"
          >
            {game.genre}
          </a>
          <span>&gt;</span>
          <span className="text-white font-medium truncate max-w-xs">{game.title}</span>
        </div>

        <button
          onClick={() => onNavigate('/games.html')}
          className="flex items-center gap-1.5 font-semibold text-[#ff3045] hover:text-[#ff4d61] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Games</span>
        </button>
      </div>

      {/* 2. GAME HERO CARD */}
      <div className="relative rounded-3xl overflow-hidden bg-[#15171e] border border-[#242836] shadow-2xl">
        
        {/* HORIZONTAL BANNER BACKDROP WITH VIGNETTE */}
        <div className="absolute inset-0 h-72 sm:h-80 w-full overflow-hidden opacity-30 pointer-events-none">
          <img
            src={game.heroBanner || game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#15171e]/80 to-[#15171e]" />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          
          {/* COVER POSTER */}
          <div className="w-48 sm:w-56 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#242836] shadow-2xl bg-[#0b0c10] self-center md:self-start">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* GAME DETAILS & ACTIONS */}
          <div className="flex-1 space-y-4">
            
            {/* TAGS ROW */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#ff3045] text-white text-[11px] font-bold uppercase tracking-wider">
                {game.genre}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#0b0c10] border border-[#242836] text-[#9ca3af] text-[11px] font-semibold flex items-center gap-1.5">
                <Monitor className="w-3 h-3 text-[#ff3045]" />
                {game.platform}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#0b0c10] border border-[#242836] text-amber-400 text-[11px] font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {game.rating.toFixed(1)} ({game.reviewCount.toLocaleString()} reviews)
              </span>

              {game.isPreInstalled && (
                <span className="px-2.5 py-1 rounded-md bg-[#ff3045] text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md shadow-[#ff3045]/30">
                  <Zap className="w-3 h-3 fill-current" />
                  Pre-Installed
                </span>
              )}

              {game.installerRequired === false && (
                <span className="px-2.5 py-1 rounded-md bg-[#1b1f2b] border border-[#2e3447] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  No Installer Required
                </span>
              )}

              {game.isFree && (
                <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-extrabold uppercase tracking-wider">
                  100% Free
                </span>
              )}
            </div>

            {/* TITLE & DEVELOPER */}
            <div>
              <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {game.title}
              </h1>
              <p className="text-sm text-[#9ca3af] mt-1">
                Developed by <span className="text-white font-medium">{game.developer}</span> • Published by <span className="text-white font-medium">{game.publisher}</span>
              </p>
            </div>

            {/* PITCH */}
            <p className="text-sm text-[#9ca3af] leading-relaxed max-w-2xl">
              {game.shortDescription}
            </p>

            {/* ACTION BUTTONS (Download Now, Add to Wishlist, Share) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {game.downloadStatus === 'available' && game.downloadUrl ? (
                <a
                  href={game.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-[#ff3045]/25 hover:shadow-[#ff3045]/40 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>{game.isPreInstalled ? 'Download Pre-Installed' : 'Download Now'}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
                </a>
              ) : (
                <div className="px-6 py-3.5 rounded-xl bg-[#242836] text-[#9ca3af] font-semibold text-xs flex items-center gap-2 cursor-not-allowed">
                  <AlertCircle className="w-4 h-4" />
                  <span>Download Link Unavailable</span>
                </div>
              )}

              <button
                onClick={() => onToggleWishlist(game.id)}
                className={`px-5 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${
                  isWishlisted
                    ? 'bg-[#ff3045]/20 border-[#ff3045] text-[#ff3045]'
                    : 'bg-[#15171e] border-[#242836] hover:border-[#ff3045] text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#ff3045]' : ''}`} />
                <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={() => setShareModalOpen(true)}
                className="p-3.5 rounded-xl bg-[#15171e] border border-[#242836] hover:border-white text-[#9ca3af] hover:text-white transition-colors"
                aria-label="Share Game"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {game.officialUrl && (
                <a
                  href={game.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#9ca3af] hover:text-white underline underline-offset-4 ml-2"
                >
                  Official Site
                </a>
              )}
            </div>

            {/* AUTHORIZED DISTRIBUTION NOTE */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#6b7280]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff3045]" />
              <span>Direct authorized destination: {game.distributionSource}</span>
            </div>

          </div>

        </div>

        {/* METADATA BAR (Release, Developer, Storage, Platform) */}
        <div className="border-t border-[#242836] bg-[#0f1118] px-6 sm:px-10 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#6b7280] block text-[10px] uppercase font-semibold">Release Date</span>
            <span className="text-white font-medium">{game.releaseDate}</span>
          </div>
          <div>
            <span className="text-[#6b7280] block text-[10px] uppercase font-semibold">Storage Space</span>
            <span className="text-white font-medium">{game.size}</span>
          </div>
          <div>
            <span className="text-[#6b7280] block text-[10px] uppercase font-semibold">Platform</span>
            <span className="text-white font-medium">{game.platform}</span>
          </div>
          <div>
            <span className="text-[#6b7280] block text-[10px] uppercase font-semibold">Developer</span>
            <span className="text-white font-medium truncate block">{game.developer}</span>
          </div>
        </div>

      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="border-b border-[#242836] flex items-center gap-6 text-sm font-semibold overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('about')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'about'
              ? 'border-[#ff3045] text-white font-bold glow-red-sm'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          About This Game
        </button>

        <button
          onClick={() => setActiveTab('screenshots')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'screenshots'
              ? 'border-[#ff3045] text-white font-bold glow-red-sm'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          <span>Screenshots</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#202430] text-[#9ca3af]">
            {game.screenshots.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'requirements'
              ? 'border-[#ff3045] text-white font-bold glow-red-sm'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          System Requirements
        </button>

        <button
          onClick={() => setActiveTab('related')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'related'
              ? 'border-[#ff3045] text-white font-bold glow-red-sm'
              : 'border-transparent text-[#9ca3af] hover:text-white'
          }`}
        >
          Related Games
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="min-h-[300px]">
        
        {/* TAB 1: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#15171e] border border-[#242836] space-y-4">
              <h3 className="font-heading font-bold text-xl text-white">Game Overview</h3>
              <p className="text-sm text-[#9ca3af] leading-relaxed whitespace-pre-line">
                {game.fullDescription}
              </p>
            </div>

            {/* KEY TAGS */}
            <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
              <h4 className="font-heading font-semibold text-sm text-white uppercase tracking-wider">
                Genres & Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-[#0b0c10] border border-[#242836] text-xs text-[#9ca3af]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* DISCLAIMER BOX */}
            <div className="p-5 rounded-2xl bg-[#0e1017] border border-[#242836] text-xs text-[#9ca3af] space-y-1">
              <span className="font-bold text-white block">Distribution & Safety Notice:</span>
              <p>
                Gaming Dock curates and provides direct links to authorized distribution platforms ({game.distributionSource}). Availability, pricing, regional accessibility, and hardware performance may vary depending on updates by the game publisher.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: SCREENSHOTS GALLERY */}
        {activeTab === 'screenshots' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#9ca3af]">
              <span>Click on any screenshot to open the high-res interactive lightbox.</span>
              <span>{game.screenshots.length} Images</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {game.screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  onClick={() => openScreenshot(idx)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-[#242836] hover:border-[#ff3045] bg-[#0b0c10] cursor-pointer shadow-lg transition-all hover:scale-[1.02]"
                >
                  <img
                    src={shot}
                    alt={`${game.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="p-2.5 rounded-full bg-[#ff3045] text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM REQUIREMENTS */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* MINIMUM */}
              <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-4">
                <div className="flex items-center justify-between border-b border-[#242836] pb-3">
                  <h4 className="font-heading font-bold text-lg text-white">
                    Minimum Requirements
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] px-2 py-0.5 rounded bg-[#0b0c10]">
                    Baseline Spec
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Operating System:</span>
                    <span className="text-white font-medium">{game.requirements.minimum.os}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Processor (CPU):</span>
                    <span className="text-white font-medium">{game.requirements.minimum.processor}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Memory (RAM):</span>
                    <span className="text-white font-medium">{game.requirements.minimum.memory}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Graphics Card (GPU):</span>
                    <span className="text-white font-medium">{game.requirements.minimum.graphics}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Storage Space:</span>
                    <span className="text-white font-medium">{game.requirements.minimum.storage}</span>
                  </div>
                </div>
              </div>

              {/* RECOMMENDED */}
              <div className="p-6 rounded-2xl bg-[#15171e] border border-[#ff3045]/40 space-y-4 shadow-lg shadow-[#ff3045]/5">
                <div className="flex items-center justify-between border-b border-[#242836] pb-3">
                  <h4 className="font-heading font-bold text-lg text-white">
                    Recommended Requirements
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3045] px-2 py-0.5 rounded bg-[#ff3045]/15">
                    Optimal Experience
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Operating System:</span>
                    <span className="text-white font-medium">{game.requirements.recommended.os}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Processor (CPU):</span>
                    <span className="text-white font-medium">{game.requirements.recommended.processor}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Memory (RAM):</span>
                    <span className="text-white font-medium">{game.requirements.recommended.memory}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Graphics Card (GPU):</span>
                    <span className="text-white font-medium">{game.requirements.recommended.graphics}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block font-semibold mb-0.5">Storage Space:</span>
                    <span className="text-white font-medium">{game.requirements.recommended.storage}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: RELATED GAMES */}
        {activeTab === 'related' && (
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-xl text-white">
              More games like {game.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedGames.map((rel) => (
                <GameCard
                  key={rel.id}
                  game={rel}
                  isWishlisted={wishlistIds.includes(rel.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectGame={(slug) => onNavigate(`/games/${slug}.html`)}
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 5. LIGHTBOX MODAL */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={game.screenshots}
        currentIndex={currentScreenshotIndex}
        onSelectIndex={setCurrentScreenshotIndex}
        title={game.title}
      />

      {/* 6. SHARE MODAL */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={game.title}
        url={shareUrl}
      />

    </div>
  );
};
