import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto h-[60px] bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.15em] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-pulse"></span>
        Advertisement
      </p>
    </div>
  );
};

export default AdBanner;
