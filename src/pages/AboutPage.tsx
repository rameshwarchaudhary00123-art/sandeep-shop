import React from 'react';
import { Award, CheckCircle2, Flame, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { setCurrentView, setCategoryFilter, settings } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
          The Origin Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
          DND: REDEFINING BOYS STREETWEAR IN INDIA
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
          Founded and crafted by <strong>Sandeep Jat</strong> & <strong>Chetan Sharma</strong>, DND
          was born out of a shared frustration with oversized fashion: high-street brands charging
          exorbitant prices for thin synthetic cloth, or offering baggy jeans that lost their shape
          after a single wash.
        </p>
      </div>

      {/* Founders Profile Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Visionaries Behind DND
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Sandeep Jat & Chetan Sharma
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Based out of Rajasthan, Sandeep and Chetan spent months sampling mills and testing
              denim weights to arrive at the gold standard: rigid 14.5oz cotton with authentic puddle
              drapes for baggy jeans, and 240 GSM poplin for boxy drop-shoulder shirts.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-neutral-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>100% Zero-Middlemen Manufacturing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>Fixed Fair Pricing with Zero False Discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>Every Design Personally Tested for Street Movement</span>
              </div>
            </div>
          </div>

          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div className="text-amber-400 font-display font-extrabold text-lg">
              "We believe every young guy deserves luxury street silhouettes without paying luxury brand tax."
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              That's why all DND products are offered at Best Fixed Rates. No fake 70% off markdowns,
              no compromise on heavy cotton stitching.
            </p>
            <div className="text-xs font-bold text-white pt-2 border-t border-neutral-800">
              — Sandeep Jat & Chetan Sharma (Owners & Curators)
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-400/10 text-amber-400 w-fit rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-base font-bold text-white">100% Best Fixed Rates</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Transparent, direct-to-consumer pricing. When you buy from DND, you pay for the fabric,
            stitching, and cut — not billboard ads or multi-layer distributor margins.
          </p>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-400/10 text-amber-400 w-fit rounded-xl">
            <Flame size={24} />
          </div>
          <h3 className="text-base font-bold text-white">Authentic Street Silhouettes</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Our Baggy Jeans have wide leg openings that puddle effortlessly over sneakers. Our Bell
            Bottoms boast a dramatic 22-inch flare. Our shirts feature dropped shoulders with boxy
            drapes.
          </p>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
          <div className="p-3 bg-amber-400/10 text-amber-400 w-fit rounded-xl">
            <HeartHandshake size={24} />
          </div>
          <h3 className="text-base font-bold text-white">Direct WhatsApp Support</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Got sizing doubts or need urgent delivery before an event? Message Sandeep Jat & Chetan
            Sharma directly on WhatsApp at {settings.phone} for immediate assistance.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold px-8 py-3.5 rounded-xl text-xs tracking-wider transition-all cursor-pointer"
        >
          EXPLORE THE DND DROPS
        </button>
      </div>
    </div>
  );
};
