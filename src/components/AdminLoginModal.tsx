import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  LogOut, 
  Unlock, 
  Eye, 
  EyeOff,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
  onChangePassword: (oldPw: string, newPw: string) => boolean;
  promptMessage?: string;
  onSuccessPendingAction?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  onChangePassword,
  promptMessage,
  onSuccessPendingAction
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password change tab state
  const [isChangingPw, setIsChangingPw] = useState(false);
  const [oldPwInput, setOldPwInput] = useState('');
  const [newPwInput, setNewPwInput] = useState('');
  const [confirmPwInput, setConfirmPwInput] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!passwordInput.trim()) {
      setErrorMessage('관리자 비밀번호를 입력해주세요.');
      return;
    }

    const success = onLogin(passwordInput);
    if (success) {
      setSuccessMessage('관리자 인증에 성공했습니다.');
      setTimeout(() => {
        setPasswordInput('');
        setErrorMessage('');
        setSuccessMessage('');
        onClose();
        if (onSuccessPendingAction) {
          onSuccessPendingAction();
        }
      }, 500);
    } else {
      setErrorMessage('비밀번호가 일치하지 않습니다. (기본 비밀번호: inflare2026)');
    }
  };

  const handleQuickDemoLogin = () => {
    setPasswordInput('inflare2026');
    const success = onLogin('inflare2026');
    if (success) {
      setSuccessMessage('관리자 인증에 성공했습니다.');
      setTimeout(() => {
        setPasswordInput('');
        setErrorMessage('');
        setSuccessMessage('');
        onClose();
        if (onSuccessPendingAction) {
          onSuccessPendingAction();
        }
      }, 400);
    } else {
      setErrorMessage('비밀번호가 변경되었을 수 있습니다. 변경된 비밀번호를 입력해주세요.');
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!oldPwInput || !newPwInput || !confirmPwInput) {
      setErrorMessage('모든 항목을 입력해주세요.');
      return;
    }

    if (newPwInput !== confirmPwInput) {
      setErrorMessage('새 비밀번호와 확인이 일치하지 않습니다.');
      return;
    }

    if (newPwInput.length < 4) {
      setErrorMessage('비밀번호는 최소 4자 이상이어야 합니다.');
      return;
    }

    const success = onChangePassword(oldPwInput, newPwInput);
    if (success) {
      setSuccessMessage('비밀번호가 안전하게 변경되었습니다.');
      setOldPwInput('');
      setNewPwInput('');
      setConfirmPwInput('');
      setTimeout(() => {
        setIsChangingPw(false);
        setSuccessMessage('');
      }, 1500);
    } else {
      setErrorMessage('현재 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0E121A] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-950/40 via-[#161B26] to-[#0E121A] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-base text-white flex items-center gap-1.5">
                INFLARE EDITORIAL ADMIN
              </h3>
              <p className="text-[11px] text-amber-300 font-medium">
                인플레어 편집국 전용 관리자 보안 모드
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {promptMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">관리자 인증 필요</p>
                <p className="text-slate-300 mt-0.5">{promptMessage}</p>
              </div>
            </div>
          )}

          {isAdmin ? (
            /* =========================================================================
               LOGGED-IN ADMIN STATUS
            ========================================================================= */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <UserCheck className="w-4 h-4" />
                  <span>편집국 최고 관리자 (Editor-in-Chief) 인증됨</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  현재 매거진 기사 작성/수정/삭제, 인플루언서 랭킹 조정, 화보 게제 및 광고주 제안서 열람 권한이 활성화되어 있습니다.
                </p>
              </div>

              {!isChangingPw ? (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setIsChangingPw(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>관리자 비밀번호 변경</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setSuccessMessage('관리자 모드에서 로그아웃되었습니다.');
                      setTimeout(() => {
                        onClose();
                      }, 600);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-bold text-rose-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>관리자 로그아웃 (일반 구독자 모드로 전환)</span>
                  </button>
                </div>
              ) : (
                /* Change Password Form */
                <form onSubmit={handleChangePasswordSubmit} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">현재 비밀번호</label>
                    <input
                      type="password"
                      value={oldPwInput}
                      onChange={(e) => setOldPwInput(e.target.value)}
                      placeholder="기존 비밀번호 입력"
                      className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">새 비밀번호</label>
                    <input
                      type="password"
                      value={newPwInput}
                      onChange={(e) => setNewPwInput(e.target.value)}
                      placeholder="새 비밀번호 (4자 이상)"
                      className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400">새 비밀번호 확인</label>
                    <input
                      type="password"
                      value={confirmPwInput}
                      onChange={(e) => setConfirmPwInput(e.target.value)}
                      placeholder="새 비밀번호 재입력"
                      className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-xs text-emerald-400 font-medium">{successMessage}</p>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPw(false);
                        setErrorMessage('');
                      }}
                      className="flex-1 py-2 rounded-xl bg-white/5 text-xs text-slate-300 hover:bg-white/10"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400"
                    >
                      비밀번호 저장
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* =========================================================================
               LOGIN FORM
            ========================================================================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>편집국 관리자 비밀번호</span>
                  </label>
                  <span className="text-[10px] text-amber-400 font-medium">기본값: inflare2026</span>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="비밀번호 입력..."
                    autoFocus
                    className="w-full bg-[#161B26] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>관리자 로그인 & 권한 활성화</span>
              </button>

              {/* 1-Click Quick Demo Login Button */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2 px-3 rounded-xl bg-[#161B26] hover:bg-[#202838] border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>원클릭 데모 관리자 인증 (inflare2026)</span>
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-2">
                  일반 구독자는 기사 열람 및 매칭 제안서 작성만 가능하며, 기사 작성·편집은 관리자만 수행 가능합니다.
                </p>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
