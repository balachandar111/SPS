import { useState } from 'react';
import { PHONE, EMAIL, waLink } from '../config.js';
import data from '../data/products.json';
import PageHero from '../components/PageHero.jsx';
import { heroSlides } from '../data/heroSlides.js';

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', product: '', msg: '' });
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const text = `Hi, I'm ${f.name || '—'} (${f.phone || 'no phone given'}). ${f.product ? `Enquiry about ${f.product}. ` : ''}${f.msg}`;
  const ok = f.name.trim() && f.msg.trim();

  return (
    <>
      <PageHero slides={heroSlides.contact} eyebrow="Contact" title="Let's talk rice">
        Enquire about products, pack sizes or trade supply.
      </PageHero>
      <section className="wrap section">
        <div className="contact pull">
          <div className="info">
            <div className="info-card"><em>📞</em><div><h4>Call</h4><a href="tel:18002003903">{PHONE}</a></div></div>
            <div className="info-card"><em>✉️</em><div><h4>Email</h4><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
            <div className="info-card"><em>🏢</em><div><h4>Corporate office</h4><p>Sri Vinayaka Traders, #112, 4th Main Road, APMC Yard, Yeshwanthpur, Bangalore - 560022</p></div></div>
            <div className="info-card"><em>🏭</em><div><h4>Mill</h4><p>SPS Agronico India LLP, Sy no: 1 &amp; 2, Thammalghatta village, Gadwal road, Raichur</p></div></div>
          </div>
          <div className="form">
            <h3>Send an enquiry</h3>
            <label>Your name<input value={f.name} onChange={on('name')} placeholder="Full name" /></label>
            <label>Phone<input value={f.phone} onChange={on('phone')} placeholder="Optional" inputMode="tel" /></label>
            <label>Product<select value={f.product} onChange={on('product')}><option value="">Select a product (optional)</option>{data.map((p) => <option key={p.slug}>{p.name}</option>)}</select></label>
            <label>Message<textarea rows="4" value={f.msg} onChange={on('msg')} placeholder="Tell us what you need" /></label>
            <div className="row nomar">
              <a className={`btn ${ok ? '' : 'disabled'}`} href={ok ? waLink(text) : undefined} target="_blank" rel="noreferrer">Send on WhatsApp</a>
              <a className={`btn btn-outline ${ok ? '' : 'disabled'}`} href={ok ? `mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry from ' + f.name)}&body=${encodeURIComponent(text)}` : undefined}>Send by email</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}