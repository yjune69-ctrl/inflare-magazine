import React from 'react';
import { Flame, ShieldCheck, Mail, Phone, MapPin, UserCheck, Award, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07090D] border-t border-white/10 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Col */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center">
              <Flame className="w-4 h-4 text-black fill-black" />
            </div>
            <span className="font-editorial text-xl font-black text-white tracking-widest">
              INFLARE MAGAZINE
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-md">
            INFLARE MAGAZINE은 대한민국 최정상 크리에이터의 트렌드 랭킹인 <strong>INFLUENCER HOT 100</strong>을 매월 공식 발표하며, 심층 인터뷰와 화보, 그리고 브랜드-크리에이터 스마트 AI 매칭 솔루션을 제공하는 프리미엄 미디어 플랫폼입니다.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-amber-400/90 pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>공식 랭킹 데이터 검증 위원회 & 옴부즈만 시스템 운영</span>
          </div>
        </div>

        {/* Methodology Col */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">
            HOT 100 산정 기준
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• 실시간 오가닉 참여율(Engagement Rate)</li>
            <li>• 포스팅 도달률 및 진성 팬덤 지수</li>
            <li>• 월간 검색량 및 버즈량(Buzz Index)</li>
            <li>• 브랜드 협업 캠페인 CVR 전환 기여도</li>
            <li>• 에디토리얼 심사위원단 정성 평가</li>
          </ul>
        </div>

        {/* Contact & Business Info Col */}
        <div className="space-y-3">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>광고주 제휴 & 프레스 문의</span>
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>대표이사: <strong className="text-white font-medium">양준영 (Yang Joon Young)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href="mailto:yjune69@naver.com" className="hover:text-amber-400 transition-colors">
                yjune69@naver.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href="tel:02-547-8229" className="hover:text-amber-400 transition-colors font-mono">
                02-547-8229
              </a>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-slate-400 leading-snug">
                서울특별시 강남구 논현동 204-3
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <div>
          © 2026 INFLARE MAGAZINE & INFLUENCER HOT 100. ALL RIGHTS RESERVED. (대표이사 양준영)
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 cursor-pointer">이용약관</span>
          <span className="hover:text-slate-400 cursor-pointer">개인정보처리방침</span>
          <span className="hover:text-slate-400 cursor-pointer">광고 집행 가이드라인</span>
        </div>
      </div>
    </footer>
  );
};

