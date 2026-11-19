import Arrow from '../Arrow.jsx';
import InfrastructureExplorer from './InfrastructureExplorer.jsx';

const hoverProperties = ['--hero-pointer-x', '--hero-pointer-y', '--hover-pitch', '--hover-yaw', '--hover-shift'];

function trackHeroPointer(event) {
  if (event.pointerType !== 'mouse') return;

  const hero = event.currentTarget;
  const bounds = hero.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width;
  const y = (event.clientY - bounds.top) / bounds.height;
  const values = [`${x * 100}%`, `${y * 100}%`, `${(0.5 - y) * 30}deg`, `${(x - 0.5) * 44}deg`, `${(x - 0.5) * 28}px`];
  hoverProperties.forEach((property, index) => hero.style.setProperty(property, values[index]));
}

function clearHeroPointer(event) {
  const { style } = event.currentTarget;
  hoverProperties.forEach(property => style.removeProperty(property));
}
export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title" onPointerMove={trackHeroPointer} onPointerLeave={clearHeroPointer}>
          <div className="hero-grid" aria-hidden="true" /><div className="hero-glow" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow light"><span className="status-dot" /> DATA CENTER MANAGEMENT DIVISION <span className="eyebrow-line" /></p>
              <h1 id="hero-title">Building a<br /><em>connected</em><br />Butuan<span className="heading-period">.</span></h1>
              <p className="hero-description">Secure digital infrastructure. Dependable enterprise systems. Technology that moves public service forward.</p>
              <div className="hero-actions"><a className="button button-primary" href="#services">Explore our services <Arrow diagonal /></a><a className="button button-outline" href="#about">Discover DCMD <span aria-hidden="true">↓</span></a></div>
              <div className="hero-meta"><span className="meta-line" /> CITY GOVERNMENT OF BUTUAN <span className="meta-separator">/</span> AGUSAN DEL NORTE, PHILIPPINES</div>
            </div>
            <InfrastructureExplorer />
          </div>
          <div className="hero-bottom-line" />
          <div className="hero-side-label" aria-hidden="true">DIGITAL INFRASTRUCTURE / 2026</div>
        </section>
  );
}
