import { useState } from 'react';
import { PageView } from '../types';
import { Search, Menu, X, Sun, Moon, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { ATVSportsLogo } from './ATVSportsLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, slug?: string) => void;
  onOpenSearch: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks: { label: string; page: PageView }[] = [
    { label: t.navHome, page: 'home' },
    { label: t.navLatest, page: 'latest' },
    { label: t.navUpdates, page: 'app-updates' },
    { label: t.navGuides, page: 'guides' },
    { label: t.navSports, page: 'sports' },
    { label: t.navFaq, page: 'faq' },
    { label: t.navAbout, page: 'about' },
  ];

  const handleLinkClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 bg-neutral-950/90 border-neutral-800/80 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Official ATV Sports Logo Button */}
        <button
          id="nav-logo-btn"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl p-1"
          title="ATV Sports Home"
        >
          <ATVSportsLogo size="md" showTagline={false} />
          <span className="hidden sm:inline-flex bg-red-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-widest self-center shadow-sm shadow-red-950/40">
            BLOG
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                id={`nav-link-${link.page}`}
                onClick={() => handleLinkClick(link.page)}
                className={`px-3 py-2 rounded-lg transition-all duration-150 relative ${
                  isActive
                    ? 'text-white font-semibold bg-neutral-800/70 shadow-inner'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Multi-language Selector */}
          <LanguageSelector />

          {/* Search Button */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all text-xs font-medium"
            title={t.navSearchPlaceholder}
          >
            <Search className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline">{t.navLatest === 'Latest' ? 'Search' : t.catAll === 'সব' ? 'অনুসন্ধান' : 'Buscar'}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-800 text-neutral-400 rounded border border-neutral-700">
              ⌘K
            </kbd>
          </button>

          {/* Theme Switcher */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-300" />}
          </button>

          {/* Download ATV Sports Button */}
          <a
            id="nav-download-btn"
            href="https://atvsports.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-950/60 hover:shadow-red-900/80 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t.navDownload}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="p-3 bg-neutral-900/80 border border-neutral-800/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official ATV Sports Publication</span>
            </div>
            <span className="text-[11px] text-red-400 font-mono">atvsports.site</span>
          </div>

          <div className="flex items-center justify-between px-1 py-1">
            <span className="text-xs text-neutral-400 font-medium">{t.navLanguage}:</span>
            <LanguageSelector />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`mobile-nav-${link.page}`}
                  onClick={() => handleLinkClick(link.page)}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                    isActive
                      ? 'bg-red-950/50 text-red-300 font-semibold border border-red-900/50'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              id="mobile-nav-contact"
              onClick={() => handleLinkClick('contact')}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                currentPage === 'contact'
                  ? 'bg-red-950/50 text-red-300 font-semibold border border-red-900/50'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {t.navContact}
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <a
              id="mobile-download-btn"
              href="https://atvsports.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md"
            >
              <span>{t.navDownload}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
