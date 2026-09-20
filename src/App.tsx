/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageView } from './types';
import { ARTICLES_DATA } from './data/articles';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SEOHead } from './components/SEOHead';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { GuidesPage } from './pages/GuidesPage';
import { SportsPage } from './pages/SportsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThreeDBackground } from './components/ThreeDBackground';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Handle URL path parsing on initial load and back/forward navigation
  useEffect(() => {
    const parseLocation = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (!path) {
        setCurrentPage('home');
        setSelectedSlug(null);
        return;
      }

      if (path === 'latest') {
        setCurrentPage('latest');
        setSelectedSlug(null);
      } else if (path === 'app-updates') {
        setCurrentPage('app-updates');
        setSelectedSlug(null);
      } else if (path === 'guides') {
        setCurrentPage('guides');
        setSelectedSlug(null);
      } else if (path === 'sports') {
        setCurrentPage('sports');
        setSelectedSlug(null);
      } else if (path === 'about') {
        setCurrentPage('about');
        setSelectedSlug(null);
      } else if (path === 'contact') {
        setCurrentPage('contact');
        setSelectedSlug(null);
      } else if (path.startsWith('article/') || path.startsWith('guides/')) {
        const slug = path.split('/')[1];
        const match = ARTICLES_DATA.find((a) => a.slug === slug);
        if (match) {
          setCurrentPage('article');
          setSelectedSlug(match.slug);
        } else {
          setCurrentPage('404');
        }
      } else {
        // Direct clean slug matching (e.g. /how-to-download-atv-sports)
        const match = ARTICLES_DATA.find((a) => a.slug === path);
        if (match) {
          setCurrentPage('article');
          setSelectedSlug(match.slug);
        } else {
          setCurrentPage('404');
        }
      }
    };

    parseLocation();
    window.addEventListener('popstate', parseLocation);
    return () => window.removeEventListener('popstate', parseLocation);
  }, []);

  // Sync theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Global keyboard shortcut for search (Cmd+K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page: PageView, slug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setSelectedSlug(slug);
      window.history.pushState({}, '', `/${slug}`);
    } else {
      setSelectedSlug(null);
      const newPath = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    navigateTo('article', slug);
  };

  // Find active article if on detail page
  const activeArticle = selectedSlug
    ? ARTICLES_DATA.find((a) => a.slug === selectedSlug)
    : null;

  // SEO metadata determination based on active view
  const getSEOProps = () => {
    if (currentPage === 'article' && activeArticle) {
      return {
        title: `${activeArticle.title} — ATV Sports`,
        description: activeArticle.description,
        canonicalUrl: `https://atvsports.site/${activeArticle.slug}`,
        ogType: 'article',
        ogImage: '/brand_logo.png',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: activeArticle.title,
          description: activeArticle.description,
          datePublished: activeArticle.publishedAt,
          publisher: {
            '@type': 'Organization',
            name: 'ATV Sports',
            url: 'https://atvsports.site/',
          },
        },
      };
    }

    if (currentPage === 'guides') {
      return {
        title: 'ATV Sports অফিশিয়াল গাইড ও টিউটোরিয়াল — ATV Sports',
        description: 'ATV Sports ডাউনলোড, ইনস্টলেশন, লেটেস্ট আপডেট, পিসি এমুলেটর এবং ডেটা সাশ্রয়ী স্ট্রিমিংয়ের সহজ বাংলা গাইড।',
        canonicalUrl: 'https://atvsports.site/guides',
      };
    }

    if (currentPage === 'app-updates') {
      return {
        title: 'ATV Sports Latest App Update — ATV Sports',
        description: 'ATV Sports-এর নতুন সংস্করণ প্রকাশ হলে তা নিরাপদভাবে সংগ্রহ ও আপডেট করার অফিশিয়াল নির্দেশিকা।',
        canonicalUrl: 'https://atvsports.site/app-updates',
      };
    }

    if (currentPage === 'sports') {
      return {
        title: 'ATV Sports-এ লাইভ খেলা দেখার নিয়ম — ATV Sports',
        description: 'ATV Sports অ্যাপ ইনস্টল করার পর স্পোর্টস বা লাইভ সেকশন থেকে প্রিয় খেলা এবং স্ট্রিম দেখার সহজ ও সঠিক পদ্ধতি।',
        canonicalUrl: 'https://atvsports.site/sports',
      };
    }

    if (currentPage === 'about') {
      return {
        title: 'About ATV Sports Help Center — Official Platform Resource',
        description: 'Learn about ATV Sports verified user guides, installation tutorials, and link to the official ATV Sports platform.',
        canonicalUrl: 'https://atvsports.site/about',
      };
    }

    if (currentPage === 'contact') {
      return {
        title: 'Contact Editorial Desk — ATV Sports',
        description: 'Contact the ATV Sports verified help center support desk.',
        canonicalUrl: 'https://atvsports.site/contact',
      };
    }

    // Default Home
    return {
      title: 'ATV Sports Blog — অফিশিয়াল গাইড ও টিউটোরিয়াল',
      description: 'ATV Sports অ্যাপ ডাউনলোড, লাইভ খেলা দেখার নিয়ম, লেটেস্ট আপডেট এবং পারফরম্যান্স সংক্রান্ত সহজ বাংলা নির্দেশিকা।',
      canonicalUrl: 'https://atvsports.site/',
      ogType: 'website',
      ogImage: '/brand_logo.png',
    };
  };

  const seoProps = getSEOProps();

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 relative ${
      theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'
    }`}>
      {/* Dynamic SEO & Meta Injector */}
      <SEOHead {...seoProps} />

      {/* 3D Moving Animation Background Canvas */}
      <ThreeDBackground theme={theme} />

      {/* Header & Navigation */}
      <div className="relative z-20">
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenSearch={() => setSearchOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        {currentPage === 'home' && (
          <HomePage
            articles={ARTICLES_DATA}
            onSelectArticle={handleSelectArticle}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'latest' && (
          <ArticlesPage
            articles={ARTICLES_DATA}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPage === 'article' && activeArticle && (
          <ArticleDetailPage
            article={activeArticle}
            allArticles={ARTICLES_DATA}
            onBack={() => navigateTo('guides')}
            onSelectArticle={handleSelectArticle}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'app-updates' && (
          <UpdatesPage
            onSelectArticle={handleSelectArticle}
            articles={ARTICLES_DATA}
          />
        )}

        {currentPage === 'guides' && (
          <GuidesPage
            articles={ARTICLES_DATA}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPage === 'sports' && (
          <SportsPage
            articles={ARTICLES_DATA}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentPage === 'contact' && <ContactPage />}

        {(currentPage === '404' || (currentPage === 'article' && !activeArticle)) && (
          <NotFoundPage
            onNavigate={navigateTo}
            onOpenSearch={() => setSearchOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onNavigate={navigateTo}
        />
      </div>

      {/* Site-Wide Search Modal - ONLY searches the 5 articles */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES_DATA}
        onSelectArticle={handleSelectArticle}
        onNavigate={navigateTo}
      />
    </div>
  );
}
