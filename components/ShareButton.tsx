import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  score?: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ score }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = score 
      ? `I just scored a ${score}% match on my resume! Check out MatchFit Scanner.` 
      : `Scan your resume against any job description with MatchFit!`;
    const shareUrl = window.location.href;
      
    // Try native share API primarily for mobile devices
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: 'MatchFit Resume Scanner',
          text: text,
          url: shareUrl,
        });
        return; // Success, exit
      } catch (err) {
        console.log('Native share failed or canceled', err);
        // Fallthrough to clipboard
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Ultimate fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = `${text} ${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Clipboard copy entirely failed', e);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl font-semibold transition-all duration-300 bg-surfaceHighlight/50 text-zinc-300 hover:bg-surfaceHighlight hover:text-white border border-white/5 hover:border-white/10"
    >
      {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} className="text-primary/70" />}
      {copied ? 'Link Copied to Clipboard!' : 'Share Results'}
    </button>
  );
};

export default ShareButton;
