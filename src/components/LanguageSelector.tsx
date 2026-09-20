import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '../i18n/translations';

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, currentLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="language-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
          isOpen
            ? 'bg-red-600/15 text-red-400 border-red-500/40 shadow-sm shadow-red-950/50'
            : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border-neutral-700/80 hover:border-neutral-600'
        }`}
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <span className="text-sm leading-none" role="img" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        {!compact && (
          <span className="font-medium tracking-wide">
            {currentLanguage.nativeName}
          </span>
        )}
        <Globe className="w-3.5 h-3.5 text-neutral-400" />
        <ChevronDown
          className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-red-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-44 rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl shadow-black/80 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-800/80 mb-1">
            Select Language / ভাষা
          </div>
          {availableLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                id={`lang-opt-${lang.code}`}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                  isSelected
                    ? 'bg-red-600/20 text-red-400 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-800/80 hover:text-white'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <div>
                    <span className="block">{lang.nativeName}</span>
                    <span className="block text-[10px] text-neutral-500">{lang.name}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
