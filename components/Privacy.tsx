import React from 'react';
import GlassCard from './GlassCard';
import { ShieldCheck, Eye, Database, ArrowLeft } from 'lucide-react';

interface PrivacyProps {
  onNavigate: (page: string) => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold text-sm bg-surfaceHighlight/30 px-4 py-2.5 rounded-xl border border-white/5 hover:bg-surfaceHighlight w-fit"
      >
        <ArrowLeft size={16} /> Back to Scanner
      </button>

      <div className="text-center space-y-3 mt-4 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm font-medium">Your data security is our priority.</p>
      </div>

      <GlassCard className="p-6 md:p-8 space-y-6">
        <p className="text-zinc-300 text-sm leading-relaxed">
          At MatchFit, we process your resume and job description inputs in real-time to generate match scores and feedback. We are committed to ensuring your personal information remains confidential and secure.
        </p>

        {/* Required Google AdSense Clause */}
        <div className="p-5 bg-primary/10 border border-primary/20 rounded-2xl flex gap-4 items-start">
          <Eye className="text-primary w-6 h-6 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-primary font-bold text-sm mb-1.5">Advertising & Cookies</h3>
            <p className="text-zinc-200 text-sm leading-relaxed font-medium">
              This site uses Google AdSense to serve ads and cookies to personalize content.
            </p>
          </div>
        </div>

        <div className="space-y-5 pt-2">
          <div className="flex gap-4 items-start">
            <Database className="text-zinc-400 w-6 h-6 shrink-0" />
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Data Processing</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Your documents are temporarily processed by our AI models to generate insights and are not permanently stored on our servers.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <ShieldCheck className="text-zinc-400 w-6 h-6 shrink-0" />
            <div>
              <h4 className="text-white text-sm font-semibold mb-1">Security Measures</h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                We implement industry-standard encryption and security protocols to prevent unauthorized access to your data during transmission.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Privacy;
