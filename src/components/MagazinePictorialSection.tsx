import React, { useState, useMemo } from 'react';
import { Influencer, CreatorCategory } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { 
  Sparkles, 
  Camera, 
  Award, 
  BookOpen, 
  SlidersHorizontal, 
  Eye, 
  Heart, 
  Share2, 
  PlusCircle, 
  Lock, 
  Edit3, 
  Search, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  TrendingUp, 
  Quote,
  Flame,
  CheckCircle2,
  Layers,
  Grid,
  Filter
} from 'lucide-react';

interface MagazinePictorialSectionProps {
  influencers: Influencer[];
  searchQuery: string;
  onSelectInfluencer: (influencer: Influencer) => void;
  onOpenMatcher: (influencer: Influencer) => void;
  onOpenStudio: (influencer?: Influencer | null) => void;
  onOpenShare?: (influencer: Influencer) => void;
  isAdmin?: boolean;
  onRequireAdmin?: (action: () => void, message?: string) => void;
}

export const MagazinePictorialSection: React.FC<MagazinePictorialSectionProps> = ({
  influencers,
  searchQuery,
  onSelectInfluencer,
  onOpenMatcher,
  onOpenStudio,
  onOpenShare,
  isAdmin = false,
  onRequireAdmin
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | 'All'>('All');
  const [filterMode, setFilterMode] = useState<'all' | 'cover' | 'interview'>('all');
  const [localSearch, setLocalSearch] = useState('');

  // Quick Lightbox State for direct photo viewing
  const [lightboxData, setLightboxData] = useState<{
    influencer: Influencer;
    photoIndex: number;
  } | null>(null);

  // Filter influencers that have photos (guarantee 3-6 photos layout)
  const filteredInfluencers = useMemo(() => {
    return influencers.filter((inf) => {
      // Category
      if (selectedCategory !== 'All' && inf.category !== selectedCategory) {
        return false;
      }
      // Filter Mode
      if (filterMode === 'cover' && inf.rank > 10) return false;
      if (filterMode === 'interview' && !inf.hasExclusiveInterview) return false;

      // Search Query (Global or Local)
      const q = (searchQuery || localSearch).trim().toLowerCase();
      if (q) {
        const matchName = inf.name.toLowerCase().includes(q);
        const matchKr = inf.koreanName.toLowerCase().includes(q);
        const matchHandle = inf.handle.toLowerCase().includes(q);
        const matchCat = inf.category.toLowerCase().includes(q);
        const matchConcept = inf.pictorialConcept?.toLowerCase().includes(q);
        const matchBio = inf.bio.toLowerCase().includes(q);
        if (!matchName && !matchKr && !matchHandle && !matchCat && !matchConcept && !matchBio) {
          return false;
        }
      }

      return true;
    });
  }, [influencers, selectedCategory, filterMode, searchQuery, localSearch]);

  const handleEditClick = (inf: Influencer, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdmin) {
      onOpenStudio(inf);
    } else if (onRequireAdmin) {
      onRequireAdmin(
        () => onOpenStudio(inf),
        '인플루언서 화보 및 인터뷰 데이터 편집은 관리자 인증이 필요합니다.'
      );
    } else {
      onOpenStudio(inf);
    }
  };

  const handleAddClick = () => {
    if (isAdmin) {
      onOpenStudio(null);
    } else if (onRequireAdmin) {
      onRequireAdmin(
        () => onOpenStudio(null),
        '신규 화보 및 인플루언서 게제 등록은 관리자 인증이 필요합니다.'
      );
    } else {
      onOpenStudio(null);
    }
  };

  // Helper to ensure 3 to 6 photos per influencer
  const getDisplayPhotos = (inf: Influencer): string[] => {
    const rawList = inf.galleryImages && inf.galleryImages.length > 0
      ? inf.galleryImages
      : [inf.coverImage || inf.avatar];

    // Ensure we have at least 3 photos if possible by falling back cleanly
    const photos = [...rawList];
    if (photos.length === 1 && inf.coverImage && inf.coverImage !== photos[0]) {
      photos.push(inf.coverImage);
    }
    if (photos.length < 3 && inf.avatar && !photos.includes(inf.avatar)) {
      photos.push(inf.avatar);
    }
    
    // Cap at 6 photos for optimal editorial visual rhythm
    return photos.slice(0, 6);
  };

  return (
    <div className="space-y-10 pb-24">
      {/* Magazine Pictorial Header Masthead Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1813] via-[#121620] to-[#0A0D14] border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Camera className="w-3.5 h-3.5" />
              <span>INFLARE 2026 EXCLUSIVE PICTORIAL & LOOKBOOK</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide leading-tight">
              매거진 독점 화보 & 룩북 컬렉션
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              대한민국 트렌드를 이끄는 TOP 100 인플루언서들의 감각적인 3~6컷 고화질 에디토리얼 화보와 비하인드 인터뷰 기사, 그리고 프로필을 한눈에 감상하세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              id="btn-pictorial-register"
              onClick={handleAddClick}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              <span>{isAdmin ? '화보·인터뷰 게제실 (관리자)' : '신규 화보 게제 등록'}</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Counter Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-editorial">
              {influencers.length}인
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">총 수록 인플루언서</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-white font-editorial">
              {influencers.reduce((acc, curr) => acc + (curr.galleryImages?.length || 3), 0)}+
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">고화질 룩북 컷</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-editorial">
              100%
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">단독 인터뷰 기사 연동</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5">
            <div className="text-xl sm:text-2xl font-black text-amber-300 font-editorial">
              Issue #84
            </div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">2026 봄 시즌 에디션</div>
          </div>
        </div>
      </section>

      {/* Filter and Category Bar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#121620] p-4 rounded-2xl border border-white/10">
          {/* Category Chips Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 flex-1">
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CreatorCategory | 'All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-[#181D2A] text-slate-400 hover:text-white hover:bg-[#202738] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              전체 화보
            </button>
            <button
              onClick={() => setFilterMode('cover')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                filterMode === 'cover'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>TOP 10 커버</span>
            </button>
            <button
              onClick={() => setFilterMode('interview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                filterMode === 'interview'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'bg-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-400" />
              <span>독점 인터뷰 수록작</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Pictorial Magazine Feed (3~6 Photos Layout per Influencer) */}
      <section className="space-y-12">
        {filteredInfluencers.length === 0 ? (
          <div className="text-center py-20 bg-[#121620] rounded-3xl border border-white/10 p-8">
            <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">해당 조건에 맞는 화보가 없습니다</h3>
            <p className="text-slate-400 text-sm mt-1">다른 카테고리나 검색어를 선택해보세요.</p>
          </div>
        ) : (
          filteredInfluencers.map((inf, infIdx) => {
            const photos = getDisplayPhotos(inf);
            const mainPhoto = photos[0];
            const subPhotos = photos.slice(1);

            return (
              <article
                key={inf.id}
                id={`pictorial-story-${inf.id}`}
                className="group bg-[#121620] border border-white/10 hover:border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Background Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                {/* Top Info Bar: Creator Profile, Category & Edit Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Creator Avatar */}
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg shadow-amber-500/10 shrink-0 bg-black/40">
                      <img
                        src={inf.avatar}
                        alt={inf.koreanName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          {inf.category}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400">
                          {inf.handle}
                        </span>
                        {inf.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        )}
                        {inf.badges?.length > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-amber-300 font-semibold">
                            {inf.badges[0]}
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2.5 mt-0.5">
                        <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                          {inf.koreanName}
                        </h2>
                        <span className="text-sm font-medium text-slate-400">
                          {inf.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleEditClick(inf, e)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isAdmin
                          ? 'bg-amber-500/15 hover:bg-amber-500/30 border-amber-500/40 text-amber-300'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400'
                      }`}
                      title={isAdmin ? "관리자: 화보 및 정보 수정" : "관리자 인증 후 편집 가능"}
                    >
                      {isAdmin ? (
                        <>
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>화보 편집</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                          <span>관리자 편집</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenShare?.(inf)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
                      title="화보 공유하기"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pictorial Concept Headline Bar */}
                <div className="my-5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold">PICTORIAL CONCEPT:</span>
                    <span className="text-slate-200">
                      {inf.pictorialConcept || '2026 Spring / Summer Editorial Fashion Spread'}
                    </span>
                  </div>
                  {inf.pictorialCredits && (
                    <div className="text-[11px] text-slate-400">
                      {inf.pictorialCredits}
                    </div>
                  )}
                </div>

                {/* 
                  ★ THE 3 TO 6 PHOTOS EDITORIAL GRID LAYOUT ★
                  Left: Large Signature Hero Cut
                  Right: 2~5 Curated Mood Cuts in an Asymmetric Fashion Magazine Grid
                */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  {/* Main Large Hero Cut (Left: 7 cols or full width) */}
                  <div 
                    onClick={() => setLightboxData({ influencer: inf, photoIndex: 0 })}
                    className="lg:col-span-7 relative group/hero min-h-[380px] sm:min-h-[460px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg bg-black"
                  >
                    <img
                      src={mainPhoto}
                      alt={`${inf.name} Signature Cut`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover/hero:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Cut Label */}
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>COVER CUT #01</span>
                    </div>

                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover/hero:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Bottom Lead Quote on Main Cut */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <p className="text-xs sm:text-sm text-amber-100 font-medium italic line-clamp-2">
                        {inf.oneLinerQuote}
                      </p>
                    </div>
                  </div>

                  {/* Sub Mood Cuts (Right: 5 cols, 2~5 images dynamically arranged) */}
                  <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                    {subPhotos.map((photoUrl, pIdx) => {
                      const actualIdx = pIdx + 1;
                      const isLastExtra = pIdx === subPhotos.length - 1 && subPhotos.length % 2 !== 0 && subPhotos.length === 3;
                      
                      return (
                        <div
                          key={pIdx}
                          onClick={() => setLightboxData({ influencer: inf, photoIndex: actualIdx })}
                          className={`relative group/sub min-h-[180px] sm:min-h-[220px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black shadow-md ${
                            isLastExtra ? 'col-span-2' : ''
                          }`}
                        >
                          <img
                            src={photoUrl}
                            alt={`${inf.name} Cut #${actualIdx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover/sub:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          
                          <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 border border-white/10">
                            CUT #0{actualIdx + 1}
                          </div>

                          <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover/sub:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>

                          <div className="absolute bottom-2 left-2.5 text-[11px] text-amber-200/90 font-medium truncate max-w-[85%]">
                            {actualIdx === 1 ? 'Lookbook Sub-Angle' : actualIdx === 2 ? 'Detail & Mood' : `Editorial #${actualIdx + 1}`}
                          </div>
                        </div>
                      );
                    })}

                    {/* If fewer than 4 sub photos, add an interactive "View All + Article" action block */}
                    <div 
                      onClick={() => onSelectInfluencer(inf)}
                      className="col-span-2 sm:col-span-1 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#181E2B] to-[#121620] border border-amber-500/30 p-4 flex flex-col justify-between hover:border-amber-400 transition-all cursor-pointer group/card"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>독점 인터뷰 전문</span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-2">
                          {inf.interview?.headline || `${inf.koreanName}의 심층 스토리`}
                        </h4>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-amber-300 font-semibold group-hover/card:translate-x-1 transition-transform">
                        <span>전체 사진 & 기사 보기</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer Actions */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-amber-400" />
                      총 {photos.length}장의 화보 컷
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      HOT 100 지수 {inf.metrics.score}점
                    </span>
                    <span>•</span>
                    <span className="text-slate-300 font-medium">
                      팔로워 {(inf.metrics.followersTotal / 10000).toFixed(0)}만
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      id={`btn-view-full-article-${inf.id}`}
                      onClick={() => onSelectInfluencer(inf)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-black" />
                      <span>화보·기사·프로필 전체보기</span>
                    </button>

                    <button
                      id={`btn-match-campaign-${inf.id}`}
                      onClick={() => onOpenMatcher(inf)}
                      className="px-3.5 py-2.5 rounded-xl bg-[#181D2A] hover:bg-[#22293A] border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                      <span>광고 섭외 제안</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* =========================================================================
          LIGHTBOX POPUP FOR INSTANT HIGH-RES PHOTO ENLARGEMENT
      ========================================================================= */}
      {lightboxData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#0E121A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E121A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 shrink-0 bg-black">
                  <img
                    src={lightboxData.influencer.avatar}
                    alt={lightboxData.influencer.koreanName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {lightboxData.influencer.category}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[11px] text-slate-400">
                      {lightboxData.influencer.handle}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {lightboxData.influencer.koreanName} ({lightboxData.influencer.name})
                  </h3>
                  <p className="text-xs text-amber-300/80 mt-0.5">
                    {lightboxData.influencer.pictorialConcept || 'INFLARE 화보 갤러리'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const inf = lightboxData.influencer;
                    setLightboxData(null);
                    onSelectInfluencer(inf);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1 hover:bg-amber-500 hover:text-black transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>인터뷰 기사 및 프로필 보기</span>
                </button>
                <button
                  onClick={() => setLightboxData(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Canvas */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[400px]">
              {(() => {
                const photos = getDisplayPhotos(lightboxData.influencer);
                const currentImg = photos[lightboxData.photoIndex] || lightboxData.influencer.coverImage;

                return (
                  <>
                    <img
                      src={currentImg}
                      alt="Lightbox enlargement"
                      referrerPolicy="no-referrer"
                      className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />

                    {photos.length > 1 && (
                      <>
                        <button
                          onClick={() => setLightboxData(prev => prev ? ({
                            ...prev,
                            photoIndex: prev.photoIndex === 0 ? photos.length - 1 : prev.photoIndex - 1
                          }) : null)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setLightboxData(prev => prev ? ({
                            ...prev,
                            photoIndex: prev.photoIndex === photos.length - 1 ? 0 : prev.photoIndex + 1
                          }) : null)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-4 right-6 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
                      {lightboxData.photoIndex + 1} / {photos.length}
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Thumbnails strip */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#0E121A] flex items-center gap-2 overflow-x-auto">
              {getDisplayPhotos(lightboxData.influencer).map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxData(prev => prev ? ({ ...prev, photoIndex: idx }) : null)}
                  className={`w-14 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    lightboxData.photoIndex === idx ? 'border-amber-400 scale-105' : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={p} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
