/**
 * Generate a premium favicon for the ATEET. portfolio
 * Creates SVG → PNG (multiple sizes) + ICO
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

// ── SVG Favicon: Bold geometric "A" with dot accent on #FF4D00 background ──
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#FF4D00"/>
  <text x="220" y="400" font-family="'Space Grotesk','Arial Black',sans-serif" font-weight="700" font-size="420" fill="#FFFFFF" text-anchor="middle">A</text>
  <circle cx="420" cy="400" r="36" fill="#FFFFFF"/>
</svg>`;

// Write SVG
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon);
console.log('✅ Created favicon.svg');

// ── Create a simple HTML file to render and capture the favicon ──
const htmlRenderer = `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
  body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: transparent; }
  .icon {
    width: 512px; height: 512px;
    background: #FF4D00;
    border-radius: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .letter {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 360px;
    color: #FFFFFF;
    line-height: 1;
    margin-left: -20px;
  }
  .dot {
    width: 56px; height: 56px;
    background: #FFFFFF;
    border-radius: 50%;
    position: absolute;
    bottom: 95px;
    right: 80px;
  }
</style>
</head>
<body>
  <div class="icon">
    <span class="letter">A</span>
    <div class="dot"></div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, '_favicon-render.html'), htmlRenderer);
console.log('✅ Created _favicon-render.html (for browser capture)');
console.log('\nNext: Open this HTML in browser and capture as PNG, or use the SVG directly.');
