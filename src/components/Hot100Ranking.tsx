import React, { useState, useMemo } from 'react';
import { Influencer, CreatorCategory } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  SlidersHorizontal, 
  ArrowUpRight, 
  Eye, 
  Heart, 
  Users, 
  Layers, 
  Grid, 
  Table as TableIcon,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Filter,
  Plus,
  Check,
  Link2,
  Share2,
  Edit3,
  PlusCircle,
  Camera,
  BookOpen
} from 'lucide-react';

interface Hot100RankingProps {
  influencers: Influencer[];
  searchQuery: string;
  onSelectInfluencer: (influencer: Influencer) => void;
  onOpenMatcherWithInfluencer: (influencer: Influencer) => void;
  onOpenCreatorStudioWithInfluencer: (influencer?: Influencer | null) => void;
  selectedCompareIds: string[];
  onToggleCompare: (id: string) => void;
  onOpenCompareModal: () => void;
  onOpenShare?: (influencer?: Influencer) => void;
  onNavigateToMagazine?: () => void;
  isAdmin?: boolean;
}

export const Hot100Ranking: React.FC<Hot100RankingProps> = ({
  influencers,
  searchQuery,
  onSelectInfluencer,
  onOpenMatcherWithInfluencer,
  onOpenCreatorStudioWithInfluencer,
  selectedCompareIds,
  onToggleCompare,
  onOpenCompareModal,
  onOpenShare,
  onNavigateToMagazine,
  isAdmin = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'followers' | 'engagement' | 'growth'>('rank');
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'analytics'>('cards');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterInterviewOnly, setFilterInterviewOnly] = useState(false);

  // Filtered and Sorted list
  const filteredInfluencers = useMemo(() => {
    return influencers
      .filter((inf) => {
        // Category filter
        if (selectedCategory !== 'All' && inf.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = inf.name.toLowerCase().includes(q);
          const matchKr = inf.koreanName.toLowerCase().includes(q);
          const matchHandle = inf.handle.toLowerCase().includes(q);
          const matchBio = inf.bio.toLowerCase().includes(q);
          const matchCat = inf.category.toLowerCase().includes(q);
          const matchBrands = inf.interview?.favoriteBrands?.some(b => b.toLowerCase().includes(q));
          if (!matchName && !matchKr && !matchHandle && !matchBio && !matchCat && !matchBrands) {
            return false;
          }
        }
        // Verified filter
        if (filterVerifiedOnly && !inf.verified) return false;
        // Interview filter
        if (filterInterviewOnly && !inf.hasExclusiveInterview) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rank') return a.rank - b.rank;
        if (sortBy === 'score') return b.metrics.score - a.metrics.score;
        if (sortBy === 'followers') return b.metrics.followersTotal - a.metrics.followersTotal;
        if (sortBy === 'engagement') return b.metrics.engagementRate - a.metrics.engagementRate;
        if (sortBy === 'growth') return b.metrics.growthRateMonthly - a.metrics.growthRateMonthly;
        return 0;
      });
  }, [influencers, selectedCategory, searchQuery, filterVerifiedOnly, filterInterviewOnly, sortBy]);

  // Top 3 Podium influencers
  const top3 = useMemo(() => {
    const sorted = [...influencers].sort((a, b) => a.rank - b.rank);
    return [sorted[0], sorted[1], sorted[2]].filter(Boolean);
  }, [influencers]);

  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 10000) {
      return (num / 10000).toFixed(0) + '만';
    }
    return num.toLocaleString();
  };

  const renderRankBadge = (rank: number, prevRank: number) => {
    const isNew = prevRank === 0;
    const diff = prevRank - rank;

    return (
      <div className="flex items-center gap-1.5">
        <div className={`w-8 h-8 rounded-lg font-black flex items-center justify-center text-sm shadow-md ${
          rank === 1 
            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-amber-500/30' 
            : rank === 2 
            ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-black' 
            : rank === 3 
            ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100' 
            : 'bg-[#1C2230] text-slate-300 border border-white/10'
        }`}>
          {rank}
        </div>
        <div className="text-[11px] font-bold">
          {isNew ? (
            <span className="text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">NEW</span>
          ) : diff > 0 ? (
            <span className="text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />+{diff}
            </span>
          ) : diff < 0 ? (
            <span className="text-rose-400 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" />{diff}
            </span>
          ) : (
            <span className="text-slate-500 flex items-center">
              <Minus className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 
        ★ MAIN VIEW: 2026 EXCLUSIVE PICTORIAL & LOOKBOOK SHOWCASE (3~6 Photos Layout) ★
        메인 뷰 상단에 화보 3~6장의 고화질 사진 배치가 돋보이는 에디토리얼 쇼케이스 배치
      */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="relative pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>2026 EXCLUSIVE PICTORIAL & LOOKBOOK</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                INFLARE 매거진 독점 화보 & 룩북
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                화보 3~6컷의 감각적인 매거진 스프레드 뷰 • 사진 클릭 시 고화질 갤러리 및 심층 인터뷰 기사로 즉시 연결됩니다.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-2.5">
              {onNavigateToMagazine && (
                <button
                  id="btn-main-go-magazine-tab"
                  onClick={onNavigateToMagazine}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>전체 화보 매거진 보기 ➔</span>
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => onOpenCreatorStudioWithInfluencer(null)}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>화보 추가 (관리자)</span>
                </button>
              )}
            </div>
          </div>

          {/* 3~6 Photos Showcase Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {top3.map((inf) => {
              const photos = (inf.galleryImages && inf.galleryImages.length >= 3)
                ? inf.galleryImages.slice(0, 6)
                : [inf.coverImage, inf.avatar, ...(inf.galleryImages || [])].filter(Boolean).slice(0, 6);
              
              const heroCut = photos[0] || inf.coverImage || inf.avatar;
              const subCuts = photos.slice(1, 5); // 2~4 sub photos

              return (
                <div
                  key={`pictorial-preview-${inf.id}`}
                  className="group bg-[#121620] border border-white/10 hover:border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Creator Header Info */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-black font-black text-sm flex items-center justify-center shadow-md font-editorial">
                        #{inf.rank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                            {inf.category}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-400 font-mono">
                            {inf.handle}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h3 
                            onClick={() => onSelectInfluencer(inf)}
                            className="font-editorial text-xl sm:text-2xl font-black text-white hover:text-amber-300 transition-colors cursor-pointer"
                          >
                            {inf.koreanName}
                          </h3>
                          <span className="text-xs text-slate-400">
                            {inf.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-black/60 border border-amber-500/30 text-[11px] text-amber-300 font-bold">
                      HOT Score {inf.metrics.score}
                    </span>
                  </div>

                  {/* Concept Bar */}
                  <div className="my-3 text-xs text-slate-300 flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-semibold text-amber-300">CONCEPT:</span>
                    <span className="truncate">{inf.pictorialConcept || '2026 Spring Exclusive Fashion Lookbook'}</span>
                  </div>

                  {/* 
                    ★ 3 to 6 PHOTOS EDITORIAL SPREAD LAYOUT ★
                    Left: Large Main Hero Cut (1 photo)
                    Right: 2 to 4 Sub Cuts (Grid)
                  */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-2 items-stretch">
                    {/* Main Cut (Left) */}
                    <div 
                      onClick={() => onSelectInfluencer(inf)}
                      className="sm:col-span-7 relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black group/main"
                    >
                      <img
                        src={heroCut}
                        alt={`${inf.name} Main Editorial`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover/main:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30">
                        HERO CUT #01
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3 text-xs text-amber-200 italic font-medium line-clamp-1">
                        {inf.oneLinerQuote}
                      </div>
                    </div>

                    {/* Sub Cuts Grid (Right) */}
                    <div className="sm:col-span-5 grid grid-cols-2 gap-2">
                      {subCuts.map((subImg, sIdx) => (
                        <div
                          key={sIdx}
                          onClick={() => onSelectInfluencer(inf)}
                          className="relative h-32 sm:h-[140px] rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-black group/sub"
                        >
                          <img
                            src={subImg}
                            alt={`${inf.name} Sub #${sIdx + 2}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover/sub:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover/sub:bg-transparent transition-colors" />
                          <div className="absolute top-1.5 left-1.5 bg-black/70 px-1.5 py-0.2 rounded text-[9px] font-bold text-slate-300">
                            #0{sIdx + 2}
                          </div>
                        </div>
                      ))}

                      {/* If only 1-2 sub photos, add an interactive photo summary button */}
                      {subCuts.length < 4 && (
                        <div 
                          onClick={() => onSelectInfluencer(inf)}
                          className="h-32 sm:h-[140px] rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-amber-500/20 transition-colors"
                        >
                          <Camera className="w-5 h-5 text-amber-400 mb-1" />
                          <span className="text-[11px] font-bold text-amber-300">
                            +{inf.galleryImages?.length || 4}장 화보 더보기
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            인터뷰 기사 수록
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Bar */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      총 {photos.length}장의 화보 컷 수록
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectInfluencer(inf)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>화보·기사·프로필 보기</span>
                      </button>

                      <button
                        onClick={() => onOpenMatcherWithInfluencer(inf)}
                        className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        섭외
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Top 3 Magazine Cover Stars Podium */}
      {selectedCategory === 'All' && !searchQuery && (
        <section className="relative pt-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>2026 ISSUE COVER STARS</span>
              </div>
              <h2 className="font-editorial text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                HOT 100 TOP 3 LEADERS
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                대한민국 트렌드를 선도하는 최상위 크리에이터 3인의 화보와 독점 인터뷰
              </p>
            </div>
            <div className="mt-3 md:mt-0 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              인플루언서 핫100 지수(HOT Score) 실시간 산출
            </div>
          </div>

          {/* Podium Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {top3.map((inf, idx) => {
              const isFirst = inf.rank === 1;
              return (
                <div
                  key={inf.id}
                  id={`podium-card-${inf.id}`}
                  onClick={() => onSelectInfluencer(inf)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                    isFirst 
                      ? 'lg:-translate-y-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 bg-gradient-to-b from-[#1C202C] via-[#121620] to-[#0D1017]' 
                      : 'border-white/10 hover:border-amber-500/30 bg-[#121620] hover:bg-[#161B26]'
                  }`}
                >
                  {/* Rank Flag */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider flex items-center gap-1 shadow-lg ${
                      isFirst 
                        ? 'bg-amber-400 text-black' 
                        : idx === 1 
                        ? 'bg-slate-200 text-black' 
                        : 'bg-amber-700 text-white'
                    }`}>
                      <Award className="w-3.5 h-3.5" />
                      RANK #{inf.rank}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] text-amber-300 border border-amber-500/30 font-semibold">
                      Score {inf.metrics.score}
                    </span>
                  </div>

                  {/* Cover Photo */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <img
                      src={inf.coverImage || inf.avatar}
                      alt={inf.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-[#121620]/40 to-transparent" />
                    
                    {/* Floating Quote Badge */}
                    <div className="absolute bottom-3 left-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <p className="text-xs text-amber-200 font-medium italic line-clamp-2">
                        {inf.oneLinerQuote}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          {inf.category}
                        </span>
                        <span className="text-xs text-emerald-400 font-bold flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          월간 +{inf.metrics.growthRateMonthly}%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                          {inf.koreanName}
                        </h3>
                        <span className="text-sm text-slate-400 font-normal">
                          {inf.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {inf.handle}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                        {inf.bio}
                      </p>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 bg-[#0B0D12] p-2.5 rounded-xl border border-white/5 text-center">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">총 팔로워</div>
                        <div className="text-sm font-black text-white mt-0.5">
                          {formatFollowers(inf.metrics.followersTotal)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">참여율 (Eng.)</div>
                        <div className="text-sm font-black text-amber-400 mt-0.5">
                          {inf.metrics.engagementRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">평균 조회수</div>
                        <div className="text-sm font-black text-white mt-0.5">
                          {formatFollowers(inf.metrics.avgViews)}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectInfluencer(inf);
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>독점 인터뷰 & 화보 보기</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenMatcherWithInfluencer(inf);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-[#1C2230] hover:bg-[#252D40] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        title="광고주 매칭 제안"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                        <span>매칭</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Ranking Section Header & Controls */}
      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-editorial text-2xl md:text-3xl font-extrabold text-white tracking-wide flex items-center gap-2.5">
              <span>INFLUENCER HOT 100 LIST</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-display font-bold">
                {filteredInfluencers.length} CREATORS
              </span>
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              팔로워 수, 반응률, 검색량, 광고 전환 효과를 종합 분석한 공식 순위표
            </p>
          </div>

          {/* Controls: Sort & View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-ranking-add-creator"
              onClick={() => onOpenCreatorStudioWithInfluencer(null)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ 새 인물 등록</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#161B26] px-3 py-1.5 rounded-xl border border-white/10 text-xs">
              <span className="text-slate-400 font-medium">정렬:</span>
              <select
                id="select-sort-ranking"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="rank" className="bg-[#161B26] text-white">HOT 100 순위순</option>
                <option value="score" className="bg-[#161B26] text-white">인덱스 점수순</option>
                <option value="followers" className="bg-[#161B26] text-white">총 팔로워순</option>
                <option value="engagement" className="bg-[#161B26] text-white">참여율(Eng.)순</option>
                <option value="growth" className="bg-[#161B26] text-white">월간 성장률순</option>
              </select>
            </div>

            {/* Quick Checkbox Filters */}
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer bg-[#161B26] px-3 py-2 rounded-xl border border-white/10 hover:border-amber-500/30">
              <input
                type="checkbox"
                checked={filterInterviewOnly}
                onChange={(e) => setFilterInterviewOnly(e.target.checked)}
                className="rounded accent-amber-500 cursor-pointer"
              />
              <span className="font-medium">심층 인터뷰 수록</span>
            </label>

            {/* View Mode Buttons */}
            <div className="flex items-center bg-[#161B26] p-1 rounded-xl border border-white/10">
              <button
                id="btn-view-cards"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'cards' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
                title="매거진 카드 뷰"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                id="btn-view-table"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
                title="데이터 테이블 뷰"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                id="btn-view-analytics"
                onClick={() => setViewMode('analytics')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'analytics' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                }`}
                title="카테고리 통계 분석"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {INITIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-bold scale-[1.02]'
                    : 'bg-[#161B26] hover:bg-[#1f2636] text-slate-300 border border-white/10 hover:border-slate-600'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            VIEW MODE 1: MAGAZINE EDITORIAL CARDS
        ======================================================== */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredInfluencers.map((inf) => {
              const isCompared = selectedCompareIds.includes(inf.id);
              return (
                <div
                  key={inf.id}
                  id={`influencer-card-${inf.id}`}
                  onClick={() => onSelectInfluencer(inf)}
                  className="group relative rounded-2xl bg-[#121620] hover:bg-[#161B26] border border-white/10 hover:border-amber-500/40 p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
                >
                  {/* Top Line: Rank & Compare Checkbox */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      {renderRankBadge(inf.rank, inf.previousRank)}

                      <div className="flex items-center gap-2">
                        {/* Compare selector */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(inf.id);
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                            isCompared
                              ? 'bg-amber-500 text-black'
                              : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                          }`}
                          title="비교함 담기"
                        >
                          {isCompared ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          비교
                        </button>

                        <span className="bg-[#0B0D12] text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg border border-amber-500/20">
                          {inf.metrics.score}점
                        </span>
                      </div>
                    </div>

                    {/* Creator Identity & Avatar */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-amber-400 transition-colors">
                        <img
                          src={inf.avatar}
                          alt={inf.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {inf.verified && (
                          <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-0.5 rounded-tl">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                          {inf.category}
                        </span>
                        <div className="flex items-baseline gap-1.5 truncate">
                          <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                            {inf.koreanName}
                          </h4>
                          <span className="text-xs text-slate-400 font-normal truncate">
                            {inf.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate">
                          {inf.handle}
                        </p>
                      </div>
                    </div>

                    {/* Catchphrase Quote */}
                    <div className="bg-[#0B0D12]/70 p-3 rounded-xl border border-white/5 mb-4">
                      <p className="text-xs text-slate-300 italic line-clamp-2 leading-relaxed">
                        {inf.oneLinerQuote || inf.bio}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {inf.badges.slice(0, 3).map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300"
                        >
                          {badge}
                        </span>
                      ))}
                      {inf.hasExclusiveInterview && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          인터뷰 수록
                        </span>
                      )}
                    </div>

                    {/* Numerical Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-[#0B0D12] p-2.5 rounded-xl border border-white/5 text-center text-xs mb-4">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">총 팔로워</div>
                        <div className="font-bold text-white mt-0.5">
                          {formatFollowers(inf.metrics.followersTotal)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">참여율</div>
                        <div className="font-bold text-amber-400 mt-0.5">
                          {inf.metrics.engagementRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">월 성장률</div>
                        <div className="font-bold text-emerald-400 mt-0.5">
                          +{inf.metrics.growthRateMonthly}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Buttons */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInfluencer(inf);
                      }}
                      className="flex-1 py-2 px-2.5 rounded-xl bg-[#1C2230] hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>화보·인터뷰</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCreatorStudioWithInfluencer(inf);
                      }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-amber-400 text-xs font-semibold flex items-center justify-center transition-all border border-white/10"
                      title="인물 정보 및 화보 수정"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenMatcherWithInfluencer(inf);
                      }}
                      className="py-2 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>매칭</span>
                    </button>

                    {onOpenShare && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenShare(inf);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 text-xs font-semibold flex items-center justify-center transition-all border border-white/10"
                        title="프로필 링크 복사"
                      >
                        <Link2 className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: HIGH-DENSITY LEADERBOARD TABLE
        ======================================================== */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#121620]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0D12] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4">순위</th>
                  <th className="py-3.5 px-4">인플루언서 / 채널</th>
                  <th className="py-3.5 px-4">카테고리</th>
                  <th className="py-3.5 px-4 text-right">총 팔로워</th>
                  <th className="py-3.5 px-4 text-right">반응률(Eng.)</th>
                  <th className="py-3.5 px-4 text-right">평균 조회수</th>
                  <th className="py-3.5 px-4 text-right">HOT Score</th>
                  <th className="py-3.5 px-4 text-right">포스팅 단가(추정)</th>
                  <th className="py-3.5 px-4 text-center">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInfluencers.map((inf) => {
                  const isCompared = selectedCompareIds.includes(inf.id);
                  return (
                    <tr
                      key={inf.id}
                      onClick={() => onSelectInfluencer(inf)}
                      className="hover:bg-[#161B26] transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        {renderRankBadge(inf.rank, inf.previousRank)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={inf.avatar}
                            alt={inf.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white text-sm flex items-center gap-1.5">
                              {inf.koreanName}
                              {inf.hasExclusiveInterview && (
                                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                                  인터뷰
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 text-xs">{inf.handle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[11px] font-medium">
                          {inf.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-white whitespace-nowrap">
                        {formatFollowers(inf.metrics.followersTotal)}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-amber-400 whitespace-nowrap">
                        {inf.metrics.engagementRate}%
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-slate-300 whitespace-nowrap">
                        {formatFollowers(inf.metrics.avgViews)}
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <span className="font-black text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
                          {inf.metrics.score}점
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-300 font-medium whitespace-nowrap">
                        {inf.matchingProfile.estimatedCostPerPost}
                      </td>
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onOpenCreatorStudioWithInfluencer(inf)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-amber-400 transition-colors"
                            title="인물 수정"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleCompare(inf.id)}
                            className={`p-1.5 rounded-lg text-xs font-semibold ${
                              isCompared ? 'bg-amber-500 text-black' : 'bg-white/5 hover:bg-white/10 text-slate-400'
                            }`}
                            title="비교"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onOpenMatcherWithInfluencer(inf)}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-bold transition-colors"
                          >
                            매칭
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 3: ANALYTICS & DEMOGRAPHICS
        ======================================================== */}
        {viewMode === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121620] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                카테고리별 평균 인게이지먼트(참여율) 분석
              </h3>
              <p className="text-xs text-slate-400">
                숏폼 바이럴과 진성 팬덤 규모가 큰 뷰티 & 패션 카테고리가 10% 내외의 높은 반응률을 기록하고 있습니다.
              </p>
              <div className="space-y-3 pt-2">
                {INITIAL_CATEGORIES.filter(c => c.id !== 'All').map((cat) => {
                  const matchingInfs = influencers.filter(i => i.category === cat.id);
                  const avgEng = matchingInfs.length > 0
                    ? (matchingInfs.reduce((acc, curr) => acc + curr.metrics.engagementRate, 0) / matchingInfs.length).toFixed(1)
                    : '7.5';
                  const percentVal = Math.min(100, (parseFloat(avgEng) / 15) * 100);

                  return (
                    <div key={cat.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-300">{cat.label}</span>
                        <span className="text-amber-400 font-bold">{avgEng}% Avg. Eng</span>
                      </div>
                      <div className="h-2 w-full bg-[#0B0D12] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          style={{ width: `${percentVal}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#121620] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                2026 HOT 100 인플루언서 오디언스 연령 분포
              </h3>
              <p className="text-xs text-slate-400">
                25-34세 직장인 및 18-24세 Z세대가 전체 소비력과 바이럴 전파의 85% 이상을 주도합니다.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="bg-[#0B0D12] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-2xl font-black text-amber-400">46.5%</div>
                  <div className="text-xs text-slate-300 font-bold mt-1">25-34세 (밀레니얼 직장인)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">실질 구매력 1위 핵심 타깃</div>
                </div>
                <div className="bg-[#0B0D12] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-2xl font-black text-orange-400">38.2%</div>
                  <div className="text-xs text-slate-300 font-bold mt-1">18-24세 (Z세대 대학생)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">숏폼 바이럴 및 트렌드 전파</div>
                </div>
                <div className="bg-[#0B0D12] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-2xl font-black text-slate-300">12.1%</div>
                  <div className="text-xs text-slate-300 font-bold mt-1">35-44세 (영포티)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">프리미엄 리빙/가전 타깃</div>
                </div>
                <div className="bg-[#0B0D12] p-4 rounded-xl border border-white/5 text-center">
                  <div className="text-2xl font-black text-slate-400">3.2%</div>
                  <div className="text-xs text-slate-300 font-bold mt-1">45세 이상</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">헬스케어/건기식 타깃</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sticky Bottom Comparison Drawer Trigger */}
      {selectedCompareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#161B26]/95 backdrop-blur-md border border-amber-500/40 px-5 py-3 rounded-2xl shadow-2xl shadow-amber-500/20 flex items-center gap-4 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-bold text-white">
              선택된 인플루언서: <strong className="text-amber-400">{selectedCompareIds.length}명</strong> (최대 3명)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-open-compare-modal"
              onClick={onOpenCompareModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              스펙 & 지표 비교하기
            </button>
            <button
              onClick={() => onToggleCompare('')}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
            >
              초기화
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
