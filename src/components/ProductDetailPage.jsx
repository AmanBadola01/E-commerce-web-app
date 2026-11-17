import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Share2,
  ChevronDown,
  Truck,
  Star,
  Check,
} from 'lucide-react';
import ProductCard from './ProductCard.jsx';

export default function ProductDetailPage({
  product,
  allProducts = [],
  onBack,
  onAddToCart,
  onToggleLike,
  onSelectProduct,
}) {
  const [selectedSize, setSelectedSize] = useState('US 9');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState({
    moreInfo: true,
    material: false,
    ratings: true, // Open by default matching your Figma screenshot
  });

  if (!product) return null;

  const sizes = ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11'];
  const colors = [
    { name: 'Black', image: product.image },
    { name: 'Red/Black', image: product.image },
    { name: 'Blue/Slate', image: product.image },
  ];

  // Ratings breakdown data matching Figma (32 + 5 + 12 + 5 + 2 = 56 total reviews)
  const totalReviews = 56;
  const ratingBreakdown = [
    { star: 5, count: 32, percentage: (32 / totalReviews) * 100 },
    { star: 4, count: 5, percentage: (5 / totalReviews) * 100 },
    { star: 3, count: 12, percentage: (12 / totalReviews) * 100 },
    { star: 2, count: 5, percentage: (5 / totalReviews) * 100 },
    { star: 1, count: 2, percentage: (2 / totalReviews) * 100 },
  ];

  // Verified buyer reviews
  const reviewsList = [
    {
      id: 1,
      author: 'Alex M.',
      rating: 5,
      date: '2 days ago',
      comment: 'Super lightweight and walking on clouds feeling is 100% accurate! Wore them all weekend.',
    },
    {
      id: 2,
      author: 'Marcus K.',
      rating: 4,
      date: '1 week ago',
      comment: 'Great arch support and looks really sleek with jeans or shorts. True to size.',
    },
  ];

  // All other products for the "For you" section (shows all items below, excluding current)
  const recommendedProducts = allProducts.filter((item) => item.id !== product.id);

  const toggleAccordion = (key) => {
    setActiveAccordion((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Products</span>
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: product.title, url: window.location.href });
            } else {
              alert('Product link copied to clipboard!');
            }
          }}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main 2-Column Web Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column: Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/4] w-full rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-6 sm:p-10 hover:scale-105 transition-transform duration-500"
            />

            {/* Badges */}
            {product.badge && (
              <span className="absolute top-5 left-5 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
            {product.discount && !product.badge && (
              <span className="absolute top-5 left-5 bg-[#D90429] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {product.discount}
              </span>
            )}

            {/* Wishlist Heart Circle (matching Figma) */}
            <button
              onClick={() => onToggleLike?.(product.id)}
              aria-label="Wishlist"
              className={`absolute bottom-5 right-5 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer ${
                product.isLiked ? 'text-[#D90429]' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Heart className={`w-5 h-5 ${product.isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Carousel Dot Indicators (matching Figma) */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Box */}
        <div className="space-y-6">
          {/* Brand, Title & Price */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {product.brand || product.category}
            </span>
            <div className="flex items-start justify-between gap-4 mt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.title}
              </h1>
              <div className="text-right flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice.toFixed(0)}
                  </span>
                )}
                <span className={`text-2xl sm:text-3xl font-extrabold ${product.discount ? 'text-[#D90429]' : 'text-slate-900'}`}>
                  ${product.price.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Rating Stars Header */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-indigo-600">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-slate-800">4.0 / 5</span>
              <span className="text-xs text-slate-400">(56 reviews)</span>
            </div>
          </div>

          {/* Size Selector Dropdown (matching Figma) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Choose Size
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSizeOpen(!isSizeOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-800 hover:border-slate-800 transition-colors cursor-pointer"
              >
                <span>{selectedSize ? `Size: ${selectedSize}` : 'Choose size'}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isSizeOpen ? 'rotate-180' : ''}`} />
              </button>

              {isSizeOpen && (
                <div className="absolute z-20 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2 grid grid-cols-4 gap-1.5">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setIsSizeOpen(false);
                      }}
                      className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        selectedSize === size
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add to Bag CTA Button (matching Figma) */}
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white text-base font-bold rounded-full shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Bag</span>
          </button>

          {/* Color Swatches (matching Figma) */}
          <div>
            <span className="text-xs font-semibold text-slate-700">
              Color: <span className="font-bold text-slate-900">{selectedColor}</span>
            </span>
            <div className="flex items-center gap-3 mt-2.5">
              {colors.map((color, index) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border-2 transition-all cursor-pointer p-1 ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-contain"
                    />
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collapsible Accordions (matching Figma) */}
          <div className="border-t border-slate-200 pt-2 divide-y divide-slate-100">
            {/* 1. More Info */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('moreInfo')}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
              >
                <span>More info</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeAccordion.moreInfo ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion.moreInfo && (
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Looking for a stylish and comfortable footwear option that will make you feel like you're walking on clouds? Look no further than sneakers!
                </p>
              )}
            </div>

            {/* 2. Material */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('material')}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
              >
                <span>Material</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeAccordion.material ? 'rotate-180' : ''}`} />
              </button>
              {activeAccordion.material && (
                <ul className="text-xs sm:text-sm text-slate-600 mt-2.5 space-y-1 list-disc list-inside">
                  <li>Upper: 70% Breathable Textile Mesh, 30% Synthetic Overlay</li>
                  <li>Midsole: Lightweight Cushioning Foam</li>
                  <li>Outsole: 100% Durable High-Grip Rubber</li>
                </ul>
              )}
            </div>

            {/* 3. Ratings (56) */}
            <div className="py-4">
              <button
                onClick={() => toggleAccordion('ratings')}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span>Ratings ({totalReviews})</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-indigo-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 text-indigo-300" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">4/5</span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeAccordion.ratings ? 'rotate-180' : ''}`} />
              </button>

              {activeAccordion.ratings && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  {/* Progress Bars Breakdown (5 Stars down to 1 Star) */}
                  <div className="space-y-2.5 max-w-md">
                    {ratingBreakdown.map((item) => (
                      <div key={item.star} className="flex items-center gap-3 text-xs text-slate-700">
                        <span className="w-14 shrink-0 font-medium text-slate-700">
                          {item.star} Stars
                        </span>
                        
                        {/* Progress Bar Track */}
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-950 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>

                        {/* Count number on the right */}
                        <span className="w-6 text-right font-semibold text-slate-800">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* "Read all Reviews" Pill Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="px-6 py-2.5 rounded-full border border-slate-900 text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      {showAllReviews ? 'Hide Reviews' : 'Read all Reviews'}
                    </button>
                  </div>

                  {/* Customer Reviews List */}
                  {showAllReviews && (
                    <div className="pt-4 border-t border-slate-100 space-y-4 animate-fade-in">
                      {reviewsList.map((rev) => (
                        <div key={rev.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                            <span className="text-[11px] text-slate-400">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Shipping & Delivery Footer */}
          <div className="pt-2 flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl border border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 font-medium text-slate-700">
              <Truck className="w-4 h-4 text-slate-500" />
              <span>2-4 workdays</span>
            </div>
            <span className="font-bold text-emerald-600">Free Delivery</span>
          </div>
        </div>
      </div>

      {/* "For you" Products Section (Displays all items below) */}
      <section className="mt-16 pt-12 border-t border-slate-200 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            For you
          </h2>
        </div>

        {/* 4-column responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onToggleLike={onToggleLike}
              onAddToCart={onAddToCart}
              onSelectProduct={(p) => {
                onSelectProduct?.(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
