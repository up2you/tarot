import sharp from 'sharp';
import path from 'path';

const inputPath = 'C:\\Users\\9500\\.gemini\\antigravity\\brain\\714f93da-8c24-4563-8a5c-9b61e9292dc6\\browser\\logo.png';
const outputPath = 'C:\\Users\\9500\\.gemini\\antigravity\\brain\\714f93da-8c24-4563-8a5c-9b61e9292dc6\\browser\\logo_resized.png';

async function resizeLogo() {
    try {
        await sharp(inputPath)
            .resize(120, 120)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(outputPath);
        console.log('Logo resized successfully to 120x120 and compressed.');
    } catch (err) {
        console.error('Error resizing logo:', err);
    }
}

resizeLogo();
