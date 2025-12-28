
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, CardReading, ChatMessage, User, AppTheme } from './types';
import { MAJOR_ARCANA, SPREADS, CARD_BACK_IMAGE } from './constants';
import TarotCard from './components/TarotCard';
import AuthForm from './components/AuthForm';
import CardManager from './components/CardManager';
import HistoryPanel from './components/HistoryPanel';
import SpreadSelector from './components/SpreadSelector';
import CelticCrossLayout from './components/CelticCrossLayout';
import YearlyLayout from './components/YearlyLayout';
import ThemeSelector from './components/ThemeSelector';
import BackgroundMusic from './components/BackgroundMusic';
import ThemeEffects from './components/ThemeEffects';
import { useTheme } from './hooks/useTheme';
import { useThemedSounds } from './components/SoundManager';
import { createTarotSession, DeepSeekChat } from './services/geminiService';
import { generateThemedCardArt, isThemeComplete, getCachedArt } from './services/imageService';
import { initMobileApp, hapticFeedback, hapticNotification } from './services/mobileService';
import { saveReading } from './services/historyService';
import { marked } from 'marked';

const App: React.FC = () => {
  const { currentTheme } = useTheme();
  const [appState, setAppState] = useState<AppState>(AppState.AUTH);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState<(CardReading & { aiImage?: string })[]>([]);
  const [cardBackImage, setCardBackImage] = useState<string>(CARD_BACK_IMAGE);
  const [isFlipped, setIsFlipped] = useState<boolean[]>([]);
  const [aiChat, setAiChat] = useState<DeepSeekChat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedSpreadId, setSelectedSpreadId] = useState<string | null>('three_card'); // 預設使用時間之流
  const [followUpCount, setFollowUpCount] = useState(0); // 追問次數計數器
  const MAX_FREE_FOLLOWUPS = 2; // 免費用戶最多追問次數

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [showManager, setShowManager] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const isPerformingRef = useRef(false);
  const hasRecordedRef = useRef(false); // 防止重複記錄

  const { playSound } = useThemedSounds(currentTheme);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const interpretationRef = useRef<HTMLDivElement>(null);

  const syncLocalAssets = useCallback(async (user: User) => {
    const theme = user.theme || AppTheme.BAROQUE;
    const cachedBack = await getCachedArt(`${theme}_BACK_IMAGE`);
    // 優先使用快取的自訂牌背，否則使用預設本地牌背
    setCardBackImage(cachedBack || CARD_BACK_IMAGE);
  }, []);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('ethereal_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setAppState(AppState.WELCOME);
      syncLocalAssets(user);
    }
  }, [syncLocalAssets]);

  const refreshAssets = async () => {
    if (currentUser) {
      await syncLocalAssets(currentUser);
    }
  };

  const handleAuthSuccess = (user: User) => {
    playSound('draw');
    setCurrentUser(user);
    sessionStorage.setItem('ethereal_user', JSON.stringify(user));
    setAppState(AppState.WELCOME);
    syncLocalAssets(user);
  };

  const performConsecration = async (theme: AppTheme) => {
    if (isPerformingRef.current) return;
    isPerformingRef.current = true;

    const { complete, missing } = await isThemeComplete(theme, MAJOR_ARCANA);

    const back = await getCachedArt(`${theme}_BACK_IMAGE`);
    if (back) setCardBackImage(back);
    else if (missing.includes("Back")) {
      const newBack = await generateThemedCardArt(theme, "Back", true);
      setCardBackImage(newBack);
    }

    if (complete) {
      setIsCalibrating(false);
      isPerformingRef.current = false;
      return;
    }

    setIsCalibrating(true);
    let current = 0;
    const toGenerate = missing.filter(m => m !== "Back");

    for (const cardName of toGenerate) {
      setCalibrationProgress(Math.floor((current / toGenerate.length) * 100));
      await generateThemedCardArt(theme, cardName);
      current++;
    }

    setIsCalibrating(false);
    isPerformingRef.current = false;
  };

  useEffect(() => {
    if (currentUser?.theme && appState !== AppState.AUTH) {
      performConsecration(currentUser.theme);
    }
  }, [currentUser?.theme, appState]);

  const handleStartShuffle = async () => {
    if (!question.trim() || !selectedSpreadId) return;

    // 獲取選擇的牌陣定義
    const spreadDef = Object.values(SPREADS).find(s => s.id === selectedSpreadId);
    if (!spreadDef) return;

    playSound('shuffle');
    setAppState(AppState.SHUFFLING);

    const cardCount = spreadDef.positions.length;
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, cardCount).map((card, index) => ({
      card,
      isReversed: Math.random() > 0.7,
      position: spreadDef.positions[index].name
    }));

    const theme = currentUser?.theme || AppTheme.BAROQUE;

    const updatedWithArt = await Promise.all(selected.map(async (s) => {
      const cached = await getCachedArt(`${theme}_${s.card.nameZh}`);
      return {
        ...s,
        aiImage: cached || s.card.image
      };
    }));

    setSpread(updatedWithArt);
    setIsFlipped(new Array(cardCount).fill(false));

    setTimeout(() => {
      setAppState(AppState.SPREADING);
    }, 2000);
  };

  // 選擇牌陣
  const handleSelectSpread = (spreadId: string) => {
    setSelectedSpreadId(spreadId);
    setAppState(AppState.WELCOME);
  };


  const flipCard = (index: number) => {
    if (isFlipped[index]) return;
    playSound('flip');
    const nextFlipped = [...isFlipped];
    nextFlipped[index] = true;
    setIsFlipped(nextFlipped);

    if (nextFlipped.every(v => v)) {
      setTimeout(() => {
        initiateInterpretation();
      }, 1500);
    }
  };

  const initiateInterpretation = async () => {
    setAppState(AppState.INTERACTIVE);
    setIsTyping(true);
    hasRecordedRef.current = false;

    // 先加入一個空的 model message，用於串流更新
    setMessages([{ role: 'model', text: '' }]);

    setTimeout(() => {
      interpretationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const chat = createTarotSession(question, spread);
      setAiChat(chat);

      // 使用串流回應，逐步更新顯示
      let fullText = '';
      await chat.sendMessageStream(
        { message: "神諭已降臨，請艾瑟瑞爾揭示真相。" },
        (chunk, accumulated) => {
          fullText = accumulated;
          setMessages([{ role: 'model', text: accumulated }]);
          // 自動滾動到底部
          setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
        }
      );

      // 自動儲存占卜記錄到本地
      if (!hasRecordedRef.current && fullText) {
        hasRecordedRef.current = true;
        const cardsForRecord = spread.map(s => ({
          name: s.card.name,
          nameZh: s.card.nameZh,
          position: s.position,
          isReversed: s.isReversed
        }));
        const interpretationSummary = fullText.substring(0, 200);
        saveReading(question, cardsForRecord, currentUser?.theme || AppTheme.BAROQUE, interpretationSummary);
      }
    } catch (error) {
      setMessages([{ role: 'model', text: "命運之線纏繞過深，艾瑟瑞爾暫時無法窺視。請重啟儀式。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetCeremony = () => {
    playSound('draw');
    setAppState(AppState.WELCOME);
    setQuestion('');
    setSpread([]);
    setIsFlipped([]);
    setAiChat(null);
    setMessages([]);
    setUserInput('');
    setSelectedSpreadId(null); // 重置牌陣選擇
    setFollowUpCount(0); // 重置追問次數
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentUser) syncLocalAssets(currentUser);
  };

  const handleShare = async () => {
    const cardNames = spread.map(s => `${s.position}: ${s.card.nameZh}(${s.isReversed ? '逆位' : '正位'})`).join('、');
    const shareText = `【艾瑟瑞爾塔羅神諭】\n\n我的提問：『${question}』\n抽出牌陣：${cardNames}\n\n在聖殿的穹頂之下，我已窺見命運的真相。你也想聽聽神諭嗎？`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aetheris Tarot Oracle',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('神諭內容與連結已刻入剪貼簿，您可以將其分享至通訊軟體。');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !aiChat || isTyping) return;

    // 檢查追問次數限制 (非 VIP 用戶)
    if (!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS) {
      alert('您已用完免費追問次數\n\n升級 VIP 可獲得無限追問次數，深入探究命運的奥秘。');
      return;
    }

    const userText = userInput.trim();
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }, { role: 'model', text: '' }]);
    setIsTyping(true);
    try {
      // 使用串流回應
      await aiChat.sendMessageStream(
        { message: userText },
        (chunk, accumulated) => {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'model', text: accumulated };
            return updated;
          });
          // 自動滾動到底部
          setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
        }
      );
      setFollowUpCount(prev => prev + 1); // 增加追問次數
    } catch (error) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'model', text: "連線異常..." };
        return updated;
      });
    } finally {
      setIsTyping(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  if (isCalibrating) {
    return (
      <div className="min-h-screen mystic-gradient flex flex-col items-center justify-center p-10 text-center">
        <div className="w-32 h-32 border-4 border-[#d4af37]/20 border-t-[#d4af37] animate-spin rounded-full mb-8"></div>
        <h2 className="text-2xl font-cinzel text-[#d4af37] mb-2 tracking-widest font-black">聖物祝聖中 {calibrationProgress}%</h2>
        <p className="font-lora italic text-[#d4af37]/60">正在為您的靈魂構築專屬藝廊...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4 relative">
      {/* 背景特效 */}
      <ThemeEffects theme={currentTheme} />

      {/* 主題選擇器 */}
      <ThemeSelector />

      {/* 背景音樂 */}
      <BackgroundMusic theme={currentTheme} />

      {appState === AppState.AUTH && <AuthForm onSuccess={handleAuthSuccess} />}

      {appState === AppState.WELCOME && (
        <div className="max-w-4xl w-full mt-20 animate-fade-up">
          <header className="mb-20 text-center animate-float">
            <h1 className="text-8xl font-cinzel font-black tracking-tighter gold-text-shimmer mb-2">AETHERIS</h1>
            <p className="text-[10px] font-cinzel tracking-[1.5em] text-[#d4af37]/60 uppercase ml-[1.5em]">Baroque Divine Oracle</p>
          </header>

          <div className="divine-vessel p-12 md:p-20 shadow-2xl">
            {/* 牌陣選擇提示 */}
            <div className="mb-8">
              <button
                onClick={() => setAppState(AppState.SELECT_SPREAD)}
                className="w-full p-4 rounded-lg border border-[#d4af37]/30 hover:bg-[#d4af37]/5 transition-all"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest uppercase mb-1">選擇的牌陣</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-cinzel text-[#d4af37] font-black">
                      {selectedSpreadId
                        ? Object.values(SPREADS).find(s => s.id === selectedSpreadId)?.nameZh
                        : '請選擇牌陣'}
                    </p>
                    <span className="text-[#d4af37]/40">→</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="mb-12 text-center">
              <h2 className="text-4xl font-cinzel text-[#d4af37] tracking-[0.3em] font-black uppercase mb-4">叩問星穹</h2>
              <p className="text-[#d4af37]/40 font-lora italic">請於心中默唸您的靈魂之惑，星穹之靈將為您撥開命運的塵埃。</p>
            </div>

            <div className="obsidian-mirror p-8 mb-10">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在此傾訴您的靈魂之惑..."
                className="w-full h-48 bg-transparent text-[#f3e5ab] placeholder-[#d4af37]/10 focus:outline-none font-lora italic text-2xl leading-relaxed custom-scrollbar resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleStartShuffle}
                disabled={!question.trim() || !selectedSpreadId}
                className="flex-[3] py-8 rounded-full gold-button text-2xl font-black tracking-[0.5em] disabled:opacity-20 disabled:grayscale transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                領受天啟
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 py-3 md:py-8 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-cinzel text-xs tracking-widest uppercase hover:bg-[#d4af37]/10 transition-all"
              >
                歷史記錄
              </button>
              <button
                onClick={() => setShowManager(true)}
                className="flex-1 py-3 md:py-8 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-cinzel text-xs tracking-widest uppercase hover:bg-[#d4af37]/10 transition-all"
              >
                管理牌組
              </button>
            </div>
          </div>

          {/* 凱爾特十字 VIP 推廣區塊 */}
          <div className="mt-12 divine-vessel p-8 md:p-12 relative overflow-hidden">
            {/* 背景裝飾 */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✦</span>
                  <div>
                    <h3 className="text-2xl font-cinzel font-black text-[#d4af37] tracking-widest">凱爾特十字</h3>
                    <p className="text-[10px] font-cinzel text-[#d4af37]/40 tracking-widest uppercase">Celtic Cross • 10 Cards</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full">
                  <span className="text-black font-cinzel text-xs font-black tracking-widest">👑 VIP</span>
                </div>
              </div>

              <p className="text-[#d4af37]/60 font-lora italic mb-6 leading-relaxed">
                古老而神聖的十張牌占卜法，深入剖析問題的核心、障礙、過去、未來，直至命運的最終結局。適合需要全面深度分析的重要人生抉擇。
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['核心', '障礙', '基礎', '過去', '可能', '未來', '自我', '環境', '希望與恐懼', '結果'].map((pos, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37]/50 text-xs font-cinzel">
                    {pos}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  if (currentUser?.isVip) {
                    setSelectedSpreadId('celtic_cross');
                  } else {
                    alert('此為 VIP 專屬功能，請升級會員以解鎖凱爾特十字牌陣。');
                  }
                }}
                className={`w-full py-4 rounded-full font-cinzel font-black tracking-widest transition-all ${currentUser?.isVip
                  ? 'bg-[#d4af37] text-black hover:brightness-110'
                  : 'border-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10'
                  }`}
              >
                {currentUser?.isVip ? '使用凱爾特十字' : '🔒 解鎖 VIP 專屬牌陣'}
              </button>
            </div>
          </div>
        </div>
      )}

      {appState === AppState.SELECT_SPREAD && currentUser && (
        <SpreadSelector
          isVip={currentUser.isVip}
          onSelectSpread={handleSelectSpread}
          onBack={() => setAppState(AppState.WELCOME)}
        />
      )}

      {showManager && currentUser && (
        <CardManager
          user={currentUser}
          onClose={() => setShowManager(false)}
          onAssetsChanged={refreshAssets}
        />
      )}

      {showHistory && (
        <HistoryPanel onClose={() => setShowHistory(false)} />
      )}

      {appState === AppState.SHUFFLING && (
        <div className="py-40 flex flex-col items-center gap-12">
          <div className="relative w-48 h-72">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 bg-[#1a0505] border-2 border-[#d4af37]/30 rounded-xl animate-pulse"
                style={{ transform: `rotate(${i * 15 - 30}deg) translate(${Math.sin(Date.now() / 500 + i) * 20}px)`, zIndex: i }}
              ></div>
            ))}
          </div>
          <p className="font-cinzel text-[#d4af37] text-2xl tracking-[1em] font-black animate-pulse">天啟編織中</p>
        </div>
      )}

      {(appState === AppState.SPREADING || appState === AppState.INTERACTIVE) && (
        <div className="w-full max-w-7xl flex flex-col items-center gap-4">

          {/* 凱爾特十字特殊佈局 */}
          {selectedSpreadId === 'celtic_cross' ? (
            <CelticCrossLayout
              spread={spread}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={cardBackImage}
            />
          ) : selectedSpreadId === 'yearly' ? (
            /* 年度運勢特殊佈局 */
            <YearlyLayout
              spread={spread}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={cardBackImage}
            />
          ) : (
            /* 預設格子佈局 */
            <div className={`grid gap-6 md:gap-10 w-full min-h-[400px] mb-4 ${spread.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
              spread.length <= 5 ? 'grid-cols-2 md:grid-cols-5' :
                spread.length <= 6 ? 'grid-cols-2 md:grid-cols-3' :
                  'grid-cols-3 md:grid-cols-4'
              }`}>
              {spread.map((s, idx) => (
                <div
                  key={`${idx}-${s.card.id}`}
                  className="flex flex-col items-center animate-deal-card"
                  style={{ animationDelay: `${idx * 0.2}s`, zIndex: 10 }}
                >
                  <p className="text-[#d4af37]/60 font-cinzel text-xs tracking-widest uppercase mb-4 text-center">{s.position}</p>
                  <TarotCard
                    card={{ ...s.card, image: s.aiImage || s.card.image }}
                    isFlipped={isFlipped[idx]}
                    isReversed={s.isReversed}
                    onClick={() => flipCard(idx)}
                    size={spread.length > 5 ? 'sm' : 'lg'}
                    customBack={cardBackImage}
                  />
                  {!isFlipped[idx] && (
                    <p className="mt-4 text-[#d4af37]/40 font-lora italic text-xs animate-pulse">點擊揭示命運</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {appState === AppState.INTERACTIVE && (
            <div ref={interpretationRef} className="w-full divine-vessel z-50 animate-fade-up">
              <div className="p-4 md:p-12 lg:p-24 relative">

                <button
                  onClick={handleResetCeremony}
                  className="absolute top-8 right-8 text-[#d4af37]/40 hover:text-[#d4af37] font-cinzel text-xs tracking-widest uppercase flex items-center gap-2 group transition-all"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> 重啟儀式
                </button>

                <div className="mb-12 text-center">
                  <div className="inline-block px-10 py-6 obsidian-mirror border-[#d4af37]/10">
                    <p className="text-[10px] font-cinzel tracking-[0.5em] text-[#d4af37]/40 uppercase mb-3">提問魂印 (The Inquiry)</p>
                    <h3 className="text-2xl md:text-3xl font-lora italic text-[#f3e5ab] leading-relaxed">「 {question} 」</h3>
                  </div>
                </div>

                <div className="mb-16 border-b border-[#d4af37]/20 pb-12 flex items-center justify-between">
                  <div className="w-14 hidden md:block"></div>
                  <h2 className="text-xl md:text-6xl font-cinzel text-[#d4af37] font-black tracking-[0.1em] md:tracking-[0.2em] gold-text-shimmer text-center">艾瑟瑞爾的神諭</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={handleShare}
                      className="w-14 h-14 rounded-full border border-[#d4af37]/30 flex items-center justify-center hover:bg-[#d4af37]/10 transition-all active:scale-90 group bg-black/50 shadow-lg"
                      title="分享這段神諭"
                    >
                      <svg className="w-5 h-5 text-[#d4af37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="max-h-[1200px] overflow-y-auto pr-8 custom-scrollbar">
                  <div className="space-y-20">
                    {messages.map((msg, idx) => (
                      <div key={idx} className="animate-fade-up">
                        {msg.role === 'user' ? (
                          <div className="user-query-box">「 {msg.text} 」</div>
                        ) : (
                          <div className="prose-mystic" dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-4 text-[#d4af37]/50 font-cinzel italic text-xl animate-pulse">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
                        正在撥開未來的迷霧...
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>

                <div className="mt-20 pt-16 border-t border-[#d4af37]/20 flex flex-col gap-10">
                  {/* 追問次數顯示 */}
                  {!currentUser?.isVip && (
                    <div className="text-center">
                      {followUpCount < MAX_FREE_FOLLOWUPS ? (
                        <p className="text-[#d4af37]/40 font-cinzel text-sm tracking-widest">
                          剩餘追問次數：<span className="text-[#d4af37]">{MAX_FREE_FOLLOWUPS - followUpCount}</span> / {MAX_FREE_FOLLOWUPS}
                        </p>
                      ) : (
                        <div className="inline-block px-6 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/5">
                          <p className="text-yellow-500/80 font-cinzel text-sm tracking-widest">
                            🔒 免費追問次數已用完 · <span className="underline cursor-pointer hover:text-yellow-500">升級 VIP</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {currentUser?.isVip && (
                    <div className="text-center">
                      <p className="text-[#d4af37]/40 font-cinzel text-sm tracking-widest">
                        👑 VIP 會員 · 無限追問
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="flex gap-6 items-center">
                    <div className="flex-1 bg-black/40 border border-[#d4af37]/30 rounded-full px-10 py-6">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="向隱士追問命運的細節..."
                        className="w-full bg-transparent text-[#d4af37] outline-none text-xl font-lora italic placeholder-[#d4af37]/10"
                        disabled={!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isTyping || !userInput.trim() || (!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS)}
                      className="gold-button px-12 py-6 rounded-full text-xl font-black tracking-widest text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                    >
                      探尋
                    </button>
                  </form>

                  <div className="text-center">
                    <button
                      onClick={handleResetCeremony}
                      className="inline-block py-6 px-16 rounded-full border border-[#d4af37]/20 text-[#d4af37]/60 font-cinzel text-lg tracking-[0.3em] uppercase hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-all active:scale-95"
                    >
                      † 結束解讀，重啟儀式 †
                    </button>
                    <p className="mt-4 text-[#d4af37]/20 font-lora italic text-xs tracking-widest">此段神諭將在您離開後隱入虛無</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="mt-40 mb-10 opacity-10 text-[10px] font-cinzel tracking-[2em] uppercase text-[#d4af37] text-center ml-[2em]">
        † Sanctuary of Aetheris &bull; 2025 †
      </footer>
    </div>
  );
};

export default App;
