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

const STORAGE_KEY_INFLUENCERS = 'inflare_hot100_influencers_v8';
const STORAGE_KEY_ARTICLES = 'inflare_hot100_articles_v8';
const STORAGE_KEY_INQUIRIES = 'inflare_hot100_inquiries_v8';
const STORAGE_KEY_ADMIN_AUTH = 'inflare_admin_auth_v1';
const STORAGE_KEY_ADMIN_PWD = 'inflare_admin_pwd_v1';
const DEFAULT_ADMIN_PWD = 'inflare2026';

export default function App() {
  // Main view navigation tab (Default: 1. 매거진 화보 & 룩북)
  const [activeTab, setActiveTab] = useState<ViewTab>('magazine');

  // Search query in header
  const [searchQuery, setSearchQuery] = useState('');

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
          // Sanitize gallery images to remove old AI generated placeholders
          const validGallery = (inf.galleryImages || []).filter((img) => {
            if (!img) return false;
            if (img.includes('mastera_lookbook') || img.includes('mastera_detail') || img.includes('mastera_b_cut') || img.includes('mastera_closeup')) {
              return false;
            }
            return true;
          });

          if (inf.id === 'inf-master-a' || inf.name.toLowerCase().includes('master a')) {
            const masterADefault = INITIAL_INFLUENCERS.find((i) => i.id === 'inf-master-a') || INITIAL_INFLUENCERS[0];
            const finalAvatar = (!inf.avatar || inf.avatar.includes('mastera_closeup')) ? masterADefault.avatar : inf.avatar;
            const finalCover = inf.coverImage || masterADefault.coverImage;
            const finalGallery = validGallery.length > 0 ? validGallery : masterADefault.galleryImages;

            return {
              ...inf,
              avatar: finalAvatar,
              coverImage: finalCover,
              galleryImages: finalGallery,
              pictorialConcept: inf.pictorialConcept || masterADefault.pictorialConcept,
              pictorialCredits: inf.pictorialCredits || masterADefault.pictorialCredits
            };
          }

          return {
            ...inf,
            galleryImages: validGallery.length > 0 ? validGallery : (inf.coverImage ? [inf.coverImage] : [inf.avatar])
          };
        });

        if (missing.length > 0) {
          return [...missing, ...cleaned];
        }
        return cleaned;
      }
    } catch (e) {
      console.error('Failed to load saved influencers', e);
    }
    return INITIAL_INFLUENCERS;
  });

  // Magazine Articles State (Persists in localStorage)
  const [articles, setArticles] = useState<MagazineArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (saved) {
        return JSON.parse(saved);
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
    } catch (e) {
      console.error('Failed to persist influencers', e);
    }
  }, [influencers]);

  // Save articles to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to persist articles', e);
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
    setInfluencers((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === newOrUpdated.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newOrUpdated;
        return updated;
      } else {
        return [newOrUpdated, ...prev];
      }
    });

    if (selectedInfluencerForDetail?.id === newOrUpdated.id) {
      setSelectedInfluencerForDetail(newOrUpdated);
    }
  };

  const handleSaveArticleFromStudio = (newOrUpdated: MagazineArticle) => {
    setArticles((prev) => {
      const existingIdx = prev.findIndex((a) => a.id === newOrUpdated.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newOrUpdated;
        return updated;
      } else {
        return [newOrUpdated, ...prev];
      }
    });
  };

  const handleDeleteArticle = (id: string) => {
    if (!isAdmin) {
      handleOpenAdminLoginModal(
        () => setArticles((prev) => prev.filter((a) => a.id !== id)),
        '기사 삭제 권한은 관리자에게만 부여됩니다.'
      );
      return;
    }
    setArticles((prev) => prev.filter((a) => a.id !== id));
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
        onSaveArticle={handleSaveArticleFromStudio}
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
    </div>
  );
}

