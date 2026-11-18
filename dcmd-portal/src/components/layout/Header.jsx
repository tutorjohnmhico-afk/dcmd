import { useEffect, useState } from 'react';
import Arrow from '../Arrow.jsx';
import { navigation } from '../../data/navigation.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); observer.disconnect(); };
  }, []);
  return (
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="DCMD home">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span className="brand-copy"><strong>DCMD<span className="brand-period">.</span></strong><small>CITY GOVERNMENT OF BUTUAN</small></span>
          </a>
          <button type="button" className="menu-toggle" aria-controls="primary-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(open => !open)}>{menuOpen ? '✕' : '☰'}</button>
          <nav id="primary-nav" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navigation.map(([label, href]) => <a key={href} className={activeSection === href ? 'active' : ''} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Get in touch <Arrow diagonal /></a>
          </nav>
        </div>
      </header>
  );
}
