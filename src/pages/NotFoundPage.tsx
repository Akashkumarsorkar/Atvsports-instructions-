import { PageView } from '../types';
import { Tv, ArrowLeft, Search, Home, BookOpen, ExternalLink } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageView) => void;
  onOpenSearch: () => void;
}

export function NotFoundPage({ onNavigate, onOpenSearch }: NotFoundPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-8">
      <div className="w-20 h-20 rounded-3xl bg-red-600/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
        <Tv className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="font-mono text-sm font-bold text-red-500 tracking-widest uppercase bg-red-950/50 px-3 py-1 rounded-md border border-red-900/50">
          Error 404 &bull; Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Fixture Or Guide Out Of Bounds
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          The sports article, release log, or installation guide you requested may have moved or is temporarily unavailable.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          id="notfound-home-btn"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          id="notfound-search-btn"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-sm font-semibold transition-all"
        >
          <Search className="w-4 h-4 text-red-500" />
          <span>Search Website</span>
        </button>
      </div>

      <div className="pt-8 border-t border-neutral-800/80 max-w-lg mx-auto">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
          Popular Resources
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onNavigate('guides')}
            className="p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-left text-neutral-300 hover:text-white transition-colors flex items-center justify-between"
          >
            <span>Installation Guides</span>
            <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
          </button>
          <a
            href="https://atvsports.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-left text-neutral-300 hover:text-white transition-colors flex items-center justify-between"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>
      </div>
    </div>
  );
}
