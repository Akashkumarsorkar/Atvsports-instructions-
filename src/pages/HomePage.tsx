import { Article, PageView } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { SportsHeroAnimation } from '../components/SportsHeroAnimation';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onNavigate: (page: PageView) => void;
}

export function HomePage({
  articles,
  onSelectArticle,
}: HomePageProps) {
  const scrollToArticles = () => {
    const section = document.getElementById('five-guides-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. FULL SCREEN HERO (Approximately 100vh / min-h-[calc(100vh-4rem)]) */}
      <section className="relative w-full min-h-[calc(100vh-4.5rem)] flex flex-col justify-between overflow-hidden border-b border-neutral-800/80 bg-neutral-950">
        {/* Ambient Dark Cinematic Lighting Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* MAIN SCREEN: 50% LEFT / 50% RIGHT */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* LEFT SIDE — 50% OF SCREEN (Exact requested text with 3D heavy bold typography) */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 animate-text-float select-none">
              
              {/* ATVSPORTS; */}
              <div className="relative inline-block">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none text-3d-metallic text-metallic-sheen">
                  ATVSPORTS
                  <span className="text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] ml-1">;</span>
                </h1>
                
                {/* Subtle metallic reflection beam line beneath logo */}
                <div className="h-1 w-32 sm:w-48 bg-gradient-to-r from-red-600 via-white/80 to-transparent rounded-full mt-3 opacity-80" />
              </div>

              {/* the most popular app for watching live sports and TV channel */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-extrabold text-neutral-200 tracking-tight leading-tight max-w-xl">
                the most popular app for watching live sports and TV channel
              </p>

            </div>

            {/* RIGHT SIDE — LIVE SPORTS ANIMATION (50% OF SCREEN) */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <div className="w-full max-w-lg lg:max-w-none">
                <SportsHeroAnimation />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM BAR: Minimal Sleek Horizontal Bar with READ MORE → */}
        <div className="w-full border-t border-neutral-800/90 bg-neutral-950/90 backdrop-blur-xl py-4 px-6 relative z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <button
              id="hero-read-more-btn"
              onClick={scrollToArticles}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-neutral-900/90 via-neutral-800/90 to-neutral-900/90 border border-neutral-700/80 hover:border-red-500/80 shadow-2xl shadow-black/80 hover:shadow-red-950/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              {/* Subtle glass reflection highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              
              <span className="text-xs sm:text-sm font-black tracking-widest text-white group-hover:text-red-400 transition-colors uppercase font-mono">
                READ MORE
              </span>
              <ArrowRight className="w-4 h-4 text-red-500 group-hover:text-red-400 transition-transform animate-arrow-nudge" />
            </button>
          </div>
        </div>

      </section>

      {/* 2. THE 5 EXISTING ARTICLES SECTION (Opened / scrolled to via READ MORE) */}
      <section id="five-guides-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Verified Help Center Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              ATV Sports অফিশিয়াল গাইড ও টিউটোরিয়াল
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
              ডাউনলোড, লাইভ খেলা দেখা, লেটেস্ট আপডেট, পিসি এমুলেটর এবং ডেটা সাশ্রয়ী স্ট্রিমিংয়ের সহজ বাংলা গাইড।
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl">
              5 Essential Guides
            </span>
          </div>
        </div>

        {/* The 5 Typography-Based Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onSelect={onSelectArticle}
              variant="standard"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
