import { useSearchParams } from 'react-router-dom';
import data from '../data/products.json';
import ProductCard from '../components/ProductCard.jsx';
import PageHero from '../components/PageHero.jsx';
import { heroSlides } from '../data/heroSlides.js';

const categories = ['All', ...new Set(data.map((p) => p.category))];
const types = ['All types', ...new Set(data.map((p) => p.riceType))];
const sorts = { default: 'Featured order', az: 'Name A–Z', variants: 'Most variants' };

export default function Products() {
  const [sp, setSp] = useSearchParams();
  const cat = sp.get('cat') || 'All';
  const q = sp.get('q') || '';
  const type = sp.get('type') || 'All types';
  const sort = sp.get('sort') || 'default';
  const set = (k, v, empty) => { const n = new URLSearchParams(sp); v && v !== empty ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }); };

  let list = data.filter((p) =>
    (cat === 'All' || p.category === cat) &&
    (type === 'All types' || p.riceType === type) &&
    `${p.name} ${p.tagline} ${p.riceType} ${p.variants.map((v) => v.name).join(' ')}`.toLowerCase().includes(q.toLowerCase())
  );
  if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'variants') list = [...list].sort((a, b) => b.variants.length - a.variants.length);
  const reset = () => setSp({}, { replace: true });
  const dirty = cat !== 'All' || q || type !== 'All types' || sort !== 'default';

  return (
    <>
      <PageHero slides={heroSlides.products} eyebrow="Our products" title="Product catalog">
        Browse {data.length} products across {categories.length - 1} ranges. Tap any product to see its variants.
      </PageHero>
      <section className="wrap section tight">
        <div className="filters">
        <div className="toolbar">
          <div className="search"><span>⌕</span><input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search name, variant or rice type" aria-label="Search products" /></div>
          <select value={type} onChange={(e) => set('type', e.target.value, 'All types')} aria-label="Rice type">{types.map((t) => <option key={t}>{t}</option>)}</select>
          <select value={sort} onChange={(e) => set('sort', e.target.value, 'default')} aria-label="Sort">{Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        </div>
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className={c === cat ? 'chip on' : 'chip'} onClick={() => set('cat', c, 'All')}>
              {c}{c !== 'All' && <i>{data.filter((p) => p.category === c).length}</i>}
            </button>
          ))}
        </div>
        </div>
        <div className="count"><span>{list.length} product{list.length !== 1 && 's'}</span>{dirty && <button className="clear" onClick={reset}>Clear filters ✕</button>}</div>
        {list.length ? <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div> : <p className="empty">No products match. Try another search.</p>}
      </section>
    </>
  );
}