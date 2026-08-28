import React, { useState, useMemo } from 'react';
import { MagazineArticle, Influencer } from '../types';
import { 
  BookOpen, 
  Clock, 
  User, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Heart, 
  Share2, 
  Check, 
  X, 
  MessageSquare, 
  TrendingUp, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  Tag, 
  Bookmark, 
  Filter,
  Lock,
  ShieldCheck
} from 'lucide-react';

interface EditorialSectionProps {
  articles: MagazineArticle[];
  influencers: Influencer[];
  onSelectInfluencer: (influencer: Influencer) => void;
  onOpenArticleEditor: (article?: MagazineArticle | null) => void;
  onDeleteArticle?: (id: string) => void;
  isAdmin?: boolean;
  onRequireAdmin?: (action: () => void, message?: string) => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  articles,
  influencers,
  onSelectInfluencer,
  onOpenArticleEditor,
  onDeleteArticle,
  isAdmin = false,
  onRequireAdmin
}) => {
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const handleCreateArticleClick = () => {
    if (isAdmin) {
      onOpenArticleEditor(null);
    } else if (onRequireAdmin) {
      onRequireAdmin(
        () => onOpenArticleEditor(null),
        '매거진 기사 작성 및 게제는 인플레어 편집국 인가 관리자만 가능합니다.'
      );
    } else {
      onOpenArticleEditor(null);
    }
  };

  const handleEditArticleClick = (art: MagazineArticle, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAdmin) {
      onOpenArticleEditor(art);
    } else if (onRequireAdmin) {
      onRequireAdmin(
        () => onOpenArticleEditor(art),
        '기사 수정 및 퇴고는 인플레어 편집국 관리자만 가능합니다.'
      );
    } else {
      onOpenArticleEditor(art);
    }
  };

  const handleDeleteArticleClick = (art: MagazineArticle, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!isAdmin) {
      if (onRequireAdmin) {
        onRequireAdmin(
          () => {
            if (confirm(`'${art.title}' 기사를 삭제하시겠습니까?`)) {
              onDeleteArticle?.(art.id);
            }
          },
          '기사 삭제 권한은 인플레어 편집국 최고 관리자에게만 부여됩니다.'
        );
      }
      return;
    }

    if (confirm(`'${art.title}' 기사를 삭제하시겠습니까?`)) {
      onDeleteArticle?.(art.id);
      if (selectedArticle?.id === art.id) {
        setSelectedArticle(null);
      }
    }
  };

  const categories = useMemo(() => {
    const list = Array.from(new Set(articles.map(a => a.category)));
    return ['All', ...list];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      const matchQuery = !searchQuery.trim() || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Editorial Hero Header */}
      <div className="bg-gradient-to-br from-[#1F1929] via-[#121620] to-[#0B0D12] p-6 sm:p-8 md:p-10 rounded-3xl border border-amber-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>INFLARE EDITORIAL & TREND ARCHIVE</span>
            {isAdmin && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                관리자 모드 활성
              </span>
            )}
          </div>

          <button
            type="button"
            id="btn-write-new-article"
            onClick={handleCreateArticleClick}
            className={`self-start sm:self-auto px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
              isAdmin
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/20'
                : 'bg-[#161B26] hover:bg-[#202838] text-amber-300 border border-amber-500/30'
            }`}
          >
            {isAdmin ? (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>+ 새 매거진 기사 작성하기</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>기사 작성 (관리자 인증 필요)</span>
              </>
            )}
          </button>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide">
          매거진 에디토리얼 & K-크리에이터 트렌드 리포트
        </h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          인플레어 전문 에디터와 데이터 리서치 랩이 기획한 크리에이터 이코노미 심층 분석, 알고리즘 트렌드, 그리고 독점 화보 스토리.
        </p>

        {/* Filter & Search Bar */}
        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-[#161B26] hover:bg-[#1f2636] text-slate-300 border border-white/10'
                }`}
              >
                {cat === 'All' ? '전체 기사' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="기사 제목, 태그, 키워드 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161B26] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Featured Lead Article */}
      {filteredArticles.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <div
          id={`article-lead-${filteredArticles[0].id}`}
          onClick={() => setSelectedArticle(filteredArticles[0])}
          className="group relative rounded-3xl bg-[#121620] hover:bg-[#161B26] border border-white/10 hover:border-amber-500/40 overflow-hidden cursor-pointer transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl"
        >
          <div className="lg:col-span-7 h-72 sm:h-96 w-full overflow-hidden relative">
            <img
              src={filteredArticles[0].coverImage}
              alt={filteredArticles[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black shadow-lg">
                {filteredArticles[0].category}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {filteredArticles[0].readTime}
              </span>
              <span>•</span>
              <span>{filteredArticles[0].date}</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-400 transition-colors leading-tight">
              {filteredArticles[0].title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
              {filteredArticles[0].subtitle}
            </p>
            <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
              {filteredArticles[0].excerpt}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-medium">
                {filteredArticles[0].author}
              </span>
              
              <div className="flex items-center gap-3">
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={(e) => handleEditArticleClick(filteredArticles[0], e)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/40 text-xs text-amber-300 flex items-center gap-1 cursor-pointer"
                    title="관리자: 기사 수정"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>수정</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleEditArticleClick(filteredArticles[0], e)}
                    className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer"
                    title="관리자 인증 후 수정"
                  >
                    <Lock className="w-3 h-3 text-slate-500" />
                    <span>편집국 전용</span>
                  </button>
                )}

                <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>리포트 전문 읽기</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(selectedCategory === 'All' && !searchQuery ? filteredArticles.slice(1) : filteredArticles).map((art) => {
          const isLiked = likedArticles[art.id];
          return (
            <div
              key={art.id}
              id={`article-card-${art.id}`}
              onClick={() => setSelectedArticle(art)}
              className="group rounded-2xl bg-[#121620] hover:bg-[#161B26] border border-white/10 hover:border-amber-500/30 overflow-hidden cursor-pointer transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/20">
                    {art.category}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(art.id, e)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                      isLiked ? 'bg-rose-500 text-white' : 'bg-black/60 text-white/80 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-white/5 mt-3">
                <span className="truncate max-w-[140px]">{art.author}</span>
                
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleEditArticleClick(art, e)}
                        className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer"
                        title="기사 수정 (관리자)"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {onDeleteArticle && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteArticleClick(art, e)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="기사 삭제 (관리자)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}

                  <span className="text-amber-400 font-semibold flex items-center gap-1 ml-1">
                    읽기 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-[#121620] rounded-3xl border border-white/10 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">해당 조건에 맞는 기사가 없습니다.</h3>
          <p className="text-xs text-slate-400">새로운 기사를 직접 작성하거나 검색어를 변경해보세요.</p>
          <button
            onClick={handleCreateArticleClick}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs cursor-pointer"
          >
            + 새 기사 작성하기
          </button>
        </div>
      )}

      {/* =========================================================================
          ARTICLE FULL DETAIL MODAL
      ========================================================================= */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E121A] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0E121A]/95 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">{selectedArticle.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <button
                    onClick={() => onOpenArticleEditor(selectedArticle)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>기사 수정</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditArticleClick(selectedArticle)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="관리자 인증 후 수정"
                  >
                    <Lock className="w-3 h-3 text-slate-500" />
                    <span>편집국 전용</span>
                  </button>
                )}

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors cursor-pointer"
                  title="기사 링크 복사"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-10 space-y-8 custom-scrollbar">
              <div className="space-y-3 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="text-amber-300 font-bold">{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h1 className="font-editorial text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {selectedArticle.title}
                </h1>
                {selectedArticle.subtitle && (
                  <p className="text-sm sm:text-base text-amber-200 font-medium">
                    {selectedArticle.subtitle}
                  </p>
                )}
                <div className="p-4 rounded-xl bg-[#161B26] border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  {selectedArticle.excerpt}
                </div>
              </div>

              {/* Cover Image */}
              {selectedArticle.coverImage && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src={selectedArticle.coverImage}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content Blocks */}
              <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans">
                {selectedArticle.contentBlocks.map((block, idx) => {
                  if (block.type === 'heading') {
                    return (
                      <h3 key={idx} className="font-editorial text-xl font-bold text-white pt-4 border-t border-white/5">
                        {block.text}
                      </h3>
                    );
                  }
                  if (block.type === 'quote') {
                    return (
                      <div key={idx} className="p-5 bg-amber-950/30 border-l-4 border-amber-400 rounded-r-2xl my-4 text-amber-200 italic font-medium text-sm sm:text-base">
                        {block.text}
                        {block.author && <div className="text-xs text-slate-400 not-italic mt-2">— {block.author}</div>}
                      </div>
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <div key={idx} className="space-y-2 my-6">
                        <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[480px]">
                          <img src={block.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        {block.caption && (
                          <p className="text-xs text-center text-slate-400 italic">
                            {block.caption}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed text-sm sm:text-base text-slate-300">
                      {block.text}
                    </p>
                  );
                })}
              </div>

              {/* Related Influencers Showcase */}
              {selectedArticle.relatedInfluencerIds && selectedArticle.relatedInfluencerIds.length > 0 && (
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>기사 연계 인플루언서 프로필 바로가기</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedArticle.relatedInfluencerIds.map((infId) => {
                      const found = influencers.find((i) => i.id === infId);
                      if (!found) return null;
                      return (
                        <div
                          key={found.id}
                          onClick={() => {
                            setSelectedArticle(null);
                            onSelectInfluencer(found);
                          }}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-[#161B26] hover:bg-[#1f2636] border border-white/10 hover:border-amber-500/40 cursor-pointer transition-all group"
                        >
                          <img src={found.avatar} alt="" className="w-11 h-11 rounded-xl object-cover" />
                          <div className="truncate flex-1">
                            <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                              {found.koreanName}
                            </div>
                            <div className="text-[11px] text-amber-400/90 truncate">{found.handle}</div>
                            <div className="text-[10px] text-slate-400">{found.category}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {selectedArticle.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

