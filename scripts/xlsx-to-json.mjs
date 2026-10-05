// Rebuilds src/data/products.json from data/products-catalog.xlsx  ->  npm run data
import XLSX from 'xlsx';
import fs from 'fs';

const wb = XLSX.readFile('data/products-catalog.xlsx');
const rows = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' });
const slugOf = (u) => u.split('/').filter(Boolean).pop();
const variants = rows('Variants');

const products = rows('Products')
  .filter((r) => r.Product)
  .map((r) => ({
    slug: slugOf(r['Product Page URL']),
    name: r.Product,
    category: r.Category,
    riceType: r['Rice Type'],
    tagline: r.Tagline,
    image: r['Image URL'],
    pageUrl: r['Product Page URL'],
    variants: variants
      .filter((v) => v.Product === r.Product)
      .map((v) => ({ name: v.Variant, detail: v['Variant Details'], image: v['Image URL'], pageUrl: v['Variant Page URL'] })),
  }));

fs.writeFileSync('src/data/products.json', JSON.stringify(products, null, 1));
console.log(`${products.length} products, ${products.reduce((n, p) => n + p.variants.length, 0)} variants written`);
