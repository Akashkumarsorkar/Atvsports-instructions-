import { useState, useMemo, useEffect } from 'react';
import { Article, PageView } from '../types';
import { Search, X, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onNavigate: (page: PageView) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Search ONLY the 5 articles with full Bengali & English keyword support
  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return articles; // Show all 5 by default if nothing typed yet

    return articles.filter((art) => {
      const matchTitle = art.title.toLowerCase().includes(trimmed);
      const matchDesc = art.description.toLowerCase().includes(trimmed);
      const matchHeader = art.headerWord.toLowerCase().includes(trimmed);
      const matchNumber = art.number.toLowerCase().includes(trimmed);
      const matchCat = art.category.toLowerCase().includes(trimmed);
      const matchTags = art.tags.some((t) => t.toLowerCase().includes(trimmed));
      const matchSteps = art.steps?.some((s) => s.text.toLowerCase().includes(trimmed) || (s.title && s.title.toLowerCase().includes(trimmed)));
      const matchContent = art.content.toLowerCase().includes(trimmed);

      return matchTitle || matchDesc || matchHeader || matchNumber || matchCat || matchTags || matchSteps || matchContent;
    });
  }, [articles, query]);

  if (!isOpen) return null;

  const popularKeywords = [
    'ডাউনলোড',
    'খেলা',
    'আপডেট',
    'PC',
    'laptop',
    'emulator',
    'কম data',
    'download',
    'update',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides (e.g., ডাউনলোড, খেলা, update, PC, emulator, কম data)..."
            autoFocus
            className="flex-1 bg-transparent text-white text-base sm:text-lg placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-3 border-b border-neutral-800/80 bg-neutral-950/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-neutral-500 uppercase shrink-0">
            Quick search:
          </span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="px-2.5 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-800 transition-colors shrink-0"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 space-y-2">
              <Sparkles className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-sm font-semibold text-white">কোনো ফলাফল পাওয়া যায়নি</p>
              <p className="text-xs text-neutral-500">
                অন্য কোনো শব্দ বা কিওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।
              </p>
            </div>
          ) : (
            results.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art.slug);
                  onClose();
                }}
                className="group p-4 rounded-2xl bg-neutral-950/60 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-red-600/40 cursor-pointer transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-black border border-neutral-800 flex flex-col items-center justify-center shrink-0 group-hover:border-red-500/40 transition-colors">
                    <span className="font-mono text-sm font-bold text-white group-hover:text-red-400">
                      {art.number}
                    </span>
                    <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">
                      {art.headerWord.split(' ')[0]}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-600/10 text-red-400 border border-red-500/20">
                        {art.category}
                      </span>
                      <span className="text-[11px] text-neutral-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors truncate">
                      {art.number} — {art.title}
                    </h4>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {art.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-400 shrink-0 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-center text-xs text-neutral-500">
          Showing verified guides for official ATV Sports app users
        </div>
      </div>
    </div>
  );
}
