import { useState } from 'react';
import { Article, PageView } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { SEOHead } from '../components/SEOHead';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Info,
} from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onNavigate: (page: PageView) => void;
}

export function ArticleDetailPage({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  onNavigate,
}: ArticleDetailPageProps) {
  const [copied, setCopied] = useState(false);

  // Compute current article index among all 5 articles
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Other related articles (the rest of the 5 articles)
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://atvsports.site/${article.slug}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareX = () => {
    const text = encodeURIComponent(`${article.title} — ATV Sports`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title}: ${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <>
      <SEOHead
        title={`${article.title} — ATV Sports`}
        description={article.description}
        canonicalUrl={`https://atvsports.site/${article.slug}`}
        ogType="article"
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400 mb-6 flex-wrap">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <button
            onClick={() => onNavigate('guides')}
            className="hover:text-white transition-colors"
          >
            Guides
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-red-400 font-medium">{article.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 hidden sm:inline" />
          <span className="text-neutral-500 truncate max-w-xs hidden sm:inline">
            {article.number} — {article.title}
          </span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <button
            id="article-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to All Guides</span>
          </button>
        </div>

        {/* Hero Typography Header (NO PHOTOS) */}
        <div className="rounded-3xl bg-neutral-950 border border-neutral-800/90 p-6 sm:p-10 lg:p-12 mb-10 relative overflow-hidden shadow-2xl">
          {/* Ambient Lighting & Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Top Bar: Number Tag & Category */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>Official ATV Guide</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  {article.publishedAt}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Dynamic Large Article Number & Keyword */}
            <div className="pt-2 flex items-baseline gap-4">
              <span className="text-5xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
                {article.number}
              </span>
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-black tracking-[0.3em] text-red-500 uppercase block">
                  {article.headerWord}
                </span>
                <span className="text-xs text-neutral-500 font-mono hidden sm:inline-block">
                  ATV Sports Verified Instruction
                </span>
              </div>
            </div>

            {/* Large Typography Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
              {article.title}
            </h1>

            {/* Short Bengali Description */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal max-w-3xl">
              {article.description}
            </p>

            {/* Share & Verification Ribbon */}
            <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified help center article for official ATV Sports app users</span>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 mr-1 flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5 text-red-500" />
                  Share:
                </span>
                <button
                  id="share-copy-link-btn"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <span>Copy Link</span>
                  )}
                </button>
                <button
                  id="share-x-btn"
                  onClick={handleShareX}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  X
                </button>
                <button
                  id="share-whatsapp-btn"
                  onClick={handleShareWhatsApp}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Steps Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* HTML Content */}
            <div
              className="prose prose-invert prose-red max-w-none text-neutral-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="pt-6 border-t border-neutral-800/80 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-neutral-500 font-medium">Keywords:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-neutral-900 text-neutral-300 px-3 py-1 rounded-lg border border-neutral-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Previous / Next Article Navigation */}
            <div className="pt-8 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle.slug)}
                  className="p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-red-600/40 text-left transition-all duration-300 group"
                >
                  <span className="text-xs text-neutral-500 group-hover:text-red-400 transition-colors flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Previous Guide ({prevArticle.number})
                  </span>
                  <p className="text-sm font-bold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                    {prevArticle.title}
                  </p>
                </button>
              ) : (
                <div />
              )}

              {nextArticle && (
                <button
                  onClick={() => onSelectArticle(nextArticle.slug)}
                  className="p-5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-red-600/40 text-right transition-all duration-300 group sm:col-start-2"
                >
                  <span className="text-xs text-neutral-500 group-hover:text-red-400 transition-colors flex items-center justify-end gap-1 mb-1">
                    Next Guide ({nextArticle.number})
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm font-bold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                    {nextArticle.title}
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Sticky Sidebar: Fast Navigation & Official Link */}
          <div className="lg:col-span-4 space-y-6">
            {/* Official Website Quick Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>Official Download Source</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                নিরাপত্তার স্বার্থে সর্বদা ATV Sports-এর অফিশিয়াল পোর্টাল থেকে ডাউনলোড এবং আপডেট করুন।
              </p>
              <a
                href="https://atvsports.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-red-950"
              >
                <span>Visit atvsports.site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* All 5 Guides Navigation */}
            <div className="p-6 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>All ATV Sports Guides</span>
              </h3>
              <div className="space-y-2">
                {allArticles.map((art) => {
                  const isCurrent = art.id === article.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => onSelectArticle(art.slug)}
                      className={`w-full p-3 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-red-600/20 border border-red-500/40 text-white font-bold'
                          : 'bg-neutral-950/60 hover:bg-neutral-800 border border-neutral-800/60 text-neutral-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-red-400' : 'text-neutral-500'}`}>
                          {art.number}
                        </span>
                        <span className="truncate">{art.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-red-400' : 'text-neutral-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Related Guides Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-800/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">More Instructions</p>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Related ATV Sports Guides
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={onSelectArticle}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
