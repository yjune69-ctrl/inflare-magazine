import { Influencer, MagazineArticle } from '../types';

export const INITIAL_INFLUENCERS: Influencer[] = [
  {
    id: 'inf-master-a',
    rank: 1,
    previousRank: 0,
    name: 'Master A',
    koreanName: 'Nguyen Ngoc An',
    handle: '@mastera_11',
    category: 'Fashion & Style',
    avatar: '/images/MMG0176.jpg',
    coverImage: '/images/MMG0176.jpg',
    galleryImages: [
      '/images/MMG0176.jpg'
    ],
    pictorialConcept: '2026 S/S Master A Special Lookbook: Asian High Chic & Editorial Aura',
    pictorialCredits: 'Photo: Studio Alpha • Styling: Nguyen Ngoc An • Direction: INFLARE Lookbook Team',
    bio: '글로벌 아시안 패션 트렌드와 감각적인 비주얼을 이끄는 탑 인플루언서. 세련된 스트리트 하이엔드 룩북과 다채로운 비주얼 디렉팅으로 글로벌 팬덤을 사로잡고 있습니다.',
    oneLinerQuote: '“패션은 단순한 옷이 아닌 나의 아이덴티티와 에너지를 세상에 표현하는 예술입니다.”',
    metrics: {
      followersTotal: 2450000,
      instagramFollowers: 1450000,
      youtubeSubscribers: 580000,
      tiktokFollowers: 420000,
      engagementRate: 9.2,
      avgViews: 880000,
      avgLikes: 156000,
      score: 99.1,
      growthRateMonthly: 18.5
    },
    badges: ['HOT 100 1위', '이달의 룩북 커버 스타', '글로벌 스타일 아이콘', '인플레어 에디터스 픽'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 44, '25-34': 42, '35-44': 10, '45+': 4 },
      genderBreakdown: { female: 65, male: 35 },
      topRegions: ['대한민국 서울 (45%)', '베트남/호치민 (30%)', '도쿄/일본 (15%)', '기타 (10%)']
    },
    interview: {
      headline: 'MASTER A (NGUYEN NGOC AN): 시대를 사로잡은 독보적 비주얼 룩북의 정점',
      subtitle: '인스타그램 @mastera_11 & 페이스북 @youngalpha29을 넘나드는 글로벌 패션 아이콘의 진솔한 인터뷰',
      date: '2026.03 SPECIAL ISSUE COVER LOOKBOOK',
      editor: '에디터 김도연 (Chief Content Officer)',
      audioDuration: '13 min listening',
      leadParagraph: '카메라 렌즈 앞에서 강렬한 카리스마와 섬세한 감성을 오가는 Master A(Nguyen Ngoc An). 2026년 인플레어 매거진 독점 화보 & 룩북 컬렉션의 메인 커버 스타로 선정된 그와 나눈 스타일링 비하인드 스토리.',
      sections: [
        {
          question: 'Q1. 이번 2026 INFLARE 독점 화보 & 룩북의 메인 커버 스타로 참여하신 소감이 어떠신가요?',
          answer: '대한민국 최고의 크리에이터들과 함께하는 인플레어 화보 룩북에 단독 커버로 소개되어 정말 영광입니다. 준비한 사진들이 저만의 감성과 개성을 가득 담고 있어서 팬분들께 멋진 영감을 드릴 수 있으면 좋겠습니다.',
          highlightQuote: '“모든 컷마다 저만의 열정과 진정성을 담아내는 것이 제가 추구하는 룩북의 본질입니다.”',
          imageIndex: 0
        },
        {
          question: 'Q2. Master A라는 아티스트 네임과 Nguyen Ngoc An으로서의 비전은 무엇인가요?',
          answer: 'Master A는 제 패션 철학과 한계 없는 도전을 상징하며, Nguyen Ngoc An은 제 진솔한 본 모습을 대변합니다. 글로벌 팬들과 진심으로 교감하며 아시아를 대표하는 스타일 아이콘으로 자리매김하고 싶습니다.',
          highlightQuote: '“패션과 비주얼은 국경을 초월해 사람들의 마음을 연결하는 강력한 언어입니다.”',
          imageIndex: 1
        },
        {
          question: 'Q3. 인스타그램(@mastera_11)과 페이스북(@youngalpha29)으로 팬들과 활발히 소통하시는 비결은?',
          answer: '매일 실시간으로 제 스타일 팁과 비하인드 컷을 올리고, 팬분들의 댓글과 피드백에 귀 기울입니다. 가식 없는 솔직함과 꾸준함이 팬분들과 깊은 신뢰를 형성하는 원동력입니다.',
          highlightQuote: '“소통의 진정성이 가장 강력한 파급력을 만듭니다.”',
          imageIndex: 2
        },
        {
          question: 'Q4. 2026년 한국 및 글로벌 브랜드와의 계획은 어떻게 되나요?',
          answer: '다양한 하이엔드 패션 브랜드 및 뷰티 브랜드와의 글로벌 캠페인, 그리고 감각적인 룩북 프로젝트들이 연이어 예정되어 있습니다. 많은 기대 부탁드립니다.',
          imageIndex: 3
        }
      ],
      behindTheScenes: 'Master A는 촬영장에서 압도적인 프로페셔널함과 의상에 대한 깊은 이해도로 모든 스태프들을 매료시켰습니다. 직접 포즈와 조명의 각도를 섬세하게 체크하는 디테일이 인상적이었습니다.',
      favoriteBrands: ['Balenciaga', 'Gentle Monster', 'Acne Studios', 'Rick Owens', 'Maison Margiela'],
      upcomingProjects: '2026 글로벌 룩북 시리즈 & 한-베트남 패션위크 특별 앰버서더 프로젝트'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩7,000,000 ~ ₩11,000,000',
      minBudget: 7000000,
      preferredCampaignTypes: ['단독 인스타 릴스/피드 화보', '페이스북 바이럴 룩북', '글로벌 브랜드 앰버서더', '패션 매거진 기획 화보'],
      brandFitIndustries: ['하이엔드 패션/의류', '프리미엄 스트리트웨어', '뷰티 & 그루밍', '글로벌 럭셔리 라이프스타일'],
      responseRate: '99%',
      avgTurnaroundTime: '3~5일',
      liveCommerceAvailable: true,
      globalCampaignReady: true
    },
    contact: {
      email: 'contact@mastera-official.com',
      agency: 'Alpha Global Media',
      officialSite: 'https://instagram.com/mastera_11',
      instagramUrl: 'https://instagram.com/mastera_11',
      facebookUrl: 'https://facebook.com/youngalpha29'
    }
  },
  {
    id: 'inf-01',
    rank: 2,
    previousRank: 2,
    name: 'Sora Min',
    koreanName: '민소라',
    handle: '@soramin_style',
    category: 'Fashion & Style',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop'
    ],
    pictorialConcept: '2026 S/S Haute Couture & Parisian Chic Mood',
    pictorialCredits: 'Photo: Studio VOGUE KR • Styling: Sora Min • Direction: INFLARE Editorial',
    bio: '하이엔드 패션과 스트리트 무드를 결합한 독보적 비주얼 디렉터. 파리/밀라노 패션위크 공식 초청 인플루언서이자 감각적인 룩북 크리에이터.',
    oneLinerQuote: '“패션은 단순히 입는 것이 아닌, 나를 둘러싼 공기의 온도를 바꾸는 일입니다.”',
    metrics: {
      followersTotal: 2840000,
      instagramFollowers: 1920000,
      youtubeSubscribers: 680000,
      tiktokFollowers: 240000,
      engagementRate: 8.4,
      avgViews: 920000,
      avgLikes: 148000,
      score: 98.7,
      growthRateMonthly: 12.8
    },
    badges: ['HOT 100 1위', '이달의 커버 스타', '하이엔드 앰버서더', '글로벌 탑 패셔니스타'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 38, '25-34': 44, '35-44': 14, '45+': 4 },
      genderBreakdown: { female: 76, male: 24 },
      topRegions: ['대한민국 서울 (62%)', '도쿄/일본 (14%)', '뉴욕/미국 (12%)', '기타 (12%)']
    },
    interview: {
      headline: 'THE REIGN OF MIN SORA: 시대를 관통하는 스타일의 미학',
      subtitle: '서울에서 파리까지, 280만 팔로워를 매료시킨 감각적 비주얼 큐레이션의 비밀',
      date: '2026.03 ISSUE COVER STORY',
      editor: '에디터 김도연 (Chief Content Officer)',
      audioDuration: '14 min listening',
      leadParagraph: '화려한 런웨이의 백스테이지부터 일상의 편안한 앤티크 카페까지, 민소라가 렌즈 앞에 서는 순간 모든 피사체는 하나의 정교한 예술 작품으로 재탄생한다. 2026년 상반기 인플루언서 핫100 영예의 1위를 차지한 그녀와 함께 나눈 패션, 철학, 그리고 끝없는 영감의 여정.',
      sections: [
        {
          question: 'Q1. 이번 인플루언서 핫100 1위 등극을 축하드립니다. 소감이 어떠신가요?',
          answer: '처음 소식을 접했을 때 정말 벅찼습니다. 단순히 숫자가 늘어나는 것보다 제 감각과 룩북을 믿고 공감해주시는 분들이 이렇게 깊은 유대를 보여주셨다는 점에서 큰 책임감과 감사를 느낍니다. 올 한 해도 저만의 진정성 있는 색채를 잃지 않고 보여드리고 싶어요.',
          highlightQuote: '“숫자보다 중요한 건 제 취향에 진심으로 공감해주는 사람들과의 보이지 않는 신뢰입니다.”',
          imageIndex: 0
        },
        {
          question: 'Q2. 독보적인 패션 감각과 영상 톤앤매너는 어디서 영감을 얻나요?',
          answer: '저는 90년대 빈티지 아카이브 북과 건축 다큐멘터리에서 가장 많은 구조적 영감을 받습니다. 옷의 실루엣은 공간의 건축적 선과 닮아있거든요. 인스타그램 릴스를 편집할 때도 음악의 템포와 컷 전환 속도를 세밀하게 계산해 영화 같은 리듬감을 주려고 합니다.',
          highlightQuote: '“옷의 실루엣은 공간의 건축적 선과 닮아있습니다. 리듬이 있는 룩북을 만듭니다.”',
          imageIndex: 1
        },
        {
          question: 'Q3. 최근 글로벌 럭셔리 브랜드들과의 협업이 두드러지는데, 협업 시 가장 중요하게 생각하는 기준은 무엇인가요?',
          answer: '브랜드가 가진 고유한 헤리티지와 제 개인의 라이프스타일이 자연스럽게 교집합을 이루는가입니다. 억지로 만든 광고는 팬들이 1초 만에 알아채요. 제가 실제로 착용하고 사랑할 수 있는 제품일 때만 협업을 진행합니다.',
          highlightQuote: '“억지로 만든 광고는 1초 만에 들킵니다. 진심으로 사랑하는 브랜드만 소개합니다.”',
          imageIndex: 2
        },
        {
          question: 'Q4. 2026년 새롭게 도전하고 싶은 프로젝트가 있다면?',
          answer: '친환경 지속가능 소재를 기반으로 한 업사이클링 캡슐 컬렉션을 준비 중입니다. 패션 인플루언서로서 환경에 미치는 영향에 대해 오랜 시간 고민해왔고, 이를 구체적인 프로덕트로 팬들과 나누고 싶습니다.',
          imageIndex: 3
        }
      ],
      behindTheScenes: '촬영 현장에서 민소라는 준비해 온 3가지 무드의 플레이리스트를 직접 재생하며 촬영장의 분위기를 이끌었습니다. 모든 액세서리 배치를 에디터와 하나하나 상의하는 프로페셔널한 디테일이 인상적이었습니다.',
      favoriteBrands: ['Chanel', 'Maison Margiela', 'The Row', 'Acne Studios', 'Gentle Monster'],
      upcomingProjects: '2026 F/W 파리 패션위크 브이로그 & 친환경 캡슐 컬렉션 런칭'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩8,000,000 ~ ₩12,000,000',
      minBudget: 8000000,
      preferredCampaignTypes: ['단독 인스타 릴스/피드', '글로벌 브랜드 앰버서더', '패션위크 초청/행사 참석', '룩북 큐레이션'],
      brandFitIndustries: ['명품 패션/의류', '프리미엄 뷰티', '하이엔드 파인주얼리', '럭셔리 호텔/라이프스타일'],
      responseRate: '99%',
      avgTurnaroundTime: '4~7일',
      liveCommerceAvailable: false,
      globalCampaignReady: true
    },
    contact: {
      email: 'mgmt@soramin-official.com',
      agency: 'INFLARE Talent Group',
      officialSite: 'https://soramin.studio',
      instagramUrl: 'https://instagram.com'
    }
  },
  {
    id: 'inf-02',
    rank: 2,
    previousRank: 1,
    name: 'Jayden Park (테크파크)',
    koreanName: '박준혁',
    handle: '@techpark_official',
    category: 'Tech & Gadget',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop'
    ],
    pictorialConcept: 'Cyberpunk Futurism & Minimalist Tech Space',
    pictorialCredits: 'Photo: TechLab Studio • Gear: Sony FX3 & Leica SL2',
    bio: '초정밀 벤치마크와 알기 쉬운 테크 분해 리뷰. AI 하드웨어부터 차세대 스마트 디바이스까지 210만 구독자의 절대적 기술 신뢰를 받는 테크 크리에이터.',
    oneLinerQuote: '“복잡한 스펙 표 뒤에 숨겨진 실제 사용자 경험의 본질을 밝혀냅니다.”',
    metrics: {
      followersTotal: 2150000,
      instagramFollowers: 450000,
      youtubeSubscribers: 1700000,
      tiktokFollowers: 0,
      engagementRate: 9.2,
      avgViews: 1450000,
      avgLikes: 112000,
      score: 97.4,
      growthRateMonthly: 8.6
    },
    badges: ['HOT 100 2위', '테크 부문 1위', '광고주 신뢰도 1위', '초고화질 8K 벤치마크'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 32, '25-34': 48, '35-44': 16, '45+': 4 },
      genderBreakdown: { female: 18, male: 82 },
      topRegions: ['대한민국 (84%)', '미국 (8%)', '기타 (8%)']
    },
    interview: {
      headline: 'NEXT-GEN HARDWARE: 테크파크가 예측하는 2026 디바이스 혁명',
      subtitle: '170만 유튜브 구독자를 사로잡은 타협 없는 팩트 체크와 실험 정신',
      date: '2026.02 SPECIAL REPORT',
      editor: '테크 전문 에디터 이승원',
      audioDuration: '18 min listening',
      leadParagraph: '수천만 원 상당의 측정 장비로 가득 찬 그의 스튜디오. 박준혁은 그 어떤 대기업의 협찬에도 흔들리지 않는 날카로운 비판과 객관적인 데이터로 대한민국 최고의 테크 권위자로 우뚝 섰다.',
      sections: [
        {
          question: 'Q1. 테크 리뷰에서 가장 중요하게 지키는 원칙은 무엇인가요?',
          answer: '‘모든 수치는 재현 가능해야 한다’는 점입니다. 제 스튜디오는 항온 항습 챔버와 전력 측정기를 갖추고 있으며, 동일한 테스트를 최소 3회 이상 반복해 평균치를 산출합니다. 시청자가 제 영상을 보고 구매를 결정하기 때문입니다.',
          highlightQuote: '“모든 수치는 재현 가능해야 합니다. 시청자의 지갑을 지키는 것이 제 사명입니다.”',
          imageIndex: 0
        },
        {
          question: 'Q2. 2026년 가장 주목하고 있는 기술 트렌드는 무엇인가요?',
          answer: '온디바이스 AI(On-device AI) 하드웨어의 대중화와 스마트 글래스 폼팩터의 완성입니다. 스마트폰 화면을 벗어나 우리 시야에 자연스럽게 융합되는 공간 컴퓨팅 경험이 향후 3년 내 일상을 바꿀 것입니다.',
          highlightQuote: '“화면을 벗어나 시야에 융합되는 온디바이스 AI 글래스가 넥스트 빅씽입니다.”',
          imageIndex: 1
        }
      ],
      behindTheScenes: '인터뷰 당일에도 새로 출시된 AI 칩셋 랩톱의 열화상 카메라 측정을 진행 중이었으며, 새벽까지 편집을 직접 챙기는 열정을 보였습니다.',
      favoriteBrands: ['Apple', 'Samsung Electronics', 'Sony', 'Nvidia', 'Logitech'],
      upcomingProjects: '글로벌 테크 전시회 단독 취재 & 오프라인 테크 밋업'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩12,000,000 ~ ₩18,000,000',
      minBudget: 12000000,
      preferredCampaignTypes: ['유튜브 심층 기획 리뷰', '신제품 런칭 키노트 협업', '스펙 비교 벤치마크 콘텐츠'],
      brandFitIndustries: ['IT/가전/전자기기', '반도체/AI 소프트웨어', '자동차/모빌리티', '게이밍 기어'],
      responseRate: '95%',
      avgTurnaroundTime: '7~14일',
      liveCommerceAvailable: false,
      globalCampaignReady: true
    },
    contact: {
      email: 'business@techpark.kr',
      agency: '인플레어 테크 MCN',
      officialSite: 'https://youtube.com',
      youtubeUrl: 'https://youtube.com'
    }
  },
  {
    id: 'inf-03',
    rank: 3,
    previousRank: 5,
    name: 'Chloe Han (클로이뷰티)',
    koreanName: '한채은',
    handle: '@chloe_glowup',
    category: 'Beauty & Skincare',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337094346-290f26a0b58a?q=80&w=1200&auto=format&fit=crop'
    ],
    pictorialConcept: 'Pure Clean Glow & Natural Sunlight Aesthetics',
    pictorialCredits: 'Photo: Glow Atelier • Hair/Makeup: Jin Salon',
    bio: 'K-뷰티의 글로벌 전도사이자 성분 분석 기반 웰에이징 뷰티 크리에이터. 무보정 피부 클로즈업과 릴스 뷰티 팁으로 전 세계 190만 뷰티 러버를 사로잡음.',
    oneLinerQuote: '“화장품은 결점을 감추는 가면이 아니라, 본연의 빛을 돋보이게 하는 조명입니다.”',
    metrics: {
      followersTotal: 1950000,
      instagramFollowers: 1100000,
      youtubeSubscribers: 550000,
      tiktokFollowers: 300000,
      engagementRate: 11.4,
      avgViews: 850000,
      avgLikes: 125000,
      score: 96.8,
      growthRateMonthly: 15.3
    },
    badges: ['HOT 100 3위', '뷰티 부문 1위', '올리브영 품절 대란', '글로벌 K-Beauty 상'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 45, '25-34': 42, '35-44': 10, '45+': 3 },
      genderBreakdown: { female: 89, male: 11 },
      topRegions: ['대한민국 (55%)', '미국 (18%)', '동남아시아 (15%)', '일본 (12%)']
    },
    interview: {
      headline: 'GLOW FROM WITHIN: 한채은의 피부 과학과 뷰티 철학',
      subtitle: '품절 대란 10회 연속 기록, 성분주의 뷰티 큐레이터가 말하는 진정한 아름다움',
      date: '2026.03 BEAUTY SPECIAL',
      editor: '뷰티 디렉터 서유진',
      audioDuration: '11 min listening',
      leadParagraph: '조명 없이도 눈부시게 빛나는 피부 결. 한채은은 화려한 메이크업 튜토리얼을 넘어 피부 장벽과 성분 메커니즘을 친절하고 명쾌하게 풀어내며 K-뷰티의 신뢰를 한 단계 끌어올렸다.',
      sections: [
        {
          question: 'Q1. 소개하는 뷰티 아이템마다 품절 대란을 일으키는 비결은 무엇인가요?',
          answer: '저는 광고 제안이 와도 반드시 최소 4주 이상 제 피부에 직접 임상 테스트를 진행합니다. 트러블이 나거나 효과가 미미하면 위약금을 물더라도 협업을 거절해요. 구독자분들이 그 오랜 진정성을 알아주셨기 때문이라고 생각합니다.',
          highlightQuote: '“4주 이상 직접 발라보고 검증되지 않은 화장품은 억만금을 줘도 소개하지 않습니다.”',
          imageIndex: 0
        },
        {
          question: 'Q2. 최근 해외 팬들의 유입이 급증했는데 비결이 있나요?',
          answer: '영어 자막과 함께 한국 전통 발효 성분(쌀겨, 누룩, 인삼 등)의 과학적 효능을 숏폼 비주얼로 직관적이게 전달한 릴스가 1,500만 조회수를 기록했습니다. K-뷰티의 힘을 실감하고 있어요.',
          imageIndex: 1
        }
      ],
      favoriteBrands: ['Sulwhasoo', 'Tamburins', 'Estee Lauder', 'Torriden', 'Rhode Skin'],
      upcomingProjects: '자체 스킨케어 브랜드 콜라보 앰플 런칭 & 글로벌 뷰티 밋업'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩6,500,000 ~ ₩9,500,000',
      minBudget: 6500000,
      preferredCampaignTypes: ['인스타 릴스 + 피드 패키지', '올리브영 기획전 프로모션', '라이브 커머스 쇼호스트'],
      brandFitIndustries: ['스킨케어/코스메틱', '이너뷰티/건강기능식품', '클린뷰티 & 비건 라이프'],
      responseRate: '98%',
      avgTurnaroundTime: '5~7일',
      liveCommerceAvailable: true,
      globalCampaignReady: true
    },
    contact: {
      email: 'collab@chloeglow.com',
      agency: 'INFLARE Beauty Lab',
      officialSite: 'https://chloeglow.com',
      instagramUrl: 'https://instagram.com'
    }
  },
  {
    id: 'inf-04',
    rank: 4,
    previousRank: 4,
    name: 'David Yoon (피트니스 윤)',
    koreanName: '윤태성',
    handle: '@yoon_fit_core',
    category: 'Fitness & Health',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop'
    ],
    pictorialConcept: 'Raw Power & Dynamic Athletic Sculpt',
    pictorialCredits: 'Photo: Strength Visuals • Gear: Canon EOS R5',
    bio: '재활 의학 기반의 스마트 피트니스와 건강한 라이프스타일 멘토. 무리한 다이어트 대신 지속 가능한 신체 밸런스를 전파하는 피트니스 리더.',
    oneLinerQuote: '“몸을 가꾸는 것은 자신에 대한 존중이자 매일 마주하는 가장 정직한 대화입니다.”',
    metrics: {
      followersTotal: 1680000,
      instagramFollowers: 720000,
      youtubeSubscribers: 960000,
      tiktokFollowers: 0,
      engagementRate: 7.9,
      avgViews: 680000,
      avgLikes: 84000,
      score: 95.2,
      growthRateMonthly: 9.4
    },
    badges: ['HOT 100 4위', '피트니스 부문 1위', '스포츠 앰버서더', '건강 멘토'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 25, '25-34': 52, '35-44': 18, '45+': 5 },
      genderBreakdown: { female: 48, male: 52 },
      topRegions: ['대한민국 (90%)', '기타 (10%)']
    },
    interview: {
      headline: 'BODY & MIND BALANCE: 윤태성이 제안하는 지속 가능한 에너지',
      subtitle: '하루 15분 스트레칭과 건강한 식단으로 바꾸는 일상의 기적',
      date: '2026.02 WELLNESS ISSUE',
      editor: '웰니스 에디터 강현우',
      audioDuration: '10 min listening',
      leadParagraph: '근육질의 몸매보다 더 빛나는 것은 그의 긍정적인 에너지와 과학적인 트레이닝 접근법이다. 직장인과 수험생을 위한 체형 교정 루틴으로 전국적인 사랑을 받고 있다.',
      sections: [
        {
          question: 'Q1. 피트니스 크리에이터로서 가장 중요하게 전달하고 싶은 메시지는?',
          answer: '남들의 시선에 맞춘 몸무게가 아니라, 내 관절과 척추가 편안하고 활력이 넘치는 상태가 진짜 건강이라는 점입니다. 작은 습관의 축적이 삶 전체의 퀄리티를 바꿉니다.',
          highlightQuote: '“남을 위한 몸이 아닌, 온전히 나 자신을 위한 에너지를 만드세요.”'
        }
      ],
      favoriteBrands: ['Nike', 'Lululemon', 'Under Armour', 'Myprotein'],
      upcomingProjects: '온라인 체형 교정 마스터클래스 런칭'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩5,000,000 ~ ₩8,000,000',
      minBudget: 5000000,
      preferredCampaignTypes: ['스포츠웨어 앰버서더', '단백질/헬스 보충제 리뷰', '피트니스 챌린지 주최'],
      brandFitIndustries: ['스포츠/애슬레저', '건강식품/단백질음료', '헬스케어 가전', '아웃도어'],
      responseRate: '96%',
      avgTurnaroundTime: '3~5일',
      liveCommerceAvailable: true,
      globalCampaignReady: false
    },
    contact: {
      email: 'contact@yoonfit.kr',
      agency: '인플레어 스포츠',
      officialSite: 'https://yoonfit.kr'
    }
  },
  {
    id: 'inf-05',
    rank: 5,
    previousRank: 8,
    name: 'Mia & Leo (미아와 레오)',
    koreanName: '이미아 & 정레오',
    handle: '@mialeo_travels',
    category: 'Travel & Adventure',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
    ],
    bio: '세계 곳곳의 숨겨진 보석 같은 휴양지와 로컬 문화를 영화 같은 시네마틱 4K 영상으로 기록하는 크리에이터 듀오. 럭셔리 호텔 및 항공사 최선호 파트너.',
    oneLinerQuote: '“우리가 여행하는 이유는 일상을 떠나기 위함이 아니라, 일상을 다시 사랑하기 위함입니다.”',
    metrics: {
      followersTotal: 1520000,
      instagramFollowers: 940000,
      youtubeSubscribers: 580000,
      tiktokFollowers: 0,
      engagementRate: 8.7,
      avgViews: 740000,
      avgLikes: 98000,
      score: 94.6,
      growthRateMonthly: 18.2
    },
    badges: ['HOT 100 5위', '여행 부문 1위', '글로벌 관광청 공식 파트너', '시네마틱 트래블 필름'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 30, '25-34': 50, '35-44': 15, '45+': 5 },
      genderBreakdown: { female: 65, male: 35 },
      topRegions: ['대한민국 (60%)', '유럽 (15%)', '미국 (15%)', '기타 (10%)']
    },
    interview: {
      headline: 'WANDERLUST CINEMA: 카메라에 담은 지구의 가장 아름다운 순간들',
      subtitle: '드론과 시네마 카메라로 완성한 4K 여행 다큐멘터리의 비하인드',
      date: '2026.01 TRAVEL SPECIAL',
      editor: '여행 전문 에디터 송지민',
      leadParagraph: '스위스의 만년설부터 발리의 일몰까지. 미아와 레오의 영상은 보는 이로 하여금 당장 여권을 챙겨 공항으로 달려가고 싶게 만드는 강렬한 몰입감을 선사한다.',
      sections: [
        {
          question: 'Q1. 둘이 함께 여행 콘텐츠를 만들며 생기는 시너지는 무엇인가요?',
          answer: '레오는 촬영과 테크니컬한 드론 비행을 총괄하고, 미아는 로케이션 큐레이션과 스토리텔링, 컬러 그레이딩을 담당합니다. 서로의 장점이 어우러져 한 편의 단편 영화 같은 결과물이 탄생합니다.',
          highlightQuote: '“영상 하나를 위해 새벽 4시 일출을 열 번 기다리는 끈기가 우리의 자부심입니다.”'
        }
      ],
      favoriteBrands: ['DJI', 'Sony Alpha', 'Rimowa', 'Aman Resorts', 'Four Seasons'],
      upcomingProjects: '아이슬란드 오로라 다큐멘터리 & 여행 포토에세이 출간'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩7,000,000 ~ ₩11,000,000',
      minBudget: 7000000,
      preferredCampaignTypes: ['관광청 팸투어 & 시네마틱 홍보영상', '럭셔리 리조트/호텔 콜라보', '여행/아웃도어 기어 캠페인'],
      brandFitIndustries: ['항공/관광청/호텔', '카메라/촬영기기', '캐리어/패션 악세서리', '신용카드/해외결제'],
      responseRate: '97%',
      avgTurnaroundTime: '7~10일',
      liveCommerceAvailable: false,
      globalCampaignReady: true
    },
    contact: {
      email: 'partnership@mialeo.world',
      agency: 'Global Nomad Creative',
      officialSite: 'https://mialeo.world'
    }
  },
  {
    id: 'inf-06',
    rank: 6,
    previousRank: 7,
    name: 'Chef Jin (진식탁)',
    koreanName: '김진우',
    handle: '@jin_table_kr',
    category: 'Food & Mukbang',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop'
    ],
    bio: '미슐랭 레스토랑 출신 셰프의 고품격 가정식 레시피와 오감 자극 사운드 푸드 크리에이터. 누구나 쉽게 따라 할 수 있는 파인다이닝 비법 공개.',
    oneLinerQuote: '“좋은 음식은 사람과 사람의 마음을 잇는 가장 따뜻한 대화입니다.”',
    metrics: {
      followersTotal: 1410000,
      instagramFollowers: 610000,
      youtubeSubscribers: 800000,
      tiktokFollowers: 0,
      engagementRate: 6.8,
      avgViews: 520000,
      avgLikes: 64000,
      score: 93.8,
      growthRateMonthly: 11.0
    },
    badges: ['HOT 100 6위', '푸드 부문 1위', '미슐랭 출신 셰프', '밀키트 완판 신화'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 20, '25-34': 55, '35-44': 20, '45+': 5 },
      genderBreakdown: { female: 68, male: 32 },
      topRegions: ['대한민국 (92%)', '기타 (8%)']
    },
    interview: {
      headline: 'TASTE OF HOME: 김진우 셰프가 차려낸 식탁 위의 온기',
      subtitle: '화려한 주방을 나와 구독자의 식탁으로 다가간 미슐랭 셰프의 이야기',
      date: '2026.02 GOURMET ISSUE',
      editor: '푸드 에디터 임수현',
      leadParagraph: '지글거리는 기름 소리와 칼질 소리만으로 침샘을 자극하는 ASMR 쿡방. 요리를 두려워하던 이들에게 주방의 기쁨을 선물하는 진식탁의 비결.',
      sections: [
        {
          question: 'Q1. 요리 초보자들을 위한 레시피를 개발할 때 가장 신경 쓰는 부분은?',
          answer: '구하기 어려운 특수 식재료 대신 집 앞 마트에서 살 수 있는 대체 재료로도 셰프의 풍미를 내는 꿀팁을 연구하는 것입니다.'
        }
      ],
      favoriteBrands: ['Le Creuset', 'Staub', 'Zwilling', 'CJ제일제당'],
      upcomingProjects: '시그니처 만능 소스 라인업 전국 출시'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩4,500,000 ~ ₩7,000,000',
      minBudget: 4500000,
      preferredCampaignTypes: ['식품/간편식 레시피 개발 영상', '주방가전 실사용 리뷰', '밀키트 콜라보레이션'],
      brandFitIndustries: ['식음료/F&B', '주방가전/식기', '신선식품/배송플랫폼', '주류/음료'],
      responseRate: '94%',
      avgTurnaroundTime: '5~7일',
      liveCommerceAvailable: true,
      globalCampaignReady: false
    },
    contact: {
      email: 'biz@jintable.co.kr',
      agency: '인플레어 F&B 스튜디오'
    }
  },
  {
    id: 'inf-07',
    rank: 7,
    previousRank: 3,
    name: 'Eunseo (은서의 하루)',
    koreanName: '강은서',
    handle: '@eunseo_daylog',
    category: 'Lifestyle & Vlog',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
    ],
    bio: '자취생 감성 인테리어와 힐링 일상 브이로그. 포근한 조명과 모닝 루틴으로 130만 2030 세대에게 매일 따뜻한 위로를 건네는 감성 크리에이터.',
    oneLinerQuote: '“평범한 하루 속에 숨겨진 작은 행복을 정성껏 주워 담습니다.”',
    metrics: {
      followersTotal: 1350000,
      instagramFollowers: 750000,
      youtubeSubscribers: 600000,
      tiktokFollowers: 0,
      engagementRate: 9.8,
      avgViews: 580000,
      avgLikes: 82000,
      score: 93.1,
      growthRateMonthly: 13.5
    },
    badges: ['HOT 100 7위', '라이프스타일 1위', '인테리어 완판 요정', 'Z세대 워너비'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 48, '25-34': 44, '35-44': 6, '45+': 2 },
      genderBreakdown: { female: 85, male: 15 },
      topRegions: ['대한민국 (94%)', '일본 (6%)']
    },
    interview: {
      headline: 'COZY MORNINGS: 은서가 만드는 다정한 공간의 힘',
      subtitle: '10평 원룸에서 시작해 130만 명의 아침을 밝히는 감성 라이프스타일',
      date: '2026.01 LIVING SPECIAL',
      editor: '리빙 에디터 최보람',
      leadParagraph: '햇살이 비치는 창가, 따뜻하게 데운 라떼 한 잔. 강은서의 브이로그는 복잡한 세상 속에서 잠시 숨을 고를 수 있는 작은 쉼터가 되어준다.',
      sections: [
        {
          question: 'Q1. 공간을 꾸밀 때 가장 중요하게 생각하는 요소는?',
          answer: '조명의 색온도와 패브릭의 질감입니다. 비싼 가구가 아니더라도 따뜻한 3000K 전구색 조명 하나만으로 방 전체의 공기가 달라져요.'
        }
      ],
      favoriteBrands: ['IKEA', '오늘의집', 'Muji', 'Aesop', 'Diptyque'],
      upcomingProjects: '감성 홈웨어 브랜드 런칭'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩5,500,000 ~ ₩8,500,000',
      minBudget: 5500000,
      preferredCampaignTypes: ['브이로그 속 자연스러운 PPL', '홈 인테리어/소품 룸투어', '인스타 감성 릴스'],
      brandFitIndustries: ['가구/홈리빙/인테리어', '디퓨저/캔들/프래그런스', '소형 생활가전', '패션/잡화'],
      responseRate: '98%',
      avgTurnaroundTime: '4~6일',
      liveCommerceAvailable: true,
      globalCampaignReady: false
    },
    contact: {
      email: 'eunseo.collab@gmail.com',
      agency: '인플레어 라이프스타일'
    }
  },
  {
    id: 'inf-08',
    rank: 8,
    previousRank: 12,
    name: 'Kai Zero (카이 제로)',
    koreanName: '김태현',
    handle: '@kaizero_game',
    category: 'Gaming & Anime',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
    ],
    bio: '압도적인 피지컬과 유쾌한 입담의 프로게이머 출신 종합 게임 스트리머. 신작 게임 런칭 시 동시 시청자 8만 명을 모으는 라이브 게임의 제왕.',
    oneLinerQuote: '“게임은 승패를 넘어 전 세계 유저와 실시간으로 교감하는 최고의 무대입니다.”',
    metrics: {
      followersTotal: 1280000,
      instagramFollowers: 280000,
      youtubeSubscribers: 1000000,
      tiktokFollowers: 0,
      engagementRate: 12.2,
      avgViews: 880000,
      avgLikes: 75000,
      score: 92.4,
      growthRateMonthly: 16.8
    },
    badges: ['HOT 100 8위', '게이밍 부문 1위', '치지직/유튜브 동시 1위', '신작 게임 런칭 보증수표'],
    verified: true,
    hasExclusiveInterview: false,
    audience: {
      ageBreakdown: { '18-24': 52, '25-34': 38, '35-44': 8, '45+': 2 },
      genderBreakdown: { female: 22, male: 78 },
      topRegions: ['대한민국 (95%)', '기타 (5%)']
    },
    interview: {
      headline: 'LEVEL UP: 카이 제로가 이끄는 라이브 스트리밍의 미래',
      subtitle: '동시 시청자 8만 명의 비결과 게이머가 열광하는 콘텐츠의 본질',
      date: '2026.02 GAMING REPORT',
      editor: '게임 전문 에디터 류재민',
      leadParagraph: '화려한 컨트롤과 지치지 않는 텐션으로 팬들을 열광시키는 게임 스트리머 카이 제로.',
      sections: [
        {
          question: 'Q1. 신작 게임 플레이 방송을 준비할 때 가장 중점을 두는 것은?',
          answer: '단순히 클리어하는 것이 아니라 시청자와 함께 스토리를 추리하고 웃음을 터뜨릴 수 있는 인터랙션을 만드는 것입니다.'
        }
      ],
      favoriteBrands: ['Razer', 'SteelSeries', 'Alienware', 'ASUS ROG', 'Red Bull'],
      upcomingProjects: '글로벌 e스포츠 토너먼트 해설위원 참가'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩9,000,000 ~ ₩14,000,000',
      minBudget: 9000000,
      preferredCampaignTypes: ['신작 게임 런칭 라이브 스트리밍', '게이밍 기어 협찬 & 리뷰', 'e스포츠 오프라인 이벤트'],
      brandFitIndustries: ['게임사/퍼블리셔', 'PC/게이밍 기어', '에너지 드링크/스낵', '통신사/OTT'],
      responseRate: '92%',
      avgTurnaroundTime: '3~5일',
      liveCommerceAvailable: false,
      globalCampaignReady: false
    },
    contact: {
      email: 'kaizero.partner@gmail.com',
      agency: '샌드박스 게이밍'
    }
  },
  {
    id: 'inf-09',
    rank: 9,
    previousRank: 11,
    name: 'Yuna Kim (유나아트)',
    koreanName: '김유나',
    handle: '@yuna_artstudio',
    category: 'Culture & Art',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop'
    ],
    bio: '전 세계 미술관 도슨트 및 현대 미술 큐레이터. 난해한 현대 예술을 흥미진진한 인문학 스토리텔링으로 풀어내며 젊은 층의 전시 열풍을 주도하는 문화 아이콘.',
    oneLinerQuote: '“예술은 미술관 벽에 갇힌 것이 아니라, 세상을 바라보는 새로운 렌즈입니다.”',
    metrics: {
      followersTotal: 1120000,
      instagramFollowers: 680000,
      youtubeSubscribers: 440000,
      tiktokFollowers: 0,
      engagementRate: 8.1,
      avgViews: 410000,
      avgLikes: 58000,
      score: 91.5,
      growthRateMonthly: 14.1
    },
    badges: ['HOT 100 9위', '문화예술 1위', '전시회 티켓 파워 1위', '예술 도슨트'],
    verified: true,
    hasExclusiveInterview: true,
    audience: {
      ageBreakdown: { '18-24': 35, '25-34': 50, '35-44': 12, '45+': 3 },
      genderBreakdown: { female: 72, male: 28 },
      topRegions: ['대한민국 (88%)', '유럽 (12%)']
    },
    interview: {
      headline: 'ART FOR EVERYONE: 김유나가 열어주는 미술관의 비밀 문',
      subtitle: '2030 세대를 전시장으로 이끄는 흡입력 있는 도슨트 큐레이션',
      date: '2026.01 ART ISSUE',
      editor: '컬처 에디터 오세훈',
      leadParagraph: '그녀의 설명을 듣고 나면 붓 터치 하나, 색채의 대비 하나가 살아 숨 쉬듯 다가온다.',
      sections: [
        {
          question: 'Q1. 미술이 어렵게 느껴지는 대중에게 전하고 싶은 조언은?',
          answer: '정답을 찾으려 하지 말고 첫인상에서 내 마음에 닿는 감정에 집중해보세요. 그게 예술 감상의 시작입니다.'
        }
      ],
      favoriteBrands: ['MoMA', 'Tate Modern', 'Montblanc', 'Leica'],
      upcomingProjects: '유럽 5대 미술관 특별 도슨트 투어'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩4,000,000 ~ ₩6,500,000',
      minBudget: 4000000,
      preferredCampaignTypes: ['미술관/전시회 공식 앰버서더', '프리미엄 럭셔리 브랜드 헤리티지 캠페인', '도서/음악 문화 협업'],
      brandFitIndustries: ['문화/예술/공연', '프리미엄 문구/카메라', '호텔/갤러리', '출판/미디어'],
      responseRate: '98%',
      avgTurnaroundTime: '5~8일',
      liveCommerceAvailable: false,
      globalCampaignReady: true
    },
    contact: {
      email: 'yuna.art@curator.kr',
      agency: '인플레어 컬처'
    }
  },
  {
    id: 'inf-10',
    rank: 10,
    previousRank: 15,
    name: 'Rin & Roy (린앤로이)',
    koreanName: '박하린 & 최로이',
    handle: '@rinroy_couple',
    category: 'Lifestyle & Vlog',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop'
    ],
    bio: '현실감 넘치는 유쾌한 커플 숏폼 시트콤과 스타일리시한 시밀러룩 챌린지. 틱톡/릴스 통합 2,000만 뷰 바이럴 크리에이터.',
    oneLinerQuote: '“함께 웃을 수 있는 순간이 가장 값진 콘텐츠입니다.”',
    metrics: {
      followersTotal: 1050000,
      instagramFollowers: 550000,
      youtubeSubscribers: 200000,
      tiktokFollowers: 300000,
      engagementRate: 13.5,
      avgViews: 950000,
      avgLikes: 110000,
      score: 90.8,
      growthRateMonthly: 21.4
    },
    badges: ['HOT 100 10위', '숏폼 바이럴 1위', '커플 크리에이터 1위', '급상승 루키'],
    verified: true,
    hasExclusiveInterview: false,
    audience: {
      ageBreakdown: { '18-24': 60, '25-34': 32, '35-44': 6, '45+': 2 },
      genderBreakdown: { female: 65, male: 35 },
      topRegions: ['대한민국 (90%)', '일본/글로벌 (10%)']
    },
    interview: {
      headline: 'REAL COMEDY: 린앤로이의 유쾌한 숏폼 바이럴 공식',
      subtitle: '15초 만에 터지는 공감 백배 커플 케미스트리',
      date: '2026.03 RISING ISSUE',
      editor: '트렌드 에디터 장서연',
      leadParagraph: '완벽한 각본보다 일상에서 튀어나오는 애드리브가 더 큰 웃음을 만든다는 두 사람.',
      sections: [
        {
          question: 'Q1. 숏폼 아이디어는 어떻게 회의하나요?',
          answer: '일상 대화 중에 재미있는 포인트가 나오면 메모장에 즉시 적어두고 30분 만에 촬영합니다. 속도감이 생명이에요!'
        }
      ],
      favoriteBrands: ['Musinsa', 'Zara', 'Crocs', 'Samsung Galaxy'],
      upcomingProjects: '숏폼 웹시트콤 시리즈 제작'
    },
    matchingProfile: {
      estimatedCostPerPost: '₩3,500,000 ~ ₩5,500,000',
      minBudget: 3500000,
      preferredCampaignTypes: ['바이럴 숏폼 챌린지', '시밀러룩/커플룩 패션 PPL', '데이트 코스/식음료 홍보'],
      brandFitIndustries: ['캐주얼 패션/슈즈', 'F&B/외식/프랜차이즈', 'OTT/엔터테인먼트', '테마파크/레저'],
      responseRate: '99%',
      avgTurnaroundTime: '2~4일',
      liveCommerceAvailable: true,
      globalCampaignReady: false
    },
    contact: {
      email: 'rinroy.official@gmail.com',
      agency: '인플레어 숏폼 스튜디오'
    }
  }
];

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'art-01',
    title: '2026 K-인플루언서 이코노미 리포트: 숏폼 커머스와 버추얼의 결합',
    subtitle: '조회수 중심에서 실질 구매 전환(CVR)으로 이동하는 인플루언서 마케팅 패러다임 분석',
    category: 'INDUSTRY INSIGHT',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    author: 'INFLARE Research Lab (수석 연구원 배준성)',
    date: '2026.03.15',
    excerpt: '단순 팔로워 수의 거품이 꺼지고 고관여 팬덤을 보유한 마이크로·메가 인플루언서의 ROI가 각광받는 2026년 크리에이터 시장의 핵심 지표를 심층 분석합니다.',
    contentBlocks: [
      {
        type: 'paragraph',
        text: '2026년 국내 인플루언서 마케팅 시장 규모는 3조 2,000억 원을 돌파하며 전통 디지털 광고 시장을 빠르게 재편하고 있습니다. 특히 브랜드 협업에서 가장 중요한 핵심 지표는 단순 노출(Impression)에서 진성 참여율(True Engagement Rate)과 구매 전환 기여도(Attribution ROI)로 명확히 이동했습니다.'
      },
      {
        type: 'heading',
        text: '1. 버티컬 카테고리 전문성의 독점적 가치'
      },
      {
        type: 'paragraph',
        text: '핫100 상위권을 차지한 크리에이터들의 공통점은 명확한 버티컬 전문성입니다. 테크 분야의 박준혁(@techpark_official), 뷰티 분야의 한채은(@chloe_glowup)처럼 전문적인 팩트 체크와 독보적 톤앤매너를 지닌 인플루언서가 브랜드 신뢰도를 견인하고 있습니다.'
      },
      {
        type: 'quote',
        text: '“광고주들은 이제 100만 명에게 스쳐 지나가는 영상보다, 10만 명에게 확신을 주는 인플루언서를 원합니다.”',
        author: '글로벌 광고대행사 매칭 총괄 디렉터'
      },
      {
        type: 'heading',
        text: '2. AI 스마트 매칭이 바꾸는 광고 집행 효율'
      },
      {
        type: 'paragraph',
        text: '인플레어 매거진의 스마트 매칭 시스템은 팔로워의 성별/연령대 데모그래픽, 과거 협업 카테고리 적합도, 평균 반응 속도 데이터를 종합 계산하여 브랜드의 예산 낭비를 0%로 줄여주는 차세대 솔루션으로 자리잡고 있습니다.'
      }
    ],
    relatedInfluencerIds: ['inf-01', 'inf-02', 'inf-03'],
    tags: ['인플루언서 마케팅', 'ROI 지표', '2026 트렌드', '숏폼 커머스'],
    views: 48200,
    likes: 1940
  },
  {
    id: 'art-02',
    title: 'COVER STORY: 1위 민소라가 말하는 럭셔리 비주얼의 정점',
    subtitle: '팔로워 280만 명을 사로잡은 비주얼 디렉팅의 비밀과 패션 철학',
    category: 'EXCLUSIVE INTERVIEW',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    author: 'Chief Editor 김도연',
    date: '2026.03.10',
    excerpt: '파리 패션위크에서 돌아온 민소라와의 독점 대담. 그녀가 꿈꾸는 지속 가능한 패션과 2026년 새로운 프로젝트.',
    contentBlocks: [
      {
        type: 'paragraph',
        text: '런웨이를 수놓는 조명 아래, 가장 먼저 플래시를 받는 이는 모델이 아닌 프론트 로우(Front Row)의 민소라였다. 그녀가 입은 코트와 가방은 단 3초 만에 글로벌 SNS를 통해 전 세계 수백만 패션 피플에게 공유된다.'
      },
      {
        type: 'quote',
        text: '“옷은 단순한 천 조각이 아닙니다. 내가 어떤 사람인지 침묵 속에서 말하는 가장 우아한 언어입니다.”',
        author: '민소라 (@soramin_style)'
      }
    ],
    relatedInfluencerIds: ['inf-01'],
    tags: ['커버스토리', '패션위크', '민소라', '럭셔리 스타일'],
    views: 65400,
    likes: 3820
  },
  {
    id: 'art-03',
    title: 'RISING STAR 2026: 올해 가장 주목해야 할 핫루키 TOP 5',
    subtitle: '급상승 알고리즘을 뚫고 10만에서 100만으로 도약한 크리에이터 분석',
    category: 'RISING STARS',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    author: '트렌드 에디터 장서연',
    date: '2026.03.05',
    excerpt: '유쾌한 숏폼 시트콤부터 초밀착 ASMR까지, 알고리즘을 지배한 신예 크리에이터들의 성장 공식.',
    contentBlocks: [
      {
        type: 'paragraph',
        text: '최근 6개월간 팔로워 성장률 300% 이상을 기록한 라이징 크리에이터들의 핵심 전략은 ‘초밀착 공감대 형성’과 ‘15초 훅(Hook) 설계’입니다.'
      }
    ],
    relatedInfluencerIds: ['inf-10', 'inf-05'],
    tags: ['라이징스타', '숏폼', '알고리즘', 'MZ트렌드'],
    views: 31200,
    likes: 1250
  }
];

