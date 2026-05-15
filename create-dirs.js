const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\lenovo\\Documents\\merch-store';
const dirs = [
  'src\\app\\(admin)\\admin\\products',
  'src\\app\\(admin)\\admin\\users',
  'src\\app\\(admin)\\admin\\orders'
];

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log(`Created: ${fullPath}`);
});
