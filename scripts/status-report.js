#!/usr/bin/env node
// status-report.js - דוח מצב מלא על הפרויקט
const fs = require('fs');
const path = require('path');

function listDirRecursive(dir, prefix = '') {
  let result = '';
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      result += `${prefix}${file}/\n`;
      result += listDirRecursive(fullPath, prefix + '  ');
    } else {
      result += `${prefix}${file}\n`;
    }
  }
  return result;
}

function getPackageJson() {
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    return fs.readFileSync(pkgPath, 'utf8');
  }
  return '{}';
}

function getTailwindConfig() {
  const twPath = path.join(process.cwd(), 'tailwind.config.js');
  if (fs.existsSync(twPath)) {
    return fs.readFileSync(twPath, 'utf8');
  }
  return 'לא נמצא tailwind.config.js';
}

function getGlobalCss() {
  const cssPath = path.join(process.cwd(), 'global.css');
  if (fs.existsSync(cssPath)) {
    return fs.readFileSync(cssPath, 'utf8');
  }
  return 'לא נמצא global.css';
}

const report = [
  '--- דוח מצב פרויקט ---',
  '\n--- package.json ---\n',
  getPackageJson(),
  '\n--- tailwind.config.js ---\n',
  getTailwindConfig(),
  '\n--- global.css ---\n',
  getGlobalCss(),
  '\n--- מבנה תיקיות ---\n',
  listDirRecursive(process.cwd()),
].join('\n');

fs.writeFileSync('status-report.txt', report, 'utf8');
console.log('נוצר קובץ status-report.txt');
