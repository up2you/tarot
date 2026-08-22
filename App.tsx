import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, CardReading, ChatMessage, User, AppTheme } from './types';
import { MAJOR_ARCANA, SPREADS, CARD_BACK_IMAGE } from './constants';
import TarotCard from './components/TarotCard';
import AuthPage from './components/AuthPage';
import { getSupabaseUser, getSupabaseUserProfile, onSupabaseAuthStateChange } from './services/supabaseAuthService';
import CardManager from './components/CardManager';
import HistoryPanel from './components/HistoryPanel';
import SpreadSelector from './components/SpreadSelector';
import CelticCrossLayout from './components/CelticCrossLayout';
import YearlyLayout from './components/YearlyLayout';
import MobileCardViewer from './components/MobileCardViewer';
import SettingsMenu from './components/SettingsMenu';
import ThemeEffects from './components/ThemeEffects';
import { useTheme } from './hooks/useTheme';
import { useDisplaySettings } from './hooks/useDisplaySettings';
import { useCardStyle } from './hooks/useCardStyle';
import { useThemedSounds } from './components/SoundManager';
import { createTarotSession, createEasternTarotSession, DeepSeekChat, generateAISummary, ReadingLens } from './services/geminiService';
import { generateThemedCardArt, isThemeComplete, getCachedArt } from './services/imageService';
import { initMobileApp, hapticFeedback, hapticNotification } from './services/mobileService';
import { saveReading } from './services/historyService';
import { checkFreeQuota, consumeFreeReading } from './services/userService';
import { generateFreeReading } from './services/oracleService';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { toPng } from 'html-to-image';
import ShareCardPreview from './components/ShareCardPreview';
import UpgradeModal from './components/UpgradeModal';
import UserProfilePage from './components/UserProfilePage';
import CardStyleShop from './components/CardStyleShop';
import PricingPage from './components/PricingPage';
import { SUPPORTED_LANGUAGES } from './hooks/i18n';
import { useToast } from './components/Toast';
import { detectScenario, mapPositionToKey } from './services/scenarioDetection';
import { getGuestRemaining, consumeGuestQuota, GUEST_DAILY_QUOTA_LIMIT } from './services/guestQuota';
import { useAnimationSettings } from './hooks/useAnimationSettings';
import RitualShuffle from './components/RitualShuffle';
import DailyCard from './components/DailyCard';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const { settings: animSettings } = useAnimationSettings();
  const { currentTheme } = useTheme();
  const { settings: displaySettings } = useDisplaySettings();
  const { currentStyleId, getCardImageUrl, getBackImageUrl, styleImages, isLoading: isLoadingCardStyle } = useCardStyle();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
  const MAX_FREE_FOLLOWUPS = 0; // 免費用戶不開放追問功能
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // 升級 VIP 彈窗
  const [currentPage, setCurrentPage] = useState<'main' | 'profile' | 'cardStyles' | 'pricing'>('main'); // 🆕 當前頁面
  const [previousPage, setPreviousPage] = useState<'main' | 'profile'>('main'); // 🆕 記錄上一層頁面

  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [showManager, setShowManager] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isTypewriter, setIsTypewriter] = useState(false); // 打字機效果播放中（供跳過按鈕使用）
  const [showDailyFirst, setShowDailyFirst] = useState(true); // 首屏：冥想式每日卡入口（改造核心）
  const [activeLens, setActiveLens] = useState<ReadingLens>('western'); // 🎭 雙透鏡：西方原型 / 東方智慧
  const [easternReading, setEasternReading] = useState<string | null>(null); // 東方視角解讀（快取）
  const isPerformingRef = useRef(false);
  const hasRecordedRef = useRef(false); // 防止重複記錄
  const hasConsumedQuotaRef = useRef(false); // 防止重複扣除額度
  const skipTypewriterRef = useRef(false); // 使用者點擊「跳過」時中斷打字機效果
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 洗牌動畫計時器（供跳過使用）

  const { playSound } = useThemedSounds(currentTheme);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const interpretationRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [showShareCard, setShowShareCard] = useState(false);

  const syncLocalAssets = useCallback(async (user: User) => {
    const theme = user.theme || AppTheme.BAROQUE;
    // 優先使用後台設定的牌面風格
    const backFromStyle = getBackImageUrl();
    if (backFromStyle) {
      setCardBackImage(backFromStyle);
    } else {
      const cachedBack = await getCachedArt(`${theme}_BACK_IMAGE`);
      setCardBackImage(cachedBack || CARD_BACK_IMAGE);
    }
  }, [getBackImageUrl]);

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🆕 監聽導航事件（來自 SettingsMenu）
  useEffect(() => {
    const handleNavigate = (e: CustomEvent) => {
      const page = e.detail;
      // 從選單進入的頁面，設定 previousPage 為 'main'
      setPreviousPage('main');
      if (page === 'profile') setCurrentPage('profile');
      else if (page === 'cardStyles') setCurrentPage('cardStyles');
      else if (page === 'pricing') setCurrentPage('pricing');
      else if (page === 'auth') {
        // 導航到登入頁面
        setCurrentPage('main');
        setAppState(AppState.AUTH);
        setCurrentUser(null);
        sessionStorage.removeItem('ethereal_user');
      }
      else setCurrentPage('main');
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // 🆕 監聽 Supabase 認證狀態變化（處理 OAuth callback）
  useEffect(() => {
    // 檢查 sessionStorage 中的已保存用戶
    const savedUser = sessionStorage.getItem('ethereal_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setAppState(AppState.WELCOME);
      syncLocalAssets(user);
    }

    // 設置 Supabase 認證狀態監聽器
    const { data: { subscription } } = onSupabaseAuthStateChange(async (authUser) => {
      if (authUser) {
        // 用戶已登入（包括 OAuth callback 返回）
        const profile = await getSupabaseUserProfile(authUser.id);

        const appUser: User = {
          username: authUser.email,
          email: authUser.email,
          displayName: profile?.display_name || authUser.email.split('@')[0],
          isVip: profile?.subscription_type ? ['monthly', 'yearly', 'lifetime'].includes(profile.subscription_type) : false,
          freeReadingsRemaining: 3 - (profile?.credits_balance || 0),
          theme: AppTheme.BAROQUE,
          provider: 'google',
          joinedDate: new Date(authUser.created_at).getTime(),
          readingsCount: 0,
          spending: 0,
        };

        setCurrentUser(appUser);
        sessionStorage.setItem('ethereal_user', JSON.stringify(appUser));
        setAppState(AppState.WELCOME);
        syncLocalAssets(appUser);
      }
    });

    // 清理訂閱
    return () => {
      subscription?.unsubscribe();
    };
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

  // 🆕 訪客模式：跳過登入直接體驗（本地會話，不寫入 Supabase）
  const handleGuestMode = () => {
    playSound('draw');
    const guestUser: User = {
      username: 'guest',
      displayName: t('profile_page.default_name') || '神秘旅人',
      joinedDate: Date.now(),
      readingsCount: 0,
      spending: 0,
      isVip: false,
      theme: currentTheme,
      provider: 'local',
    };
    // 訪客身分標記（localStorage 持久化，關閉瀏覽器仍在）
    localStorage.setItem('aetheris_guest', 'true');
    sessionStorage.setItem('ethereal_user', JSON.stringify(guestUser));
    setCurrentUser(guestUser);
    setShowDailyFirst(true); // 訪客進入冥想式每日卡首屏
    setAppState(AppState.WELCOME);
    syncLocalAssets(guestUser);
  };

  // 🆕 Supabase 認證成功處理
  const handleSupabaseAuthSuccess = async () => {
    playSound('draw');

    try {
      const supabaseUser = await getSupabaseUser();
      if (!supabaseUser) return;

      const profile = await getSupabaseUserProfile(supabaseUser.id);

      // 轉換為 App 的 User 類型
      const appUser: User = {
        username: supabaseUser.email,
        email: supabaseUser.email,
        displayName: profile?.display_name || supabaseUser.email.split('@')[0],
        isVip: profile?.subscription_type ? ['monthly', 'yearly', 'lifetime'].includes(profile.subscription_type) : false,
        freeReadingsRemaining: 3 - (profile?.credits_balance || 0),
        theme: AppTheme.BAROQUE,
        provider: 'google', // Supabase 認證視為 Google 類型
        joinedDate: new Date(supabaseUser.created_at).getTime(),
        readingsCount: 0,
        spending: 0,
      };

      setCurrentUser(appUser);
      sessionStorage.setItem('ethereal_user', JSON.stringify(appUser));
      setAppState(AppState.WELCOME);
      syncLocalAssets(appUser);
    } catch (error) {
      console.error('Auth success handling failed:', error);
    }
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

  const handleStartShuffle = async () => {
    // 獲取選擇的牌陣定義
    const spreadDef = Object.values(SPREADS).find(s => s.id === selectedSpreadId);

    // 允許：1. 有問題 + 有牌陣 2. 有默認場景 + 有牌陣 (跳過問題檢查)
    if (!selectedSpreadId || (!question.trim() && !spreadDef?.defaultScenario)) return;

    if (!spreadDef) return;

    // 🆕 訪客額度檢查（設計藍圖：3 次免費制）
    if (!currentUser?.email && !currentUser?.isVip) {
      if (getGuestRemaining() <= 0) {
        toast.info(t('main.guest_quota_exhausted'));
        setShowUpgradeModal(true);
        return;
      }
    }

    // 🆕 如果是有默認場景的牌陣且問題為空，自動填入預設問題 (確保顯示正確)
    if (!question.trim() && spreadDef.defaultScenario) {
      setQuestion(spreadDef.nameZh);
    }

    hasConsumedQuotaRef.current = false; // 重置額度扣除標記
    playSound('shuffle');
    setAppState(AppState.SHUFFLING);

    // 🆕 AI 回述確認（設計藍圖：讓使用者感覺被傾聽）
    if (question.trim() && !spreadDef.defaultScenario) {
      const spreadName = t(`spreads:spreads.${spreadDef.id}.name`, spreadDef.nameZh);
      toast.info(t('main.intent_acknowledge', {
        topic: question.trim().length > 24 ? question.trim().substring(0, 24) + '…' : question.trim(),
        spread: spreadName,
        count: spreadDef.positions.length,
      }), 4000);
    }

    const cardCount = spreadDef.positions.length;
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, cardCount).map((card, index) => ({
      card,
      isReversed: Math.random() > 0.7,
      position: spreadDef.positions[index].name,
      positionId: spreadDef.positions[index].key
    }));

    const theme = currentUser?.theme || AppTheme.BAROQUE;

    const updatedWithArt = await Promise.all(selected.map(async (s) => {
      // 優先使用後台設定的牌面風格
      const styleImage = getCardImageUrl(s.card.id);
      if (styleImage) {
        return { ...s, aiImage: styleImage };
      }
      // 否則使用主題快取或預設圖片
      const cached = await getCachedArt(`${theme}_${s.card.nameZh}`);
      return {
        ...s,
        aiImage: cached || s.card.image
      };
    }));

    setSpread(updatedWithArt);
    setIsFlipped(new Array(cardCount).fill(false));

    // 洗牌動畫：預設 3 秒，使用者可點擊「跳過」立即進入翻牌階段
    if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    shuffleTimerRef.current = setTimeout(() => {
      setAppState(AppState.SPREADING);
      shuffleTimerRef.current = null;
    }, 3000);
  };

  // 🆕 跳過洗牌動畫，直接進入翻牌階段
  const handleSkipShuffle = () => {
    if (shuffleTimerRef.current) {
      clearTimeout(shuffleTimerRef.current);
      shuffleTimerRef.current = null;
    }
    setAppState(AppState.SPREADING);
  };

  // 選擇牌陣
  const handleSelectSpread = (spreadId: string) => {
    setSelectedSpreadId(spreadId);

    // 如果是預設場景牌陣 (如年度運勢)，自動填入問題
    const spreadDef = Object.values(SPREADS).find(s => s.id === spreadId);
    if (spreadDef?.defaultScenario) {
      setQuestion(spreadDef.nameZh);
    } else {
      setQuestion(''); // 切換回一般牌陣時清空
    }

    setAppState(AppState.WELCOME);
  };

  const flipCard = (index: number) => {
    if (isFlipped[index]) return;
    playSound('flip');
    // 原生平台：翻牌瞬間觸發觸覺回饋（web 自動 no-op）
    if (animSettings.flipStyle === 'physical') {
      hapticFeedback('medium');
    } else {
      hapticFeedback('light');
    }
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
      let fullText = '';

      // 🆕 判斷使用神諭資料庫或 AI
      if (currentUser?.isVip) {
        // VIP 用戶：使用 AI 串流解讀
        const chat = createTarotSession(question, spread, i18n.language);
        setAiChat(chat);

        await chat.sendMessageStream(
          { message: t('main.seeking_oracle') },
          (chunk, accumulated) => {
            fullText = accumulated;
            setMessages([{ role: 'model', text: accumulated }]);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
          }
        );
      } else {
        // 免費用戶：使用神諭資料庫（預生成解讀）
        const spreadDef = selectedSpreadId ? Object.values(SPREADS).find(s => s.id === selectedSpreadId) : null;
        let scenarioKey = spreadDef?.defaultScenario || detectScenario(question); // 優先使用預設場景

        const cards = spread.map((s, idx) => ({
          cardId: s.card.id,
          cardName: s.card.nameZh,
          isReversed: s.isReversed,
          // 優先使用 positionId (對應 oraclePositions key)，若無則回退到中文映射
          positionKey: s.positionId || mapPositionToKey(s.position, idx),
        }));

        setMessages([{ role: 'model', text: t('main.seeking_oracle') }]);

        const oracleResult = await generateFreeReading(cards, scenarioKey, i18n.language);

        // 🆕 混合模式優化：如果免費用戶有輸入特定問題，則調用 AI 生成針對性的總結
        // 排除預設問題 (如 "年度運勢" 等)
        const isGenericQuestion = question === spreadDef?.nameZh;
        if (question.trim() && !isGenericQuestion) {
          const aiSummary = await generateAISummary(
            question,
            oracleResult.interpretations.map((interp, idx) => ({
              cardName: spread[idx].card.nameZh,
              isReversed: spread[idx].isReversed,
              position: interp.position,
              interpretation: interp.text
            })),
            i18n.language
          );

          if (aiSummary) {
            oracleResult.summary = aiSummary;
          }
        }

        // 組合成完整解讀文字
        fullText = formatOracleReading(spread, oracleResult);

        // 🆕 模擬打字機效果（動態加速：長文自動加快，總播放時間控制在 ~6 秒內；支援跳過）
        const typewriterEffect = async (text: string) => {
          setIsTypewriter(true);
          skipTypewriterRef.current = false;

          const totalChars = text.length;
          // 目標約 120 個 chunk：短文字維持 3 字元/次的神秘節奏，長文字自動加大 chunk
          const chunkSize = Math.max(3, Math.ceil(totalChars / 120));
          const chunkCount = Math.ceil(totalChars / chunkSize);
          // 總播放時間約 6 秒，但單次間隔不低於 12ms
          const delay = Math.max(12, Math.floor(6000 / chunkCount));

          const chunks: string[] = [];
          for (let i = 0; i < totalChars; i += chunkSize) {
            chunks.push(text.substring(0, i + chunkSize));
          }

          for (const chunk of chunks) {
            if (skipTypewriterRef.current) break;
            setMessages([{ role: 'model', text: chunk }]);
            await new Promise(resolve => setTimeout(resolve, delay));
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
          // 確保最終顯示完整文字
          setMessages([{ role: 'model', text: text }]);
          setIsTypewriter(false);
        };

        await typewriterEffect(fullText);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
      }

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

        // 🆕 訪客：扣除一次免費額度
        if (!currentUser?.email && !currentUser?.isVip) {
          consumeGuestQuota();
        }
      }
    } catch (error) {
      console.error('Interpretation error:', error);
      setMessages([{ role: 'model', text: t('main.error_message') }]);
    } finally {
      setIsTyping(false);
      setIsTypewriter(false);
      skipTypewriterRef.current = false;
    }
  };

  // 🎭 雙透鏡解讀：切換西方原型 / 東方智慧 / 對照模式
  const handleSwitchLens = async (lens: ReadingLens) => {
    // 切回西方：直接切換顯示（西方解讀已在 messages 中）
    if (lens === 'western') {
      setActiveLens('western');
      return;
    }

    // 東方 / 對照模式：若東方解讀尚未生成，先即時生成
    if (!easternReading) {
      if (!currentUser?.isVip) {
        toast.info(t('main.lens_vip_only'));
        setShowUpgradeModal(true);
        return;
      }

      try {
        setIsTyping(true);
        const chat = createEasternTarotSession(question, spread, i18n.language);
        let fullText = '';
        await chat.sendMessageStream(
          { message: t('main.seeking_eastern') },
          (chunk, accumulated) => {
            fullText = accumulated;
            setEasternReading(accumulated);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
          }
        );
        setEasternReading(fullText);
      } catch (error) {
        console.error('Eastern lens error:', error);
        toast.error(t('main.error_message'));
        return;
      } finally {
        setIsTyping(false);
      }
    }

    // 生成完成後切換到目標模式
    setActiveLens(lens);
  };


  // 🆕 格式化神諭解讀結果
  const formatOracleReading = (
    cards: (CardReading & { aiImage?: string })[],
    result: { interpretations: { position: string; text: string }[]; relationships: string[]; summary: string }
  ): string => {
    let text = `## ✨ ${t('main.oracle_reading_header')}\n\n`;

    // 每張牌的解讀
    cards.forEach((card, idx) => {
      const interp = result.interpretations[idx];
      const posKey = card.positionId || mapPositionToKey(card.position, idx);
      const localizedPos = t(`spreads:positions.${posKey}`, interp?.position || card.position);
      const cardName = t(`cards:cards.${card.card.id}.name`, card.card.nameZh);
      const reversedTag = card.isReversed ? ` (${t('share.reversed')})` : ` (${t('share.upright')})`;
      text += `### 【${localizedPos}】${cardName}${reversedTag}\n\n`;
      text += (interp?.text || t('main.energy_flowing')) + '\n\n';
    });

    // 總結
    if (result.summary) {
      text += '---\n\n';
      text += `### 📿 ${t('main.oracle_summary')}\n\n`;
      text += result.summary + '\n';
    }

    // 🛡️ 最終淨化：移除所有多餘的轉義符號，將字面上的 "\\n" 轉為真正的換行
    return text.replace(/\\n/g, '\n');
  };

  const handleResetCeremony = () => {
    playSound('draw');
    setAppState(AppState.WELCOME);
    setShowDailyFirst(true); // 回到冥想式每日卡首屏
    setQuestion('');
    setSpread([]);
    setIsFlipped([]);
    setAiChat(null);
    setMessages([]);
    setUserInput('');
    setSelectedSpreadId('three_card'); // 重置為預設牌陣(時間之流)
    setFollowUpCount(0); // 重置追問次數
    setIsTypewriter(false); // 重置打字機狀態
    skipTypewriterRef.current = false;
    if (shuffleTimerRef.current) {
      clearTimeout(shuffleTimerRef.current);
      shuffleTimerRef.current = null;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentUser) syncLocalAssets(currentUser);
  };

  const handleShare = async () => {
    // 顯示分享卡片
    setShowShareCard(true);

    // 等待 DOM 渲染
    await new Promise(resolve => setTimeout(resolve, 300));

    const node = shareCardRef.current;
    if (!node) {
      setShowShareCard(false);
      toast.error(t('main.generate_image_failed'));
      return;
    }

    // 準備完整解讀文字
    const cardNames = spread.map(s => {
      const localizedPos = t(`spreads:positions.${s.positionId}`, s.position);
      const localizedCard = t(`cards:cards.${s.card.id}.name`, s.card.nameZh);
      const localizedReversed = s.isReversed ? t('share.reversed') : t('share.upright');
      return `${localizedPos}: ${localizedCard}(${localizedReversed})`;
    }).join('\n');

    const fullInterpretation = messages.find(m => m.role === 'model')?.text || '';
    // 清理 Markdown 標記
    const cleanedInterpretation = fullInterpretation
      .replace(/^#+\s+/gm, '【')
      .replace(/\n#+\s+/g, '】\n\n【')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/---/g, '─────────')
      // 移除 HTML 標籤
      .replace(/<span[^>]*>/g, '「')
      .replace(/<\/span>/g, '」')
      .replace(/<[^>]+>/g, '')
      .trim();

    const fullShareText = `${t('share.template_header')}\n\n${t('share.template_question', { question })}\n\n${t('share.template_cards')}\n${cardNames}\n\n${t('share.template_oracle')}\n${cleanedInterpretation}\n\n─────────\n${t('share.template_footer')}`;

    try {
      // 生成圖片
      const dataUrl = await toPng(node, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#0a0505',
      });

      // 轉換為 Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'aetheris-oracle.png', { type: 'image/png' });

      // 嘗試使用 Web Share API 分享圖片 + 完整文字
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Aetheris 塔羅神諭',
          text: fullShareText,
        });
      } else {
        // 降級：下載圖片 + 複製完整文字
        const link = document.createElement('a');
        link.download = 'aetheris-oracle.png';
        link.href = dataUrl;
        link.click();
        // 同時複製完整文字到剪貼簿
        await navigator.clipboard.writeText(fullShareText);
        toast.success(t('main.download_success'));
      }
    } catch (err) {
      console.error('Share image failed:', err);
      // 再次降級：只複製完整文字
      await navigator.clipboard.writeText(fullShareText);
      toast.error(t('main.generate_failed_copied'));
    } finally {
      setShowShareCard(false);
    }
  };

  // 分享純文字（完整解讀）
  const handleShareText = async () => {
    const cardNames = spread.map(s => {
      const localizedPos = t(`spreads:positions.${s.positionId}`, s.position);
      const localizedCard = t(`cards:cards.${s.card.id}.name`, s.card.nameZh);
      const localizedReversed = s.isReversed ? t('share.reversed') : t('share.upright');
      return `${localizedPos}: ${localizedCard}(${localizedReversed})`;
    }).join('\n');

    const fullInterpretation = messages.find(m => m.role === 'model')?.text || '';
    const cleanedInterpretation = fullInterpretation
      .replace(/^#+\s+/gm, '【')
      .replace(/\n#+\s+/g, '】\n\n【')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/---/g, '─────────')
      // 移除 HTML 標籤
      .replace(/<span[^>]*>/g, '「')
      .replace(/<\/span>/g, '」')
      .replace(/<[^>]+>/g, '')
      .trim();

    const fullShareText = `${t('share.template_header')}\n\n${t('share.template_question', { question })}\n\n${t('share.template_cards')}\n${cardNames}\n\n${t('share.template_oracle')}\n${cleanedInterpretation}\n\n─────────\n${t('share.template_footer')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aetheris 塔羅神諭',
          text: fullShareText,
        });
      } catch (err) {
        console.warn('Share failed, copying to clipboard');
        await navigator.clipboard.writeText(fullShareText);
        toast.success(t('main.copied_to_clipboard'));
      }
    } else {
      await navigator.clipboard.writeText(fullShareText);
      toast.success(t('main.copied_to_clipboard'));
    }
  };

  // 🆕 複製金句（設計藍圖：解讀金句卡自動生成概念的精簡版）
  const handleShareQuote = async () => {
    const fullInterpretation = messages.find(m => m.role === 'model')?.text || '';
    // 提取第一張牌的標題作為金句來源
    const firstCardLine = fullInterpretation.split('\n').find(l => l.startsWith('###')) || '';
    const cleanedLine = firstCardLine
      .replace(/^###\s*【(.+?)】(.+?)(?:\s*\(([^)]*)\))?\s*$/, '【$1】$2')
      .replace(/\*\*/g, '')
      .trim();
    // 提取解讀第一段非空文字作為金句內容
    const firstBody = fullInterpretation
      .split('\n')
      .filter(l => l.trim() && !l.startsWith('#') && l.trim() !== '---')
      .find(l => l.length > 8) || '';

    const quoteText = `${cleanedLine || t('share.template_header')}\n「${firstBody.slice(0, 80)}${firstBody.length > 80 ? '…' : ''}」\n\n— ${t('share.template_footer').split('\n')[0]}`;

    try {
      await navigator.clipboard.writeText(quoteText);
      toast.success(t('main.copied_to_clipboard'));
    } catch (err) {
      console.warn('Quote copy failed:', err);
      toast.error(t('main.copy_failed'));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !aiChat || isTyping) return;

    // 檢查追問次數限制 (非 VIP 用戶)
    if (!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS) {
      toast.info(t('main.followup_limit_reached'));
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
        updated[updated.length - 1] = { role: 'model', text: t('main.copy_failed') };
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
        <h2 className="text-2xl font-cinzel text-[#d4af37] mb-2 tracking-widest font-black">
          {t('main.calibrating', { progress: calibrationProgress })}
        </h2>
        <p className="font-lora italic text-[#d4af37]/60">
          {t('main.calibrating_hint')}
        </p>
      </div>
    );
  }

  // ==================== 渲染 ====================
  const allFlipped = isFlipped.length > 0 && isFlipped.every(v => v);
  const cardsDrawn = spread.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-4 relative">
      {/* 分享圖卡（隱藏，用於生成圖片） */}
      {showShareCard && (
        <div className="fixed -left-[9999px] top-0 z-[-1]">
          <ShareCardPreview
            ref={shareCardRef}
            spread={spread}
            question={question}
            interpretation={messages.find(m => m.role === 'model')?.text || ''}
          />
        </div>
      )}

      {/* 背景特效 */}
      <ThemeEffects theme={currentTheme} />

      {/* 漢堡設定選單 */}
      <SettingsMenu />

      {/* 語言切換器 - 右上角 */}
      <div className="fixed top-6 right-6 z-[100]">
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 border border-[#d4af37]/30 shadow-lg text-[#d4af37]/80 text-sm hover:scale-110 active:scale-95 transition-all"
            title={t('settings.language')}
            aria-label={t('settings.language')}
            aria-expanded={showLanguageMenu}
          >
            <span>{SUPPORTED_LANGUAGES.find(l => l.code === i18n.language)?.flag || '🌐'}</span>
            <span className="hidden sm:inline text-xs font-cinzel tracking-wider">{SUPPORTED_LANGUAGES.find(l => l.code === i18n.language)?.label}</span>
            <span className="text-[10px]">{showLanguageMenu ? '▲' : '▼'}</span>
          </button>
          {showLanguageMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowLanguageMenu(false)} />
              <div className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden bg-black/95 border border-[#d4af37]/30 shadow-2xl z-50 animate-fade-up">
                {SUPPORTED_LANGUAGES.map(opt => (
                  <button
                    key={opt.code}
                    onClick={() => { i18n.changeLanguage(opt.code); setShowLanguageMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center gap-2 ${i18n.language === opt.code ? 'text-amber-400 bg-[#d4af37]/10' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🆕 升級 VIP 彈窗 */}
      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          remainingQuota={currentUser?.freeReadingsRemaining || 0}
        />
      )}

      {/* 🆕 頁面切換 */}
      {currentPage === 'profile' && (
        <UserProfilePage
          onClose={() => setCurrentPage('main')}
          onNavigate={(page) => {
            // 從個人中心進入的子頁面，設定 previousPage 為 'profile'
            setPreviousPage('profile');
            if (page === 'pricing') setCurrentPage('pricing');
            else if (page === 'cardStyles') setCurrentPage('cardStyles');
            else setCurrentPage('main');
          }}
        />
      )}

      {currentPage === 'cardStyles' && (
        <CardStyleShop
          onClose={() => setCurrentPage(previousPage)}
        />
      )}

      {currentPage === 'pricing' && (
        <PricingPage
          onClose={() => setCurrentPage(previousPage)}
        />
      )}

      {currentPage === 'main' && appState === AppState.AUTH && (
        <AuthPage onAuthSuccess={handleSupabaseAuthSuccess} onGuestMode={handleGuestMode} />
      )}

      {currentPage === 'main' && appState === AppState.WELCOME && showDailyFirst && (
        /* 🎯 冥想式首屏：每日卡入口（設計藍圖核心改造） */
        <div className="w-full mt-10 md:mt-16 animate-fade-up">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-cinzel font-black tracking-tighter gold-text-shimmer mb-2">AETHERIS</h1>
            <p className="text-[10px] font-cinzel tracking-[0.5em] md:tracking-[1em] text-[#d4af37]/70 uppercase">
              {t('app.subtitle')}
            </p>
          </header>
          <DailyCard
            cardBack={getBackImageUrl() || cardBackImage}
            onStartReading={() => setShowDailyFirst(false)}
          />
        </div>
      )}

      {currentPage === 'main' && appState === AppState.WELCOME && !showDailyFirst && (
        <div className="max-w-4xl w-full mt-6 md:mt-20 animate-fade-up">
          <header className="mb-8 md:mb-20 text-center animate-float">
            <h1 className="text-5xl md:text-8xl font-cinzel font-black tracking-tighter gold-text-shimmer mb-2">AETHERIS</h1>
            <p className="text-[10px] md:text-[10px] font-cinzel tracking-[0.5em] md:tracking-[1.5em] text-[#d4af37]/80 uppercase">Baroque Divine Oracle</p>
          </header>

          <div className="divine-vessel p-12 md:p-20 shadow-2xl">
            {/* 牌陣選擇提示 */}
            <div className="mb-6">
              <button
                onClick={() => setAppState(AppState.SELECT_SPREAD)}
                className="w-full p-4 rounded-xl border-2 border-[#ffd700]/50 hover:border-[#ffd700] hover:bg-[#ffd700]/10 transition-all group"
              >
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xs md:text-sm font-cinzel text-[#ffd700]/80 tracking-widest uppercase mb-1 group-hover:text-[#ffd700]">
                    {t('main.click_to_change_spread')}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ffd700]/60 text-sm">{t('main.current_spread')}</span>
                    <p className="text-lg md:text-2xl font-cinzel text-[#ffd700] font-black">
                      {selectedSpreadId
                        ? t(`spreads:spreads.${selectedSpreadId}.name`, Object.values(SPREADS).find(s => s.id === selectedSpreadId)?.nameZh)
                        : t('main.select_spread')}
                    </p>
                    <span className="text-[#ffd700] text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-2xl md:text-4xl font-cinzel text-[#d4af37] tracking-[0.2em] md:tracking-[0.3em] font-black uppercase mb-2">
                {t('main.consult_oracle')}
              </h2>
              <p className="text-[#d4af37]/40 font-lora italic text-sm md:text-base">
                {t('main.consult_hint')}
              </p>
            </div>

            {/* 🎯 主題引導 chips（設計藍圖：避免空白輸入框的認知負擔） */}
            <div className="mb-4">
              <p className="text-[#d4af37]/50 font-cinzel text-xs tracking-widest uppercase mb-3 text-center">
                {t('main.intent_title')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { key: 'love', label: t('main.intent_love'), question: t('main.intent_love_q') },
                  { key: 'career', label: t('main.intent_career'), question: t('main.intent_career_q') },
                  { key: 'money', label: t('main.intent_money'), question: t('main.intent_money_q') },
                  { key: 'self', label: t('main.intent_self'), question: t('main.intent_self_q') },
                  { key: 'guidance', label: t('main.intent_guidance'), question: t('main.intent_guidance_q') },
                ].map((intent) => (
                  <button
                    key={intent.key}
                    onClick={() => {
                      setQuestion(intent.question);
                      // 今日指引：使用預設牌陣
                      if (intent.key === 'guidance') {
                        setSelectedSpreadId('three_card');
                      }
                    }}
                    className={`px-5 py-2.5 rounded-full border transition-all text-sm md:text-base font-cinzel tracking-wider active:scale-95 cursor-pointer ${
                      question === intent.question
                        ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                        : 'border-[#d4af37]/30 text-[#d4af37]/60 hover:border-[#d4af37]/60 hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                    }`}
                  >
                    {intent.label}
                  </button>
                ))}
              </div>
              <p className="text-[#d4af37]/30 font-lora italic text-xs text-center mt-2">
                {t('main.intent_hint')}
              </p>
            </div>

            <div className="border-2 border-[#d4af37]/40 rounded-xl p-1 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <div className="obsidian-mirror p-6 md:p-8 rounded-lg">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={t('main.question_placeholder')}
                  className="w-full h-24 md:h-40 bg-transparent text-[#f3e5ab] placeholder-[#d4af37]/40 focus:outline-none font-lora italic text-base md:text-xl leading-relaxed custom-scrollbar resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStartShuffle}
                disabled={(!question.trim() && !Object.values(SPREADS).find(s => s.id === selectedSpreadId)?.defaultScenario) || !selectedSpreadId}
                className="flex-[2] py-3 md:py-5 rounded-full gold-button text-base md:text-xl font-black tracking-[0.2em] md:tracking-[0.5em] disabled:opacity-20 disabled:grayscale transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {t('main.start_reading')}
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 py-3 md:py-5 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-cinzel text-xs tracking-widest uppercase hover:bg-[#d4af37]/10 transition-all"
              >
                {t('main.history')}
              </button>
            </div>

            {/* 🆕 免費額度顯示 */}
            {currentUser && (
              <div className="mt-6 text-center">
                {currentUser.isVip ? (
                  <p className="text-[#d4af37]/60 font-cinzel text-sm tracking-widest">
                    {t('main.vip_unlimited')}
                  </p>
                ) : (
                  <div
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#d4af37]/30 bg-black/30 cursor-pointer hover:border-[#d4af37]/60 transition-all"
                    onClick={() => setShowUpgradeModal(true)}
                  >
                    <span className="text-[#d4af37]/60 font-cinzel text-sm tracking-widest">
                      {t('main.readings_remaining')}
                    </span>
                    <span className={`font-cinzel font-black text-lg ${
                      (currentUser.email
                        ? (currentUser.freeReadingsRemaining || 0)
                        : getGuestRemaining()) === 0
                        ? 'text-red-400'
                        : 'text-[#d4af37]'
                      }`}>
                      {currentUser.email ? (currentUser.freeReadingsRemaining ?? 3) : getGuestRemaining()}
                    </span>
                    <span className="text-[#d4af37]/40 text-xs">/ {currentUser.email ? 3 : GUEST_DAILY_QUOTA_LIMIT}</span>
                  </div>
                )}
              </div>
            )}
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
                    <h3 className="text-2xl font-cinzel font-black text-[#d4af37] tracking-widest">
                      {t('main.celtic_cross')}
                    </h3>
                    <p className="text-[10px] font-cinzel text-[#d4af37]/70 tracking-widest uppercase">Celtic Cross • 10 Cards</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full">
                  <span className="text-black font-cinzel text-xs font-black tracking-widest">👑 VIP</span>
                </div>
              </div>

              <p className="text-[#d4af37]/60 font-lora italic mb-6 leading-relaxed">
                {t('main.celtic_cross_desc')}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  t('main.celtic_core'),
                  t('main.celtic_obstacle'),
                  t('main.celtic_foundation'),
                  t('main.celtic_past'),
                  t('main.celtic_possibility'),
                  t('main.celtic_future'),
                  t('main.celtic_self'),
                  t('main.celtic_environment'),
                  t('main.celtic_hopes_fears'),
                  t('main.celtic_outcome')
                ].map((pos, i) => (
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
                    toast.info(t('main.celtic_cross_unlock_hint'));
                  }
                }}
                className={`w-full py-4 rounded-full font-cinzel font-black tracking-widest transition-all ${currentUser?.isVip
                  ? 'bg-[#d4af37] text-black hover:brightness-110'
                  : 'border-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10'
                  }`}
              >
                {currentUser?.isVip ? t('main.use_celtic_cross') : t('main.unlock_vip_spread')}
              </button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'main' && appState === AppState.SELECT_SPREAD && currentUser && (
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

      {currentPage === 'main' && appState === AppState.SHUFFLING && (
        <div className="py-32 flex flex-col items-center gap-8">
          {animSettings.shuffleStyle === 'ritual' ? (
            /* 🎬 儀式三幕洗牌：聚合 → 洗切 → 收束 */
            <RitualShuffle
              cardBackImage={getBackImageUrl() || cardBackImage}
              cardBackAlt={t('main.card_back_alt')}
              cardCount={Math.max(5, spread.length || 5)}
            />
          ) : (
            /* 經典抖動洗牌 */
            <div className="relative w-48 h-72">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden"
                  style={{
                    zIndex: 5 - i,
                    animation: `shuffleCard${i % 3} ${1.0 + i * 0.15}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <img
                    src={cardBackImage}
                    alt={t('main.card_back_alt')}
                    className="w-full h-full object-cover rounded-xl border-2 border-[#d4af37]/40"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="text-center">
            <p className="font-cinzel text-[#d4af37] text-2xl tracking-[0.5em] font-black animate-pulse mb-2">
              {t('main.weaving_destiny')}
            </p>
            <p className="text-[#d4af37]/40 font-lora italic text-sm">
              {t('main.weaving_hint')}
            </p>
            {/* 跳過洗牌動畫 */}
            <button
              onClick={handleSkipShuffle}
              className="mt-8 px-6 py-2.5 rounded-full border border-[#d4af37]/30 text-[#d4af37]/60 hover:text-[#d4af37] hover:bg-[#d4af37]/10 font-cinzel text-xs tracking-widest uppercase transition-all active:scale-95 cursor-pointer"
            >
              {t('main.skip_shuffle')}
            </button>
          </div>
        </div>
      )}

      {currentPage === 'main' && (appState === AppState.SPREADING || appState === AppState.INTERACTIVE) && (
        <div className="w-full max-w-7xl flex flex-col items-center gap-4">

          {/* 手機非 Grid 模式：使用 MobileCardViewer */}
          {isMobile && displaySettings.mobileCardDisplayMode !== 'grid' ? (
            <MobileCardViewer
              spread={spread.map(s => ({
                ...s,
                position: t(`spreads:positions.${s.positionId}`, s.position),
                card: {
                  ...s.card,
                  nameZh: t(`cards:cards.${s.card.id}.name`, s.card.nameZh)
                }
              }))}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={getBackImageUrl() || cardBackImage}
              mode={displaySettings.mobileCardDisplayMode}
              spreadType={selectedSpreadId || undefined}
              showCardNameLabel={displaySettings.showCardNameLabel}
            />
          ) : selectedSpreadId === 'celtic_cross' ? (
            /* 凱爾特十字特殊佈局 (桌面版或 Grid 模式) */
            <CelticCrossLayout
              spread={spread.map(s => ({
                ...s,
                position: t(`spreads:positions.${s.positionId}`, s.position),
                card: {
                  ...s.card,
                  nameZh: t(`cards:cards.${s.card.id}.name`, s.card.nameZh)
                }
              }))}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={getBackImageUrl() || cardBackImage}
            />
          ) : selectedSpreadId === 'yearly' ? (
            /* 年度運勢特殊佈局 */
            <YearlyLayout
              spread={spread.map(s => ({
                ...s,
                position: t(`spreads:positions.${s.positionId}`, s.position),
                card: {
                  ...s.card,
                  nameZh: t(`cards:cards.${s.card.id}.name`, s.card.nameZh)
                }
              }))}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={getBackImageUrl() || cardBackImage}
            />
          ) : (
            /* 預設格子佈局 */
            <div className={`grid gap-4 md:gap-10 w-full min-h-[300px] md:min-h-[400px] mb-2 pt-12 md:pt-0 justify-items-center ${spread.length <= 3 ? 'grid-cols-3' :
              spread.length === 4 ? 'grid-cols-2 md:grid-cols-4' :
                spread.length <= 5 ? 'grid-cols-3 md:grid-cols-5' :
                  spread.length <= 6 ? 'grid-cols-3 md:grid-cols-3' :
                    'grid-cols-3 md:grid-cols-4'
              }`}>
              {spread.map((s, idx) => (
                <div
                  key={`${idx}-${s.card.id}`}
                  className={`flex flex-col items-center ${animSettings.dealStyle === 'arc' ? 'deal-arc' : 'animate-deal-card'}`}
                  style={{
                    animationDelay: `${idx * 0.2}s`,
                    zIndex: 10,
                    // 弧線飛行：奇偶交錯來源方向與旋轉
                    ...(animSettings.dealStyle === 'arc' ? {
                      ['--arc-x' as string]: `${(idx % 2 === 0 ? -1 : 1) * (40 + (idx % 4) * 25)}px`,
                      ['--arc-rot' as string]: `${(idx % 2 === 0 ? -1 : 1) * (10 + (idx % 3) * 4)}deg`,
                    } : {}),
                  }}
                >
                  <p className="text-[#d4af37]/60 font-cinzel text-xs tracking-widest uppercase mb-4 text-center">
                    {t(`spreads:positions.${s.positionId}`, s.position)}
                  </p>
                  <TarotCard
                    card={{
                      ...s.card,
                      nameZh: t(`cards:cards.${s.card.id}.name`, s.card.nameZh),
                      image: getCardImageUrl(s.card.id) || s.aiImage || s.card.image
                    }}
                    isFlipped={isFlipped[idx]}
                    isReversed={s.isReversed}
                    onClick={() => flipCard(idx)}
                    size={isMobile ? 'sm' : (spread.length > 5 ? 'sm' : 'lg')}
                    customBack={getBackImageUrl() || cardBackImage}
                    showNameLabel={displaySettings.showCardNameLabel}
                  />
                  {!isFlipped[idx] && (
                    <p className="mt-4 text-[#d4af37]/40 font-lora italic text-xs animate-pulse">
                      {t('main.click_to_reveal')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {appState === AppState.INTERACTIVE && (
            <div ref={interpretationRef} className="w-full divine-vessel z-50 animate-fade-up">
              <div className="p-4 md:p-12 lg:p-24 relative">

                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleResetCeremony}
                    className="px-4 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37]/70 hover:text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/10 font-cinzel text-xs tracking-widest uppercase flex items-center gap-2 group transition-all"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> {t('main.restart').replace('← ', '')}
                  </button>
                </div>

                <div className="mb-8 md:mb-12 text-center">
                  <div className="inline-block px-10 py-6 obsidian-mirror border-[#d4af37]/10">
                    <p className="text-[10px] font-cinzel tracking-[0.5em] text-[#d4af37]/40 uppercase mb-3">
                      {t('main.inquiry_seal')}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-lora italic text-[#f3e5ab] leading-relaxed">「 {question} 」</h3>
                  </div>
                </div>

                <div className="mb-8 md:mb-16 border-b border-[#d4af37]/20 pb-8 md:pb-12 text-center">
                  <h2 className="text-xl md:text-6xl font-cinzel text-[#d4af37] font-black tracking-[0.1em] md:tracking-[0.2em] gold-text-shimmer">
                    {t('main.oracle_title')}
                  </h2>
                </div>

                {/* 🎭 雙透鏡視角切換器 */}
                {!isTypewriter && messages.length > 0 && (
                  <div className="mb-10 flex justify-center animate-fade-up">
                    <div className="inline-flex p-1.5 rounded-full bg-[#0a0505]/80 border border-[#d4af37]/30 backdrop-blur-sm">
                      <button
                        onClick={() => handleSwitchLens('western')}
                        className={`px-4 md:px-6 py-2.5 rounded-full font-cinzel text-xs md:text-sm tracking-widest transition-all ${
                          activeLens === 'western'
                            ? 'bg-[#d4af37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                            : 'text-[#d4af37]/60 hover:text-[#d4af37]'
                        }`}
                      >
                        🔮 {t('main.lens_western')}
                      </button>
                      <button
                        onClick={() => handleSwitchLens('eastern')}
                        className={`px-4 md:px-6 py-2.5 rounded-full font-cinzel text-xs md:text-sm tracking-widest transition-all ${
                          activeLens === 'eastern'
                            ? 'bg-[#d4af37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                            : 'text-[#d4af37]/60 hover:text-[#d4af37]'
                        }`}
                      >
                        ☯️ {t('main.lens_eastern')}
                      </button>
                      <button
                        onClick={() => handleSwitchLens('compare')}
                        className={`px-4 md:px-6 py-2.5 rounded-full font-cinzel text-xs md:text-sm tracking-widest transition-all ${
                          activeLens === 'compare'
                            ? 'bg-[#d4af37] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                            : 'text-[#d4af37]/60 hover:text-[#d4af37]'
                        }`}
                      >
                        ⚖️ {t('main.lens_compare')}
                      </button>
                    </div>
                  </div>
                )}

                {/* 🎯 摘要先行：首牌卡名金句（設計藍圖：30 秒抓到核心） */}
                {spread.length > 0 && !isTypewriter && messages.length > 0 && (
                  <div className="mb-12 text-center animate-fade-up">
                    <div className="inline-block px-8 py-6 rounded-2xl bg-[#0a0505]/80 border border-[#d4af37]/30 shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-sm">
                      <p className="text-[10px] font-cinzel tracking-[0.4em] text-[#d4af37]/40 uppercase mb-3">
                        {t('main.oracle_summary')}
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        {spread.slice(0, 3).map((s, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <img
                              src={s.aiImage || s.card.image}
                              alt={s.card.nameZh}
                              className="w-14 h-20 md:w-16 md:h-24 object-cover rounded-md border border-[#d4af37]/30 shadow-lg"
                            />
                            <span className="text-[#f3e5ab] font-cinzel text-[10px] md:text-xs tracking-wider">
                              {t(`cards:cards.${s.card.id}.name`, s.card.nameZh)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-[#d4af37]/50 font-lora italic text-sm">
                        {t('main.reading_begins_hint')}
                      </p>
                    </div>
                  </div>
                )}

                {/* 🎭 雙透鏡內容區（compare 模式並排兩欄） */}
                <div className={activeLens === 'compare' ? 'md:grid md:grid-cols-2 md:gap-8' : ''}>
                {/* 🎭 東方智慧視角解讀（雙透鏡） */}
                {(activeLens === 'eastern' || activeLens === 'compare') && (
                  <div className="mb-12 animate-fade-up">
                    {easternReading ? (
                      <div className="px-1 md:px-2">
                        {activeLens === 'compare' && (
                          <p className="mb-4 text-[10px] font-cinzel tracking-[0.4em] text-[#d4af37]/40 uppercase">
                            ☯️ {t('main.lens_eastern')}
                          </p>
                        )}
                        <div className="prose-mystic min-h-[200px]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(easternReading) as string) }} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-4 text-[#d4af37]/50 font-cinzel italic text-xl animate-pulse py-16">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
                        {t('main.seeking_eastern')}
                      </div>
                    )}
                  </div>
                )}

                {/* 解讀區：自然流動（移除內嵌滾動，改由頁面滾動承接，閱讀更流暢） */}
                {(activeLens === 'western' || activeLens === 'compare') && (
                <div className="px-1 md:px-2">
                  {activeLens === 'compare' && (
                    <p className="mb-4 text-[10px] font-cinzel tracking-[0.4em] text-[#d4af37]/40 uppercase">
                      🔮 {t('main.lens_western')}
                    </p>
                  )}
                  <div className="space-y-16">
                    {messages.map((msg, idx) => {
                      // 主要解讀（第一個 model）與打字機階段一致，一律用 markdown 渲染
                      // （依使用者回饋：保持大小標題 + 分段跳行排版，不切換結構化卡片）
                      const isFirstModel = msg.role === 'model' && messages.filter(m => m.role === 'model').indexOf(msg) === 0;
                      // 追問對話：第一個 model 之後的 user/model 訊息用對話氣泡
                      const isFollowUp = !isFirstModel && msg.role === 'model';
                      const isFollowUpQuestion = msg.role === 'user' && messages.filter(m => m.role === 'user').indexOf(msg) > 0;
                      return (
                        <div key={idx} className="animate-fade-up">
                          {msg.role === 'user' ? (
                            isFollowUpQuestion ? (
                              /* 追問問題：對話氣泡（靠右） */
                              <div className="flex justify-end">
                                <div className="max-w-[85%] md:max-w-[70%] px-5 py-3.5 rounded-2xl rounded-br-md bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f3e5ab] font-lora italic leading-relaxed">
                                  {msg.text}
                                </div>
                              </div>
                            ) : (
                              <div className="user-query-box">「 {msg.text} 」</div>
                            )
                          ) : isFollowUp ? (
                            /* 追問回應：對話氣泡（靠左） */
                            <div className="flex justify-start">
                              <div className="max-w-[92%] md:max-w-[75%] px-5 py-4 rounded-2xl rounded-bl-md bg-[#0a0505]/90 border border-[#d4af37]/20">
                                <div className="prose-mystic text-sm md:text-base" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.text) as string) }} />
                              </div>
                            </div>
                          ) : (
                            <div className="prose-mystic min-h-[200px]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.text) as string) }} />
                          )}
                        </div>
                      );
                    })}
                    {isTyping && (
                      <div className="flex items-center justify-center gap-4 text-[#d4af37]/50 font-cinzel italic text-xl animate-pulse">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
                        {t('main.streaming')}
                        {isTypewriter && (
                          <button
                            onClick={() => { skipTypewriterRef.current = true; }}
                            className="ml-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 text-[#d4af37]/70 hover:text-[#d4af37] hover:bg-[#d4af37]/10 font-cinzel text-xs tracking-widest uppercase transition-all active:scale-95 cursor-pointer animate-none"
                          >
                            {t('main.skip_animation')}
                          </button>
                        )}
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>
                )}
                </div>{/* 雙透鏡內容區結束 */}

                {/* 分享按鈕區域 */}
                <div className="mt-8 pt-8 border-t border-[#d4af37]/20 text-center">
                  <p className="text-[#d4af37]/60 font-cinzel text-sm tracking-widest uppercase mb-4">
                    {t('main.share')}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all active:scale-95 group"
                    >
                      <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#d4af37] font-cinzel text-sm">
                        {t('main.share_image')}
                      </span>
                    </button>
                    <button
                      onClick={handleShareText}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all active:scale-95 group"
                    >
                      <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-[#d4af37] font-cinzel text-sm">
                        {t('main.share_text')}
                      </span>
                    </button>
                    <button
                      onClick={handleShareQuote}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all active:scale-95 group"
                    >
                      <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 8.25h9m-9 3.75H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      <span className="text-[#d4af37] font-cinzel text-sm">
                        {t('main.share_quote')}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-20 pt-16 border-t border-[#d4af37]/20 flex flex-col gap-10">
                  {/* 追問次數顯示 */}
                  {!currentUser?.isVip && (
                    <div className="text-center">
                      <div className="inline-block px-6 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/5">
                        <p className="text-yellow-500/80 font-cinzel text-sm tracking-widest">
                          {i18n.language === 'zh-TW' || i18n.language === 'zh-CN' ? (
                            <>
                              🔒 想要深度追問請
                              <span className="underline cursor-pointer hover:text-yellow-500" onClick={() => setShowUpgradeModal(true)}>
                                {t('settings.upgrade_vip')}
                              </span>
                            </>
                          ) : (
                            <span className="cursor-pointer hover:text-yellow-500" onClick={() => setShowUpgradeModal(true)}>
                              {t('main.upgrade_to_followup')}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  {currentUser?.isVip && (
                    <div className="text-center">
                      <p className="text-[#d4af37]/40 font-cinzel text-sm tracking-widest">
                        {t('main.vip_unlimited_followup')}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="flex flex-col md:flex-row gap-3 md:gap-6 items-stretch md:items-center">
                    <div className="flex-1 bg-black/40 border border-[#d4af37]/30 rounded-full px-6 md:px-10 py-3 md:py-6">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={t('main.followup_placeholder')}
                        className="w-full bg-transparent text-[#d4af37] outline-none text-base md:text-xl font-lora italic placeholder-[#d4af37]/30"
                        disabled={!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isTyping || !userInput.trim() || (!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS)}
                      className="gold-button px-8 md:px-12 py-3 md:py-6 rounded-full text-base md:text-xl font-black tracking-widest text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-30 self-center"
                    >
                      {t('main.followup_submit')}
                    </button>
                  </form>

                  <div className="text-center">
                    <button
                      onClick={handleResetCeremony}
                      className="inline-block py-3 md:py-6 px-6 md:px-16 rounded-full border border-[#d4af37]/20 text-[#d4af37]/60 font-cinzel text-xs md:text-lg tracking-[0.1em] md:tracking-[0.3em] uppercase hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-all active:scale-95 whitespace-nowrap"
                    >
                      {t('main.end_reading')}
                    </button>
                    <p className="mt-4 text-[#d4af37]/20 font-lora italic text-xs tracking-widest">
                      {t('main.end_reading_hint')}
                    </p>
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
