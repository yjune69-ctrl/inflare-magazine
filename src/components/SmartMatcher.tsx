import React, { useState, useMemo } from 'react';
import { Influencer, CreatorCategory, CampaignInquiry } from '../types';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Building2, 
  Target, 
  DollarSign, 
  Send, 
  CheckCircle2, 
  Layers, 
  Users, 
  Eye, 
  TrendingUp, 
  FileText, 
  ArrowRight,
  Plus,
  Check,
  Zap,
  HelpCircle
} from 'lucide-react';

interface SmartMatcherProps {
  influencers: Influencer[];
  preSelectedInfluencer?: Influencer | null;
  onSelectInfluencer: (influencer: Influencer) => void;
  onSubmitInquiry: (inquiry: CampaignInquiry) => void;
}

export const SmartMatcher: React.FC<SmartMatcherProps> = ({
  influencers,
  preSelectedInfluencer,
  onSelectInfluencer,
  onSubmitInquiry
}) => {
  // Matching Criteria State
  const [brandName, setBrandName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Fashion & Style');
  const [campaignGoal, setCampaignGoal] = useState<string>('Viral Shortform');
  const [targetAgeGroup, setTargetAgeGroup] = useState<'18-24' | '25-34' | '35-44' | 'All'>('25-34');
  const [targetGender, setTargetGender] = useState<'All' | 'Female' | 'Male'>('All');
  const [budgetTier, setBudgetTier] = useState<number>(10000000); // 10,000,000 KRW
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'YouTube']);
  
  // Selected Cart of Influencers for bundle campaign
  const [selectedMatchIds, setSelectedMatchIds] = useState<string[]>(() => {
    return preSelectedInfluencer ? [preSelectedInfluencer.id] : [];
  });

  // Proposal Submission Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [campaignBrief, setCampaignBrief] = useState('');
  const [targetLaunchDate, setTargetLaunchDate] = useState('2026-04-01');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const toggleMatchSelection = (id: string) => {
    if (selectedMatchIds.includes(id)) {
      setSelectedMatchIds(selectedMatchIds.filter(item => item !== id));
    } else {
      setSelectedMatchIds([...selectedMatchIds, id]);
    }
  };

  // Smart Compatibility Algorithm
  const matchedInfluencersWithScores = useMemo(() => {
    return influencers.map((inf) => {
      let score = 70; // Base score
      const reasons: string[] = [];

      // 1. Industry / Category Alignment (Up to +20)
      if (inf.category === selectedIndustry) {
        score += 18;
        reasons.push(`${selectedIndustry} 카테고리 100% 일치`);
      } else if (inf.matchingProfile.brandFitIndustries.some(ind => ind.includes(selectedIndustry.split(' ')[0]))) {
        score += 12;
        reasons.push(`선호 협업 산업군에 부합`);
      }

      // 2. Demographic Alignment (Up to +10)
      if (targetAgeGroup !== 'All') {
        const agePct = inf.audience.ageBreakdown[targetAgeGroup] || 0;
        if (agePct >= 40) {
          score += 6;
          reasons.push(`${targetAgeGroup}세 타깃 오디언스 비율 ${agePct}% (매우 높음)`);
        } else if (agePct >= 25) {
          score += 3;
        }
      }

      if (targetGender === 'Female' && inf.audience.genderBreakdown.female >= 65) {
        score += 4;
        reasons.push(`여성 팬덤 비중 ${inf.audience.genderBreakdown.female}%`);
      } else if (targetGender === 'Male' && inf.audience.genderBreakdown.male >= 65) {
        score += 4;
        reasons.push(`남성 팬덤 비중 ${inf.audience.genderBreakdown.male}%`);
      }

      // 3. Budget Feasibility
      if (inf.matchingProfile.minBudget <= budgetTier) {
        score += 5;
      } else if (inf.matchingProfile.minBudget > budgetTier * 1.5) {
        score -= 8;
      }

      // 4. Engagement Power
      if (inf.metrics.engagementRate >= 9.0) {
        score += 5;
        reasons.push(`초고반응 인게이지먼트 ${inf.metrics.engagementRate}%`);
      }

      const finalScore = Math.min(99, Math.max(60, score));

      return {
        ...inf,
        matchScore: finalScore,
        matchReasons: reasons
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [influencers, selectedIndustry, campaignGoal, targetAgeGroup, targetGender, budgetTier, selectedPlatforms]);

  // Calculations for selected bundle cart
  const bundleStats = useMemo(() => {
    const selectedList = influencers.filter(i => selectedMatchIds.includes(i.id));
    const totalFollowers = selectedList.reduce((acc, curr) => acc + curr.metrics.followersTotal, 0);
    const avgEngagement = selectedList.length > 0 
      ? (selectedList.reduce((acc, curr) => acc + curr.metrics.engagementRate, 0) / selectedList.length).toFixed(1)
      : '0';
    const estimatedReach = Math.round(totalFollowers * 0.45);
    const estimatedCostTotal = selectedList.reduce((acc, curr) => acc + curr.matchingProfile.minBudget, 0);

    return {
      selectedCount: selectedList.length,
      totalFollowers,
      avgEngagement,
      estimatedReach,
      estimatedCostTotal,
      selectedList
    };
  }, [influencers, selectedMatchIds]);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactPerson) return;

    const newInquiry: CampaignInquiry = {
      id: `inq-${Date.now()}`,
      brandName: brandName || '공식 브랜드 광고주',
      contactPerson,
      email: contactEmail,
      phone: contactPhone,
      budgetRange: `₩${budgetTier.toLocaleString()} 내외`,
      targetCategory: selectedIndustry,
      targetPlatforms: selectedPlatforms,
      selectedInfluencerIds: selectedMatchIds,
      campaignGoal,
      campaignType: '스마트 매칭 제안',
      campaignBrief: campaignBrief || '상세 가이드라인 조율 희망',
      targetDate: targetLaunchDate,
      createdAt: new Date().toISOString(),
      status: 'submitted'
    };

    onSubmitInquiry(newInquiry);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setSelectedMatchIds([]);
    }, 2200);
  };

  const formatKRW = (num: number) => {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '억 원';
    if (num >= 10000) return (num / 10000).toLocaleString() + '만 원';
    return '₩' + num.toLocaleString();
  };

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 10000) return (num / 10000).toFixed(0) + '만';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1A1828] via-[#121620] to-[#0D1017] p-6 sm:p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>AI-POWERED INFLUENCER MATCHING SYSTEM</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-black text-white tracking-wide">
            스마트 광고주 & 인플루언서 매칭 엔진
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            브랜드의 타깃 오디언스, 예산 범위, 캠페인 목적을 입력하면 핫100 데이터베이스에서 가장 높은 전환 효율(ROI)을 낼 수 있는 최적의 인플루언서를 알고리즘으로 즉시 매칭합니다.
          </p>
        </div>
      </div>

      {/* 2-Column Layout: Left Controls, Right Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Matching Filter Setup (5 cols) */}
        <div className="lg:col-span-5 bg-[#121620] p-6 rounded-3xl border border-white/10 space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>매칭 조건 설정</span>
            </h3>
            <span className="text-xs text-amber-400 font-semibold">실시간 계산</span>
          </div>

          <div className="space-y-5 text-xs">
            {/* Brand Name */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                브랜드명 / 광고주
              </label>
              <input
                type="text"
                placeholder="예: 아모레퍼시픽, 무신사, 현대자동차"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Target Category / Industry */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">브랜드 산업군 (Category)</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3.5 py-2.5 text-amber-400 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Fashion & Style">패션 & 스타일 (Fashion & Style)</option>
                <option value="Beauty & Skincare">뷰티 & 스킨케어 (Beauty & Skincare)</option>
                <option value="Tech & Gadget">테크 & IT 디바이스 (Tech & Gadget)</option>
                <option value="Lifestyle & Vlog">라이프스타일 & 리빙 (Lifestyle & Vlog)</option>
                <option value="Fitness & Health">피트니스 & 헬스케어 (Fitness & Health)</option>
                <option value="Food & Mukbang">식음료 & 푸드 (Food & F&B)</option>
                <option value="Travel & Adventure">여행 & 관광 (Travel & Hospitality)</option>
                <option value="Gaming & Anime">게임 & 엔터테인먼트 (Gaming)</option>
                <option value="Culture & Art">문화 & 예술 & 도서 (Culture & Art)</option>
              </select>
            </div>

            {/* Campaign Objective */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                캠페인 핵심 목적
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Viral Shortform', 
                  'Brand Awareness', 
                  'Direct Sales/CVR', 
                  'Brand Ambassador'
                ].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setCampaignGoal(goal)}
                    className={`py-2 px-2.5 rounded-xl border text-left font-semibold transition-all ${
                      campaignGoal === goal
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-[#0B0D12] border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {goal === 'Viral Shortform' && '🔥 숏폼 바이럴/도달'}
                    {goal === 'Brand Awareness' && '✨ 브랜드 인지도 제고'}
                    {goal === 'Direct Sales/CVR' && '🛍️ 구매 전환/공구/커머스'}
                    {goal === 'Brand Ambassador' && '👑 전속/중장기 앰버서더'}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Age & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">핵심 타깃 연령</label>
                <select
                  value={targetAgeGroup}
                  onChange={(e) => setTargetAgeGroup(e.target.value as any)}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">전체 연령</option>
                  <option value="18-24">18-24세 (Z세대)</option>
                  <option value="25-34">25-34세 (밀레니얼 직장인)</option>
                  <option value="35-44">35-44세 (영포티)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-bold">타깃 성별</label>
                <select
                  value={targetGender}
                  onChange={(e) => setTargetGender(e.target.value as any)}
                  className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">남녀 무관 (전체)</option>
                  <option value="Female">여성 집중 타깃 (65%+)</option>
                  <option value="Male">남성 집중 타깃 (65%+)</option>
                </select>
              </div>
            </div>

            {/* Budget Range Slider */}
            <div className="space-y-2 bg-[#0B0D12] p-3.5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center">
                <label className="text-slate-300 font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  캠페인 총 예산
                </label>
                <span className="text-sm font-black text-amber-400">
                  {formatKRW(budgetTier)}
                </span>
              </div>
              <input
                type="range"
                min="3000000"
                max="50000000"
                step="1000000"
                value={budgetTier}
                onChange={(e) => setBudgetTier(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>₩300만</span>
                <span>₩1,000만</span>
                <span>₩2,500만</span>
                <span>₩5,000만+</span>
              </div>
            </div>

            {/* Target Platforms */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold">타깃 플랫폼</label>
              <div className="flex gap-2">
                {['Instagram', 'YouTube', 'TikTok'].map((platform) => {
                  const isChecked = selectedPlatforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`flex-1 py-2 rounded-xl text-center font-bold border transition-colors ${
                        isChecked
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-[#0B0D12] border-white/10 text-slate-400'
                      }`}
                    >
                      {platform}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Matched Influencer Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>AI 스마트 매칭 추천 인플루언서</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                적합도 점수(Match Compatibility) 기준 상위 추천 목록입니다.
              </p>
            </div>

            <div className="text-xs text-slate-400">
              추천 결과: <strong className="text-amber-400">{matchedInfluencersWithScores.length}명</strong>
            </div>
          </div>

          {/* Matched Cards */}
          <div className="space-y-4">
            {matchedInfluencersWithScores.map((inf) => {
              const isSelected = selectedMatchIds.includes(inf.id);

              return (
                <div
                  key={inf.id}
                  id={`match-card-${inf.id}`}
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#181D2A] border-amber-400 shadow-xl shadow-amber-500/10'
                      : 'bg-[#121620] hover:bg-[#161B26] border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Avatar & Names */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => onSelectInfluencer(inf)}>
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={inf.avatar}
                          alt={inf.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-bold text-[11px]">
                            HOT #{inf.rank}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold uppercase">
                            {inf.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white hover:text-amber-400 transition-colors mt-0.5">
                          {inf.koreanName} <span className="text-xs text-slate-400 font-normal">({inf.name})</span>
                        </h4>
                        <div className="text-xs text-slate-500">{inf.handle}</div>
                      </div>
                    </div>

                    {/* Right: Match Score Pill & Toggle Button */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-medium">적합도 점수</div>
                        <div className="text-xl font-black text-amber-400 flex items-center gap-1 justify-end">
                          <Zap className="w-4 h-4 fill-amber-400" />
                          {inf.matchScore}%
                        </div>
                      </div>

                      <button
                        id={`btn-toggle-match-${inf.id}`}
                        type="button"
                        onClick={() => toggleMatchSelection(inf.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                            : 'bg-[#1C2230] hover:bg-amber-500/20 text-slate-200 border border-white/10'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>제안서 담김</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>제안서 담기</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Algorithm Fit Reasons */}
                  {inf.matchReasons && inf.matchReasons.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                      {inf.matchReasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2 py-0.5 rounded-md bg-[#0B0D12] text-[10px] font-semibold text-emerald-300 border border-emerald-500/20 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Pricing and Stats Bar */}
                  <div className="mt-3 grid grid-cols-3 gap-2 bg-[#0B0D12] p-2.5 rounded-xl border border-white/5 text-center text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">총 팔로워</div>
                      <div className="font-bold text-white mt-0.5">{formatFollowers(inf.metrics.followersTotal)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">반응률(Eng.)</div>
                      <div className="font-bold text-amber-400 mt-0.5">{inf.metrics.engagementRate}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">예상 단가</div>
                      <div className="font-bold text-slate-200 mt-0.5">{inf.matchingProfile.estimatedCostPerPost}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Campaign Cart / Proposal Launcher */}
      {bundleStats.selectedCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-[#161B26]/95 backdrop-blur-md border border-amber-500/40 p-4 sm:p-5 rounded-3xl shadow-2xl shadow-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <h4 className="text-sm font-black text-white">
                선택된 매칭 인플루언서: <strong className="text-amber-400">{bundleStats.selectedCount}명</strong>
              </h4>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span>예상 총 도달: <strong className="text-white font-bold">{formatFollowers(bundleStats.estimatedReach)}명</strong></span>
              <span>•</span>
              <span>평균 반응률: <strong className="text-amber-400 font-bold">{bundleStats.avgEngagement}%</strong></span>
              <span>•</span>
              <span>예상 견적: <strong className="text-white font-bold">{formatKRW(bundleStats.estimatedCostTotal)}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-open-proposal-modal"
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>1-Click 캠페인 제안서 발송하기</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          PROPOSAL SUBMISSION MODAL
      ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#0E121A] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">캠페인 제안서 발송 완료!</h3>
                <p className="text-xs text-slate-300">
                  선택하신 인플루언서 및 인플레어 매칭 담당자가 확인 후 24시간 이내에 공식 견적 및 기획안을 회신드립니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <span>광고주 캠페인 공식 제안서 접수</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    선택한 {bundleStats.selectedCount}명의 인플루언서에게 직접 발송되는 맞춤형 브리프입니다.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-[#0B0D12] p-3.5 rounded-2xl border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>선택 크리에이터:</span>
                    <span className="font-bold text-white">
                      {bundleStats.selectedList.map(i => i.koreanName).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>캠페인 카테고리:</span>
                    <span className="text-amber-400 font-bold">{selectedIndustry}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>예상 캠페인 총 예산:</span>
                    <span className="font-bold text-white">{formatKRW(budgetTier)}</span>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold">담당자명 *</label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동 팀장"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full bg-[#121620] border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-bold">연락처 전화번호</label>
                    <input
                      type="text"
                      placeholder="010-1234-5678"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-[#121620] border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-slate-300 font-bold">공식 이메일 주소 *</label>
                  <input
                    type="email"
                    required
                    placeholder="marketing@brand.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#121620] border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-slate-300 font-bold">캠페인 브리프 및 요청사항</label>
                  <textarea
                    rows={3}
                    placeholder="신제품 런칭에 맞춘 인스타 릴스 및 PPL 기획, 제품 배송 일정 및 가이드라인 설명..."
                    value={campaignBrief}
                    onChange={(e) => setCampaignBrief(e.target.value)}
                    className="w-full bg-[#121620] border border-white/10 rounded-xl px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
                  >
                    닫기
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>제안서 즉시 발송</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
