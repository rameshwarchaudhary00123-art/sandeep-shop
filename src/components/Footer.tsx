import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setCategoryFilter, settings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleCategoryClick = (catSlug: string) => {
    setCategoryFilter(catSlug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Subscribed to DND exclusive fit drops!', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-850 pt-16 pb-12 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Prop Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-neutral-800">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-900 rounded-lg text-amber-400 shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-tight">Best Fixed Rates</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Direct factory manufacturing and rigid cotton denim. No artificial inflated sales.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-900 rounded-lg text-amber-400 shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-tight">Fast All-India Dispatch</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Free standard delivery on orders above ₹999. Express tracking on WhatsApp.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-900 rounded-lg text-amber-400 shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold tracking-tight">Curated By Founders</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Every drop personally approved by {settings.owners} for drape, fit, and wash.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-neutral-800">
          {/* Col 1 & 2: Brand & Founders */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl font-extrabold text-white tracking-tight">
                DND
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-400/10 text-amber-400 rounded border border-amber-400/20">
                STREETWEAR ATELIER
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              DND (Premium Boys Fashion) is India's premier destination for youth street culture, offering authentic baggy denim, bell bottoms, and oversized boxy fits at true fixed rates.
            </p>
            <div className="text-xs text-neutral-400 space-y-1">
              <div>
                <span className="text-neutral-200 font-semibold">Store Founders:</span> Sandeep Jat & Chetan Sharma
              </div>
              <div>
                <span className="text-neutral-200 font-semibold">Flagship Studio:</span> {settings.address}
              </div>
            </div>
          </div>

          {/* Col 3: Shop Collections */}
          <div>
            <h5 className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-4">
              Collections
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('jeans')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Baggy & Bell Bottom Jeans
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Oversized Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('cargo-pants')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Combat Cargo Pants
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('t-shirts')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Heavyweight Graphic Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('jackets')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Jackets & Street Hoodies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h5 className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-4">
              Store Support
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Founders
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Store Location & Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('account');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking & Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Admin Console Login
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h5 className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-4">
              Stay in the Drop
            </h5>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              Get notified first when limited batch baggy jeans and oversized fits restock.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-750 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight size={13} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} DND (Premium Boys Fashion). Curated by Sandeep Jat & Chetan Sharma. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-neutral-400">
              <Phone size={13} className="text-amber-400" />
              <span>{settings.phone}</span>
            </span>
            <span className="flex items-center gap-1 text-neutral-400">
              <Mail size={13} className="text-amber-400" />
              <span>{settings.email}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
