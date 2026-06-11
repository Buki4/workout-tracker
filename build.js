const fs = require('fs');
const path = require('path');

const versionPath = path.join(__dirname, 'version.json');
let appVersion = '0.0.1';
if (fs.existsSync(versionPath)) {
  const vData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
  if (vData.version) appVersion = vData.version;
}

const swPath = path.join(__dirname, 'sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');

// Generate a build timestamp string like 202606110000
const now = new Date();
const ts = now.toISOString().replace(/[-:T]/g, '').slice(0, 12);

// We find the CACHE line and replace it
swContent = swContent.replace(/const CACHE = ['"]workout-v.*?['"];/, `const CACHE = 'workout-v${appVersion}-${ts}';`);

fs.writeFileSync(swPath, swContent, 'utf8');
console.log(`Updated sw.js cache to workout-v${appVersion}-${ts}`);
