import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
);

const API_KEY = env.COMPOSIO_API_KEY;
const BASE = 'https://backend.composio.dev/api/v3';

async function api(path, headers = {}) {
  const res = await fetch(`${BASE}${path}`, { headers });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text.slice(0, 300); }
  return { status: res.status, body };
}

const authStyles = [
  { 'x-api-key': API_KEY },
  { 'Authorization': `Bearer ${API_KEY}` },
  { 'X-API-Key': API_KEY },
];

console.log('Testing auth styles against /connected_accounts...\n');
for (const headers of authStyles) {
  const r = await api('/connected_accounts', headers);
  console.log(`Headers: ${JSON.stringify(Object.keys(headers))} → ${r.status}`);
  if (r.status === 200) {
    console.log(JSON.stringify(r.body, null, 2).slice(0, 1500));
  } else {
    console.log('Body:', typeof r.body === 'object' ? JSON.stringify(r.body) : r.body);
  }
  console.log();
}
