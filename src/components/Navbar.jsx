import React from 'react';
import { Search, ShoppingBag, Heart, User } from 'lucide-react';

export default function Navbar({ currentScreen = 'home', onNavigate, cartCount = 2, wishlistCount = 1 }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Left Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button
            onClick={() => onNavigate?.('home')}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 cursor-pointer"
          >
            Verve
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate?.('home')}
              className={`transition-colors cursor-pointer ${
                currentScreen === 'home' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <a href="#" className="hover:text-slate-900 transition-colors">
              New Drops
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Deals
            </a>
          </nav>
        </div>

        {/* Center: The Sole Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
          <button
            onClick={() => onNavigate?.('search')}
            className={`w-full relative flex items-center text-left py-2 pl-10 pr-4 rounded-full border transition-all text-xs sm:text-sm group cursor-pointer ${
              currentScreen === 'search'
                ? 'bg-white border-slate-900 ring-1 ring-slate-900 text-slate-900'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              currentScreen === 'search' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
            }`} />
            <span className="truncate">Search sneakers, apparel, deals...</span>
          </button>
        </div>

        {/* Right Action Icons (Wishlist, Bag, Profile) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Wishlist / Favorites Icon Button */}
          <button
            onClick={() => onNavigate?.('favorites')}
            aria-label="Favorites"
            className={`relative p-2 rounded-full transition-colors cursor-pointer ${
              currentScreen === 'favorites'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-current' : ''}`} />
            {wishlistCount > 0 && (
              <span
                className={`absolute top-1 right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${
                  currentScreen === 'favorites' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                }`}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag / Cart Icon Button */}
          <button
            onClick={() => onNavigate?.('cart')}
            aria-label="Shopping Cart"
            className={`relative p-2 rounded-full transition-colors cursor-pointer ${
              currentScreen === 'cart'
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className={`absolute top-1 right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${
                  currentScreen === 'cart' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                }`}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile / Account */}
          <a
            href="#"
            aria-label="Account"
            className="hidden sm:flex p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <User className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
