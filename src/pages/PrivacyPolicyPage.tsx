import React from 'react';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn text-[#9ca3af]">
      
      {/* HEADER */}
      <div className="space-y-3 border-b border-[#242836] pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff3045]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency Notice</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#6b7280]">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        
        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">1. Information We Do Not Collect</h2>
          <p>
            GAMING DOCK does not require account creation, user registration, passwords, or credit card information. We do not maintain user profile databases, nor do we run background tracking beacons or sell personal identity records.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">2. Browser Local Storage (Wishlist)</h2>
          <p>
            When you save games to your Wishlist using the heart icon, the list of game identifiers is stored strictly on your local device via your browser's <code className="text-[#ff3045] bg-[#0b0c10] px-1.5 py-0.5 rounded">localStorage</code>. This data never leaves your computer, is never transmitted to our servers, and can be cleared at any time directly through the Wishlist drawer or by clearing your browser cache.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">3. External Links & Third-Party Platforms</h2>
          <p>
            Gaming Dock contains links leading directly to external third-party digital storefronts and game publishers (such as Valve Corporation's Steam Store, Epic Games Store, Xbox, and official developer domains). Once you navigate to an external website, their respective privacy policies and terms govern any data you provide on their platforms.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#15171e] border border-[#242836] space-y-3">
          <h2 className="font-heading font-bold text-lg text-white">4. Contact Inquiries</h2>
          <p>
            If you choose to contact us via email or our contact interface, any information you provide (name, email address, message) is utilized solely to respond to your specific request or report.
          </p>
        </section>

      </div>
    </div>
  );
};
