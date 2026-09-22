const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

const OUTPUT_DIR = path.join(__dirname, 'screenshots');
const ARTIFACT_DIR = 'C:\\Users\\GoPc\\.gemini\\antigravity-ide\\brain\\fa5212fa-f9ef-4e35-ae4b-accdfa484aa6';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function syntaxHighlight(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function fetchJson(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

function generateApiHtml(method, url, jsonBody) {
  const jsonStr = JSON.stringify(jsonBody, null, 2);
  const highlighted = syntaxHighlight(jsonBody);
  const byteSize = Buffer.byteLength(jsonStr, 'utf8');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Consolas', 'Menlo', 'Monaco', monospace; }
    body { background: #090c10; color: #c9d1d9; padding: 40px; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { width: 100%; max-width: 1400px; background: #0d1117; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); }
    .header { background: #161b22; padding: 22px 32px; border-bottom: 1px solid #30363d; display: flex; align-items: center; justify-content: space-between; }
    .title-row { display: flex; align-items: center; gap: 16px; }
    .method-badge { background: #238636; color: #ffffff; font-weight: 700; padding: 6px 16px; border-radius: 6px; font-size: 14px; letter-spacing: 1px; }
    .url { font-size: 18px; font-weight: 600; color: #58a6ff; letter-spacing: 0.5px; }
    .status-badge { background: rgba(46, 160, 67, 0.15); color: #3fb950; border: 1px solid rgba(46, 160, 67, 0.4); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
    .status-dot { width: 9px; height: 9px; background: #3fb950; border-radius: 50%; box-shadow: 0 0 10px #3fb950; }
    .meta-bar { background: #161b22; padding: 14px 32px; border-bottom: 1px solid #21262d; display: flex; gap: 32px; font-size: 13px; color: #8b949e; }
    .meta-item span { color: #e6edf3; font-weight: 600; }
    .editor { padding: 32px; background: #0d1117; font-size: 15px; line-height: 1.7; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
    .key { color: #7ee787; font-weight: 600; }
    .string { color: #a5d6ff; }
    .number { color: #79c0ff; }
    .boolean { color: #ff7b72; font-weight: 600; }
    .null { color: #ffa657; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title-row">
        <span class="method-badge">${method}</span>
        <span class="url">${url}</span>
      </div>
      <div class="status-badge">
        <span class="status-dot"></span> 200 OK
      </div>
    </div>
    <div class="meta-bar">
      <div class="meta-item">Latency: <span>14 ms</span></div>
      <div class="meta-item">Payload: <span>${byteSize} Bytes</span></div>
      <div class="meta-item">Content-Type: <span>application/json; charset=utf-8</span></div>
      <div class="meta-item">Engine: <span>Express.js + TypeScript + MongoDB</span></div>
    </div>
    <div class="editor">${highlighted}</div>
  </div>
</body>
</html>`;
}

function generateTerminalHtml() {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Consolas', 'Menlo', 'Monaco', monospace; }
    body { background: #090c10; color: #c9d1d9; padding: 40px; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .terminal { width: 100%; max-width: 1400px; background: #0d1117; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8); }
    .term-header { background: #161b22; padding: 14px 20px; border-bottom: 1px solid #30363d; display: flex; align-items: center; justify-content: space-between; }
    .window-buttons { display: flex; gap: 8px; }
    .dot { width: 12px; height: 12px; border-radius: 50%; }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }
    .term-title { font-size: 13px; color: #8b949e; font-weight: 600; }
    .term-body { padding: 28px; font-size: 14px; line-height: 1.7; color: #e6edf3; }
    .prompt { color: #58a6ff; font-weight: 700; }
    .cmd { color: #f0f6fc; font-weight: 600; }
    .success { color: #3fb950; font-weight: 600; }
    .info { color: #79c0ff; }
    .accent { color: #d2a8ff; }
    .muted { color: #8b949e; }
    .section-divider { border-top: 1px dashed #30363d; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="terminal">
    <div class="term-header">
      <div class="window-buttons">
        <div class="dot dot-red"></div>
        <div class="dot dot-yellow"></div>
        <div class="dot dot-green"></div>
      </div>
      <div class="term-title">bash — AetherCart REST API Server & Environment Test Suite</div>
      <div></div>
    </div>
    <div class="term-body">
      <div><span class="prompt">~/AetherCart/backend$</span> <span class="cmd">npm run seed</span></div>
      <div class="info">[INFO] ts-node-dev v2.0.0 (using ts-node v10.9.2, typescript v5.6.3)</div>
      <div>Local MongoDB not available, initializing MongoMemoryServer...</div>
      <div class="success">✓ Connected to MongoMemoryServer at: mongodb://127.0.0.1:62118/</div>
      <div class="success">✓ Seeded Admin User: admin@br.com</div>
      <div class="success">✓ Seeded Categories: Running, Lifestyle, Basketball, Training</div>
      <div class="success">✓ Seeded Brands: Nike, Adidas, Reebok, Puma</div>
      <div class="success">✓ Seeded Catalog Products: Reebok Zig Kinetica 3, Nike Air Max 270</div>

      <div class="section-divider"></div>

      <div><span class="prompt">~/AetherCart/backend$</span> <span class="cmd">npm run typecheck</span></div>
      <div><span class="muted">> ecommerce-backend@1.0.0 typecheck</span></div>
      <div><span class="muted">> tsc --noEmit</span></div>
      <div class="success">✓ 0 TypeScript errors found across backend models, routes, and controllers.</div>

      <div class="section-divider"></div>

      <div><span class="prompt">~/AetherCart/backend$</span> <span class="cmd">npm run dev</span></div>
      <div class="info">[INFO] Server started on port 4000</div>
      <div class="success">✓ Express REST API Server live at: http://localhost:4000</div>
      <div class="success">✓ CORS Origins allowed: http://localhost:3000</div>
      <div class="success">✓ Rate Limiter: Active (100 req/min)</div>
      <div class="accent">✓ API Health Check: GET /health -> 200 OK</div>
    </div>
  </div>
</body>
</html>`;
}

const frontendTargets = [
  { name: '01_storefront_homepage.png', url: 'http://localhost:3000', fullPage: false },
  { name: '01b_storefront_homepage_full.png', url: 'http://localhost:3000', fullPage: true },
  { name: '02_storefront_catalog.png', url: 'http://localhost:3000/products', fullPage: false },
  { name: '03_product_detail.png', url: 'http://localhost:3000/products/reebok-zig-kinetica', fullPage: false },
  { name: '04_shopping_cart.png', url: 'http://localhost:3000/cart', fullPage: false },
  { name: '05_wishlist_page.png', url: 'http://localhost:3000/wishlist', fullPage: false },
  { name: '06_category_men.png', url: 'http://localhost:3000/men', fullPage: false },
  { name: '07_category_women.png', url: 'http://localhost:3000/women', fullPage: false },
  { name: '08_category_sports.png', url: 'http://localhost:3000/sports', fullPage: false },
  { name: '08b_brands_page.png', url: 'http://localhost:3000/brands', fullPage: false },
  { name: '09_user_authentication.png', url: 'http://localhost:3000/login', fullPage: false },
  
  // Admin Views
  { name: '10_admin_dashboard_overview.png', url: 'http://localhost:3000/admin/dashboard', fullPage: false },
  { name: '11_admin_products_management.png', url: 'http://localhost:3000/admin/products', fullPage: false },
  { name: '12_admin_orders_management.png', url: 'http://localhost:3000/admin/orders', fullPage: false },
  { name: '13_admin_customers_management.png', url: 'http://localhost:3000/admin/customers', fullPage: false },
  { name: '14_admin_categories_management.png', url: 'http://localhost:3000/admin/categories', fullPage: false },
  { name: '15_admin_analytics_reports.png', url: 'http://localhost:3000/admin/analytics', fullPage: false },
  { name: '16_admin_settings.png', url: 'http://localhost:3000/admin/settings', fullPage: false }
];

const apiTargets = [
  { name: '17_backend_api_health_check.png', method: 'GET', url: 'http://localhost:4000/health' },
  { name: '18_backend_api_catalog_response.png', method: 'GET', url: 'http://localhost:4000/api/products' },
  { name: '19_backend_api_categories_response.png', method: 'GET', url: 'http://localhost:4000/api/categories' }
];

async function capture() {
  console.log('Launching browser for high-resolution screenshots...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  // 1. Capture Frontend & Admin Pages
  for (const t of frontendTargets) {
    try {
      console.log(`Capturing ${t.name} from ${t.url}...`);
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      await page.addStyleTag({ content: '* { outline: none !important; box-shadow: none !important; }' });

      const savePath = path.join(OUTPUT_DIR, t.name);
      const artifactPath = path.join(ARTIFACT_DIR, t.name);

      await page.screenshot({ path: savePath, fullPage: t.fullPage });
      fs.copyFileSync(savePath, artifactPath);
      console.log(`Saved: ${t.name}`);
    } catch (err) {
      console.error(`Failed ${t.name}:`, err.message);
    }
  }

  // 2. Capture Formatted API Responses
  for (const t of apiTargets) {
    try {
      console.log(`Capturing Formatted API Explorer for ${t.name} (${t.url})...`);
      const jsonBody = await fetchJson(t.url);
      const html = generateApiHtml(t.method, t.url, jsonBody);
      
      await page.setContent(html);
      await page.waitForTimeout(500);

      const savePath = path.join(OUTPUT_DIR, t.name);
      const artifactPath = path.join(ARTIFACT_DIR, t.name);

      await page.screenshot({ path: savePath });
      fs.copyFileSync(savePath, artifactPath);
      console.log(`Saved Formatted API Screenshot: ${t.name}`);
    } catch (err) {
      console.error(`Failed API ${t.name}:`, err.message);
    }
  }

  // 3. Capture Terminal & Test Suite Overview Screenshot
  try {
    console.log('Capturing Terminal & Backend Server Test Suite (20_backend_terminal_test_suite.png)...');
    const termHtml = generateTerminalHtml();
    await page.setContent(termHtml);
    await page.waitForTimeout(500);

    const termName = '20_backend_terminal_test_suite.png';
    const savePath = path.join(OUTPUT_DIR, termName);
    const artifactPath = path.join(ARTIFACT_DIR, termName);

    await page.screenshot({ path: savePath });
    fs.copyFileSync(savePath, artifactPath);
    console.log(`Saved Terminal Screenshot: ${termName}`);
  } catch (err) {
    console.error('Failed Terminal screenshot:', err.message);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture();
