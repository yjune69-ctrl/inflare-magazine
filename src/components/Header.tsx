import React from 'react';
import { ViewTab } from '../types';
import { 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  BookOpen, 
  PlusCircle, 
  Search,
  Award, 
  TrendingUp, 
  FileCheck,
  Link2,
  ShieldCheck,
  Lock,
  LogOut,
  Camera
} from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreatorStudio: () => void;
  inquiryCount: number;
  onOpenInquiries: () => void;
  onOpenShare?: () => void;
  isAdmin?: boolean;
  onOpenAdminLogin?: () => void;
  onLogoutAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenCreatorStudio,
  inquiryCount,
  onOpenInquiries,
  isAdmin = false
}) => {
  const tickerItems = [
    { tag: 'HOT ISSUE', text: '2026 MARCH EDITION: 인플루언서 핫100 1위 민소라(@soramin_style) 독점 인터뷰 & 화보 게제' },
    { tag: 'RANKING', text: '실시간 인플루언서 지수 v4.2 알고리즘 가동 중 • 카테고리별 랭킹 실시간 집계' },
    { tag: 'MATCHING', text: '스마트 브랜드-크리에이터 AI 매칭 솔루션 오픈 • 즉시 맞춤 캠페인 제안서 발송 가능' },
    { tag: 'EXCLUSIVE', text: '테크 크리에이터 이진욱 차세대 AI 디바이스 심층 분석 리포트 발행' },
    { tag: 'TREND', text: '2026 K-크리에이터 이코노미 리포트: 숏폼 커머스와 진성 팬덤의 융합 전략' },
    { tag: 'PRESS', text: 'INFLARE 공식 에디토리얼 아카이브 및 옴부즈만 팩트체크 시스템 상시 운영' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0D12]/90 backdrop-blur-md border-b border-white/10">
      {/* Top Magazine Ticker / Announcement Bar with Horizontal Scrolling Marquee */}
      <div className="bg-gradient-to-r from-amber-950/50 via-[#181108] to-amber-950/50 border-b border-amber-500/20 py-2 px-3 text-xs font-medium text-amber-300 overflow-hidden relative">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
          {/* Static Hot Issue Badge on Left */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-2.5 py-0.5 rounded font-black text-[11px] uppercase tracking-wider shrink-0 z-10 shadow-md">
            <Flame className="w-3.5 h-3.5 fill-black text-black" />
            <span>NEWS TICKET</span>
          </div>

          {/* Horizontally Scrolling Marquee Ticker */}
          <div className="overflow-hidden relative flex-1 flex items-center mask-linear-gradient">
            <div className="animate-marquee flex items-center gap-10">
              {/* Duplicate array for seamless infinite looping */}
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs whitespace-nowrap">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-[10px] tracking-wide">
                    {item.tag}
                  </span>
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer font-normal">
                    {item.text}
                  </span>
                  <span className="text-amber-500/30 mx-2">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Issue No Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-slate-400 shrink-0 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              LIVE
            </span>
            <span className="text-white/20">|</span>
            <span className="text-amber-400/90 font-mono">ISSUE NO. 84</span>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand & Subtitle */}
        <div className="flex items-center justify-between">
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('hot100')}
            className="cursor-pointer group flex items-baseline gap-2.5"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 text-black fill-black" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <h1 className="font-editorial text-2xl md:text-3xl font-black tracking-widest text-white group-hover:text-amber-400 transition-colors">
                    INFLARE
                  </h1>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-500 font-display">
                    MAGAZINE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
                  INFLUENCER HOT 100 & MATCHING SYSTEM
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Right Action */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-btn-creator-studio"
              onClick={onOpenCreatorStudio}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold flex items-center gap-1 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              크리에이터 스튜디오
            </button>
            <button
              id="mobile-btn-inquiries-drawer"
              onClick={onOpenInquiries}
              className="relative p-2 rounded-lg bg-[#161B26] border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1 hover:text-white"
              title="제안서 보관함"
            >
              <FileCheck className="w-4 h-4 text-amber-400" />
              {inquiryCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center -top-1 -right-1 absolute">
                  {inquiryCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md mx-0 md:mx-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            placeholder="인플루언서 이름, @아이디, 카테고리, 관심 브랜드 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161B26] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              취소
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            id="btn-creator-studio"
            onClick={onOpenCreatorStudio}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-105 cursor-pointer ring-1 ring-amber-300"
          >
            <Sparkles className="w-4 h-4 text-black fill-black animate-pulse" />
            <span>크리에이터 스튜디오</span>
          </button>

          <button
            id="btn-inquiries-drawer"
            onClick={onOpenInquiries}
            className="relative px-3 py-2 rounded-xl bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-amber-400" />
            <span>제안서 보관함</span>
            {inquiryCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[11px] font-bold flex items-center justify-center ml-0.5">
                {inquiryCount}
              </span>
            )}
          </button>
        </div>
      </div>


      {/* Main Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 border-t border-white/5 overflow-x-auto no-scrollbar">
        {/* 1. 매거진 화보 */}
        <button
          id="nav-tab-magazine"
          onClick={() => setActiveTab('magazine')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'magazine'
              ? 'text-amber-400 border-amber-500 bg-amber-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>매거진 화보 & 룩북</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold">
            화보 컬렉션
          </span>
        </button>

        {/* 2. INFLUENCER HOT 100 */}
        <button
          id="nav-tab-hot100"
          onClick={() => setActiveTab('hot100')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'hot100'
              ? 'text-amber-400 border-amber-500 bg-amber-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>INFLUENCER HOT 100</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold">
            랭킹
          </span>
        </button>

        {/* 3. 매거진 에디토리얼 */}
        <button
          id="nav-tab-editorial"
          onClick={() => setActiveTab('editorial')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'editorial'
              ? 'text-amber-400 border-amber-500 bg-amber-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>매거진 에디토리얼 & 리포트</span>
        </button>

        {/* 4. 스마트 매칭 시스템 */}
        <button
          id="nav-tab-matcher"
          onClick={() => setActiveTab('matcher')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'matcher'
              ? 'text-amber-400 border-amber-500 bg-amber-500/5'
              : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>스마트 매칭 시스템</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500/20 text-red-300 font-bold">
            광고주 AI
          </span>
        </button>

        <button
          id="nav-tab-creator-studio"
          onClick={onOpenCreatorStudio}
          className="flex items-center gap-2 py-3 px-4 font-semibold text-sm whitespace-nowrap text-amber-300 bg-amber-500/10 border-b-2 border-amber-500/50 hover:bg-amber-500/20 hover:text-amber-200 transition-all ml-auto cursor-pointer rounded-t-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-bold">크리에이터 스튜디오</span>
          {isAdmin ? (
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500 text-black font-black">
              ADMIN
            </span>
          ) : (
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-slate-300 font-medium">
              화보·인터뷰 편집
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

