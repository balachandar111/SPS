import { Link, useParams, useSearchParams } from 'react-router-dom';
import data from '../data/products.json';
import specs from '../data/specs.js';
import ProductCard, { Img } from '../components/ProductCard.jsx';
import { waLink, EMAIL } from '../config.js';

export default function ProductDetail() {
  const { slug } = useParams();
  const [sp, setSp] = useSearchParams();
  const p = data.find((x) => x.slug === slug);
  if (!p) return <section className="wrap section"><p className="empty">Product not found. <Link to="/products" className="link">Back to catalog</Link></p></section>;

  const active = p.variants.find((v) => v.name === sp.get('v')) || p.variants[0];
  const rows = active && specs[`${p.slug}/${active.name}`];
  const img = active?.image || p.image;
  const title = active ? `${p.name} · ${active.name}` : p.name;
  const related = data.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <section className="page-hero slim">
        <div className="wrap crumbs"><Link to="/">Home</Link><i>/</i><Link to="/products">Products</Link><i>/</i><Link to={`/products?cat=${encodeURIComponent(p.category)}`}>{p.category}</Link><i>/</i><span>{p.name}</span></div>
      </section>
      <section className="wrap section tight">
        <div className="detail">
          <div className="detail-img"><Img src={img} alt={title} /><span className="badge big">{p.riceType}</span></div>
          <div>
            <p className="eyebrow">{p.category}</p>
            <h1 className="h1">{p.name}</h1>
            <p className="lead dark">{p.tagline}</p>

            {active && (
              <>
                <p className="label">Choose variant ({p.variants.length})</p>
                <div className="vgrid">
                  {p.variants.map((v) => (
                    <button key={v.name} className={v.name === active.name ? 'vcard on' : 'vcard'} onClick={() => setSp({ v: v.name }, { replace: true })}>
                      <Img src={v.image} alt={v.name} /><span>{v.name}</span>
                    </button>
                  ))}
                </div>
                <div className="panel">
                  <div className="panel-top"><h3>{active.name}</h3><span className="pill-dark">{p.riceType}</span></div>
                  <p>{active.detail}</p>
                  {rows ? (
                    <table className="specs"><tbody>{rows.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>
                  ) : (
                    <p className="note">Detailed grain specifications for this variant are on the Savitri Group website.</p>
                  )}
                  {active.pageUrl && <a className="link" href={active.pageUrl} target="_blank" rel="noreferrer">View on savitrigroup.in ↗</a>}
                </div>
              </>
            )}

            <div className="row">
              <a className="btn" href={waLink(`Hi, I'd like to enquire about ${title}.`)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
              <a className="btn btn-outline" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry: ' + title)}`}>Email us</a>
            </div>
            <p className="note">Pack sizes and prices are not published by the brand; please enquire.</p>
          </div>
        </div>

        {related.length > 0 && (<><h2 className="sub">More from {p.category}</h2><div className="grid">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></>)}
      </section>
    </>
  );
}
