import React from 'react';
import { ArrowRight, Layers, Sparkles, Compass, Flame } from 'lucide-react';
import { GameItem, COLLECTIONS } from '../data/games';

interface CategoriesPageProps {
  games: GameItem[];
  onNavigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ games, onNavigate }) => {
  const categoryList = [
    {
      name: 'Action & Adventure',
      desc: 'Thrilling journeys, cinematic combat, and epic blockbusters.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1817070/header.jpg',
      count: games.filter((g) => g.categories.includes('Action & Adventure')).length,
    },
    {
      name: 'Open World',
      desc: 'Endless horizons, freedom to roam, and dynamic living environments.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
      count: games.filter((g) => g.categories.includes('Open World')).length,
    },
    {
      name: 'RPG',
      desc: 'Rich character progression, choices that matter, and deep lore.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
      count: games.filter((g) => g.categories.includes('RPG')).length,
    },
    {
      name: 'FPS',
      desc: 'First-person shooters, high-velocity tactical gunplay, and intense campaigns.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/782330/header.jpg',
      count: games.filter((g) => g.categories.includes('FPS')).length,
    },
    {
      name: 'Racing',
      desc: 'Hypercars, precision rally stages, and street racing rivalries.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg',
      count: games.filter((g) => g.categories.includes('Racing')).length,
    },
    {
      name: 'Horror',
      desc: 'Bone-chilling atmosphere, survival instincts, and psychological tension.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg',
      count: games.filter((g) => g.categories.includes('Horror')).length,
    },
    {
      name: 'Strategy',
      desc: 'Turn-based tactical masterminds, 4X empire builders, and historic RTS.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg',
      count: games.filter((g) => g.categories.includes('Strategy')).length,
    },
    {
      name: 'Sports',
      desc: 'World football, motorsport championships, and competitive vehicular sports.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2195250/header.jpg',
      count: games.filter((g) => g.categories.includes('Sports')).length,
    },
    {
      name: 'Indie',
      desc: 'Artistic passion projects, rogue-likes, and memorable creative gems.',
      banner: 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg',
      count: games.filter((g) => g.categories.includes('Indie')).length,
    },
  ];

  return (
    <div className="space-y-16 animate-fadeIn">
      
      {/* HEADER */}
      <div className="space-y-3 border-b border-[#242836] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff3045]">
          <Compass className="w-3.5 h-3.5" />
          <span>Genre Taxonomy</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          Browse Categories
        </h1>
        <p className="text-sm text-[#9ca3af] max-w-2xl leading-relaxed">
          Navigate through our curated catalog by game genre. Each category compiles verified titles with complete hardware performance profiles and official download destinations.
        </p>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryList.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onNavigate(`/games.html?category=${encodeURIComponent(cat.name)}`)}
            className="group relative rounded-2xl overflow-hidden bg-[#15171e] border border-[#242836] hover:border-[#ff3045] transition-all cursor-pointer shadow-xl flex flex-col justify-between hover:glow-red-sm hover:-translate-y-1"
          >
            {/* BACKGROUND PREVIEW */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0b0c10]">
              <img
                src={cat.banner}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-[#15171e]/50 to-transparent" />
              
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white">
                {cat.count} {cat.count === 1 ? 'Game' : 'Games'}
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#ff3045] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#9ca3af] mt-1 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-semibold text-[#ff3045]">
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CURATED COLLECTIONS */}
      <div id="collections" className="space-y-6 pt-6 border-t border-[#242836]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#ff3045]/15 text-[#ff3045]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
              Curated Collections
            </h2>
            <p className="text-xs text-[#9ca3af]">Handpicked themes designed for specific play styles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate(`/games.html?collection=${encodeURIComponent(col.filter)}`)}
              className="group p-5 rounded-2xl bg-[#15171e] border border-[#242836] hover:border-[#ff3045] transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:glow-red-sm"
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-[#0b0c10]">
                <img
                  src={col.cover}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-white group-hover:text-[#ff3045] transition-colors">
                  {col.title}
                </h4>
                <p className="text-xs text-[#9ca3af] mt-1 line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#ff3045]">
                <span>View Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
