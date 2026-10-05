import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import PageHero from '../components/PageHero.jsx';
import { heroSlides } from '../data/heroSlides.js';

const facts = [['1922', 'Founded'], ['600', 'Tons paddy / day'], ['Raichur', 'Mill location'], ['Bangalore', 'Corporate office']];
const values = [
  ['Quality', 'Every lot is checked so the grain in your pack is consistent.'],
  ['Quantity', 'Large-scale processing capacity for retail and trade supply.'],
  ['Hygiene', 'Clean, sorted and hygienically packed rice.'],
];

export default function About() {
  return (
    <>
      <PageHero slides={heroSlides.about} eyebrow="About us" title="A century of care, one grain at a time">
        SPS Agronico India LLP, makers of the Savitri range of rice.
      </PageHero>
      <section className="wrap section">
        <div className="facts pull">{facts.map(([b, s], i) => <Reveal key={s} delay={i * 70}><div><b>{b}</b><span>{s}</span></div></Reveal>)}</div>
        <Reveal className="story">
          <div><p className="eyebrow">Our story</p><h2>Pioneers in agro processing</h2></div>
          <p>Since 1922 the Savitri name has stood for quality grain. Today the group processes paddy at its mill in Raichur, Karnataka, and supplies a full range of rice, from premium Sona Masuri to economical and broken rice, along with rice by-products.</p>
        </Reveal>
        <div className="values">{values.map(([t, d], i) => <Reveal key={t} delay={i * 90}><div className="value"><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div>
      </section>
      <Reveal className="wrap cta"><div><h2>See the full range</h2><p>Premium, special, consumer, economical and broken rice.</p></div><Link to="/products" className="btn btn-lime">Browse products</Link></Reveal>
    </>
  );
}