/**
 * 結構化解讀元件
 * 把神諭解讀的 markdown 文字解析為分層視覺卡片：
 *   1. 逐卡區塊（卡圖 + 位置 + 正逆位 + 解讀文字）
 *   2. 總結區（神諭總結）
 * 設計依據：設計藍圖 §7「解讀分層呈現」——摘要先行、逐卡區塊、避免文字牆
 */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CardReading } from '../types';

interface StructuredReadingProps {
  /** 抽出的牌（含卡圖資訊） */
  spread: (CardReading & { aiImage?: string })[];
  /** 完整解讀 markdown 文字 */
  text: string;
}

interface ParsedSection {
  position: string;
  cardName: string;
  isReversed: boolean;
  body: string;
  cardIndex: number;
}

const StructuredReading: React.FC<StructuredReadingProps> = ({ spread, text }) => {
  const { t } = useTranslation();

  // 解析 markdown 為結構化區塊
  const parsed = useMemo(() => {
    const sections: ParsedSection[] = [];
    let summary = '';

    const lines = text.split('\n');
    let current: ParsedSection | null = null;
    const summaryLines: string[] = [];
    let inSummary = false;

    for (const line of lines) {
      // 逐卡標題：### 【位置】牌名 (正位/逆位) — 半形括號，多語言
      const cardMatch = line.match(/^###\s*【(.+?)】(.+?)(?:\s*\(([^)]*)\))?\s*$/);
      if (cardMatch) {
        if (current) sections.push(current);
        const isReversed = (cardMatch[3] || '').includes('逆') || (cardMatch[3] || '').toLowerCase().includes('revers');
        current = {
          position: cardMatch[1].trim(),
          cardName: cardMatch[2].trim(),
          isReversed,
          body: '',
          cardIndex: sections.length,
        };
        inSummary = false;
        continue;
      }

      // 總結分隔線
      if (line.trim() === '---') {
        if (current) sections.push(current);
        current = null;
        inSummary = true;
        continue;
      }

      // 總結標題
      const summaryMatch = line.match(/^###\s*📿?\s*(.+)$/);
      if (summaryMatch && inSummary) {
        summaryLines.push(`**${summaryMatch[1]}**`);
        continue;
      }

      if (inSummary) {
        summaryLines.push(line);
      } else if (current) {
        current.body += line + '\n';
      }
    }
    if (current) sections.push(current);
    summary = summaryLines.join('\n').trim();

    return { sections, summary };
  }, [text]);

  return (
    <div className="space-y-10">
      {/* 逐卡區塊 */}
      {parsed.sections.map((section, idx) => {
        const cardData = spread[section.cardIndex] || spread[idx] || spread[0];
        return (
          <div
            key={idx}
            className="reading-card flex gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-[#0a0505]/70 border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-colors"
          >
            {/* 卡圖 */}
            {cardData && (
              <div className="shrink-0 w-20 md:w-28">
                <img
                  src={cardData.aiImage || cardData.card.image}
                  alt={section.cardName}
                  className={`w-full rounded-lg border border-[#d4af37]/30 shadow-lg ${section.isReversed ? 'rotate-180' : ''}`}
                />
                {/* 正逆位標記 */}
                <p className="text-center mt-1.5 text-[10px] font-cinzel tracking-widest uppercase">
                  <span className={section.isReversed ? 'text-red-400/70' : 'text-[#d4af37]/60'}>
                    {section.isReversed ? t('share.reversed') : t('share.upright')}
                  </span>
                </p>
              </div>
            )}

            {/* 內容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-[10px] font-cinzel tracking-[0.3em] text-[#d4af37]/50 uppercase shrink-0">
                  {section.position}
                </span>
                <span className="text-lg md:text-xl font-cinzel font-bold text-[#f3e5ab] tracking-wider">
                  {section.cardName}
                </span>
              </div>
              <div
                className="prose-mystic text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </div>
          </div>
        );
      })}

      {/* 總結區 */}
      {parsed.summary && (
        <div className="p-5 md:p-8 rounded-2xl bg-gradient-to-b from-[#d4af37]/10 to-transparent border border-[#d4af37]/30">
          <p className="text-[10px] font-cinzel tracking-[0.4em] text-[#d4af37]/60 uppercase mb-4">
            📿 {t('main.oracle_summary')}
          </p>
          <div
            className="prose-mystic text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: parsed.summary }}
          />
        </div>
      )}
    </div>
  );
};

export default StructuredReading;
