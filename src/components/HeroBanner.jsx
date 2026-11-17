import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner({ data, onSelectHero }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E0E7FF] via-[#EAE6F8] to-[#C7D2FE] p-6 sm:p-10 lg:p-14 shadow-sm border border-indigo-100/60">
      {/* Background Soft Glow Pattern */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col items-start space-y-4 max-w-lg">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-900/5 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Featured Collection
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {data.badge}
          </h1>
          <p className="text-base sm:text-xl text-slate-700 font-medium">
            {data.subtitle}
          </p>
          <div className="pt-2">
            <button
              onClick={onSelectHero}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white font-semibold text-sm hover:bg-slate-800 active:scale-95 transition-all shadow-md group cursor-pointer"
            >
              <span>{data.ctaText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual with Overlap / Depth */}
        <div className="relative flex items-center justify-center">
          <div
            onClick={onSelectHero}
            className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 group cursor-pointer"
          >
            <img
              src={data.image}
              alt="Must have sneakers - Hot drops"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            {/* Sneaker Accent Floating Tag */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock • Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
