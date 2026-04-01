const fs = require('fs');
const file = 'src/app/page.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// 1. Add Import
lines.splice(12, 0, "import PharmaAIAnimation from '@/components/PharmaAIAnimation';");

// Now lines are shifted by +1
// Extract from:
//   {/* 5a. Lab Spotlight - SOVEREIGN INTELLIGENCE (Light) */}
// to before:
//   {/* 4.8 Contact Section - Minimalist Integration */}

const startIdx = lines.findIndex(l => l.includes('{/* 5a. Lab Spotlight - SOVEREIGN INTELLIGENCE (Light) */}'));
const endIdx = lines.findIndex(l => l.includes('{/* 4.8 Contact Section - Minimalist Integration */}'));

// Extract the block (and some leading empty lines before 5a)
// startIdx is around 113. Let's include the empty lines above it (from 111).
let extracted = lines.splice(startIdx - 2, endIdx - startIdx + 2);

let block = extracted.join('\n');

// Replace the Technical Graphic
const tgRegex = /(\s*{\/\* Right Side: Technical Graphic \*\/\s*}[\s\S]*?<div className="relative aspect-square flex items-center justify-center lg:justify-end">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/m;

const pharmaMarkup = `
            {/* Right Side: Pharma AI Animation */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-xl">
                 <PharmaAIAnimation />
              </div>
            </div>`;

block = block.replace(tgRegex, pharmaMarkup);

// Insert it right after CaseStudyCarousel
const targetIdx = lines.findIndex(l => l.includes('<CaseStudyCarousel />'));
lines.splice(targetIdx + 1, 0, '\n' + block + '\n');

fs.writeFileSync(file, lines.join('\n'));
console.log('Reordered successfully!');