export const INITIAL_ARTICLES = MAGAZINE_ARTICLES;

export const INITIAL_CATEGORIES: Array<{ id: string; label: string; icon: string; count: number }> = [
  { id: 'All', label: '전체 (All)', icon: 'Sparkles', count: 100 },
  { id: 'Fashion & Style', label: '패션 & 스타일', icon: 'Shirt', count: 24 },
  { id: 'Beauty & Skincare', label: '뷰티 & 스킨케어', icon: 'Sparkles', count: 21 },
  { id: 'Tech & Gadget', label: '테크 & IT기기', icon: 'Cpu', count: 16 },
  { id: 'Lifestyle & Vlog', label: '라이프스타일 & 일상', icon: 'Coffee', count: 18 },
  { id: 'Fitness & Health', label: '피트니스 & 헬스', icon: 'Dumbbell', count: 9 },
  { id: 'Food & Mukbang', label: '푸드 & 미식', icon: 'Utensils', count: 8 },
  { id: 'Travel & Adventure', label: '여행 & 모험', icon: 'Compass', count: 7 },
  { id: 'Gaming & Anime', label: '게임 & 엔터', icon: 'Gamepad2', count: 9 },
  { id: 'Culture & Art', label: '문화 & 예술', icon: 'Palette', count: 5 }
];
