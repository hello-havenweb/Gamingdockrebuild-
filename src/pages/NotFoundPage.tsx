import React from 'react';
import { Gamepad2, ArrowLeft, Search, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 text-center space-y-8 max-w-xl mx-auto animate-fadeIn">
      
      {/* 404 GLOW BADGE */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#ff3045] to-[#800d1a] flex items-center justify-center shadow-2xl shadow-[#ff3045]/30">
          <Gamepad2 className="w-14 h-14 text-white" />
        </div>
        <div className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#15171e] border border-[#ff3045] text-xs font-black tracking-widest text-[#ff3045] uppercase">
          GAME OVER
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
          404 - Level Not Found
        </h1>
        <p className="text-sm text-[#9ca3af] leading-relaxed max-w-md mx-auto">
          The game, page, or link you are searching for does not exist or has been moved to a new destination.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-3.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ff3045]/20 transition-all hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={() => onNavigate('/games.html')}
          className="px-6 py-3.5 rounded-xl bg-[#15171e] hover:bg-[#202430] text-white font-semibold text-xs border border-[#242836] hover:border-[#ff3045] transition-all flex items-center gap-2"
        >
          <Search className="w-4 h-4 text-[#ff3045]" />
          <span>Browse Games Catalog</span>
        </button>
      </div>

    </div>
  );
};
