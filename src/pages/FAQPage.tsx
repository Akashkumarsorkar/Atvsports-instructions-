import { useState, useMemo } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, Search, ShieldCheck, ExternalLink } from 'lucide-react';

interface FAQPageProps {
  faqs: FAQItem[];
}

export function FAQPage({ faqs }: FAQPageProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
    'faq-3': true,
  });
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Installation', 'Compatibility', 'Troubleshooting'];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesQuery =
        !search.trim() ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [faqs, selectedCategory, search]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Factual Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
          Everything you need to know about downloading, installing, updating, and configuring the ATV Sports platform.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs by question or keyword..."
            className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-neutral-400">
            <p className="text-sm font-semibold text-white">No questions match your query</p>
            <p className="text-xs mt-1">Try searching for generic terms like "download", "APK", or "TV".</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/70 border border-neutral-800 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 text-neutral-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-red-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {faq.answer.includes('https://atvsports.site/') && (
                      <div className="mt-3">
                        <a
                          href="https://atvsports.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300"
                        >
                          <span>Open official portal (atvsports.site)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Official Help Banner */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-neutral-300">
            Have a question not listed here? Visit the primary portal or get in touch with our editorial guides desk.
          </p>
        </div>
        <a
          href="https://atvsports.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-md shadow-red-950"
        >
          <span>Official ATV Sports Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
