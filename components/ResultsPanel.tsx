import React, { useEffect, useState } from 'react';
import { AnalysisResult } from '../types';
import GlassCard from './GlassCard';
import { CheckCircle2, AlertTriangle, ChevronRight, Lightbulb, TrendingUp } from 'lucide-react';

interface ResultsPanelProps {
  result: AnalysisResult | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (result) {
      // Small delay before animating the score for better visual effect
      const timer = setTimeout(() => setAnimatedScore(result.score), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [result]);

  if (!result) return null;

  const getThemeVars = (score: number) => {
    if (score >= 80) return { color: 'text-emerald-400', stroke: '#34d399', bg: 'bg-emerald-500/10', icon: 'text-emerald-500' };
    if (score >= 50) return { color: 'text-amber-400', stroke: '#fbbf24', bg: 'bg-amber-500/10', icon: 'text-amber-500' };
    return { color: 'text-rose-400', stroke: '#fb7185', bg: 'bg-rose-500/10', icon: 'text-rose-500' };
  };

  const theme = getThemeVars(result.score);
  
  // SVG Circle math
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;

  return (
    <GlassCard className="p-6 md:p-8 overflow-hidden relative">
      {/* Background glow based on score */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none ${theme.bg.replace('/10', '')}`}></div>

      <div className="flex flex-col items-center mb-8 relative z-10">
        <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-6">Match Score</h3>
        
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Background Track */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-zinc-800" />
            {/* Animated Progress Ring */}
            <circle 
              cx="50" 
              cy="50" 
              r={radius} 
              fill="none" 
              stroke={theme.stroke} 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1500 ease-out" 
            />
          </svg>
          
          <div className="flex flex-col items-center justify-center">
            <span className={`text-5xl font-extrabold tracking-tighter ${theme.color} tabular-nums`}>
              {animatedScore}
            </span>
            <span className="text-zinc-500 text-sm font-medium mt-[-4px]">%</span>
          </div>
        </div>
        
        <p className="mt-6 text-center text-zinc-300 text-sm font-medium max-w-sm leading-relaxed px-4">
          "{result.feedback}"
        </p>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Missing Keywords Section */}
        <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
          <h4 className="text-xs uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className={theme.icon} />
            Key Missing Elements
          </h4>
          
          <div className="space-y-2">
            {result.missingKeywords.length > 0 ? (
              result.missingKeywords.map((kw, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 bg-surfaceHighlight/40 p-3 rounded-xl border border-white/5 animate-in slide-in-from-right-4 fade-in duration-500 fill-mode-both"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <ChevronRight size={16} className={`${theme.icon} shrink-0 mt-0.5 opacity-70`} />
                  <span className="text-sm font-medium text-zinc-200">{kw}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 text-sm font-medium">
                <CheckCircle2 size={18} />
                Excellent match! No major keywords missing.
              </div>
            )}
          </div>
        </div>

        {/* Actionable Tips Section */}
        {result.tips && result.tips.length > 0 && (
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
            <h4 className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-2 mb-4">
              <TrendingUp size={14} className="text-primary" />
              Tips to Increase Your Score
            </h4>
            
            <div className="space-y-3">
              {result.tips.map((tip, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-white/5 animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
                  style={{ animationDelay: `${(idx + (result.missingKeywords?.length || 0)) * 150}ms` }}
                >
                  <div className="p-1.5 bg-primary/20 rounded-lg shrink-0 mt-0.5">
                    <Lightbulb size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default ResultsPanel;
