const fs = require('fs');
const file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Import
content = content.replace(
  "import CaseStudyCarousel from '@/components/CaseStudyCarousel';",
  "import CaseStudyCarousel from '@/components/CaseStudyCarousel';\nimport PharmaAIAnimation from '@/components/PharmaAIAnimation';"
);

// 2. Extract sections
const startMarker = "      {/* 5a. Lab Spotlight - SOVEREIGN INTELLIGENCE (Light) */}";
const endMarker = "      {/* 4.8 Contact Section - Minimalist Integration */}";

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

const extractedBlock = content.slice(startIdx, endIdx);
content = content.slice(0, startIdx) + content.slice(endIdx);

// 3. Replace graphic with animation
const technicalGraphicStart = "            {/* Right Side: Technical Graphic */}";
const technicalGraphicEnd = "            </div>\n          </div>\n        </div>\n      </section>";

const tgStartIdx = extractedBlock.indexOf(technicalGraphicStart);
const tgEndIdx = extractedBlock.indexOf(technicalGraphicEnd) + \"            </div>\\n          </div>\\n        </div>\".length; // stop before </section>

const newBlockContent = `{/* Right Side: Pharma AI Animation */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-xl">
                 <PharmaAIAnimation />
              </div>
            </div>
          </div>
        </div>`;

const newBlock = extractedBlock.slice(0, tgStartIdx) + newBlockContent + extractedBlock.slice(tgEndIdx);

// 4. Insert extracted block after CaseStudyCarousel
const targetMarker = "      <CaseStudyCarousel />\n";
const targetIdx = content.indexOf(targetMarker) + targetMarker.length;

content = content.slice(0, targetIdx) + "\n" + newBlock + "\n" + content.slice(targetIdx);

fs.writeFileSync(file, content);
console.log("Done");
