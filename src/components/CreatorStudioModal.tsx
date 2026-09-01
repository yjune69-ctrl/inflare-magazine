import React, { useState, useRef, useEffect } from 'react';
import { 
  Influencer, 
  CreatorCategory, 
  InfluencerInterviewSection, 
  MagazineArticle 
} from '../types';
import { MAGAZINE_IMAGE_PRESETS } from '../data/imagePresets';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  MessageSquare, 
  FileJson, 
  Check, 
  AlertCircle,
  HelpCircle,
  Link,
  Layers,
  ArrowRight,
  BookOpen,
  User,
  Eye,
  RefreshCw,
  PlusCircle,
  Quote,
  Type,
  AlignLeft,
  Calendar,
  Clock,
  Tag,
  Star,
  Users,
  Lock,
  ShieldCheck,
  Camera
} from 'lucide-react';

export type StudioTab = 'creator' | 'article';

interface CreatorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveInfluencer: (influencer: Influencer) => void;
  onDeleteInfluencer?: (id: string) => void;
  onSaveArticle: (article: MagazineArticle) => void;
  onDeleteArticle?: (id: string) => void;
  onExportDatabaseJSON: () => void;
  initialInfluencer?: Influencer | null;
  initialArticle?: MagazineArticle | null;
  defaultTab?: StudioTab;
  allInfluencers: Influencer[];
  allArticles: MagazineArticle[];
  isAdmin?: boolean;
  onRequireAdmin?: (action: () => void, message?: string) => void;
}

