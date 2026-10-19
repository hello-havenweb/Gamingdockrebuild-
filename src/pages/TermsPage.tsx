import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn text-[#9ca3af]">
      
      {/* HEADER */}
      <div className="space-y-3 border-b border-[#242836] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff3045]">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-[#6b7280]">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        
        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">1. Website Purpose & Scope</h2>
          <p>
            GAMING DOCK is an informational PC game discovery platform. The site provides curated overviews, hardware specification references, in-game screenshot galleries, and outward navigational links to authorized game publishers and digital distribution storefronts.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">2. Intellectual Property & Trademarks</h2>
          <p>
            All game titles, trademarks, logos, visual art, character designs, and associated intellectual property displayed on this site belong to their respective copyright holders (including but not limited to Valve, Rockstar Games, PlayStation, Xbox, Ubisoft, EA, Capcom, and CD PROJEKT RED). Gaming Dock claims no ownership over third-party assets and presents them strictly for editorial and descriptive identification.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">3. Third-Party Storefronts & Software Availability</h2>
          <p>
            Gaming Dock does not sell, host, mirror, or directly distribute game software binaries. Any transaction, download, license agreement, or client installation takes place solely between the user and the external platform (such as Steam or Epic Games Store). We make no warranties regarding publisher pricing changes, regional availability restrictions, or end-user hardware compatibility.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">4. Content Accuracy & Disclaimers</h2>
          <p>
            While we strive to keep technical requirements and game details accurate and up to date based on publisher specifications, PC software updates and patches may alter hardware prerequisites over time. Information is provided on an "as-is" basis without warranties of completeness or fitness for a particular system configuration.
          </p>
        </section>

      </div>
    </div>
  );
};
