import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onToggleLike, onAddToCart, onSelectProduct }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300">
      {/* Product Image Box (Click to open details) */}
      <div
        onClick={() => onSelectProduct?.(product)}
        className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top-Left: "Exclusive" Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Top-Left: Discount Badge */}
        {!product.badge && product.discount && (
          <span className="absolute top-3 left-3 bg-[#D90429] text-white text-[11px] font-bold px-2 py-1 rounded-md shadow-sm">
            {product.discount}
          </span>
        )}

        {/* Top-Right: Wishlist Heart Circle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike?.(product.id);
          }}
          aria-label={product.isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-10 ${
            product.isLiked ? 'text-[#D90429]' : 'text-slate-700 hover:text-slate-950'
          }`}
        >
          <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Hover Button for Web */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="w-full py-2.5 px-3 bg-slate-950/90 backdrop-blur-sm hover:bg-slate-950 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Details (Brand, Title, Price) */}
      <div className="pt-3 pb-2 px-1 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand Name */}
          <span className="text-xs font-medium text-slate-400 block line-clamp-1">
            {product.brand || product.category}
          </span>

          {/* Product Title (Clickable) */}
          <h3
            onClick={() => onSelectProduct?.(product)}
            className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-1 mt-0.5 group-hover:text-indigo-600 transition-colors cursor-pointer"
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Mobile Add Button */}
        <div className="flex items-center justify-between mt-2 pt-1">
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(0)}
              </span>
            )}
            <span
              className={`font-bold text-base sm:text-lg ${
                product.discount ? 'text-[#D90429]' : 'text-slate-950'
              }`}
            >
              ${product.price.toFixed(0)}
            </span>
          </div>

          {/* Quick add icon for touch / mobile */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="sm:hidden p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
