import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname, basename, join } from 'path';
import { fileURLToPath } from 'url';

// Helper for ES module path resolution
const __dirname = dirname(fileURLToPath(importURL(import.meta.url)));

function importURL(url) {
  return url;
}

// Find available browser paths based on OS
function findBrowser() {
  const platform = process.platform;
  const paths = [];

  if (platform === 'win32') {
    paths.push(
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    );
  } else if (platform === 'darwin') {
    paths.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    );
  } else {
    // Linux search
    const linuxBrowsers = ['google-chrome', 'chromium', 'chromium-browser', 'microsoft-edge', 'msedge'];
    for (const browser of linuxBrowsers) {
      try {
        const check = spawnSync('which', [browser], { encoding: 'utf8' });
        if (check.status === 0 && check.stdout.trim()) {
          return check.stdout.trim();
        }
      } catch (e) {
        // Ignored
      }
    }
  }

  for (const path of paths) {
    if (existsSync(path)) {
      return path;
    }
  }

  return null;
}

// Main execution
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node scripts/export_pdf.mjs <input_html_path> [output_pdf_path]');
  process.exit(1);
}

const inputHtml = resolve(args[0]);
if (!existsSync(inputHtml)) {
  console.error(`Error: Input HTML file not found at ${inputHtml}`);
  process.exit(1);
}

const outputPdf = args[1] 
  ? resolve(args[1]) 
  : join(dirname(inputHtml), basename(inputHtml, '.html') + '.pdf');

const browserPath = findBrowser();
if (!browserPath) {
  console.error('Error: Could not locate Google Chrome or Microsoft Edge on your system.');
  console.error('Please print to PDF manually from your browser: Ctrl/Cmd+P -> Save as PDF.');
  process.exit(1);
}

console.log(`Using browser: ${browserPath}`);
console.log(`Printing: ${inputHtml}`);
console.log(`Saving to: ${outputPdf}`);

const result = spawnSync(browserPath, [
  '--headless',
  '--no-sandbox',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${outputPdf}`,
  inputHtml
]);

if (result.status === 0 && existsSync(outputPdf)) {
  console.log(`Success! PDF successfully generated at ${outputPdf}`);
} else {
  console.error('Error: Browser print command completed but PDF was not generated.');
  if (result.error) console.error(result.error);
  if (result.stderr && result.stderr.toString()) console.error(result.stderr.toString());
  process.exit(1);
}
