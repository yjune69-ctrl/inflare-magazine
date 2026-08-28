import React, { useState } from 'react';
import { Influencer } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  Link2, 
  Share2
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencer?: Influencer | null;
  activeTab?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  influencer,
  activeTab = 'hot100'
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Determine current origin URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  let targetUrl = baseUrl;
  if (influencer) {
    targetUrl = `${baseUrl}?influencer=${influencer.id}`;
  } else if (activeTab && activeTab !== 'hot100') {
    targetUrl = `${baseUrl}?tab=${activeTab}`;
  }

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(targetUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = targetUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: influencer 
            ? `INFLARE MAGAZINE - ${influencer.koreanName || influencer.name}` 
            : 'INFLARE MAGAZINE',
          url: targetUrl,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#121620] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">링크 복사</h3>
              <p className="text-xs text-slate-400">
                {influencer 
                  ? `${influencer.koreanName || influencer.name} 프로필 링크` 
                  : 'INFLARE MAGAZINE 웹사이트 주소'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-share-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* URL Input & Copy Button */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-[#0B0D12] border border-white/10 rounded-xl p-1.5 focus-within:border-amber-500/50 transition-colors">
            <input
              type="text"
              readOnly
              value={targetUrl}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-200 font-mono outline-none select-all"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              id="btn-copy-url-confirm"
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>복사</span>
                </>
              )}
            </button>
          </div>

          {/* Optional Native Share button for Mobile */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span>기기 공유 메뉴 열기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
