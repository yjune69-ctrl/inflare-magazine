import React, { useState, useEffect } from 'react';
import { Influencer, ViewTab, CampaignInquiry, MagazineArticle } from './types';
import { INITIAL_INFLUENCERS, INITIAL_ARTICLES } from './data/mockData';
import { Header } from './components/Header';
import { Hot100Ranking } from './components/Hot100Ranking';
import { MagazinePictorialSection } from './components/MagazinePictorialSection';
import { SmartMatcher } from './components/SmartMatcher';
import { EditorialSection } from './components/EditorialSection';
import { InfluencerDetailModal } from './components/InfluencerDetailModal';
import { CreatorStudioModal } from './components/CreatorStudioModal';
import { InfluencerComparisonModal } from './components/InfluencerComparisonModal';
import { CampaignInquiriesDrawer } from './components/CampaignInquiriesDrawer';
import { ShareModal } from './components/ShareModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { CheckCircle2, FileCheck } from 'lucide-react';

const STORAGE_KEY_INFLUENCERS = 'inflare_hot100_influencers_v12';
const STORAGE_KEY_ARTICLES = 'inflare_hot100_articles_v12';
const STORAGE_KEY_INQUIRIES = 'inflare_hot100_inquiries_v12';
const STORAGE_KEY_ADMIN_AUTH = 'inflare_admin_auth_v1';
const STORAGE_KEY_ADMIN_PWD = 'inflare_admin_pwd_v1';
const DEFAULT_ADMIN_PWD = 'inflare2026';

