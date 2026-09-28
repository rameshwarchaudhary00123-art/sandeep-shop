import React from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    viewProductDetail,
    openQuickView,
    addToCart,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  const isLiked = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || 'Standard';
    addToCart(product, 1, defaultSize, defaultColor);
  };

  return (
    <div
      onClick={() => viewProductDetail(product.id)}
      className="group relative bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/60 cursor-pointer"
    >
      {/* Image Container with 4:3 Ratio */}
      <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
        {/* Main Product Image */}
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quiet Editorial Fixed Rate Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-[11px] font-semibold tracking-wider text-amber-400 px-2 py-0.5 rounded">
            FIXED RATE
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isLiked
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-neutral-950/60 text-neutral-300 hover:text-white border border-neutral-800'
          }`}
          title={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={isLiked ? 'fill-red-400' : ''} />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs font-semibold py-2 px-3 rounded-lg backdrop-blur-md border border-neutral-700 flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
            title="Add with default size"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px] text-neutral-500">
              {product.category_name}
            </span>
            {product.stock <= 5 && (
              <span className="text-amber-400/90 text-[11px] font-semibold">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Price & Size Previews */}
        <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-amber-400 tabular-nums">
              ₹{product.sale_price.toLocaleString('en-IN')}
            </span>
            {product.price > product.sale_price && (
              <span className="text-xs text-neutral-500 line-through tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {product.sizes.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-[10px] text-neutral-400 bg-neutral-800/80 px-1.5 py-0.5 rounded font-mono"
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[10px] text-neutral-500 font-mono">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
