import React, { useState } from 'react';
import { Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, X, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    setCurrentView,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  if (!quickViewProduct) return null;

  const [selectedImg, setSelectedImg] = useState<string>(quickViewProduct.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(quickViewProduct.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(quickViewProduct.colors[0] || 'Black');
  const [quantity, setQuantity] = useState<number>(1);

  const isLiked = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
    closeQuickView();
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-neutral-950/60 hover:bg-neutral-950 rounded-full transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="p-6 bg-neutral-950 flex flex-col justify-between">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 mb-3 border border-neutral-800">
              <img
                src={selectedImg || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImg === img ? 'border-amber-400' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Form */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="text-amber-400 font-semibold uppercase tracking-wider">
                  {quickViewProduct.category_name}
                </span>
                <span className="text-neutral-500 font-mono">
                  Stock: {quickViewProduct.stock} left
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 font-display">
                {quickViewProduct.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold text-amber-400 tabular-nums">
                  ₹{quickViewProduct.sale_price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.price > quickViewProduct.sale_price && (
                  <span className="text-sm text-neutral-500 line-through tabular-nums">
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded font-semibold">
                  BEST FIXED RATE
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mb-5 line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-xs font-semibold text-neutral-300 mb-2">
                  <span>Select Size:</span>
                  <span className="text-amber-400 text-[11px]">Streetwear Relaxed Fit</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  Select Color:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedColor === col
                          ? 'bg-neutral-100 text-neutral-950 border-white'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-neutral-300">Quantity:</span>
                <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-950">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold tabular-nums text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))}
                    className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-colors cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  <span>ADD TO BAG</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    isLiked
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                  }`}
                  title={isLiked ? 'Wishlisted' : 'Add to Wishlist'}
                >
                  <Heart size={16} className={isLiked ? 'fill-red-400' : ''} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-400/10"
              >
                <Zap size={15} className="fill-neutral-950" />
                <span>BUY NOW (INSTANT CHECKOUT)</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-neutral-400">
                <ShieldCheck size={13} className="text-amber-400" />
                <span>Fixed Rate Guarantee · Free delivery above ₹999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
