/**
 * 快速測試 detectScenario 函數
 * 不需要 API key，直接測試邏輯
 */

// 複製 detectScenario 函數邏輯（與 oracleQA.ts 同步）
function detectScenario(q: string): string {
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

    // ==================== 🚚 搬遷/移民相關====================
    if (lower.includes('移民') || lower.includes('遷居') || lower.includes('移居') ||
        lower.includes('換城市') || lower.includes('定居') || lower.includes('搬到') ||
        lower.includes('綠卡') || (lower.includes('簽證') && lower.includes('移')) ||
        (lower.includes('搬') && (lower.includes('城市') || lower.includes('國'))) ||
        (lower.includes('搬家') && (lower.includes('時機') || lower.includes('適合')))) {
        return 'general_move';
    }

    // ==================== 👥 家庭關係====================
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
        if (lower.includes('證照') || lower.includes('認證') || lower.includes('執照') ||
            (lower.includes('職涯') && lower.includes('幫助'))) return 'study_cert';
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
    // 競爭對手
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
        // 升遷
        if (lower.includes('升遷') || lower.includes('晉升') || lower.includes('升職') ||
            lower.includes('提拔') || lower.includes('努力被看見') || lower.includes('被認可') ||
            (lower.includes('主管') && (lower.includes('欣賞') || lower.includes('提拔'))) ||
            (lower.includes('努力') && lower.includes('看見')) ||
            (lower.includes('考績') && lower.includes('升'))) return 'career_promotion';
        if (lower.includes('加薪') || lower.includes('調薪')) return 'career_raise';
        // 創業
        if (lower.includes('創業') || lower.includes('開店') || lower.includes('自己做') ||
            lower.includes('經營') || lower.includes('商業點子') || lower.includes('咖啡店') ||
            lower.includes('開咖啡') || lower.includes('店面') ||
            (lower.includes('賺錢') && (lower.includes('店') || lower.includes('開')))) return 'career_startup';
        if (lower.includes('合夥') || lower.includes('夥伴') || lower.includes('合作')) return 'career_partner';
        if (lower.includes('衝突') || lower.includes('不合')) return 'career_conflict';
        if (lower.includes('退休') || lower.includes('養老')) return 'career_retire';
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
        // 生意相關（但不包含賣車）
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
        lower.includes('這個險') ||
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
    if (lower.includes('禮物') || lower.includes('送禮') ||
        lower.includes('驚喜') || lower.includes('贈送')) {
        return 'general_gift';
    }

    // ==================== 預設：一般財運 ====================
    return 'money_salary';
}

// 測試失敗案例
const failedCases = [
    { q: '我們的感情會順利嗎？', expected: 'love_dating' },
    { q: '他會一直愛我嗎？', expected: 'love_dating' },
    { q: '主管會欣賞我的表現嗎？', expected: 'relation_elder' },
    { q: '面試官會喜歡我嗎？', expected: 'career_interview' },
    { q: '這次考績能升職嗎？', expected: 'career_promotion' },
    { q: '定期定額適合我嗎？', expected: 'money_invest' },
    { q: '朋友會還我錢嗎？', expected: 'money_debt' },
    { q: '貸款會被批准嗎？', expected: 'money_loan' },
    { q: '這個醫生適合找嗎？', expected: 'health_surgery' },
    { q: '失聯的朋友能找到嗎？', expected: 'general_search' },
    { q: '這周能賣出我的賓士汽車嗎？', expected: 'general_contract' },
    { q: '簽這個約對我有利嗎？', expected: 'general_contract' },
    { q: '最近運勢不順是什麼原因？', expected: 'general_spiritual' },
    { q: '最近適合做重大決定嗎？', expected: 'general_luck' },
    { q: '我該冒這個險嗎？', expected: 'general_decision' },
    { q: '送這個禮物對方會喜歡嗎？', expected: 'general_gift' },
    { q: '我迷路了，該往哪個方向走？', expected: 'general_direction' },
    { q: '尋找失物應該往東西南北哪個方位？', expected: 'general_direction' },
    { q: '適合我的方位在哪裡？', expected: 'general_direction' },
];

console.log('🧪 快速測試 detectScenario 修復結果\n');
console.log('='.repeat(60));

let passed = 0;
let failed = 0;

for (const test of failedCases) {
    const result = detectScenario(test.q);
    const isCorrect = result === test.expected;

    if (isCorrect) {
        passed++;
        console.log(`✅ "${test.q}"`);
        console.log(`   → ${result}`);
    } else {
        failed++;
        console.log(`❌ "${test.q}"`);
        console.log(`   期望: ${test.expected}, 實際: ${result}`);
    }
}

console.log('='.repeat(60));
console.log(`\n📊 測試結果: ${passed}/${failedCases.length} 通過 (${Math.round(passed / failedCases.length * 100)}%)`);

if (failed === 0) {
    console.log('🎉 所有失敗案例已修復！');
} else {
    console.log(`⚠️ 還有 ${failed} 個案例需要修復`);
}
