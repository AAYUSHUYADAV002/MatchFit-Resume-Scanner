import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface/80 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-xl shadow-black/20 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
