
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function importSummaries() {
    const sqlPath = path.join(__dirname, '..', 'output', 'summaries', 'batch_summaries.sql');
    if (!fs.existsSync(sqlPath)) {
        console.error('SQL file not found:', sqlPath);
        return;
    }

    const content = fs.readFileSync(sqlPath, 'utf-8');

    // Regex to match INSERT VALUES
    // VALUES ('key', 'summary')
    const regex = /VALUES\s*\('([^']+)',\s*'((?:[^']|'')*)'\)/g;

    let match;
    const records = [];

    while ((match = regex.exec(content)) !== null) {
        const patternKey = match[1];
        // Unescape SQL quotes for JS string
        const summary = match[2].replace(/''/g, "'");

        records.push({
            pattern_key: patternKey,
            summary: summary
        });
    }

    console.log(`Found ${records.length} summaries to import.`);

    // Batch upsert
    const batchSize = 50;
    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        console.log(`Importing batch ${i / batchSize + 1}...`);

        const { error } = await supabase
            .from('oracle_summaries')
            .upsert(batch, { onConflict: 'pattern_key' });

        if (error) {
            console.error('Error importing batch:', error);
        }
    }

    console.log('✅ Import complete!');
}

importSummaries();
