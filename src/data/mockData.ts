import { Influencer, MagazineArticle } from '../types';

export const INITIAL_INFLUENCERS: Influencer[] = [];
export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'art-master-a',
    title: 'SPECIAL COVER STORY: HOT 100 1위 Master A (Nguyen Ngoc An) 독점 룩북 화보',
    subtitle: '팔로워 245만 명을 사로잡은 글로벌 패션 아이콘의 스타일링 비하인드와 비전',
    category: 'EXCLUSIVE INTERVIEW',
    readTime: '7 min read',
    coverImage: '/images/MMG0176.jpg',
    author: 'Chief Editor 김도연',
    date: '2026.03.18',
    excerpt: '2026년 인플레어 매거진 핫100 1위이자 메인 커버 스타로 선정된 Master A(Nguyen Ngoc An)와의 독점 인터뷰. 카메라 렌즈 너머 전하는 패션 철학과 글로벌 프로젝트.',
    contentBlocks: [
      {
        type: 'paragraph',
        text: '카메라 렌즈 앞에서 강렬한 카리스마와 섬세한 감성을 오가는 Master A(Nguyen Ngoc An). 2026년 인플레어 매거진 독점 화보 & 룩북 컬렉션의 메인 커버 스타로 선정된 그와 나눈 스타일링 비하인드 스토리.'
      },
      {
        type: 'heading',
        text: '1. 한계 없는 스타일 도전과 진정성'
      },
      {
        type: 'paragraph',
        text: '“모든 컷마다 저만의 열정과 진정성을 담아내는 것이 제가 추구하는 룩북의 본질입니다.” 촬영장에서 만난 Master A는 의상 하나하나에 스토리를 불어넣으며 현장 스태프들의 탄성을 자아냈다.'
      },
      {
        type: 'quote',
        text: '“패션과 비주얼은 국경을 초월해 사람들의 마음을 연결하는 강력한 언어입니다.”',
        author: 'Master A (Nguyen Ngoc An)'
      }
    ],
    relatedInfluencerIds: ['inf-master-a'],
    tags: ['커버스토리', 'Master A', 'Nguyen Ngoc An', '패션 룩북', '핫100 1위'],
    views: 89400,
    likes: 5420
  },
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
