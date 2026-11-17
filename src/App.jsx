import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import CategoryPills from './components/CategoryPills.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import ProductCard from './components/ProductCard.jsx';
import SearchPage from './components/SearchPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import FavoritesPage from './components/FavoritesPage.jsx';
import CartPage from './components/CartPage.jsx';
import { categories, heroData, allProducts as initialProducts } from './data/homeData.js';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'search' | 'product-detail' | 'favorites' | 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState(initialProducts);
  // Initialized with 2 sample items matching the Figma checkout screen (Total: $430)
  const [cart, setCart] = useState([
    {
      product: {
        id: 991,
        title: 'Anti-Glare Sunnies',
        brand: 'ShineStopper',
        category: 'Shoes',
        price: 230.0,
        originalPrice: null,
        discount: null,
        badge: 'Exclusive',
        image: '/images/shoe.png',
        isLiked: false,
      },
      quantity: 1,
      size: '44',
    },
    {
      product: {
        id: 992,
        title: 'Cool guy shirt',
        brand: 'In the Navy',
        category: 'Clothes',
        price: 200.0,
        originalPrice: null,
        discount: null,
        badge: null,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        isLiked: false,
      },
      quantity: 1,
      size: '44',
    },
  ]);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync state when products in homeData.js change
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Open product detail page
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle wishlist heart
  const handleToggleLike = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct((prev) => ({ ...prev, isLiked: !prev.isLiked }));
    }
  };

  // Add to Cart
  const handleAddToCart = (product, size = 'US 9') => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });

    setToastMessage(`Added "${product.title}" to your cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Remove single item from cart
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = products.filter((item) => item.isLiked).length;

  // Filter products by selected Category Pill
  const displayedProducts = activeCategory === 'All'
    ? products
    : products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-slate-900 selection:text-white pb-16">
      {/* 1. Top Red Promo Banner (matching Figma) */}
      <AnnouncementBar />

      {/* 2. Web Responsive Navbar with Screen Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          if (screen !== 'product-detail') setSelectedProduct(null);
        }}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {/* Main Web Content Area */}
      <main className="flex-1">
        {currentScreen === 'product-detail' && selectedProduct ? (
          /* Product Details Screen */
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onBack={() => setCurrentScreen('home')}
            onAddToCart={handleAddToCart}
            onToggleLike={handleToggleLike}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentScreen === 'search' ? (
          /* Search & Results / Empty State Screen */
          <SearchPage
            products={products}
            onAddToCart={handleAddToCart}
            onToggleLike={handleToggleLike}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentScreen === 'favorites' ? (
          /* Favorites / Liked Items Screen */
          <FavoritesPage
            products={products}
            onToggleLike={handleToggleLike}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onExplore={() => setCurrentScreen('home')}
          />
        ) : currentScreen === 'cart' ? (
          /* Cart & Checkout Screen (matching Figma) */
          <CartPage
            cart={cart}
            products={products}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onToggleLike={handleToggleLike}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onClearCart={() => setCart([])}
            onExplore={() => setCurrentScreen('home')}
          />
        ) : (
          /* Home & All Catalog Screen */
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Category Pills (All, Deals, Clothes, Shoes, Accessories, Fragrance, New In) */}
            <section>
              <CategoryPills
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </section>

            {/* Hero Banner ("Hot drops") - Shown on Home */}
            {activeCategory === 'All' && (
              <section>
                <HeroBanner
                  data={heroData}
                  onSelectHero={() => {
                    const heroSneaker = products.find((p) => p.title.includes('Sneakers')) || products[0];
                    handleSelectProduct(heroSneaker);
                  }}
                />
              </section>
            )}

            {/* "All" Catalog Header */}
            <section className="space-y-6">
              <div className="flex items-baseline justify-between pt-2 pb-2 border-b border-slate-100">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    {activeCategory}
                  </h1>
                  {activeCategory !== 'All' && (
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
                    >
                      Show all
                    </button>
                  )}
                </div>

                <span className="text-sm font-medium text-slate-400">
                  {activeCategory === 'All' ? `${products.length} results` : `${displayedProducts.length} items`}
                </span>
              </div>

              {/* Web Product Grid (4 columns desktop) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onToggleLike={handleToggleLike}
                    onAddToCart={handleAddToCart}
                    onSelectProduct={handleSelectProduct}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
