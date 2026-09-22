const fs = require('fs');
const path = require('path');
const https = require('https');

const LOGO_DIR = path.join(__dirname, 'frontend', 'public', 'logos');
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });
}

// Brand mapping: brand name -> SimpleIcons slug or custom SVG
const brandMap = [
  { name: 'Adidas', slug: 'adidas', file: 'adidas.svg', color: '000000' },
  { name: 'ASICS', slug: 'asics', file: 'asics.svg', color: '001F5B' },
  { name: 'Arc\'teryx', slug: 'arcteryx', file: 'arcteryx.svg', color: '000000' },
  { name: 'AllSaints', slug: 'allsaints', file: 'allsaints.svg', color: '000000' },
  { name: 'Balenciaga', slug: 'balenciaga', file: 'balenciaga.svg', color: '000000' },
  { name: 'Brooks', slug: 'brooks', file: 'brooks.svg', color: '003366' },
  { name: 'Burberry', slug: 'burberry', file: 'burberry.svg', color: '000000' },
  { name: 'Calvin Klein', slug: 'calvinklein', file: 'calvinklein.svg', color: '000000' },
  { name: 'Converse', slug: 'converse', file: 'converse.svg', color: '000000' },
  { name: 'Canada Goose', slug: 'canadagoose', file: 'canadagoose.svg', color: 'C8102E' },
  { name: 'Champion', slug: 'champion', file: 'champion.svg', color: '00205B' },
  { name: 'Diesel', slug: 'diesel', file: 'diesel.svg', color: 'D01012' },
  { name: 'Dior', slug: 'dior', file: 'dior.svg', color: '000000' },
  { name: 'Everlane', slug: 'everlane', file: 'everlane.svg', color: '000000' },
  { name: 'Fendi', slug: 'fendi', file: 'fendi.svg', color: '000000' },
  { name: 'Fila', slug: 'fila', file: 'fila.svg', color: '051C2C' },
  { name: 'Gucci', slug: 'gucci', file: 'gucci.svg', color: '000000' },
  { name: 'GAP', slug: 'gap', file: 'gap.svg', color: '002855' },
  { name: 'Hugo Boss', slug: 'hugoboss', file: 'hugoboss.svg', color: '000000' },
  { name: 'Herschel', slug: 'herschel', file: 'herschel.svg', color: '000000' },
  { name: 'Jordan', slug: 'jordan', file: 'jordan.svg', color: '000000' },
  { name: 'J.Crew', slug: 'jcrew', file: 'jcrew.svg', color: '000000' },
  { name: 'Kappa', slug: 'kappa', file: 'kappa.svg', color: '00205B' },
  { name: 'Lacoste', slug: 'lacoste', file: 'lacoste.svg', color: '004526' },
  { name: 'Levi\'s', slug: 'levis', file: 'levis.svg', color: 'C41230' },
  { name: 'Lululemon', slug: 'lululemon', file: 'lululemon.svg', color: 'D31334' },
  { name: 'Louis Vuitton', slug: 'louisvuitton', file: 'louisvuitton.svg', color: '000000' },
  { name: 'Moncler', slug: 'moncler', file: 'moncler.svg', color: '00205B' },
  { name: 'Michael Kors', slug: 'michaelkors', file: 'michaelkors.svg', color: '000000' },
  { name: 'Nike', slug: 'nike', file: 'nike.svg', color: '000000' },
  { name: 'New Balance', slug: 'newbalance', file: 'newbalance.svg', color: 'CE1126' },
  { name: 'The North Face', slug: 'thenorthface', file: 'thenorthface.svg', color: '000000' },
  { name: 'Off-White', slug: 'offwhite', file: 'offwhite.svg', color: '000000' },
  { name: 'Prada', slug: 'prada', file: 'prada.svg', color: '000000' },
  { name: 'Puma', slug: 'puma', file: 'puma.svg', color: '000000' },
  { name: 'Polo Ralph Lauren', slug: 'ralphlauren', file: 'ralphlauren.svg', color: '00205B' },
  { name: 'Patagonia', slug: 'patagonia', file: 'patagonia.svg', color: '000000' },
  { name: 'Reebok', slug: 'reebok', file: 'reebok.svg', color: '000000' },
  { name: 'Ray-Ban', slug: 'rayban', file: 'rayban.svg', color: 'E41E2B' },
  { name: 'Supreme', slug: 'supreme', file: 'supreme.svg', color: 'FF0000' },
  { name: 'Stone Island', slug: 'stoneisland', file: 'stoneisland.svg', color: '000000' },
  { name: 'Salomon', slug: 'salomon', file: 'salomon.svg', color: '000000' },
  { name: 'Tommy Hilfiger', slug: 'tommyhilfiger', file: 'tommyhilfiger.svg', color: '00205B' },
  { name: 'Timberland', slug: 'timberland', file: 'timberland.svg', color: 'D97706' },
  { name: 'Under Armour', slug: 'underarmour', file: 'underarmour.svg', color: '000000' },
  { name: 'Uniqlo', slug: 'uniqlo', file: 'uniqlo.svg', color: 'FF0000' },
  { name: 'Versace', slug: 'versace', file: 'versace.svg', color: '000000' },
  { name: 'Vans', slug: 'vans', file: 'vans.svg', color: 'C41230' },
  { name: 'Y-3', slug: 'y3', file: 'y3.svg', color: '000000' },
  { name: 'Zara', slug: 'zara', file: 'zara.svg', color: '000000' }
];

function fetchLogo(brand) {
  return new Promise((resolve) => {
    const url = `https://cdn.simpleicons.org/${brand.slug}/${brand.color}`;
    const filePath = path.join(LOGO_DIR, brand.file);

    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Success: ${brand.name} -> ${brand.file}`);
          resolve(true);
        });
      } else {
        // Create a stylized SVG logo fallback for brands not in SimpleIcons
        const svgFallback = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
          <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#${brand.color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="2">
            ${brand.name.toUpperCase()}
          </text>
        </svg>`;
        fs.writeFileSync(filePath, svgFallback);
        console.log(`Fallback SVG created: ${brand.name} -> ${brand.file}`);
        resolve(true);
      }
    }).on('error', (err) => {
      const svgFallback = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#${brand.color}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="2">
          ${brand.name.toUpperCase()}
        </text>
      </svg>`;
      fs.writeFileSync(filePath, svgFallback);
      console.log(`Fallback SVG created on error: ${brand.name}`);
      resolve(true);
    });
  });
}

async function run() {
  console.log('Downloading high-resolution brand logos...');
  for (const b of brandMap) {
    await fetchLogo(b);
  }
  console.log('All brand logos processed!');
}

run();
