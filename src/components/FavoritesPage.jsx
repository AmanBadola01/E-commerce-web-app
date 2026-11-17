import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function FavoritesPage({
  products = [],
  onToggleLike,
  onAddToCart,
  onSelectProduct,
  onExplore,
}) {
  const likedProducts = products.filter((item) => item.isLiked);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Page Title & Articles Count (matching Figma) */}
      <div className="flex items-baseline justify-between pt-2 pb-4 border-b border-slate-100 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Favorites
        </h1>
        <span className="text-xs sm:text-sm font-medium text-slate-400">
          {likedProducts.length} {likedProducts.length === 1 ? 'Article' : 'Articles'}
        </span>
      </div>

      {likedProducts.length === 0 ? (
        /* Empty State: Matching your Figma screenshot */
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4 animate-fade-in">
          <div className="w-56 sm:w-64 aspect-square mb-6 flex items-center justify-center">
            <img
              src="/images/no-favorites.png"
              alt="No Favourites yet!"
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
            No Favourites yet!
          </h2>

          <button
            onClick={onExplore}
            className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Explore!
          </button>
        </div>
      ) : (
        /* Populated State: Grid of Liked Items */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {likedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleLike={onToggleLike}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}

      {/* "For you" Section: All items shown below on scroll */}
      <section className="mt-20 pt-12 border-t border-slate-200 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            For you
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover more items to add to your favorites
          </p>
        </div>

        {/* 4-column responsive grid with all items */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onToggleLike={onToggleLike}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
