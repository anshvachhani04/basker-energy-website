#!/usr/bin/env node
/**
 * BASKER Energy build script
 * Copies static HTML / CSS / JS / images from repo root to ./out
 * for GitHub Pages deployment via peaceiris/actions-gh-pages.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'out');

// Reset
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const SKIP = new Set([
  '.git', '.github', 'node_modules', 'out',
  'package.json', 'package-lock.json', 'build.js',
  'README.md', '.gitignore', 'AGENTS.md', 'CLAUDE.md'
]);

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const entries = fs.readdirSync(ROOT);
let count = 0;
for (const e of entries) {
  if (SKIP.has(e)) continue;
  const src = path.join(ROOT, e);
  const dest = path.join(OUT, e);
  copyRecursive(src, dest);
  count++;
}

// Touch a .nojekyll so GitHub Pages doesn't try to process via Jekyll
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

console.log(`✓ BASKER build complete — ${count} top-level entries copied to ./out`);
