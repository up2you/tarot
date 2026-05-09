import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'public/card01';
const outputDir = 'public/card01'; // Replacing in place but with new extension

async function compress() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
    
    console.log(`Found ${files.length} images to compress...`);
    
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const fileNameNoExt = path.parse(file).name;
        const outputPath = path.join(outputDir, `${fileNameNoExt}.webp`);
        
        try {
            const metadata = await sharp(inputPath).metadata();
            
            // If the image is very large, we might want to resize it.
            // Tarot cards don't need to be wider than 512px for mobile apps.
            let pipeline = sharp(inputPath);
            
            if (metadata.width > 512) {
                pipeline = pipeline.resize(512);
            }
            
            await pipeline
                .webp({ quality: 80 }) // 80 is a good balance between quality and size
                .toFile(outputPath);
            
            const oldSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            
            console.log(`✅ ${file} -> ${fileNameNoExt}.webp (${(oldSize/1024).toFixed(1)}KB -> ${(newSize/1024).toFixed(1)}KB)`);
            
            // Delete the old PNG file after successful conversion
            fs.unlinkSync(inputPath);
        } catch (err) {
            console.error(`❌ Failed to process ${file}:`, err);
        }
    }
    
    // Also compress shuffle-animation.png if it exists
    const shufflePath = 'public/shuffle-animation.png';
    if (fs.existsSync(shufflePath)) {
        try {
            await sharp(shufflePath)
                .webp({ quality: 80 })
                .toFile('public/shuffle-animation.webp');
            console.log('✅ shuffle-animation.png -> .webp');
            fs.unlinkSync(shufflePath);
        } catch (err) {
            console.error('❌ Failed to process shuffle-animation.png:', err);
        }
    }
}

compress();
