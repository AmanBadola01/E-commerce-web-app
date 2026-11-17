import React, { useState } from 'react';
import {
  Search,
  X,
  ChevronRight,
  Flame,
  Percent,
  Shirt,
  ShoppingBag,
  Sparkles,
  Truck,
  Crown,
  Feather,
  Compass,
  Rocket,
} from 'lucide-react';
import ProductCard from './ProductCard';

// Category items matching your Figma screen with relevant Lucide icons
const exploreCategories = [
  { id: 'new', name: 'New Arrivals', icon: Truck },
  { id: 'hot', name: 'Hot Drops', icon: Flame },
  { id: 'sales', name: 'Sales', icon: Percent },
  { id: 'clothing', name: 'Clothing', icon: Shirt },
  { id: 'accessories', name: 'Accessories', icon: ShoppingBag },
  { id: 'designer', name: 'Designer', icon: Crown },
  { id: 'brands', name: 'Brands', icon: Feather },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
  { id: 'lifestyle', name: 'Lifestyle', icon: Compass },
  { id: 'launches', name: 'Launches', icon: Rocket },
];

const genderTabs = ['Women', 'Men', 'Kids'];

export default function SearchPage({ products = [], onAddToCart, onToggleLike, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [activeGender, setActiveGender] = useState('Women');

  // Filter products by search query
  const trimmedQuery = query.trim().toLowerCase();
  const filteredProducts = trimmedQuery
    ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(trimmedQuery) ||
          product.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* 1. Search Input Bar (matching Figma placeholder: "What are you looking for?") */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full pl-12 pr-12 py-3.5 rounded-full border border-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 transition-all bg-white shadow-sm"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-all"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Gender Pills (Women, Men, Kids) */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {genderTabs.map((tab) => {
          const isActive = tab === activeGender;
          return (
            <button
              key={tab}
              onClick={() => setActiveGender(tab)}
              className={`px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-900 border border-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. Conditional Content Area */}
      {query.trim() === '' ? (
        /* STATE 1: Default Browse Directory (matching this Figma screen) */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {exploreCategories.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setQuery(item.name)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-slate-950 transition-colors">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* STATE 2: Empty State (Matching Figma Yeti Screen) */
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4 animate-fade-in">
          <div className="w-52 sm:w-64 aspect-square mb-6 flex items-center justify-center">
            <img
              src="/images/no-result.png"
              alt="No results found"
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            No results for{' '}
            <span className="text-[#6366F1]">“{query}”</span>
          </h2>

          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            Check your spelling or try searching for something else like &ldquo;sneakers&rdquo;, &ldquo;perfume&rdquo;, or &ldquo;sunglasses&rdquo;.
          </p>

          <button
            onClick={() => setQuery('')}
            className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* STATE 3: Matching Products Found */
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'result' : 'results'} for &ldquo;
              <span className="text-[#6366F1] font-semibold">{query}</span>&rdquo;
            </p>
            <button
              onClick={() => setQuery('')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline"
            >
              Back to Categories
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleLike={onToggleLike}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
