import React from 'react';
import GlassCard from './GlassCard';
import { Target, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-3 mt-4 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">About Us</h1>
        <p className="text-zinc-400 text-sm font-medium">Empowering your job search with AI.</p>
      </div>

      <GlassCard className="p-6 md:p-8 space-y-6">
        <p className="text-zinc-300 leading-relaxed text-sm">
          MatchFit is an advanced AI-powered resume scanner designed to bridge the gap between job seekers and employers. Our platform utilizes state-of-the-art natural language processing to simulate Applicant Tracking Systems (ATS), providing you with real-time feedback on how well your resume aligns with specific job descriptions.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
            <Target className="text-primary w-7 h-7 mb-3" />
            <h3 className="text-white font-semibold text-sm mb-1.5">Precision Matching</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Identifies exact keyword matches and critical missing skills for your target role.</p>
          </div>
          <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
            <Zap className="text-secondary w-7 h-7 mb-3" />
            <h3 className="text-white font-semibold text-sm mb-1.5">Instant Feedback</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">Get actionable, personalized insights within seconds to optimize your application.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default About;
