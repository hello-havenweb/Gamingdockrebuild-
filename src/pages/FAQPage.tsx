import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, ChevronDown, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  q: string;
  a: string;
}

export const FAQPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIds, setOpenIds] = useState<string[]>(['nav-1', 'down-1']);

  const faqs: FAQItem[] = [
    {
      id: 'gen-1',
      category: 'General',
      q: 'What is GAMING DOCK?',
      a: 'Gaming Dock is a dedicated PC gaming discovery and hardware compatibility hub. We catalog top PC titles, verify both minimum and recommended hardware specifications, showcase high-definition in-game screenshots, and link directly to authorized digital storefronts.',
    },
    {
      id: 'gen-2',
      category: 'General',
      q: 'Do I need an account to browse games or use the wishlist?',
      a: 'No! Gaming Dock does not require accounts, logins, or user tracking. Your game wishlist is saved directly in your browser\'s local storage on your device.',
    },
    {
      id: 'down-1',
      category: 'Downloads',
      q: 'Where do the "Download Now" buttons lead?',
      a: 'Every "Download Now" button links to verified, authorized digital platforms—such as the official Steam Store, Epic Games Store, Xbox/Microsoft Store, or the game publisher\'s official website. We do not host raw executable files or unverified mirror links.',
    },
    {
      id: 'down-2',
      category: 'Downloads',
      q: 'Why does a game say "Download Link Unavailable"?',
      a: 'If a legitimate storefront or official purchase page is currently unavailable, retired, or temporarily restricted by the publisher, we display "Download Link Unavailable" rather than directing you to unverified third-party sources.',
    },
    {
      id: 'down-3',
      category: 'Downloads',
      q: 'Are these games free?',
      a: 'Our catalog contains both premier premium PC games (such as Cyberpunk 2077, God of War, and Elden Ring) and free-to-play titles. Each game detail page links directly to the authorized distribution page where you can check current pricing or free access.',
    },
    {
      id: 'specs-1',
      category: 'Hardware Specs',
      q: 'How are system requirements verified?',
      a: 'Hardware specifications (CPU, RAM, GPU, OS, and required disk space) are sourced directly from official publisher technical sheets and verified benchmark notes to ensure realistic expectations for your rig.',
    },
    {
      id: 'specs-2',
      category: 'Hardware Specs',
      q: 'Will these games work on my everyday laptop or low-end PC?',
      a: 'Check our "Lightweight PC Games" collection. These titles (such as Celeste, Terraria, Hades, and Stardew Valley) have low CPU and memory footprints and can run smoothly on standard laptops and integrated graphics chips.',
    },
    {
      id: 'specs-3',
      category: 'Hardware Specs',
      q: 'Do these games support the Steam Deck?',
      a: 'Many titles in our catalog are Steam Deck Verified or Playable. Because we link directly to official Steam pages, you can easily verify the Steam Deck compatibility badge on the official storefront.',
    },
    {
      id: 'nav-1',
      category: 'Features',
      q: 'How does the Wishlist work?',
      a: 'Clicking the heart icon on any game card or detail page adds the game to your local wishlist. You can access your wishlist anytime from the top navigation bar. It is stored exclusively in your browser\'s local storage and does not send any personal information to external servers.',
    },
    {
      id: 'nav-2',
      category: 'Features',
      q: 'Can I share a game with a friend?',
      a: 'Yes! On every game detail page, click the "Share Game" button to copy a direct shareable link to your clipboard or use your device\'s native share menu.',
    },
  ];

  const categories = ['All', 'General', 'Downloads', 'Hardware Specs', 'Features'];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      }
      return true;
    });
  }, [faqs, selectedCategory, search]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
      
      {/* HEADER */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff3045]/10 border border-[#ff3045]/30 text-xs font-bold text-[#ff3045] uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
          Everything you need to know about navigating Gaming Dock, system requirements, downloads, and local wishlist features.
        </p>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-[#9ca3af] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions (e.g. downloads, specs, laptop)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#15171e] border border-[#242836] rounded-2xl text-sm text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ff3045] transition-all shadow-lg"
          />
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  active
                    ? 'bg-[#ff3045] border-[#ff3045] text-white shadow-md shadow-[#ff3045]/20'
                    : 'bg-[#15171e] border-[#242836] text-[#9ca3af] hover:text-white hover:border-[#ff3045]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACCORDION LIST */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#242836] bg-[#15171e] overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#1b1e28] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3045] px-2 py-0.5 rounded bg-[#ff3045]/10 shrink-0">
                      {item.category}
                    </span>
                    <span className="font-heading font-semibold text-sm sm:text-base text-white">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#9ca3af] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#ff3045]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#9ca3af] leading-relaxed border-t border-[#242836]/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center rounded-2xl bg-[#15171e] border border-[#242836] space-y-2">
            <h4 className="font-heading font-bold text-white">No questions found</h4>
            <p className="text-xs text-[#9ca3af]">Try searching with a different term.</p>
          </div>
        )}
      </div>

    </div>
  );
};
