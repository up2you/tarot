/**
 * 22張大阿爾克那塔羅牌的專業描述
 * 每張牌都有精確的視覺元素描述，確保AI生成準確的圖像
 */

export interface MajorArcanaCard {
    id: number;
    name: string;
    nameZh: string;
    keywords: string[];
    visualElements: string;
    symbolism: string;
    mood: string;
}

export const MAJOR_ARCANA: MajorArcanaCard[] = [
    {
        id: 0,
        name: "The Fool",
        nameZh: "愚者",
        keywords: ["new beginnings", "innocence", "spontaneity", "free spirit"],
        visualElements: `A young androgynous figure in colorful flowing garments stands at the edge of a cliff.
      Small white dog companion at their feet, looking up with loyalty.
      Carrying a small bindle (stick with bundle) over shoulder.
      White rose in hand symbolizing purity.
      Looking upward toward a bright sun with childlike wonder.
      Mountains in the distance.
      Butterfly or floating feathers in the air.`,
        symbolism: "The number 0, representing infinite potential and the beginning of a journey",
        mood: "Joyful, carefree, adventurous, innocent optimism"
    },
    {
        id: 1,
        name: "The Magician",
        nameZh: "魔術師",
        keywords: ["manifestation", "power", "resourcefulness", "action"],
        visualElements: `Confident figure standing at an altar table with four elemental objects: 
      wand (fire), cup (water), sword (air), pentacle (earth).
      One hand pointing to the sky, one to the earth - "As above, so below" pose.
      Infinity symbol (lemniscate) floating above the head.
      Red robe symbolizing passion and willpower.
      White undergarment for purity of intent.
      Roses and lilies growing around the base.
      Yellow background representing intellect and energy.`,
        symbolism: "The infinity symbol, the four elements, channel between heaven and earth",
        mood: "Powerful, focused, masterful, commanding presence"
    },
    {
        id: 2,
        name: "The High Priestess",
        nameZh: "女教皇",
        keywords: ["intuition", "sacred knowledge", "divine feminine", "mystery"],
        visualElements: `Serene priestess seated between two pillars - one black (Boaz), one white (Jachin).
      Crescent moon at her feet.
      Pomegranates on tapestry behind her representing fertility.
      Torah scroll or ancient book in her lap, partially concealed.
      Blue robes flowing like water.
      Crown with lunar phases.
      Thin veil between pillars suggesting hidden knowledge.
      Palm and date tree in background.`,
        symbolism: "The veil between worlds, lunar wisdom, sacred feminine mysteries",
        mood: "Mysterious, serene, contemplative, deeply intuitive"
    },
    {
        id: 3,
        name: "The Empress",
        nameZh: "皇后",
        keywords: ["femininity", "beauty", "nature", "abundance", "fertility"],
        visualElements: `Regal feminine figure seated on plush throne in lush garden.
      Crown of twelve stars representing zodiac.
      Scepter of power in hand.
      Shield with Venus symbol at her side.
      Pregnant or full-figured representing fertility.
      Flowing golden hair and luxurious robes.
      Wheat field and flowing stream in foreground.
      Forest and waterfall in background.
      Pillows and cushions suggesting comfort.`,
        symbolism: "Venus symbol, stars, abundant nature, the creative force",
        mood: "Nurturing, sensual, abundant, maternal warmth"
    },
    {
        id: 4,
        name: "The Emperor",
        nameZh: "皇帝",
        keywords: ["authority", "structure", "control", "father figure"],
        visualElements: `Stern masculine figure seated on stone throne carved with ram heads.
      Long white beard symbolizing wisdom and experience.
      Armor beneath red robes indicating warrior-king.
      Ankh scepter in right hand (life force).
      Orb in left hand (worldly power).
      Crown of authority.
      Barren mountain landscape behind suggesting harsh realities.
      Orange/red sky representing passion and power.`,
        symbolism: "The number 4 for stability, ram symbolizing Aries, mountain fortress",
        mood: "Authoritative, structured, protective, commanding"
    },
    {
        id: 5,
        name: "The Hierophant",
        nameZh: "教皇",
        keywords: ["tradition", "spiritual wisdom", "education", "conformity"],
        visualElements: `Spiritual leader seated between two grey pillars.
      Triple crown (tiara) representing three worlds.
      Raised hand in blessing or teaching gesture.
      Two fingers pointing up, two down - spiritual connection.
      Crossed keys at his feet (gold and silver - sun and moon).
      Two acolytes or pupils kneeling before him.
      Ornate religious vestments.
      Papal cross or triple cross staff.`,
        symbolism: "The crossed keys, triple crown, bridge between divine and human",
        mood: "Sacred, traditional, wise, ceremonial gravitas"
    },
    {
        id: 6,
        name: "The Lovers",
        nameZh: "戀人",
        keywords: ["love", "harmony", "relationships", "choices", "union"],
        visualElements: `Two figures - masculine and feminine - standing nude or in simple garments.
      Angel Raphael blessing from above with arms outstretched.
      Tree of Knowledge with serpent behind the woman.
      Tree of Life with flames behind the man.
      Sun radiating golden light above the angel.
      Mountain in background between them.
      Green garden setting suggesting Eden.`,
        symbolism: "The angel mediating between dual natures, Garden of Eden, sacred union",
        mood: "Romantic, harmonious, fateful, spiritually connected"
    },
    {
        id: 7,
        name: "The Chariot",
        nameZh: "戰車",
        keywords: ["control", "willpower", "victory", "determination"],
        visualElements: `Armored warrior standing in stone chariot with starry canopy.
      Crown or laurel wreath of victory.
      Crescent moons on shoulders.
      Square on chest representing earth/stability.
      Two sphinxes pulling chariot - one black, one white.
      Sphinxes sitting still, controlled by will not reins.
      River and city in background.
      Wings on chariot.
      Wand or scepter in hand.`,
        symbolism: "The sphinxes representing opposing forces unified, the moving castle",
        mood: "Triumphant, determined, focused willpower, forward momentum"
    },
    {
        id: 8,
        name: "Strength",
        nameZh: "力量",
        keywords: ["courage", "persuasion", "influence", "compassion"],
        visualElements: `Gentle figure (usually feminine) calmly closing a lion's mouth.
      Infinity symbol above the head (like the Magician).
      White robes symbolizing purity of spirit.
      Flower garland or floral crown.
      The lion appears docile and tamed.
      Green landscape with mountains.
      Golden chain of roses binding woman and lion.
      Peaceful expression on both faces.`,
        symbolism: "The infinity symbol, taming the beast through love not force",
        mood: "Gentle strength, patient courage, quiet confidence"
    },
    {
        id: 9,
        name: "The Hermit",
        nameZh: "隱士",
        keywords: ["soul-searching", "introspection", "solitude", "guidance"],
        visualElements: `Elderly wise figure in grey hooded cloak standing alone on mountain peak.
      Staff in one hand for support and wisdom.
      Lantern held high containing six-pointed star (Seal of Solomon).
      Long white beard suggesting age and wisdom.
      Looking downward in contemplation.
      Snowy or barren mountain landscape.
      Night sky with stars.
      Path winding up the mountain.`,
        symbolism: "The lantern of truth, the mountain of achievement, solitary wisdom",
        mood: "Contemplative, wise, solitary, introspective serenity"
    },
    {
        id: 10,
        name: "Wheel of Fortune",
        nameZh: "命運之輪",
        keywords: ["change", "cycles", "destiny", "turning point"],
        visualElements: `Large wheel floating in clouds with Hebrew letters YHVH and TORA.
      Four alchemical symbols on wheel.
      Sphinx at top wielding sword.
      Anubis ascending on one side.
      Typhon (serpent) descending on other side.
      Four winged creatures in corners: angel, eagle, lion, bull (evangelists).
      Each creature reading a book.
      Blue sky with fluffy clouds.`,
        symbolism: "The eternal rotation of fate, the four fixed signs of zodiac",
        mood: "Dynamic, fateful, ever-changing, cosmic motion"
    },
    {
        id: 11,
        name: "Justice",
        nameZh: "正義",
        keywords: ["justice", "fairness", "truth", "cause and effect"],
        visualElements: `Figure seated on throne between two grey pillars.
      Crown on head with small square jewel.
      Purple or red robes of royalty.
      Upright sword in right hand pointing upward.
      Balanced scales in left hand.
      Stoic, impartial expression.
      Square clasp at throat representing earthly order.
      Simple grey background.
      Veil or curtain between pillars.`,
        symbolism: "The sword of discernment, scales of balance, blindfold-free clear seeing",
        mood: "Impartial, balanced, truthful, solemn clarity"
    },
    {
        id: 12,
        name: "The Hanged Man",
        nameZh: "倒吊人",
        keywords: ["surrender", "letting go", "new perspective", "sacrifice"],
        visualElements: `Figure hanging upside down from wooden T-shaped cross or living tree.
      One leg crossed behind the other forming a figure-4.
      Arms bound or clasped behind back.
      Halo or golden aura around head.
      Serene, peaceful expression despite position.
      Red pants and blue shirt (or reverse).
      Green leaves on the tree indicating life.
      Grey background.`,
        symbolism: "The Norse god Odin's sacrifice, seeing world from different angle",
        mood: "Peaceful surrender, transcendent patience, willing sacrifice"
    },
    {
        id: 13,
        name: "Death",
        nameZh: "死亡",
        keywords: ["endings", "transformation", "transition", "change"],
        visualElements: `Skeleton knight in black armor riding white horse.
      Black banner with white five-petaled rose (Tudor rose).
      Fallen king on ground.
      Bishop or pope praying.
      Young maiden and child looking up.
      Setting or rising sun between two towers.
      River flowing in background.
      Barren land becoming fertile ahead.`,
        symbolism: "The white rose of immortal life, the sun of renewal, universal equalizer",
        mood: "Transformative, inevitable, solemn, mysteriously hopeful"
    },
    {
        id: 14,
        name: "Temperance",
        nameZh: "節制",
        keywords: ["balance", "moderation", "patience", "purpose"],
        visualElements: `Winged angel figure (often androgynous) with sun on forehead.
      One foot on land, one in water.
      Pouring liquid between two cups without spilling.
      White robes with triangle inside square on chest.
      Yellow irises growing by the water.
      Winding path leading to mountains and rising sun.
      Soft glowing aura.
      Crown or circlet on head.`,
        symbolism: "The alchemical mixing of elements, path to the sun, divine balance",
        mood: "Serene, balanced, harmonious, patient grace"
    },
    {
        id: 15,
        name: "The Devil",
        nameZh: "惡魔",
        keywords: ["shadow self", "attachment", "addiction", "materialism"],
        visualElements: `Baphomet-like figure with goat head, bat wings, and human body.
      Inverted pentagram above head.
      One hand raised, one pointing down (inverse Magician).
      Flames or torch in raised hand.
      Two nude human figures chained to pedestal.
      Chains loose enough to remove but figures don't.
      Figures have small horns and tails.
      Dark background.`,
        symbolism: "The chains we create, the material world's seduction, shadow integration",
        mood: "Dark, seductive, binding, uncomfortably revealing"
    },
    {
        id: 16,
        name: "The Tower",
        nameZh: "高塔",
        keywords: ["sudden change", "upheaval", "chaos", "revelation"],
        visualElements: `Tall grey stone tower on rocky outcrop struck by lightning.
      Crown being blown off the top of tower.
      Two figures falling from the tower.
      Flames bursting from windows.
      22 flames or Yods (Hebrew letter) falling.
      Dark stormy sky.
      Rough seas or rocky cliffs below.
      Tower's foundation cracking.`,
        symbolism: "The Tower of Babel, lightning of divine truth, ego destruction",
        mood: "Shocking, chaotic, liberating destruction, sudden awakening"
    },
    {
        id: 17,
        name: "The Star",
        nameZh: "星星",
        keywords: ["hope", "faith", "renewal", "serenity", "purpose"],
        visualElements: `Nude figure kneeling by pool of water.
      One foot on land, one knee in water.
      Pouring water from two jugs - one into pool, one onto land.
      Large eight-pointed star above.
      Seven smaller stars surrounding.
      Ibis bird in tree.
      Night sky with brilliant stars.
      Lush green landscape.
      Peaceful expression of hope.`,
        symbolism: "The Star of Venus, water of subconsciousness, cosmic hope",
        mood: "Hopeful, serene, inspiring, spiritually renewed"
    },
    {
        id: 18,
        name: "The Moon",
        nameZh: "月亮",
        keywords: ["illusion", "fear", "anxiety", "subconscious", "intuition"],
        visualElements: `Full moon with both gentle and stern face.
      Moon dripping dew drops or tears.
      Two towers in distance.
      Path leading from water between towers to mountains.
      Crayfish emerging from water.
      Dog and wolf howling at moon.
      15 Yods falling from moon.
      Pool or ocean in foreground.
      Eerie lighting.`,
        symbolism: "The path through illusion, the call of the wild, lunar mysteries",
        mood: "Mysterious, unsettling, dreamy, hauntingly beautiful"
    },
    {
        id: 19,
        name: "The Sun",
        nameZh: "太陽",
        keywords: ["positivity", "joy", "success", "vitality", "enlightenment"],
        visualElements: `Brilliant golden sun with human face radiating straight and wavy rays.
      Nude child riding white horse.
      Child with arms outstretched in joy.
      Red banner or feather.
      Sunflowers turned toward viewer.
      Grey stone wall in background.
      Clear blue sky.
      Abundant garden.`,
        symbolism: "The divine child, solar consciousness, pure joy and achievement",
        mood: "Joyful, radiant, innocent happiness, ultimate success"
    },
    {
        id: 20,
        name: "Judgement",
        nameZh: "審判",
        keywords: ["rebirth", "inner calling", "absolution", "reflection"],
        visualElements: `Angel (Gabriel) in sky blowing trumpet with banner.
      Red cross on white banner.
      Naked figures rising from coffins with arms raised.
      Mountain range or waves in background.
      Grey/blue naked figures - man, woman, child.
      Coffins floating on water.
      Glowing clouds around angel.
      People looking upward in awakening.`,
        symbolism: "The last trumpet, resurrection, the final awakening",
        mood: "Awakening, liberating, transcendent, final transformation"
    },
    {
        id: 21,
        name: "The World",
        nameZh: "世界",
        keywords: ["completion", "accomplishment", "travel", "wholeness"],
        visualElements: `Dancing figure wrapped in purple cloth in center of laurel wreath.
      Figure holding two wands or scrolls.
      Wreath forming oval portal tied with red ribbons.
      Four creatures in corners: angel, eagle, lion, bull.
      Figure appears androgynous or feminine.
      Joyful expression of completion.
      Blue sky background.
      Creatures emerging from clouds.`,
        symbolism: "The cosmic egg, four elements mastered, completion of the journey",
        mood: "Triumphant, complete, celebratory, cosmic achievement"
    }
];

export const getMajorArcanaById = (id: number): MajorArcanaCard | undefined => {
    return MAJOR_ARCANA.find(card => card.id === id);
};

export const getAllMajorArcana = (): MajorArcanaCard[] => {
    return MAJOR_ARCANA;
};
