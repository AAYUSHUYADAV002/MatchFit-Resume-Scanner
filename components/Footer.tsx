import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-6 mt-auto border-t border-white/5 bg-surface/20 backdrop-blur-lg relative z-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-500 text-xs font-medium">
          &copy; {new Date().getFullYear()} MatchFit. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('about')}
            className="text-zinc-400 hover:text-white text-xs font-medium transition-colors"
          >
            About Us
          </button>
          <button 
            onClick={() => onNavigate('privacy')}
            className="text-zinc-400 hover:text-white text-xs font-medium transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