export default function App() {
  // Main view navigation tab (Default: 1. 매거진 화보 & 룩북)
  const [activeTab, setActiveTab] = useState<ViewTab>('magazine');

  // Search query in header
  const [searchQuery, setSearchQuery] = useState('');

  // Codebase sync state for Vercel/GitHub deployment
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Admin Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ADMIN_PWD) || DEFAULT_ADMIN_PWD;
    } catch {
      return DEFAULT_ADMIN_PWD;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [adminLoginMessage, setAdminLoginMessage] = useState<string | undefined>(undefined);
  const [pendingAdminAction, setPendingAdminAction] = useState<(() => void) | null>(null);

  // Influencer Database State (Persists in localStorage with auto-migration)
  const [influencers, setInfluencers] = useState<Influencer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INFLUENCERS);
      if (saved) {
        const parsed: Influencer[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((i) => i.id));
        const missing = INITIAL_INFLUENCERS.filter((i) => !existingIds.has(i.id));
        
        const cleaned = parsed.map((inf) => {
          const defaultItem = INITIAL_INFLUENCERS.find((i) => i.id === inf.id);
          if (defaultItem) {
            const defaultTime = defaultItem.updatedAt ? new Date(defaultItem.updatedAt).getTime() : 0;
            const savedTime = inf.updatedAt ? new Date(inf.updatedAt).getTime() : 0;
            // If codebase has newer/equal data, or saved is using old 14.jpg placeholder, prefer codebase!
            const savedHasOldPlaceholder = (inf.avatar && inf.avatar.includes('14.jpg')) ||
                                           (inf.coverImage && inf.coverImage.includes('14.jpg')) ||
                                           (inf.galleryImages && inf.galleryImages.some((img) => img.includes('14.jpg')));
            if (defaultTime >= savedTime || savedHasOldPlaceholder) {
              return defaultItem;
            }
          }

          if (inf.id === 'inf-master-a' || inf.name.toLowerCase().includes('master a')) {
            const masterADefault = INITIAL_INFLUENCERS.find((i) => i.id === 'inf-master-a') || INITIAL_INFLUENCERS[0];
            // Ensure Master A always uses the full 5 editorial real photos from public/images
            const finalGallery = (inf.galleryImages && inf.galleryImages.length >= 5)
              ? inf.galleryImages
              : masterADefault.galleryImages;

            return {
              ...inf,
              avatar: masterADefault.avatar,
              coverImage: masterADefault.coverImage,
              galleryImages: finalGallery,
              pictorialConcept: inf.pictorialConcept || masterADefault.pictorialConcept,
              pictorialCredits: inf.pictorialCredits || masterADefault.pictorialCredits
            };
          }

          const validGallery = (inf.galleryImages || []).filter((img) => img && img.trim().length > 0);

          return {
            ...inf,
            galleryImages: validGallery.length > 0 ? validGallery : (inf.coverImage ? [inf.coverImage] : [inf.avatar])
          };
        });

        if (missing.length > 0) {
          return [...cleaned, ...missing];
        }
        return cleaned;
      }
    } catch (e) {
      console.error('Failed to load saved influencers', e);
    }
    return INITIAL_INFLUENCERS;
  });

  // Magazine Articles State (Persists in localStorage with auto-sync for new default articles)
  const [articles, setArticles] = useState<MagazineArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (saved) {
        const parsed: MagazineArticle[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((a) => a.id));
        const missing = INITIAL_ARTICLES.filter((a) => !existingIds.has(a.id));
        if (missing.length > 0) {
          return [...missing, ...parsed];
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved articles', e);
    }
    return INITIAL_ARTICLES;
  });

  // Campaign Inquiries state
  const [inquiries, setInquiries] = useState<CampaignInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved inquiries', e);
    }
    return [];
  });

  // Active Modals state
  const [selectedInfluencerForDetail, setSelectedInfluencerForDetail] = useState<Influencer | null>(null);
  const [preSelectedInfluencerForMatcher, setPreSelectedInfluencerForMatcher] = useState<Influencer | null>(null);
  
  // Studio Modal state (supports both Creator & Article editing)
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);
  const [studioInitialTab, setStudioInitialTab] = useState<'creator' | 'article'>('creator');
  const [influencerToEditInStudio, setInfluencerToEditInStudio] = useState<Influencer | null>(null);
  const [articleToEditInStudio, setArticleToEditInStudio] = useState<MagazineArticle | null>(null);

  // Comparison State
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Inquiries Drawer state
  const [isInquiriesDrawerOpen, setIsInquiriesDrawerOpen] = useState(false);

  // Share Modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTargetInfluencer, setShareTargetInfluencer] = useState<Influencer | null>(null);

  // Sync admin state with localStorage
  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      }
    } catch (e) {
      console.error('Failed to persist admin state', e);
    }
  }, [isAdmin]);

  // Admin triggers
  const handleOpenAdminLoginModal = (action?: () => void, message?: string) => {
    setPendingAdminAction(() => action || null);
    setAdminLoginMessage(message);
    setIsAdminLoginModalOpen(true);
  };

  const handleAdminLogin = (passwordInput: string): boolean => {
    if (passwordInput === adminPassword || passwordInput === DEFAULT_ADMIN_PWD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
  };

  const handleChangeAdminPassword = (oldPw: string, newPw: string): boolean => {
    if (oldPw === adminPassword || oldPw === DEFAULT_ADMIN_PWD) {
      setAdminPassword(newPw);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_PWD, newPw);
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  // Require admin check wrapper
  const handleRequireAdmin = (action: () => void, message?: string) => {
    if (isAdmin) {
      action();
    } else {
      handleOpenAdminLoginModal(action, message);
    }
  };

  // Parse URL search parameters on initial load (Deep linking)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && (tabParam === 'hot100' || tabParam === 'magazine' || tabParam === 'matcher' || tabParam === 'editorial')) {
        setActiveTab(tabParam as ViewTab);
      }

      const infIdParam = params.get('influencer');
      if (infIdParam) {
        const found = influencers.find((i) => i.id === infIdParam || i.handle === `@${infIdParam}` || i.handle === infIdParam);
        if (found) {
          setSelectedInfluencerForDetail(found);
        }
      }
    } catch (e) {
      console.error('Failed to parse URL query params', e);
    }
  }, [influencers]);

  // Update browser URL query string softly without full reload
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (selectedInfluencerForDetail) {
        params.set('influencer', selectedInfluencerForDetail.id);
      } else if (activeTab !== 'magazine') {
        params.set('tab', activeTab);
      }
      
      const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
      window.history.replaceState(null, '', newQuery);
    } catch (e) {
      // Ignored in strict iframes
    }
  }, [activeTab, selectedInfluencerForDetail]);

  // Save influencers to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INFLUENCERS, JSON.stringify(influencers));
    } catch (e: any) {
      console.error('Failed to persist influencers', e);
      // If storage quota exceeded, cleanup older version keys and retry
      if (e?.name === 'QuotaExceededError' || e?.code === 22) {
        for (let i = 1; i <= 7; i++) {
          try {
            localStorage.removeItem(`inflare_hot100_influencers_v${i}`);
          } catch (_) {}
        }
        try {
          localStorage.setItem(STORAGE_KEY_INFLUENCERS, JSON.stringify(influencers));
        } catch (retryErr) {
          console.warn('LocalStorage quota still exceeded after cleanup', retryErr);
        }
      }
    }
  }, [influencers]);

  // Save articles to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    } catch (e: any) {
      console.error('Failed to persist articles', e);
      if (e?.name === 'QuotaExceededError' || e?.code === 22) {
        for (let i = 1; i <= 7; i++) {
          try {
            localStorage.removeItem(`inflare_magazine_articles_v${i}`);
          } catch (_) {}
        }
        try {
          localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
        } catch (retryErr) {
          console.warn('LocalStorage quota exceeded for articles', retryErr);
        }
      }
    }
  }, [articles]);

  // Save inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to persist inquiries', e);
    }
  }, [inquiries]);

  // Auto-sync function to write state from browser to server code (mockData.ts & public/images)
  const syncToCodebase = async (targetInfluencers?: Influencer[], targetArticles?: MagazineArticle[], showFeedback = false) => {
    const listToSync = targetInfluencers || influencers;
    const articlesToSync = targetArticles || articles;
    if (!Array.isArray(listToSync) || listToSync.length === 0) return;

    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync-to-codebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ influencers: listToSync, articles: articlesToSync }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.success) {
        if (data.updatedInfluencers) {
          setInfluencers(data.updatedInfluencers);
          try {
            localStorage.setItem(STORAGE_KEY_INFLUENCERS, JSON.stringify(data.updatedInfluencers));
          } catch (_) {}
        }
        if (data.updatedArticles) {
          setArticles(data.updatedArticles);
          try {
            localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(data.updatedArticles));
          } catch (_) {}
        }
      }

      if (showFeedback) {
        setSyncFeedback({
          type: 'success',
          message: '✅ 현재 스튜디오 작업 내용(업로드 사진 및 진진모카 등 프로필)이 기본 소스코드(mockData.ts 및 public/images/)에 영구 동기화되었습니다! 이제 배포 시에도 100% 동일하게 유지됩니다.'
        });
        setTimeout(() => setSyncFeedback(null), 7000);
      }
    } catch (err: any) {
      console.warn('Sync to codebase dev endpoint skipped or failed:', err);
      if (showFeedback) {
        setSyncFeedback({
          type: 'info',
          message: '로컬 브라우저(localStorage)에 정상 저장되었습니다.'
        });
        setTimeout(() => setSyncFeedback(null), 4000);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync on initial mount if localStorage has saved creators
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INFLUENCERS);
      if (saved) {
        const parsed: Influencer[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          syncToCodebase(parsed, undefined, false);
        }
      }
    } catch (e) {
      console.error('Initial auto-sync error', e);
    }
  }, []);

  // Handlers
  const handleOpenShareModal = (targetInf?: Influencer | null) => {
    setShareTargetInfluencer(targetInf || selectedInfluencerForDetail || null);
    setIsShareModalOpen(true);
  };

  const handleOpenMatcherWithInfluencer = (influencer: Influencer) => {
    setPreSelectedInfluencerForMatcher(influencer);
    setActiveTab('matcher');
    setSelectedInfluencerForDetail(null);
  };

  const handleOpenCreatorStudio = (influencerToEdit?: Influencer | null, tab: 'creator' | 'article' = 'creator') => {
    setStudioInitialTab(tab);
    setInfluencerToEditInStudio(influencerToEdit || null);
    setArticleToEditInStudio(null);
    setIsCreatorStudioOpen(true);
  };

  const handleOpenArticleStudio = (articleToEdit?: MagazineArticle | null) => {
    setStudioInitialTab('article');
    setArticleToEditInStudio(articleToEdit || null);
    setInfluencerToEditInStudio(null);
    setIsCreatorStudioOpen(true);
  };

  const handleSaveInfluencerFromStudio = (newOrUpdated: Influencer) => {
    const existingIdx = influencers.findIndex((i) => i.id === newOrUpdated.id);
    let nextList: Influencer[];
    if (existingIdx >= 0) {
      nextList = [...influencers];
      nextList[existingIdx] = newOrUpdated;
    } else {
      nextList = [newOrUpdated, ...influencers];
    }
    setInfluencers(nextList);

    if (selectedInfluencerForDetail?.id === newOrUpdated.id) {
      setSelectedInfluencerForDetail(newOrUpdated);
    }

    // Auto-sync new uploaded pictures and profile directly to codebase for deployment
    syncToCodebase(nextList, undefined, true);
  };

  const handleSaveArticleFromStudio = (newOrUpdated: MagazineArticle) => {
    const existingIdx = articles.findIndex((a) => a.id === newOrUpdated.id);
    let nextArticles: MagazineArticle[];
    if (existingIdx >= 0) {
      nextArticles = [...articles];
      nextArticles[existingIdx] = newOrUpdated;
    } else {
      nextArticles = [newOrUpdated, ...articles];
    }
    setArticles(nextArticles);
    syncToCodebase(undefined, nextArticles, true);
  };

  const handleDeleteArticle = (id: string) => {
    if (!isAdmin) {
      handleRequireAdmin(
        () => {
          const nextArticles = articles.filter((a) => a.id !== id);
          setArticles(nextArticles);
          syncToCodebase(undefined, nextArticles, true);
        },
        '기사 삭제 권한은 관리자에게만 부여됩니다.'
      );
      return;
    }
    const nextArticles = articles.filter((a) => a.id !== id);
    setArticles(nextArticles);
    syncToCodebase(undefined, nextArticles, true);
  };

  const handleToggleCompare = (id: string) => {
    if (!id) {
      setSelectedCompareIds([]);
      return;
    }
    if (selectedCompareIds.includes(id)) {
      setSelectedCompareIds(selectedCompareIds.filter((item) => item !== id));
    } else {
      if (selectedCompareIds.length >= 3) {
        alert('최대 3명까지 비교 가능합니다.');
        return;
      }
      setSelectedCompareIds([...selectedCompareIds, id]);
    }
  };

  const handleSubmitInquiry = (newInquiry: CampaignInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  // Export JSON file for server integration
  const handleExportDatabaseJSON = () => {
    const backupData = {
      influencers,
      articles,
      exportDate: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `inflare_content_hub_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Masthead Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreatorStudio={() => {
          if (isAdmin) {
            handleOpenCreatorStudio(null, 'creator');
          } else {
            handleRequireAdmin(
              () => handleOpenCreatorStudio(null, 'creator'),
              '인물 등록 및 기사 작성 스튜디오는 관리자 인증이 필요합니다.'
            );
          }
        }}
        inquiryCount={inquiries.length}
        onOpenInquiries={() => setIsInquiriesDrawerOpen(true)}
        onOpenShare={() => handleOpenShareModal(null)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => handleOpenAdminLoginModal()}
        onLogoutAdmin={handleAdminLogout}
        onSyncToCodebase={() => syncToCodebase(influencers, articles, true)}
        isSyncing={isSyncing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Tab 1: MAGAZINE PICTORIAL & LOOKBOOK (3~6 Photos Editorial Showcase) */}
        {activeTab === 'magazine' && (
          <MagazinePictorialSection
            influencers={influencers}
            searchQuery={searchQuery}
            onSelectInfluencer={(inf) => setSelectedInfluencerForDetail(inf)}
            onOpenMatcher={handleOpenMatcherWithInfluencer}
            onOpenStudio={(inf) => {
              if (isAdmin) {
                handleOpenCreatorStudio(inf, 'creator');
              } else {
                handleRequireAdmin(
                  () => handleOpenCreatorStudio(inf, 'creator'),
                  '인플루언서 화보 및 인터뷰 데이터 편집은 관리자 인증이 필요합니다.'
                );
              }
            }}
            onOpenShare={(inf) => handleOpenShareModal(inf)}
            isAdmin={isAdmin}
            onRequireAdmin={handleRequireAdmin}
          />
        )}

        {/* Tab 2: INFLUENCER HOT 100 RANKING */}
        {activeTab === 'hot100' && (
          <Hot100Ranking
            influencers={influencers}
            searchQuery={searchQuery}
            onSelectInfluencer={(inf) => setSelectedInfluencerForDetail(inf)}
            onOpenMatcherWithInfluencer={handleOpenMatcherWithInfluencer}
            onOpenCreatorStudioWithInfluencer={(inf) => {
              if (isAdmin) {
                handleOpenCreatorStudio(inf, 'creator');
              } else {
                handleRequireAdmin(
                  () => handleOpenCreatorStudio(inf, 'creator'),
                  '인플루언서 화보 및 인터뷰 데이터 편집은 관리자 인증이 필요합니다.'
                );
              }
            }}
            selectedCompareIds={selectedCompareIds}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setIsCompareModalOpen(true)}
            onOpenShare={(inf) => handleOpenShareModal(inf)}
            onNavigateToMagazine={() => setActiveTab('magazine')}
            isAdmin={isAdmin}
          />
        )}

        {/* Tab 3: EDITORIAL & TREND REPORTS */}
        {activeTab === 'editorial' && (
          <EditorialSection
            articles={articles}
            influencers={influencers}
            onSelectInfluencer={(inf) => setSelectedInfluencerForDetail(inf)}
            onOpenArticleEditor={(art) => {
              if (isAdmin) {
                handleOpenArticleStudio(art);
              } else {
                handleRequireAdmin(
                  () => handleOpenArticleStudio(art),
                  '매거진 에디토리얼 기사 작성 및 수정은 편집국 관리자 인증이 필요합니다.'
                );
              }
            }}
            onDeleteArticle={handleDeleteArticle}
            isAdmin={isAdmin}
            onRequireAdmin={handleRequireAdmin}
          />
        )}

        {/* Tab 4: SMART MATCHER SYSTEM */}
        {activeTab === 'matcher' && (
          <SmartMatcher
            influencers={influencers}
            preSelectedInfluencer={preSelectedInfluencerForMatcher}
            onSelectInfluencer={(inf) => setSelectedInfluencerForDetail(inf)}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* ========================================================
          MODALS & DRAWERS
      ======================================================== */}

      {/* 1. Influencer Exclusive Interview & Photo Gallery Modal */}
      <InfluencerDetailModal
        influencer={selectedInfluencerForDetail}
        onClose={() => setSelectedInfluencerForDetail(null)}
        onOpenMatcher={handleOpenMatcherWithInfluencer}
        onOpenStudio={(inf) => {
          setSelectedInfluencerForDetail(null);
          if (isAdmin) {
            handleOpenCreatorStudio(inf, 'creator');
          } else {
            handleRequireAdmin(
              () => handleOpenCreatorStudio(inf, 'creator'),
              '인플루언서 화보 및 인터뷰 편집은 관리자 인증이 필요합니다.'
            );
          }
        }}
        onOpenShare={(inf) => handleOpenShareModal(inf)}
        isAdmin={isAdmin}
        onRequireAdmin={handleRequireAdmin}
      />

      {/* 2. Creator Studio & Article Editor Modal (Unified Content Engine) */}
      <CreatorStudioModal
        isOpen={isCreatorStudioOpen}
        onClose={() => {
          setIsCreatorStudioOpen(false);
          setInfluencerToEditInStudio(null);
          setArticleToEditInStudio(null);
        }}
        onSaveInfluencer={handleSaveInfluencerFromStudio}
        onDeleteInfluencer={(id) => {
          if (!isAdmin) {
            handleRequireAdmin(() => {
              const nextList = influencers.filter((i) => i.id !== id);
              setInfluencers(nextList);
              syncToCodebase(nextList, undefined, true);
            }, '인플루언서 삭제 권한은 관리자에게만 부여됩니다.');
            return;
          }
          const nextList = influencers.filter((i) => i.id !== id);
          setInfluencers(nextList);
          syncToCodebase(nextList, undefined, true);
        }}
        onSaveArticle={handleSaveArticleFromStudio}
        onDeleteArticle={handleDeleteArticle}
        onExportDatabaseJSON={handleExportDatabaseJSON}
        initialInfluencer={influencerToEditInStudio}
        initialArticle={articleToEditInStudio}
        defaultTab={studioInitialTab}
        allInfluencers={influencers}
        allArticles={articles}
        isAdmin={isAdmin}
        onRequireAdmin={handleRequireAdmin}
      />

      {/* 3. Influencer Comparison Modal */}
      <InfluencerComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        influencers={influencers}
        selectedIds={selectedCompareIds}
        onOpenMatcher={handleOpenMatcherWithInfluencer}
      />

      {/* 4. Campaign Inquiries Drawer */}
      <CampaignInquiriesDrawer
        isOpen={isInquiriesDrawerOpen}
        onClose={() => setIsInquiriesDrawerOpen(false)}
        inquiries={inquiries}
      />

      {/* 5. KakaoTalk & Link Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setShareTargetInfluencer(null);
        }}
        influencer={shareTargetInfluencer}
        activeTab={activeTab}
      />

      {/* 6. Admin Authentication & Editorial Authority Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => {
          setIsAdminLoginModalOpen(false);
          setPendingAdminAction(null);
        }}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        onChangePassword={handleChangeAdminPassword}
        promptMessage={adminLoginMessage}
        onSuccessPendingAction={() => {
          if (pendingAdminAction) {
            const act = pendingAdminAction;
            setPendingAdminAction(null);
            act();
          }
        }}
      />

      {/* Codebase Sync Toast / Banner */}
      {syncFeedback && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#161B26]/95 backdrop-blur-md border border-amber-500/60 shadow-2xl rounded-2xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wider">
              배포용 코드 영구 동기화 완료
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              {syncFeedback.message}
            </p>
          </div>
          <button
            onClick={() => setSyncFeedback(null)}
            className="text-slate-400 hover:text-white text-xs p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

