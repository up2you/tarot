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
    }
];

// 取得位置總數
export const TOTAL_POSITIONS = ORACLE_POSITIONS.length; // 10

// 根據 key 取得位置
export const getPositionByKey = (key: string) =>
    ORACLE_POSITIONS.find(p => p.key === key);
