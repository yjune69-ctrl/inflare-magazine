
export const INITIAL_CATEGORIES = [
  { id: "All", label: "전체 (All)", count: 14 },
  { id: "Fashion & Style", label: "Fashion & Style", count: 5 },
  { id: "Beauty & Skincare", label: "Beauty & Skincare", count: 1 },
  { id: "Tech & Gadget", label: "Tech & Gadget", count: 1 },
  { id: "Fitness & Health", label: "Fitness & Health", count: 1 },
  { id: "Travel & Adventure", label: "Travel & Adventure", count: 1 },
  { id: "Food & Mukbang", label: "Food & Mukbang", count: 1 },
  { id: "Lifestyle & Vlog", label: "Lifestyle & Vlog", count: 2 },
  { id: "Gaming & Anime", label: "Gaming & Anime", count: 1 },
  { id: "Culture & Art", label: "Culture & Art", count: 1 }
];

import { Influencer, MagazineArticle } from "../types";

export const INITIAL_INFLUENCERS: Influencer[] = [
  {
    "id": "inf-1788810284145",
    "rank": 14,
    "previousRank": 0,
    "name": "JINJINMOKA",
    "koreanName": "진진모카",
    "handle": "@JINJIN",
    "category": "Fashion & Style",
    "avatar": "/images/jinjin_avatar.jpg",
    "coverImage": "/images/jinjin_cover.jpg",
    "galleryImages": [
      "/images/jinjin_lookbook_1.jpg",
      "/images/jinjin_lookbook_2.jpg"
    ],
    "pictorialConcept": "2026 Spring Exclusive Fashion Lookbook",
    "pictorialCredits": "Photographer: Studio Inflare | Stylist: Fashion Team",
    "bio": "《盖世禁住》国内短剧\n饰演:宁轻雨(女一) 该剧在抖音播放量2.4亿\nTitle: Short Drama \"Forbidden\"\nStarring: Ning Qingyu (First Female Lead)\nDouyin Views: Recorded 240 million views.",
    "oneLinerQuote": "“진진모카의 감각적인 콘텐츠를 만나보세요.”",
    "metrics": {
      "followersTotal": 500000,
      "engagementRate": 8.5,
      "avgViews": 200000,
      "avgLikes": 25000,
      "score": 92,
      "growthRateMonthly": 12.5
    },
    "badges": [
      "HOT 100",
      "트렌드 리더",
      "이달의 루키"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 35,
        "25-34": 48,
        "35-44": 14,
        "45+": 3
      },
      "genderBreakdown": {
        "female": 70,
        "male": 30
      },
      "topRegions": [
        "대한민국 서울 (65%)",
        "부산/경기 (20%)",
        "글로벌 (15%)"
      ]
    },
    "interview": {
      "headline": "THE NEW WAVE: 시대를 움직이는 크리에이터의 목소리",
      "subtitle": "진정성 있는 콘텐츠와 팬덤으로 구축한 독보적 영향력의 비결",
      "date": "2026 ISSUE EXCLUSIVE",
      "editor": "INFLARE 편집부",
      "leadParagraph": "카메라 앞과 뒤, 그리고 일상 속에서 마주하는 진솔한 이야기.",
      "sections": [
        {
          "question": "Q1. 이번 인플루언서 핫100 선정 소감과 핵심 철학은?",
          "answer": "언제나 저만의 시선과 취향을 믿고 함께해 주시는 팬 여러분 덕분입니다.",
          "highlightQuote": "“진정성은 숫자를 넘어 사람의 마음에 가닿는 가장 강력한 힘입니다.”"
        }
      ],
      "behindTheScenes": "촬영 현장에서 밝은 에너지로 매 컷을 완성했습니다.",
      "favoriteBrands": [
        "Chanel",
        "Celine",
        "Gentle Monster"
      ],
      "audioDuration": "12 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩4,000,000 ~ ₩7,000,000",
      "minBudget": 4000000,
      "preferredCampaignTypes": [
        "단독 인스타 릴스",
        "유튜브 PPL",
        "기획 화보"
      ],
      "brandFitIndustries": [
        "Fashion & Style",
        "라이프스타일"
      ],
      "responseRate": "98%",
      "avgTurnaroundTime": "3~5일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "JINJIN@inflare-creator.com",
      "agency": "INFLARE Creator Network"
    },
    "updatedAt": "2026-09-07T19:47:33.060Z"
  },
  {
    "id": "inf-1788809609584",
    "rank": 13,
    "previousRank": 0,
    "name": "daniel",
    "koreanName": "한송",
    "handle": "@haa",
    "category": "Fashion & Style",
    "avatar": "/images/hansong_avatar.jpg",
    "coverImage": "/images/hansong_cover.jpg",
    "galleryImages": [
      "/images/hansong_lookbook_1.jpg",
      "/images/hansong_lookbook_2.jpg",
      "/images/hansong_lookbook_3.jpg",
      "/images/hansong_lookbook_4.jpg",
      "/images/hansong_lookbook_5.jpg",
      "/images/hansong_lookbook_6.jpg"
    ],
    "pictorialConcept": "2026 Spring Exclusive Fashion Lookbook",
    "pictorialCredits": "Photographer: Studio Inflare | Stylist: Fashion Team",
    "bio": "1998.12.26. nationality : china. follower : 2,500,000. Oriental Billboard Music Festival Chinese Vocal of the Year Award.",
    "oneLinerQuote": "“한송의 감각적인 콘텐츠를 만나보세요.”",
    "metrics": {
      "followersTotal": 500000,
      "engagementRate": 8.5,
      "avgViews": 200000,
      "avgLikes": 25000,
      "score": 92,
      "growthRateMonthly": 12.5
    },
    "badges": [
      "HOT 100",
      "트렌드 리더",
      "이달의 루키"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 35,
        "25-34": 48,
        "35-44": 14,
        "45+": 3
      },
      "genderBreakdown": {
        "female": 70,
        "male": 30
      },
      "topRegions": [
        "대한민국 서울 (65%)",
        "부산/경기 (20%)",
        "글로벌 (15%)"
      ]
    },
    "interview": {
      "headline": "THE NEW WAVE: 시대를 움직이는 크리에이터의 목소리",
      "subtitle": "진정성 있는 콘텐츠와 팬덤으로 구축한 독보적 영향력의 비결",
      "date": "2026 ISSUE EXCLUSIVE",
      "editor": "INFLARE 편집부",
      "leadParagraph": "cctv challenge the impossible, Jiangsu Satellite TV Spring Festival",
      "sections": [
        {
          "question": "Q1. 크리에이터로서의 핵심 철학은?",
          "answer": "제 삶의 진솔한 순간을 기록하려고 노력합니다.",
          "highlightQuote": "“진정성은 숫자를 넘어 사람의 마음에 가닿는 가장 강력한 힘입니다.”"
        }
      ],
      "behindTheScenes": "촬영 현장에서 디테일한 아이디어로 컷을 완성했습니다.",
      "favoriteBrands": [
        "Chanel",
        "Celine",
        "Apple"
      ],
      "audioDuration": "12 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩4,000,000 ~ ₩7,000,000",
      "minBudget": 4000000,
      "preferredCampaignTypes": [
        "단독 인스타 릴스",
        "유튜브 PPL",
        "기획 화보"
      ],
      "brandFitIndustries": [
        "Fashion & Style",
        "라이프스타일"
      ],
      "responseRate": "98%",
      "avgTurnaroundTime": "3~5일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "haa@inflare-creator.com",
      "agency": "INFLARE Creator Network"
    },
    "updatedAt": "2026-09-07T19:40:46.309Z"
  },
  {
    "id": "inf-1788807505778",
    "rank": 12,
    "previousRank": 0,
    "name": "chency",
    "koreanName": "chency",
    "handle": "@gggbhhbhb",
    "category": "Fashion & Style",
    "avatar": "/images/chency_avatar.jpg",
    "coverImage": "/images/chency_cover.jpg",
    "galleryImages": [
      "/images/chency_lookbook_1.jpg",
      "/images/chency_lookbook_2.jpg",
      "/images/chency_lookbook_3.jpg",
      "/images/chency_lookbook_4.jpg"
    ],
    "pictorialConcept": "2026 Spring Exclusive Fashion Lookbook",
    "pictorialCredits": "Photographer: Studio Inflare | Stylist: Fashion Team",
    "bio": "chency 크리에이터의 공식 프로필입니다.",
    "oneLinerQuote": "“chency의 감각적인 콘텐츠를 만나보세요.”",
    "metrics": {
      "followersTotal": 500000,
      "engagementRate": 8.5,
      "avgViews": 200000,
      "avgLikes": 25000,
      "score": 92,
      "growthRateMonthly": 12.5
    },
    "badges": [
      "HOT 100",
      "트렌드 리더",
      "이달의 루키"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 35,
        "25-34": 48,
        "35-44": 14,
        "45+": 3
      },
      "genderBreakdown": {
        "female": 70,
        "male": 30
      },
      "topRegions": [
        "대한민국 서울 (65%)",
        "부산/경기 (20%)",
        "글로벌 (15%)"
      ]
    },
    "interview": {
      "headline": "THE NEW WAVE: 시대를 움직이는 크리에이터의 목소리",
      "subtitle": "진정성 있는 콘텐츠와 팬덤으로 구축한 독보적 영향력의 비결",
      "date": "2026 ISSUE EXCLUSIVE",
      "editor": "INFLARE 편집부",
      "leadParagraph": "카메라 앞과 뒤, 그리고 일상 속에서 마주하는 진솔한 이야기.",
      "sections": [
        {
          "question": "Q1. 크리에이터로서의 철학은?",
          "answer": "단순한 유행을 좇기보다는 제 삶의 진솔한 순간을 기록하려고 노력합니다.",
          "highlightQuote": "“진정성은 숫자를 넘어 사람의 마음에 가닿는 가장 강력한 힘입니다.”"
        }
      ],
      "behindTheScenes": "촬영 현장에서 밝은 에너지와 디테일한 아이디어로 매 컷을 완성했습니다.",
      "favoriteBrands": [
        "Chanel",
        "Celine",
        "Gentle Monster"
      ],
      "audioDuration": "12 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩4,000,000 ~ ₩7,000,000",
      "minBudget": 4000000,
      "preferredCampaignTypes": [
        "단독 인스타 릴스",
        "유튜브 PPL",
        "기획 화보"
      ],
      "brandFitIndustries": [
        "Fashion & Style",
        "라이프스타일"
      ],
      "responseRate": "98%",
      "avgTurnaroundTime": "3~5일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "gggbhhbhb@inflare-creator.com",
      "agency": "INFLARE Creator Network"
    },
    "updatedAt": "2026-09-07T19:27:05.240Z"
  },
  {
    "id": "inf-master-a",
    "rank": 1,
    "previousRank": 0,
    "name": "Master A",
    "koreanName": "Nguyen Ngoc An",
    "handle": "@mastera_11",
    "category": "Fashion & Style",
    "avatar": "/images/MMG0176.jpg",
    "coverImage": "/images/MMG0176.jpg",
    "galleryImages": [
      "/images/MMG0176.jpg",
      "/images/mastera_lookbook_sub_angle.jpg",
      "/images/mastera_detail_mood.jpg",
      "/images/mastera_b_cut.jpg",
      "/images/mastera_closeup.jpg"
    ],
    "pictorialConcept": "2026 S/S Master A Special Lookbook: Asian High Chic & Editorial Aura",
    "pictorialCredits": "Photo: Studio Alpha • Styling: Nguyen Ngoc An • Direction: INFLARE Lookbook Team",
    "bio": "글로벌 아시안 패션 트렌드와 감각적인 비주얼을 이끄는 탑 인플루언서. 세련된 스트리트 하이엔드 룩북과 다채로운 비주얼 디렉팅으로 글로벌 팬덤을 사로잡고 있습니다.",
    "oneLinerQuote": "“패션은 단순한 옷이 아닌 나의 아이덴티티와 에너지를 세상에 표현하는 예술입니다.”",
    "metrics": {
      "followersTotal": 2450000,
      "engagementRate": 9.2,
      "avgViews": 980000,
      "avgLikes": 122500,
      "score": 99.1,
      "growthRateMonthly": 18.5
    },
    "badges": [
      "HOT 100 1위",
      "이달의 룩북 커버 스타",
      "글로벌 스타일 아이콘",
      "인플레어 에디터스 픽"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 44,
        "25-34": 42,
        "35-44": 10,
        "45+": 4
      },
      "genderBreakdown": {
        "female": 65,
        "male": 35
      },
      "topRegions": [
        "대한민국 서울 (45%)",
        "베트남/호치민 (30%)",
        "도쿄/일본 (15%)",
        "기타 (10%)"
      ]
    },
    "interview": {
      "headline": "MASTER A (NGUYEN NGOC AN): 시대를 사로잡은 독보적 비주얼 룩북의 정점",
      "subtitle": "인스타그램 @mastera_11 & 페이스북 @youngalpha29을 넘나드는 글로벌 패션 아이콘의 진솔한 인터뷰",
      "date": "2026 ISSUE EXCLUSIVE",
      "editor": "에디터 김도연 (Chief Content Officer)",
      "leadParagraph": "카메라 렌즈 앞에서 강렬한 카리스마와 섬세한 감성을 오가는 Master A. 2026년 인플레어 매거진 독점 화보 & 룩북 컬렉션의 메인 커버 스타로 선정된 그와 나눈 스타일링 비하인드 스토리.",
      "sections": [
        {
          "question": "Q1. 이번 2026 INFLARE 독점 화보 & 룩북의 메인 커버 스타로 참여하신 소감은?",
          "answer": "대한민국 최고의 크리에이터들과 함께하는 인플레어 화보 룩북에 단독 커버로 소개되어 영광입니다.",
          "highlightQuote": "“모든 컷마다 저만의 열정과 진정성을 담아내는 것이 제가 추구하는 룩북의 본질입니다.”",
          "imageIndex": 0
        },
        {
          "question": "Q2. Master A라는 아티스트 네임과 Nguyen Ngoc An으로서의 비전은?",
          "answer": "글로벌 팬들과 진심으로 교감하며 아시아를 대표하는 스타일 아이콘으로 자리매김하고 싶습니다.",
          "highlightQuote": "“패션과 비주얼은 국경을 초월해 사람들의 마음을 연결하는 강력한 언어입니다.”",
          "imageIndex": 1
        }
      ],
      "behindTheScenes": "Master A는 촬영장에서 압도적인 프로페셔널함과 의상에 대한 깊은 이해도로 스태프들을 매료시켰습니다.",
      "favoriteBrands": [
        "Balenciaga",
        "Gentle Monster",
        "Acne Studios",
        "Rick Owens",
        "Maison Margiela"
      ],
      "audioDuration": "12 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩7,000,000 ~ ₩11,000,000",
      "minBudget": 7000000,
      "preferredCampaignTypes": [
        "단독 인스타 릴스",
        "유튜브 PPL",
        "브랜드 앰버서더",
        "기획 화보"
      ],
      "brandFitIndustries": [
        "Fashion & Style",
        "라이프스타일",
        "글로벌 패션/뷰티"
      ],
      "responseRate": "99%",
      "avgTurnaroundTime": "3~5일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "contact@mastera-official.com",
      "agency": "Alpha Global Media",
      "instagramUrl": "https://instagram.com/mastera_11",
      "facebookUrl": "https://facebook.com/youngalpha29"
    },
    "updatedAt": "2026-09-07T19:32:18.913Z"
  },
  {
    "id": "inf-01",
    "rank": 2,
    "previousRank": 2,
    "name": "Sora Min",
    "koreanName": "민소라",
    "handle": "@soramin_style",
    "category": "Fashion & Style",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop"
    ],
    "pictorialConcept": "2026 S/S Haute Couture & Parisian Chic Mood",
    "pictorialCredits": "Photo: Studio VOGUE KR • Styling: Sora Min • Direction: INFLARE Editorial",
    "bio": "하이엔드 패션과 스트리트 무드를 결합한 독보적 비주얼 디렉터. 파리/밀라노 패션위크 공식 초청 인플루언서이자 감각적인 룩북 크리에이터.",
    "oneLinerQuote": "“패션은 단순히 입는 것이 아닌, 나를 둘러싼 공기의 온도를 바꾸는 일입니다.”",
    "metrics": {
      "followersTotal": 2840000,
      "instagramFollowers": 1920000,
      "youtubeSubscribers": 680000,
      "tiktokFollowers": 240000,
      "engagementRate": 8.4,
      "avgViews": 920000,
      "avgLikes": 148000,
      "score": 98.7,
      "growthRateMonthly": 12.8
    },
    "badges": [
      "HOT 100 1위",
      "이달의 커버 스타",
      "하이엔드 앰버서더",
      "글로벌 탑 패셔니스타"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 38,
        "25-34": 44,
        "35-44": 14,
        "45+": 4
      },
      "genderBreakdown": {
        "female": 76,
        "male": 24
      },
      "topRegions": [
        "대한민국 서울 (62%)",
        "도쿄/일본 (14%)",
        "뉴욕/미국 (12%)",
        "기타 (12%)"
      ]
    },
    "interview": {
      "headline": "THE REIGN OF MIN SORA: 시대를 관통하는 스타일의 미학",
      "subtitle": "서울에서 파리까지, 280만 팔로워를 매료시킨 감각적 비주얼 큐레이션의 비밀",
      "date": "2026.03 ISSUE COVER STORY",
      "editor": "에디터 김도연 (Chief Content Officer)",
      "audioDuration": "14 min listening",
      "leadParagraph": "화려한 런웨이의 백스테이지부터 일상의 편안한 앤티크 카페까지, 민소라가 렌즈 앞에 서는 순간 모든 피사체는 하나의 정교한 예술 작품으로 재탄생한다.",
      "sections": [
        {
          "question": "Q1. 이번 인플루언서 핫100 1위 등극 소감은?",
          "answer": "제 감각과 룩북을 믿고 공감해주시는 분들이 이렇게 깊은 유대를 보여주셨다는 점에서 큰 책임감과 감사를 느낍니다.",
          "highlightQuote": "“숫자보다 중요한 건 제 취향에 진심으로 공감해주는 사람들과의 보이지 않는 신뢰입니다.”",
          "imageIndex": 0
        }
      ],
      "behindTheScenes": "촬영 현장에서 민소라는 준비해 온 3가지 무드의 플레이리스트를 직접 재생하며 촬영장의 분위기를 이끌었습니다.",
      "favoriteBrands": [
        "Chanel",
        "Maison Margiela",
        "The Row",
        "Acne Studios",
        "Gentle Monster"
      ],
      "upcomingProjects": "2026 F/W 파리 패션위크 브이로그 & 친환경 캡슐 컬렉션 런칭"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩8,000,000 ~ ₩12,000,000",
      "minBudget": 8000000,
      "preferredCampaignTypes": [
        "단독 인스타 릴스/피드",
        "글로벌 브랜드 앰버서더",
        "패션위크 초청/행사 참석",
        "룩북 큐레이션"
      ],
      "brandFitIndustries": [
        "명품 패션/의류",
        "프리미엄 뷰티",
        "하이엔드 파인주얼리",
        "럭셔리 호텔/라이프스타일"
      ],
      "responseRate": "99%",
      "avgTurnaroundTime": "4~7일",
      "liveCommerceAvailable": false,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "mgmt@soramin-official.com",
      "agency": "INFLARE Talent Group",
      "officialSite": "https://soramin.studio",
      "instagramUrl": "https://instagram.com"
    }
  },
  {
    "id": "inf-02",
    "rank": 2,
    "previousRank": 1,
    "name": "Jayden Park (테크파크)",
    "koreanName": "박준혁",
    "handle": "@techpark_official",
    "category": "Tech & Gadget",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
    ],
    "pictorialConcept": "Cyberpunk Futurism & Minimalist Tech Space",
    "pictorialCredits": "Photo: TechLab Studio • Gear: Sony FX3 & Leica SL2",
    "bio": "초정밀 벤치마크와 알기 쉬운 테크 분해 리뷰.",
    "oneLinerQuote": "“복잡한 스펙 표 뒤에 숨겨진 실제 사용자 경험의 본질을 밝혀냅니다.”",
    "metrics": {
      "followersTotal": 2150000,
      "instagramFollowers": 450000,
      "youtubeSubscribers": 1700000,
      "tiktokFollowers": 0,
      "engagementRate": 9.2,
      "avgViews": 1450000,
      "avgLikes": 112000,
      "score": 97.4,
      "growthRateMonthly": 8.6
    },
    "badges": [
      "HOT 100 2위",
      "테크 부문 1위",
      "광고주 신뢰도 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 32,
        "25-34": 48,
        "35-44": 16,
        "45+": 4
      },
      "genderBreakdown": {
        "female": 18,
        "male": 82
      },
      "topRegions": [
        "대한민국 (84%)",
        "미국 (8%)"
      ]
    },
    "interview": {
      "headline": "NEXT-GEN HARDWARE: 테크파크가 예측하는 2026 디바이스 혁명",
      "subtitle": "170만 유튜브 구독자를 사로잡은 타협 없는 팩트 체크",
      "date": "2026.02 SPECIAL REPORT",
      "editor": "테크 전문 에디터 이승원",
      "leadParagraph": "수천만 원 상당의 측정 장비로 가득 찬 그의 스튜디오.",
      "sections": [
        {
          "question": "Q1. 테크 리뷰에서 가장 중요한 원칙은?",
          "answer": "모든 수치는 재현 가능해야 한다는 점입니다.",
          "highlightQuote": "“시청자의 지갑을 지키는 것이 제 사명입니다.”"
        }
      ],
      "favoriteBrands": [
        "Apple",
        "Samsung",
        "Sony"
      ],
      "audioDuration": "18 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩12,000,000 ~ ₩18,000,000",
      "minBudget": 12000000,
      "preferredCampaignTypes": [
        "유튜브 심층 기획 리뷰"
      ],
      "brandFitIndustries": [
        "IT/가전/전자기기"
      ],
      "responseRate": "95%",
      "avgTurnaroundTime": "7~14일",
      "liveCommerceAvailable": false,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "business@techpark.kr",
      "agency": "인플레어 테크 MCN"
    }
  },
  {
    "id": "inf-03",
    "rank": 3,
    "previousRank": 5,
    "name": "Chloe Han (클로이뷰티)",
    "koreanName": "한채은",
    "handle": "@chloe_glowup",
    "category": "Beauty & Skincare",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop"
    ],
    "pictorialConcept": "Pure Clean Glow & Natural Sunlight Aesthetics",
    "pictorialCredits": "Photo: Glow Atelier",
    "bio": "K-뷰티의 글로벌 전도사이자 성분 분석 기반 뷰티 크리에이터.",
    "oneLinerQuote": "“화장품은 본연의 빛을 돋보이게 하는 조명입니다.”",
    "metrics": {
      "followersTotal": 1950000,
      "engagementRate": 11.4,
      "avgViews": 850000,
      "avgLikes": 125000,
      "score": 96.8,
      "growthRateMonthly": 15.3
    },
    "badges": [
      "HOT 100 3위",
      "뷰티 부문 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 45,
        "25-34": 42,
        "35-44": 10,
        "45+": 3
      },
      "genderBreakdown": {
        "female": 89,
        "male": 11
      },
      "topRegions": [
        "대한민국 (55%)",
        "미국 (18%)"
      ]
    },
    "interview": {
      "headline": "GLOW FROM WITHIN: 한채은의 피부 과학",
      "subtitle": "품절 대란 10회 연속 기록 뷰티 큐레이터",
      "date": "2026.03 BEAUTY SPECIAL",
      "editor": "뷰티 디렉터 서유진",
      "leadParagraph": "조명 없이도 눈부시게 빛나는 피부 결.",
      "sections": [
        {
          "question": "Q1. 품절 대란의 비결은?",
          "answer": "최소 4주 이상 직접 테스트한 제품만 소개합니다.",
          "highlightQuote": "“직접 발라보고 검증되지 않은 것은 소개하지 않습니다.”"
        }
      ],
      "favoriteBrands": [
        "Sulwhasoo",
        "Tamburins"
      ],
      "audioDuration": "11 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩6,500,000 ~ ₩9,500,000",
      "minBudget": 6500000,
      "preferredCampaignTypes": [
        "인스타 릴스 + 피드"
      ],
      "brandFitIndustries": [
        "스킨케어/코스메틱"
      ],
      "responseRate": "98%",
      "avgTurnaroundTime": "5~7일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "collab@chloeglow.com",
      "agency": "INFLARE Beauty Lab"
    }
  },
  {
    "id": "inf-04",
    "rank": 4,
    "previousRank": 4,
    "name": "David Yoon (피트니스 윤)",
    "koreanName": "윤태성",
    "handle": "@yoon_fit_core",
    "category": "Fitness & Health",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
    ],
    "pictorialConcept": "Raw Power & Athletic Sculpt",
    "pictorialCredits": "Photo: Strength Visuals",
    "bio": "재활 의학 기반의 스마트 피트니스 리더.",
    "oneLinerQuote": "“몸을 가꾸는 것은 자신에 대한 존중입니다.”",
    "metrics": {
      "followersTotal": 1680000,
      "engagementRate": 7.9,
      "avgViews": 680000,
      "avgLikes": 84000,
      "score": 95.2,
      "growthRateMonthly": 9.4
    },
    "badges": [
      "HOT 100 4위",
      "피트니스 부문 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 25,
        "25-34": 52,
        "35-44": 18,
        "45+": 5
      },
      "genderBreakdown": {
        "female": 48,
        "male": 52
      },
      "topRegions": [
        "대한민국 (90%)"
      ]
    },
    "interview": {
      "headline": "BODY & MIND BALANCE",
      "subtitle": "윤태성이 제안하는 지속 가능한 에너지",
      "date": "2026.02 WELLNESS ISSUE",
      "editor": "강현우",
      "leadParagraph": "그의 긍정적인 에너지와 과학적인 트레이닝 접근법.",
      "sections": [
        {
          "question": "Q1. 중요하게 전달하고 싶은 메시지는?",
          "answer": "나 자신을 위한 에너지를 만드는 것이 진짜 건강입니다.",
          "highlightQuote": "“온전히 나 자신을 위한 에너지를 만드세요.”"
        }
      ],
      "favoriteBrands": [
        "Nike",
        "Lululemon"
      ],
      "audioDuration": "10 min listening"
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩5,000,000 ~ ₩8,000,000",
      "minBudget": 5000000,
      "preferredCampaignTypes": [
        "스포츠웨어 앰버서더"
      ],
      "brandFitIndustries": [
        "스포츠/애슬레저"
      ],
      "responseRate": "96%",
      "avgTurnaroundTime": "3~5일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": false
    },
    "contact": {
      "email": "contact@yoonfit.kr",
      "agency": "인플레어 스포츠"
    }
  },
  {
    "id": "inf-05",
    "rank": 5,
    "previousRank": 8,
    "name": "Mia & Leo (미아와 레오)",
    "koreanName": "이미아 & 정레오",
    "handle": "@mialeo_travels",
    "category": "Travel & Adventure",
    "avatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
    ],
    "bio": "세계 곳곳의 휴양지를 시네마틱 4K 영상으로 기록하는 크리에이터 듀오.",
    "oneLinerQuote": "“일상을 다시 사랑하기 위해 여행합니다.”",
    "metrics": {
      "followersTotal": 1520000,
      "engagementRate": 8.7,
      "avgViews": 740000,
      "avgLikes": 98000,
      "score": 94.6,
      "growthRateMonthly": 18.2
    },
    "badges": [
      "HOT 100 5위",
      "여행 부문 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 30,
        "25-34": 50,
        "35-44": 15,
        "45+": 5
      },
      "genderBreakdown": {
        "female": 65,
        "male": 35
      },
      "topRegions": [
        "대한민국 (60%)",
        "유럽 (15%)"
      ]
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩7,000,000 ~ ₩11,000,000",
      "minBudget": 7000000,
      "preferredCampaignTypes": [
        "관광청 팸투어"
      ],
      "brandFitIndustries": [
        "항공/관광청/호텔"
      ],
      "responseRate": "97%",
      "avgTurnaroundTime": "7~10일",
      "liveCommerceAvailable": false,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "partnership@mialeo.world",
      "agency": "Global Nomad Creative"
    }
  },
  {
    "id": "inf-06",
    "rank": 6,
    "previousRank": 7,
    "name": "Chef Jin (진식탁)",
    "koreanName": "김진우",
    "handle": "@jin_table_kr",
    "category": "Food & Mukbang",
    "avatar": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop"
    ],
    "bio": "미슐랭 레스토랑 출신 셰프의 고품격 가정식 레시피.",
    "oneLinerQuote": "“좋은 음식은 사람과 사람의 마음을 잇는 가장 따뜻한 대화입니다.”",
    "metrics": {
      "followersTotal": 1410000,
      "engagementRate": 6.8,
      "avgViews": 520000,
      "avgLikes": 64000,
      "score": 93.8,
      "growthRateMonthly": 11
    },
    "badges": [
      "HOT 100 6위",
      "푸드 부문 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 20,
        "25-34": 55,
        "35-44": 20,
        "45+": 5
      },
      "genderBreakdown": {
        "female": 68,
        "male": 32
      },
      "topRegions": [
        "대한민국 (92%)"
      ]
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩4,500,000 ~ ₩7,000,000",
      "minBudget": 4500000,
      "preferredCampaignTypes": [
        "식품/간편식 레시피 개발"
      ],
      "brandFitIndustries": [
        "식음료/F&B"
      ],
      "responseRate": "94%",
      "avgTurnaroundTime": "5~7일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": false
    },
    "contact": {
      "email": "biz@jintable.co.kr",
      "agency": "인플레어 F&B 스튜디오"
    }
  },
  {
    "id": "inf-07",
    "rank": 7,
    "previousRank": 3,
    "name": "Eunseo (은서의 하루)",
    "koreanName": "강은서",
    "handle": "@eunseo_daylog",
    "category": "Lifestyle & Vlog",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
    ],
    "bio": "자취생 감성 인테리어와 힐링 일상 브이로그.",
    "oneLinerQuote": "“평범한 하루 속에 숨겨진 작은 행복을 정성껏 주워 담습니다.”",
    "metrics": {
      "followersTotal": 1350000,
      "engagementRate": 9.8,
      "avgViews": 580000,
      "avgLikes": 82000,
      "score": 93.1,
      "growthRateMonthly": 13.5
    },
    "badges": [
      "HOT 100 7위",
      "라이프스타일 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 48,
        "25-34": 44,
        "35-44": 6,
        "45+": 2
      },
      "genderBreakdown": {
        "female": 85,
        "male": 15
      },
      "topRegions": [
        "대한민국 (94%)"
      ]
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩5,500,000 ~ ₩8,500,000",
      "minBudget": 5500000,
      "preferredCampaignTypes": [
        "브이로그 속 PPL"
      ],
      "brandFitIndustries": [
        "가구/홈리빙/인테리어"
      ],
      "responseRate": "98%",
      "avgTurnaroundTime": "4~6일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": false
    },
    "contact": {
      "email": "eunseo.collab@gmail.com",
      "agency": "인플레어 라이프스타일"
    }
  },
  {
    "id": "inf-08",
    "rank": 8,
    "previousRank": 12,
    "name": "Kai Zero (카이 제로)",
    "koreanName": "김태현",
    "handle": "@kaizero_game",
    "category": "Gaming & Anime",
    "avatar": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1200&auto=format&fit=crop"
    ],
    "bio": "압도적인 피지컬과 유쾌한 입담의 프로게이머 출신 종합 게임 스트리머.",
    "oneLinerQuote": "“게임은 전 세계 유저와 실시간으로 교감하는 최고의 무대입니다.”",
    "metrics": {
      "followersTotal": 1280000,
      "engagementRate": 12.2,
      "avgViews": 880000,
      "avgLikes": 75000,
      "score": 92.4,
      "growthRateMonthly": 16.8
    },
    "badges": [
      "HOT 100 8위",
      "게이밍 부문 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": false,
    "audience": {
      "ageBreakdown": {
        "18-24": 52,
        "25-34": 38,
        "35-44": 8,
        "45+": 2
      },
      "genderBreakdown": {
        "female": 22,
        "male": 78
      },
      "topRegions": [
        "대한민국 (95%)"
      ]
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩9,000,000 ~ ₩14,000,000",
      "minBudget": 9000000,
      "preferredCampaignTypes": [
        "신작 게임 런칭 라이브"
      ],
      "brandFitIndustries": [
        "게임사/퍼블리셔"
      ],
      "responseRate": "92%",
      "avgTurnaroundTime": "3~5일",
      "liveCommerceAvailable": false,
      "globalCampaignReady": false
    },
    "contact": {
      "email": "kaizero.partner@gmail.com",
      "agency": "샌드박스 게이밍"
    }
  },
  {
    "id": "inf-09",
    "rank": 9,
    "previousRank": 11,
    "name": "Yuna Kim (유나아트)",
    "koreanName": "김유나",
    "handle": "@yuna_artstudio",
    "category": "Culture & Art",
    "avatar": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop"
    ],
    "bio": "전 세계 미술관 도슨트 및 현대 미술 큐레이터.",
    "oneLinerQuote": "“예술은 세상을 바라보는 새로운 렌즈입니다.”",
    "metrics": {
      "followersTotal": 1120000,
      "engagementRate": 8.1,
      "avgViews": 410000,
      "avgLikes": 58000,
      "score": 91.5,
      "growthRateMonthly": 14.1
    },
    "badges": [
      "HOT 100 9위",
      "문화예술 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": true,
    "audience": {
      "ageBreakdown": {
        "18-24": 35,
        "25-34": 50,
        "35-44": 12,
        "45+": 3
      },
      "genderBreakdown": {
        "female": 72,
        "male": 28
      },
      "topRegions": [
        "대한민국 (88%)"
      ]
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩4,000,000 ~ ₩6,500,000",
      "minBudget": 4000000,
      "preferredCampaignTypes": [
        "미술관/전시회 공식 앰버서더"
      ],
      "brandFitIndustries": [
        "문화/예술/공연"
      ],
      "responseRate": "98%",
      "avgTurnaroundTime": "5~8일",
      "liveCommerceAvailable": false,
      "globalCampaignReady": true
    },
    "contact": {
      "email": "yuna.art@curator.kr",
      "agency": "인플레어 컬처"
    }
  },
  {
    "id": "inf-10",
    "rank": 10,
    "previousRank": 15,
    "name": "Rin & Roy (린앤로이)",
    "koreanName": "박하린 & 최로이",
    "handle": "@rinroy_couple",
    "category": "Lifestyle & Vlog",
    "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop",
    "coverImage": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop",
    "galleryImages": [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop"
    ],
    "bio": "현실감 넘치는 유쾌한 커플 숏폼 시트콤 크리에이터.",
    "oneLinerQuote": "“함께 웃을 수 있는 순간이 가장 값진 콘텐츠입니다.”",
    "metrics": {
      "followersTotal": 1050000,
      "engagementRate": 13.5,
      "avgViews": 950000,
      "avgLikes": 110000,
      "score": 90.8,
      "growthRateMonthly": 21.4
    },
    "badges": [
      "HOT 100 10위",
      "숏폼 바이럴 1위"
    ],
    "verified": true,
    "hasExclusiveInterview": false,
    "audience": {
      "ageBreakdown": {
        "18-24": 60,
        "25-34": 32,
        "35-44": 6,
        "45+": 2
      },
      "genderBreakdown": {
        "female": 65,
        "male": 35
      },
      "topRegions": [
        "대한민국 (90%)"
      ]
    },
    "matchingProfile": {
      "estimatedCostPerPost": "₩3,500,000 ~ ₩5,500,000",
      "minBudget": 3500000,
      "preferredCampaignTypes": [
        "바이럴 숏폼 챌린지"
      ],
      "brandFitIndustries": [
        "캐주얼 패션/슈즈"
      ],
      "responseRate": "99%",
      "avgTurnaroundTime": "2~4일",
      "liveCommerceAvailable": true,
      "globalCampaignReady": false
    },
    "contact": {
      "email": "rinroy.official@gmail.com",
      "agency": "인플레어 숏폼 스튜디오"
    }
  }
];
export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    "id": "art-master-a",
    "title": "SPECIAL COVER STORY: HOT 100 1위 Master A (Nguyen Ngoc An) 독점 룩북 화보",
    "subtitle": "팔로워 245만 명을 사로잡은 글로벌 패션 아이콘의 스타일링 비하인드와 비전",
    "category": "EXCLUSIVE INTERVIEW",
    "readTime": "7 min read",
    "coverImage": "/images/MMG0176.jpg",
    "author": "Chief Editor 김도연",
    "date": "2026.03.18",
    "excerpt": "2026년 인플레어 매거진 핫100 1위이자 메인 커버 스타로 선정된 Master A와의 독점 인터뷰.",
    "contentBlocks": [
      {
        "type": "paragraph",
        "text": "카메라 렌즈 앞에서 강렬한 카리스마와 섬세한 감성을 오가는 Master A(Nguyen Ngoc An)."
      },
      {
        "type": "heading",
        "text": "1. 한계 없는 스타일 도전과 진정성"
      },
      {
        "type": "paragraph",
        "text": "“모든 컷마다 저만의 열정과 진정성을 담아내는 것이 제가 추구하는 룩북의 본질입니다.”"
      },
      {
        "type": "quote",
        "text": "“패션과 비주얼은 국경을 초월해 사람들의 마음을 연결하는 강력한 언어입니다.”",
        "author": "Master A (Nguyen Ngoc An)"
      }
    ],
    "relatedInfluencerIds": [
      "inf-master-a"
    ],
    "tags": [
      "커버스토리",
      "Master A",
      "Nguyen Ngoc An",
      "패션 룩북",
      "핫100 1위"
    ],
    "views": 89400,
    "likes": 5420
  },
  {
    "id": "art-new-1788810072333",
    "title": "2026 GIE 글로벌인플루언서엑스포 양재aT센터",
    "subtitle": "10월9일~11일",
    "category": "INDUSTRY INSIGHT",
    "readTime": "5 min read",
    "coverImage": "/images/14.jpg",
    "author": "INFLARE 매거진 편집국",
    "date": "2026.09.07",
    "excerpt": "3000명의 국내 인플루언서와 500명의 해외 인플루언서 초청",
    "contentBlocks": [
      {
        "type": "paragraph",
        "text": "2026년 10월 9일부터 11일까지 서울 양재 aT센터에서 개최되는 GIE 글로벌인플루언서엑스포."
      },
      {
        "type": "heading",
        "text": "1. 글로벌 인플루언서와 브랜드의 대축제"
      },
      {
        "type": "paragraph",
        "text": "3000명의 국내 정상급 크리에이터와 500명의 해외 인플루언서들이 참여하여 글로벌 비즈니스와 매칭을 진행합니다."
      }
    ],
    "relatedInfluencerIds": [],
    "tags": [
      "2026 트렌드",
      "인플루언서 매거진",
      "핫이슈",
      "글로벌인플루언서엑스포"
    ],
    "views": 48200,
    "likes": 1940
  },
  {
    "id": "art-01",
    "title": "2026 K-인플루언서 이코노미 리포트: 숏폼 커머스와 버추얼의 결합",
    "subtitle": "조회수 중심에서 실질 구매 전환(CVR)으로 이동하는 인플루언서 마케팅 패러다임 분석",
    "category": "INDUSTRY INSIGHT",
    "readTime": "6 min read",
    "coverImage": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    "author": "INFLARE Research Lab (수석 연구원 배준성)",
    "date": "2026.03.15",
    "excerpt": "단순 팔로워 수의 거품이 꺼지고 고관여 팬덤을 보유한 마이크로·메가 인플루언서의 ROI가 각광받는 2026년 크리에이터 시장의 핵심 지표를 심층 분석합니다.",
    "contentBlocks": [
      {
        "type": "paragraph",
        "text": "2026년 국내 인플루언서 마케팅 시장 규모는 3조 2,000억 원을 돌파하며 전통 디지털 광고 시장을 빠르게 재편하고 있습니다."
      }
    ],
    "relatedInfluencerIds": [
      "inf-01",
      "inf-02",
      "inf-03"
    ],
    "tags": [
      "인플루언서 마케팅",
      "ROI 지표",
      "2026 트렌드"
    ],
    "views": 48200,
    "likes": 1940
  }
];
export const INITIAL_ARTICLES = MAGAZINE_ARTICLES;
