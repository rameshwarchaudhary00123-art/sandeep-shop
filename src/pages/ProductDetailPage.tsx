import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setCurrentView,
    addToCart,
    isInWishlist,
    toggleWishlist,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImg, setActiveImg] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');

  // Customer Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [customReviews, setCustomReviews] = useState<
    { name: string; date: string; rating: number; text: string }[]
  >([
    {
      name: 'Sahil Chauhan',
      date: 'September 2026',
      rating: 5,
      text: 'Perfect wide leg drape! Sandeep Jat & Chetan Sharma really know what modern boys want to wear. Denim is thick 14oz rigid cotton.',
    },
    {
      name: 'Deepak Meena',
      date: 'August 2026',
      rating: 5,
      text: 'Fits amazing with high-top sneakers. Fast delivery to Jaipur, cash on delivery was smooth.',
    },
  ]);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewText.trim()) {
      setCustomReviews([
        {
          name: newReviewAuthor.trim(),
          date: 'Just now',
          rating: newReviewRating,
          text: newReviewText.trim(),
        },
        ...customReviews,
      ]);
      setNewReviewAuthor('');
      setNewReviewText('');
      showToast('Thank you for your review!');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>
        <div className="flex items-center gap-2">
          <span>Catalog</span>
          <span>/</span>
          <span className="text-amber-400 uppercase">{product.category_name}</span>
          <span>/</span>
          <span className="text-neutral-200 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Sticky Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 relative group">
            <img
              src={activeImg || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-xs font-bold text-amber-400 px-3 py-1 rounded-full">
                BEST FIXED RATE · ₹{product.sale_price}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImg === img
                      ? 'border-amber-400 shadow-md shadow-amber-400/20'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {product.category_name}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mt-1">
                {product.name}
              </h1>
            </div>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">{product.rating}</span>
              <span>·</span>
              <span>{product.review_count + customReviews.length} Verified Reviews</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">In Stock ({product.stock})</span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-amber-400 tabular-nums">
                  ₹{product.sale_price.toLocaleString('en-IN')}
                </span>
                {product.price > product.sale_price && (
                  <span className="text-sm text-neutral-500 line-through tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                SAVE ₹{(product.price - product.sale_price).toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-white mb-2">
                <span>Select Size:</span>
                <span className="text-amber-400 text-[11px]">Streetwear Relaxed Fit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 py-2 px-3 text-xs font-bold font-mono rounded-xl border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-400/20'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="block text-xs font-bold text-white mb-2">Color Wash:</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      selectedColor === c
                        ? 'bg-neutral-100 text-neutral-950 border-white'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-white">Quantity:</span>
              <div className="flex items-center border border-neutral-800 rounded-xl bg-neutral-900">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-xs font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-all cursor-pointer"
              >
                <ShoppingBag size={16} />
                <span>ADD TO BAG</span>
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isLiked
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
                }`}
                title="Wishlist"
              >
                <Heart size={18} className={isLiked ? 'fill-red-400' : ''} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold py-3.5 px-6 rounded-xl text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-amber-400/20"
            >
              <Zap size={16} className="fill-neutral-950" />
              <span>BUY NOW · CASH ON DELIVERY AVAILABLE</span>
            </button>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-amber-400 shrink-0" />
                <span>Free shipping over ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-amber-400 shrink-0" />
                <span>7-Day Easy Exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                <span>100% Fixed Best Rates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400 shrink-0" />
                <span>Sandeep & Chetan Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-neutral-800 pb-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'desc', label: 'Detailed Description' },
            { id: 'specs', label: 'Fabric & Fit Details' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: `Reviews (${product.review_count + customReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <p>{product.description}</p>
              <h4 className="text-white font-bold text-sm">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Heavyweight cotton weave engineered specifically for boys' youth streetwear drape.</li>
                <li>Reinforced stress points, bar-tacks, and custom matte branded hardware.</li>
                <li>Pre-shrunk fabric to prevent unexpected shrinkage after routine wash cycles.</li>
                <li>Fixed fair price guaranteed directly from founders Sandeep Jat & Chetan Sharma.</li>
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 uppercase text-[10px] font-bold">Fabric</span>
                <p className="text-white font-semibold mt-0.5">{product.details?.fabric || '100% Rigid Heavy Cotton'}</p>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 uppercase text-[10px] font-bold">Fit</span>
                <p className="text-white font-semibold mt-0.5">{product.details?.fit || 'Relaxed Streetwear'}</p>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 uppercase text-[10px] font-bold">Closure</span>
                <p className="text-white font-semibold mt-0.5">{product.details?.closure || 'Standard Heavy Metal'}</p>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 uppercase text-[10px] font-bold">Care Instructions</span>
                <p className="text-white font-semibold mt-0.5">{product.details?.care || 'Cold Machine Wash'}</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 max-w-2xl text-neutral-300">
              <p>
                <strong>Delivery Time:</strong> Standard dispatch within 24 hours. Orders arrive within 3-5 business days across Indian metros and 5-7 days for tier 2/3 locations.
              </p>
              <p>
                <strong>Cash on Delivery:</strong> Available nationwide without extra convenience charge. Pay only upon delivery.
              </p>
              <p>
                <strong>7-Day Exchange Policy:</strong> If the size doesn't fit, simply send a message on WhatsApp to Sandeep Jat & Chetan Sharma at +91 98290 88211 for hassle-free doorstep exchange.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 max-w-xl space-y-4">
                <h4 className="text-sm font-bold text-white">Write a Review for {product.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Your Rating:</span>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Star
                      key={num}
                      size={18}
                      onClick={() => setNewReviewRating(num)}
                      className={`cursor-pointer transition-colors ${
                        num <= newReviewRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Rahul Sharma)"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Tell other buyers about fit, fabric thickness, and styling..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4 max-w-2xl">
                {customReviews.map((rev, i) => (
                  <div key={i} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-xs">{rev.name}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, r) => (
                          <Star key={r} size={12} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{rev.text}</p>
                    <span className="text-[10px] text-neutral-500 mt-2 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Complete The Fit
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                RELATED STREETWEAR
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
