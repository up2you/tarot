/**
 * 核心圖片生成器
 * 使用 Google Imagen 3 API 生成高品質塔羅牌圖片
 */

import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';
import { StyleTemplate, getStyleById } from './styles.js';
import { MajorArcanaCard, getMajorArcanaById, getAllMajorArcana } from './majorArcana.js';
import { MinorArcanaCard, getMinorArcanaById, getAllMinorArcana } from './minorArcana.js';

export interface GenerationOptions {
    style: string;
    outputDir: string;
    rateLimitMs: number;
    includeMinor: boolean;
    cardIds?: number[];
    generateBack: boolean;
}

export interface GenerationResult {
    success: boolean;
    cardId: number;
    cardName: string;
    style: string;
    outputPath?: string;
    error?: string;
}

export class TarotGenerator {
    private ai: GoogleGenAI;
    private model = 'gemini-2.0-flash-exp'; // 或使用 imagen-3.0-generate-002

    constructor(apiKey: string) {
        this.ai = new GoogleGenAI({ apiKey });
    }

    /**
     * 構建完整的圖片生成 prompt
     */
    buildPrompt(style: StyleTemplate, card: MajorArcanaCard | MinorArcanaCard): string {
        const cardType = card.id < 22 ? 'Major Arcana' : 'Minor Arcana';
        const cardNumber = card.id < 22 ? `Card ${card.id}` : '';

        return `${style.basePrompt}

${style.borderDesign}

CARD DETAILS:
Title: "${card.name}" (${card.nameZh})
Type: ${cardType} ${cardNumber}
Keywords: ${card.keywords.join(', ')}

VISUAL COMPOSITION:
${card.visualElements}

ARTISTIC MOOD:
${card.mood}

COLOR PALETTE EMPHASIS:
${style.colorPalette}

CRITICAL REQUIREMENTS:
- The card title "${card.name}" should be elegantly displayed at the bottom in decorative typography
- THE BORDER DESIGN MUST BE EXACTLY AS SPECIFIED ABOVE - IDENTICAL ON EVERY CARD IN THIS DECK
- Maintain consistent ${style.name} artistic style throughout
- High resolution, commercial quality illustration
- Vertical portrait orientation (9:16 aspect ratio)
- Professional tarot deck worthy quality
- SYMMETRICAL BORDER IS MANDATORY`;
    }

    /**
     * 構建牌背 prompt
     */
    buildBackPrompt(style: StyleTemplate): string {
        return `${style.cardBackPrompt}

STYLE: ${style.name}
COLOR PALETTE: ${style.colorPalette}
ARTISTIC INFLUENCE: ${style.artisticInfluence}

REQUIREMENTS:
- Perfectly symmetrical design
- Rich, detailed pattern work
- Commercial quality, print-ready
- Vertical 9:16 aspect ratio
- Looks premium and mysterious`;
    }

    /**
     * 生成單張塔羅牌圖片
     */
    async generateCard(
        style: StyleTemplate,
        card: MajorArcanaCard | MinorArcanaCard,
        outputDir: string
    ): Promise<GenerationResult> {
        const prompt = this.buildPrompt(style, card);
        const fileName = `${card.id.toString().padStart(2, '0')}_${card.name.replace(/\s+/g, '_').toLowerCase()}.png`;
        const styleDir = path.join(outputDir, style.id);
        const outputPath = path.join(styleDir, fileName);

        // 確保目錄存在
        if (!fs.existsSync(styleDir)) {
            fs.mkdirSync(styleDir, { recursive: true });
        }

        try {
            // 使用 Gemini 生成圖片
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: [{ parts: [{ text: prompt }] }],
                config: {
                    responseModalities: ['image', 'text'],
                } as any,
            });

            // 提取圖片數據
            const imagePart = response.candidates?.[0]?.content?.parts?.find(
                (p: any) => p.inlineData?.mimeType?.startsWith('image/')
            );

