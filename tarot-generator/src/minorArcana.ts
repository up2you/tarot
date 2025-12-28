/**
 * 56張小阿爾克那塔羅牌的專業描述
 * 分為四個花色：權杖(Wands)、聖杯(Cups)、寶劍(Swords)、錢幣(Pentacles)
 */

export interface MinorArcanaCard {
    id: number;
    name: string;
    nameZh: string;
    suit: 'wands' | 'cups' | 'swords' | 'pentacles';
    rank: string;
    keywords: string[];
    visualElements: string;
    mood: string;
}

// 花色基礎設定
export const SUITS = {
    wands: {
        element: 'Fire',
        theme: 'passion, creativity, ambition, energy, action',
        color: 'warm oranges, reds, and yellows',
        symbol: 'wooden staves with leaves or flames',
    },
    cups: {
        element: 'Water',
        theme: 'emotions, relationships, intuition, feelings, love',
        color: 'blues, silvers, and sea greens',
        symbol: 'ornate chalices or goblets overflowing',
    },
    swords: {
        element: 'Air',
        theme: 'intellect, conflict, truth, communication, thoughts',
        color: 'greys, whites, and stormy blues',
        symbol: 'gleaming double-edged swords',
    },
    pentacles: {
        element: 'Earth',
        theme: 'material world, wealth, career, stability, health',
        color: 'greens, browns, and gold',
        symbol: 'golden coins with pentagram star',
    },
};

// 宮廷牌描述
const COURT_CARDS = {
    page: {
        energy: 'youthful, curious, student, messenger',
        figure: 'young person in simple noble attire, learning posture',
    },
    knight: {
        energy: 'action-oriented, adventurous, pursuing, in motion',
        figure: 'armored figure on horseback, charging forward',
    },
    queen: {
        energy: 'nurturing, intuitive, mastery of inner realm',
        figure: 'regal woman on throne, receptive and knowing',
    },
    king: {
        energy: 'authoritative, commanding, mastery of outer realm',
        figure: 'powerful ruler on throne, confident and decisive',
    },
};

