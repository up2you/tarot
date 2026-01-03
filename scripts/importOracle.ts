/**
 * Import Oracle Data to Supabase
 * 將生成的神諭資料匯入 Supabase
 * 
 * 使用方式：
 * 1. 確保已執行 generateOracle.ts 生成 interpretations.json
 * 2. 執行 npx ts-node scripts/importOracle.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// ============================================
// 配置 (ESM 兼容)
// ============================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase 配置 - 請替換為您的 Service Role Key
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://pcwmbhbqzmndqwmgvevq.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_nv7SWOuM50i3Jf3HVPtdyA_i-PBC9On';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const DATA_DIR = path.join(__dirname, '../data/oracle');
const BATCH_SIZE = 100; // 每批插入數量

// ============================================
// 匯入邏輯
// ============================================

interface OracleItem {
    card_id: number;
    card_name: string;
    orientation: string;
    scenario_key: string;
    position_key: string;
    interpretation: string;
}

async function importInterpretations(): Promise<void> {
    console.log('📥 開始匯入神諭資料到 Supabase...\n');

    const inputFile = path.join(DATA_DIR, 'interpretations.json');

    if (!fs.existsSync(inputFile)) {
        console.error('❌ 找不到 interpretations.json，請先執行 generateOracle.ts');
        return;
    }

    const data: OracleItem[] = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    console.log(`📊 載入 ${data.length} 條資料\n`);

    let inserted = 0;
    let errors = 0;

    // 分批插入
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);

        try {
            const { error } = await supabase
                .from('oracle_interpretations')
                .upsert(
                    batch.map(item => ({
                        card_id: item.card_id,
                        card_name: item.card_name,
                        orientation: item.orientation,
                        scenario_key: item.scenario_key,
                        position_key: item.position_key,
                        interpretation: item.interpretation,
                    })),
                    { onConflict: 'card_id,orientation,scenario_key,position_key' }
                );

            if (error) {
                throw error;
            }

            inserted += batch.length;
            const percent = ((i + batch.length) / data.length * 100).toFixed(1);
            console.log(`✅ 已匯入 ${inserted}/${data.length} (${percent}%)`);

        } catch (err) {
            errors += batch.length;
            console.error(`❌ 批次錯誤 [${i}-${i + batch.length}]:`, err);
        }
    }

    console.log('\n🎉 匯入完成！');
    console.log(`✅ 成功：${inserted} 條`);
    console.log(`❌ 錯誤：${errors} 條`);
}

// ============================================
// 驗證匯入結果
// ============================================

async function verifyImport(): Promise<void> {
    console.log('\n🔍 驗證匯入結果...\n');

    // 計算總數
    const { count, error } = await supabase
        .from('oracle_interpretations')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('❌ 查詢失敗:', error);
        return;
    }

    console.log(`📊 資料庫中共 ${count} 條神諭解釋`);

    // 抽樣檢查
    const { data: samples } = await supabase
        .from('oracle_interpretations')
        .select('*')
        .limit(5);

    if (samples && samples.length > 0) {
        console.log('\n📋 抽樣資料：');
        samples.forEach((s, i) => {
            console.log(`\n${i + 1}. ${s.card_name} (${s.orientation}) - ${s.scenario_key} - ${s.position_key}`);
            console.log(`   ${s.interpretation.substring(0, 80)}...`);
        });
    }
}

// ============================================
// 主函數
// ============================================

async function main() {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        console.error('❌ 請設定環境變數 VITE_SUPABASE_URL 和 VITE_SUPABASE_SERVICE_ROLE_KEY');
        return;
    }

    await importInterpretations();
    await verifyImport();
}

main().catch(console.error);
