export interface ImagePreset {
  id: string;
  title: string;
  category: string;
  url: string;
  tag: string;
}

export const MAGAZINE_IMAGE_PRESETS: ImagePreset[] = [
  // Fashion & Style
  {
    id: 'preset-f1',
    title: '하이엔드 파리 런웨이 & 스트리트',
    category: 'Fashion & Style',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    tag: '럭셔리 패션'
  },
  {
    id: 'preset-f2',
    title: '모던 시크 미니멀 룩북',
    category: 'Fashion & Style',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    tag: '미니멀 룩북'
  },
  {
    id: 'preset-f3',
    title: '네오 레트로 스트리트웨어',
    category: 'Fashion & Style',
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
    tag: '스트리트'
  },
  {
    id: 'preset-f4',
    title: '오트 쿠튀르 이브닝 드레스',
    category: 'Fashion & Style',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    tag: '드레스 화보'
  },

  // Beauty & Skincare
  {
    id: 'preset-b1',
    title: '글로우 스킨 & 내추럴 클로즈업',
    category: 'Beauty & Skincare',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
    tag: '글로우 뷰티'
  },
  {
    id: 'preset-b2',
    title: '아트 메이크업 & 컬러풀 팔레트',
    category: 'Beauty & Skincare',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    tag: '아트 뷰티'
  },
  {
    id: 'preset-b3',
    title: '스킨케어 & 웰니스 스튜디오',
    category: 'Beauty & Skincare',
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
    tag: '스킨케어'
  },

  // Tech & Gadget
  {
    id: 'preset-t1',
    title: '사이버펑크 네온 IT 데스크 셋업',
    category: 'Tech & Gadget',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    tag: '테크 & IT'
  },
  {
    id: 'preset-t2',
    title: '미래형 스마트 디바이스 & 랩',
    category: 'Tech & Gadget',
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop',
    tag: '스마트 테크'
  },
  {
    id: 'preset-t3',
    title: '크리에이터 오디오 & 스튜디오 장비',
    category: 'Tech & Gadget',
    url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    tag: '오디오 스튜디오'
  },

  // Lifestyle, Travel & Food
  {
    id: 'preset-l1',
    title: '선셋 오션 프론트 & 럭셔리 트래블',
    category: 'Travel & Adventure',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    tag: '럭셔리 여행'
  },
  {
    id: 'preset-l2',
    title: '도심 속 감성 카페 & 브런치',
    category: 'Lifestyle & Vlog',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    tag: '라이프스타일'
  },
  {
    id: 'preset-l3',
    title: '피트니스 하이퍼포먼스 짐',
    category: 'Fitness & Health',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    tag: '피트니스'
  },
  {
    id: 'preset-l4',
    title: '미슐랭 파인다이닝 & 고메 플레이팅',
    category: 'Food & Mukbang',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
    tag: '파인다이닝'
  },

  // Magazine Article Covers
  {
    id: 'preset-art1',
    title: '크리에이터 이코노미 & 데이터 분석',
    category: 'Editorial Cover',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    tag: '비즈니스 리포트'
  },
  {
    id: 'preset-art2',
    title: '차세대 숏폼 스튜디오 & 조명',
    category: 'Editorial Cover',
    url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    tag: '숏폼 스튜디오'
  },
  {
    id: 'preset-art3',
    title: '글로벌 브랜드 콜라보레이션 쇼룸',
    category: 'Editorial Cover',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    tag: '쇼룸 팝업'
  }
];