// 生成小阿爾克那描述
function generateMinorArcana(): MinorArcanaCard[] {
    const cards: MinorArcanaCard[] = [];
    let id = 22; // 從22開始（大阿爾克那之後）

    const suits: Array<'wands' | 'cups' | 'swords' | 'pentacles'> = ['wands', 'cups', 'swords', 'pentacles'];
    const suitNameZh: Record<string, string> = {
        wands: '權杖',
        cups: '聖杯',
        swords: '寶劍',
        pentacles: '錢幣',
    };

    for (const suit of suits) {
        const suitInfo = SUITS[suit];

        // Ace (1)
        cards.push({
            id: id++,
            name: `Ace of ${capitalize(suit)}`,
            nameZh: `${suitNameZh[suit]}王牌`,
            suit,
            rank: 'ace',
            keywords: ['new beginning', 'potential', 'opportunity', suitInfo.element.toLowerCase()],
            visualElements: `A divine hand emerging from clouds holding a single ${suitInfo.symbol}.
        Brilliant light radiating from the ${suit === 'wands' ? 'staff' : suit === 'cups' ? 'chalice' : suit === 'swords' ? 'sword' : 'coin'}.
        ${suit === 'wands' ? 'Leaves sprouting, fertile landscape below' :
                    suit === 'cups' ? 'Water overflowing, lotus flowers blooming' :
                        suit === 'swords' ? 'Crown at tip, mountains in distance' :
                            'Garden path leading to archway, roses climbing'}.
        Pure ${suitInfo.color} color palette.
        Sense of divine gift and new potential.`,
            mood: `Pure potential, divine gift, primordial ${suitInfo.element.toLowerCase()} energy`,
        });

        // Number cards (2-10)
        const numberDescriptions: Record<number, { keywords: string[]; visual: string; mood: string }> = {
            2: {
                keywords: ['balance', 'decision', 'partnership'],
                visual: suit === 'wands' ? 'Figure holding globe looking out to sea, two staffs crossed' :
                    suit === 'cups' ? 'Two figures sharing cups under caduceus, pledging union' :
                        suit === 'swords' ? 'Blindfolded figure balancing two swords, crescent moon' :
                            'Juggler balancing two pentacles in infinity pattern, ships on waves',
                mood: suit === 'wands' ? 'Planning, world in hands' :
                    suit === 'cups' ? 'Partnership, emotional bond' :
                        suit === 'swords' ? 'Difficult choice, willful blindness' :
                            'Flexibility, balance in change',
            },
            3: {
                keywords: ['growth', 'expansion', 'collaboration'],
                visual: suit === 'wands' ? 'Figure looking at ships, three staffs planted, commerce' :
                    suit === 'cups' ? 'Three maidens drinking together, celebrating, dancing' :
                        suit === 'swords' ? 'Heart pierced by three swords, rain and clouds' :
                            'Craftsman in cathedral with two figures judging work',
                mood: suit === 'wands' ? 'Enterprise, exploration' :
                    suit === 'cups' ? 'Celebration, friendship' :
                        suit === 'swords' ? 'Heartbreak, sorrow' :
                            'Mastery, teamwork',
            },
            4: {
                keywords: ['stability', 'foundation', 'structure'],
                visual: suit === 'wands' ? 'Four staffs forming canopy, garlands, celebration' :
                    suit === 'cups' ? 'Figure sitting under tree, three cups before, one offered from cloud' :
                        suit === 'swords' ? 'Figure lying on tomb, hands in prayer, stained glass' :
                            'Figure clutching pentacles, crown, more under feet',
                mood: suit === 'wands' ? 'Celebration, harmony, home' :
                    suit === 'cups' ? 'Apathy, contemplation, missed opportunity' :
                        suit === 'swords' ? 'Rest, recuperation, stillness' :
                            'Security, possession, control',
            },
            5: {
                keywords: ['conflict', 'challenge', 'change'],
                visual: suit === 'wands' ? 'Five figures with raised staffs in mock battle' :
                    suit === 'cups' ? 'Cloaked figure mourning three spilled cups, two standing' :
                        suit === 'swords' ? 'Victor gathering swords, two defeated figures, stormy sky' :
                            'Two beggars in snow outside lit church window',
                mood: suit === 'wands' ? 'Competition, creative tension' :
                    suit === 'cups' ? 'Loss, grief, but hope remains' :
                        suit === 'swords' ? 'Defeat, betrayal, hollow victory' :
                            'Material hardship, spiritual poverty',
            },
            6: {
                keywords: ['harmony', 'progress', 'reward'],
                visual: suit === 'wands' ? 'Victorious figure on horse with laurel staff, crowd cheering' :
                    suit === 'cups' ? 'Two children in garden exchanging cups with flowers' :
                        suit === 'swords' ? 'Figure punting boat with passenger and swords to shore' :
                            'Wealthy merchant giving coins to kneeling poor',
                mood: suit === 'wands' ? 'Victory, public recognition' :
                    suit === 'cups' ? 'Innocence, nostalgia, childhood' :
                        suit === 'swords' ? 'Transition, moving forward, leaving behind' :
                            'Generosity, sharing wealth',
            },
            7: {
                keywords: ['assessment', 'challenge', 'perseverance'],
                visual: suit === 'wands' ? 'Figure defending with one staff against six others' :
                    suit === 'cups' ? 'Silhouette facing seven cups in clouds with treasures' :
                        suit === 'swords' ? 'Figure sneaking away carrying five swords, two in ground' :
                            'Farmer leaning on hoe looking at abundant pentacle bush',
                mood: suit === 'wands' ? 'Courage, standing ground' :
                    suit === 'cups' ? 'Fantasy, choices, illusion' :
                        suit === 'swords' ? 'Deception, strategy, theft' :
                            'Assessment, patience, long-term view',
            },
            8: {
                keywords: ['movement', 'speed', 'action'],
                visual: suit === 'wands' ? 'Eight staffs flying through air over landscape' :
                    suit === 'cups' ? 'Figure walking away from stacked cups toward mountains' :
                        suit === 'swords' ? 'Blindfolded bound figure surrounded by eight swords' :
                            'Artisan meticulously carving pentacles at workbench',
                mood: suit === 'wands' ? 'Swift action, air travel, progress' :
                    suit === 'cups' ? 'Leaving behind, seeking more' :
                        suit === 'swords' ? 'Restriction, fear, trapped by thoughts' :
                            'Diligence, skill development, craftsmanship',
            },
            9: {
                keywords: ['culmination', 'near completion', 'resilience'],
                visual: suit === 'wands' ? 'Wounded figure defending, eight staffs behind like fence' :
                    suit === 'cups' ? 'Satisfied figure seated, nine cups arranged in arc' :
                        suit === 'swords' ? 'Figure sitting up in bed, head in hands, nine swords on wall' :
                            'Elegant figure in vineyard garden surrounded by pentacles',
                mood: suit === 'wands' ? 'Perseverance, last stand' :
                    suit === 'cups' ? 'Contentment, wishes fulfilled' :
                        suit === 'swords' ? 'Anxiety, nightmares, worry' :
                            'Abundance, luxury, self-sufficiency',
            },
            10: {
                keywords: ['completion', 'ending', 'culmination'],
                visual: suit === 'wands' ? 'Figure burdened carrying ten heavy staffs, approaching town' :
                    suit === 'cups' ? 'Happy family under rainbow with ten cups, home in background' :
                        suit === 'swords' ? 'Figure face down with ten swords in back, dawn breaking' :
                            'Wealthy family in archway, elder with pentacles, dogs, castle',
                mood: suit === 'wands' ? 'Burden, responsibility, hard work' :
                    suit === 'cups' ? 'Emotional fulfillment, family happiness' :
                        suit === 'swords' ? 'Painful ending, but also finality and release' :
                            'Legacy, family wealth, tradition',
            },
        };

        for (let num = 2; num <= 10; num++) {
            const desc = numberDescriptions[num];
            cards.push({
                id: id++,
                name: `${num} of ${capitalize(suit)}`,
                nameZh: `${suitNameZh[suit]}${num}`,
                suit,
                rank: num.toString(),
                keywords: desc.keywords,
                visualElements: `${desc.visual}
          ${suitInfo.symbol} prominently featured.
          ${suitInfo.color} color scheme.
          ${suitInfo.theme} themed elements.`,
                mood: desc.mood,
            });
        }

        // Court cards
        const courts: Array<'page' | 'knight' | 'queen' | 'king'> = ['page', 'knight', 'queen', 'king'];
        const courtNameZh: Record<string, string> = {
            page: '侍者',
            knight: '騎士',
            queen: '皇后',
            king: '國王',
        };

        for (const court of courts) {
            const courtInfo = COURT_CARDS[court];
            cards.push({
                id: id++,
                name: `${capitalize(court)} of ${capitalize(suit)}`,
                nameZh: `${suitNameZh[suit]}${courtNameZh[court]}`,
                suit,
                rank: court,
                keywords: [...courtInfo.energy.split(', '), suitInfo.element.toLowerCase()],
                visualElements: `${courtInfo.figure}
          ${suit === 'wands' ? 'Holding flowering staff, lions and salamanders decorating throne' :
                        suit === 'cups' ? 'Holding ornate chalice gazing contemplatively, water and fish motifs' :
                            suit === 'swords' ? 'Holding upright sword, butterfly and cloud motifs, keen gaze' :
                                'Holding golden pentacle, surrounded by lush garden and abundance'}.
          ${suitInfo.color} color palette with ${suitInfo.element.toLowerCase()} element symbols.
          Noble bearing with ${courtInfo.energy} energy.`,
                mood: `${capitalize(court)} energy channeling ${suitInfo.element.toLowerCase()} - ${suitInfo.theme}`,
            });
        }
    }

    return cards;
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const MINOR_ARCANA = generateMinorArcana();

export const getMinorArcanaById = (id: number): MinorArcanaCard | undefined => {
    return MINOR_ARCANA.find(card => card.id === id);
};

export const getMinorArcanaBySuit = (suit: string): MinorArcanaCard[] => {
    return MINOR_ARCANA.filter(card => card.suit === suit);
};

export const getAllMinorArcana = (): MinorArcanaCard[] => {
    return MINOR_ARCANA;
};
