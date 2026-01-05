/**
 * 神諭 QA 自動化系統
 * 用於審核神諭解讀是否對題，並建議關鍵詞修正
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// 所有 scenario 定義
const SCENARIOS = [
    // 學業相關
    { key: 'study_exam', category: '學業', name: '考試', keywords: ['考', '成績', '學校', '大學'] },
    { key: 'study_abroad', category: '學業', name: '留學', keywords: ['留學', '出國'] },
    { key: 'study_admission', category: '學業', name: '錄取', keywords: ['錄取', '上榜', '升學'] },
    { key: 'study_cert', category: '學業', name: '證照', keywords: ['證照', '認證', '執照'] },
    { key: 'study_compete', category: '學業', name: '比賽', keywords: ['比賽', '競賽'] },
    { key: 'study_thesis', category: '學業', name: '論文', keywords: ['論文', '報告'] },
    { key: 'study_skill', category: '學業', name: '技能學習', keywords: ['學技', '學能'] },

    // 愛情相關
    { key: 'love_single', category: '愛情', name: '單身', keywords: ['單身', '桃花', '脫單'] },
    { key: 'love_crush', category: '愛情', name: '暗戀', keywords: ['暗戀', '喜歡的人'] },
    { key: 'love_pursuit', category: '愛情', name: '追求', keywords: ['追', '告白', '表白'] },
    { key: 'love_dating', category: '愛情', name: '交往', keywords: ['約會', '交往', '在一起'] },
    { key: 'love_reunion', category: '愛情', name: '復合', keywords: ['復合', '重新', '回來'] },
    { key: 'love_breakup', category: '愛情', name: '分手', keywords: ['分手', '離開', '放棄'] },
    { key: 'love_marriage', category: '愛情', name: '婚姻', keywords: ['結婚', '婚姻', '求婚'] },
    { key: 'love_conflict', category: '愛情', name: '感情衝突', keywords: ['吵架', '衝突', '冷戰'] },
    { key: 'love_affair', category: '愛情', name: '外遇', keywords: ['外遇', '出軌', '劈腿'] },
    { key: 'love_feelings', category: '愛情', name: '感情狀況', keywords: ['感情', '愛', '戀'] },

    // 人際關係
    { key: 'relation_friend', category: '人際', name: '朋友', keywords: ['朋友', '友情'] },
    { key: 'relation_family', category: '人際', name: '家人', keywords: ['家人', '父母', '兄弟', '姊妹'] },
    { key: 'relation_colleague', category: '人際', name: '同事', keywords: ['同事', '同仁'] },
    { key: 'relation_client', category: '人際', name: '客戶', keywords: ['客戶', '顧客'] },
    { key: 'relation_elder', category: '人際', name: '長輩', keywords: ['長輩', '主管', '老闆'] },
    { key: 'relation_neighbor', category: '人際', name: '鄰居', keywords: ['鄰居', '隔壁'] },
    { key: 'relation_rival', category: '人際', name: '對手', keywords: ['對手', '競爭', '敵人'] },

    // 事業相關
    { key: 'career_seeking', category: '事業', name: '求職', keywords: ['找工作', '求職', '應徵'] },
    { key: 'career_interview', category: '事業', name: '面試', keywords: ['面試', '筆試'] },
    { key: 'career_change', category: '事業', name: '轉職', keywords: ['離職', '轉職', '換工作', '跳槽'] },
    { key: 'career_promotion', category: '事業', name: '升遷', keywords: ['升遷', '晉升', '升職'] },
    { key: 'career_raise', category: '事業', name: '加薪', keywords: ['加薪', '調薪'] },
    { key: 'career_startup', category: '事業', name: '創業', keywords: ['創業', '開店', '自己做'] },
    { key: 'career_partner', category: '事業', name: '合夥', keywords: ['合夥', '夥伴', '合作'] },
    { key: 'career_conflict', category: '事業', name: '職場衝突', keywords: ['衝突', '不合'] },
    { key: 'career_retire', category: '事業', name: '退休', keywords: ['退休', '養老'] },
    { key: 'career_current', category: '事業', name: '目前工作', keywords: ['工作', '事業', '職場'] },

    // 財運相關
    { key: 'money_property', category: '財運', name: '房產', keywords: ['房', '租', '買房', '搬家'] },
    { key: 'money_invest', category: '財運', name: '投資', keywords: ['投資', '股票', '基金'] },
    { key: 'money_luck', category: '財運', name: '運氣', keywords: ['彩券', '樂透', '中獎'] },
    { key: 'money_windfall', category: '財運', name: '意外之財', keywords: ['意外', '橫財'] },
    { key: 'money_business', category: '財運', name: '生意', keywords: ['生意', '做生意', '買賣', '賣'] },
    { key: 'money_loan', category: '財運', name: '貸款', keywords: ['借', '貸款', '信貸'] },
    { key: 'money_debt', category: '財運', name: '債務', keywords: ['債', '還錢', '欠'] },
    { key: 'money_loss', category: '財運', name: '損失', keywords: ['虧', '損失', '賠'] },
    { key: 'money_plan', category: '財運', name: '理財', keywords: ['規劃', '計劃', '預算'] },
    { key: 'money_salary', category: '財運', name: '薪水', keywords: ['錢', '財', '收入'] },

    // 健康相關
    { key: 'health_surgery', category: '健康', name: '手術', keywords: ['手術', '開刀'] },
    { key: 'health_pregnancy', category: '健康', name: '懷孕', keywords: ['懷孕', '寶寶', '孕'] },
    { key: 'health_birth', category: '健康', name: '生產', keywords: ['生產', '生小孩'] },
    { key: 'health_mental', category: '健康', name: '心理', keywords: ['心理', '壓力', '焦慮', '憂鬱'] },
    { key: 'health_recovery', category: '健康', name: '康復', keywords: ['康復', '恢復', '痊癒'] },
    { key: 'health_body', category: '健康', name: '身體健康', keywords: ['健康', '身體', '病'] },

    // 通用場景（新增）
    { key: 'general_search', category: '通用', name: '尋物尋人', keywords: ['找', '遺失', '走失', '不見', '丟'] },
    { key: 'general_travel', category: '通用', name: '旅行', keywords: ['旅', '出國', '旅遊', '玩'] },
    { key: 'general_legal', category: '通用', name: '法律', keywords: ['官司', '訴訟', '法律', '告'] },
    { key: 'general_move', category: '通用', name: '搬遷', keywords: ['搬家', '移民', '遷居'] },
    { key: 'general_luck', category: '通用', name: '運勢', keywords: ['運氣', '時機', '順利'] },
    { key: 'general_future', category: '通用', name: '未來展望', keywords: ['未來', '前途', '展望'] },
    { key: 'general_decision', category: '通用', name: '決策', keywords: ['該不該', '適合', '可以嗎'] },
    { key: 'general_compete', category: '通用', name: '競爭', keywords: ['比賽', '競賽', '贏', '輸'] },
    { key: 'general_spiritual', category: '通用', name: '靈異風水', keywords: ['風水', '靈異', '神明'] },
    { key: 'general_gamble', category: '通用', name: '賭博', keywords: ['賭', '機率'] },
    { key: 'general_vehicle', category: '通用', name: '車輛', keywords: ['車', '汽車', '機車'] },
    { key: 'general_gift', category: '通用', name: '禮物', keywords: ['禮物', '驚喜', '送'] },
    { key: 'general_contact', category: '通用', name: '聯絡', keywords: ['聯絡', '消息', '回覆'] },
    { key: 'general_weather', category: '通用', name: '天氣', keywords: ['天氣', '下雨', '活動'] },
    { key: 'general_contract', category: '通用', name: '契約', keywords: ['合約', '契約', '簽約', '成交'] },
    { key: 'general_direction', category: '通用', name: '方位指引', keywords: ['方位', '方向', '往哪', '迷路'] },
];

// 測試問題集（擴展版：涵蓋人類生活場景與靈性需求）
const TEST_QUESTIONS: Record<string, string[]> = {
    // ==================== 🎓 學業考試 ====================
    'study_exam': [
        '我這次期末考能過嗎？',
        '明年的國考能上榜嗎？',
        '這次多益能考過600分嗎？',
        '駕照考試會順利嗎？',
        '這次模擬考成績會進步嗎？',
        '我能通過這次資格考試嗎？'
    ],
    'study_abroad': [
        '我適合去美國留學嗎？',
        '今年能拿到留學簽證嗎？',
        '出國讀書對我的未來好嗎？',
        '我該選擇去日本還是英國留學？'
    ],
    'study_admission': [
        '能錄取這所大學嗎？',
        '研究所推甄會上嗎？',
        '我會被第一志願錄取嗎？',
        '轉學考能考上嗎？'
    ],
    'study_cert': [
        '這次證照考試能過嗎？',
        '我適合考會計師執照嗎？',
        '拿到這張證照對職涯有幫助嗎？'
    ],

    // ==================== 💕 愛情關係 ====================
    'love_single': [
        '今年有機會脫單嗎？',
        '我的桃花運如何？',
        '什麼時候會遇到另一半？',
        '今年會有人追我嗎？',
        '我會在哪裡遇到真愛？'
    ],
    'love_crush': [
        '他對我有感覺嗎？',
        '暗戀的人會注意到我嗎？',
        '他心裡有我嗎？',
        '她是否也喜歡我？',
        '他已讀不回是什麼意思？'
    ],
    'love_pursuit': [
        '我該告白嗎？',
        '追他會成功嗎？',
        '現在是告白的好時機嗎？',
        '我主動聯繫他會不會太急？',
        '送禮物給她會讓她開心嗎？'
    ],
    'love_dating': [
        '我們的感情會順利嗎？',
        '這段交往會長久嗎？',
        '我們之間的問題能解決嗎？',
        '他會一直愛我嗎？',
        '我們適合繼續在一起嗎？'
    ],
    'love_marriage': [
        '我們適合結婚嗎？',
        '今年會被求婚嗎？',
        '什麼時候是結婚的好時機？',
        '我們的婚姻會幸福嗎？',
        '婆媳關係會和諧嗎？'
    ],
    'love_breakup': [
        '我該分手嗎？',
        '分手是正確的決定嗎？',
        '離開他我會後悔嗎？'
    ],
    'love_reunion': [
        '我們還有復合的可能嗎？',
        '前任會回來找我嗎？',
        '我該主動聯繫前任嗎？'
    ],

    // ==================== 👥 人際關係 ====================
    'relation_friend': [
        '這個朋友值得深交嗎？',
        '我們的友誼會長久嗎？',
        '這個朋友會背叛我嗎？'
    ],
    'relation_family': [
        '跟父母的關係能改善嗎？',
        '家庭關係會和諧嗎？',
        '我該搬出去住嗎？'
    ],
    'relation_colleague': [
        '這個同事可以信任嗎？',
        '職場人際關係會好轉嗎？'
    ],
    'relation_elder': [
        '主管會欣賞我的表現嗎？',
        '老闆對我的印象如何？'
    ],

    // ==================== 💼 工作事業 ====================
    'career_seeking': [
        '我能找到理想的工作嗎？',
        '這份工作適合我嗎？',
        '什麼時候會收到錄取通知？'
    ],
    'career_interview': [
        '這次面試會過嗎？',
        '明天的面試該怎麼準備？',
        '面試官會喜歡我嗎？',
        '我會被錄取嗎？'
    ],
    'career_change': [
        '我該離職嗎？',
        '現在轉職是好時機嗎？',
        '換工作對我有利嗎？'
    ],
    'career_promotion': [
        '今年有機會升遷嗎？',
        '這次考績能升職嗎？',
        '主管會提拔我嗎？',
        '我的努力會被看見嗎？'
    ],
    'career_startup': [
        '我適合自己創業嗎？',
        '開店會成功嗎？',
        '創業的時機對嗎？',
        '這個商業點子可行嗎？',
        '開咖啡店能賺錢嗎？'
    ],
    'career_current': [
        '這份工作我該繼續做嗎？',
        '工作壓力會減輕嗎？',
        '職場環境會改善嗎？'
    ],

    // ==================== 💰 財運金錢 ====================
    'money_property': [
        '這間房子適合買嗎？',
        '今天看的房子適合租下嗎？',
        '現在是買房的好時機嗎？',
        '這個地段值得投資嗎？'
    ],
    'money_invest': [
        '現在適合買股票嗎？',
        '這支基金能賺錢嗎？',
        '投資虛擬貨幣會賺嗎？',
        '定期定額適合我嗎？'
    ],
    'money_business': [
        '這筆生意可以成交嗎？',
        '這周能賣出商品嗎？',
        '客戶會簽單嗎？',
        '這個項目能賺錢嗎？',
        '業績目標能達成嗎？'
    ],
    'money_luck': [
        '這期樂透有機會中獎嗎？',
        '我的財運好嗎？',
        '今年有偏財運嗎？'
    ],
    'money_salary': [
        '薪水會增加嗎？',
        '這個月收入會穩定嗎？',
        '財務狀況會改善嗎？'
    ],
    'money_debt': [
        '債務能順利還清嗎？',
        '朋友會還我錢嗎？',
        '貸款會被批准嗎？'
    ],

    // ==================== 🏥 健康身心 ====================
    'health_pregnancy': [
        '今年能懷孕嗎？',
        '備孕會順利嗎？',
        '試管嬰兒會成功嗎？',
        '寶寶會健康嗎？'
    ],
    'health_surgery': [
        '手術會順利嗎？',
        '開刀後恢復會好嗎？',
        '這個醫生適合找嗎？',
        '術後會有併發症嗎？'
    ],
    'health_body': [
        '身體狀況會好轉嗎？',
        '這個病會痊癒嗎？',
        '健檢結果會正常嗎？'
    ],
    'health_mental': [
        '我的焦慮會改善嗎？',
        '心理壓力會減輕嗎？',
        '這段低潮期會過去嗎？'
    ],

    // ==================== 🔍 尋物尋人 ====================
    'general_search': [
        '我走失的小貓可以找回來嗎？',
        '遺失的錢包能找到嗎？',
        '失聯的朋友能找到嗎？',
        '丟失的文件會出現嗎？',
        '手機找得回來嗎？'
    ],

    // ==================== ✈️ 旅行出行 ====================
    'general_travel': [
        '下週去日本旅遊順利嗎？',
        '出國玩會平安嗎？',
        '這次旅行會開心嗎？',
        '航班會準時嗎？',
        '旅途中會遇到麻煩嗎？'
    ],

    // ==================== ⚖️ 法律訴訟 ====================
    'general_legal': [
        '這個官司會贏嗎？',
        '訴訟結果對我有利嗎？',
        '房東會告我嗎？',
        '車禍賠償能談成嗎？',
        '合約糾紛能和解嗎？'
    ],

    // ==================== 📝 合約契約 ====================
    'general_contract': [
        '這周能賣出我的賓士汽車嗎？',
        '合約能順利簽訂嗎？',
        '這份合作案能談成嗎？',
        '簽這個約對我有利嗎？'
    ],

    // ==================== 🚗 車輛交通 ====================
    'general_vehicle': [
        '這台車適合買嗎？',
        '我的車能賣個好價錢嗎？',
        '買二手車划算嗎？',
        '車子問題能修好嗎？'
    ],

    // ==================== 🔮 靈性需求 ====================
    'general_spiritual': [
        '我的靈性成長方向對嗎？',
        '居家風水需要調整嗎？',
        '這個房子風水好嗎？',
        '最近運勢不順是什麼原因？'
    ],

    // ==================== 🎰 運勢時機 ====================
    'general_luck': [
        '今年整體運勢如何？',
        '這個月運勢好嗎？',
        '最近適合做重大決定嗎？',
        '我的貴人在哪裡？'
    ],

    // ==================== 🎯 一般決策 ====================
    'general_decision': [
        '我該選A還是B？',
        '這個決定是正確的嗎？',
        '現在是行動的好時機嗎？',
        '我該冒這個險嗎？'
    ],

    // ==================== 🏃 競爭比賽 ====================
    'general_compete': [
        '這次比賽能得名嗎？',
        '我會贏過競爭對手嗎？',
        '這場競爭我有優勢嗎？'
    ],

    // ==================== 🏠 搬遷移動 ====================
    'general_move': [
        '搬到那個城市適合我嗎？',
        '移民會順利嗎？',
        '現在是搬家的好時機嗎？'
    ],

    // ==================== 📱 聯絡等待 ====================
    'general_contact': [
        '他會主動聯絡我嗎？',
        '等這個消息會有結果嗎？',
        '對方會回覆我嗎？'
    ],

    // ==================== 🎁 禮物驚喜 ====================
    'general_gift': [
        '送這個禮物對方會喜歡嗎？',
        '這個驚喜會成功嗎？'
    ],

    // ==================== 🧭 方位指引 ====================
    'general_direction': [
        '我迷路了，該往哪個方向走？',
        '尋找失物應該往東西南北哪個方位？',
        '我接下來該往哪裡發展？',
        '適合我的方位在哪裡？'
    ],
};

interface QAResult {
    question: string;
    expectedScenario: string;
    detectedScenario: string;
    isCorrect: boolean;
    suggestedKeywords?: string[];
    aiAnalysis?: string;
}

class OracleQA {
    private apiKey: string;
    private results: QAResult[] = [];

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    // 模擬 detectScenario 邏輯（同步自 App.tsx v3 - 已修復 26 個邊界案例）
    private detectScenario(q: string): string {
        const lower = q.toLowerCase();

        // ==================== 🏥 健康相關（最高優先級）====================
        // 懷孕/生育
        if (lower.includes('懷孕') || lower.includes('備孕') || lower.includes('受孕') ||
            lower.includes('生育') || lower.includes('懷胎') || lower.includes('生孩子') ||
            lower.includes('懷寶寶') || lower.includes('試管') || lower.includes('試管嬰兒') ||
            lower.includes('寶寶') || lower.includes('胎兒') || lower.includes('嬰兒')) {
            return 'health_pregnancy';
        }
        // 手術/醫療（包含找醫生）
        if (lower.includes('手術') || lower.includes('開刀') || lower.includes('術後') ||
            lower.includes('康復') || lower.includes('癒合') || lower.includes('併發症') ||
            (lower.includes('醫生') && (lower.includes('適合') || lower.includes('找')))) {
            return 'health_surgery';
        }
        // 心理健康（獨立判斷，但排除工作壓力）
        if ((lower.includes('焦慮') || lower.includes('壓力') || lower.includes('低潮') ||
            lower.includes('憂鬱') || lower.includes('心理') || lower.includes('不安') ||
            lower.includes('緊張') || lower.includes('憂慮') || lower.includes('情緒') ||
            lower.includes('精神') || lower.includes('情緒低落') || lower.includes('低潮期')) &&
            !lower.includes('工作')) {
            return 'health_mental';
        }
        // 一般健康
        if (lower.includes('健康') || lower.includes('身體') || lower.includes('病') ||
            lower.includes('痛') || lower.includes('不舒服') || lower.includes('健檢') ||
            lower.includes('體檢') || lower.includes('檢查結果') || lower.includes('痊癒')) {
            return 'health_body';
        }

        // ==================== 🧭 方位/迷路相關（高優先級）====================
        if (lower.includes('方位') || lower.includes('方向') || lower.includes('迷路') ||
            lower.includes('迷失') || lower.includes('往哪') || lower.includes('向哪') ||
            lower.includes('東西南北') ||
            (lower.includes('該往') && (lower.includes('走') || lower.includes('去')))) {
            return 'general_direction';
        }

        // ==================== ⚖️ 法律相關（高優先級）====================
        if (lower.includes('官司') || lower.includes('訴訟') || lower.includes('法律') ||
            lower.includes('法院') || lower.includes('律師') || lower.includes('勝訴') ||
            lower.includes('敗訴') || lower.includes('判決') || lower.includes('開庭') ||
            lower.includes('糾紛') || lower.includes('賠償') || lower.includes('和解') ||
            lower.includes('調解') || lower.includes('仲裁') || lower.includes('告我') ||
            lower.includes('車禍')) {
            return 'general_legal';
        }

        // ==================== 🔮 靈性/風水相關（高優先級）====================
        if (lower.includes('靈性') || lower.includes('風水') || lower.includes('修行') ||
            lower.includes('心靈') || lower.includes('能量') || lower.includes('冥想') ||
            lower.includes('方位') || lower.includes('格局') || lower.includes('煞氣') ||
            (lower.includes('運勢') && (lower.includes('原因') || lower.includes('為什麼') || lower.includes('什麼原因')))) {
            return 'general_spiritual';
        }

        // ==================== 💍 婚姻相關（優先判斷）====================
        if (lower.includes('結婚') || lower.includes('婚姻') || lower.includes('求婚') ||
            lower.includes('訂婚') || lower.includes('婚約') || lower.includes('婚配') ||
            (lower.includes('婆媳') && !lower.includes('家'))) {
            return 'love_marriage';
        }

        // ==================== 🎓 留學相關（優先判斷）====================
        if (lower.includes('留學') || lower.includes('出國讀書') || lower.includes('海外學習') ||
            lower.includes('留學簽證') || lower.includes('學生簽證')) {
            return 'study_abroad';
        }

        // ==================== 🌹 愛情單身/桃花（優先判斷）====================
        if (lower.includes('桃花') || lower.includes('戀愛運') || lower.includes('姻緣') ||
            lower.includes('感情運') || lower.includes('愛情運') || lower.includes('脫單') ||
            lower.includes('單身') || lower.includes('遇到另一半') || lower.includes('真命天') ||
            lower.includes('正緣') || lower.includes('何時脫單') || lower.includes('遇到真愛') ||
            lower.includes('有人追我') || lower.includes('被追') || lower.includes('追求者')) {
            return 'love_single';
        }

        // ==================== 💔 愛情分手/復合（優先判斷）====================
        if (lower.includes('分手') || lower.includes('該不該分') || lower.includes('離開他') ||
            lower.includes('離開她') || lower.includes('結束感情') || lower.includes('斷開')) {
            return 'love_breakup';
        }
        if (lower.includes('復合') || lower.includes('前任') || lower.includes('挽回') ||
            lower.includes('回頭') || lower.includes('舊情人') || lower.includes('重修舊好')) {
            return 'love_reunion';
        }

        // ==================== 🎁 禮物/驚喜相關（優先判斷，排除愛情告白場景）====================
        if ((lower.includes('禮物') && (lower.includes('對方') || lower.includes('喜歡嗎'))) ||
            (lower.includes('送') && lower.includes('禮') && lower.includes('喜歡'))) {
            return 'general_gift';
        }

        // ==================== 💼 面試相關（優先判斷，避免被愛情攔截）====================
        if (lower.includes('面試官') || (lower.includes('面試') && lower.includes('喜歡'))) {
            return 'career_interview';
        }

        // ==================== 💕 愛情暗戀/追求（優先判斷，但排除面試場景）====================
        if ((lower.includes('暗戀') || lower.includes('喜歡的人') || lower.includes('他對我') ||
            lower.includes('她對我') || lower.includes('心裡有') || lower.includes('在乎') ||
            lower.includes('已讀不回') || lower.includes('曖昧') || lower.includes('喜歡我') ||
            lower.includes('對方心意') || lower.includes('有沒有好感') || lower.includes('心意')) &&
            !lower.includes('面試') && !lower.includes('禮物')) {
            return 'love_crush';
        }
        if (lower.includes('告白') || lower.includes('表白') || lower.includes('追求') ||
            lower.includes('主動聯繫') || lower.includes('會不會太急') || lower.includes('追他') ||
            lower.includes('追她') || (lower.includes('送禮物') && lower.includes('她') && !lower.includes('對方'))) {
            return 'love_pursuit';
        }

        // ==================== 💑 愛情交往（優先判斷，放寬條件）====================
        if (lower.includes('交往') || lower.includes('繼續在一起') || lower.includes('我們之間') ||
            lower.includes('這段感情') || (lower.includes('長久') && !lower.includes('友')) ||
            (lower.includes('感情') && lower.includes('順利')) ||
            (lower.includes('一直') && lower.includes('愛')) ||
            (lower.includes('永遠') && lower.includes('愛'))) {
            if (lower.includes('感情') || lower.includes('愛') || lower.includes('戀') ||
                lower.includes('男友') || lower.includes('女友') || lower.includes('老公') ||
                lower.includes('老婆') || lower.includes('在一起') || lower.includes('交往') ||
                lower.includes('我們')) {
                return 'love_dating';
            }
        }

        // ==================== 💕 一般愛情相關 ====================
        if (lower.includes('愛') || lower.includes('戀') || lower.includes('感情') ||
            lower.includes('對象') || lower.includes('喜歡') || lower.includes('男友') ||
            lower.includes('女友') || lower.includes('老公') || lower.includes('老婆') ||
            lower.includes('另一半') || lower.includes('約會')) {
            return 'love_feelings';
        }

        // ==================== 🚚 搬遷/移民相關（移到房產前，包含搬家時機）====================
        if (lower.includes('移民') || lower.includes('遷居') || lower.includes('移居') ||
            lower.includes('換城市') || lower.includes('定居') || lower.includes('搬到') ||
            lower.includes('綠卡') || (lower.includes('簽證') && lower.includes('移')) ||
            (lower.includes('搬') && (lower.includes('城市') || lower.includes('國'))) ||
            (lower.includes('搬家') && (lower.includes('時機') || lower.includes('適合')))) {
            return 'general_move';
        }

        // ==================== 👥 家庭關係（移到房產前）====================
        if (lower.includes('家人') || lower.includes('父母') || lower.includes('兄弟') ||
            lower.includes('姊妹') || lower.includes('親戚') || lower.includes('婆媳') ||
            lower.includes('家庭') || lower.includes('親情') || lower.includes('搬出去住')) {
            return 'relation_family';
        }

        // ==================== 🏠 房產相關 ====================
        if ((lower.includes('房') || lower.includes('租') || lower.includes('買房') ||
            lower.includes('置產') || lower.includes('地段')) &&
            !lower.includes('搬') && !lower.includes('家人') && !lower.includes('風水')) {
            return 'money_property';
        }

        // ==================== 📝 合約/成交相關（優先判斷，賣車歸類為成交導向）====================
        if (lower.includes('合約') || lower.includes('簽約') || lower.includes('契約') ||
            lower.includes('簽訂') || lower.includes('合同') || lower.includes('協議') ||
            lower.includes('合作案') || lower.includes('談成') ||
            (lower.includes('簽') && lower.includes('約')) ||
            (lower.includes('賣') && lower.includes('車')) ||
            (lower.includes('賣出') && (lower.includes('車') || lower.includes('汽車')))) {
            return 'general_contract';
        }

        // ==================== 🚗 車輛相關（不包含賣車，那是成交導向）====================
        if ((lower.includes('車') || lower.includes('汽車') || lower.includes('機車') ||
            lower.includes('買車') || lower.includes('購車') ||
            lower.includes('二手車') || lower.includes('修車') || lower.includes('車況')) &&
            !lower.includes('賣')) {
            return 'general_vehicle';
        }

        // ==================== 🎓 學業相關（排除考績，考績是職場）====================
        if ((lower.includes('考') || lower.includes('成績') || lower.includes('課業') ||
            lower.includes('學校') || lower.includes('畢業') || lower.includes('大學') ||
            lower.includes('高中') || lower.includes('研究所') || lower.includes('國考') ||
            lower.includes('補習') || lower.includes('論文') || lower.includes('多益') ||
            lower.includes('雅思') || lower.includes('托福') || lower.includes('推甄') ||
            lower.includes('志願') || lower.includes('轉學考') || lower.includes('證照')) &&
            !lower.includes('考績')) {
            // 先判斷證照（可能與職涯相關）
            if (lower.includes('證照') || lower.includes('認證') || lower.includes('執照') ||
                (lower.includes('職涯') && lower.includes('幫助'))) return 'study_cert';
            // 錄取相關（排除國考+上榜的組合，那是考試）
            if (lower.includes('推甄') || lower.includes('甄試') || lower.includes('申請入學') ||
                lower.includes('志願') || lower.includes('轉學考')) return 'study_admission';
            if ((lower.includes('錄取') || lower.includes('升學')) && !lower.includes('國考')) return 'study_admission';
            if (lower.includes('上榜') && !lower.includes('國考')) return 'study_admission';
            if (lower.includes('比賽') || lower.includes('競賽')) return 'study_compete';
            if (lower.includes('論文') || lower.includes('報告')) return 'study_thesis';
            return 'study_exam';
        }

        // ==================== 👥 其他人際關係 ====================
        // 朋友還錢優先歸類為債務，失聯找朋友優先歸類為尋人
        if ((lower.includes('朋友') || lower.includes('友誼') || lower.includes('友情')) &&
            !lower.includes('還') && !lower.includes('錢') && !lower.includes('欠') && !lower.includes('借') &&
            !lower.includes('失聯') && !lower.includes('找到') && !lower.includes('能找') && !lower.includes('找回')) {
            return 'relation_friend';
        }
        if (lower.includes('同事') || lower.includes('同仁') || lower.includes('職場人際') ||
            (lower.includes('辦公室') && lower.includes('相處'))) {
            return 'relation_colleague';
        }
        if ((lower.includes('客戶') || lower.includes('顧客')) &&
            !lower.includes('簽單') && !lower.includes('成交') && !lower.includes('訂單')) {
            return 'relation_client';
        }
        if ((lower.includes('老闆') || lower.includes('長輩') ||
            (lower.includes('印象') && lower.includes('對我'))) &&
            !lower.includes('提拔') && !lower.includes('升')) {
            return 'relation_elder';
        }
        // 主管+欣賞/表現 歸類為 relation_elder
        if (lower.includes('主管') && (lower.includes('欣賞') || lower.includes('表現') || lower.includes('評價'))) {
            return 'relation_elder';
        }
        // 主管優先看是否涉及升遷/提拔
        if (lower.includes('主管') && !lower.includes('提拔') && !lower.includes('升')) {
            return 'relation_elder';
        }
        if (lower.includes('鄰居') || lower.includes('隔壁')) {
            return 'relation_neighbor';
        }
        // 競爭對手：如果是問贏/勝/優勢等，歸類為競爭而非關係
        if ((lower.includes('對手') || lower.includes('競爭') || lower.includes('敵人')) &&
            !lower.includes('贏') && !lower.includes('勝') && !lower.includes('優勢')) {
            return 'relation_rival';
        }

        // ==================== 💼 工作事業相關 ====================
        if (lower.includes('工作') || lower.includes('事業') || lower.includes('職場') ||
            lower.includes('公司') || lower.includes('上班') || lower.includes('升遷') ||
            lower.includes('離職') || lower.includes('面試') || lower.includes('求職') ||
            lower.includes('創業') || lower.includes('退休') || lower.includes('開店') ||
            lower.includes('考績') || lower.includes('升職') || lower.includes('晉升') ||
            lower.includes('錄取') || lower.includes('提拔') || lower.includes('應徵') ||
            lower.includes('轉職') || lower.includes('換工作') || lower.includes('商業點子') ||
            lower.includes('咖啡店') || lower.includes('店面') ||
            (lower.includes('努力') && lower.includes('看見'))) {
            if (lower.includes('找工作') || lower.includes('求職') || lower.includes('應徵') ||
                lower.includes('錄取通知') || (lower.includes('適合我嗎') && lower.includes('工作')) ||
                lower.includes('理想的工作')) return 'career_seeking';
            if (lower.includes('面試') || lower.includes('筆試') || lower.includes('面試官') ||
                lower.includes('被錄取') || lower.includes('會錄取')) return 'career_interview';
            if (lower.includes('離職') || lower.includes('轉職') || lower.includes('換工作') ||
                lower.includes('跳槽') || lower.includes('轉換跑道')) return 'career_change';
            // 升遷：包含主管提拔、考績升職
            if (lower.includes('升遷') || lower.includes('晉升') || lower.includes('升職') ||
                lower.includes('提拔') || lower.includes('努力被看見') || lower.includes('被認可') ||
                (lower.includes('主管') && (lower.includes('欣賞') || lower.includes('提拔'))) ||
                (lower.includes('努力') && lower.includes('看見')) ||
                (lower.includes('考績') && lower.includes('升'))) return 'career_promotion';
            if (lower.includes('加薪') || lower.includes('調薪')) return 'career_raise';
            // 創業：包含開咖啡店等
            if (lower.includes('創業') || lower.includes('開店') || lower.includes('自己做') ||
                lower.includes('經營') || lower.includes('商業點子') || lower.includes('咖啡店') ||
                lower.includes('開咖啡') || lower.includes('店面') ||
                (lower.includes('賺錢') && (lower.includes('店') || lower.includes('開')))) return 'career_startup';
            if (lower.includes('合夥') || lower.includes('夥伴') || lower.includes('合作')) return 'career_partner';
            if (lower.includes('衝突') || lower.includes('不合')) return 'career_conflict';
            if (lower.includes('退休') || lower.includes('養老')) return 'career_retire';
            // 單純考績問題（不含升職）歸為 current
            return 'career_current';
        }

        // ==================== 🔍 尋物尋人相關 ====================
        if ((lower.includes('找') || lower.includes('遺失') || lower.includes('走失') ||
            lower.includes('不見') || lower.includes('丟') || lower.includes('失聯') ||
            lower.includes('找回') || lower.includes('尋找') || lower.includes('丟失') ||
            lower.includes('找到') || lower.includes('能找')) &&
            (lower.includes('貓') || lower.includes('狗') || lower.includes('寵物') ||
                lower.includes('錢包') || lower.includes('手機') || lower.includes('東西') ||
                lower.includes('文件') || lower.includes('尋人') || lower.includes('朋友') ||
                lower.includes('失聯'))) {
            return 'general_search';
        }

        // ==================== ✈️ 旅行相關 ====================
        if (lower.includes('旅') || lower.includes('旅遊') || lower.includes('出國玩') ||
            lower.includes('度假') || lower.includes('旅行') || lower.includes('航班') ||
            lower.includes('機票') || lower.includes('行程') || (lower.includes('準時') && lower.includes('飛'))) {
            return 'general_travel';
        }

        // ==================== 💰 財運相關 ====================
        if (lower.includes('錢') || lower.includes('財') || lower.includes('投資') ||
            lower.includes('理財') || lower.includes('賺') || lower.includes('存款') ||
            lower.includes('收入') || lower.includes('支出') || lower.includes('生意') ||
            lower.includes('成交') || lower.includes('買賣') || lower.includes('股票') ||
            lower.includes('基金') || lower.includes('簽單') || lower.includes('樂透') ||
            lower.includes('彩券') || lower.includes('中獎') || lower.includes('債') ||
            lower.includes('貸款') || lower.includes('偏財') || lower.includes('財運') ||
            lower.includes('業績') || lower.includes('項目') || lower.includes('商品') ||
            lower.includes('賣出') || lower.includes('銷售') || lower.includes('定期定額') ||
            lower.includes('還錢')) {
            if (lower.includes('投資') || lower.includes('股票') || lower.includes('基金') ||
                lower.includes('定期定額') || lower.includes('資產配置')) return 'money_invest';
            if (lower.includes('彩券') || lower.includes('樂透') || lower.includes('中獎') ||
                lower.includes('偏財') || lower.includes('橫財') || lower.includes('財運') ||
                lower.includes('手氣')) return 'money_luck';
            if (lower.includes('意外') && lower.includes('收入')) return 'money_windfall';
            // 生意相關：包含賣出商品、客戶簽單（但不包含賣車）
            if ((lower.includes('生意') || lower.includes('做生意') || lower.includes('買賣') ||
                lower.includes('簽單') || lower.includes('成交') || lower.includes('訂單') ||
                lower.includes('業績') || (lower.includes('項目') && lower.includes('賺')) ||
                lower.includes('賣出') || lower.includes('銷售') || lower.includes('商品')) &&
                !lower.includes('車')) return 'money_business';
            if (lower.includes('借') || lower.includes('貸款') || lower.includes('信貸') ||
                lower.includes('房貸') || lower.includes('車貸') || lower.includes('批准')) return 'money_loan';
            // 還錢/債務（包含朋友還錢、還我錢的模式）
            if (lower.includes('債') || lower.includes('還錢') || lower.includes('欠') ||
                lower.includes('還清') || lower.includes('償還') ||
                (lower.includes('還') && lower.includes('錢'))) return 'money_debt';
            if (lower.includes('虧') || lower.includes('損失') || lower.includes('賠')) return 'money_loss';
            if (lower.includes('規劃') || lower.includes('計劃') || lower.includes('預算')) return 'money_plan';
            return 'money_salary';
        }

        // ==================== 🎯 運勢/時機相關 ====================
        if (lower.includes('運勢') || lower.includes('運氣') || lower.includes('貴人') ||
            lower.includes('流年') || lower.includes('整體運') || lower.includes('本月') ||
            lower.includes('今年運') || lower.includes('這個月運') ||
            lower.includes('重大決定')) {
            return 'general_luck';
        }

        // ==================== 🤔 決策相關 ====================
        if (lower.includes('該不該') || lower.includes('選擇') || lower.includes('抉擇') ||
            lower.includes('選A') || lower.includes('選B') || lower.includes('二選一') ||
            lower.includes('冒險') || lower.includes('風險') || lower.includes('正確嗎') ||
            lower.includes('對不對') || lower.includes('該選') || lower.includes('有沒有利') ||
            lower.includes('冷這個險') || lower.includes('這個險') ||
            (lower.includes('時機') && !lower.includes('重大')) ||
            (lower.includes('好時機') && !lower.includes('重大')) ||
            (lower.includes('決定') && lower.includes('正確'))) {
            return 'general_decision';
        }

        // ==================== 🏆 競爭/比賽相關 ====================
        if (lower.includes('比賽') || lower.includes('競賽') || lower.includes('得名') ||
            lower.includes('贏') || lower.includes('名次') || lower.includes('獲獎') ||
            lower.includes('優勢') || lower.includes('勝負') || lower.includes('勝算') ||
            (lower.includes('對手') && (lower.includes('贏') || lower.includes('勝'))) ||
            (lower.includes('競爭') && (lower.includes('贏') || lower.includes('勝') || lower.includes('優勢')))) {
            return 'general_compete';
        }

        // ==================== 📱 聯絡/等待回覆相關 ====================
        if (lower.includes('聯絡') || lower.includes('聯繫') || lower.includes('回覆') ||
            lower.includes('消息') || lower.includes('等待') || lower.includes('找我') ||
            lower.includes('回音') || (lower.includes('主動') && lower.includes('聯'))) {
            return 'general_contact';
        }

        // ==================== 🎁 禮物/驚喜相關 ====================
        // （主要判斷已前移到愛情暗戀前，這裡處理剩餘情況）
        if (lower.includes('禮物') || lower.includes('送禮') ||
            lower.includes('驚喜') || lower.includes('贈送')) {
            return 'general_gift';
        }

        // ==================== 預設：一般財運 ====================
        return 'money_salary';
    }

    // 使用 AI 分析問題應該匹配哪個 scenario
    private async aiAnalyze(question: string, detectedScenario: string): Promise<{ analysis: string; suggestedScenario: string; keywords: string[] }> {
        const scenarioList = SCENARIOS.map(s => `${s.key}: ${s.name} (${s.category})`).join('\n');

        const prompt = `你是一個 QA 系統，負責審核塔羅牌神諭系統的問題匹配。

用戶問題：「${question}」
系統當前匹配到：${detectedScenario}

可用的 scenario 列表：
${scenarioList}

請分析：
1. 用戶問題的核心意圖是什麼？
2. 當前匹配的 scenario 是否正確？
3. 如果不正確，應該匹配哪個 scenario？
4. 建議添加什麼關鍵詞來改善匹配？

請用以下 JSON 格式回答：
{
  "analysis": "簡短分析",
  "isCorrect": true/false,
  "suggestedScenario": "正確的 scenario_key",
  "keywords": ["建議", "關鍵詞"]
}`;

        try {
            const response = await fetch(DEEPSEEK_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        { role: 'system', content: '你是一個精確的 QA 審核系統，請用 JSON 格式回答。' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.3,
                    max_tokens: 500
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const text = data.choices[0]?.message?.content || '';

            // 嘗試解析 JSON
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                    analysis: parsed.analysis || '',
                    suggestedScenario: parsed.suggestedScenario || detectedScenario,
                    keywords: parsed.keywords || []
                };
            }
        } catch (error) {
            console.error('AI analysis error:', error);
        }

        return { analysis: '', suggestedScenario: detectedScenario, keywords: [] };
    }

    // 執行單個測試
    async testQuestion(question: string, expectedScenario: string): Promise<QAResult> {
        const detectedScenario = this.detectScenario(question);
        const isCorrect = detectedScenario === expectedScenario;

        const result: QAResult = {
            question,
            expectedScenario,
            detectedScenario,
            isCorrect
        };

        if (!isCorrect) {
            const aiResult = await this.aiAnalyze(question, detectedScenario);
            result.aiAnalysis = aiResult.analysis;
            result.suggestedKeywords = aiResult.keywords;
        }

        return result;
    }

    // 執行所有測試
    async runAllTests(): Promise<void> {
        console.log('🚀 開始神諭 QA 測試...\n');
        let passed = 0;
        let failed = 0;
        const failures: QAResult[] = [];

        for (const [scenario, questions] of Object.entries(TEST_QUESTIONS)) {
            for (const q of questions) {
                const result = await this.testQuestion(q, scenario);
                this.results.push(result);

                if (result.isCorrect) {
                    passed++;
                    console.log(`✅ "${q}" → ${result.detectedScenario}`);
                } else {
                    failed++;
                    failures.push(result);
                    console.log(`❌ "${q}"`);
                    console.log(`   期望: ${result.expectedScenario}, 實際: ${result.detectedScenario}`);
                    if (result.suggestedKeywords?.length) {
                        console.log(`   建議關鍵詞: ${result.suggestedKeywords.join(', ')}`);
                    }
                }

                // Rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        console.log(`\n📊 測試結果: ${passed} 通過, ${failed} 失敗 (${Math.round(passed / (passed + failed) * 100)}%)`);

        // 生成報告
        this.generateReport(failures);
    }

    // 生成報告
    private generateReport(failures: QAResult[]): void {
        const reportPath = path.join(__dirname, '..', 'output', 'qa_report.md');

        let report = `# 神諭 QA 測試報告\n\n`;
        report += `生成時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}\n\n`;
        report += `## 測試摘要\n\n`;
        report += `- 總測試數：${this.results.length}\n`;
        report += `- 通過：${this.results.filter(r => r.isCorrect).length}\n`;
        report += `- 失敗：${failures.length}\n\n`;

        if (failures.length > 0) {
            report += `## ❌ 失敗項目\n\n`;
            report += `| 問題 | 期望 | 實際 | 建議關鍵詞 |\n`;
            report += `|------|------|------|------------|\n`;

            for (const f of failures) {
                const keywords = f.suggestedKeywords?.join(', ') || '-';
                report += `| ${f.question} | ${f.expectedScenario} | ${f.detectedScenario} | ${keywords} |\n`;
            }

            report += `\n## 🔧 建議修正\n\n`;

            // 按 scenario 分組
            const byScenario: Record<string, string[]> = {};
            for (const f of failures) {
                if (!byScenario[f.expectedScenario]) {
                    byScenario[f.expectedScenario] = [];
                }
                if (f.suggestedKeywords) {
                    byScenario[f.expectedScenario].push(...f.suggestedKeywords);
                }
            }

            for (const [scenario, keywords] of Object.entries(byScenario)) {
                const uniqueKeywords = [...new Set(keywords)];
                if (uniqueKeywords.length > 0) {
                    report += `### ${scenario}\n`;
                    report += `建議添加關鍵詞：${uniqueKeywords.join(', ')}\n\n`;
                }
            }
        }

        fs.writeFileSync(reportPath, report);
        console.log(`\n📄 報告已生成：${reportPath}`);
    }
}

// 主程式
async function main() {
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
        console.error('❌ 請設定 DEEPSEEK_API_KEY 環境變數');
        process.exit(1);
    }

    const qa = new OracleQA(apiKey);
    await qa.runAllTests();
}

main().catch(console.error);
