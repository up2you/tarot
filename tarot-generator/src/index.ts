#!/usr/bin/env node

/**
 * Tarot Card Image Generator CLI
 * 
 * 使用方式：
 *   npx tarot-gen --style baroque_divine --major-only
 *   npx tarot-gen --style cyberpunk_oracle --full-deck
 *   npx tarot-gen --style art_nouveau_ethereal --cards 0,1,2,3
 *   npx tarot-gen --list-styles
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import cliProgress from 'cli-progress';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

import { TarotGenerator, GenerationOptions, generateReport } from './generator.js';
import { getStylesInfo, getAllStyleIds, getStyleById } from './styles.js';
import { getAllMajorArcana } from './majorArcana.js';
import { getAllMinorArcana } from './minorArcana.js';

// ES Module 的 __dirname 替代方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 載入環境變數
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const program = new Command();

// ASCII Art Banner
const banner = chalk.yellow(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   ████████╗ █████╗ ██████╗  ██████╗ ████████╗                    ║
║   ╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝                    ║
║      ██║   ███████║██████╔╝██║   ██║   ██║                       ║
║      ██║   ██╔══██║██╔══██╗██║   ██║   ██║                       ║
║      ██║   ██║  ██║██║  ██║╚██████╔╝   ██║                       ║
║      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝                       ║
║                                                                   ║
║   ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗    ║
║  ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝    ║
║  ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║       ║
║  ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║       ║
║  ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║       ║
║   ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ║
║                                                                   ║
║           🔮 Commercial-Grade Tarot Card Generator 🔮             ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
`);

program
    .name('tarot-gen')
    .description('Automated Tarot Card Image Generator using AI')
    .version('1.0.0');

// 列出所有可用風格
program
    .command('list-styles')
    .description('List all available tarot art styles')
    .action(() => {
        console.log(banner);
        console.log(chalk.cyan('\n🎨 Available Tarot Art Styles:\n'));

        const styles = getStylesInfo();
        const categories: Record<string, typeof styles> = {
            'Classical Art': styles.filter(s => ['baroque_divine', 'renaissance_mystical'].includes(s.id)),
            'Modern Art': styles.filter(s => ['art_nouveau_ethereal', 'art_deco_luxe'].includes(s.id)),
            'Fantasy': styles.filter(s => ['dark_fantasy', 'celestial_dreams'].includes(s.id)),
            'Digital': styles.filter(s => ['cyberpunk_oracle', 'minimalist_zen'].includes(s.id)),
            'Traditional': styles.filter(s => ['vintage_botanical', 'watercolor_dreams'].includes(s.id)),
            'Creative': styles.filter(s => ['stained_glass', 'psychedelic_vision'].includes(s.id)),
        };

        for (const [category, categoryStyles] of Object.entries(categories)) {
            console.log(chalk.yellow(`\n  ═══ ${category} ═══`));
            for (const style of categoryStyles) {
                console.log(chalk.white(`    • ${chalk.green(style.id)}`));
                console.log(chalk.gray(`      ${style.name}: ${style.description}`));
            }
        }

        console.log(chalk.cyan('\n\n📌 Usage Example:'));
        console.log(chalk.white('   npx tarot-gen generate --style baroque_divine --major-only\n'));
    });

// 列出所有牌
program
    .command('list-cards')
    .description('List all tarot cards with their IDs')
    .option('-m, --major-only', 'Show only Major Arcana')
    .action((options) => {
        console.log(banner);

        console.log(chalk.cyan('\n🃏 Major Arcana (22 cards):\n'));
        const majorCards = getAllMajorArcana();
        for (const card of majorCards) {
            console.log(chalk.white(`    ${chalk.yellow(card.id.toString().padStart(2, '0'))} - ${card.name} (${card.nameZh})`));
        }

        if (!options.majorOnly) {
            console.log(chalk.cyan('\n🃏 Minor Arcana (56 cards):\n'));
            const minorCards = getAllMinorArcana();
            const suits = ['wands', 'cups', 'swords', 'pentacles'];

            for (const suit of suits) {
                const suitCards = minorCards.filter(c => c.suit === suit);
                console.log(chalk.yellow(`\n  ═══ ${suit.charAt(0).toUpperCase() + suit.slice(1)} ═══`));
                for (const card of suitCards) {
                    console.log(chalk.white(`    ${chalk.yellow(card.id.toString().padStart(2, '0'))} - ${card.name} (${card.nameZh})`));
                }
            }
        }
    });

// 生成命令
program
    .command('generate')
    .description('Generate tarot card images')
    .requiredOption('-s, --style <style>', 'Art style ID (use list-styles to see options)')
    .option('-o, --output <dir>', 'Output directory', './output')
    .option('-m, --major-only', 'Generate only Major Arcana (22 cards)')
    .option('-f, --full-deck', 'Generate full 78-card deck')
    .option('-c, --cards <ids>', 'Specific card IDs to generate (comma-separated)', '')
    .option('-b, --with-back', 'Also generate card back design', true)
    .option('--no-back', 'Skip card back generation')
    .option('-r, --rate-limit <ms>', 'Delay between API calls in ms', '2000')
    .option('-k, --api-key <key>', 'Google API Key (or set GOOGLE_API_KEY env)')
    .action(async (options) => {
        console.log(banner);

        // 檢查 API Key
        const apiKey = options.apiKey || process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.error(chalk.red('\n❌ Error: Google API Key is required!'));
            console.log(chalk.yellow('   Set GOOGLE_API_KEY environment variable or use --api-key option'));
            console.log(chalk.gray('   Get your API key from: https://aistudio.google.com/apikey\n'));
            process.exit(1);
        }

        // 驗證風格
        const style = getStyleById(options.style);
        if (!style) {
            console.error(chalk.red(`\n❌ Error: Style "${options.style}" not found!`));
            console.log(chalk.yellow('   Use "tarot-gen list-styles" to see available styles\n'));
            process.exit(1);
        }

        // 解析選項
        const cardIds = options.cards
            ? options.cards.split(',').map((id: string) => parseInt(id.trim()))
            : undefined;

        const includeMinor = options.fullDeck || (!options.majorOnly && cardIds?.some((id: number) => id >= 22));

        const genOptions: GenerationOptions = {
            style: options.style,
            outputDir: path.resolve(options.output),
            rateLimitMs: parseInt(options.rateLimit),
            includeMinor: options.fullDeck || false,
            cardIds: cardIds,
            generateBack: options.withBack !== false,
        };

        // 計算總數
        let totalCards = 0;
        if (cardIds && cardIds.length > 0) {
            totalCards = cardIds.length;
        } else if (genOptions.includeMinor) {
            totalCards = 78;
        } else {
            totalCards = 22;
        }
        if (genOptions.generateBack) totalCards++;

        console.log(chalk.cyan('\n📋 Generation Configuration:'));
        console.log(chalk.white(`   Style:        ${chalk.green(style.name)} (${style.id})`));
        console.log(chalk.white(`   Cards:        ${chalk.green(totalCards)} cards`));
        console.log(chalk.white(`   Output:       ${chalk.green(genOptions.outputDir)}`));
        console.log(chalk.white(`   Rate Limit:   ${chalk.green(genOptions.rateLimitMs + 'ms')}`));
        console.log(chalk.white(`   Card Back:    ${chalk.green(genOptions.generateBack ? 'Yes' : 'No')}`));

        // 確認目錄
        const styleDir = path.join(genOptions.outputDir, genOptions.style);
        if (!fs.existsSync(styleDir)) {
            fs.mkdirSync(styleDir, { recursive: true });
        }

        console.log(chalk.cyan('\n🚀 Starting generation...\n'));

        // 進度條
        const progressBar = new cliProgress.SingleBar({
            format: chalk.cyan('Progress') + ' |' + chalk.cyan('{bar}') + '| {percentage}% | {value}/{total} Cards | {cardName}',
            barCompleteChar: '█',
            barIncompleteChar: '░',
            hideCursor: true,
        });

        progressBar.start(totalCards, 0, { cardName: 'Starting...' });

        // 開始生成
        const generator = new TarotGenerator(apiKey);

        try {
            const results = await generator.generateDeck(genOptions, (result, current, total) => {
                const status = result.success ? chalk.green('✓') : chalk.red('✗');
                progressBar.update(current, {
                    cardName: `${status} ${result.cardName.substring(0, 20).padEnd(20)}`
                });
            });

            progressBar.stop();

            // 輸出報告
            console.log(generateReport(results));

            const successful = results.filter(r => r.success).length;
            if (successful > 0) {
                console.log(chalk.green(`\n✨ Generated ${successful} images in: ${styleDir}\n`));
            }

        } catch (error: any) {
            progressBar.stop();
            console.error(chalk.red(`\n❌ Generation failed: ${error.message}\n`));
            process.exit(1);
        }
    });

// 批量生成多風格
program
    .command('batch')
    .description('Generate cards in multiple styles (uses daily quota efficiently)')
    .option('-s, --styles <styles>', 'Comma-separated style IDs (default: all)', '')
    .option('-o, --output <dir>', 'Output directory', './output')
    .option('-q, --quota <n>', 'Daily image quota limit', '1000')
    .option('-m, --major-only', 'Generate only Major Arcana per style', true)
    .option('--no-back', 'Skip card back generation')
    .option('-k, --api-key <key>', 'Google API Key')
    .action(async (options) => {
        console.log(banner);

        const apiKey = options.apiKey || process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.error(chalk.red('\n❌ Error: Google API Key is required!\n'));
            process.exit(1);
        }

        const quota = parseInt(options.quota);
        const allStyles = getAllStyleIds();
        const selectedStyles = options.styles
            ? options.styles.split(',').map((s: string) => s.trim())
            : allStyles;

        // 驗證風格
        for (const styleId of selectedStyles) {
            if (!getStyleById(styleId)) {
                console.error(chalk.red(`\n❌ Unknown style: ${styleId}\n`));
                process.exit(1);
            }
        }

        const cardsPerStyle = options.majorOnly ? 23 : 79; // +1 for back
        const maxStyles = Math.floor(quota / cardsPerStyle);
        const stylesToGenerate = selectedStyles.slice(0, maxStyles);

        console.log(chalk.cyan('\n📊 Batch Generation Plan:'));
        console.log(chalk.white(`   Daily Quota:     ${chalk.green(quota)} images`));
        console.log(chalk.white(`   Cards per Style: ${chalk.green(cardsPerStyle)}`));
        console.log(chalk.white(`   Styles to Run:   ${chalk.green(stylesToGenerate.length)}`));
        console.log(chalk.white(`   Total Images:    ${chalk.green(stylesToGenerate.length * cardsPerStyle)}`));
        console.log(chalk.white(`\n   Styles: ${chalk.yellow(stylesToGenerate.join(', '))}`));

        console.log(chalk.cyan('\n🚀 Starting batch generation...\n'));

        const generator = new TarotGenerator(apiKey);
        let totalGenerated = 0;
        let totalFailed = 0;

        for (let i = 0; i < stylesToGenerate.length; i++) {
            const styleId = stylesToGenerate[i];
            const style = getStyleById(styleId)!;

            console.log(chalk.yellow(`\n═══ [${i + 1}/${stylesToGenerate.length}] ${style.name} ═══\n`));

            const progressBar = new cliProgress.SingleBar({
                format: chalk.cyan('{bar}') + ' | {percentage}% | {value}/{total} | {cardName}',
                barCompleteChar: '█',
                barIncompleteChar: '░',
            });

            progressBar.start(cardsPerStyle, 0, { cardName: 'Starting...' });

            try {
                const results = await generator.generateDeck({
                    style: styleId,
                    outputDir: path.resolve(options.output),
                    rateLimitMs: 2000,
                    includeMinor: !options.majorOnly,
                    generateBack: options.back !== false,
                }, (result, current, total) => {
                    progressBar.update(current, { cardName: result.cardName.substring(0, 25) });
                });

                progressBar.stop();

                const successful = results.filter(r => r.success).length;
                const failed = results.filter(r => !r.success).length;
                totalGenerated += successful;
                totalFailed += failed;

                console.log(chalk.green(`   ✓ Completed: ${successful} images generated`));
                if (failed > 0) {
                    console.log(chalk.red(`   ✗ Failed: ${failed} images`));
                }

            } catch (error: any) {
                progressBar.stop();
                console.error(chalk.red(`   ✗ Style failed: ${error.message}`));
            }
        }

        console.log(chalk.cyan('\n' + '═'.repeat(60)));
        console.log(chalk.green(`\n✨ Batch Complete!`));
        console.log(chalk.white(`   Total Generated: ${chalk.green(totalGenerated)}`));
        console.log(chalk.white(`   Total Failed:    ${chalk.red(totalFailed)}`));
        console.log(chalk.white(`   Output:          ${chalk.green(path.resolve(options.output))}\n`));
    });

// 預覽 prompt
program
    .command('preview')
    .description('Preview the generation prompt for a specific card')
    .requiredOption('-s, --style <style>', 'Art style ID')
    .requiredOption('-c, --card <id>', 'Card ID (0-77)', '0')
    .action((options) => {
        const style = getStyleById(options.style);
        if (!style) {
            console.error(chalk.red(`\n❌ Style "${options.style}" not found!\n`));
            process.exit(1);
        }

        const cardId = parseInt(options.card);
        const majorCards = getAllMajorArcana();
        const minorCards = getAllMinorArcana();
        const card = majorCards.find(c => c.id === cardId) || minorCards.find(c => c.id === cardId);

        if (!card) {
            console.error(chalk.red(`\n❌ Card ID ${cardId} not found!\n`));
            process.exit(1);
        }

        console.log(chalk.cyan('\n═══ PROMPT PREVIEW ═══\n'));
        console.log(chalk.yellow(`Style: ${style.name}`));
        console.log(chalk.yellow(`Card:  ${card.name} (${card.nameZh})`));
        console.log(chalk.gray('─'.repeat(60)));

        const prompt = `${style.basePrompt}

CARD DETAILS:
Title: "${card.name}" (${card.nameZh})
Keywords: ${card.keywords.join(', ')}

VISUAL COMPOSITION:
${card.visualElements}

ARTISTIC MOOD:
${card.mood}

COLOR PALETTE: ${style.colorPalette}`;

        console.log(chalk.white(prompt));
        console.log(chalk.gray('─'.repeat(60) + '\n'));
    });

// 匯出 prompts 到 markdown (給 gemini.google.com 手動使用)
program
    .command('export-prompts')
    .description('Export all prompts to markdown file for manual use on gemini.google.com')
    .requiredOption('-s, --style <style>', 'Art style ID')
    .option('-o, --output <file>', 'Output markdown file', './prompts.md')
    .option('-m, --major-only', 'Export only Major Arcana prompts')
    .option('--include-back', 'Include card back prompt', true)
    .option('-b, --borderless', 'Generate borderless prompts (for Photoshop compositing)')
    .option('-u, --unified', 'Generate unified prompts with [BORDER LOCK] format (recommended)')
    .action((options) => {
        console.log(banner);

        const style = getStyleById(options.style);
        if (!style) {
            console.error(chalk.red(`\n❌ Style "${options.style}" not found!\n`));
            process.exit(1);
        }

        const majorCards = getAllMajorArcana();
        const minorCards = getAllMinorArcana();
        const cards = options.majorOnly ? majorCards : [...majorCards, ...minorCards];
        const isBorderless = options.borderless;
        const isUnified = options.unified;

        // Determine mode label
        let modeLabel = '含邊框';
        if (isBorderless) modeLabel = '🖼️ 無邊框 (Photoshop合成用)';
        if (isUnified) modeLabel = '🔒 統一邊框 [BORDER LOCK] (推薦)';

        let markdown = `# 🔮 Tarot Card Prompts - ${style.name}${isBorderless ? ' (無邊框版)' : isUnified ? ' [BORDER LOCK]' : ''}\n\n`;
        markdown += `> 這些 prompts 可直接複製貼到 [gemini.google.com](https://gemini.google.com/app) 使用\n\n`;
        markdown += `**風格**: ${style.name}\n`;
        markdown += `**描述**: ${style.description}\n`;
        markdown += `**牌數**: ${cards.length} 張${options.includeBack ? ' + 牌背' : ''}\n`;
        markdown += `**模式**: ${modeLabel}\n`;
        markdown += `\n---\n\n`;

        // Card back prompt (only if not borderless and not unified)
        if (options.includeBack && !isBorderless && !isUnified) {
            markdown += `## 🎴 Card Back (牌背)\n\n`;
            markdown += `\`\`\`\n`;
            markdown += `${style.cardBackPrompt}\n\n`;
            markdown += `STYLE: ${style.name}\n`;
            markdown += `COLOR PALETTE: ${style.colorPalette}\n`;
            markdown += `ARTISTIC INFLUENCE: ${style.artisticInfluence}\n\n`;
            markdown += `REQUIREMENTS:\n`;
            markdown += `- Perfectly symmetrical design\n`;
            markdown += `- Rich, detailed pattern work\n`;
            markdown += `- Commercial quality, print-ready\n`;
            markdown += `- Vertical 9:16 aspect ratio\n`;
            markdown += `- Looks premium and mysterious\n`;
            markdown += `\`\`\`\n\n`;
            markdown += `---\n\n`;
        }

        // Major Arcana
        markdown += `## 📜 Major Arcana (大阿爾克那)\n\n`;
        for (const card of majorCards) {
            const prompt = isUnified
                ? buildUnifiedPrompt(style, card)
                : isBorderless
                    ? buildBorderlessPrompt(style, card)
                    : buildExportPrompt(style, card);
            markdown += `### ${card.id.toString().padStart(2, '0')} - ${card.name} (${card.nameZh})\n\n`;
            markdown += `\`\`\`\n${prompt}\n\`\`\`\n\n`;
        }

        // Minor Arcana
        if (!options.majorOnly) {
            markdown += `---\n\n`;
            markdown += `## 🃏 Minor Arcana (小阿爾克那)\n\n`;

            const suits = ['wands', 'cups', 'swords', 'pentacles'];
            const suitNames: Record<string, string> = {
                wands: '權杖 Wands',
                cups: '聖杯 Cups',
                swords: '寶劍 Swords',
                pentacles: '錢幣 Pentacles'
            };

            for (const suit of suits) {
                const suitCards = minorCards.filter(c => c.suit === suit);
                markdown += `### ${suitNames[suit]}\n\n`;

                for (const card of suitCards) {
                    const prompt = isUnified
                        ? buildUnifiedPrompt(style, card)
                        : isBorderless
                            ? buildBorderlessPrompt(style, card)
                            : buildExportPrompt(style, card);
                    markdown += `#### ${card.id} - ${card.name} (${card.nameZh})\n\n`;
                    markdown += `\`\`\`\n${prompt}\n\`\`\`\n\n`;
                }
            }
        }

        // Write file
        const outputPath = path.resolve(options.output);
        fs.writeFileSync(outputPath, markdown, 'utf-8');

        console.log(chalk.green(`\n✨ Prompts exported successfully!`));
        console.log(chalk.white(`   Style:  ${chalk.yellow(style.name)}`));
        console.log(chalk.white(`   Mode:   ${isUnified ? chalk.green('🔒 統一邊框 [BORDER LOCK]') : isBorderless ? chalk.magenta('無邊框 (Photoshop合成用)') : chalk.cyan('含邊框')}`));
        console.log(chalk.white(`   Cards:  ${chalk.yellow(cards.length)} prompts`));
        console.log(chalk.white(`   Output: ${chalk.cyan(outputPath)}\n`));

        if (isUnified) {
            console.log(chalk.gray(`🔒 使用 [BORDER LOCK] 格式，邊框將保持一致！\n`));
        } else if (isBorderless) {
            console.log(chalk.gray(`💡 提示: 使用 export-frame 命令生成邊框模板\n`));
        } else {
            console.log(chalk.gray(`📋 打開檔案後複製 prompt 到 gemini.google.com 即可生成圖片！\n`));
        }
    });

// 匯出純邊框模板 (給 Photoshop 合成使用)
program
    .command('export-frame')
    .description('Export frame-only template prompt for Photoshop compositing')
    .requiredOption('-s, --style <style>', 'Art style ID')
    .option('-o, --output <file>', 'Output markdown file', './frame-template.md')
    .action((options) => {
        console.log(banner);

        const style = getStyleById(options.style);
        if (!style) {
            console.error(chalk.red(`\n❌ Style "${options.style}" not found!\n`));
            process.exit(1);
        }

        const framePrompt = buildFrameOnlyPrompt(style);

        let markdown = `# 🖼️ Frame Template - ${style.name}\n\n`;
        markdown += `> 純邊框模板，中間留空供Photoshop合成用\n\n`;
        markdown += `**風格**: ${style.name}\n`;
        markdown += `**用途**: 與無邊框牌面合成\n\n`;
        markdown += `---\n\n`;
        markdown += `## 邊框模板 Prompt\n\n`;
        markdown += `\`\`\`\n${framePrompt}\n\`\`\`\n\n`;
        markdown += `---\n\n`;
        markdown += `## 📋 Photoshop 合成步驟\n\n`;
        markdown += `1. 生成此邊框模板圖片\n`;
        markdown += `2. 使用魔術棒工具選取中間白色區域並刪除（變透明）\n`;
        markdown += `3. 將無邊框牌面圖片放到下層\n`;
        markdown += `4. 調整大小使其符合邊框內區域\n`;
        markdown += `5. 導出為PNG保持透明度\n`;

        const outputPath = path.resolve(options.output);
        fs.writeFileSync(outputPath, markdown, 'utf-8');

        console.log(chalk.green(`\n✨ Frame template exported!`));
        console.log(chalk.white(`   Style:  ${chalk.yellow(style.name)}`));
        console.log(chalk.white(`   Output: ${chalk.cyan(outputPath)}\n`));
        console.log(chalk.gray(`🖼️ 生成一次邊框模板，然後與所有無邊框牌面合成！\n`));
    });

// 匯出每張牌的獨立邊框（含牌名）- 給 Photoshop 合成使用
program
    .command('export-frames')
    .description('Export individual frame prompts WITH card names for each card')
    .requiredOption('-s, --style <style>', 'Art style ID')
    .option('-o, --output <file>', 'Output markdown file', './frames-with-names.md')
    .option('-m, --major-only', 'Export only Major Arcana frames')
    .action((options) => {
        console.log(banner);

        const style = getStyleById(options.style);
        if (!style) {
            console.error(chalk.red(`\n❌ Style "${options.style}" not found!\n`));
            process.exit(1);
        }

        const majorCards = getAllMajorArcana();
        const minorCards = getAllMinorArcana();
        const cards = options.majorOnly ? majorCards : [...majorCards, ...minorCards];

        let markdown = `# 🖼️ Frame Templates with Card Names - ${style.name}\n\n`;
        markdown += `> 每張牌的獨立邊框模板（含牌名），中間留空供Photoshop合成\n\n`;
        markdown += `**風格**: ${style.name}\n`;
        markdown += `**數量**: ${cards.length} 張邊框\n`;
        markdown += `**用途**: 與無邊框牌面合成，邊框已包含牌名\n\n`;
        markdown += `---\n\n`;

        // Major Arcana frames
        markdown += `## 📜 Major Arcana Frames (大阿爾克那邊框)\n\n`;
        for (const card of majorCards) {
            const framePrompt = buildFrameWithNamePrompt(style, card);
            markdown += `### ${card.id.toString().padStart(2, '0')} - ${card.name} (${card.nameZh})\n\n`;
            markdown += `\`\`\`\n${framePrompt}\n\`\`\`\n\n`;
        }

        // Minor Arcana frames
        if (!options.majorOnly) {
            markdown += `---\n\n`;
            markdown += `## 🃏 Minor Arcana Frames (小阿爾克那邊框)\n\n`;

            const suits = ['wands', 'cups', 'swords', 'pentacles'];
            const suitNames: Record<string, string> = {
                wands: '權杖 Wands',
                cups: '聖杯 Cups',
                swords: '寶劍 Swords',
                pentacles: '錢幣 Pentacles'
            };

            for (const suit of suits) {
                const suitCards = minorCards.filter(c => c.suit === suit);
                markdown += `### ${suitNames[suit]}\n\n`;

                for (const card of suitCards) {
                    const framePrompt = buildFrameWithNamePrompt(style, card);
                    markdown += `#### ${card.id} - ${card.name} (${card.nameZh})\n\n`;
                    markdown += `\`\`\`\n${framePrompt}\n\`\`\`\n\n`;
                }
            }
        }

        markdown += `---\n\n`;
        markdown += `## 📋 Photoshop 合成步驟\n\n`;
        markdown += `1. 為每張牌生成對應的邊框圖片（含牌名）\n`;
        markdown += `2. 使用魔術棒工具選取中間白色區域並刪除（變透明）\n`;
        markdown += `3. 將對應的無邊框牌面圖片放到下層\n`;
        markdown += `4. 導出為PNG保持透明度\n`;

        const outputPath = path.resolve(options.output);
        fs.writeFileSync(outputPath, markdown, 'utf-8');

        console.log(chalk.green(`\n✨ Frame templates with names exported!`));
        console.log(chalk.white(`   Style:  ${chalk.yellow(style.name)}`));
        console.log(chalk.white(`   Frames: ${chalk.yellow(cards.length)} 張（每張含牌名）`));
        console.log(chalk.white(`   Output: ${chalk.cyan(outputPath)}\n`));
        console.log(chalk.gray(`🖼️ 每張邊框都包含牌名，與無邊框牌面合成即可！\n`));
    });

// Helper function to build card prompt for export
function buildExportPrompt(style: ReturnType<typeof getStyleById>, card: any): string {
    if (!style) return '';
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

// Helper function to build BORDERLESS prompt for Photoshop compositing
// Card names are intentionally REMOVED - will be added in Photoshop during compositing
function buildBorderlessPrompt(style: ReturnType<typeof getStyleById>, card: any): string {
    if (!style) return '';

    return `BORDERLESS TAROT CARD ILLUSTRATION - NO FRAME, NO TEXT

${style.basePrompt}

CRITICAL: This is for Photoshop compositing - generate ONLY the illustration with NO border, frame, or text.

VISUAL COMPOSITION:
${card.visualElements}

ARTISTIC MOOD:
${card.mood}

COLOR PALETTE:
${style.colorPalette}

ABSOLUTELY CRITICAL REQUIREMENTS:
- DO NOT add ANY border, frame, or decorative edge
- DO NOT include ANY text, titles, or card names
- The illustration must extend to ALL EDGES of the image
- Pure artwork only - edge to edge illustration
- NO ornamental frame, NO gilded border, NO decorative corners
- NO title plate, NO name label, NO text of any kind
- High resolution, commercial quality illustration
- Vertical 9:16 aspect ratio
- This will be composited with a separate frame and text layer in Photoshop`;
}

// Helper function to build FRAME-ONLY prompt for Photoshop compositing
function buildFrameOnlyPrompt(style: ReturnType<typeof getStyleById>): string {
    if (!style) return '';

    return `FULL-BLEED DECORATIVE FRAME TEMPLATE - ${style.name}

Create a decorative picture frame that FILLS THE ENTIRE IMAGE CANVAS.

CRITICAL LAYOUT REQUIREMENTS:
- The frame's OUTER EDGE must touch ALL FOUR SIDES of the image - NO background visible
- NO margin, NO background, NO base layer outside the frame
- The frame itself IS the entire image - there is nothing behind it
- The CENTER area must be COMPLETELY WHITE/BLANK for content overlay

${style.borderDesign}

COLOR PALETTE FOR FRAME:
${style.colorPalette}

FRAME STRUCTURE (from outside to inside):
1. OUTER EDGE: Decorative border elements at the VERY EDGE of the canvas (no gap, no margin)
2. MAIN FRAME: Ornate ${style.name} style decorative border
3. INNER EDGE: Transition to the empty center area
4. CENTER: Pure WHITE empty rectangle (approximately 70% of image) for card content

ABSOLUTELY CRITICAL - DO NOT VIOLATE:
- The decorative frame border MUST START AT THE VERY EDGE of the image
- There must be NO visible background or base layer OUTSIDE the frame
- The frame elements should TOUCH the image boundaries on all sides
- NO floating frame on a background - the frame IS the entire image
- Center must be solid WHITE for Photoshop transparency selection
- Vertical 9:16 aspect ratio
- Perfectly symmetrical left-to-right
- All four corner decorations must be IDENTICAL
- Include a title plate/cartouche at bottom center for card name`;
}


// Helper function to build FRAME with CARD NAME prompt for Photoshop compositing
function buildFrameWithNamePrompt(style: ReturnType<typeof getStyleById>, card: any): string {
    if (!style) return '';

    return `DECORATIVE FRAME WITH CARD NAME - "${card.name}"

Create a decorative picture frame template for tarot card: "${card.name}" (${card.nameZh})

CRITICAL: The CENTER must be COMPLETELY EMPTY (solid white or light gray) for the card illustration to be placed behind it later.

${style.borderDesign}

CARD NAME SPECIFICATION:
- The card name "${card.name}" MUST be clearly displayed in the bottom title plate/cartouche
- Use elegant, decorative typography matching the ${style.name} style
- The name should be prominent and readable
- Chinese name "${card.nameZh}" can optionally appear smaller below the English name

STYLE REFERENCE:
${style.basePrompt}

COLOR PALETTE:
${style.colorPalette}

FRAME SPECIFICATIONS:
- The frame should match the ${style.name} style exactly
- Ornate decorative border around all four edges
- Leave a BLANK/EMPTY rectangular space in the center (approximately 70-80% of the image area)
- The center area should be plain WHITE or LIGHT GRAY (no patterns, no artwork)
- The title plate at bottom center MUST display: "${card.name}"
- Vertical 9:16 aspect ratio

ABSOLUTELY CRITICAL REQUIREMENTS:
- The card name "${card.name}" MUST appear in the title plate at the bottom
- The CENTER MUST BE EMPTY/BLANK for compositing
- Only the BORDER/FRAME and TITLE should be rendered with detail
- This template will be placed OVER card illustrations in Photoshop
- High resolution, commercial quality
- Perfectly symmetrical left-to-right (except for the title text)
- All four corner decorations must be IDENTICAL`;
}

// Helper function to build UNIFIED prompt with [BORDER LOCK] format
// This format was designed to maintain consistent borders across all cards
function buildUnifiedPrompt(style: ReturnType<typeof getStyleById>, card: any): string {
    if (!style) return '';

    return `Masterpiece tarot card illustration in High Baroque "${style.name}" style.
Caravaggio-style chiaroscuro, museum-quality oil painting texture.
Vertical 9:16 portrait composition.

[BORDER LOCK]
${style.borderDesign}

[NEGATIVE]
- Different border styles between cards
- Inconsistent corner decorations
- Asymmetrical frame elements
- Missing or malformed title plate
- Border elements bleeding into scene area

TITLE:
${card.name}

SCENE (INSIDE INNER WINDOW ONLY):
${card.visualElements}
Mood: ${card.mood.toLowerCase()}.
Palette emphasis: ${style.colorPalette.toLowerCase()}.

CRITICAL COMPOSITION RULES:
- The BORDER/FRAME must match [BORDER LOCK] specification EXACTLY
- The SCENE content must stay INSIDE the inner window area
- Title "${card.name}" must appear in the cartouche/title plate at bottom
- Chinese name "${card.nameZh}" may appear smaller below English name
- All decorative border elements must be IDENTICAL to other cards in this deck
- Frame ornaments must be perfectly symmetrical left-to-right`;
}

program.parse();


