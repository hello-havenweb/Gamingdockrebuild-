import React from 'react';
import { ShieldCheck, HardDrive, Cpu, ExternalLink, Gamepad2, Heart, Award } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fadeIn">
      
      {/* HEADER */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff3045]/10 border border-[#ff3045]/30 text-xs font-bold text-[#ff3045] uppercase tracking-wider">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>About Gaming Dock</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
          Curated PC Gaming Discovery
        </h1>
        <p className="text-base text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
          Built for gamers who value clear hardware requirements, authentic storefront destinations, and zero clutter.
        </p>
      </div>

      {/* MISSION CARD */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#15171e] border border-[#242836] space-y-6">
        <h2 className="font-heading font-bold text-2xl text-white">Our Mission</h2>
        <p className="text-sm text-[#9ca3af] leading-relaxed">
          Gaming Dock was founded to simplify how PC gamers discover titles that match both their genre interests and their system hardware capabilities. The modern gaming landscape is full of confusing system specifications, bloated landing pages, and sketchy file mirrors.
        </p>
        <p className="text-sm text-[#9ca3af] leading-relaxed">
          We curate every entry in our catalog with verified publisher hardware specifications, authentic developer metadata, in-game screenshot galleries, and direct links to legitimate distribution platforms including Steam, Epic Games Store, and official publisher storefronts.
        </p>
      </div>

      {/* CORE PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <div className="p-3 rounded-xl bg-[#ff3045]/15 text-[#ff3045] w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Verified Hardware Specs</h3>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            Side-by-side Minimum and Recommended PC hardware requirements verified directly against developer technical sheets.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <div className="p-3 rounded-xl bg-[#ff3045]/15 text-[#ff3045] w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Authorized Links</h3>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            We never host unauthorized binaries or direct download mirrors. Every button leads directly to verified official stores.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <div className="p-3 rounded-xl bg-[#ff3045]/15 text-[#ff3045] w-fit">
            <HardDrive className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">Lightweight Categorization</h3>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            Specific tags for games under 20GB and low-spec optimization so gamers with everyday laptops can play without worry.
          </p>
        </div>
      </div>

      {/* TRADEMARKS & LEGAL DISCLAIMER */}
      <div className="p-6 rounded-2xl bg-[#0b0c10] border border-[#242836] space-y-3 text-xs text-[#9ca3af]">
        <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
          Trademarks & Intellectual Property
        </h4>
        <p className="leading-relaxed">
          Gaming Dock is an independent PC game discovery guide. All game titles, trademarks, logos, artwork, screenshots, and publisher identities displayed on this website are the property of their respective owners (including Valve Corporation, Rockstar Games, Sony Interactive Entertainment, Microsoft Corporation, Ubisoft, Electronic Arts, CD PROJEKT RED, and others).
        </p>
        <p className="leading-relaxed">
          Their appearance on Gaming Dock does not imply endorsement, affiliation, or sponsorship. Links to external stores are provided for informational and discovery purposes.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('/games.html')}
          className="px-8 py-3.5 rounded-xl bg-[#ff3045] hover:bg-[#e02438] text-white font-bold text-sm transition-all shadow-lg shadow-[#ff3045]/20 hover:scale-105"
        >
          Explore the Full Games Catalog
        </button>
      </div>

    </div>
  );
};
