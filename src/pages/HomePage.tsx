import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Percent,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const HomePage: React.FC = () => {
  const {
    banners,
    categories,
    products,
    setCurrentView,
    setCategoryFilter,
    settings,
  } = useStore();

  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  // Auto rotate hero banners every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIdx((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const featuredProducts = products.filter((p) => p.featured && p.status === 'active').slice(0, 8);
  const newArrivals = [...products]
    .filter((p) => p.status === 'active')
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const testimonials = [
    {
      name: 'Raghav Shekhawat',
      role: 'College Student, Jaipur',
      rating: 5,
      comment:
        'The Black Baggy Jeans drape exactly like high-end luxury streetwear. Usually baggy pants fit loose on the waist, but DND nailed the proportions. Plus the fixed rate of ₹1,299 is unbeatable.',
    },
    {
      name: 'Aditya Mathur',
      role: 'Streetwear Enthusiast, Delhi',
      rating: 5,
      comment:
        'Found DND through Sandeep and Chetan. The 240 GSM oversized white shirt feels heavyweight and does not collapse after wash. Best fixed rates in India without fake discount markups.',
    },
    {
      name: 'Karan Choudhary',
      role: 'Content Creator, Mumbai',
      rating: 5,
      comment:
        'The vintage Blue Bell Bottom jeans gave me non-stop compliments. Proper 22-inch bottom flare and heavy denim. Fast COD delivery and genuine customer service on WhatsApp.',
    },
  ];

  const handleCategoryClick = (slug: string) => {
    setCategoryFilter(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeBanner = banners[activeBannerIdx] || banners[0];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Campaign Showcase */}
      <section className="relative h-[540px] sm:h-[620px] bg-neutral-950 overflow-hidden flex items-center">
        {/* Background Image with Gradient Scrim */}
        <div className="absolute inset-0">
          <img
            src={activeBanner.image}
            alt={activeBanner.title}
            className="w-full h-full object-cover object-center scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-neutral-950/40" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700/80 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles size={13} />
              <span>Curated by {settings.owners}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display text-balance">
              {activeBanner.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl text-balance">
              {activeBanner.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold px-6 py-3.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-xl shadow-amber-400/20 flex items-center gap-2 cursor-pointer hover:scale-102"
              >
                <span>{activeBanner.cta_text || 'SHOP THE DROP'}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => handleCategoryClick('jeans')}
                className="bg-neutral-900/90 hover:bg-neutral-900 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm border border-neutral-700 backdrop-blur-md transition-all cursor-pointer"
              >
                EXPLORE BAGGY JEANS
              </button>
            </div>
          </div>
        </div>

        {/* Banner Carousel Navigators */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() =>
              setActiveBannerIdx((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
            }
            className="p-2.5 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 border border-neutral-700 transition-colors cursor-pointer"
            aria-label="Previous banner"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-1.5 px-2">
            {banners.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveBannerIdx(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  activeBannerIdx === idx ? 'w-6 bg-amber-400' : 'w-2 bg-neutral-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveBannerIdx((prev) => (prev + 1) % banners.length)}
            className="p-2.5 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 border border-neutral-700 transition-colors cursor-pointer"
            aria-label="Next banner"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl text-xs">
          <div className="flex items-center gap-3">
            <Percent size={20} className="text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Best Fixed Rates</div>
              <div className="text-neutral-400 text-[11px]">Fair pricing · No artificial markups</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Free Express Shipping</div>
              <div className="text-neutral-400 text-[11px]">On orders over ₹999 across India</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">100% Rigid Denim</div>
              <div className="text-neutral-400 text-[11px]">14.5oz raw & washed heavy cotton</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Trending Youth Outfits</div>
              <div className="text-neutral-400 text-[11px]">Drop-shoulder & puddle cut drape</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Curated Silhouettes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mt-1">
              SHOP BY CATEGORY
            </h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter(null);
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Fits</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden text-left p-3 transition-all duration-200 hover:-translate-y-1 hover:border-amber-400/50 cursor-pointer"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-950 mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                {cat.name}
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                {cat.product_count} Styles
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Featured Products (8 Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Top Streetwear Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mt-1">
              FEATURED BOYS FITS
            </h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter(null);
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>See Entire Catalog</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. Brand Story & Founders Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              The DND Philosophy
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Engineered for the Modern Boy. No Fake Discounts, Pure Street Drape.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              DND was founded by Sandeep Jat & Chetan Sharma with a single non-negotiable rule:
              deliver authentic, heavyweight streetwear fits at genuine fixed rates. From 14.5oz raw
              denim that forms natural whiskers over time to 240 GSM drop-shoulder shirts that stay
              crisp through every wash.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentView('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Read Founders' Story
              </button>
              <button
                onClick={() => handleCategoryClick('cargo-pants')}
                className="text-xs font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                View Cargo Pants →
              </button>
            </div>
          </div>

          {/* Decorative Subtle Gold Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* 6. Trending New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Just Released
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mt-1">
              NEW ARRIVALS
            </h2>
          </div>
          <button
            onClick={() => {
              setCategoryFilter(null);
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. Real Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Street Proof
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mt-1">
            WHAT OUR BOYS ARE SAYING
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Real customer reviews across Jaipur, Delhi, Mumbai and all over India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-neutral-500">{item.role}</p>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold">Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
