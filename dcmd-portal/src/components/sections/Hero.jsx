import Arrow from '../Arrow.jsx';
export default function Hero() {
  return (
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
  );
}
