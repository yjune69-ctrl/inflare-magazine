export type CreatorCategory =
  | 'All'
  | 'Fashion & Style'
  | 'Beauty & Skincare'
  | 'Tech & Gadget'
  | 'Lifestyle & Vlog'
  | 'Fitness & Health'
  | 'Food & Mukbang'
  | 'Travel & Adventure'
  | 'Gaming & Anime'
  | 'Culture & Art';

export type CreatorPlatform = 'Instagram' | 'YouTube' | 'TikTok' | 'Chzzk';

export interface InfluencerInterviewSection {
  question: string;
  answer: string;
  highlightQuote?: string;
  imageIndex?: number;
}

export interface InfluencerInterview {
  headline: string;
  subtitle: string;
  date: string;
  editor: string;
  leadParagraph: string;
  sections: InfluencerInterviewSection[];
  behindTheScenes?: string;
  favoriteBrands?: string[];
  upcomingProjects?: string;
  audioDuration?: string;
}

export interface MatchingProfile {
  estimatedCostPerPost: string; // e.g. "₩3,500,000 ~ ₩5,000,000"
  minBudget: number; // in KRW
  preferredCampaignTypes: string[];
  brandFitIndustries: string[];
  responseRate: string; // e.g. "98%"
  avgTurnaroundTime: string; // e.g. "3~5일"
  liveCommerceAvailable: boolean;
  globalCampaignReady: boolean;
}

export interface AudienceDemographics {
  ageBreakdown: {
    '18-24': number;
    '25-34': number;
    '35-44': number;
    '45+': number;
  };
  genderBreakdown: {
    female: number;
    male: number;
  };
  topRegions: string[];
}

export interface Influencer {
  id: string;
  rank: number;
  previousRank: number; // 0 for NEW, or previous number
  name: string;
  koreanName: string;
  handle: string;
  category: CreatorCategory;
  avatar: string;
  coverImage: string;
  galleryImages: string[];
  bio: string;
  oneLinerQuote: string;
  
  // Metrics
  metrics: {
    followersTotal: number; // raw total number
    instagramFollowers?: number;
    youtubeSubscribers?: number;
    tiktokFollowers?: number;
    engagementRate: number; // e.g. 5.8 (%)
    avgViews: number;
    avgLikes: number;
    score: number; // HOT 100 Index Score 0-100
    growthRateMonthly: number; // e.g. +14.2 (%)
  };

  badges: string[];
  verified: boolean;
  hasExclusiveInterview: boolean;

  pictorialConcept?: string;
  pictorialCredits?: string;
  audience: AudienceDemographics;
  interview: InfluencerInterview;
  matchingProfile: MatchingProfile;

  contact: {
    email: string;
    agency?: string;
    officialSite?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
  };

  createdAt?: string;
  updatedAt?: string;
}

export interface MagazineArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  coverImage: string;
  author: string;
  date: string;
  excerpt: string;
  contentBlocks: Array<{
    type: 'paragraph' | 'heading' | 'quote' | 'image';
    text?: string;
    author?: string;
    imageUrl?: string;
    caption?: string;
  }>;
  relatedInfluencerIds: string[];
  tags: string[];
  views: number;
  likes: number;
}

export interface CampaignInquiry {
  id: string;
  brandName: string;
  contactPerson: string;
  email: string;
  phone: string;
  budgetRange: string;
  targetCategory: string;
  targetPlatforms: string[];
  selectedInfluencerIds: string[];
  campaignGoal: string;
  campaignType: string;
  campaignBrief: string;
  targetDate: string;
  createdAt: string;
  status: 'submitted' | 'in_review' | 'matched' | 'completed';
}

export type ViewTab = 'hot100' | 'magazine' | 'matcher' | 'editorial' | 'creator_studio' | 'campaigns';
