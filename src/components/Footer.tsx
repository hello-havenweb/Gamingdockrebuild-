import React from 'react';
import { Gamepad2, Heart, ArrowUp } from 'lucide-react';
import { toPath } from '../utils/paths';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090c] border-t border-[#1e222d] pt-16 pb-12 mt-20 text-[#9ca3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1e222d]">
          
          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href={toPath('/')}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3045] to-[#c9182c] flex items-center justify-center shadow-lg shadow-[#ff3045]/20">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-heading font-extrabold text-xl tracking-wider leading-none">
                  <span className="text-white">GAMING</span>
                  <span className="text-[#ff3045] ml-1">DOCK</span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#9ca3af] mt-1">
                  PLAY • EXPLORE • ENJOY
                </span>
              </div>
            </a>
            
            <p className="text-sm text-[#9ca3af] max-w-sm leading-relaxed">
              Your ultimate curated destination for discovering top PC titles. Explore verified hardware specifications, in-game screenshots, and authorized downloads.
            </p>

            <div className="pt-2 text-xs text-[#6b7280]">
              Built with precision for PC gamers worldwide.
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={toPath('/games.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Games (A-Z)
                </a>
              </li>
              <li>
                <a
                  href={toPath('/games.html?sort=popular')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html?sort=popular');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Popular Titles
                </a>
              </li>
              <li>
                <a
                  href={toPath('/games.html?sort=recent')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html?sort=recent');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Recently Added
                </a>
              </li>
              <li>
                <a
                  href={toPath('/categories.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/categories.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Browse Categories
                </a>
              </li>
            </ul>
          </div>

          {/* COLLECTIONS */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={toPath('/games.html?collection=Open-World%20Adventures')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html?collection=Open-World%20Adventures');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Open World
                </a>
              </li>
              <li>
                <a
                  href={toPath('/games.html?collection=Story-Driven%20Games')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html?collection=Story-Driven%20Games');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Story-Driven
                </a>
              </li>
              <li>
                <a
                  href={toPath('/games.html?collection=Racing%20Collection')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html?collection=Racing%20Collection');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Racing Collection
                </a>
              </li>
              <li>
                <a
                  href={toPath('/games.html?collection=Lightweight%20PC%20Games')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/games.html?collection=Lightweight%20PC%20Games');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Lightweight / Under 20GB
                </a>
              </li>
            </ul>
          </div>

          {/* SUPPORT & LEGAL */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={toPath('/about.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  About Gaming Dock
                </a>
              </li>
              <li>
                <a
                  href={toPath('/faq.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/faq.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  FAQ & Help
                </a>
              </li>
              <li>
                <a
                  href={toPath('/contact.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href={toPath('/privacy-policy.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/privacy-policy.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={toPath('/terms.html')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/terms.html');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <p>
            © {new Date().getFullYear()} GAMING DOCK. All rights reserved. Not affiliated with Valve, Rockstar, PlayStation or Xbox.
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#9ca3af]">
              Made for gamers with <Heart className="w-3.5 h-3.5 text-[#ff3045] fill-current" />
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-[#15171e] hover:bg-[#202430] hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
