/**
 * 簡易 detectScenario 測試腳本
 * 不需要 API，直接測試關鍵詞匹配
 */

// 模擬 App.tsx 的 detectScenario 邏輯（已更新版本）
const detectScenario = (q: string): string => {
    const lower = q.toLowerCase();

    // ==================== 🏥 健康相關（優先判斷）====================
    if (lower.includes('懷孕') || lower.includes('備孕') || lower.includes('受孕') ||
        lower.includes('生育') || lower.includes('懷胎') || lower.includes('孕') ||
        lower.includes('生孩子') || lower.includes('懷寶寶') || lower.includes('試管')) {
        return 'health_pregnancy';
    }
    if (lower.includes('手術') || lower.includes('開刀') || lower.includes('術後') ||
        lower.includes('康復') || lower.includes('恢復') || lower.includes('癒合')) {
        return 'health_surgery';
    }
    // 心理健康獨立判斷（不需要配合「健康」等詞）
    if (lower.includes('焦慮') || lower.includes('壓力') || lower.includes('低潮') ||
        lower.includes('憂鬱') || lower.includes('心理') || lower.includes('不安') ||
        lower.includes('緊張') || lower.includes('憂慮') || lower.includes('情緒低落')) {
        return 'health_mental';
    }
    if (lower.includes('健康') || lower.includes('身體') || lower.includes('病') ||
        lower.includes('醫') || lower.includes('痛') || lower.includes('不舒服') ||
        lower.includes('健檢') || lower.includes('體檢')) {
        if (lower.includes('生產') || lower.includes('生小孩')) return 'health_birth';
        return 'health_body';
    }

    // ==================== ⚖️ 法律相關（優先判斷）====================
    if (lower.includes('官司') || lower.includes('訴訟') || lower.includes('法律') ||
        lower.includes('法院') || lower.includes('律師') || lower.includes('勝訴') ||
        lower.includes('敗訴') || lower.includes('判決') || lower.includes('開庭')) {
        return 'general_legal';
    }

    // ==================== 💍 婚姻相關（優先判斷）==================== 
    if (lower.includes('結婚') || lower.includes('婚姻') || lower.includes('求婚') ||
        lower.includes('訂婚') || lower.includes('婚約') || lower.includes('婚配')) {
        return 'love_marriage';
    }

    // ==================== 🎓 留學相關（優先判斷）====================
    if (lower.includes('留學') || lower.includes('出國讀書') || lower.includes('海外學習') ||
        lower.includes('留學簽證') || lower.includes('學生簽證')) {
        return 'study_abroad';
    }

    // ==================== 🌹 桃花運相關（優先判斷）====================
    if (lower.includes('桃花') || lower.includes('戀愛運') || lower.includes('姻緣') ||
        lower.includes('感情運') || lower.includes('愛情運')) {
        return 'love_single';
    }

    // ==================== 🏠 房產相關 ====================
    if (lower.includes('房') || lower.includes('租') || lower.includes('買房') ||
        lower.includes('搬家') || lower.includes('住') || lower.includes('居')) {
        return 'money_property';
    }

    // ==================== 🚗 車輛/交易相關 ====================
    if (lower.includes('車') || lower.includes('汽車') || lower.includes('機車') ||
        lower.includes('賣') || lower.includes('賣出') || lower.includes('出售') ||
        lower.includes('買車') || lower.includes('購車')) {
        if (lower.includes('買車') || lower.includes('購車') || lower.includes('適合買')) {
            return 'general_contract';
        }
        if (lower.includes('車') || lower.includes('汽車') || lower.includes('機車')) {
            return 'general_contract';
        }
        return 'money_business';
    }

    // ==================== 📝 合約相關 ====================
    if (lower.includes('合約') || lower.includes('簽約') || lower.includes('契約') ||
        lower.includes('簽訂') || lower.includes('合同') || lower.includes('協議')) {
        return 'general_contract';
    }

    // ==================== 🎓 學業相關 ====================
    if (lower.includes('考') || lower.includes('成績') || lower.includes('課業') ||
        lower.includes('學校') || lower.includes('畢業') || lower.includes('大學') ||
        lower.includes('高中') || lower.includes('研究所') || lower.includes('國考') ||
        lower.includes('補習') || lower.includes('論文') || lower.includes('多益') ||
        lower.includes('雅思') || lower.includes('托福') || lower.includes('推甄')) {
        if (lower.includes('推甄') || lower.includes('甄試') || lower.includes('申請入學')) return 'study_admission';
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
        lower.includes('告白') || lower.includes('約會') || lower.includes('脫單') ||
        lower.includes('暗戀') || lower.includes('追') || lower.includes('他對我') ||
        lower.includes('她對我') || lower.includes('有感覺') || lower.includes('心裡有') ||
        lower.includes('在乎') || lower.includes('已讀不回') || lower.includes('前任') ||
        lower.includes('復合') || lower.includes('分手')) {
        if (lower.includes('單身') || lower.includes('脫單') || lower.includes('遇到另一半') ||
            lower.includes('真命天') || lower.includes('正緣')) return 'love_single';
        if (lower.includes('暗戀') || lower.includes('喜歡的人') || lower.includes('有感覺') ||
            lower.includes('他對我') || lower.includes('她對我') || lower.includes('心裡有') ||
            lower.includes('在乎') || lower.includes('已讀不回') || lower.includes('曖昧')) return 'love_crush';
        if (lower.includes('追') || lower.includes('告白') || lower.includes('表白') ||
            lower.includes('追求') || lower.includes('追人') || lower.includes('主動聯繫') ||
            lower.includes('送禮物') || lower.includes('會不會太急')) return 'love_pursuit';
        if (lower.includes('約會') || lower.includes('交往') || lower.includes('在一起') ||
            lower.includes('順利') || lower.includes('長久') || lower.includes('問題解決') ||
            lower.includes('繼續在一起') || lower.includes('一直愛') || lower.includes('會不會愛')) return 'love_dating';
        if (lower.includes('復合') || lower.includes('重新') || lower.includes('回來') ||
            lower.includes('前任') || lower.includes('挽回') || lower.includes('回頭')) return 'love_reunion';
        if (lower.includes('分手') || lower.includes('離開') || lower.includes('放棄') ||
            lower.includes('該不該分') || lower.includes('後悔')) return 'love_breakup';
        if (lower.includes('吵架') || lower.includes('衝突') || lower.includes('冷戰')) return 'love_conflict';
        if (lower.includes('外遇') || lower.includes('出軌') || lower.includes('劈腿')) return 'love_affair';
        return 'love_feelings';
    }

    // ==================== 👥 人際關係相關 ====================
    if (lower.includes('朋友') || lower.includes('家人') || lower.includes('父母') ||
        lower.includes('同事') || lower.includes('主管') || lower.includes('客戶') ||
        lower.includes('長輩') || lower.includes('鄰居') || lower.includes('對手') ||
        lower.includes('兄弟') || lower.includes('姊妹') || lower.includes('親戚') ||
        lower.includes('友誼') || lower.includes('婆媳')) {
        if (lower.includes('朋友') || lower.includes('友情') || lower.includes('友誼')) return 'relation_friend';
        if (lower.includes('家人') || lower.includes('父母') || lower.includes('兄弟') ||
            lower.includes('姊妹') || lower.includes('親戚') || lower.includes('婆媳') ||
            lower.includes('家庭和諧')) return 'relation_family';
        if (lower.includes('同事') || lower.includes('同仁') || lower.includes('職場人際')) return 'relation_colleague';
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
        lower.includes('創業') || lower.includes('退休') || lower.includes('開店') ||
        lower.includes('考績') || lower.includes('升職') || lower.includes('晉升') ||
        lower.includes('錄取') || lower.includes('提拔') || lower.includes('努力被看見')) {
        if (lower.includes('找工作') || lower.includes('求職') || lower.includes('應徵') ||
            lower.includes('錄取通知') || lower.includes('適合我嗎')) return 'career_seeking';
        if (lower.includes('面試') || lower.includes('筆試') || lower.includes('面試官') ||
            lower.includes('被錄取')) return 'career_interview';
        if (lower.includes('離職') || lower.includes('轉職') || lower.includes('換工作') || lower.includes('跳槽')) return 'career_change';
        if (lower.includes('升遷') || lower.includes('晉升') || lower.includes('升職') || lower.includes('考績') ||
            lower.includes('提拔') || lower.includes('努力被看見') || lower.includes('被認可')) return 'career_promotion';
        if (lower.includes('加薪') || lower.includes('調薪')) return 'career_raise';
        if (lower.includes('創業') || lower.includes('開店') || lower.includes('自己做') || lower.includes('經營') ||
            lower.includes('商業點子') || lower.includes('開咖啡')) return 'career_startup';
        if (lower.includes('合夥') || lower.includes('夥伴') || lower.includes('合作')) return 'career_partner';
        if (lower.includes('衝突') || lower.includes('不合')) return 'career_conflict';
        if (lower.includes('退休') || lower.includes('養老')) return 'career_retire';
        return 'career_current';
    }

    // ==================== 🔍 尋物相關 ====================
    if ((lower.includes('找') || lower.includes('遺失') || lower.includes('走失') ||
        lower.includes('不見') || lower.includes('丟') || lower.includes('失聯') ||
        lower.includes('找回') || lower.includes('尋找')) &&
        (lower.includes('貓') || lower.includes('狗') || lower.includes('寵物') ||
            lower.includes('錢包') || lower.includes('手機') || lower.includes('東西') ||
            lower.includes('文件') || lower.includes('朋友') || lower.includes('人'))) {
        return 'general_search';
    }

    // ==================== ✈️ 旅行相關 ====================
    if (lower.includes('旅') || lower.includes('旅遊') || lower.includes('出國玩') ||
        lower.includes('度假') || lower.includes('旅行') || lower.includes('航班') ||
        lower.includes('機票') || lower.includes('行程')) {
        return 'general_travel';
    }

    // ==================== 💰 財運相關 ====================
    if (lower.includes('錢') || lower.includes('財') || lower.includes('投資') ||
        lower.includes('理財') || lower.includes('賺') || lower.includes('萬') ||
        lower.includes('存款') || lower.includes('收入') || lower.includes('支出') ||
        lower.includes('生意') || lower.includes('成交') || lower.includes('買賣') ||
        lower.includes('股票') || lower.includes('基金') || lower.includes('簽單')) {
        if (lower.includes('投資') || lower.includes('股票') || lower.includes('基金')) return 'money_invest';
        if (lower.includes('彩券') || lower.includes('樂透') || lower.includes('中獎') || lower.includes('運氣')) return 'money_luck';
        if (lower.includes('意外') || lower.includes('橫財') || lower.includes('飛來')) return 'money_windfall';
        if (lower.includes('生意') || lower.includes('做生意') || lower.includes('買賣') ||
            lower.includes('簽單') || lower.includes('成交') || lower.includes('訂單')) return 'money_business';
        if (lower.includes('借') || lower.includes('貸款') || lower.includes('信貸')) return 'money_loan';
        if (lower.includes('債') || lower.includes('還錢') || lower.includes('欠')) return 'money_debt';
        if (lower.includes('虧') || lower.includes('損失') || lower.includes('賠')) return 'money_loss';
        if (lower.includes('規劃') || lower.includes('計劃') || lower.includes('預算')) return 'money_plan';
        return 'money_salary';
    }

    // ==================== 🎯 運勢/時機相關 ====================
    if (lower.includes('運勢') || lower.includes('運氣') || lower.includes('今年') ||
        lower.includes('這個月') || lower.includes('貴人') || lower.includes('流年') ||
        lower.includes('整體運') || lower.includes('近期') || lower.includes('時機')) {
        return 'general_luck';
    }

    // ==================== 🤔 決策相關 ====================
    if (lower.includes('該不該') || lower.includes('應該') || lower.includes('選擇') ||
        lower.includes('抉擇') || lower.includes('選A') || lower.includes('選B') ||
        lower.includes('冒險') || lower.includes('風險') || lower.includes('決定') ||
        lower.includes('正確嗎') || lower.includes('對不對')) {
        return 'general_decision';
    }

    // ==================== 🏆 競爭/比賽相關 ====================
    if (lower.includes('比賽') || lower.includes('競賽') || lower.includes('得名') ||
        lower.includes('贏') || lower.includes('勝') || lower.includes('名次') ||
        lower.includes('獲獎') || lower.includes('優勢') || lower.includes('對手')) {
        return 'general_compete';
    }

    // ==================== 🚚 搬遷/移民相關 ====================
    if (lower.includes('搬') || lower.includes('移民') || lower.includes('遷居') ||
        lower.includes('移居') || lower.includes('換城市') || lower.includes('定居')) {
        return 'general_move';
    }

    // ==================== 📱 聯絡/等待回覆相關 ====================
    if (lower.includes('聯絡') || lower.includes('聯繫') || lower.includes('回覆') ||
        lower.includes('消息') || lower.includes('通知') || lower.includes('等待') ||
        lower.includes('找我') || lower.includes('回音')) {
        return 'general_contact';
    }

    // ==================== 🎁 禮物/驚喜相關 ====================
    if (lower.includes('禮物') || lower.includes('送禮') || lower.includes('驚喜') ||
        lower.includes('贈送')) {
        return 'general_gift';
    }

    // ==================== 🔮 靈性/風水相關 ====================
    if (lower.includes('靈性') || lower.includes('風水') || lower.includes('修行') ||
        lower.includes('心靈') || lower.includes('能量') || lower.includes('冥想')) {
        return 'general_spiritual';
    }

    // ==================== 預設：一般財運 ====================
    return 'money_salary';
};

