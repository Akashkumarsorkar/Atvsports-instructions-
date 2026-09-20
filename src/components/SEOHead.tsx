import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
}

export function SEOHead({
  title = 'ATV Sports Blog — Updates, Guides & Sports Tech Content',
  description = 'Discover official ATV Sports updates, app guides, features, troubleshooting tips and original sports technology content in one place.',
  canonicalUrl = 'https://atvsports.site/',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&h=630&q=80',
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set/update meta tag
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let elem = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(attr, key);
        document.head.appendChild(elem);
      }
      elem.content = content;
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', ogImage);

    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 3. Update Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // 4. Inject Dynamic Structured Data if provided
    const scriptId = 'page-structured-data';
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (structuredData) {
      if (!scriptElem) {
        scriptElem = document.createElement('script');
        scriptElem.id = scriptId;
        scriptElem.type = 'application/ld+json';
        document.head.appendChild(scriptElem);
      }
      scriptElem.textContent = JSON.stringify(structuredData);
    } else if (scriptElem) {
      scriptElem.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, structuredData]);

  return null;
}
