import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { WHATSAPP, PHONE, EMAIL } from './config.js';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const f = () => setStuck(window.scrollY > 40);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <>
      <ScrollTop />
      <div className="topbar">
        <span>Pioneers in agro processing &amp; quality grain production</span>
        <a href="tel:18002003903">{PHONE}</a>
      </div>
      <header className={`header ${stuck ? 'stuck' : ''}`}>
        <div className="wrap header-in">
          <Link to="/"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="SPS Agronico India LLP" className="logo" /></Link>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
          <nav className={open ? 'open' : ''}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-sm">Enquire</a>
          </nav>
        </div>
      </header>
      <main key={pathname} className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Products />} />
        </Routes>
      </main>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="wa-float" aria-label="Chat on WhatsApp">
        <span>💬</span>
      </a>
      <footer className="footer">
        <div className="wrap foot-grid">
          <div className="foot-brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="foot-logo" />
            <p>Quality · Quantity · Hygiene. Rice from Raichur to kitchens across Karnataka.</p>
          </div>
          <div><h4>Explore</h4><p className="links"><Link to="/products">Products</Link><Link to="/about">About us</Link><Link to="/contact">Contact</Link></p></div>
          <div><h4>Corporate office</h4><p>Sri Vinayaka Traders, #112, 4th Main Road, APMC Yard, Yeshwanthpur, Bangalore - 560022</p></div>
          <div><h4>Mill</h4><p>SPS Agronico India LLP, Sy no: 1 &amp; 2, Thammalghatta village, Gadwal road, Raichur</p></div>
          <div><h4>Contact</h4><p><a href="tel:18002003903">{PHONE}</a><br /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p></div>
        </div>
        <div className="copy">Product details sourced from savitrigroup.in</div>
      </footer>
    </>
  );
}
