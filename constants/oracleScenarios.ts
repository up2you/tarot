/**
 * Oracle Scenarios - 場景定義
 * 用於神諭資料庫生成的所有場景類型
 */

export interface OracleScenario {
    key: string;
    category: string;
    nameZh: string;
    nameEn: string;
    description: string;
}

export const ORACLE_CATEGORIES = {
    love: { nameZh: '感情', icon: '💕' },
    career: { nameZh: '事業', icon: '💼' },
    money: { nameZh: '財運', icon: '💰' },
    study: { nameZh: '學業', icon: '📚' },
    health: { nameZh: '健康', icon: '🏥' },
    relation: { nameZh: '人際', icon: '🤝' },
    harvest: { nameZh: '豐收', icon: '🌾' },
    gamble: { nameZh: '博弈', icon: '🎲' },
};

export const ORACLE_SCENARIOS: OracleScenario[] = [
    // ============================================
    // 感情類 (10)
    // ============================================
    { key: 'love_single', category: 'love', nameZh: '單身求緣', nameEn: 'Single seeking love', description: '單身者尋找戀愛對象' },
    { key: 'love_crush', category: 'love', nameZh: '暗戀對象', nameEn: 'Secret crush', description: '對某人有好感但未表白' },
    { key: 'love_pursuit', category: 'love', nameZh: '追求中', nameEn: 'Pursuing someone', description: '正在追求心儀對象' },
    { key: 'love_dating', category: 'love', nameZh: '熱戀期', nameEn: 'Dating', description: '剛開始交往的甜蜜期' },
    { key: 'love_conflict', category: 'love', nameZh: '感情磨合', nameEn: 'Relationship conflict', description: '感情中遇到摩擦或問題' },
    { key: 'love_marriage', category: 'love', nameZh: '婚姻關係', nameEn: 'Marriage', description: '已婚或長期伴侶關係' },
    { key: 'love_affair', category: 'love', nameZh: '第三者', nameEn: 'Third party', description: '涉及第三者的感情問題' },
    { key: 'love_cheating', category: 'love', nameZh: '外遇出軌', nameEn: 'Cheating/Affair', description: '懷疑背叛與三角關係' },
    { key: 'love_breakup', category: 'love', nameZh: '分手', nameEn: 'Breakup', description: '面臨或剛經歷分手' },
    { key: 'love_reunion', category: 'love', nameZh: '復合', nameEn: 'Reconciliation', description: '考慮與前任復合' },
    { key: 'love_feelings', category: 'love', nameZh: '對方心意', nameEn: 'Their feelings', description: '想了解對方的真實想法' },

    // ============================================
    // 事業類 (10)
    // ============================================
    { key: 'career_seeking', category: 'career', nameZh: '求職', nameEn: 'Job seeking', description: '正在找工作' },
    { key: 'career_interview', category: 'career', nameZh: '面試', nameEn: 'Interview', description: '即將或正在面試' },
    { key: 'career_current', category: 'career', nameZh: '現職發展', nameEn: 'Current job', description: '目前工作的發展前景' },
    { key: 'career_promotion', category: 'career', nameZh: '升遷', nameEn: 'Promotion', description: '升職加薪的可能' },
    { key: 'career_raise', category: 'career', nameZh: '加薪', nameEn: 'Salary raise', description: '薪資調整的機會' },
    { key: 'career_startup', category: 'career', nameZh: '創業', nameEn: 'Starting business', description: '自己創業開公司' },
    { key: 'career_partner', category: 'career', nameZh: '合夥', nameEn: 'Business partnership', description: '與他人合作經營' },
    { key: 'career_change', category: 'career', nameZh: '轉行', nameEn: 'Career change', description: '考慮換跑道' },
    { key: 'career_retire', category: 'career', nameZh: '退休', nameEn: 'Retirement', description: '退休規劃' },
    { key: 'career_conflict', category: 'career', nameZh: '職場衝突', nameEn: 'Workplace conflict', description: '與同事或上司的問題' },

    // ============================================
    // 財運類 (10)
    // ============================================
    { key: 'money_salary', category: 'money', nameZh: '正財運', nameEn: 'Regular income', description: '工作收入、薪水' },
    { key: 'money_windfall', category: 'money', nameZh: '偏財運', nameEn: 'Windfall', description: '意外之財、中獎' },
    { key: 'money_invest', category: 'money', nameZh: '投資', nameEn: 'Investment', description: '股票、基金等投資' },
    { key: 'money_loan', category: 'money', nameZh: '借貸', nameEn: 'Loan', description: '借錢給人或借錢' },
    { key: 'money_debt', category: 'money', nameZh: '債務', nameEn: 'Debt', description: '欠債或討債' },
    { key: 'money_property', category: 'money', nameZh: '買房', nameEn: 'Property', description: '買房置產' },
    { key: 'money_plan', category: 'money', nameZh: '理財規劃', nameEn: 'Financial planning', description: '儲蓄和理財' },
    { key: 'money_loss', category: 'money', nameZh: '破財', nameEn: 'Financial loss', description: '意外支出、損失' },
    { key: 'money_luck', category: 'money', nameZh: '橫財', nameEn: 'Unexpected wealth', description: '中彩券、繼承等' },
    { key: 'money_business', category: 'money', nameZh: '生意財', nameEn: 'Business income', description: '經商收入' },

    // ============================================
    // 學業類 (7)
    // ============================================
    { key: 'study_admission', category: 'study', nameZh: '升學', nameEn: 'School admission', description: '升學考試' },
    { key: 'study_exam', category: 'study', nameZh: '考試', nameEn: 'Exam', description: '各類考試' },
    { key: 'study_cert', category: 'study', nameZh: '證照考試', nameEn: 'Certification', description: '專業證照' },
    { key: 'study_abroad', category: 'study', nameZh: '留學', nameEn: 'Study abroad', description: '出國留學' },
    { key: 'study_thesis', category: 'study', nameZh: '論文', nameEn: 'Thesis', description: '畢業論文' },
    { key: 'study_skill', category: 'study', nameZh: '技能學習', nameEn: 'Skill learning', description: '學習新技能' },
    { key: 'study_compete', category: 'study', nameZh: '競賽', nameEn: 'Competition', description: '比賽競爭' },

    // ============================================
    // 健康類 (7)
    // ============================================
    { key: 'health_body', category: 'health', nameZh: '身體健康', nameEn: 'Physical health', description: '整體身體狀況' },
    { key: 'health_mental', category: 'health', nameZh: '心理健康', nameEn: 'Mental health', description: '情緒和心理狀態' },
    { key: 'health_surgery', category: 'health', nameZh: '手術醫療', nameEn: 'Surgery', description: '手術與治療' },
    { key: 'health_recovery', category: 'health', nameZh: '康復', nameEn: 'Recovery', description: '疾病康復' },
    { key: 'health_pregnancy', category: 'health', nameZh: '懷孕生育', nameEn: 'Pregnancy', description: '備孕與懷孕' },
    { key: 'health_gender', category: 'health', nameZh: '胎兒性別', nameEn: 'Gender Prediction', description: '生男或生女' },

    // ============================================
    // 人際類 (7)
    // ============================================
    { key: 'relation_family', category: 'relation', nameZh: '家庭關係', nameEn: 'Family', description: '與家人的關係' },
    { key: 'relation_friend', category: 'relation', nameZh: '朋友關係', nameEn: 'Friendship', description: '與朋友的關係' },
    { key: 'relation_colleague', category: 'relation', nameZh: '同事關係', nameEn: 'Colleague', description: '與同事的關係' },
    { key: 'relation_client', category: 'relation', nameZh: '客戶關係', nameEn: 'Client', description: '與客戶的關係' },
    { key: 'relation_neighbor', category: 'relation', nameZh: '鄰居關係', nameEn: 'Neighbor', description: '與鄰居的關係' },
    { key: 'relation_elder', category: 'relation', nameZh: '長輩關係', nameEn: 'Elders', description: '與長輩的關係' },
    { key: 'relation_rival', category: 'relation', nameZh: '對手競爭', nameEn: 'Rival', description: '競爭對手' },

    // ============================================
    // 豐收類 (5)
    // ============================================
    { key: 'harvest_farming', category: 'harvest', nameZh: '農業', nameEn: 'Agriculture', description: '農作物種植與收成' },
    { key: 'harvest_fishery', category: 'harvest', nameZh: '漁業', nameEn: 'Fishery', description: '出海捕撈與水產' },
    { key: 'harvest_forestry', category: 'harvest', nameZh: '林業', nameEn: 'Forestry', description: '林木種植與採伐' },
    { key: 'harvest_livestock', category: 'harvest', nameZh: '畜牧', nameEn: 'Husbandry', description: '家畜飼養與繁殖' },
    { key: 'harvest_garden', category: 'harvest', nameZh: '園藝', nameEn: 'Gardening', description: '家庭園藝與種植' },

    // ============================================
    // 博弈類 (5)
    // ============================================
    { key: 'gamble_lottery', category: 'gamble', nameZh: '樂透彩券', nameEn: 'Lottery', description: '購買彩券與樂透' },
    { key: 'gamble_card', category: 'gamble', nameZh: '牌桌博弈', nameEn: 'Card Games', description: '撲克與牌局' },
    { key: 'gamble_sport', category: 'gamble', nameZh: '運動彩券', nameEn: 'Sports Betting', description: '運彩與賽事' },
    { key: 'gamble_casino', category: 'gamble', nameZh: '賭場運勢', nameEn: 'Casino', description: '賭場輪盤與手氣' },
    { key: 'gamble_luck', category: 'gamble', nameZh: '手氣/偏財', nameEn: 'General Luck', description: '一般博弈與賭運' },
];

// 取得場景總數
export const TOTAL_SCENARIOS = ORACLE_SCENARIOS.length; // 60

// 按類別分組
export const getScenariosByCategory = (category: string) =>
    ORACLE_SCENARIOS.filter(s => s.category === category);
