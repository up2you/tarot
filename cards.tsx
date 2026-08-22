/**
 * 卡牌圖書館頁面（SEO 入口）
 * 公開列出 22 張大阿爾卡納塔羅牌的完整牌義
 * 設計依據：設計藍圖 §12「公開卡牌圖書館作為 SEO 入口」
 * 使用者先搜到「死神牌義」→ 流入 App 做占卜 → 免費獲客引擎
 */

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MAJOR_ARCANA, CARD_BACK_IMAGE } from './constants';
import './styles.css';

// 每張卡的詳細解說（SEO 內容）
const CARD_DETAILS: Record<number, { symbol: string; upright: string; reversed: string }> = {
  0: { symbol: '純真與無限可能', upright: '新的開始、自發性、信念、冒險精神', reversed: '天真、魯莽、冒險、缺乏規劃' },
  1: { symbol: '顯化與創造力', upright: '顯化、足智多謀、力量、專注', reversed: '操控、計畫不周、未開發的潛能' },
  2: { symbol: '直覺與神聖知識', upright: '直覺、神聖知識、潛意識、內在智慧', reversed: '祕密、與直覺斷聯、退縮' },
  3: { symbol: '豐盛與滋養', upright: '女性特質、美麗、自然、豐盛', reversed: '創造力受阻、依賴他人' },
  4: { symbol: '權威與結構', upright: '權威、結構、掌控、父親形象', reversed: '暴政、僵化、缺乏紀律' },
  5: { symbol: '智慧與傳統', upright: '靈性智慧、傳統、順從、導師', reversed: '叛逆、挑戰常規、新規則' },
  6: { symbol: '愛與和諧', upright: '愛情、和諧、關係、價值觀', reversed: '自愛、失衡、價值衝突' },
  7: { symbol: '意志與勝利', upright: '掌控、意志力、成功、行動', reversed: '自律不足、對立、缺乏方向' },
  8: { symbol: '勇氣與內在力量', upright: '力量、勇氣、說服力、影響力', reversed: '內在力量、自我懷疑、原始情緒' },
  9: { symbol: '內省與智慧', upright: '靈魂探索、內省、獨處、追尋', reversed: '孤立、孤獨、退縮' },
  10: { symbol: '命運與循環', upright: '好運、業力、生命循環、命運', reversed: '厄運、抗拒改變' },
  11: { symbol: '真理與平衡', upright: '正義、公平、真相、因果', reversed: '不公、缺乏責任感、不誠實' },
  12: { symbol: '臣服與新視角', upright: '暫停、臣服、放下、新觀點', reversed: '延遲、抗拒、停滯、猶豫' },
  13: { symbol: '結束與重生', upright: '結束、改變、轉化、過渡', reversed: '抗拒改變、個人轉化' },
  14: { symbol: '平衡與耐心', upright: '平衡、節制、耐心、目的', reversed: '失衡、過度、自我療癒' },
  15: { symbol: '陰影與束縛', upright: '陰影自我、依附、成癮、限制', reversed: '解脫、突破、重獲掌控' },
  16: { symbol: '劇變與覺醒', upright: '突然改變、動盪、混亂、覺醒', reversed: '個人轉化、恐懼改變、避開災難' },
  17: { symbol: '希望與療癒', upright: '希望、信念、目的、更新、靈性', reversed: '缺乏信念、絕望、自我信任' },
  18: { symbol: '幻象與直覺', upright: '幻象、恐懼、焦慮、潛意識、直覺', reversed: '釋放恐懼、壓抑情緒、混亂' },
  19: { symbol: '喜悅與成功', upright: '正向、樂趣、溫暖、成功、活力', reversed: '內在小孩、情緒低落、過度樂觀' },
  20: { symbol: '重生與召喚', upright: '審判、重生、內在召喚、赦免', reversed: '自我懷疑、內在批評、忽視召喚' },
  21: { symbol: '完成與圓滿', upright: '完成、整合、成就、旅行', reversed: '尋求結束、捷徑、延遲' },
};

const CardLibraryPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedCard = selectedId !== null ? MAJOR_ARCANA[selectedId] : null;
  const selectedDetail = selectedId !== null ? CARD_DETAILS[selectedId] : null;

  // SEO：更新 document.title 反映當前檢視的卡
  useEffect(() => {
    if (selectedCard) {
      document.title = `${selectedCard.nameZh}（${selectedCard.name}）牌義 - 正位逆位含義 | Aetheris 塔羅牌義圖書館`;
    } else {
      document.title = '塔羅牌牌義圖書館 - 22 張大阿爾卡納 | Aetheris';
    }
  }, [selectedCard]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#ddd]">
      {/* Header */}
      <header className="border-b border-[#d4af37]/20 py-8 text-center px-4">
        <h1 className="font-cinzel text-3xl md:text-5xl font-black tracking-wider gold-text-shimmer mb-2">
          TAROT LIBRARY
        </h1>
        <p className="font-cinzel text-[#d4af37]/60 text-sm tracking-[0.3em] uppercase">
          塔羅牌義圖書館 · 22 張大阿爾卡納
        </p>
      </header>

      {selectedCard && selectedDetail ? (
        /* 詳細頁 */
        <div className="max-w-3xl mx-auto px-4 py-10">
          <button
            onClick={() => setSelectedId(null)}
            className="mb-8 flex items-center gap-2 text-[#d4af37]/60 hover:text-[#d4af37] font-cinzel text-sm tracking-widest uppercase transition-colors"
          >
            ← 返回圖書館
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* 卡圖 */}
            <div className="shrink-0">
              <div className="w-48 md:w-56 rounded-xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <img src={selectedCard.image} alt={`${selectedCard.nameZh}塔羅牌`} className="w-full" />
              </div>
            </div>

            {/* 詳細內容 */}
            <div className="flex-1 text-center md:text-left">
              <p className="font-cinzel text-[#d4af37]/50 text-xs tracking-[0.4em] uppercase mb-2">
                No.{String(selectedCard.id).padStart(2, '0')} · Major Arcana
              </p>
              <h2 className="font-cinzel text-3xl md:text-4xl font-black text-[#f3e5ab] mb-1">
                {selectedCard.nameZh}
              </h2>
              <p className="font-cinzel text-[#d4af37]/60 text-sm tracking-[0.3em] uppercase mb-4">
                {selectedCard.name}
              </p>
              <p className="text-[#d4af37]/70 font-lora italic mb-6">
                {selectedDetail.symbol}
              </p>

              <div className="space-y-4 text-left">
                <div className="p-4 rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/20">
                  <p className="font-cinzel text-[#d4af37] text-xs tracking-widest uppercase mb-2">✦ 正位含義</p>
                  <p className="text-[#ccc] leading-relaxed">{selectedDetail.upright}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#8b0000]/10 border border-[#8b0000]/30">
                  <p className="font-cinzel text-red-400 text-xs tracking-widest uppercase mb-2">✦ 逆位含義</p>
                  <p className="text-[#ccc] leading-relaxed">{selectedDetail.reversed}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-[#d4af37]/10">
                  <p className="font-cinzel text-[#d4af37]/60 text-xs tracking-widest uppercase mb-2">🔮 完整解讀</p>
                  <p className="text-[#d4af37]/60 leading-relaxed">
                    {selectedCard.meaning}
                  </p>
                </div>
              </div>

              {/* CTA：引導到占卜 */}
              <a
                href="/"
                className="mt-8 inline-block px-8 py-4 rounded-full gold-button text-black font-cinzel font-black tracking-[0.3em] hover:scale-105 transition-all"
              >
                開始我的占卜 →
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* 卡片網格 */
        <main className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-center font-lora italic text-[#d4af37]/40 mb-8 px-4">
            點擊任何一張牌，查看完整的正位與逆位含義
          </p>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-3' : 'grid-cols-4 md:grid-cols-6'}`}>
            {MAJOR_ARCANA.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedId(card.id)}
                className="group text-center transition-all hover:-translate-y-1"
              >
                <div className="rounded-lg overflow-hidden border-2 border-[#d4af37]/20 group-hover:border-[#d4af37]/60 transition-all shadow-lg">
                  <img
                    src={card.image}
                    alt={`${card.nameZh}（${card.name}）塔羅牌`}
                    className="w-full"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 font-cinzel text-[#f3e5ab] text-xs md:text-sm tracking-wider">
                  {card.nameZh}
                </p>
                <p className="text-[#d4af37]/40 font-cinzel text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                  {card.name}
                </p>
              </button>
            ))}
          </div>

          {/* SEO 內容區塊 */}
          <section className="mt-16 p-6 rounded-2xl bg-black/40 border border-[#d4af37]/10">
            <h2 className="font-cinzel text-xl text-[#d4af37] mb-4">什麼是塔羅牌大阿爾卡納？</h2>
            <p className="text-[#999] leading-relaxed mb-4">
              大阿爾卡納（Major Arcana）是塔羅牌的 22 張主牌，編號從 0（愚者）到 21（世界）。
              它們代表人生中重要的課題、階段與原型能量——從愚者的純真啟程，經歷戀人、戰車、力量等考驗，
              最後抵達世界的圓滿。與小阿爾卡納（56 張）相比，大阿爾卡納往往象徵更重大、更深遠的影響。
            </p>
            <p className="text-[#999] leading-relaxed">
              每張牌都有正位（Upright）與逆位（Reversed）兩種含義。正位代表牌能量的自然展現，
              逆位則可能是能量的阻礙、內化或需要重新審視的面向。想為你的具體問題獲得個人化解讀？
              <a href="/" className="text-[#d4af37] hover:underline"> 使用 Aetheris 塔羅占卜</a>。
            </p>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#d4af37]/10">
        <p className="font-cinzel text-[#d4af37]/30 text-xs tracking-[0.3em] uppercase">
          Aetheris Divine Oracle · majorarcana.app
        </p>
        <a href="/" className="inline-block mt-3 font-cinzel text-[#d4af37]/50 text-xs tracking-widest hover:text-[#d4af37] transition-colors">
          ✦ 開始免費占卜 ✦
        </a>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<CardLibraryPage />);
}
