import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { Trophy, Tv, Radio, ArrowRight, ExternalLink } from 'lucide-react';

interface SportsPageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export function SportsPage({ articles, onSelectArticle }: SportsPageProps) {
  // Sports guide is post-02
  const watchGuide = articles.find((a) => a.slug === 'how-to-watch-atv-sports') || articles[1];
  const otherGuides = articles.filter((a) => a.slug !== 'how-to-watch-atv-sports');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
          <Trophy className="w-3.5 h-3.5" />
          <span>স্পোর্টস ও লাইভ স্ট্রিমিং</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ATV Sports-এ লাইভ খেলা দেখার নিয়ম
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          মোবাইল বা ডিভাইসে ATV Sports অ্যাপ চালু করে পছন্দের ফুটবল, ক্রিকেট বা অন্যান্য স্পোর্টস লাইভ স্ট্রিম দেখার সহজ নির্দেশিকা।
        </p>
      </div>

      {/* Primary Sports Guide Banner */}
      {watchGuide && (
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-mono font-bold">
                Guide {watchGuide.number}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {watchGuide.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {watchGuide.title}
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed">
              {watchGuide.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectArticle(watchGuide.slug)}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-red-950"
              >
                <span>সম্পূর্ণ গাইড পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://atvsports.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>অফিসিয়াল সাইট ভিজিট করুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Other 4 Guides */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span>অন্যান্য সহায়ক গাইডসমূহ</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {otherGuides.map((guide) => (
            <ArticleCard
              key={guide.id}
              article={guide}
              onSelect={onSelectArticle}
              variant="standard"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
