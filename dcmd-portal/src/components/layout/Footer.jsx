import Arrow from '../Arrow.jsx';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer"><div className="container footer-top"><div><span className="footer-kicker">CITY GOVERNMENT OF BUTUAN</span><h2>Technology for<br /><span>public service.</span></h2></div><div className="footer-top-right"><p>Secure infrastructure. Dependable systems. A more connected city.</p><a href="mailto:dcmd@butuan.gov.ph">dcmd@butuan.gov.ph <Arrow diagonal /></a></div></div><div className="container footer-inner"><div className="footer-brand">DCMD<span>© {currentYear} City Government of Butuan</span></div><a href="#top">Back to top ↑</a></div></footer>
  );
}
