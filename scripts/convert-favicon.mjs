/**
 * Convert favicon.svg → favicon.png (512, 192, 32) + favicon.ico (32x32)
 * Uses sharp for high-quality rasterization
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const svgPath = path.join(publicDir, 'favicon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generateFavicons() {
    // 1. favicon.png — 512x512 high-res
    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile(path.join(publicDir, 'favicon.png'));
    console.log('✅ favicon.png (512x512)');

    // 2. favicon-192.png — for PWA/manifest
    await sharp(svgBuffer)
        .resize(192, 192)
        .png()
        .toFile(path.join(publicDir, 'favicon-192.png'));
    console.log('✅ favicon-192.png (192x192)');

    // 3. favicon-32.png — small icon
    await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toFile(path.join(publicDir, 'favicon-32.png'));
    console.log('✅ favicon-32.png (32x32)');

    // 4. favicon.ico — 32x32 as ICO (PNG-encoded ICO header)
    // Simple ICO: write a proper ICO file with the 32x32 PNG embedded
    const png32 = await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toBuffer();

    const ico = createIco(png32, 32, 32);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
    console.log('✅ favicon.ico (32x32)');

    // 5. icon-og.png — 1200x630 OG image with the icon centered
    const ogBg = sharp({
        create: {
            width: 1200,
            height: 630,
            channels: 4,
            background: { r: 26, g: 26, b: 26, alpha: 1 } // #1A1A1A dark bg
        }
    });

    const iconForOg = await sharp(svgBuffer)
        .resize(300, 300)
        .png()
        .toBuffer();

    await ogBg
        .composite([{ input: iconForOg, left: 450, top: 165 }])
        .png()
        .toFile(path.join(publicDir, 'icon-og.png'));
    console.log('✅ icon-og.png (1200x630 OG image)');

    console.log('\n🎉 All favicons generated!');
}

/**
 * Create a minimal ICO file from a single PNG buffer
 */
function createIco(pngBuffer, width, height) {
    // ICO header: 6 bytes
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);    // Reserved
    header.writeUInt16LE(1, 2);    // ICO type
    header.writeUInt16LE(1, 4);    // Number of images

    // Directory entry: 16 bytes
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);   // Width (0 = 256)
    entry.writeUInt8(height >= 256 ? 0 : height, 1);  // Height (0 = 256)
    entry.writeUInt8(0, 2);       // Color palette
    entry.writeUInt8(0, 3);       // Reserved
    entry.writeUInt16LE(1, 4);    // Color planes
    entry.writeUInt16LE(32, 6);   // Bits per pixel
    entry.writeUInt32LE(pngBuffer.length, 8);  // Image size
    entry.writeUInt32LE(22, 12);  // Offset to image data (6 + 16)

    return Buffer.concat([header, entry, pngBuffer]);
}

generateFavicons().catch(console.error);
