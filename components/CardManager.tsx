
import React, { useState, useEffect } from 'react';
import { MAJOR_ARCANA } from '../constants';
import { AppTheme, User } from '../types';
import { cacheArt, getCachedArt, clearAllArt, generateThemedCardArt } from '../services/imageService';

interface CardManagerProps {
  user: User;
  onClose: () => void;
  onAssetsChanged: () => void;
}

const CardManager: React.FC<CardManagerProps> = ({ user, onClose, onAssetsChanged }) => {
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [batchLoading, setBatchLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [progress, setProgress] = useState(0);

  const theme = user.theme || AppTheme.BAROQUE;

  const loadPreviews = async () => {
    const newPreviews: Record<string, string> = {};
    for (const card of MAJOR_ARCANA) {
      const art = await getCachedArt(`${theme}_${card.nameZh}`);
      if (art) newPreviews[card.nameZh] = art;
    }
    const backArt = await getCachedArt(`${theme}_BACK_IMAGE`);
    if (backArt) newPreviews['Back'] = backArt;
    setPreviews(newPreviews);
  };

  useEffect(() => {
    loadPreviews();
  }, [theme]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetCard?: string) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        let finalTarget = targetCard;

        if (!finalTarget) {
          if (file.name.toLowerCase().includes('back') || file.name.includes('背')) {
            finalTarget = 'Back';
          } else {
            const matchedCard = MAJOR_ARCANA.find(c => 
              file.name.includes(c.nameZh) || file.name.toLowerCase().includes(c.name.toLowerCase())
            );
            if (matchedCard) finalTarget = matchedCard.nameZh;
          }
        }

        if (finalTarget) {
          const cacheKey = finalTarget === 'Back' ? `${theme}_BACK_IMAGE` : `${theme}_${finalTarget}`;
          await cacheArt(cacheKey, base64);
          setPreviews(prev => ({ ...prev, [finalTarget!]: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
    onAssetsChanged();
  };

  const resetAll = async () => {
    if (!confirm('確定要清除所有已緩存的聖物影像嗎？這將恢復到系統初始狀態。')) return;
    setBatchLoading(true);
    await clearAllArt();
    setPreviews({});
    onAssetsChanged();
    setBatchLoading(false);
  };

  const autoGenerateAll = async () => {
    setBatchLoading(true);
    let count = 0;
    const total = MAJOR_ARCANA.length + 1;
    
    try {
      setCurrentTask('正在構築牌背影像...');
      await generateThemedCardArt(theme, "Back", true);
      count++;
      setProgress(Math.floor((count / total) * 100));

      for (const card of MAJOR_ARCANA) {
        setCurrentTask(`正在祈願繪製：${card.nameZh}...`);
        await generateThemedCardArt(theme, card.nameZh);
        count++;
        setProgress(Math.floor((count / total) * 100));
      }
      
      await loadPreviews();
      onAssetsChanged();
    } catch (e) {
      alert('祈願中斷，可能達到 API 頻率限制。');
    } finally {
      setBatchLoading(false);
      setCurrentTask('');
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-fade-in">
      <div className="w-full max-w-6xl bg-[#080808] border-2 border-[#d4af37]/20 p-8 md:p-12 rounded-[2rem] shadow-[0_0_100px_rgba(212,175,55,0.15)] relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#d4af37]/10 pb-8 mb-8">
          <div>
            <h2 className="text-4xl font-cinzel text-[#d4af37] font-black tracking-widest uppercase">聖所總署 (The Repository)</h2>
            <p className="text-[#d4af37]/40 font-lora italic text-sm mt-2">最高權限管理：維護、祝聖與重塑聖典之境</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={autoGenerateAll} 
              disabled={batchLoading}
              className="px-6 py-3 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-cinzel text-xs tracking-widest uppercase hover:bg-[#d4af37]/10 transition-all disabled:opacity-30"
            >
              ✦ 批次 AI 祝聖 ✦
            </button>
            <button 
              onClick={resetAll} 
              disabled={batchLoading}
              className="px-6 py-3 rounded-full border border-red-900/40 text-red-500 font-cinzel text-xs tracking-widest uppercase hover:bg-red-900/10 transition-all disabled:opacity-30"
            >
              † 淨化快取 †
            </button>
            <button onClick={onClose} className="text-[#d4af37]/60 hover:text-[#d4af37] text-4xl font-cinzel leading-none ml-4">&times;</button>
          </div>
        </div>

        {/* Batch Progress Overlay */}
        {batchLoading && (
          <div className="absolute inset-0 z-[120] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center rounded-[2rem]">
            <div className="w-64 h-2 bg-[#d4af37]/10 rounded-full mb-6 overflow-hidden">
               <div className="h-full bg-[#d4af37] transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-[#d4af37] font-cinzel text-2xl tracking-widest font-black mb-2">{progress}%</p>
            <p className="text-[#d4af37]/60 font-lora italic animate-pulse">{currentTask}</p>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-black/40 border border-[#d4af37]/10 rounded-3xl">
              <h3 className="text-[#d4af37] font-cinzel tracking-widest text-lg mb-4">資產狀態概覽</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-lora">
                  <span className="text-white/40 italic">當前主題：</span>
                  <span className="text-[#d4af37] font-bold">{theme}</span>
                </div>
                <div className="flex justify-between text-xs font-lora">
                  <span className="text-white/40 italic">已緩存卡面：</span>
                  <span className="text-[#d4af37]">{Object.keys(previews).length} / {MAJOR_ARCANA.length + 1}</span>
                </div>
              </div>
            </div>

            <div className="p-8 border-2 border-dashed border-[#d4af37]/10 rounded-3xl text-center hover:border-[#d4af37]/30 transition-all group">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e)}
                className="hidden" 
                id="batch-upload-repo" 
              />
              <label htmlFor="batch-upload-repo" className="cursor-pointer block">
                <p className="text-[#d4af37] font-cinzel tracking-widest text-lg font-bold">匯入外部聖物</p>
                <p className="text-[#d4af37]/30 font-lora text-xs mt-1 italic">點擊此處上傳多張自訂影像</p>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {/* 牌背 */}
            <div className="flex flex-col gap-2">
              <div className="aspect-[9/16] bg-black/60 border border-[#d4af37]/10 rounded-xl overflow-hidden relative group">
                {previews['Back'] ? (
                  <img src={previews['Back']} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-white/10 uppercase tracking-widest">Missing</div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 rounded text-[8px] text-[#d4af37] border border-[#d4af37]/20 uppercase font-black">Back</div>
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                   <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'Back')} />
                   <span className="text-[10px] font-cinzel text-[#d4af37]">上傳</span>
                </label>
              </div>
            </div>

            {MAJOR_ARCANA.map(card => (
              <div key={card.id} className="flex flex-col gap-2">
                <div className="aspect-[9/16] bg-black/60 border border-[#d4af37]/10 rounded-xl overflow-hidden relative group">
                  {previews[card.nameZh] ? (
                    <img src={previews[card.nameZh]} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-white/10 uppercase tracking-widest italic">{card.nameZh}</div>
                  )}
                  {previews[card.nameZh] && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#d4af37] rounded text-[8px] text-black font-black uppercase">Stored</div>
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                     <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, card.nameZh)} />
                     <span className="text-[10px] font-cinzel text-[#d4af37]">更換</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#d4af37]/10 flex justify-center">
          <button 
            onClick={onClose}
            className="px-20 py-4 gold-button text-black font-cinzel font-black tracking-widest rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
          >
            退出管理介面
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardManager;
