/**
 * 場景偵測與位置映射工具
 * 從 App.tsx 拆出：根據使用者問題推測神諭場景、映射牌位名稱到標準 key
 * 純函數，無 React 依賴
 */
  // 🆕 根據問題推測場景（完整覆蓋 50+ scenario_key，支援中英雙語關鍵字）
export const detectScenario = (q: string): string => {
    const lower = q.toLowerCase();

    // 英文關鍵字偵測
    if (lower.includes('love') || lower.includes('romance') || lower.includes('relationship') || lower.includes('marry') || lower.includes('marriage')) return 'love';
    if (lower.includes('career') || lower.includes('work') || lower.includes('job') || lower.includes('boss') || lower.includes('interview')) return 'career';
    if (lower.includes('money') || lower.includes('finance') || lower.includes('wealth') || lower.includes('invest') || lower.includes('loan')) return 'money';
    if (lower.includes('family') || lower.includes('parent') || lower.includes('brother') || lower.includes('sister')) return 'family';
    if (lower.includes('study') || lower.includes('exam') || lower.includes('learn') || lower.includes('school') || lower.includes('test')) return 'self';

    // ==================== 🌾 豐收/農業/漁牧相關（優先判斷）====================
    if (lower.includes('農') || lower.includes('種植') || lower.includes('收成') ||
      lower.includes('豐收') || lower.includes('作物') || lower.includes('水果') ||
      lower.includes('橘子') || lower.includes('稻米') || lower.includes('高麗菜')) {
      return 'harvest_farming';
    }
    if (lower.includes('漁') || lower.includes('捕魚') || lower.includes('出海') ||
      lower.includes('水產') || lower.includes('養殖') || lower.includes('蝦') ||
      lower.includes('魚獲') || lower.includes('漁獲')) {
      return 'harvest_fishery';
    }
    if (lower.includes('畜牧') || lower.includes('養豬') || lower.includes('養牛') ||
      lower.includes('養雞') || lower.includes('牲畜') || lower.includes('繁殖')) {
      return 'harvest_livestock';
    }
    if (lower.includes('林業') || lower.includes('林木') || lower.includes('伐木')) {
      return 'harvest_forestry';
    }
    if (lower.includes('園藝') || lower.includes('花草') || lower.includes('盆栽')) {
      return 'harvest_garden';
    }

    // ==================== 🎲 博弈/賭運/彩券相關（優先判斷）====================
    if (lower.includes('樂透') || lower.includes('彩券') || lower.includes('威力彩') ||
      lower.includes('刮刮樂') || lower.includes('大樂透') || lower.includes('今彩')) {
      return 'gamble_lottery';
    }
    if (lower.includes('撲克') || lower.includes('德州') || lower.includes('21點') ||
      lower.includes('牌局') || lower.includes('梭哈')) {
      return 'gamble_card';
    }
    if (lower.includes('運彩') || lower.includes('球賽') || lower.includes('賭球') ||
      lower.includes('賽馬') || lower.includes('世足') || lower.includes('NBA') ||
      lower.includes('MLB')) {
      return 'gamble_sport';
    }
    if (lower.includes('賭場') || lower.includes('輪盤') || lower.includes('老虎機') ||
      lower.includes('百家樂') || lower.includes('賭桌')) {
      return 'gamble_casino';
    }
    if (lower.includes('賭') || lower.includes('博弈') || lower.includes('壓大') ||
      lower.includes('壓小') || lower.includes('輸贏') || lower.includes('手氣') ||
      lower.includes('下注') || lower.includes('簽牌')) {
      return 'gamble_luck';
    }

    // ==================== 🏥 健康相關（最高優先級）====================
    // 胎兒性別 (優先於懷孕)
    if ((lower.includes('性別') && (lower.includes('胎') || lower.includes('寶寶') || lower.includes('子女'))) ||
      lower.includes('生男') || lower.includes('生女') || lower.includes('男生女生') ||
      lower.includes('是男是女') || lower.includes('是男還是女') || lower.includes('男還是女') ||
      lower.includes('懷男') || lower.includes('懷女') ||
      ((lower.includes('男') && lower.includes('女')) && (lower.includes('胎') || lower.includes('懷') || lower.includes('生')))) {
      return 'health_gender';
    }
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
    if ((lower.includes('結婚') || lower.includes('求婚') || lower.includes('訂婚')) &&
      (lower.includes('歲') || lower.includes('年內') || lower.includes('何時') ||
        lower.includes('能不能') || lower.includes('會不會') || lower.includes('可以') ||
        lower.includes('能在') || lower.includes('會在') || lower.includes('幾歲') ||
        lower.includes('多久') || lower.includes('什麼時候') || lower.includes('時候'))) {
      return 'love_single';
    }
    // 現有婚姻關係
    if (lower.includes('婚姻') || lower.includes('婆媳') ||
      lower.includes('夫妻') || lower.includes('配偶') ||
      (lower.includes('結婚') && (lower.includes('後') || lower.includes('生活') || lower.includes('相處')))) {
      return 'love_marriage';
    }

    // ==================== 🎓 留學相關（優先判斷）====================
    if (lower.includes('留學') || lower.includes('出國讀書') || lower.includes('海外學習') ||
      lower.includes('留學簽證') || lower.includes('學生簽證')) {
      return 'study_abroad';
    }

    // ==================== 💰 財運相關（優先判斷具體情境）====================
    if (lower.includes('投資') || lower.includes('股票') || lower.includes('基金') ||
      lower.includes('定存') || lower.includes('債券') || lower.includes('理財產品') ||
      (lower.includes('買') && (lower.includes('股') || lower.includes('基金')))) {
      return 'money_invest';
    }
    if ((lower.includes('借') && (lower.includes('錢') || lower.includes('款'))) ||
      lower.includes('貸款') || lower.includes('融資') || lower.includes('車貸') ||
      lower.includes('房貸') || lower.includes('學貸') || lower.includes('信貸')) {
      return 'money_loan';
    }
    if (lower.includes('欠債') || lower.includes('討債') || lower.includes('還債') ||
      lower.includes('債務') || (lower.includes('債') && lower.includes('還'))) {
      return 'money_debt';
    }
    if ((lower.includes('買房') || lower.includes('購屋') || lower.includes('置產')) &&
      !lower.includes('租')) {
      return 'money_property';
    }
    if (lower.includes('破財') || lower.includes('財務損失') || lower.includes('賠錢') ||
      (lower.includes('損失') && lower.includes('錢'))) {
      return 'money_loss';
    }
    if (lower.includes('橫財') || lower.includes('中獎') || lower.includes('刮刮樂') ||
      lower.includes('彩券') || lower.includes('樂透') || lower.includes('大樂透') ||
      lower.includes('威力彩') || lower.includes('中彩') ||
      lower.includes('繼承') || lower.includes('遺產') ||
      lower.includes('意外之財') || lower.includes('偏財') ||
      (lower.includes('賭') && lower.includes('贏'))) {
      return 'money_windfall';
    }
    if (lower.includes('生意') || lower.includes('營收') || lower.includes('業績') ||
      lower.includes('客源') || lower.includes('訂單') ||
      (lower.includes('經商') || lower.includes('做生意'))) {
      return 'money_business';
    }
    if (lower.includes('薪水') || lower.includes('薪資') || lower.includes('加薪') ||
      lower.includes('正財') || lower.includes('收入') ||
      (lower.includes('工作') && lower.includes('賺'))) {
      return 'money_salary';
    }
    if (lower.includes('理財') || lower.includes('財務規劃') || lower.includes('財務管理') ||
      lower.includes('預算') || lower.includes('如何規劃') || lower.includes('理財計劃') ||
      (lower.includes('儲蓄') && (lower.includes('規劃') || lower.includes('計劃')))) {
      return 'money_plan';
    }
    if (lower.includes('財運') || lower.includes('財富') || lower.includes('金錢運') ||
      lower.includes('財') || lower.includes('錢運') ||
      (lower.includes('運勢') && lower.includes('錢')) ||
      (lower.includes('今年') && lower.includes('財')) ||
      (lower.includes('財富') && lower.includes('如何'))) {
      return 'money_fortune';
    }

    // ==================== 🌹 愛情單身/桃花（優先判斷）====================
    if (lower.includes('桃花') || lower.includes('戀愛運') || lower.includes('姻緣') ||
      lower.includes('感情運') || lower.includes('愛情運') || lower.includes('脫單') ||
      lower.includes('單身') || lower.includes('遇到另一半') || lower.includes('真命天') ||
      lower.includes('正緣') || lower.includes('何時脫單') || lower.includes('遇到真愛') ||
      lower.includes('有人追我') || lower.includes('被追') || lower.includes('追求者')) {
      return 'love_single';
    }

    // ==================== 💔 愛情外遇/出軌（優先判斷）====================
    if (lower.includes('外遇') || lower.includes('出軌') || lower.includes('偷吃') ||
      lower.includes('劈腿') || lower.includes('小三') || lower.includes('第三者') ||
      lower.includes('狐狸精') || lower.includes('紅杏出牆')) {
      return 'love_cheating';
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

    // ==================== 🎁 禮物/驚喜相關 ====================
    if ((lower.includes('禮物') && (lower.includes('對方') || lower.includes('喜歡嗎'))) ||
      (lower.includes('送') && lower.includes('禮') && lower.includes('喜歡'))) {
      return 'general_gift';
    }

    // ==================== 💼 面試相關 ====================
    if (lower.includes('面試官') || (lower.includes('面試') && lower.includes('喜歡'))) {
      return 'career_interview';
    }

    // ==================== 💕 愛情暗戀/追求 ====================
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

    // ==================== 💑 愛情交往 ====================
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

    // ==================== 💕 愛情關係修復/和好 ====================
    if ((lower.includes('關係') || lower.includes('我們') || lower.includes('我和他') || lower.includes('我和她')) &&
      (lower.includes('和好') || lower.includes('改善') || lower.includes('修復') || lower.includes('變好') ||
        lower.includes('挽救') || lower.includes('維持') || lower.includes('繼續') || lower.includes('順利')) &&
      !lower.includes('家人') && !lower.includes('父母') && !lower.includes('同事') &&
      !lower.includes('朋友') && !lower.includes('鄰居')) {
      if (lower.includes('เขา') || lower.includes('她') || lower.includes('對方')) {
        return 'love_conflict';
      }
    }

    // ==================== 💕 一般愛情相關 ====================
    if (lower.includes('愛') || lower.includes('戀') || lower.includes('感情') ||
      lower.includes('對象') || lower.includes('喜歡') || lower.includes('男友') ||
      lower.includes('女友') || lower.includes('老公') || lower.includes('老婆') ||
      lower.includes('另一半') || lower.includes('約會')) {
      return 'love_feelings';
    }

    // ==================== 🚚 搬遷/移民相關 ====================
    if (lower.includes('移民') || lower.includes('遷居') || lower.includes('移居') ||
      lower.includes('換城市') || lower.includes('定居') || lower.includes('搬到') ||
      lower.includes('綠卡') || (lower.includes('簽證') && lower.includes('移')) ||
      (lower.includes('搬') && (lower.includes('城市') || lower.includes('國'))) ||
      (lower.includes('搬家') && (lower.includes('時機') || lower.includes('適合')))) {
      return 'general_move';
    }

    // ==================== 👥 家庭關係 ====================
    if (lower.includes('家人') || lower.includes('父母') || lower.includes('兄弟') ||
      lower.includes('姊妹') || lower.includes('姐妹') ||
      lower.includes('弟弟') || lower.includes('哥哥') || lower.includes('姊姊') ||
      lower.includes('姐姐') || lower.includes('妹妹') ||
      lower.includes('親戚') || lower.includes('婆媳') ||
      lower.includes('家庭') || lower.includes('親情') || lower.includes('搬出去住')) {
      return 'relation_family';
    }

    // ==================== 🏠 房產相關 ====================
    if (lower.includes('租') || lower.includes('租屋') || lower.includes('房東') || lower.includes('簽約')) {
      return 'house_rent';
    }

    // ==================== 💼 競標/標案 ====================
    if (lower.includes('標案') || lower.includes('競標') || lower.includes('投標') ||
      lower.includes('得標') || lower.includes('招標') || lower.includes('開標')) {
      return 'career_bidding';
    }

    if ((lower.includes('房') || lower.includes('買房') ||
      lower.includes('置產') || lower.includes('地段')) &&
      !lower.includes('搬') && !lower.includes('家人') && !lower.includes('風水')) {
      return 'money_property';
    }

    // ==================== 📝 合約/成交相關 ====================
    if (lower.includes('合約') || lower.includes('簽約') || lower.includes('契約') ||
      lower.includes('簽訂') || lower.includes('合同') || lower.includes('協議') ||
      lower.includes('合作案') || lower.includes('談成') ||
      (lower.includes('簽') && lower.includes('約')) ||
      (lower.includes('賣') && lower.includes('車')) ||
      (lower.includes('賣出') && (lower.includes('車') || lower.includes('汽車')))) {
      return 'general_contract';
    }

    // ==================== 🚗 車輛相關 ====================
    if ((lower.includes('車') || lower.includes('汽車') || lower.includes('機車') ||
      lower.includes('買車') || lower.includes('購車') ||
      lower.includes('二手車') || lower.includes('修車') || lower.includes('車況')) &&
      !lower.includes('賣')) {
      return 'general_vehicle';
    }

    // ==================== 🎓 學業相關 ====================
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
    if ((lower.includes('關係') && (lower.includes('好') || lower.includes('還') || lower.includes('一樣'))) ||
      (lower.includes('我們') && lower.includes('關係') && lower.includes('好')) ||
      (lower.includes('我和') && lower.includes('關係'))) {
      if (!lower.includes('愛') && !lower.includes('戀') && !lower.includes('感情') &&
        !lower.includes('男友') && !lower.includes('女友') && !lower.includes('老公') && !lower.includes('老婆') &&
        !lower.includes('另一半') && !lower.includes('對象') &&
        !lower.includes('家人') && !lower.includes('父母') && !lower.includes('兄弟') && !lower.includes('姊妹') &&
        !lower.includes('同事') && !lower.includes('老闆') && !lower.includes('主管')) {
        return 'relation_friend';
      }
    }

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
    if (lower.includes('主管') && (lower.includes('欣賞') || lower.includes('表現') || lower.includes('評價'))) {
      return 'relation_elder';
    }
    if (lower.includes('主管') && !lower.includes('提拔') && !lower.includes('升')) {
      return 'relation_elder';
    }
    if (lower.includes('鄰居') || lower.includes('隔壁')) {
      return 'relation_neighbor';
    }
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
      if (lower.includes('面試') || lower.includes('筆試') || lower.includes('面釋官') ||
        lower.includes('被錄取') || lower.includes('會錄取')) return 'career_interview';
      if (lower.includes('離職') || lower.includes('轉職') || lower.includes('換工作') ||
        lower.includes('跳槽') || lower.includes('轉換跑道')) return 'career_change';
      if (lower.includes('升遷') || lower.includes('晉升') || lower.includes('升職') ||
        lower.includes('提拔') || lower.includes('努力被看見') || lower.includes('被認可') ||
        (lower.includes('主管') && (lower.includes('欣賞') || lower.includes('提拔'))) ||
        (lower.includes('努力') && lower.includes('看見')) ||
        (lower.includes('考績') && lower.includes('升'))) return 'career_promotion';
      if (lower.includes('加薪') || lower.includes('調薪')) return 'career_raise';
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

    // ==================== ✈️ 旅行/戶外/休閒相關 ====================
    if (lower.includes('旅') || lower.includes('旅遊') || lower.includes('出國玩') ||
      lower.includes('度假') || lower.includes('旅行') || lower.includes('航班') ||
      lower.includes('機票') || lower.includes('行程') || (lower.includes('準時') && lower.includes('飛')) ||
      lower.includes('露營') || lower.includes('爬山') || lower.includes('潛水') ||
      lower.includes('釣魚') || lower.includes('滑雪') || lower.includes('衝浪')) {
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
      if ((lower.includes('生意') || lower.includes('做生意') || lower.includes('買賣') ||
        lower.includes('簽單') || lower.includes('成交') || lower.includes('訂單') ||
        lower.includes('業績') || (lower.includes('項目') && lower.includes('賺')) ||
        lower.includes('賣出') || lower.includes('銷售') || lower.includes('商品')) &&
        !lower.includes('車')) return 'money_business';
      if (lower.includes('借') || lower.includes('貸款') || lower.includes('信貸') ||
        lower.includes('房貸') || lower.includes('車貸') || lower.includes('批准')) return 'money_loan';
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
      lower.includes('選a') || lower.includes('選b') || lower.includes('二選一') ||
      lower.includes('冒險') || lower.includes('風險') || lower.includes('正確嗎') ||
      lower.includes('對不對') || lower.includes('該選') || lower.includes('有沒有利') ||
      lower.includes('冷這個險') || lower.includes('這個險') ||
      lower.includes('可以嗎') || lower.includes('能不能') || lower.includes('妥當嗎') ||
      lower.includes('好嗎') || lower.includes('行嗎') ||
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

    return 'general_luck';
  };

  // 🆕 映射位置名稱到 key
export const mapPositionToKey = (positionName: string, index: number): string => {
    const keyMap: Record<string, string> = {
      '過去': 'past', '現在': 'present', '未來': 'future',
      '自己': 'self', '對方': 'other', '結果': 'outcome',
      '障礙': 'obstacle', '建議': 'advice', '環境': 'environment',
      '潛意識': 'subconscious',
      '你的心': 'self', '對方的心': 'other', '連結': 'relation', '挑戰': 'obstacle', '指引': 'advice',
      '課題': 'present', '阻礙': 'obstacle', '力量': 'self', '成長': 'future',
      '一月': 'jan', '二月': 'feb', '三月': 'mar', '四月': 'apr',
      '五月': 'may', '六月': 'jun', '七月': 'jul', '八月': 'aug',
      '九月': 'sep', '十月': 'oct', '十一月': 'nov', '十二月': 'dec'
    };
    return keyMap[positionName] || ['past', 'present', 'future', 'self', 'other', 'outcome', 'advice', 'obstacle', 'environment', 'subconscious'][index % 10];
  };
