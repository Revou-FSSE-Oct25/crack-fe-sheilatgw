#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname);

const dirs = [
  path.join(baseDir, 'src/app/(admin)/admin/products'),
  path.join(baseDir, 'src/app/(admin)/admin/users'),
  path.join(baseDir, 'src/app/(admin)/admin/orders')
];

async function createDirs() {
  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
}

createDirs().catch(console.error);
