
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { createTarotSession, DeepSeekChat } from './services/geminiService';
import { generateThemedCardArt, isThemeComplete, getCachedArt } from './services/imageService';
import { initMobileApp, hapticFeedback, hapticNotification } from './services/mobileService';
import { saveReading } from './services/historyService';
import { checkFreeQuota, consumeFreeReading } from './services/userService';
import { generateFreeReading } from './services/oracleService';
import { marked } from 'marked';
import { toPng } from 'html-to-image';
import ShareCardPreview from './components/ShareCardPreview';
import UpgradeModal from './components/UpgradeModal';
import UserProfilePage from './components/UserProfilePage';
import CardStyleShop from './components/CardStyleShop';
import PricingPage from './components/PricingPage';

const App: React.FC = () => {
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
  const isPerformingRef = useRef(false);
  const hasRecordedRef = useRef(false); // 防止重複記錄
  const hasConsumedQuotaRef = useRef(false); // 防止重複扣除額度

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

  useEffect(() => {
    if (currentUser?.theme && appState !== AppState.AUTH) {
      performConsecration(currentUser.theme);
    }
  }, [currentUser?.theme, appState]);

  const handleStartShuffle = async () => {
    if (!question.trim() || !selectedSpreadId) return;

    // 🆕 神諭資料庫對所有人免費使用（額度限制已移除）
    // VIP 用戶使用 AI 解讀，免費用戶使用神諭資料庫
    // 如需恢復額度限制，取消下方註釋
    /*
    if (currentUser && !currentUser.isVip) {
      const email = currentUser.email || currentUser.username;
      const { canRead, remaining } = await checkFreeQuota(email);

      if (!canRead) {
        setShowUpgradeModal(true);
        return;
      }

      setCurrentUser(prev => prev ? { ...prev, freeReadingsRemaining: remaining } : null);
    }
    */

    // 獲取選擇的牌陣定義
    const spreadDef = Object.values(SPREADS).find(s => s.id === selectedSpreadId);
    if (!spreadDef) return;

    hasConsumedQuotaRef.current = false; // 重置額度扣除標記
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

    setTimeout(() => {
      setAppState(AppState.SPREADING);
    }, 4000); // 延長洗牌動畫時間
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
      let fullText = '';

      // 🆕 判斷使用神諭資料庫或 AI
      if (currentUser?.isVip) {
        // VIP 用戶：使用 AI 串流解讀
        const chat = createTarotSession(question, spread);
        setAiChat(chat);

        await chat.sendMessageStream(
          { message: "神諭已降臨，請艾瑟瑞爾揭示真相。" },
          (chunk, accumulated) => {
            fullText = accumulated;
            setMessages([{ role: 'model', text: accumulated }]);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
          }
        );
      } else {
        // 免費用戶：使用神諭資料庫（預生成解讀）
        const scenarioKey = detectScenario(question); // 根據問題推測場景
        const cards = spread.map((s, idx) => ({
          cardId: s.card.id,
          cardName: s.card.nameZh,
          isReversed: s.isReversed,
          positionKey: mapPositionToKey(s.position, idx),
        }));

        setMessages([{ role: 'model', text: '✨ 正在從神諭之書中尋找指引...' }]);

        const oracleResult = await generateFreeReading(cards, scenarioKey);

        // 組合成完整解讀文字
        fullText = formatOracleReading(spread, oracleResult);

        // 🆕 模擬打字機效果
        const typewriterEffect = async (text: string) => {
          const chunks: string[] = [];
          const chunkSize = 15; // 每次顯示 15 個字
          for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.substring(0, i + chunkSize));
          }

          for (const chunk of chunks) {
            setMessages([{ role: 'model', text: chunk }]);
            await new Promise(resolve => setTimeout(resolve, 30)); // 30ms 間隔
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
          // 確保最終顯示完整文字
          setMessages([{ role: 'model', text: text }]);
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

        // 🆕 額度扣除已停用（神諭資料庫免費使用）
        // 如需恢復額度扣除，取消下方註釋
        /*
        if (currentUser && !currentUser.isVip && !hasConsumedQuotaRef.current) {
          hasConsumedQuotaRef.current = true;
          const email = currentUser.email || currentUser.username;
          await consumeFreeReading(email);
          setCurrentUser(prev => prev ? {
            ...prev,
            freeReadingsRemaining: Math.max(0, (prev.freeReadingsRemaining || 0) - 1)
          } : null);
        }
        */
      }
    } catch (error) {
      console.error('Interpretation error:', error);
      setMessages([{ role: 'model', text: "命運之線纏繞過深，艾瑟瑞爾暫時無法窺視。請重啟儀式。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  // 🆕 根據問題推測場景（完整覆蓋 50 個 scenario_key）
  const detectScenario = (q: string): string => {
    const lower = q.toLowerCase();

    // ==================== 🏠 房產相關（優先判斷）====================
    if (lower.includes('房') || lower.includes('租') || lower.includes('買房') ||
      lower.includes('搬家') || lower.includes('住') || lower.includes('居')) {
      return 'money_property';
    }

    // ==================== 🎓 學業相關 ====================
    if (lower.includes('考') || lower.includes('成績') || lower.includes('課業') ||
      lower.includes('學校') || lower.includes('畢業') || lower.includes('大學') ||
      lower.includes('高中') || lower.includes('研究所') || lower.includes('升學') ||
      lower.includes('國考') || lower.includes('補習') || lower.includes('論文')) {
      if (lower.includes('留學') || lower.includes('出國')) return 'study_abroad';
      if (lower.includes('錄取') || lower.includes('上榜') || lower.includes('升學')) return 'study_admission';
      if (lower.includes('證照') || lower.includes('認證') || lower.includes('執照')) return 'study_cert';
      if (lower.includes('比賽') || lower.includes('競賽') || lower.includes('競爭')) return 'study_compete';
      if (lower.includes('論文') || lower.includes('報告')) return 'study_thesis';
      if (lower.includes('學') && (lower.includes('技') || lower.includes('能'))) return 'study_skill';
      return 'study_exam';
    }

    // ==================== 💕 愛情相關 ====================
    if (lower.includes('愛') || lower.includes('戀') || lower.includes('感情') ||
      lower.includes('對象') || lower.includes('交往') || lower.includes('喜歡') ||
      lower.includes('男友') || lower.includes('女友') || lower.includes('老公') ||
      lower.includes('老婆') || lower.includes('另一半') || lower.includes('曖昧') ||
      lower.includes('告白') || lower.includes('約會') || lower.includes('脫單')) {
      if (lower.includes('單身') || lower.includes('桃花') || lower.includes('脫單')) return 'love_single';
      if (lower.includes('暗戀') || lower.includes('喜歡的人')) return 'love_crush';
      if (lower.includes('追') || lower.includes('告白') || lower.includes('表白')) return 'love_pursuit';
      if (lower.includes('約會') || lower.includes('交往') || lower.includes('在一起')) return 'love_dating';
      if (lower.includes('復合') || lower.includes('重新') || lower.includes('回來')) return 'love_reunion';
      if (lower.includes('分手') || lower.includes('離開') || lower.includes('放棄')) return 'love_breakup';
      if (lower.includes('結婚') || lower.includes('婚姻') || lower.includes('求婚')) return 'love_marriage';
      if (lower.includes('吵架') || lower.includes('衝突') || lower.includes('冷戰')) return 'love_conflict';
      if (lower.includes('外遇') || lower.includes('出軌') || lower.includes('劈腿')) return 'love_affair';
      return 'love_feelings'; // 一般感情狀況
    }

    // ==================== 👥 人際關係相關 ====================
    if (lower.includes('朋友') || lower.includes('家人') || lower.includes('父母') ||
      lower.includes('同事') || lower.includes('主管') || lower.includes('客戶') ||
      lower.includes('長輩') || lower.includes('鄰居') || lower.includes('對手') ||
      lower.includes('兄弟') || lower.includes('姊妹') || lower.includes('親戚')) {
      if (lower.includes('朋友') || lower.includes('友情')) return 'relation_friend';
      if (lower.includes('家人') || lower.includes('父母') || lower.includes('兄弟') ||
        lower.includes('姊妹') || lower.includes('親戚')) return 'relation_family';
      if (lower.includes('同事') || lower.includes('同仁')) return 'relation_colleague';
      if (lower.includes('客戶') || lower.includes('顧客')) return 'relation_client';
      if (lower.includes('長輩') || lower.includes('主管') || lower.includes('老闆')) return 'relation_elder';
      if (lower.includes('鄰居') || lower.includes('隔壁')) return 'relation_neighbor';
      if (lower.includes('對手') || lower.includes('競爭') || lower.includes('敵人')) return 'relation_rival';
      return 'relation_friend';
    }

    // ==================== 💼 工作事業相關 ====================
    if (lower.includes('工作') || lower.includes('事業') || lower.includes('職場') ||
      lower.includes('公司') || lower.includes('上班') || lower.includes('升遷') ||
      lower.includes('離職') || lower.includes('面試') || lower.includes('求職') ||
      lower.includes('創業') || lower.includes('退休')) {
      if (lower.includes('找工作') || lower.includes('求職') || lower.includes('應徵')) return 'career_seeking';
      if (lower.includes('面試') || lower.includes('筆試')) return 'career_interview';
      if (lower.includes('離職') || lower.includes('轉職') || lower.includes('換工作') || lower.includes('跳槽')) return 'career_change';
      if (lower.includes('升遷') || lower.includes('晉升') || lower.includes('升職')) return 'career_promotion';
      if (lower.includes('加薪') || lower.includes('調薪')) return 'career_raise';
      if (lower.includes('創業') || lower.includes('開店') || lower.includes('自己做')) return 'career_startup';
      if (lower.includes('合夥') || lower.includes('夥伴') || lower.includes('合作')) return 'career_partner';
      if (lower.includes('衝突') || lower.includes('不合')) return 'career_conflict';
      if (lower.includes('退休') || lower.includes('養老')) return 'career_retire';
      return 'career_current';
    }

    // ==================== 💰 財運相關 ====================
    if (lower.includes('錢') || lower.includes('財') || lower.includes('投資') ||
      lower.includes('理財') || lower.includes('賺') || lower.includes('萬') ||
      lower.includes('存款') || lower.includes('收入') || lower.includes('支出') ||
      lower.includes('生意') || lower.includes('成交') || lower.includes('買賣')) {
      if (lower.includes('投資') || lower.includes('股票') || lower.includes('基金')) return 'money_invest';
      if (lower.includes('彩券') || lower.includes('樂透') || lower.includes('中獎') || lower.includes('運氣')) return 'money_luck';
      if (lower.includes('意外') || lower.includes('橫財') || lower.includes('飛來')) return 'money_windfall';
      if (lower.includes('生意') || lower.includes('做生意') || lower.includes('買賣')) return 'money_business';
      if (lower.includes('借') || lower.includes('貸款') || lower.includes('信貸')) return 'money_loan';
      if (lower.includes('債') || lower.includes('還錢') || lower.includes('欠')) return 'money_debt';
      if (lower.includes('虧') || lower.includes('損失') || lower.includes('賠')) return 'money_loss';
      if (lower.includes('規劃') || lower.includes('計劃') || lower.includes('預算')) return 'money_plan';
      return 'money_salary';
    }

    // ==================== 🏥 健康相關 ====================
    if (lower.includes('健康') || lower.includes('身體') || lower.includes('病') ||
      lower.includes('醫') || lower.includes('痛') || lower.includes('不舒服')) {
      if (lower.includes('手術') || lower.includes('開刀')) return 'health_surgery';
      if (lower.includes('懷孕') || lower.includes('寶寶') || lower.includes('孕')) return 'health_pregnancy';
      if (lower.includes('生產') || lower.includes('生小孩')) return 'health_birth';
      if (lower.includes('心理') || lower.includes('壓力') || lower.includes('焦慮') ||
        lower.includes('憂鬱') || lower.includes('情緒')) return 'health_mental';
      if (lower.includes('康復') || lower.includes('恢復') || lower.includes('痊癒')) return 'health_recovery';
      return 'health_body';
    }

    // ==================== 預設：一般財運 ====================
    return 'money_salary';
  };

  // 🆕 映射位置名稱到 key
  const mapPositionToKey = (positionName: string, index: number): string => {
    const keyMap: Record<string, string> = {
      '過去': 'past', '現在': 'present', '未來': 'future',
      '自己': 'self', '對方': 'other', '結果': 'outcome',
      '障礙': 'obstacle', '建議': 'advice', '環境': 'environment',
      '潛意識': 'subconscious'
    };
    return keyMap[positionName] || ['past', 'present', 'future', 'self', 'other', 'outcome', 'advice', 'obstacle', 'environment', 'subconscious'][index % 10];
  };

  // 🆕 格式化神諭解讀結果
  const formatOracleReading = (
    cards: (CardReading & { aiImage?: string })[],
    result: { interpretations: { position: string; text: string }[]; relationships: string[]; summary: string }
  ): string => {
    let text = '## ✨ 神諭啟示\n\n';

    // 每張牌的解讀
    cards.forEach((card, idx) => {
      const interp = result.interpretations[idx];
      text += `### 【${interp?.position || card.position}】${card.card.nameZh}${card.isReversed ? '（逆位）' : '（正位）'}\n\n`;
      text += (interp?.text || '此刻的能量正在流動中...') + '\n\n';
    });

    // 總結
    if (result.summary) {
      text += '---\n\n';
      text += '### 📿 總體指引\n\n';
      text += result.summary + '\n';
    }

    return text;
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
    // 顯示分享卡片
    setShowShareCard(true);

    // 等待 DOM 渲染
    await new Promise(resolve => setTimeout(resolve, 300));

    const node = shareCardRef.current;
    if (!node) {
      setShowShareCard(false);
      alert('生成圖卡失敗，請重試');
      return;
    }

    // 準備完整解讀文字
    const cardNames = spread.map(s => `${s.position}: ${s.card.nameZh}(${s.isReversed ? '逆位' : '正位'})`).join('\n');
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

    const fullShareText = `✦ 艾瑟瑞爾塔羅神諭 ✦

📿 我的提問：
「${question}」

🎴 抽出的牌陣：
${cardNames}

🔮 神諭啟示：
${cleanedInterpretation}

─────────
🌐 majorarcana.app
在聖殿的穹頂之下，窺見命運的真相`;

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
        alert('✅ 圖卡已下載！\n📋 完整解讀內容已複製到剪貼簿\n\n您可以將圖片和文字一起分享至社群媒體。');
      }
    } catch (err) {
      console.error('Share image failed:', err);
      // 再次降級：只複製完整文字
      await navigator.clipboard.writeText(fullShareText);
      alert('圖卡生成失敗，但完整神諭內容已複製到剪貼簿！');
    } finally {
      setShowShareCard(false);
    }
  };

  // 分享純文字（完整解讀）
  const handleShareText = async () => {
    const cardNames = spread.map(s => `${s.position}: ${s.card.nameZh}(${s.isReversed ? '逆位' : '正位'})`).join('\n');
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

    const fullShareText = `✦ 艾瑟瑞爾塔羅神諭 ✦

📿 我的提問：
「${question}」

🎴 抽出的牌陣：
${cardNames}

🔮 神諭啟示：
${cleanedInterpretation}

─────────
🌐 majorarcana.app
在聖殿的穹頂之下，窺見命運的真相`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Aetheris 塔羅神諭',
          text: fullShareText,
        });
      } catch (err) {
        console.log('Share failed, copying to clipboard');
        await navigator.clipboard.writeText(fullShareText);
        alert('📋 完整神諭內容已複製到剪貼簿！');
      }
    } else {
      await navigator.clipboard.writeText(fullShareText);
      alert('📋 完整神諭內容已複製到剪貼簿！');
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
        <AuthPage onAuthSuccess={handleSupabaseAuthSuccess} />
      )}

      {currentPage === 'main' && appState === AppState.WELCOME && (
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
                  <p className="text-xs md:text-sm font-cinzel text-[#ffd700]/80 tracking-widest uppercase mb-1 group-hover:text-[#ffd700]">點擊此處可更換牌陣</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ffd700]/60 text-sm">現在牌陣:</span>
                    <p className="text-lg md:text-2xl font-cinzel text-[#ffd700] font-black">
                      {selectedSpreadId
                        ? Object.values(SPREADS).find(s => s.id === selectedSpreadId)?.nameZh
                        : '請選擇牌陣'}
                    </p>
                    <span className="text-[#ffd700] text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-2xl md:text-4xl font-cinzel text-[#d4af37] tracking-[0.2em] md:tracking-[0.3em] font-black uppercase mb-2">叩問星穹</h2>
              <p className="text-[#d4af37]/40 font-lora italic text-sm md:text-base">請於心中默唸您的靈魂之惑，星穹之靈將為您撥開命運的塵埃。</p>
            </div>

            <div className="border-2 border-[#d4af37]/40 rounded-xl p-1 mb-6 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <div className="obsidian-mirror p-6 md:p-8 rounded-lg">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="在此輸入您的靈魂之惑..."
                  className="w-full h-24 md:h-40 bg-transparent text-[#f3e5ab] placeholder-[#d4af37]/40 focus:outline-none font-lora italic text-base md:text-xl leading-relaxed custom-scrollbar resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleStartShuffle}
                disabled={!question.trim() || !selectedSpreadId}
                className="flex-[2] py-3 md:py-5 rounded-full gold-button text-base md:text-xl font-black tracking-[0.2em] md:tracking-[0.5em] disabled:opacity-20 disabled:grayscale transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                領受天啟
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 py-3 md:py-5 rounded-full border border-[#d4af37]/40 text-[#d4af37] font-cinzel text-xs tracking-widest uppercase hover:bg-[#d4af37]/10 transition-all"
              >
                歷史記錄
              </button>
            </div>

            {/* 🆕 免費額度顯示 */}
            {currentUser && (
              <div className="mt-6 text-center">
                {currentUser.isVip ? (
                  <p className="text-[#d4af37]/60 font-cinzel text-sm tracking-widest">
                    👑 VIP 會員 · 無限次神諭
                  </p>
                ) : (
                  <div
                    className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#d4af37]/30 bg-black/30 cursor-pointer hover:border-[#d4af37]/60 transition-all"
                    onClick={() => setShowUpgradeModal(true)}
                  >
                    <span className="text-[#d4af37]/60 font-cinzel text-sm tracking-widest">
                      本月剩餘神諭次數
                    </span>
                    <span className={`font-cinzel font-black text-lg ${(currentUser.freeReadingsRemaining || 0) === 0
                      ? 'text-red-400'
                      : 'text-[#d4af37]'
                      }`}>
                      {currentUser.freeReadingsRemaining ?? 3}
                    </span>
                    <span className="text-[#d4af37]/40 text-xs">/ 3</span>
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
                    <h3 className="text-2xl font-cinzel font-black text-[#d4af37] tracking-widest">凱爾特十字</h3>
                    <p className="text-[10px] font-cinzel text-[#d4af37]/70 tracking-widest uppercase">Celtic Cross • 10 Cards</p>
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
                  alt="牌背"
                  className="w-full h-full object-cover rounded-xl border-2 border-[#d4af37]/40"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="font-cinzel text-[#d4af37] text-2xl tracking-[0.5em] font-black animate-pulse mb-2">天啟編織中</p>
            <p className="text-[#d4af37]/40 font-lora italic text-sm">正在為您編織命運的絲線...</p>
          </div>
        </div>
      )}

      {currentPage === 'main' && (appState === AppState.SPREADING || appState === AppState.INTERACTIVE) && (
        <div className="w-full max-w-7xl flex flex-col items-center gap-4">

          {/* 手機非 Grid 模式：使用 MobileCardViewer */}
          {isMobile && displaySettings.mobileCardDisplayMode !== 'grid' ? (
            <MobileCardViewer
              spread={spread}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={getBackImageUrl() || cardBackImage}
              mode={displaySettings.mobileCardDisplayMode}
              spreadType={selectedSpreadId || undefined}
            />
          ) : selectedSpreadId === 'celtic_cross' ? (
            /* 凱爾特十字特殊佈局 (桌面版或 Grid 模式) */
            <CelticCrossLayout
              spread={spread}
              isFlipped={isFlipped}
              onFlipCard={flipCard}
              cardBackImage={getBackImageUrl() || cardBackImage}
            />
          ) : selectedSpreadId === 'yearly' ? (
            /* 年度運勢特殊佈局 */
            <YearlyLayout
              spread={spread}
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
                  className="flex flex-col items-center animate-deal-card"
                  style={{ animationDelay: `${idx * 0.2}s`, zIndex: 10 }}
                >
                  <p className="text-[#d4af37]/60 font-cinzel text-xs tracking-widest uppercase mb-4 text-center">{s.position}</p>
                  <TarotCard
                    card={{ ...s.card, image: getCardImageUrl(s.card.id) || s.aiImage || s.card.image }}
                    isFlipped={isFlipped[idx]}
                    isReversed={s.isReversed}
                    onClick={() => flipCard(idx)}
                    size={isMobile ? 'sm' : (spread.length > 5 ? 'sm' : 'lg')}
                    customBack={getBackImageUrl() || cardBackImage}
                    showNameLabel={displaySettings.showCardNameLabel}
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

                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleResetCeremony}
                    className="px-4 py-2 rounded-full border border-[#d4af37]/40 text-[#d4af37]/70 hover:text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/10 font-cinzel text-xs tracking-widest uppercase flex items-center gap-2 group transition-all"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> 重啟儀式
                  </button>
                </div>

                <div className="mb-8 md:mb-12 text-center">
                  <div className="inline-block px-10 py-6 obsidian-mirror border-[#d4af37]/10">
                    <p className="text-[10px] font-cinzel tracking-[0.5em] text-[#d4af37]/40 uppercase mb-3">提問魂印 (The Inquiry)</p>
                    <h3 className="text-2xl md:text-3xl font-lora italic text-[#f3e5ab] leading-relaxed">「 {question} 」</h3>
                  </div>
                </div>

                <div className="mb-8 md:mb-16 border-b border-[#d4af37]/20 pb-8 md:pb-12 text-center">
                  <h2 className="text-xl md:text-6xl font-cinzel text-[#d4af37] font-black tracking-[0.1em] md:tracking-[0.2em] gold-text-shimmer">艾瑟瑞爾的神諭</h2>
                </div>

                <div className="max-h-[1200px] overflow-y-auto pr-8 custom-scrollbar">
                  <div className="space-y-20">
                    {messages.map((msg, idx) => (
                      <div key={idx} className="animate-fade-up">
                        {msg.role === 'user' ? (
                          <div className="user-query-box">「 {msg.text} 」</div>
                        ) : (
                          <div className="prose-mystic min-h-[200px]" dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
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

                {/* 分享按鈕區域 */}
                <div className="mt-8 pt-8 border-t border-[#d4af37]/20 text-center">
                  <p className="text-[#d4af37]/60 font-cinzel text-sm tracking-widest uppercase mb-4">✦ 分享給好友 ✦</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all active:scale-95 group"
                    >
                      <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-[#d4af37] font-cinzel text-sm">圖卡</span>
                    </button>
                    <button
                      onClick={handleShareText}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all active:scale-95 group"
                    >
                      <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-[#d4af37] font-cinzel text-sm">全文</span>
                    </button>
                  </div>
                </div>

                <div className="mt-20 pt-16 border-t border-[#d4af37]/20 flex flex-col gap-10">
                  {/* 追問次數顯示 */}
                  {!currentUser?.isVip && (
                    <div className="text-center">
                      <div className="inline-block px-6 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/5">
                        <p className="text-yellow-500/80 font-cinzel text-sm tracking-widest">
                          🔒 想要深度追問請<span className="underline cursor-pointer hover:text-yellow-500" onClick={() => setShowUpgradeModal(true)}>升級 VIP</span>
                        </p>
                      </div>
                    </div>
                  )}
                  {currentUser?.isVip && (
                    <div className="text-center">
                      <p className="text-[#d4af37]/40 font-cinzel text-sm tracking-widest">
                        👑 VIP 會員 · 無限追問
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSendMessage} className="flex flex-col md:flex-row gap-3 md:gap-6 items-stretch md:items-center">
                    <div className="flex-1 bg-black/40 border border-[#d4af37]/30 rounded-full px-6 md:px-10 py-3 md:py-6">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="向隱士追問命運的細節..."
                        className="w-full bg-transparent text-[#d4af37] outline-none text-base md:text-xl font-lora italic placeholder-[#d4af37]/30"
                        disabled={!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isTyping || !userInput.trim() || (!currentUser?.isVip && followUpCount >= MAX_FREE_FOLLOWUPS)}
                      className="gold-button px-8 md:px-12 py-3 md:py-6 rounded-full text-base md:text-xl font-black tracking-widest text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-30 self-center"
                    >
                      探尋
                    </button>
                  </form>

                  <div className="text-center">
                    <button
                      onClick={handleResetCeremony}
                      className="inline-block py-3 md:py-6 px-6 md:px-16 rounded-full border border-[#d4af37]/20 text-[#d4af37]/60 font-cinzel text-xs md:text-lg tracking-[0.1em] md:tracking-[0.3em] uppercase hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-all active:scale-95 whitespace-nowrap"
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
