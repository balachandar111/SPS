import { useEffect } from 'react';
import { SLIDE_SECONDS } from '../data/heroSlides.js';

// CSS custom properties (--s1..--s6, --cycle) consumed by the ::after carousel; also preloads the photos.
export function useSlideVars(slides) {
  useEffect(() => { slides.forEach((s) => { const i = new Image(); i.src = s; }); }, [slides]);
  const vars = { '--cycle': `${slides.length * SLIDE_SECONDS}s` };
  slides.forEach((s, i) => { vars[`--s${i + 1}`] = `url("${s}")`; });
  return vars;
}

// Slide indicators driven by the same clock as the photos.
export function HeroDots({ count }) {
  return (
    <div className="hero-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <i key={i} style={{ animationDelay: `${i * SLIDE_SECONDS}s` }} />)}
    </div>
  );
}

export default function PageHero({ slides, eyebrow, title, children }) {
  const vars = useSlideVars(slides);
  return (
    <section className="page-hero has-slides" style={vars}>
      <div className="wrap">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
      <HeroDots count={slides.length} />
    </section>
  );
}