import React from 'react';
import { ScanSearch } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="w-full border-b border-white/5 bg-surface/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <ScanSearch className="text-primary w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">MatchFit</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
