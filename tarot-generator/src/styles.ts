/**
 * 商業級塔羅牌藝術風格模板
 * 每個風格都經過精心設計，確保生成的圖片具有專業品質
 */

export interface StyleTemplate {
  id: string;
  name: string;
  description: string;
  basePrompt: string;
  borderlessPrompt?: string;  // 可選：無邊框純內容版本，用於後期合成
  frameOnlyPrompt?: string;   // 可選：純邊框模板，中間透明，用於疊加
  borderDesign: string;
  cardBackPrompt: string;
  colorPalette: string;
  artisticInfluence: string;
}




export const TAROT_STYLES: Record<string, StyleTemplate> = {
  // ===== 經典藝術風格 =====

  baroque_divine: {
    id: 'baroque_divine',
    name: 'Baroque Divine',
    description: '17世紀巴洛克宮廷風格，卡拉瓦喬明暗對比法',
    basePrompt: `Masterpiece tarot card illustration in High Baroque style. 
      Dramatic Caravaggio-style chiaroscuro lighting with deep shadows and golden highlights.
      Rich oil painting texture with visible brushstrokes.
      Luxurious crimson velvet and antique gold color palette.
      Divine light rays piercing through dramatic clouds.
      Museum-quality fine art, highly detailed, 8K resolution.
      Vertical composition 9:16 aspect ratio.`,
    borderlessPrompt: `Masterpiece oil painting illustration in High Baroque style.
      NO FRAME OR BORDER - pure illustration only, edge to edge artwork.
      Dramatic Caravaggio-style chiaroscuro lighting with deep shadows and golden highlights.
      Rich oil painting texture with visible brushstrokes.
      Luxurious crimson and antique gold color palette.
      Divine light rays piercing through dramatic clouds.
      Museum-quality fine art, highly detailed, 8K resolution.
      The illustration should extend to all edges with NO decorative frame or border.
      Vertical composition 9:16 aspect ratio.
      IMPORTANT: Do NOT add any frame, border, or ornamental edges.`,
    frameOnlyPrompt: `Ornate Baroque picture frame template for tarot card.
      FRAME ONLY - the center must be completely empty/transparent for content overlay.
      15px solid antique gold (#C9A227) outer border with 3px dark brown inner shadow.
      Four identical gilded acanthus leaf scrollwork corner medallions (50x50px each).
      Single cherub head with wings at top center (40x30px).
      Decorative cartouche name plate at bottom center (120x25px).
      5px crimson velvet texture inner border with gold filigree pattern.
      Rich oil painting texture, museum quality gold work.
      Perfectly symmetrical left-to-right.
      The CENTER AREA MUST BE EMPTY/WHITE for content placement.
      Vertical 9:16 aspect ratio template.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: 15px solid antique gold (#C9A227) with 3px dark brown (#3D2B1F) inner shadow
      - Corner decorations: Four identical gilded acanthus leaf scrollwork medallions (50x50px each)
      - Top center: Single cherub head with wings (40x30px)
      - Bottom center: Decorative cartouche frame for card title (120x25px)
      - Inner border: 5px crimson velvet texture (#8B0000) with gold filigree pattern
      - Total border width: 25px on all sides
      - All ornaments must be symmetrical left-to-right`,
    cardBackPrompt: `Ornate Baroque tarot card back design.
      Deep crimson velvet background with heavy golden embossed patterns.
      Central mystical seal with alchemical symbols and celestial motifs.
      Intricate golden filigree border with corner medallions.
      Rich oil painting texture, museum quality.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Deep crimson, antique gold, ivory, burnt sienna, midnight blue',
    artisticInfluence: 'Caravaggio, Rembrandt, Peter Paul Rubens'
  },

  renaissance_mystical: {
    id: 'renaissance_mystical',
    name: 'Renaissance Mystical',
    description: '文藝復興時期神秘主義風格，波提切利柔美線條',
    basePrompt: `Exquisite tarot card in Italian Renaissance style.
      Soft ethereal lighting reminiscent of Botticelli and Fra Angelico.
      Delicate tempera and gold leaf technique.
      Flowing drapery and idealized human forms.
      Muted earth tones with touches of ultramarine blue and vermillion.
      Mystical symbols integrated seamlessly into the composition.
      Museum-quality fine art painting, highly detailed.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Marble-textured classical columns on left and right sides (20px wide)
      - Top: Renaissance arch with gold leaf triangular pediment (30px height)
      - Bottom: Stone base with carved Roman numerals placeholder (20px height)
      - Corner decorations: Four identical classical acanthus capitals
      - Inner border: Thin gold leaf line (3px) with aged parchment texture
      - Title area: Classical cartouche at bottom center (100x20px)
      - Color: Warm ivory (#FFFEF0) columns with gold (#D4AF37) accents
      - All elements MUST be architecturally symmetrical`,
    cardBackPrompt: `Renaissance-style tarot card back.
      Geometric sacred patterns inspired by Leonardo da Vinci.
      Gold leaf accents on aged parchment background.
      Central rose window design with mystical symbols.
      Elegant border with classical motifs.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Ultramarine blue, vermillion, gold leaf, earth tones, soft ivory',
    artisticInfluence: 'Botticelli, Leonardo da Vinci, Fra Angelico'
  },

  // ===== 現代藝術風格 =====

  art_nouveau_ethereal: {
    id: 'art_nouveau_ethereal',
    name: 'Art Nouveau Ethereal',
    description: '新藝術運動風格，慕夏的優雅曲線',
    basePrompt: `Stunning Art Nouveau tarot card illustration.
      Flowing organic lines and elegant curves inspired by Alphonse Mucha.
      Soft pastel color palette with gold metallic accents.
      Beautiful figures with flowing hair and graceful poses.
      Ornate circular halo designs and zodiac motifs.
      Delicate watercolor and ink technique.
      Commercial illustration quality, highly detailed.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Continuous flowing vine with lilies (Mucha-style) forming organic arch
      - Left border: Vertical rose vine climbing upward (18px wide)
      - Right border: Mirror image of left vine (18px wide, symmetrical)
      - Top: Semicircular halo design with zodiac-inspired sun rays (25px height)
      - Bottom: Curved art nouveau cartouche for card title with lily motif (80x20px)
      - Corner decorations: Four identical stylized lily blooms
      - Color: Sage green (#9DC183) vines, dusty rose (#D4A5A5) flowers, gold (#C9A227) accents
      - Line weight: Consistent 2px organic curves throughout
      - All decorative elements must flow seamlessly and be perfectly symmetrical`,
    cardBackPrompt: `Art Nouveau tarot card back design.
      Symmetrical organic patterns with flowing curves.
      Central mandala with floral motifs.
      Soft sage green and dusty rose with gold accents.
      Elegant typography-style border.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Sage green, dusty rose, gold, cream, soft lavender',
    artisticInfluence: 'Alphonse Mucha, Gustav Klimt, Aubrey Beardsley'
  },

  art_deco_luxe: {
    id: 'art_deco_luxe',
    name: 'Art Deco Luxe',
    description: '裝飾藝術風格，1920年代奢華幾何',
    basePrompt: `Luxurious Art Deco tarot card illustration.
      Bold geometric patterns with sharp angles and symmetry.
      Sleek metallic gold and silver on deep black background.
      Sunburst rays and chevron patterns.
      Stylized Egyptian and Aztec influences.
      High contrast with jewel-tone accents.
      Glamorous 1920s aesthetic with modern precision.
      Premium commercial quality, vector-sharp details.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Black (#000000) with triple-line gold (#FFD700) stepped pattern (20px total)
      - Corner decorations: Four identical geometric fan/sunburst motifs (30x30px)
      - Top center: Triangular chevron pointing up with Egyptian winged sun disk (50x25px)
      - Bottom center: Geometric cartouche with stepped edges for card title (100x22px)
      - Inner border: Single gold line (2px) with small diamond accents at midpoints
      - Side borders: Vertical chevron pattern in gold on black (15px wide each)
      - All lines MUST be perfectly straight and angular (no curves)
      - Perfect bilateral symmetry required`,
    cardBackPrompt: `Art Deco tarot card back.
      Geometric sunburst pattern radiating from center.
      Black and gold color scheme with silver accents.
      Symmetrical stepped border design.
      Central eye of providence motif.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Black, gold, silver, emerald, ruby, sapphire',
    artisticInfluence: 'Erté, Tamara de Lempicka, Chrysler Building'
  },

  // ===== 奇幻風格 =====

  dark_fantasy: {
    id: 'dark_fantasy',
    name: 'Dark Fantasy',
    description: '暗黑奇幻風格，哥特式神秘美學',
    basePrompt: `Epic dark fantasy tarot card illustration.
      Dramatic gothic atmosphere with supernatural elements.
      Deep shadows with ethereal magical lighting effects.
      Mysterious fog and mystical energy swirls.
      Haunting beauty with elegant darkness.
      Rich textures of aged metal, weathered stone, and velvet.
      AAA game concept art quality, cinematic composition.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Weathered dark iron (#2D2D2D) with aged patina texture (18px)
      - Corner decorations: Four identical gothic pointed arch finials with thorny roses
      - Left/Right borders: Intertwined thorny vines with small dark roses (15px wide)
      - Top: Gothic pointed arch with central skull motif and bat wings (35px height)
      - Bottom: Dark stone plaque for card title with cracked texture (90x22px)
      - Inner border: Thin silver (#C0C0C0) line with small arcane runes at intervals
      - Small purple gemstones at four corners (5px diameter)
      - Color: Deep purple (#301934), midnight black, blood red (#8B0000) accents
      - All thorns and vines must be identical and symmetrical`,
    cardBackPrompt: `Dark fantasy tarot card back.
      Gothic cathedral rose window design.
      Deep purple and black with silver moonlight accents.
      Thorny vine border with small skull motifs.
      Central pentagram surrounded by arcane runes.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Deep purple, midnight black, blood red, silver, ghostly blue',
    artisticInfluence: 'H.R. Giger, Beksinski, Dark Souls concept art'
  },

  celestial_dreams: {
    id: 'celestial_dreams',
    name: 'Celestial Dreams',
    description: '星空夢境風格，宇宙神秘美學',
    basePrompt: `Ethereal celestial tarot card illustration.
      Cosmic starfield background with nebula colors.
      Silver and white luminescent figures.
      Moon phases, constellation patterns, and zodiac symbols.
      Soft glowing auras and stardust particles.
      Dreamy atmospheric perspective.
      Celestial geometry and sacred proportions.
      Premium digital art quality with subtle grain texture.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Thin silver (#C0C0C0) double line (outer 2px, inner 1px, 4px gap)
      - Corner decorations: Four identical 8-pointed stars with soft glow effect (20x20px)
      - Top center: Crescent moon (waxing) with 3 small stars (30x20px)
      - Bottom center: Crescent moon (waning) as title frame base (80x18px)
      - Left/Right borders: Vertical constellation pattern (identical on both sides)
      - Small twinkling stars scattered along border (5-7 per side, symmetrical placement)
      - Inner border: Subtle cosmic dust/nebula gradient (soft violet to midnight blue)
      - Color: Silver (#C0C0C0), midnight blue (#191970), pearl white, soft violet (#DDA0DD)
      - All star placements must be perfectly mirrored left-to-right`,
    cardBackPrompt: `Celestial tarot card back design.
      Deep space background with stars and galaxies.
      Central moon phases in circular arrangement.
      Silver constellation lines connecting stars.
      Elegant thin frame with star corner accents.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Midnight blue, silver, pearl white, soft violet, cosmic pink',
    artisticInfluence: 'James Jean, Peter Mohrbacher, NASA imagery'
  },

  // ===== 現代數位風格 =====

  cyberpunk_oracle: {
    id: 'cyberpunk_oracle',
    name: 'Cyberpunk Oracle',
    description: '賽博龐克風格，霹虹未來主義',
    basePrompt: `Futuristic cyberpunk tarot card illustration.
      Neon holographic aesthetic with digital glitch effects.
      Dark cityscape background with rain and reflections.
      Glowing cyan, magenta, and electric blue accents.
      High-tech mystical symbols and data streams.
      Dramatic lighting with volumetric fog.
      Blade Runner meets mysticism aesthetic.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Chrome metallic (#C0C0C0) with circuit board trace pattern (15px)
      - Corner decorations: Four identical hexagonal tech nodes with LED glow effect
      - Top center: Holographic triangle with scanning lines (40x25px)
      - Bottom center: Digital LCD display panel for card title with hex code texture (100x20px)
      - Left/Right borders: Vertical data stream lines in cyan (#00FFFF) (12px wide)
      - Small glitch effect bars at random-but-identical positions on both sides
      - Inner border: Neon glow line (2px cyan outer, 1px magenta (#FF00FF) inner)
      - Color: Black (#000000), neon cyan (#00FFFF), hot magenta (#FF00FF), chrome
      - All digital elements must be perfectly symmetrical`,
    cardBackPrompt: `Cyberpunk tarot card back.
      Black background with neon grid pattern.
      Central holographic eye with scanning lines.
      Glitch effect borders with data corruption.
      Cyan and magenta color scheme.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Neon cyan, hot magenta, electric blue, black, chrome silver',
    artisticInfluence: 'Blade Runner, Ghost in the Shell, Syd Mead'
  },

  minimalist_zen: {
    id: 'minimalist_zen',
    name: 'Minimalist Zen',
    description: '極簡禪意風格，日式美學',
    basePrompt: `Elegant minimalist tarot card illustration.
      Clean geometric shapes with generous negative space.
      Subtle ink wash gradients and precise linework.
      Japanese wabi-sabi aesthetic influence.
      Muted color palette with single accent color.
      Thoughtful symbolic representation.
      Zen garden inspired tranquility.
      Premium commercial design quality.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Single thin charcoal gray (#333333) line (1.5px)
      - Corner decorations: None (intentionally minimal)
      - Top: 20px margin of empty space
      - Bottom: Simple horizontal line with card title in clean sans-serif font (10px height)
      - Left/Right borders: 15px empty margin
      - Inner accent: One small red (#C41E3A) circle (enso-inspired) at top-right corner (8px diameter)
      - Background: Off-white (#FAF9F6) with very subtle washi paper texture
      - Color: Charcoal gray, off-white, single red accent
      - Extreme simplicity - NO additional decorations`,
    cardBackPrompt: `Minimalist tarot card back.
      Clean white background with subtle texture.
      Single enso circle in center.
      Thin geometric border in muted gray.
      Balanced asymmetry.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Off-white, charcoal gray, single accent (varies), soft cream',
    artisticInfluence: 'Japanese ink painting, Bauhaus, Apple design'
  },

  // ===== 傳統文化風格 =====

  vintage_botanical: {
    id: 'vintage_botanical',
    name: 'Vintage Botanical',
    description: '復古植物學風格，維多利亞時代插圖',
    basePrompt: `Vintage botanical tarot card illustration.
      Hand-drawn scientific illustration style.
      Aged parchment texture with subtle foxing.
      Delicate watercolor flower and herb elements.
      Sepia and muted earth tone color palette.
      Elegant copperplate engraving details.
      Victorian-era natural history aesthetic.
      Museum specimen collection quality.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Double-line vintage book binding style in sepia (#704214) (outer 2px, inner 1px, 3px gap)
      - Corner decorations: Four identical Victorian flourish ornaments with small leaves (25x25px)
      - Top center: Decorative ribbon banner for card category (optional, 60x15px)
      - Bottom center: Oval Victorian cartouche for card title with botanical vine frame (90x22px)
      - Left/Right borders: Thin pressed flower garland pattern (identical on both sides, 10px wide)
      - Inner border: Aged cream parchment background with subtle foxing spots
      - Small botanical illustration in each corner (same pressed flower species)
      - Color: Sepia (#704214), sage green (#9CAF88), cream (#FFFDD0), dusty rose
      - All Victorian ornaments must be perfectly symmetrical`,
    cardBackPrompt: `Vintage botanical tarot card back.
      Aged paper background with pressed flower pattern.
      Central botanical wreath design.
      Sepia-toned border with corner flourishes.
      Antique book endpaper aesthetic.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Sepia, sage green, dusty rose, cream, antique gold',
    artisticInfluence: 'Ernst Haeckel, Maria Sibylla Merian, Victorian botany'
  },

  watercolor_dreams: {
    id: 'watercolor_dreams',
    name: 'Watercolor Dreams',
    description: '夢幻水彩風格，柔和流動美學',
    basePrompt: `Dreamy watercolor tarot card illustration.
      Soft transparent color washes with beautiful bleeding edges.
      Organic flowing shapes and gentle gradients.
      Ethereal atmosphere with white space breathing room.
      Delicate gold foil accents on key elements.
      Romantic and whimsical mood.
      High-end wedding invitation aesthetic.
      Premium fine art watercolor quality.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Delicate gold foil (#D4AF37) thin line (1.5px) with soft watercolor bleed effect
      - Corner decorations: Four identical soft watercolor wash triangles in blush pink (20x20px)
      - Top center: Gentle curved arc with small gold dots (50x12px)
      - Bottom center: Soft watercolor cloud shape for card title in elegant calligraphy (80x18px)
      - Left/Right borders: Subtle lavender watercolor gradient fading inward (8px wide)
      - Inner border: Soft white vignette effect toward center
      - Tiny gold foil dots scattered at even intervals along border (12 dots per side)
      - Color: Soft blush (#FFB6C1), dusty blue (#6699CC), gold foil, lavender (#E6E6FA)
      - All watercolor effects must appear organic but be symmetrically placed`,
    cardBackPrompt: `Watercolor tarot card back.
      Soft abstract color wash background.
      Central mandala in transparent watercolor layers.
      Delicate gold foil border.
      Dreamy cotton paper texture.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Soft blush, dusty blue, sage, lavender, gold foil',
    artisticInfluence: 'Agnes Cecile, Carne Griffiths, wedding stationery'
  },

  // ===== 獨特創意風格 =====

  stained_glass: {
    id: 'stained_glass',
    name: 'Stained Glass Cathedral',
    description: '教堂彩色玻璃風格，哥特式光線',
    basePrompt: `Magnificent stained glass tarot card illustration.
      Lead came lines defining colorful glass segments.
      Rich jewel-tone colors with luminous backlit effect.
      Gothic cathedral window aesthetic.
      Sacred geometry and religious art influences.
      Dramatic light streaming through colored glass.
      Medieval craftsmanship quality.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Black lead came (#1C1C1C) thick lines (4px) forming pointed gothic arch at top
      - Corner decorations: Four identical gothic trefoil patterns in colored glass (28x28px)
      - Top: Pointed gothic arch with small rose window center (40px height)
      - Bottom: Rectangular stone base with gothic letter placard for title (100x25px)
      - Left/Right borders: Vertical columns of small diamond-shaped glass segments (16px wide)
      - Inner border: Continuous lead came grid pattern
      - Glass colors in border: Alternating sapphire blue (#0F52BA) and ruby red (#E0115F)
      - All lead lines must be uniform 3px width
      - Perfect bilateral symmetry with gothic architectural proportions`,
    cardBackPrompt: `Stained glass tarot card back.
      Rose window design with geometric patterns.
      Deep blue, ruby red, and emerald green glass.
      Black lead lines creating intricate patterns.
      Central sacred symbol.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Sapphire blue, ruby red, emerald green, amber, purple',
    artisticInfluence: 'Chartres Cathedral, Notre-Dame, medieval manuscripts'
  },

  psychedelic_vision: {
    id: 'psychedelic_vision',
    name: 'Psychedelic Vision',
    description: '迷幻視覺風格，60年代反文化美學',
    basePrompt: `Vibrant psychedelic tarot card illustration.
      Kaleidoscopic patterns and optical illusions.
      Intense saturated colors with high contrast.
      Flowing organic forms and fractal elements.
      Third eye and consciousness expansion themes.
      Detailed zentangle and mandala patterns.
      1960s concert poster aesthetic.
      Mind-expanding visual experience.
      Vertical composition 9:16 aspect ratio.`,
    borderDesign: `EXACT BORDER SPECIFICATION (MUST BE IDENTICAL ON ALL CARDS):
      - Outer frame: Thick wavy psychedelic border with flowing organic lines (20px)
      - Corner decorations: Four identical fractal spiral patterns in rainbow gradient (35x35px)
      - Top center: Third eye symbol with radiating rainbow rays (45x30px)
      - Bottom center: Wavy banner with bubble letters for card title (110x25px)
      - Left/Right borders: Continuous paisley/fractal vine pattern (18px wide, mirrored)
      - Inner border: Optical illusion concentric circles in rainbow gradient
      - Color flow: Electric purple (#BF00FF) → hot pink (#FF69B4) → orange (#FF4500) → lime green (#32CD32) → turquoise (#40E0D0)
      - Pattern must create hypnotic effect while maintaining perfect bilateral symmetry
      - All spirals rotate in same direction (clockwise)`,
    cardBackPrompt: `Psychedelic tarot card back.
      Hypnotic spiral pattern from center.
      Rainbow gradient color scheme.
      Fractal border with repeating patterns.
      All-seeing eye at center.
      Vertical 9:16 aspect ratio.`,
    colorPalette: 'Electric purple, hot pink, lime green, orange, turquoise',
    artisticInfluence: 'Alex Grey, Peter Max, 1960s concert posters'
  }
};

export const getStyleById = (id: string): StyleTemplate | undefined => {
  return TAROT_STYLES[id];
};

export const getAllStyleIds = (): string[] => {
  return Object.keys(TAROT_STYLES);
};

export const getStylesInfo = (): Array<{ id: string; name: string; description: string }> => {
  return Object.values(TAROT_STYLES).map(style => ({
    id: style.id,
    name: style.name,
    description: style.description
  }));
};
