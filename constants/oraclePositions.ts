/**
 * Oracle Positions - 位置定義
 * 牌卡在牌陣中不同位置的含義修飾
 */

export interface OraclePosition {
    key: string;
    nameZh: string;
    nameEn: string;
    description: string;
    prefix: string;  // 用於組合解釋的前綴
}

export const ORACLE_POSITIONS: OraclePosition[] = [
    {
        key: 'past',
        nameZh: '過去',
        nameEn: 'Past',
        description: '影響現況的過去因素',
        prefix: '在過去，'
    },
    {
        key: 'present',
        nameZh: '現在',
        nameEn: 'Present',
        description: '當前的狀態與能量',
        prefix: '目前，'
    },
    {
        key: 'future',
        nameZh: '未來',
        nameEn: 'Future',
        description: '可能的發展方向',
        prefix: '展望未來，'
    },
    {
        key: 'self',
        nameZh: '自我',
        nameEn: 'Self',
        description: '你自身的狀態或態度',
        prefix: '關於你自己，'
    },
    {
        key: 'other',
        nameZh: '對方',
        nameEn: 'Other',
        description: '對方或他人的狀態',
        prefix: '關於對方，'
    },
    {
        key: 'obstacle',
        nameZh: '障礙',
        nameEn: 'Obstacle',
        description: '阻礙進展的因素',
        prefix: '需要注意的障礙是，'
    },
    {
        key: 'advice',
        nameZh: '建議',
        nameEn: 'Advice',
        description: '建議採取的行動',
        prefix: '建議你，'
    },
    {
        key: 'environment',
        nameZh: '環境',
        nameEn: 'Environment',
        description: '外在環境的影響',
        prefix: '外在環境方面，'
    },
    {
        key: 'hope_fear',
        nameZh: '希望與恐懼',
        nameEn: 'Hopes and Fears',
        description: '內心的期待與擔憂',
        prefix: '你內心的期待與擔憂顯示，'
    },
    {
        key: 'outcome',
        nameZh: '結果',
        nameEn: 'Outcome',
        description: '最終可能的結局',
        prefix: '最終的可能結果是，'
    },
    // Monthly Positions
    { key: 'jan', nameZh: '一月', nameEn: 'January', description: '一月運勢', prefix: '在一月，' },
    { key: 'feb', nameZh: '二月', nameEn: 'February', description: '二月運勢', prefix: '在二月，' },
    { key: 'mar', nameZh: '三月', nameEn: 'March', description: '三月運勢', prefix: '在三月，' },
    { key: 'apr', nameZh: '四月', nameEn: 'April', description: '四月運勢', prefix: '在四月，' },
    { key: 'may', nameZh: '五月', nameEn: 'May', description: '五月運勢', prefix: '在五月，' },
    { key: 'jun', nameZh: '六月', nameEn: 'June', description: '六月運勢', prefix: '在六月，' },
    { key: 'jul', nameZh: '七月', nameEn: 'July', description: '七月運勢', prefix: '在七月，' },
    { key: 'aug', nameZh: '八月', nameEn: 'August', description: '八月運勢', prefix: '在八月，' },
    { key: 'sep', nameZh: '九月', nameEn: 'September', description: '九月運勢', prefix: '在九月，' },
    { key: 'oct', nameZh: '十月', nameEn: 'October', description: '十月運勢', prefix: '在十月，' },
    { key: 'nov', nameZh: '十一月', nameEn: 'November', description: '十一月運勢', prefix: '在十一月，' },
    { key: 'dec', nameZh: '十二月', nameEn: 'December', description: '十二月運勢', prefix: '在十二月，' },
    { key: 'monthly', nameZh: '當月', nameEn: 'Monthly', description: '當月運勢', prefix: '這個月，' },
    { key: 'relation', nameZh: '關係', nameEn: 'Relation', description: '兩人的連結與互動', prefix: '在關係的連結上，' }
];

// 取得位置總數
export const TOTAL_POSITIONS = ORACLE_POSITIONS.length; // 10

// 根據 key 取得位置
export const getPositionByKey = (key: string) =>
    ORACLE_POSITIONS.find(p => p.key === key);