// 測試問題集（來自 oracleQA.ts）
const TEST_QUESTIONS: Record<string, string[]> = {
    'study_exam': [
        '我這次期末考能過嗎？',
        '明年的國考能上榜嗎？',
        '這次多益能考過600分嗎？',
        '駕照考試會順利嗎？'
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
    'career_interview': [
        '這次面試會過嗎？',
        '明天的面試該怎麼準備？',
        '面試官會喜歡我嗎？',
        '我會被錄取嗎？'
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
    'general_search': [
        '我走失的小貓可以找回來嗎？',
        '遺失的錢包能找到嗎？',
        '失聯的朋友能找到嗎？',
        '丟失的文件會出現嗎？',
        '手機找得回來嗎？'
    ],
    'general_travel': [
        '下週去日本旅遊順利嗎？',
        '出國玩會平安嗎？',
        '這次旅行會開心嗎？',
        '航班會準時嗎？',
        '旅途中會遇到麻煩嗎？'
    ],
    'general_legal': [
        '這個官司會贏嗎？',
        '訴訟結果對我有利嗎？',
        '房東會告我嗎？',
        '車禍賠償能談成嗎？',
        '合約糾紛能和解嗎？'
    ],
    'general_luck': [
        '今年整體運勢如何？',
        '這個月運勢好嗎？',
        '最近適合做重大決定嗎？',
        '我的貴人在哪裡？'
    ],
    'general_decision': [
        '我該選A還是B？',
        '這個決定是正確的嗎？',
        '現在是行動的好時機嗎？',
        '我該冒這個險嗎？'
    ],
    'general_compete': [
        '這次比賽能得名嗎？',
        '我會贏過競爭對手嗎？',
        '這場競爭我有優勢嗎？'
    ],
    'general_move': [
        '搬到那個城市適合我嗎？',
        '移民會順利嗎？',
        '現在是搬家的好時機嗎？'
    ],
    'general_contact': [
        '他會主動聯絡我嗎？',
        '等這個消息會有結果嗎？',
        '對方會回覆我嗎？'
    ],
    'general_gift': [
        '送這個禮物對方會喜歡嗎？',
        '這個驚喜會成功嗎？'
    ],
    'health_pregnancy': [
        '今年能懷孕嗎？',
        '備孕會順利嗎？',
        '試管嬰兒會成功嗎？'
    ],
    'health_mental': [
        '我的焦慮會改善嗎？',
        '心理壓力會減輕嗎？',
        '這段低潮期會過去嗎？'
    ],
};

// 執行測試
function runTests() {
    console.log('🚀 開始 detectScenario 測試...\n');
    let passed = 0;
    let failed = 0;
    const failures: { question: string; expected: string; actual: string }[] = [];

    for (const [expectedScenario, questions] of Object.entries(TEST_QUESTIONS)) {
        for (const q of questions) {
            const actual = detectScenario(q);
            if (actual === expectedScenario) {
                passed++;
                console.log(`✅ "${q}" → ${actual}`);
            } else {
                failed++;
                failures.push({ question: q, expected: expectedScenario, actual });
                console.log(`❌ "${q}"`);
                console.log(`   期望: ${expectedScenario}, 實際: ${actual}`);
            }
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 測試結果: ${passed} 通過, ${failed} 失敗 (${Math.round(passed / (passed + failed) * 100)}%)`);
    console.log(`${'='.repeat(60)}`);

    if (failures.length > 0) {
        console.log('\n❌ 失敗項目:');
        for (const f of failures) {
            console.log(`   - "${f.question}" (期望: ${f.expected}, 實際: ${f.actual})`);
        }
    }

    return { passed, failed, total: passed + failed };
}

runTests();
