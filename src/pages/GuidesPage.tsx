import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { BookOpen, Download, Smartphone, Monitor, ShieldCheck } from 'lucide-react';

interface GuidesPageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export function GuidesPage({ articles, onSelectArticle }: GuidesPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>অফিসিয়াল গাইডসমূহ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ATV Sports সেটআপ ও ব্যবহারের গাইড
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          মোবাইল, ল্যাপটপ বা কম্পিউটারে ATV Sports ডাউনলোড, ইনস্টলেশন, আপডেট এবং খেলা দেখার সম্পূর্ণ সহজ নির্দেশিকা।
        </p>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-400">নিরাপদ সোর্স</p>
            <p className="text-sm font-bold text-white">অফিসিয়াল APK</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-400">মাল্টি-ডিভাইস</p>
            <p className="text-sm font-bold text-white">মোবাইল ও PC Emulator</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-400">যাচাইকৃত তথ্য</p>
            <p className="text-sm font-bold text-white">সঠিক নির্দেশনা</p>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((guide) => (
          <ArticleCard
            key={guide.id}
            article={guide}
            onSelect={onSelectArticle}
            variant="standard"
          />
        ))}
      </div>
    </div>
  );
}
