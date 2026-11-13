import { useEffect, useState } from 'react';
import './App.css';

const services = [
  { id: '01', symbol: '⌘', title: 'Network Infrastructure', description: 'Core switching, routing, fiber backbone, VLAN architecture, connectivity, and network security.', tags: ['Connectivity', 'Architecture'] },
  { id: '02', symbol: '▤', title: 'Data Center Operations', description: 'Server administration, virtualization, storage, monitoring, and infrastructure reliability.', tags: ['Infrastructure', 'Operations'] },
  { id: '03', symbol: '◇', title: 'Cybersecurity', description: 'Firewall management, endpoint protection, access controls, and security monitoring.', tags: ['Protection', 'Governance'] },
  { id: '04', symbol: '↺', title: 'Backup & Recovery', description: 'System and database backups, disaster recovery planning, and business continuity.', tags: ['Resilience', 'Continuity'] },
];
const systems = ['BCRIS', 'CBPLD', 'CHRMS', 'ePAY', 'GSMS', 'IAMS', 'OSPAS', 'BATS'];
const navigation = [['About', '#about'], ['Services', '#services'], ['Systems', '#systems'], ['Vision', '#vision'], ['Contact', '#contact']];

function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>; }

export default function App() {
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
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main">Skip to main content</a>
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
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow light"><span className="status-dot" /> DATA CENTER MANAGEMENT DIVISION <span className="eyebrow-line" /></p>
              <h1 id="hero-title">Building a<br /><em>connected</em><br />Butuan<span className="heading-period">.</span></h1>
              <p className="hero-description">Secure digital infrastructure. Dependable enterprise systems. Technology that moves public service forward.</p>
              <div className="hero-actions"><a className="button button-primary" href="#services">Explore our services <Arrow diagonal /></a><a className="button button-outline" href="#about">Discover DCMD <span aria-hidden="true">↓</span></a></div>
              <div className="hero-meta"><span className="meta-line" /> CITY GOVERNMENT OF BUTUAN <span className="meta-separator">/</span> AGUSAN DEL NORTE, PHILIPPINES</div>
            </div>
            <div className="hero-visual" aria-hidden="true"><div className="visual-cross cross-a">+</div><div className="visual-cross cross-b">+</div><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="visual-core"><span className="core-glyph">D</span><span>DCMD</span></div><div className="visual-label label-top">NETWORK / CONNECTED</div><div className="visual-label label-bottom">SYSTEMS / PROTECTED</div><span className="visual-node node-a"/><span className="visual-node node-b"/><span className="visual-node node-c"/></div>
          </div>
          <div className="hero-bottom-line" />
          <div className="hero-side-label" aria-hidden="true">DIGITAL INFRASTRUCTURE / 2026</div>
        </section>
        <div className="capability-strip" aria-label="Our technology priorities"><div className="container strip-inner"><span>SECURE INFRASTRUCTURE</span><i aria-hidden="true"/><span>RELIABLE SYSTEMS</span><i aria-hidden="true"/><span>CONNECTED GOVERNANCE</span><i aria-hidden="true"/><span>CONTINUOUS SERVICE</span></div></div>
        <section className="intro section-pad" id="about"><div className="container intro-grid"><div><p className="eyebrow">01 <span className="eyebrow-divider">/</span> WHO WE ARE</p><h2>Technology<br />that serves <span>people.</span></h2><div className="intro-accent" aria-hidden="true"><span>DCMD</span><span>01 — 05</span></div></div><div className="intro-content"><p className="lead">Building the digital foundation for better public service.</p><p className="intro-justified">The Data Center Management Division (DCMD) manages the City Government's network infrastructure, data center facilities, cybersecurity initiatives, enterprise platforms, and information systems that enable digital governance.</p><p className="intro-justified">Our work supports the essential technologies that help government teams operate securely, consistently, and efficiently.</p><a className="text-link" href="#contact">Connect with our division <Arrow diagonal /></a></div></div></section>
        <section className="services section-pad" id="services"><div className="container"><div className="section-heading"><div><p className="eyebrow">02 <span className="eyebrow-divider">/</span> WHAT WE DO</p><h2>Our core <span>capabilities.</span></h2></div><p>Essential technology services that support reliable, secure, and continuous government operations.</p></div><div className="service-grid">{services.map(service => <article className="service-card" key={service.id}><div className="service-card-top"><span className="service-icon" aria-hidden="true">{service.symbol}</span><span className="service-number">{service.id} / 04</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="service-rule" /></article>)}</div><div className="services-footer"><span>INFRASTRUCTURE <b>•</b> RESILIENCE <b>•</b> SECURITY</span><a href="#contact">Discuss a service request <Arrow diagonal /></a></div></div></section>
        <section className="systems section-pad" id="systems"><div className="systems-grid-decoration" aria-hidden="true"/><div className="container systems-layout"><div className="systems-intro"><p className="eyebrow light">03 <span className="eyebrow-divider">/</span> DIGITAL ECOSYSTEM</p><h2>Systems behind<br />the <span>service.</span></h2><p>Enterprise platforms supported by the division to help enable coordinated and efficient government operations.</p><div className="systems-count"><strong>08</strong><span>LISTED ENTERPRISE<br />SYSTEMS</span></div></div><div className="systems-list" aria-label="Supported information systems">{systems.map((name, index) => <div className="system-item" key={name}><span className="system-index">{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><span className="system-symbol" aria-hidden="true">↗</span></div>)}</div></div></section>
        <section className="vision section-pad" id="vision"><div className="container vision-layout"><div><p className="eyebrow">04 <span className="eyebrow-divider">/</span> OUR DIRECTION</p><h2>Driven by purpose.<br /><span>Built for progress.</span></h2><p className="vision-subtext">A clear direction for resilient, inclusive and citizen-centered digital governance.</p></div><div className="vision-statement"><span className="quote-mark" aria-hidden="true">“</span><blockquote>To be a leading technology division that enables efficient, transparent, innovative, and citizen-centered governance through modern information and communications technology.</blockquote><p>OUR VISION</p></div></div></section>
        <section className="contact section-pad" id="contact"><div className="container contact-panel"><div><p className="eyebrow light">05 <span className="eyebrow-divider">/</span> GET IN TOUCH</p><h2>Let's build a more <span>connected city.</span></h2><p>For inquiries regarding the Data Center Management Division and its services, reach out to our team.</p><a className="button button-primary" href="mailto:dcmd@butuan.gov.ph">Email our division <Arrow diagonal /></a></div><div className="contact-details"><div><small>DIVISION</small><strong>Data Center Management Division</strong></div><div><small>ORGANIZATION</small><strong>City Government of Butuan</strong></div><div><small>LOCATION</small><strong>Butuan City, Agusan del Norte</strong></div><div><small>EMAIL</small><a href="mailto:dcmd@butuan.gov.ph">dcmd@butuan.gov.ph</a></div></div></div></section>
      </main>
      <footer className="footer"><div className="container footer-top"><div><span className="footer-kicker">CITY GOVERNMENT OF BUTUAN</span><h2>Technology for<br /><span>public service.</span></h2></div><div className="footer-top-right"><p>Secure infrastructure. Dependable systems. A more connected city.</p><a href="mailto:dcmd@butuan.gov.ph">dcmd@butuan.gov.ph <Arrow diagonal /></a></div></div><div className="container footer-inner"><div className="footer-brand">DCMD<span>© {new Date().getFullYear()} City Government of Butuan</span></div><a href="#top">Back to top ↑</a></div></footer>
    </div>
  );
}
