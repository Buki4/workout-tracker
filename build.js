const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, 'sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');

// Generate a build timestamp string like 20260611-2200
const now = new Date();
const ts = now.toISOString().replace(/[-:T]/g, '').slice(0, 12); // e.g. 202606110000

// We find the CACHE line and replace it
// Expected: const CACHE = 'workout-v0.0.1';
swContent = swContent.replace(/const CACHE = ['"]workout-v.*?['"];/, `const CACHE = 'workout-v0.0.1-${ts}';`);

fs.writeFileSync(swPath, swContent, 'utf8');
console.log(`Updated sw.js cache to workout-v0.0.1-${ts}`);
