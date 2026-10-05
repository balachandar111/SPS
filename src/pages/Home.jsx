import { Link } from 'react-router-dom';
import data from '../data/products.json';
import ProductCard, { Img } from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { useSlideVars, HeroDots } from '../components/PageHero.jsx';
import { heroSlides } from '../data/heroSlides.js';

const featured = data.find((p) => p.slug === 'savitri-ashirvaad');
const bronze = featured.variants.find((v) => v.name === 'Bronze');
const categories = [...new Set(data.map((p) => p.category))];
const variantCount = data.reduce((n, p) => n + p.variants.length, 0);
const catImg = (c) => data.find((p) => p.category === c && p.image)?.image;
const catEmoji = { 'Premium Rice': '👑', 'Special Rice': '⭐', 'Consumer Rice Range': '🍚', 'Economical Rice Range': '🛒', 'Broken Rice Range': '🌾', 'Rice By-Products': '🥣' };

const steps = [
  ['01', 'Sourcing', 'Paddy is procured and checked at intake.'],
  ['02', 'Milling', 'Processed at the Raichur mill with controlled milling.'],
  ['03', 'Sortex', 'Colour-sorted to remove discoloured grains.'],
  ['04', 'Packing', 'Hygienically packed and dispatched.'],
];
const why = [
  ['🌱', 'Farm to pack', 'Grain sourced from growers across Karnataka.'],
  ['🔬', 'Sortex cleaned', 'Uniform, clean, hygienic grains.'],
  ['🏭', '600 tons / day', 'High-capacity paddy processing.'],
  ['🕰️', 'Since 1922', 'A century of trust in every grain.'],
];
const marquee = ['Premium Rice', 'Special Rice', 'Consumer Range', 'Economical Range', 'Broken Rice', 'Rice By-Products'];

export default function Home() {
  const vars = useSlideVars(heroSlides.home);
  return (
    <>
      <section className="hero has-slides" style={vars}>
        <span className="blob b1" /><span className="blob b2" />
        <div className="wrap hero-in">
          <div>
            <p className="pill">Since 1922 · Raichur, Karnataka</p>
            <h1>Quality that <em>comes from care.</em></h1>
            <p className="lead">Discover the complete Savitri rice range: premium, special, consumer, economical and broken rice, with every variant and grade.</p>
            <div className="row">
              <Link to="/products" className="btn btn-lime">Explore catalog</Link>
              <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
            </div>
            <div className="hero-mini"><div><b>{data.length}</b><span>Products</span></div><div><b>{variantCount}</b><span>Variants</span></div><div><b>6</b><span>Ranges</span></div></div>
          </div>
          <Link to={`/product/${featured.slug}?v=Bronze`} className="spot">
            <span className="ribbon">Featured</span>
            <Img src={bronze.image} alt="Savitri Ashirvaad Bronze" />
            <div><strong>Savitri Ashirvaad · Bronze</strong><span>{bronze.detail}</span></div>
          </Link>
        </div>
        <HeroDots count={heroSlides.home.length} />
      </section>

      <div className="marquee" aria-hidden="true"><div className="track">{[...marquee, ...marquee, ...marquee].map((m, i) => <span key={i}>{m}<i>✦</i></span>)}</div></div>

      <section className="wrap section">
        <Reveal><p className="eyebrow">Browse by range</p><h2>Find the right rice</h2></Reveal>
        <div className="tiles">
          {categories.map((c, i) => (
            <Reveal key={c} delay={i * 60}>
              <Link to={`/products?cat=${encodeURIComponent(c)}`} className="tile">
                <div className="tile-img"><Img src={catImg(c)} alt={c} /></div>
                <div className="tile-txt"><em>{catEmoji[c] || '🌾'}</em><strong>{c}</strong><span>{data.filter((p) => p.category === c).length} products →</span></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <Reveal className="between"><div><p className="eyebrow">Featured</p><h2>Premium &amp; special rice</h2></div><Link to="/products" className="link">View all →</Link></Reveal>
        <div className="grid">{data.filter((p) => /^(Premium|Special)/.test(p.category)).map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 70}><ProductCard p={p} /></Reveal>)}</div>
      </section>

      <section className="process">
        <div className="wrap">
          <Reveal><p className="eyebrow">How it reaches you</p><h2>From paddy to pack</h2></Reveal>
          <div className="steps">{steps.map(([n, t, d], i) => <Reveal key={n} delay={i * 80} className="step"><b>{n}</b><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
        </div>
      </section>

      <section className="why">
        <div className="wrap">
          <Reveal><p className="eyebrow light">Why Savitri</p><h2>Trusted in every kitchen</h2></Reveal>
          <div className="why-grid">{why.map(([i, t, d], k) => <Reveal key={t} delay={k * 80}><div className="why-card"><em>{i}</em><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div>
        </div>
      </section>

      <Reveal className="wrap cta">
        <div><h2>Looking for bulk or trade supply?</h2><p>Pack sizes and pricing are shared on request. Talk to our team.</p></div>
        <div className="row nomar"><Link to="/contact" className="btn btn-lime">Contact us</Link><Link to="/products" className="btn btn-ghost">Browse products</Link></div>
      </Reveal>
    </>
  );
}