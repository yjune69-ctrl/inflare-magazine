import React from 'react';
import { CampaignInquiry } from '../types';
import { X, FileCheck, Calendar, DollarSign, Building2, CheckCircle2, Clock } from 'lucide-react';

interface CampaignInquiriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: CampaignInquiry[];
}

export const CampaignInquiriesDrawer: React.FC<CampaignInquiriesDrawerProps> = ({
  isOpen,
  onClose,
  inquiries
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg h-full bg-[#0E121A] border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">광고주 제안서 보관함</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                {inquiries.length}건
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            인플레어 스마트 매칭을 통해 발송된 브랜드 캠페인 제안서 접수 내역입니다.
          </p>

          {/* Inquiries list */}
          <div className="space-y-4 pt-2">
            {inquiries.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs space-y-2">
                <FileCheck className="w-10 h-10 mx-auto text-slate-600" />
                <p>아직 발송된 캠페인 제안서가 없습니다.</p>
                <p className="text-slate-600">스마트 매칭 시스템에서 인플루언서를 선택하고 제안서를 발송해보세요.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-[#121620] border border-white/10 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      {inq.brandName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      접수 완료
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#0B0D12] p-2.5 rounded-xl border border-white/5">
                    <div>
                      <span className="text-slate-500 text-[10px]">담당자</span>
                      <div className="text-slate-200 font-medium mt-0.5">{inq.contactPerson}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">캠페인 예산</span>
                      <div className="text-amber-400 font-bold mt-0.5">{inq.budgetRange}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {inq.campaignBrief}
                  </p>

                  <div className="text-[10px] text-slate-500 flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(inq.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                    <span>타깃 분야: {inq.targetCategory}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom footer in drawer */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-500">
            제안서 관련 실시간 문의: partner@inflare-magazine.com
          </p>
        </div>

      </div>
    </div>
  );
};
