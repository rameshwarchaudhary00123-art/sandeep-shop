import React, { useState } from 'react';
import {
  Heart,
  Lock,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotals,
    wishlist,
    currentCustomer,
    isAdminLoggedIn,
    setCategoryFilter,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const handleNav = (view: any, catFilter: string | null = null) => {
    setCategoryFilter(catFilter);
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setCurrentView('shop');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-amber-400 text-neutral-950 text-xs font-bold tracking-wider py-1.5 px-4 text-center">
        <span>BEST FIXED RATES ON BOYS STREETWEAR · FREE SHIPPING ON ORDERS OVER ₹999 · COD AVAILABLE</span>
      </div>

      {/* Main Header - Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Zone 1: Single Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral-400 hover:text-white p-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <button
              onClick={() => handleNav('home')}
              className="text-left group cursor-pointer focus-visible:outline-none"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                DND
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold tracking-widest text-neutral-400 group-hover:text-neutral-200">
                PREMIUM BOYS FASHION
              </span>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop', null)}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentView === 'shop' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              All Fits
            </button>
            <button
              onClick={() => handleNav('shop', 'jeans')}
              className="text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Baggy Jeans
            </button>
            <button
              onClick={() => handleNav('shop', 'shirts')}
              className="text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Oversized Shirts
            </button>
            <button
              onClick={() => handleNav('shop', 'cargo-pants')}
              className="text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Cargo Pants
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentView === 'about' ? 'text-amber-400 font-semibold' : 'text-neutral-300'
              }`}
            >
              Our Story
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-300 hover:text-amber-400 transition-colors rounded-lg cursor-pointer"
              title="Search store"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNav('account')}
              className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors rounded-lg cursor-pointer"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => handleNav('cart')}
              className="relative p-2 text-neutral-300 hover:text-amber-400 transition-colors rounded-lg cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {cartTotals.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {cartTotals.count}
                </span>
              )}
            </button>

            {/* Customer Account / Auth */}
            <button
              onClick={() => handleNav(currentCustomer ? 'account' : 'auth')}
              className="p-2 text-neutral-300 hover:text-amber-400 transition-colors rounded-lg cursor-pointer"
              title={currentCustomer ? `Account: ${currentCustomer.name}` : 'Login / Register'}
            >
              <User size={20} />
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => handleNav('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                isAdminLoggedIn
                  ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                  : 'bg-neutral-900 border border-neutral-700 text-neutral-300 hover:border-neutral-500'
              }`}
              title="Admin Management Console"
            >
              <Lock size={13} />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin'}</span>
            </button>
          </div>
        </div>

        {/* Live Search Bar Dropdown */}
        {searchOpen && (
          <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-3 animate-in fade-in duration-200">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search size={18} className="absolute left-3 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search baggy jeans, bell bottoms, cargo pants, white shirts..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  autoFocus
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-10 pr-24 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-amber-400 text-neutral-950 text-xs font-bold rounded-md hover:bg-amber-300 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-3">
            <button
              onClick={() => handleNav('home')}
              className="block w-full text-left py-2 text-sm font-semibold text-white hover:text-amber-400"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('shop', null)}
              className="block w-full text-left py-2 text-sm font-semibold text-white hover:text-amber-400"
            >
              All Fits & Outfits
            </button>
            <button
              onClick={() => handleNav('shop', 'jeans')}
              className="block w-full text-left py-2 text-sm font-semibold text-white hover:text-amber-400"
            >
              Baggy & Bell Bottom Jeans
            </button>
            <button
              onClick={() => handleNav('shop', 'shirts')}
              className="block w-full text-left py-2 text-sm font-semibold text-white hover:text-amber-400"
            >
              Oversized Shirts
            </button>
            <button
              onClick={() => handleNav('shop', 'cargo-pants')}
              className="block w-full text-left py-2 text-sm font-semibold text-white hover:text-amber-400"
            >
              Cargo Pants
            </button>
            <button
              onClick={() => handleNav('about')}
              className="block w-full text-left py-2 text-sm font-semibold text-white hover:text-amber-400"
            >
              About Sandeep Jat & Chetan Sharma
            </button>
          </div>
        )}
      </header>
    </>
  );
};