export const CreatorStudioModal: React.FC<CreatorStudioModalProps> = ({
  isOpen,
  onClose,
  onSaveInfluencer,
  onDeleteInfluencer,
  onSaveArticle,
  onDeleteArticle,
  onExportDatabaseJSON,
  initialInfluencer,
  initialArticle,
  defaultTab = 'creator',
  allInfluencers,
  allArticles,
  isAdmin = false,
  onRequireAdmin
}) => {
  if (!isOpen) return null;

  // Active top-level Studio tab: 'creator' (인물) vs 'article' (기사)
  const [activeTab, setActiveTab] = useState<StudioTab>(defaultTab);

  // When props change, ensure proper tab is active
  useEffect(() => {
    if (initialArticle && !initialInfluencer) {
      setActiveTab('article');
    } else if (initialInfluencer && !initialArticle) {
      setActiveTab('creator');
    } else {
      setActiveTab(defaultTab);
    }
  }, [initialInfluencer, initialArticle, defaultTab]);

  /* =========================================================================
     1. INFLUENCER / PERSON ENTITY STATE
  ========================================================================= */
  const [selectedInfluencerId, setSelectedInfluencerId] = useState<string>(
    initialInfluencer?.id || 'new'
  );

  // Form fields
  const [infId, setInfId] = useState(initialInfluencer?.id || `inf-${Date.now()}`);
  const [rank, setRank] = useState<number>(initialInfluencer?.rank || allInfluencers.length + 1);
  const [previousRank, setPreviousRank] = useState<number>(initialInfluencer?.previousRank || 0);
  const [koreanName, setKoreanName] = useState(initialInfluencer?.koreanName || '');
  const [name, setName] = useState(initialInfluencer?.name || '');
  const [handle, setHandle] = useState(initialInfluencer?.handle || '@');
  const [category, setCategory] = useState<CreatorCategory>(initialInfluencer?.category || 'Fashion & Style');
  
  // Photos
  const [avatar, setAvatar] = useState(
    initialInfluencer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'
  );
  const [coverImage, setCoverImage] = useState(
    initialInfluencer?.coverImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialInfluencer?.galleryImages || [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ]
  );
  const [customImageUrlInput, setCustomImageUrlInput] = useState('');
  const [pictorialConcept, setPictorialConcept] = useState(
    initialInfluencer?.pictorialConcept || '2026 Spring Exclusive Fashion Lookbook'
  );
  const [pictorialCredits, setPictorialCredits] = useState(
    initialInfluencer?.pictorialCredits || 'Photographer: Studio Inflare | Stylist: Fashion Team'
  );

  // Bio & Quotes
  const [oneLinerQuote, setOneLinerQuote] = useState(initialInfluencer?.oneLinerQuote || '');
  const [bio, setBio] = useState(initialInfluencer?.bio || '');
  const [badgesText, setBadgesText] = useState(initialInfluencer?.badges.join(', ') || 'HOT 100, 트렌드 리더, 이달의 루키');

  // Metrics
  const [followersTotal, setFollowersTotal] = useState(initialInfluencer?.metrics.followersTotal || 500000);
  const [engagementRate, setEngagementRate] = useState(initialInfluencer?.metrics.engagementRate || 8.5);
  const [score, setScore] = useState(initialInfluencer?.metrics.score || 92.0);
  const [growthRateMonthly, setGrowthRateMonthly] = useState(initialInfluencer?.metrics.growthRateMonthly || 12.5);

  // Interview Editor
  const [interviewHeadline, setInterviewHeadline] = useState(
    initialInfluencer?.interview?.headline || 'THE NEW WAVE: 시대를 움직이는 크리에이터의 목소리'
  );
  const [interviewSubtitle, setInterviewSubtitle] = useState(
    initialInfluencer?.interview?.subtitle || '진정성 있는 콘텐츠와 팬덤으로 구축한 독보적 영향력의 비결'
  );
  const [interviewLead, setInterviewLead] = useState(
    initialInfluencer?.interview?.leadParagraph || '카메라 앞과 뒤, 그리고 일상 속에서 마주하는 진솔한 이야기.'
  );
  const [editorName, setEditorName] = useState(initialInfluencer?.interview?.editor || 'INFLARE 편집부');
  const [interviewSections, setInterviewSections] = useState<InfluencerInterviewSection[]>(
    initialInfluencer?.interview?.sections || [
      {
        question: 'Q1. 이번 인플루언서 핫100 선정 소감과 크리에이터로서의 핵심 철학은 무엇인가요?',
        answer: '언제나 저만의 시선과 취향을 믿고 함께해 주시는 팬 여러분 덕분입니다. 단순한 유행을 좇기보다는 제 삶의 진솔한 순간을 기록하려고 노력합니다.',
        highlightQuote: '“진정성은 숫자를 넘어 사람의 마음에 가닿는 가장 강력한 힘입니다.”'
      },
      {
        question: 'Q2. 브랜드 협업이나 차기 프로젝트에서 가장 기대하고 있는 부분은?',
        answer: '브랜드 고유의 가치를 저의 감각으로 재해석하여 새로운 시각적 즐거움을 드리는 협업을 지향합니다.',
        highlightQuote: '“단순한 광고를 넘어 하나의 감도 높은 아카이브를 만듭니다.”'
      }
    ]
  );
  const [behindTheScenes, setBehindTheScenes] = useState(
    initialInfluencer?.interview?.behindTheScenes || '촬영 현장에서 밝은 에너지와 디테일한 아이디어로 매 컷을 완성했습니다.'
  );
  const [favoriteBrandsText, setFavoriteBrandsText] = useState(
    initialInfluencer?.interview?.favoriteBrands?.join(', ') || 'Chanel, Celine, Apple, Gentle Monster'
  );

  // Matching Profile
  const [estimatedCost, setEstimatedCost] = useState(initialInfluencer?.matchingProfile?.estimatedCostPerPost || '₩4,000,000 ~ ₩7,000,000');
  const [minBudgetKRW, setMinBudgetKRW] = useState(initialInfluencer?.matchingProfile?.minBudget || 4000000);
  const [turnaroundTime, setTurnaroundTime] = useState(initialInfluencer?.matchingProfile?.avgTurnaroundTime || '3~5일');
  const [responseRate, setResponseRate] = useState(initialInfluencer?.matchingProfile?.responseRate || '98%');

  // Contact & Socials
  const [contactEmail, setContactEmail] = useState(initialInfluencer?.contact?.email || '');
  const [agencyName, setAgencyName] = useState(initialInfluencer?.contact?.agency || 'INFLARE Creator Network');
  const [instagramUrl, setInstagramUrl] = useState(initialInfluencer?.contact?.instagramUrl || '');
  const [facebookUrl, setFacebookUrl] = useState(initialInfluencer?.contact?.facebookUrl || '');

  // Load selected influencer into form
  const loadInfluencerIntoForm = (inf: Influencer | null) => {
    if (inf) {
      setSelectedInfluencerId(inf.id);
      setInfId(inf.id);
      setRank(inf.rank);
      setPreviousRank(inf.previousRank);
      setKoreanName(inf.koreanName);
      setName(inf.name);
      setHandle(inf.handle);
      setCategory(inf.category);
      setAvatar(inf.avatar);
      setCoverImage(inf.coverImage);
      setGalleryImages(inf.galleryImages || []);
      setPictorialConcept(inf.pictorialConcept || '2026 Spring Exclusive Fashion Lookbook');
      setPictorialCredits(inf.pictorialCredits || 'Photographer: Studio Inflare | Stylist: Fashion Team');
      setOneLinerQuote(inf.oneLinerQuote);
      setBio(inf.bio);
      setBadgesText(inf.badges.join(', '));
      setFollowersTotal(inf.metrics.followersTotal);
      setEngagementRate(inf.metrics.engagementRate);
      setScore(inf.metrics.score);
      setGrowthRateMonthly(inf.metrics.growthRateMonthly);
      setInterviewHeadline(inf.interview.headline);
      setInterviewSubtitle(inf.interview.subtitle);
      setInterviewLead(inf.interview.leadParagraph);
      setEditorName(inf.interview.editor);
      setInterviewSections(inf.interview.sections || []);
      setBehindTheScenes(inf.interview.behindTheScenes || '');
      setFavoriteBrandsText(inf.interview.favoriteBrands?.join(', ') || '');
      setEstimatedCost(inf.matchingProfile.estimatedCostPerPost);
      setMinBudgetKRW(inf.matchingProfile.minBudget);
      setTurnaroundTime(inf.matchingProfile.avgTurnaroundTime);
      setResponseRate(inf.matchingProfile.responseRate);
      setContactEmail(inf.contact.email || '');
      setAgencyName(inf.contact.agency || '');
      setInstagramUrl(inf.contact.instagramUrl || '');
      setFacebookUrl(inf.contact.facebookUrl || '');
    } else {
      // Reset for New Influencer
      setSelectedInfluencerId('new');
      const newId = `inf-new-${Date.now()}`;
      setInfId(newId);
      setRank(allInfluencers.length + 1);
      setPreviousRank(0);
      setKoreanName('');
      setName('');
      setHandle('@');
      setCategory('Fashion & Style');
      setAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop');
      setCoverImage('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop');
      setGalleryImages([
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
      ]);
      setPictorialConcept('2026 Spring Exclusive Fashion Lookbook');
      setPictorialCredits('Photographer: Studio Inflare | Stylist: Fashion Team');
      setOneLinerQuote('“새로운 트렌드를 창조하고 팬들과 진솔하게 소통합니다.”');
      setBio('트렌디한 감각과 독창적인 콘텐츠로 주목받는 크리에이터입니다.');
      setBadgesText('HOT 100 NEW, 라이징 루키');
      setFollowersTotal(350000);
      setEngagementRate(7.8);
      setScore(88.5);
      setGrowthRateMonthly(15.2);
      setInterviewHeadline('NEW ICON: 트렌드의 중심에서 전하는 새로운 영감');
      setInterviewSubtitle('자신만의 뚜렷한 색채로 팬덤을 구축한 신예 인플루언서 스토리');
      setInterviewLead('차세대 크리에이터로서 독보적인 비주얼과 라이프스타일을 선보입니다.');
      setEditorName('INFLARE 매거진 편집국');
      setInterviewSections([
        {
          question: 'Q1. 인플루언서 핫100에 새롭게 진입한 소감은?',
          answer: '많은 분들이 제 콘텐츠를 아껴주시고 공감해주신 덕분입니다. 앞으로도 진정성 있는 작업물로 보답하겠습니다.',
          highlightQuote: '“숫자보다 중요한 것은 팬들과의 진솔한 유대감입니다.”'
        }
      ]);
      setBehindTheScenes('현장 스태프들과의 유쾌한 소통 속에서 시종일관 열정적인 분위기로 촬영이 진행되었습니다.');
      setFavoriteBrandsText('Chanel, Maison Margiela, Apple');
      setEstimatedCost('₩3,000,000 ~ ₩5,000,000');
      setMinBudgetKRW(3000000);
      setTurnaroundTime('3~5일');
      setResponseRate('99%');
      setContactEmail('');
      setAgencyName('INFLARE Creator Network');
      setInstagramUrl('');
      setFacebookUrl('');
    }
  };

  /* =========================================================================
     2. ARTICLE / EDITORIAL WRITING STATE
  ========================================================================= */
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    initialArticle?.id || 'new'
  );

  const [articleId, setArticleId] = useState(initialArticle?.id || `art-${Date.now()}`);
  const [articleTitle, setArticleTitle] = useState(
    initialArticle?.title || ''
  );
  const [articleSubtitle, setArticleSubtitle] = useState(
    initialArticle?.subtitle || ''
  );
  const [articleCategory, setArticleCategory] = useState(
    initialArticle?.category || 'INDUSTRY INSIGHT'
  );
  const [articleReadTime, setArticleReadTime] = useState(
    initialArticle?.readTime || '5 min read'
  );
  const [articleAuthor, setArticleAuthor] = useState(
    initialArticle?.author || 'INFLARE Special Editorial Team'
  );
  const [articleDate, setArticleDate] = useState(
    initialArticle?.date || new Date().toISOString().slice(0, 10).replace(/-/g, '.')
  );
  const [articleExcerpt, setArticleExcerpt] = useState(
    initialArticle?.excerpt || ''
  );
  const [articleCoverImage, setArticleCoverImage] = useState(
    initialArticle?.coverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop'
  );
  const [articleTagsText, setArticleTagsText] = useState(
    initialArticle?.tags.join(', ') || '인플루언서 마케팅, 2026 트렌드, 크리에이터 이코노미'
  );
  const [articleRelatedInfluencerIds, setArticleRelatedInfluencerIds] = useState<string[]>(
    initialArticle?.relatedInfluencerIds || []
  );

  // Article Content Blocks
  const [contentBlocks, setContentBlocks] = useState<Array<{
    type: 'paragraph' | 'heading' | 'quote' | 'image';
    text?: string;
    author?: string;
    imageUrl?: string;
    caption?: string;
  }>>(
    initialArticle?.contentBlocks || [
      {
        type: 'paragraph',
        text: '2026년 국내외 크리에이터 생태계는 정량적 수치를 넘어 정성적 팬덤 락인(Lock-in)과 브랜드 신뢰도 중심으로 재편되고 있습니다.'
      },
      {
        type: 'heading',
        text: '1. 크리에이터 이코노미의 진화와 버티컬 전문성'
      },
      {
        type: 'paragraph',
        text: '버티컬 분야에서 독보적 전문성과 감각을 지닌 크리에이터들이 단순한 협찬을 넘어 브랜드의 공동 디렉터로 참여하며 파급력을 극대화하고 있습니다.'
      },
      {
        type: 'quote',
        text: '“단순히 제품을 보여주는 것이 아닌, 크리에이터의 라이프스타일 속에 자연스럽게 스며드는 브랜딩이 필수입니다.”',
        author: 'INFLARE 수석 리서치 디렉터'
      }
    ]
  );

  // Article Live Preview Toggle
  const [isArticlePreviewMode, setIsArticlePreviewMode] = useState(false);

  // Load selected article into editor
  const loadArticleIntoForm = (art: MagazineArticle | null) => {
    if (art) {
      setSelectedArticleId(art.id);
      setArticleId(art.id);
      setArticleTitle(art.title);
      setArticleSubtitle(art.subtitle);
      setArticleCategory(art.category);
      setArticleReadTime(art.readTime);
      setArticleAuthor(art.author);
      setArticleDate(art.date);
      setArticleExcerpt(art.excerpt);
      setArticleCoverImage(art.coverImage);
      setArticleTagsText(art.tags.join(', '));
      setArticleRelatedInfluencerIds(art.relatedInfluencerIds || []);
      setContentBlocks(art.contentBlocks || []);
    } else {
      // Reset for New Article
      setSelectedArticleId('new');
      const newId = `art-new-${Date.now()}`;
      setArticleId(newId);
      setArticleTitle('');
      setArticleSubtitle('');
      setArticleCategory('INDUSTRY INSIGHT');
      setArticleReadTime('5 min read');
      setArticleAuthor('INFLARE 매거진 편집국');
      setArticleDate(new Date().toISOString().slice(0, 10).replace(/-/g, '.'));
      setArticleExcerpt('');
      setArticleCoverImage('https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop');
      setArticleTagsText('2026 트렌드, 인플루언서 매거진, 핫이슈');
      setArticleRelatedInfluencerIds([]);
      setContentBlocks([
        {
          type: 'paragraph',
          text: '기사의 첫 번째 도입부 내용을 작성하세요.'
        },
        {
          type: 'heading',
          text: '1. 소제목을 입력하세요'
        },
        {
          type: 'paragraph',
          text: '소제목에 대한 상세 분석 및 인터뷰 내용을 작성하세요.'
        }
      ]);
    }
  };

  // Feedback states
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // File Upload refs
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const galleryMultiFileRef = useRef<HTMLInputElement>(null);
  const articleCoverFileRef = useRef<HTMLInputElement>(null);

  // Image Upload Handlers (FileReader base64)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setter(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    const readPromises = fileList.map((file: File) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve((event.target?.result as string) || '');
        };
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });
    });

    const newImages = await Promise.all(readPromises);
    const validImages = newImages.filter((img) => img && img.trim().length > 0);
    if (validImages.length > 0) {
      setGalleryImages((prev) => [...prev, ...validImages]);
      setSaveSuccessMsg(`${validImages.length}장의 사진이 추가되었습니다.`);
      setTimeout(() => setSaveSuccessMsg(null), 2500);
    }
    // reset input value
    e.target.value = '';
  };

  const handleGalleryDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingGallery(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const imageFiles: File[] = (Array.from(files) as File[]).filter((f) => f.type.startsWith('image/'));
    const readPromises = imageFiles.map((file: File) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve((event.target?.result as string) || '');
        };
        reader.onerror = () => resolve('');
        reader.readAsDataURL(file);
      });
    });

    const newImages = await Promise.all(readPromises);
    const validImages = newImages.filter((img) => img && img.trim().length > 0);
    if (validImages.length > 0) {
      setGalleryImages((prev) => [...prev, ...validImages]);
      setSaveSuccessMsg(`${validImages.length}장의 사진이 드롭 추가되었습니다.`);
      setTimeout(() => setSaveSuccessMsg(null), 2500);
    }
  };

  const handleSlotUpload = (slotIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setGalleryImages((prev) => {
          const updated = [...prev];
          while (updated.length <= slotIndex) {
            updated.push('');
          }
          updated[slotIndex] = dataUrl;
          return updated.filter((img, i) => i <= slotIndex || img.length > 0);
        });
        if (slotIndex === 0) {
          setCoverImage(dataUrl);
        }
        setSaveSuccessMsg(`슬롯 #${slotIndex + 1} 사진이 교체되었습니다.`);
        setTimeout(() => setSaveSuccessMsg(null), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSlotUrlChange = (slotIndex: number, url: string) => {
    setGalleryImages((prev) => {
      const updated = [...prev];
      while (updated.length <= slotIndex) {
        updated.push('');
      }
      updated[slotIndex] = url;
      return updated;
    });
  };

  const handleSlotClear = (slotIndex: number) => {
    setGalleryImages((prev) => {
      const updated = [...prev];
      if (slotIndex < updated.length) {
        updated.splice(slotIndex, 1);
      }
      return updated;
    });
  };

  const applyMasterAPresets = () => {
    setGalleryImages([
      '/images/MMG0176.jpg' // Master A 실제 고화질 원본
    ]);
    setAvatar('/images/MMG0176.jpg');
    setCoverImage('/images/MMG0176.jpg');
    setPictorialConcept('2026 S/S Master A Special Lookbook: Asian High Chic & Editorial Aura');
    setPictorialCredits('Photo: Studio Alpha • Styling: Nguyen Ngoc An • Direction: INFLARE Lookbook Team');
    setKoreanName('Nguyen Ngoc An');
    setName('Master A');
    setHandle('@mastera_11');
    setInstagramUrl('https://instagram.com/mastera_11');
    setFacebookUrl('https://facebook.com/youngalpha29');
    setSaveSuccessMsg('Master A 프로필과 원본 화보 사진이 성공적으로 배치되었습니다.');
    setTimeout(() => setSaveSuccessMsg(null), 2500);
  };

  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  const moveGalleryImage = (index: number, direction: 'left' | 'right') => {
    const newIdx = direction === 'left' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= galleryImages.length) return;
    const updated = [...galleryImages];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;
    setGalleryImages(updated);
  };

  const handleAddImageUrlToGallery = () => {
    if (!customImageUrlInput.trim()) return;
    setGalleryImages([...galleryImages, customImageUrlInput.trim()]);
    if (!avatar) setAvatar(customImageUrlInput.trim());
    setCustomImageUrlInput('');
  };

  const handleAddPresetToGallery = (url: string) => {
    if (!galleryImages.includes(url)) {
      setGalleryImages([...galleryImages, url]);
    }
    setAvatar(url);
  };

  // Interview Q&A handlers
  const handleAddInterviewSection = () => {
    setInterviewSections([
      ...interviewSections,
      {
        question: `Q${interviewSections.length + 1}. 새로운 인터뷰 질문을 입력하세요`,
        answer: '답변 내용을 입력하세요.',
        highlightQuote: ''
      }
    ]);
  };

  const handleUpdateInterviewSection = (index: number, field: keyof InfluencerInterviewSection, value: string) => {
    const updated = [...interviewSections];
    updated[index] = { ...updated[index], [field]: value };
    setInterviewSections(updated);
  };

  const handleRemoveInterviewSection = (index: number) => {
    setInterviewSections(interviewSections.filter((_, idx) => idx !== index));
  };

  // Article Content Blocks handlers
  const handleAddContentBlock = (type: 'paragraph' | 'heading' | 'quote' | 'image') => {
    if (type === 'paragraph') {
      setContentBlocks([...contentBlocks, { type: 'paragraph', text: '새로운 단락 내용을 작성하세요.' }]);
    } else if (type === 'heading') {
      setContentBlocks([...contentBlocks, { type: 'heading', text: `${contentBlocks.filter(b => b.type === 'heading').length + 1}. 소제목을 입력하세요` }]);
    } else if (type === 'quote') {
      setContentBlocks([...contentBlocks, { type: 'quote', text: '“강조하고 싶은 핵심 명언이나 인용구를 입력하세요.”', author: koreanName || '전문가' }]);
    } else if (type === 'image') {
      setContentBlocks([...contentBlocks, { 
        type: 'image', 
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', 
        caption: '화보 캡션 또는 이미지 설명을 입력하세요.' 
      }]);
    }
  };

  const handleUpdateContentBlock = (index: number, updates: any) => {
    const updated = [...contentBlocks];
    updated[index] = { ...updated[index], ...updates };
    setContentBlocks(updated);
  };

  const handleRemoveContentBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, idx) => idx !== index));
  };

  const handleMoveContentBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === contentBlocks.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...contentBlocks];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setContentBlocks(updated);
  };

  // Toggle Related Influencer for Article
  const handleToggleRelatedInfluencer = (id: string) => {
    if (articleRelatedInfluencerIds.includes(id)) {
      setArticleRelatedInfluencerIds(articleRelatedInfluencerIds.filter(i => i !== id));
    } else {
      setArticleRelatedInfluencerIds([...articleRelatedInfluencerIds, id]);
    }
  };

  // SAVE INFLUENCER FORM SUBMIT
  const handleSaveInfluencerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      if (onRequireAdmin) {
        onRequireAdmin(
          () => {},
          '인플루언서 프로필 등록 및 화보 저장은 인플레어 관리자 인증이 필요합니다.'
        );
      } else {
        alert('관리자 인증 후 저장이 가능합니다.');
      }
      return;
    }

    if (!koreanName.trim()) {
      alert('인플루언서 한국어 이름을 입력해주세요.');
      return;
    }
    if (!handle.trim() || handle === '@') {
      alert('SNS 아이디 (@handle)를 입력해주세요.');
      return;
    }

    const newOrUpdated: Influencer = {
      id: infId,
      rank: Number(rank) || 1,
      previousRank: Number(previousRank) || 0,
      name: name.trim() || koreanName.trim(),
      koreanName: koreanName.trim(),
      handle: handle.startsWith('@') ? handle.trim() : `@${handle.trim()}`,
      category,
      avatar: avatar || galleryImages[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
      coverImage: coverImage || galleryImages[0] || avatar,
      galleryImages: galleryImages.length > 0 ? galleryImages : [avatar],
      pictorialConcept: pictorialConcept.trim() || '2026 Spring Exclusive Fashion Lookbook',
      pictorialCredits: pictorialCredits.trim() || 'Photographer: Studio Inflare | Stylist: Fashion Team',
      bio: bio.trim() || `${koreanName} 크리에이터의 공식 프로필입니다.`,
      oneLinerQuote: oneLinerQuote.trim() || `“${koreanName}의 감각적인 콘텐츠를 만나보세요.”`,
      metrics: {
        followersTotal: Number(followersTotal) || 100000,
        engagementRate: Number(engagementRate) || 5.0,
        avgViews: Math.round((Number(followersTotal) || 100000) * 0.4),
        avgLikes: Math.round((Number(followersTotal) || 100000) * 0.05),
        score: Number(score) || 85.0,
        growthRateMonthly: Number(growthRateMonthly) || 10.0
      },
      badges: badgesText.split(',').map(b => b.trim()).filter(Boolean),
      verified: true,
      hasExclusiveInterview: interviewSections.length > 0,
      audience: initialInfluencer?.audience || {
        ageBreakdown: { '18-24': 35, '25-34': 48, '35-44': 14, '45+': 3 },
        genderBreakdown: { female: 70, male: 30 },
        topRegions: ['대한민국 서울 (65%)', '부산/경기 (20%)', '글로벌 (15%)']
      },
      interview: {
        headline: interviewHeadline.trim() || `${koreanName}의 시대를 움직이는 독보적 스토리`,
        subtitle: interviewSubtitle.trim() || '팬덤과 진정성으로 구축한 독보적 영향력',
        date: '2026 ISSUE EXCLUSIVE',
        editor: editorName.trim() || 'INFLARE 매거진 편집국',
        leadParagraph: interviewLead.trim() || '카메라 앞과 뒤, 그리고 일상 속에서 마주하는 진솔한 이야기.',
        sections: interviewSections,
        behindTheScenes,
        favoriteBrands: favoriteBrandsText.split(',').map(b => b.trim()).filter(Boolean),
        audioDuration: '12 min listening'
      },
      matchingProfile: {
        estimatedCostPerPost: estimatedCost,
        minBudget: Number(minBudgetKRW) || 3000000,
        preferredCampaignTypes: ['단독 인스타 릴스', '유튜브 PPL', '브랜드 앰버서더', '기획 화보'],
        brandFitIndustries: [category, '라이프스타일', '글로벌 패션/뷰티'],
        responseRate,
        avgTurnaroundTime: turnaroundTime,
        liveCommerceAvailable: true,
        globalCampaignReady: true
      },
      contact: {
        email: contactEmail.trim() || `${handle.replace('@', '')}@inflare-creator.com`,
        agency: agencyName.trim() || 'INFLARE Creator Network',
        instagramUrl: instagramUrl.trim() || undefined,
        facebookUrl: facebookUrl.trim() || undefined
      },
      updatedAt: new Date().toISOString()
    };

    onSaveInfluencer(newOrUpdated);
    setSaveSuccessMsg(`인플루언서 [${newOrUpdated.koreanName}] 프로필이 저장되었습니다!`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      onClose();
    }, 1200);
  };

  // SAVE ARTICLE FORM SUBMIT
  const handleSaveArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      if (onRequireAdmin) {
        onRequireAdmin(
          () => {},
          '매거진 기사 최종 저장 및 발행은 인플레어 편집국 관리자 인증이 필요합니다.'
        );
      } else {
        alert('기사 작성 및 발행은 관리자만 가능합니다.');
      }
      return;
    }

    if (!articleTitle.trim()) {
      alert('기사 제목을 입력해주세요.');
      return;
    }
    if (!articleExcerpt.trim()) {
      alert('기사 리드문/요약(Excerpt)을 입력해주세요.');
      return;
    }

    const newOrUpdatedArticle: MagazineArticle = {
      id: articleId,
      title: articleTitle.trim(),
      subtitle: articleSubtitle.trim() || '2026 INFLARE 매거진 트렌드 심층 분석',
      category: articleCategory,
      readTime: articleReadTime.trim() || '5 min read',
      coverImage: articleCoverImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      author: articleAuthor.trim() || 'INFLARE 에디토리얼 팀',
      date: articleDate.trim() || new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      excerpt: articleExcerpt.trim(),
      contentBlocks,
      relatedInfluencerIds: articleRelatedInfluencerIds,
      tags: articleTagsText.split(',').map(t => t.trim()).filter(Boolean),
      views: initialArticle?.views || Math.floor(Math.random() * 20000 + 15000),
      likes: initialArticle?.likes || Math.floor(Math.random() * 1500 + 500)
    };

    onSaveArticle(newOrUpdatedArticle);
    setSaveSuccessMsg(`에디토리얼 기사 [${newOrUpdatedArticle.title.slice(0, 20)}...]가 발행되었습니다!`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0E121A] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
        
        {/* =========================================================================
            HEADER & TAB NAVIGATION
        ========================================================================= */}
        <div className="sticky top-0 z-30 flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-[#0E121A]/95 backdrop-blur-md border-b border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-black flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>INFLARE ENTITY & EDITORIAL STUDIO</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-normal">
                  콘텐츠 & 개체 편집기
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                인물/크리에이터 신규 추가, 고화질 화보 업로드, 그리고 매거진 에디토리얼 기사 작성
              </p>
            </div>
          </div>

          {/* Tab Switcher: Creator vs Article */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#161B26] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                id="btn-tab-creator-editor"
                onClick={() => setActiveTab('creator')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'creator'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>인물 / 크리에이터 등록</span>
              </button>

              <button
                type="button"
                id="btn-tab-article-editor"
                onClick={() => setActiveTab('article')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'article'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>기사 / 에디토리얼 작성</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onExportDatabaseJSON}
              className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-xl bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-xs font-semibold text-slate-300 transition-colors"
              title="데이터베이스 JSON 내보내기"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-400" />
              <span>JSON 백업</span>
            </button>

            <button
              id="btn-close-studio-modal"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin status notice banner */}
        {!isAdmin && (
          <div className="bg-amber-950/40 border-b border-amber-500/30 px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-amber-200">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>[구독자 열람 모드]</strong> 현재 기사 작성 및 프로필 저장을 위해선 인플레어 편집국 관리자 인증이 필요합니다.
              </span>
            </div>
            {onRequireAdmin && (
              <button
                type="button"
                onClick={() => onRequireAdmin(() => {}, '편집국 관리자로 로그인하시면 작성 및 수정 권한이 부여됩니다.')}
                className="self-start sm:self-auto px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>관리자 로그인</span>
              </button>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-1.5 flex items-center justify-between text-[11px] text-amber-300">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              인플레어 편집국 관리자 모드 활성 (기사 작성/수정/삭제 권한 부여됨)
            </span>
          </div>
        )}

        {/* Success Toast */}
        {saveSuccessMsg && (
          <div className="bg-emerald-500/90 text-black px-6 py-2.5 font-bold text-xs flex items-center justify-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* =========================================================================
            TAB 1: CREATOR / INFLUENCER ENTITY EDITOR
        ========================================================================= */}
        {activeTab === 'creator' && (
          <form onSubmit={handleSaveInfluencerSubmit} noValidate className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8 custom-scrollbar">
            {/* Quick Entity Selector / New Creator Switcher */}
            <div className="p-4 rounded-2xl bg-[#161B26] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold text-amber-400">편집 대상 선택:</span>
                <select
                  id="select-existing-influencer"
                  value={selectedInfluencerId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'new') {
                      loadInfluencerIntoForm(null);
                    } else {
                      const found = allInfluencers.find(i => i.id === val);
                      if (found) loadInfluencerIntoForm(found);
                    }
                  }}
                  className="bg-[#0B0D12] text-white border border-white/15 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="new">✨ + 새로운 인물 (신규 인플루언서 등록)</option>
                  {allInfluencers.map((inf) => (
                    <option key={inf.id} value={inf.id}>
                      #{inf.rank} {inf.koreanName} ({inf.handle}) - {inf.category}
                    </option>
                  ))}
                </select>

                {(() => {
                  const masterAEntity = allInfluencers.find(
                    (i) => i.id === 'inf-master-a' || i.name.toLowerCase().includes('master a') || i.koreanName.includes('Nguyen')
                  );
                  if (!masterAEntity) return null;
                  return (
                    <button
                      type="button"
                      onClick={() => loadInfluencerIntoForm(masterAEntity)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                        selectedInfluencerId === masterAEntity.id
                          ? 'bg-amber-400 text-black shadow-amber-500/30 ring-2 ring-amber-300'
                          : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500 hover:to-orange-500 text-amber-300 hover:text-black border border-amber-500/40'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>⚡ Master A (Nguyen Ngoc An) 선택</span>
                    </button>
                  );
                })()}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadInfluencerIntoForm(null)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>새 인물 폼 초기화</span>
                </button>

                {selectedInfluencerId !== 'new' && onDeleteInfluencer && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`정말 '${koreanName}' 인플루언서를 삭제하시겠습니까?`)) {
                        onDeleteInfluencer(infId);
                        loadInfluencerIntoForm(null);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>삭제</span>
                  </button>
                )}
              </div>
            </div>

            {/* Section 1: Basic Identity */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>1. 기본 인적 사항 및 랭킹 정보</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    한국어 활동명 <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="input-creator-koreanName"
                    type="text"
                    required
                    placeholder="예: 민소라, 박준혁"
                    value={koreanName}
                    onChange={(e) => setKoreanName(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    영문 이름
                  </label>
                  <input
                    id="input-creator-name"
                    type="text"
                    placeholder="예: Sora Min"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    SNS 핸들 / 아이디 <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="input-creator-handle"
                    type="text"
                    required
                    placeholder="예: @soramin_style"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    활동 카테고리
                  </label>
                  <select
                    id="select-creator-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CreatorCategory)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Fashion & Style">Fashion & Style (패션)</option>
                    <option value="Beauty & Skincare">Beauty & Skincare (뷰티)</option>
                    <option value="Tech & Gadget">Tech & Gadget (테크)</option>
                    <option value="Lifestyle & Vlog">Lifestyle & Vlog (라이프스타일)</option>
                    <option value="Fitness & Health">Fitness & Health (피트니스)</option>
                    <option value="Food & Mukbang">Food & Mukbang (푸드)</option>
                    <option value="Travel & Adventure">Travel & Adventure (여행)</option>
                    <option value="Gaming & Anime">Gaming & Anime (게임)</option>
                    <option value="Culture & Art">Culture & Art (문화예술)</option>
                  </select>
                </div>
              </div>

              {/* Ranks and Quotes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    HOT 100 현재 순위 (Rank)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={rank}
                    onChange={(e) => setRank(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    전주 순위 (0이면 NEW 표기)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={previousRank}
                    onChange={(e) => setPreviousRank(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    시그니처 한 줄 명언 (Quote)
                  </label>
                  <input
                    type="text"
                    placeholder="“패션은 나를 둘러싼 공기의 온도를 바꾸는 일입니다.”"
                    value={oneLinerQuote}
                    onChange={(e) => setOneLinerQuote(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-amber-200 italic focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  인물 소개 및 프로필 바이오 (Bio)
                </label>
                <textarea
                  rows={2}
                  placeholder="인플루언서의 주요 활동, 매력 포인트, 대표 프로젝트를 설명하세요."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-[#161B26] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  배지 및 수식어 (쉼표로 구분)
                </label>
                <input
                  type="text"
                  placeholder="HOT 100, 이달의 커버 스타, 하이엔드 앰버서더"
                  value={badgesText}
                  onChange={(e) => setBadgesText(e.target.value)}
                  className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Social Channels & Contact Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3.5 bg-[#0D1118] rounded-2xl border border-white/5">
                <div>
                  <label className="block text-xs font-medium text-pink-400 mb-1">
                    인스타그램 주소 (Instagram URL)
                  </label>
                  <input
                    type="text"
                    placeholder="https://instagram.com/아이디"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full bg-[#161B26] border border-pink-500/20 rounded-xl px-3 py-2 text-xs text-pink-200 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-blue-400 mb-1">
                    페이스북 주소 (Facebook URL)
                  </label>
                  <input
                    type="text"
                    placeholder="https://facebook.com/아이디"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="w-full bg-[#161B26] border border-blue-500/20 rounded-xl px-3 py-2 text-xs text-blue-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    비즈니스 문의 이메일
                  </label>
                  <input
                    type="email"
                    placeholder="contact@agency.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    소속 에이전시 / MCN
                  </label>
                  <input
                    type="text"
                    placeholder="INFLARE Creator Network"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Advanced Photo & Gallery Management */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>2. 고화질 사진 & 화보 갤러리 업로드</span>
                </h3>
                <span className="text-xs text-slate-400">
                  직접 파일 업로드 (PC/모바일) • 웹 이미지 URL • 고화질 매거진 프리셋
                </span>
              </div>

              {/* Upload Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1) Profile Avatar & Cover */}
                <div className="space-y-4 p-4 rounded-2xl bg-[#161B26] border border-white/10">
                  <div className="font-bold text-xs text-slate-300 flex items-center justify-between">
                    <span>대표 프로필 / 아바타 사진</span>
                    <button
                      type="button"
                      onClick={() => avatarFileRef.current?.click()}
                      className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" /> 파일 업로드
                    </button>
                    <input
                      ref={avatarFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setAvatar)}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-black shrink-0">
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <label className="text-[11px] text-slate-400 block">이미지 URL 직접 입력</label>
                      <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        placeholder="파일 경로 또는 https://..."
                        className="w-full bg-[#0B0D12] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <div className="font-bold text-xs text-slate-300 flex items-center justify-between mb-2">
                      <span>배경 커버 화보</span>
                      <button
                        type="button"
                        onClick={() => coverFileRef.current?.click()}
                        className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" /> 파일 업로드
                      </button>
                      <input
                        ref={coverFileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, setCoverImage)}
                      />
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                      <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* 2) Gallery Multiple Photos Manager & 5-Slot Pictorial Engine */}
                <div className="space-y-5 p-5 rounded-2xl bg-[#161B26] border border-white/10 lg:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-amber-400" />
                        <h4 className="font-bold text-sm text-white">
                          매거진 룩북 & 화보 5대 슬롯 매니저 ({galleryImages.length}장 등록됨)
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                          {galleryImages.length >= 4 ? '4대 화보 슬롯 완비' : '최소 4슬롯 권장'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        각 화보 슬롯(메인 커버, Lookbook Sub-Angle, Detail & Mood, 화보 B-Cut, 클로즈업 컷)을 개별 파일/URL로 즉시 교체할 수 있습니다.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => galleryMultiFileRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>사진 다중 파일 업로드</span>
                      </button>
                      <input
                        ref={galleryMultiFileRef}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleGalleryMultipleUpload}
                      />

                      {galleryImages.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('모든 화보 사진을 비우시겠습니까?')) {
                              setGalleryImages([]);
                            }
                          }}
                          className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          전체 비우기
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Master A Quick Optimization Banner */}
                  <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs text-amber-200 font-bold">
                          Master A (Nguyen Ngoc An) 화보 4대 슬롯 자동 최적화 배치
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Sub-Angle • Detail & Mood • B-Cut • 클로즈업 컷을 고화질 원본으로 일괄 배치합니다.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={applyMasterAPresets}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-black" />
                      <span>Master A 4대 슬롯 원클릭 세팅</span>
                    </button>
                  </div>

                  {/* 5-Slot Pictorial Visual Manager Grid */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300 px-1">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>화보 5대 슬롯 개별 교체 & 관리</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        각 슬롯의 파일 업로드 또는 URL로 즉시 교체됩니다
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {[
                        {
                          idx: 0,
                          slotTitle: 'SLOT #01: 메인 시그니처 커버',
                          slotSub: 'COVER CUT #01 (메인)',
                          role: '메인 히어로 컷',
                          masterA: '/images/MMG0176.jpg',
                          badgeColor: 'bg-amber-500 text-black'
                        },
                        {
                          idx: 1,
                          slotTitle: 'SLOT #02: Lookbook Sub-Angle',
                          slotSub: '룩북 서브 앵글 (Sub-Angle)',
                          role: '의상 실루엣 & 포즈',
                          masterA: '/images/mastera_lookbook_sub_angle.jpg',
                          badgeColor: 'bg-cyan-500 text-black'
                        },
                        {
                          idx: 2,
                          slotTitle: 'SLOT #03: Detail & Mood',
                          slotSub: '디테일 & 무드 컷 (Detail)',
                          role: '텍스처 & 무드 강조',
                          masterA: '/images/mastera_detail_mood.jpg',
                          badgeColor: 'bg-emerald-500 text-black'
                        },
                        {
                          idx: 3,
                          slotTitle: 'SLOT #04: 화보 B-Cut',
                          slotSub: '에디토리얼 B-Cut (B-Cut)',
                          role: '현장감 & 감각적 스틸',
                          masterA: '/images/mastera_b_cut.jpg',
                          badgeColor: 'bg-indigo-500 text-white'
                        },
                        {
                          idx: 4,
                          slotTitle: 'SLOT #05: 클로즈업 컷',
                          slotSub: '익스트림 클로즈업 (Close-up)',
                          role: '표정 & 시선 강조',
                          masterA: '/images/mastera_closeup.jpg',
                          badgeColor: 'bg-pink-500 text-white'
                        }
                      ].map((slot) => {
                        const currentSlotImg = galleryImages[slot.idx] || '';
                        const hasImg = Boolean(currentSlotImg);

                        return (
                          <div
                            key={slot.idx}
                            className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                              hasImg
                                ? 'bg-[#0E121A] border-amber-500/30 shadow-md'
                                : 'bg-[#0B0D12] border-white/10 opacity-80'
                            }`}
                          >
                            <div className="space-y-2.5">
                              {/* Slot Title & Badge */}
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black ${slot.badgeColor}`}>
                                  {slot.slotSub}
                                </span>
                                {hasImg ? (
                                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                    <Check className="w-3 h-3" /> 배치 완료
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-500 font-medium">
                                    미등록 슬롯
                                  </span>
                                )}
                              </div>

                              <div className="text-xs font-bold text-white truncate">
                                {slot.slotTitle}
                              </div>

                              {/* Slot Image Canvas Preview */}
                              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black border border-white/10 group">
                                {hasImg ? (
                                  <>
                                    <img
                                      src={currentSlotImg}
                                      alt={slot.slotTitle}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                      <span className="text-[10px] text-amber-300 font-semibold truncate">
                                        {slot.role}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() => setAvatar(currentSlotImg)}
                                          className="flex-1 py-1 rounded bg-amber-500 text-black text-[9px] font-bold"
                                        >
                                          프로필로
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleSlotClear(slot.idx)}
                                          className="p-1 rounded bg-rose-500 text-white text-[9px] font-bold"
                                          title="슬롯 비우기"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-slate-600 space-y-1">
                                    <Camera className="w-6 h-6 text-slate-600" />
                                    <span className="text-[10px] font-medium">사진을 업로드하거나 URL을 입력하세요</span>
                                  </div>
                                )}
                              </div>

                              {/* Direct File Upload for this slot */}
                              <div className="flex items-center gap-1.5">
                                <label className="flex-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold text-center cursor-pointer transition-colors flex items-center justify-center gap-1">
                                  <Upload className="w-3 h-3" />
                                  <span>{hasImg ? '슬롯 사진 교체' : '슬롯 사진 업로드'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const f = e.target.files?.[0];
                                      if (f) handleSlotUpload(slot.idx, f);
                                      e.target.value = '';
                                    }}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() => handleSlotUrlChange(slot.idx, slot.masterA)}
                                  className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 text-[10px] font-medium transition-colors"
                                  title="Master A 고화질 추천 컷 적용"
                                >
                                  Master A컷
                                </button>
                              </div>

                              {/* Slot Image URL direct input */}
                              <input
                                type="text"
                                placeholder="이미지 파일 경로 또는 웹 URL..."
                                value={currentSlotImg}
                                onChange={(e) => handleSlotUrlChange(slot.idx, e.target.value)}
                                className="w-full bg-[#0B0D12] border border-white/10 rounded-lg px-2.5 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Drag & Drop Upload Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingGallery(true);
                    }}
                    onDragLeave={() => setIsDraggingGallery(false)}
                    onDrop={handleGalleryDrop}
                    onClick={() => galleryMultiFileRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      isDraggingGallery
                        ? 'border-amber-400 bg-amber-500/10'
                        : 'border-white/15 bg-[#0B0D12]/60 hover:border-amber-500/40 hover:bg-[#0B0D12]'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 text-slate-300 text-xs font-semibold">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>여기로 사진 파일(JPG/PNG/WEBP)을 드래그 앤 드롭하거나 클릭하여 추가</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      다중 선택 가능 • 고화질 화보 컷을 계속 추가 및 누적할 수 있습니다.
                    </p>
                  </div>

                  {/* Pictorial Concept & Credits Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0B0D12] p-3.5 rounded-xl border border-white/5">
                    <div>
                      <label className="block text-[11px] font-bold text-amber-300 mb-1">
                        화보 컨셉 (PICTORIAL CONCEPT)
                      </label>
                      <input
                        type="text"
                        value={pictorialConcept}
                        onChange={(e) => setPictorialConcept(e.target.value)}
                        placeholder="예: 2026 Spring Exclusive Fashion Lookbook"
                        className="w-full bg-[#161B26] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-amber-300 mb-1">
                        화보 촬영 크레딧 (CREDITS)
                      </label>
                      <input
                        type="text"
                        value={pictorialCredits}
                        onChange={(e) => setPictorialCredits(e.target.value)}
                        placeholder="예: Photographer: Studio Inflare | Stylist: Fashion Team"
                        className="w-full bg-[#161B26] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Add URL Row */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="추가할 화보 이미지 파일 경로 또는 웹 URL..."
                      value={customImageUrlInput}
                      onChange={(e) => setCustomImageUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddImageUrlToGallery();
                        }
                      }}
                      className="flex-1 bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrlToGallery}
                      className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors cursor-pointer"
                    >
                      + URL 사진 추가
                    </button>
                  </div>

                  {/* Gallery Thumbnails List with Reorder Controls */}
                  {galleryImages.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
                        <span>화보 컷 순서 (1번: 메인 히어로 컷, 2~6번: 서브 컷)</span>
                        <span>총 {galleryImages.length}장</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-72 overflow-y-auto p-1 custom-scrollbar">
                        {galleryImages.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className={`group relative rounded-xl overflow-hidden border bg-black transition-all ${
                              idx === 0
                                ? 'border-amber-500 shadow-md shadow-amber-500/20'
                                : 'border-white/10 hover:border-amber-500/40'
                            }`}
                          >
                            <div className="aspect-[3/4] relative">
                              <img
                                src={imgUrl}
                                alt={`Gallery ${idx}`}
                                className="w-full h-full object-cover"
                              />

                              {/* Cut number badge */}
                              <div
                                className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-black ${
                                  idx === 0
                                    ? 'bg-amber-500 text-black'
                                    : 'bg-black/70 text-slate-300 border border-white/10'
                                }`}
                              >
                                {idx === 0 ? 'HERO #01' : `#0${idx + 1}`}
                              </div>

                              {avatar === imgUrl && (
                                <span className="absolute top-1.5 right-1.5 bg-cyan-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  프로필
                                </span>
                              )}
                            </div>

                            {/* Action Overlay */}
                            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                              {/* Reorder Buttons */}
                              <div className="flex items-center justify-between gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => moveGalleryImage(idx, 'left')}
                                  className={`p-1 rounded text-[10px] font-bold ${
                                    idx === 0
                                      ? 'text-slate-600 bg-white/5 cursor-not-allowed'
                                      : 'text-white bg-white/20 hover:bg-amber-500 hover:text-black cursor-pointer'
                                  }`}
                                  title="앞으로 이동"
                                >
                                  ◀ 앞
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === galleryImages.length - 1}
                                  onClick={() => moveGalleryImage(idx, 'right')}
                                  className={`p-1 rounded text-[10px] font-bold ${
                                    idx === galleryImages.length - 1
                                      ? 'text-slate-600 bg-white/5 cursor-not-allowed'
                                      : 'text-white bg-white/20 hover:bg-amber-500 hover:text-black cursor-pointer'
                                  }`}
                                  title="뒤로 이동"
                                >
                                  뒤 ▶
                                </button>
                              </div>

                              {/* Settings buttons */}
                              <div className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => setAvatar(imgUrl)}
                                  className="w-full py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-[9px] font-bold cursor-pointer"
                                >
                                  대표 프로필 지정
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setCoverImage(imgUrl)}
                                  className="w-full py-0.5 rounded bg-white/20 hover:bg-white/30 text-white text-[9px] font-bold cursor-pointer"
                                >
                                  커버 배경 지정
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setGalleryImages(galleryImages.filter((_, i) => i !== idx))
                                  }
                                  className="w-full py-0.5 rounded bg-rose-500/80 hover:bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Trash2 className="w-2.5 h-2.5" />
                                  삭제
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-xs bg-[#0B0D12] rounded-xl border border-white/5">
                      등록된 화보 사진이 없습니다. 상단 슬롯 또는 다중 파일 업로드로 사진을 등록하세요.
                    </div>
                  )}

                  {/* 1-Click Magazine Presets */}
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 block mb-2">
                      💡 원클릭 고화질 매거진 화보 프리셋 선택 (클릭 시 화보 목록에 추가):
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                      {MAGAZINE_IMAGE_PRESETS.slice(0, 10).map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleAddPresetToGallery(preset.url)}
                          className="shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0B0D12] hover:bg-[#1f2636] border border-white/10 text-slate-300 text-xs transition-colors cursor-pointer"
                        >
                          <img src={preset.url} alt="" className="w-5 h-5 rounded object-cover" />
                          <span className="text-[11px]">{preset.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Metrics & Index Scoring */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>3. 팔로워 수치 & HOT 100 인덱스 데이터</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    총 팔로워 수 (Total Followers)
                  </label>
                  <input
                    type="number"
                    value={followersTotal}
                    onChange={(e) => setFollowersTotal(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    참여율 (Engagement Rate %)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={engagementRate}
                    onChange={(e) => setEngagementRate(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    HOT 100 인덱스 점수 (0~100)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    월간 성장률 (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={growthRateMonthly}
                    onChange={(e) => setGrowthRateMonthly(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Exclusive Interview & Q&A Builder */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>4. 매거진 독점 심층 인터뷰 & Q&A 기사 에디터</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddInterviewSection}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Q&A 질문/답변 블록 추가</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    인터뷰 메인 헤드라인
                  </label>
                  <input
                    type="text"
                    value={interviewHeadline}
                    onChange={(e) => setInterviewHeadline(e.target.value)}
                    placeholder="THE NEW WAVE: 시대를 움직이는 크리에이터"
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    인터뷰 서브타이틀
                  </label>
                  <input
                    type="text"
                    value={interviewSubtitle}
                    onChange={(e) => setInterviewSubtitle(e.target.value)}
                    placeholder="진정성 있는 콘텐츠와 팬덤의 비결"
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-amber-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  인터뷰 도입부 리드 단락 (Lead Paragraph)
                </label>
                <textarea
                  rows={2}
                  value={interviewLead}
                  onChange={(e) => setInterviewLead(e.target.value)}
                  className="w-full bg-[#161B26] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Dynamic Q&A Sections */}
              <div className="space-y-4">
                {interviewSections.map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#161B26] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">인터뷰 질문 #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInterviewSection(idx)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                        title="질문 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={sec.question}
                      onChange={(e) => handleUpdateInterviewSection(idx, 'question', e.target.value)}
                      placeholder="Q. 질문을 입력하세요..."
                      className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    />

                    <textarea
                      rows={3}
                      value={sec.answer}
                      onChange={(e) => handleUpdateInterviewSection(idx, 'answer', e.target.value)}
                      placeholder="답변 내용을 상세히 작성하세요..."
                      className="w-full bg-[#0B0D12] border border-white/10 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                    />

                    <input
                      type="text"
                      value={sec.highlightQuote || ''}
                      onChange={(e) => handleUpdateInterviewSection(idx, 'highlightQuote', e.target.value)}
                      placeholder="“강조할 핵심 인용구 (Highlight Quote)”"
                      className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-amber-300 italic focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ))}
              </div>

              {/* Extra Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    비하인드 씬 스토리
                  </label>
                  <input
                    type="text"
                    value={behindTheScenes}
                    onChange={(e) => setBehindTheScenes(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    선호 브랜드 (쉼표 구분)
                  </label>
                  <input
                    type="text"
                    value={favoriteBrandsText}
                    onChange={(e) => setFavoriteBrandsText(e.target.value)}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Brand Matching & Commercial Info */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>5. 광고주 스마트 매칭 & 단가 정보</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    포스트당 예상 단가 (표기용)
                  </label>
                  <input
                    type="text"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                    placeholder="₩4,000,000 ~ ₩7,000,000"
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    최소 집행 예산 (원 단위)
                  </label>
                  <input
                    type="number"
                    step="500000"
                    value={minBudgetKRW}
                    onChange={(e) => setMinBudgetKRW(Number(e.target.value))}
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    평균 제작/턴어라운드 기간
                  </label>
                  <input
                    type="text"
                    value={turnaroundTime}
                    onChange={(e) => setTurnaroundTime(e.target.value)}
                    placeholder="3~5일"
                    className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="sticky bottom-0 z-20 flex items-center justify-between p-4 -mx-6 -mb-8 bg-[#0E121A]/95 backdrop-blur-md border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-bold transition-colors"
              >
                취소
              </button>

              <button
                id="btn-save-creator-submit"
                type="submit"
                className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>인플루언서 프로필 & 화보 저장하기</span>
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 2: MAGAZINE ARTICLE & EDITORIAL WRITER
        ========================================================================= */}
        {activeTab === 'article' && (
          <form onSubmit={handleSaveArticleSubmit} noValidate className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8 custom-scrollbar">
            {/* Quick Article Selector & New Switcher */}
            <div className="p-4 rounded-2xl bg-[#161B26] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-400">기사 선택 / 편집:</span>
                <select
                  id="select-existing-article"
                  value={selectedArticleId}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === 'new') {
                      loadArticleIntoForm(null);
                    } else {
                      const found = allArticles.find(a => a.id === val);
                      if (found) loadArticleIntoForm(found);
                    }
                  }}
                  className="bg-[#0B0D12] text-white border border-white/15 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-amber-500 cursor-pointer max-w-md truncate"
                >
                  <option value="new">✨ + 새로운 매거진 기사 작성하기</option>
                  {allArticles.map((art) => (
                    <option key={art.id} value={art.id}>
                      [{art.category}] {art.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticlePreviewMode(!isArticlePreviewMode)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isArticlePreviewMode 
                      ? 'bg-amber-500 text-black border-amber-500' 
                      : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/15'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isArticlePreviewMode ? '편집기 폼 보기' : '실시간 잡지 미리보기'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => loadArticleIntoForm(null)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>새 기사 작성</span>
                </button>

                {selectedArticleId !== 'new' && onDeleteArticle && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`정말 '${articleTitle}' 기사를 삭제하시겠습니까?`)) {
                        onDeleteArticle(articleId);
                        loadArticleIntoForm(null);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>삭제</span>
                  </button>
                )}
              </div>
            </div>

            {/* If Preview Mode is ON */}
            {isArticlePreviewMode ? (
              <div className="bg-[#121620] border border-amber-500/30 rounded-3xl p-6 sm:p-10 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black">
                    {articleCategory}
                  </span>
                  <span className="text-xs text-slate-400">{articleDate} • {articleReadTime}</span>
                  <span className="text-xs text-slate-400">• {articleAuthor}</span>
                </div>

                <div className="space-y-3">
                  <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    {articleTitle || '기사 제목이 이곳에 표시됩니다.'}
                  </h1>
                  {articleSubtitle && (
                    <p className="text-base text-amber-200/90 font-medium">
                      {articleSubtitle}
                    </p>
                  )}
                  <p className="text-sm text-slate-300 leading-relaxed bg-[#0B0D12] p-4 rounded-xl border border-white/5 italic">
                    {articleExcerpt || '기사 리드문 및 핵심 요약 내용이 표시됩니다.'}
                  </p>
                </div>

                {articleCoverImage && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
                    <img src={articleCoverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Blocks Preview */}
                <div className="space-y-5 text-slate-200 leading-relaxed text-sm">
                  {contentBlocks.map((b, idx) => {
                    if (b.type === 'heading') {
                      return <h2 key={idx} className="font-editorial text-xl font-bold text-white pt-4">{b.text}</h2>;
                    }
                    if (b.type === 'quote') {
                      return (
                        <div key={idx} className="p-5 bg-amber-950/30 border-l-4 border-amber-400 rounded-r-2xl my-4 text-amber-200 italic font-medium">
                          {b.text}
                          {b.author && <div className="text-xs text-slate-400 not-italic mt-2">— {b.author}</div>}
                        </div>
                      );
                    }
                    if (b.type === 'image') {
                      return (
                        <div key={idx} className="space-y-2 my-6">
                          <div className="rounded-2xl overflow-hidden border border-white/10 max-h-96">
                            <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                          {b.caption && <p className="text-xs text-center text-slate-400 italic">{b.caption}</p>}
                        </div>
                      );
                    }
                    return <p key={idx} className="leading-relaxed">{b.text}</p>;
                  })}
                </div>

                {/* Related Creators Tagged */}
                {articleRelatedInfluencerIds.length > 0 && (
                  <div className="pt-6 border-t border-white/10">
                    <span className="text-xs font-bold text-amber-400 block mb-3">연계된 인플루언서:</span>
                    <div className="flex flex-wrap gap-2">
                      {articleRelatedInfluencerIds.map(id => {
                        const inf = allInfluencers.find(i => i.id === id);
                        return inf ? (
                          <div key={id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161B26] border border-white/10 text-xs">
                            <img src={inf.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-white font-bold">{inf.koreanName}</span>
                            <span className="text-amber-400">{inf.handle}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Article Info Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>1. 기사 기본 메타데이터</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        기사 제목 (Headline) <span className="text-amber-400">*</span>
                      </label>
                      <input
                        id="input-article-title"
                        type="text"
                        required
                        placeholder="예: 2026 K-인플루언서 이코노미 리포트: 숏폼과 AI의 결합"
                        value={articleTitle}
                        onChange={(e) => setArticleTitle(e.target.value)}
                        className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        기사 카테고리
                      </label>
                      <select
                        id="select-article-category"
                        value={articleCategory}
                        onChange={(e) => setArticleCategory(e.target.value)}
                        className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="INDUSTRY INSIGHT">INDUSTRY INSIGHT (산업 분석)</option>
                        <option value="EXCLUSIVE INTERVIEW">EXCLUSIVE INTERVIEW (독점 인터뷰)</option>
                        <option value="RISING STARS">RISING STARS (라이징 스타)</option>
                        <option value="TREND REPORT">TREND REPORT (트렌드 리포트)</option>
                        <option value="FASHION EDITORIAL">FASHION EDITORIAL (패션 화보)</option>
                        <option value="BRAND COLLABORATION">BRAND COLLABORATION (브랜드 협업)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        기사 부제목 (Subtitle)
                      </label>
                      <input
                        type="text"
                        placeholder="조회수 중심에서 실질 구매 전환으로 이동하는 마케팅 패러다임"
                        value={articleSubtitle}
                        onChange={(e) => setArticleSubtitle(e.target.value)}
                        className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-amber-200 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        예상 읽기 시간
                      </label>
                      <input
                        type="text"
                        placeholder="5 min read"
                        value={articleReadTime}
                        onChange={(e) => setArticleReadTime(e.target.value)}
                        className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        작성자 / 에디터 (Author)
                      </label>
                      <input
                        type="text"
                        value={articleAuthor}
                        onChange={(e) => setArticleAuthor(e.target.value)}
                        className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        발행 일자 (Date)
                      </label>
                      <input
                        type="text"
                        value={articleDate}
                        onChange={(e) => setArticleDate(e.target.value)}
                        className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      기사 요약문 및 리드 (Excerpt) <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="독자의 시선을 사로잡는 핵심 요약 문장을 작성하세요."
                      value={articleExcerpt}
                      onChange={(e) => setArticleExcerpt(e.target.value)}
                      className="w-full bg-[#161B26] border border-white/10 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      태그 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      placeholder="인플루언서 마케팅, ROI 지표, 2026 트렌드"
                      value={articleTagsText}
                      onChange={(e) => setArticleTagsText(e.target.value)}
                      className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Article Cover Image Section */}
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>2. 기사 대표 커버 화보 이미지</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => articleCoverFileRef.current?.click()}
                      className="text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" /> 커버 사진 파일 업로드
                    </button>
                    <input
                      ref={articleCoverFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setArticleCoverImage)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                      <img src={articleCoverImage} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">커버 이미지 파일 경로 또는 웹 URL</label>
                        <input
                          type="text"
                          value={articleCoverImage}
                          onChange={(e) => setArticleCoverImage(e.target.value)}
                          placeholder="파일 경로 또는 https://..."
                          className="w-full bg-[#161B26] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Presets */}
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1">추천 매거진 커버 프리셋:</span>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                          {MAGAZINE_IMAGE_PRESETS.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setArticleCoverImage(p.url)}
                              className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-[11px] text-slate-300"
                            >
                              <img src={p.url} alt="" className="w-4 h-4 rounded object-cover" />
                              <span>{p.tag}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Influencers Linking */}
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>3. 기사에 언급된 관련 인플루언서 연결</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    기사 본문 하단에 프로필 바로가기 카드가 노출되어 독자가 인플루언서 상세 정보로 이동할 수 있습니다.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1 custom-scrollbar">
                    {allInfluencers.map((inf) => {
                      const isChecked = articleRelatedInfluencerIds.includes(inf.id);
                      return (
                        <div
                          key={inf.id}
                          onClick={() => handleToggleRelatedInfluencer(inf.id)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-amber-500/15 border-amber-500 text-white'
                              : 'bg-[#161B26] border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <img src={inf.avatar} alt="" className="w-7 h-7 rounded-lg object-cover shrink-0" />
                          <div className="truncate">
                            <div className="text-xs font-bold truncate text-white">{inf.koreanName}</div>
                            <div className="text-[10px] text-slate-400 truncate">{inf.handle}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Dynamic Article Content Blocks */}
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        <span>4. 본문 단락 & 인용구 & 삽입 이미지 빌더</span>
                      </h3>
                      <p className="text-xs text-slate-400">원하는 형식의 블록을 추가하여 풍부한 매거진 아티클을 구성하세요.</p>
                    </div>

                    <div className="flex items-center flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('paragraph')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-xs text-slate-200 font-semibold flex items-center gap-1"
                      >
                        <AlignLeft className="w-3.5 h-3.5 text-amber-400" /> + 본문 단락
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('heading')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-xs text-slate-200 font-semibold flex items-center gap-1"
                      >
                        <Type className="w-3.5 h-3.5 text-amber-400" /> + 소제목
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('quote')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-xs text-slate-200 font-semibold flex items-center gap-1"
                      >
                        <Quote className="w-3.5 h-3.5 text-amber-400" /> + 인용구
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('image')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#161B26] hover:bg-[#1f2636] border border-white/10 text-xs text-slate-200 font-semibold flex items-center gap-1"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> + 본문 이미지
                      </button>
                    </div>
                  </div>

                  {/* Render Editable Blocks */}
                  <div className="space-y-4">
                    {contentBlocks.map((block, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#161B26] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-400">
                            블록 #{idx + 1} - {
                              block.type === 'paragraph' ? '📝 본문 단락 (Paragraph)' :
                              block.type === 'heading' ? '📌 소제목 (Heading)' :
                              block.type === 'quote' ? '💬 인용구 (Quote)' : '🖼️ 본문 이미지 (Image)'
                            }
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveContentBlock(idx, 'up')}
                              disabled={idx === 0}
                              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs disabled:opacity-30"
                              title="위로 이동"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveContentBlock(idx, 'down')}
                              disabled={idx === contentBlocks.length - 1}
                              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs disabled:opacity-30"
                              title="아래로 이동"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveContentBlock(idx)}
                              className="p-1 rounded text-slate-400 hover:text-rose-400 ml-1"
                              title="블록 삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {block.type === 'paragraph' && (
                          <textarea
                            rows={3}
                            value={block.text || ''}
                            onChange={(e) => handleUpdateContentBlock(idx, { text: e.target.value })}
                            placeholder="본문 내용을 입력하세요..."
                            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                          />
                        )}

                        {block.type === 'heading' && (
                          <input
                            type="text"
                            value={block.text || ''}
                            onChange={(e) => handleUpdateContentBlock(idx, { text: e.target.value })}
                            placeholder="소제목을 입력하세요..."
                            className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-amber-500"
                          />
                        )}

                        {block.type === 'quote' && (
                          <div className="space-y-2">
                            <textarea
                              rows={2}
                              value={block.text || ''}
                              onChange={(e) => handleUpdateContentBlock(idx, { text: e.target.value })}
                              placeholder="인용구 명언을 입력하세요..."
                              className="w-full bg-[#0B0D12] border border-white/10 rounded-xl p-2.5 text-xs text-amber-200 italic focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              value={block.author || ''}
                              onChange={(e) => handleUpdateContentBlock(idx, { author: e.target.value })}
                              placeholder="발화자/인물명 (예: 민소라 크리에이터)"
                              className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-400 focus:outline-none focus:border-amber-500"
                            />
                          </div>
                        )}

                        {block.type === 'image' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                              <img src={block.imageUrl || ''} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                              <input
                                type="text"
                                value={block.imageUrl || ''}
                                onChange={(e) => handleUpdateContentBlock(idx, { imageUrl: e.target.value })}
                                placeholder="본문 삽입 이미지 파일 경로 또는 URL..."
                                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                              />
                              <input
                                type="text"
                                value={block.caption || ''}
                                onChange={(e) => handleUpdateContentBlock(idx, { caption: e.target.value })}
                                placeholder="이미지 캡션 / 사진 설명..."
                                className="w-full bg-[#0B0D12] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-400 focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Form Actions */}
                <div className="sticky bottom-0 z-20 flex items-center justify-between p-4 -mx-6 -mb-8 bg-[#0E121A]/95 backdrop-blur-md border-t border-white/10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-bold transition-colors"
                  >
                    취소
                  </button>

                  <button
                    id="btn-save-article-submit"
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>매거진 기사 최종 저장 & 발행</span>
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
