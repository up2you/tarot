import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSelectorProps {
  currentLanguage: string;
  options: LanguageOption[];
  onLanguageChange: (code: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  options,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 點擊外部自動關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentOption = options.find((opt) => opt.code === currentLanguage) || options[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="選擇語言 / Select Language"
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1333]/80 border border-[#D4AF37]/40 text-gray-200 text-xs sm:text-sm font-medium hover:border-[#D4AF37] hover:bg-[#251A48]/80 hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all duration-300 backdrop-blur-md cursor-pointer"
      >
        <Globe className="w-4 h-4 text-[#D4AF37]" />
        <span>{currentOption?.label || '繁體中文'}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          role="listbox" 
          className="absolute right-0 mt-2 w-44 rounded-xl bg-[#140D28]/95 border border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="py-1">
            {options.map((opt) => {
              const isSelected = opt.code === currentLanguage;
              return (
                <button
                  key={opt.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onLanguageChange(opt.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors duration-200 ${
                    isSelected
                      ? 'bg-[#7B4DFF]/25 text-[#F6E7B7] font-semibold border-l-2 border-[#D4AF37]'
                      : 'text-gray-300 hover:bg-[#231742] hover:text-[#F6E7B7]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <span className="text-[10px] text-[#D4AF37]">✦</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
