import React from 'react';
import { Influencer } from '../types';
import { X, Layers, TrendingUp, Check, Award, SlidersHorizontal } from 'lucide-react';

interface InfluencerComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencers: Influencer[];
  selectedIds: string[];
  onOpenMatcher: (influencer: Influencer) => void;
}

export const InfluencerComparisonModal: React.FC<InfluencerComparisonModalProps> = ({
  isOpen,
  onClose,
  influencers,
  selectedIds,
  onOpenMatcher
}) => {
  if (!isOpen || selectedIds.length === 0) return null;

  const compareList = influencers.filter((i) => selectedIds.includes(i.id));

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 10000) return (num / 10000).toFixed(0) + '만';
    return num.toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0E121A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0E121A]/95 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              인플루언서 지표 & 스펙 비교 ({compareList.length}명)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Table */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compareList.map((inf) => (
              <div
                key={inf.id}
                className="bg-[#121620] border border-white/10 rounded-2xl p-5 space-y-5 flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Rank */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
                    <img
                      src={inf.avatar}
                      alt={inf.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-amber-400 text-black text-xs font-black">
                      HOT #{inf.rank}
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase">
                      {inf.category}
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {inf.koreanName}
                    </h4>
                    <p className="text-xs text-slate-400">{inf.handle}</p>
                  </div>

                  {/* Comparison Metric Rows */}
                  <div className="mt-4 space-y-2 text-xs divide-y divide-white/5">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">HOT Index 점수</span>
                      <span className="font-bold text-amber-400">{inf.metrics.score}점</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">총 팔로워</span>
                      <span className="font-bold text-white">{formatFollowers(inf.metrics.followersTotal)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">반응률 (Engagement)</span>
                      <span className="font-bold text-amber-400">{inf.metrics.engagementRate}%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">월간 성장률</span>
                      <span className="font-bold text-emerald-400">+{inf.metrics.growthRateMonthly}%</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">예상 포스팅 단가</span>
                      <span className="font-bold text-white text-right">{inf.matchingProfile.estimatedCostPerPost}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-400">평균 제작 소요</span>
                      <span className="font-bold text-slate-300">{inf.matchingProfile.avgTurnaroundTime}</span>
                    </div>
                    <div className="py-2">
                      <span className="text-slate-400 block mb-1">여성/남성 오디언스 비율</span>
                      <div className="flex justify-between font-bold">
                        <span className="text-rose-400">여 {inf.audience.genderBreakdown.female}%</span>
                        <span className="text-blue-400">남 {inf.audience.genderBreakdown.male}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenMatcher(inf);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>이 크리에이터로 매칭 시작</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
