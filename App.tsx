import React, { useState } from 'react';
import { ScanSearch, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import GlassCard from './components/GlassCard';
import InputSection from './components/InputSection';
import ResultsPanel from './components/ResultsPanel';
import ShareButton from './components/ShareButton';
import AdBanner from './components/AdBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Privacy from './components/Privacy';
import { analyzeMatch } from './services/geminiService';
import { InputData, AnalysisResult } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [resume, setResume] = useState<InputData | null>(null);
  const [jd, setJd] = useState<InputData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!resume || !jd) {
      setError("Please provide both a Resume and a Job Description.");
      return;
    }
    if ((resume.type === 'text' && !resume.content.trim()) || 
        (jd.type === 'text' && !jd.content.trim())) {
      setError("Text inputs cannot be empty.");
      return;
    }

    setIsScanning(true);
    setError(null);
    setResult(null);

    try {
      const res = await analyzeMatch(resume, jd);
      setResult(res);
      setCurrentPage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-background">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Refined Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col gap-8 relative z-10 p-4 sm:p-6 pb-12">
        {currentPage === 'home' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            <div className="mt-2">
              <AdBanner />
            </div>

            {/* Header */}
            <div className="text-center space-y-3 mt-2">
              <div className="inline-flex items-center justify-center p-3.5 bg-surfaceHighlight/50 rounded-2xl border border-white/5 mb-2 shadow-inner">
                <ScanSearch className="text-primary w-7 h-7" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
                MatchFit
                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
              </h1>
              <p className="text-zinc-400 text-sm font-medium">AI-Powered Resume & Job Alignment</p>
            </div>

            {/* Main Form Area */}
            <div className="space-y-6">
              <InputSection 
                label="Resume" 
                placeholder="Enter or paste your resume content..."
                value={resume}
                onChange={(val) => { setResume(val); setError(null); }}
              />
              
              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-x-0 h-px bg-zinc-800"></div>
                <span className="relative bg-background px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] rounded-full border border-zinc-800 py-1">
                  Versus
                </span>
              </div>

              <InputSection 
                label="Job Description" 
                placeholder="Enter or paste the target job description..."
                value={jd}
                onChange={(val) => { setJd(val); setError(null); }}
              />

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center animate-in fade-in slide-in-from-top-2 duration-300 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                  {error}
                </div>
              )}

              <button
                onClick={handleScan}
                disabled={isScanning || !resume || !jd}
                className="w-full relative group overflow-hidden rounded-2xl font-bold text-base py-4.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                {/* Dynamic glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-[1.05]"></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                
                <div className="relative flex items-center justify-center gap-2 text-white p-4">
                  {isScanning ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Analyzing Match...</span>
                    </>
                  ) : (
                    <span>Scan Alignment</span>
                  )}
                </div>
              </button>
            </div>

            <div className="mt-4">
              <AdBanner />
            </div>
          </div>
        )}

        {currentPage === 'result' && result && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out pt-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold text-sm bg-surfaceHighlight/30 px-4 py-2.5 rounded-xl border border-white/5 hover:bg-surfaceHighlight w-fit"
              >
                <ArrowLeft size={16} /> Back to Scanner
              </button>
            </div>
            
            <ResultsPanel result={result} />
            <ShareButton score={result.score} />

            <div className="mt-4">
              <AdBanner />
            </div>
          </div>
        )}

        {currentPage === 'about' && <About onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <Privacy onNavigate={handleNavigate} />}

      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
