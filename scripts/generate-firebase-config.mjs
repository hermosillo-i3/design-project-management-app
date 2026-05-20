/**
 * Lee .env (PROD_* y QAS_*) e inyecta FIREBASE_PROD / FIREBASE_QAS en index.html.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const envPath = join(root, '.env');

const ENV_KEYS = [
  'API_KEY',
  'AUTH_DOMAIN',
  'PROJECT_ID',
  'STORAGE_BUCKET',
  'MESSAGING_SENDER_ID',
  'APP_ID',
];

const TO_FIREBASE = {
  API_KEY: 'apiKey',
  AUTH_DOMAIN: 'authDomain',
  PROJECT_ID: 'projectId',
  STORAGE_BUCKET: 'storageBucket',
  MESSAGING_SENDER_ID: 'messagingSenderId',
  APP_ID: 'appId',
};

const START = '/* ENV_FIREBASE_START';
const END = '/* ENV_FIREBASE_END */';

function parseEnvFile(path) {
  const env = {};
  const text = readFileSync(path, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

function configFromPrefix(source, prefix, label) {
  const cfg = {};
  for (const key of ENV_KEYS) {
    const fullKey = `${prefix}_${key}`;
    const val = source[fullKey];
    if (!val) throw new Error(`${label}: falta ${fullKey} en .env`);
    cfg[TO_FIREBASE[key]] = val;
  }
  return cfg;
}

function loadEnv() {
  if (existsSync(envPath)) return parseEnvFile(envPath);
  if (process.argv.includes('--ci')) return process.env;
  throw new Error('No existe .env — copia .env.sample a .env y completa los valores.');
}

function formatConfigBlock(name, cfg, prefix) {
  const lines = Object.entries(cfg).map(([k, v]) => {
    const envKey = Object.entries(TO_FIREBASE).find(([, fk]) => fk === k)?.[0];
    return `  ${k}: '${String(v).replace(/'/g, "\\'")}', // ${prefix}_${envKey}`;
  });
  return `const ${name} = {\n${lines.join('\n')}\n};`;
}

function injectIntoIndex(indexPath, prod, qas) {
  let html = readFileSync(indexPath, 'utf8');
  const i0 = html.indexOf(START);
  const i1 = html.indexOf(END);
  if (i0 === -1 || i1 === -1) {
    throw new Error(`Marcadores ${START} / ${END} no encontrados en ${indexPath}`);
  }

  const block = `${START} — inyectado desde .env (npm run build:firebase) */
${formatConfigBlock('FIREBASE_PROD', prod, 'PROD')}
${formatConfigBlock('FIREBASE_QAS', qas, 'QAS')}
${END}`;

  html = html.slice(0, i0) + block + html.slice(i1 + END.length);
  writeFileSync(indexPath, html, 'utf8');
}

const indexFlag = process.argv.indexOf('--index');
const indexPath = indexFlag !== -1
  ? join(process.cwd(), process.argv[indexFlag + 1])
  : join(process.cwd(), 'index.html');

const env = loadEnv();
const prod = configFromPrefix(env, 'PROD', 'PROD');
const qas = configFromPrefix(env, 'QAS', 'QAS');

injectIntoIndex(indexPath, prod, qas);
console.log('OK:', indexPath);
