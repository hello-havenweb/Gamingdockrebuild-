import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#15171e] border border-[#242836] rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
        
        <div className="flex items-center justify-between border-b border-[#242836] pb-3">
          <div className="flex items-center gap-2 text-white">
            <Share2 className="w-5 h-5 text-[#ff3045]" />
            <h3 className="font-heading font-bold text-lg">Share Game</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#202430] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#9ca3af]">
          Share <span className="text-white font-semibold">{title}</span> with friends or fellow gamers:
        </p>

        {/* COPY FIELD */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0b0c10] border border-[#242836] rounded-xl">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 bg-transparent px-3 text-xs text-[#9ca3af] focus:outline-none truncate select-all"
          />
          <button
            onClick={handleCopy}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#ff3045] hover:bg-[#e02438] text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
