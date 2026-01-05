
const text1 = `
核心啟示：時機成熟。
詳細解讀：...
【最終回答：肯定】這是好的開始。
`;

const text2 = `
核心啟示：需謹慎。
詳細解讀：...
【最終回答：否定】目前不適合。
`;

const text3 = `
核心啟示：未定之數。
詳細解讀：...
【最終回答：看情況】取決於你的努力。
`;

const extractAnswer = (text: string) => {
    const match = text.match(/【最終回答：(.+?)】/);
    if (match) {
        return match[1].split('】')[0];
    }
    return null;
};

console.log('Test 1 (肯定):', extractAnswer(text1));
console.log('Test 2 (否定):', extractAnswer(text2));
console.log('Test 3 (看情況):', extractAnswer(text3));

const mainCard = { text: text1 };
const answer = extractAnswer(mainCard.text);

if (answer) {
    const textParts = mainCard.text.split(/【最終回答：.+?】/);
    const adviceRaw = textParts.length > 1 ? textParts[1].trim() : '';
    console.log('Advice:', adviceRaw);
    console.log(`Summary: # 艾瑟瑞爾的最終回答：${answer}\n\n${adviceRaw}`);
}
