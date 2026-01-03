/**
 * Tarot Oracle Database - Major Arcana Interpretations
 * 塔羅神諭資料庫 - 大阿卡納解釋
 * 
 * Structure: Each card has interpretations for:
 * - upright/reversed orientation
 * - 6 categories: love, career, money, self, family, general
 * - Position-specific meanings via positionModifiers
 */

export interface CardInterpretation {
    cardId: number;
    cardName: string;
    cardNameZh: string;
    keywords: string[];
    keywordsZh: string[];

    // Core meaning (general)
    coreMeaning: string;
    coreMeaningZh: string;

    // Category-specific interpretations
    love: string;
    career: string;
    money: string;
    self: string;
    family: string;
    general: string;
}

export interface TarotOracleEntry {
    cardId: number;
    upright: CardInterpretation;
    reversed: CardInterpretation;
}

/**
 * Major Arcana Oracle Database
 * 22 cards × 2 orientations × 6 categories = Complete interpretations
 */
export const TAROT_ORACLE: TarotOracleEntry[] = [
    // ================================================================
    // 0 - The Fool (愚者)
    // ================================================================
    {
        cardId: 0,
        upright: {
            cardId: 0,
            cardName: 'The Fool',
            cardNameZh: '愚者',
            keywords: ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
            keywordsZh: ['新開始', '純真', '自發性', '自由精神'],
            coreMeaning: 'A new journey awaits. Embrace the unknown with an open heart and childlike wonder.',
            coreMeaningZh: '新的旅程正在等待。以開放的心和孩童般的好奇心擁抱未知。',
            love: '感情正迎來新的開始。如果你單身，可能會遇到讓你心動的人；如果已有伴侶，關係將注入新鮮的活力。這是敞開心扉、不設防地去愛的時候。不要過度分析，讓心引導你。',
            career: '事業上有新的機會正在萌芽。這可能是創業、轉職或全新項目的開始。現在適合大膽嘗試，不要被過去的經驗限制。你的創意和熱情將成為最大的資產。',
            money: '財務上可能面臨新的開始，例如新的收入來源或投資機會。保持開放的心態，但也要謹記不要過於衝動。適合小額嘗試，累積經驗後再擴大規模。',
            self: '這是自我探索的絕佳時機。你正站在人生新階段的起點，過去的包袱可以放下了。相信自己的直覺，勇敢踏出舒適圈，你會發現全新的自己。',
            family: '家庭關係中可能有新的發展，例如新成員的加入或關係的重新開始。用輕鬆、開放的態度面對家人，不要帶著過去的成見。新的相處模式正在形成。',
            general: '愚者帶來新開始的訊息。你正站在旅程的起點，一切充滿可能。不要害怕未知，帶著信任與勇氣向前邁進。這是播種的季節，未來的收穫取決於現在的第一步。'
        },
        reversed: {
            cardId: 0,
            cardName: 'The Fool',
            cardNameZh: '愚者',
            keywords: ['recklessness', 'fear', 'holding back', 'naivety'],
            keywordsZh: ['魯莽', '恐懼', '退縮', '天真'],
            coreMeaning: 'Caution is needed. You may be acting recklessly or, conversely, letting fear hold you back from necessary risks.',
            coreMeaningZh: '需要謹慎。你可能過於魯莽，或者相反地，讓恐懼阻止你承擔必要的風險。',
            love: '感情中可能過於衝動或過於害怕。檢視一下自己是否在沒有深思的情況下投入，或者因為害怕受傷而不敢打開心扉。找到平衡點，既不魯莽也不畏縮。',
            career: '職場上可能缺乏規劃或過於冒險。在做重大決定前，先停下來評估風險。如果你一直猶豫不決，問問自己是真的需要更多準備，還是只是在逃避。',
            money: '財務決策需要更謹慎。避免衝動消費或高風險投資。如果你一直不敢投資任何事物，也許是時候評估哪些是合理的財務規劃了。',
            self: '你可能正在逃避成長的機會，或者相反地，在沒有準備的情況下胡亂嘗試。停下來反思：你的衝動是來自真正的渴望，還是逃避現實？',
            family: '家庭互動中可能有些衝動或不成熟的行為。試著在回應前先深呼吸，避免說出讓自己後悔的話。同時，不要因為過去的傷痛而完全封閉自己。',
            general: '逆位愚者提醒你審視自己的行動。你是否過於衝動而忽略了後果？還是過於恐懼而錯失良機？找到勇氣與謹慎之間的平衡點。'
        }
    },

    // ================================================================
    // 1 - The Magician (魔術師)
    // ================================================================
    {
        cardId: 1,
        upright: {
            cardId: 1,
            cardName: 'The Magician',
            cardNameZh: '魔術師',
            keywords: ['manifestation', 'resourcefulness', 'power', 'skill'],
            keywordsZh: ['顯化', '足智多謀', '力量', '技能'],
            coreMeaning: 'You have all the tools and resources you need. Now is the time to take action and manifest your desires.',
            coreMeaningZh: '你擁有所需的一切工具和資源。現在是採取行動、實現願望的時候。',
            love: '你擁有吸引愛情的魅力和能力。如果單身，主動出擊會有好結果；如果有伴侶，你能夠透過溝通和行動改善關係。相信自己的魅力，展現真實的你。',
            career: '你具備成功所需的技能和資源。這是展現才華的時機，無論是提案、談判還是創業，你都能遊刃有餘。專注於目標，將想法化為行動。',
            money: '財務上你有能力創造豐盛。運用你的技能和資源來增加收入。這是投資自己能力的好時機，學習新技能可能帶來意想不到的財務回報。',
            self: '你正處於力量的巔峰。所有改變生活的工具都在你手中，關鍵是採取行動。相信自己的能力，你比你想像的更有力量。',
            family: '你有能力改善家庭氛圍。透過溝通、組織或創意的方式，你可以成為家庭的正向推動者。你的言行對家人有很大的影響力，善用它。',
            general: '魔術師象徵你擁有顯化夢想的能力。天地之間的力量都與你同在，現在缺少的只是行動。專注你的意圖，有意識地運用你的資源。'
        },
        reversed: {
            cardId: 1,
            cardName: 'The Magician',
            cardNameZh: '魔術師',
            keywords: ['manipulation', 'unused potential', 'deception', 'trickery'],
            keywordsZh: ['操控', '未發揮的潛力', '欺騙', '詭計'],
            coreMeaning: 'Your talents may be misdirected or underutilized. Beware of manipulation, either by others or by yourself.',
            coreMeaningZh: '你的才能可能被誤用或未充分發揮。小心操控——無論來自他人還是你自己。',
            love: '感情中可能存在欺騙或操控的行為，無論是你還是對方。檢視這段關係是否建立在真誠之上。同時，不要隱藏真實的自己來討好對方。',
            career: '職場上可能有人在耍心機，或者你自己沒有善用才華。如果感到停滯不前，問問自己是否有全力以赴。提防虛假的承諾或過於美好的交易。',
            money: '財務上要小心詐騙或誤導性的資訊。不要輕信快速致富的方案。如果你有賺錢的能力卻沒有行動，是時候問問自己在逃避什麼。',
            self: '你可能正在欺騙自己，或者沒有發揮真正的潛力。停下來誠實面對自己：你的時間和精力是否用在對的地方？有什麼才能是你一直忽略的？',
            family: '家庭中可能有不真誠的溝通或操控的行為。注意是否有人在利用情感勒索。建立健康的邊界，用真誠取代心機。',
            general: '逆位魔術師警示潛力的浪費或欺騙的存在。檢視你的生活中是否有不真誠的元素，同時問問自己是否正在發揮最大的潛能。'
        }
    },

    // ================================================================
    // 2 - The High Priestess (女教皇)
    // ================================================================
    {
        cardId: 2,
        upright: {
            cardId: 2,
            cardName: 'The High Priestess',
            cardNameZh: '女教皇',
            keywords: ['intuition', 'mystery', 'inner knowledge', 'subconscious'],
            keywordsZh: ['直覺', '神秘', '內在智慧', '潛意識'],
            coreMeaning: 'Trust your intuition. The answers you seek are within you. This is a time for introspection and listening to your inner voice.',
            coreMeaningZh: '相信你的直覺。你尋找的答案就在你內心。這是內省、傾聽內在聲音的時刻。',
            love: '感情中需要更多地聆聽內心。如果對某段關係感到困惑，答案不在外在的建議，而在你的直覺。有些事情也許還未揭曉，保持耐心，真相會在對的時機浮現。',
            career: '職場上你的直覺比你想像的更準確。如果對某個決定感到猶豫，安靜下來聽聽內心的聲音。這也可能暗示有隱藏的資訊尚未揭露，觀察多於行動。',
            money: '財務決策需要更多的內省。不要只看表面數字，感受一下這筆投資或支出是否「感覺對」。有些財務機會可能還沒有完全明朗，等待更多資訊。',
            self: '這是深入探索內在世界的時期。透過冥想、日記或獨處來連結你的潛意識。你內在擁有深刻的智慧，只需安靜下來聆聽。',
            family: '家庭中可能有未說出口的情緒或秘密。用直覺感受家人真正的需求，有時無聲的陪伴比言語更有力量。保持神秘而溫柔的支持角色。',
            general: '女教皇召喚你向內探索。這不是行動的時刻，而是沉思和接收的時刻。相信你的直覺，它正在引導你走向真理。'
        },
        reversed: {
            cardId: 2,
            cardName: 'The High Priestess',
            cardNameZh: '女教皇',
            keywords: ['secrets', 'disconnection', 'silence', 'repressed intuition'],
            keywordsZh: ['秘密', '斷連', '沉默', '壓抑的直覺'],
            coreMeaning: 'You may be ignoring your intuition or keeping secrets that need to come to light. Reconnect with your inner wisdom.',
            coreMeaningZh: '你可能正在忽略直覺，或者隱藏著需要揭露的秘密。重新連結你的內在智慧。',
            love: '感情中可能有秘密或隱藏的議題。是否有什麼話該說卻沒說？或者你是否忽略了直覺發出的警訊？誠實與透明是修復關係的關鍵。',
            career: '工作中可能有資訊被隱藏，或者你沒有聽從內心的指引。如果一直感到不對勁，不要壓抑這個感覺。調查清楚再做決定。',
            money: '財務上可能有隱藏的費用或你忽略的細節。仔細檢查所有條款，不要簽署任何你沒完全理解的文件。同時，聆聽直覺對花費的感受。',
            self: '你可能與內在自我失去連結。日常的忙碌讓你聽不見直覺的聲音。安排時間獨處，重新建立與潛意識的對話。',
            family: '家庭中可能有被壓抑的情緒或未揭開的秘密。這些沉默正在影響關係的品質。考慮是否是時候打破沉默，進行坦誠的對話。',
            general: '逆位女教皇提示你可能忽略了重要的內在訊息。秘密和壓抑的直覺正在阻礙你的進展。是時候面對隱藏的真相了。'
        }
    },

    // ================================================================
    // 3 - The Empress (皇后)
    // ================================================================
    {
        cardId: 3,
        upright: {
            cardId: 3,
            cardName: 'The Empress',
            cardNameZh: '皇后',
            keywords: ['abundance', 'fertility', 'nurturing', 'nature'],
            keywordsZh: ['豐盛', '孕育', '滋養', '自然'],
            coreMeaning: 'Abundance and nurturing energy surrounds you. This is a time of growth, creativity, and connecting with the natural world.',
            coreMeaningZh: '豐盛與滋養的能量環繞著你。這是成長、創造力和連結自然世界的時刻。',
            love: '愛情能量正在蓬勃發展。這張牌象徵深厚的情感連結和感官的愉悅。如果期待懷孕，這是吉兆。感情中充滿溫柔、關懷和浪漫的氛圍。',
            career: '事業進入豐收期。你的創意項目會開花結果，團隊合作順暢。這也暗示滋養他人的職業特別有利，如教育、護理或創意產業。',
            money: '財務狀況豐盛穩定。這是享受生活品質的時候，但不是揮霍。投資於美好事物、健康和舒適的生活環境會帶來長期回報。',
            self: '你正處於個人力量的豐沛期。好好滋養自己——身體、心靈和靈魂。花時間在大自然中，讓大地母親的能量療癒你。',
            family: '家庭氛圍溫馨和諧。這是關心照顧家人的好時機，但也記得接受他人的關愛。家可能會有新成員加入，或者現有的關係更加緊密。',
            general: '皇后帶來豐盛與創造的訊息。大地正在滋養你的夢想，讓它們在對的時間綻放。連結你的感性面，享受生命的美好。'
        },
        reversed: {
            cardId: 3,
            cardName: 'The Empress',
            cardNameZh: '皇后',
            keywords: ['creative block', 'dependence', 'emptiness', 'neglect'],
            keywordsZh: ['創意阻塞', '依賴', '空虛', '忽視'],
            coreMeaning: 'You may be experiencing creative blocks or neglecting self-care. Reconnect with your nurturing side.',
            coreMeaningZh: '你可能正經歷創意阻塞或忽視自我照顧。重新連結你的滋養面向。',
            love: '感情中可能有過度依賴或被忽視的感覺。檢視關係中的給予與接受是否平衡。如果你總是付出，也許該學著接受；如果總是索取，試著回饋。',
            career: '工作上可能感到創意枯竭或職業倦怠。你可能過度付出而忽略了補充自己的能量。休息不是偷懶，而是為了走更長的路。',
            money: '財務上可能有過度消費或物質依賴的傾向。問問自己購買這些東西是真正需要，還是在填補內心的空虛？建立健康的金錢觀念。',
            self: '你可能正在忽視自我照顧。身體發出的訊號不要忽略——疲勞、壓力、情緒低落都在提醒你停下來。滋養自己是責任，不是自私。',
            family: '家庭中可能有被忽視的需求或失衡的照顧關係。有人可能過度付出而精疲力竭，或者有人的需求被長期忽略。重新檢視家庭動態。',
            general: '逆位皇后提醒你照顧好自己。創意和豐盛的能量被阻塞了，可能是因為你太忙於照顧他人而忘了自己。重建內在的花園。'
        }
    },

    // ================================================================
    // 4 - The Emperor (皇帝)
    // ================================================================
    {
        cardId: 4,
        upright: {
            cardId: 4,
            cardName: 'The Emperor',
            cardNameZh: '皇帝',
            keywords: ['authority', 'structure', 'control', 'leadership'],
            keywordsZh: ['權威', '結構', '掌控', '領導力'],
            coreMeaning: 'Structure and authority are your allies. This is a time for discipline, organization, and taking control of your life.',
            coreMeaningZh: '結構與權威是你的盟友。這是紀律、組織和掌控生活的時刻。',
            love: '感情需要更多穩定和承諾。如果你一直在曖昧中游移，是時候確定關係了。這張牌也可能代表一位成熟、可靠、具保護性的伴侶或追求者。',
            career: '事業上你正處於領導位置或即將承擔更多責任。運用你的組織能力和戰略思維來建立穩固的基礎。紀律和結構會帶來成功。',
            money: '財務管理需要更有紀律。這是制定預算、建立儲蓄計劃的好時機。長期穩定的投資比短期投機更適合你現在的狀態。',
            self: '你正在建立內在的力量和自律。設定明確的界限，對不符合你價值觀的事物說不。你有能力成為自己生命的掌控者。',
            family: '家庭中你可能扮演保護者或決策者的角色。用你的穩定和智慧來支持家人，但也要記得權威與關愛並重、剛柔並濟。',
            general: '皇帝代表穩固的力量和結構。運用理性和紀律來建立你想要的生活。你有能力創造秩序、建立規則、實現長遠目標。'
        },
        reversed: {
            cardId: 4,
            cardName: 'The Emperor',
            cardNameZh: '皇帝',
            keywords: ['tyranny', 'rigidity', 'domination', 'lack of discipline'],
            keywordsZh: ['暴政', '僵化', '支配', '缺乏紀律'],
            coreMeaning: 'Authority may be misused or lacking. Examine if you or others are being too controlling or, conversely, too undisciplined.',
            coreMeaningZh: '權威可能被濫用或缺乏。檢視你或他人是否過於控制，或者相反地，太缺乏紀律。',
            love: '感情中可能有控制或權力不平衡的問題。一方可能過於主導而忽視另一方的需求。健康的關係需要平等和尊重，而非支配與服從。',
            career: '職場上可能遇到專制的上司或缺乏結構的混亂。如果你是領導者，反思自己是否過於嚴厲；如果你是員工，學習在不合理的權威下保護自己。',
            money: '財務上可能缺乏紀律或過於嚴苛。要嘛是花錢沒有節制，要嘛是對自己太吝嗇。找到平衡，建立健康但不壓迫的財務習慣。',
            self: '你可能正在與權威衝突——無論是外在的權威還是內在對自律的抗拒。問問自己：你是在反抗不公正，還是在逃避責任？',
            family: '家庭中可能有過度控制或缺乏領導的問題。世代之間的權力動態需要調整。學習既尊重傳統又保持個人獨立。',
            general: '逆位皇帝提醒你檢視權力動態。過度控制和完全缺乏結構都是不健康的。找到權威與自由之間的平衡點。'
        }
    },

    // ================================================================
    // 5 - The Hierophant (教皇)
    // ================================================================
    {
        cardId: 5,
        upright: {
            cardId: 5,
            cardName: 'The Hierophant',
            cardNameZh: '教皇',
            keywords: ['tradition', 'conformity', 'spirituality', 'guidance'],
            keywordsZh: ['傳統', '順從', '靈性', '指引'],
            coreMeaning: 'Traditional wisdom and spiritual guidance are available to you. Consider seeking a mentor or following established paths.',
            coreMeaningZh: '傳統智慧和靈性指引正在為你開啟。考慮尋求導師或遵循已建立的道路。',
            love: '感情可能走向傳統的方向——婚姻、訂婚或正式確定關係。這張牌也暗示雙方可能需要在價值觀上找到共識，或者透過某種儀式來深化連結。',
            career: '職場上適合遵循既有的規則和程序。這是學習、培訓或取得認證的好時機。尋求資深同事或導師的指導會帶來成長。',
            money: '財務上適合採用傳統穩健的方式。諮詢專業理財顧問、遵循經過時間考驗的投資策略，會比創新冒險更適合現在。',
            self: '你可能正在探索靈性或尋求生命的更深意義。考慮學習傳統的智慧體系——無論是宗教、哲學還是古老的修行方式。導師可能會出現。',
            family: '家庭傳統和價值觀此時很重要。可能有家族儀式或重要的家庭場合即將到來。尊重並傳承祖先的智慧，同時也保持開放。',
            general: '教皇帶來傳統智慧的指引。現在不是打破規則的時候，而是從既有的知識體系中學習。結構和傳統能為你提供堅實的基礎。'
        },
        reversed: {
            cardId: 5,
            cardName: 'The Hierophant',
            cardNameZh: '教皇',
            keywords: ['rebellion', 'non-conformity', 'new approaches', 'personal beliefs'],
            keywordsZh: ['叛逆', '不從眾', '新方法', '個人信念'],
            coreMeaning: 'You may be questioning traditions or seeking your own spiritual path. It\'s okay to challenge the status quo.',
            coreMeaningZh: '你可能正在質疑傳統或尋找自己的靈性道路。挑戰現狀是可以的。',
            love: '感情中可能在挑戰傳統期望。也許你選擇了非傳統的關係形式，或者正在打破家庭對伴侶的期待。重要的是忠於自己的心。',
            career: '工作上你可能對現有體制感到窒息。這是創新、創業或走非傳統職涯路線的時機。不必遵循別人的腳本，寫自己的故事。',
            money: '財務上可能在嘗試非傳統的方式。這可能是好事（創新思維）也可能是壞事（忽略基本原則）。確保你的「創新」有穩固的基礎。',
            self: '你正在建立自己的信念體系，可能與你成長過程中被教導的不同。這種靈性獨立是健康的，但也要保持謙遜和開放。',
            family: '你可能與家庭傳統或期望產生衝突。這是成長的一部分，但試著用尊重而非對抗的方式表達你的立場。',
            general: '逆位教皇鼓勵你找到自己的道路。質疑傳統不代表否定它，而是透過理解來決定什麼真正適合你。做你自己的權威。'
        }
    },

    // ================================================================
    // 6 - The Lovers (戀人)
    // ================================================================
    {
        cardId: 6,
        upright: {
            cardId: 6,
            cardName: 'The Lovers',
            cardNameZh: '戀人',
            keywords: ['love', 'harmony', 'relationships', 'choices', 'values alignment'],
            keywordsZh: ['愛', '和諧', '關係', '選擇', '價值觀契合'],
            coreMeaning: 'A significant relationship or choice is highlighted. This card speaks of love, harmony, and the alignment of values.',
            coreMeaningZh: '一段重要的關係或選擇被突顯。這張牌述說著愛、和諧與價值觀的契合。',
            love: '這是愛情最美好的預兆。深刻的連結、靈魂伴侶的相遇、或現有關係的升溫都可能發生。這段感情建立在真正的價值觀契合之上，不只是表面的吸引。',
            career: '工作中你面臨重要的選擇，可能關係到價值觀的取捨。選擇與你核心價值一致的道路，即使看起來比較困難。也可能暗示有益的夥伴關係。',
            money: '財務決策需要考慮價值觀。金錢的使用方式反映你是誰——選擇讓財務決定與你的價值觀一致。可能也暗示財務上的合作機會。',
            self: '你正在整合自己的不同面向——光明與陰影、理性與感性。真正的自愛來自接受完整的自己。這是自我接納和內在和諧的時期。',
            family: '家庭關係和諧美滿。可能有結合兩個家庭的喜事，如婚姻。家人之間的價值觀正在趨於一致，衝突減少，連結加深。',
            general: '戀人牌帶來愛與選擇的訊息。當你面對抉擇時，讓你的價值觀來引導。真正的和諧來自內外一致——選擇忠於你真實自我的道路。'
        },
        reversed: {
            cardId: 6,
            cardName: 'The Lovers',
            cardNameZh: '戀人',
            keywords: ['disharmony', 'imbalance', 'poor choices', 'values conflict'],
            keywordsZh: ['不和諧', '失衡', '糟糕的選擇', '價值觀衝突'],
            coreMeaning: 'There may be disharmony in relationships or internal conflict about values. Important choices may be avoided.',
            coreMeaningZh: '關係中可能存在不和諧或關於價值觀的內在衝突。重要的選擇可能被逃避。',
            love: '感情中可能有不和諧或價值觀的衝突。可能是溝通不良、信任問題，或者發現彼此在根本上不相容。需要誠實面對這段關係的真實狀態。',
            career: '工作上可能面臨困難的抉擇，或者你正在做違背價值觀的事。如果感到不快樂，檢視是否因為妥協了太多。也可能暗示夥伴關係的問題。',
            money: '財務決策可能與價值觀不一致，或者與他人在金錢觀上有衝突。檢視你的消費和投資是否反映真正的你，還是在迎合他人的期待。',
            self: '你可能正處於內在衝突中——想做的與該做的、慾望與責任之間的拉扯。直到你與自己達成和解，外在的和諧也難以實現。',
            family: '家庭中可能有價值觀的衝突或關係的不和。世代之間的差異可能正在造成緊張。試著找到共同點，但也尊重差異。',
            general: '逆位戀人揭示不和諧與選擇的困難。你可能正在逃避重要的決定，或者做出了違背內心的選擇。回到核心價值觀，那裡有你的答案。'
        }
    },

    // ================================================================
    // 7 - The Chariot (戰車)
    // ================================================================
    {
        cardId: 7,
        upright: {
            cardId: 7,
            cardName: 'The Chariot',
            cardNameZh: '戰車',
            keywords: ['control', 'willpower', 'victory', 'determination'],
            keywordsZh: ['掌控', '意志力', '勝利', '決心'],
            coreMeaning: 'Victory through willpower and determination. You have the ability to overcome obstacles and achieve your goals.',
            coreMeaningZh: '透過意志力和決心取得勝利。你有能力克服障礙、達成目標。',
            love: '感情上你正朝著想要的方向前進。這可能需要你主動追求、克服障礙，或者在關係中展現決斷力。堅持你的底線，同時也保持前進的動力。',
            career: '事業上的成功正在路上。你的決心和努力即將得到回報。這是衝刺、征服新領域的時機。保持專注，不要被途中的小挫折擊倒。',
            money: '財務上你正在取得進展。透過紀律和決心，你能夠達成財務目標。這是積極行動的時候——追討欠款、談判加薪、開拓收入來源。',
            self: '你正在展現內在的力量和控制力。將矛盾的內在力量統一起來，朝同一方向前進。你比你想像的更強大，現在是證明的時候。',
            family: '在家庭事務中你可能需要擔起領導責任，帶領家人朝共同目標前進。你的決斷力可以幫助解決僵局或推動重要決定。',
            general: '戰車象徵勝利和掌控。將你的意志力集中在目標上，控制內在的衝突，你必將凱旋。道路也許艱難，但終點的榮耀值得每一步的努力。'
        },
        reversed: {
            cardId: 7,
            cardName: 'The Chariot',
            cardNameZh: '戰車',
            keywords: ['lack of direction', 'aggression', 'losing control', 'obstacles'],
            keywordsZh: ['缺乏方向', '攻擊性', '失控', '障礙'],
            coreMeaning: 'You may be losing control or lacking direction. Aggression or stubbornness may be hindering your progress.',
            coreMeaningZh: '你可能正在失去控制或缺乏方向。攻擊性或固執可能正在阻礙你的進展。',
            love: '感情中可能失去方向或產生控制問題。一方可能過於強勢，或者你們正朝不同方向發展。暫停一下，重新校準彼此的目標。',
            career: '職場上可能遇到挫折或失去動力。project可能偏離軌道，或者你對目標感到迷茫。這不是放棄的時候，而是重新規劃路線的時候。',
            money: '財務計劃可能脫軌或失去控制。衝動消費或過度激進的投資可能造成問題。停下來評估現況，重新建立秩序。',
            self: '你可能感到內在衝突或方向不明。不同的慾望在拉扯你，導致無法前進。靜下心來，找到核心目標，才能重新啟動。',
            family: '家庭中可能有權力鬥爭或方向不一致的問題。爭吵和對抗只會讓情況更糟。找到共同目標，協調而非強迫。',
            general: '逆位戰車顯示障礙和失控。你的戰車可能偏離了軌道，或者你過於用力而適得其反。放鬆控制，找回方向，再重新出發。'
        }
    },

    // ================================================================
    // 8 - Strength (力量)
    // ================================================================
    {
        cardId: 8,
        upright: {
            cardId: 8,
            cardName: 'Strength',
            cardNameZh: '力量',
            keywords: ['inner strength', 'courage', 'compassion', 'patience'],
            keywordsZh: ['內在力量', '勇氣', '慈悲', '耐心'],
            coreMeaning: 'Your strength comes from within. Face challenges with courage, compassion, and patience rather than force.',
            coreMeaningZh: '你的力量來自內在。以勇氣、慈悲和耐心而非蠻力來面對挑戰。',
            love: '感情需要溫柔的力量。不是強行改變對方，而是用耐心和理解來化解矛盾。展現你的脆弱需要勇氣，但這正是建立親密連結的關鍵。',
            career: '職場上你需要的是內在力量而非外在攻擊。面對困難的同事或情境時，保持冷靜和專業。你的沉穩和耐心最終會贏得尊重。',
            money: '財務上需要耐心和長期眼光。不要被恐懼或貪婪驅動，保持穩定的心態。你有內在的力量來度過任何財務挑戰。',
            self: '你正在發現真正的力量不是控制，而是接受。擁抱你的陰影面，馴服內在的野獸而非壓抑它。自我接納是最勇敢的行為。',
            family: '家庭中你是穩定的力量。用耐心和慈悲來處理衝突，而非威權或退縮。你的溫柔堅定能夠療癒傷痛、建立信任。',
            general: '力量牌提醒你真正的力量是柔軟的。像水一樣——柔軟卻能穿透岩石。面對挑戰時，運用內在的勇氣和慈悲，而非蠻力。'
        },
        reversed: {
            cardId: 8,
            cardName: 'Strength',
            cardNameZh: '力量',
            keywords: ['self-doubt', 'weakness', 'insecurity', 'raw emotion'],
            keywordsZh: ['自我懷疑', '軟弱', '不安全感', '原始情緒'],
            coreMeaning: 'You may be feeling weak or doubting yourself. Uncontrolled emotions or passions may be affecting you.',
            coreMeaningZh: '你可能感到軟弱或自我懷疑。失控的情緒或激情可能正在影響你。',
            love: '感情中可能因為不安全感而產生問題。嫉妒、佔有慾或自我懷疑可能正在破壞關係。回到內在，找回自信，才能健康地愛。',
            career: '工作上可能感到力不從心或缺乏自信。這可能是暫時的倦怠或冒牌者症候群。記住你過去的成就，相信自己的能力。',
            money: '財務上可能因為恐懼或衝動而做出不良決策。情緒化的反應——無論是恐慌性拋售還是衝動消費——都需要被覺察和控制。',
            self: '你可能與內在的陰暗面在搏鬥，或者感到精疲力竭。這是需要休息和自我關愛的時刻。承認軟弱不是失敗，是誠實。',
            family: '家庭中可能有失控的情緒或對抗。誰都不願意先退讓，導致局勢惡化。有時候，示弱才是真正的強大。',
            general: '逆位力量顯示內在力量被削弱。你可能正在與恐懼、憤怒或自我懷疑搏鬥。這是回到基本、重建內在穩定的時候。'
        }
    },

    // ================================================================
    // 9 - The Hermit (隱士)
    // ================================================================
    {
        cardId: 9,
        upright: {
            cardId: 9,
            cardName: 'The Hermit',
            cardNameZh: '隱士',
            keywords: ['introspection', 'solitude', 'inner guidance', 'wisdom'],
            keywordsZh: ['內省', '獨處', '內在指引', '智慧'],
            coreMeaning: 'A time for solitude and introspection. The answers you seek will be found within through quiet reflection.',
            coreMeaningZh: '獨處和內省的時刻。你尋找的答案將透過安靜的反思在內心被找到。',
            love: '感情上可能需要一些獨處的時間來反思。這不代表關係出問題，而是需要空間來更清楚地了解自己和這段關係。或者，你可能在等待一個也走過內在旅程的靈魂伴侶。',
            career: '職場上可能需要退後一步思考大方向。這不是衝刺的時候，而是規劃和反思的時期。也許你需要專業的進修或獨自處理一個重要的項目。',
            money: '財務上適合審視和規劃，而非大動作。回顧過去的財務決策，從中學習。現在是儲蓄和準備的時期，而非擴張。',
            self: '這是深入內在探索的黃金時期。透過冥想、寫作、獨處來與內在智慧連結。你正在尋找的答案，外界沒有——只有你自己知道。',
            family: '你可能需要從家庭事務中暫時抽離，獲得一些個人空間。這不是逃避，而是為了更好地回來。你的家人需要理解你這種需求。',
            general: '隱士召喚你走向內在。暫離世俗的喧囂，點亮內心的明燈。真正的智慧在沉默中被聆聽，這是靈魂揭示其秘密的時刻。'
        },
        reversed: {
            cardId: 9,
            cardName: 'The Hermit',
            cardNameZh: '隱士',
            keywords: ['isolation', 'loneliness', 'withdrawal', 'rejection'],
            keywordsZh: ['孤立', '孤獨', '退縮', '拒絕'],
            coreMeaning: 'You may be isolating yourself too much or avoiding necessary introspection. Balance solitude with connection.',
            coreMeaningZh: '你可能過度孤立自己或逃避必要的內省。在獨處與連結之間取得平衡。',
            love: '感情上可能過度退縮或封閉自己。害怕受傷而不敢打開心扉，結果是更深的孤獨。或者，你可能忽略了伴侶的存在而太沉浸在自己的世界。',
            career: '工作上可能過於與世隔絕，錯失了合作和連結的機會。或者，你一直在逃避必要的自我反思和職業規劃。平衡獨處與參與。',
            money: '財務上可能因為逃避而錯失機會，或者過於孤立地做決定而沒有尋求專業意見。有時候需要走出來，向外尋求資源和建議。',
            self: '你可能正在逃避面對自己，或者相反地，過度沉溺在自我反思中而断了與世界的連結。真正的成長需要內在工作與外在實踐的平衡。',
            family: '你可能與家人產生疏離，或者家中有人正在經歷孤獨。伸出手，重建連結。獨處是好的，但孤立會傷害關係。',
            general: '逆位隱士警示孤立和逃避。獨處變成了孤獨，內省變成了逃避。是時候走出洞穴，帶著你學到的智慧回到人群中。'
        }
    },

    // ================================================================
    // 10 - Wheel of Fortune (命運之輪)
    // ================================================================
    {
        cardId: 10,
        upright: {
            cardId: 10,
            cardName: 'Wheel of Fortune',
            cardNameZh: '命運之輪',
            keywords: ['change', 'cycles', 'fate', 'turning point'],
            keywordsZh: ['改變', '循環', '命運', '轉折點'],
            coreMeaning: 'Change is coming. The wheel turns and a new cycle begins. Be open to the opportunities that fate brings.',
            coreMeaningZh: '改變即將來臨。命運之輪轉動，新的循環開始。對命運帶來的機會保持開放。',
            love: '感情正在進入新的階段。命運之輪轉動，可能帶來新的相遇或現有關係的突破。相信時機——如果一段關係要發生，宇宙會安排；如果要結束，那也是為了更好的開始。',
            career: '事業上可能有重大轉變。升遷、換工作、或意想不到的機會都可能發生。這是命運給你的禮物——抓住它。記住，輪子會轉，現在的好運要珍惜。',
            money: '財運正在變化，可能是好的轉變。意外之財、投資回報、或收入增加都有可能。但也記住，輪子會轉，在順境時儲蓄、在逆境時堅持。',
            self: '你正處於生命的轉折點。舊的篇章正在結束，新的正在開始。相信這個過程，即使改變令人不安。你正在演化成更好的自己。',
            family: '家庭正在經歷變化或循環。可能是新成員的加入、搬遷、或關係動態的轉變。順應這些變化，它們是生命自然的節奏。',
            general: '命運之輪宣告改變的到來。生命的唯一常態就是變化，現在是接受這個真理的時候。讓輪子轉動，相信命運的安排，你正被帶向該去的地方。'
        },
        reversed: {
            cardId: 10,
            cardName: 'Wheel of Fortune',
            cardNameZh: '命運之輪',
            keywords: ['bad luck', 'resistance to change', 'setbacks', 'karma'],
            keywordsZh: ['厄運', '抗拒改變', '挫折', '業力'],
            coreMeaning: 'You may be experiencing setbacks or resisting necessary changes. Remember that difficult times are also cycles.',
            coreMeaningZh: '你可能正在經歷挫折或抗拒必要的改變。記住，困難時期也是循環的一部分。',
            love: '感情可能正在經歷低潮期或延遲。這不是永久的——記住輪子總會再轉。如果你正在抗拒關係中的改變，考慮是否該隨順而非抵抗。',
            career: '工作上可能遇到挫折或覺得運氣不佳。這是循環的一部分，低谷之後是上升。利用這段時間積蓄力量，為下一個機會做準備。',
            money: '財運可能暫時不佳，或過去的決策帶來後果。這是學習的機會，不是懲罰。收緊預算，度過這個時期，輪子會再轉向有利的方向。',
            self: '你可能感到被命運捉弄或抗拒生命的改變。記住，你對自己的反應有選擇權，即使對外在事件沒有。這段逆境會過去，並留下珍貴的智慧。',
            family: '家庭可能正在經歷不順利或面對過去決定的後果。這是集體療癒和學習的時期。共同度過難關，關係會因此更強韌。',
            general: '逆位命運之輪提醒你：即使在低谷，輪子仍然在轉。不要抗拒改變或怨嘆命運。這是播種的冬天，春天的收穫會來臨。'
        }
    },

    // ================================================================
    // 11 - Justice (正義)
    // ================================================================
    {
        cardId: 11,
        upright: {
            cardId: 11,
            cardName: 'Justice',
            cardNameZh: '正義',
            keywords: ['justice', 'fairness', 'truth', 'law', 'cause and effect'],
            keywordsZh: ['正義', '公平', '真相', '法律', '因果'],
            coreMeaning: 'Justice and truth prevail. Actions have consequences, and fairness will be served.',
            coreMeaningZh: '正義與真相將會勝出。行為有其後果，公平將得到伸張。',
            love: '感情中真相將浮現，公平將得到伸張。如果你一直被對待不公，情況會改變；如果你有所隱瞞，是時候坦白了。健康的關係建立在誠實與平衡之上。',
            career: '工作上你會得到公平的對待。你的努力將被認可，問題將被正視。如果涉及法律或合約事務，結果會是公正的。誠實和道德操守會帶來回報。',
            money: '財務上因果法則正在運作。正當的收益會來，不義之財會去。如果你有財務糾紛，法律會站在有理的一方。確保你的財務行為經得起審視。',
            self: '這是誠實面對自己的時刻。審視你的行為是否符合你的價值觀。為過去的決定負責，同時做出更好的選擇。自我成長需要誠實的自我評估。',
            family: '家庭中需要公平和平衡。如果有糾紛，客觀地看待情況，而非偏袒任何一方。每個人都需要為自己的言行負責，同時也給予彼此改過的機會。',
            general: '正義牌宣告真相與公平。宇宙有其法則——善因得善果，惡因得惡果。行事公正，為你的選擇負責，正義將站在你這邊。'
        },
        reversed: {
            cardId: 11,
            cardName: 'Justice',
            cardNameZh: '正義',
            keywords: ['unfairness', 'dishonesty', 'lack of accountability', 'bias'],
            keywordsZh: ['不公', '不誠實', '缺乏責任感', '偏見'],
            coreMeaning: 'Injustice or dishonesty may be present. Someone may be avoiding accountability or the truth is being hidden.',
            coreMeaningZh: '可能存在不公正或不誠實。有人可能在逃避責任，或真相被隱藏。',
            love: '感情中可能有不公平或欺騙存在。一方可能沒有承擔應有的責任，或者有隱藏的真相。需要勇敢地面對不平衡，要求或提供誠實。',
            career: '工作中可能遭遇不公平對待或你自己在逃避責任。職場政治可能讓功勞被搶或過錯被轉嫁。保持誠信，即使環境不公。',
            money: '財務上可能有不透明或不公平的情況。仔細審視合約和交易，小心隱藏的費用或欺詐。如果你有欠債或義務，是時候處理了。',
            self: '你可能在逃避面對自己的真相，或對自己太過嚴苛、不公平。誠實但有慈悲地審視自己——既不逃避責任，也不過度自責。',
            family: '家庭中可能有不公平的動態或未解決的不義。偏袒、責怪或逃避責任可能正在傷害關係。呼籲公平，但也從自己做起。',
            general: '逆位正義警示不公與欺騙的存在。真相可能被扭曲，責任可能被推卸。在不公的環境中堅持你的誠信，終究正義會到來。'
        }
    },

    // Continue with remaining cards (12-21)...
];

// Helper function to get oracle by card ID
export const getOracleByCardId = (cardId: number): TarotOracleEntry | undefined => {
    return TAROT_ORACLE.find(entry => entry.cardId === cardId);
};

// Helper function to get interpretation
export const getInterpretation = (
    cardId: number,
    isReversed: boolean,
    category: 'love' | 'career' | 'money' | 'self' | 'family' | 'general' = 'general'
): string => {
    const oracle = getOracleByCardId(cardId);
    if (!oracle) return '';

    const orientation = isReversed ? oracle.reversed : oracle.upright;
    return orientation[category] || orientation.general;
};
