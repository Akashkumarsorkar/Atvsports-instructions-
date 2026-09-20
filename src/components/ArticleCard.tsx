import { Article } from '../types';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  variant?: 'standard' | 'compact' | 'featured';
}

export function ArticleCard({ article, onSelect, variant = 'standard' }: ArticleCardProps) {
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'App Updates':
        return {
          pill: 'bg-red-500/10 text-red-400 border-red-500/30',
          accent: 'from-red-600/20 to-red-950/40',
          glow: 'group-hover:border-red-600/60',
        };
      case 'Guides':
        return {
          pill: 'bg-red-500/10 text-red-400 border-red-500/30',
          accent: 'from-neutral-900 via-red-950/20 to-neutral-950',
          glow: 'group-hover:border-red-500/50',
        };
      case 'Sports':
        return {
          pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          accent: 'from-neutral-900 via-neutral-900 to-neutral-950',
          glow: 'group-hover:border-red-500/50',
        };
      case 'Troubleshooting':
        return {
          pill: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          accent: 'from-neutral-900 via-neutral-900 to-neutral-950',
          glow: 'group-hover:border-red-500/50',
        };
      default:
        return {
          pill: 'bg-neutral-800 text-neutral-300 border-neutral-700',
          accent: 'from-neutral-900 to-neutral-950',
          glow: 'group-hover:border-neutral-700',
        };
    }
  };

  const theme = getCategoryTheme(article.category);

  if (variant === 'compact') {
    return (
      <article
        id={`article-card-${article.slug}`}
        onClick={() => onSelect(article.slug)}
        className="group cursor-pointer rounded-2xl bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-800/80 hover:border-red-600/50 p-5 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start relative overflow-hidden"
      >
        {/* Compact Typography Header */}
        <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl bg-black border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden p-3 group-hover:border-red-500/40 transition-colors">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-600/15 rounded-full blur-xl group-hover:bg-red-600/30 transition-colors" />
          <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500 group-hover:text-red-400 transition-colors">
            {article.number}
          </span>
          <span className="text-[10px] font-black tracking-widest text-red-500 uppercase mt-1 text-center">
            {article.headerWord}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${theme.pill}`}>
              {article.category}
            </span>
            <span className="text-xs text-neutral-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {article.number} — {article.title}
          </h3>
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {article.description}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-red-400 group-hover:text-red-300">
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      id={`article-card-${article.slug}`}
      onClick={() => onSelect(article.slug)}
      className={`group cursor-pointer rounded-3xl bg-neutral-900/60 hover:bg-neutral-900/95 border border-neutral-800/90 ${theme.glow} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 relative overflow-hidden`}
    >
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-red-600/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-red-600/20 transition-all duration-500" />

      <div>
        {/* Dynamic Typography Visual Canvas (NO PHOTOS) */}
        <div className="w-full h-44 sm:h-48 rounded-2xl bg-black border border-neutral-800/90 group-hover:border-neutral-700 p-5 flex flex-col justify-between relative overflow-hidden mb-6 transition-all duration-300 shadow-inner">
          {/* Subtle Grid Line Pattern & Radial Accents */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-600/20 rounded-full blur-2xl group-hover:bg-red-600/35 transition-all duration-500" />
          <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-red-950/30 rounded-full blur-xl pointer-events-none" />

          {/* Top Row: Category & Status */}
          <div className="flex items-center justify-between relative z-10">
            <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.pill} backdrop-blur-sm`}>
              {article.category}
            </span>
            <span className="text-[11px] font-mono text-neutral-500 group-hover:text-red-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>ATV Help</span>
            </span>
          </div>

          {/* Center / Hero Typography: Dynamic Number & Header Word */}
          <div className="relative z-10 flex items-baseline justify-between pt-2">
            <div>
              <p className="text-[11px] sm:text-xs font-black tracking-[0.25em] text-red-500 uppercase mb-1">
                {article.headerWord}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 group-hover:from-white group-hover:to-red-200 transition-all duration-300">
                  {article.number}
                </span>
                <span className="text-xl sm:text-2xl font-light text-neutral-600 group-hover:text-red-500/60 transition-colors font-mono">
                  / 05
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-neutral-500 flex items-center gap-1.5 justify-end">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-red-400 transition-colors leading-snug mb-3">
          {article.number} — {article.title}
        </h3>

        {/* Short Bengali Description */}
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-6">
          {article.description}
        </p>
      </div>

      {/* Card Action / Footer */}
      <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
          <span>{article.publishedAt}</span>
        </div>

        {/* “Read Guide →” button */}
        <div
          id={`read-guide-btn-${article.number}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 group-hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-950/40 transition-all duration-300 transform group-hover:translate-x-1"
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
}
