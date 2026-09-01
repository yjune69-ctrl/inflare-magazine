import React, { useState } from 'react';
import { Influencer } from '../types';
import { 
  X, 
  Award, 
  Sparkles, 
  MessageSquare, 
  SlidersHorizontal, 
  Calendar, 
  User, 
  TrendingUp, 
  Heart, 
  CheckCircle2, 
  Edit3, 
  Instagram, 
  Youtube, 
  Facebook,
  Globe,
  ExternalLink,
  Mail,
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Building2, 
  Clock, 
  DollarSign,
  Volume2,
  Check,
  Link2,
  Lock
} from 'lucide-react';

interface InfluencerDetailModalProps {
  influencer: Influencer | null;
  onClose: () => void;
  onOpenMatcher: (influencer: Influencer) => void;
  onOpenStudio: (influencer: Influencer) => void;
  onOpenShare?: (influencer: Influencer) => void;
  isAdmin?: boolean;
  onRequireAdmin?: (action: () => void, message?: string) => void;
}

export const InfluencerDetailModal: React.FC<InfluencerDetailModalProps> = ({
  influencer,
  onClose,
  onOpenMatcher,
  onOpenStudio,
  onOpenShare,
  isAdmin = false,
  onRequireAdmin
}) => {
  if (!influencer) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'interview' | 'analytics' | 'matching'>('interview');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEditClick = () => {
    if (isAdmin) {
      onOpenStudio(influencer);
    } else if (onRequireAdmin) {
      onRequireAdmin(
        () => onOpenStudio(influencer),
        '인플루언서 화보 및 인터뷰 데이터 편집은 인플레어 관리자 인증이 필요합니다.'
      );
    } else {
      onOpenStudio(influencer);
    }
  };


  const images = influencer.galleryImages && influencer.galleryImages.length > 0 
    ? influencer.galleryImages 
    : [influencer.coverImage || influencer.avatar];

  const handleCopyLink = () => {
    if (onOpenShare) {
      onOpenShare(influencer);
      return;
    }
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 10000) return (num / 10000).toFixed(0) + '만';
    return num.toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0E121A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
        
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0E121A]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              HOT 100 #{influencer.rank}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:inline">
              INFLARE EXCLUSIVE FEATURE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEditClick}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAdmin 
                  ? 'bg-amber-500/15 hover:bg-amber-500/30 border-amber-500/40 text-amber-300' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400'
              }`}
              title={isAdmin ? "관리자: 화보 및 인터뷰 데이터 편집" : "관리자 인증 후 편집 가능"}
            >
              {isAdmin ? (
                <>
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>화보/인터뷰 편집</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>편집 (관리자 전용)</span>
                </>
              )}
            </button>

            <button
              onClick={() => onOpenShare ? onOpenShare(influencer) : handleCopyLink()}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
              title="프로필 링크 복사"
            >
              <Link2 className="w-3.5 h-3.5 text-amber-400" />
              <span>링크 복사</span>
            </button>

            <button
              id="btn-close-detail-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8 custom-scrollbar">
          
          {/* Hero Masthead & Photo Gallery Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Editorial Photo Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-xl group">
                <img
                  src={images[activePhotoIndex] || influencer.avatar}
                  alt={influencer.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />
                
                {/* Photo Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActivePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Photo Indicator */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white font-medium">
                  {activePhotoIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activePhotoIndex === idx ? 'border-amber-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Creator Identity, Hot Score & Quick Summary */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
                  <span>{influencer.category}</span>
                  <span>•</span>
                  <span>HOT 100 SCORE {influencer.metrics.score}</span>
                </div>
                <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                  {influencer.koreanName}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-slate-400 text-sm">{influencer.name}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400/90 font-medium text-sm">{influencer.handle}</span>

                  {/* Social Channel Links */}
                  <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                    {influencer.contact.instagramUrl && (
                      <a
                        href={influencer.contact.instagramUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1 transition-all hover:scale-105"
                        title="인스타그램 방문하기"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>Instagram</span>
                        <ExternalLink className="w-3 h-3 text-pink-400/70" />
                      </a>
                    )}
                    {influencer.contact.facebookUrl && (
                      <a
                        href={influencer.contact.facebookUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-1 transition-all hover:scale-105"
                        title="페이스북 방문하기"
                      >
                        <Facebook className="w-3.5 h-3.5 text-blue-400" />
                        <span>Facebook</span>
                        <ExternalLink className="w-3 h-3 text-blue-400/70" />
                      </a>
                    )}
                    {influencer.contact.youtubeUrl && (
                      <a
                        href={influencer.contact.youtubeUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1 transition-all hover:scale-105"
                        title="유튜브 채널 방문하기"
                      >
                        <Youtube className="w-3.5 h-3.5 text-red-400" />
                        <span>YouTube</span>
                        <ExternalLink className="w-3 h-3 text-red-400/70" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Pullquote Box */}
              <div className="relative bg-gradient-to-r from-amber-950/30 via-[#181D2A] to-transparent p-5 rounded-2xl border-l-4 border-amber-500 border-y border-r border-white/5">
                <Quote className="w-6 h-6 text-amber-500/40 mb-1" />
                <p className="text-sm sm:text-base font-semibold text-amber-200 italic leading-relaxed">
                  {influencer.oneLinerQuote}
                </p>
                <div className="text-xs text-slate-400 mt-2">
                  — {influencer.interview?.headline || 'INFLARE 독점 대담'}
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {influencer.bio}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {influencer.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-3 py-1 rounded-lg bg-[#161B26] border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* 4-Stat Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#121620] p-4 rounded-2xl border border-white/5">
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-medium">총 팔로워</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {formatFollowers(influencer.metrics.followersTotal)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-medium">참여율(Eng.)</div>
                  <div className="text-base font-black text-amber-400 mt-0.5">
                    {influencer.metrics.engagementRate}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-medium">평균 조회수</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {formatFollowers(influencer.metrics.avgViews)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-medium">월간 성장률</div>
                  <div className="text-base font-black text-emerald-400 mt-0.5">
                    +{influencer.metrics.growthRateMonthly}%
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="btn-modal-match-proposal"
                  onClick={() => onOpenMatcher(influencer)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>광고/캠페인 스마트 매칭 제안</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="border-b border-white/10 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('interview')}
              className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'interview'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>매거진 심층 인터뷰 & 화보 스토리</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'analytics'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>오디언스 데모그래픽 분석</span>
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`py-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'matching'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>브랜드 협업 & 견적 정보</span>
            </button>
          </div>

          {/* TAB CONTENT 1: EXCLUSIVE MAGAZINE INTERVIEW */}
          {activeTab === 'interview' && (
            <div className="space-y-8 bg-[#121620] p-6 sm:p-8 rounded-3xl border border-white/10">
              {/* Editorial Header */}
              <div className="border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs">
                    {influencer.interview?.date || '2026 ISSUE EXCLUSIVE'}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      {influencer.interview?.editor || 'INFLARE 편집부'}
                    </span>
                    {influencer.interview?.audioDuration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {influencer.interview.audioDuration}
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white mt-3">
                  {influencer.interview?.headline || `${influencer.koreanName}의 특별 인터뷰`}
                </h2>
                <p className="text-sm sm:text-base text-amber-300/80 font-medium mt-1">
                  {influencer.interview?.subtitle}
                </p>

                {/* Lead Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 bg-[#0B0D12] p-4 rounded-xl border border-white/5 font-sans">
                  {influencer.interview?.leadParagraph || influencer.bio}
                </p>
              </div>

              {/* Q&A Sections */}
              <div className="space-y-6">
                {influencer.interview?.sections && influencer.interview.sections.length > 0 ? (
                  influencer.interview.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-3 bg-[#0B0D12]/60 p-5 rounded-2xl border border-white/5">
                      <h4 className="text-sm sm:text-base font-bold text-amber-400 flex items-start gap-2">
                        <span>{sec.question}</span>
                      </h4>

                      {sec.highlightQuote && (
                        <div className="p-3 bg-amber-950/30 border-l-2 border-amber-400 rounded-r-lg text-xs sm:text-sm font-semibold text-amber-200 italic my-2">
                          {sec.highlightQuote}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-1">
                        {sec.answer}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    인터뷰 내용이 준비 중입니다. 크리에이터 게제 관리실에서 새로운 인터뷰를 추가할 수 있습니다.
                  </div>
                )}
              </div>

              {/* Behind the scenes & Favorites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {influencer.interview?.behindTheScenes && (
                  <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-1">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      촬영 비하인드 스토리
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {influencer.interview.behindTheScenes}
                    </p>
                  </div>
                )}

                {influencer.interview?.favoriteBrands && influencer.interview.favoriteBrands.length > 0 && (
                  <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-2">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      인플루언서 선호 브랜드
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {influencer.interview.favoriteBrands.map((brand, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#161B26] border border-white/10 text-xs font-medium text-amber-300"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: AUDIENCE DEMOGRAPHICS */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121620] p-6 sm:p-8 rounded-3xl border border-white/10">
              {/* Age breakdown */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>오디언스 연령대 분포</span>
                </h3>
                <div className="space-y-3 bg-[#0B0D12] p-4 rounded-2xl border border-white/5">
                  {Object.entries(influencer.audience.ageBreakdown).map(([ageGroup, pct]) => (
                    <div key={ageGroup} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300">{ageGroup}세</span>
                        <span className="text-amber-400 font-bold">{pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#1A202C] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender & Regions */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">오디언스 성별 & 주요 거주 지역</h3>
                <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-4">
                  {/* Gender bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-rose-400 font-bold">여성 {influencer.audience.genderBreakdown.female}%</span>
                      <span className="text-blue-400 font-bold">남성 {influencer.audience.genderBreakdown.male}%</span>
                    </div>
                    <div className="h-3 w-full bg-blue-500 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-rose-500"
                        style={{ width: `${influencer.audience.genderBreakdown.female}%` }}
                      />
                    </div>
                  </div>

                  {/* Top regions */}
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2">주요 유입 지역</div>
                    <div className="space-y-1.5">
                      {influencer.audience.topRegions.map((region, idx) => (
                        <div key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{region}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: MATCHING & BUDGET INFO */}
          {activeTab === 'matching' && (
            <div className="space-y-6 bg-[#121620] p-6 sm:p-8 rounded-3xl border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5">
                  <div className="text-xs text-slate-400">포스팅 1건당 예상 단가</div>
                  <div className="text-lg font-black text-amber-400 mt-1">
                    {influencer.matchingProfile.estimatedCostPerPost}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">캠페인 규모별 유동 협의</div>
                </div>
                <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5">
                  <div className="text-xs text-slate-400">평균 응답률</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">
                    {influencer.matchingProfile.responseRate}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">광고주 제안 24시간 내 피드백</div>
                </div>
                <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5">
                  <div className="text-xs text-slate-400">평균 콘텐츠 제작 턴어라운드</div>
                  <div className="text-lg font-black text-white mt-1">
                    {influencer.matchingProfile.avgTurnaroundTime}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">가이드라인 확정 기준</div>
                </div>
              </div>

              {/* Preferred Campaign Types */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  선호 캠페인 유형
                </h4>
                <div className="flex flex-wrap gap-2">
                  {influencer.matchingProfile.preferredCampaignTypes.map((type, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-[#0B0D12] border border-white/10 text-xs font-semibold text-slate-200">
                      ✓ {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Brand Fit Industries */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  최적 협업 산업군
                </h4>
                <div className="flex flex-wrap gap-2">
                  {influencer.matchingProfile.brandFitIndustries.map((ind, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Official Channels & Contact */}
              <div className="bg-[#0B0D12] p-4 rounded-2xl border border-white/5 space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  공식 채널 및 비즈니스 컨택
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {influencer.contact.instagramUrl && (
                    <a
                      href={influencer.contact.instagramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-pink-500/20 transition-all"
                    >
                      <Instagram className="w-4 h-4 text-pink-400" />
                      <span>Instagram ({influencer.handle})</span>
                      <ExternalLink className="w-3 h-3 text-pink-400/60" />
                    </a>
                  )}
                  {influencer.contact.facebookUrl && (
                    <a
                      href={influencer.contact.facebookUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-500/20 transition-all"
                    >
                      <Facebook className="w-4 h-4 text-blue-400" />
                      <span>Facebook</span>
                      <ExternalLink className="w-3 h-3 text-blue-400/60" />
                    </a>
                  )}
                  {influencer.contact.email && (
                    <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>{influencer.contact.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => onOpenMatcher(influencer)}
                  className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>이 인플루언서와 스마트 매칭 시작하기</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
