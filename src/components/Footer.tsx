import { PageView } from '../types';
import { ExternalLink, Shield, ArrowUp } from 'lucide-react';
import { ATVSportsLogo } from './ATVSportsLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 mt-20">
      {/* Top Banner: Official Link Highlights */}
      <div className="border-b border-neutral-800/80 bg-neutral-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Official ATV Sports Ecosystem</p>
              <p className="text-xs text-neutral-400">Download verified APKs, release notes, and server alerts from the official source.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <a
              id="footer-official-site-cta"
              href="https://atvsports.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-100 hover:text-white text-xs font-semibold border border-neutral-700 transition-colors"
            >
              <span>{t.visitOfficialSite}</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand Col with Official Emblem */}
          <div className="space-y-4">
            <button
              onClick={() => { onNavigate('home'); scrollToTop(); }}
              className="text-left focus:outline-none"
            >
              <ATVSportsLogo size="md" showTagline={true} />
            </button>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t.aboutAtvText}
            </p>
            <div className="text-xs text-neutral-400 pt-2 space-y-1">
              <p className="font-medium text-neutral-300">{t.officialPortal}</p>
              <a
                href="https://atvsports.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline font-mono text-xs break-all"
              >
                https://atvsports.site/
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4">
              {t.latestArticlesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-latest"
                  onClick={() => { onNavigate('latest'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  {t.navLatest}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-guides"
                  onClick={() => { onNavigate('guides'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  {t.navGuides}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-updates"
                  onClick={() => { onNavigate('app-updates'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  {t.navUpdates}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-sports"
                  onClick={() => { onNavigate('sports'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  {t.navSports}
                </button>
              </li>
            </ul>
          </div>

          {/* Core Resources & Guides */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200 mb-4">
              {t.allGuidesTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('guides'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left line-clamp-1"
                >
                  How to Download ATV Sports
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('guides'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left line-clamp-1"
                >
                  How to Install APK on Android
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('guides'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left line-clamp-1"
                >
                  Using ATV Sports on Android TV
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('guides'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left line-clamp-1"
                >
                  Troubleshooting Common Problems
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('guides'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left line-clamp-1"
                >
                  Supported Hardware Matrix
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 text-xs text-neutral-400 leading-relaxed">
          <p className="font-semibold text-neutral-300 mb-1">
            Editorial Disclosure &amp; Trademark Notice:
          </p>
          <p>{t.disclaimerText}</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-400">
            {t.copyrightText}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { onNavigate('about'); scrollToTop(); }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-neutral-700">&bull;</span>
            <button
              onClick={() => { onNavigate('about'); scrollToTop(); }}
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </button>
            <span className="text-neutral-700">&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