            if (imagePart?.inlineData?.data) {
                const imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
                fs.writeFileSync(outputPath, imageBuffer);

                return {
                    success: true,
                    cardId: card.id,
                    cardName: card.name,
                    style: style.id,
                    outputPath,
                };
            } else {
                throw new Error('No image data in response');
            }
        } catch (error: any) {
            return {
                success: false,
                cardId: card.id,
                cardName: card.name,
                style: style.id,
                error: error.message || 'Unknown error',
            };
        }
    }

    /**
     * 生成牌背圖片
     */
    async generateBack(style: StyleTemplate, outputDir: string): Promise<GenerationResult> {
        const prompt = this.buildBackPrompt(style);
        const fileName = 'back.png';
        const styleDir = path.join(outputDir, style.id);
        const outputPath = path.join(styleDir, fileName);

        if (!fs.existsSync(styleDir)) {
            fs.mkdirSync(styleDir, { recursive: true });
        }

        try {
            const response = await this.ai.models.generateContent({
                model: this.model,
                contents: [{ parts: [{ text: prompt }] }],
                config: {
                    responseModalities: ['image', 'text'],
                } as any,
            });

            const imagePart = response.candidates?.[0]?.content?.parts?.find(
                (p: any) => p.inlineData?.mimeType?.startsWith('image/')
            );

            if (imagePart?.inlineData?.data) {
                const imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
                fs.writeFileSync(outputPath, imageBuffer);

                return {
                    success: true,
                    cardId: -1,
                    cardName: 'Card Back',
                    style: style.id,
                    outputPath,
                };
            } else {
                throw new Error('No image data in response');
            }
        } catch (error: any) {
            return {
                success: false,
                cardId: -1,
                cardName: 'Card Back',
                style: style.id,
                error: error.message || 'Unknown error',
            };
        }
    }

    /**
     * 批量生成整套牌組
     */
    async generateDeck(
        options: GenerationOptions,
        onProgress?: (result: GenerationResult, current: number, total: number) => void
    ): Promise<GenerationResult[]> {
        const style = getStyleById(options.style);
        if (!style) {
            throw new Error(`Style "${options.style}" not found`);
        }

        const results: GenerationResult[] = [];
        const cards: Array<MajorArcanaCard | MinorArcanaCard> = [];

        // 收集要生成的牌
        if (options.cardIds && options.cardIds.length > 0) {
            for (const id of options.cardIds) {
                const majorCard = getMajorArcanaById(id);
                const minorCard = getMinorArcanaById(id);
                if (majorCard) cards.push(majorCard);
                else if (minorCard) cards.push(minorCard);
            }
        } else {
            cards.push(...getAllMajorArcana());
            if (options.includeMinor) {
                cards.push(...getAllMinorArcana());
            }
        }

        const total = cards.length + (options.generateBack ? 1 : 0);
        let current = 0;

        // 生成牌背
        if (options.generateBack) {
            current++;
            const backResult = await this.generateBack(style, options.outputDir);
            results.push(backResult);
            onProgress?.(backResult, current, total);
            await this.delay(options.rateLimitMs);
        }

        // 生成每張牌
        for (const card of cards) {
            current++;
            const result = await this.generateCard(style, card, options.outputDir);
            results.push(result);
            onProgress?.(result, current, total);

            // Rate limiting
            if (current < total) {
                await this.delay(options.rateLimitMs);
            }
        }

        return results;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * 生成統計報告
 */
export function generateReport(results: GenerationResult[]): string {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    let report = `
╔══════════════════════════════════════════════════════════════╗
║                 TAROT GENERATION REPORT                       ║
╠══════════════════════════════════════════════════════════════╣
║  Total Cards:     ${results.length.toString().padStart(4)}                                       ║
║  Successful:      ${successful.length.toString().padStart(4)}  ✓                                    ║
║  Failed:          ${failed.length.toString().padStart(4)}  ✗                                    ║
╚══════════════════════════════════════════════════════════════╝
`;

    if (failed.length > 0) {
        report += '\n⚠️  FAILED GENERATIONS:\n';
        for (const f of failed) {
            report += `   • ${f.cardName}: ${f.error}\n`;
        }
    }

    if (successful.length > 0) {
        report += '\n✅ GENERATED FILES:\n';
        for (const s of successful) {
            report += `   • ${s.cardName} → ${s.outputPath}\n`;
        }
    }

    return report;
}
