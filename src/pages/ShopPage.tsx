import React, { useMemo, useState } from 'react';
import { Filter, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'rating'>('newest');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Available Sizes & Colors for filters
  const allSizes = ['28', '30', '32', '34', '36', 'S', 'M', 'L', 'XL', 'XXL'];
  const allColors = ['Black', 'Blue', 'White', 'Olive', 'Grey'];

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
    setCurrentPage(1);
  };

  const toggleColor = (col: string) => {
    setSelectedColors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setCategoryFilter(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(3000);
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.status !== 'active') return false;

      // Category filter
      if (categoryFilter && p.category_slug !== categoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Price filter
      if (p.sale_price > maxPrice) return false;

      // In stock
      if (inStockOnly && p.stock <= 0) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = p.colors.some((c) =>
          selectedColors.some((sc) => c.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      return true;
    });
  }, [
    products,
    categoryFilter,
    searchQuery,
    maxPrice,
    inStockOnly,
    selectedSizes,
    selectedColors,
  ]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price_low':
        return list.sort((a, b) => a.sale_price - b.sale_price);
      case 'price_high':
        return list.sort((a, b) => b.sale_price - a.sale_price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
      default:
        return list.sort((a, b) => b.id - a.id);
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Shop Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Full Boys Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mt-1">
            {categoryFilter
              ? categories.find((c) => c.slug === categoryFilter)?.name || 'Category Fits'
              : 'ALL STREETWEAR FITS'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Baggy Jeans, Bell Bottoms, Oversized Shirts & Cargo Fits at 100% Best Fixed Rates
          </p>
        </div>

        {/* Controls: Search, Sort, Mobile Filter Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
            >
              <option value="newest">Newest Drops</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters Pill Bar */}
      {(categoryFilter ||
        searchQuery ||
        selectedSizes.length > 0 ||
        selectedColors.length > 0 ||
        maxPrice < 3000) && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs text-neutral-400 font-medium">Active:</span>
          {categoryFilter && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20">
              {categories.find((c) => c.slug === categoryFilter)?.name}
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => setCategoryFilter(null)}
              />
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-800 text-neutral-200 border border-neutral-700">
              Search: "{searchQuery}"
              <X
                size={12}
                className="cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
          {selectedSizes.map((sz) => (
            <span
              key={sz}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-800 text-neutral-200 border border-neutral-700"
            >
              Size: {sz}
              <X size={12} className="cursor-pointer" onClick={() => toggleSize(sz)} />
            </span>
          ))}
          {selectedColors.map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-800 text-neutral-200 border border-neutral-700"
            >
              Color: {col}
              <X size={12} className="cursor-pointer" onClick={() => toggleColor(col)} />
            </span>
          ))}
          {maxPrice < 3000 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-neutral-800 text-neutral-200 border border-neutral-700">
              Under ₹{maxPrice}
              <X size={12} className="cursor-pointer" onClick={() => setMaxPrice(3000)} />
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1 ml-2 underline cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 space-y-6">
            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                Search Fits
              </label>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-2.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="e.g. Baggy, Bell bottom, Cargo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Categories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCategoryFilter(null);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    categoryFilter === null
                      ? 'bg-amber-400 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCategoryFilter(c.slug);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      categoryFilter === c.slug
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span>
                      {products.filter((p) => p.category_slug === c.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-white uppercase tracking-wider mb-2">
                <span>Max Price:</span>
                <span className="text-amber-400 font-mono">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                <span>₹500</span>
                <span>₹3,000</span>
              </div>
            </div>

            {/* Sizes Filter */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Size Range
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer ${
                      selectedSizes.includes(sz)
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Filter */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Color Wash
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allColors.map((col) => (
                  <button
                    key={col}
                    onClick={() => toggleColor(col)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      selectedColors.includes(col)
                        ? 'bg-neutral-100 text-neutral-950 border-white font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-2 border-t border-neutral-800">
              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded accent-amber-400"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                <Filter size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">No Matching Fits Found</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                We couldn't find any products matching your active filters. Try clearing some selections or search for another keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-neutral-800">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 150, behavior: 'smooth' });
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-amber-400 text-neutral-950'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-neutral-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h3 className="text-sm font-bold text-white font-display">Filter Catalog</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Categories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCategoryFilter(null);
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                    categoryFilter === null ? 'bg-amber-400 text-neutral-950' : 'text-neutral-300'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCategoryFilter(c.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                      categoryFilter === c.slug
                        ? 'bg-amber-400 text-neutral-950'
                        : 'text-neutral-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Sizes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border ${
                      selectedSizes.includes(sz)
                        ? 'bg-amber-400 text-neutral-950 border-amber-400'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-amber-400 text-neutral-950 font-bold py-3 rounded-xl text-xs mt-6"
            >
              Apply Filters ({sortedProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
