import { useState, useMemo } from 'react';
import { Article, ArticleCategory } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { Search, Sparkles, BookOpen } from 'lucide-react';

interface ArticlesPageProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  initialCategory?: ArticleCategory | 'All';
}

export function ArticlesPage({
  articles,
  onSelectArticle,
  initialCategory = 'All',
}: ArticlesPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<ArticleCategory | 'All'>(initialCategory);

  const categories: (ArticleCategory | 'All')[] = [
    'All',
    'Guides',
    'Sports',
    'App Updates',
    'Troubleshooting',
  ];

  const filtered = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    return articles.filter((art) => {
      const matchesCat = selectedCat === 'All' || art.category === selectedCat;
      const matchesSearch =
        !trimmed ||
        art.title.toLowerCase().includes(trimmed) ||
        art.description.toLowerCase().includes(trimmed) ||
        art.headerWord.toLowerCase().includes(trimmed) ||
        art.number.toLowerCase().includes(trimmed) ||
        art.tags.some((t) => t.toLowerCase().includes(trimmed));
      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCat, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Help Center Archives</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ATV Sports অফিশিয়াল গাইড ও টিউটোরিয়াল
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          নিচের ৫টি নির্দেশিকা থেকে ডাউনলোড, খেলা দেখার নিয়ম, আপডেট পদ্ধতি, এমুলেটর এবং ডেটা সাশ্রয় সংক্রান্ত তথ্য জানুন।
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Quick Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keywords (e.g., download, ডাউনলোড, খেলা, update, PC, data)..."
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <span className="text-xs text-neutral-400 font-mono">
            Showing {filtered.length} of {articles.length} Guides
          </span>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-neutral-800/80 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-3">
          <Sparkles className="w-8 h-8 text-neutral-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">কোনো গাইড পাওয়া যায়নি</h3>
          <p className="text-sm text-neutral-400">
            অনুগ্রহ করে অন্য কোনো শব্দ বা কিওয়ার্ড দিয়ে অনুসন্ধান করুন।
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCat('All');
            }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold mt-2"
          >
            সব গাইড দেখুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onSelect={onSelectArticle}
              variant="standard"
            />
          ))}
        </div>
      )}
    </div>
  );
}
