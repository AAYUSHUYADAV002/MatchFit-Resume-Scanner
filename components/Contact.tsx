import React from 'react';
import GlassCard from './GlassCard';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3 mt-4 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Contact Us</h1>
        <p className="text-zinc-400 text-sm font-medium">We'd love to hear from you.</p>
      </div>

      <GlassCard className="p-6 md:p-8">
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-black/20 rounded-2xl border border-white/5">
            <Mail className="text-primary w-6 h-6 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white font-semibold text-sm">Email Support</h3>
              <p className="text-zinc-400 text-sm mt-1.5">support@matchfit-scanner.app</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-black/20 rounded-2xl border border-white/5">
            <MessageSquare className="text-secondary w-6 h-6 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white font-semibold text-sm">Social Media</h3>
              <p className="text-zinc-400 text-sm mt-1.5">@MatchFitApp on Twitter & LinkedIn</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-black/20 rounded-2xl border border-white/5">
            <MapPin className="text-emerald-400 w-6 h-6 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-white font-semibold text-sm">Headquarters</h3>
              <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">123 AI Boulevard, Tech District<br/>San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Contact;
