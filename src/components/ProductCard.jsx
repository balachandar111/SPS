import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Image with graceful fallback; resets when src changes (e.g. switching variants).
export function Img({ src, alt, className = '' }) {
  const [bad, setBad] = useState(!src);
  useEffect(() => setBad(!src), [src]);
  if (bad) return <div className={`ph ${className}`} role="img" aria-label={alt}><span>{alt.replace('Savitri ', '').slice(0, 2)}</span></div>;
  return <img src={src} alt={alt} className={className} loading="lazy" referrerPolicy="no-referrer" onError={() => setBad(true)} />;
}

export default function ProductCard({ p }) {
  const n = p.variants.length;
  return (
    <Link to={`/product/${p.slug}`} className="card">
      <div className="card-img">
        <Img src={p.image} alt={p.name} />
        <span className="badge">{p.category.replace(' Range', '')}</span>
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="tag">{p.tagline}</p>
        <div className="card-foot"><span className="meta">{p.riceType}{n ? ` · ${n} variant${n > 1 ? 's' : ''}` : ''}</span><span className="arrow">→</span></div>
      </div>
    </Link>
  );
}
