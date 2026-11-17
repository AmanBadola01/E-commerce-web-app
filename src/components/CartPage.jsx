import React, { useState } from 'react';
import {
  Truck,
  Mail,
  ChevronRight,
  Check,
  X,
  MoreVertical,
  Trash2,
  Heart,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Minus,
  MapPin,
  CreditCard,
  Package,
  CheckCircle,
} from 'lucide-react';
import ProductCard from './ProductCard.jsx';

const checkoutSteps = [
  { number: 1, label: 'Shop' },
  { number: 2, label: 'Address' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Confirm' },
  { number: 5, label: 'Ready!' },
];

export default function CartPage({
  cart = [],
  products = [],
  onUpdateQuantity,
  onRemoveFromCart,
  onToggleLike,
  onAddToCart,
  onSelectProduct,
  onClearCart,
  onExplore,
}) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Shop, 2: Address, 3: Payment, 4: Confirm, 5: Ready!
  const [showDeliveryBanner, setShowDeliveryBanner] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Address State (matching Figma default: Bikini Bottom)
  const [shippingAddress, setShippingAddress] = useState({
    title: 'My home address',
    street: '124 Conch Street',
    city: 'Bikini Bottom',
    region: 'Pacific Ocean',
  });

  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    title: 'Same as shipping adress',
    note: 'Menu Item 3',
  });

  // Payment State (matching Figma default: Will Treaty, 5322 •••• 6886, Expires: 05/26)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditcard');
  const [cardDetails, setCardDetails] = useState({
    cardholder: 'Will Treaty',
    cardNumber: '5322 •••• 6886',
    expiry: '05/26',
    cvv: '888',
    brand: 'VISA',
  });

  // Modals
  const [isEditingShipping, setIsEditingShipping] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  const [tempShipping, setTempShipping] = useState(shippingAddress);
  const [tempBilling, setTempBilling] = useState(billingAddress);
  const [tempCard, setTempCard] = useState(cardDetails);

  // Calculations
  const totalArticles = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryCost = subtotal >= 50 || subtotal === 0 ? 0 : 10;
  const totalPrice = subtotal + deliveryCost;

  // Step header title
  const stepTitles = {
    1: 'Shopping cart',
    2: 'Address',
    3: 'Payment',
    4: 'Confirm',
    5: 'Ready!',
  };

  const handleSaveShipping = (e) => {
    e.preventDefault();
    setShippingAddress(tempShipping);
    setIsEditingShipping(false);
  };

  const handleSaveBilling = (e) => {
    e.preventDefault();
    setBillingAddress(tempBilling);
    setIsEditingBilling(false);
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    setCardDetails(tempCard);
    setIsEditingCard(false);
  };

  // Payment methods matching Figma screenshot
  const paymentMethods = [
    {
      id: 'bancontact',
      name: 'Bancontact',
      badge: (
        <div className="px-2.5 py-1 rounded border border-slate-200 bg-white shadow-2xs flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#004A99] inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFD100] inline-block" />
          </div>
          <span className="text-[11px] font-bold tracking-tight text-slate-800">
            Bancontact
          </span>
        </div>
      ),
    },
    {
      id: 'creditcard',
      name: 'Creditcard',
      hasChangeOption: true,
      badge: (
        <div className="px-3 py-1 rounded border border-slate-200 bg-white shadow-2xs flex items-center justify-center">
          <span className="text-xs font-black italic tracking-wider text-[#1A1F71]">
            {cardDetails.brand || 'VISA'}
          </span>
        </div>
      ),
    },
    {
      id: 'paypal',
      name: 'Paypal',
      badge: (
        <div className="px-2.5 py-1 rounded border border-slate-200 bg-white shadow-2xs flex items-center gap-1">
          <span className="text-xs font-extrabold italic text-[#003087]">
            Pay<span className="text-[#0079C1]">Pal</span>
          </span>
        </div>
      ),
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      badge: (
        <div className="px-3 py-1 rounded border border-slate-200 bg-white shadow-2xs flex items-center gap-1">
          <svg className="w-3 h-3 fill-slate-900" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.54-9.9-11.66-21.2-15.36-33.89-3.7-12.7-5.55-24.87-5.55-36.5 0-14.12 3.6-26.04 10.8-35.77 7.2-9.72 16.34-14.68 27.42-14.88 4.79 0 10.23 1.25 16.33 3.75 6.1 2.5 10.3 3.75 12.6 3.75 2.18 0 6.64-1.36 13.39-4.08 6.75-2.72 12.42-3.89 17.02-3.51 15.25.99 26.68 6.54 34.29 16.65-13.62 8.28-20.31 19.49-20.07 33.64.24 11.09 4.35 20.35 12.33 27.79 7.98 7.44 17.54 11.67 28.69 12.69-2.4 7.29-5.4 14.65-9.01 22.08zM119.22 33.28c0-7.29 2.67-14.15 8.01-20.59 5.34-6.44 11.92-10.45 19.74-12.03.65 6.96-1.57 13.71-6.66 20.25-5.09 6.54-11.53 10.68-19.32 12.42-.54-.05-1.12-.05-1.77-.05z" />
          </svg>
          <span className="text-xs font-semibold text-slate-900 tracking-tight">Pay</span>
        </div>
      ),
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      badge: (
        <div className="px-2.5 py-1 rounded border border-slate-200 bg-white shadow-2xs flex items-center gap-1">
          <span className="text-xs font-bold text-[#4285F4]">G</span>
          <span className="text-xs font-semibold text-slate-700 tracking-tight">Pay</span>
        </div>
      ),
    },
    {
      id: 'crypto',
      name: 'Crypto Pay', 
      subLabel: 'Crypto / Bitcoin',
      badge: (
        <div className="w-8 h-8 rounded-full bg-[#F7931A] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
          ₿
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Title & Article Count (matching Figma) */}
      <div className="flex items-baseline justify-between pt-2 pb-4 border-b border-slate-100 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {currentStep === 5 ? 'Ready' : stepTitles[currentStep] || 'Checkout'}
        </h1>
        {currentStep !== 5 && (
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            {totalArticles} {totalArticles === 1 ? 'Item' : 'Item'}
          </span>
        )}
      </div>

      {/* 5-Step Checkout Progress Line (matching Figma) */}
      <div className="py-4 mb-8 max-w-xl mx-auto">
        <div className="flex items-center justify-between relative">
          {checkoutSteps.map((step, index) => {
            const isCurrent = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <React.Fragment key={step.number}>
                {/* Step Circle & Label */}
                <div className="flex flex-col items-center group relative z-10">
                  <div
                    onClick={() => setCurrentStep(step.number)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-[#22C55E] text-white shadow-sm ring-2 ring-emerald-500/20'
                        : isCurrent
                        ? 'bg-slate-950 text-white shadow-md ring-4 ring-slate-950/10'
                        : 'bg-[#F1F0F7] text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-2 tracking-tight transition-colors ${
                      isCurrent
                        ? 'text-slate-900 font-bold'
                        : isCompleted
                        ? 'text-emerald-600 font-semibold'
                        : 'text-slate-400 font-medium'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connecting Line between steps */}
                {index < checkoutSteps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 -mt-5 transition-colors ${
                      currentStep > index + 1 ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {cart.length === 0 && currentStep !== 5 ? (
        /* Empty State: Matching Figma empty cart */
        <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4 animate-fade-in">
          <div className="w-56 sm:w-64 aspect-square mb-6 flex items-center justify-center">
            <img
              src="/images/checkout.png"
              alt="Cart is empty"
              className="w-full h-full object-contain drop-shadow-sm select-none"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6">
            Cart is empty
          </h2>

          <button
            onClick={onExplore}
            className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Inspire me!
          </button>
        </div>
      ) : (
        /* Multi-Step Checkout Body */
        <div className="space-y-6">
          {/* STEP 1: SHOP (Cart Items) */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Expected Delivery Banner */}
              {showDeliveryBanner && (
                <div className="bg-[#F8F7FF] border border-slate-900 rounded-2xl p-4 flex items-center justify-between gap-3 text-slate-800 animate-fade-in shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#6D28D9] shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-900">
                      Expected delivery 2 days!
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDeliveryBanner(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 2-Column Checkout Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                {/* Left Column: Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-all relative"
                    >
                      {/* Thumbnail Image */}
                      <div
                        onClick={() => onSelectProduct?.(item.product)}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 cursor-pointer p-2 flex items-center justify-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 pr-8">
                        <span className="text-xs font-semibold text-slate-400 block truncate">
                          {item.product.brand || item.product.category}
                        </span>
                        <h3
                          onClick={() => onSelectProduct?.(item.product)}
                          className="text-base sm:text-lg font-bold text-slate-900 truncate hover:text-indigo-600 cursor-pointer transition-colors mt-0.5"
                        >
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Size: <span className="font-semibold text-slate-700">{item.size || '44'}</span>
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-1">
                          <span className="text-lg font-extrabold text-slate-900">
                            ${item.product.price.toFixed(0)}
                          </span>

                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 p-0.5">
                            <button
                              onClick={() => onUpdateQuantity?.(item.product.id, -1)}
                              className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity?.(item.product.id, 1)}
                              className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Three Dots Menu (⋮) */}
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() =>
                            setActiveMenuId(activeMenuId === item.product.id ? null : item.product.id)
                          }
                          className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                          aria-label="Item options"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Dropdown Options */}
                        {activeMenuId === item.product.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-20 animate-fade-in text-xs">
                            <button
                              onClick={() => {
                                onToggleLike?.(item.product.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              <Heart className="w-4 h-4 text-rose-500" />
                              <span>{item.product.isLiked ? 'Remove from Favorites' : 'Save to Favorites'}</span>
                            </button>
                            <button
                              onClick={() => {
                                onRemoveFromCart?.(item.product.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Remove Item</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
                  <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery</span>
                      <span className="font-semibold text-slate-900">
                        {deliveryCost === 0 ? '0,00 $' : `${deliveryCost},00 $`}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">{subtotal.toFixed(0)} $</span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                    <span className="text-base font-bold text-slate-900">Total Price</span>
                    <span className="text-2xl font-black text-slate-900">{totalPrice.toFixed(0)} $</span>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Secure Checkout • Verve Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS (Matching user's screenshot) */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start animate-fade-in">
              {/* Left Column: Address Selection Cards */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                  {/* 1. Shipping Address Row */}
                  <div
                    onClick={() => {
                      setTempShipping(shippingAddress);
                      setIsEditingShipping(true);
                    }}
                    className="p-6 sm:p-7 flex items-start gap-5 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <Truck className="w-6 h-6 stroke-[1.75] text-slate-800 shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-slate-900 block tracking-tight">
                        shipping address
                      </span>
                      <p className="text-sm font-semibold text-slate-700 mt-2">
                        {shippingAddress.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {shippingAddress.street}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {shippingAddress.city}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {shippingAddress.region}
                      </p>
                    </div>

                    <div className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all pt-1">
                      <ChevronRight className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  {/* 2. Billing Address Row */}
                  <div
                    onClick={() => {
                      setTempBilling(billingAddress);
                      setIsEditingBilling(true);
                    }}
                    className="p-6 sm:p-7 flex items-start gap-5 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <Mail className="w-6 h-6 stroke-[1.75] text-slate-800 shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-slate-900 block tracking-tight">
                        billing address
                      </span>
                      <p className="text-sm text-slate-600 mt-2">
                        {billingAddress.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {billingAddress.note}
                      </p>
                    </div>

                    <div className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all pt-1">
                      <ChevronRight className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to items list</span>
                </button>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-slate-900">
                      {deliveryCost === 0 ? '0,00 $' : `${deliveryCost},00 $`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{subtotal.toFixed(0)} $</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Total Price</span>
                  <span className="text-2xl font-black text-slate-900">{totalPrice.toFixed(0)} $</span>
                </div>

                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Checkout • Verve Guaranteed</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT (Matching user's screenshot) */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start animate-fade-in">
              {/* Left Column: Payment Methods List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPaymentMethod === method.id;

                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                          isSelected ? 'bg-slate-50/60' : 'hover:bg-slate-50/40'
                        }`}
                      >
                        {/* Radio Button + Method Name */}
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-2 border-indigo-600'
                                : 'border-2 border-slate-300'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                            )}
                          </div>

                          <div>
                            <span className="text-sm font-semibold text-slate-900 block">
                              {method.name}
                            </span>
                            {method.subLabel && (
                              <span className="text-[11px] text-slate-400 block -mt-0.5">
                                {method.subLabel}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right side: Change Action & Brand Badge */}
                        <div className="flex items-center gap-3">
                          {isSelected && method.hasChangeOption && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTempCard(cardDetails);
                                setIsEditingCard(true);
                              }}
                              className="text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors underline-offset-2 hover:underline cursor-pointer"
                            >
                              Change
                            </button>
                          )}
                          {method.badge}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to address</span>
                </button>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-slate-900">
                      {deliveryCost === 0 ? '0,00 $' : `${deliveryCost},00 $`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{subtotal.toFixed(0)} $</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Total Price</span>
                  <span className="text-2xl font-black text-slate-900">{totalPrice.toFixed(0)} $</span>
                </div>

                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Checkout • Verve Guaranteed</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRM (Matching user's new screenshot) */}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start animate-fade-in">
              {/* Left Column: Confirmation Sections List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                  {/* 1. Items Review Section */}
                  <div
                    onClick={() => setCurrentStep(1)}
                    className="p-6 sm:p-7 flex items-start gap-5 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <Package className="w-6 h-6 stroke-[1.75] text-slate-800 shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-slate-900 block tracking-tight">
                        Items
                      </span>
                      <div className="mt-2 space-y-1">
                        {cart.map((item) => (
                          <p
                            key={item.product.id}
                            className="text-sm text-slate-500 leading-relaxed truncate"
                          >
                            {item.quantity} x {item.product.title}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all pt-1">
                      <ChevronRight className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  {/* 2. Shipping Address Review Section */}
                  <div
                    onClick={() => setCurrentStep(2)}
                    className="p-6 sm:p-7 flex items-start gap-5 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <Truck className="w-6 h-6 stroke-[1.75] text-slate-800 shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-slate-900 block tracking-tight">
                        shipping address
                      </span>
                      <p className="text-sm font-semibold text-slate-700 mt-2">
                        {shippingAddress.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {shippingAddress.street}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {shippingAddress.city}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {shippingAddress.region}
                      </p>
                    </div>

                    <div className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all pt-1">
                      <ChevronRight className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>

                  {/* 3. Payment Review Section */}
                  <div
                    onClick={() => setCurrentStep(3)}
                    className="p-6 sm:p-7 flex items-start gap-5 hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <CreditCard className="w-6 h-6 stroke-[1.75] text-slate-800 shrink-0 mt-0.5" />

                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-bold text-slate-900 block tracking-tight">
                        Payment
                      </span>
                      <p className="text-sm font-semibold text-slate-700 mt-2">
                        {cardDetails.cardholder}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {cardDetails.cardNumber}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        Expires: {cardDetails.expiry}
                      </p>
                    </div>

                    <div className="text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all pt-1">
                      <ChevronRight className="w-6 h-6 stroke-[2]" />
                    </div>
                  </div>
                </div>

                {/* Return to Payment button */}
                <button
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to payment</span>
                </button>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 space-y-5">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-slate-900">
                      {deliveryCost === 0 ? '0,00 $' : `${deliveryCost},00 $`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{subtotal.toFixed(0)} $</span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                  <span className="text-base font-bold text-slate-900">Total Price</span>
                  <span className="text-2xl font-black text-slate-900">{totalPrice.toFixed(0)} $</span>
                </div>

                {/* Confirm & Pay Button */}
                <button
                  onClick={() => setCurrentStep(5)}
                  className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm & Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Checkout • Verve Guaranteed</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: READY! (Order Success Screen matching Figma) */}
          {currentStep === 5 && (
            <div className="flex flex-col items-center justify-center py-6 sm:py-12 text-center px-4 animate-fade-in max-w-md mx-auto">
              {/* Confetti Celebration Monsters Illustration */}
              <div className="w-72 sm:w-80 max-w-full aspect-square mb-6 flex items-center justify-center">
                <img
                  src="/images/final_checkout.png"
                  alt="Success! Order Complete"
                  className="w-full h-full object-contain drop-shadow-sm select-none"
                />
              </div>

              {/* Success Headline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                Success!
              </h2>

              {/* Explore Button */}
              <button
                onClick={() => {
                  onClearCart?.();
                  onExplore?.();
                }}
                className="px-10 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Explore some more
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Shipping Address Modal */}
      {isEditingShipping && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Edit Shipping Address</h3>
              </div>
              <button
                onClick={() => setIsEditingShipping(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveShipping} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Address Label
                </label>
                <input
                  type="text"
                  value={tempShipping.title}
                  onChange={(e) => setTempShipping({ ...tempShipping, title: e.target.value })}
                  placeholder="e.g. My home address"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={tempShipping.street}
                  onChange={(e) => setTempShipping({ ...tempShipping, street: e.target.value })}
                  placeholder="e.g. 124 Conch Street"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={tempShipping.city}
                    onChange={(e) => setTempShipping({ ...tempShipping, city: e.target.value })}
                    placeholder="e.g. Bikini Bottom"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Region / Ocean</label>
                  <input
                    type="text"
                    value={tempShipping.region}
                    onChange={(e) => setTempShipping({ ...tempShipping, region: e.target.value })}
                    placeholder="e.g. Pacific Ocean"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingShipping(false)}
                  className="flex-1 py-3 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Billing Address Modal */}
      {isEditingBilling && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Edit Billing Address</h3>
              </div>
              <button
                onClick={() => setIsEditingBilling(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBilling} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Billing Preference
                </label>
                <input
                  type="text"
                  value={tempBilling.title}
                  onChange={(e) => setTempBilling({ ...tempBilling, title: e.target.value })}
                  placeholder="e.g. Same as shipping address"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Notes / Reference
                </label>
                <input
                  type="text"
                  value={tempBilling.note}
                  onChange={(e) => setTempBilling({ ...tempBilling, note: e.target.value })}
                  placeholder="e.g. Menu Item 3"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingBilling(false)}
                  className="flex-1 py-3 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
                >
                  Save Preference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Card Details Modal */}
      {isEditingCard && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Edit Card Details</h3>
              </div>
              <button
                onClick={() => setIsEditingCard(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Card Brand
                </label>
                <select
                  value={tempCard.brand}
                  onChange={(e) => setTempCard({ ...tempCard, brand: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  <option value="VISA">VISA</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">American Express</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={tempCard.cardholder}
                  onChange={(e) => setTempCard({ ...tempCard, cardholder: e.target.value })}
                  placeholder="Name on card"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={tempCard.cardNumber}
                  onChange={(e) => setTempCard({ ...tempCard, cardNumber: e.target.value })}
                  placeholder="•••• •••• •••• 4242"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={tempCard.expiry}
                    onChange={(e) => setTempCard({ ...tempCard, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={tempCard.cvv}
                    onChange={(e) => setTempCard({ ...tempCard, cvv: e.target.value })}
                    placeholder="•••"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingCard(false)}
                  className="flex-1 py-3 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* "For you" Continuous Browsing Section */}
      <section className="mt-20 pt-12 border-t border-slate-200 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            For you
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Trending items you might love
          </p>
        </div>

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
