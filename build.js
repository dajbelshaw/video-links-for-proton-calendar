#!/usr/bin/env node

/**
 * Build script for Proton Calendar Video Links extension
 * Assembles browser-specific builds from shared source
 */

const fs = require('fs');
const path = require('path');

const BROWSERS = ['chrome', 'firefox'];
const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const MANIFESTS = path.join(ROOT, 'manifests');
const ICONS = path.join(ROOT, 'icons');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function build(browser) {
  console.log(`Building for ${browser}...`);

  const browserDist = path.join(DIST, browser);
  ensureDir(browserDist);

  // Copy manifest
  const manifestSrc = path.join(MANIFESTS, `${browser}.json`);
  const manifestDest = path.join(browserDist, 'manifest.json');
  copyFile(manifestSrc, manifestDest);

  // Copy source files
  const srcFiles = ['content-script.js', 'popup.js', 'popup.html'];
  for (const file of srcFiles) {
    copyFile(path.join(SRC, file), path.join(browserDist, file));
  }

  // Copy icons
  copyDir(ICONS, path.join(browserDist, 'icons'));

  console.log(`  -> dist/${browser}/`);
}

function clean() {
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true });
  }
}

// Main
const args = process.argv.slice(2);

if (args.includes('--clean')) {
  console.log('Cleaning dist/...');
  clean();
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node build.js [options] [browsers...]

Options:
  --clean    Remove dist/ before building
  --help     Show this help message

Browsers:
  chrome     Build for Chrome/Chromium
  firefox    Build for Firefox
  (none)     Build for all browsers

Examples:
  node build.js              # Build all
  node build.js chrome       # Build Chrome only
  node build.js --clean      # Clean and build all
`);
  process.exit(0);
}

const targetBrowsers = args.filter(a => !a.startsWith('--'));
const browsers = targetBrowsers.length > 0
  ? targetBrowsers.filter(b => BROWSERS.includes(b))
  : BROWSERS;

if (browsers.length === 0) {
  console.error('Error: No valid browsers specified');
  process.exit(1);
}

console.log('Video Links for Proton Calendar - Build\n');
browsers.forEach(build);
console.log('\nDone!');
